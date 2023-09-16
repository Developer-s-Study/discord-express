import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv'
import bodyParser from 'body-parser'
import fs from 'node:fs'
import { Server } from 'socket.io'
import http from 'http'
const port = process.env.PORT || 3000;
config()


function getCurrentDirectory() {
  const __filename = fileURLToPath(import.meta.url);
  return dirname(__filename);
}

const __dirname = getCurrentDirectory()

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const folderPath = './public/videos';
// Views
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const guilds = [
  {
    name: 'C.D.N ™ 🍭',
    id: '952977503029440593',
    icon: 'a_fdd2fb1b6e06383a0f9fe3c655708e8d',
    gif: true,
    members: [
      {
      username: "hy.tysaiw",
      icon: "aHkudHlzYWl3",
      verified: true,
      id: '280879353292914700'
     }
    ],
    channels: [
      {
        type: 0,
        id: '1',
        name: "general"
      }
    ]
  }
]
// Rotas
app.get('/channels/:guild_id/:channel_id', (req, res) => {
    const guild = guilds.find(guild => guild.id === req.params.guild_id)
    const channel = guild.channels.find(channel => channel.id === req.params.channel_id)
    if(!guild) return res.json({ error: "Servidor não existe!"})
    if(!channel) return res.json({ error: "Canal de texto não existe!"})
    res.render('chat', {
      channel: channel,
      guild: guild,
      guilds: guilds,
      messages: [
        // {
        //   user: {
        //     username: 'hy.tysaiw',
        //     icon: 'aHkudHlzYWl3',
        //     bot: true
        //   },
        //   content: "Apenas um teste, OK?",
        //   attachment: 'aHkudHlzYWl3'
        // }
      ]
    });

});

app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('messageCreate', (message) => {
    io.emit('messageCreate', message);
    console.log('messageCreate')
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});


server.listen(port, () => {
  console.log(`Servidor iniciado [http://localhost:${port}/]`);
  //open(`http://localhost:${port}/`)
});
