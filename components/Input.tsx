import React, { forwardRef } from 'react'
import { ComponentInspector } from '../app/Inspectors'
import { Input } from '@modulz/radix'
import { BaseInput, BaseBox } from './BaseComponents'
import { CSSInspector } from './CSSInspector'
import { Cell, TitledBoard } from '../inspector/FormComponents'
import * as z from 'zod'
import { ComponentPropTypes, zodComponentProps } from '../app/types'

export const inputProps = z
    .object({
        value: z.string().optional(),
        placeholder: z.string().optional(),
    })
    .merge(zodComponentProps)

type PropType = z.TypeOf<typeof inputProps>

export default forwardRef(
    (
        {
            value = 'Input ...',
            placeholder = '',
            requestUpdateProps,
            children,
            path,
            ...rest
        }: ComponentPropTypes & PropType,
        ref
    ) => {
        return (
            <>
                <BaseBox
                    as="input"
                    ref={ref}
                    value={value}
                    placeholder={placeholder}
                    {...rest}
                ></BaseBox>
                {requestUpdateProps && path && (
                    <ComponentInspector path={path}>
                        <TitledBoard title="Text" collspae>
                            <Cell label="Value">
                                <Input
                                    value={value}
                                    placeholder="Input something"
                                    variant="fade"
                                    onChange={e => {
                                        requestUpdateProps({
                                            value: e.target.value,
                                        })
                                    }}
                                ></Input>
                            </Cell>
                            <Cell label="Placeholder">
                                <Input
                                    value={placeholder}
                                    variant="fade"
                                    onChange={e => {
                                        requestUpdateProps({
                                            placeholder: e.target.value,
                                        })
                                    }}
                                ></Input>
                            </Cell>
                        </TitledBoard>

                        <CSSInspector
                            style={rest}
                            requestUpdateProps={requestUpdateProps}
                        ></CSSInspector>
                    </ComponentInspector>
                )}
            </>
        )
    }
)
