import React from 'react';
import Icon from '@mdi/react';
import {
  mdiAvTimer,
  mdiAccountNetwork,
  mdiAccountGroup,
  mdiHandHeart,
  mdiCalendarClock,
  mdiMessageReplyText // Added mdiMessageReplyText for Feedback icon
} from '@mdi/js';

const Sidebar = ({ onShowProfile, onShowDashboard }) => {
  return (
    <aside style={{
      position: 'fixed',
      width: '250px',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: 10,
      paddingTop: '88px',
      background: '#343a40',
      boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)',
      transition: '0.2s ease-in'
    }}>
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <ul style={{ margin: 0, padding: 0 }}>
            <li className="sidebar-item" style={{ width: '250px' }}>
              <a
                className="sidebar-link waves-effect waves-dark sidebar-link"
                href="#"
                aria-expanded="false"
                style={{
                  color: '#ffffff',
                  padding: '22px 25px',
                  display: 'flex',
                  whiteSpace: 'nowrap',
                  alignItems: 'center',
                  lineHeight: '25px',
                  opacity: 0.5,
                  borderLeft: '2px solid transparent'
                }}
                onClick={onShowDashboard}
              >
                <Icon path={mdiAvTimer} size={1} style={{
                  fontStyle: 'normal',
                  width: '35px',
                  lineHeight: '25px',
                  fontSize: '20px',
                  color: '#ffffff',
                  display: 'inline-block',
                  textAlign: 'center'
                }} />
                <span className="hide-menu">Dashboard</span>
              </a>
            </li>
            <li className="sidebar-item" style={{ width: '250px' }}>
              <a
                className="sidebar-link waves-effect waves-dark sidebar-link"
                href="#"
                aria-expanded="false"
                style={{
                  color: '#ffffff',
                  padding: '22px 25px',
                  display: 'flex',
                  whiteSpace: 'nowrap',
                  alignItems: 'center',
                  lineHeight: '25px',
                  opacity: 0.5,
                  borderLeft: '2px solid transparent'
                }}
                onClick={onShowProfile}
              >
                <Icon path={mdiAccountNetwork} size={1} style={{
                  fontStyle: 'normal',
                  width: '35px',
                  lineHeight: '25px',
                  fontSize: '20px',
                  color: '#ffffff',
                  display: 'inline-block',
                  textAlign: 'center'
                }} />
                <span className="hide-menu">Profile</span>
              </a>
            </li>
            <li className="sidebar-item" style={{ width: '250px' }}>
              <a
                className="sidebar-link waves-effect waves-dark sidebar-link"
                href="/user-table"
                aria-expanded="false"
                style={{
                  color: '#ffffff',
                  padding: '22px 25px',
                  display: 'flex',
                  whiteSpace: 'nowrap',
                  alignItems: 'center',
                  lineHeight: '25px',
                  opacity: 0.5,
                  borderLeft: '2px solid transparent'
                }}
                onClick={onShowDashboard}
              >
                <Icon path={mdiAccountGroup} size={1} style={{
                  fontStyle: 'normal',
                  width: '35px',
                  lineHeight: '25px',
                  fontSize: '20px',
                  color: '#ffffff',
                  display: 'inline-block',
                  textAlign: 'center'
                }} />
                <span className="hide-menu">Users</span>
              </a>
            </li>
            <li className="sidebar-item" style={{ width: '250px' }}>
              <a
                className="sidebar-link waves-effect waves-dark sidebar-link"
                href="/total-transactions"
                aria-expanded="false"
                style={{
                  color: '#ffffff',
                  padding: '22px 25px',
                  display: 'flex',
                  whiteSpace: 'nowrap',
                  alignItems: 'center',
                  lineHeight: '25px',
                  opacity: 0.5,
                  borderLeft: '2px solid transparent'
                }}
                onClick={onShowDashboard}
              >
                <Icon path={mdiHandHeart} size={1} style={{
                  fontStyle: 'normal',
                  width: '35px',
                  lineHeight: '25px',
                  fontSize: '20px',
                  color: '#ffffff',
                  display: 'inline-block',
                  textAlign: 'center'
                }} />
                <span className="hide-menu">Donations</span>
              </a>
            </li>
            <li className="sidebar-item" style={{ width: '250px' }}>
              <a
                className="sidebar-link waves-effect waves-dark sidebar-link"
                href="/appointment"
                aria-expanded="false"
                style={{
                  color: '#ffffff',
                  padding: '22px 25px',
                  display: 'flex',
                  whiteSpace: 'nowrap',
                  alignItems: 'center',
                  lineHeight: '25px',
                  opacity: 0.5,
                  borderLeft: '2px solid transparent'
                }}
                onClick={onShowDashboard}
              >
                <Icon path={mdiCalendarClock} size={1} style={{
                  fontStyle: 'normal',
                  width: '35px',
                  lineHeight: '25px',
                  fontSize: '20px',
                  color: '#ffffff',
                  display: 'inline-block',
                  textAlign: 'center'
                }} />
                <span className="hide-menu">Appointments</span>
              </a>
            </li>
            <li className="sidebar-item" style={{ width: '250px' }}>
              <a
                className="sidebar-link waves-effect waves-dark sidebar-link"
                href="/feedback"
                aria-expanded="false"
                style={{
                  color: '#ffffff',
                  padding: '22px 25px',
                  display: 'flex',
                  whiteSpace: 'nowrap',
                  alignItems: 'center',
                  lineHeight: '25px',
                  opacity: 0.5,
                  borderLeft: '2px solid transparent'
                }}
                onClick={onShowDashboard}
              >
                <Icon path={mdiMessageReplyText} size={1} style={{
                  fontStyle: 'normal',
                  width: '35px',
                  lineHeight: '25px',
                  fontSize: '20px',
                  color: '#ffffff',
                  display: 'inline-block',
                  textAlign: 'center'
                }} />
                <span className="hide-menu">Feedback</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
