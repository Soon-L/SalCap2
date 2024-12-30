package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SalCapController {

	@GetMapping("/salcap")
	public String salcap() {
		return "index";
	}
}
