var paginaHome = "home";
var anios;

var datosGeneralesApp = {

    asignacionFamiliarActual: 85.00,
    aporteObligatorioEntidadPension: 13, //asumiendo por defecto ONP
    comisionEntidadPension: 0,
    primaSeguroEntidadPension: 0,
    porcGratificacion: 0,
    porcVacaciones: 0,
    porcBonificacion: 0,
    porcCTS: 0,
    porcEsSalud:0,
    porcSctrPension: 0,
    porcSctrSalud: 0
    
};

var dataPerfilGlobal = {

    _id: "",
    nombre: "",
    sueldo: 0.0,
    tieneHijos: "no",
    entidadSistema: 1,
    entidadSistemaPensionStr:"",
    regimenEmpresa: 1,
    regimenEmpresaStr:""

}

var appGlobal = {
    establecerEnlacesPerfil: function (val) {
        if (val) {
            document.getElementById("enlace-perfil").href = "/actualiza-perfil/";
        } else {
            document.getElementById("enlace-perfil").href = "/perfil/";
        }
    }
}

var app = new Framework7({
    root: '#app',
    // App Name
    name: 'LaboralApp',
    // App id
    id: 'com.laboralapp',

    routes: routes,

    template7Pages: true,

    data: function () {
        return {
            user: {
                _id: dataPerfilGlobal._id,
                nombre: dataPerfilGlobal.nombre,
            },
        };
    },

});

var $$ = Dom7;

// Init/Create main view
var mainView = app.views.create('.view-main', {
    url: '/'
});

////////////////////////////////////////////////////////////////////////////////////////////

//Esperar que Córdova esté cargada

document.addEventListener("deviceready", dispositivoCargado, false);
//
function dispositivoCargado() {
    iniciarBaseDeDatos();
}

function iniciarBaseDeDatos() {

    databaseHandler.createDatabase();
    perfil.verificarPerfil();    
    comisionEntidadPension.consultarComisionEntidad();
    beneficiosLeyesSociales.consultarBeneficiosLeyesSociales();
    asignacionFamiliar.consultarAsignacionFamiliar(new Date());
    anio.consultarAnios();

}

function validarOpcionesDeUsuario(){
    if(dataPerfilGlobal.nombre===''){
        $$('.desactivada').css('pointerEvents','none');
        app.dialog.alert("Antes de continuar complete su información en la opción 'Mi perfil'");
    }else{
        $$('.desactivada').css('pointerEvents','auto');
    }
}

////////////////////////////////////////////////////////////////////////////////////////////

// Dom Events
$$('.panel-left').on('panel:open', function () {
    console.log('Panel left: open');
    validarOpcionesDeUsuario();
});
$$('.panel-left').on('panel:opened', function () {
    console.log('Panel left: opened');
});

// Instance Events
var panelRight = app.panel.right;
panelRight.on('open', function () {
    console.log('Panel right: open');
});
panelRight.on('opened', function () {
    console.log('Panel right: opened');
});

// App Events
app.on('panelClose', function (panel) {
    console.log('Panel ' + panel.side + ': close');
});
app.on('panelClosed', function (panel) {
    console.log('Panel ' + panel.side + ': closed');
});
app.on('panelResize', function (panel, newPanelWidth) {
    console.log('Panel resized to ' + newPanelWidth + 'px');
});
