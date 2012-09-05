/* Author:

Coty Beasley
Chad Elliott

Beasley Creative
http://beasleycreative.com

*/

var app = {
  access_token: '216655558463278|_B-T_jH1PtyhjVh9j5zr-buUdBc',
  base_url: 'http://kartma.org/'
};

var monthAbbr = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
$.ajax({
  dataType: 'jsonp',
  data: app,
  url: 'https://graph.facebook.com/126902114116673/events',
  success: function(res){
    app.events = res.data || [];

    var $events  = $('#events')
      , $loading = $events.find('.ui-loading')
      , $table   = $events.find('table')

      , events = app.events
      , i      = events.length
    ;//var

    while(i--)
      normalizeEvent(events[i]);

    $(function(){
      buildEvents(events);
    });

    $loading.animate({opacity:0}, function(){
      $loading.hide();
      $table.css({opacity:0}).show().animate({opacity:1});
    });
  }
});

$(buildDonations);

var charityFrame_url = app.base_url + 'img/charityframes/';
var charityLogo_url = app.base_url + 'img/charitylogos/';
var captionIntro = 'Total Donated to ';
app.donations = [
{
  amount: '$7,000',
  image: charityFrame_url + 'ChildrensMercy_frame.jpg',
  caption: captionIntro + 'Children\'s Mercy',
  charity_logo: charityLogo_url + 'ChildrensMercy_logo.png'
},
{
  amount: '$15,000',
  image: charityFrame_url + 'CrestedButte_frame.jpg',
  caption: captionIntro + 'Center for the Arts Crested Butte',
  charity_logo: charityLogo_url + 'CrestedButte_logo.png'
},
{
  amount: '$7,500',
  image: charityFrame_url + 'YMCA_MLB_frame.jpg',
  caption: captionIntro + 'YMCA',
  charity_logo: charityLogo_url + 'YMCA_logo.png'
},
{
  amount: 'N/A',
  image: charityFrame_url + 'KCChamberofCommerce_frame.jpg',
  caption: 'Painting Donated to the KC Chamber of Commerce',
  charity_logo: charityLogo_url + 'KCChamberofCommerce_logo.png'
},
{
  amount: 'N/A',
  image: charityFrame_url + 'LafratunaOrphanage_CostaRica_frame.jpg',
  caption: 'Mural for La Fortuna Orphanage, Costa Rica',
  charity_logo: charityLogo_url + 'LafratunaOrphanage_CostaRica_logo.png'
}
];

function normalizeEvent(event){
  // var time = new Date(event.start_time);
  event.url = 'http://facebook.com/' + event.id;
  event.date = event.start_time;
  // event.date = monthAbbr[time.getMonth()] + ' ' + time.getDay() + ', ' + time.getFullYear();
}

function buildDonations(){
  var sections   = []
    , donations  = app.donations
    , $donations = $('#donate #charities')
  ;//var

  while(donations.length > 0)
    sections.push( donations.splice(0,3) );

  for(var i = 0, ilen = sections.length; i < ilen; i++){
    var $ul = $('<ul/>').append(buildList(sections[i], singleDonation));
    $donations.append($ul);
  }
}

function buildEvents(list){
  $('#events tbody').append(buildList(list, singleEvent));
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
  html.push('<img class="charity_image" src="' + item.image + '"/>');

  if(item.amount && item.charity_logo){
    html.push('<div class="details">');
      html.push('<div class="amount">' + item.amount + '</div>');
      html.push('<img class="charity_logo" src="' + item.charity_logo + '"/>');
    html.push('</div>');
  }

  html.push('<div class="caption">' + item.caption + '</div>');

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