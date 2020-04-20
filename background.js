chrome.runtime.onInstalled.addListener(() => {
	getBadge()
  	chrome.alarms.create('refresh', { periodInMinutes: 60*6 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
	getBadge()
});

function getBadge(){
	setInterval(
		$.ajax({
  			url: 'https://gujarat-covid19-udate-api.herokuapp.com/gujarat',
  			type: "GET",
  			dataType: 'json',
  			cors: true ,
  			contentType:'application/json',
  			secure: true,
  			headers: {
    				'Access-Control-Allow-Origin': '*',
  			},
  			success: function (data) {
				var total = data.confirmed.total
				if(parseInt(total)>2000)
					chrome.browserAction.setBadgeBackgroundColor({color: "red"})   
				else if(parseInt(total)<=2000)
					chrome.browserAction.setBadgeBackgroundColor({color: "green"})   
				chrome.browserAction.setBadgeText({text: total});
	
  			},
  			error: function(XMLHttpRequest, textStatus, error) {
    				console.log(error)
 			}
		}), 3600000*6)
}