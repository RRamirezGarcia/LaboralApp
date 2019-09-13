var $$ = Dom7;
var perfil = {

    mostrarEntidades: function (resultados) {

        var html = "";
        var length = resultados.rows.length;
        var elementSelect = $$("#slt_entidad_sistema_pension");

        elementSelect.empty();//Limpiar la data anterior

        //Recorrer la data y agregar las opciones al elemento select
        for (var i = 0; i < length; i++) {
            var strSelected = "";
            var item = resultados.rows.item(i);
            if (item._id == dataPerfilGlobal.entidadSistema)
                strSelected = "selected='selected'";
            html += "<option value =" + item._id + " " + strSelected + ">" + item.descripcion + "</option>";
        }
        elementSelect.append(html);
    },
    verificarPerfil: function () {
        perfilHandler.consultarPerfil();

    },
    resultadosPerfil: function (resultados) {
        var length = resultados.rows.length;
        if (length > 0) {

            var item = resultados.rows.item(0);
            dataPerfilGlobal._id = item._id;
            dataPerfilGlobal.nombre = item.nombre;
            dataPerfilGlobal.sueldo = item.sueldo;
            dataPerfilGlobal.tieneHijos = item.tiene_hijos;
            dataPerfilGlobal.entidadSistema = item.entidad_sistema_pension;
            dataPerfilGlobal.regimenEmpresa = item.regimen_empresa;
            dataPerfilGlobal.regimenEmpresaStr=(item.regimen_empresa==1)?"General":"MYPE";

            console.log("[ID= " + dataPerfilGlobal._id + ", NOMBRE=" + dataPerfilGlobal.nombre + ", ENTIDAD=" + dataPerfilGlobal.entidadSistema + "]");

            appGlobal.establecerEnlacesPerfil(true);
        } else {
            appGlobal.establecerEnlacesPerfil(false);
        }
    },

}

//Para página nuevo perfil
$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    entidadSistemaPensionHandler.cargarEntidades();
    //Si ya hay datos guardados, deberán mostrarse
    $$("#btnCancelarPerfil").on("click", cancelarPerfil);
    $$("#btnGuardarPerfil").on("click", guardarPerfil);
});

function guardarPerfil() {
    var nombre = $$('#nombre').val();
    var sueldo = $$('#sueldo').val();
    var asignacion = $$("input[name='asignacion-radio-inline']:checked").val();
    var entidadSistemaPension = $$("#slt_entidad_sistema_pension").find("option:checked").val();
    var regimen = $$("input[name='regimen-radio-inline']:checked").val();
    if (validarDatosFormularioPerfil()) {
        perfilHandler.agregarPerfil(nombre, sueldo, asignacion, entidadSistemaPension, regimen);
        $$('.desactivada').css('pointerEvents','auto');
    }

}

function validarDatosFormularioPerfil() {
    var nombre = document.getElementById("nombre");
    var sueldo = document.getElementById("sueldo");
    
//    var asignacionFamiliar = document.getElementsByName('asignacion-radio-inline')[0];
//    var entidadSistemaPension = $$('#slt_entidad_sistema_pension');
//    var regimen = document.getElementsByName('regimen-radio-inline')[0];

    if (nombre.checkValidity() && sueldo.checkValidity()) {
        return true;
    } else {
        return false;
    }
}

function cancelarPerfil() {
    $$('#item-back').click();
}

//Antes que la página actualiza_perfil pase a la vista
$$(document).on('page:beforein', '.page[data-name="actualiza_perfil"]', function (e) {
    mostrarPaginaActualizacion();
    $$("#btnCancelarPerfil").on("click", cancelarPerfil);
    $$("#btnActualizarPerfil").on("click", actualizarPerfil);
});

function actualizarPerfil() {
    var nombre = $$('#nombre').val();
    var sueldo = $$('#sueldo').val();
    var asignacion = $$("input[name='asignacion-radio-inline']:checked").val();
    var entidadSistemaPension = $$("#slt_entidad_sistema_pension").find("option:checked").val();
    var regimen = $$("input[name='regimen-radio-inline']:checked").val();

    dataPerfilGlobal.nombre = nombre;
    dataPerfilGlobal.sueldo = sueldo;
    dataPerfilGlobal.tieneHijos = asignacion;
    dataPerfilGlobal.entidadSistema = entidadSistemaPension;
    dataPerfilGlobal.regimenEmpresa = regimen;
    var band = validarDatosFormularioPerfil();
    if (band) {
        perfilHandler.actualizarPerfil(dataPerfilGlobal._id, dataPerfilGlobal.nombre, dataPerfilGlobal.sueldo,
                dataPerfilGlobal.tieneHijos, dataPerfilGlobal.entidadSistema, dataPerfilGlobal.regimenEmpresa);
        comisionEntidadPension.consultarComisionEntidad();
        beneficiosLeyesSociales.consultarBeneficiosLeyesSociales();
        asignacionFamiliar.consultarAsignacionFamiliar(new Date());
    } else {
        app.dialog.alert("Por favor complete la información solicitada");
    }

}

function mostrarPaginaActualizacion() {
    $$('#nombre').val(dataPerfilGlobal.nombre);
    $$('#sueldo').val(dataPerfilGlobal.sueldo);
    entidadSistemaPensionHandler.cargarEntidades();
    marcarOpcionesSeleccionadas();
}

function marcarOpcionesSeleccionadas() {
    //Asignación Familiar
    var rbAsignacionFamiliar = $$('input[name="asignacion-radio-inline"]');
    if (dataPerfilGlobal.tieneHijos === "si")
        rbAsignacionFamiliar[0].checked = true;
    else
        rbAsignacionFamiliar[1].checked = true;

    //Régimen de empresa
    var rbRegimen = $$('input[name="regimen-radio-inline"]');
    rbRegimen[dataPerfilGlobal.regimenEmpresa - 1].checked = true;
}