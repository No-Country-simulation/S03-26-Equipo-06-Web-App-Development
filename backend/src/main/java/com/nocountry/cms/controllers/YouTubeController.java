package com.nocountry.cms.controllers;

import com.nocountry.cms.dto.response.YouTubeVideoInfoDTO;
import com.nocountry.cms.services.YouTubeAPIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/youtube")
@RequiredArgsConstructor
public class YouTubeController {

    private final YouTubeAPIService youTubeAPIService;

    @PostMapping("/validar")
    public ResponseEntity<YouTubeVideoInfoDTO> validarUrl(@RequestBody Map<String, String> body) {
        String url = body.get("url");
        log.info("POST /api/youtube/validar - URL: {}", url);

        // ✅ CORREGIDO: isValidYouTubeUrl devuelve YouTubeVideoInfoDTO, no boolean
        YouTubeVideoInfoDTO result = youTubeAPIService.isValidYouTubeUrl(url);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/info")
    public ResponseEntity<YouTubeVideoInfoDTO> getVideoInfo(@RequestBody Map<String, String> body) {
        String url = body.get("url");
        log.info("POST /api/youtube/info - URL: {}", url);

        YouTubeVideoInfoDTO result = youTubeAPIService.getVideoInfo(url);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        log.info("GET /api/youtube/health");

        // ✅ CORREGIDO: checkApiHealth() ahora existe
        boolean healthy = youTubeAPIService.checkApiHealth();

        return ResponseEntity.ok(Map.of(
                "status", healthy ? "UP" : "DOWN",
                "service", "YouTube Data API v3",
                "timestamp", java.time.Instant.now().toString()
        ));
    }
}