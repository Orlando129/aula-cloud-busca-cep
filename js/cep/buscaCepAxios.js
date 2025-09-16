 /**
  * Função para buscar informações de endereço através do CEP
  * Utiliza a biblioteca Axios para fazer requisições HTTP à API do ViaCEP
  * Axios é uma biblioteca popular para requisições HTTP com sintaxe mais simples
  */
    async function buscaCepAxios() {
      // Captura o valor do CEP digitado pelo usuário no campo de input
      let cep = document.querySelector("input").value
      console.log("buscando cep", cep)

      // Monta a URL da API do ViaCEP com o CEP informado
      // Duas formas equivalentes de concatenar strings (a segunda é template string)
      let url = await "https://viacep.com.br/ws/" + cep + "/json/"
      let url2 = await `https://viacep.com.br/ws/${cep}/json/`

      // Faz a requisição HTTP usando Axios
      // axios.get() é um método simplificado para requisições GET
      axios.get(url)
        .then(function (response) {
          // Função executada quando a requisição é bem-sucedida
          // O Axios encapsula a resposta em um objeto 'response' onde os dados ficam em 'response.data'
          console.log('imprimindo com axios', response.data);
          
          // Armazena os dados da resposta em uma variável para facilitar o acesso
          let cep = response.data
          
          // Atualiza os elementos HTML com as informações do endereço
          // Busca elementos por ID e define o texto interno com os dados recebidos
          document.querySelector("#dadoRua").innerText = cep.logradouro
          document.querySelector("#dadoBairro").innerText = cep.bairro
          document.querySelector("#dadoCidade").innerText = cep.localidade
          document.querySelector("#dadoEstado").innerText = cep.uf
        })
    }
