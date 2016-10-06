module.exports = {
    path: 'questions',
    getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./Questions')); // why? Because we want to load route in async way
        });
    },
};
