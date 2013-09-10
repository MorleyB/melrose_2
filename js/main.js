(function() {
  var fixColumnHeights;

  fixColumnHeights = function() {
  	$('#pop').imagesLoaded(function() {
    	$('.columnizer-row').each(function(idx, el) {
        // debugger
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

  appendImageClass = function() {
    $($('.asset.asset-type-imagegroup.asset-size-3')[0]).children().find('.small-image').css('display', 'inline');
    $($('.asset.asset-type-imagegroup.asset-size-3')[1]).children().find('.middle-image').css('display', 'inline');
    $($('.asset.asset-type-imagegroup.asset-size-3')[2]).children().find('.small-image').css('display', 'inline');
  }


  $(document).on('pop-initialized', function() {
    $(window).on('resize', _.throttle(fixColumnHeights));
    $('.columnizer-row .asset').live('initialize', _.throttle(fixColumnHeights));
    $('.columnizer-row .asset').live('initialize', appendImageClass);
    $('columnizer-row .asset').live('lightbox_enabled', function() {
      $(this).css('zoom-glass', 'display:inline')
    });

    $('.columnizer-row .asset').live('destroy', function() {
      $(this).find('.asset').css('min-height', '');
    });
  });

}).call(this);
