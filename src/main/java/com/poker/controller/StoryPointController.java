package com.poker.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.poker.dao.StoryPointDao;
import com.poker.domain.StoryPoint;

@RestController
@RequestMapping("/api/storypoint")
public class StoryPointController {

	@Autowired
	private StoryPointDao storyPointDao;
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public StoryPoint create(@RequestBody @Valid StoryPoint storyPoint) {
		StoryPoint s = storyPointDao.save(storyPoint);
		
		simpMessagingTemplate.convertAndSend("/topic/tm/storypoint", s);
		return s;
	}
}
