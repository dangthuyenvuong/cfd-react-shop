import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSearchValue } from '../hooks/useSearchValue'
import { cn } from '../utils/cn'
const Context = createContext()

export default function Tab({ children, defaultActive = 0, name }) {
    const titleLength = useRef(-1)
    const contentLength = useRef(-1)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const searchParam = useSearchValue()

    const [indexActive, setIndexActive] = useState(() => {
        if(name) {
            return searchParam.get(name) || defaultActive
        }

        return defaultActive
    })

    useEffect(() => {
        if (name) {
            navigate(pathname +`?${name}=${indexActive}`)
        }
    }, [name, indexActive])

    const registerTabTitle = () => {
        titleLength.current += 1
        return titleLength.current
    }

    const registerTabContent = () => {
        contentLength.current += 1
        return contentLength.current
    }

    return (
        <Context.Provider value={{ indexActive, setIndexActive, registerTabTitle, registerTabContent }}>{children}</Context.Provider>
    )
}

const useTab = () => useContext(Context)

const useRegisterTab = () => {
    const { registerTabTitle } = useTab()
    return useMemo(() => registerTabTitle(), [])
}


const useRegisterTabContent = () => {
    const { registerTabContent } = useTab()
    return useMemo(() => registerTabContent(), [])
}

Tab.Title = ({ children, value }) => {
    const { setIndexActive, indexActive } = useTab()
    const index = useRegisterTab()
    const _index = value || index
    const onClick = (ev) => {
        ev.preventDefault()
        setIndexActive(_index)
    }
    return (
        <a className={cn('nav-link', { active: _index == indexActive })} data-toggle="tab" onClick={onClick}>{children}</a>
    )
}

Tab.Content = ({ children, value }) => {
    const { indexActive } = useTab()
    const index = useRegisterTabContent()
    const _index = value || index
    const ref = useRef()



    setTimeout(() => {
        ref.current.classList.add('show')
    })

    return (
        <div ref={ref} className={cn('tab-pane fade', {
            active: _index == indexActive
        })} id="descriptionTab">
            {children}
        </div>
    )
}