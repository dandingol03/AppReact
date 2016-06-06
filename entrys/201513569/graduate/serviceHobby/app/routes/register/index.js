/**
 * Created by outstudio on 16/6/2.
 */

module.exports = {
    path: 'register/:operation',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Register'))
        })
    }
}
