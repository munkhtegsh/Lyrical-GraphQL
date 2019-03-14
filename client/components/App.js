import React from 'react';

// can be props.children as well
export default ({children}) => {
  return <div className="container">{children}</div>;
};
