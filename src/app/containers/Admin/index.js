module.exports = {
    path: 'admin',
    getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./Admin'));
        });
    },
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
              require('./Questions'),
              require('./Interviews'),
              require('./InterviewDetail'),
              require('./Tags'),
            ]);
        });
    },
};
