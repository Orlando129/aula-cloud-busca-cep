 /**
 * Função para carregar a lista de cidades/municípios baseado no estado selecionado
 * Utiliza a API do IBGE para obter dados oficiais dos municípios brasileiros
 * Esta função é executada quando o usuário seleciona um estado no dropdown
 */
function pegarCidades() {
      // Captura a sigla do estado selecionado pelo usuário (ex: "SP", "RJ", "MG")
      uf = document.querySelector("#estado").value
      // Seleciona o elemento HTML do dropdown de cidades
      selectCidade = document.querySelector("#cidade")
      
      // Monta a URL da API do IBGE para buscar municípios por estado
      // Endpoint: https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios
      let urlCidade = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`

      // Faz a requisição HTTP para a API do IBGE
      fetch(urlCidade)
        .then((res) => {
          // Converte a resposta da API para formato JSON
          return res.json()
        })
        .then((cidades) => {
          console.log(cidades)

          // Inicia a construção do HTML do select com uma opção padrão
          // A primeira opção serve como placeholder e não pode ser selecionada
          let cidadesList = '<option value="" disabled selected>Escolha uma Cidade</option>'
          
          // Itera sobre todas as cidades retornadas pela API do IBGE
          for (let i = 0; i < cidades.length; i++) {
            // Adiciona cada cidade como uma opção no select
            // Tanto o value quanto o texto exibido usam o nome da cidade
            cidadesList += `<option value="${cidades[i].nome}">${cidades[i].nome}</option>`;
          }
          
          // Substitui o conteúdo HTML do select de cidades com as novas opções
          selectCidade.innerHTML = cidadesList
        })
    }