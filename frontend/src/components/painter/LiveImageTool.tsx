import { FrameShapeTool } from '@tldraw/tldraw';

export class LiveImageTool extends FrameShapeTool {
  static override id = 'live-image';
  static override initial = 'idle';
  override shapeType = 'live-image';
}

export function PaintToolBar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input style={{ pointerEvents: 'all' }} />
    </div>
  );
}
