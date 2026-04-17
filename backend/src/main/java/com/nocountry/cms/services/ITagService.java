package com.nocountry.cms.services;

import com.nocountry.cms.dto.TagDTO;
import com.nocountry.cms.models.Tag;

import java.util.List;

public interface ITagService {

    void crearTag(Tag tag);

    Tag getTagById(Long id);

    List<Tag> getTagList(List<Long> ids);

    List<TagDTO> listarTags(List<Tag> tags);

    List<TagDTO> getTagDTOListById(List<Long> ids);
}
