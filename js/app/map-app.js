---
---
LAYERMAP = {};
BASELAYER = 'openoil.mnijpjfk' // 'Tanzania Regions'
//BASELAYER = 'openoil.n0p2o2n7' // with style
BASELAYER = 'openoil.n0p9n71e' // satellite
OO_LAYERS_OUTER = {
    'Protected Areas': 'openoil.mnn67a0f',
    //'Active PML Licenses': 'openoil.mnn3hpd1',
    'Application PML Licenses': 'openoil.n1064eb2',
    'Active ML Licenses': 'openoil.n105eiib',
    'Oil Blocks': 'openoil.n0p81j5h',
    'Available Contractual Information': 'openoil.n10hp1a4',
    'Production, Reserves, Costs Data': 'openoil.n10afcfi',

//}

//OO_LAYERS_BULYANHULU = {
    'Land Use': 'openoil.n104c1g7',
    'Forests': 'openoil.n103oa9l',
    'Districts': 'openoil.n103e44i',}
    
OO_LAYERS = OO_LAYERS_OUTER;

/*
OO_LAYERCOLORS = {
    'Protected Areas': '#CCD6CC',
    //'Active PML Licenses': 'openoil.mnn3hpd1',
    'Application PML Licenses': '#6699FF',
    'Active ML Licenses': '#3D5C99',
    'Available Contractual Information': '#BE797E',
    'Oil Blocks': '#293D66',
    'Selected Areas': '#141F33',
    //


    // Bulyanhulu needs its own color scheme
    'Land Use': '#015C61',
    'Forests': '#CADFD0',
    'Regions': '#EBE1D7',
    'Admin': '#F0A5A0',
}*/

OO_LAYERSTYLES = {
    'Available Contractual Information': {
	'color': '#008080',
	'fillColor': '#66FFFF',
	'fillOpacity': 0.5},
    'Production, Reserves, Costs Data': {
	'color': '#006680',
	'fillColor': '#00CCFF',
	'fillOpacity': 0.5},
    'Oil Blocks': {
	'color': '#4C8066',
	'fillColor': '#ADFFD6',
	'fillOpacity': 0.5},
    'Land Use': {
		'color': '#D1E0E0',
		'opacity': 0.2,
		'fillOpacity': 0.2},
    'Forests': {
		'color': '#B2CCCC',
		'opacity': 0.2,
		'fillOpacity': 0.2},
    'Districts': {
		'color': '#94B8B8',
		'opacity': 0.2,
		'fillOpacity': 0.2},
    'Selected Areas': {},
}





// map module
define(['app/main-app', 'mapbox', 'leafletImage', 'leafletHash', 'jquery', 'jquery-sortable'],
function (moabi, L, leafletImage, leaflet_hash, $, sortable) {
  $.extend(moabi, {
    initMap: function(){
      moabi.initMain();
      moabi.buildMap();
      //$('.layer-ui li.layer-toggle').on('click', 'a', this.layerButtonClick);
      /*$('.sortable').sortable({
        placeholder: "ui-state-highlight",
        helper: 'clone',
        update: this.layerSortedUpdate
      });
      $('.slider').on('click', 'a', this.slidePanel);
      $('#snap').on('click', this.mapCapture);
      $('.page-fade-link').on('click', this.fade2Page);*/
    },

      setLayers: function(selected, available){	      
	  
	  var build_legend = function(linknames, selected){
	    var menu_ui = document.getElementById('menu-ui');
	    $(menu_ui).html('');
	    $.each(linknames, function(idx){
		i = linknames[idx];
		// create layer toggle
		var link = document.createElement('a');
		link.href = '#';
		link.className = '';
		link.innerHTML = i;
		$(link).data('layername', i);
		//$(link).css('background', OO_LAYERCOLORS[i]);

		link.onclick = function(e) {
		    i = $(this).data('layername')
		    console.log('clicked legend for layer' + i);
		    e.preventDefault();
		    e.stopPropagation();

		    if (theMap.hasLayer(LAYERMAP[i])) {
			theMap.removeLayer(LAYERMAP[i]);
			this.className = '';
		    } else {
			//newlayer.addTo(theMap);
			style = OO_LAYERSTYLES[i] || {}	    
			LAYERMAP[i].setStyle(style);
			theMap.addLayer(LAYERMAP[i]);

			this.className = 'active';
		    }
		};
		menu_ui.appendChild(link);
		link.click();
		link.click();
		if(selected.indexOf(i) >= 0){
		    console.log('selecting ' + i);
		    link.click();
		}
	    });
	};

	var install_layer = function(i,v,active){
	    if(!LAYERMAP[i]){
		style = OO_LAYERSTYLES[i] || {}	    
		//LAYERMAP[i] = L.mapbox.featureLayer(v, {});
		LAYERMAP[i] = L.mapbox.featureLayer(v, {}).setStyle(style);
	    };
	    
	}

	  layernames = selected.concat(available);
	  console.log('layernames are' + layernames);
	  var theMap = this.map;
	  //layers = OO_LAYERS;
	  layers = {};
	  $.each(layernames, function(i){
	      l = layernames[i];
	      layers[l] = OO_LAYERS[l];
	  });
	  console.log('new layers are ' + layers);

	  
	  $.each(layers, function(i,v){
	    install_layer(i,v, true);
	});
	  build_legend(Object.keys(layers), selected);

      },

    buildMap: function(){
     // var baseLayer = L.tileLayer('http://tiles.osm.moabi.org/'+ pageConfig.baseLayer.id +'/{z}/{x}/{y}.png');

	//L.mapbox.accessToken = 'pk.eyJ1IjoiamFtZXMtbGFuZS1jb25rbGluZyIsImEiOiJ3RHBOc1BZIn0.edCFqVis7qgHPRgdq0WYsA';
	L.mapbox.accessToken = 'pk.eyJ1Ijoib3Blbm9pbCIsImEiOiJVbzF0dUtjIn0.0PfhXizZ9_e1nLH1Dgye9A';

	var baseLayer = L.mapbox.tileLayer(BASELAYER);

	this.map = L.mapbox.map('map',
				BASELAYER,
				{
        //layers: baseLayer,
        center: pageConfig.baseLayer.latlon,
        zoom: pageConfig.baseLayer.zoom,
        //scrollWheelZoom: false,
        minZoom: 1,
        maxZoom: 18
	});

	layername = 'Protected Areas';




	var fix_html = function(html){
	    return 'this is not a table';
	}


	//moabi.setLayers(OO_LAYERS);


	
	window.setTimeout(function(){
	    $('.menu-ui a').click();
	    $('.menu-ui a').click();
	}, 1000);
	
	
	
      // add additional object to map object to store references to layers
        // set baselayer z-index to -1, while you're at it
      /*this.map.moabiLayers = {
        baseLayer: baseLayer.setZIndex(-1),
        dataLayers: {}
      };*/

      this.map.zoomControl.setPosition('topleft');
	L.control.scale().addTo(this.map);
	/*
      moabi.leaflet_hash = L.hash(this.map);

      //this.map.legendControl.addLegend('<h3 class="center keyline-bottom">Legend</h3><div class="legend-contents"></div>');

      moabi.leaflet_hash.on('update', moabi.getLayerHash);
      moabi.leaflet_hash.on('change', moabi.setLayerHash);
      moabi.leaflet_hash.on('hash', moabi.updateExportLink);
      moabi.updateExportLink(location.hash);*/
    },

    /*layerButtonClick: function(e){
      e.preventDefault();
      e.stopPropagation();

      moabi.changeLayer($(this).parent('li').data('id'));
    },*/
/*
    layerSortedUpdate: function(e, ui){
      var displayedButtonContainer = $(this),
          layers = moabi.getLayers(),
          newTopButtonId = displayedButtonContainer.children('li:first').data('id');

      moabi.getLayerJSON(newTopButtonId).done(function(topLayerJSON){
        // unless new top button is the same as the old top button, add grids and summary of new topButton
        if(newTopButtonId !== layers[layers.length -1]){
          moabi.clearGrids();
          moabi.addGrid(newTopButtonId, topLayerJSON);
          moabi.showSummary(newTopButtonId, topLayerJSON);
        }

        orderedButtonIds = $.map(moabi.getDisplayedLayersButtons(), function(button, index){
          return $(button).data('id')
        }).reverse();
        moabi.setLayersZIndices(orderedButtonIds);
        moabi.leaflet_hash.trigger('move');
      });
    },

    changeLayer: function(mapId){
      // initiate everything that should happen when a map layer is added/removed
	return; 
	console.log('changeLayer: add ' + mapId);

	// cache tileLayer in moabi.map.moabiLayers.dataLayers[mapId]
      
      if(! moabi.map.moabiLayers.dataLayers[mapId]){
        moabi.map.moabiLayers.dataLayers[mapId] = {
          //tileLayer: L.tileLayer('http://tiles.osm.moabi.org/' + mapId + '/{z}/{x}/{y}.png')
	    tileLayer: L.tileLayer(mapId)
        };
      }
      var tileLayer = this.map.moabiLayers.dataLayers[mapId].tileLayer;

      // if layer is present, run all remove layer actions
      if(this.map.hasLayer(tileLayer)){
        var layers = this.getLayers();
        // run all remove layer actions
        this.map.removeLayer(tileLayer);
        this.removeLayerButton(mapId);
        this.removeLegend(mapId);
        this.removeSummary();

        // if removed layer was highest layer, clear grids
        if(mapId === layers[layers.length -1]){
          this.clearGrids();
          // if 1+ more layers on map, add grid of the new top layer
          if(layers.length > 1){
            var nextLayerId = layers[layers.length -2];

            this.getLayerJSON(nextLayerId).done(function(nextLayerJSON){
              moabi.addGrid(nextLayerId, nextLayerJSON);
            });
          }
        }
      }else{
        // run all add layer actions:
          // add layer to map; add legend; move layer-ui button
          // show description summary; add grid; update hash

        // find zIndex of current top layer, or -1 if no current layers
        var layers = this.getLayers(),
            topLayerZIndex = this.getLayerZIndex(layers[layers.length -1]);

        this.map.addLayer(tileLayer);
        tileLayer.setZIndex(topLayerZIndex + 1);
        this.showLayerButton(mapId);

        this.getLayerJSON(mapId).done(function(layerJSON){
          moabi.showLegend(mapId, layerJSON);
          moabi.showSummary(mapId, layerJSON);
          // not very smart: simply remove all grids and add for the new layer
          moabi.clearGrids();
          moabi.addGrid(mapId, layerJSON);
        });
      }

      this.leaflet_hash.trigger('move');
    },

    getLayerJSON: function(mapId){
      // returns a promise object, that when resolved, contains JSON for mapId
      // assumes that map.moabiLayers.dataLayers[mapId] already exists and contains [mapId].tileLayer
      var JSONPromise = $.Deferred();
      if(! moabi.map.moabiLayers.dataLayers[mapId].layerJSON){
        // run ajax request for layerJSON and when loaded, store in map.moabiLayers.dataLayers[mapId].layerJSON
        $.ajax('{{site.baseurl}}/map_layers.json', {
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          success: function(layersJSON){
            if(layersJSON[mapId]){
              // cache layerJSON in map.moabiLayers.dataLayers
              moabi.map.moabiLayers.dataLayers[mapId].layerJSON = layersJSON[mapId];

              // resolve promise object
              JSONPromise.resolve(layersJSON[mapId]);
            }else{
              JSONPromise.reject('no mapId ' + mapId);
            }
          },
          error: function(jqXHR, textStatus, errorThrown){
            JSONPromise.reject(errorThrown);
          }
        });
      }else{
        JSONPromise.resolve(moabi.map.moabiLayers.dataLayers[mapId].layerJSON);
      }
      return JSONPromise;
      // working with JSONPromise
      // moabi.getJSONPromise(mapId).done(function(result){
      //   console.log('returned layer name: ' + result.name);
      // }).fail(function(error){
      //   console.log('getJSON failed. Error: ' + error);
      // })
    },

    getLayers: function(){
      // return an array of mapIds ordered by zIndex from lowest to highest
      // it is not guaranteed that a mapId's index in the array matches its zIndex
      var dataLayers = moabi.map.moabiLayers.dataLayers,
          layersSortedByZIndex = [];

      for(mapId in dataLayers){
        var tileLayer = dataLayers[mapId].tileLayer;
        if(moabi.map.hasLayer(tileLayer)){
          layersSortedByZIndex[tileLayer.options.zIndex] = mapId;
        }
      }
      return layersSortedByZIndex.filter(function(n){
        return n != undefined;
      });
    },

    getLayerZIndex: function(mapId){
      // return mapId zIndex, or -1 if dataLayers doesn't contain mapId
      if(moabi.map.moabiLayers.dataLayers[mapId]){
        return moabi.map.moabiLayers.dataLayers[mapId].tileLayer.options.zIndex;
      }
      return -1;
    },

    setLayerZIndex: function(mapId, zIndex){
      moabi.map.moabiLayers.dataLayers[mapId].tileLayer.setZIndex(zIndex);
    },

    setLayersZIndices: function(mapIds){
      var legendContents = $('.legend-contents');

      for(var i=0; i<mapIds.length; i++){
        // set zIndex for each mapId in array mapIds, arranged from lowest to highest
        moabi.setLayerZIndex(mapIds[i], i);

        // reorder legends
        legendContents.children('.moabi-legend[data-id="' + mapIds[i] + '"]')
                      .prependTo(legendContents);
      }
    },

    getDisplayedLayersButtons: function(){
      // return a jQuery object containing all layer buttons, sorted from bottom to top
      return $('.layer-ui ul.displayed li.layer-toggle');
    },

    getNotDisplayedLayersButtons: function(){
      return $('.layer-ui ul.not-displayed li.layer-toggle');
    },

    removeAllExcept: function(keepLayers) {
      // removes all layers from map, except for keepLayers (pass as array)
      // returns a list of removed layers
      if(! Array.isArray(keepLayers)){
        keepLayers = [keepLayers];
      }
      var displayedLayers = moabi.getLayers();
      return $.map(displayedLayers, function(removeLayer, index){
                moabi.keepLayers = keepLayers;
                moabi.removeLayer = removeLayer;

                if( keepLayers.indexOf(removeLayer) === -1){
                  moabi.changeLayer(removeLayer);
                  return removeLayer;
                }
              });
    },

    showLayerButton: function(mapId){
      // move layerButton from .not-displayed to .displayed
      var layerButton = moabi.getNotDisplayedLayersButtons().filter('[data-id="' + mapId + '"]'),
          displayed = $('.layer-ui .displayed');

      layerButton.addClass('active').prependTo(displayed);
    },

    removeLayerButton: function(mapId){
      // move layerButton from .displayed to where it was originally located in .not-displayed
      var layerButton = moabi.getDisplayedLayersButtons().filter('[data-id="' + mapId + '"]').removeClass('active'),
          layerButtonIndex = layerButton.data('index'),
          notDisplayedButtons = moabi.getNotDisplayedLayersButtons();

      for(i=0; i<notDisplayedButtons.length; i++){
        var notDisplayedButton = notDisplayedButtons.eq(i),
            notDisplayedButtonIndex = notDisplayedButton.data('index');
        // if button index is less than the smallest, insert at beginning
        if(i===0 && layerButtonIndex < notDisplayedButtonIndex){
          notDisplayedButton.before(layerButton);
          break;
        // else, if button index is greater than the largest, insert at end
        }else if(i===notDisplayedButtons.length - 1 && layerButtonIndex > notDisplayedButtonIndex){
          notDisplayedButton.after(layerButton);
          break;
        // else, insert button before next-largest button index
        }else if(layerButtonIndex < notDisplayedButtonIndex){
          notDisplayedButton.before(layerButton);
          break;
        // else, if loop gets to end and hasn't broken, something's wrong
        }else if(i===notDisplayedButtons.length -1 && layerButtonIndex <= notDisplayedButtonIndex){
          console.log("WARNING: something's wrong with removeLayerButton()")
        }
      }

    },

    showLegend: function(mapId, layerJSON){
      $('<div>', {
                  'class': 'moabi-legend space-bottom1',
                  'data-id': mapId,
                  html: layerJSON.legend
      }).prependTo('.map-legend .legend-contents');
    },

    removeLegend: function(mapId){
      $('.map-legend .moabi-legend[data-id="' + mapId + '"]').remove();
    },

    showSummary: function(mapId, layerJSON){
      // remove existing summary, if exists
      moabi.removeSummary();
      var summary = ['<ul data-id="', mapId, '" class="layer-summary small keyline-all pad0x space-bottom2">',
        '<li class="pad0">', '<h3>', layerJSON.name, '</h3>', '</li>',
        '<li class="pad0 keyline-bottom">', layerJSON.description, '</li>',
        '<li class="pad0 keyline-bottom space">',
          '<strong class="quiet">Source: </strong>', //insert source_name and optionally source_url here
        '</li>',
        '<li class="pad0 space">',
          '<strong class="quiet">Date:</strong> ',
          '<span class="micro">', layerJSON.date, '</span>',
        '</li>',
      '</ul>'];

      if(layerJSON.source_url){
        var urlHTML = ['<a href="', layerJSON.source_url, '" class="micro">',
          layerJSON.source_name, '</a>']
      }else{
        var urlHTML = ['<span class="micro">', layerJSON.source_name, '</span>'];
      }
      summary.splice(13, 0, urlHTML.join(''));

      $('.layer-ui').append(summary.join(''));
    },

    removeSummary: function(){
      $('.layer-ui ul.layer-summary').remove();
    },

    addGrid: function(mapId, layerJSON){
      if(! layerJSON.template){ return false; }
      var tilejson = {
        "tilejson":"2.1.0",
        "grids":["http://grids.osm.moabi.org/grids/" + mapId + "/{z}/{x}/{y}.json"],
        "template":layerJSON.template
      };
      moabi.gridLayer = L.mapbox.gridLayer(tilejson).addTo(moabi.map),
      moabi.gridControl = L.mapbox.gridControl(moabi.gridLayer).addTo(moabi.map);
    },

    clearGrids: function(){
      if (moabi.gridLayer){
        moabi.map.removeLayer(moabi.gridLayer);
      }
      $('.map-tooltip').remove();
    },

    updateExportLink: function(hash) {
      // update map embed link and iD edit link
      $('#map-embed').val("<iframe src='//{{site.baseurl}}/embed/" + hash + "' frameborder='0' width='900' height='700'></iframe>");

      if ($('#id-edit')) {
        var z_lat_lon = hash.split('&')[0].split('/'),
            zoom = z_lat_lon[0].replace("#", ""),
            lat = z_lat_lon[1],
            lon = z_lat_lon[2];

        $('#id-edit').attr('href', '//osm.moabi.org/edit?editor=id#map=' + zoom + '/' + lat + '/' + lon)
      }
    },

    // leaflet hash functions
    setLayerHash: function(hash) {
      return moabi.setQueryVariable(hash, "layers", moabi.getLayers().join(','));
    },

    getLayerHash: function() {
      var layers = moabi.getQueryVariable(location.hash, "layers");
      if (layers) {
        layers = layers.split(',');
        moabi.removeAllExcept([]); //could be smarter
        for (i=0; i<layers.length; i++){
          moabi.changeLayer(layers[i]);
        }
      }
    },

    getQueryVariable: function(hash, variable) {
      var vars = hash.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
      }
      return(false);
    },

    setQueryVariable: function(hash, key, value) {
      var vars = hash.split("&");
      var found = false;
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == key){
          vars[i] = key + "=" + value;
          found = true;
        }
      }
      if (! found) { vars.push(  key + "=" + value ); }
      return(vars.join("&"));
    },
*/
/*    mapCapture: function(e) {
      e.preventDefault();
      e.stopPropagation();

      leafletImage(moabi.map, function(err, canvas) {
        var $imgContainer = $('#images'),
            download = document.getElementById('map-download');

        var mapCapture = document.createElement('img');
        mapImage = canvas.toDataURL();
        download.href = mapImage;
        mapCapture.src = mapImage;
        $imgContainer.children('img').remove();
        $imgContainer.append(mapCapture);
      });
    },*/
/*
    slidePanel: function(e) {
      var $this = $(this),
          tabgroup = $this.parents('.tab-group'),
          index = $this.data('index'),
          oldIndex = $(this).siblings('.active').removeClass('active').data('index'),
          slidecontainer = tabgroup.next();

      $this.addClass('active');
      slidecontainer.removeClass('active' + oldIndex).addClass('active' + index);
      return false;
    },

    fade2Page: function(e) {
      // on link click, fade page out, then follow link
      e.preventDefault();
      var newPage = this.href;

      $('body').fadeOut(500, function(){
          window.location = newPage;
      });
    }*/

  });

  return moabi;
});


