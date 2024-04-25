import React, { useRef } from 'react';

import { drop } from '@/store/ContentSlice';
import { useAppDispatch } from '@/store/hooks';

import { useClickPreventionOnDoubleClick } from './hooks/useClickPreventionOnDoubleClick';
import Lego from './Lego';
import { extractContents } from './LegoInputBox';

interface CurrentLegoProps {
  keyWord: string;
  detail: string;
  useTime: number;
  color: string;
  varNum: number;
  category: string;
}

const CurrentLego: React.FC<CurrentLegoProps> = ({
  keyWord,
  detail,
  useTime,
  color,
  varNum,
  category,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { content, varible } = extractContents(detail);
  const contentRef = useRef(content);
  const varibleRef = useRef(varible);

  const clickHandler = () => {};

  const doubleClickHandler = () => {
    dispatch(drop({ keyWord, detail, useTime, color, varNum }));
  };

  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    clickHandler,
    doubleClickHandler
  );

  const currentColor = color;

  return (
    <div style={{ width: 'auto', display: 'flex' }}>
      <div onClick={handleClick} onDoubleClick={handleDoubleClick}>
        <Lego color={currentColor} chinese={keyWord} english={detail} />
      </div>
    </div>
  );
};

export default CurrentLego;
