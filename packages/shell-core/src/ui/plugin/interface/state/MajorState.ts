/** @format */

import { IterableType } from "@aitianyu.cn/tianyu-store";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";

export interface IMajorState extends IterableType {
    layerId: string;
    classList: string[];
    styleList: TianyuUIStyleDeclaration;
}
