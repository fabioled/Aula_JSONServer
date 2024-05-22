document.getElementById('btnAddJogo').addEventListener('click', function () {
    //declarções de constantes com os Ids de elementos
    const cadastraJogo = document.getElementById('cadastraJogo');
    const jogo = cadastraJogo.value;

    if (jogo.trim() !== "") {
        //enviar itens para o  JSONServer

        fetch('http://localhost:3000/jogos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: jogo })
        }).then(reponse => reponse.json())
            .then(jogo => {
                addJogoLista(jogo);
                cadastraJogo.value = ""; //limpando o campo de entrada
            })

    }
});

//adicionando elementos na lista
function addJogoLista(jogo) {
    const listaJogos = document.getElementById('listaJogos');
    const li = document.createElement('li');
    li.textContent = jogo.name;

    //Criando botão de DELETAR
    const btnDelJogo = document.createElement('button');
    btnDelJogo.textContent = 'Deletar';
    btnDelJogo.onclick = function() {
        deletarJogo(jogo.id, li);   
    }
    li.appendChild(btnDelJogo);
    listaJogos.appendChild(li);  
}

//função de Deletar
function deletarJogo(jogoId, listaJogos) {
    fetch(`http://localhost:3000/jogos/${jogoId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            listaJogos.remove(); //remove jogo da lista
        }   
    });
}

//carregar os jogos do arquivo json existentes
window.onload = function () {
    fetch('httP://localhost:3000/jogos')
        .then(response => response.json())
        .then(jogos => {
            jogos.forEach(jogo => addJogoLista(jogo));
        });

};