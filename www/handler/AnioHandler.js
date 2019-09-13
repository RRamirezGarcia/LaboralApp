var anioHandler = {
    consultarAnios: function () {
        databaseHandler.db.readTransaction(
                function (tx) {
                    tx.executeSql(
                            "SELECT * FROM anio", 
                            [], 
                            function (tx, results) {
                                console.log("Consulta a tabla anio realizada de forma exitosa");
                                
                                anio.establecerAnios(results);
                            },
                            function (tx, error) {
                                console.log("Ocurrió un error mientras se consultaba la tabla anio:" + error.message);
                            }
                    );
                }
        );
    }
};

