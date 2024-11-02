const apiUrl = 'http://localhost:8080/login'; // URL da sua API no back-end

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
        localStorage.setItem('token', data.token);  // Armazena o token JWT no localStorage

        // Exibe uma mensagem de sucesso
        mensagemDiv.style.color = 'green'; // Muda a cor da mensagem para verde
        mensagemDiv.textContent = 'Login realizado com sucesso! Redirecionando...';

        // Redireciona para a página home após um breve atraso
        setTimeout(() => {
            window.location.href = "home.html";  // Redireciona para a página home
        }, 1000); // 1 segundo de atraso para que a mensagem de sucesso seja visível
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        // Exibe uma mensagem de erro genérica
        mensagemDiv.textContent = 'Erro ao fazer login.';
    }
}