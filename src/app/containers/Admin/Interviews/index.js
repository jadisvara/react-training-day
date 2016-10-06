module.exports = {
    path: 'interviews',
    getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./Interviews')); // why? Because we want to load route in async way
        });
    },
};
