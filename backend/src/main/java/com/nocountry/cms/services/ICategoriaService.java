package com.nocountry.cms.services;

import com.nocountry.cms.dto.CategoriaDTO;
import com.nocountry.cms.models.Categoria;

import java.util.List;

public interface ICategoriaService {

    Categoria getCategoriaById(Long id);

    List<Categoria> listarCategorias();

    CategoriaDTO getCategoriaDTOById(Categoria categoria);

}
