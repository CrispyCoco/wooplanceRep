module.exports = (sequelize, dataTypes) => {

    const User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER.UNSIGNED
        },
        name: {
            type: dataTypes.STRING
        },
        lastName: {
            type: dataTypes.STRING,
            field: 'last_name'
        },
        username: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING,
            unique: true
        },
        password: {
            type: dataTypes.STRING,
        },
        profilePic: {
            type: dataTypes.STRING,
            field: 'profile_pic'
        },
        createdAt: {
            type: dataTypes.DATE,
        },
        updatedAt: {
            type: dataTypes.DATE,
        }
    }, {
        tableName: "users",
    });

    User.associate = (db) => {
        // Gigs posteados
        User.hasMany(db.Gig, {
            as: 'postedGigs',
            foreignKey: 'freelancerId'
        });
        // Gigs que tiene que hacer
        User.hasMany(db.PendingGig, {
            as: 'myGigs', 
            foreignKey: 'freelancerId'
        });
        // Gigs que contrato
        User.hasMany(db.PendingGig, {
            as: 'hires', 
            foreignKey: 'employerId'
        });
        // Comentarios hechos
        User.hasMany(db.Comment, {
            as: 'comments',
            foreignKey: 'userId'
        });
        // Ratings puestos
        User.hasMany(db.Rating, {
            as: 'ratings',
            foreignKey: 'userId'
        });
    }  
    return User;
}