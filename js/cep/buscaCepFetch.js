/**
 * Função para buscar informações de endereço através do CEP
 * Utiliza a Fetch API para fazer requisições HTTP à API do ViaCEP
 * Esta função é executada quando o usuário clica no botão "Buscar" na aba CEP
 */
    async function buscaCepFetch() {
      // Captura o valor do CEP digitado pelo usuário no campo de input
      let cep = document.querySelector("input").value
      console.log("buscando cep", cep)
      
      // Monta a URL da API do ViaCEP com o CEP informado
      // Duas formas equivalentes de concatenar strings (a segunda é template string)
      let url = await "https://viacep.com.br/ws/" + cep + "/json/"
      let url2 = await `https://viacep.com.br/ws/${cep}/json/`

      // Faz a requisição HTTP usando a Fetch API
      // O fetch() retorna uma Promise que resolve com a resposta da requisição
      fetch(url)
      // Faz a requisição HTTP usando a Fetch API
      // O fetch() retorna uma Promise que resolve com a resposta da requisição
      fetch(url)
        .then((res) => {
          // Primeiro .then() recebe a resposta HTTP completa
          console.log('resposta aqui', res)
          // Converte a resposta para JSON e retorna outra Promise
          return res.json()
        })
        .then((dados) => {
          // Segundo .then() recebe os dados já convertidos para objeto JavaScript
          console.log(dados.logradouro)
          
          // Verifica se a API retornou erro (CEP inválido ou não encontrado)
          if (dados.erro) {
            // Registra o erro no sistema de logs da aplicação
            salvarLog('CEP', { cep: cep }, 'CEP não encontrado', 'erro');
            alert('CEP não encontrado!');
            return;
          }
          
          // Atualiza os elementos HTML com as informações do endereço
          // Busca elementos por ID e define o texto interno com os dados recebidos
          document.querySelector("#dadoRua").innerText = dados.logradouro
          document.querySelector("#dadoBairro").innerText = dados.bairro
          document.querySelector("#dadoCidade").innerText = dados.localidade
          document.querySelector("#dadoEstado").innerText = dados.uf
          
          // Registra o sucesso da operação no sistema de logs
          salvarLog('CEP', { cep: cep }, {
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            localidade: dados.localidade,
            uf: dados.uf
          }, 'sucesso');
        })
        .catch((error) => {
          // Captura qualquer erro que possa ocorrer durante a requisição
          console.error('Erro na consulta:', error);
          // Registra o erro no sistema de logs
          salvarLog('CEP', { cep: cep }, 'Erro na consulta: ' + error.message, 'erro');
          // Mostra mensagem de erro para o usuário
          alert('Erro ao buscar CEP. Verifique sua conexão.');
        })
    }