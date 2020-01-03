const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
    console.log(`BOT INICIADO COM SUCESSO!\nTOKEN: ${config.token}.`)

});

client.on('message', async message => {
    function sendReport() {
        message.delete();
        message.reply('denuncia enviada.')

        const channelReport = client.channels.find(x => x.name === 'reports')
        const args = message.content.split(',');
        const args2 = args[0].split(' ');

        if (args[1] == null || args2[1] == null) {
            message.reply('utilize da forma correta: $denunciar {nick}, {motivo}');
        } else {
            name = args2[1];
            reason = args[1];
            channelReport.send(' ```Nome: ' + name + '\nRazão:' + reason + '``` ');
        }

    }

    function sendHelpCall() {
        let min=1000000, max=9000000; 
        let radin = Math.floor(Math.random() * (+max - +min)) + +min; 
        channelName = message.author.username + radin;

        message.guild.createChannel(`${channelName}`, {
            type:'text',
            permissionOverwrites: [{
                id: message.author.id,
                allow: ['VIEW_CHANNEL']
            },

            {
                id: message.guild.id,
                deny: ['VIEW_CHANNEL'],
            }],
        });
    }

    function endHelpCall() {
        message.channel.delete();
    }

    if (!message.guild) return;
    if (message.content.startsWith('$denunciar')) {
        sendReport();    
    }
    else if(message.content.startsWith('$ajuda')) {
        sendHelpCall();
    }
    else if(message.content == '$finalizar') {
        if(!message.member.hasPermission('ADMINISTRATOR')) return
        else {
            endHelpCall();
        }
    }

});

client.login(config.token);