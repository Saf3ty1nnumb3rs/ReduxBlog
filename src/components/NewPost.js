import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const FIELDS = {
    title: { 
        type: 'input',
        label: 'Title',
        placeholder: 'Enter the Title'
     },
    categories: {
        type: 'input',
        label: 'Category',
        placeholder: 'Enter the Category'
    },
    content: {
        type: 'textarea',
        label: 'Content',
        placeholder: 'Enter the Content'
    }
}

//['title', 'categories', 'content'];

class NewPost extends Component {


  renderField(field) {
      
    const fieldConfig = FIELDS[field.input.name];
    const { meta: {touched, error, invalid} } = field;
    const className = `form-group ${touched && invalid ? 'has-danger' : ""}`;


    return (
      <div className={className}>
          <label>{fieldConfig.label}</label>
        <fieldConfig.type
          required  
          className='form-control'
          placeholder={fieldConfig.placeholder}
          type="text"
          {...field.input}
        />
        <div className="text-danger">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
     
    this.props.createPost(values, () => {
        this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3>New Posts</h3>
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          {_.keys(FIELDS).map(key => {
              return <Field name={key} key={key} component={this.renderField} />
          })
          } 
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf'}
  const errors = {};

  _.each(FIELDS, (type, field) => {
     if(!values[field] || values[field].length < 3) {
         errors[field] = `Enter the ${field} with more than 3 characters`
     } 
  })

  //Validate the input from 'values'
//   if (!values.title || values.title.length < 3) {
//     errors.title = "Enter a title longer than 3 characters!";
//   }
//   if (!values.categories) {
//     errors.categories = "Enter some categories";
//   }
//   if (!values.content) {
//     errors.content = "Enter some content";
//   }
  //If errors is empty, the form is fine to submit
  //If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "NewPostForm",
  fields: _.keys(FIELDS)
})(
    connect(null, { createPost })(NewPost)
);
