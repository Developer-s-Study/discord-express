document.getElementById("file-input-label").addEventListener("click", function() {
    // Simule o clique no input do tipo "file" quando o elemento de interface for clicado
    document.getElementById("file-input").click();
});

// Adicione um ouvinte de evento ao input do tipo "file" para lidar com a seleção de arquivo
document.getElementById("file-input").addEventListener("change", function() {
    const input = document.getElementById('file-input')
    const imagem = document.getElementById('image-box')
    if (input.files && input.files[0]) {
        // Cria um objeto URL para o arquivo selecionado
        var reader = new FileReader();
        
        reader.onload = function(e) {
            // Define o atributo src da imagem com a URL do arquivo selecionado
            imagem.src = e.target.result;
        }
        
        // Lê o arquivo como uma URL de dados
        reader.readAsDataURL(input.files[0]);
    }
});

const inputField = document.getElementById('input-text')

inputField.addEventListener('keyup', function(event) {
    if(event.key === 'Enter') {
        // Função para definir um cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  
  // Exemplo de uso para armazenar nome de usuário e senha
  setCookie("username", inputField.value, 30); // Armazena o nome de usuário por 30 dias
  setCookie("password", "sua_senha", 30); // Armazena a senha por 30 dias
  
    }
})
