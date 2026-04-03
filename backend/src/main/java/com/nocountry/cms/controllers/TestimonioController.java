package com.nocountry.cms.controllers;

import com.nocountry.cms.dto.response.ApiResponse;
import com.nocountry.cms.dto.response.ResponseBuilder;
import com.nocountry.cms.models.Testimonio;
import com.nocountry.cms.services.ITestimonioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class TestimonioController {

    @Autowired
    private ITestimonioService testimonioService;

    @PostMapping("/testimonios")
    public ResponseEntity<ApiResponse<String>> createTestimonio(@RequestBody Testimonio nuevoTestimonio) {

        testimonioService.createTestimonio(nuevoTestimonio);

        UUID id = nuevoTestimonio.getId();

        return ResponseBuilder.created("Testimonio creado correctamente.", String.valueOf(id));
    }

    @GetMapping("/testimonios")
    public ResponseEntity<ApiResponse<List<Testimonio>>> getTestimonios(){

        return ResponseBuilder.success("OK", testimonioService.getTestimonios());
    }

    @GetMapping("/testimonios/{id}")
    public ResponseEntity<ApiResponse<Testimonio>> getUnTestimonio(@PathVariable UUID id){

        return ResponseBuilder.success("OK", testimonioService.getTestimonioById(id));
    }

    @DeleteMapping("/testimonios/eliminar/{id}")
    public ResponseEntity<ApiResponse<String>> eliminar(@PathVariable UUID id){
        testimonioService.deleteTestimonioById(id);

        return ResponseBuilder.success("OK", "Testimonio eliminado correctamente.");
    }

    @PutMapping("/testimonios/editar")
    public ResponseEntity<ApiResponse<Testimonio>> editar(@RequestBody Testimonio nuevoTestimonio){
        testimonioService.updateTestimonio(nuevoTestimonio);

        return ResponseBuilder.success("OK", testimonioService.getTestimonioById(nuevoTestimonio.getId()));
    }

}
