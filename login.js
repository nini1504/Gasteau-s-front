const apiUrl = 'http://localhost:8080/login'; // URL da sua API no back-end

async function logar() {
    const cpf = document.getElementById('login').value;  // Pega o valor do campo CPF
    const senha = document.getElementById('senha').value;  // Pega o valor do campo senha

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf, senha }),  // Envia CPF e senha
        });

        if (!response.ok) {
            throw new Error('Falha no login');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);  // Armazena o token JWT no localStorage
        window.location.href = "home.html";  // Redireciona para a página home
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
}
