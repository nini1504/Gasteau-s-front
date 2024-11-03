const apiUrl = 'http://localhost:8080/user'; // URL da sua API no back-end

// Função para buscar e exibir os dados do cliente com o CPF após o login
async function carregarDadosCliente() {
    const clienteCpf = localStorage.getItem("clienteCpf"); // Obter CPF do localStorage
    if (!clienteCpf) {
        console.error("CPF do cliente não encontrado. Faça o login.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/user`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token") // Adiciona o token
            }
        });
        if (response.ok) {
            const cliente = await response.json();
            document.getElementById("nome").textContent = `Nome: ${cliente.nome}`;
            document.getElementById("cpf").textContent = `CPF: ${cliente.cpf}`;
            document.getElementById("telefone").textContent = `Telefone: ${cliente.telefone}`;
            // document.getElementById("foto").src = cliente.foto;
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

    try {
        const response = await fetch(`http://localhost:8080/user/atualizar-telefone?novoTelefone=${encodeURIComponent(novoTelefone)}`, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token") // Adiciona o token
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

// Função para excluir a reserva do cliente
async function excluirReserva() {
    const clienteCpf = localStorage.getItem("clienteCpf");

    try {
        const response = await fetch(`http://localhost:8080/clientes/${clienteCpf}/reserva`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token") // Adiciona o token
            }
        });

        if (response.ok) {
            console.log("Reserva excluída com sucesso");
            // Opcional: Redirecionar ou atualizar a página
        } else {
            console.error("Erro ao excluir a reserva");
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
    }
}

// Função para excluir a conta do cliente
async function excluirConta() {
    try {
        const response = await fetch(`http://localhost:8080/user`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token") // Adiciona o token
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
}

// Função para apagar as informações exibidas
function apagarInformacoes() {
    document.getElementById("nome").textContent = "Nome: ";
    document.getElementById("cpf").textContent = "CPF: ";
    document.getElementById("telefone").textContent = "Telefone: ";
    document.getElementById("foto").src = ""; // Remove a foto
    console.log("Informações apagadas da tela");
}

// Carrega os dados quando a página termina de carregar
window.onload = carregarDadosCliente;
