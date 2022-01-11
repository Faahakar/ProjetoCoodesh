
module.exports = function(sequelize, DataTypes) {
    const  launch = sequelize.define('launch', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        provider:{
            type: DataTypes.STRING
        }
        

        
      }, {
        tableName: 'launches',
        freezeTableName:true,
        timestamps:false
      });
    
   
    return  launch;
    }