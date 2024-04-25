'use client';

import { message, Modal } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/user/UserSlice';
import Loading from '@/app/home/Loading';

const Home = memo(() => {
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(logout());
    removeCookie('userInfo');
    setIsModalOpen(false);
    router.push('/login');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    (!isLoggedIn && <Loading />) ||
    (isLoggedIn && (
      <div className='flex h-screen w-screen flex-col'>
        <Modal
          title='退出账号'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>您确定退出账号吗？</p>
        </Modal>
        <div className='mx-10 my-5 flex items-end justify-between'>
          <Image
            src='/images/auth/logo.png'
            alt='logo'
            height={63}
            width={336}
          />
          <div className='flex items-center'>
            <div className='text-xl'>Hi，欢迎新朋友！</div>
            <button
              className='relative h-12 w-12 rounded-full border-2 bg-gradient-to-br from-[#F1F1F1] to-[#FFFFFF]'
              onClick={showModal}
            >
              <Image
                src='/images/welcome/personal.png'
                alt='me'
                fill={true}
                objectFit='contain'
                className='p-2'
              />
            </button>
          </div>
        </div>
        <div className='grid h-[100%] w-[100%] grid-cols-2 px-20 pb-10'>
          <div className='relative flex flex-col rounded-[64px] bg-gradient-to-tr from-[#F9ACBA] to-[#FFE7EB]'>
            <div className='relative mt-auto h-[95%] w-[70%]'>
              <Image
                src='/images/welcome/painter.png'
                alt='painter'
                fill={true}
                objectFit='contain'
              />
            </div>
            <div className='absolute left-[60%] top-[60%] rounded-full bg-gradient-to-tr from-[#F88CA0] to-[#FDABBA] p-1'>
              <button
                className='rounded-full bg-gradient-to-tr from-[#FDABBA] to-[#F88CA0] px-6 py-3 text-3xl text-white'
                onClick={() => router.push('/draw')}
              >
                AI绘画
              </button>
            </div>
          </div>
          <div className='relative flex flex-col rounded-[64px] bg-gradient-to-br from-[#FFE56C] to-[#FFD400]'>
            <div className='relative ml-auto mt-auto h-[95%] w-[70%]'>
              <Image
                src='/images/welcome/writer.png'
                alt='painter'
                fill={true}
                objectFit='contain'
              />
            </div>
            <div className='absolute right-[60%] top-[60%] rounded-full bg-gradient-to-br from-[#FFD751] to-[#F1C900] p-1'>
              <button
                className='rounded-full bg-gradient-to-br from-[#F1C900] to-[#FFD751] px-6 py-3 text-3xl text-white'
                onClick={() => message.warning('正在开发中')}
              >
                AI写作
              </button>
            </div>
          </div>
          <div className='relative flex flex-col rounded-[64px] bg-gradient-to-tr from-[#0076D7] to-[#4DAEF1]'>
            <div className='relative mt-auto h-[95%] w-[70%]'>
              <Image
                src='/images/welcome/coder.png'
                alt='painter'
                fill={true}
                objectFit='contain'
              />
            </div>
            <div className='absolute left-[60%] top-[60%] rounded-full bg-gradient-to-tr from-[#1775C5] to-[#6DAFE7] p-1'>
              <button
                className='rounded-full bg-gradient-to-tr from-[#6DAFE7] to-[#1775C5] px-6 py-3 text-3xl text-white'
                onClick={() => message.warning('正在开发中')}
              >
                AI编程
              </button>
            </div>
          </div>
          <div className='relative grid grid-cols-3'>
            <div className='relative col-span-2 flex flex-col rounded-[64px] bg-gradient-to-br from-[#E3B0F8] to-[#B246DC]'>
              <div className='relative ml-auto mt-auto h-[95%] w-[70%]'>
                <Image
                  src='/images/welcome/researcher.png'
                  alt='painter'
                  fill={true}
                  objectFit='contain'
                />
              </div>
            </div>
            <div className='relative col-span-1 flex flex-col overflow-hidden rounded-[64px] bg-gradient-to-br from-[#00CE9F] to-[#00A87C]'>
              <div className='relative ml-auto mt-auto h-[80%] w-[70%]'>
                <Image
                  src='/images/welcome/singer.png'
                  alt='painter'
                  fill={true}
                  objectFit='contain'
                />
              </div>
              <div className='absolute left-1/2 top-1/4 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-[#00DAAA] to-[#00A87D] p-1'>
                <button
                  className='h-full w-full rounded-full bg-gradient-to-r from-[#00A87D] to-[#00DAAA]'
                  onClick={() => message.warning('正在开发中')}
                >
                  <Image
                    src='/images/welcome/mic.png'
                    alt='mic'
                    fill={true}
                    objectFit='contain'
                    className='p-3'
                  />
                </button>
              </div>
            </div>
            <div className='absolute right-[60%] top-[60%] rounded-full bg-gradient-to-br from-[#D3A3E7] to-[#B050D6] p-1'>
              <button
                className='rounded-full bg-gradient-to-br from-[#B050D6] to-[#D3A3E7] px-6 py-3 text-3xl text-white'
                onClick={() => message.warning('正在开发中')}
              >
                AI百科
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  );
});

export default Home;
