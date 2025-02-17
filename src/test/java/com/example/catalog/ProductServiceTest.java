package com.example.catalog.service;

import com.example.catalog.exception.ResourceNotFoundException;
import com.example.catalog.model.Product;
import com.example.catalog.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import org.mockito.MockitoAnnotations;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Optional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;
    
    @InjectMocks
    private ProductService productService;
    
    private Product product1;
    private Product product2;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        product1 = new Product("1", "Produit 1", "Description du produit 1", BigDecimal.valueOf(19.99));
        product2 = new Product("2", "Produit 2", "Description du produit 2", BigDecimal.valueOf(29.99));
    }

    @Test
    public void testGetAllProducts() {
        when(productRepository.findAll()).thenReturn(Arrays.asList(product1, product2));
        List<Product> result = productService.getAllProducts();
        assertThat(result).hasSize(2).contains(product1, product2);
    }

    @Test
    public void testGetProductById() {
        when(productRepository.findById("1")).thenReturn(Optional.of(product1));
        Product result = productService.getProductById("1");
        assertThat(result).isEqualTo(product1);
    }

    @Test
    public void testGetProductByIdNotFound() {
        when(productRepository.findById("3")).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> productService.getProductById("3"));
    }

    @Test
    public void testCreateProduct() {
        when(productRepository.save(any(Product.class))).thenReturn(product1);
        Product result = productService.createProduct(product1);
        assertThat(result).isEqualTo(product1);
    }

    @Test
    public void testUpdateProduct() {
        when(productRepository.findById("1")).thenReturn(Optional.of(product1));
        when(productRepository.save(any(Product.class))).thenReturn(product1);

        Product updatedDetails = new Product(null, "Produit 1 updated", "Updated description", BigDecimal.valueOf(25.99));
        Product result = productService.updateProduct("1", updatedDetails);
        assertThat(result.getName()).isEqualTo("Produit 1 updated");
        assertThat(result.getDescription()).isEqualTo("Updated description");
        assertThat(result.getPrice()).isEqualTo(BigDecimal.valueOf(25.99));
    }

    @Test
    public void testDeleteProduct() {
        when(productRepository.findById("1")).thenReturn(Optional.of(product1));
        productService.deleteProduct("1");
        verify(productRepository).delete(product1);
    }
}
