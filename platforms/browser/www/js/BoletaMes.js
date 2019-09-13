var $$ = Dom7;

var datosBoleta = {
    mes: "",
    anio: 2019,
    diasTrabajados: 0,
    diasFeriados: 0,
    hrsExtrasAl25: 0,
    hrsExtrasAl35: 0
};

$$(document).on('page:init', '.page[data-name="boleta_mes"]', function (e) {
    cargarDatosPantallaBoleta();
    $$('#btnCalcularBoleta').on('click', validarDatosFormularioBoleta);

});

$$(document).on('page:init', '.page[data-name="boleta_mes_trabajador"]', function (e) {
    obtenerDatosParaBoleta();
    establecerDatosEnBoleta();
    $$("#btnRegresar").on("click", regresar);

});

function validarDatosFormularioBoleta(e) {
    console.log("validarDatosFormulario BoletaMes");
    e.preventDefault();
    var diasTrabajados = document.getElementById('diasTrabajados');
    var feriadosTrabajados = document.getElementById('cantFeriadosTrabajados');
    var heAl25 = document.getElementById('horasExtrasAl25');
    var heAl35 = document.getElementById('horasExtrasAl35');
    
    if (diasTrabajados.checkValidity() && feriadosTrabajados.checkValidity() && heAl25.checkValidity() && heAl35.checkValidity()) {
        document.getElementById("btnCalcularBoleta").href = "/boleta_mes_trabajador/";
        document.getElementById("btnCalcularBoleta").click();
        document.getElementById("btnCalcularBoleta").href = "#";
        return false;
    } else {
        return false;
    }
}

function cargarDatosPantallaBoleta() {

    var html = "";
    var length = anios.length;
    var elementSelect = $$("#sltAnioBoleta");

    elementSelect.empty();//Limpiar la data anterior

    //Recorrer la data y agregar las opciones al elemento select
    for (var i = 0; i < length; i++) {
        var item = anios[i];
        html += "<option value ='" + item._id + "'>" + item.anio + "</option>";
    }
    elementSelect.append(html);
}


function obtenerDatosParaBoleta() {
    datosBoleta.mes = $$("#sltMesBoleta").find("option:checked").val();
    datosBoleta.anio = $$("#sltAnioBoleta").find("option:checked").val();
    datosBoleta.diasTrabajados = $$("#diasTrabajados").val();
    datosBoleta.diasFeriados = $$("#cantFeriadosTrabajados").val();
    datosBoleta.hrsExtrasAl25 = $$("#horasExtrasAl25").val();
    datosBoleta.hrsExtrasAl35 = $$("#horasExtrasAl35").val();
}

function establecerDatosEnBoleta() {

    var sueldoPorDia, sueldoPorHora, totalRemuneracion, asignacionFamiliar, montoPorFeriados, montoHrsExtrasAl25, montoHrsExtrasAl35, dsctoPorPension, aporteEsSalud;
    var sltMes = document.getElementById("sltMesBoleta");
    var textMes = sltMes.options[sltMes.selectedIndex].text;
    var sltAnio = document.getElementById("sltAnioBoleta");
    var textAnio = sltAnio.options[sltAnio.selectedIndex].text;
    
    document.getElementById("tituloBoleta").innerHTML = "Boleta de "+textMes+" de "+textAnio;

    sueldoPorDia = parseFloat((dataPerfilGlobal.sueldo) / 30).toFixed(2);
    sueldoPorHora = parseFloat(sueldoPorDia / 8).toFixed(2);

    totalRemuneracion = parseFloat(sueldoPorDia * datosBoleta.diasTrabajados).toFixed(2);

    asignacionFamiliar = 0.0;
    if (dataPerfilGlobal.tieneHijos === "si") {
        asignacionFamiliar = parseFloat(datosGeneralesApp.asignacionFamiliarActual).toFixed(2);
    }

    montoPorFeriados = 0.0;
    if (datosBoleta.diasFeriados > 0) {
        montoPorFeriados = parseFloat(sueldoPorDia * datosBoleta.diasFeriados * 2).toFixed(2);
    }

    montoHrsExtrasAl25 = 0.0;
    if (datosBoleta.hrsExtrasAl25 > 0) {
        montoHrsExtrasAl25 = parseFloat(sueldoPorHora * datosBoleta.hrsExtrasAl25 * 1.25).toFixed(2);
    }

    montoHrsExtrasAl35 = 0.0;
    if (datosBoleta.hrsExtrasAl35 > 0) {
        montoHrsExtrasAl35 = parseFloat(sueldoPorHora * datosBoleta.hrsExtrasAl35 * 1.35).toFixed(2);
    }

    dsctoPorPension = parseFloat(totalRemuneracion * ((datosGeneralesApp.aporteObligatorioEntidadPension +
            datosGeneralesApp.comisionEntidadPension +
            datosGeneralesApp.primaSeguroEntidadPension) / 100)).toFixed(2);

    aporteEsSalud = parseFloat((totalRemuneracion * datosGeneralesApp.porcEsSalud) / 100).toFixed(2);

    netoAPagar = (parseFloat(totalRemuneracion) + parseFloat(asignacionFamiliar) + parseFloat(montoHrsExtrasAl25) + parseFloat(montoHrsExtrasAl35) + parseFloat(montoPorFeriados) - parseFloat(dsctoPorPension)).toFixed(2);

    $$("#txtMontoPorRemuneracion").val(totalRemuneracion);
    $$("#txtMontoPorAsignacionFamiliar").val(asignacionFamiliar);
    $$("#txtMontoPorFeriados").val(montoPorFeriados);
    $$("#txtMontoHrsExtrasAl25").val(montoHrsExtrasAl25);
    $$("#txtMontoHrsExtrasAl35").val(montoHrsExtrasAl35);
    $$("#txtDescuentoEntidadPension").val(dsctoPorPension);
    $$("#parEntidadSistemaPension").html(" ("+dataPerfilGlobal.entidadSistemaPensionStr+")");
    $$("#txtAporteEsSalud").val(aporteEsSalud);
    $$("#txtNetoAPagar").val(netoAPagar);
}

function regresar() {
    $$('#item-back').click();
}