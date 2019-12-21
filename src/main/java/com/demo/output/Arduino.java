package com.demo.output;


public class Arduino {
	
	private int id;
	private long createtime;
	private int status;
	private float value;
	private ArduinoInfo arduinoInfo;
	private SensorInfo sensorInfo;
	
	public Arduino() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public long getCreatetime() {
		return createtime;
	}
	public void setCreatetime(long createtime) {
		this.createtime = createtime;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public float getValue() {
		return value;
	}
	public void setValue(float value) {
		this.value = value;
	}
	public ArduinoInfo getArduinoInfo() {
		return arduinoInfo;
	}
	public void setArduinoInfo(ArduinoInfo arduinoInfo) {
		this.arduinoInfo = arduinoInfo;
	}
	public SensorInfo getSensorInfo() {
		return sensorInfo;
	}
	public void setSensorInfo(SensorInfo sensorInfo) {
		this.sensorInfo = sensorInfo;
	}
	
}
