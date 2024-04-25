import { FC } from 'react';

import Loading from '@/app/home/Loading';
import Redirect from '@/app/home/Redirect';

const page: FC = ({}) => {
  return (
    <>
      <Loading />
      <Redirect />
    </>
  );
};

export default page;
