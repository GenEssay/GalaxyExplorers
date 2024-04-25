import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import React from 'react';
import { styled } from 'styled-components';

import { useAppSelector } from '@/store/hooks';

import ChoiceLego from './ChoiceLego';

const ChoiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

interface ChoicesProp {}
const Choices: React.FC<ChoicesProp> = ({}) => {
  const { selectCategory, globalData } = useAppSelector(
    (state) => state.content
  );
  const table = globalData?.tables?.find(
    (table) => table.category === selectCategory
  );
  const minorCategories = table?.minorCategories;
  const items: CollapseProps['items'] = minorCategories?.map(
    (minorCategory, index) => {
      return {
        key: index,
        label: <div style={{ fontWeight: 'bold' }}>{minorCategory.name}</div>,
        children: (
          <div
            style={{
              backgroundColor: 'white',
              padding: '10px',
              border: '2px solid #D9C8B6',
              borderRadius: '10px',
            }}
          >
            <ChoiceContainer>
              {minorCategory.legos?.map((lego, lego_index) => {
                return (
                  <ChoiceLego
                    keyWord={lego.keyWord}
                    detail={lego.detail}
                    useTime={lego.useTime}
                    color={lego.color}
                    varNum={lego.varNum === undefined ? 0 : lego.varNum}
                    key={index + ':' + lego_index}
                  />
                );
              })}
            </ChoiceContainer>
          </div>
        ),
      };
    }
  );
  return (
    <Collapse
      defaultActiveKey={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      ghost
      items={items}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          style={{ fontSize: '20px' }}
          rotate={isActive ? 90 : 0}
        />
      )}
    />
  );
};

export default Choices;
