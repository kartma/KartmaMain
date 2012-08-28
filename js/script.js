/* Author:

*/
var sampleEvents = [
  {
    date    : 'Aug 12, 2012',
    name    : 'Silopanna Music Festivale',
    location: 'Annapolis, MD',
    url     : 'http://google.com'
  },
  {
    date    : 'Aug 12, 2012',
    name    : 'Silopanna Music Festivale',
    location: 'Annapolis, MD',
    url     : 'http://google.com'
  },
  {
    date    : 'Aug 12, 2012',
    name    : 'Silopanna Music Festivale',
    location: 'Annapolis, MD',
    url     : 'http://google.com'
  },
  {
    date    : 'Aug 12, 2012',
    name    : 'Silopanna Music Festivale',
    location: 'Annapolis, MD',
    url     : 'http://google.com'
  }
];

$(buildUpcomingEvents);

function buildUpcomingEvents(){
  var markup = upcomingEventList(sampleEvents);

  $('#events tbody').append(markup);
}

function upcomingEventList(collection){
  var html = [];
  for(var i = 0, l = collection.length; i < l; i++)
    html.push( upcomingEvent(collection[i]) );

  return html.join('');
}

function upcomingEvent(event){
  var html = [];

  html.push('<tr>');
  html.push('<td>' + event.date + '</td>');
  html.push('<td>' + event.name + '</td>');
  html.push('<td>' + event.location + '</td>');
  html.push('<td class="info"><a href="' + event.url + '">Event Details</a></td>');
  html.push('</tr>');

  return html.join('');
}

// Form Validation/Processing
$(function() {
  var $form = $('#contact-form')

    // fields
    , $message = $form.find('#form-message')
    , $email   = $form.find('#form-email')

    // settings
    , shade = 'red'

    , error, data
  ;//var

  $form.find('.button').click(function(e){
    e.preventDefault();

    error = false;

    if($email.val() == ''){
      $('#form-email-label').css({'color':shade});
      $email
        .css({
          'outline-color':shade,
          'border-color' :shade
        })
        .focus();
      error = true;
    }
    else{
      $('#form-email-label')
        .css({'color':''});
      $email
        .css({
          'outline-color':'',
          'border-color' :''
        })
    }

    if($message.val() == ''){
      $('#form-message-label').css({color:shade});
      $message
        .css({
          'outline-color':shade,
          'border-color':shade
        })
        .focus();
      error = true;
    }
    else{
      $('#form-message-label').css({'color':''});
      $message
        .css({
          'outline-color':'',
          'border-color' :''
        })
    }

    if(error) return;

    data = $form.serialize()

    console.log('POSTING', data);

    $.post('contact.php', data, function(res){
      alert('THANKS');
    });
  });

  var $checkbox = $('<div class="checkbox"/>').click(function(e){
    //$(this).find('input').trigger('change');
  });

  $('[type="checkbox"]')
    .css({opacity:0,position:'absolute',left:0,top:0,'z-index':-999})
    .wrap($checkbox)
    .change(function(e){
      var $this   = $(this)
        , $visual = $this.parent()
      ;//var

      $visual.toggleClass('checked');
    })
  ;//checkbox


    // $.ajax({
    //   type: "POST",
    //   url: "contact.php",
    //   data: dataString,
    //   success: function() {
    //     $('#contact_form').html("<div id='message'></div>");
    //     $('#message').html("<h2>Contact Form Submitted!</h2>")
    //     .append("<p>We will be in touch soon.</p>")
    //     .hide()
    //     .fadeIn(1500, function() {
    //       $('#message').append("");
    //     });
    //   }
    //  });
});