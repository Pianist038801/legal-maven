import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import reactHtmlParser from 'react-html-parser';

import Button from '../../../../../../components/Button/Button';
import Cover from '../../../../../../components/Cover';

// Import styles
import styles from './styles.css';

// Import Actions

// Import components

const btnStyle = {
  backgroundColor: 'white',
  color: '#02b2fb',
  fontSize: '17rem',
  fontWeight: 400,
  margin: '0rem 10rem',
  padding: '7rem 18rem'
}

class Topic extends Component {

  constructor(props) {
    super(props);

  }

  onView() {
    //if (props.data.form === 'ca_form_articles_of_professional_incorporation_1')
    // props.dispatch(setFinalNode(props.data.form, props.data));
  }

  render() {
    return (
      <div className={ `${styles.container} wow fadeIn` }>
        <div className={ styles.header }>
          Thank you!
        </div>
        <div className={ styles.content }>
          <span className={ styles.message }>
            We hope you enjoyed your experience with us. Is there something else we may help you with?
          </span>
          <div className={ styles['actions'] }>
            <Cover title='NO' icon='fa-home' description='Go back to home page' onClick={ e => this.onView() } />
            <Cover title='YES' icon='fa-tasks' description='View other legal topics' />
            <Cover title='SAVE' icon='fa-user' description='Save results and open profile' />
          </div>
        </div>
        <div className={ styles.footer }>
          <div className={ styles.button }>
            <i className="fa fa-envelop" aria-hidden="true">&nbsp;&nbsp;</i>LEAVE A COMMENT/MESSAGE
          </div>
        </div>
      </div>
    );
  }
}

Topic.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {

  };
}
export default connect(mapStateToProps)(Topic);
