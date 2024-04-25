import Image from 'next/image';
import React from 'react';

import { selectCategory } from '@/store/ContentSlice';
import { useAppDispatch } from '@/store/hooks';

import BtnChosen from '@/assets/navi-chosen.png';
import BtnNormal from '@/assets/navi-normal.png';

interface NaviagatorLegoProps {
  keyWord: string;
  color: string;
  select: boolean;
}

const NavigatorLego: React.FC<NaviagatorLegoProps> = ({
  keyWord,
  color,
  select,
}) => {
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    console.log('Select');
    dispatch(selectCategory(keyWord));
  };

  const LegoButton = (
    <div
      onClick={clickHandler}
      style={{
        position: 'relative',
        background: select
          ? 'linear-gradient(to right, #FBEAD8, #FBEAD8)'
          : 'linear-gradient(to right, #A1DED9, #B2EFEA)',
        padding: '10px 20px',
        borderRadius: '10px 10px 0px 0px',
        fontWeight: 'bold',
      }}
    >
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '140%',
          top: '0',
          left: '-20%',
        }}
      >
        <Image
          src={select ? BtnChosen : BtnNormal}
          alt=''
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            left: '0px',
            top: '0px',
            zIndex: select ? '100000' : '99999',
          }}
        ></Image>
      </div>
      <div
        style={{
          zIndex: '100001',
          position: 'relative',
          color: select ? '#B8AD9D' : '#60A09A',
          minWidth: '50px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {keyWord}
      </div>
    </div>
  );

  return LegoButton;
};

export default NavigatorLego;
