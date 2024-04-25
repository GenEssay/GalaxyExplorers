import { ReactNode } from 'react';
interface LegoProps {
  color: string;
  chinese: string;
  english: string;
}

function LegoContainer({ children = undefined }: { children: ReactNode }) {
  return (
    <div
      className='hover-up'
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: '99999',
        pointerEvents: 'all',
        borderRadius: '6px',
        boxShadow: '1px 2px 4px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

function LegoMiddle({ children = undefined }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        flexGrow: '1',
        height: '100%',
        display: 'flex',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  );
}

const Lego: React.FC<LegoProps> = ({ color, chinese, english }) => {
  const colors = color.split(' ');
  let color1 = 'white',
    color2 = 'white';
  if (colors.length > 0) {
    color1 = colors[0];
  }
  if (colors.length > 1) {
    color2 = colors[1];
  }
  return (
    <LegoContainer>
      <LegoMiddle>
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            color: 'white',
            fontWeight: 'bolder',
          }}
        >
          <div
            style={{
              padding: '2px 4px',
              backgroundColor: color1,
              fontFamily: 'AliMamaFY',
            }}
          >
            {' '}
            {english}
          </div>
          <div
            style={{
              padding: '2px 4px',
              backgroundColor: color2,
              fontFamily: 'AliMamaFY',
            }}
          >
            {' '}
            {chinese}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            color: 'white',
            fontWeight: 'bolder',
          }}
        >
          <div
            style={{
              padding: '2px 4px',
              background: 'linear-gradient(to bottom, #000000, #ffffff)',
              opacity: '0.1',
              fontFamily: 'AliMamaFY',
            }}
          >
            {' '}
            {english}
          </div>
          <div
            style={{
              padding: '2px 4px',
              background: 'linear-gradient(to top, #000000, #ffffff)',
              opacity: '0.1',
              fontFamily: 'AliMamaFY',
            }}
          >
            {' '}
            {chinese}
          </div>
        </div>
      </LegoMiddle>
    </LegoContainer>
  );
};

export default Lego;
