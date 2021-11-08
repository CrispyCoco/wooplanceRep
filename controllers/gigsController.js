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
                association: 'comments',
                include: [{
                    association: 'user'
                }]
            }]
        }).then(info => {
            db.Category.findAll()
                .then((data) => {
                    res.render('gig2', {
                        gig: info,
                        categories: data
                    })
                })
        })
    },
    add: (req, res) => {
        db.Category.findAll()
            .then((data) => {
                res.render('gig-add', {
                    categories: data,
                    error: null
                })
            })
    },
    create: (req, res) => {
        db.Category.findAll()
            .then((data) => {
                if (!req.body.title || !req.body.description || !req.body.specs || !req.body.minPrice || !req.body.maxPrice) {
                    res.render('gig-add', {
                        categories: data,
                        error: 'No puede haber campos vacios'
                    })
                }
                // let minPrice = parseInt(req.body.minPrice, 10)
                // let maxPrice = parseInt(req.body.maxPrice, 10) 
                if (req.body.maxPrice - req.body.minPrice < 0) {
                    // res.render('gig-add', {categories: data, error: 'El precio mínimo es mayor al máximo'})
                    res.send('minimo: ' + req.body.minPrice + ' maximo: ' + req.body.maxPrice)
                }
                // res.send('llegue aca')
                if (req.file) {
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
                } else {
                    db.Gig.create({
                        gig: req.body.title,
                        description: req.body.description,
                        specs: req.body.specs,
                        cover: '/images/gigs/default-image.png',
                        priceMin: req.body.minPrice,
                        priceMax: req.body.maxPrice,
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
        db.Category.findAll().then(categories => {
            db.Gig.findByPk(req.params.id).then(data => {
                res.render('gig-edit', {
                    categories: categories,
                    gig: data,
                    error: null
                })
            })
        })
    },
    update: (req, res) => {
        db.Category.findAll()
            .then((data) => {
                if (!req.body.title || !req.body.description || !req.body.minPrice || !req.body.maxPrice) {
                    res.render('gig-add', {
                        categories: data,
                        error: 'No puede haber campos vacios'
                    })
                }
                // let minPrice = parseInt(req.body.minPrice, 10)
                // let maxPrice = parseInt(req.body.maxPrice, 10) 
                if (req.body.maxPrice - req.body.minPrice < 0) {
                    res.render('gig-add', {
                        categories: data,
                        error: 'El precio mínimo es mayor al máximo'
                    })
                    // res.send('minimo: ' + req.body.minPrice + ' maximo: ' + req.body.maxPrice)
                }
                // res.send('llegue aca')
                let cat;
                if (!req.body.category) {
                    cat = req.body.prevCategory
                } else {
                    cat = req.body.category
                }
                if (req.file && req.body.specs) {
                    db.Gig.update({
                        gig: req.body.title,
                        description: req.body.description,
                        specs: req.body.specs,
                        cover: '/images/gigs/' + req.file.filename,
                        priceMin: req.body.minPrice,
                        priceMax: req.body.maxPrice,
                    }, {
                        where: {
                            id: req.body.id
                        }
                    }).then(results => {
                        res.redirect('/gig/show/' + req.body.id)
                    });
                } else if (req.file && !req.body.specs) {
                    db.Gig.update({
                        gig: req.body.title,
                        description: req.body.description,
                        cover: '/images/gigs/' + req.file.filename,
                        priceMin: req.body.minPrice,
                        priceMax: req.body.maxPrice,
                    }, {
                        where: {
                            id: req.body.id
                        }
                    }).then(results => {
                        res.redirect('/gig/show/' + req.body.id)
                    });
                } else if (!req.file && req.body.specs) {
                    db.Gig.update({
                        gig: req.body.title,
                        description: req.body.description,
                        specs: req.body.specs,
                        priceMin: req.body.minPrice,
                        priceMax: req.body.maxPrice,
                    }, {
                        where: {
                            id: req.body.id
                        }
                    }).then(results => {
                        res.redirect('/gig/show/' + req.body.id)
                    });
                } else {
                    db.Gig.update({
                        gig: req.body.title,
                        description: req.body.description,
                        priceMin: req.body.minPrice,
                        priceMax: req.body.maxPrice,
                    }, {
                        where: {
                            id: req.body.id
                        }
                    }).then(results => {
                        res.redirect('/gig/show/' + req.body.id)
                    });
                }
            })
    },
    myGigs: (req, res) => {
        if (req.session) {
            db.Category.findAll().then(categories => {
                db.PendingGig.findAll({
                        where: {
                            freelancerId: req.session.user.id
                        }
                    })
                    .then(pendingGigs => {
                        db.PendingGig.findAll({
                            where: {
                                employerId: req.session.user.id
                            }
                        }).then(hires => {
                            res.render('myGigs', {
                                categories: categories,
                                pendingGigs: pendingGigs,
                                hires: hires
                            })
                        })
                    })
            })
        } else {
            res.redirect('/')
        }
    },
    comment: (req, res) => {
        db.Comment.create({
                comment: req.body.comment,
                userId: req.session.user.id,
                gigId: req.body.id
            })
            .then(() => res.redirect('/gig/show/' + req.body.id))
    },
    hire: (req, res) => {
        db.Gig.findByPk(req.body.gigId)
            .then((gig) => {
                db.PendingGig.create({
                    gig: gig.gig,
                    description: gig.description,
                    specs: gig.specs,
                    cover: gig.cover,
                    priceMin: gig.priceMin,
                    priceMax: gig.priceMax,
                    categoryId: gig.categoryId,
                    done: false,
                    freelancerId: gig.freelancerId,
                    employerId: req.session.user.id
                }).then(result => {
                    res.redirect('/gig/myGigs')
                })
            })
    },
    done: (req, res) => {
        db.PendingGig.update({
            done: true,
        },{
            where:{
                id: req.body.id,
            }
        }).then((data) => {
            res.redirect('/gig/myGigs')
        })
    }
}

module.exports = controller;