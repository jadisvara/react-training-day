module.exports = {
    path: 'tags',
    getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./Tags')); // why? Because we want to load route in async way
        });
    },
};
