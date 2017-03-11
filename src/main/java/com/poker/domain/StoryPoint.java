package com.poker.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
public class StoryPoint extends BaseObject {

	@Id
	@GeneratedValue
	private long id;
	
	@OneToOne
	private ScrumMaster scrumMaster;
	
	@OneToOne
	private TeamMember teamMember;
	
	@Min(0)
	@Max(9)
	private Integer point;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public ScrumMaster getScrumMaster() {
		return scrumMaster;
	}

	public void setScrumMaster(ScrumMaster scrumMaster) {
		this.scrumMaster = scrumMaster;
	}

	public TeamMember getTeamMember() {
		return teamMember;
	}

	public void setTeamMember(TeamMember teamMember) {
		this.teamMember = teamMember;
	}

	public Integer getPoint() {
		return point;
	}

	public void setPoint(Integer point) {
		this.point = point;
	}
}
