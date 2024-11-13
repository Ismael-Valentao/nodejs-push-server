/**
 * Servidor do backend
 */
const express = require('express');
const webPush = require('web-push');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();//Carrega o arquivo .env

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

//Remova o comentário das duas linhas abaixo para gerar as chaves e ver no console. Não esquecer de colocar as chaves no arquivo .env
//const vapidKeys = webPush.generateVAPIDKeys();
//console.log(vapidKeys)

webPush.setVapidDetails(
    `mailto:${process.env.EMAIL}`,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

//O cliente recebe a chave quando faz a requisição para este endpoint. Razão pela qual estamos a usar cors.
app.get('/user/vapid_key', (req, res) => {
    return res.status(200).json({
        'status': 'success',
        'data': {
            'key': process.env.VAPID_PUBLIC_KEY
        }
    })
})

//Para o registo da subscrição. Fique à vontade para guardar o pushSubscription numa base de dados.
app.post('/user/push-regist', (req, res) => {
    //console.log(req.body)
    const pushSubscription = req.body;

    const payload = JSON.stringify({ title: 'Olá!', body: 'Você tem uma nova mensagem!', icon: 'http://localhost:2000/icons/meta.png' });

    webPush.sendNotification(pushSubscription, payload).catch(error => {
        console.error('Erro ao enviar notificação:', error);
    });
    return res.status(200).json({ 'status': 'success' })
})

app.listen(PORT, () => {
    console.log(`Backend Server Running in PORT ${PORT}`)
})