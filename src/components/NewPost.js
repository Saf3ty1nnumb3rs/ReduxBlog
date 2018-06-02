import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class NewPost extends Component {

  renderField(field) {
    return (
      <div className="form-group">
        <input
          className="form-control"
          placeholder={field.placeholder}
          type="text"
          {...field.input}
        />
        {field.meta.touched ?  <p>{field.meta.error}</p>  : ''}
      </div>
    );
  }

  onSubmit(values) {
  console.log(values)
  }

  render() {
      const { handleSubmit } = this.props;

    return (
      <div>
        <h3>New Posts</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            placeholder="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            placeholder="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            placeholder="Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
    // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf'}
    const errors = {};

    //Validate the input from 'values'
    if(!values.title || values.title.length < 3){
        errors.title = "Enter a title longer than 3 characters!";
    }
    if(!values.categories) {
        errors.categories = 'Enter some categories';
    }
    if(!values.content) {
        errors.content = 'Enter some content';
    }
    //If errors is empty, the form is fine to submit
    //If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: "NewPostForm"
})(NewPost);
