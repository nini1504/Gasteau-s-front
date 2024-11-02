const apiUrlCadastroCliente = 'http://localhost:8080/cadastro';

async function cadastrarPrato() {
    const nomePrato = document.getElementById('nomePrato').value;
    const ingredientes = document.getElementById('ingredientes').value;

    const prato = {
        nome: nomePrato,
        ingredientes: ingredientes
    };

    //alterar aqui pra chamar o banco
    const pratos = JSON.parse(localStorage.getItem('pratos')) || [];
    pratos.push(prato);
    localStorage.setItem('pratos', JSON.stringify(pratos));

    // Redireciona de volta para a página de pratos
    window.location.href = 'pratos.html'; 
}
