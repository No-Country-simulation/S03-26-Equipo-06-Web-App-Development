package com.nocountry.cms.service;

import com.nocountry.cms.model.Testimonio;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class TestimonioService implements ITestimonioService {


    @Override
    public void createTestimonio(Testimonio nuevoTestimonio) {

        nuevoTestimonio.setFecha_creacion(LocalDate.now());

    }
}
