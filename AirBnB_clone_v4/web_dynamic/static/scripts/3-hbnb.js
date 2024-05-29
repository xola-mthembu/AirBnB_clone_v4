$(document).ready(function () {
    console.log("3-hbnb.js loaded"); // Verify the script is loaded

    // Check API status
    $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    }).fail(function () {
        // Handle failure to connect to the API
        $('#api_status').removeClass('available');
    });

    // Request places
    $.ajax({
        url: 'http://127.0.0.1:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            for (let place of data) {
                let article = `
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`;
                $('section.places').append(article);
            }
        }
    });

    let checkedAmenities = {};
    $(".amenities li input").change(function () {
        let amenityName = $(this).attr("data-name");
        let amenityID = $(this).attr("data-id");

        if ($(this).is(":checked")) {
            checkedAmenities[amenityID] = amenityName;
        } else {
            delete checkedAmenities[amenityID];
        }

        // If no keys, we have a &nbsp taking the place for it
        // This will prevent changes in space between elements
        if (Object.keys(checkedAmenities).length != 0) {
            let spanText = Object.values(checkedAmenities).join(", ");
            let newSpan = "<span>" + spanText + "</span>";
            $(".amenities h4").html(newSpan);
        } else {
            $(".amenities h4").html("&nbsp;");
        }

        // Had to make a span inside h4 to apply ellipsis ...
        $(".amenities h4 span").css({
            "white-space": "nowrap",
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "max-width": "205px",
            display: "block",
        });
    });
});