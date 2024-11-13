const express = require('express');
const webPush = require('web-push');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const PORT = 3000;
const app = express();
app.use(cors())
app.use(express.json())

//const vapidKeys = webPush.generateVAPIDKeys();
webPush.setVapidDetails(
    `mailto:${process.env.EMAIL}`,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

app.get('/user/vapid_key', (req, res) => {
    return res.status(200).json({
        'status': 'success',
        'data': {
            'key': process.env.VAPID_PUBLIC_KEY
        }
    })
})

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