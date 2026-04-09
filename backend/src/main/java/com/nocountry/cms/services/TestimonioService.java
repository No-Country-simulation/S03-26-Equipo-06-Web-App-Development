package com.nocountry.cms.services;

import com.nocountry.cms.config.CloudinaryAPI;
import com.nocountry.cms.models.Testimonio;
import com.nocountry.cms.repositories.ITestimonioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cloudinary.*;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TestimonioService implements ITestimonioService {

    @Autowired
    ITestimonioRepository testimonioRepo;
    @Autowired
    CloudinaryAPI cloudinary;

    @Override
    public void createTestimonio(Testimonio nuevoTestimonio) {

        cloudinary.uploadImage(nuevoTestimonio.getImagen_url());

        nuevoTestimonio.setFecha_creacion(LocalDateTime.now());

        testimonioRepo.save(nuevoTestimonio);
    }

    @Override
    public List<Testimonio> getTestimonios() {

        return testimonioRepo.findAll();
    }

    @Override
    public Testimonio getTestimonioById(Integer id) {

        return testimonioRepo.findById(id).orElse(null);
    }

    @Override
    public String deleteTestimonioById(Integer id) {
        testimonioRepo.deleteById(id);
        return "Testimonio eliminado correctamente";
    }

    @Override
    public Testimonio updateTestimonio(Testimonio testimonio) {
        Testimonio edit = testimonioRepo.findById(testimonio.getId_testimonio()).orElse(null);

        if(edit != null) {
            edit.setId_usuario(testimonio.getId_usuario());
            edit.setTitulo(testimonio.getTitulo());
            edit.setContenido(testimonio.getContenido());
            edit.setId_categoria(testimonio.getId_categoria());
            edit.setTags(testimonio.getTags());
            edit.setEstado(testimonio.getEstado());
            edit.setImagen_url(testimonio.getImagen_url());
            edit.setVideo_url(testimonio.getVideo_url());

            return testimonioRepo.save(edit);   }   else  {
            return null;

        }

    }


}
