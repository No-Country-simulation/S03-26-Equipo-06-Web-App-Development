package com.nocountry.cms.controllers;

import com.nocountry.cms.dto.AuthRequestDTO;
import com.nocountry.cms.dto.AuthResponseDTO;
import com.nocountry.cms.dto.RegistroRequestDTO;
import com.nocountry.cms.services.IUsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UsuarioController {

    private final IUsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AuthRequestDTO request) {
        return ResponseEntity.ok(usuarioService.login(request));
    }

    @PostMapping("/registro")
    public ResponseEntity<AuthResponseDTO> registrar(@Valid @RequestBody RegistroRequestDTO request) {
        return ResponseEntity.ok(usuarioService.registrar(request));
    }
}
