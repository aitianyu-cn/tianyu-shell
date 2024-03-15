/**@format */

import { Exception } from "@aitianyu.cn/types";
import { ITianyuComponentProperty } from "./model/Component";
import * as MessageBundle from "./i18n/Message";

export class Component<PROP = ITianyuComponentProperty | {}> {
    protected readonly props: PROP;

    public constructor(props?: PROP) {
        this.props = (props || {}) as any;
    }

    protected getValue<T>(key: string): T | undefined {
        return (this.props as any)[key];
    }

    public render(): HTMLElement {
        throw new Exception(MessageBundle.getText("TIANYU_UI_COMPONENT_RENDER_NOT_IMPLEMENT"));
    }
}
