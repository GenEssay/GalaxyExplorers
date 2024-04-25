import Image from 'next/image';

import { editPrompt } from '@/store/ContentSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import KbtImage from '@/assets/keyboard-icon.png';
import RecImage from '@/assets/record.png';
export default function PromptInputField() {
  const dispatch = useAppDispatch();
  const { globalData } = useAppSelector((state) => state.content);
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '140px',
      }}
    >
      <textarea
        style={{
          resize: 'none',
          width: '100%',
          border: '0',
          height: '100%',
          fontSize: '1.3rem',
          borderRadius: '30px',
          boxShadow: '0px 4px 0px rgba(0,0,0,0.3)',
          padding: '10px 20px',
          pointerEvents: 'all',
          overflow: 'hidden',
          fontFamily: 'AliMamaFY',
        }}
        value={globalData.dists.prompt}
        onChange={(event) => dispatch(editPrompt(event.target.value))}
      ></textarea>
      <div
        style={{
          position: 'absolute',
          right: '0px',
          bottom: '0px',
          pointerEvents: 'none',
        }}
      >
        <Image src={KbtImage} alt=''></Image>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '20px',
          bottom: '20px',
          pointerEvents: 'all',
        }}
      >
        <Image
          className='hover-up'
          src={RecImage}
          style={{ width: '40px', height: '40px', position: 'relative' }}
          alt=''
        ></Image>
      </div>
    </div>
  );
}
