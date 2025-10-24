import React, { useState } from 'react';
import QRCode from 'react-qr-code';


const RoleCard = ({ player, playerNumber }) => {
  const [isRoleVisible, setIsRoleVisible] = useState(false);
  const clickableQrCode = true;

  const role = player ? player.role : 'Unknown';
  const playerName = player ? player.name : 'Loading...';

  const roleRevealUrl = `${window.location.origin}${process.env.PUBLIC_URL}/role-reveal?role=${role}`;


  const qrCodeComponent = <QRCode value={roleRevealUrl} size={128} />;

  return (
    <div className="role-card">
      <button className="toggle-role-btn" onClick={() => setIsRoleVisible(!isRoleVisible)}>
        {isRoleVisible ? 'Hide' : 'Show'}
      </button>
      <div className="role-card-header">Player #{playerNumber}</div>

      <div className="role-card-name">{playerName}</div>
      <div className="role-reveal">
        {isRoleVisible ? role : <span className="role-hidden">*********</span>}
      </div>
      <div className="qr-code-container">
        <p>Scan to see your role privately</p>
        {clickableQrCode ? (
          <a href={roleRevealUrl} target="_blank" rel="noopener noreferrer">
            {qrCodeComponent}
          </a>
        ) : (
          qrCodeComponent
        )}
      </div>
    </div>
  );
};

export default RoleCard;