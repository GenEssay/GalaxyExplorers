'use client';

import { message } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo, useState } from 'react';
import { useCookies } from 'react-cookie';

import { useAppDispatch } from '@/store/hooks';
import {
  login,
  LoginRegisterResponse,
  LoginRegisterResponseError,
} from '@/store/user/UserSlice';

import { LOGIN_URL } from '@/constant/url';

const Login = memo(() => {
  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['userInfo']);

  const loginWeb = async (loginInfo: { account: string; password: string }) => {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: Buffer.from(
          loginInfo.account + ':' + loginInfo.password
        ).toString('base64'),
      }),
    });
    if (!response.ok) {
      const responseErr = (await response.json()) as LoginRegisterResponseError;
      throw new Error(responseErr.message);
    }
    return (await response.json()) as LoginRegisterResponse;
  };

  const onSubmit = async () => {
    if (!account) {
      message.error('请输入账号');
      return;
    }
    if (!password) {
      message.error('请输入密码');
      return;
    }
    try {
      const response = await loginWeb({
        account,
        password,
      });
      dispatch(login(response));
      setCookie('userInfo', response, {
        maxAge: 60 * 60 * 24, // cache for a day
      });
      router.push('/welcome');
    } catch (error) {
      message.error((error as LoginRegisterResponseError).message);
    }
  };

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center'>
      <Image
        src='/images/auth/party.png'
        alt='party'
        width={664}
        height={278}
        className='z-10'
      ></Image>
      <div className='-mt-7 flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-slate-100 px-10 py-9 shadow-2xl'>
        <div className='mb-4 flex items-end gap-1 text-2xl font-semibold'>
          <span className='inline-block'>欢迎来到</span>
          <Image
            src='/images/auth/logo.png'
            alt='logo'
            width={220}
            height={42}
          />
          <span className='inline-block'>！</span>
        </div>
        <div>
          <span className='inline-block min-w-20'>账号：</span>
          <input
            type='text'
            className='rounded-2xl'
            placeholder='请输入账号'
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>
        <div>
          <span className='inline-block min-w-20'>密码：</span>
          <input
            type='password'
            className='rounded-2xl'
            placeholder='请输入密码'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className='mx-2 w-full rounded-2xl border-2 bg-gradient-to-r from-[#B44FDC] to-[#CB80EB] py-2 font-bold text-white'
          onClick={onSubmit}
        >
          登录
        </button>
        <div>
          还没有账号？
          <a
            href='/register'
            className='text-purple-500 underline underline-offset-2'
          >
            注册
          </a>
        </div>
      </div>
    </div>
  );
});

export default Login;
