import React, { PropTypes, Component } from 'react';
import Link from 'react-router/lib/Link';
import { Panel } from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';

// rendered once, when app started, never will be unmount
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLeftNav: false,
    };
  }
    componentWillMount() {
        console.log('Admin mounted!');
    }

    toggleLeftNav() {
        this.setState({ openLeftNav: !this.state.openLeftNav });
    }

    render() {
        return (
            <div>
                <AppBar
                    title={
                        <span>Admin</span>
                    }
                    // iconElementRight={
                    //     <div>
                    //         <Link to="/admin">Home</Link>&nbsp;
                    //         <Link to="/admin/questions">Questions</Link>&nbsp;
                    //         <Link to="/admin/tags">Tags</Link>&nbsp;
                    //         <Link to="/admin/interviews">Interviews</Link>&nbsp;
                    //     </div>
                    // }
                    onLeftIconButtonTouchTap={() => this.toggleLeftNav()}
                />
                <Paper>
                    <div>
                    { this.props.children ||
                        <Panel>This is Admins home.</Panel>
                    }
                    </div>
                </Paper>

                <Drawer
                    open={this.state.openLeftNav}
                    docked={false}
                    onRequestChange={(openLeftNav) => this.setState({ openLeftNav })}
                >
                    <div>
                        <List>
                            <Link
                                to="/admin"
                                onClick={() => this.toggleLeftNav()}
                            >
                                <ListItem primaryText="Home"/>
                            </Link>
                            <Link
                                to="/admin/questions"
                                onClick={() => this.toggleLeftNav()}
                            >
                                <ListItem primaryText="Questions"/>
                            </Link>
                            <Link
                                to="/admin/tags"
                                onClick={() => this.toggleLeftNav()}
                            >
                                <ListItem primaryText="Tags"/>
                            </Link>
                            <Link
                                to="/admin/interviews"
                                onClick={() => this.toggleLeftNav()}
                            >
                                <ListItem primaryText="Interviews"/>
                            </Link>
                        </List>
                    </div>
                </Drawer>
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
