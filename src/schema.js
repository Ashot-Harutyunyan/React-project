import * as yup from 'yup'

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,20}$/

export const getValidationSchema = (user) => {
    return yup.object().shape({
        name: yup.string().max(15, 'The name field must contain no more than 15 letters').required('The name field must be filled in'),
        password: yup.string().matches(regex, 'Incorrect password format').required('The password field must be filled in'),
        email: yup.string().email().required('The email field must be filled in').test('email-exists', 'This email is already registered', function (value) {
            return !user.some(({email})=> email === value)
        }),
        phone: yup.number().required('The phone field must be filled in'),
        gender: yup.string().required('Please select an option')
    })
}