/**
 * The MIT License (MIT)
 *
 * Igor Zinken 2020 - https://www.igorski.nl
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { constrain, isPortrait } from "@/utils/image-math";
import { MAX_IMAGE_SIZE, MAX_MEGAPIXEL } from "@/definitions/image-types";
import { LAYER_GRAPHIC } from "@/definitions/layer-types";

export default {
    MOVE   : "move",
    ZOOM   : "zoom",
    BRUSH  : "brush",
    LASSO  : "lasso"
};

export const canUseBrush = ( activeDocument, activeLayer ) => {
    return activeDocument && ( activeLayer.mask || activeLayer.type === LAYER_GRAPHIC );
};

// UI variables
export const MAX_BRUSH_SIZE = 100;
export const MIN_ZOOM       = -50; // zooming out from base (which is 0)
export const MAX_ZOOM       = 50;  // zooming in from base (which is 0)

/**
 * Ideally we'd like to zoom the document in and out by the MAX_SCALE defined above, however
 * if the max zoom exceeds the maximum image size, the magnification is scaled
 * down to a value that relates to this maximum image size. The returned in magnification
 * should lead to the maximum scale relative to the document size, making the max displayed
 * value equal across window sizes.
 */
export const calculateMaxScaling = ( baseWidth, baseHeight, docWidth, containerWidth ) => {
    const pixelRatio = window.devicePixelRatio; // zCanvas magnifies for pixel ratio
    const maxScale = isPortrait( baseWidth, baseHeight ) ? MAX_IMAGE_SIZE / baseHeight : MAX_IMAGE_SIZE / baseWidth;
    // dimensions of document at max displayable megapixel size
    const { width, height } = constrain(
        baseWidth  * maxScale,
        baseHeight * maxScale,
        MAX_MEGAPIXEL
    );
    return {
        in : ( width / baseWidth ) / pixelRatio,
        out: baseWidth / ( containerWidth / MAX_OUT_SCALE )
    };
};
const MAX_IN_SCALE  = 4;
const MAX_OUT_SCALE = 2;
