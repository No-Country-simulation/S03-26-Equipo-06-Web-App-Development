package com.nocountry.cms.services;

import com.nocountry.cms.config.CloudinaryAPI;
import com.nocountry.cms.dto.TestimonioDTO;
import com.nocountry.cms.dto.TestimonioDTOResponse;
import com.nocountry.cms.models.Testimonio;
import com.nocountry.cms.repositories.ITestimonioRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cloudinary.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TestimonioService implements ITestimonioService {

    @Autowired
    ITestimonioRepository testimonioRepo;
    @Autowired
    CloudinaryAPI cloudinary;
    @Autowired
    IUsuarioService usuarioService;
    @Autowired
    ICategoriaService categoriaService;
    @Autowired
    ITagService tagService;

    @Override
    public Testimonio createTestimonio(TestimonioDTO dto, HttpServletRequest request) {

        Testimonio nuevoTestimonio = new Testimonio();

        nuevoTestimonio.setId_usuario(usuarioService.loadUserByCorreo(request));
        nuevoTestimonio.setTitulo(dto.getTitulo());
        nuevoTestimonio.setContenido(dto.getContenido());
        nuevoTestimonio.setEstado(dto.getEstado());
        if (dto.getImagen_url() != null) {
            nuevoTestimonio.setImagen_url(cloudinary.uploadImage(dto.getImagen_url()));
        }
        nuevoTestimonio.setVideo_url(dto.getVideo_url());
        nuevoTestimonio.setCategoria(categoriaService.getCategoriaById(dto.getCategoria_id()));
        nuevoTestimonio.setTags(tagService.getTagList(dto.getTags()));

        nuevoTestimonio.setFecha_creacion(LocalDateTime.now());

        return testimonioRepo.save(nuevoTestimonio);
    }

    @Override
    public List<TestimonioDTOResponse> getTestimonios() {
        List<Testimonio> testimonios = testimonioRepo.findAll();
        List<TestimonioDTOResponse> listaTestimonios = new ArrayList<>();

        for (Testimonio testimonio : testimonios) {
            listaTestimonios.add(testimonioToDTO(testimonio));
        }

        return listaTestimonios;
    }

    @Override
    public TestimonioDTOResponse getTestimonioById(Long id) {

        Testimonio testimonio = testimonioRepo.findById(id)
                .orElseThrow(()-> new RuntimeException("No se encontro el testimonio"));

        return testimonioToDTO(testimonio);
    }

    public TestimonioDTOResponse testimonioToDTO(Testimonio testimonio) {
        TestimonioDTOResponse testimonioDTOResponse = new TestimonioDTOResponse();

        testimonioDTOResponse.setId_testimonio(testimonio.getId_testimonio());
        testimonioDTOResponse.setTitulo(testimonio.getTitulo());
        testimonioDTOResponse.setContenido(testimonio.getContenido());
        testimonioDTOResponse.setEstado(testimonio.getEstado());
        testimonioDTOResponse.setImagen_url(testimonio.getImagen_url());
        testimonioDTOResponse.setVideo_url(testimonio.getVideo_url());
        testimonioDTOResponse.setFecha_creacion(testimonio.getFecha_creacion());
        testimonioDTOResponse.setUsuario(usuarioService.getUserDTOById(testimonio.getId_usuario()));
        testimonioDTOResponse.setTags(tagService.listarTags(testimonio.getTags()));
        testimonioDTOResponse.setCategoria(categoriaService.getCategoriaDTOById(testimonio.getCategoria()));

        return testimonioDTOResponse;
    }

    @Override
    public String deleteTestimonioById(Long id) {
        testimonioRepo.deleteById(id);
        return "Testimonio eliminado correctamente";
    }

    @Override
    public Testimonio updateTestimonio(TestimonioDTO dto, Long id) {
        Testimonio edit = testimonioRepo.findById(id)
                .orElseThrow(()-> new RuntimeException("No se encontro el testimonio"));


            edit.setTitulo(dto.getTitulo());
            edit.setContenido(dto.getContenido());
            edit.setEstado(dto.getEstado());
            if (dto.getImagen_url() != null) {
                edit.setImagen_url(cloudinary.uploadImage(dto.getImagen_url()));
            }
            edit.setVideo_url(dto.getVideo_url());
            edit.setCategoria(categoriaService.getCategoriaById(dto.getCategoria_id()));
            edit.setTags(tagService.getTagList(dto.getTags()));

            return testimonioRepo.save(edit);

    }


}
