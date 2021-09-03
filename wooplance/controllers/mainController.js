const db = require("../database/models");

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
    res.render("search-results");
  },
  chat: (req, res) => {
    res.send("chat");
  },
};

module.exports = controller;
