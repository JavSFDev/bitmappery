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
import { sprite } from "zcanvas";

/**
 * Sprites are used to represend graphics. These are mapped
 * to the graphic ids (see graphic-factory.js)
 */
const spriteCache = new Map();

/**
 * Creates a new HTMLCanvasElement, returning both
 * the element and its CanvasRenderingContext2D
 */
export const createCanvas = ( optWidth = 0, optHeight = 0 ) => {
    const cvs = document.createElement( "canvas" );
    const ctx = cvs.getContext( "2d" );

    if ( optWidth !== 0 && optHeight !== 0 ) {
        cvs.width  = optWidth;
        cvs.height = optHeight;
    }
    return { cvs, ctx };
};

/**
 * Runs given fn on each Sprite in the cache
 */
export const runSpriteFn = fn => {
    spriteCache.forEach( fn );
};

/**
 * If a layer were to be removed / set to invisible, we
 * flush all its cached Sprites.
 */
export const flushSpritesInLayer = layer => {
    console.warn("flushing sprites in layer");
    layer.graphics.forEach(({ id }) => {
        if ( spriteCache.has( id )) {
            disposeSprite( spriteCache.get( id ));
            spriteCache.delete( id );
        }
    });
};

/**
 * Clears the entire cache and disposes all Sprites.
 */
export const flushCache = () => {
    console.warn("flushing cache");
    spriteCache.forEach( disposeSprite );
    spriteCache.clear();
};

/**
 * Lazily retrieve / create a cached sprite to represent given
 * graphic on given zCanvas instance
 */
export const createSpriteForGraphic = ( zCanvasInstance, { id, bitmap, x, y, width, height }) => {
    let output;
    if ( spriteCache.has( id )) {
        output = spriteCache.get( id );
    }
    // lazily create sprite
    if ( !output ) {
        output = new sprite({
            bitmap, x, y, width, height
        });
        output.setDraggable( true );
        zCanvasInstance.addChild( output );
        spriteCache.set( id, output );
    }
    return output;
};

/* internal methods */

function disposeSprite( sprite ) {
    sprite?.dispose();
    // TODO: also free associated bitmap ?
}
