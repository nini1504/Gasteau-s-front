const apiUrlCadastroPrato = 'http://localhost:8080/admin/prato';

async function cadastrarPrato() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para cadastrar o prato.');
        return;
    }


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

    const pratoDados = {
        nome: nome,
        preco: preco,
        descricao: descricao,
        modoPreparo: modoPreparo

    };

    try {
        const response = await fetch(apiUrlCadastroPrato, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(pratoDados),
        });
        

        if (response.ok) {
            alert("Prato cadastrado com sucesso!");
            carregarPratos(); // Atualiza a lista de pratos após o cadastro
            window.location.href = "pratos.html";

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