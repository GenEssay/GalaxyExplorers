/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  AssetRecordType,
  Editor,
  Geometry2d,
  getDefaultColorTheme,
  getHashForObject,
  getSvgAsImage,
  Rectangle2d,
  ShapeUtil,
  SVGContainer,
  TLBaseShape,
  TLShape,
  TLShapeId,
  toDomPrecision,
  useEditor,
  useIsDarkMode,
} from '@tldraw/tldraw';
import { useEffect } from 'react';

import { setPainting } from '@/store/ContentSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { blobToDataUri } from '@/utils/blob';

export type LiveImageShape = TLBaseShape<
  'live-image',
  {
    w: number;
    h: number;
    name: string;
    overlayResult?: boolean;
  }
>;

export class LiveImageShapeUtil extends ShapeUtil<LiveImageShape> {
  static type = 'live-image' as any;

  override canBind = () => false;
  override canUnmount = () => false;
  override canEdit = () => true;
  override isAspectRatioLocked = () => true;

  override canCrop = () => false;
  override canResize = () => false;
  override canScroll = () => false;

  getDefaultProps() {
    return {
      w: 512,
      h: 512,
      name: '',
    };
  }

  override getGeometry(shape: LiveImageShape): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: false,
    });
  }

  override canReceiveNewChildrenOfType = (
    shape: TLShape,
    _type: TLShape['type']
  ) => {
    return !shape.isLocked;
  };

  providesBackgroundForChildren(): boolean {
    return true;
  }

  override canDropShapes = (
    _shape: LiveImageShape,
    _shapes: TLShape[]
  ): boolean => {
    return false;
  };

  indicator(shape: LiveImageShape) {
    const bounds = this.editor.getShapeGeometry(shape).bounds;

    return (
      <rect
        width={toDomPrecision(bounds.width)}
        height={toDomPrecision(bounds.height)}
        className='tl-frame-indicator'
      />
    );
  }

  override component(shape: LiveImageShape) {
    const editor = useEditor();
    const dispatch = useAppDispatch();
    const { current, globalData } = useAppSelector((state) => state.content);
    useEffect(() => {
      let prevHash = '';
      let prevPrompt = '';
      function getPrompt() {
        const output = current
          .map((category) => {
            const detail = category.children
              .map((lego) => {
                return lego.detail;
              })
              .join('');
            return detail;
          })
          .join('');
        return globalData.dists.prompt + (output ? ', ' + output : '');
      }

      async function updateDrawing() {
        const prompt = getPrompt();
        const shapes = getShapesTouching(shape.id, editor);
        const frame = editor.getShape<LiveImageShape>(shape.id);
        if (!frame) return;
        const hash = getHashForObject([...shapes]);
        if (frame == undefined) return;
        if (hash === prevHash && prompt === prevPrompt) return;

        prevHash = hash;
        prevPrompt = prompt;

        try {
          const bounds = editor.getShapePageBounds(shape.id);
          if (!bounds) return;
          const svg = await editor.getSvg([...shapes], {
            background: true,
            padding: 0,
            darkMode: editor.user.getIsDarkMode(),
            bounds: bounds,
          });
          if (!svg) return;

          const image = await getSvgAsImage(svg, editor.environment.isSafari, {
            type: 'png',
            quality: 1,
            scale: 768 / frame.props.w,
          });

          if (!image) return;

          const imageDataUri = await blobToDataUri(image);
          dispatch(setPainting(imageDataUri));
        } catch (e) {
          console.log(e);
        }
      }

      let timer: ReturnType<typeof setTimeout> | null = null;
      function requestUpdate() {
        if (timer !== null) return;
        timer = setTimeout(() => {
          timer = null;
          updateDrawing();
        }, 64);
      }

      editor.on('update-drawings' as any, requestUpdate);
      return () => {
        editor.off('update-drawings' as any, requestUpdate);
      };
    }, [editor, shape.id]);

    const bounds = this.editor.getShapeGeometry(shape).bounds;
    const assetId = AssetRecordType.createId(shape.id.split(':')[1]);
    const asset = editor.getAsset(assetId);

    const theme = getDefaultColorTheme({ isDarkMode: useIsDarkMode() });

    return (
      <>
        <SVGContainer>
          <rect
            className='tl-frame__body'
            width={bounds.width}
            height={bounds.height}
            fill={theme.solid}
            stroke={theme.text}
          />
        </SVGContainer>

        {!shape.props.overlayResult &&
          asset &&
          asset.props &&
          asset.props.src && (
            <img
              src={asset.props.src}
              alt={shape.props.name}
              width={shape.props.w}
              height={shape.props.h}
              style={{
                position: 'relative',
                left: shape.props.w,
                width: shape.props.w,
                height: shape.props.h,
              }}
            />
          )}
      </>
    );
  }
}

function getShapesTouching(shapeId: TLShapeId, editor: Editor) {
  const shapeIdsOnPage = editor.getCurrentPageShapeIds();
  const shapesTouching: TLShape[] = [];
  const targetBounds = editor.getShapePageBounds(shapeId);
  if (!targetBounds) return shapesTouching;
  for (const id of [...shapeIdsOnPage]) {
    if (id === shapeId) continue;
    const bounds = editor.getShapePageBounds(id);
    if (!bounds) continue;
    if (bounds.collides(targetBounds)) {
      const shapeId = editor.getShape(id);
      if (shapeId) {
        shapesTouching.push(shapeId);
      }
    }
  }
  return shapesTouching;
}
