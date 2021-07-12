package com.freshmartvendingmachine.springbootvendingmachineapplication.service;

import java.util.List;

import com.freshmartvendingmachine.springbootvendingmachineapplication.model.VendingMachine;

public interface VendingMachineService {

	List<VendingMachine> get();
	
	VendingMachine get(int id);
	
	void save(VendingMachine vendingMachine);
	
	void delete(int id);

	
}
