import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// 1. Import all the necessary images
import mafiaIcon from './assets/gun.png';
import policeIcon from './assets/magnifying-glass.png'; // Note: Your game logic uses "Police"
import doctorIcon from './assets/stethoscope.png';
import villagerIcon from './assets/pitchfork.png';
import hiddenIcon from './assets/question-mark.png';

// 2. Create a mapping from the role name to the imported image
const roleImages = {
  Mafia: mafiaIcon,
  Police: policeIcon,
  Doctor: doctorIcon,
  Villager: villagerIcon,
};

const RoleRevealPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const [isRoleVisible, setIsRoleVisible] = useState(false);

  // Guard clause for invalid URLs
  if (!role || !roleImages[role]) {
    return (
        <div className="role-reveal-container">
            <h1>Invalid Role</h1>
            <p>Please scan a valid QR code.</p>
        </div>
    );
  }

  // 3. Logic to determine which image and text to display
  const imageToShow = isRoleVisible ? roleImages[role] : hiddenIcon;
  const altText = isRoleVisible ? `Icon for ${role}` : 'Hidden role icon';

  return (
    <div className="role-reveal-container">
      <div>
        {/* 4. Display the selected image */}
        <img src={imageToShow} alt={altText} className="role-reveal-image" />

        <div className="revealed-role">
          {isRoleVisible ? role : '********'}
        </div>
        <button className="btn btn-primary" onClick={() => setIsRoleVisible(!isRoleVisible)}>
          {isRoleVisible ? 'Hide Role' : 'Reveal Role'}
        </button>
      </div>
    </div>
  );
};

export default RoleRevealPage;