const apiUrl = 'http://localhost:8080/user'; // URL base da API para o cliente

// Função para buscar e exibir os dados do cliente com o CPF após o login
async function carregarDadosCliente() {
    const token = localStorage.getItem("token"); // Obter o token JWT do localStorage

    // Verifica se o token está presente, caso contrário, redireciona para a página de login

    if (!token) {
        console.error("Token não encontrado. Faça o login.");
        window.location.href = "login.html"; // Redireciona para o login, se o token não estiver presente
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token, // Adiciona o token JWT no cabeçalho de autorização
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const cliente = await response.json();
            document.getElementById("nome").textContent = `Nome: ${cliente.nome}`;
            document.getElementById("cpf").textContent = `CPF: ${cliente.cpf}`;
            document.getElementById("telefone").textContent = `Telefone: ${cliente.telefone}`;
            document.getElementById("classificacao").textContent = `Classificação: ${cliente.classificacao}`;
            
            // Verifica se existe foto e, em caso positivo, converte e define no elemento 'foto'
            if (cliente.fotoPerfil) {
                const fotoBase64 = `data:image/png;base64,${cliente.fotoPerfil}`;
                document.getElementById("foto").src = fotoBase64;
            } else {
                document.getElementById("foto").alt = "Foto não disponível";
            }
        } else {
            console.error("Erro ao buscar dados do cliente");
        }
        
    } catch (error) {
        console.error("Erro de conexão:", error);
    }
}

// Função para mostrar o formulário de atualização de dados
function mostrarFormularioAtualizacao() {
    const form = document.getElementById("atualizarForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

// Função para atualizar o telefone do cliente
async function atualizarDados() {
    const novoTelefone = document.getElementById("novoTelefone").value;
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${apiUrl}/atualizar-telefone?novoTelefone=${encodeURIComponent(novoTelefone)}`, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + token, // Adiciona o token JWT
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log("Dados atualizados com sucesso");
            carregarDadosCliente(); // Recarrega os dados atualizados na tela
            mostrarFormularioAtualizacao(); // Oculta o formulário após a atualização
        } else {
            console.error("Erro ao atualizar os dados do cliente");
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
    }
}

// Função para excluir a conta do cliente
async function apagarInformacoes() {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch('http://localhost:8080/user', {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token, // Adiciona o token JWT
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log("Conta excluída com sucesso");
            // Remove informações do localStorage
            localStorage.removeItem("clienteCpf");
            localStorage.removeItem("token");
            // Redireciona para a página de login
            window.location.href = "login.html";
        } else {
            console.error("Erro ao excluir a conta");
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
    }
    window.location.href = "home.html";
}

// Carrega os dados quando a página termina de carregar
window.onload = carregarDadosCliente;
