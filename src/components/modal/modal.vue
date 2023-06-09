/**
* The MIT License (MIT)
*
* Igor Zinken 2019-2022 - https://www.igorski.nl
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
<template>
    <div class="modal">
        <div class="component__header">
            <slot name="header" />
            <button
                type="button"
                class="component__header-button"
                @click="closeModal()"
            >&#215;</button>
        </div>
        <div ref="content" class="component__content">
            <div class="component__content-wrapper">
                <slot name="content" />
            </div>
            <div class="component__actions">
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { focus } from "@/utils/environment-util";

export default {
    methods: {
        ...mapMutations([
            "closeModal",
        ]),
    },
    mounted() {
        focus( this.$refs.content );
        this.escListener = ({ keyCode }) => {
            if ( keyCode === 27 ) {
                this.closeModal();
            }
        };
        window.addEventListener( "keyup", this.escListener );
    },
    destroyed() {
        window.removeEventListener( "keyup", this.escListener );
    }
};
</script>
<style lang="scss" scoped>
@import "@/styles/component";
@import "@/styles/typography";
@import "@/styles/ui";

.modal {
    @include overlay();
    @include component();
    @include modalBase( 480px, 320px );
    background-image: $color-window-bg;
    $headerHeight: 48px;

    .component__header {
        height: $headerHeight;
        padding: #{$spacing-xsmall + $spacing-small} $spacing-medium 0 #{$spacing-medium + $spacing-small};
        border: none;
    }

    .component__title {
        @include customFont();
        color: #FFF;
    }

    .component__header-button {
        @include closeButton();
        top: #{$spacing-xsmall + $spacing-small};
        right: #{$spacing-medium + $spacing-small};
    }

    .component__content {
        position: relative;
        height: calc(100% - #{$headerHeight});
        padding: $spacing-medium #{$spacing-medium + $spacing-small};
    }

    .component__content-wrapper {
        overflow-x: hidden;
        overflow-y: auto;
        height: inherit;
    }

    .component__actions {
        @include actionsFooter();
    }
}
</style>
