const reservaUrl = 'http://localhost:8080/reserva'; // URL do back-end para reservas

async function cadastrarReserva() {
    const token = localStorage.getItem('token');  // Recupera o token JWT do localStorage
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
        dataHora: new Date(dataHora).toISOString()  // Converte data e hora para o formato ISO 8601
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

        if (!response.ok) {
            throw new Error('Erro ao cadastrar reserva');
        }

        const data = await response.json();
        console.log('Reserva cadastrada:', data);
        alert('Reserva cadastrada com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar reserva:', error);
        alert('Erro ao cadastrar reserva.');
    }
}
