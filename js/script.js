/* Author:

*/

var app = {
  access_token: 'AAACEdEose0cBAMkCbGMDjeeJPDKZAT2q1p78uevUjMiYdwZBAHm4qemSXyT6JK3AjgWhSfTDJCfcZCXBxyrFe074jJ9IlnaZCUYHi4LkpgZDZD'
};

var monthAbbr = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
$.ajax({
  dataType: 'jsonp',
  data: app,
  url: 'https://graph.facebook.com/126902114116673/events',
  success: function(res){
    app.events = res.data || [];
    app.events.forEach(normalizeEvent);
    $(buildEvents);
  }
});

$(buildDonations);

app.donations = [
{
  amount: '$1000',
  image: 'http://images4.fanpop.com/image/photos/23500000/horse-horses-23582505-1024-768.jpg',
  url: 'http://google.com'
},
{
  amount: '$30',
  image: 'http://images4.fanpop.com/image/photos/23500000/horse-horses-23582505-1024-768.jpg',
  url: 'http://google.com'
},
{
  amount: '$100',
  image: 'http://images4.fanpop.com/image/photos/23500000/horse-horses-23582505-1024-768.jpg',
  url: 'http://google.com'
}
];

function normalizeEvent(event){
  var time = new Date(event.start_time);
  event.url = 'http://facebook.com/' + event.id;
  event.date = monthAbbr[time.getMonth()] + ' ' + time.getDay() + ', ' + time.getFullYear();
}

function buildDonations(){
  $('#donate ul').append(buildList(app.donations, singleDonation));
}

function buildEvents(){
  $('#events tbody').append(buildList(app.events, singleEvent));
}

function buildList(collection, view){
  var html = [];
  for(var i = 0, l = collection.length; i < l; i++)
    html.push( view(collection[i]) );

  return html.join('');
}

function singleEvent(event){
  var html = [];

  html.push('<tr>');
  html.push('<td>' + event.date + '</td>');
  html.push('<td>' + event.name + '</td>');
  html.push('<td>' + event.location + '</td>');
  html.push('<td class="info"><a href="' + event.url + '">Event Details</a></td>');
  html.push('</tr>');

  return html.join('');
}

function singleDonation(item){
  var html = [];

  html.push('<li class="orange">');
  html.push('<img src="' + item.image + '"/>');
  html.push('<div>' + item.amount + '</div>');

  return html.join('');
};

// Form Validation/Processing
$(function() {
  var $form = $('#contact-form')

    // fields
    , $message  = $form.find('#form-message')
    , $email    = $form.find('#form-email')
    , $interest = $form.find('#form-booking')

    // values
    , message, email, interest

    // settings
    , shade = 'red'

    , error, data
  ;//var

  $form.find('.button').click(function(e){
    e.preventDefault();
    error = false;

    message  = $message.val();
    email    = $email.val();
    interest = $interest.prop('checked');

    interest = interest? 'YES' : 'NO';

    if(email == ''){
      $('#form-email-label').css({'color':shade});
      $email
        .css({
          'outline-color':shade,
          'border-color' :shade
        })
        .focus();
      error = true;
    }
    else if(!/.+@.+\..+/.test(email)){
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
        });
    }

    if(message == ''){
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
        });
    }

    if(error) return;

    data = $.param({
      'Email'  : email,
      'Message': message,
      'Interested In Booking': interest
    });

    $.post('contact.php', data, function(res){
      var $contact  = $('#contact')

        , $response = $('<div class="response"/>')
        , $logo     = $('#mainLogo').clone().attr('id','')
        , $message  = $('<p>Thanks for contacting us! We\'ll be in touch soon!</p>')
      ;//var

      $response
        .append($logo)
        .append($message)
        .height($form.height())
      ;//$response

      $form.animate({opacity:0}, function(){
        $form.replaceWith($response);
        $response.animate({height:150,opacity:1});
      });
    });
  });

  var $checkbox = $('<div class="checkbox"/>').click(function(e){
    var $input = $(this).find('input');

    if($input.length)
      $input.prop('checked', !$input.prop('checked')).trigger('change');
  });

  var $temp = $('[type="checkbox"]');

  $('.book-prompt label').click(function(e){
    $temp.prop('checked', !$temp.prop('checked')).trigger('change');
  });

  $temp
    .css({opacity:0,position:'absolute',left:0,top:0,'z-index':-999})
    .wrap($checkbox)
    .change(function(e){
      var $this   = $(this)
        , $visual = $this.parent()
      ;//var

      $visual.toggleClass('checked');
    })
  ;//$temp
});