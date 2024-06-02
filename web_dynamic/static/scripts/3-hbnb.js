$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      selectedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete selectedAmenities[$(this).data('id')];
    }
    const amenities = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(amenities);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      for (const place of data) {
        $('.places_container').append(
          `<article>
             <div class="title_box">
               <h2>${place.name}</h2>
               <div class="price_by_night">$${place.price_by_night}</div>
             </div>
             <div class="information">
               <div class="max_guest">${place.max_guest} Guests</div>
               <div class="number_rooms">${place.number_rooms} Bedrooms</div>
               <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
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
