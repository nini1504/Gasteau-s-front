const apiUrlPratos = 'http://localhost:8080/pratosAvaliados';

async function carregarPratos() {
    try {
        const response = await fetch(apiUrlPratos);
        const pratos = await response.json();

        const pratosDiv = document.getElementById('pratos');
        pratosDiv.innerHTML = pratos.map(prato => `
            <div class="prato">
                <h2>${prato.nome}</h2>
                <p>Avaliação: ${prato.avaliacao} estrelas</p>
                <p>${prato.descricao}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar pratos:', error);
        document.getElementById('pratos').textContent = 'Erro ao carregar pratos.';
    }
}

window.onload = carregarPratos;
