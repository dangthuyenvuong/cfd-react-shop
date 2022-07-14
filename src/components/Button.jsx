import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';


const ButtonRoot = styled.button`
    display: flex;
    align-items: center;
    &:disabled {
        cursor: auto;
    }
`

export default function Button({ loading, children, ...props }) {
    return (
        <ButtonRoot className="btn btn-sm btn-dark" {...props} disabled={loading}>
            {loading && <LoadingOutlined style={{ fontSize: 15, marginRight: 7 }} spin />}
            {children}
        </ButtonRoot>
    )
}
