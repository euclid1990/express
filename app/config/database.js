var config = {
    development: {
        mode: process.env.APP_ENV,
        driver: process.env.DB_DRIVER,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
}

module.exports = function(mode) {
    return config[mode || process.env.ENV || 'development'] || config.development;
}