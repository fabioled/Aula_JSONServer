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
    const textSpan =  document.createElement('span');
    textSpan.textContent = jogo.name;
    li.appendChild(textSpan);

    //Criando botão de DELETAR
    const btnDelJogo = document.createElement('button');
    btnDelJogo.textContent = 'Deletar';
    btnDelJogo.onclick = function() {
        deletarJogo(jogo.id, li);   
    }
    li.appendChild(btnDelJogo);

    //Criando botão de EDITAR
    const btnEditJogo = document.createElement('button');
    btnDelJogo.textContent = 'Editar';
    btnDelJogo.onclick = function() {
        editarJogo(jogo, textSpan);   
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

//função editar jogo
function editarJogo(jogo, textSpan){
    const input = document.createElement('input');
    input.type='text';
    input.value = textSpan.textContent;
    textSpan.parentNode.replaceChild(input, textSpan);

    input.focus();

    input.onblur = function() {
        atualizarJogo(jogo.id, input.value, input, textSpan);
    };

    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            atualizarJogo(jogo.id, input.value, input, textSpan);
        }
    });
}

function atualizarJogo(jogoId, newValue, input, textSpan) {
    if (newValue.trim() !== "") {
        fetch(`http://localhost:3000/jogos/${jogoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newValue })
        }).then(response => response.json())
          .then(updatedTask => {
            textSpan.textContent = updatedTask.name;
            input.parentNode.replaceChild(textSpan, input);
        });
    } else {
        input.parentNode.replaceChild(textSpan, input);
    }
}


//carregar os jogos do arquivo json existentes
window.onload = function () {
    fetch('httP://localhost:3000/jogos')
        .then(response => response.json())
        .then(jogos => {
            jogos.forEach(jogo => addJogoLista(jogo));
        });

};