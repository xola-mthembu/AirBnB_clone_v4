$(document).ready(function () {
    // Fetch API status
    fetch('http://0.0.0.0:5001/api/v1/status/')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                document.getElementById('api_status').classList.add('available');
            } else {
                document.getElementById('api_status').classList.remove('available');
            }
        })
        .catch(error => console.error('Error:', error));

    // Handle amenities selection
    let checkedAmenities = {};
    $(".amenities li input").change(function () {
        let amenityName = $(this).attr("data-name");
        let amenityID = $(this).attr("data-id");

        if ($(this).is(":checked")) {
            checkedAmenities[amenityID] = amenityName;
        } else {
            delete checkedAmenities[amenityID];
        }

        updateAmenitiesDisplay();
    });

    function updateAmenitiesDisplay() {
        const selectedAmenities = Object.values(checkedAmenities);
        let displayText = selectedAmenities.join(', ');

        if (displayText.length > 30) {
            displayText = displayText.substring(0, 30) + '...';
        }

        if (selectedAmenities.length > 0) {
            $(".amenities h4").text(displayText);
        } else {
            $(".amenities h4").html("&nbsp;");
        }
    }

    // Initial state
    updateAmenitiesDisplay();
});