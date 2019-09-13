var beneficiosLeyesSociales = {

    consultarBeneficiosLeyesSociales: function () {
        beneficiosLeyesSocialesHandler.consultarBeneficiosLeyesSociales();
    },

    establecerValoresBeneficiosLeyesSociales: function (resultados) {
        var length = resultados.rows.length;

        for (var i = 0; i < length; i++) {
            var item = resultados.rows.item(i);
            console.log("regimen empresa= ["+dataPerfilGlobal.regimenEmpresa+"&"+item.regimen_empresa_id+"] - "+"[v="+item.vigente);
            if (dataPerfilGlobal.regimenEmpresa == item.regimen_empresa_id && item.vigente==1) {
                datosGeneralesApp.porcGratificacion = item.porcentaje_gratificacion;
                datosGeneralesApp.porcVacaciones=item.porcentaje_vacaciones;
                datosGeneralesApp.porcBonificacion=item.porcentaje_bonificacion;
                datosGeneralesApp.porcCTS=item.porcentaje_cts;
                datosGeneralesApp.porcEsSalud=item.porcentaje_essalud;
                datosGeneralesApp.porcSctrPension=item.porcentaje_sctr_pension;
                datosGeneralesApp.porcSctrSalud=item.porcentaje_sctr_salud;
            }
        }

    }
};