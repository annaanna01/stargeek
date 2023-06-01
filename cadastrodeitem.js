const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const botao = document.getElementById("btn");
const foto = document.getElementById("foto");

var emaillogado;
femailLogado();

var url = new URL(window.location.href);
var peditar = url.searchParams.get("peditar");
var pindice = url.searchParams.get("indice");

if (peditar == "true"){
    editar(pindice);
}

botao.onclick = (evento) => {

    if ((peditar != "true") || (peditar == null)){

        
    evento.preventDefault();
    fenvio()
    .then(result =>{
        if(result){
            let dados = JSON.parse(localStorage.getItem("catalogo")) || [];
    dados.push(
    {
        nome : nome.value,
        descricao : descricao.value,
        foto : nomeArq, 
        email : emaillogado
    }
    )
    localStorage.setItem("catalogo", JSON.stringify(dados));
    window.location.assign("itemcadastro.html");
        }
        else{
            alert("Houve erro no envio do arquivo");
        }
    });  

    }else{
        editarenvio(evento);
        
    }

}
var fotoa;
function editar(indice){
    nome.value = "";
    descricao.value = "";
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    nome.value = dados[indice].nome;
    descricao.value = dados[indice].descricao;
    fotoa = dados[indice].foto;
}


function editarenvio(evento){
    evento.preventDefault();
    if((fotoa != foto.value)&&(foto.value != "")){

        fenvio()
        .then(result => {
                        if(result){
                            salvaEdicao(nomeArq);
                        }
                        })
    } else{
        salvaEdicao(fotoa);
    }
}

function salvaEdicao(pfoto){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados[pindice].nome = nome.value;
    dados[pindice].descricao = descricao.value;
    dados[pindice].foto = pfoto;
    dados [pindice].email = emaillogado;
    localStorage.setItem("catalogo", JSON.stringify(dados));
    window.location.assign("itemcadastro.html");
}


var nomeArq;
async function fenvio() {
    const url = 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData = new FormData();
    formData.append('arquivo',arquivo);
    console.log(JSON.stringify(formData));
    console.log(JSON.stringify(formData));
    try{
        var resp = await fetch(url, {
                                method: 'POST',
                                body: formData,
                                    }
                            )
        if (resp.ok){
            let respText = await resp.text();
            nomeArq = respText;
            return true;
        }
        else{
            return false;
        }
        }
    catch (error) {
        console.error(error);
        return false;
    }

}

function femailLogado(){
    let dados =sessionStorage.getItem("logado");
    if (dados == null){ 
    window.location.assign("login.html");
} else { 
    emaillogado = dados;
}
}