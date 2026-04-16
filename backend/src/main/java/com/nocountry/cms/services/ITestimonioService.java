package com.nocountry.cms.services;

import com.nocountry.cms.dto.TestimonioDTO;
import com.nocountry.cms.dto.TestimonioDTOResponse;
import com.nocountry.cms.models.Testimonio;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface ITestimonioService {

     Testimonio createTestimonio(TestimonioDTO dto, HttpServletRequest request);

     List<TestimonioDTOResponse> getTestimonios();

     TestimonioDTOResponse getTestimonioById(Long id);

     String deleteTestimonioById(Long id);

     Testimonio updateTestimonio(TestimonioDTO dto, Long id);

}
