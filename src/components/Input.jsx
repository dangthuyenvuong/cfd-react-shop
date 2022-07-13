import React, { useId } from 'react'
import styled from 'styled-components'

const ErrorMessage = styled.p`
    color: red;
`

export default function Input({ label, placeholder, type = 'text', onChange, error, ...props }) {
    const id = useId()

    return (
        <div className="form-group">
            {
                label && <label htmlFor={id}>
                    {label}
                </label>
            }

            <input {...props} className="form-control form-control-sm" onChange={onChange} id={id} type={type} placeholder={placeholder} />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    )
}
