package com.nocountry.cms.config;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.security.GeneralSecurityException;

@Configuration
public class YouTubeConfig {

    @Value("${youtube.api.key}")
    private String apiKey;

    @Bean
    public YouTube youTubeService() throws GeneralSecurityException, IOException {
        final NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        return new YouTube.Builder(httpTransport, JacksonFactory.getDefaultInstance(), null)
                .setApplicationName("CMS-TestimonioApp")
                .build();
    }

    public String getApiKey() {
        return apiKey;
    }
}