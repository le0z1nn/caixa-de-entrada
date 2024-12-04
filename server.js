const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuração do transportador de e-mail (Gmail, SMTP ou outro provedor)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou 'smtp.example.com' para outro serviço
    auth: {
        user: 'seuemail@gmail.com', // Substitua pelo seu e-mail
        pass: 'suasenha', // Substitua pela sua senha
    },
});

// Rota para envio de e-mails
app.post('/send', async (req, res) => {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    try {
        await transporter.sendMail({
            from: 'seuemail@gmail.com', // Seu e-mail
            to: to,
            subject: subject,
            text: message,
        });
        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ message: 'Erro ao enviar e-mail.' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
