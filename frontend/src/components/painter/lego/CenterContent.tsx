import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import { input } from '@/store/ContentSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import PromptTitle from '@/assets/prompt-title.png';

import CurrentLego from './CurrentLego';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  height: 140px;
  width: 100%;
  border-radius: 30px;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.3);
  pointer-events: all;
  background-color: white;
`;

const ContentContainer = styled.div`
  position: relative;
  top: 0px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
`;

const LegoContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Label = styled.p`
  font-size: 1.8rem;
  margin: 1rem;
`;

interface CenterContentProps {}

const CenterContent: React.FC<CenterContentProps> = ({}) => {
  const { current, inputContent } = useAppSelector((state) => state.content);
  const dispatch = useAppDispatch();

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch(input(e.target.value));
  }

  return (
    <Container>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '20px',
          top: '-10px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image
          src={PromptTitle}
          alt=''
          layout='fit'
          style={{ height: '40px', width: '160px' }}
        ></Image>
      </div>
      <div style={{ height: '40px' }}></div>
      <div
        style={{
          position: 'relative',
          overflowY: 'auto',
          width: '100%',
          height: '100%',
          borderRadius: '30px',
          overflow: 'hidden',
        }}
      >
        <ContentContainer>
          {current.map((item, index) => {
            return item.children.length === 0 ? (
              <></>
            ) : (
              <React.Fragment key={index}>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  <div style={{ position: 'relative', width: '140px' }}>
                    <Label key={'label:' + index}>
                      <div
                        style={{
                          fontSize: '18px',
                          position: 'absolute',
                          width: '160px',
                          left: '10px',
                          top: '0px',
                          padding: '5px',
                          fontWeight: 'bold',
                          color: '#71B0AB',
                          userSelect: 'none',
                        }}
                      >
                        {item.category}
                      </div>
                    </Label>
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      padding: '5px',
                    }}
                  >
                    <LegoContainer
                      key={'container:' + index}
                      style={{ fontSize: '14px' }}
                    >
                      {item.children.map((child, lego_index) => {
                        return (
                          <CurrentLego
                            keyWord={child.keyWord}
                            detail={child.detail}
                            useTime={child.useTime}
                            color={child.color}
                            category={item.category}
                            varNum={child.varNum}
                            key={index + ':' + lego_index}
                          />
                        );
                      })}
                    </LegoContainer>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </ContentContainer>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '20px',
            bottom: '0px',
            background: 'linear-gradient(to top, white, transparent)',
            zIndex: '100000',
          }}
        ></div>
      </div>
    </Container>
  );
};

export default CenterContent;
