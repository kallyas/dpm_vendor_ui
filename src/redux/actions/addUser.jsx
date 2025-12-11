import {renewSession, createData, updateData} from './utils'
import {toast} from 'react-toastify'

export const addUser = async (user) => {
    try{
        const data = await createData('/vendor/user/create', user);
        toast(data.data.message);
        return true
    } catch(error) {
        const result = await renewSession(error);
        if(result.status !== 200) {
            toast.error(result.message);
            return false
        } else {
            const data = await createData('/vendor/user/create', user);
            toast(data.data.message);
            return true
        }
    }
}