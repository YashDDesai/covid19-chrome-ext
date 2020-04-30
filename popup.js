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
      $('#guj-conf-new').html(`<i>&uarr;</i> ${data.confirmed.new || 0}`)

      $('#guj-test-total').html(data.tested.total)
      $('#guj-test-new').html(`<i>&uarr;</i> ${data.tested.new || 0}`)

      $('#guj-recov-total').html(data.recovered.total)
      $('#guj-recov-new').html(`<i>&uarr;</i> ${data.recovered.new || 0}`)

      $('#guj-deaths-total').html(data.deaths.total)
      $('#guj-deaths-new').html(`<i>&uarr;</i> ${data.deaths.new || 0}`)

      $('#guj-quar').html(data.quarantined)


  },
  error: function(XMLHttpRequest, textStatus, error) {
    //$('.text-danger').html(error)
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
   // $('.text-danger').val(error)
    console.log(error)
 }
});

$(document).ready(function(){

  var cur_theme = ''
  chrome.storage.sync.get('theme', function(theme) {
      cur_theme = theme.theme
      //console.log("theme "+cur_theme)
      if(cur_theme==='dark'){
        $('body').css("background", "#323232")
        // $('#head1').css("color", "#ffffff")
        // $('#cur_dist_name').css("color", "#ffffff")
        $('.h5').css('color', '#ffffff')
        $('.h-6').css('color', '#ffffff')
        $('.loading h6').css('color', '#ffffff')
      }else if(cur_theme==='light')
      $('body').css("background", "")
      $('#head1').css("color", "")
      $('cur_dist_name').css("color", "")
      $('.h6').css('color', '')
      $('.loading').css('color', '')
  })
  

  var cur_dist = $('#cur_dist_name') || "Bharuch"
  chrome.storage.sync.get('selectedDistrict', function(data) {
     cur_dist_name = data.selectedDistrict
     cur_dist.val(data.selectedDistrict || "Bharuch")
     cur_dist.html(data.selectedDistrict || "Bharuch")

   // console.log("*****"+cur_dist_name+"  | "+cur_dist.val())
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
      beforeSend: function(){
        $('.main').hide();
        $('.loading').show();
      },
      xhr: function() {
        
         $('.main').hide();
         $('.loading').show();
        var xhr = new window.XMLHttpRequest();
        // xhr.addEventListener("progress", function (evt) {
        //     if (evt.lengthComputable) {
        //         var percentComplete = evt.loaded / evt.total;
        //         console.log(percentComplete);
        //         $('.progress').css({
        //             width: percentComplete * 100 + '%'
        //         });
        //         if (percentComplete === 1) {
        //             $('.progress').addClass('hide');
        //         }
        //     }
        // }, false);
        xhr.addEventListener("progress", function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                console.log(percentComplete);
                $('.progress').css({
                    width: percentComplete * 100 + '%'
                });
            }
        }, false);
        return xhr
        
      },
      success: function (data) {
        $('.loading').hide()
        $('.main').show();
          $('#dist-conf-total').html(data[0].confirmed.total)
          $('#dist-conf-new').html(`<i>&uarr;</i> ${data[0].confirmed.new || 0}`)
    
         $('#dist-test-total').html(data[0].tested.total)
         $('#dist-test-new').html(`<i>&uarr;</i> ${data[0].tested.new || 0}`)
    
          $('#dist-recov-total').html(data[0].recovered.total)
          $('#dist-recov-new').html(`<i>&uarr;</i> ${data[0].recovered.new || 0}`)
    
          $('#dist-deaths-total').html(data[0].deaths.total)
          $('#dist-deaths-new').html(`<i>&uarr;</i> ${data[0].deaths.new || 0}`)
    
          $('#dist-quar').html(data[0].quarantined)
      },
      error: function(XMLHttpRequest, textStatus, error) {
       // $('.text-danger').html(error)
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

