package com.nocountry.cms.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_usuario;
    private String nombre;
    private String correo;
    private String password;
    private String rol;
    private String estado;
    private LocalDate fecha_creacion;
    @OneToMany
    @JoinColumn (name = "id_testimonio")
    @JsonIgnore
    private List<Testimonio> lista_testimonios;

}
