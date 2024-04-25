import {
  DefaultSizeStyle,
  Editor,
  Tldraw,
  TLUiOverrides,
} from '@tldraw/tldraw';

import {
  LiveImageShape,
  LiveImageShapeUtil,
} from '@/components/painter/LiveImageShapeUtil';
import { LiveImageTool } from '@/components/painter/LiveImageTool';
import SneakySideEffects from '@/components/painter/SneakySideEffects';

const overrides: TLUiOverrides = {
  actions(editor, actions) {
    for (const key in actions) {
      actions[key].kbd = '';
    }
    return actions;
  },
  tools(editor, tools) {
    for (const key in tools) {
      tools[key].kbd = '';
    }
    return tools;
  },
  toolbar(editor, schema, _) {
    const removeTools = [
      'select',
      'hand',
      'laser',
      'frame',
      'highlight',
      'x-box',
      'check-box',
      'text',
      'note',
      'asset',
    ];
    removeTools.forEach((removeTool) => {
      const index = schema.findIndex((item) => item.id === removeTool);
      if (index !== -1) schema.splice(index, 1);
    });
    return schema;
  },
};

const shapeUtils = [LiveImageShapeUtil];
const tools = [LiveImageTool];

export default function DraftCanvas() {
  const onEditorMount = (editor: Editor) => {
    // @ts-expect-error: patch
    editor.isShapeOfType = function (arg, type) {
      const shape =
        typeof arg === 'string'
          ? this.getShape(arg)
            ? this.getShape(arg)
            : undefined
          : arg;
      if (shape) {
        if (shape.type === 'live-image' && type === 'frame') {
          return true;
        }
        return shape.type === type;
      }
      return false;
    };

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

    editor.setStyleForNextShapes(DefaultSizeStyle, 'xl', { ephemeral: true });
    editor.setCurrentTool('draw');
  };
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
      }}
    >
      <Tldraw
        persistenceKey='tldraw-fal'
        onMount={onEditorMount}
        shapeUtils={shapeUtils}
        tools={tools}
        overrides={overrides}
      >
        {/* <TitleInputModal /> */}
        <SneakySideEffects />
      </Tldraw>
    </div>
  );
}
