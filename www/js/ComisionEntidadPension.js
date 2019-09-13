var comisionEntidadPension = {

    consultarComisionEntidad: function () {
        comisionEntidadPensionHandler.consultarComisionEntidad();
        entidadSistemaPensionHandler.consultarEntidad();
    },

    establecerValoresComisiones: function (resultados) {
        var length = resultados.rows.length;
        var d = new Date();
        for (var i = 0; i < length; i++) {
            var item = resultados.rows.item(i);
            if (dataPerfilGlobal.entidadSistema == item.entidad_sistema_id && item.mes == (d.getMonth() + 1) && item.anio == d.getFullYear()) {
                datosGeneralesApp.aporteObligatorioEntidadPension = item.aporte_obligatorio;
                datosGeneralesApp.comisionEntidadPension = item.comision_mixta_flujo;
                datosGeneralesApp.primaSeguroEntidadPension = item.prima_seguro;
            }
        }
    },
    
    establecerEntidadPension: function(resultados){
        var length = resultados.rows.length;
        for (var i = 0; i < length; i++) {
            var item = resultados.rows.item(i);
            if(dataPerfilGlobal.entidadSistema == item._id){
                dataPerfilGlobal.entidadSistemaPensionStr = item.descripcion;  
            }
        }
    }
};
