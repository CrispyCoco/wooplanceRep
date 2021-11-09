const db = require("../database/models");
const Op = db.Sequelize.Op;

const controller = {
  index: (req, res) => {
    let ratingFilter = {
      order: [["rating", "DESC"]],
      limit: 5,
    };
    let newestFilter = {
      order: [["createdAt", "DESC"]],
      limit: 5,
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
    db.Gig.findAll({
      where:{
        categoryId: req.params.id
      }
    })
    .then(gigs => {
      db.Category.findAll()
      .then(categories => {

        res.render("categories",{category: categories[req.params.id -1], results: gigs, categories: categories});
      })
    })
  },
  search: (req, res) => {
    db.Gig.findAll({
      where: {
        gig:{
          [Op.like]: '%' + req.query.search + '%'
        }
      }
    })
    .then((results) => {
      db.Category.findAll().then((categories) => {

        res.render("search-results", {results: results, categories: categories});
      })
      
    })
  },
  chat: (req, res) => {
    res.send("chat");
  },
};

module.exports = controller;
