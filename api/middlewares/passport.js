const {
    Strategy,
    ExtractJwt
} = require('passport-jwt');
const config = require('../config');
const safeAwait = require('safe-await');
const { userService } = require('../service')
//set up options of passport
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.accessTokenKey
}
module.exports = (passport) => {
    passport.use(new Strategy(opts, async (payload, done) => {
        let [err, user] = await safeAwait(
            userService.getOne(payload.id)
        )
        if (err) return done(err, false)
        return done(null, user)
    }))
}