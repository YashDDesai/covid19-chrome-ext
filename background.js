chrome.storage.onChanged.addListener(function(changes, namespace) {
	for(key in changes) {
	  if(key === 'interval') {
		chrome.storage.sync.get('interval', (data)=>{
			chrome.alarms.create('refresh', { periodInMinutes: 60*data.interval});
			setBadge()
		})
	  }
	}
})

chrome.runtime.onInstalled.addListener(() => {
	chrome.alarms.create('refresh', { periodInMinutes: 60*6});
	setBadge() 
})

chrome.browserAction.onClicked.addListener(()=>{
	setBadge() 
})

chrome.alarms.onAlarm.addListener((alarm) => {
	setBadge()
	console.log(alarm)
})



function setBadge(){
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
		if(parseInt(total)>3000)
			chrome.browserAction.setBadgeBackgroundColor({color: "#FF1919"})   
		else if(parseInt(total)<=3000)
			chrome.browserAction.setBadgeBackgroundColor({color: "#000000"})   
		chrome.browserAction.setBadgeText({text: total});

		},
		error: function(XMLHttpRequest, textStatus, error) {
			console.log(error)
		}
	})
}