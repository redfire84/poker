package com.poker.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public TeamMember create(@RequestBody TeamMember teamMember) {
		return teamMemberDao.save(teamMember);
	}
}
