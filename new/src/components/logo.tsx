import { Heading } from '@radix-ui/themes';
import { MountainSnowIcon } from 'lucide-react';
import React from 'react';

const Logo: React.FC = () => {
  return <span>
    <MountainSnowIcon className='size-5 text-accent-10'/>
    <Heading>      Rock Climb PG    </Heading>
  </span>;
};

export default Logo;
