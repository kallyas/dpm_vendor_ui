import * as yup from 'yup';

export const createUserPayloadValidator =  async (payload) => {
    let schema = yup.object().shape({
        first_name: yup.string().min(3).required(),
        last_name: yup.string().min(3).required(),
        email: yup.string().required(),
        phone_number: yup.string().min(10).required(),
        password: yup.string().min(8)
    });


    try {
        await schema.validate(payload)

    } catch(error) {
        return error.message;
    }
}