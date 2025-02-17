package com.example.catalog;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ApiRestSecuriseeApplicationTests {

    @Test
    void contextLoads() {
        // Vérifie simplement que le contexte Spring Boot se charge correctement
    }

    @Test
    void testHelloWorldMessage() {
        // Redirige la sortie standard pour capturer le message affiché
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        PrintStream originalOut = System.out;
        System.setOut(new PrintStream(outContent));

        // Appelle la méthode main de l'application
        ApiRestSecuriseeApplication.main(new String[]{});

        // Restaure la sortie standard
        System.setOut(originalOut);

        // Vérifie que le message "Hello World" est présent dans la sortie
        String output = outContent.toString();
        assertThat(output).contains("Hello World from API REST Sécurisée!");
    }
}
