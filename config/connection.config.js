import Sequelize from 'sequelize';
import { db } from './config.js';

const sequelizeClient = (() => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return new Sequelize(db.database, db.user, db.password, {
                host: db.host,
                port: "3306",
                dialect: 'mysql',
            });

        default:
            return new Sequelize(db.database, db.user, db.password, {
                dialectOptions: {
                    ssl: {
                        require: true,
                    }
                },
                host: db.host,
                dialect: 'mysql',
            });
    }
})();


sequelizeClient.sync({ alter: true })
//forse
    .then(() => {
        console.log('Conectado')
    })
    .catch((err) => {
        console.log('No se conecto', err)
    });


export const getData = { sequelizeClient };