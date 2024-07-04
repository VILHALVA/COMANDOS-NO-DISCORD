const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`ROBÔ ESTÁ ONLINE: ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send('Pong!');
    } else if (command === 'hello') {
        message.channel.send(`Hello, ${message.author.username}!`);
    } else if (command === 'admin') {
        message.channel.send('Hello, Admin!');
    } else if (command === 'help' || command === 'manual') {
        sendHelpMessage(message);
    } else {
        message.channel.send('Comando desconhecido. Digite `' + config.prefix + 'help` para ver os comandos disponíveis.');
    }
});

function sendHelpMessage(message) {
    const embed = {
        color: 0x0099ff,
        title: 'Manual de Instruções do Discord Bot',
        description: 'Aqui estão os comandos disponíveis:',
        fields: [
            {
                name: `${config.prefix}ping`,
                value: 'Retorna "Pong!" para verificar a latência do bot.'
            },
            {
                name: `${config.prefix}hello`,
                value: 'Cumprimenta o usuário que digitou o comando.'
            },
            {
                name: `${config.prefix}admin`,
                value: 'Envia uma mensagem especial para administradores.'
            },
            {
                name: `${config.prefix}help or ${config.prefix}manual`,
                value: 'Mostra esta mensagem de ajuda.'
            }
        ],
        timestamp: new Date(),
        footer: {
            text: 'Bot de Discord - Manual de Instruções'
        }
    };
    message.channel.send({ embeds: [embed] });
}

client.login(config.token);
