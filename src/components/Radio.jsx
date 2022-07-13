import React, { useId, useState } from 'react'

export default function Radio({ label, value, checked, onChange }) {

    return (
        <label className={`btn btn-sm btn-outline-border ${checked ? 'active' : ''}`}>
            <input type="radio" onChange={onChange} value={value} checked={checked}/> {label}
        </label>
    )
}


Radio.Group = ({ children, label, defaultValue, onChange }) => {
    const id = useId()
    const [selected, setSelected] = useState(defaultValue)

    const _onChange = (ev) => {
        setSelected(ev.target.value)
        onChange?.(ev.target.value)
    }
    return (
        <div className="form-group mb-8">
            <label>{label}</label>
            <div className="btn-group-toggle" data-toggle="buttons">
                {
                    React.Children.map(children, (child) => {
                        const value = child.props.value
                        return React.cloneElement(child,
                            {
                                ...child.props,
                                label: child.props.children,
                                checked: selected === value,
                                onChange: _onChange
                            }
                        )
                    })
                }
            </div>
        </div>
    )
}