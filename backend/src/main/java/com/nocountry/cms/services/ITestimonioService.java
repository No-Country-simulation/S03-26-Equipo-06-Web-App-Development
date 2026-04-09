package com.nocountry.cms.services;

import com.nocountry.cms.models.Testimonio;

import java.util.List;

public interface ITestimonioService {

     void createTestimonio(Testimonio testimonio);

     List<Testimonio> getTestimonios();

     Testimonio getTestimonioById(Integer id);

     String deleteTestimonioById(Integer id);

     Testimonio updateTestimonio(Testimonio testimonio);

}
