package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freshmartvendingmachine.springbootvendingmachineapplication.model.VendingMachine;
import com.freshmartvendingmachine.springbootvendingmachineapplication.service.VendingMachineService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MainController {
	
	@Autowired
	private VendingMachineService vendingMachineService;
	
	@GetMapping("/machine")
	  public List<VendingMachine> get() {
		return vendingMachineService.get();
	   }
	
	@GetMapping("/machine/{id}")
	public VendingMachine get(@PathVariable int id) {
		VendingMachine vendingMachineObj= vendingMachineService.get(id);
		if(vendingMachineObj==null) {
			throw new RuntimeException("Employee with id "+id+" is not found");
		}
		return vendingMachineObj;
	}
	
	@PostMapping("/machine")
	public VendingMachine save(@RequestBody VendingMachine vendingMachineObj) {
		 vendingMachineService.save(vendingMachineObj);
		 return vendingMachineObj;
	}
	
	@PutMapping("/machine")
	public VendingMachine update(@RequestBody VendingMachine vendingMachineObj){
		{
			vendingMachineService.save(vendingMachineObj);
			return vendingMachineObj;
	}
		
	}
	
	@DeleteMapping("/machine/{id}")
	public String delete(@PathVariable int id) {
		vendingMachineService.delete(id);
		return "Vending Machine has been deleted with id:"+id;
	}
	
}
