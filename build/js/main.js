/* js */

/* usar atributos html => aria e de acessebilidade / usabilidade */

(function(){
	"use strict";

	var data = {
		data: {},
		atualizacao: {},
		candidatos: [],
		total: {},
		zonas: {},
	};

	var fn = {
		//create element dom
		createNode: function (name, attr, content) {
	    var node = document.createElement(name);
	    if(typeof attr !== 'undefined' && attr != null){
	      for (var key in attr){
	        node.setAttribute(key, attr[key]);
	      }
	    }
	    if(typeof content !== 'undefined' && content !== '') node.innerHTML = content;
	    return node;
	  },

		sortJSON: function(data, key, way) {
		    return data.sort(function(a, b) {
		        // var x = parseFloat(a[key]); var y = parseFloat(b[key]);
		        var x = parseFloat(a[key].replace(".","")); var y = parseFloat(b[key].replace(".",""));
		        //console.log(x,y);
		        if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
		        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
		    });
		},

		getCandidato: function (id_candidato){
			var data_candidato = data.candidatos, candidato = {};
			for (var i = 0; i < data_candidato.length; i++) {
				var id_candidato = id_candidato;
				if(data_candidato[i].id_candidato === id_candidato){
					candidato = data_candidato[i];
					break;
				}
			}
			return candidato;
		}

	};

	function candidatoComponent (props_candidato) {
		var props_candidato = props_candidato,
				props = fn.getCandidato(props_candidato.id_candidato),
				bar_percentage_color = props_candidato.total_percentual_zonas.replace(',','.');

		//container principal do componente
		var container = fn.createNode('div', {'class': 'candidates-list__container'});
		//foto do candidato
		var picture = fn.createNode('div', {'class': 'candidates-list__picture'}, '<span style="background-color: '+ props.cor_partido +'"></span>')
				container.appendChild(picture);
		//informações sobre o candidato
		var info = fn.createNode('div', {'class': 'candidates-list__content'});
				info.appendChild( fn.createNode('span', {'class': 'candidates-list__name'}, props.nome_candidato) );
				info.appendChild( fn.createNode('span', {'class': 'candidates-list__sigla'}, props.sigla_partido) );
		var info_percentage = fn.createNode('span', {'class': 'candidates-list__votos'});
				info_percentage.appendChild(fn.createNode('span', {'class': 'candidates-list__sigla', 'style':'width: '+ bar_percentage_color +'; background:'+ props.cor_partido +';'}) );
				info.appendChild(info_percentage);

				container.appendChild(info);
		//percetual de votos
		var percentage = fn.createNode('div', {'class': 'candidates-list__percentage'});
				percentage.appendChild( fn.createNode('b', null, props_candidato.total_percentual_zonas) );
				percentage.appendChild( fn.createNode('span', null, props_candidato.total_votos_validos_zonas+'votos') );
				container.appendChild(percentage);

		return container;
	}

  function updateZonaMap (data_zona){
		var data_zona = data.zonas,
				data_total = data.total,
				data_total_candidatos = data_total.candidatos;

		for (var i = 0; i < data_total_candidatos.length; i++ ) {
			var candidato_component = candidatoComponent(data_total_candidatos[i]);

			var e_li = fn.createNode('li');
					e_li.appendChild(candidato_component);
			var e_list = document.getElementById('candidateslist');

			if(e_list){
				e_list.appendChild(e_li);
			}
		}

		for (var key in data_zona){
			var candidatos = data_zona[key].candidatos;
			fn.sortJSON(candidatos, 'total_votos_validos_zona', '321'); //ordena a lista de cantidados por maior quantidade de votos validos
			var zona_id = key,
					candidatoAll = candidatos[0],
					candidato = fn.getCandidato(candidatos[0].id_candidato);

			var e = document.querySelector('#zona-'+ key);
			if(e) {
				e.style.cssText = "fill: "+ candidato.cor_partido+" !important";
			}
		}
	}

	function statusVoting(){
		var data_atualizacao = data.atualizacao;
		console.log('data_atualizacao', data_atualizacao);

		var percentage_total = data_atualizacao.apuracao_total;

		var e_percentage_total = document.getElementById('percentagetotal');
		if(e_percentage_total)e_percentage_total.textContent = percentage_total;

		var e_barprogress = document.getElementById('progressebarstate');
		if(e_barprogress){
			var html = '<span class="progressebar__background" style="width: '+ percentage_total.replace(',', '.') +'"></span>';
			e_barprogress.insertAdjacentHTML('afterbegin', html);
		}

		var published_in = document.getElementById('publishedin');
		if(published_in){
			published_in.textContent = 'PUBLICADO EM '+ data_atualizacao.data;
		} 
	}

	function updateZonaInfo(id_zona){
		var id_zona = (typeof id_zona !== 'undefined') ? id_zona : null;
		if(id_zona!== null){
			var zona_candidatos = "";
		}
	}

	//'GET', 'js/data.json', true
	var paramsAjax = {
		'url': 'build/js/data.json',
		'method': 'GET',
		'async': true
	};
	ajax(paramsAjax, function (response){
		data.data = response;
		data.zonas = response.zonas;
		data.atualizacao = response.atualizacao;
		data.candidatos = response.candidatos;
		data.total = response.total;

		console.log('zonas', data.zonas)
		console.log('atualizacao', data.atualizacao)
		console.log('candidatos', data.candidatos)
		console.log('total', data.total)

		updateZonaMap();
		statusVoting();
		updateZonaInfo();

    // function atualizarCandidatos(){};
    // function atualizarProgressbar(){};

		 console.log(data)
	});


	function ajax(params, callback){

		var params = {
			url: params.url,
			method: params.method,
			async: params.async,
			data: data
		};

		if (typeof params.method === 'undefined') {
			return console.log('ajax parameter \'method\' not sent');
		} else if (typeof params.url === 'undefined') {
			return console.log('ajax parameter \'url\' not sent');
		} else {

			if (typeof params.async === 'undefined') params.async = true;

			var request = new XMLHttpRequest();
			request.open(params.method, params.url, params.async);
			request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
			    // Success!
			    var response = JSON.parse(request.responseText);
					callback(response); //callback ajax
			  } else {
			    // We reached our target server, but it returned an error

			  }
			}
		};

		request.onerror = function() {
		  // There was a connection error of some sort
		};

		if (params.method.toUpperCase() == "POST") {
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			request.send(params.data);
		} else {
			request.send();
		}
	}

})();
