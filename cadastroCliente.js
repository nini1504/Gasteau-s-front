const apiUrlCadastroCliente = 'http://localhost:8080/cadastro';

async function cadastrarCliente() {
    const nome = document.getElementById('nomeCliente').value;
    const cpf = document.getElementById('cpfCliente').value;
    const telefone = document.getElementById('telCliente').value;
    const foto = document.getElementById('fotoCliente').files[0];
    const senha = document.getElementById('senhaCliente').value;
    const senha2 = document.getElementById('senhaCliente2').value;

    if (senha !== senha2) {
        alert('As senhas não coincidem!');
        return;
    }

    if (!nome || !cpf || !telefone || !senha || !senha2) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('cpf', cpf);
    formData.append('telefone', telefone);
    formData.append('senha', senha);
    formData.append('foto', foto);

    try {
        const response = await fetch(apiUrlCadastroCliente, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clienteData),
        });

        if (!response.ok) throw new Error('Erro ao cadastrar cliente');
        alert('Cadastro de cliente realizado com sucesso!');
        window.location.href = "login.html";
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao realizar cadastro.');
    }
}
