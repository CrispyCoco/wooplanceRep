module.exports = (sequelize, dataTypes) => {

    const Gig = sequelize.define('Gig', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER.UNSIGNED
        },
        gig: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        specs: {
            type: dataTypes.STRING
        },
        cover:{
            type: dataTypes.STRING
        },
        priceMin: {
            type: dataTypes.INTEGER,
            field: 'price_min'
        },
        priceMax: {
            type: dataTypes.INTEGER,
            field: 'price_max'
        },
        categoryId: {
            type: dataTypes.INTEGER,
            field: 'category_id'
        },
        freelancerId:{
            type: dataTypes.INTEGER,
            field: 'freelancer_id'
        },
        rating:{
            type: dataTypes.DOUBLE,
        },
        createdAt: {
            type: dataTypes.DATE,
        },
        updatedAt: {
            type: dataTypes.DATE,
        }
    },{
        tableName: 'gigs'
    })

    Gig.associate = (db)=>{
        Gig.belongsTo(db.Category, {
            as:'category',
            foreignKey: 'categoryId'
        });
        // Quien lo hace
        Gig.belongsTo(db.User, {
            as:'freelancer',
            foreignKey: 'freelancerId'
        });
        Gig.hasMany(db.Comment, {
            as:'comments',
            foreignKey: 'gigId'
        });
        Gig.hasMany(db.Rating, {
            as:'ratings',
            foreignKey: 'gigId'
        })
    }
    return Gig;
}