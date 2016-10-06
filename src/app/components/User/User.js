import React, { PropTypes, Component } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';

class User extends Component {

    componentWillMount() {
      console.log('User');
    }
    render() {
    return (
        <Col xs={6} md={3} key={this.props.user.id}>
            <Thumbnail src={this.props.user.avatar} alt="100x100" >
                <h3>{this.props.user.first_name} {this.props.user.last_name}</h3>
                <p>Description</p>
                <p>
                  {this.props.user.email}
                </p>
            </Thumbnail>
        </Col>

    );
  }
}
User.propTypes = {
  user: PropTypes.object.isRequired,
};

module.exports = User;
