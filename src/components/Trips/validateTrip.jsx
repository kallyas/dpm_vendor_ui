import * as yup from 'yup';

export const validate =  async (payload) => {
    let schema = yup.object().shape({
        setoff_time: yup.date().min(new Date(), 'Setoff time must be later than now').required(),
        tp_fare: yup.number().positive().integer().required(),
        route_id: yup.number().integer().required(),
        vehicle_id: yup.number().integer().required(),
    });


    try {
        await schema.validate(payload)

    } catch(error) {
        return error.message;
    }
}