const apiUrl = 'http://localhost:8080/login/user'; // URL da sua API no back-end

async function logar() {
    const cpf = document.getElementById('login').value;  // Pega o valor do campo CPF
    const senha = document.getElementById('senha').value;  // Pega o valor do campo senha
    const mensagemDiv = document.getElementById('mensagem'); // Pega a div para exibir mensagens

    // Limpa qualquer mensagem anterior
    mensagemDiv.textContent = '';

    // Verifica se os campos foram preenchidos
    if (!cpf || !senha) {
        mensagemDiv.textContent = 'Por favor, preencha ambos os campos!';
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf, senha }),  // Envia CPF e senha
        });

        if (!response.ok) {
            // Exibe uma mensagem de erro
            mensagemDiv.textContent = 'Falha no login. Verifique seu CPF e senha.';
            return;
        }

        const data = await response.json();
        localStorage.setItem('funcionarioCpf', cpf); // Armazena o CPF
        window.location.href = "home.html"; // Redireciona para a "home"
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        mensagemDiv.textContent = 'Erro ao fazer login.';
    }
}