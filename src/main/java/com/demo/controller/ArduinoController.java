package com.demo.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.demo.output.Arduino;
import com.demo.output.ArduinoInfo;
import com.demo.output.ArduinoSearch;
import com.demo.output.SensorInfo;
@Controller
@CrossOrigin(origins = {"http://springiotfrontend-env.uvdm7hsviy.us-east-1.elasticbeanstalk.com/arduino"})
@RequestMapping("/arduino")
public class ArduinoController {
													
	static final String URL_ARDUINO = "http://springiotwebservice-env.ja3gttg4b6.us-east-1.elasticbeanstalk.com/arduino";
//	static final String URL_ARDUINO = "http://localhost:3000/arduino";
	
	private RestTemplate restTemplate = new RestTemplate();
	
	@RequestMapping(value="",method = RequestMethod.GET)
	public String getArduinoPage() {
		return "arduino";
	}
	
	@RequestMapping(value="/all",method = RequestMethod.GET)
	@ResponseBody
	public List<Arduino> getAllArduinoLogs() {
		Arduino[] list = restTemplate.getForObject(URL_ARDUINO + "/all", Arduino[].class);
		return Arrays.asList(list);
	}
	
	@RequestMapping(value="/status",method = RequestMethod.GET)
	@ResponseBody
	public int getStatus() {
		return restTemplate.getForObject(URL_ARDUINO + "/status", Integer.class);
	}
	
	@RequestMapping(value="/change-status",method = RequestMethod.POST)
	@ResponseBody
	public int changeStatus(@RequestParam("status")int status) {
		return restTemplate.postForObject(URL_ARDUINO + "/change-status?status="+status, new HttpEntity<>(""), Integer.class);
	}
	
	@RequestMapping(value="/search",method = RequestMethod.GET)
	@ResponseBody
	public List<Arduino> searchByTime(@RequestBody ArduinoSearch search) {
		HttpEntity<Object> request = new HttpEntity<>(search);
		Arduino[] list = restTemplate.postForObject(URL_ARDUINO + "/search",request, Arduino[].class);
		return Arrays.asList(list);
	}
	
	@RequestMapping(value="/arduino-info",method = RequestMethod.GET)
	@ResponseBody
	public ArduinoInfo getArduinoInfo(@RequestParam(name="id")int id) {
		return restTemplate.getForObject(URL_ARDUINO + "/arduino-info?id="+id, ArduinoInfo.class);
	}
	@RequestMapping(value="/sensor-info",method = RequestMethod.GET)
	@ResponseBody
	public SensorInfo getSensorInfo(@RequestParam(name="id")int id) {
		return restTemplate.getForObject(URL_ARDUINO + "/sensor-info?id="+id, SensorInfo.class);
	}
	
	@RequestMapping(value="/log-page",method = RequestMethod.GET)
	public String getLogPage() {
		return "arduino-log";
	}
	
	@RequestMapping(value="/live-page",method = RequestMethod.GET)
	public String getLivePage() {
		return "arduino-live";
	}
	
	@RequestMapping(value="/log")
	public String getlogtest() {
		return "arduino-log";
	}
	
	@RequestMapping(value="/log",method = RequestMethod.GET)
	@ResponseBody
	public List<Arduino> getByTime(@RequestParam(name = "date") long time,@RequestParam(name = "arduinoId") int arduinoId,@RequestParam(name = "sensorId") int sensorId) {
		long fromTime = time-30*60*1000l;
		long toTime = fromTime + 25*3600*1000l;
		System.out.println("fromTime" +fromTime);
		System.out.println("toTime" +toTime);
		ArduinoSearch search = new ArduinoSearch();
		search.setArduinoId(arduinoId);
		search.setSensorId(sensorId);
		search.setFromTime(fromTime);
		search.setToTime(toTime);
		search.setPageable(false);
		HttpEntity<Object> request = new HttpEntity<>(search);
		Arduino[] list = restTemplate.postForObject(URL_ARDUINO + "/search",request, Arduino[].class);
		return convertData(time, Arrays.asList(list));
	}
	
	@RequestMapping(value="/log2",method = RequestMethod.GET)
	@ResponseBody
	public List<Arduino> getByTime2(@RequestParam(name = "date") long time) {
		long fromTime = time-30*60*1000l;
		long toTime = fromTime+25*3600*1000l;
		ArduinoSearch search = new ArduinoSearch();
		search.setArduinoId(1);
		search.setSensorId(1);
		search.setFromTime(fromTime);
		search.setToTime(toTime);
		search.setPageable(false);
		HttpEntity<Object> request = new HttpEntity<>(search);
		Arduino[] list = restTemplate.postForObject(URL_ARDUINO + "/search",request, Arduino[].class);
		return Arrays.asList(list);
	}
	
	@RequestMapping(value="/live",method = RequestMethod.GET)
	@ResponseBody
	public List<Arduino> getLive(@RequestParam(name = "amount") int amount,@RequestParam(name = "arduinoId") int arduinoId,@RequestParam(name = "sensorId") int sensorId) {
		Arduino[] list = restTemplate.getForObject(URL_ARDUINO + "/live?amount="+amount+"&arduinoId="+arduinoId+"&sensorId="+sensorId, Arduino[].class);
		
		return processLiveData(Arrays.asList(list));
	}
	
	private List<Arduino> processLiveData(List<Arduino> arduinos){
		long currentTime = arduinos.get(0).getCreatetime();
		for (Arduino arduino : arduinos) {
			arduino.setCreatetime(currentTime);
			currentTime-=5000l;
		}
		arduinos.sort((a1, a2) -> Long.compare(a1.getCreatetime(), a2.getCreatetime()));
		return arduinos;
	}
	
	private List<Long> getListTime2(long fromTime){
		List<Long> listTime = new ArrayList<Long>();
		long startTime = fromTime;
		while (startTime <= fromTime+86400*1000l) {
			listTime.add(startTime);
			startTime+= 30*60*1000l;
		}
		return listTime;
	}
	
	private List<Long> getListTime(long fromTime){
		List<Long> listTime = new ArrayList<Long>();
		long startTime = fromTime;
		while (startTime <= fromTime+86400*1000l) {
			listTime.add(startTime);
			startTime+= 10*60*1000l;
		}
		return listTime;
	}
	
	private LinkedList<Arduino> convertData(long time, List<Arduino> arduinos){
		LinkedList<Arduino> output = new LinkedList<>();
		List<Long> listTime = getListTime(time);
		for (Long time1 :listTime) {
			long time2 =time1-5*60*1000l;
			long time3 =time1+5*60*1000l;
			float dustSum =0l;
			float dustAve =0l;
			int count = 0;
			Arduino arduino2 = new Arduino();
			for (Arduino arduino : arduinos) {
				if (arduino.getCreatetime() >= time2 && arduino.getCreatetime() < time3) {
					count++;
					dustSum+=arduino.getValue();
				}
			}
			dustAve = count == 0 ? 0:dustSum / count;
			arduino2.setCreatetime(time1);
			arduino2.setValue(dustAve);
			arduino2.setArduinoInfo(arduinos.get(0).getArduinoInfo());
			arduino2.setSensorInfo(arduinos.get(0).getSensorInfo());
			output.add(arduino2);
		}
		return output;
	}
	
	private LinkedList<Arduino> convertData2(long time, List<Arduino> arduinos){
		LinkedList<Arduino> output = new LinkedList<>();
		List<Long> listTime = getListTime2(time);
		for (Long time1 :listTime) {
			long time2 =time1-15*60*1000l;
			long time3 =time1+15*60*1000l;
			float dustSum =0l;
			float dustAve =0l;
			int count = 0;
			Arduino arduino2 = new Arduino();
			for (Arduino arduino : arduinos) {
				if (arduino.getCreatetime() >= time2 && arduino.getCreatetime() < time3) {
					count++;
					dustSum+=arduino.getValue();
				}
			}
			dustAve = count == 0 ? 0:dustSum / count;
			arduino2.setCreatetime(time1);
			arduino2.setValue(dustAve);
			arduino2.setArduinoInfo(arduinos.get(0).getArduinoInfo());
			arduino2.setSensorInfo(arduinos.get(0).getSensorInfo());
			output.add(arduino2);
		}
		return output;
	}
	
}
