const development = {
    name: 'development',
    session_cookie: 'habit',
    db: 'habitTracker'
}

const production = {
    name: 'production',
    session_cookie: process.env.session_cookie
}

module.exports = development;