$(document).ready(function () {
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$",
  });

  init();
  setSearch();

  // Busca segun la filtracion
  $("#buscar").click(function () {
    if ($("#checkPersonalizada")[0].checked) {
      var valores = $("#rangoPrecio").val();
      valores = valores.split(";");
      var urls = `http://localhost:3000/ciudad/${$("#ciudad").val()}/tipo/${$(
        "#tipo"
      ).val()}/desde/${valores[0]}/hasta/${valores[1]}`;
    } else {
      var urls = "http://localhost:3000/buscar";
    }
    $.ajax({
      url: urls,
      type: "get",
      dataType: "json",
    }).done(function (data) {
      if (!data.error) {
        // console.log(data);
        $(".lista").html(renderCard(data.datos));
      }
    });
  });

  // Agrega las opciones para la busqueda personalizada
  function renderSelect(data) {
    var html = "";
    data.forEach(
      (element) => (html += `<option value="${element}">${element}</option>`)
    );
    return html;
  }

  // Agrega las tarjetas de cada vivienda encontrada
  function renderCard(data) {
    var html = "";
    data.forEach((element) => {
      html += `<div class="card horizontal">
                    <div class="card-image">
                        <img src="http://localhost:3000/img/home.jpg">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <div> <p><strong>Direccion: </strong>${element.Direccion}</p> </div>
                            <div> <p><strong>Ciudad: </strong>${element.Ciudad}</p> </div>
                            <div> <p><strong>Telefono: </strong>${element.Telefono}</p> </div>
                            <div> <p><strong>Código postal: </strong>${element.Codigo_Postal}</p> </div>
                            <div> <p><strong>Precio: </strong>${element.Precio}</p> </div>
                            <div> <p><strong>Tipo: </strong>${element.Tipo}</p> </div>
                        </div>
                    </div>
                </div>`;
    });
    return html;
  }

  // Inicializa las opciones de la busqueda personalizada y trae los datos
  function init() {
    $.ajax({
      url: "http://localhost:3000/listas",
      type: "get",
      dataType: "json",
    }).done(function (data) {
      if (!data.error) {
        console.log(data);
        $("#ciudad").append(renderSelect(data.ciudades));
        $("#tipo").append(renderSelect(data.tipos));
        $("#ciudad").material_select();
        $("#tipo").material_select();
      }
    });
  }

  // El ckeck para la busqueda personolizada
  function setSearch() {
    let busqueda = $("#checkPersonalizada");
    busqueda.on("change", (e) => {
      this.customSearch = !this.customSearch;
      $("#personalizada").toggleClass("invisible");
    });
  }
});
