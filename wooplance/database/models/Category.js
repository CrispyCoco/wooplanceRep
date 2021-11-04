module.exports = (sequelize, dataTypes) => {

    const Category = sequelize.define('Category', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER.UNSIGNED
        },
        category: {
            type: dataTypes.STRING,
        },
    },{
        tableName: 'categories',
        timestamps: false
    })

    Category.associate = (db)=>{
        Category.hasMany(db.Gig, {
            as:'gigs',
            foreignKey:'categoryId'
        });
    }
    return Category;
}