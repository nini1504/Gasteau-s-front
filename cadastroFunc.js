const apiUrlCadastroFuncionario = 'http://localhost:8080/cadastroFuncionario';

async function cadastrarFuncionario() {
    const nome = document.getElementById('nomeFuncionario').value;
    const cpf = document.getElementById('cpfFuncionario').value;
    const cargo = document.getElementById('cargoFuncionario').value;
    const telefone = document.getElementById('telFuncionario').value;
    const senha = document.getElementById('senhaFuncionario').value;

    if (!nome || !cpf || !cargo || !telefone || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const funcionarioData = { nome, cpf, cargo, telefone, senha };

    try {
        const response = await fetch(apiUrlCadastroFuncionario, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(funcionarioData),
        });

        if (!response.ok) throw new Error('Erro ao cadastrar funcionário');
        alert('Cadastro de funcionário realizado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar funcionário:', error);
        alert('Erro ao realizar cadastro.');
    }
}
