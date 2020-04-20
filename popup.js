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
      $('#guj-conf-total').html(data.confirmed.total)
      $('#guj-conf-new').html(`<i>&uarr;</i> ${data.confirmed.new}`)

      $('#guj-test-total').html(data.tested.total)
      $('#guj-test-new').html(`<i>&uarr;</i> ${data.tested.new}`)

      $('#guj-recov-total').html(data.recovered.total)
      $('#guj-recov-new').html(`<i>&uarr;</i> ${data.recovered.new}`)

      $('#guj-deaths-total').html(data.deaths.total)
      $('#guj-deaths-new').html(`<i>&uarr;</i> ${data.deaths.new}`)

      $('#guj-quar').html(data.quarantined)


  },
  error: function(XMLHttpRequest, textStatus, error) {
    $('.text-danger').html(error)
    console.log(error)
 }
});

$.ajax({
  url: 'https://gujarat-covid19-udate-api.herokuapp.com/update',
  type: "GET",
  dataType: 'json',
  cors: true ,
  contentType:'application/json',
  secure: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  success: function (data) {
    $('#last_update').html("Last Update: "+data)
  },
  error: function(XMLHttpRequest, textStatus, error) {
    $('.text-danger').val(error)
    console.log(error)
 }
});

$(document).ready(function(){

  var cur_theme = ''
  chrome.storage.sync.get('theme', function(theme) {
      cur_theme = theme.theme
      console.log("theme "+cur_theme)
      if(cur_theme==='dark'){
        $('body').css("background", "#323232")
        // $('#head1').css("color", "#ffffff")
        // $('#cur_dist_name').css("color", "#ffffff")
        $('.h5').css('color', '#ffffff')
        $('.h-6').css('color', '#ffffff')
      }else if(cur_theme==='light')
      $('body').css("background", "")
      $('#head1').css("color", "")
      $('cur_dist_name').css("color", "")
      $('.h6').css('color', '')
  })
  

  var cur_dist = $('#cur_dist_name')
  chrome.storage.sync.get('selectedDistrict', function(data) {
     cur_dist_name = data.selectedDistrict
     cur_dist.val(data.selectedDistrict)
     cur_dist.html(data.selectedDistrict)

    console.log("*****"+cur_dist_name+"  | "+cur_dist.val())
    $.ajax({
      url: 'https://gujarat-covid19-udate-api.herokuapp.com/district/' + cur_dist.val(),
      type: "GET",
      dataType: 'json',
      cors: true ,
      contentType:'application/json',
      secure: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      success: function (data) {
          $('#dist-conf-total').html(data[0].confirmed.total)
          $('#dist-conf-new').html(`<i>&uarr;</i> ${data[0].confirmed.new}`)
    
          $('#dist-test-total').html(data[0].tested.total)
          $('#dist-test-new').html(`<i>&uarr;</i> ${data[0].tested.new}`)
    
          $('#dist-recov-total').html(data[0].recovered.total)
          $('#dist-recov-new').html(`<i>&uarr;</i> ${data[0].recovered.new}`)
    
          $('#dist-deaths-total').html(data[0].deaths.total)
          $('#dist-deaths-new').html(`<i>&uarr;</i> ${data[0].deaths.new}`)
    
          $('#dist-quar').html(data[0].quarantined)
      },
      error: function(XMLHttpRequest, textStatus, error) {
        $('.text-danger').html(error)
        console.log(error)
      }
      });
  })
  });

$('#go-to-options').on('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

