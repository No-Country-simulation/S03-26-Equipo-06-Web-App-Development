package com.nocountry.cms.services;

import com.nocountry.cms.config.CloudinaryAPI;
import com.nocountry.cms.models.Testimonio;
import com.nocountry.cms.repositories.ITestimonioRepository;
import jakarta.servlet.http.HttpServletRequest;
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
    @Autowired
    IUsuarioService usuarioService;

    @Override
    public void createTestimonio(Testimonio nuevoTestimonio, HttpServletRequest request) {

        nuevoTestimonio.setId_usuario(usuarioService.loadUserByCorreo(request));

        if (nuevoTestimonio.getImagen_url() != null) {
            nuevoTestimonio.setImagen_url(cloudinary.uploadImage(nuevoTestimonio.getImagen_url()));
        }

        // ========== NUEVO: Procesar video de YouTube ==========
        procesarVideoYouTube(nuevoTestimonio);
        // ====================================================

        nuevoTestimonio.setFecha_creacion(LocalDateTime.now());

        testimonioRepo.save(nuevoTestimonio);
    }

    // ========== NUEVO MÉTODO: Procesar YouTube ==========
    private void procesarVideoYouTube(Testimonio testimonio) {
        String videoUrl = testimonio.getVideo_url();

        if (videoUrl != null && !videoUrl.isEmpty()) {
            // Extraer ID del video
            String videoId = youTubeService.extractVideoId(videoUrl);

            if (videoId != null) {
                // Guardar información de YouTube
                testimonio.setYoutube_video_id(videoId);
                testimonio.setYoutube_embed_url(youTubeService.getEmbedUrl(videoId));
                testimonio.setYoutube_thumbnail(youTubeService.getThumbnailUrl(videoId));

                // Opcional: Puedes agregar más información si la obtienes de una API
                // Por ahora guardamos la URL original como título temporal
                testimonio.setYoutube_titulo("Video de YouTube");
                testimonio.setYoutube_canal("YouTube");
            }
        }
    }
    // ====================================================

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

            // ========== NUEVO: Actualizar también YouTube ==========
            if (testimonio.getVideo_url() != null && !testimonio.getVideo_url().equals(edit.getVideo_url())) {
                procesarVideoYouTube(edit);
            }
            // ====================================================

            return testimonioRepo.save(edit);   }   else  {
            return null;

        }

    }


}
