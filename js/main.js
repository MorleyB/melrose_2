(function() {
  var fixColumnHeights, maxColHeight;

  maxColHeight = function($row) {
    var maxHeight = 0;
    $row.find('.asset.asset-type-text, .asset.asset-type-documentgroup, .asset.asset-type-embedgroup').each(function() {
      maxHeight = Math.max(maxHeight, $(this).height());
    });
    return maxHeight;
  };

  setAssetHeights = function($row) {
    var height = maxColHeight($row);
    $row.find('.asset').css('min-height', height);
    if ($row.find('.asset.asset-type-text, .asset.asset-type-documentgroup, .asset.asset-type-embedgroup').length) {
      $row.find('.asset.asset-type-imagegroup').populr('display-height', height);
    } else {
      var asset_count;
      var default_image_heights = [350, 300, 250];
      $image_assets = $row.find('.asset');
      asset_count = $image_assets.length;
      $image_assets.populr('display-height', default_image_heights[asset_count - 1]);
    }
  };

  fixColumnHeights = function() {
    $('body').removeClass('assets-resized'); // ie7
    if ($('html').css('content') == "\u2063") {
      $('.asset').css('min-height', '');

    } else {
      var $row;
      $('#pop').imagesLoaded(function() {
        $('.columnizer-row').each(function(idx, el) {
          $row = $(this);
          $(this).find('.asset').css('min-height', '');
          setAssetHeights($row);
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
  });

}).call(this);
