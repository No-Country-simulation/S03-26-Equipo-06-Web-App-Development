package com.nocountry.cms.services;

import com.nocountry.cms.models.Testimonio;

import java.util.List;
import java.util.UUID;

public interface ITestimonioService {

     void createTestimonio(Testimonio testimonio);

     List<Testimonio> getTestimonios();

     Testimonio getTestimonioById(Integer id);

     String deleteTestimonioById(Integer id);

     Testimonio updateTestimonio(Testimonio testimonio);

}
