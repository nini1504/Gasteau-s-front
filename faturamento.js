document.addEventListener("DOMContentLoaded", function() { 
    fetchRelatorioMensal();
});

function fetchRelatorioMensal() {
    fetch("/api/relatorios/relatorioMensal")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar dados do relatório mensal.");
            }
            return response.json();
        })
        .then(data => displayRelatorioAsCards(data))
        .catch(error => console.error("Erro ao buscar relatório:", error));
}

function displayRelatorioAsCards(data) {
    const container = document.getElementById("relatorioMensalContainer");
    container.innerHTML = ""; // Limpa o conteúdo anterior

    data.forEach(item => {
        // Criação do card
        const card = document.createElement("div");
        card.classList.add("card");

        // Ano
        const ano = document.createElement("h3");
        ano.textContent = `Ano: ${item.ano}`;
        card.appendChild(ano);

        // Mês
        const mes = document.createElement("p");
        mes.textContent = `Mês: ${item.mes}`;
        card.appendChild(mes);

        // Valor Total
        const valorTotal = document.createElement("p");
        valorTotal.textContent = `Valor Total: R$ ${item.valor_total_reservas_mes ? item.valor_total_reservas_mes.toFixed(2) : '0.00'}`;
        card.appendChild(valorTotal);

        // Adicionar o card ao container
        container.appendChild(card);
    });
}
