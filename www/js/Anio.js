
var anio = {
    consultarAnios: function () {
        anioHandler.consultarAnios();
    },
    establecerAnios: function (resultados) {
        var length = resultados.rows.length;
        anios = [];
        for (var i = 0; i < length; i++) {
            var item = resultados.rows.item(i);
            var anio = new Anio(item._id, item.anio);
            anios.push(anio);
        }
    }
};

function Anio(_id, anio) {
    this._id = _id;
    this.anio = anio;
}

