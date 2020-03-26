import { createAction, handleAction } from 'redux-actions'
import {
    EditorState,
    Path,
    View,
    Vector,
    Size,
    Mould,
    Component,
    ID,
    Kit,
} from './types'
import { initialData } from './utils'
import nanoid from 'nanoid'

type SelectComponentAction = { selection: Path }
const SELECT_COMPONENT = 'SELECT_COMPONENT'
export const selectComponent = createAction(SELECT_COMPONENT)
export const handleSelectComponent = handleAction<
    EditorState,
    SelectComponentAction
>(
    SELECT_COMPONENT,
    (state, action) => {
        if (action.payload.selection === state.selection) {
            return state
        }
        state.selection = action.payload.selection

        return state
    },
    initialData
)

type AddInputAction = { mouldId: string; inputKey: string }
const ADD_INPUT = 'ADD_INPUT'
export const addInput = createAction<AddInputAction>(ADD_INPUT)
export const handleAddInput = handleAction<EditorState, AddInputAction>(
    ADD_INPUT,
    (state, action) => {
        state.moulds[action.payload.mouldId].input[action.payload.inputKey] =
            'text'

        return state
    },
    initialData
)

type RemoveInputAction = { mouldId: string; inputKey: string }
const REMOVE_INPUT = 'REMOTE_INPUT'
export const removeInput = createAction<RemoveInputAction>(REMOVE_INPUT)
export const handleRemoveInput = handleAction<EditorState, RemoveInputAction>(
    REMOVE_INPUT,
    (state = initialData, action) => {
        // state.moulds[action.payload.mouldId].input[
        //     action.payload.inputKey
        // ] = undefined
        delete state.moulds[action.payload.mouldId].input[
            action.payload.inputKey
        ]

        return state
    },
    initialData
)

type ModifyInputDescriptionAction = {
    mouldId: string
    inputKey: string
    description: string
}
const MODIFY_INPUT_DESCRIPTION = 'MODIFY_INPUT_DESCRIPTION'
export const modifyInputDescription = createAction<
    ModifyInputDescriptionAction
>(MODIFY_INPUT_DESCRIPTION)
export const handleModifyInputDescription = handleAction<
    EditorState,
    ModifyInputDescriptionAction
>(
    MODIFY_INPUT_DESCRIPTION,
    (state, action) => {
        state.moulds[action.payload.mouldId].input[action.payload.inputKey] =
            action.payload.description

        return state
    },
    initialData
)

type ModifyScopeAction = {
    mouldId: string
    scope: string[]
}
const MODIFY_SCOPE = 'MODIFY_SCOPE'
export const modifyScope = createAction<ModifyScopeAction>(MODIFY_SCOPE)
export const handleModifyScope = handleAction<EditorState, ModifyScopeAction>(
    MODIFY_SCOPE,
    (state, action) => {
        state.moulds[action.payload.mouldId].scope = action.payload.scope

        return state
    },
    initialData
)

type AddScopeAction = {
    mouldId: string
    scope: string
}
const ADD_SCOPE = 'ADD_SCOPE'
export const addScope = createAction<AddScopeAction>(ADD_SCOPE)
export const handleAddScope = handleAction<EditorState, AddScopeAction>(
    ADD_SCOPE,
    (state, action) => {
        state.moulds[action.payload.mouldId].scope.push(action.payload.scope)

        return state
    },
    initialData
)

type RemoveScopeAction = {
    mouldId: string
    scope: string
}
const REMOVE_SCOPE = 'REMOVE_SCOPE'
export const removeScope = createAction<RemoveScopeAction>(REMOVE_SCOPE)
export const handleRemoveScope = handleAction<EditorState, RemoveScopeAction>(
    REMOVE_SCOPE,
    (state, action) => {
        const index = state.moulds[action.payload.mouldId].scope.findIndex(
            (value) => value === action.payload.scope
        )
        if (index !== -1) {
            state.moulds[action.payload.mouldId].scope.splice(index, 1)
        }

        return state
    },
    initialData
)

type AddStateAction = {
    mouldId: string
    state: string
}
const ADD_STATE = 'ADD_STATE'
export const addState = createAction<AddStateAction>(ADD_STATE)
export const handleAddState = handleAction<EditorState, AddStateAction>(
    ADD_STATE,
    (state, action) => {
        state.moulds[action.payload.mouldId].states[action.payload.state] = []
        const view: View = {
            id: nanoid(6),
            mouldId: action.payload.mouldId,
            state: action.payload.state,
            width: 300,
            height: 500,
            x: 100,
            y: 100,
        }
        state.views[view.id] = view

        return state
    },
    initialData
)

type RemoveStateAction = {
    mouldId: string
    state: string
}
const REMOVE_STATE = 'REMOVE_STATE'
export const removeState = createAction<RemoveStateAction>(REMOVE_STATE)
export const handleRemoveState = handleAction<EditorState, RemoveStateAction>(
    REMOVE_STATE,
    (state, action) => {
        const viewId = (<any>Object)
            .values(state.views)
            .find((g) => g.mouldId === action.payload.mouldId).id

        // state.moulds[action.payload.mouldId].states[
        //     action.payload.state
        // ] = undefined
        delete state.moulds[action.payload.mouldId].states[action.payload.state]

        // state.views[viewId] = undefined
        delete state.views[viewId]

        return state
    },
    initialData
)

type ResizeViewAction = {
    viewId: string
} & Size
const RESIZE_VIEW = 'RESIZE_VIEW'
export const resizeView = createAction<ResizeViewAction>(RESIZE_VIEW)
export const handleResizeView = handleAction<EditorState, ResizeViewAction>(
    RESIZE_VIEW,
    (state, action) => {
        const view = state.views[action.payload.viewId]
        view.width = action.payload.width
        view.height = action.payload.height

        return state
    },
    initialData
)

type AddMouldAction = Size & Vector
const ADD_MOULD = 'ADD_MOULD'
export const addMould = createAction<AddMouldAction>(ADD_MOULD)
export const handleAddMould = handleAction<EditorState, AddMouldAction>(
    ADD_MOULD,
    (state, action) => {
        const { width, height, x, y } = action.payload
        const mouldId = nanoid(6)
        const view: View = {
            id: nanoid(6),
            width,
            height,
            x,
            y,
            mouldId,
            state: 'default',
        }
        const mould: Mould = {
            id: mouldId,
            name: `Mould ${Object.values(state.moulds).length + 1}`,
            scope: [],
            kits: [],
            input: [],
            states: {
                default: [],
            },
            rootProps: {},
        }

        state.testWorkspace.views.push(view.id)
        state.views[view.id] = view
        state.moulds[mould.id] = mould

        return state
    },
    initialData
)

type ModifyMouldTreeAction = { id: string; tree: Component; state: string }
const MODIFY_MOULD_TREE = 'MODIFY_MOULD_TREE'
export const modifyMouldTree = createAction<ModifyMouldTreeAction>(
    MODIFY_MOULD_TREE
)
export const handleModifyMouldTree = handleAction<
    EditorState,
    ModifyMouldTreeAction
>(
    MODIFY_MOULD_TREE,
    (state, action) => {
        const mould = state.moulds[action.payload.id]
        mould.states[action.payload.state] = action.payload.tree.children || []
        mould.rootProps = action.payload.tree.props

        return state
    },
    initialData
)

type WaitingForCreatingAction = { mouldId: string; stateName: string }
const WAITING_FOR_CREATING = 'WAITING_FOR_CREATING'
export const waitingForCreating = createAction<WaitingForCreatingAction>(
    WAITING_FOR_CREATING
)
export const handleWaitingForCreating = handleAction<
    EditorState,
    WaitingForCreatingAction
>(
    WAITING_FOR_CREATING,
    (state, { payload: { mouldId, stateName } }) => {
        state.creating = [
            'waiting',
            {
                id: nanoid(6),
                mouldId,
                state: stateName,
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
        ]

        return state
    },
    initialData
)

type StartCreatingAction = Vector
const START_CREATING = 'START_CREATING'
export const startCreating = createAction<StartCreatingAction>(START_CREATING)
export const handleStartCreating = handleAction<
    EditorState,
    StartCreatingAction
>(
    START_CREATING,
    (state, { payload: { x, y } }) => {
        if (state.creating && state.creating[0] === 'waiting') {
            state.creating[0] = 'start'
            state.creating[1].x = x
            state.creating[1].y = y
        }

        return state
    },
    initialData
)

type UpdateCreatingAction = Vector
const UPDATE_CREATING = 'UPDATE_CREATING'
export const updateCreating = createAction<UpdateCreatingAction>(
    UPDATE_CREATING
)
export const handleUpdateCreating = handleAction<
    EditorState,
    UpdateCreatingAction
>(
    UPDATE_CREATING,
    (state, { payload: { x, y } }) => {
        if (
            state.creating &&
            (state.creating[0] === 'start' || state.creating[0] === 'updating')
        ) {
            state.creating[0] = 'updating'
            state.creating[1].width = Math.abs(x - state.creating[1].x)
            state.creating[1].height = Math.abs(y - state.creating[1].y)
            state.creating[1].x = Math.min(x, state.creating[1].x)
            state.creating[1].y = Math.min(y, state.creating[1].y)
        }

        return state
    },
    initialData
)

type FinishCreatingAction = void
const FINISH_CREATING = 'FINISH_CREATING'
export const finishCreating = createAction<FinishCreatingAction>(
    FINISH_CREATING
)
export const handleFinishCreating = handleAction<
    EditorState,
    FinishCreatingAction
>(
    FINISH_CREATING,
    (state) => {
        const [creatingStep, creation] = state.creating || []
        if (
            creatingStep === 'updating' &&
            typeof creation === 'object' &&
            creation.width !== 0 &&
            creation.height !== 0
        ) {
            state.views[creation.id] = creation
            state.testWorkspace.views = [
                ...state.testWorkspace.views,
                creation.id,
            ]
            if (!state.moulds[creation.mouldId]) {
                state.moulds[creation.mouldId] = {
                    id: creation.mouldId,
                    name: `mould ${Object.keys(state.moulds).length}`,
                    scope: [],
                    kits: [],
                    input: [],
                    states: {},
                    rootProps: {},
                }
            }
            state.moulds[creation.mouldId].states[creation.state] = []
        }

        state.creating = undefined
        delete state.creating

        return state
    },
    initialData
)

type CancelCreatingAction = void
const CANCEL_CREATING = 'CANCEL_CREATING'
export const cancelCreating = createAction<CancelCreatingAction>(
    CANCEL_CREATING
)
export const handleCancelCreating = handleAction<
    EditorState,
    CancelCreatingAction
>(
    CANCEL_CREATING,
    (state) => {
        state.creating = undefined
        delete state.creating

        return state
    },
    initialData
)

type DragViewAction = { id: string; x: number; y: number }
const DRAG_VIEW = 'DRAG_VIEW'
export const dragView = createAction<DragViewAction>(DRAG_VIEW)
export const handleDragView = handleAction<EditorState, DragViewAction>(
    DRAG_VIEW,
    (state, { payload: { id, x, y } }) => {
        state.views[id].x = x
        state.views[id].y = y

        return state
    },
    initialData
)

type SortTreeAction = { info: any }
const SORT_TREE = 'SORT_TREE'
export const sortTree = createAction<SortTreeAction>(SORT_TREE)
export const handleSortTree = handleAction<EditorState, SortTreeAction>(
    SORT_TREE,
    (state, { payload: { info } }) => {
        const selection = state.selection
        const moulds = state.moulds
        const selectedTree =
            selection && moulds[selection[0][0]].states[selection[0][1]]

        if (selectedTree && selection) {
            let dropKey = info.node.props.eventKey
            const dragKey = info.dragNode.props.eventKey
            const dropPos = info.node.props.pos.split('-')
            const dropPosition =
                info.dropPosition - Number(dropPos[dropPos.length - 1])

            const loop = (data, key, addPath, callback) => {
                data.forEach((item, index, arr) => {
                    const path = addPath ? `${addPath}-${index}` : `${index}`
                    if (path === key) {
                        callback(item, index, arr)
                        return
                    }
                    if (item.children) {
                        loop(item.children, key, path, callback)
                    }
                })
            }
            const data = selectedTree

            // Find dragObject
            let dragObj
            loop(data, dragKey, '', (item, index, arr) => {
                arr.splice(index, 1)
                dragObj = item
            })

            const l = dragKey.length - 1
            if (parseInt(dragKey[l]) < parseInt(dropKey[l])) {
                const prevStr = dragKey.substring(0, l)
                if (prevStr === dropKey.substring(0, l)) {
                    dropKey =
                        prevStr +
                        (parseInt(dropKey[l]) - 1) +
                        dropKey.substring(l + 1)
                }
            }

            if (!info.dropToGap) {
                // Drop on the content
                loop(data, dropKey, '', (item) => {
                    item.children = item.children || []
                    // where to insert 示例添加到尾部，可以是随意位置
                    const index = item.children.push(dragObj)
                })
            } else if (
                (info.node.props.children || []).length > 0 && // Has children
                info.node.props.expanded && // Is expanded
                dropPosition === 1 // On the bottom gap
            ) {
                loop(data, dropKey, '', (item) => {
                    item.children = item.children || []
                    // where to insert 示例添加到尾部，可以是随意位置
                    item.children.unshift(dragObj)
                })
            } else {
                // Drop on the gap
                let ar
                let i
                loop(data, dropKey, '', (item, index, arr) => {
                    ar = arr
                    i = index
                })
                if (dropPosition === -1) {
                    ar.splice(i, 0, dragObj)
                } else {
                    ar.splice(i + 1, 0, dragObj)
                }
            }

            moulds[selection[0][0]].states[selection[0][1]] = data
            selection[1] = []
        }

        return state
    },
    initialData
)

type HasChildren = {
    children?: HasChildren[]
}

const deleteChildren = (comp: HasChildren, path: number[]) => {
    if (path.length === 1) {
        comp.children!.splice(path[0], 1)
    } else {
        deleteChildren(comp.children![path[0]], path.slice(1))
    }
}

type DeleteNodeAction = void
const DELETE_NODE = 'DELETE_NODE'
export const deleteNode = createAction<DeleteNodeAction>(DELETE_NODE)
export const handleDeleteNode = handleAction<EditorState, DeleteNodeAction>(
    DELETE_NODE,
    (state) => {
        const selection = state.selection
        if (selection) {
            if (selection[1].length) {
                deleteChildren(
                    {
                        children:
                            state.moulds[selection[0][0]].states[
                                selection[0][1]
                            ],
                    },
                    selection[1]
                )
                selection[1] = []
            } else {
                delete state.moulds[selection[0][0]].states[selection[0][1]]
                if (
                    Object.keys(state.moulds[selection[0][0]].states).length ===
                    0
                ) {
                    delete state.moulds[selection[0][0]]
                }
                const view = Object.values(state.views).find(
                    (view) =>
                        view.mouldId === selection[0][0] &&
                        view.state === selection[0][1]
                )
                delete state.views[view!.id]
                const index = state.testWorkspace.views.findIndex(
                    (viewId) => view!.id === viewId
                )
                state.testWorkspace.views.splice(index, 1)
                state.selection = undefined
            }
        }

        return state
    },
    initialData
)

type AddKitAction = { type: string; mouldId: ID; name?: string; param?: object }
const ADD_KIT = 'ADD_KIT'
export const addKit = createAction<AddKitAction>(ADD_KIT)
export const handleAddKit = handleAction<EditorState, AddKitAction>(
    ADD_KIT,
    (state, { payload: { type, mouldId, name, param } }) => {
        const mould = state.moulds[mouldId]
        const kit: Kit = {
            type,
            name: name || `kit ${mould.kits.length}`,
            dataMappingVector: [],
            param,
        }
        mould.kits.push(kit)

        return state
    },
    initialData
)

type ConnectScopeToKit = {
    scope: string
    prop: string
    mouldId: ID
    kitIndex: number
}
const CONNECT_SCOPE_TO_KIT = 'CONNECT_SCOPE_TO_KIT'
export const connectScopeToKit = createAction<ConnectScopeToKit>(
    CONNECT_SCOPE_TO_KIT
)
export const handleConnectScopeToKit = handleAction<
    EditorState,
    ConnectScopeToKit
>(
    CONNECT_SCOPE_TO_KIT,
    (state, { payload: { scope, prop, mouldId, kitIndex } }) => {
        const mould = state.moulds[mouldId]
        const kit = mould.kits[kitIndex]
        kit.dataMappingVector.push([prop, scope])

        return state
    },
    initialData
)

type ModifyInputAction = {
    mouldId: string
    input: string[]
}
const MODIFY_INPUT = 'MODIFY_INPUT'
export const modifyInput = createAction<ModifyInputAction>(MODIFY_INPUT)
export const handleModifyInput = handleAction<EditorState, ModifyInputAction>(
    MODIFY_INPUT,
    (state, action) => {
        state.moulds[action.payload.mouldId].input = action.payload.input

        return state
    },
    initialData
)

type ModifyMetaAction = {
    mouldId: ID
    name?: string
    hookFunctionName?: string
}
const MODIFY_META = 'MOULD_META'
export const modifyMeta = createAction<ModifyMetaAction>(MODIFY_META)
export const handleModifyMeta = handleAction<EditorState, ModifyMetaAction>(
    MODIFY_META,
    (state, { payload: { mouldId, name, hookFunctionName } }) => {
        name && (state.moulds[mouldId].name = name)
        hookFunctionName &&
            (state.moulds[mouldId].hookFunctionName = hookFunctionName)

        return state
    },
    initialData
)

type ModifyKitAction = {
    mouldId: ID
    kitName: string
    [key: string]: any
}
const MODIFY_KIT = 'MODIFY_KIT'
export const modifyKit = createAction<ModifyKitAction>(MODIFY_KIT)
export const handleModifyKit = handleAction<EditorState, ModifyKitAction>(
    MODIFY_KIT,
    (state, { payload: { mouldId, kitName, ...rest } }) => {
        const kit = state.moulds[mouldId].kits.find((k) => k.name === kitName)
        Object.assign(kit, rest)

        return state
    },
    initialData
)
