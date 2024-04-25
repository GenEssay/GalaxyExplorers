'use client';

import { Switch } from 'antd';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import DraftCanvas from '@/components/painter/DraftCanvas';
import GenerateButton from '@/components/painter/GenerateButton';
import GenSpin from '@/components/painter/GenSpin';
import CenterContent from '@/components/painter/lego/CenterContent';
import RightSider from '@/components/painter/lego/RightSider';
import PaintingPreview from '@/components/painter/PaintingPreview';
import PromptInputField from '@/components/painter/PrompInputField';

import PaintExit from '@/assets/paint-exit.png';
import PaintTitle from '@/assets/paint-title.png';

const AppLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const GridRowContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
`;

const GridColContainer = styled.div`
  position: relative;
  width: 450px;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
`;

type PainterState = 'canvas' | 'prompt';

export default function HomePage() {
  const [state, setState] = useState<PainterState>('canvas');
  return (
    <main className='tldraw-wrapper'>
      <div className='tldraw-wrapper__inner'>
        <GenSpin />
        <AppLayout>
          <GridRowContainer
            style={{ backgroundColor: '#69CCC4', userSelect: 'none' }}
          >
            <div
              style={{
                position: 'relative',
                height: '70px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex' }}>
                <div style={{ width: '20px' }}></div>
                <a href='/'>
                  <Image
                    src={PaintExit}
                    alt=''
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                  ></Image>
                </a>
              </div>
              <div style={{ display: 'flex' }}>
                <Image
                  src={PaintTitle}
                  alt=''
                  style={{ height: '30px', width: '140px' }}
                ></Image>
                <div style={{ width: '8px' }}></div>
                <div
                  style={{
                    fontSize: '24px',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '3px',
                    fontFamily: 'AliMamaFY',
                  }}
                >
                  A I 绘 画
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    padding: '0px 10px',
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'AliMamaFY',
                  }}
                >
                  画板
                </div>
                <Switch
                  style={{ backgroundColor: '#FFD589' }}
                  onChange={(checked, _) => {
                    setState(checked ? 'prompt' : 'canvas');
                  }}
                ></Switch>
                <div
                  style={{
                    padding: '0px 10px',
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'AliMamaFY',
                  }}
                >
                  文本
                </div>
                <div style={{ width: '20px' }}></div>
              </div>
            </div>
          </GridRowContainer>
          <GridRowContainer>
            <GridColContainer>
              <CenterContent />
            </GridColContainer>
            <GridColContainer>
              <PromptInputField />
              <GenerateButton />
            </GridColContainer>
          </GridRowContainer>
          <GridRowContainer>
            {state == 'canvas' ? <DraftCanvas /> : <RightSider />}
            <PaintingPreview />
          </GridRowContainer>
          <GridRowContainer></GridRowContainer>
        </AppLayout>
      </div>
    </main>
  );
}
