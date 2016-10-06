import React, { PropTypes, Component } from 'react';
import Link from 'react-router/lib/Link';
import { Panel } from 'react-bootstrap';

// rendered once, when app started, never will be unmount
class Admin extends Component {
    componentWillMount() {
        console.log('Admin mounted!');
    }
    render() {
        return (
            <div>
                <h1>Admin</h1>
                <h3>Manage questions and interview sets.</h3>
                <Panel>
                    <Link to="/admin">Home</Link>&nbsp;
                    <Link to="/admin/questions">Questions</Link>&nbsp;
                    <Link to="/admin/tags">Tags</Link>&nbsp;
                    <Link to="/admin/interviews">Interviews</Link>&nbsp;
                </Panel>
                <div>
                { this.props.children ||
                    <Panel>This is Admins home.</Panel>
                }
                </div>
            </div>
        );
    }
}

Admin.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

module.exports = Admin;
