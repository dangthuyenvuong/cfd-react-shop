import React, { useState } from 'react'
import Input from '../components/Input'
import validate, { minMax, pattern, required } from '../utils/validate'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin, fetchRegister } from '../stores/auth'
import styled from 'styled-components'
import { ACCOUNT_PATH } from '../constants/path'
import { Navigate } from 'react-router-dom'
import Button from '../components/Button'
const ErrorMessage = styled.div`
    color: red;
`

export default function Auth() {
    const [formLogin] = useState({})
    const { user } = useSelector(store => store.user)
    // const { loadingLogin } = useSelector(store => store.auth)

    const [loadingLogin, setLoadingLogin] = useState(false)
    const [errorLogin, setErrorLogin] = useState({})
    const [errorLoginMessage, setErrorLoginMessage] = useState('')



    const [formRegister] = useState({})
    const [errorRegister, setErrorRegister] = useState({})
    const [errorRegisterMessage, setErrorRegisterMessage] = useState('')

    const dispatch = useDispatch()


    const onSubmitLogin = (ev) => {
        ev.preventDefault()
        const error = validate(formLogin, {
            username: [
                required('Email là bắt buộc'),
                pattern('email', 'Vui lòng nhập đúng định dạng email')
            ],
            password: [
                required('Mật khẩu là bắt buộc'),
                minMax(6, 32, 'Mật khẩu phải nằm trong khoảng 6-32 ký tự')
            ]
        })
        setErrorLogin(error)
        if (Object.keys(error).length === 0) {
            setErrorLoginMessage('')
            setLoadingLogin(true)
            dispatch(fetchLogin({
                data: formLogin,
                error: (error) => {
                    setErrorLoginMessage(error.message)
                },
                success: () => { },
                finally: () => {
                    setLoadingLogin(false)
                }
            }))
        }
    }


    const onSubmitRegister = (ev) => {
        ev.preventDefault()
        const error = validate(formRegister, {
            name: [
                required('Họ và tên là trường bắt buộc')
            ],
            username: [
                required('Email là bắt buộc'),
                pattern('email', 'Vui lòng nhập đúng định dạng email')
            ],
            password: [
                required('Mật khẩu là bắt buộc'),
                minMax(6, 32, 'Mật khẩu phải nằm trong khoảng 6-32 ký tự')
            ],
            confirmPassword: [
                {
                    confirm: 'password',
                    message: 'Vui lòng điền giống password'
                }
            ]
        })
        setErrorRegister(error)

        if (Object.keys(error).length === 0) {
            dispatch(fetchRegister({
                data: formRegister,
                success: () => {
                    dispatch(fetchLogin({
                        data: {
                            username: formRegister.username,
                            password: formRegister.password
                        },
                    }))
                },
                error: (error) => {
                    setErrorRegisterMessage(error.error)
                }
            }))
        }


    }

    if (user) return <Navigate to={ACCOUNT_PATH} />

    return (
        <section className="py-12">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        {/* Card */}
                        <div className="card card-lg mb-10 mb-md-0">
                            <div className="card-body">
                                {/* Heading */}
                                <h6 className="mb-7">Returning Customer</h6>
                                {/* Form */}
                                {
                                    errorLoginMessage && <ErrorMessage>{errorLoginMessage}</ErrorMessage>
                                }
                                <form onSubmit={onSubmitLogin}>
                                    <div className="row">
                                        <div className="col-12">
                                            {/* Email */}
                                            <Input
                                                placeholder="Email Address*"
                                                onChange={ev => formLogin.username = ev.target.value}
                                                error={errorLogin.username}
                                            />
                                        </div>
                                        <div className="col-12">
                                            {/* Password */}
                                            <Input
                                                placeholder="Passowrd *"
                                                type="password"
                                                onChange={ev => formLogin.password = ev.target.value}
                                                error={errorLogin.password}

                                            />
                                        </div>
                                        <div className="col-12 col-md">
                                            {/* Remember */}
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input" id="loginRemember" type="checkbox" />
                                                    <label className="custom-control-label" htmlFor="loginRemember">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-auto">
                                            {/* Link */}
                                            <div className="form-group">
                                                <a className="font-size-sm text-reset" data-toggle="modal" href="#modalPasswordReset">Forgot
                                                    Password?</a>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Button */}
                                            <Button loading={loadingLogin} type="submit">
                                                Sign In
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        {/* Card */}
                        <div className="card card-lg">
                            <div className="card-body">
                                {/* Heading */}
                                <h6 className="mb-7">New Customer</h6>
                                {/* Form */}
                                {
                                    errorRegisterMessage && <ErrorMessage>{errorRegisterMessage}</ErrorMessage>
                                }
                                <form onSubmit={onSubmitRegister}>
                                    <div className="row">
                                        <div className="col-12">
                                            {/* Email */}
                                            <Input
                                                placeholder="Full Name *"
                                                onChange={ev => formRegister.name = ev.target.value}
                                                error={errorRegister.name}
                                            />
                                        </div>
                                        <div className="col-12">
                                            {/* Email */}
                                            <Input
                                                placeholder="Email Address *"
                                                onChange={ev => formRegister.username = ev.target.value}
                                                error={errorRegister.username}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            {/* Password */}
                                            <Input
                                                placeholder="Passowrd *"
                                                type="password"
                                                onChange={ev => formRegister.password = ev.target.value}
                                                error={errorRegister.password}

                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            {/* Password */}
                                            <Input
                                                placeholder="Confirm Passowrd *"
                                                type="password"
                                                onChange={ev => formRegister.confirmPassword = ev.target.value}
                                                error={errorRegister.confirmPassword}

                                            />
                                        </div>
                                        <div className="col-12 col-md-auto">
                                            {/* Link */}
                                            <div className="form-group font-size-sm text-muted">
                                                By registering your details, you agree with our Terms &amp; Conditions,
                                                and Privacy and Cookie Policy.
                                            </div>
                                        </div>
                                        <div className="col-12 col-md">
                                            {/* Newsletter */}
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input className="custom-control-input" id="registerNewsletter" type="checkbox" />
                                                    <label className="custom-control-label" htmlFor="registerNewsletter">
                                                        Sign me up for the Newsletter!
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Button */}
                                            <Button type="submit">
                                                Register
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
