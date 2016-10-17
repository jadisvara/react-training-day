import React, { PropTypes } from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const styles = {
  addBtn: {
    margin: 0,
    right: 40,
    top: 40,
    left: 'auto',
    position: 'fixed',
    zIndex: 1100,
  },
};

const AddBtn = ({ onClick }) => (
    <FloatingActionButton
        secondary
        onClick={onClick}
        style={styles.addBtn}
    >
        <ContentAdd />
    </FloatingActionButton>
);

AddBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddBtn;
