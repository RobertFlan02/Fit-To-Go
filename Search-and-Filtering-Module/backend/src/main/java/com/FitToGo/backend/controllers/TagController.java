package com.FitToGo.backend.controllers;

import com.FitToGo.backend.models.Tag;
import com.FitToGo.backend.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping
    public List<Tag> getTags() {
        return tagService.getAllTags();
    }
}