function adicionarPrato() {
    window.location.href = 'cadastroPrato.html'; // Redireciona para a página de cadastro
}

// Simulação de uma lista de pratos cadastrados (pode ser substituído por uma chamada de API ou banco de dados)
const pratos = JSON.parse(localStorage.getItem('pratos')) || [];

function exibirPratos() {
    const lista = document.getElementById('listaPratos');
    lista.innerHTML = ''; // Limpa a lista atual

    pratos.forEach(prato => {
        const li = document.createElement('li');
        li.textContent = prato.nome; // Exibe o nome do prato
        lista.appendChild(li);
    });
}

// Carrega os pratos ao iniciar a página
exibirPratos();

function removerPrato() {
    alert("Função restrita a funcionários. Você não tem permissão para excluir pratos.");
}