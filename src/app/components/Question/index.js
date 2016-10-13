import React, { PropTypes, Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import { removeQuestion } from '../../actions';

class Question extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showBtns: false,
      };
    }

    componentWillMount() {
      console.log('Question');
    }

    onDelete(e, id) {
        this.props.remove(id);
    }

    onEdit(e, id) {
        this.props.update(id);
    }

    onMouseEnter() {
        this.setState({ showBtns: true });
    }
    onMouseLeave() {
        this.setState({ showBtns: false });
    }

    render() {
      const { showBtns } = this.state;

      return (
          <ListGroupItem
              onMouseEnter={() => this.onMouseEnter()}
              onMouseLeave={() => this.onMouseLeave()}
          >
              #{this.props.id} {this.props.engText} / {this.props.ruText}
              {this.props.tags
                ? this.props.tags.map(tag => (
                    <Button
                        bsSize="xsmall"
                        key={tag.id}
                    >
                        #{tag.tag}
                    </Button>
              ))
                : ''
              }
              {showBtns
                ?
                  <div style={{ display: 'inline' }}>
                      <Button
                          bsStyle="danger"
                          bsSize="xsmall"
                          style={{ float: 'right' }}
                          onClick={e => this.onDelete(e, this.props.id)}
                      >
                          Delete
                      </Button>

                      <Button
                          bsStyle="warning"
                          bsSize="xsmall"
                          style={{ float: 'right', marginRight: '10px' }}
                          onClick={e => this.onEdit(e, this.props.id)}
                      >
                          Edit
                      </Button>
                  </div>
                : ''
              }
          </ListGroupItem>
      );
    }
}
Question.propTypes = {
  engText: PropTypes.string.isRequired,
  ruText: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

module.exports = Question;
