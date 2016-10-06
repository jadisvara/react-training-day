module.exports = {
    path: 'admin',
    getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./Admin')); // why? Because we want to load route in async way
        });
    },
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
              require('./Questions'),
              require('./Interviews'),
              require('./Tags'),
            ]);
        });
    },
};
