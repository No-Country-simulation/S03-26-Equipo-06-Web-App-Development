package com.nocountry.cms.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

import java.time.Instant;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class YoutubeVideo {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(length = 500)
    private String title;
    @Column(length = 1000)
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
    private Boolean isValid;
}
