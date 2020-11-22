const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "mircospace@gmail.com",
		pass: "7QtuVQVbp9Bt9t7"
	}
});
exports.sendMail = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		var maillist = [req.body.email, "hi@mirco.space"];

		const mailOptions = {
			from: "Mirco Cattabriga Website Form",
			to: maillist,
			subject: "Nuovo messaggio da" + " " + req.body.email,
			html: req.body.content
		};
		return transporter.sendMail(mailOptions, (erro, info) => {
			if (erro) {
				return res.send(erro.toString());
			} else {
				console.log(info);
			}
		});
	});
});
