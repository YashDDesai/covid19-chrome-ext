// chrome.storage.onChanged.addListener(function(changes, namespace) {
// 	for(key in changes) {
// 	  if(key === 'interval') {
// 		chrome.storage.sync.get('interval', (data)=>{
// 			chrome.alarms.create('refresh', { periodInMinutes: 60*data.interval});
// 			setBadge()
// 		})
// 	  }
// 	}
// })

// chrome.runtime.onInstalled.addListener(() => {
// 	chrome.alarms.create('refresh', { periodInMinutes: 60*6});
// 	setBadge() 
// })

// // chrome.browserAction.onClicked.addListener(()=>{
// // 	setBadge() 
// // })

// // window.onload = function() {
// // 	console.log("ckicked")
// //     setBadge()
// // };

// chrome.alarms.onAlarm.addListener((alarm) => {
// 	setBadge()
// 	console.log(alarm)
// })



// function checkForUpdate(){
// 	setInterval(()=>{
// 		$.ajax({
// 			// url: 'update.json',
// 			url:"https://gujarat-covid19-udate-api.herokuapp.com/update",
// 			type: "GET",
// 			dataType: 'json',
// 			cors: true ,
// 			contentType:'application/json',
// 			secure: true,
// 			headers: {
// 				'Access-Control-Allow-Origin': '*',
// 			},
// 			success: function (load) {
// 				var currentdate = new Date();
// 				//console.log(data)
// 				chrome.storage.sync.get('checkUpdate', (data)=>{
// 					//console.log(currentdate.getHours() + ":"+ currentdate.getMinutes() + ":"+ currentdate.getSeconds()+" >> got last_update: "+data.checkUpdate)
// 					if(load===data.checkUpdate){
// 						console.log("%c-----no changes----","color:yellow")
// 					}
// 					else{
// 						console.log("%c----update found----", "color:green")
// 						chrome.storage.sync.set({
// 							checkUpdate: load,
// 						}, function() {
// 							//console.log(currentdate.getHours() + ":"+ currentdate.getMinutes() + ":"+ currentdate.getSeconds()+" >> last_update set: "+load)
							
// 							setBadge()
// 						});
// 					}
// 				})
				
// 			},
// 			error: function(XMLHttpRequest, textStatus, error) {
// 				console.error(error)
// 			}
// 		})
// 	}, 60*1000)
// }
// checkForUpdate()


setInterval(setBadge, 2000)



function setBadge(){
	$.ajax({
		// url: 'guj.json',
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
		if(parseInt(total)>5000)
			chrome.browserAction.setBadgeBackgroundColor({color: "#FF1919"})   
		else if(parseInt(total)<=5000)
			chrome.browserAction.setBadgeBackgroundColor({color: "#000000"})   
		chrome.browserAction.setBadgeText({text: total});
		//console.log("badge updated")

		},
		error: function(XMLHttpRequest, textStatus, error) {
			console.error(error)
		}
	})
}