// Função para buscar e exibir os dados do funcionário com o CPF após o login 
async function carregarDadosFuncionario() {
    const funcionarioCpf = localStorage.getItem("funcionarioCpf"); // Obter CPF do localStorage
    if (!funcionarioCpf) {
        console.error("CPF do funcionário não encontrado. Faça o login.");
        return;
    }

    try {
        const response = await fetch(`/admin`);
        if (response.ok) {
            const funcionario = await response.json();
            document.getElementById("nome").textContent = `Nome: ${funcionario.nome}`;
            document.getElementById("cpf").textContent = `CPF: ${funcionario.cpf}`;
            document.getElementById("telefone").textContent = `Telefone: ${funcionario.telefone}`;
            document.getElementById("salario").textContent = `Salário: ${funcionario.salario}`;
            document.getElementById("data_contratacao").textContent = `Data de Contratação: ${funcionario.data_contratacao}`;
            document.getElementById("funcao").textContent = `Função: ${funcionario.funcao}`;
        } else {
            console.error("Erro ao buscar dados do funcionário");
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
    }
}

function mostrarFormularioAtualizacao() {
    const form = document.getElementById("atualizarForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

// Função para mostrar o currículo do funcionário
function mostrarCurriculo() {
    const funcionarioCpf = localStorage.getItem("funcionarioCpf");
    if (!funcionarioCpf) {
        console.error("CPF do funcionário não encontrado.");
        return;
    }

   // Abre o currículo em uma nova aba
   const curriculoUrl = `/curriculos/${funcionarioCpf}.pdf`;
   window.open(curriculoUrl, '_blank');
}

// Carrega os dados do funcionário quando a página termina de carregar
window.onload = carregarDadosFuncionario;
