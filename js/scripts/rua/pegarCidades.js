function pegarCidades() {
  uf = document.querySelector("#estado").value
  selectCidade = document.querySelector("#cidade")
  let urlCidades = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios` //URL DO IBGE

  fetch(urlCidades) // CHAMADA FETCH PARA A URL
    .then((res) => { return res.json() }) // THEN PRA MONTAR O JSON
    .then((cidades) => { // THEN JÁ COM O JSON MONTANDO DOS ESTADOS

      // INSERINDO ELEMENTO PADRÃO DO SELECT
      let cidadesList = '<option value="" disabled selected>Escolha uma cidade</option>'
      for (let i = 0; i < cidades.length; i++) { // FOR PARA LISTAR TODOS OS ESTADOS
        cidadesList += `<option value="${cidades[i].nome}">${cidades[i].nome}</option>`
      }

      selectCidade.innerHTML = cidadesList // INSERE NO ELEMENTO SELECT TODOS ESTADOS
    })
}