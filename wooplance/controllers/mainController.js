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
            categorias: categories,
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
      db.Category.findByPk(req.params.id)
      .then(category => {
        res.render("categories",{category: category, results: gigs});
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
      console.log(results);
      res.render("search-results", {results: results});
      
    })
  },
  chat: (req, res) => {
    res.send("chat");
  },
};

module.exports = controller;
