var capaOSM = new L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png'),
	capaGoogleHibrida = new L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'),
	capaGoogleSat = new L.tileLayer(' http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}');






var capasBase = {
        "OpenStreetMap": capaOSM,
        "Google": capaGoogleHibrida,
        "Google Satélite": capaGoogleSat,
};



var mapa = new L.map('mapa', {
	center: [19.32,-99.5],
	zoom: 10,
	layers:[capaOSM],
	
});

var layerControl = L.control.layers(capasBase).addTo(mapa);

var sidebar = L.control.sidebar('sidebar').addTo(mapa);
///Barra de escala
L.control.scale({
	position: 'bottomleft',
	imperial: false,
}).addTo(mapa);

///coordenadas del cursos
var coordsBox = L.control({
	position: 'bottomleft'
});

coordsBox.onAdd = function (mapa) {
	this._div = L.DomUtil.create('div', 'leaflet-control-coordinates');
	this._div.innerHTML = 'Latitud: 0.00<br>Longitud: 0.00';
	return this._div;
};

coordsBox.update = function (latlng) {
	this._div.innerHTML = 'Latitud: ' + latlng.lat.toFixed(5) + '<br>Longitud: ' + latlng.lng.toFixed(5);
};

coordsBox.addTo(mapa);
mapa.on('mousemove', function (e) {
	coordsBox.update(e.latlng);
});




//----------------------Definición de las capas
//APTITUD


//CLIMATOLOGÍA

//DEMOGRAFÍA
var dem2 = L.esri.dynamicMapLayer({
	url: "https://www.arcgis.com/home/item.html?id=2c60b5c96b064ca9a40e4f15a755b1c8",
	opacity: .5,
	useCors: false,
	layers:[0],
});
dem2.name="Pobreza y Tasa de crecimiento histórico poblacional";
//ECONOMÍA

//GEOLOGÍA

//HIDROLOGÍA

//INFRAESTRUCTURA DE COMUNICACIÓN
var ifc1 = L.esri.dynamicMapLayer({
	url: "https://www.arcgis.com/home/item.html?id=fc4738a9b75c4191972b82a34c4fa337",
	opacity: .5,
	useCors: false,
});
ifc1.name="Sistema de transporte";
//RELIEVE

//RIESGOS Y VULNERABILIDAD

//SUELO DE CONSERVACIÓN Y APTITUD

//TIPOS DE PROPIEDAD












//----------------------FIN-------------------
//--------------------------Añadido mediante Checkbox


//DEMOGRAFÍA
function DEMOG() {
	return L.layerGroup([
		
		dem2,
	]);
}

var dem = DEMOG();
var demo = document.getElementById('dem');

function addLayerGroupCheckboxes(dem, container, ) {
  // leyers del layergroup
	var layers = dem.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		//console.log(layer.name);
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba
		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);
		//checkboxContainer.appendChild(iconZ);

    	// añade checkbox y contenedor a un contenedor final
		//container.appendChild(checkboxContainer);

	
    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';
				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					console.log('apagada');
					
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(dem, demo);




// INFRAESTRUCTURA DE COMUNICACIÓN
function ICOM() {
	return L.layerGroup([
		ifc1,
		
	]);
}

var Ic = ICOM();
var icom = document.getElementById('icom');

function addLayerGroupCheckboxes(Ic, container, ) {
  // leyers del layergroup
	var layers = Ic.getLayers();
	
  // Loop para cada capa para crear el check
	for (var i = 0; i < layers.length; i++) {
		var layer = layers[i];
    	var name = layer.name;
		//console.log(layer.name);
    	// Crea la checkbox
    	var checkbox = L.DomUtil.create('input', 'leaflet-control-layers-selector');
    	checkbox.type = 'checkbox';
    	checkbox.value = name;
    	checkbox.checked = mapa.hasLayer(layer);

		var br = L.DomUtil.create('br');
 	   // crea la etiqueta del checkbox
    	var label = L.DomUtil.create('label', 'leaflet-control-layers-label');
    	label.innerHTML = name;
		//prueba
		//div para cada checkbox y label
		var checkboxContainer = L.DomUtil.create('div', 'checkbox-container');
		checkboxContainer.appendChild(checkbox);
		checkboxContainer.appendChild(label);
		//prueba
		checkboxContainer.appendChild(br);
		//checkboxContainer.appendChild(iconZ);

    	// añade checkbox y contenedor a un contenedor final
		//container.appendChild(checkboxContainer);

	
    	// control de visibilidad para cada capa 
		(function (layer, checkboxContainer) {
			L.DomEvent.on(checkbox, 'click', function(){
				if(this.checked) {
					layer.addTo(mapa);
					//
					var img = L.DomUtil.create('img');
					img.src = layer.options.iconUrl;
					img.style.display = 'width:45px';
					checkboxContainer.appendChild(img);

					img.id = layer.name+'L';
				} else {
					mapa.removeLayer(layer);
					var l = layer.name+'L';
					var borrar = document.getElementById(l);
					borrar.remove();
					console.log('apagada');
					
				}
			});
		})(layer, checkboxContainer);
		//
		container.appendChild(checkboxContainer);
		//

  	}
}
addLayerGroupCheckboxes(Ic, icom);