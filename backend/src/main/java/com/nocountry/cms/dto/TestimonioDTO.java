package com.nocountry.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class TestimonioDTO {

    private String titulo;
    private String contenido;
    private String estado;
    private String imagen_url;
    private String video_url;
    private Long categoria_id;
    private List<Long> tags;

}
