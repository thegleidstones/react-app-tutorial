import React from 'react';
import { string } from 'prop-types';

function SelectStateComponent(props) {
  const  { title, list, selected, ...otherProps } = props;
  return (
    <div class="form-group col-md-6">
      <label for="state">{title}</label>
      <select id="state" value={selected} class="form-control" {...otherProps}>
        <option>Choose...</option>
        {list.map((item, index) => (
          <option key={index} value={item.id}>{item.state}</option>
        ))}
      </select>
    </div>
  )
}

SelectStateComponent.props = {
  title: string,
}

export default SelectStateComponent;