import React, {  PropTypes } from 'react';
export const ClearButton = ({ removeCompleted }) => {
  return (
    <div>

      <button onClick={removeCompleted} >
        Clear
   </button>

    </div>
  )

}

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};
