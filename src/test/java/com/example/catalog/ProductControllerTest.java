package com.example.catalog.controller;

import com.example.catalog.model.Product;
import com.example.catalog.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
@WithMockUser(roles = "ADMIN")
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private ProductService productService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    private Product product1;
    private Product product2;
    
    @BeforeEach
    public void setup() {
        product1 = new Product("1", "Produit 1", "Description du produit 1", BigDecimal.valueOf(19.99));
        product2 = new Product("2", "Produit 2", "Description du produit 2", BigDecimal.valueOf(29.99));
    }
    
    @Test
    public void testGetAllProducts() throws Exception {
        List<Product> products = Arrays.asList(product1, product2);
        when(productService.getAllProducts()).thenReturn(products);
        
        mockMvc.perform(get("/api/products"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].name").value("Produit 1"));
    }
    
    @Test
    public void testGetProductById() throws Exception {
        when(productService.getProductById("1")).thenReturn(product1);
        
        mockMvc.perform(get("/api/products/1"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.name").value("Produit 1"));
    }
    
    @Test
    public void testCreateProduct() throws Exception {
        when(productService.createProduct(any(Product.class))).thenReturn(product1);
        
        mockMvc.perform(post("/api/products")
                .with(csrf())  // Ajoute un token CSRF pour les requêtes modifiant des données
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(product1)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("Produit 1"));
    }
    
    @Test
    public void testUpdateProduct() throws Exception {
        Product updatedProduct = new Product("1", "Produit 1 updated", "Updated description", BigDecimal.valueOf(25.99));
        when(productService.updateProduct(eq("1"), any(Product.class))).thenReturn(updatedProduct);
        
        mockMvc.perform(put("/api/products/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedProduct)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Produit 1 updated"))
            .andExpect(jsonPath("$.description").value("Updated description"))
            .andExpect(jsonPath("$.price").value(25.99));
    }
    
    @Test
    public void testDeleteProduct() throws Exception {
        Mockito.doNothing().when(productService).deleteProduct("1");
        
        mockMvc.perform(delete("/api/products/1")
                .with(csrf()))
            .andExpect(status().isNoContent());
    }
}
