/** @format */

import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { StyleHelper } from "../../resources/StyleHelper";
import { ListenerFactor } from "@aitianyu.cn/tianyu-store";
import { MajorListenerExpose } from "../interface/MajorInterfaceExpose";
import { getMajorInstanceId } from "../../tools/InstanceHelper";

function onClassesChanged(
    _oldState:
        | {
              layer: {
                  layerId: string;
                  layerRoot: HTMLElement | null;
              };
              classNames: string[];
          }
        | undefined,
    newState:
        | {
              layer: {
                  layerId: string;
                  layerRoot: HTMLElement | null;
              };
              classNames: string[];
          }
        | undefined,
): void {
    if (!newState?.layer.layerRoot) {
        return;
    }
    newState.layer.layerRoot.classList.remove(...newState.layer.layerRoot.classList.values());
    newState.layer.layerRoot.classList.add(...newState.classNames);
}

function onStylingChanged(
    _oldState:
        | {
              layer: {
                  layerId: string;
                  layerRoot: HTMLElement | null;
              };
              stylings: TianyuUIStyleDeclaration;
          }
        | undefined,
    newState:
        | {
              layer: {
                  layerId: string;
                  layerRoot: HTMLElement | null;
              };
              stylings: TianyuUIStyleDeclaration;
          }
        | undefined,
): void {
    if (!newState?.layer.layerRoot) {
        return;
    }

    newState.layer.layerRoot.style.cssText = "";
    StyleHelper.set(newState.layer.layerRoot, newState.stylings);
}

export const MajorClassesChangedListener = ListenerFactor.createListener(
    MajorListenerExpose.internal._getMajorClassInfo(getMajorInstanceId()),
    onClassesChanged,
);

export const MajorStylingChangedListener = ListenerFactor.createListener(
    MajorListenerExpose.internal._getMajorStylingInfo(getMajorInstanceId()),
    onStylingChanged,
);
