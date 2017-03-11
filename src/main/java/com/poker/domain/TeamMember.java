package com.poker.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class TeamMember extends BaseObject {

	@Id
	@GeneratedValue
	private long id;
	
	@NotNull
	@Column(nullable = false, length = 15)
	@Size(min = 1, max = 15)
	private String name;
	
	@OneToOne
	private ScrumMaster scrumMaster;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ScrumMaster getScrumMaster() {
		return scrumMaster;
	}

	public void setScrumMaster(ScrumMaster scrumMaster) {
		this.scrumMaster = scrumMaster;
	}
}
