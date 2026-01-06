import React from 'react';
import { Link } from 'react-router-dom';
import './styles/EmpWorkIcons.css';

function EmpWorkIcons({ userRank }) {
  const rank = userRank || window.localStorage.getItem('loggedInUserRank') || '';

  return (
    <div className="ew-icons-container">
      <div className="ew-icons-inner container-xxl">
        <div className="ew-icons-row">
          <Link to="add" className="ew-card" aria-label="Add Icons">
            <div className="ew-card-body">
              <div className="ew-icon-circle">
                <i className="bi bi-bootstrap ew-icon-img" aria-hidden="true" />
              </div>
              <h5 className="ew-card-title">Add Icons</h5>
            </div>
          </Link>

          {rank === 'superAdmin' && (
            <Link to="team-links" className="ew-card" aria-label="Team Links">
              <div className="ew-card-body">
                <div className="ew-icon-circle">
                  <i className="bi bi-people ew-icon-img" aria-hidden="true" />
                </div>
                <h5 className="ew-card-title">Team Links</h5>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmpWorkIcons;
