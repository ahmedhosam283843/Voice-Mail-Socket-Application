import React from 'react'
import { Link } from 'react-router-dom';

import './topbar.css'

const topbar = () => {

  return(
        <div className="topbar">
          <ul>
            <Link to='/mailbox' className='top-link'>
              <span>InBox</span>
            </Link>
            <Link to='/compose' className='top-link'>
              <span>Compose</span>
            </Link>

          </ul>
          <Link to='/' className='top-link at-right'>
            <span>Logout</span>
          </Link>
        </div>
      );
}

export default topbar