const db = require("../database/models");
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");

const controller = {
  index: (req, res) => {
    res.render("profile");
  },
  register: (req, res) => {
    res.render("register", {
      error: null,
    });
  },
  create: (req, res) => {
    if (
      !req.body.name ||
      !req.body.lastname ||
      !req.body.username ||
      !req.body.mail ||
      !req.body.birthday ||
      !req.body.password ||
      !req.body.passwordConfirm
    ) {
      res.render("register", {
        error: "No puede haber campos vacios",
      });
    }
    if (req.body.password != req.body.passwordConfirm) {
      res.render("register", {
        error: "Las contraseñas deben ser iguales",
      });
    }
    let pssd = bcrypt.hashSync(req.body.password);
    db.User.findOne({
      where: {
        [Op.or]: {
          email: req.body.mail,
          username: req.body.username,
        },
      },
    }).then((results) => {
      if (results) {
        res.render("register", {
          error: "Este mail ya esta siendo utilizado",
        });
      }
      db.User.create({
        name: req.body.name,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.mail,
        password: pssd,
        profilePic: "",
        banner: "",
      }).then((user) => {
        req.session.user = user;
        res.cookie("userId", user.id, {
          maxAge: 1000 * 60 * 5,
        });
        res.redirect("/");
      });
    });
  },
  login: (req, res) => {
    res.render("login");
  },
  loginPost: (req, res) => {
    if (!req.body.mail || !req.body.password) {
      res.render("login", {
        error: "No puede haber campos vacios",
      });
    }
    db.User.findOne({
      where: {
        [Op.or]: {
          username: req.body.mail,
          email: req.body.mail,
        },
      },
    }).then((user) => {
      if (!user || bcrypt.compareSync(user.password, req.body.password)) {
        res.render("login", {
          error: "El mail o la contraseña son incorrectos",
        });
      }
      req.session.user = user;
      if (req.body.remember) {
        res.cookie("userId", user.id, {
          maxAge: 1000 * 60 * 5,
        });
      }
      res.redirect("/");
    });
  },
  edit: (req, res) => {
    res.render("profile-edit");
  },
  dashboard: (req, res) => {
    res.render("dashboard");
  },
};

module.exports = controller;
