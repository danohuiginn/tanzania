// report module

var openoil_set_layers = function($this){
    
    var z_front = 10;
    var z_back = -10;
    visible_layer = $this.data('visible_layer');
    console.log('setting layer to ' + visible_layer);
    if (visible_layer == 'oo_map'){
	console.log('map layer');
	//$('#openoil_map_overlay_iframe').hide();
	$('#menu-ui').show();
	$('#map').css('z-index', z_front);
	$('.leaflet-control-container').show();
	// the spreadsheet embed complains if it's non-visible
	// so don't .hide() it, but push it to the back
	$('#openoil_map_overlay_iframe').css('z-index', z_back);
    }
    if (visible_layer == 'oo_iframe'){
	console.log('iframe layer');
	$('#menu-ui').hide();
	//$('#map').hide();
	$('#map').css('z-index', z_back);
	$('.leaflet-control-container').hide();
	$('#openoil_map_overlay_iframe').show();
	$('#openoil_map_overlay_iframe').css('z-index', z_front);
    }
    
    iframe_opacity = $this.data('oo_iframe-opacity') || 0;
    html_opacity = $this.data('oo_html_opacity') || 0;

    $('#openoil_map_overlay_iframe').css('opacity', iframe_opacity);
   // $('#openoil_map_overlay_iframe').css('z-index', iframe_opacity * 10);
    $('#openoil_map_overlay_localcontent').css('opacity', html_opacity);

    if($this.data('oo_iframe-src')){
	$('#openoil_map_overlay_iframe iframe').attr('src', $this.data('oo_iframe-src'));
    }

    
}

define(['app/map-app', 'waypoints'], function (moabi, waypoints) {
  $.extend(moabi, {
    initReport: function() {
      moabi.initMap();
      $('.report-panel section').waypoint(this.reportScroll, {
        context: '.report-panel',
        offset: '80%'
      });
      //$('.navigate').on('click', 'a', this.navigate);
    },

    reportScroll: function(dir) {
	console.log('scrolling');
      if(dir === 'down'){
          var $this = $(this);
          $this.prev().removeClass('active');
          $this.addClass('active');
      }else{
          var $this = $(this).prev();
          $this.next().removeClass('active');
          $this.addClass('active');
      }
      var nav = $this.data('nav'),
          newLayers = $this.data('id'),
          newLayer;

	openoil_set_layers($this);

      if(nav){
          moabi.map.setView([nav[0], nav[1]], nav[2]);
      }
	// change Layers
	/*
      moabi.removeAllExcept(newLayers);
      if(newLayers){
        // perform a quick lookup to test if newLayers is already displayed
        var displayedLayersIds = moabi.getLayers();

        for(i=0; i<newLayers.length; i++){
          newLayer = newLayers[i];
          if(displayedLayersIds.indexOf(newLayer) === -1){
            moabi.changeLayer(newLayers[i]);
          }
        }
      }*/
    },

    navigate: function(e) {
      e.preventDefault();
      e.stopPropagation();

      var $this = $(this),
          lat = $this.data("nav")[0],
          lon = $this.data("nav")[1],
          zoom = $this.data("nav")[2];

      moabi.map.setView([lat, lon], zoom);

      $this.parent('li').siblings('li').children('a.active').removeClass('active');
      $this.addClass('active');
    }

  });
  return moabi;
});
