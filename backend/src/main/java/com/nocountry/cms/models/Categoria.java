package com.nocountry.cms.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_categoria;
    private String nombre;
    private String descripcion;
    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn (name = "id_testimonio")
    @JsonIgnore
    private List<Testimonio> lista_testimonios;

}
