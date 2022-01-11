
module.exports = function(sequelize, DataTypes) {
    const  event = sequelize.define('event', {
        provider:{
            type: DataTypes.STRING
        }
        

        
      }, {
        tableName: 'events',
        freezeTableName:true,
        timestamps:false
      });
    
   
    return  event;
    }