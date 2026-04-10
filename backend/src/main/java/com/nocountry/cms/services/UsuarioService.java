package com.nocountry.cms.services;

import com.nocountry.cms.dto.AuthRequestDTO;
import com.nocountry.cms.dto.AuthResponseDTO;
import com.nocountry.cms.dto.RegistroRequestDTO;
import com.nocountry.cms.models.Usuario;
import com.nocountry.cms.repositories.IUsuarioRepository;
import com.nocountry.cms.security.JwtUtil;
import com.nocountry.cms.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UsuarioService implements IUsuarioService{

    private final IUsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;

    public AuthResponseDTO login(AuthRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getCorreo(), request.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getCorreo());
        String token = jwtUtil.generarToken(userDetails);
        return new AuthResponseDTO(token);
    }

    public AuthResponseDTO registrar(RegistroRequestDTO request) {
        if (usuarioRepository.findByCorreo(request.getCorreo()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado.");
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(request.getNombre());
        nuevoUsuario.setCorreo(request.getCorreo());
        nuevoUsuario.setPassword(passwordEncoder.encode(request.getPassword()));
        
        String rolAsignado = request.getRol() != null && !request.getRol().isEmpty() ? request.getRol() : "usuariovisitante";
        nuevoUsuario.setRol(rolAsignado.toLowerCase());
        
        nuevoUsuario.setEstado("activo");
        nuevoUsuario.setFecha_creacion(LocalDate.now());

        usuarioRepository.save(nuevoUsuario);

        UserDetails userDetails = userDetailsService.loadUserByUsername(nuevoUsuario.getCorreo());
        String token = jwtUtil.generarToken(userDetails);
        return new AuthResponseDTO(token);
    }
}
