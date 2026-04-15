package com.nocountry.cms.controllers;

import com.nocountry.cms.dto.TestimonioDTO;
import com.nocountry.cms.dto.response.ApiResponse;
import com.nocountry.cms.dto.response.ResponseBuilder;
import com.nocountry.cms.models.Testimonio;
import com.nocountry.cms.services.ITestimonioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TestimonioController {

    @Autowired
    private ITestimonioService testimonioService;

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_EDITOR')")
    @PostMapping("/testimonios")
    public ResponseEntity<ApiResponse<String>> createTestimonio(@RequestBody TestimonioDTO nuevoTestimonio,
                                                                HttpServletRequest request) {

        Long id = testimonioService.createTestimonio(nuevoTestimonio, request).getId_testimonio();

        return ResponseBuilder.created("Testimonio creado correctamente.", String.valueOf(id));
    }

    // Público en SecurityConfig, no requiere @PreAuthorize
    @GetMapping("/testimonios")
    public ResponseEntity<ApiResponse<List<Testimonio>>> getTestimonios(){

        return ResponseBuilder.success("OK", testimonioService.getTestimonios());
    }

    // Público en SecurityConfig
    @GetMapping("/testimonios/{id}")
    public ResponseEntity<ApiResponse<Testimonio>> getUnTestimonio(@PathVariable Long id){

        return ResponseBuilder.success("OK", testimonioService.getTestimonioById(id));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/testimonios/eliminar/{id}")
    public ResponseEntity<ApiResponse<String>> eliminar(@PathVariable Long id){
        testimonioService.deleteTestimonioById(id);

        return ResponseBuilder.success("OK", "Testimonio eliminado correctamente.");
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_EDITOR')")
    @PutMapping("/testimonios/editar/{id}")
    public ResponseEntity<ApiResponse<Testimonio>> editar(@RequestBody TestimonioDTO dto,
                                                          @PathVariable Long id){
        testimonioService.updateTestimonio(dto, id);

        return ResponseBuilder.success("OK", testimonioService.getTestimonioById(id));
    }
}
