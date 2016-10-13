import React, { PropTypes, Component } from 'react';
import Link from 'react-router/lib/Link';
import { Panel } from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

// rendered once, when app started, never will be unmount
class Admin extends Component {
    componentWillMount() {
        console.log('Admin mounted!');
    }
    render() {
        return (
            <div>
                <AppBar
                    title={
                        <span>Admin</span>
                    }
                    iconElementRight={
                        <div>
                            <Link to="/admin">Home</Link>&nbsp;
                            <Link to="/admin/questions">Questions</Link>&nbsp;
                            <Link to="/admin/tags">Tags</Link>&nbsp;
                            <Link to="/admin/interviews">Interviews</Link>&nbsp;
                        </div>
                    }
                />
                <Paper>
                    <span>Manage questions and interview sets.</span>
                    <div>
                    { this.props.children ||
                        <Panel>This is Admins home.</Panel>
                    }
                    </div>
                </Paper>
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
