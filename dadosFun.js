// Função para buscar e exibir os dados do funcionário com o número da carteira após o login
async function carregarDadosFuncionario() {
    const funcionarioNroCarteira = localStorage.getItem("nrocarteira"); // Obter nrocarteira do localStorage
    if (!funcionarioNroCarteira) {
        console.error("Número da carteira do funcionário não encontrado. Faça o login.");
        return;
    }

    try { 
        // Atualize a URL para incluir o número da carteira e o token
        const response = await fetch(`http://localhost:8080/funcionario/${funcionarioNroCarteira}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Inclui o token de autenticação no header
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const funcionario = await response.json();

            // Exibindo os dados do funcionário na página
            document.getElementById("nome").textContent = `Nome: ${funcionario.nome}`;
            document.getElementById("nrocarteira").textContent = `Número da Carteira: ${funcionario.nrocarteira}`;
            document.getElementById("cargo").textContent = `Cargo: ${funcionario.cargo}`;
            
        } else {
            console.error("Erro ao buscar dados do funcionário");
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
    }
}

// Função para mostrar o currículo do funcionário
function mostrarCurriculo() {
    const funcionarioNroCarteira = localStorage.getItem("nrocarteira");
    if (!funcionarioNroCarteira) {
        console.error("Número da carteira do funcionário não encontrado.");
        return;
    }

    // Abre o currículo do funcionário em uma nova aba
    window.open(`/curriculos/${funcionarioNroCarteira}.pdf`, "_blank");
}

// Função para voltar para a página home
function voltarHome() {
    window.location.href = 'home.html'; // Redireciona para home.html
}

// Carrega os dados quando a página termina de carregar
window.onload = carregarDadosFuncionario;
