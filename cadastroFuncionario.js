const apiUrlCadastroFuncionario = 'http://localhost:8080/cadastro/funcionario';

async function cadastrarFuncionario() {
    const nome = document.getElementById('nome').value; 
    const nrocarteira = document.getElementById('nrocarteira').value; 
    const cargo = document.getElementById('cargo').value; 
    const telefone = document.getElementById('telefone').value; // Novo campo
    const dataContratacao = document.getElementById('dataContratacao').value; // Novo campo
    const senha = document.getElementById('senha').value; 
    const curriculo = document.getElementById('curriculoFuncionario').files[0];

    if (!nome || !nrocarteira || !cargo || !telefone || !dataContratacao || !senha) { // Adicionei as novas validações
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('nroCarteira', nrocarteira);
    formData.append('funcao', cargo);
    formData.append('telefone', telefone); // Adicionado
    formData.append('dataContratacao', dataContratacao); // Adicionado
    formData.append('senha', senha);
    formData.append('curriculo', curriculo);

    try {
        const response = await fetch(apiUrlCadastroFuncionario, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Erro ao cadastrar funcionário');
        alert('Cadastro de funcionário realizado com sucesso!');

        localStorage.setItem("nrocarteira", nrocarteira);
        window.location.href = "home.html";
    } catch (error) {
        console.error('Erro ao cadastrar funcionário:', error);
        alert('Erro ao realizar cadastro.');
    }
}
