package com.freshmartvendingmachine.springbootvendingmachineapplication.dao;

import java.util.List;

import javax.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.freshmartvendingmachine.springbootvendingmachineapplication.model.VendingMachine;

@Repository
public class VendingMachineDAOImpl implements VendingMachineDAO {

	@Autowired
	private EntityManager entityManager;
	
	@Override
	public List<VendingMachine> get() {
		Session session = entityManager.unwrap(Session.class);
		Query<VendingMachine> query =session.createQuery("from VendingMachine",VendingMachine.class);
		List<VendingMachine> list= query.getResultList();
		return list;
	}

	@Override
	public VendingMachine get(int id) {
		Session session = entityManager.unwrap(Session.class);
		VendingMachine vendingMachineObj=session.get(VendingMachine.class, id);
		return vendingMachineObj;

	}

	@Override
	public void save(VendingMachine vendingMachine) {
		Session currentSession=entityManager.unwrap(Session.class);
		currentSession.saveOrUpdate(vendingMachine);
		
	}

	@Override
	public void delete(int id) {
		Session session = entityManager.unwrap(Session.class);
		VendingMachine vendingMachineObj=session.get(VendingMachine.class, id);
		session.delete(vendingMachineObj);
	}

}
