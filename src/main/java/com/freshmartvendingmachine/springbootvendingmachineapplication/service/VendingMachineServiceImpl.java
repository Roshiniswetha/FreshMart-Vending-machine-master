package com.freshmartvendingmachine.springbootvendingmachineapplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.freshmartvendingmachine.springbootvendingmachineapplication.dao.VendingMachineDAO;
import com.freshmartvendingmachine.springbootvendingmachineapplication.model.VendingMachine;

@Service
public class VendingMachineServiceImpl implements VendingMachineService {

	@Autowired
	private VendingMachineDAO vendingMachineDAO;
	
	@Transactional
	@Override
	public List<VendingMachine> get() {
		return vendingMachineDAO.get();
	}

	@Transactional
	@Override
	public VendingMachine get(int id) {
		return vendingMachineDAO.get(id);
	}

	@Transactional
	@Override
	public void save(VendingMachine vendingMachine) {
		vendingMachineDAO.save(vendingMachine);
		
	}

	@Transactional
	@Override
	public void delete(int id) {
		vendingMachineDAO.delete(id);
		
	}

}
