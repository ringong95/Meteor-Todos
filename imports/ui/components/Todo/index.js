import React, { PropTypes } from 'react';
export const Todo = ({ toDo, toggleComplete, removeToDo }) => {
  return (
    <li>{toDo.title}
      <input
        type="checkbox"
        id={toDo._id}
        checked={toDo.complete}
        onChange={toggleComplete} />
      <label htmlFor={toDo._id}></label>
      <button>
        <i className="fa fa-trash"
          onClick={removeToDo}></i>
      </button>
    </li>
  )
}
Todo.propTypes = {
  removeToDo: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  toDo: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    complete: PropTypes.bool
  })
}