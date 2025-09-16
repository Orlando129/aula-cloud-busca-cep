/**
 * Função para carregar a lista de estados brasileiros no dropdown
 * Utiliza a API do IBGE para obter dados oficiais de todos os estados do Brasil
 * Esta função é executada automaticamente quando a página carrega
 */
function pegarEstados() {
      // Seleciona o elemento HTML do dropdown de estados
      selectEstado = document.querySelector("#estado")
      
      // URL da API do IBGE que retorna todos os estados brasileiros
      // Endpoint oficial: https://servicodados.ibge.gov.br/api/v1/localidades/estados
      let urlEstado = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

      // Faz a requisição HTTP para a API do IBGE
      fetch(urlEstado)
        .then((res) => {
          // Converte a resposta da API para formato JSON
          return res.json()
        })
        .then((estados) => {
          console.log(estados)

          // Inicia a construção do HTML do select com uma opção padrão
          // A primeira opção serve como placeholder e não pode ser selecionada
          let estadosList = '<option value="" disabled selected>Escolha um Estado</option>'
          
          // Itera sobre todos os estados retornados pela API do IBGE
          for (let i = 0; i < estados.length; i++) {
            // Adiciona cada estado como uma opção no select
            // O value usa a sigla (ex: "SP") e o texto exibido usa o nome completo (ex: "São Paulo")
            estadosList += `<option value="${estados[i].sigla}">${estados[i].nome}</option>`;
          }
          
          // Substitui o conteúdo HTML do select de estados com as novas opções
          selectEstado.innerHTML = estadosList

          
        })
    }
    
    // Executa a função automaticamente quando o script é carregado
    // Isso garante que a lista de estados esteja disponível assim que a página carregar
    pegarEstados()
