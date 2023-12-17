import * as yup from 'yup'

const regex = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{4,15}$/

export const schema = yup.object().shape({
    name: yup.string().min(3, "Too short of a name !!").max(10, "Name too long").required("You mast have a name !!"),
    surname: yup.string().min(3, "Too short of a surname !!").max(15, "Surname too long").required("You mast have a surname !!"),
    age: yup.number().min(4, "You small to of a this site").max(89, "Are you old on this site?").required("You mast have a age !!"),
    password: yup.string().matches(regex, "Worng format").required("You mast have a password !!"),
    email: yup.string().email("plase, enter a valid email"),
})