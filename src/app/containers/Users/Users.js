import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Panel } from 'react-bootstrap';
import InfiniteScroll from 'redux-infinite-scroll';
import User from '../../components/User/User';
import { getUsers } from '../../actions';


class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.renderUsers = this.renderUsers.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentWillMount() {
    this.props.getUsers();
    console.log('User page init');
  }

  loadMore() {
      console.log('loadMore');
  }

  renderUsers() {
     const { users } = this.props;

    return users.map((user) =>
      (<User user={user} key={user.id}/>)
    );
    // return (
    //     <div>
    //         {users.map(user => (
    //             <User user={user} key={user.id} className="users-panel__user"/>
    //         ))}
    //     </div>
    // );
  }

  render() {
    return (
        <div>
            <h1> There are Users!</h1>
            <InfiniteScroll loadMore={this.loadMore} elementIsScrollable={false}>
                {this.renderUsers()}
            </InfiniteScroll>
        </div>
    );
  }
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
};

module.exports = connect(
  state => ({
    users: state.users.users,
  }),
  dispatch => ({
    getUsers: () => dispatch(getUsers()),
  })
)(UsersPage);
