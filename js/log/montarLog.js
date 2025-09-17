function montarLogs(url){
    let params = url.split("/")

    if(params.length == 7){
        console.log("É CEP")
        $("#tab-cep").click()
    } else{
        console.log("É RUA")
        $("#tab-rua").click()
    }
}   