/** @format */

import { ActionFactor, Missing, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { CaptureOperationType, ICapturePrintItem, ICaptureRecordItem, ITianyuShellCoreState } from "../State";
import { LogLevel, ObjectHelper } from "@aitianyu.cn/types";
import {
    _GetAllCaptureRecords,
    _GetCaptureBaseTime,
    _GetCaptureRecord,
    _GetClassifyId,
} from "../selectors/CaptureSelector";
import { ConsoleLogAction } from "./ConsoleActions";
import * as MessageBundle from "shell-core/src/core/plugin/i18n/Message";
import { captureNameGenerator, download } from "../../helper/CaptureHelper";

export const CleanCaptureAction = ActionFactor.makeActionCreator<ITianyuShellCoreState>().withReducer(function (state) {
    return StoreUtils.State.getNewState(state, ["capture"], {
        list: [],
        classifies: {},
        time: Date.now(),

        operationKey: 0,
        operationType: "start",
    });
});

export const StartCaptureAction = ActionFactor.makeActionCreator<
    ITianyuShellCoreState,
    {
        guid: string;
        classify: string;
        id: string;
        forceLog?: boolean;
    }
>().withHandler(function* (action) {
    if (!action.params.id || !action.params.classify) {
        return;
    }

    yield* StoreUtils.Handler.doAction(_GenerateNewClassifyAction(action.instanceId, action.params.classify));
    yield* StoreUtils.Handler.doAction(_GenerateOrIncreaseClassifyIdAction(action.instanceId, action.params));

    const cId = yield* StoreUtils.Handler.doSelectorWithThrow(_GetClassifyId(action.instanceId, action.params));
    const listItem: ICaptureRecordItem = {
        guid: action.params.guid,
        classify: action.params.classify,
        id: action.params.id,
        cid: cId,
        start: Date.now(),
        end: -1,
        log: !!action.params.forceLog,
    };

    yield* StoreUtils.Handler.doAction(_AddNewCaptureRecordAction(action.instanceId, listItem));

    const captureMsg = captureNameGenerator(action.params.classify, action.params.id, cId);
    yield* StoreUtils.Handler.doAction(
        ConsoleLogAction(action.instanceId, {
            message: MessageBundle.getText("CONSOLE_CAPTURE_CONTAINER_START", captureMsg),
            level: LogLevel.DEBUG,
            timer: true,
            forceLog: listItem.log,
        }),
    );
    yield* StoreUtils.Handler.doAction(
        _DoCaptureOperationAction(action.instanceId, {
            type: "start",
            message: captureMsg,
        }),
    );
});

export const EndCaptureAction = ActionFactor.makeActionCreator<ITianyuShellCoreState, string>()
    .withHandler(function* (action) {
        const recorder = yield* StoreUtils.Handler.doSelector(_GetCaptureRecord(action.instanceId, action.params));
        if (recorder instanceof Missing || !recorder || recorder.end !== -1) {
            return;
        }

        const endTime = Date.now();

        const captureMsg = captureNameGenerator(recorder.classify, recorder.id, recorder.cid);
        yield* StoreUtils.Handler.doAction(
            ConsoleLogAction(action.instanceId, {
                message: MessageBundle.getText("CONSOLE_CAPTURE_CONTAINER_START", captureMsg),
                level: LogLevel.DEBUG,
                timer: true,
                forceLog: recorder.log,
            }),
        );

        yield* StoreUtils.Handler.doAction(
            _DoCaptureOperationAction(action.instanceId, {
                type: "end",
                message: captureMsg,
            }),
        );

        return {
            end: endTime,
            guid: recorder.guid,
        };
    })
    .withReducer(function (state, recorder) {
        const newState = ObjectHelper.clone(state) as ITianyuShellCoreState;
        if (recorder) {
            for (const item of newState.capture.list) {
                if (item.guid === recorder.guid) {
                    item.end = recorder.end;
                    break;
                }
            }
        }
        return newState;
    });

export const DownloadCaptureAction = ActionFactor.makeActionCreator<ITianyuShellCoreState, string>().withHandler(
    function* (action) {
        const records = yield* StoreUtils.Handler.doSelectorWithThrow(_GetAllCaptureRecords(action.instanceId));
        const baseTime = yield* StoreUtils.Handler.doSelectorWithThrow(_GetCaptureBaseTime(action.instanceId));

        const printList = records.map((rec) => {
            return {
                name: captureNameGenerator(rec.classify, rec.id, rec.cid),
                segments: {
                    start: rec.start,
                    end: rec.end,
                    during: rec.end === -1 ? -1 : rec.end - rec.start,
                },
            } as ICapturePrintItem;
        });

        // use setTimeout to release tianyu-store thread
        setTimeout(() => {
            download(action.params, baseTime, printList);
        }, 0);
    },
);

export const _DoCaptureOperationAction = ActionFactor.makeActionCreator<
    ITianyuShellCoreState,
    {
        type: CaptureOperationType;
        message: string;
    }
>().withReducer(function (state, data) {
    const newState = ObjectHelper.clone(state) as ITianyuShellCoreState;
    newState.capture.operationKey = newState.capture.operationKey + 1;
    newState.capture.operationType = data.type;
    newState.capture.operationMsg = data.message;
    return newState;
});

export const _GenerateNewClassifyAction = ActionFactor.makeActionCreator<ITianyuShellCoreState, string>().withReducer(
    function (state, classify) {
        if (state.capture.classifies[classify]) {
            return state;
        }
        return StoreUtils.State.getNewState(state, ["capture", "classifies"], {
            ...state.capture.classifies,
            [classify]: {},
        });
    },
);

export const _GenerateOrIncreaseClassifyIdAction = ActionFactor.makeActionCreator<
    ITianyuShellCoreState,
    {
        classify: string;
        id: string;
    }
>().withReducer(function (state, data) {
    const newState = ObjectHelper.clone(state) as ITianyuShellCoreState;
    newState.capture.classifies[data.classify][data.id] =
        newState.capture.classifies[data.classify]?.[data.id] !== undefined
            ? newState.capture.classifies[data.classify][data.id] + 1
            : 0;
    return newState;
});

export const _AddNewCaptureRecordAction = ActionFactor.makeActionCreator<
    ITianyuShellCoreState,
    ICaptureRecordItem
>().withReducer(function (state, rec) {
    return StoreUtils.State.getNewState(state, ["capture", "list"], state.capture.list.concat(rec));
});
