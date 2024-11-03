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

  async function atualizarPrato(cod) {
    const dadosPrato = {
        nome: document.getElementById("nomePrato").value,
        preco: parseFloat(document.getElementById("preco").value) || 0,
        descricao: document.getElementById("descricao").value,
    };

    try {
        const response = await fetch(`/admin/prato/${cod}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(dadosPrato)
        });

        if (response.ok) {
            alert("Prato atualizado com sucesso!");
            carregarPratos();
        } else if (response.status === 403) {
            alert("Acesso negado: você não tem permissão para atualizar pratos.");
        } else if (response.status === 404) {
            alert("Erro: Prato não encontrado.");
        } else {
            console.error("Erro ao atualizar prato:", response.statusText);
            alert("Erro ao atualizar prato: " + response.statusText);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro na requisição: " + error.message);
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