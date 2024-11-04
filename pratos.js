const apiUrlPratos = 'http://localhost:8080/pratos'; // atualizando a URL da API

// Função para buscar os pratos da API
async function carregarPratos() {
    try {
        const response = await fetch(apiUrlPratos); // Faz uma requisição GET para obter os pratos
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

        const precoPrato = document.createElement('div');
        precoPrato.textContent = `Preço: ${prato.preco}`;

        const avaliacao = document.createElement('div');
        avaliacao.textContent = `Avaliação: ${prato.avaliacaoMed}`;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = '-';
        botaoRemover.onclick = () => removerPrato(prato.cod); // envia o código do prato para remoção

        card.appendChild(titulo);
        card.appendChild(descricao);
        card.appendChild(codigoPrato);
        card.appendChild(precoPrato);
        card.appendChild(avaliacao);
        card.appendChild(botaoRemover);
        lista.appendChild(card);
    });
}
