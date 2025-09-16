 /**
 * Função para buscar endereços através do nome da rua, cidade e estado
 * Utiliza a API do ViaCEP para busca reversa de endereços
 * Esta função é executada quando o usuário clica no botão "Enviar" na aba RUA
 */
function buscaRua() {
      // Exibe o spinner de carregamento para indicar que a busca está em andamento
      $(".preloader-wrapper").show()
      
      // Captura os valores selecionados/digitados pelo usuário nos campos do formulário
      estado = document.querySelector("#estado").value
      cidade = document.querySelector("#cidade").value
      rua = document.querySelector("#rua").value

      // Monta a URL da API do ViaCEP usando template string
      // Formato: https://viacep.com.br/ws/{UF}/{cidade}/{logradouro}/json/
      url = `https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`

      console.log("url montada", url)
      
      // Faz a requisição HTTP para a API do ViaCEP usando Fetch API
      fetch(url)
        .then((res) => {
          // Converte a resposta da API para formato JSON
          return res.json()
        })
        .then((ruas) => {
          console.log(ruas)
          // Seleciona o elemento HTML onde serão exibidos os resultados
          let listaRuas = document.querySelector("#lista-ruas")

          // Verifica se houve erro na consulta ou se não foram encontrados resultados
          // A API do ViaCEP retorna um array vazio quando não encontra resultados
          if (!ruas || ruas.length === 0) {
            // Registra o erro no sistema de logs da aplicação
            salvarLog('RUA', { 
              estado: estado, 
              cidade: cidade, 
              rua: rua 
            }, 'Nenhum resultado encontrado', 'erro');
            
            // Exibe mensagem de erro na interface do usuário
            listaRuas.innerHTML = '<div class="card-panel red lighten-4"><p>Nenhum resultado encontrado.</p></div>';
            // Esconde o spinner de carregamento
            $(".preloader-wrapper").hide();
            return;
          }

          // Constrói o HTML com os resultados encontrados
          let ruasList = ""
          // Itera sobre cada endereço retornado pela API
          for (let i = 0; i < ruas.length; i++) {
            // Cria uma lista HTML para cada endereço encontrado
            // Utiliza classes do Materialize CSS para estilização
            ruasList += `<ul class="collection">
                  <li class="collection-item">RUA: <span id="dadoRua">${ruas[i].logradouro}</span></li>
                  <li class="collection-item">BAIRRO: <span id="dadoBairro">${ruas[i].bairro}</span></li>
                  <li class="collection-item">CIDADE: <span id="dadoCidade">${ruas[i].localidade}</span></li>
                  <li class="collection-item">ESTADO: <span id="dadoEstado">${ruas[i].estado}</span></li>
               </ul>`
          }
          
          // Simula um delay de 2 segundos antes de exibir os resultados
          // Isso cria uma experiência visual de carregamento para o usuário
          setTimeout(() => {
            // Insere o HTML dos resultados na página
            listaRuas.innerHTML = ruasList
            // Esconde o spinner de carregamento
            $(".preloader-wrapper").hide()
            
            // Registra o sucesso da operação no sistema de logs
            // Inclui a quantidade de resultados encontrados
            salvarLog('RUA', { 
              estado: estado, 
              cidade: cidade, 
              rua: rua 
            }, { 
              quantidade: ruas.length 
            }, 'sucesso');
            
          }, 2000);
        })
        .catch((error) => {
          // Captura qualquer erro que possa ocorrer durante a requisição
          console.error('Erro na consulta:', error);
          
          // Registra o erro no sistema de logs com detalhes do erro
          salvarLog('RUA', { 
            estado: estado, 
            cidade: cidade, 
            rua: rua 
          }, 'Erro na consulta: ' + error.message, 'erro');
          
          // Exibe mensagem de erro na interface
          let listaRuas = document.querySelector("#lista-ruas")
          listaRuas.innerHTML = '<div class="card-panel red lighten-4"><p>Erro ao buscar rua. Verifique sua conexão.</p></div>';
          // Esconde o spinner de carregamento
          $(".preloader-wrapper").hide();
        })
    }