/* eslint-disable no-debugger, no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import CourseList from './CourseList';
import * as authorActions from '../../redux/actions/authorActions';

class CoursesPage extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      course: {
        title: ''
      }
    };
  }

  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.loadCourses().catch(error => {
        alert(`Loading courses failed ${error}`);
      });
    }

    if (this.props.authors.length === 0) {
      this.props.loadAuthors().catch(error => {
        alert(`Loading authors failed ${error}`);
      });
    }
  }

  handleChange(e) {
    const course = { ...this.state.course, title: e.target.value };
    this.setState({ course });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createCourse(this.state.course);
  }

  render() {
    const {authors, courses} = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Courses</h2>
          <h3>Add Course</h3>
          <input
            type='text'
            onChange={this.handleChange}
            value={this.state.course.title} />
          <input type='submit' value='Save' />
        </form>

        <CourseList courses={courses} authors={authors}/>
      </div>
    );
  }

}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  createCourse: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

const mapStateToProps = ({ courses, authors }) => {
  courses = courses.map(course => {
    const author = authors.find(author => author.id === course.authorId);
    return { ...course, author: author };
  });

  return {
    courses,
    authors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCourse(course) {
      dispatch(courseActions.createCourse(course));
    },

    loadCourses() {
      return dispatch(courseActions.loadCourses());
    },

    loadAuthors() {
      return dispatch(authorActions.loadAuthors());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
