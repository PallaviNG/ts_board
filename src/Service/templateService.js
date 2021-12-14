import {
    base_url,
    get,
    post,
    put,
    deleteService,
    commonError,
} from "./httpService";
import { toast } from "react-toastify";

export const getTemplateList = async (url) => {
    try {
        let { data } = await get(base_url + url);
        return data;
    } catch (ex) {
        commonError(ex);
    }
};

export const createNewTemplate = async (url, sendData) => {
    try {
        let { data } = await post(base_url + url, sendData);
        toast.success("Template Saved Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};

export const createNewDynamicComponent = async (url, sendData) => {
    try {
        let { data } = await post(base_url + url, sendData);
        toast.success("Question-Answer Saved Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};

export const removeTemplate = async (url, _id) => {
    try {
        let { data } = await deleteService(base_url + url, { data: { _id } });
        toast.success("Deleted Template Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};
export const removeDynamicComponent = async (url, _id) => {
    try {
        let { data } = await deleteService(base_url + url, { data: { _id } });
        toast.success("Deleted Component Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};

export const getDynamicComponentList = async (url) => {
    try {
        let { data } = await get(base_url + url);
        return data;
    } catch (error) {
        commonError(error);
    }
};

export const updateTemplate = async (url, sendData) => {
    try {
        let { data } = await put(base_url + url, sendData);
        toast.success("Batch Record Updated Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};

export const updateDynamicComponent = async (url, sendData) => {
    try {
        let { data } = await put(base_url + url, sendData);
        toast.success("Updated Question-Answer Successfully.");
        return data;
    } catch (error) {
        commonError(error);
    }
};