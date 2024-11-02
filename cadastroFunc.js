async function cadastrarFuncionario() {
    const nome = document.getElementById('nomeFuncionario').value;
    const cpf = document.getElementById('cpfFuncionario').value;
    const cargo = document.getElementById('cargoFuncionario').value;
    const senha = document.getElementById('senhaFuncionario').value;
    const curriculo = document.getElementById('curriculoFuncionario').files[0];

    if (!nome || !cpf || !cargo || !senha || !curriculo) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('cpf', cpf);
    formData.append('cargo', cargo);
    formData.append('senha', senha);
    formData.append('curriculo', curriculo);

    try {
        const response = await fetch(apiUrlCadastroFuncionario, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Erro ao cadastrar funcionário');
        alert('Cadastro de funcionário realizado com sucesso!');

        // Armazena o CPF no localStorage para ser usado na página de dados
        localStorage.setItem("funcionarioCpf", cpf);

        // Redireciona para a página de dados do funcionário
        window.location.href = "dadosFun.html";

    } catch (error) {
        console.error('Erro ao cadastrar funcionário:', error);
        alert('Erro ao realizar cadastro.');
    }
}
