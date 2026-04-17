package com.nocountry.cms.services;

import com.nocountry.cms.dto.ComentarioDTO;
import com.nocountry.cms.models.Comentario;

import java.util.List;

public interface IComentarioService {

    ComentarioDTO traerComentarioDTObyId(Long id);

    List<ComentarioDTO> listarComentariosDTO(List<Comentario> comentarios);

    Comentario crearComentario(Comentario comentario);

    Comentario traerComentarioByid(Long id);

    ComentarioDTO comentarioToDTO(Comentario comentario);

}
