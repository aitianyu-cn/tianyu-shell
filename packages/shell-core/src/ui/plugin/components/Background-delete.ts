/**@format */
import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import { TianyuShellUIBackgroundPreious, TianyuShellUIBackgroundZIndex } from "../../common/Declare";
import { guid } from "@aitianyu.cn/types";
import { ITianyuShellCoreUIBackground } from "shell-core/src/core/declares/ui/UserInterface";
import { TianyuShellProcessor } from "shell-core/src/core/utils/Processor";

interface IBackgroundMap {
    layerId: string;
    color: string;
    defaultColor: string;
    element: HTMLElement | null;
}

const _backgroundMap: IBackgroundMap = {
    layerId: "",
    color: "#FFFFFF",
    defaultColor: "#FFFFFF",
    element: null,
};

function _setColor(color: string): void {
    const backgroundLayer = document.getElementById(_backgroundMap.layerId);
    if (backgroundLayer) {
        _backgroundMap.color = color;
        backgroundLayer.style.background = _backgroundMap.color;
    }
}

function _getColor(): string {
    return _backgroundMap.color;
}
function _removeColor(): void {
    _setColor(_backgroundMap.defaultColor);
}

function _setElement(html: HTMLElement): void {
    _removeElement();
    const backgroundLayer = document.getElementById(_backgroundMap.layerId);
    if (backgroundLayer) {
        backgroundLayer.appendChild(html);
        _backgroundMap.element = html;
    }
}

function _removeElement(): void {
    const backgroundLayer = document.getElementById(_backgroundMap.layerId);
    if (backgroundLayer) {
        if (_backgroundMap.element) {
            backgroundLayer.removeChild(_backgroundMap.element);
        }
    }
}

function _clear(): void {
    const backgroundLayer = document.getElementById(_backgroundMap.layerId);
    if (backgroundLayer) {
        if (_backgroundMap.element) {
            backgroundLayer.removeChild(_backgroundMap.element);
        }
        _backgroundMap.color = _backgroundMap.defaultColor;
        backgroundLayer.style.background = _backgroundMap.color;
    }
}

function _init_background_layout_base(): void {
    _backgroundMap.layerId = `${TianyuShellUIBackgroundPreious}_${guid()}`;
    _backgroundMap.defaultColor = TianyuShellProcessor.getUIConfigures().core.background;
    _backgroundMap.color = _backgroundMap.defaultColor;

    const backgroundLayer = document.createElement("div");
    backgroundLayer.style.zIndex = `${TianyuShellUIBackgroundZIndex}`;
    backgroundLayer.style.background = _backgroundMap.color;
    backgroundLayer.classList.add("tys_basic_layer_styling", "tys_background_layer_styling");
    backgroundLayer.id = _backgroundMap.layerId;
    document.body.appendChild(backgroundLayer);
}

const _background: ITianyuShellCoreUIBackground = {
    setColor: _setColor,
    getColor: _getColor,
    removeColor: _removeColor,
    setElement: _setElement,
    removeElement: _removeElement,
    clear: _clear,
};

export function initTianyuShellCoreUIBackground(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.background) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                ui: {
                    ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                    background: _background,
                },
            },
        };

        _init_background_layout_base();
    }
}
