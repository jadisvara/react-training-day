import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { Panel } from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import * as CommonActions from '../../actions/CommonActions';

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
                    onRequestChange={openLeftNav => this.setState({ openLeftNav })}
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
                <Dialog
                    actions={this.props.actions}
                    modal={false}
                    open={this.props.isConfirmDialogOpen}
                    onRequestClose={this.props.closeConfirmDialog}
                >
                    {this.props.body}
                </Dialog>
            </div>
        );
    }
}

Admin.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    actions: PropTypes.array.isRequired,
    body: PropTypes.string.isRequired,
    isConfirmDialogOpen: PropTypes.bool.isRequired,
    showConfirmDialog: PropTypes.func.isRequired,
    closeConfirmDialog: PropTypes.func.isRequired,
};

module.exports = connect(
  state => ({
    isConfirmDialogOpen: state.commonState.isConfirmDialogOpen,
    body: state.commonState.body,
    actions: state.commonState.actions,
  }),
  dispatch => ({
    showConfirmDialog: (body, actions) => dispatch(CommonActions.showConfirmDialog(body, actions)),
    closeConfirmDialog: () => dispatch(CommonActions.closeConfirmDialog()),
  })
)(Admin);
