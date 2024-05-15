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
