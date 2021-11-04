module.exports = (sequelize, dataTypes) => {

    const Comment = sequelize.define('Comment', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER.UNSIGNED
        },
        comment: {
            type: dataTypes.STRING
        },
        userId: {
            type: dataTypes.INTEGER,
            field: 'user_id'
        },
        gigId: {
            type: dataTypes.INTEGER,
            field: 'gig_id'
        },
        createdAt: {
            type: dataTypes.DATE,
        },
        updatedAt: {
            type: dataTypes.DATE,
        }
    },{
        tableName: 'comments'
    })


    return Comment;
}