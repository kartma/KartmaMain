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
  $('.error').hide();

  $(".button").click(function() {
    // validate and process form
    // first hide any error messages
    $('.error').hide();
    
    var name = $("input#name").val();
    if (name == "") {
      $("label#name_error").show();
      $("input#name").focus();
      return false;
    }
    var email = $("input#email").val();
    if (email == "") {
      $("label#email_error").show();
      $("input#email").focus();
      return false;
    }
    var message = $("textarea#comment").val();
    if (message == "") {
      $("label#comment_error").show();
      $("textarea#comment").focus();
      return false;
    }
    
    var dataString = 'name='+ name + '&email=' + email + '&message=' + message;
    //alert (dataString);return false;

    $.ajax({
      type: "POST",
      url: "contact.php",
      data: dataString,
      success: function() {
        $('#contact_form').html("<div id='message'></div>");
        $('#message').html("<h2>Contact Form Submitted!</h2>")
        .append("<p>We will be in touch soon.</p>")
        .hide()
        .fadeIn(1500, function() {
          $('#message').append("");
        });
      }
     });
    return false;
  });
});