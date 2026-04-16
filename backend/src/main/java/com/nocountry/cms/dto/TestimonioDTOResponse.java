package com.nocountry.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class TestimonioDTOResponse {
    private Long id_testimonio;
    private String titulo;
    private String contenido;
    private String estado;
    private String imagen_url;
    private String video_url;
    private LocalDateTime fecha_creacion;
    private CategoriaDTO categoria;
    private UsuarioDTO usuario;
    private List<TagDTO> tags;

}
