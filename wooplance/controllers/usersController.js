const db = require("../database/models");
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");

const controller = {
  index: (req, res) => {
    db.User.findByPk(req.params.id, {
      include: [{
          association: "postedGigs",

        },
        {
          association: "myGigs",
        },
      ],
    }).then((user) => {
      if (user.myGigs.length != 0) {
        let finishedGigs = 0;
        user.myGigs.forEach((element) => {
          if (element.done) {
            finishedGigs += 1;
          }
        });
        // res.send(user.myGigs)
        let percent = (finishedGigs / user.myGigs.length) * 100;
        res.render("profile", {
          user: user,
          doneGigs: percent,
        });
      }
      res.render("profile", {
        user: user,
        doneGigs: 0,
      });
    });
  },
  register: (req, res) => {
    res.render("register", {
      error: null,
    });
  },
  create: (req, res) => {
    if (
      !req.body.name ||
      !req.body.lastName ||
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
      if (req.file) {
        db.User.create({
          name: req.body.name,
          lastName: req.body.lastName,
          username: req.body.username,
          email: req.body.mail,
          password: pssd,
          profilePic: "",
        }).then((user) => {
          req.session.user = user;
          res.cookie("userId", user.id, {
            maxAge: 1000 * 60 * 5,
          });
          res.redirect("/");
        });
      } else {
        db.User.create({
          name: req.body.name,
          lastName: req.body.lastName,
          username: req.body.username,
          email: req.body.mail,
          password: pssd,
          profilePic: "/images/users/default-user.png",
        }).then((user) => {
          req.session.user = user;
          res.cookie("userId", user.id, {
            maxAge: 1000 * 60 * 5,
          });
          res.redirect("/");
        });
      }
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
    db.User.findByPk(req.params.id)
    .then(user => {
      res.render("profile-edit", {
        error: null,
        user: user
      });
    })
  },
  update: (req, res) => {
    if (
      !req.body.name
    ) {
      res.render("profile-edit", {
        error: "El campo del nombre no puede quedar vacio",
      });
    } else if (!req.body.lastName) {
      res.render("profile-edit", {
        error: "El campo del apellido no puede quedar vacio",
      });
    } else if (!req.body.username) {
      res.render("profile-edit", {
        error: "El campo del usuario no puede quedar vacio",
      });
    } else if (!req.body.mail) {
      res.render("profile-edit", {
        error: "El campo del mail no puede quedar vacio",
      });
    }
    db.User.findOne({
      where: {
        [Op.or]: {
          email: req.body.mail,
          username: req.body.username,
        },
      },
    }).then((results) => {
      if (results && results.id != req.body.id && results.email == req.body.mail) {
        res.render("profile-edit", {
          error: "El mail ya esta siendo utilizado",
        });
      } else if (results && results.id != req.body.id && results.username == req.body.username) {
        res.render("profile-edit", {
          error: "El nombre de usuario ya esta siendo utilizado",
        });
      }
      if (req.file && req.body.password) {
        if (req.body.password != req.body.passwordConfirm) {
          res.render("profile-edit", {
            error: "Las contraseñas deben ser iguales",
          });
        }
        let pssd = bcrypt.hashSync(req.body.password);
        db.User.update({
          name: req.body.name,
          lastName: req.body.lastName,
          username: req.body.username,
          email: req.body.mail,
          password: pssd,
          profilePic: req.file.filename,
        }).then((user) => {
          res.redirect("/");
        });
      } else if (!req.file && req.body.password) {
        if (req.body.password != req.body.passwordConfirm) {
          res.render("profile-edit", {
            error: "Las contraseñas deben ser iguales",
          });
        }
        let pssd = bcrypt.hashSync(req.body.password);
        db.User.update({
          name: req.body.name,
          lastName: req.body.lastName,
          username: req.body.username,
          email: req.body.mail,
          password: pssd,
          profilePic: "/images/users/default-user.png",
        }).then((user) => {
          res.redirect("/");
        });
      } else if (req.file && !req.body.password){
        db.User.update({
          name: req.body.name,
          lastName: req.body.lastName,
          username: req.body.username,
          email: req.body.mail,
          profilePic: req.file.filename,
        }).then((user) => {
          res.redirect("/");
        });
      } else {
        db.User.update({
          name: req.body.name,
          lastName: req.body.lastName,
          username: req.body.username,
          email: req.body.mail,
        }).then((user) => {
          
          res.redirect("/");
        });
      }
    });
  },
  dashboard: (req, res) => {
    res.render("dashboard");
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('userId');
    res.redirect('/');
  },
};

module.exports = controller;