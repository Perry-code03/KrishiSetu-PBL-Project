package com.krishisetu;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class KrishiSetuApplication {

    public static void main(String[] args) {
        // Load environment variables from .env if present
        loadEnvironmentVariables();

        SpringApplication.run(KrishiSetuApplication.class, args);
    }

    private static void loadEnvironmentVariables() {
        try {
            File envFile = new File(".env");
            File backendEnv = new File("backend/.env");
            String dir = envFile.exists() ? "./" : (backendEnv.exists() ? "backend" : "./");

            Dotenv dotenv = Dotenv.configure()
                    .directory(dir)
                    .ignoreIfMissing()
                    .load();

            dotenv.entries().forEach(entry -> {
                if (System.getProperty(entry.getKey()) == null && System.getenv(entry.getKey()) == null) {
                    System.setProperty(entry.getKey(), entry.getValue());
                }
            });
        } catch (Exception e) {
            System.out.println("Notice: .env file not loaded via Dotenv (" + e.getMessage() + "), using system environment.");
        }
    }
}
