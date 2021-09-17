const db = require("../database/models");

const controller = {
    index: (req,res) =>{
        db.Gig.findByPk(req.params.id,{
            include:[{
                association: 'freelancer',
                include:[{
                    association: 'postedGigs'
                }]
            },{
                association: 'comments'
            }]
        }).then(info => {
        res.render('gig2',{gig: info})
        })
    },
    create: (req,res) =>{
        db.Category.findAll()
        .then((data) => {
            res.render('gig-add', {categories: data})
        })
    },
    edit:(req,res) =>{
        res.render('gig-edit')
    },
    myGigs: (req,res) =>{
        res.render('myGigs')
    }
}

module.exports = controller;