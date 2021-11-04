module.exports = (sequelize, dataTypes) => {

    const PendingGig = sequelize.define('PendingGig', {
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
        done:{
            type: dataTypes.BOOLEAN,
        },
        freelancerId:{
            type: dataTypes.INTEGER,
            field: 'freelancer_id'
        },
        employerId:{
            type: dataTypes.INTEGER,
            field: 'employer_id'
        },
        createdAt: {
            type: dataTypes.DATE,
        },
        updatedAt: {
            type: dataTypes.DATE,
        }
    },{
        tableName: 'pending_gigs'
    })

    PendingGig.associate = (db)=>{
        PendingGig.belongsTo(db.Category, {
            as:'category',
            foreignKey: 'categoryId'
        });
        // Quien lo hace
        PendingGig.belongsTo(db.User, {
            as:'freelancer',
            foreignKey: 'freelancerId'
        });
        // Quien lo contrato
        PendingGig.belongsTo(db.User, {
            as:'employer',
            foreignKey: 'employerId'
        });
    }

    return PendingGig;
}