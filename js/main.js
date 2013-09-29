
(function() {
  var fixColumnHeights, maxColHeight;

  maxColHeight = function($row) {
    var maxHeight = 0;
    $row.find('.asset.asset-type-text, .asset.asset-type-documentgroup, .asset.asset-type-embedgroup').each(function() {
      maxHeight = Math.max(maxHeight, $(this).height());
    });
    return Math.max(maxHeight, 150);
  };

  setAssetHeights = function($row) {
    var height = maxColHeight($row);
    $row.find('.asset').css('min-height', height);
    if ($row.find('.asset.asset-type-text, .asset.asset-type-documentgroup, .asset.asset-type-embedgroup').length) {
      $row.find('.asset.asset-type-imagegroup').populr('display-height', height);
    } else {
      // when a row has only images, set the display height for all images in the row to the same value
      var default_image_heights = [360, 353, 230];
      var asset_count;
      $image_assets = $row.find('.asset');
      asset_count = $image_assets.length;
      $image_assets.populr('display-height', default_image_heights[asset_count - 1]);
    }
  };

  fixColumnHeights = function() {
    $('body').removeClass('assets-resized'); // ie7
    if ($('html').css('content') == "\u2063") {
      $('#pop .asset').css('min-height', '');

    } else {
      $('#pop').imagesLoaded(function() {
        // remove the min-height so that the row size can go down
        $('#pop .asset').css('min-height', '');
        $('#pop .columnizer-row').each(function(idx, el) {
          setAssetHeights($(this));
        });
      });
      $('body').addClass('assets-resized'); // ie7
    }
  };

  $(document).on('pop-initialized', function() {
    $(window).on('resize', _.throttle(fixColumnHeights));
    $('.columnizer-row .asset').live('initialize', _.throttle(fixColumnHeights));
    $('.columnizer-row .asset').live('destroy', function() {
      $(this).find('.asset').css('min-height', '');
    });

    // extend hover effect on images for touch devices
    $('.hover').bind('touchstart touchend', function(e) {
      e.preventDefault();
      $(this).toggleClass('hover-effect');
    });

        // click glass and trigger the lightbox
    $( ".zoom-glass" ).on( "click", function() {
      $( ".populr-image-slider .slideshow.fancybox-enabled .slide img" ).trigger( "click" );
    });
  });

}).call(this);
