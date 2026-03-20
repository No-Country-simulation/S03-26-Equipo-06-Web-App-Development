package proyect.nocountry.testimonialcms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Testimonios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long  id;
    public String nombre;
    public String titulo;
    public String contenido;
    public String categoria;

}
