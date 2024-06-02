$(document).ready(function () {
  const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(apiUrl, function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  const amenityDict = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });

  const placesSearchUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.ajax({
    url: placesSearchUrl,
    type: 'POST',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (data) {
      for (const place of data) {
        $('.places_container').append(
          `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest(s)</div>
              <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`
        );
      }
    }
  });
});
