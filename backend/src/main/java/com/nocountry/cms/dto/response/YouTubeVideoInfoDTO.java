package com.nocountry.cms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class YouTubeVideoInfoDTO {
    private String videoId;
    private String title;
    private String description;
    private String channelTitle;
    private String channelId;
    private String thumbnailUrl;
    private String thumbnailMedium;
    private String thumbnailHigh;
    private String embedUrl;
    private String watchUrl;
    private Long duration; // en segundos
    private Long viewCount;
    private String publishedAt;
    private Boolean isValid;
    private String errorMessage;
}

