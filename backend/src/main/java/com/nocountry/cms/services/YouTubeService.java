package com.nocountry.cms.services;

import org.springframework.stereotype.Service;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class YouTubeService {

    private static final String YOUTUBE_REGEX = "(?:youtube\\.com\\/(?:[^\\/]+\\/.+\\/|(?:v|e(?:mbed)?)\\/|.*[?&]v=)|youtu\\.be\\/)([^\"&?\\/\\s]{11})";
    private static final Pattern YOUTUBE_PATTERN = Pattern.compile(YOUTUBE_REGEX);

    /**
     * Extrae el ID del video de YouTube desde la URL
     */
    public String extractVideoId(String url) {
        if (url == null || url.isEmpty()) {
            return null;
        }

        Matcher matcher = YOUTUBE_PATTERN.matcher(url);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    /**
     * Obtiene la URL para embed del video
     */
    public String getEmbedUrl(String videoId) {
        if (videoId == null) return null;
        return "https://www.youtube.com/embed/" + videoId;
    }

    /**
     * Obtiene la URL de la miniatura del video
     */
    public String getThumbnailUrl(String videoId) {
        if (videoId == null) return null;
        return "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
    }

    /**
     * Valida si una URL es de YouTube válida
     */
    public boolean isValidYouTubeUrl(String url) {
        return extractVideoId(url) != null;
    }

    /**
     * Procesa la URL y devuelve información del video
     */
    public YouTubeVideoInfo processVideoUrl(String url) {
        String videoId = extractVideoId(url);
        if (videoId == null) {
            return null;
        }

        YouTubeVideoInfo info = new YouTubeVideoInfo();
        info.setVideoId(videoId);
        info.setEmbedUrl(getEmbedUrl(videoId));
        info.setThumbnailUrl(getThumbnailUrl(videoId));
        info.setOriginalUrl(url);

        return info;
    }

    // Clase interna para la respuesta
    public static class YouTubeVideoInfo {
        private String videoId;
        private String embedUrl;
        private String thumbnailUrl;
        private String originalUrl;

        public String getVideoId() { return videoId; }
        public void setVideoId(String videoId) { this.videoId = videoId; }

        public String getEmbedUrl() { return embedUrl; }
        public void setEmbedUrl(String embedUrl) { this.embedUrl = embedUrl; }

        public String getThumbnailUrl() { return thumbnailUrl; }
        public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

        public String getOriginalUrl() { return originalUrl; }
        public void setOriginalUrl(String originalUrl) { this.originalUrl = originalUrl; }
    }
}