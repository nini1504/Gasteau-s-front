// Função para buscar e exibir os dados do funcionário com o número da carteira após o login
async function carregarDadosFuncionario() {
    const funcionarioNroCarteira = localStorage.getItem("nrocarteira"); // Obter nrocarteira do localStorage
    if (!funcionarioNroCarteira) {
        console.error("Número da carteira do funcionário não encontrado. Faça o login.");
        return;
    }

    try { 
        // Atualize a URL para incluir o número da carteira e o token
        const response = await fetch(`http://localhost:8080/admin`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Inclui o token de autenticação no header
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const funcionario = await response.json();

            // Exibindo os dados do funcionário na página
            document.getElementById("nome").textContent = `Nome: ${funcionario.nome}`;
            document.getElementById("nrocarteira").textContent = `Número da Carteira: ${funcionario.nroCarteira}`;
            document.getElementById("cargo").textContent = `Função: ${funcionario.funcao}`;
            document.getElementById("salario").textContent = `Salário: ${funcionario.salario}`;
            
            // Armazenar o currículo no localStorage para uso posterior
            localStorage.setItem("curriculo", funcionario.curriculo);
            
        } else {
            console.error("Erro ao buscar dados do funcionário");
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
    }
}

// Função para mostrar o currículo do funcionário
function mostrarCurriculo() {
    const curriculoBase64 = localStorage.getItem("curriculo");
    if (!curriculoBase64) {
        console.error("Currículo não encontrado.");
        return;
    }

    // Converter a string base64 em um Blob
    const byteCharacters = atob(curriculoBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Criar uma URL para o Blob e abrir em uma nova aba
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}

// Função para voltar para a página home
function voltarHome() {
    window.location.href = 'home.html'; // Redireciona para home.html
}

// Carrega os dados quando a página termina de carregar
window.onload = carregarDadosFuncionario;
