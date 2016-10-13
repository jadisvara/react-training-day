import React, { Component, PropTypes } from 'react';
import { Checkbox, Grid, ControlLabel, FormControl, Button, FormGroup } from 'react-bootstrap';

class SelectTags extends Component {
    constructor(props) {
      super(props);
      this.state = {
        newTagText: '',
      };
    }
    componentWillMount() {
      console.log('SelectTags component');
    }

    onChange(e, tag) {
        console.log('tag checked', tag.tag, e.target.checked);
        if (e.target.checked) {
            // const tags = [...this.state.selectedTags, tag];
            // this.setState({
            //     selectedTags: tags,
            //  });
             this.props.select(tag, true);
        } else {
          // console.log('this.state.selectedTags', this.state.selectedTags);
            // const index = this.state.selectedTags.findIndex(item => item.id === tag.id);
            // console.log('index', index);
            // if (index !== -1) {
            //     this.state.selectedTags.splice(index, 1);
            // }
            this.props.select(tag, false);
        }
    }

    addNewTag() {
        // TODO: add validation
        this.props.select(this.state.newTagText, true);
    }

    handleTextChange(e) {
        this.setState({ newTagText: e.target.value });
    }

    render() {
      console.log('this.props.preselectedTags render', this.props.preselectedTags);

      return (
          <Grid style={{ width: '100%' }}>
              {this.props.tags.map(tag => (
                  <Checkbox
                      key={tag.id}
                      onChange={e => this.onChange(e, tag.tag)}
                      defaultChecked={this.props.preselectedTags
                        .filter(t => t === tag.tag).length > 0}
                  >
                      {tag.tag}
                  </Checkbox>
              ))}

              <FormGroup controlId="tagField">
                  <ControlLabel>New Tag:</ControlLabel>
                  <FormControl
                      type="text"
                      value={this.state.newTagText}
                      placeholder="You can enter a new tag here..."
                      onChange={e => this.handleTextChange(e)}
                  />
                  <Button onClick={() => this.addNewTag()}>Add</Button>
              </FormGroup>
          </Grid>
      );
  }
}
SelectTags.propTypes = {
  tags: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  preselectedTags: PropTypes.array.isRequired,
};

module.exports = SelectTags;
