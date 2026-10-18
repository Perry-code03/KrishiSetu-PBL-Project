package com.krishisetu.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.MapPropertySource;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

public class EnvInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        try {
            File envFile = new File(".env");
            File backendEnv = new File("backend/.env");
            File parentEnv = new File("../backend/.env");

            String dir = "./";
            if (envFile.exists()) {
                dir = "./";
            } else if (backendEnv.exists()) {
                dir = "backend";
            } else if (parentEnv.exists()) {
                dir = "../backend";
            }

            Dotenv dotenv = Dotenv.configure()
                    .directory(dir)
                    .ignoreIfMissing()
                    .load();

            Map<String, Object> map = new HashMap<>();
            dotenv.entries().forEach(e -> map.put(e.getKey(), e.getValue()));

            applicationContext.getEnvironment().getPropertySources()
                    .addFirst(new MapPropertySource("dotenvProperties", map));

            System.out.println("EnvInitializer: Successfully loaded " + map.size() + " environment properties from " + dir);
        } catch (Exception e) {
            System.err.println("EnvInitializer warning: " + e.getMessage());
        }
    }
}
