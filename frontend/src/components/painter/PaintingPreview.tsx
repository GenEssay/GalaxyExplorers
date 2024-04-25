import { useAppSelector } from '@/store/hooks';
import { CloudDownloadOutlined } from '@ant-design/icons';

export default function PaintingPreview() {
  function SaveImage(url: string) {
    const link = document.createElement('a');
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        link.href = URL.createObjectURL(blob);
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  const { globalData } = useAppSelector((state) => state.content);
  return (
    <div
      style={{
        width: '450px',
        height: '450px',
        position: 'relative',
        borderRadius: '3px',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        padding: '5px',
        pointerEvents: 'all',
        backgroundColor: '#69CCC4',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      {globalData.dists.genImageUrl ? (
        <>
          <img
            src={globalData.dists.genImageUrl}
            style={{
              width: '100%',
              height: '100%',
            }}
            alt=''
          ></img>
          <CloudDownloadOutlined
            className='absolute right-[20px] top-[10px] text-4xl'
            onClick={() => SaveImage(globalData.dists.genImageUrl)}
          />
        </>
      ) : (
        <div
          style={{
            color: 'white',
            fontWeight: 'bolder',
            userSelect: 'none',
            fontFamily: 'AliMamaFY',
          }}
        >
          这里还没有图片，快去AI生成吧
        </div>
      )}
    </div>
  );
}
