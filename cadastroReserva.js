const reservaUrl = 'http://localhost:8080/reserva'; // URL do back-end para reservas

async function cadastrarReserva() {
    const token = localStorage.getItem('token');  // Recupera o token JWT do localStorage
    
    // Verifica se o token está presente
    if (!token) {
        alert('Você precisa estar logado para fazer uma reserva.');
        return;
    }

    const mesa = document.getElementById('mesa').value;
    const qtdPessoas = document.getElementById('qtdP').value;
    const dataHora = document.getElementById('dt').value;

    // Verifica se todos os campos foram preenchidos
    if (!mesa || !qtdPessoas || !dataHora) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const reservaData = {
        mesa: parseInt(mesa),  // Certifique-se de que 'mesa' é um número inteiro
        qtd: parseInt(qtdPessoas),  // 'qtd' corresponde à quantidade de pessoas
        dataHora: dataHora  // Usar a string de data diretamente
    };

    try {
        const response = await fetch(reservaUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Inclui o token JWT no cabeçalho
            },
            body: JSON.stringify(reservaData),
        });

        // Verifica a resposta do servidor
        if (!response.ok) {
            const errorData = await response.json(); // Obtenha a mensagem de erro do servidor, se disponível
            console.error('Erro ao cadastrar reserva:', errorData);
            alert(`Erro ao cadastrar reserva: ${errorData.message || 'Erro desconhecido.'}`);
            return;
        }

        const data = await response.json();
        console.log('Reserva cadastrada:', data);
        alert('Reserva cadastrada com sucesso!');
        window.location.href = "home.html";              // Redireciona para a "home"


    } catch (error) {
        console.error('Erro ao cadastrar reserva:', error);
        alert('Erro ao cadastrar reserva.');
    }
}
