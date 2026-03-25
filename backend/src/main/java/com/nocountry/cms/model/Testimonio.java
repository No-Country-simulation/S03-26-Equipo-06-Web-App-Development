package com.nocountry.cms.model;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Testimonio {

    @Id
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID id;
    private String titulo;
    private String contenido;
    private String categoria;
    private List<String> tags;
    private String estado;
    private String imagen_url;
    private String video_url;
    private LocalDate fecha_creacion;

}
