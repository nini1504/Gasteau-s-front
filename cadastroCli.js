const apiUrlCadastro = 'http://localhost:8080/cadastro'; // URL da sua API no back-end para cadastro

async function cadastrarCliente() {
    const nome = document.getElementById('nome').value;  // Pega o valor do campo Nome
    const cpf = document.getElementById('cpf').value;  // Pega o valor do campo CPF
    const telefone = document.getElementById('tel').value;  // Pega o valor do campo Telefone
    const senha = document.getElementById('senha').value;  // Pega o valor do campo Senha
    const senha2 = document.getElementById('senha2').value;  // Pega o valor do campo Confirmação de Senha

    // Verifica se as senhas são iguais
    if (senha !== senha2) {
        alert('As senhas não coincidem!');
        return;
    }

    // Verifica se todos os campos foram preenchidos
    if (!nome || !cpf || !telefone || !senha || !senha2) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const clienteData = {
        nome,
        cpf,
        telefone,
        senha
    };

    try {
        const response = await fetch(apiUrlCadastro, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData),  // Envia nome, CPF, telefone e senha
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar cliente');
        }

        const data = await response.json();
        alert('Cadastro realizado com sucesso!');
        window.location.href = "login.html";  // Redireciona para a página de login após o cadastro
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao realizar cadastro.');
    }
}
