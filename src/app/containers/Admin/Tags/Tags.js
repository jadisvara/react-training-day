import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { GridList } from 'material-ui/GridList';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import { getTags, saveTag } from '../../../actions/TagActions';

const styles = {
  chip: {
    margin: 4,
    backgroundColor: cyan500,
  },
  wrapper: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    padding: '20px 0',
  },
};

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTagText: '',
    };
  }
  componentWillMount() {
      if (this.props.tags.length === 0) {
          this.props.getTags();
      }
  }
  componentWillReceiveProps() {
      this.setState({
          newTagText: '',
      });
  }
  addNewTag() {
      // TODO: add validation
      if (this.state.newTagText === '') return;
      this.props.saveTag({ tag: this.state.newTagText }, this.props.getTags);
  }
  handleTextChange(e) {
      this.setState({ newTagText: e.target.value });
  }

  render() {
    const { tags } = this.props;

    return (
        <div style={{ padding: '40px' }}>
            <TextField
                hintText="You can enter a new tag here..."
                floatingLabelText="New Tag"
                onChange={e => this.handleTextChange(e)}
                value={this.state.newTagText}
            />
            <FlatButton
                label="Add"
                primary
                onClick={() => this.addNewTag()}
            />

            <GridList
                cellHeight={30}
                style={styles.wrapper}
                padding={10}
                cols={5}
            >
                {tags.map(tag => (
                    <Chip
                        key={tag.id}
                        style={styles.chip}
                        labelColor="#fff"
                    >
                        {tag.tag}
                    </Chip>
                ))}
            </GridList>
        </div>
    );
  }
}
Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  getTags: PropTypes.func.isRequired,
  saveTag: PropTypes.func.isRequired,
};

module.exports = connect(
  state => ({
    tags: state.tags.tags,
  }),
  dispatch => ({
    getTags: () => dispatch(getTags()),
    saveTag: (data, callback) => dispatch(saveTag(data, callback)),
  })
)(Tags);
