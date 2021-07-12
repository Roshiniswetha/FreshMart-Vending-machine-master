package com.freshmartvendingmachine.springbootvendingmachineapplication.dao;

import java.util.*;

import com.freshmartvendingmachine.springbootvendingmachineapplication.model.VendingMachine;

public interface VendingMachineDAO {

	List<VendingMachine> get();
	
	VendingMachine get(int id);
	
	void save(VendingMachine vendingMachine);
	
	void delete(int id);
}
