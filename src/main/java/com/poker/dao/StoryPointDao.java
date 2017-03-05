package com.poker.dao;

import org.springframework.data.repository.CrudRepository;

import com.poker.domain.StoryPoint;

public interface StoryPointDao extends CrudRepository<StoryPoint, Long> {

}
