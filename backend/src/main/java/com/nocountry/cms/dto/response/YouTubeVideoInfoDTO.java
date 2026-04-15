package com.nocountry.cms.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class YouTubeVideoInfoDTO {

    private String videoId;
    private String title;
    private String description;
    private String channelTitle;
    private String channelId;
    private String thumbnailMaxRes;
    private String thumbnailHigh;
    private String thumbnailMedium;
    private String thumbnailDefault;
    private String embedUrl;
    private Long duration;
    private Long viewCount;
    private Instant publishedAt;
    private boolean isValid;
    private String errorMessage;
    private Integer errorCode;

    // ✅ MÉTODO FACTORY PARA ERRORES
    public static YouTubeVideoInfoDTO ofError(String errorMessage, Integer errorCode) {
        return YouTubeVideoInfoDTO.builder()
                .isValid(false)
                .errorMessage(errorMessage)
                .errorCode(errorCode)
                .build();
    }

    // ✅ MÉTODO FACTORY PARA VALIDACIÓN RÁPIDA
    public static YouTubeVideoInfoDTO ofValidation(String videoId, boolean isValid, String errorMessage) {
        return YouTubeVideoInfoDTO.builder()
                .videoId(videoId)
                .isValid(isValid)
                .errorMessage(errorMessage)
                .build();
    }
}