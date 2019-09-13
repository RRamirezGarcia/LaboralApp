var $$ = Dom7;
var calendarioFechaInicio, calendarioFechaFin;

var datosLiquidacion = {
    fechaIngresoStr: '',
    fechaCeseStr: '',
    fechaIngresoTrabajador: 0,
    fechaCeseTrabajador: 0
};

$$(document).on('page:init', '.page[data-name="liquidacion"]', function (e) {
    iniciarPantallaLiquidacion();
    $$('#btnCalcularLiquidacion').on('click', validarDatosFormulario);
});

$$(document).on('page:init', '.page[data-name="liquidacion_trabajador"]', function (e) {
    obtenerDatosParaPantallaLiquidacion();
    establecerDatosEnPantallaLiquidacion();
    $$("#btnRegresar").on("click", regresar);

});

function iniciarPantallaLiquidacion() {
    var calendarioFechaIngreso, calendarioFechaCese;
    var tempMinDate = new Date(1970, 1, 1);

    calendarioFechaIngreso = app.calendar.create({
        inputEl: '#fechaIngreso',
        dateFormat: 'dd/mm/yyyy',
        minDate: tempMinDate,
        on: {
            opened: function () {
                $$('.calendar-month-selector .calendar-prev-month-button').html('<i class="icon material-icons">arrow_back</i>');
                $$('.calendar-month-selector .calendar-next-month-button').html('<i class="icon material-icons">arrow_forward</i>');

                $$('.calendar-year-selector .calendar-prev-year-button').html('<i class="icon material-icons">arrow_back</i>');
                $$('.calendar-year-selector .calendar-next-year-button').html('<i class="icon material-icons">arrow_forward</i>');
            },
            change: function (cal, value) {
                var fechaIngreso = new Date(value);
                if (fechaIngreso > calendarioFechaCese.minDate) {
                    calendarioFechaCese.setValue([fechaIngreso]);
                }
                calendarioFechaCese.minDate = new Date(fechaIngreso.getFullYear(), fechaIngreso.getMonth(), fechaIngreso.getDate());
            }
        }
    });

    calendarioFechaCese = app.calendar.create({
        inputEl: '#fechaCese',
        dateFormat: 'dd/mm/yyyy',
        minDate: tempMinDate,
        on: {
            opened: function () {
                $$('.calendar-month-selector .calendar-prev-month-button').html('<i class="icon material-icons">arrow_back</i>');
                $$('.calendar-month-selector .calendar-next-month-button').html('<i class="icon material-icons">arrow_forward</i>');

                $$('.calendar-year-selector .calendar-prev-year-button').html('<i class="icon material-icons">arrow_back</i>');
                $$('.calendar-year-selector .calendar-next-year-button').html('<i class="icon material-icons">arrow_forward</i>');
            },
            change: function (cal, value) {
                var fechaCese = new Date(value);
                if (fechaCese < calendarioFechaCese.minDate) {
                    calendarioFechaCese.setValue([calendarioFechaCese.minDate]);
                }
            }
        }
    }
    );
}

function validarDatosFormulario(e) {
    e.preventDefault();
    var fechaIngreso = $$('#fechaIngreso').val();
    var fechaCese = $$('#fechaCese').val();

    if (fechaIngreso !== "" && fechaCese !== "") {
        document.getElementById("btnCalcularLiquidacion").href = "/liquidacion_trabajador/";
        document.getElementById("btnCalcularLiquidacion").click();
        document.getElementById("btnCalcularLiquidacion").href = "#";
        return false;
    } else {
        return false;
    }
}

function obtenerDatosParaPantallaLiquidacion() {
    var fechaIngreso, arrayFechaIngreso, fechaCese, arrayFechaCese;
    fechaIngreso = $$('#fechaIngreso').val();
    datosLiquidacion.fechaIngresoStr = fechaIngreso;
    arrayFechaIngreso = fechaIngreso.split("/");
    datosLiquidacion.fechaIngresoTrabajador = new Date(parseInt(arrayFechaIngreso[2]), parseInt(arrayFechaIngreso[1]), parseInt(arrayFechaIngreso[0]));

    fechaCese = $$('#fechaCese').val();
    datosLiquidacion.fechaCeseStr = fechaCese;
    arrayFechaCese = fechaCese.split("/");
    datosLiquidacion.fechaCeseTrabajador = new Date(parseInt(arrayFechaCese[2]), parseInt(arrayFechaCese[1]), parseInt(arrayFechaCese[0]));


}

function establecerDatosEnPantallaLiquidacion() {
    var difMilisegundos, difDias;
    var gratificacionMensual, gratificacionPorDia, vacacionesPorDia, bonificacionPorDia, ctsPorDia;
    var gratificacionTotal, vacacionesTotal, bonificacionTotal, ctsTotal;

    difMilisegundos = parseInt(datosLiquidacion.fechaCeseTrabajador.getTime()) - parseInt(datosLiquidacion.fechaIngresoTrabajador.getTime());
    difDias = parseFloat(difMilisegundos) / parseFloat(1000 * 60 * 60 * 24);
    document.getElementById("divRangoFechas").innerHTML = "Del " + datosLiquidacion.fechaIngresoStr + " al " + datosLiquidacion.fechaCeseStr + "";

    gratificacionMensual = ((parseFloat(dataPerfilGlobal.sueldo) * parseFloat(datosGeneralesApp.porcGratificacion)) / 100);
    gratificacionPorDia = parseFloat(gratificacionMensual) / parseFloat(30);
    vacacionesPorDia = (parseFloat(dataPerfilGlobal.sueldo) * parseFloat(datosGeneralesApp.porcVacaciones) / 100) / parseFloat(30);
    bonificacionPorDia = (parseFloat(gratificacionPorDia) * parseFloat(datosGeneralesApp.porcBonificacion) / 100);
    ctsPorDia = parseFloat(((Number(gratificacionMensual) + Number(dataPerfilGlobal.sueldo)) * datosGeneralesApp.porcCTS) / 100) / parseFloat(30);
    
    gratificacionTotal = parseFloat(gratificacionPorDia * difDias).toFixed(2);
    vacacionesTotal = parseFloat(vacacionesPorDia * difDias).toFixed(2);
    bonificacionTotal = parseFloat(bonificacionPorDia * difDias).toFixed(2);
    ctsTotal = parseFloat(ctsPorDia * difDias).toFixed(2);

    $$('#txtMontoPorGratificacion').val(gratificacionTotal);
    $$('#txtMontoPorVacaciones').val(vacacionesTotal);
    $$('#txtMontoPorBonificacion').val(bonificacionTotal);
    $$('#txtMontoPorCTS').val(ctsTotal);

}

function regresar() {
    $$('#item-back').click();
}