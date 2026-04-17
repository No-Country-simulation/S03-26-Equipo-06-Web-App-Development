package com.nocountry.cms.services;

import com.nocountry.cms.dto.TagDTO;
import com.nocountry.cms.models.Tag;
import com.nocountry.cms.repositories.ITagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TagService implements ITagService {

    @Autowired
    ITagRepository tagRepository;

    @Override
    public void crearTag(Tag tag) {

        tagRepository.save(tag);
    }

    @Override
    public Tag getTagById(Long id) {
        return tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found"));
    }

    @Override
    public List<Tag> getTagList(List<Long> ids) {
        List<Tag> tagList = new ArrayList<>();

        for (Long count : ids){
            tagList.add(getTagById(count));
        }
        return tagList;
    }

    @Override
    public List<TagDTO> listarTags(List<Tag> tags) {
        List<TagDTO> tagDTOList = new ArrayList<>();
        TagDTO tagDTO = new TagDTO();

        for (Tag tag : tags){
            tagDTO.setId(tag.getId_tag());
            tagDTO.setNombre(tag.getNombre());
            tagDTOList.add(tagDTO);
        }
        return tagDTOList;
    }

    @Override
    public List<TagDTO> getTagDTOListById(List<Long> ids) {
        TagDTO tagDTO = new TagDTO();
        List<TagDTO> tagDTOList = new ArrayList<>();
        Tag tag;

        for(Long cnt : ids){
            tag = getTagById(cnt);
            tagDTO.setId(tag.getId_tag());
            tagDTO.setNombre(tag.getNombre());

            tagDTOList.add(tagDTO);
        }

        return tagDTOList;
    }


}
