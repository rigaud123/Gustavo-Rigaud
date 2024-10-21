async function fetchData() {
    const cep = document.getElementById('cep').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    if (cep) {
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        const data = await response.json();
  
        if (data) {
          resultDiv.innerHTML = `
            <p><strong>CEP:</strong> ${data.cep}</p>
            <p><strong>Estado:</strong> ${data.state}</p>
            <p><strong>Cidade:</strong> ${data.city}</p>
            <p><strong>Bairro:</strong> ${data.neighborhood}</p>
            <p><strong>Rua:</strong> ${data.street}</p>
          `;
        }
      } catch (error) {
        resultDiv.innerHTML = '<p class="text-danger">Erro ao buscar os dados. Tente novamente.</p>';
      }
    } else {
      resultDiv.innerHTML = '<p class="text-danger">Por favor, insira um CEP válido.</p>';
    }
  }
  