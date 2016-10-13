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
      const { data } = this.props;

      return (
          <ListGroupItem
              onMouseEnter={() => this.onMouseEnter()}
              onMouseLeave={() => this.onMouseLeave()}
          >
              #{data.id}
              {this.props.isEng ? data.eng_text : data.rus_text}
              {data.tags
                ? data.tags.map(tag => (
                    <Button
                        bsSize="xsmall"
                        key={tag.id}
                    >
                        #{tag.tag}
                    </Button>
              ))
                : null
              }
              {showBtns
                ?
                  <div style={{ display: 'inline' }}>
                      <Button
                          bsStyle="danger"
                          bsSize="xsmall"
                          style={{ float: 'right' }}
                          onClick={e => this.onDelete(e, data.id)}
                      >
                          Delete
                      </Button>

                      <Button
                          bsStyle="warning"
                          bsSize="xsmall"
                          style={{ float: 'right', marginRight: '10px' }}
                          onClick={e => this.onEdit(e, data.id)}
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
  data: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  isEng: PropTypes.bool.isRequired,
};

module.exports = Question;
