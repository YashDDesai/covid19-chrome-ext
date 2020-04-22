
// Saves options to chrome.storage
function save_options() {
  var dist = $('#dist_name').val();
  chrome.storage.sync.set({
    selectedDistrict: dist,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved. :' + $('#dist_name').val();;
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });  
}
$('#save').on('click', save_options)

function save_theme(){
  var theme = $('input[name="theme"]:checked').val();
  
  // console.log("theme>>"+theme)
  chrome.storage.sync.set({
    theme: theme,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('theme_status');
    status.textContent = 'Theme Changed';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
$('input[name="theme"]').on('input', save_theme)


function set_app_interval(){
  var interval = $('#interval_select').val() || 6;
  chrome.storage.sync.set({
    interval: interval,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('update_status');
    status.textContent = 'Interval set for ' + $('#interval_select').val() +" hours"
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
$('#save_interval').on('click', set_app_interval)

chrome.storage.sync.get('interval', (data)=>{
  console.log("interval get"+data.interval)
  document.getElementById(data.interval).selected = "true";
})

$(document).ready(function(){  
  $.ajax({
    url: 'https://gujarat-covid19-udate-api.herokuapp.com/district/all',
    type: "GET",
    dataType: 'json',
    cors: true ,
    contentType:'application/json',
    secure: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    success: function (data) {    
        var select = $('#dist_name')
             $.each(data,function(index,data){
              for(var i=1;i<34;i++){
                select.append($("<option></option>").attr({"value":data[i].name, "id":data[i].name}).text(data[i].name));            
              }
             });     
             $("#dist").html(select);
    },
    error: function(XMLHttpRequest, textStatus, error) {
      //$('.text-danger').html(error)
      console.log(error)
   }
  }).then(set_dist);
  
function set_dist(){
  var cur_dist = "Bharuch"
  chrome.storage.sync.get('selectedDistrict', function(data) {
      cur_dist = data.selectedDistrict || "Bharuch"
      document.getElementById(cur_dist).selected = "true";
  })
}


  //theme
  var cur_theme = ''
  chrome.storage.sync.get('theme', function(theme) {
    cur_theme = theme.theme
    // console.log(`"#radio_${cur_theme}"`)
    if(cur_theme==='dark')
      $("#radio_dark").attr('checked', true)
    else if(cur_theme==='light')
    $("#radio_light").attr('checked', true)
    else
    $("#radio_light").attr('checked', true)
  })
})
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  // function restore_options() {
  //   // Use default value color = 'red' and likesColor = true.
  //   chrome.storage.sync.get({
  //     city: 'Manila, Philippines',
  //   }, function(items) {
  //     document.getElementById('city').value = items.favoriteColor;
  //     });
  // }
  // document.addEventListener('DOMContentLoaded', restore_options);
  // document.getElementById('save').addEventListener('click',
  //     save_options);