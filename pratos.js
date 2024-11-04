// Função para cadastrar um prato
async function cadastrarPrato() {
    const dadosPrato = {
        nome: prompt("Nome do Prato:"),
        preco: parseFloat(prompt("Preço do Prato:")) || 0,
        descricao: prompt("Descrição do Prato:"),
        avaliacaoMed: parseFloat(prompt("Avaliação Média (de 0 a 10):")) || 0, // Preenchido mas não exibido
        modoPreparo: prompt("Modo de Preparo:") // Preenchido mas não exibido
    };

    try {
        const response = await fetch('/admin/prato', { // Rota para cadastrar
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosPrato)
        });

        if (response.ok) {
            alert('Prato cadastrado com sucesso!');
            carregarPratos(); // Atualiza a lista de pratos
        } else {
            const result = await response.json();
            alert(result.message || 'Erro ao cadastrar o prato.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar o prato:', error);
    }
}

// Função para atualizar um prato
async function atualizarPrato() {
    const id = prompt("Informe o código do prato a ser atualizado:");
    const dadosPrato = {
        nome: prompt("Novo Nome do Prato:"),
        preco: parseFloat(prompt("Novo Preço do Prato:")) || 0,
        descricao: prompt("Nova Descrição do Prato:"),
        avaliacaoMed: parseFloat(prompt("Nova Avaliação Média (de 0 a 10):")) || 0, // Preenchido mas não exibido
        modoPreparo: prompt("Novo Modo de Preparo:") // Preenchido mas não exibido
    };

    try {
        const response = await fetch(`/admin/prato/${id}`, { // Rota para atualizar
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosPrato)
        });

        if (response.ok) {
            alert('Prato atualizado com sucesso!');
            carregarPratos(); // Atualiza a lista de pratos
        } else {
            alert('Erro ao atualizar o prato.');
        }
    } catch (error) {
        console.error('Erro ao atualizar o prato:', error);
    }
}


// Função para remover um prato
async function removerPrato(id) {
    if (confirm(`Você realmente deseja remover o prato de código ${id}?`)) {
        try {
            const response = await fetch(`/admin/prato/${id}`, { // Rota para remover
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                alert('Prato removido com sucesso!');
                carregarPratos(); // Atualiza a lista de pratos
            } else {
                const result = await response.json();
                alert(result.message || 'Erro ao remover o prato.');
            }
        } catch (error) {
            console.error('Erro ao remover o prato:', error);
        }
    }
}

// Função para carregar e exibir os pratos
async function carregarPratos() {
    try {
        const response = await fetch('http://localhost:8080/pratos'); // Rota para listar pratos
        const pratos = await response.json();
        const pratosContainer = document.getElementById('pratos-container');

        // Limpa o contêiner antes de adicionar os pratos
        pratosContainer.innerHTML = '';

        // Cria os cards para cada prato retornado
        pratos.forEach(prato => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <h3>${prato.nome}</h3>
                <p>${prato.descricao}</p>
                <div class="botoes">
                    <button title="Excluir prato" onclick="removerPrato(${prato.id})">-</button>
                </div>
                <div class="card-footer">
                    <div class="codigo">Código = ${prato.id}</div>
                </div>
            `;

            pratosContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar os pratos:', error);
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
