import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import {
  mapFetchStudentIdResponse,
  mapFetchStudentsPaginationResponse,
  mapFetchStudentsResponse,
} from "@/domain/studant/studentsDTO";

export const fetchStudents = (page: number) => async (dispatch: Dispatch) => {
  try {
    const url = `api/alunos?page=${page}`;
    const apiResponse = await api.get(url);
    const response = mapFetchStudentsResponse(apiResponse.data.data);
    const responsePagination = mapFetchStudentsPaginationResponse(
      apiResponse.data.data
    );
    dispatch({
      type: actionTypes.SET_STUDENTS_PAGINATION,
      payload: responsePagination,
    });
    dispatch({
      type: actionTypes.SET_STUDENTS,
      payload: response,
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchStudentId = (id: string) => async (dispatch: Dispatch) => {
  try {
    const url = `api/alunos/${id}`;
    const apiResponse = await api.get(url);
    const response = mapFetchStudentIdResponse(apiResponse.data.data);

    if (apiResponse?.data.success) {
      dispatch({
        type: actionTypes.SET_STUDENTS_ID,
        payload: response,
      });

      return {
        ...apiResponse.data,
        data: response,
      };
    } else {
      return {
        ...apiResponse.data,
        data: response,
      };
    }
  } catch (e) {
    console.log(e);
  }
};

export const createStudents = (data: any) => async (dispatch: Dispatch) => {
  try {
    const url = `api/alunos`;
    const apiResponse = await api.post(url, data);
    const response = apiResponse.data;

    if (response.success) {
      dispatch({
        type: actionTypes.CREATE_STUDENTS,
        payload: response,
      });
      return response;
    } else {
      return response;
    }
  } catch (e) {
    console.log(e);
  }
};

export const editStudent =
  ({ id, data }: { id: String; data: any }) =>
    async (dispatch: Dispatch) => {
      try {
        const url = `api/alunos/${id}`;
        const apiResponse = await api.post(url, data);
        const response = apiResponse.data;

        if (response.success) {
          dispatch({
            type: actionTypes.CREATE_STUDENTS,
            payload: response,
          });
          return response;
        } else {
          console.log(response);
          return response;
        }
      } catch (e) {
        console.log(e);
      }
    };

export const deleteStudents =
  (studentId: string) => async (dispatch: Dispatch) => {
    try {
      const url = `api/alunos/${studentId}`;
      const apiResponse = await api.delete(url);
      const response = apiResponse.data;

      if (response.success) {
        dispatch({
          type: actionTypes.DELETE_STUDENTS,
          payload: response,
        });
        return response;
      } else {
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };
