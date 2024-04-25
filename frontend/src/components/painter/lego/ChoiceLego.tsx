import React from 'react';

import { useAppDispatch } from '@/store/hooks';

import Lego from './Lego';
import { choose } from '../../../store/ContentSlice';

interface ChoiceLegoProps {
  keyWord: string;
  detail: string;
  useTime: number;
  color: string;
  varNum: number;
}

const ChoiceLego: React.FC<ChoiceLegoProps> = ({
  keyWord,
  detail,
  useTime,
  color,
  varNum,
}) => {
  const dispatch = useAppDispatch();
  const popContent = <p style={{ zIndex: 99, maxWidth: '40vw' }}>{detail}</p>;

  const clickHandler = () => {
    dispatch(choose({ keyWord, detail, useTime, color, varNum }));
  };

  return (
    <div onClick={clickHandler}>
      <Lego color={color} chinese={keyWord} english={detail} />
    </div>

    // <Popover content={popContent}>
    // </Popover>
  );
};

export default ChoiceLego;
