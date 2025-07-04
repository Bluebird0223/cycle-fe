import { server } from "../server";
import {
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
} from "../constants/categoryConstants";
import axios from "axios";
import { getCookie, getCookies } from "cookies-next";
const tokenName = process.env.REACT_APP_ADMIN_TOKENNAME;

// Delete User ---ADMIN
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie(tokenName)}`,
            },
        };

        console.log(server)
        const { data } = await axios.delete(`${server}/api/v1/admin/product/category/delete/${id}`, config);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error?.response?.data?.message,
        });
    }
};
