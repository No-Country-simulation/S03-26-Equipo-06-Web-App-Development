package com.nocountry.cms.repositories;

import com.nocountry.cms.models.Comentario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IComentarioRepository extends CrudRepository<Comentario, Long> {
}
