import React from 'react';
import Link from 'react-router/lib/Link';
import Panel from 'react-bootstrap/lib/Panel';

module.exports = function MainPage() {
    return (
        <div>
            <h1>Crappin beautiful main page!</h1>
            <Panel>
                <Link to="/admin">
                    Go to Admin
                </Link>
            </Panel>
            <div className="header">
                {/* just for show webpack ability to load images */}
                <div className="header__img"/>
            </div>
        </div>
    );
};
