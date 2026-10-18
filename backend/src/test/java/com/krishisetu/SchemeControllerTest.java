package com.krishisetu;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class SchemeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("GET /api/schemes should return list of active schemes")
    public void testGetSchemes() throws Exception {
        mockMvc.perform(get("/api/schemes")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(greaterThanOrEqualTo(36))))
                .andExpect(jsonPath("$.data[0].id").exists())
                .andExpect(jsonPath("$.data[0].nameEn").exists());
    }

    @Test
    @DisplayName("GET /api/schemes/pm-kisan should return PM-KISAN details with official proof documents")
    public void testGetSchemeDetail() throws Exception {
        mockMvc.perform(get("/api/schemes/pm-kisan")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value("pm-kisan"))
                .andExpect(jsonPath("$.data.code").value("PMK-001"))
                .andExpect(jsonPath("$.data.applyUrl").isNotEmpty())
                .andExpect(jsonPath("$.data.officialDocuments", hasSize(greaterThanOrEqualTo(1))));
    }

    @Test
    @DisplayName("GET /api/categories should return all categories")
    public void testGetCategories() throws Exception {
        mockMvc.perform(get("/api/categories")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(greaterThanOrEqualTo(15))));
    }

    @Test
    @DisplayName("GET /api/schemes/search?q=irrigation should return irrigation schemes")
    public void testSearchSchemes() throws Exception {
        mockMvc.perform(get("/api/schemes/search?q=irrigation")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(greaterThanOrEqualTo(1))));
    }
}
