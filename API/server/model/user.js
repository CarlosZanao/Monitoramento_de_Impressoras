//Mapeando a tabela do banco de dados 
module.exports = {
    user: function user (queryInterface, Sequelize){
        return queryInterface.define(
            'user',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: {
                    type: Sequelize.STRING
                },
                email: {
                    type: Sequelize.STRING
                }
            },
            {
                timestamps: false,
                freezeTableName:true
            }
        );
    }
};