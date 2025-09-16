    /**
     * Função para buscar informações de endereço através do CEP
     * Utiliza jQuery AJAX para fazer requisições HTTP à API do ViaCEP
     * Esta é uma alternativa ao Fetch API usando a biblioteca jQuery
     */
    async function buscaCepAjax() {
      // Captura o valor do CEP digitado pelo usuário no campo de input
      let cep = document.querySelector("input").value
      console.log("buscando cep", cep)

      // Monta a URL da API do ViaCEP com o CEP informado
      // Duas formas equivalentes de concatenar strings (a segunda é template string)
      let url = await "https://viacep.com.br/ws/" + cep + "/json/"
      let url2 = await `https://viacep.com.br/ws/${cep}/json/`

      // Faz a requisição HTTP usando jQuery AJAX
      // O $.ajax() é uma função da biblioteca jQuery para requisições assíncronas
      $.ajax({
        url: url,                    // URL da API a ser consultada
        method: 'GET',               // Método HTTP (GET para consultar dados)
        success: function (data) {   // Função executada quando a requisição é bem-sucedida
          console.log(data); // Manipula os dados recebidos da API
          
          // Atualiza os elementos HTML com as informações do endereço
          // Busca elementos por ID e define o texto interno com os dados recebidos
          document.querySelector("#dadoRua").innerText = data.logradouro
          document.querySelector("#dadoBairro").innerText = data.bairro
          document.querySelector("#dadoCidade").innerText = data.localidade
          document.querySelector("#dadoEstado").innerText = data.uf
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // Função executada quando ocorre algum erro na requisição
          console.error('Erro na requisição:', textStatus, errorThrown);
        }
      });

    }