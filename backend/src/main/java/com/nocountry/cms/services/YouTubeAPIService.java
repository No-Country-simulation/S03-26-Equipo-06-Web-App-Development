package com.nocountry.cms.services;

import com.google.api.client.util.DateTime;
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
import java.time.Duration;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class YouTubeAPIService {

    private final YouTube youTubeService;
    private final YouTubeConfig youTubeConfig;

    // Patrones para extraer ID de YouTube
    private static final String YOUTUBE_REGEX = "(?:youtube\\.com\\/(?:[^\\/]+\\/.+\\/|(?:v|e(?:mbed)?)\\/|.*[?&]v=)|youtu\\.be\\/)([^\"&?\\/\\s]{11})";
    private static final Pattern YOUTUBE_PATTERN = Pattern.compile(YOUTUBE_REGEX);

    // Patrón para duración ISO 8601 (PT1H2M3S)
    private static final Pattern DURATION_PATTERN = Pattern.compile("PT(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?");

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
     * Obtiene información completa del video desde la API de YouTube
     */
    public YouTubeVideoInfoDTO getVideoInfo(String url) {
        String videoId = extractVideoId(url);

        if (videoId == null) {
            return YouTubeVideoInfoDTO.builder()
                    .isValid(false)
                    .errorMessage("URL de YouTube inválida")
                    .build();
        }

        try {
            // Llamada a la API de YouTube
            YouTube.Videos.List request = youTubeService.videos()
                    .list(List.of("snippet", "contentDetails", "statistics"))
                    .setId(List.of(videoId))
                    .setKey(youTubeConfig.getApiKey());

            VideoListResponse response = request.execute();

            if (response.getItems() == null || response.getItems().isEmpty()) {
                return YouTubeVideoInfoDTO.builder()
                        .videoId(videoId)
                        .isValid(false)
                        .errorMessage("Video no encontrado")
                        .build();
            }

            Video video = response.getItems().get(0);
            VideoSnippet snippet = video.getSnippet();
            VideoStatistics statistics = video.getStatistics();
            String durationIso = video.getContentDetails().getDuration();

            // Construir respuesta
            return YouTubeVideoInfoDTO.builder()
                    .videoId(videoId)
                    .title(snippet.getTitle())
                    .description(snippet.getDescription())
                    .channelTitle(snippet.getChannelTitle())
                    .channelId(snippet.getChannelId())
                    .thumbnailUrl(getBestThumbnailUrl(snippet))
                    .thumbnailMedium(snippet.getThumbnails().getMedium().getUrl())
                    .thumbnailHigh(snippet.getThumbnails().getHigh().getUrl())
                    .embedUrl("https://www.youtube.com/embed/" + videoId)
                    .watchUrl("https://www.youtube.com/watch?v=" + videoId)
                    .duration(parseDuration(durationIso))
                    .viewCount(statistics != null ? statistics.getViewCount().longValue() : 0L)
                    .publishedAt(snippet.getPublishedAt().toString())
                    .isValid(true)
                    .build();

        } catch (IOException e) {
            log.error("Error al obtener información del video: {}", e.getMessage());
            return YouTubeVideoInfoDTO.builder()
                    .videoId(videoId)
                    .isValid(false)
                    .errorMessage("Error al conectar con YouTube API: " + e.getMessage())
                    .build();
        }
    }

    /**
     * Obtiene la mejor miniatura disponible
     */
    private String getBestThumbnailUrl(VideoSnippet snippet) {
        if (snippet.getThumbnails().getMaxres() != null) {
            return snippet.getThumbnails().getMaxres().getUrl();
        } else if (snippet.getThumbnails().getHigh() != null) {
            return snippet.getThumbnails().getHigh().getUrl();
        } else if (snippet.getThumbnails().getMedium() != null) {
            return snippet.getThumbnails().getMedium().getUrl();
        } else {
            return snippet.getThumbnails().getDefault().getUrl();
        }
    }

    /**
     * Convierte duración ISO 8601 a segundos
     * Ejemplo: PT1H2M3S -> 3723 segundos
     */
    private Long parseDuration(String durationIso) {
        if (durationIso == null) return 0L;

        Matcher matcher = DURATION_PATTERN.matcher(durationIso);
        if (matcher.matches()) {
            long hours = Optional.ofNullable(matcher.group(1))
                    .map(Long::parseLong).orElse(0L);
            long minutes = Optional.ofNullable(matcher.group(2))
                    .map(Long::parseLong).orElse(0L);
            long seconds = Optional.ofNullable(matcher.group(3))
                    .map(Long::parseLong).orElse(0L);

            return hours * 3600 + minutes * 60 + seconds;
        }
        return 0L;
    }

    /**
     * Valida si una URL es de YouTube y el video existe
     */
    public boolean isValidYouTubeUrl(String url) {
        String videoId = extractVideoId(url);
        if (videoId == null) return false;

        try {
            YouTube.Videos.List request = youTubeService.videos()
                    .list(List.of("snippet"))
                    .setId(List.of(videoId))
                    .setKey(youTubeConfig.getApiKey());

            VideoListResponse response = request.execute();
            return response.getItems() != null && !response.getItems().isEmpty();
        } catch (IOException e) {
            log.error("Error validando video: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Obtiene solo la miniatura del video (sin llamada completa a la API)
     */
    public String getThumbnailUrl(String url) {
        String videoId = extractVideoId(url);
        if (videoId == null) return null;
        return "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
    }

    /**
     * Obtiene URL para embed
     */
    public String getEmbedUrl(String url) {
        String videoId = extractVideoId(url);
        if (videoId == null) return null;
        return "https://www.youtube.com/embed/" + videoId;
    }
}