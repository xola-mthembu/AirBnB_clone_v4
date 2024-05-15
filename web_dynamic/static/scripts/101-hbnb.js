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
    url: api + ':5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: appendPlaces
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

$('button').click(function () {
  // Remove existing articles
  $('article').remove();

  // Prepare data for AJAX request
  const amenitiesData = {
    amenities: Object.keys(ls_amen)
  };

$.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify(amenitiesData),
    contentType: 'application/json',
    success: function (data) {
      // Process and display search results
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
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
      }
    }
  });
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

$('document').ready(function () {
  let states = {};
  $('.locations ul.popover LI.s input[type=checkbox]').change(function () {
    const dataId = $(this).attr('data-id')
    const dataName =  $(this).attr('data-name')
    if ($(this).is(':checked')) {
      states[dataId] = dataName;
    } else {
      delete states[$(this).attr('data-id')];
    }
    const stateList = Object.values(states).join(', ')
    $('.locations h4').text(stateList);
  });
});

$('document').ready(function () {
  let cities = {};
  $('.locations ul.popover LI.s input[type=checkbox]').change(function () {
    const dataId = $(this).attr('data-id')
    const dataName =  $(this).attr('data-name')
    if ($(this).is(':checked')) {
      cities[dataId] = dataName;
    } else {
      delete cities[$(this).attr('data-id')];
    }
    const cityList = Object.values(cities).join(', ')
    $('.locations h4').text(cityList);
  });
});

$('button').click(function () {
  // Remove existing articles
  $('article').remove();

  // Prepare data for AJAX request
  const searchData = {
    amenities: Object.keys(ls_amen),
    cities: Object.keys(ls_cities),
    states: Object.keys(ls_states)
  };

$.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5002/api/v1/places_search/',
    data: JSON.stringify(searchData),
    contentType: 'application/json',
    success: function (data) {
      // Process and display search results
      for (let i = 0; i < data.length; i++) {
        const place = data[i];

        // Log data for debugging purposes
        console.log(place);
        console.log(ls_amen);
        console.log('cities: ', ls_cities);
        console.log('states: ', ls_states);

        // Build and append HTML content
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
      }
    }
  });
});

$('.reviewSpan').click(function (event) {
  const placeId = $(this).attr('data-id');
  const reviewsContainer = $('.reviews ul');

  $.ajax({
    url: `http://0.0.0.0:5001/api/v1/places/${placeId}/reviews`,
  })
  .done(function (data) {
    reviewsContainer.empty(); // Clear existing reviews

    if ($(this).text() === 'show') {
      for (const review of data) {
        reviewsContainer.append(`<li>${review.text}</li>`);
      }
      $(this).text('hide'); // Update button text
    } else {
      reviewsContainer.empty();
      $(this).text('show'); // Update button text back
    }
  });
});
