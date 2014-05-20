---
---

var statusip {% if site.server-ip %} = "{{ site.server-ip }}"{% endif %};

function updateStatus() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://minecraft-api.com/v1/get/?server=" + (statusip?statusip:undefined), true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			data = JSON.parse(xhr.responseText);
			var html = '<h4>Server Status</h4><table><tr><td class="';
			html += (data.status?"success":"danger");//Icon Color
			html += ' status-icon" rowspan="2" width="60"><i style="" class="fi-power"></i></td><td>';
			html += (data.status?data.motd:"Server Offline");//MOTD
			html += '</td></tr><tr><td>';
			html += (data.status?data.players.online+"/"+data.players.max+" Players - "+data.version:(statusip?data.error:"No Server Configured"));
			$('#status').html(html);
		}
	};
	xhr.send();
}

function runAndSchedule(task, delay) {
	task();
	setInterval(task, delay);
}
(runAndSchedule(function(){
	updateStatus();
}, 2000));
