package com.nocountry.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComentarioRequestDTO {

    private Long testimonio_id;
    private String contenido;

}
