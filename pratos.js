// Função para cadastrar um prato
async function cadastrarPrato() {
    const dadosPrato = {
        nome: document.getElementById("nomePrato").value,
        preco: parseFloat(document.getElementById("preco").value) || 0,
        descricao: document.getElementById("descricao").value,
    };

    try {
        const response = await fetch('/admin/prato', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosPrato)
        });
        const result = await response.json();

        if (response.ok) {
            alert('Prato cadastrado com sucesso!');
            carregarPratos(); // Atualiza a lista de pratos
        } else {
            alert(result.message || 'Erro ao cadastrar o prato.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar o prato:', error);
        alert('Erro ao processar a requisição.');
    }
}

// Função para atualizar um prato
async function atualizarPrato(cod) {
    const dadosPrato = {
        nome: document.getElementById("nomePrato").value,
        preco: parseFloat(document.getElementById("preco").value) || 0,
        descricao: document.getElementById("descricao").value,
    };

    try {
        const response = await fetch(`/admin/prato/${cod}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosPrato)
        });

        if (response.ok) {
            alert("Prato atualizado com sucesso!");
            carregarPratos(); // Atualiza a lista de pratos
        } else {
            alert("Erro ao atualizar prato: " + response.statusText);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro na requisição: " + error.message);
    }
}

// Função para remover um prato
async function removerPrato(cod) {
    try {
        const response = await fetch(`/admin/prato/${cod}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();

        if (response.ok) {
            alert('Prato removido com sucesso!');
            carregarPratos(); // Atualiza a lista de pratos
        } else {
            alert(result.message || 'Erro ao remover o prato.');
        }
    } catch (error) {
        console.error('Erro ao remover o prato:', error);
        alert('Erro ao processar a requisição.');
    }
}

// Função para carregar e exibir os pratos
async function carregarPratos() {
    try {
        const response = await fetch('/pratos'); // Requisição GET para obter os pratos
        if (response.ok) {
            const pratos = await response.json();
            exibirPratos(pratos);
        } else {
            console.error("Erro ao carregar pratos:", response.statusText);
            alert("Erro ao carregar pratos.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao carregar pratos.");
    }
}

// Função para exibir os pratos na página
function exibirPratos(pratos) {
    const container = document.querySelector('.container-pratos');
    container.innerHTML = ''; // Limpa o conteúdo atual
    pratos.forEach(prato => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${prato.nome}</h3>
            <p>${prato.descricao}</p>
            <div class="botoes">
                <button title="Excluir prato" onclick="removerPrato(${prato.codigo})">-</button>
            </div>
            <div class="card-footer">
                <div class="codigo">Código = ${prato.codigo}</div>
            </div>
        `;
        container.appendChild(card);
    });
}
