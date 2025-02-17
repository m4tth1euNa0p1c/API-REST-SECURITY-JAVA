package com.example.catalog;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class DatabaseConnectionTests {

    @Value("${spring.data.mongodb.uri:mongodb://localhost:27017/catalog}")
    private String mongoUri;

    @Test
    public void testMongoConnection() {
        try (MongoClient mongoClient = MongoClients.create(mongoUri)) {
            MongoDatabase database = mongoClient.getDatabase("catalog");

            List<String> collections = new ArrayList<>();
            database.listCollectionNames().into(collections);

            assertThat(collections).contains("products", "users");
        }
    }
}
