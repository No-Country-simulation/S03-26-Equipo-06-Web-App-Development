package com.nocountry.cms.services;

import com.nocountry.cms.models.Testimonio;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface ITestimonioService {

     void createTestimonio(Testimonio testimonio, HttpServletRequest request);

     List<Testimonio> getTestimonios();

     Testimonio getTestimonioById(Integer id);

     String deleteTestimonioById(Integer id);

     Testimonio updateTestimonio(Testimonio testimonio);

}
