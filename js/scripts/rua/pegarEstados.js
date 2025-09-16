function pegarEstados() { // FUNÇÃO CRIADA PARA PEGAR OS ESTADOS 
  selectEstado = document.querySelector("#estado") // selecio na elemento SELECT NO HTML
  let urlEstado = "https://servicodados.ibge.gov.br/api/v1/localidades/estados" //URL DO IBGE

  fetch(urlEstado) // CHAMADA FETCH PARA A URL
    .then((res) => { return res.json() }) // THEN PRA MONTAR O JSON
    .then((estados) => { // THEN JÁ COM O JSON MONTANDO DOS ESTADOS

      // INSERINDO ELEMENTO PADRÃO DO SELECT
      let estadosList = '<option value="" disabled selected>Escolha um Estado</option>'
      for (let i = 0; i < estados.length; i++) { // FOR PARA LISTAR TODOS OS ESTADOS
        estadosList += `<option value="${estados[i].sigla}">${estados[i].nome}</option>`
      }

      selectEstado.innerHTML = estadosList // INSERE NO ELEMENTO SELECT TODOS ESTADOS
    })
}
pegarEstados() 