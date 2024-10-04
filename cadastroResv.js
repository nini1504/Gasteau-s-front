const reservaUrl = 'http://localhost:8080/reserva'; // URL do back-end para reservas

async function cadastrarReserva() {
    const token = localStorage.getItem('token');  // Recupera o token JWT do localStorage
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('tel').value;
    const qtdPessoas = document.getElementById('qtdPessoas').value;
    const dataHora = document.getElementById('dataHora').value;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !cpf || !telefone || !qtdPessoas || !dataHora) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const reservaData = {
        nome,
        cpf,
        telefone,
        qtdPessoas,
        dataHora
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
