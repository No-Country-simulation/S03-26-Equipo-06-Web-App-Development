package com.nocountry.cms.repositories;

import com.nocountry.cms.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITagRepository extends JpaRepository<Tag, Integer> {
}
