package com.nocountry.cms.controllers;

import com.nocountry.cms.services.YouTubeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/youtube")
public class YouTubeController {

    @Autowired
    private YouTubeService youTubeService;

    /**
     * Validar URL de YouTube
     * POST /api/youtube/validar
     */
    @PostMapping("/validar")
    public ResponseEntity<Map<String, Object>> validateVideo(@RequestBody Map<String, String> request) {
        String url = request.get("url");
        boolean isValid = youTubeService.isValidYouTubeUrl(url);

        Map<String, Object> response = new HashMap<>();
        response.put("isValid", isValid);

        if (isValid) {
            String videoId = youTubeService.extractVideoId(url);
            response.put("videoId", videoId);
            response.put("thumbnail", youTubeService.getThumbnailUrl(videoId));
            response.put("embedUrl", youTubeService.getEmbedUrl(videoId));
        } else {
            response.put("error", "URL de YouTube inválida");
        }

        return ResponseEntity.ok(response);
    }

    /**
     * Extraer información de YouTube
     * POST /api/youtube/info
     */
    @PostMapping("/info")
    public ResponseEntity<Map<String, String>> getVideoInfo(@RequestBody Map<String, String> request) {
        String url = request.get("url");
        String videoId = youTubeService.extractVideoId(url);

        Map<String, String> response = new HashMap<>();

        if (videoId != null) {
            response.put("videoId", videoId);
            response.put("embedUrl", youTubeService.getEmbedUrl(videoId));
            response.put("thumbnail", youTubeService.getThumbnailUrl(videoId));
            response.put("originalUrl", url);
        } else {
            response.put("error", "No se pudo extraer el ID del video");
        }

        return ResponseEntity.ok(response);
    }
}