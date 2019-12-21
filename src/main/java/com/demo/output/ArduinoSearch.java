package com.demo.output;

public class ArduinoSearch {
	
	private long fromTime;
	private long toTime;
	private int arduinoId;
	private int sensorId;
	private boolean pageable;
	private int page;
	private int pageSize;
	
	public long getFromTime() {
		return fromTime;
	}

	public void setFromTime(long fromTime) {
		this.fromTime = fromTime;
	}

	public long getToTime() {
		return toTime;
	}

	public void setToTime(long toTime) {
		this.toTime = toTime;
	}

	public int getArduinoId() {
		return arduinoId;
	}

	public void setArduinoId(int arduinoId) {
		this.arduinoId = arduinoId;
	}

	public int getSensorId() {
		return sensorId;
	}

	public void setSensorId(int sensorId) {
		this.sensorId = sensorId;
	}

	public boolean isPageable() {
		return pageable;
	}

	public void setPageable(boolean pageable) {
		this.pageable = pageable;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public ArduinoSearch() {
	}

}
