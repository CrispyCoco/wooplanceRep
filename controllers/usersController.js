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
        }
      ],
    }).then((user) => {
      db.Category.findAll().then((categories) => {

        if (req.session.user) {
          if (req.session.user.id == user.id) {
            req.session.user = user
          }
        }
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
            categories: categories
          });
        }
        res.render("profile", {
          user: user,
          doneGigs: 0,
          categories: categories
        });
      });
    })
  },
  register: (req, res) => {
    db.Category.findAll().then((categories) => {

      res.render("register", {
        error: null,
        categories: categories
      });
    })
  },
  create: (req, res) => {
    db.Category.findAll().then((categories) => {

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
          categories: categories
        });
      }
      if (req.body.password != req.body.passwordConfirm) {
        res.render("register", {
          error: "Las contraseñas deben ser iguales",
          categories: categories
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
            categories: categories
          });
        }
        if (req.file) {
          db.User.create({
            name: req.body.name,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.mail,
            password: pssd,
            profilePic: '/images/users/' + req.file.filename,
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
            profilePic: "/images/users/default-user.svg",
          }).then((user) => {
            req.session.user = user;
            res.cookie("userId", user.id, {
              maxAge: 1000 * 60 * 5,
            });
            res.redirect("/");
          });
        }
      });
    })
  },
  login: (req, res) => {
    db.Category.findAll().then((categories) => {
      res.render("login", {
        error: null,
        categories: categories
      });
    })
  },
  loginPost: (req, res) => {
    db.Category.findAll().then((categories) => {
      if (!req.body.mail || !req.body.password) {
        res.render("login", {
          error: "No puede haber campos vacios",
          categories: categories
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
        if (!user) {
          res.render("login", {
            error: "El mail es incorrecto",
            categories: categories
          });
        }
        if (bcrypt.compareSync(user.password, req.body.password)) {
          req.session.user = user;
          if (req.body.remember) {
            res.cookie("userId", user.id, {
              maxAge: 1000 * 60 * 5,
            });
          }
          res.redirect("/");
        } else{
          res.render("login", {
            error: "La contraseña es incorrecta",
            categories: categories
          });
        }
      });
    })
  },
  edit: (req, res) => {
    db.User.findByPk(req.params.id)
      .then(user => {
        db.Category.findAll().then(categories => {

          res.render("profile-edit", {
            error: null,
            user: user,
            categories: categories
          });
        })
      })
  },
  update: (req, res) => {
    db.User.findByPk(req.body.id)
      .then(user => {

        if (
          !req.body.name
        ) {
          res.render("profile-edit", {
            error: "El campo del nombre no puede quedar vacio",
            user: user
          });
        } else if (!req.body.lastName) {
          res.render("profile-edit", {
            error: "El campo del apellido no puede quedar vacio",
            user: user

          });
        } else if (!req.body.username) {
          res.render("profile-edit", {
            error: "El campo del usuario no puede quedar vacio",
            user: user

          });
        } else if (!req.body.mail) {
          res.render("profile-edit", {
            error: "El campo del mail no puede quedar vacio",
            user: user

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
          if (results && results.id != req.body.id) {
            if (results.email == req.body.mail) {

              res.render("profile-edit", {
                error: "El mail ya esta siendo utilizado",
                user: user
              });
            }
          } else if (results && results.id != req.body.id) {
            if (results.username == req.body.username) {
              res.render("profile-edit", {
                error: "El nombre de usuario ya esta siendo utilizado",
                user: user
              });
            }
          }
          if (req.file && req.body.password) {
            if (req.body.password != req.body.passwordConfirm) {
              res.render("profile-edit", {
                error: "Las contraseñas deben ser iguales",
                user: user

              });
            }
            let pssd = bcrypt.hashSync(req.body.password);
            db.User.update({
              name: req.body.name,
              lastName: req.body.lastName,
              username: req.body.username,
              email: req.body.mail,
              password: pssd,
              profilePic: '/images/users/' + req.file.filename,
            }, {
              where: {
                id: req.body.id,
              }
            }).then((user) => {
              res.redirect("/profile/" + req.body.id);
            });
          } else if (!req.file && req.body.password) {
            if (req.body.password != req.body.passwordConfirm) {
              res.render("profile-edit", {
                error: "Las contraseñas deben ser iguales",
                user: user

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
            }, {
              where: {
                id: req.body.id,
              }
            }).then((user) => {
              res.redirect("/profile/id/" + req.body.id);
            });
          } else if (req.file && !req.body.password) {
            db.User.update({
              name: req.body.name,
              lastName: req.body.lastName,
              username: req.body.username,
              email: req.body.mail,
              profilePic: '/images/users/' + req.file.filename,
            }, {
              where: {
                id: req.body.id,
              }
            }).then((user) => {
              res.redirect("/profile/id/" + req.body.id);
            });
          } else {
            db.User.update({
              name: req.body.name,
              lastName: req.body.lastName,
              username: req.body.username,
              email: req.body.mail,
            }, {
              where: {
                id: req.body.id,
              }
            }).then((user) => {
              res.redirect("/profile/id/" + req.body.id);
            });
          }
        });
      })
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