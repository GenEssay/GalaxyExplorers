'use client';

import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { useAppDispatch } from '@/store/hooks';
import { login, LoginRegisterResponse } from '@/store/user/UserSlice';

const Redirect = memo(() => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['userInfo']);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userInfo = cookies.userInfo as LoginRegisterResponse;
    if (userInfo) {
      dispatch(login(userInfo));
      router.push('/welcome');
    } else {
      router.push('/login');
    }
  }, []);

  return null;
});

export default Redirect;
