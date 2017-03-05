package com.poker.dao;

import org.springframework.data.repository.CrudRepository;

import com.poker.domain.Story;

public interface StoryDao extends CrudRepository<Story, Long> {

}
