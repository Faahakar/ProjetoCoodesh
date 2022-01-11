
module.exports = function(sequelize, DataTypes) {
    const  articles_launches = sequelize.define('articles_launches', {
        
        

        
      }, {
        tableName: 'articles_launches',
        freezeTableName:true,
        timestamps:false
      });
    
   
    return  articles_launches;
    }