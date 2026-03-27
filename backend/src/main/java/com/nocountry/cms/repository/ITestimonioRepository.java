package com.nocountry.cms.repository;

import com.nocountry.cms.model.Testimonio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITestimonioRepository extends JpaRepository<Testimonio, Long> {
}
