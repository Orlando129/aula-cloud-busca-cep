async function buscaCepAjax() {
  let cep = document.querySelector("input").value
  console.log("buscando cep", cep)

  let url = await "https://viacep.com.br/ws/" + cep + "/json/"
  let url2 = await `https://viacep.com.br/ws/${cep}/json/`

  // usando ajax

  $.ajax({
    url: url,
    method: 'GET',
    success: function (data) {
      console.log(data); // Manipula os dados recebidos
      document.querySelector("#dadoRua").innerText = data.logradouro
      document.querySelector("#dadoBairro").innerText = data.bairro
      document.querySelector("#dadoCidade").innerText = data.localidade
      document.querySelector("#dadoEstado").innerText = data.uf
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Erro na requisição:', textStatus, errorThrown);
    }
  });

}