import styled from 'styled-components';

import { useAppSelector } from '@/store/hooks';

import NavigatorLego from './NavigatorLego';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: -2px;
  background-color: #e0f7fb;
`;

interface NavigatorProps {}

const Navigator: React.FC<NavigatorProps> = ({}) => {
  const { selectCategory, globalData } = useAppSelector(
    (state) => state.content
  );

  return (
    <Container>
      {globalData.categories.map((category, index) => {
        const isSelected = selectCategory === category.name;
        return (
          <NavigatorLego
            select={isSelected}
            keyWord={category.name}
            color={isSelected ? category.color : 'white'}
            key={index}
          />
        );
      })}
    </Container>
  );
};

export default Navigator;
