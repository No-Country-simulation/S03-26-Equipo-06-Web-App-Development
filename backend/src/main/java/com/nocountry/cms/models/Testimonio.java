package com.nocountry.cms.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
    private UUID id_testimonio;
    private String titulo;
    private String contenido;
    private List<String> tags;
    private String estado;
    private String imagen_url;
    private String video_url;
    private LocalDate fecha_creacion;
    @ManyToOne
    @JoinColumn (name = "id_categoria")
    @JsonIgnore
    Categoria id_categoria;
    @ManyToOne
    @JoinColumn (name = "id_usuario")
    @JsonIgnore
    Usuario id_usuario;
}
