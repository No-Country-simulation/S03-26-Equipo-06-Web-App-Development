package com.nocountry.cms.config;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.security.GeneralSecurityException;

@Slf4j
@Configuration
public class YouTubeConfig {

    @Value("${youtube.api.key}")
    private String apiKey;

    @Bean(name = "youTubeClient")
    public YouTube youTubeClient() throws GeneralSecurityException, IOException {
        validateApiKey();
        log.info("Inicializando cliente de YouTube...");

        return new YouTube.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JacksonFactory.getDefaultInstance(),
                request -> {}
        ).setApplicationName("CMS-TestimonioApp").build();
    }

    public String getApiKey() {
        return apiKey;
    }

    private void validateApiKey() {
        if (!StringUtils.hasText(apiKey)) {
            throw new IllegalStateException("API_KEY_YOUTUBE no está configurada");
        }
        log.info("API Key cargada correctamente");
    }
}