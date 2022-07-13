// form = {
//     username: 'dangthuyenvuong@gmail.com',
//     password: 'abcoi3423'
// }

// rules = {
//     username: [
//         {
//             required: true,
//             message: 'Truong nay khong duoc de trong'
//         },
//         {
//             pattern: 'email',
//             message: 'Truong nay khong dung dinh dang'
//         }
//     ],
//     password: [
//         {
//             required: true
//         },
//         {
//             min: 6, max: 32,
//             message: '...'
//         }
//     ]
// }

const patternModal = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}/, // eslint-disable-line
    url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*[@$!%*?&]))[A-Za-z\d@$!%*?&]{6,}$/,
}

const ERROR_MESSAGE = {
    required: 'Trường này là trường bắt buộc',
    pattern: 'Trường này không đúng định dạng',
    confirm: 'Vui lòng điền giống giá trị bắt buộc'
}

export default function validate(form, rules) {
    let errors = {}
    for (let i in rules) {
        let err

        for (let j in rules[i]) {
            const r = rules[i][j]
            if (r.required) {
                err = validateRequired(form[i], r)
                if(err) break;
            }
            
            if (r.pattern) {
                err = validatePattern(form[i], r)
            }

            if(r.min || r.max) {
                err = validateMinMax(form[i], r)
            }

            if(r.confirm) {
                err = form[i] === form[r.confirm] ? undefined : ERROR_MESSAGE.confirm || r.message
            }
        }

        if (err) {
            errors[i] = err
        }
    }
    return errors
}

const validateRequired = (value, rule) => {
    if (typeof value === 'string' && !value.trim() || typeof value === 'undefined') {
        return rule.message || ERROR_MESSAGE.required
    }
}

const validatePattern = (value, rule) => {
    let pattern = rule.pattern

    if (typeof pattern === 'string' && typeof patternModal[pattern] !== 'undefined') {
        pattern = patternModal[pattern]
    }

    if (pattern instanceof RegExp) {
        if (!pattern.test(value)) {
            return rule.message || ERROR_MESSAGE.pattern
        }
    }
}

const validateMinMax = (value, r) => {
    if(r.min && r.max && (value.length < r.min || value.length > r.max)) return r.message || `Trường này phải nằm từ ${r.min}-${r.max} ký tự`
    if(r.min && value.length < r.min) return r.message || `Trường này không được bé hơn ${r.min} ký tự`
    if(r.max && value.length > r.max) return r.message || `Trường này không được lớn hơn ${r.min} ký tự`
}

export const required = (message) => ({
    required: true,
    message
})

export const pattern = (pattern, message) => ({
    pattern,
    message
})

export const minMax = (min, max, message) => ({
    min, max, message
})