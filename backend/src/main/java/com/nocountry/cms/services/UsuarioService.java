package com.nocountry.cms.services;

import com.nocountry.cms.dto.AuthRequestDTO;
import com.nocountry.cms.dto.AuthResponseDTO;
import com.nocountry.cms.dto.RegistroRequestDTO;
import com.nocountry.cms.dto.UsuarioDTO;
import com.nocountry.cms.models.Usuario;
import com.nocountry.cms.repositories.IUsuarioRepository;
import com.nocountry.cms.security.JwtUtil;
import com.nocountry.cms.security.UserDetailsServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService implements IUsuarioService{

    private final IUsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    public AuthResponseDTO login(AuthRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getCorreo(), request.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getCorreo());
        String token = jwtUtil.generarToken(userDetails);
        return new AuthResponseDTO(token);
    }

    @Override
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

    @Override
    public Usuario loadUserByCorreo(HttpServletRequest request){

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String correo = jwtUtil.extraerUsername(token);

            return usuarioRepository.findByCorreo(correo)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        } else  {
            throw new RuntimeException("No se encontro el usuario");
        }
    }

    @Override
    public List<UsuarioDTO> listarUsuarios() {
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        List<UsuarioDTO> usuarios = new ArrayList<>();

        for (Usuario usuario : usuarioRepository.findAll()) {
            usuarioDTO.setId(usuario.getId_usuario());
            usuarioDTO.setNombre(usuario.getNombre());
            usuarioDTO.setRol(usuario.getRol());

            usuarios.add(usuarioDTO);
        }

        return usuarios;
    }

    @Override
    public Usuario getUserById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public UsuarioDTO getUserDTOById(Usuario usuario) {
        UsuarioDTO usuarioDTO = new UsuarioDTO();

        usuarioDTO.setId(usuario.getId_usuario());
        usuarioDTO.setNombre(usuario.getNombre());
        usuarioDTO.setRol(usuario.getRol());

        return usuarioDTO;
    }


}
