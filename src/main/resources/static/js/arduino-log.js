var urlPath = "http://springiotfrontend-env.uvdm7hsviy.us-east-1.elasticbeanstalk.com/arduino";
//var urlPath = "http://localhost:8080/demo-aws/arduino";

var humiOptions = {
	      chart: {
	        type: 'area',
	        stacked: false,
	        height: 350,
	        shadow: {
              enabled: true,
              color: '#f2ccff'
          },
	        zoom: {
	          type: 'x',
	          enabled: true,
	          autoScaleYaxis: true
	        },
	        toolbar: {
	          autoSelected: 'zoom'
	        }
	      },
	      colors: ['#cc33ff'],
	      dataLabels: {
	        enabled: false
	      },
	      series: [],
	      markers: {
	        size: 0,
	      },
	      title: {
	        text: 'Humidity Log Table',
	        align: 'left'
	      },
	      fill: {
	        type: 'gradient',
	        gradient: {
	          shadeIntensity: 1,
	          inverseColors: false,
	          opacityFrom: 0.5,
	          opacityTo: 0,
	          stops: [0, 90, 100]
	        },
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
	      xaxis: {
	        type: 'datetime',
	      },

	      tooltip: {
	        shared: false,
	        x:{
	        	format: 'dd/MM HH:mm'
	        },
	      }
	    };

var tempOptions = {
	      chart: {
	        type: 'area',
	        stacked: false,
	        height: 350,
	        shadow: {
                enabled: true,
                color: '#ccffcc'
            },
	        zoom: {
	          type: 'x',
	          enabled: true,
	          autoScaleYaxis: true
	        },
	        toolbar: {
	          autoSelected: 'zoom'
	        }
	      },
	      colors: ['#00cc00'],
	      dataLabels: {
	        enabled: false
	      },
	      series: [],
	      markers: {
	        size: 0,
	      },
	      title: {
	        text: 'Temperature Log Table',
	        align: 'left'
	      },
	      fill: {
	        type: 'gradient',
	        gradient: {
	          shadeIntensity: 1,
	          inverseColors: false,
	          opacityFrom: 0.5,
	          opacityTo: 0,
	          stops: [0, 90, 100]
	        },
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
	          text: 'Value °C'
	        },
	      },
	      xaxis: {
	        type: 'datetime',
	      },

	      tooltip: {
	        shared: false,
	        x:{
	        	format: 'dd/MM HH:mm'
	        },
	      }
	    };

var dustOptions = {
	      chart: {
	        type: 'area',
	        stacked: false,
	        height: 350,
	        zoom: {
	          type: 'x',
	          enabled: true,
	          autoScaleYaxis: true
	        },
	        toolbar: {
	          autoSelected: 'zoom'
	        }
	      },
	      dataLabels: {
	        enabled: false
	      },
	      series: [],
	      markers: {
	        size: 0,
	      },
	      title: {
	        text: 'Dust Log Table',
	        align: 'left'
	      },
	      fill: {
	        type: 'gradient',
	        gradient: {
	          shadeIntensity: 1,
	          inverseColors: false,
	          opacityFrom: 0.5,
	          opacityTo: 0,
	          stops: [0, 90, 100]
	        },
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
	      xaxis: {
	        type: 'datetime',
	      },

	      tooltip: {
	        shared: false,
	        x:{
	        	format: 'dd/MM HH:mm'
	        },
	      }
	    };

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

$('#search-log').on('click', function() {
		searchLogs();
	});
convertTimeStringToLong = function (timeStr) {
    var date = new Date(timeStr).getTime();
    return date;
};
convertTimeLongToString = function (timeLong) {
    var date = new Date(timeLong);
    return date;
};
renderGraph = function (listData,mychart) {
    var dates = [];
    for (var i = 0; i < listData.length; i++) {
      var innerArr = [listData[i].createtime, listData[i].value];
      dates.push(innerArr)
    }
    
    var nameAdruino = listData[0].arduinoInfo.name;
    var nameSensor = listData[0].sensorInfo.name;

    mychart.updateSeries([{
        name: nameAdruino+' - '+nameSensor,
        data: dates
      }]);
   
}

function isLoading(){
	$("#waitingDiv").show();
}

function isLoaded(){
	$("#waitingDiv").hide();
}

function searchLogs() {
	isLoading();
	let fromTime = convertTimeStringToLong($('#fromDate').val());
	var arrTime = getListTime(fromTime);
	let startTime = fromTime-1800000;
	$.ajax({
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: urlPath +"/log?date="+fromTime+"&arduinoId=1&sensorId=1",

        success: function (data) {
        	isLoaded();
            const list = data;
            if(list != null){
            	renderGraph(list,dustChart);
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
        url: urlPath +"/log?date="+fromTime+"&arduinoId=1&sensorId=2",

        success: function (data) {
        	isLoaded();
            const list = data;
            if(list != null){
            	renderGraph(list,tempChart);
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
        url: urlPath +"/log?date="+fromTime+"&arduinoId=1&sensorId=3",

        success: function (data) {
        	isLoaded();
            const list = data;
            if(list != null){
            	renderGraph(list,humiChart);
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
        url: urlPath +"/log2?date="+fromTime,

        success: function (data) {
            const list = data;
            if(list != null){
            	let listTime = getListTime(fromTime, fromTime+86400000);
            	console.log(listTime);
            	let output = convertData(listTime,data);
            	console.log(output);
            }
            else 
                alert("No data found!!!")
        },

        error: function(){
            alert("Can not connect to server")
        }
    });
}

function getListTime(fromTime,toTime){
	let listTime = [];
	let startTime = fromTime;
	while (startTime <= toTime) {
		listTime.push(startTime);
		startTime+= 30*60*1000;
	}
	return listTime;
}

function convertData(listTime, listData){
	let output = [];	
	listTime.forEach(function print(time1){
	    console.log(time1);
	    let time2 = time1-15*60*1000;
	    let time3 = time1+15*60*1000;
	    let valueSum=0;
	    let valueAve =0;
	    let count = 0;
	    listData.forEach(function loop(arduino){
	    	if (arduino.createtime >= time2 && arduino.createtime < time3) {
				count++;
				valueSum+=arduino.value;
			}
	    	valueAve = count == 0 ? 0:valueSum / count;
	    }); 
	    arduino2 = {
	    		createtime:time1,
	    		value:valueAve
	    }	    
	    output.push(arduino2);
	  });
	 return output;
}


$(document).ready(function(){
	isLoaded();
	dustChart.render();
	tempChart.render();
	humiChart.render();
});