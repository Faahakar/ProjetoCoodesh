

module.exports = function(sequelize, DataTypes) {
    const  articles_events = sequelize.define('articles_events', {
            article_id:{
                type: DataTypes.INTEGER ,
                allowNull: false
            },
            event_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            }
        

        
      }, {
        tableName: 'articles_events',
        freezeTableName:true,
        timestamps:false
      });
    
   
    return  articles_events;
    }