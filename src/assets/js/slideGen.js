//  import "../../assets/js/jquery.flexslider.js";
//  import "../../assets/js/easy-responsive-tabs.js";
$(document).ready(function () {
  $('.flexslider').flexslider({
    animation: "slide",
    controlNav: "thumbnails"
  });

  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 9000,
    values: [50, 6000],
    slide: function (event, ui) {
      $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
    }
  });
  $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values",
    1));

});
