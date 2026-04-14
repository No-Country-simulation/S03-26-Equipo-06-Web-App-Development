package com.nocountry.cms.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Testimonio {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id_testimonio;
    private String titulo;
    private String contenido;
    private String estado;
    private String imagen_url;
    private String video_url;
    private LocalDateTime fecha_creacion;

    // ========== NUEVOS CAMPOS PARA YOUTUBE ==========
    @Column(length = 500)
    private String youtube_titulo;        // Título del video
    private String youtube_video_id;       // ID del video
    private String youtube_embed_url;      // URL para embed
    private String youtube_thumbnail;      // URL de la miniatura
    private String youtube_canal;          // Nombre del canal
    private Long youtube_duracion;         // Duración en segundos
    private Long youtube_vistas;           // Número de vistas
    // =============================================

    @ManyToOne
    @JoinColumn (name = "id_categoria")
    @JsonIgnore
    private Categoria id_categoria;

    @ManyToOne
    @JoinColumn (name = "id_usuario")
    @JsonIgnore
    private Usuario id_usuario;

    @ManyToMany
    @JoinTable(
            name = "testimonio_tag",
            joinColumns = @JoinColumn(name = "id_testimonio"),
            inverseJoinColumns = @JoinColumn(name = "id_tag")
    )
    private List<Tag> tags;
}
