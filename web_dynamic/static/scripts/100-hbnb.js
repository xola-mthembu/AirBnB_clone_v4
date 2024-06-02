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
  const stateDict = {};
  const cityDict = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      if ($(this).closest('section').find('h4').text() === 'Amenities') {
        amenityDict[$(this).data('id')] = $(this).data('name');
      } else if ($(this).closest('section').find('h4').text() === 'States') {
        stateDict[$(this).data('id')] = $(this).data('name');
      } else if ($(this).closest('section').find('h4').text() === 'Cities') {
        cityDict[$(this).data('id')] = $(this).data('name');
      }
    } else {
      if ($(this).closest('section').find('h4').text() === 'Amenities') {
        delete amenityDict[$(this).data('id')];
      } else if ($(this).closest('section').find('h4').text() === 'States') {
        delete stateDict[$(this).data('id')];
      } else if ($(this).closest('section').find('h4').text() === 'Cities') {
        delete cityDict[$(this).data('id')];
      }
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
    $('.states h4').text(Object.values(stateDict).join(', '));
    $('.cities h4').text(Object.values(cityDict).join(', '));
  });

  function fetchPlaces (amenities = {}, states = {}, cities = {}) {
    const placesSearchUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
    const filters = {
      amenities: Object.keys(amenities),
      states: Object.keys(states),
      cities: Object.keys(cities)
    };
    $.ajax({
      url: placesSearchUrl,
      type: 'POST',
      data: JSON.stringify(filters),
      contentType: 'application/json',
      success: function (data) {
        $('.places_container').empty();
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
  }

  fetchPlaces();

  $('button').click(function () {
    fetchPlaces(amenityDict, stateDict, cityDict);
  });
});
