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

import { REGISTER_URL } from '@/constant/url';

const Register = memo(() => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['userInfo']);

  const register = async (registerInfo: {
    username: string;
    email: string;
    password: string;
    inviteCode: string;
  }) => {
    const response = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerInfo),
    });
    if (!response.ok) {
      const responseErr = (await response.json()) as LoginRegisterResponseError;
      throw new Error(responseErr.message);
    }
    return (await response.json()) as LoginRegisterResponse;
  };

  const onSubmit = async () => {
    if (!username) {
      message.error('请输入用户名');
      return;
    }
    if (!email) {
      message.error('请输入邮箱');
      return;
    }
    if (!password) {
      message.error('请输入密码');
      return;
    }
    if (!confirmPassword) {
      message.error('请再次输入密码');
      return;
    }
    if (password !== confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    if (!inviteCode) {
      message.error('请输入邀请码');
      return;
    }
    try {
      const response = await register({
        username,
        email,
        password,
        inviteCode,
      });
      dispatch(login(response));
      setCookie('userInfo', response);
      router.push('/welcome');
    } catch (error) {
      message.error((error as LoginRegisterResponseError).message);
    }
  };

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [inviteCode, setInviteCode] = useState<string>('');

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
          <span className='inline-block min-w-20'>用户名：</span>
          <input
            type='text'
            className='rounded-2xl'
            placeholder='请输入用户名'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <span className='inline-block min-w-20'>邮箱：</span>
          <input
            type='email'
            className='rounded-2xl'
            placeholder='请输入邮箱'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <span className='inline-block min-w-20'>确认密码：</span>
          <input
            type='password'
            className='rounded-2xl'
            placeholder='请再次输入密码'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <span className='mt-6 inline-block min-w-20'>邀请码：</span>
          <input
            type='text'
            className='rounded-2xl'
            placeholder='请输入邀请码'
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
        </div>
        <button
          className='mx-2 w-full rounded-2xl border-2 bg-gradient-to-r from-[#B44FDC] to-[#CB80EB] py-2 font-bold text-white'
          onClick={onSubmit}
        >
          注册
        </button>
        <div>
          已经有账号了？
          <a
            href='/login'
            className='text-purple-500 underline underline-offset-2'
          >
            登录
          </a>
        </div>
      </div>
    </div>
  );
});

export default Register;
