package com.example.catalog.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Objects;

@Document(collection = "products")
public class Product {

    @Id
    private String id;

    @NotBlank(message = "Le nom du produit est obligatoire")
    private String name;

    @NotBlank(message = "La description du produit est obligatoire")
    private String description;

    @NotNull(message = "Le prix du produit est obligatoire")
    @DecimalMin(value = "0.0", inclusive = false, message = "Le prix du produit doit être supérieur à zéro")
    private BigDecimal price;

    public Product() {
    }

    public Product(String id, String name, String description, BigDecimal price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
       this.id = id;
    }

    public String getName() {
       return name;
    }

    public void setName(String name) {
       this.name = name;
    }

    public String getDescription() {
       return description;
    }

    public void setDescription(String description) {
       this.description = description;
    }

    public BigDecimal getPrice() {
       return price;
    }

    public void setPrice(BigDecimal price) {
       this.price = price;
    }

    @Override
    public boolean equals(Object o) {
       if (this == o) return true;
       if (o == null || getClass() != o.getClass()) return false;
       Product product = (Product) o;
       return Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
       return Objects.hash(id);
    }

    @Override
    public String toString() {
       return "Product{" +
              "id='" + id + '\'' +
              ", name='" + name + '\'' +
              ", description='" + description + '\'' +
              ", price=" + price +
              '}';
    }
}
