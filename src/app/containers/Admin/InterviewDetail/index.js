module.exports = {
    path: 'interview/:id',
    getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./InterviewDetail'));
        });
    },
};
