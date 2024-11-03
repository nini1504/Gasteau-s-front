const apiUrlAtualizarPratos = 'http://localhost:8080/admin/prato'; 

async function atualizarPrato() {
    const idPrato = document.getElementById('idPrato').value;
    const nomePrato = document.getElementById('nomePrato').value;
    const preco = document.getElementById('preco').value;
    const avaliacaoMed = document.getElementById('avaliacaoMed').value;
    const descricao = document.getElementById('descricao').value;
    const modoPreparo = document.getElementById('modoPreparo').value;

    const dadosAtualizados = {
        nome: nomePrato || undefined,
        preco: preco ? parseFloat(preco) : undefined,
        avaliacaoMed: avaliacaoMed ? parseFloat(avaliacaoMed) : undefined,
        descricao: descricao || undefined,
        modoPreparo: modoPreparo || undefined
    };

    try {
        const response = await fetch(`${apiUrlAtualizarPratos}/${idPrato}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (response.ok) {
            alert('Prato atualizado com sucesso!');
            document.getElementById('atualizarPratosForm').reset(); // Limpa o formulário
        } else {
            console.error('Erro ao atualizar o prato');
            alert('Erro ao atualizar o prato. Verifique o ID e tente novamente.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Erro de conexão. Tente novamente mais tarde.');
    }
}
