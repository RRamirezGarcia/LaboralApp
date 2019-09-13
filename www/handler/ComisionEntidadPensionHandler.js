var comisionEntidadPensionHandler = {
    agregarComisionEntidad: function (entidadId, mes, anio, comisionMixtaFlujo, primaSeguro, aporteObligatorio) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "INSERT INTO comisiones_entidades_pensiones(entidad_id,mes, anio, comision_mixta_flujo, prima_seguro, aporte_obligatorio) values(?,?,?,?,?,?)",
                            [entidadId, mes, anio, comisionMixtaFlujo, primaSeguro, aporteObligatorio],
                            function (tx, results) {
                                console.log("Inserción correcta de datos en tabla comisiones_entidades_pensiones");
                            },
                            function (tx, error) {
                                console.log("Error en inserción de datos a tabla comisiones_entidades_pensiones: " + error.message);
                            }
                    );
                },
                function (error) {},
                function () {}
        );
    },
    consultarComisionEntidad: function () {

        databaseHandler.db.readTransaction(
                function (tx) {
                    tx.executeSql(
                            "select * from comisiones_entidades_pensiones", // entidad_sistema_id = ? AND mes=? AND anio=?
                            [], //, mes, anio
                            function (tx, results) {
                                console.log("Consulta a tabla comisiones_entidades_pensiones realizada de forma exitosa");
                                comisionEntidadPension.establecerValoresComisiones(results);
                            },
                            function (tx, error) {//TODO: Alert the message to user
                                console.log("Ocurrió un error mientras se consultaba la tabla comisiones_entidades_pensiones:" + error.message);
                            }
                    );
                }
        );
    },
    eliminarComisionEntidad: function (entidadId, mes, anio) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "delete from comisiones_entidades_pensiones where entidad_sistema_id = ? and mes=? and anio=?",
                            [entidadId, mes, anio],
                            function (tx, results) {
                                console.log("Eliminación de información de la tabla comisiones_entidades_pensiones realizada de forma exitosa");
                            },
                            function (tx, error) {//TODO: Could make an alert for this one.
                                console.log("Ocurrió un error mientras se eliminaba información de la tabla comisiones_entidades_pensiones: " + error.message);
                            }
                    );
                }
        );
    },
    actualizarComisionEntidad: function (_id, entidadId, mes, anio, comisionMixtaFlujo, primaSeguro, aporteObligatorio) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "update comisiones_entidades_pensiones set entidad_id=?,mes=?, anio=?, comision_mixta_flujo=?, prima_seguro=?, aporte_obligatorio=? where _id = ?",
                            [entidadId, mes, anio, comisionMixtaFlujo, primaSeguro, aporteObligatorio, _id],
                            function (tx, result) {
                                console.log("Actualización de información de la tabla comisiones_entidades_pensiones realizada de forma exitosa");
                                alert("Su perfil fue actualizado correctamente");
                            },
                            function (tx, error) {//TODO: alert/display this message to user
                                console.log("Ocurrió un error mientras se actualizaba información de la tabla comisiones_entidades_pensiones: " + error.message);
                            }
                    );
                }
        );
    }
};