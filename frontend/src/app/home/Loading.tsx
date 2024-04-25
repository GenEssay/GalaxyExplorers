import Image from 'next/image';
import { memo } from 'react';

const Loading = memo(() => {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-20'>
      <Image
        src='/images/auth/party.png'
        alt='party'
        width={1104}
        height={462}
      ></Image>
      <Image src='/images/auth/logo.png' alt='logo' width={590} height={112} />
    </div>
  );
});

export default Loading;
