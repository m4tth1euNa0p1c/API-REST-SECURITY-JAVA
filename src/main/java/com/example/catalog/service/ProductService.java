package com.example.catalog.service;

import com.example.catalog.exception.ResourceNotFoundException;
import com.example.catalog.model.Product;
import com.example.catalog.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Récupérer tous les produits
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Récupérer un produit par son ID
    public Product getProductById(String id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec l'id : " + id));
    }

    // Créer un nouveau produit
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // Mettre à jour un produit existant
    public Product updateProduct(String id, Product productDetails) {
        Product product = getProductById(id);
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        return productRepository.save(product);
    }

    // Supprimer un produit
    public void deleteProduct(String id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}
