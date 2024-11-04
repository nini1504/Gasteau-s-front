const apiUrlPratos = 'http://localhost:8080/pratos';

// Função para buscar os pratos da API
async function carregarPratos() {
    try {
        const response = await fetch(apiUrlPratos);
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
    const lista = document.getElementById('listaPratos'); 
    lista.innerHTML = ''; 

    pratos.forEach(prato => {
        const card = document.createElement('div');
        card.classList.add('card');

        const titulo = document.createElement('h3');
        titulo.textContent = prato.nome;

        const descricao = document.createElement('p');
        descricao.textContent = prato.descricao;

        const codigoPrato = document.createElement('div');
        codigoPrato.textContent = `Código: ${prato.cod}`;

        const precoPrato = document.createElement('div');
        precoPrato.textContent = `Preço: ${prato.preco}`;

        const avaliacao = document.createElement('div');
        avaliacao.textContent = `Avaliação: ${prato.avaliacaoMed}`;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = '-';
        botaoRemover.onclick = () => removerPrato(prato.cod);

        card.appendChild(titulo);
        card.appendChild(descricao);
        card.appendChild(codigoPrato);
        card.appendChild(precoPrato);
        card.appendChild(avaliacao);
        card.appendChild(botaoRemover);
        lista.appendChild(card);
    });
}

// Função para verificar o papel do usuário e exibir ou ocultar os botões
async function verificarRole() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.warn('Token não encontrado!');
        return;
    }

    try {
        // Primeiro tenta buscar detalhes do admin
        let response = await fetch('http://localhost:8080/admin', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            // Usuário é admin
            document.querySelector('.add-prato').style.display = 'block';
            document.querySelector('.atz-prato').style.display = 'block';
            return;
        }

        // Se não for admin, tenta buscar detalhes do cliente
        response = await fetch('http://localhost:8080/user', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            // Usuário é cliente, esconde os botões
            document.querySelector('.add-prato').style.display = 'none';
            document.querySelector('.atz-prato').style.display = 'none';
        } else {
            console.error("Erro ao verificar o papel do usuário.");
        }
    } catch (error) {
        console.error("Erro na requisição de role:", error);
    }
}

// Chame a função verificarRole ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    verificarRole();
    carregarPratos();
});

const url = 'http://localhost:8080/admin/prato';

async function removerPrato(cod) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para realizar alterações em prato.');
        return;
    }
    try {
        const response = await fetch(`${url}/${cod}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            alert("Prato removido com sucesso.");
            carregarPratos();
            window.location.href = "pratos.html";
        } else if (response.status === 403) {
            alert("Somente funcionários têm permissão para excluir pratos.");
        } else {
            throw new Error("Erro ao tentar remover o prato.");
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao remover o prato.");
    }
}
