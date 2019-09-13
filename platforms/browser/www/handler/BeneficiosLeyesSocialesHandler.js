var beneficiosLeyesSocialesHandler = {
    agregarBeneficiosLeyesSociales: function (regimenEmpresaId, porcGratificacion, porcVacaciones, porcBonificacion, porcCts, porcEssalud,porcSctrPension,porcSctrSalud) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "INSERT INTO beneficios_leyes_sociales(regimen_empresa_id, porcentaje_gratificacion, porcentaje_vacaciones, porcentaje_bonificacion, porcentaje_cts, porcentaje_essalud,porcentaje_sctr_pension,porcentaje_sctr_salud,vigente) values(?,?,?,?,?,?,?,?,?)",
                            [regimenEmpresaId, porcGratificacion, porcVacaciones, porcBonificacion, porcCts, porcEssalud,porcSctrPension,porcSctrSalud,1],
                            function (tx, results) {
                                console.log("Inserción correcta de datos en tabla beneficios_leyes_sociales");
                            },
                            function (tx, error) {
                                console.log("Error en inserción de datos a tabla beneficios_leyes_sociales: " + error.message);
                            }
                    );
                },
                function (error) {},
                function () {}
        );
    },
    consultarBeneficiosLeyesSociales: function () {
        databaseHandler.db.readTransaction(
                function (tx) {
                    tx.executeSql(
                            "SELECT * FROM beneficios_leyes_sociales", // entidad_sistema_id = ? AND mes=? AND anio=?
                            [], //, mes, anio
                            function (tx, results) {
                                console.log("Consulta a tabla beneficios_leyes_sociales realizada de forma exitosa");
                                
                                beneficiosLeyesSociales.establecerValoresBeneficiosLeyesSociales(results);
                            },
                            function (tx, error) {//TODO: Alert the message to user
                                console.log("Ocurrió un error mientras se consultaba la tabla beneficios_leyes_sociales:" + error.message);
                            }
                    );
                }
        );
    },
    eliminarBeneficiosLeyesSociales: function (_id) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "delete from beneficios_leyes_sociales where _id=?",
                            [_id],
                            function (tx, results) {
                                console.log("Eliminación de información de la tabla beneficios_leyes_sociales realizada de forma exitosa");
                            },
                            function (tx, error) {//TODO: Could make an alert for this one.
                                console.log("Ocurrió un error mientras se eliminaba información de la tabla beneficios_leyes_sociales: " + error.message);
                            }
                    );
                }
        );
    }
};