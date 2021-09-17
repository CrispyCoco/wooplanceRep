const db = require("../database/models");
const Op = db.Sequelize.Op;

const controller = {
  index: (req, res) => {
    let ratingFilter = {
      order: [["rating", "DESC"]],
      limit: 6,
    };
    let newestFilter = {
      order: [["createdAt", "DESC"]],
      limit: 6,
    };
    db.Gig.findAll(ratingFilter).then((gigsByRating) => {
      db.Gig.findAll(newestFilter).then((gigsByDate) => {
        db.Category.findAll().then((categories) => {
          res.render("index", {
            byRating: gigsByRating,
            byDate: gigsByDate,
            categories: categories,
          });
        });
      });
    });
  },
  categories: (req, res) => {
    res.render("categories");
  },
  search: (req, res) => {
    db.Gig.findAll({
      where: {
        gig:{
          [Op.like]: req.query.search
        }
      }
    })
    .then((results) => {
      res.render("search-results", {results: results});
      
    })
  },
  chat: (req, res) => {
    res.send("chat");
  },
};

module.exports = controller;
