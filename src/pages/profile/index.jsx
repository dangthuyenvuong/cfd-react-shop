import Input from '../../components/Input'
import { DatePicker, message } from 'antd'
import Radio from '../../components/Radio'
import validate, { minMax, required } from '../../utils/validate'
import { useMemo, useState } from 'react'
import userService from '../../services/user'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '../../stores/user'
import { useSelector } from 'react-redux'
import moment from 'moment'







// 1. Validate các field
// 2. Gọi api cập nhật data
// 3. Check thay đổi password
//     1. Kiểm tra nếu có điền password thì phải validate luôn confirmPassword
//     2. Gọi api change-password
// 4. Gọi api lấy data user lại để set vào redux



export default function Profile() {
    const { user } = useSelector(store => store.user)

    const [form] = useState(user)
    const [error, setError] = useState({})

    const dispatch = useDispatch()

    const onSubmit = async (ev) => {
        ev.preventDefault()

        const rule = {
            name: [
                required()
            ],
        }

        if (form.oldPassword) {
            rule.oldPassword = [
                minMax(6, 32)
            ]
            rule.newPassword = [
                required(),
                () => form.oldPassword === form.newPassword ? 'Mật khẩu mới không được giống mật khẩu cũ' : undefined
            ]
        }
        const error = validate(form, rule)
        setError(error)
        if (Object.keys(error).length === 0) {
            userService.updateInfo(form).then((res) => {
                if (res.updateCount) {
                    message.success('Cập nhật thông tin thành công')
                    dispatch(getUserInfo())
                }
            })

            if (form.oldPassword) {
                userService.changePassword({
                    "newPassword": form.newPassword,
                    "oldPassword": form.oldPassword
                }).then(res => {
                    if (res.error) {
                        message.error(res.error)
                    } else {
                        message.success('Thay đổi mật khẩu thành công')
                    }
                })

            }
        }
    }

    const birthday = useMemo(() => moment(form.birthday), [form.birthday])
    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-12 col-md-12">
                    {/* Email */}
                    <Input
                        label="Full Name *"
                        placeholder="Full Name *"
                        error={error.name}
                        onChange={(ev) => form.name = ev.target.value}
                        defaultValue={form.name}
                    />
                </div>
                <div className="col-12">
                    {/* Email */}
                    <Input
                        label="Email Address *"
                        placeholder="Email Address *"
                        disabled
                        defaultValue={form.email}

                    />
                </div>
                <div className="col-12 col-md-6">
                    {/* Password */}
                    <Input
                        label="Current Password"
                        placeholder="Current Password"
                        type='password'
                        error={error.oldPassword}
                        onChange={(ev) => form.oldPassword = ev.target.value}

                    />
                </div>
                <div className="col-12 col-md-6">
                    {/* Password */}
                    <Input
                        label="New Password"
                        placeholder="New Password"
                        type='password'
                        error={error.newPassword}
                        onChange={(ev) => form.newPassword = ev.target.value}
                    />
                </div>
                <div className="col-12 col-lg-6">
                    {/* Birthday */}
                    <div className="form-group">
                        {/* Label */}
                        <label>Date of Birth</label>
                        <br />
                        {/* Inputs */}
                        <DatePicker
                            format="DD/MM/YYYY"
                            defaultValue={birthday.isValid() ? birthday : null}
                            onChange={(date) => form.birthday = date.valueOf()}
                            style={{ width: '100%', height: 50.5 }}
                            disabledDate={(date) => date.valueOf() > moment().valueOf()}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    {/* Gender */}
                    <Radio.Group
                        label="Gender"
                        defaultValue={form.gender || 'male'}
                        onChange={(ev) => form.gender = ev}
                    >
                        <Radio value="male" defaultChecked>Male</Radio>
                        <Radio value="female">Female</Radio>
                    </Radio.Group>
                    {/* <div className="form-group mb-8">
                        <label>Gender</label>
                        <div className="btn-group-toggle" data-toggle="buttons">
                            <label className="btn btn-sm btn-outline-border active">
                                <input type="radio" name="gender" defaultChecked /> Male
                            </label>
                            <label className="btn btn-sm btn-outline-border">
                                <input type="radio" name="gender" /> Female
                            </label>
                        </div>
                    </div> */}
                </div>
                <div className="col-12">
                    {/* Button */}
                    <button className="btn btn-dark" type="submit">Save Changes</button>
                </div>
            </div>
        </form>
    )
}
