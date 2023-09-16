const socket = io()

socket.emit("guildMemberAdd", {
    user: {
        bot: false,
        username: '',
    },
    attachment: 2
})

socket.on('guildMemberAdd', member => {
    socket.emit('messageCreate', {
        user: {
            username: 'Jujuba',
            icon: '138addc059dea27a44bcc0520bc39484',
            bot: true
        },
        content: `@${member.username} seja bem vindo ao chat!`
    })
})

socket.on('messageCreate', message => {
    const inputField = document.getElementById('inputField');
    const messageContainer = document.getElementById('messageContainer');

    inputField.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        const text = inputField.value;
        const messageDiv = document.createElement('div');
        messageDiv.textContent = text;
        messageContainer.appendChild(messageDiv);
        inputField.value = ''; // Limpar o campo de entrada (opcional)
      }
    });
})