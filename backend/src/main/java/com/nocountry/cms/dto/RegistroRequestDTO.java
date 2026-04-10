package com.nocountry.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroRequestDTO {
    private String nombre;
    private String correo;
    private String password;
    private String rol;
}

