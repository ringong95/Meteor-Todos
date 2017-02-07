import React, { PropTypes } from 'react';
export const ToDoCount = ({ number }) => {
  return (
    <p>{number} {number === 1 ? "Todo" : "Todos"} </p>
  )
}
ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

