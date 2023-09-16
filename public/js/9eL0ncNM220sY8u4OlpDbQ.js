const socket = io()

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

const username = getCookie('username')
const icon = localStorage.getItem("icon");
socket.on('connect', () => {

    socket.emit('messageCreate', {
        user: {
            username: 'Jujuba',
            icon: '138addc059dea27a44bcc0520bc39484',
            bot: true
        },
        content: `@${username.replace(/ /g, '_')} bem vindo ao chat!`
    
})
            })
            const inputField = document.getElementById('text-input-label');
            const messageContainer = document.getElementById('sub-caixa-1');
            console.log(inputField, messageContainer)
            document.addEventListener('keydown', function(event) {
           const user ={
            username: username,
            icon: icon,
            bot: false
          }
      if (event.key === 'Enter') {
        const text = inputField.value
        const v = text.trim()
        if(v !== '') {
            socket.emit('messageCreate', {
            user: user,
            content: text
        })
        inputField.value = ' '
        }
       
      }
    });

socket.on('messageCreate', message => {
    const messageContainer = document.getElementById('sub-caixa-1');
    const mentionRegex = /@(\w+)/g;
    const inputString = message.content

// Substituir todas as menções pela string com <span> tags
const outputString = inputString?.replace(mentionRegex, '<strong class="mention">@$1</strong>')?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')?.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="link">$1</a>');

        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<div class="message-box">
        <div class="message-box-user-icon">
            ${message.user.bot ? `${message.user.icon ? `<img src="/images/users/${message.user.icon}.png">` : null}` : `${message.user.icon ? `<img src="${message.user.icon}">` : null}`}
        </div>
        <div class="message-box-chat">
            <div class="message-box-user-username">
                ${message.user.username ? message.user.username : 'NotFound'}
                ${message.user.bot ? `<img src="/images/bot.png">` : ' '}
            </div>
            <div class="message-box-user-message">
                <span>${outputString ? outputString : ' '}</span>
                
                ${message.attachment ? `<img src="${message.attachment}">` : ' '}
                <!-- <div class="embed">É um  de texto É um fato cÉ um fato conhecido de todos que um leitor se distrairá com o cotrairá com o conteúdo de texto onhecido de todos que um leitor se distrairá com o conteúdo de texto </div> -->
            </div>
        </div>
    </div>`

        messageContainer.appendChild(messageDiv);
})

    

// Adicione um ouvinte de evento ao elemento de interface
document.getElementById("file-input-label").addEventListener("click", function() {
    // Simule o clique no input do tipo "file" quando o elemento de interface for clicado
    document.getElementById("file-input").click();
});

// Adicione um ouvinte de evento ao input do tipo "file" para lidar com a seleção de arquivo
document.getElementById("file-input").addEventListener("change", function() {
    if (this.files.length > 0) {
        const file = this.files[0];
        const reader = new FileReader();

        // Evento disparado quando a leitura do arquivo for concluída
        reader.onload = function(event) {
            const base64Data = event.target.result;
            socket.emit('messageCreate', {
                user: {
                    username: username,
                    icon: icon,
                    bot: false
                },
                content: null,
                attachment: base64Data
            })
        };

        // Leia o arquivo como uma URL de dados (Base64)
        reader.readAsDataURL(file);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Quando a página estiver totalmente carregada, esconda a tela de preloader
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    }, 1000)
});

function imageToBase64() {
    var image = document.getElementById("image-box");
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const base64Data = canvas.toDataURL("image/jpeg"); // Você pode ajustar o formato aqui
    return base64Data
}
