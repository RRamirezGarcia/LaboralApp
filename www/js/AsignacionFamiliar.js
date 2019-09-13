var asignacionFamiliar = {
    consultarAsignacionFamiliar: function (fechaCheck) {
        asignacionFamiliarHandler.consultarAsignacionFamiliar(fechaCheck);
    },
    establecerAsignacionFamiliar: function (resultados, fechaCheck) {
        var length = resultados.rows.length;
        for (var i = 0; i < length; i++) {
            var item = resultados.rows.item(i);
            var fechaIniVigencia = item.ini_vigencia;
            var fechaFinVigencia = item.fin_vigencia;
            var d1 = fechaIniVigencia.split("/");
            var d2 = fechaFinVigencia.split("/");

            var iniVigencia = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
            var finVigencia = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
            
            if(fechaCheck > iniVigencia && fechaCheck < finVigencia){
                datosGeneralesApp.asignacionFamiliarActual=item.monto_asignacion;
            }
        }
    }
};
