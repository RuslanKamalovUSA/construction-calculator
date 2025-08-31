// env.config.js

const dotenv = require('dotenv');

// Загружаем переменные окружения из .env файла
dotenv.config();
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}` // Определяем путь к файлу конфигурации
});

// Экспортируем конфигурацию
const config = {
    MONGODB_PROTOCOL: process.env.MONGO_PROTOCOL,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_RETRY_WRITES: process.env.MONGO_RETRY_WRITES === 'true',
    MONGO_WRITE_CONCERN: process.env.MONGO_WRITE_CONCERN,
    MONGO_APP_NAME: process.env.MONGO_APP_NAME,

    JWT_SECRET: process.env.JWT_SECRET,
    PORT: parseInt(process.env.PORT, 10) || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // Дополнительные настройки подключения
    MONGO_CONNECT_TIMEOUT: 45000,
    MONGO_SOCKET_TIMEOUT: 30000,
    MONGO_AUTO_INDEX: true,
    MONGO_POOL_SIZE: 10
};

module.exports = config;


.env.development
NODE_ENV=development
PORT=5000

MONGO_PROTOCOL=mongodb+srv://
MONGO_USER=ruslankamalovusa
MONGO_PASSWORD=epgthF4LaWksqiEQ
MONGO_HOST=cluster0.03mgp.mongodb.net
MONGO_DB_NAME=your_database_name
MONGO_RETRY_WRITES=true
MONGO_WRITE_CONCERN=majority
MONGO_APP_NAME=Cluster0
JWT_SECRET=your_jwt_secret_key