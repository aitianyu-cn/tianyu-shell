/**@format */

import { ITianyuShell } from "shell-core/src/core/declares/Declare";
import {
    ITianyuShellCoreUITheme,
    ITianyuShellCoreUIMessage,
    ITianyuShellCoreUIStyle,
    ITianyuShellCoreUIDialog,
    ITianyuShellCoreUIBackground,
    ITianyuShellCoreUIMajor,
} from "shell-core/src/core/declares/ui/UserInterface";

export function ThemeBase(): ITianyuShellCoreUITheme {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.theme;
}
export function MessageBase(): ITianyuShellCoreUIMessage {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.message;
}
export function StyleBase(): ITianyuShellCoreUIStyle {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.style;
}
export function DialogBase(): ITianyuShellCoreUIDialog {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.dialog;
}
export function BackgroundBase(): ITianyuShellCoreUIBackground {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.background;
}
export function MajorBase(): ITianyuShellCoreUIMajor {
    return ((window as any).tianyuShell as ITianyuShell).core.ui.major;
}
