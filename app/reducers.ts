import { handleMoveWorkspace, handleZoomWorkspace } from './Workspaces'
import {
    handleSelectComponent,
    handleSelectComponentFromTree,
    handleAddInput,
    handleRemoveInput,
    handleAddScope,
    handleRemoveScope,
    handleModifyScope,
    handleAddState,
    handleRemoveState,
    handleResizeView,
    // handleAddMould,
    handleModifyMouldTree,
    handleWaitingForCreating,
    handleStartCreating,
    handleUpdateCreating,
    handleFinishCreating,
    handleCancelCreating,
    handleDragView,
    handleSortTree,
    handleDeleteNode,
    handleAddKit,
    handleConnectScopeToKit,
    handleModifyInput,
    handleModifyMeta,
    handleModifyStateName,
    handleModifyKit,
    handleDragToView,
} from './appShell'

export default () => [
    handleMoveWorkspace,
    handleZoomWorkspace,
    handleModifyMouldTree,
    handleSelectComponent,
    handleSelectComponentFromTree,
    handleAddInput,
    handleRemoveInput,
    handleAddScope,
    handleRemoveScope,
    handleModifyScope,
    handleAddState,
    handleRemoveState,
    handleResizeView,
    // handleAddMould,
    handleWaitingForCreating,
    handleStartCreating,
    handleUpdateCreating,
    handleFinishCreating,
    handleCancelCreating,
    handleDragView,
    handleSortTree,
    handleDeleteNode,
    handleAddKit,
    handleConnectScopeToKit,
    handleModifyInput,
    handleModifyMeta,
    handleModifyStateName,
    handleModifyKit,
    handleDragToView,
]
