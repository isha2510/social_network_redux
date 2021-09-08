//Action Creator
import UserApi from '../API/UserApi';

export const loginAction = ({ email, password }) => {



    return async (dispatch) => {

        console.log("email is this", email)
        try {
            const res = await UserApi.post(`/authenticate`, { email, password }); //return post request response
            dispatch({ type: 'LOGIN_SUCCESS', token: res.data.jwtToken });
        } catch (err) {
            dispatch({ type: 'LOGIN_ERROR', err });
        }

    }

}

export const registerAction = (userData) => {
    return (dispatch, getState) => {
        return UserApi.post(`/register`,  userData )
            .then((res) => {
                dispatch({ type: 'REGISTER_SUCCESS', status: res.status })
            }).catch(err => {
                dispatch({ type: 'REGISTR_ERROR', err })
            });
    }
}


