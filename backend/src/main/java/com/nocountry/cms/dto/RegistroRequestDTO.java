package com.nocountry.cms.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroRequestDTO {
    @NotBlank
    private String nombre;
    @NotBlank
    @Email
    @Pattern(
            regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
            message = "Formato de correo inválido"
    )
    private String correo;
    @NotBlank
    private String password;
    @NotBlank
    private String rol;
}

//eyJhbGciOiJIUzI1NiJ9.eyJyb2wiOiJST0xFX1VTVUFSSU9WSVNJVEFOVEUiLCJzdWIiOiJuYWNob0BtYWlsLmNvbSIsImlhdCI6MTc3NTg3MTk4NCwiZXhwIjoxNzc1OTU4Mzg0fQ.K0IvfiRXwDR0HLyUojUP95ovIL08kG6GLZsRR-zXKiQ