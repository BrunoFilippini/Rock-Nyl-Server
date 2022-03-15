const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const UserModel = require("../models/User.model");

const salt_rounds = 10;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "contactrocknyl@gmail.com",
    pass: process.env.PASSWORD_EMAIL,
  },
});

//Rota de recuperação de senha que recebe o email do usuario solicitante
router.post("/forgot-password", async (req, res) => {
  try {
    //Extrai o email do body
    const { email } = req.body;

    //Busca o usuario
    let user = await UserModel.findOne({ email });

    //Se não encontrar, responde com erro
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    //Gera o token temporario
    const temporaryToken = jwt.sign(
      { _id: user._id },
      process.env.SIGN_SECRET_RESET_PASSWORD,
      {
        expiresIn: "10m",
      }
    );

    //Salva o token no campo "resetPassword"
    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { resetPassword: temporaryToken } }
    );

    //Configura o assunto e corpo do email
    const mailOptions = {
      from: "contactrocknyl@gmail.com",
      to: user.email,
      subject: "Redefina sua Senha no Rock'Nyl !",
      html: `<p>Clique no link para redefinir sua senha:<p> <a href=https://rocknyl.netlify.app/new-password/${temporaryToken}>LINK</a>`,
    };

    //Dispara o email para o usuário
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error sending email" });
      }
    });

    res.status(200).json({ message: "Email successfully sent" });
  } catch (err) {
    console.error(err);
  }
});

// Rota para trocar a senha usando o token como paramentro
router.put("/reset-password/:token", async (req, res) => {
  try {
    //Verifica a existência do token
    if (!req.params.token) {
      return res.status(400).json({ msg: "Incorrect or expired token!" });
    }

    //Verifica se o token é valido e não esta expirado
    jwt.verify(
      req.params.token,
      process.env.SIGN_SECRET_RESET_PASSWORD,
      (err) => {
        if (err) {
          return res.status(400).json({ msg: "Incorrect or expired token!" });
        }
      }
    );

    //Busca o usuario pelo token de recuperacao
    let user = await UserModel.findOne({ resetPassword: req.params.token });

    //Caso não exista, responde com erro
    if (!user) {
      return res.status(400).json({ msg: "Incorrect or expired token!" });
    }

    //Extrai a nova senha do usuario
    const { newPassword } = req.body;

    //Verifica se a senha existe e se atende todos os requisitos
    if (
      !newPassword ||
      !newPassword.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
    ) {
      return res.status(400).json({
        msg: "Password is required and must have at least 8 characters, uppercase and lowercase letters, numbers and special characters.",
      });
    }

    //Gera o salt
    const salt = await bcrypt.genSalt(salt_rounds);

    //Criptografa a senha
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //Salva a nova senha e limpa o campo de resetPassword
    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { passwordHash: hashedPassword, resetPassword: "" } }
    );

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
