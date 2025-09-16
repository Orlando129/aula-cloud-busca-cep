async function buscaCepAxios() {
  let cep = document.querySelector("input").value
  console.log("buscando cep", cep)

  let url = await "https://viacep.com.br/ws/" + cep + "/json/"
  let url2 = await `https://viacep.com.br/ws/${cep}/json/`

  // usando axios
  axios.get(url)
    .then(function (response) {
      // handle success
      console.log('imprimindo com axios', response.data);
      let cep = response.data
      document.querySelector("#dadoRua").innerText = cep.logradouro
      document.querySelector("#dadoBairro").innerText = cep.bairro
      document.querySelector("#dadoCidade").innerText = cep.localidade
      document.querySelector("#dadoEstado").innerText = cep.uf
    })
}