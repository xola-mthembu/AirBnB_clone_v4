#!/usr/bin/env node
$(document).ready(() => {
  const checkedAmenities = {}; // Use const instead of var to define a constant

  // Function to update the display of checked amenities
  function updateAmenitiesDisplay () {
    const checkedAmenitiesList = Object.values(checkedAmenities);
    const displayText = checkedAmenitiesList.length > 0 ? checkedAmenitiesList.join(', ') : 'None';
    $('#checkedAmenitiesDisplay').text(displayText);
  }

  // Event listener for checkbox changes (delegated to parent element)
  $('.popover').on('change', 'input[type="checkbox"]', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }

    updateAmenitiesDisplay(); // Update display after checkbox change
  });
});
