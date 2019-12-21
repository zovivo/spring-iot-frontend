var urlPath = "http://springiotfrontend-env.uvdm7hsviy.us-east-1.elasticbeanstalk.com/arduino";
//var urlPath = "http://localhost:8080/demo-aws/arduino";
var lastDate = 0;
var data = [];
var TICKINTERVAL = 86400000
let XAXISRANGE = 777600000;
var currentStatus = -1;

var dustOptions = {
        chart: {
            height: 350,
            width: 1000,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        series: [{
            data: data
        }],
        title: {
            text: 'Dust Live Table',
            align: 'left'
        },
        markers: {
            size: 0
        },
        tooltip: {
            x:{
            	format: 'dd/MM HH:mm:ss'
            },
        },
        xaxis: {
            type: 'datetime',
            range: 600000,
            tickPlacement: 'on'
        },
        yaxis: {
        	min: 0,
            max: 50,
            labels: {
  	          formatter: function (val) {
  	            return (val).toFixed(2);
  	          },
  	        },
            title: {
  	          text: 'Value (.10^-2 mg/m3)'
  	        },
        },
        legend: {
            show: false
        },
    }


var tempOptions = {
        chart: {
            height: 350,
            width: 1000,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#00cc00'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        series: [{
            data: data
        }],
        title: {
            text: 'Temperature Live Table',
            align: 'left'
        },
        markers: {
            size: 0
        },
        tooltip: {
            x:{
            	format: 'dd/MM HH:mm:ss'
            },
        },
        xaxis: {
            type: 'datetime',
            range: 600000,
            tickPlacement: 'on'
        },
        yaxis: {
        	min: 0,
            max: 50,
            labels: {
    	          formatter: function (val) {
    	            return (val).toFixed(2);
    	          },
    	        },
            title: {
  	          text: 'Value (°C)'
  	        },
        },
        legend: {
            show: false
        },
    }


var humiOptions = {
        chart: {
            height: 350,
            width: 1000,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#cc33ff'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        series: [{
            data: data
        }],
        title: {
            text: 'Humidity Live Table',
            align: 'left'
        },
        markers: {
            size: 0
        },
        tooltip: {
            x:{
            	format: 'dd/MM HH:mm:ss'
            },
        },
        xaxis: {
            type: 'datetime',
            range: 600000,
            tickPlacement: 'on'
        },
        yaxis: {
        	min: 0,
            max: 100,
            labels: {
    	          formatter: function (val) {
    	            return (val).toFixed(2);
    	          },
    	        },
            title: {
  	          text: 'Value (%)'
  	        },
        },
        legend: {
            show: false
        },
    }



var dustChart = new ApexCharts(
        document.querySelector("#myDustChart"),
        dustOptions
    );
var tempChart = new ApexCharts(
        document.querySelector("#myTempChart"),
        tempOptions
    );
var humiChart = new ApexCharts(
        document.querySelector("#myHumiChart"),
        humiOptions
    );

function updateData(listData,chart){
	var newData = [];
	for (var i = 0; i < listData.length; i++) {
	    newData.push({
            x: listData[i].createtime,
            y: listData[i].value
        })
	}
	var nameAdruino = listData[0].arduinoInfo.name;
    var nameSensor = listData[0].sensorInfo.name;

	chart.updateSeries([{
		name: nameAdruino+' - '+nameSensor,
        data: newData
    }])
	
}

function isLoading(){
	$("#waitingDiv").show();
}

function isLoaded(){
	$("#waitingDiv").hide();
}
function updateLive(dustChart, tempChart, humiChart) {
	isLoading();
	let amount = 120;
	$.ajax({
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: urlPath +"/live?amount="+amount+"&arduinoId=1"+"&sensorId=1",

        success: function (data) {
        	isLoaded();
        	const list = data;
            if(list != null){
            	updateData(list,dustChart);
            }
            else 
                alert("No data found!!!")
        },

        error: function(){
            alert("Can not connect to server")
        }
    });
	
	$.ajax({
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: urlPath +"/live?amount="+amount+"&arduinoId=1"+"&sensorId=2",

        success: function (data) {
        	isLoaded();
        	const list = data;
            if(list != null){
            	updateData(list,tempChart);
            }
            else 
                alert("No data found!!!")
        },

        error: function(){
            alert("Can not connect to server")
        }
    });
	
	$.ajax({
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: urlPath +"/live?amount="+amount+"&arduinoId=1"+"&sensorId=3",

        success: function (data) {
        	isLoaded();
        	const list = data;
            if(list != null){
            	updateData(list,humiChart);
            }
            else 
                alert("No data found!!!")
        },

        error: function(){
            alert("Can not connect to server")
        }
    });
	
}
 
function getStatus(){
	$.ajax({
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: urlPath +"/status",

        success: function (data) {
            const status = data;
            if(status != null){
            	currentStatus = status;
            	console.log(status);
            	if (status == 1) {
            		$('#myCheckbox').prop('checked', true);
				}
            	if (status == 0) {
            		$('#myCheckbox').prop('checked', false);
				}
            }
            else 
                alert("No data found!!!")
        },
        error: function(){
            alert("Can not connect to server")
        }
    });
} 

function changeStatus(){
	let nextStatus = currentStatus == 1 ? 0:1;
	console.log("next status: "+ nextStatus);
	$.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: urlPath +"/change-status?status="+nextStatus,

        success: function (data) {
            const status = data;
            if(status != null){
            	currentStatus = status;
            	if (nextStatus == 1) {
            		$('#myCheckbox').prop('checked', true);
				}
            	if (nextStatus == 0) {
            		$('#myCheckbox').prop('checked', false);
				}
            }
            else 
                alert("No data found!!!")
        },
        error: function(){
            alert("Can not connect to server")
        }
    });
} 
$('#myCheckbox').on('click', function(e) {
	e.preventDefault();
	console.log("change status"); 
	changeStatus();
});
$(document).ready(function() {
	isLoaded();
	getStatus();
	
    dustChart.render();
    tempChart.render();
    humiChart.render();
    updateLive(dustChart, tempChart, humiChart);
	window.setInterval(function () {
//	        getNewSeries(lastDate, {
//	            min: 10,
//	            max: 90
//	        })
//	        chart.updateSeries([{
//	            data: data
//	        }])
		updateLive(dustChart, tempChart, humiChart);
	    }, 15000);
});