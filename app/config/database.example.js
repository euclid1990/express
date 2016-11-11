var config = {
    development: {
        mode: 'development',
        driver: 'mysql',
        host: 'localhost',
        database: 'your_database_name',
        user: 'your_username',
        password: 'your_password'
    },
}

module.exports = function(mode) {
    return config[mode || process.env.ENV || 'development'] || config.development;
}