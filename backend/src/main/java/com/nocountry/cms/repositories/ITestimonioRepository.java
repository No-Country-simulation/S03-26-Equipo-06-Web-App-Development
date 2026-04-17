package com.nocountry.cms.repositories;

import com.nocountry.cms.models.Testimonio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITestimonioRepository extends JpaRepository<Testimonio, Long> {
}
