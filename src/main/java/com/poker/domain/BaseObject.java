package com.poker.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@MappedSuperclass
public abstract class BaseObject {

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date modDate = new Date();
}
