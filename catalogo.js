const cards = document.querySelector(".cards");

var emaillogado;
femailLogado();


carregarCatalogo();

function carregarCatalogo(){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    let divcard = document.createElement("div");
    divcard.setAttribute("class", "card")
    if (dados == null){
        divcard.innerHTML = "<p> Nenhum item encontrado </p>";
        cards.appendChild(divcard);
        return null;
    }

    dados.forEach((elemento, indice) => {
        if(elemento.email == emaillogado){ 
        let divcard = document.createElement("div");
        divcard.setAttribute("class", "card")
        divcard.innerHTML = `
        <img src="img/${elemento.foto}">
        <p>${elemento.nome}</p>
        <div class="info">
        <img src="imagens/Mask group (2).png" alt="" onclick="editar(${indice})"></a>
        <img src="imagens/lixeira.png" alt="" onclick="excluir(${indice})">
        </div>
        `;
        cards.appendChild(divcard);}

    });
}

function excluir(indice){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados.splice(indice,1);
    localStorage.setItem("catalogo", JSON.stringify(dados));
    window.location.reload();

}

function editar(indice){
    var url ="cadastraritem.html?peditar=true&indice="+
    encodeURIComponent(indice);
    window.location.href = url;
    
}

function femailLogado(){
    let dados = sessionStorage.getItem("logado");
    if (dados == null){ 
    window.location.assign("login.html");
} else { 
    emaillogado = dados;
}
}