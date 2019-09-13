var databaseHandler = {
    db: null,
    createDatabase: function () {

        this.db = window.openDatabase("laboral.db", "1.0", "laboral database", 1000000);

        //Una transacción para la creación de la tabla
        this.db.transaction(
                function (tx) {

                    //Eliminación de tablas base
                    tx.executeSql("DROP TABLE IF EXISTS sistema_pensiones");
                    tx.executeSql("DROP TABLE IF EXISTS comisiones_entidades_pensiones");
                    tx.executeSql("DROP TABLE IF EXISTS beneficios_leyes_sociales");
                    tx.executeSql("DROP TABLE IF EXISTS historico_asignacion_familiar");
                    tx.executeSql("DROP TABLE IF EXISTS anio");

                    //Creación de tablas e inserción de datos
                    tx.executeSql("CREATE TABLE IF NOT EXISTS sistema_pensiones(_id integer primary key, descripcion text)",
                            [],
                            function (tx, results) {
                                console.log("Creación correcta de tabla sistema_pensiones");
                            },
                            function (tx, error) {
                                console.log("Error mientras se creaba la tabla sistema_pensiones: " + error.message);
                            });

                    tx.executeSql(
                            "INSERT INTO sistema_pensiones(_id,descripcion) VALUES (1,'ONP'),(2, 'AFP Habitat'), (3,'AFP Profuturo'), (4,'AFP Prima'), (5,'AFP Integra')",
                            [],
                            function (tx, results) {
                                console.log("Inserción correcta de datos en tabla sistema_pensiones");
                            },
                            function (tx, error) {
                                console.log("Error en inserción de datos a tabla sistema_pensiones: " + error.message);
                            }
                    );

                    tx.executeSql("CREATE TABLE IF NOT EXISTS comisiones_entidades_pensiones(_id integer primary key asc, entidad_sistema_id, mes, anio, comision_mixta_flujo, prima_seguro, aporte_obligatorio)",
                            [],
                            function (tx, results) {
                                console.log("Creación correcta de tabla comisiones_entidades_pensiones");
                            },
                            function (tx, error) {
                                console.log("Error mientras se creaba la tabla comisiones_entidades_pensiones: " + error.message);
                            });

                    tx.executeSql(
                            "INSERT INTO comisiones_entidades_pensiones(entidad_sistema_id, mes, anio, comision_mixta_flujo, prima_seguro, aporte_obligatorio) \n\
                                    VALUES \n\
                                                (1,8,2019,0,0,13),(2,8,2019,0.38,1.35,10), (3,8,2019,0.67,1.35,10), (4,8,2019,0.18,1.35,10), (5,8,2019,0.00,1.35,10),\n\
                                                (1,9,2019,0,0,13),(2,9,2019,0.38,1.35,10), (3,9,2019,0.67,1.35,10), (4,9,2019,0.18,1.35,10), (5,9,2019,0.00,1.35,10),\n\
                                                (1,10,2019,0,0,13),(2,10,2019,0.38,1.35,10), (3,10,2019,0.67,1.35,10), (4,10,2019,0.18,1.35,10), (5,10,2019,0.00,1.35,10),\n\
                                                (1,11,2019,0,0,13),(2,11,2019,0.38,1.35,10), (3,11,2019,0.67,1.35,10), (4,11,2019,0.18,1.35,10), (5,11,2019,0.00,1.35,10),\n\
                                                (1,12,2019,0,0,13),(2,12,2019,0.38,1.35,10), (3,12,2019,0.67,1.35,10), (4,12,2019,0.18,1.35,10), (5,12,2019,0.00,1.35,10),\n\
                                                (1,1,2020,0,0,13),(2,1,2020,0.38,1.35,10), (3,1,2020,0.67,1.35,10), (4,1,2020,0.18,1.35,10), (5,1,2020,0.00,1.35,10),\n\
                                                (1,2,2020,0,0,13),(2,2,2020,0.38,1.35,10), (3,2,2020,0.67,1.35,10), (4,2,2020,0.18,1.35,10), (5,2,2020,0.00,1.35,10),\n\
                                                (1,3,2020,0,0,13),(2,3,2020,0.38,1.35,10), (3,3,2020,0.67,1.35,10), (4,3,2020,0.18,1.35,10), (5,3,2020,0.00,1.35,10), \n\
                                                (1,4,2020,0,0,13),(2,4,2020,0.38,1.35,10), (3,4,2020,0.67,1.35,10), (4,4,2020,0.18,1.35,10), (5,4,2020,0.00,1.35,10)",
                            [],
                            function (tx, results) {
                                console.log("Inserción correcta de datos en tabla comisiones_entidades_pensiones");
                            },
                            function (tx, error) {
                                console.log("Error en inserción de datos a tabla comisiones_entidades_pensiones: " + error.message);
                            }
                    );

                    tx.executeSql("CREATE TABLE IF NOT EXISTS beneficios_leyes_sociales(_id integer primary key asc, regimen_empresa_id, porcentaje_gratificacion, porcentaje_vacaciones, porcentaje_bonificacion, porcentaje_cts, porcentaje_essalud,porcentaje_sctr_pension,porcentaje_sctr_salud,vigente)",
                            [],
                            function (tx, results) {
                                console.log("Creación correcta de tabla beneficios_leyes_sociales");
                            },
                            function (tx, error) {
                                console.log("Error mientras se creaba la tabla beneficios_leyes_sociales: " + error.message);
                            });

                    tx.executeSql(
                            "INSERT INTO beneficios_leyes_sociales(regimen_empresa_id, porcentaje_gratificacion, porcentaje_vacaciones, porcentaje_bonificacion, porcentaje_cts, porcentaje_essalud,porcentaje_sctr_pension,porcentaje_sctr_salud,vigente) \n\
                                    VALUES \n\
                                                (1,16.67,8.33,9,8.33,9,1.23,0.94,1),(2,8.33,4.17,9,4.17,9,1.23,0.94,1)",
                            [],
                            function (tx, results) {
                                console.log("Inserción correcta de datos en tabla beneficios_leyes_sociales");
                            },
                            function (tx, error) {
                                console.log("Error en inserción de datos a tabla beneficios_leyes_sociales: " + error.message);
                            }
                    );

                    tx.executeSql("CREATE TABLE IF NOT EXISTS historico_asignacion_familiar(_id integer primary key asc, ini_vigencia, fin_vigencia,monto_asignacion)",
                            [],
                            function (tx, results) {
                                console.log("Creación correcta de tabla historico_asignacion_familiar");
                            },
                            function (tx, error) {
                                console.log("Error mientras se creaba la tabla historico_asignacion_familiar: " + error.message);
                            });

                    tx.executeSql(
                            "INSERT INTO historico_asignacion_familiar(ini_vigencia,fin_vigencia,monto_asignacion) \n\
                                    VALUES \n\
                                                ('01/04/2018','31/12/2030',95.00)",
                            [],
                            function (tx, results) {
                                console.log("Inserción correcta de datos en tabla historico_asignacion_familiar");
                            },
                            function (tx, error) {
                                console.log("Error en inserción de datos a tabla historico_asignacion_familiar: " + error.message);
                            }
                    );

                    tx.executeSql("CREATE TABLE IF NOT EXISTS anio(_id integer primary key asc, anio)",
                            [],
                            function (tx, results) {
                                console.log("Creación correcta de tabla anio");
                            },
                            function (tx, error) {
                                console.log("Error mientras se creaba la tabla anio: " + error.message);
                            });

                    tx.executeSql(
                            "INSERT INTO anio(anio) \n\
                                    VALUES \n\
                                                (2019),(2020)",
                            [],
                            function (tx, results) {
                                console.log("Inserción correcta de datos en tabla anio");
                            },
                            function (tx, error) {
                                console.log("Error en inserción de datos a tabla anio: " + error.message);
                            }
                    );

                    tx.executeSql("CREATE TABLE IF NOT EXISTS perfil(_id integer primary key asc, nombre,sueldo,tiene_hijos,entidad_sistema_pension,regimen_empresa)",
                            [],
                            function (tx, results) {
                                console.log("Creación correcta de tabla perfil");
                            },
                            function (tx, error) {
                                console.log("Error mientras se creaba la tabla perfil: " + error.message);
                            });
                },
                function (error) {
                    console.log("Error mientras se creaba la base de datos: " + error.message);
                },
                function () {
                    console.log("Creación de base de datos se completó satisfactoriamente");
                }
        );

    }
}