package com.nocountry.cms.service;

import com.nocountry.cms.model.Testimonio;
import com.nocountry.cms.repository.ITestimonioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TestimonioService implements ITestimonioService {

    @Autowired
    ITestimonioRepository iTestimonioRepository;

    @Override
    public void createTestimonio(Testimonio nuevoTestimonio) {

        nuevoTestimonio.setFecha_creacion(LocalDate.now());
        iTestimonioRepository.save(nuevoTestimonio);
    }

    @Override
    public List<Testimonio> getTestimonios() {
        return iTestimonioRepository.findAll();
    }
}
