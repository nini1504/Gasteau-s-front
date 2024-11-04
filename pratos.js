const apiUrlPratos = 'http://localhost:8080'; 
async function cadastrarPrato() {
    window.location.href = 'cadastroPrato.html';
    
    const dadosPrato = {
        nome: document.getElementById("nomePrato").value,
        preco: parseFloat(document.getElementById("preco").value) || 0,
        descricao: document.getElementById("descricao").value,
        modoPreparo: document.getElementById("modoPreparo").value,
    };

    try {
        const response = await fetch('/admin/prato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPrato)
        });

        if (response.ok) {
            alert("Prato cadastrado com sucesso!");
            carregarPratos(); // Atualiza a lista de pratos após o cadastro
        } else {
            console.error("Erro ao cadastrar prato:", response.statusText);
            alert("Erro ao cadastrar prato: " + response.statusText);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro na requisição: " + error.message);
    }
}


// Função para buscar os pratos da API
async function carregarPratos() {
    try {
        const response = await fetch('/pratos'); // Faz uma requisição GET para obter os pratos
        if (response.ok) {
            const pratos = await response.json();
            exibirPratos(pratos);
        } else {
            console.error("Erro ao carregar pratos:", response.statusText);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

// Função para exibir os pratos na página
function exibirPratos(pratos) {
    const lista = document.getElementById('listaPratos') || document.body; 
    lista.innerHTML = ''; // Limpa a lista atual

    pratos.forEach(prato => {
        const card = document.createElement('div');
        card.classList.add('card');

        const titulo = document.createElement('h3');
        titulo.textContent = prato.nome;

        const descricao = document.createElement('p');
        descricao.textContent = prato.descricao;

        const codigoPrato = document.createElement('div');
        codigoPrato.textContent = `Código: ${prato.cod}`; 

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = '-';
        botaoRemover.onclick = () => removerPrato(prato.cod); // envia o código do prato para remoção

        card.appendChild(titulo);
        card.appendChild(descricao);
        card.appendChild(botaoRemover);
        card.appendChild(codigoPrato);
        lista.appendChild(card);
    });
}



async function removerPrato(cod) {
    try {
        const response = await fetch(`/admin/prato/${cod}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token // Token de autenticação, se necessário
            }
        });

        if (response.status === 204) {
            alert("Prato removido com sucesso.");
            carregarPratos(); // Atualiza a lista de pratos a partir da API
        } else if (response.status === 403) {
            alert("Você não tem permissão para excluir pratos.");
        } else {
            throw new Error("Erro ao tentar remover o prato.");
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao remover o prato.");
    }
}
