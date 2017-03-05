package com.poker.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Story extends BaseObject {

	@Id
	@GeneratedValue
	private long id;
	
	@OneToOne
	private ScrumMaster scrumMaster;

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
}
