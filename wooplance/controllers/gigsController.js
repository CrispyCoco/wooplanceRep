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
                    categories: data, error: null
                })
            })
    },
    create: (req, res) => {
        db.Category.findAll()
            .then((data) => {
                if (!req.body.title || !req.body.description || !req.body.specs || !req.body.minPrice || !req.body.maxPrice) {
                    res.render('gig-add', {categories: data, error: 'No puede haber campos vacios'})
                }
                // let minPrice = parseInt(req.body.minPrice, 10)
                // let maxPrice = parseInt(req.body.maxPrice, 10) 
                if ( req.body.maxPrice - req.body.minPrice < 0) {
                    // res.render('gig-add', {categories: data, error: 'El precio mínimo es mayor al máximo'})
                    res.send('minimo: ' + req.body.minPrice + ' maximo: ' + req.body.maxPrice)
                }
                // res.send('llegue aca')
                if(req.file){
                    db.Gig.create({
                        gig: req.body.title,
                        description: req.body.description,
                        specs: req.body.specs,
                        cover: '/images/gigs/' + req.file.filename,
                        priceMin: req.body.minPrice,
                        priceMax: req.body.maxPrice,
                        categoryId: req.body.category,
                        freelancerId: req.session.user.id,
                        rating: 0,
                    }).then(results => {
                        res.redirect('/gig/show/' + results.id)
                    });
                } else{
                    db.Gig.create({
                        gig: req.body.title,
                        description: req.body.description,
                        specs: req.body.specs,
                        cover: '/images/gigs/default-image.png',
                        priceMin: req.body.priceMin,
                        priceMax: req.body.priceMax,
                        categoryId: req.body.category,
                        freelancerId: req.session.user.id,
                        rating: 0,
                    }).then(results => {
                        res.redirect('/gig/show/' + results.id)
                    });
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