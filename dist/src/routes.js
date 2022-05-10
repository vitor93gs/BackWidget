"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const prisma_1 = require("./prisma");
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.routes = express_1.default.Router();
const transport = nodemailer_1.default.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'ede3875c58c924',
        pass: '56af00e211934a',
    },
});
exports.routes.post('/feedbacks', async (req, res) => {
    // prisma.feedback.create({
    //    data: {type: req.body.type, comment: req.body.comment, screenshot: req.body.screenshot}
    //
    // ISSO VIRA ISSO ABAIXO, DESESTRUTURAÇÃO DO OBJETO, RETIRANDO O TYPE, COMMENT E SCREENSHOT DO REQ.BODY
    // o "type: type," pode ser escrito como: "type," o "comment: comment," pode ser escrito como: "comment," e o "screenshot: screenshot" pode ser escrito como: "screenshot"
    const { type, comment, screenshot } = req.body;
    const feedback = await prisma_1.prisma.feedback.create({
        data: { type, comment, screenshot },
    });
    await transport.sendMail({
        from: 'Equipe Feedback <oi@feedback.com>',
        to: 'vitor <vitor93gs@gmail.com>',
        subject: 'novo fidbec',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
            `<p>Tipo do feeback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            screenshot ? `<img src="${screenshot}" alt="screenshot" />` : '',
            `</div>`,
        ].join('\n'),
    });
    res.status(201).json({ data: feedback });
});
