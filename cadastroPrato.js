const apiUrlCadastroPrato = 'http://localhost:8080/admin/prato';

async function cadastrarPrato() {
    // Coleta dos dados do formulário
    const nome = document.getElementById("nomePrato").value;
    const preco = parseFloat(document.getElementById("preco").value) || 0;
    const descricao = document.getElementById("descricao").value;
    const modoPreparo = document.getElementById("modoPreparo").value;

    // Verificação de campos obrigatórios
    if (!nome || !preco || !descricao || !modoPreparo) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("preco", preco);
    formData.append("descricao", descricao);
    formData.append("modoPreparo", modoPreparo);

    try {
        const response = await fetch(apiUrlCadastroPrato, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert("Prato cadastrado com sucesso!");
            carregarPratos(); // Atualiza a lista de pratos após o cadastro
        } else if (response.status === 403) {
            alert("Erro: Apenas funcionários podem cadastrar pratos.");
        } else {
            console.error("Erro ao cadastrar prato:", response.statusText);
            alert("Erro ao cadastrar prato: " + response.statusText);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro na requisição: " + error.message);
    }
}


async function removerPrato(cod) {
    try {
        const response = await fetch(`${apiUrlCadastroPrato}/${cod}`, {
            method: 'DELETE'
        });

        if (response.status === 204) {
            alert("Prato removido com sucesso.");
            carregarPratos(); // Atualiza a lista de pratos após a remoção
        } else if (response.status === 403) {
            alert("Somente funcionários têm permissão para excluir pratos.");
        } else {
            throw new Error("Erro ao tentar remover o prato.");
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao remover o prato.");
    }
}