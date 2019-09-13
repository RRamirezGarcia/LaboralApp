var asignacionFamiliarHandler = {
    agregarAsignacionFamiliar: function (iniVigencia,finVigencia,montoAsignacion) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "INSERT INTO historico_asignacion_familiar(ini_vigencia,fin_vigencia,monto_asignacion) values(?,?,?)",
                            [iniVigencia,finVigencia,montoAsignacion],
                            function (tx, results) {
                                console.log("Inserción correcta de datos en tabla historico_asignacion_familiar");
                            },
                            function (tx, error) {
                                console.log("Error en inserción de datos a tabla historico_asignacion_familiar: " + error.message);
                            }
                    );
                }
        );
    },
    consultarAsignacionFamiliar: function (fechaCheck) {
        databaseHandler.db.readTransaction(
                function (tx) {
                    tx.executeSql(
                            "SELECT * FROM historico_asignacion_familiar", 
                            [], 
                            function (tx, results) {
                                console.log("Consulta a tabla historico_asignacion_familiar realizada de forma exitosa");
                                
                                asignacionFamiliar.establecerAsignacionFamiliar(results,fechaCheck);
                            },
                            function (tx, error) {//TODO: Alert the message to user
                                console.log("Ocurrió un error mientras se consultaba la tabla historico_asignacion_familiar:" + error.message);
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
                                console.log("Eliminación de información de la tabla historico_asignacion_familiar realizada de forma exitosa");
                            },
                            function (tx, error) {//TODO: Could make an alert for this one.
                                console.log("Ocurrió un error mientras se eliminaba información de la tabla historico_asignacion_familiar: " + error.message);
                            }
                    );
                }
        );
    }
};