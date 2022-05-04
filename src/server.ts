import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import express from 'express';

const app = express();
app.use(express.json());
// get - buscar informaçoes , post - cadastrar informaçoes, put - atualizar informaçoes, delete - deletar informaçoes, patch - atualizar parcialmente


var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ede3875c58c924",
      pass: "56af00e211934a"
    }
  });


app.post('/feedbacks', async (req, res) => {
	// prisma.feedback.create({
	//    data: {type: req.body.type, comment: req.body.comment, screenshot: req.body.screenshot}
	//
	// ISSO VIRA ISSO ABAIXO, DESESTRUTURAÇÃO DO OBJETO, RETIRANDO O TYPE, COMMENT E SCREENSHOT DO REQ.BODY
	// o "type: type," pode ser escrito como: "type," o "comment: comment," pode ser escrito como: "comment," e o "screenshot: screenshot" pode ser escrito como: "screenshot"

	const { type, comment, screenshot } = req.body;
	const feedback = await prisma.feedback.create({
		data: { type, comment, screenshot },
	});
	res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
	console.log('HEROU');
});

// SQLite
