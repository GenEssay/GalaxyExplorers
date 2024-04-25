import { TLEventInfo, useEditor } from '@tldraw/tldraw';
import { useCallback, useEffect } from 'react';

import { LiveImageShape } from '@/components/painter/LiveImageShapeUtil';

export default function SneakySideEffects() {
  const editor = useEditor();

  useEffect(() => {
    const removeComponentClasses = ['tlui-menu-zone', 'tlui-navigation-zone'];
    editor.sideEffects.registerAfterChangeHandler('shape', () => {
      editor.emit('update-drawings' as any);
    });
    editor.sideEffects.registerAfterCreateHandler('shape', () => {
      editor.emit('update-drawings' as any);
    });
    editor.sideEffects.registerAfterDeleteHandler('shape', () => {
      editor.emit('update-drawings' as any);
    });

    removeComponentClasses.forEach((componentClass) => {
      const component = document.getElementsByClassName(componentClass)[0];
      component?.parentNode?.removeChild(component);
    });

    editor.updateInstanceState({ canMoveCamera: false });
  }, []);
  editor.on('event', (event) => handleEvent(event));
  const handleEvent = useCallback((data: TLEventInfo) => {
    if (editor.getCurrentToolId() === 'eraser' && data.name === 'pointer_up') {
      if (
        !editor
          .getCurrentPageShapes()
          .some((shape) => shape.type === 'live-image')
      ) {
        editor.createShape<LiveImageShape>({
          type: 'live-image',
          x: -4,
          y: -4,
          props: {
            w: 458,
            h: 458,
            name: '',
          },
        });
      }
    }
  }, []);

  return null;
}
