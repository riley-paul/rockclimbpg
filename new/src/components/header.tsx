import React from 'react';
import Logo from './logo';

const Header: React.FC = () => {
  return <header className='flex justify-between items-center'>
    <Logo/>

  </header>;
};

export default Header;
