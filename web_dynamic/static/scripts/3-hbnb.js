$('document').ready(function () {
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  data: JSON.stringify({}),
  contentType: 'application/json',
  success: function (data) => {
    data.forEach(place => {
      const html = `
        <ARTICLE>
          <DIV class="title">
            <H2>${place.name}</H2>
            <DIV class="price_by_night">${place.price_by_night}</DIV>
          </DIV>
          <DIV class="information">
            <DIV class="max_guest">
              <I class="fa fa-users fa-3x" aria-hidden="true"></I>
              <BR>${place.max_guest} Guests
            </DIV>
            <DIV class="number_rooms">
              <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
              <BR>${place.number_rooms} Bedrooms
            </DIV>
            <DIV class="number_bathrooms">
              <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
              <BR>${place.number_bathrooms} Bathrooms
            </DIV>
          </DIV>
          <DIV class="description">${place.description}</DIV>
        </ARTICLE>
      `;
      $('section.places').append(html);
    });
  }
});

$('document').ready(function () {
  let amenities = {};
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
