// Requires
const storage = require("../storage");

// Inicializando las rutas en router
const routers = (app) => {
  // ruta ./buscar
  app.get("/buscar", (req, res) => {
    storage
      .getDataAll()
      .then((data) => {
        res.json({ error: false, datos: data });
      })
      .catch((error) => {
        res.json({ error: true, datos: error });
      });
  });

  // retorna las listas filtradas en los selectores de html
  app.get("/listas", (req, res) => {
    storage
      .getDataAll()
      .then((data) => {
        let ciudades = [];
        let tipos = [];
        data.forEach((element) => {
          if (ciudades.indexOf(element.Ciudad) < 0)
            ciudades.push(element.Ciudad);
          if (tipos.indexOf(element.Tipo) < 0) tipos.push(element.Tipo);
        });
        res.json({ error: false, ciudades: ciudades, tipos: tipos });
      })
      .catch((error) => {
        res.json({ error: true, errores: error });
      });
  });
  app.get(
    "/ciudad/:ciudadId/tipo/:tipoId/desde/:desdeVal/hasta/:hastaVal",
    (req, res) => {
      let params = req.params;
      storage
        .getDataAll()
        .then((data) => {
          let aux = [];
          let arreglo = [];
          let datos = [];

          // copiar los datos a aux
          aux = data.slice();

          // validar la seleccion de ciudades
          if (params.ciudadId != "todas")
            aux.forEach((element) => {
              if (element.Ciudad === params.ciudadId) arreglo.push(element);
            });
          else arreglo = aux.slice();

          // reiniciar el arreglo auxiliar
          aux = [];
          aux = arreglo.slice();
          arreglo = [];

          // validad la seleccion de especifico
          if (params.tipoId != "todos")
            aux.forEach((element) => {
              if (element.Tipo == params.tipoId) arreglo.push(element);
            });
          else arreglo = aux.slice();

          // Recorrer y filtrar si esta entre los valores seleccionados
          arreglo.forEach((element) => {
            let valor = parseInt(
              element.Precio.replace("$", "").replace(",", "")
            );
            if (
              valor >= parseInt(params.desdeVal) &&
              valor <= parseInt(params.hastaVal)
            )
              datos.push(element);
          });

          res.status(200).json({ datos, params });
        })
        .catch((error) => {
          res.json({ error: true, errores: error });
        });
    }
  );
};

module.exports = routers;
