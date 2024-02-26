/**@format */

import { Exception } from "@aitianyu.cn/types";
import * as MessageBundle from "../resources/i18n/Message";

export class TianyuUIGenerateNotSupportException extends Exception {
    public constructor(errorString: string) {
        super(errorString);
    }

    public override toString(): string {
        return MessageBundle.getText("EXCEPTION_TIANYU_UI_GENERATE_ELEMENT_TYPE_NOT_SUPPORT", this.message);
    }
}

export class TianyuUIMajorInvalidException extends Exception {
    public constructor(errorString: string) {
        super(errorString);
    }

    public override toString(): string {
        return MessageBundle.getText("EXCEPTION_TIANYU_UI_MAJOR_NOT_VALIABLE", this.message);
    }
}
