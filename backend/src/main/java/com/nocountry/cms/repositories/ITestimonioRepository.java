package com.nocountry.cms.repositories;

import com.nocountry.cms.models.Testimonio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ITestimonioRepository extends JpaRepository<Testimonio, Integer> {
}
