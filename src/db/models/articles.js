
module.exports = function(sequelize, DataTypes) {
    const  article = sequelize.define('article', {
        featured:{
            type: DataTypes.BOOLEAN
        },
        title:{
            type: DataTypes.STRING
        },
        url:{
            type: DataTypes.STRING
        },
        imageUrl:{
            type: DataTypes.STRING
        },
        newsSite:{
            type: DataTypes.STRING
        },
        summary:{
            type: DataTypes.STRING
        },
        publishedAt:{
            type: DataTypes.STRING
        },


        
      }, {
        tableName: 'articles',
        freezeTableName:true,
        timestamps:false
      });

      article.associate = (models) => {
   
        article.belongsToMany(models.event, {through: models.articles_events, foreignKey: 'article_id'});
        article.belongsToMany(models.launch, {through: models.articles_launches, foreignKey: 'article_id'});
      }
    
   
    return  article;
    }