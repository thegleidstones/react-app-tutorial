import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Header = ({title}) => {
  return (
    <div class="text-right">
      <h2>{title}</h2>
      <div class="progress">
        <hr></hr>
      </div>
    </div>
  )
}

export default Header;