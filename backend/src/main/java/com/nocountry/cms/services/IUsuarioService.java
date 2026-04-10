package com.nocountry.cms.services;

import com.nocountry.cms.dto.AuthRequestDTO;
import com.nocountry.cms.dto.AuthResponseDTO;
import com.nocountry.cms.dto.RegistroRequestDTO;

public interface IUsuarioService {

    public AuthResponseDTO login(AuthRequestDTO request);

    public AuthResponseDTO registrar(RegistroRequestDTO request);

}
