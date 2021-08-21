

const controller = {
    index: (req,res) =>{
        res.render('gig2')
    },
    create: (req,res) =>{
        res.render('gig-add')
    },
    edit:(req,res) =>{
        res.render('gig-edit')
    },
    myGigs: (req,res) =>{
        res.render('myGigs')
    }
}

module.exports = controller;