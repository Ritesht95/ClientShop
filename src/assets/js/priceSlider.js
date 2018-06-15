(function () {
  // alert(+($("#minPriceRange").val()) + ' ' + +($("#maxPriceRange").val()) );
  setTimeout(hello, 1000);
  function hello() {
    $("#slider-range").slider({
      range: true,
      min: +($("#minPriceRange").val()),
      max: +($("#maxPriceRange").val()),
      values: [+($("#minPriceRange").val()), +($("#maxPriceRange").val())],
      slide: function (event, ui) {
        $("#amount").val(ui.values[0] + "-" + ui.values[1]);
      }
    });
    $("#amount").val($("#slider-range").slider("values", 0) + "-" + $("#slider-range").slider("values", 1));
  }
})();
