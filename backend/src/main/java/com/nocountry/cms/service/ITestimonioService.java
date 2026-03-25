package com.nocountry.cms.service;

import com.nocountry.cms.model.Testimonio;

import java.util.List;

public interface ITestimonioService {

    public void createTestimonio(Testimonio testimonio);
    public List<Testimonio> getTestimonios();

}
