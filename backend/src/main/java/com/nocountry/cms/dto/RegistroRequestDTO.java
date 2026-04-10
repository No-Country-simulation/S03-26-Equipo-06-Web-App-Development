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

//eyJhbGciOiJIUzI1NiJ9.eyJyb2wiOiJST0xFX0FETUlOIiwic3ViIjoibmFjaG9AbWFpbC5jb20iLCJpYXQiOjE3NzU3ODM1MjksImV4cCI6MTc3NTg2OTkyOX0.ytiA4eWsEsbE-U5smGIdWQxc6SgJd1Qk2itufPZZnVY