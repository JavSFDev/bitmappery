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
import Vue       from "vue";
import ToolTypes from "@/definitions/tool-types";
import { runSpriteFn } from "@/factories/sprite-factory";

export default {
    state: {
        activeTool: null,
        activeColor: "rgba(255,0,0,1)",
        options: {
            [ ToolTypes.ZOOM ] : { level: 1 },
            [ ToolTypes.BRUSH ]: { size: 10 },
        }
    },
    getters: {
        activeTool   : state => state.activeTool,
        activeColor  : state => state.activeColor,
        zoomOptions  : state => state.options[ ToolTypes.ZOOM ],
        brushOptions : state => state.options[ ToolTypes.BRUSH ],
    },
    mutations: {
        setActiveTool( state, { tool, activeLayer }) {
            state.activeTool = tool;
            runSpriteFn( sprite => sprite.handleActiveTool( tool, activeLayer ));
        },
        setActiveColor( state, color ) {
            state.activeColor = color;
            updateLayerSprites( state.activeColor, state.options[ ToolTypes.BRUSH ]);
        },
        setToolOptionValue( state, { tool, option, value }) {
            Vue.set( state.options[ tool ], option, value );
            switch ( tool ) {
                default:
                    break;
                case ToolTypes.BRUSH:
                    updateLayerSprites( state.activeColor, state.options[ tool ]);
                    break;
            }
        },
    },
};

function updateLayerSprites( color, { size }) {
    runSpriteFn( sprite => {
        if ( sprite.isDrawable() ) {
            sprite.cacheBrush( color, size );
        }
    });
}
