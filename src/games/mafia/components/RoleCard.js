import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const RoleCard = ({ player, playerNumber }) => {
  const [isRoleVisible, setIsRoleVisible] = useState(false);
  const roleRevealUrl = `${window.location.origin}/role-reveal?role=${player.role}`;

  return (
    <div className="role-card">
      <button className="toggle-role-btn" onClick={() => setIsRoleVisible(!isRoleVisible)}>
        {isRoleVisible ? 'Hide' : 'Show'}
      </button>
      <div className="role-card-header">Player #{playerNumber}</div>
      <div className="role-card-name">{player.name}</div>
      <div className="role-reveal">
        {isRoleVisible ? player.role : <span className="role-hidden">*********</span>}
      </div>
      <div className="qr-code-container">
        <p>Scan to see your role privately</p>
        <QRCode value={roleRevealUrl} size={128} />
      </div>
    </div>
  );
};

export default RoleCard;
