// Sistema de Logs para aplicação de busca CEP

// Função para salvar log no localStorage
function salvarLog(tipoConsulta, parametros, resultado, status = 'sucesso', url = '') {
    const agora = new Date();
    const timeStamp = agora.toLocaleString('pt-BR');
    
    const novoLog = {
        url: url, // URL da consulta realizada
        timestamp: timeStamp,
        tipo: tipoConsulta, // 'CEP' ou 'RUA'
        parametros: parametros,
        resultado: resultado,
        status: status // 'sucesso' ou 'erro'
    };
    
    // Recuperar logs existentes
    let logs = JSON.parse(localStorage.getItem('logsConsultas')) || [];
    
    // Adicionar novo log no início do array
    logs.unshift(novoLog);
    
    // Limitar a 50 logs para não sobrecarregar o localStorage
    if (logs.length > 50) {
        logs = logs.slice(0, 50);
    }
    
    // Salvar de volta no localStorage
    localStorage.setItem('logsConsultas', JSON.stringify(logs));
    
    console.log('Log salvo:', novoLog);
}

// Função para recuperar todos os logs
function recuperarLogs() {
    return JSON.parse(localStorage.getItem('logsConsultas')) || [];
}

// Função para limpar todos os logs
function limparLogs() {
    localStorage.removeItem('logsConsultas');
    carregarLogs();
    console.log('Logs limpos');
}

// Função para carregar e exibir os logs na interface
function carregarLogs() {
    const logs = recuperarLogs();
    const listaLogs = document.querySelector('#lista-logs');
    
    if (logs.length === 0) {
        listaLogs.innerHTML = `
            <div class="card-panel grey lighten-4">
                <p class="center">Nenhum log encontrado. Realize algumas consultas para ver o histórico aqui.</p>
            </div>
        `;
        return;
    }
    
    let logsHTML = '';
    
    logs.forEach(log => {
        const iconeTipo = log.tipo === 'CEP' ? 'location_on' : 'place';
        const corCard = log.status === 'sucesso' ? 'green lighten-5' : 'red lighten-5';
        const corTexto = log.status === 'sucesso' ? 'green-text' : 'red-text';
        
        let parametrosTexto = '';
        if (log.tipo === 'CEP') {
            parametrosTexto = `CEP: ${log.parametros.cep}`;
        } else {
            parametrosTexto = `Estado: ${log.parametros.estado}, Cidade: ${log.parametros.cidade}, Rua: ${log.parametros.rua}`;
        }
        
        let resultadoTexto = '';
        if (log.status === 'sucesso') {
            if (log.tipo === 'CEP') {
                resultadoTexto = `${log.resultado.logradouro}, ${log.resultado.bairro}, ${log.resultado.localidade} - ${log.resultado.uf}`;
            } else {
                resultadoTexto = `${log.resultado.quantidade} resultado(s) encontrado(s)`;
            }
        } else {
            resultadoTexto = log.resultado;
        }
        
        logsHTML += `
            <div class="card-panel ${corCard}" data-log-index="${logs.indexOf(log)}">
                <div class="row valign-wrapper">
                    <div class="col s1">
                        <i class="material-icons ${corTexto}">${iconeTipo}</i>
                    </div>
                    <div class="col s10">
                        <div class="row">
                            <div class="col s12">
                                <span class="badge ${corTexto}">${log.tipo}</span>
                                <span class="grey-text text-darken-2 right">${log.timestamp}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <p><strong>Consulta:</strong> ${parametrosTexto}</p>
                                <p><strong>Resultado:</strong> ${resultadoTexto}</p>
                                ${log.url ? `<p><strong>URL:</strong> <a href="${log.url}" target="_blank" class="blue-text">${log.url}</a></p>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="col s1">
                        <a onclick="reexecutarConsulta(${logs.indexOf(log)})" class="waves-effect waves-light btn-small blue" title="Reexecutar consulta">
                            <i class="material-icons">remove_red_eye</i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    
    listaLogs.innerHTML = logsHTML;
}

// Função para reexecutar uma consulta baseada no log
function reexecutarConsulta(logIndex) {
    const logs = recuperarLogs();
    const log = logs[logIndex];
    
    if (!log) {
        console.error('Log não encontrado');
        return;
    }
    
    // Identifica o tipo de consulta e muda para a aba correspondente
    if (log.tipo === 'CEP') {
        // Muda para a aba CEP
        const tabCep = document.querySelector('a[href="#tab-cep"]');
        if (tabCep) {
            tabCep.click();
        }
        
        // Aguarda um momento para a aba carregar e preenche o campo
        setTimeout(() => {
            const campoCep = document.querySelector('#cep');
            if (campoCep) {
                campoCep.value = log.parametros.cep;
                // Atualiza o label do Materialize
                M.updateTextFields();
                // Executa a busca automaticamente
                if (typeof buscaCepFetch === 'function') {
                    buscaCepFetch();
                }
            }
        }, 100);
        
    } else if (log.tipo === 'RUA') {
        // Muda para a aba RUA
        const tabRua = document.querySelector('a[href="#tab-rua"]');
        if (tabRua) {
            tabRua.click();
        }
        
        // Aguarda um momento para a aba carregar e preenche os campos
        setTimeout(() => {
            const campoEstado = document.querySelector('#estado');
            const campoCidade = document.querySelector('#cidade');
            const campoRua = document.querySelector('#rua');
            
            if (campoEstado) {
                campoEstado.value = log.parametros.estado;
                // Carrega as cidades após selecionar o estado
                if (typeof pegarCidades === 'function') {
                    pegarCidades();
                    // Aguarda as cidades carregarem e então seleciona a cidade
                    setTimeout(() => {
                        if (campoCidade) {
                            campoCidade.value = log.parametros.cidade;
                        }
                    }, 1000);
                }
            }
            
            if (campoRua) {
                campoRua.value = log.parametros.rua;
                // Atualiza o label do Materialize
                M.updateTextFields();
            }
            
            // Executa a busca automaticamente após preencher os campos
            setTimeout(() => {
                if (typeof buscaRua === 'function') {
                    buscaRua();
                }
            }, 1500); // Aumentado o tempo para garantir que as cidades foram carregadas
        }, 100);
    }
}

// Carregar logs automaticamente quando a página for carregada
document.addEventListener('DOMContentLoaded', function() {
    // Carregar logs se a aba estiver ativa
    const tabsInstance = M.Tabs.getInstance(document.querySelector('.tabs'));
    if (tabsInstance) {
        tabsInstance.options.onShow = function(content) {
            if (content.id === 'tab-log') {
                carregarLogs();
            }
        };
    }
});