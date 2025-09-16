(function($){
  $(function(){
    // Inicializar componentes do Materialize
    $('.sidenav').sidenav();
    
    // Inicializar tabs
    $('.tabs').tabs({
      onShow: function(content) {
        // Carregar logs quando a aba de logs for exibida
        if (content[0] && content[0].id === 'test3') {
          setTimeout(carregarLogs, 100);
        }
      }
    });
    
    // Carregar estados quando a página carregar
    if (typeof pegarEstados === 'function') {
      pegarEstados();
    }
    
    // Esconder o loading inicial
    $(".preloader-wrapper").hide();

  }); // end of document ready
})(jQuery); // end of jQuery name space
