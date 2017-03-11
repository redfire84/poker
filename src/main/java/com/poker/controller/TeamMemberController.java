package com.poker.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.poker.dao.TeamMemberDao;
import com.poker.domain.TeamMember;

@RestController
@RequestMapping("/api/teammember")
public class TeamMemberController {

	@Autowired
	private TeamMemberDao teamMemberDao;
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public TeamMember create(@RequestBody @Valid TeamMember teamMember) {
		TeamMember tm = teamMemberDao.save(teamMember);
		
		simpMessagingTemplate.convertAndSend("/topic/tm/join", tm);
		return tm;
	}
}
