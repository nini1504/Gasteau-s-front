
const apiUrlCadastroFuncionario = 'http://localhost:8080/cadastro/admin';

async function cadastrarFuncionario() {
    const nome = document.getElementById('nomeFuncionario').value;
    const nrocarteira = document.getElementById('nrocarteira').value;
    const cargo = document.getElementById('cargoFuncionario').value;
    const senha = document.getElementById('senhaFuncionario').value;
    const curriculo = document.getElementById('curriculoFuncionario').files[0];

    if (!nome || !nrocarteira || !cargo || !senha || !curriculo) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('nrocarteira', nrocarteira);
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

        // Armazena o nrocarteira no localStorage 
        localStorage.setItem("nrocarteira", nrocarteira);

        // Redireciona para a home
        window.location.href = "home.html";//ver se pode redirecionar para a página de dados dele

    } catch (error) {
        console.error('Erro ao cadastrar funcionário:', error);
        alert('Erro ao realizar cadastro.');
    }
}
