package com.nocountry.cms.controllers;

import com.nocountry.cms.dto.response.ApiResponse;
import com.nocountry.cms.dto.response.ResponseBuilder;
import com.nocountry.cms.services.IComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ComentarioController {

//    @Autowired
//    IComentarioService comentarioService;
//
//    @PostMapping("/api/comentar")
//    public ResponseEntity<ApiResponse<String>> crearComentario(@RequestBody String contenido) {
//        comentarioService.crearComentario(contenido);
//
//        return ResponseBuilder.created("OK", "Testimonio creado correctamente.");
//    }

}
