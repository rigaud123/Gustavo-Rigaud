// Função para carregar registros do LocalStorage e exibir na tabela
function carregarRegistros() {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const listaRegistros = document.getElementById('registrosLista');
  listaRegistros.innerHTML = '';

  registros.forEach((registro, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${registro.nome}</td>
          <td>${registro.telefone}</td>
          <td>
              <button class="btn btn-danger btn-sm" onclick="deletarRegistro(${index})">Excluir</button>
          </td>
      `;
      listaRegistros.appendChild(row);
  });
}

// Função para adicionar um novo registro
function adicionarRegistro(event) {
  event.preventDefault(); // Previne o envio do formulário

  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;

  // Valida os campos
  if (!nome || !telefone) {
      alert('Por favor, preencha todos os campos.');
      return;
  }

  // Carrega os registros armazenados no LocalStorage
  const registros = JSON.parse(localStorage.getItem('registros')) || [];

  // Verifica se o nome ou telefone já existe
  const existeRegistro = registros.some(registro => registro.nome === nome || registro.telefone === telefone);

  if (existeRegistro) {
      // Exibe a mensagem de erro
      const mensagemErro = document.getElementById('mensagemErro');
      mensagemErro.classList.remove('d-none');
      return;
  }

  // Se não existir, adiciona o novo registro
  registros.push({ nome, telefone });

  // Salva os dados no LocalStorage
  localStorage.setItem('registros', JSON.stringify(registros));

  // Limpa os campos
  document.getElementById('nome').value = '';
  document.getElementById('telefone').value = '';

  // Esconde a mensagem de erro, caso apareça
  const mensagemErro = document.getElementById('mensagemErro');
  mensagemErro.classList.add('d-none');

  // Atualiza a tabela
  carregarRegistros();
}

// Função para excluir um registro
function deletarRegistro(index) {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  registros.splice(index, 1); // Remove o item do array

  // Salva novamente no LocalStorage
  localStorage.setItem('registros', JSON.stringify(registros));

  // Atualiza a tabela
  carregarRegistros();
}

// Adiciona o evento de submissão do formulário
document.getElementById('formRegistro').addEventListener('submit', adicionarRegistro);

// Carrega os registros quando a página é carregada
window.onload = carregarRegistros;
