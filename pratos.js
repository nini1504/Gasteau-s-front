  // Função para cadastrar um prato
  async function cadastrarPrato() {
    try {
      const response = await fetch('/cadastrar-prato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ /* dados do prato */ })
      });
      const result = await response.json();

      if (response.ok) {
        alert('Prato cadastrado com sucesso!');
      } else {
        alert(result.message || 'Permissão negada. Somente administradores podem cadastrar pratos.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o prato:', error);
      alert('Erro ao processar a requisição.');
    }
  }

  // Função para atualizar um prato
  async function atualizarPrato() {
    try {
      const response = await fetch('/atualizar-prato', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ /* dados do prato para atualizar */ })
      });
      const result = await response.json();

      if (response.ok) {
        alert('Prato atualizado com sucesso!');
      } else {
        alert(result.message || 'Permissão negada. Somente administradores podem atualizar pratos.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o prato:', error);
      alert('Erro ao processar a requisição.');
    }
  }

  // Função para remover um prato
  async function removerPrato() {
    try {
      const response = await fetch('/remover-prato', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ /* identificador do prato para remover */ })
      });
      const result = await response.json();

      if (response.ok) {
        alert('Prato removido com sucesso!');
      } else {
        alert(result.message || 'Permissão negada. Somente administradores podem remover pratos.');
      }
    } catch (error) {
      console.error('Erro ao remover o prato:', error);
      alert('Erro ao processar a requisição.');
    }
  }

  async function carregarPratos() {
    try {
        const response = await fetch('/pratos'); // Requisição GET para obter os pratos
        if (response.ok) {
            const pratos = await response.json();
            exibirPratos(pratos);
        } else {
            console.error("Erro ao carregar pratos:", response.statusText);
            alert("Erro ao carregar pratos.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao carregar pratos.");
    }
}