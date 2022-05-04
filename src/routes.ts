import { prisma } from './prisma';
import express from 'express';
import nodemailer from 'nodemailer';

export const routes = express.Router();

const transport = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: 'ede3875c58c924',
		pass: '56af00e211934a',
	},
});

routes.post('/feedbacks', async (req, res) => {
	// prisma.feedback.create({
	//    data: {type: req.body.type, comment: req.body.comment, screenshot: req.body.screenshot}
	//
	// ISSO VIRA ISSO ABAIXO, DESESTRUTURAÇÃO DO OBJETO, RETIRANDO O TYPE, COMMENT E SCREENSHOT DO REQ.BODY
	// o "type: type," pode ser escrito como: "type," o "comment: comment," pode ser escrito como: "comment," e o "screenshot: screenshot" pode ser escrito como: "screenshot"

	const { type, comment, screenshot } = req.body;
	const feedback = 
	await transport.sendMail({
		from: 'Equipe Feedback <oi@feedback.com>',
		to: 'vitor <vitor93gs@gmail.com>',
		subject: 'novo fidbec',
		html: [
			`<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
			`<p>Tipo do feeback: ${type}</p>`,
			`<p>Comentário: ${comment}</p>`,
			`<p>Screenshot: ${screenshot}</p>`,
			`</div>`,
		].join('\n'),
	});
	res.status(201).json({ data: feedback });
});
