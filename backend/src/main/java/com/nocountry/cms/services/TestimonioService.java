package com.nocountry.cms.services;

import com.nocountry.cms.config.CloudinaryAPI;
import com.nocountry.cms.models.Testimonio;
import com.nocountry.cms.repositories.ITestimonioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cloudinary.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class TestimonioService implements ITestimonioService {

    @Autowired
    ITestimonioRepository testimonioRepo;
    @Autowired
    CloudinaryAPI cloudinary;

    @Override
    public void createTestimonio(Testimonio nuevoTestimonio) {

        cloudinary.uploadImage(nuevoTestimonio.getImagen_url());

        nuevoTestimonio.setFecha_creacion(LocalDate.now());

        testimonioRepo.save(nuevoTestimonio);
    }

    @Override
    public List<Testimonio> getTestimonios() {

        return testimonioRepo.findAll();
    }

    @Override
    public Testimonio getTestimonioById(UUID id) {

        return testimonioRepo.findById(id).orElse(null);
    }

    @Override
    public String deleteTestimonioById(UUID id) {
        testimonioRepo.deleteById(id);
        return "Testimonio eliminado correctamente";
    }

    @Override
    public Testimonio updateTestimonio(Testimonio testimonio) {
        Testimonio edit = testimonioRepo.findById(testimonio.getId()).orElse(null);

        if(edit != null) {
            edit.setAutor(testimonio.getAutor());
            edit.setTitulo(testimonio.getTitulo());
            edit.setContenido(testimonio.getContenido());
            edit.setCategoria(testimonio.getCategoria());
            edit.setTags(testimonio.getTags());
            edit.setEstado(testimonio.getEstado());
            edit.setImagen_url(testimonio.getImagen_url());
            edit.setVideo_url(testimonio.getVideo_url());

            return testimonioRepo.save(edit);
        }   else  return null;
    }


}
