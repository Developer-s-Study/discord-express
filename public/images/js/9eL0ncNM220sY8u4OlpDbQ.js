// Adicione um ouvinte de evento ao elemento de interface
document.getElementById("file-input-label").addEventListener("click", function() {
    // Simule o clique no input do tipo "file" quando o elemento de interface for clicado
    document.getElementById("file-input").click();
});

// Adicione um ouvinte de evento ao input do tipo "file" para lidar com a seleção de arquivo
document.getElementById("file-input").addEventListener("change", function() {
    alert("Você selecionou o arquivo: " + this.files[0].name);
    console.log(this.files[0])
});

document.addEventListener("DOMContentLoaded", function() {
    // Quando a página estiver totalmente carregada, esconda a tela de preloader
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    }, 1000)
});
