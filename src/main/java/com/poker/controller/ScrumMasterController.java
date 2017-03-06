package com.poker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.poker.dao.ScrumMasterDao;
import com.poker.domain.ScrumMaster;

@RestController
@RequestMapping("/api/scrummaster")
public class ScrumMasterController {

	@Autowired
	private ScrumMasterDao scrumMasterDao;
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ScrumMaster create(@RequestBody ScrumMaster scrumMaster) {
		return scrumMasterDao.save(scrumMaster);
	}
}
