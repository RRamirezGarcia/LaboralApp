var $$ = Dom7;


$$(document).on('page:afterin', '.page[data-name="estructura-sueldo"]', function (e) {
    cargarDatosPantallaEstructura();
    establecerConceptosParaUsuario();
    $$("#btnRegresar").on("click", regresarEstructuraSueldo);
});

function cargarDatosPantallaEstructura() {
    var descuentoPension, gratificacion, vacaciones, bonificacion, cts, esSalud;

    $$("#sueldo_bruto").val(dataPerfilGlobal.sueldo);
    if (dataPerfilGlobal.tieneHijos === "si")
        $$("#asignacion_familiar").val(((datosGeneralesApp.asignacionFamiliarActual)).toFixed(2));
    else
        $$("#asignacion_familiar").val(0.00);

    $$("#parEntidadSistemaPension").html(dataPerfilGlobal.entidadSistemaPensionStr);

    descuentoPension = dataPerfilGlobal.sueldo * ((datosGeneralesApp.aporteObligatorioEntidadPension +
            datosGeneralesApp.comisionEntidadPension + datosGeneralesApp.primaSeguroEntidadPension) / 100);
    $$("#descuento").val((descuentoPension).toFixed(2));
    gratificacion = (dataPerfilGlobal.sueldo * datosGeneralesApp.porcGratificacion) / 100;
    vacaciones = (dataPerfilGlobal.sueldo * datosGeneralesApp.porcVacaciones) / 100;
    bonificacion = (gratificacion * datosGeneralesApp.porcBonificacion) / 100;
    cts = ((Number(gratificacion) + Number(dataPerfilGlobal.sueldo)) * datosGeneralesApp.porcCTS) / 100;
    esSalud = (dataPerfilGlobal.sueldo * datosGeneralesApp.porcEsSalud) / 100;

    $$("#gratificacion").val(gratificacion.toFixed(2));
    $$("#vacaciones").val(vacaciones.toFixed(2));
    $$("#bonificacion").val(bonificacion.toFixed(2));
    $$("#cts").val(cts.toFixed(2));
    $$("#essalud").val(esSalud.toFixed(2));

}

function regresarEstructuraSueldo() {
    $$('#item-back').click();
}

function establecerConceptosParaUsuario() {
    //PopOver Asignación Familiar
    var asignacionPopOver = app.popover.create({
        targetEl: '.label-asignacion',
        content: '<div class="popover">' +
                '<div class="popover-inner">' +
                '<div class="block">' +
                '<p>Los trabajadores tienen derecho a recibir una asignación familiar, es decir, un pago adicional\n\
                a su sueldo por tener uno o más hijos. El monto por asignación es equivalente al 10% de una remuneración \n\
                mínima vital. Por tanto su cálculo se realiza tal como se muestra a continuación:\n\</p>\n\
                Asignación Familiar = 10% x [RMV]' +
                '<p><a href="#" class="link popover-close">Cerrar</a></p>' +
                '</div>' +
                '</div>' +
                '</div>',
    });

    $$('.label-asignacion').on('click', function () {
        asignacionPopOver.open();
    });

    //PopOver Descuento Por ONP/AFP
    var porcDescuentoTotal = (parseFloat(datosGeneralesApp.aporteObligatorioEntidadPension) +
            parseFloat(datosGeneralesApp.comisionEntidadPension) +
            parseFloat(datosGeneralesApp.primaSeguroEntidadPension)).toFixed(2);
    var bandAFP = dataPerfilGlobal.entidadSistemaPensionStr.includes("AFP");
    var textoDetalleDescuento;
    if (bandAFP) {
        textoDetalleDescuento = "<p> Aporte Obligatorio: " + datosGeneralesApp.aporteObligatorioEntidadPension + "% <br/>" +
                "Comisión AFP:" + datosGeneralesApp.comisionEntidadPension + "%<br/>" +
                "Prima Seguro: " + datosGeneralesApp.primaSeguroEntidadPension + "%<br/></p>";
    } else {
        textoDetalleDescuento = "<p> Aporte Obligatorio total: " + datosGeneralesApp.aporteObligatorioEntidadPension + "% </p>";
    }

    var contentPension = '<div class="popover">' +
            '<div class="popover-inner">' +
            '<div class="block">' +
            '<p>El descuento es por su afiliación a ' + dataPerfilGlobal.entidadSistemaPensionStr +
            '. El mismo corresponde a un total del ' + porcDescuentoTotal + '% del sueldo bruto que se conforma como sigue: </p>' +
            textoDetalleDescuento +
            '<p><a href="#" class="link popover-close">Cerrar</a></p>' +
            '</div>' +
            '</div>' +
            '</div>';

    var pensionPopOver = app.popover.create({
        targetEl: '#label-descuento-pension',
        content: contentPension,
    });
    $$('#label-descuento-pension').on('click', function () {
        pensionPopOver.open();
    });

    //PopOver Descuento Por Gratificación
    var numeradorFormulaGratificacion;

    if (dataPerfilGlobal.regimenEmpresa == 1)
        numeradorFormulaGratificacion = 6;
    else
        numeradorFormulaGratificacion = 12;


    var gratificacionPopOver = app.popover.create({
        targetEl: '#label-gratificacion',
        content: '<div class="popover">' +
                '<div class="popover-inner">' +
                '<div class="block">' +
                '<p>El pago de gratificación es obligatoria para todos los trabajadores de la actividad privada' +
                'y algunos pertenecientes a las entidades públicas reguladas por el D.L N° 728.</p>' +
                '<p>La empresa en la que Ud. labora pertenece al régimen ' + dataPerfilGlobal.regimenEmpresaStr +
                ', por tanto el cálculo de la gratificación deberá realizarlo aplicando la siguiente fórmula: </p>' +
                '<p>Gratificación=[sueldo base]/' + numeradorFormulaGratificacion + '</p>' +
                '<p><a href="#" class="link popover-close">Cerrar</a></p>' +
                '</div>' +
                '</div>' +
                '</div>',
    }
    );
    $$('#label-gratificacion').on('click', function () {
        gratificacionPopOver.open();
    });

    //PopOver Vacaciones
    var numeradorFormulaVacaciones;

    if (dataPerfilGlobal.regimenEmpresa == 1)
        numeradorFormulaVacaciones = 12;
    else
        numeradorFormulaVacaciones = 24;

    var vacacionesPopOver = app.popover.create({
        targetEl: '#label-vacaciones',
        content: '<div class="popover">' +
                '<div class="popover-inner">' +
                '<div class="block">' +
                '<p>Las vacaciones son un derecho del trabajador. Las leyes laborales garantizan un mínimo de 15 días para Régimen MYPE y 30 días para Régimen General.</p>' +
                '<p>La empresa en la que Ud. labora pertenece al régimen ' + dataPerfilGlobal.regimenEmpresaStr +
                ', por tanto el cálculo de vacaciones deberá realizarlo aplicando la siguiente fórmula: </p>' +
                '<p>Vacaciones=[sueldo base]/' + numeradorFormulaVacaciones + '</p>' +
                '<p><a href="#" class="link popover-close">Cerrar</a></p>' +
                '</div>' +
                '</div>' +
                '</div>',
    }
    );
    $$('#label-vacaciones').on('click', function () {
        vacacionesPopOver.open();
    });

    //PopOver Bonificacion
    var bonificacionPopOver = app.popover.create({
        targetEl: '#label-bonificacion',
        content: '<div class="popover">' +
                '<div class="popover-inner">' +
                '<div class="block">' +
                '<p>En los meses meses de julio y diciembre, el empleador solía pagar un aporte equivalente al 9% del monto de \n\
            las gratificaciones, a favor del Seguro Social de Salud (EsSalud); sin embargo, a partir de la dación de la Ley 29351, \n\
            se ha establecido, conforme al artículo 3° que, en vez de pagar ese 9% al Seguro, dicho monto sea entregado a favor del trabajador, \n\
            conjuntamente con sus gratificaciones en dichos meses. El cálculo de la bonificación se realiza en base a la siguiente fórmula:</p>\n\
            Bonificación= 9% x [Gratificación]' +
                '<p><a href="#" class="link popover-close">Cerrar</a></p>' +
                '</div>' +
                '</div>' +
                '</div>',
    }
    );
    $$('#label-bonificacion').on('click', function () {
        bonificacionPopOver.open();
    });

    //PopOver CTS
    var ctsPopOver = app.popover.create({
        targetEl: '#label-cts',
        content: '<div class="popover">' +
                '<div class="popover-inner">' +
                '<div class="block">' +
                '<p>La Compensación por Tiempo de Servicio (CTS) permite que los trabajadores tengan un fondo que puedan utilizar en caso dejen de trabajar en la empresa. \n\
            Por esta razón este monto que se va acumulando no se puede retirar a menos que el trabajador haya acumulado el equivalente a cinco sueldos. Una vez logrado, \n\
            podrá proceder a retirar el excedente a esas cinco remuneraciones. La CTS se calcula como sigue:</p>\n\
            CTS= [sueldo base + gratificación]/' + numeradorFormulaGratificacion +
                '<p><a href="#" class="link popover-close">Cerrar</a></p>' +
                '</div>' +
                '</div>' +
                '</div>',
    }
    );
    $$('#label-cts').on('click', function () {
        ctsPopOver.open();
    });

    //PopOver EsSalud
    var essaludPopOver = app.popover.create({
        targetEl: '#label-essalud',
        content: '<div class="popover">' +
                '<div class="popover-inner">' +
                '<div class="block">' +
                '<p>Es tu derecho como trabajador dependiente contar con cobertura de Seguro Regular +SEGURO. \n\
            Tu empleador será quien te registre y quien pague mensualmente los aportes para que estés cubierto\n\
            El aporte que hará tu empleador corresponde al 9% de tu remuneración o  ingreso mensual, el cual no podrá \n\
            ser menor que la Remuneración Mínima Vital (RMV). \n\
            El aporte mensual a EsSalud no será descontado de tu remuneración, \n\
            sino que será pagado completamente por tu empleador. El aporte a EsSalud se calcula como sigue:</p>\n\
            EsSalud= 9% x [sueldo base], donde sueldo base>=RMV' +
                '<p><a href="#" class="link popover-close">Cerrar</a></p>' +
                '</div>' +
                '</div>' +
                '</div>',
    }
    );
    $$('#label-essalud').on('click', function () {
        essaludPopOver.open();
    });

}