var perfilHandler = {
    agregarPerfil: function (nombre, sueldo, tiene_hijos, entidad_sistema_pension, regimen_empresa) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "INSERT INTO perfil(nombre,sueldo,tiene_hijos,entidad_sistema_pension,regimen_empresa) values(?,?,?,?,?)",
                            [nombre, sueldo, tiene_hijos, entidad_sistema_pension, regimen_empresa],
                            function (tx, results) {
                                console.log("Inserción correcta de datos en tabla perfil");
                            },
                            function (tx, error) {
                                console.log("Error en inserción de datos a tabla perfil: " + error.message);
                            }
                    );
                }
        );
    },
    consultarPerfil: function () {

        databaseHandler.db.readTransaction(
                function (tx) {
                    tx.executeSql(
                            "SELECT * FROM perfil",
                            [],
                            function (tx, results) {
                                //Do the display
                                console.log("Consulta a tabla perfil realizada de forma exitosa");
                                perfil.resultadosPerfil(results);
                            },
                            function (tx, error) {//TODO: Alert the message to user
                               console.log("Ocurrió un error mientras se consultaba la tabla perfil:" + error.message);
                            }
                    );
                }
        );
    },
    cargarPerfil: function (_id) {

        databaseHandler.db.readTransaction(
                function (tx) {

                    console.log("ingresando a la consulta de datos");

                    tx.executeSql(
                            "SELECT * FROM perfil WHERE _id?",
                            [_id],
                            function (tx, results) {
                                //Do the display
                                console.log("Consulta a tabla perfil realizada de forma exitosa");
                                perfil.mostrarEntidades(results);
                            },
                            function (tx, error) {//TODO: Alert the message to user
                                console.log("Ocurrió un error mientras se consultaba la tabla perfil:" + error.message);
                            }
                    );
                }
        );
    },
    eliminarPerfil: function (_id) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "delete from perfil where _id = ?",
                            [_id],
                            function (tx, results) {
                                console.log("Eliminación de información de la tabla perfil realizada de forma exitosa");
                            },
                            function (tx, error) {//TODO: Could make an alert for this one.
                                console.log("Ocurrió un error mientras se eliminaba información de la tabla perfil: " + error.message);
                            }
                    );
                }
        );
    },
    actualizarPerfil: function (_id, nuevoNombre, nuevoSueldo, nuevoValidezHijos, nuevoEntidadPension, nuevoRegimenEmpresa) {
        databaseHandler.db.transaction(
                function (tx) {
                    tx.executeSql(
                            "update perfil set nombre=?,sueldo=?,tiene_hijos=?,entidad_sistema_pension=?,regimen_empresa=? where _id = ?",
                            [nuevoNombre, nuevoSueldo, nuevoValidezHijos, nuevoEntidadPension, nuevoRegimenEmpresa, _id],
                            function (tx, result) {
                                console.log("Actualización de información de la tabla perfil realizada de forma exitosa");
                                app.dialog.alert("Perfil fue actualizado correctamente");
                            },
                            function (tx, error) {//TODO: alert/display this message to user
                                console.log("Ocurrió un error mientras se actualizaba información de la tabla perfil: " + error.message);
                            }
                    );
                }
        );
    }
};