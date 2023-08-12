import { actionTypes } from ".";
import { Dispatch } from "redux";
import api from "@/services/api";
import {
  mapFetchStudentIdResponse,
  mapFetchStudentsPaginationResponse,
  mapFetchStudentsResponse,
} from "@/domain/studant/studentsDTO";
import withAuthHeader from "@/lib/withAuthHeader";

export const fetchStudents = (page: String) => async (dispatch: Dispatch) => {
  try {
    const url = `api/alunos?page=${page}`;
    const apiResponse = await api.get(url, {
      ...withAuthHeader(),
    });
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

export const fetchStudentId = (id: String) => async (dispatch: Dispatch) => {
  try {
    const url = `api/alunos/${id}`;
    const apiResponse = await api.get(url, {
      ...withAuthHeader(),
    });
    const response = mapFetchStudentIdResponse(apiResponse.data.data);

    dispatch({
      type: actionTypes.SET_STUDENTS_ID,
      payload: response,
    });
  } catch (e) {
    console.log(e);
  }
};

export const createStudents = (data: any) => async (dispatch: Dispatch) => {
  try {
    const url = `api/alunos`;
    const apiResponse = await api.post(url, data, {
      ...withAuthHeader(),
    });
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
      const apiResponse = await api.post(url, data, {
        ...withAuthHeader(),
      });
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
  (studentId: String) => async (dispatch: Dispatch) => {
    try {
      const url = `api/alunos/${studentId}`;
      const apiResponse = await api.delete(url, {
        ...withAuthHeader(),
      });
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
