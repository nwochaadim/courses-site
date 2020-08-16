/* eslint-disable no-debugger, no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseList = ({ courses })  => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {courses.map(course => {
        const {author} = course;
        if (!author) return (<tr key={course.id}></tr>);
        return (
          <tr key={course.id}>
            <td>
              <a
                className="btn btn-light"
                href={`http://pluralsight.com/courses/${course.slug}`}>
               Watch
              </a>
            </td>
            <td>
              <Link to={`/course/${course.slug}`}>{course.title}</Link>
            </td>
            <td>{author.name}</td>
            <td>{course.category}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
}

export default CourseList;
