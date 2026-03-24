package com.nocountry.cms.controller;

import com.nocountry.cms.dto.response.SuccessResponse;
import com.nocountry.cms.model.Testimonio;
import com.nocountry.cms.service.ITestimonioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestimonioController {

    @Autowired
    private ITestimonioService testimonioService;

    @PostMapping("/testimonios")
    public ResponseEntity<SuccessResponse<Long>> createTestimonio(@RequestBody Testimonio nuevoTestimonio) {

        testimonioService.createTestimonio(nuevoTestimonio);

        Long id = nuevoTestimonio.getId();

        return ResponseEntity.ok(
                new SuccessResponse<>(200, "Testimonio creado correctamente.", id)
        );
    }
}
