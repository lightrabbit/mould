import { EditorState } from './types'
import { useSelector } from 'react-redux'

export const initialData: EditorState = {
    testWorkspace: {
        id: '1234',
        viewGroups: ['xxxxxx'],
        x: 0,
        y: 0,
    },
    viewGroups: {
        xxxxxx: {
            name: 'Test View Group',
            id: 'xxxxxx',
            x: 500,
            y: 200,
            views: ['a'],
            mouldId: 'testMould',
        },
    },
    views: {
        a: {
            id: 'a',
            width: 300,
            height: 700,
        },
    },
    moulds: {
        testMould: {
            id: 'testMould',
            scope: [],
            input: [],
            states: ['default'],
            tree: {
                type: 'Stack',
                props: {},
            },
        },
    },
}

export const selectedThis = (selection: number[] | undefined, path: number[]) =>
    selection && selection.join('/') === path.join('/')

export const includeSelection = (
    selection: number[] | undefined,
    path: number[]
) => selection && selection.join('/').includes(path.join('/'))

export const selectionInsideThis = (
    selection: number[] | undefined,
    path: number[]
) =>
    selection &&
    !selectedThis(selection, path) &&
    includeSelection(selection, path)

export const useIsCurrentMould = (mouldId: string) => {
    const currentMouldId = useSelector(
        (state: EditorState) => state.currentMouldId
    )

    return currentMouldId === mouldId
}

export const useSelectedThis = (mouldId: string, path: number[]) => {
    const currentMouldId = useSelector(
        (state: EditorState) => state.currentMouldId
    )
    const selectionPath = useSelector((state: EditorState) => state.selection)

    return (
        currentMouldId === mouldId && selectionPath.join('/') === path.join('/')
    )
}

export const useIncludeThis = (mouldId: string, path: number[]) => {
    const currentMouldId = useSelector(
        (state: EditorState) => state.currentMouldId
    )
    const selectionPath = useSelector((state: EditorState) => state.selection)

    return (
        currentMouldId === mouldId &&
        selectionPath.join('/').includes(path.join('/'))
    )
}