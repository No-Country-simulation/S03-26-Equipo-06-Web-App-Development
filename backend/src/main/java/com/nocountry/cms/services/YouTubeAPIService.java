package com.nocountry.cms.services;

import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoListResponse;
import com.google.api.services.youtube.model.VideoSnippet;
import com.google.api.services.youtube.model.VideoStatistics;
import com.nocountry.cms.config.YouTubeConfig;
import com.nocountry.cms.dto.response.YouTubeVideoInfoDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class YouTubeAPIService {

    // ✅ CORREGIDO: Cambiar de youTubeService a youTubeClient
    private final YouTube youTubeClient;
    private final YouTubeConfig youTubeConfig;

    private static final String YOUTUBE_REGEX = "(?:youtube\\.com\\/(?:[^\\/]+\\/.+\\/|(?:v|e(?:mbed)?)\\/|.*[?&]v=)|youtu\\.be\\/)([^\"&?\\/\\s]{11})";
    private static final Pattern YOUTUBE_PATTERN = Pattern.compile(YOUTUBE_REGEX);
    private static final Pattern DURATION_PATTERN = Pattern.compile("PT(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?");

    public String extractVideoId(String url) {
        if (url == null || url.isEmpty()) return null;
        Matcher matcher = YOUTUBE_PATTERN.matcher(url);
        return matcher.find() ? matcher.group(1) : null;
    }

    public YouTubeVideoInfoDTO getVideoInfo(String url) {
        String videoId = extractVideoId(url);
        if (videoId == null) {
            return YouTubeVideoInfoDTO.ofError("URL de YouTube inválida", 400);
        }

        try {
            // ✅ CORREGIDO: usar youTubeClient
            YouTube.Videos.List request = youTubeClient.videos()
                    .list(List.of("snippet", "contentDetails", "statistics"))
                    .setId(List.of(videoId))
                    .setKey(youTubeConfig.getApiKey());

            VideoListResponse response = request.execute();

            if (response.getItems() == null || response.getItems().isEmpty()) {
                return YouTubeVideoInfoDTO.ofError("Video no encontrado o privado", 404);
            }

            Video video = response.getItems().get(0);
            VideoSnippet snippet = video.getSnippet();
            VideoStatistics statistics = video.getStatistics();
            String durationIso = video.getContentDetails().getDuration();

            return YouTubeVideoInfoDTO.builder()
                    .videoId(videoId)
                    .title(snippet.getTitle())
                    .description(snippet.getDescription())
                    .channelTitle(snippet.getChannelTitle())
                    .channelId(snippet.getChannelId())
                    .thumbnailMaxRes(getThumbnailUrl(snippet, "maxres"))
                    .thumbnailHigh(getThumbnailUrl(snippet, "high"))
                    .thumbnailMedium(getThumbnailUrl(snippet, "medium"))
                    .thumbnailDefault(getThumbnailUrl(snippet, "default"))
                    .embedUrl("https://www.youtube.com/embed/" + videoId)
                    .duration(parseDuration(durationIso))
                    .viewCount(statistics != null ? statistics.getViewCount().longValue() : 0L)
                    .publishedAt(snippet.getPublishedAt() != null
                            ? java.time.Instant.ofEpochMilli(snippet.getPublishedAt().getValue()) : null)
                    .isValid(true)
                    .build();

        } catch (IOException e) {
            log.error("Error en API de YouTube: {}", e.getMessage());
            return YouTubeVideoInfoDTO.ofError("Error al conectar con YouTube API: " + e.getMessage(), 500);
        }
    }

    private String getThumbnailUrl(VideoSnippet snippet, String quality) {
        if (snippet.getThumbnails() == null) return null;
        return switch (quality) {
            case "maxres" -> snippet.getThumbnails().getMaxres() != null ? snippet.getThumbnails().getMaxres().getUrl() : null;
            case "high" -> snippet.getThumbnails().getHigh() != null ? snippet.getThumbnails().getHigh().getUrl() : null;
            case "medium" -> snippet.getThumbnails().getMedium() != null ? snippet.getThumbnails().getMedium().getUrl() : null;
            default -> snippet.getThumbnails().getDefault() != null ? snippet.getThumbnails().getDefault().getUrl() : null;
        };
    }

    private Long parseDuration(String isoDuration) {
        if (isoDuration == null) return 0L;
        Matcher matcher = DURATION_PATTERN.matcher(isoDuration);
        if (matcher.matches()) {
            long hours = Optional.ofNullable(matcher.group(1)).map(Long::parseLong).orElse(0L);
            long minutes = Optional.ofNullable(matcher.group(2)).map(Long::parseLong).orElse(0L);
            long seconds = Optional.ofNullable(matcher.group(3)).map(Long::parseLong).orElse(0L);
            return hours * 3600 + minutes * 60 + seconds;
        }
        return 0L;
    }

    // ✅ CORREGIDO: Devuelve YouTubeVideoInfoDTO, no boolean
    public YouTubeVideoInfoDTO isValidYouTubeUrl(String url) {
        String videoId = extractVideoId(url);
        if (videoId == null) {
            return YouTubeVideoInfoDTO.ofValidation(null, false, "URL de YouTube inválida");
        }

        try {
            // ✅ CORREGIDO: usar youTubeClient
            YouTube.Videos.List request = youTubeClient.videos()
                    .list(List.of("id"))
                    .setId(List.of(videoId))
                    .setKey(youTubeConfig.getApiKey());

            VideoListResponse response = request.execute();
            boolean isValid = response.getItems() != null && !response.getItems().isEmpty();

            if (isValid) {
                return YouTubeVideoInfoDTO.ofValidation(videoId, true, null);
            } else {
                return YouTubeVideoInfoDTO.ofValidation(videoId, false, "Video no encontrado o privado");
            }
        } catch (IOException e) {
            log.error("Error validando video: {}", e.getMessage());
            return YouTubeVideoInfoDTO.ofValidation(videoId, false, "Error de conexión con YouTube API");
        }
    }

    public String getEmbedUrl(String url) {
        String videoId = extractVideoId(url);
        return videoId != null ? "https://www.youtube.com/embed/" + videoId : null;
    }

    public String getThumbnailUrl(String url) {
        String videoId = extractVideoId(url);
        return videoId != null ? "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg" : null;
    }

    // ✅ NUEVO MÉTODO: checkApiHealth()
    public boolean checkApiHealth() {
        try {
            YouTube.Videos.List request = youTubeClient.videos()
                    .list(List.of("id"))
                    .setKey(youTubeConfig.getApiKey())
                    .setId(List.of("dQw4w9WgXcQ"))
                    .setMaxResults(1L);

            VideoListResponse response = request.execute();
            return response != null;
        } catch (IOException e) {
            log.error("Health check fallido: {}", e.getMessage());
            return false;
        }
    }
}