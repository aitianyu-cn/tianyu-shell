/**@format */

import { Exception } from "@aitianyu.cn/types";
import { getText } from "./i18n/Message";

/**
 * Language Parse Exception
 *
 * the exception will be thrown if the parsed language string is not valid
 */
export class LanguageParseException extends Exception {
    public constructor(errorString: string) {
        super(errorString);
    }

    public override toString(): string {
        return getText("EXCEPTION_LANGUAGE_PARSE", this.message);
    }
}

/**
 * Runtime Not Support Exception
 *
 * the exception will be thrown
 * if the user try to use a feature which is not enabled by Shell configuration
 */
export class RuntimeNotSupportException extends Exception {
    public constructor(errorString: string) {
        super(errorString);
    }

    public override toString(): string {
        return getText("EXCEPTION_RUNTIME_NOT_SUPPORT", this.message);
    }
}
