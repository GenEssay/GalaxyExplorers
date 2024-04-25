import { rng } from '@tldraw/tldraw';
import Image from 'next/image';

import {
  setGenImageUrl,
  setPainterState,
  setSpining,
} from '@/store/ContentSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import GenBtn from '@/assets/gen-btn.png';
import { GENERATE_IMAGE_URL } from '@/constant/url';

export default function GenerateButton() {
  const dispatch = useAppDispatch();
  const { current, globalData } = useAppSelector((state) => state.content);

  function getPrompt() {
    const output = current
      .map((category) => {
        const detail = category.children
          .map((lego) => {
            return lego.detail;
          })
          .join('');
        return detail;
      })
      .join('');
    return globalData.dists.prompt + (output ? ', ' + output : '');
  }

  const confirmOnClick = async () => {
    dispatch(setPainterState(''));
    const paintingUrl = globalData.dists.painting
      ? globalData.dists.painting
      : '';
    const finalPrompt = getPrompt();

    const random = rng();
    dispatch(setSpining(true));
    try {
      const result = await fetch(GENERATE_IMAGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          seed: Math.abs(Math.round(random() * 10000)),
          image: paintingUrl,
        }),
      });

      if (result.status == 200) {
        result.json().then((data) => {
          dispatch(setGenImageUrl(data.data.url));
          dispatch(setSpining(false));
        });
      } else {
        dispatch(setSpining(false));
      }
    } catch (e) {
      dispatch(setSpining(false));
    }
  };

  return (
    <div
      onClick={confirmOnClick}
      style={{
        position: 'relative',
        width: '112px',
        height: '180px',
      }}
    >
      <Image
        src={GenBtn}
        alt=''
        className='hover-up'
        style={{ position: 'relative' }}
      ></Image>
    </div>
  );
}
