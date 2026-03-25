package com.nocountry.cms.service;

import com.nocountry.cms.model.Testimonio;

import java.util.List;

public interface ITestimonioService {

     void createTestimonio(Testimonio testimonio);
     List<Testimonio> getTestimonios();

}
