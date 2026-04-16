package com.nocountry.cms.services;

import com.nocountry.cms.models.Categoria;
import com.nocountry.cms.repositories.ICategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService implements ICategoriaService {

    @Autowired
    private ICategoriaRepository categoriaRepository;

    @Override
    public Categoria getCategoriaById(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("No se encontro la categoria"));
    }

    @Override
    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }


}
