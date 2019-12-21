package com.demo.controller;


import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/demo")
public class RestConntroller {
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	@ResponseBody
	public String demo1() {
		return "Hello !!!!";
	}
	
	@RequestMapping(value = "/hello", method = RequestMethod.GET)
	@ResponseBody
	public String demo() {
		return "Hello !!!!";
	}
	
	@RequestMapping(value = "/cutStr", method = RequestMethod.GET)
	@ResponseBody
	public String test(@RequestParam String str) {
		List<String> listStr = Arrays.asList(str.split(","));
		String returnStr = "";
		for (String str1 : listStr) {
			returnStr += str1+"\n";
		}
		return returnStr;
	}

}

	
