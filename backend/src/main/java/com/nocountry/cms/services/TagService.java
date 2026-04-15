package com.nocountry.cms.services;

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
}
