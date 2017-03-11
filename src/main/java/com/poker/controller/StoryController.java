package com.poker.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.poker.dao.StoryDao;
import com.poker.domain.Story;

@RestController
@RequestMapping("/api/story")
public class StoryController {

	@Autowired
	private StoryDao storyDao;
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public Story create(@RequestBody @Valid Story story) {
		Story s = storyDao.save(story);
		
		simpMessagingTemplate.convertAndSend("/topic/sm/story", s);
		return s;
	}
}
