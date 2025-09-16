function buscaRua() {

  $(".preloader-wrapper").show(); // MOSTRA O LOADING
  estado = document.querySelector("#estado").value
  cidade = document.querySelector("#cidade").value
  rua = document.querySelector("#rua").value

  url = `https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`

  console.log("url montada", url)

  fetch(url)
    .then((res) => {
      return res.json()
    })
    .then((ruas) => {
      console.log(ruas)
      let listaRuas = document.querySelector("#lista-ruas")

      let ruasList = ""
      for (let i = 0; i < ruas.length; i++) {
        ruasList += `<ul class="collection">
                  <li class="collection-item">Rua: <span id="dadoRua">${ruas[i].logradouro}</span></li>
                  <li class="collection-item">BAIRRO: <span id="dadoBairro">${ruas[i].bairro}</span></li>
                  <li class="collection-item">CIDADE: <span id="dadoCidade">${ruas[i].localidade}</span></li>
                  <li class="collection-item">ESTADO: <span id="dadoEstado">${ruas[i].estado}</span></li>
               </ul>`
      }

      setTimeout(() => {
        listaRuas.innerHTML = ruasList
        $(".preloader-wrapper").hide(); // ESCONDE O LOADING
      }, 2000)
    })

}