const db = require("../database/models");

const controller = {
    index: (req, res) => {
        db.Gig.findByPk(req.params.id, {
            include: [{
                association: 'freelancer',
                include: [{
                    association: 'postedGigs'
                }]
            }, {
                association: 'comments'
            }]
        }).then(info => {
            res.render('gig2', {
                gig: info
            })
        })
    },
    add: (req, res) => {
        db.Category.findAll()
            .then((data) => {
                res.render('gig-add', {
                    categories: data, errorerror: null
                })
            })
    },
    create: (req, res) => {
        db.Category.findAll()
            .then((data) => {
                if (!req.body.title || !req.body.description || !req.body.specs || !req.body.minPrice || !req.body.maxPrice) {
                    res.render('gig-add', {categories: data, error: 'No puede haber campos vacios'})
                }
                if (req.body.maxPrice< req.body.minPrice) {
                    res.render('gig-add', {categories: data, error: 'El precio mí nimo es mayor al máximo'})
                }
            })
    },
    edit: (req, res) => {
        res.render('gig-edit')
    },
    update: (req, res) => {},
    myGigs: (req, res) => {
        res.render('myGigs')
    }
}

module.exports = controller;