package com.nocountry.cms.services;

import com.nocountry.cms.dto.AuthRequestDTO;
import com.nocountry.cms.dto.AuthResponseDTO;
import com.nocountry.cms.dto.RegistroRequestDTO;
import com.nocountry.cms.dto.UsuarioDTO;
import com.nocountry.cms.models.Usuario;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface IUsuarioService {

    AuthResponseDTO login(AuthRequestDTO request);

    AuthResponseDTO registrar(RegistroRequestDTO request);

    Usuario loadUserByCorreo(HttpServletRequest request);

    List<Usuario> listarUsuarios();

    List<UsuarioDTO> listarUsuariosDTO();

    Usuario getUserById(Long id);

    UsuarioDTO getUserDTOById(Usuario usuario);
}
