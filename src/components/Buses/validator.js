import * as yup from 'yup';

export const createVehiclePayloadValidator =  async (payload) => {
    let schema = yup.object().shape({
        capacity: yup.number().integer().required(),
        number_plate: yup.string().min(7).required(),
    });


    try {
        await schema.validate(payload)

    } catch(error) {
        return error.message;
    }
}