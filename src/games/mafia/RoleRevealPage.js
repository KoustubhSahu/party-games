import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const RoleRevealPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  const [isVisible, setIsVisible] = useState(false);

  if (!role) {
    return <div>Invalid Role URL.</div>;
  }

  return (
    <div className="role-reveal-container">
      <div>
        <div className="revealed-role">
          {isVisible ? role : '********'}
        </div>
        <button className="btn btn-primary" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide Role' : 'Reveal Role'}
        </button>
      </div>
    </div>
  );
};

export default RoleRevealPage;