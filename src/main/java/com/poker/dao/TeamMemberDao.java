package com.poker.dao;

import org.springframework.data.repository.CrudRepository;

import com.poker.domain.TeamMember;

public interface TeamMemberDao extends CrudRepository<TeamMember, Long> {

}
