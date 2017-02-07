import React from 'react';
export default ({ addToDo, value, onChange, autoFocus }) => (
  <form name="addTodo" onSubmit={addToDo}>
    <input type="text" value={value} onChange={onChange} autoFocus={autoFocus} />
    <span>(press enter to add)</span>
  </form>
)