package com.freshmartvendingmachine.springbootvendingmachineapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication

@ComponentScan("controller")
@ComponentScan("com.freshmartvendingmachine.springbootvendingmachineapplication.dao")
@ComponentScan("com.freshmartvendingmachine.springbootvendingmachineapplication.model")
@ComponentScan("com.freshmartvendingmachine.springbootvendingmachineapplication.service")
public class SpringBootVendingmachineApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootVendingmachineApplication.class, args);
	}

}
