package com.nocountry.cms.controllers;

import com.nocountry.cms.dto.response.ApiResponse;
import com.nocountry.cms.dto.response.ResponseBuilder;
import com.nocountry.cms.models.Testimonio;
import com.nocountry.cms.services.ITestimonioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class TestimonioController {

    @Autowired
    private ITestimonioService testimonioService;

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_EDITOR', 'ROLE_USUARIOREGISTRADO')")
    @PostMapping("/testimonios")
    public ResponseEntity<ApiResponse<String>> createTestimonio(@RequestBody Testimonio nuevoTestimonio) {

        testimonioService.createTestimonio(nuevoTestimonio);

        Integer id = nuevoTestimonio.getId_testimonio();

        return ResponseBuilder.created("Testimonio creado correctamente.", String.valueOf(id));
    }

    // Público en SecurityConfig, no requiere @PreAuthorize
    @GetMapping("/testimonios")
    public ResponseEntity<ApiResponse<List<Testimonio>>> getTestimonios(){

        return ResponseBuilder.success("OK", testimonioService.getTestimonios());
    }

    // Público en SecurityConfig
    @GetMapping("/testimonios/{id}")
    public ResponseEntity<ApiResponse<Testimonio>> getUnTestimonio(@PathVariable Integer id){

        return ResponseBuilder.success("OK", testimonioService.getTestimonioById(id));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/testimonios/eliminar/{id}")
    public ResponseEntity<ApiResponse<String>> eliminar(@PathVariable Integer id){
        testimonioService.deleteTestimonioById(id);

        return ResponseBuilder.success("OK", "Testimonio eliminado correctamente.");
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_EDITOR')")
    @PutMapping("/testimonios/editar")
    public ResponseEntity<ApiResponse<Testimonio>> editar(@RequestBody Testimonio nuevoTestimonio){
        testimonioService.updateTestimonio(nuevoTestimonio);

        return ResponseBuilder.success("OK", testimonioService.getTestimonioById(nuevoTestimonio.getId_testimonio()));
    }

}
