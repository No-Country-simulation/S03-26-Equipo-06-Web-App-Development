package com.nocountry.cms.controllers;

import com.nocountry.cms.dto.response.ApiResponse;
import com.nocountry.cms.dto.response.ResponseBuilder;
import com.nocountry.cms.models.Categoria;
import com.nocountry.cms.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_EDITOR')")
    @GetMapping("/categorias")
    public ResponseEntity<ApiResponse<List<Categoria>>> getCategorias(){
        return ResponseBuilder.success("OK", categoriaService.listarCategorias());
    }
}
