package com.nocountry.cms.services;

import com.nocountry.cms.config.CloudinaryAPI;
import com.nocountry.cms.models.Testimonio;
import com.nocountry.cms.services.YouTubeAPIService;
import com.nocountry.cms.models.YoutubeVideo;
import com.nocountry.cms.repositories.ITestimonioRepository;
import com.nocountry.cms.dto.response.YouTubeVideoInfoDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    // 20260414-1131 - API youtube
    @Autowired
    private YouTubeAPIService youTubeAPIService;

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
        if(testimonio.getVideo_url() == null || testimonio.getVideo_url().isEmpty()) {
            testimonio.setYoutubeVideo(null);
            return;
        }
        String videoUrl = testimonio.getVideo_url();

        if (videoUrl != null && !videoUrl.isEmpty()) {
            String videoId = youTubeAPIService.extractVideoId(videoUrl);

            if (videoId != null) {
                YouTubeVideoInfoDTO videoInfo = youTubeAPIService.getVideoInfo(videoUrl);
                YoutubeVideo video = ToYoutubeVideo(videoInfo);
                testimonio.setYoutubeVideo(video);
            }
        }
    }
    private YoutubeVideo ToYoutubeVideo(YouTubeVideoInfoDTO videoInfo) {
        YoutubeVideo video = new YoutubeVideo();

        video.setTitle(videoInfo.getTitle());
        video.setDescription(videoInfo.getDescription());
        video.setChannelTitle(videoInfo.getChannelTitle());
        video.setChannelId(videoInfo.getChannelId());
        video.setThumbnailMaxRes(videoInfo.getThumbnailMaxRes());
        video.setThumbnailHigh(videoInfo.getThumbnailHigh());
        video.setThumbnailMedium(videoInfo.getThumbnailMedium());
        video.setThumbnailDefault(videoInfo.getThumbnailDefault());
        video.setEmbedUrl(videoInfo.getEmbedUrl());
        video.setDuration(videoInfo.getDuration());
        video.setViewCount(videoInfo.getViewCount());
        video.setPublishedAt(videoInfo.getPublishedAt());
        video.setIsValid(videoInfo.getIsValid());

        return video;
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
            boolean videoChanged = !testimonio.getVideo_url().equals(edit.getVideo_url());

            edit.setId_usuario(testimonio.getId_usuario());
            edit.setTitulo(testimonio.getTitulo());
            edit.setContenido(testimonio.getContenido());
            edit.setId_categoria(testimonio.getId_categoria());
            edit.setTags(testimonio.getTags());
            edit.setEstado(testimonio.getEstado());
            edit.setImagen_url(testimonio.getImagen_url());
            edit.setVideo_url(testimonio.getVideo_url());
            
            // ========== NUEVO: Actualizar también YouTube ==========
            if (videoChanged) {
                procesarVideoYouTube(edit);
            }
            // ====================================================

            return testimonioRepo.save(edit);
        } else {
            return null;
        }
    }
}