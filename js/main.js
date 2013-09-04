(function() {
  var fixColumnHeights;

  fixColumnHeights = function() {
  	$('#pop').imagesLoaded(function() {
    	$('.columnizer-row').each(function(idx, el) {
        // debugger
        half_width = ($(this).width()/2)
        if ($(this).find('.asset-container').width() > half_width ) {
          $(this).find('.asset-container').css('min-height', $(this).find('.asset').height() );
        } else {
          if ($(this).find('.asset').length > 1) {
            $(this).find('.asset-container').css('min-height', $(this).height() );
          }
        }
    	});
  	});
  };

  // uses jquery color plugin
  setBackgroundColor = function() {
    background = $('body')
    color = $.Color(background.css('backgroundColor'))
    assets = $('#pop').find('.asset').not('.asset.asset-type-text.asset-size-1').not('.asset.asset-type-imagegroup')
    light_shade = color.lightness(.451).saturation(.28)
    mid_shade = color.lightness(.23).saturation(.4)

    assets.map(function(index){
      if (index == 0) {
        $(this).parent().css('background-color', light_shade);
      } else if (index % 2 == 0) {
        $(this).parent().css('background-color', light_shade);
      } else {
        $(this).parent().css('background-color', mid_shade);
      }
    })
  }


  $(document).on('pop-initialized', function() {
    $(window).on('resize', _.throttle(fixColumnHeights));
    $('.columnizer-row .asset').live('initialize', _.throttle(fixColumnHeights));
    $('.columnizer-row .asset').live('initialize', setBackgroundColor);

    $('.columnizer-row .asset').live('destroy', function() {
      $(this).find('.asset').css('min-height', '');
      $('.columnizer-row .asset').live('destory', setBackgroundColor);
    });
  });

}).call(this);
