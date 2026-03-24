package com.nocountry.cms.model;

import jakarta.annotation.Generated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Testimonio {

    private Long id;
    private String titulo;
    private String contenido;
    private String categoria;
    private List<String> tags;
    private String estado;
    private String imagen_url;
    private String video_url;
    private LocalDate fecha_creacion;

}
