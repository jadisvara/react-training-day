import React, { PropTypes, Component } from 'react';
// import { Button } from 'react-bootstrap';
import { ListItem } from 'material-ui/List';
// import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
    backgroundColor: cyan500,
  },
  wrapper: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    width: '30%',
  },
  listItem: {
    borderBottom: '1px solid #F5F5F5', // == gray100
  },
};

class Question extends Component {
    componentWillMount() {
      console.log('Question');
    }
    onDelete(e, id) {
        this.props.remove(id);
    }
    onEdit(e, id) {
        this.props.update(id);
    }
    handleDeleteTag(tagId, question) {
      this.props.deleteTag(tagId, question);
    }

    render() {
      const { data } = this.props;

      return (
          <ListItem
              // leftCheckbox={<Checkbox />}
              style={styles.listItem}
          >
              <div>
                  <div style={{ width: '50%', display: 'inline-block' }}>
                      {this.props.isEng ? data.eng_text : data.rus_text}
                  </div>
                  <div style={styles.wrapper}>
                      {data.tags &&
                        data.tags.map(tag => (
                            <Chip
                                key={tag.id}
                                style={styles.chip}
                                labelColor="#fff"
                                labelStyle={{ fontSize: '12px' }}
                                onRequestDelete={() => this.handleDeleteTag(tag.id, data)}
                            >
                                {tag.tag}
                            </Chip>
                        ))
                      }
                  </div>
                  <div style={{ width: '20%', display: 'inline-block' }}>
                      <FlatButton
                          label="Delete"
                          style={{ float: 'right' }}
                          onTouchTap={e => this.onDelete(e, data.id)}
                      />
                      <FlatButton
                          label="Edit"
                          primary
                          style={{ float: 'right' }}
                          onTouchTap={e => this.onEdit(e, data.id)}
                      />
                  </div>
              </div>
          </ListItem>
      );
    }
}
Question.propTypes = {
  data: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  isEng: PropTypes.bool.isRequired,
};

module.exports = Question;
//
// <ListItem
//     leftCheckbox={<Checkbox />}
//     onMouseEnter={() => this.onMouseEnter()}
//     onMouseLeave={() => this.onMouseLeave()}
// >
//     #{data.id}
//     {this.props.isEng ? data.eng_text : data.rus_text}
//     {data.tags
//       ? data.tags.map(tag => (
//           <Button
//               bsSize="xsmall"
//               key={tag.id}
//           >
//               #{tag.tag}
//           </Button>
//     ))
//       : null
//     }
//     {showBtns
//       ?
//         <div style={{ display: 'inline' }}>
//             <Button
//                 bsStyle="danger"
//                 bsSize="xsmall"
//                 style={{ float: 'right' }}
//                 onClick={e => this.onDelete(e, data.id)}
//             >
//                 Delete
//             </Button>
//
//             <Button
//                 bsStyle="warning"
//                 bsSize="xsmall"
//                 style={{ float: 'right', marginRight: '10px' }}
//                 onClick={e => this.onEdit(e, data.id)}
//             >
//                 Edit
//             </Button>
//         </div>
//       : ''
//     }
//     <Divider />
// </ListItem>
