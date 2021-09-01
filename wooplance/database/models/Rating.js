module.exports = (sequelize, dataTypes) => {

    const Rating = sequelize.define('Rating', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER.UNSIGNED
        },
        rating: {
            type: dataTypes.INTEGER,
        },
        userId: {
            type: dataTypes.INTEGER,
            field: 'user_id'
        },
        gigId: {
            type: dataTypes.INTEGER,
            field: 'gig_id'
        }
    },{
        tableName: 'ratings',
        timestamps: false
    })

    Rating.associate = (db)=>{
        Rating.belongsTo(db.User, {
            as:'user',
            foreignKey:'userId'
        });
        Rating.belongsTo(db.Gig, {
            as:'gig',
            foreignKey:'gigId'
        });
    }
    return Rating;
}