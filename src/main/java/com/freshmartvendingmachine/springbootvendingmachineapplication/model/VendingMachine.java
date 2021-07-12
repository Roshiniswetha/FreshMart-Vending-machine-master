package com.freshmartvendingmachine.springbootvendingmachineapplication.model;

import javax.persistence.*;


@Entity
@Table(name="tbl_fruits")
public class VendingMachine {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private String name;
	
	@Column
	private int quantity ;
	
	@Column
	private String calories;
	
	@Column
	private int lifetime;
	
	@Column
	private int cost;

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getCalories() {
		return calories;
	}

	public void setCalories(String calories) {
		this.calories = calories;
	}

	public int getLifetime() {
		return lifetime;
	}

	public void setLifetime(int lifetime) {
		this.lifetime = lifetime;
	}

	@Override
	public String toString() {
		return "VendingMachine [id=" + id + ", name=" + name + ", quantity=" + quantity + ", calories=" + calories
				+ ", lifetime=" + lifetime + ", cost=" + cost + "]";
	}

	
		
}
