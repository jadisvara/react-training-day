import React, { PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  toggle: {
      maxWidth: 100,
  },
};

const LangSwitcher = ({ onClick, isEng }) => (
    <div>
        <Toggle
            toggled={!isEng}
            label="RU"
            style={styles.toggle}
            onToggle={onClick}
        />
    </div>
);

LangSwitcher.propTypes = {
    onClick: PropTypes.func.isRequired,
    isEng: PropTypes.bool.isRequired,
};

export default LangSwitcher;
