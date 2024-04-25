import Image from 'next/image';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';

import { edit } from '@/store/ContentSlice';
import { useAppDispatch } from '@/store/hooks';

import InputBackgroundLegoLeftDown from '@/assets/inputBackgroungLegoLeftDown.png';
import InputBackgroundLegoLeftMiddle from '@/assets/inputBackgroungLegoLeftMiddle.png';
import InputBackgroundLegoLeftUp from '@/assets/inputBackgroungLegoLeftUp.png';
import InputBackgroundLegoMiddleDown from '@/assets/inputBackgroungLegoMiddleDown.png';
import InputBackgroundLegoMiddleUp from '@/assets/inputBackgroungLegoMiddleUp.png';
import InputBackgroundLegoRightDown from '@/assets/inputBackgroungLegoRightDown.png';
import InputBackgroundLegoRightMiddle from '@/assets/inputBackgroungLegoRightMiddle.png';
import InputBackgroundLegoRightUp from '@/assets/inputBackgroungLegoRightUp.png';

const LegoInputContainer = styled.div`
  position: relative;
  min-height: 10rem;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: -1.9rem;
`;
const LegoInputBackgroundLeft = styled.div`
  width: 0.8rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

function LegoInputBackgroundLeftUp() {
  return (
    <div style={{ position: 'relative', height: '10px', width: '100%' }}>
      <Image src={InputBackgroundLegoLeftUp} alt='' layout='fill'></Image>
    </div>
  );
}
function LegoInputBackgroundLeftMiddle() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '10px',
        width: '100%',
        flexGrow: '1',
      }}
    >
      <Image src={InputBackgroundLegoLeftMiddle} alt='' layout='fill'></Image>
    </div>
  );
}
function LegoInputBackgroundLeftDown() {
  return (
    <div style={{ position: 'relative', height: '12px', width: '100%' }}>
      <Image src={InputBackgroundLegoLeftDown} alt='' layout='fill'></Image>
    </div>
  );
}
const LegoInputBackgroundMiddle = styled.div`
  flex-grow: 1;
  min-width: 1rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
function LegoInputBackgroundMiddleUp() {
  return (
    <div style={{ position: 'relative', height: '10px', width: '100%' }}>
      <Image src={InputBackgroundLegoMiddleUp} alt='' layout='fill'></Image>
    </div>
  );
}
const LegoInputBackgroundMiddleMiddle = styled.div`
  flex-grow: 1;
  width: 100%;
  min-height: 1rem;
`;
function LegoInputBackgroundMiddleDown() {
  return (
    <div style={{ position: 'relative', height: '12px', width: '100%' }}>
      <Image src={InputBackgroundLegoMiddleDown} alt='' layout='fill'></Image>
    </div>
  );
}
const LegoInputBackgroundRight = styled.div`
  width: 1.4rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
function LegoInputBackgroundRightUp() {
  return (
    <div style={{ position: 'relative', height: '10px', width: '100%' }}>
      <Image src={InputBackgroundLegoRightUp} alt='' layout='fill'></Image>
    </div>
  );
}
function LegoInputBackgroundRightMiddle() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '10px',
        width: '100%',
        flexGrow: '1',
      }}
    >
      <Image src={InputBackgroundLegoRightMiddle} alt='' layout='fill'></Image>
    </div>
  );
}
function LegoInputBackgroundRightDown() {
  return (
    <div style={{ position: 'relative', height: '12px', width: '100%' }}>
      <Image src={InputBackgroundLegoRightDown} alt='' layout='fill'></Image>
    </div>
  );
}
interface LegoInputBoxProps {
  keyWord: string;
  detail: string;
  useTime: number;
  color: string;
  varNum: number;
  contentRef: React.MutableRefObject<string[]>;
  varibleRef: React.MutableRefObject<string[]>;
  enterEvent: () => void;
}

export const extractContents = (detail: string) => {
  const content: string[] = [];
  const varible: string[] = [];
  while (true) {
    const begin = detail.indexOf('{');
    if (begin == -1) {
      break;
    } else {
      content.push(detail.substring(0, begin + 1));
      detail = detail.substring(begin + 1);
      const end = detail.indexOf('}');
      if (end == -1) {
        return { content, varible };
      } else {
        varible.push(detail.substring(0, end));
        detail = detail.substring(end);
      }
    }
  }
  if (detail != null && detail != undefined && detail.length > 0) {
    content.push(detail);
  }
  return { content, varible };
};

const verifyDetail = (text: string, content: string[]) => {
  for (let i = 0; i < content.length - 1; i++) {
    const element = content[i];
    const index = text.indexOf(element);
    if (index == -1) {
      return false;
    } else {
      text = text.substring(index + element.length);
    }
  }
  return text.endsWith(content[content.length - 1]);
};

const eraseEmptyVaribles = (
  text: string,
  content: string[],
  varible: string[]
) => {
  let newText = '';
  for (let i = 0; i < varible.length; i++) {
    const begin = text.indexOf(content[i]);
    text = text.substring(begin + content[i].length);
    const end = text.indexOf(content[i + 1]);
    let currentVarible = text.substring(0, end);
    if (currentVarible == varible[i]) {
      currentVarible = '';
    }
    newText = newText + content[i] + currentVarible;
  }
  newText = newText + content[varible.length];
  return newText;
};

const fillEmptyVaribles = (
  text: string,
  content: string[],
  varible: string[]
) => {
  let newText = '';
  for (let i = 0; i < varible.length; i++) {
    const begin = text.indexOf(content[i]);
    text = text.substring(begin + content[i].length);
    const end = text.indexOf(content[i + 1]);
    let currentVarible = text.substring(0, end);
    if (currentVarible == '') {
      currentVarible = varible[i];
    }
    newText = newText + content[i] + currentVarible;
  }
  newText = newText + content[varible.length];
  return newText;
};

export const countEmptyVaribles = (
  text: string,
  content: string[],
  varible: string[]
) => {
  let count = 0;
  for (let i = 0; i < varible.length; i++) {
    const begin = text.indexOf(content[i]);
    text = text.substring(begin + content[i].length);
    const end = text.indexOf(content[i + 1]);
    const currentVarible = text.substring(0, end);
    if (currentVarible == '' || currentVarible == varible[i]) {
      count = count + 1;
    }
  }
  return count;
};

export const LegoInputBox: React.FC<LegoInputBoxProps> = ({
  keyWord,
  detail,
  useTime,
  color,
  varNum,
  contentRef,
  varibleRef,
  enterEvent,
}) => {
  const dispatch = useAppDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useImmer(detail);
  const [focus, setFocus] = useImmer(false);
  const onChange = (text: string) => {
    if (contentRef.current && verifyDetail(text, contentRef.current)) {
      setContent(text);
      dispatch(
        edit({
          keyWord: keyWord,
          detail: text,
          useTime: useTime,
          color: color,
          varNum: varNum,
        })
      );
    }
  };

  const onFocus = (text: string) => {
    setFocus(true);
    if (contentRef.current && varibleRef.current && textareaRef.current) {
      text = eraseEmptyVaribles(text, contentRef.current, varibleRef.current);
      setContent(text);
    }
  };

  const onBlur = (text: string) => {
    setFocus(false);
    if (contentRef.current && varibleRef.current && textareaRef.current) {
      text = fillEmptyVaribles(text, contentRef.current, varibleRef.current);
      setContent(text);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code == 'Enter') {
      if (event.shiftKey === true) {
        return true;
      } else {
        event.preventDefault();
        enterEvent();
        return false;
      }
    }
  };

  const detailTextarea = (
    <textarea
      style={{
        resize: 'none',
        width: '100%',
        border: '0',
        height: '100%',
        fontSize: '1.3rem',
        color: focus ? 'black' : 'gray',
      }}
      value={content}
      ref={textareaRef}
      onChange={(event) => onChange(event.target.value)}
      onFocus={(event) => onFocus(event.target.value)}
      onBlur={(event) => onBlur(event.target.value)}
      onKeyDown={onKeyDown}
    ></textarea>
  );
  return (
    <LegoInputContainer>
      <LegoInputBackgroundLeft>
        <LegoInputBackgroundLeftUp></LegoInputBackgroundLeftUp>
        <LegoInputBackgroundLeftMiddle></LegoInputBackgroundLeftMiddle>
        <LegoInputBackgroundLeftDown></LegoInputBackgroundLeftDown>
      </LegoInputBackgroundLeft>
      <LegoInputBackgroundMiddle>
        <LegoInputBackgroundMiddleUp></LegoInputBackgroundMiddleUp>
        <LegoInputBackgroundMiddleMiddle>
          {detailTextarea}
        </LegoInputBackgroundMiddleMiddle>
        <LegoInputBackgroundMiddleDown></LegoInputBackgroundMiddleDown>
      </LegoInputBackgroundMiddle>
      <LegoInputBackgroundRight>
        <LegoInputBackgroundRightUp></LegoInputBackgroundRightUp>
        <LegoInputBackgroundRightMiddle></LegoInputBackgroundRightMiddle>
        <LegoInputBackgroundRightDown></LegoInputBackgroundRightDown>
      </LegoInputBackgroundRight>
    </LegoInputContainer>
  );
};
