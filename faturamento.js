document.addEventListener("DOMContentLoaded", function () {
    fetchRelatorioMensal();
});

async function fetchRelatorioMensal() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para visualizar o relatório mensal.');
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/admin/relatorioReservasClientes",{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const dados = await response.json();    
            displayRelatorioAsCards(dados);
        } else {
            console.error("Erro ao carregar relatório:", response.statusText);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }

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
