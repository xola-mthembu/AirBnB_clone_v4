$(document).ready(function () {
    const listElement = $('.amenities div.popover ul li input');
    let amenityList = [];
    let amenityListName = [];
    listElement.click(function() {
      if ($(this).is(':checked')) {
          console.log(amenityList); // DEBUG PRINT
          amenityList.push($(this).attr("data-id"));
          amenityListName.push($(this).attr("data-name"))
          console.log(amenityListName); // DEBUG PRINT
          updateH4(amenityListName);
      } else {
          console.log(amenityList); // DEBUG PRINT
          const elementAttr = listElement.attr("data-id");
          const elementIndex = amenityList.indexOf(elementAttr);
          console.log(elementIndex); // DEBUG PRINT
          amenityList.splice(elementIndex, 1);
          console.log(amenityList); // DEBUG PRINT
          updateH4(amenityList);
      }
    });
  
    function updateH4(list) {
      const headerElement = $(".amenities h4");
      amenityListString = list.join(", ");
      console.log(amenityListString);
      headerElement.text(amenityListString);
    };

    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/status/',
        success: function (data) {
            indicator = $('#api_status');
            if (data.status == "OK") {
                indicator.addClass("available");
            } else {
                indicator.removeClass("available");
            }
        }
    });
  });
