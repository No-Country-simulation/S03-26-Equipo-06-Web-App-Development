package com.nocountry.cms.services;

import com.nocountry.cms.dto.ComentarioDTO;
import com.nocountry.cms.models.Comentario;
import com.nocountry.cms.repositories.IComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComentarioService implements IComentarioService {

    @Autowired
    private IComentarioRepository comentarioRepository;

    @Override
    public ComentarioDTO traerComentarioDTObyId(Long id) {

        return comentarioToDTO(traerComentarioByid(id));
    }

    @Override
    public List<ComentarioDTO> listarComentariosDTO(List<Comentario> comentarios) {
        List<ComentarioDTO> listaComentariosDTO = new ArrayList<>();

        for(Comentario comentario : comentarios){
            listaComentariosDTO.add(traerComentarioDTObyId(comentario.getId_comentario()));
        }
        return listaComentariosDTO;
    }

    @Override
    public Comentario crearComentario(Comentario comentario) {

        return comentarioRepository.save(comentario);
    }

    @Override
    public Comentario traerComentarioByid(Long id) {
        return comentarioRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("No se encontro el comentario"));
    }

    @Override
    public ComentarioDTO comentarioToDTO(Comentario comentario) {
        ComentarioDTO comentarioDTO = new ComentarioDTO();

        comentarioDTO.setId(comentario.getId_comentario());
        comentarioDTO.setContenido(comentario.getContenido());

        return comentarioDTO;

    }
}
