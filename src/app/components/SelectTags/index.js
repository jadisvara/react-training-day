import React, { Component, PropTypes } from 'react';
import { Checkbox, Grid } from 'react-bootstrap';

class SelectTags extends Component {
  constructor(props) {
   super(props);
   this.state = {
     selectedTags: [],
   };
  }
    componentWillMount() {
      console.log('SelectTags component');
    }

    onChange(e, id) {
        console.log('id', id, e);
        if (e.target.checked) {
            const tags = [...this.state.selectedTags, id];
            this.setState({
                selectedTags: tags,
             });
             this.props.select(id);
        }
    }

    render() {
      return (
          <Grid>
              {this.props.tags.map(tag => (
                  <Checkbox key={tag.id} onChange={e => this.onChange(e, tag.id)}>
                      {tag.tag}
                  </Checkbox>
              ))}
          </Grid>
      );
  }
}
SelectTags.propTypes = {
  tags: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
};

module.exports = SelectTags;
