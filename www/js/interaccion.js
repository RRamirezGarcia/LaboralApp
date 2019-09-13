//Creamos un objeto javascript
var app={

	inicio: function(){
		this.iniciaBotones();
		this.iniciaFastClick();
		this.iniciaHammer();
	},

	iniciaFastClick: function(){
		FastClick.attach(document.body);
	},

	iniciaBotones: function(){

		var botonClaro=document.querySelector("#claro");
		var botonOscuro=document.querySelector("#oscuro");

		//Agregar un escuchador de eventos
		botonClaro.addEventListener('click',this.ponloClaro,false);
		botonOscuro.addEventListener('click',app.ponloOscuro,false);
	},

	iniciaHammer: function(){
		var zona=document.getElementById('zona-gestos');
		var hammertime=new Hammer(zona);

		hammertime.get('pinch').set({enabled:true});
		hammertime.get('rotate').set({enabled:true});

		zona.addEventListener('webkitAnimationEnd', function(e){
			zona.className='';
		});

		hammertime.on('doubletap', function(ev){
			zona.className='doubletap';
		});

		hammertime.on('press', function(ev){
			zona.className='press';
		});

		hammertime.on('swipe',function(ev){
			var clase=undefined;
			direccion=ev.direction;

			if(direccion==4) clase='swipe-derecha';
			if(direccion==2) clase='swipe-izquierda';

			zona.className=clase;
		});

		hammertime.on('rotate',function(ev){
			var umbral=25;
			if(ev.distance>umbral) zona.className='rotate';
		});
		/*hammertime.on('tap doubletap pan swipe press pinch rotate',
			function(ev){
				document.querySelector("#info").innerHTML=ev.type+" ! ";
			});*/

	},

	ponloClaro: function(){
		//className es el nombre de la clase
		document.body.className='claro';
	},

	ponloOscuro: function(){
		document.body.className='oscuro';
	},

};

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	},false);
}
