document.addEventListener("DOMContentLoaded", function() {
    fetchRelatorioAvaliacoes();
});

try {
    const response = await fetch("http://localhost:8080/relatorioAvaliacao",{
        method: 'GET'
    })
    if (response.ok) {
        const dados = await response.json();
        displayAvaliacoesAsCards(dados);
    } else {
        console.error("Erro ao carregar relatório:", response.statusText);
    }
} catch (error) {
    console.error("Erro na requisição:", error);
}

function displayAvaliacoesAsCards(data) {
    const container = document.getElementById("avaliacaoContainer");
    container.innerHTML = ""; // Limpa o conteúdo anterior

    data.forEach(item => {
        // Criação do card
        const card = document.createElement("div");
        card.classList.add("card");

        // Nome do Prato
        const nomePrato = document.createElement("h3");
        nomePrato.textContent = `Prato: ${item.nome_prato}`;
        card.appendChild(nomePrato);

        // Preço do Prato
        const precoPrato = document.createElement("p");
        precoPrato.textContent = `Preço: R$ ${item.preco_prato.toFixed(2)}`;
        card.appendChild(precoPrato);

        // CPF do Crítico
        const cpfCritico = document.createElement("p");
        cpfCritico.textContent = `CPF do Crítico: ${item.cpf_critico}`;
        card.appendChild(cpfCritico);

        // Nota da Avaliação
        const notaAvaliacao = document.createElement("p");
        notaAvaliacao.textContent = `Nota: ${item.nota_avaliacao}`;
        card.appendChild(notaAvaliacao);

        // Adicionar o card ao container
        container.appendChild(card);
    });
}
