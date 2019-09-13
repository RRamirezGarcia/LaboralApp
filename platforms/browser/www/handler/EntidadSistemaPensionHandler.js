var entidadSistemaPensionHandler = {
    agregarEntidad: function (_id, descripcion) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "INSERT INTO sistema_pensiones(_id, descripcion) values(?, ?)",
                            [_id, descripcion],
                            function (tx, results) {
                                console.log("Inserción correcta de datos en tabla sistema_pensiones");
                            },
                            function (tx, error) {
                                console.log("Error en inserción de datos a tabla sistema_pensiones: " + error.message);
                            }
                    );
                },
                function (error) {},
                function () {}
        );
    },
    agregarEntidadesPorDefecto: function () {

        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "INSERT INTO sistema_pensiones(_id,descripcion) VALUES ('1','ONP'),('2', 'AFP Habitat'), ('3','AFP Profuturo'), ('4','AFP Prima'), ('5','AFP Integra')",
                            [_id, descripcion],
                            function (tx, results) {
                                console.log("Inserción correcta de datos en tabla sistema_pensiones");
                            },
                            function (tx, error) {
                                console.log("Error en inserción de datos a tabla sistema_pensiones: " + error.message);
                            }
                    );
                }
        );
    },
    cargarEntidades: function () {

        databaseHandler.db.readTransaction(
                function (tx) {
                    tx.executeSql(
                            "select * from sistema_pensiones",
                            [],
                            function (tx, results) {
                                //Do the display
                                console.log("Consulta a tabla sistema_pensiones realizada de forma exitosa");
                                perfil.mostrarEntidades(results);
                            },
                            function (tx, error) {//TODO: Alert the message to user
                                console.log("Ocurrió un error mientras se consultaba la tabla sistema_pensiones:" + error.message);
                            }
                    );
                }
        );
    },
    consultarEntidad: function () {

        databaseHandler.db.readTransaction(
                function (tx) {

                    console.log("ingresando a la consulta de datos");

                    tx.executeSql(
                            "SELECT * FROM sistema_pensiones",
                            [],
                            function (tx, results) {
                                //Do the display
                                console.log("Consulta a tabla sistema_pensiones realizada de forma exitosa");
                                comisionEntidadPension.establecerEntidadPension(results);
                            },
                            function (tx, error) {//TODO: Alert the message to user
                                console.log("Ocurrió un error mientras se consultaba la tabla sistema_pensiones:" + error.message);
                            }
                    );
                }
        );
    },
    eliminarEntidad: function (_id) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "delete from sistema_pensiones where _id = ?",
                            [_id],
                            function (tx, results) {
                                console.log("Eliminación de información de la tabla sistema_pensiones realizada de forma exitosa");
                            },
                            function (tx, error) {//TODO: Could make an alert for this one.
                                console.log("Ocurrió un error mientras se eliminaba información de la tabla comisiones_entidades_pensiones: " + error.message);
                            }
                    );
                }
        );
    },
    actualizarEntidad: function (_id, newDescripcion) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "update sistema_pensiones set descripcion=? where _id = ?",
                            [newDescripcion, _id],
                            function (tx, result) {
                                console.log("Actualización de información de la tabla sistema_pensiones realizada de forma exitosa");
                            },
                            function (tx, error) {//TODO: alert/display this message to user
                                console.log("Ocurrió un error mientras se actualizaba información de la tabla sistema_pensiones: " + error.message);
                            }
                    );
                }
        );
    }
};