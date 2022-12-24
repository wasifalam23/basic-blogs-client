import React, { useEffect, useState } from 'react';
import './Pages.scss';

const FallBack = () => {
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInitial(false);
    }, 4000);
  }, []);

  return (
    <React.Fragment>
      {initial && <div />}
      {!initial && (
        <p className="fallback-text">Please login to visit this page.</p>
      )}
    </React.Fragment>
  );
};

export default FallBack;
