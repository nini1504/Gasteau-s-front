const apiUrlAtualizarPratos = 'http://localhost:8080/admin/prato'; 

async function atualizarPrato() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para cadastrar o prato.');
        return;
    }

    const idPrato = document.getElementById('idPrato').value;
    const nomePrato = document.getElementById('nomePrato').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;

    const dadosAtualizados = {};

    // Adiciona os campos apenas se estiverem preenchidos
    if (nomePrato) {
        dadosAtualizados.nome = nomePrato;
    }
    if (preco) {
        dadosAtualizados.preco = parseFloat(preco); // Converte para float
    }
    if (descricao) {
        dadosAtualizados.descricao = descricao;
    }

    try {
        const response = await fetch(`${apiUrlAtualizarPratos}/${idPrato}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (response.ok) {
            alert('Prato atualizado com sucesso!');
            document.getElementById('atualizarPratosForm').reset(); // Limpa o formulário
            window.location.href = "pratos.html";
        } else {
            console.error('Erro ao atualizar o prato');
            alert('Erro ao atualizar o prato. Verifique os campos e tente novamente.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Erro de conexão. Tente novamente mais tarde.');
    }
}
