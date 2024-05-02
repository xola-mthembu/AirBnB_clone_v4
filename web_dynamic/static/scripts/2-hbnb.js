$('document').ready(function () {
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

$('document').ready(function () {
  let amenityId = {};
  $('INPUT[type="checkbox"]').change(function () {
    const dataId = $(this).attr('data-id')
    const dataName =  $(this).attr('data-name')
    if ($(this).is(':checked')) {
      amenities[dataId] = dataName;
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    const amenityList = Object.values(amenities).join(', ')	  
    $('div.amenities H4').text(aminityList);
  });
});
