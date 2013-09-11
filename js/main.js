(function() {
  var fixColumnHeights;

  fixColumnHeights = function() {
  	$('#pop').imagesLoaded(function() {
    	$('.columnizer-row').each(function(idx, el) {
        half_width = ($(this).width()/2)
        if ($(this).find('.asset-container').width() > half_width) {
          $(this).find('.asset-container').css('min-height', $(this).find('.asset').height() );
        } else {
          if ($(this).find('.asset').length > 1) {
            $(this).find('.asset-container').css('min-height', $(this).height() );
          }
        }
    	});
  	});
  };

  $(document).on('pop-initialized', function() {
    $(window).on('resize', _.throttle(fixColumnHeights));
    $('.columnizer-row .asset').live('initialize', _.throttle(fixColumnHeights));
    $('columnizer-row .asset .asset-type-imagegroup').on('change', function() {
      console.log('changed')
      if ($(this).has('a.fancybox')) {
        $(this).css('zoom-glass', 'display:block')
      }
    });

    $('.columnizer-row .asset').live('destroy', function() {
      $(this).find('.asset').css('min-height', '');
    });
  });

}).call(this);
