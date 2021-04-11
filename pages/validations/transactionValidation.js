import * as yup from 'yup';

export const userSchema = yup.object().shape({
    cpf: yup.string().required(),
    value: yup.string().required(),
});