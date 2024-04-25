import blueL from '@/assets/blue-L.png';
import blueM from '@/assets/blue-M.png';
import blueR from '@/assets/blue-R.png';
import cyanL from '@/assets/cyan-L.png';
import cyanM from '@/assets/cyan-M.png';
import cyanR from '@/assets/cyan-R.png';
import grayL from '@/assets/gray-L.png';
import grayM from '@/assets/gray-M.png';
import grayR from '@/assets/gray-R.png';
import greenL from '@/assets/green-L.png';
import greenM from '@/assets/green-M.png';
import greenR from '@/assets/green-R.png';
import pinkL from '@/assets/pink-L.png';
import pinkM from '@/assets/pink-M.png';
import pinkR from '@/assets/pink-R.png';
import purpleL from '@/assets/purple-L.png';
import purpleM from '@/assets/purple-M.png';
import purpleR from '@/assets/purple-R.png';
import whiteL from '@/assets/white-L.png';
import whiteM from '@/assets/white-M.png';
import whiteR from '@/assets/white-R.png';
import yellowL from '@/assets/yellow-L.png';
import yellowM from '@/assets/yellow-M.png';
import yellowR from '@/assets/yellow-R.png';

export function loadLegoImage(color: string, position: string) {
  switch (position) {
    case 'L':
      switch (color) {
        case 'yellow':
          return yellowL;
        case 'gray':
          return grayL;
        case 'blue':
          return blueL;
        case 'cyan':
          return cyanL;
        case 'green':
          return greenL;
        case 'purple':
          return purpleL;
        case 'pink':
          return pinkL;
        case 'white':
          return whiteL;
        default:
          return whiteL;
      }
    case 'M':
      switch (color) {
        case 'yellow':
          return yellowM;
        case 'gray':
          return grayM;
        case 'blue':
          return blueM;
        case 'cyan':
          return cyanM;
        case 'green':
          return greenM;
        case 'purple':
          return purpleM;
        case 'pink':
          return pinkM;
        case 'white':
          return whiteM;
        default:
          return whiteM;
      }
    case 'R':
      switch (color) {
        case 'yellow':
          return yellowR;
        case 'gray':
          return grayR;
        case 'blue':
          return blueR;
        case 'cyan':
          return cyanR;
        case 'green':
          return greenR;
        case 'purple':
          return purpleR;
        case 'pink':
          return pinkR;
        case 'white':
          return whiteR;
        default:
          return whiteR;
      }
    default:
      return whiteL;
  }
}
