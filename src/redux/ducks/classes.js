import { db, collection, getDocs } from "../../firebase";

const initialState = {
  classes: [],
};

const FETCH_CLASSES_REQUEST = "FETCH_CLASSES_REQUEST";
const FETCH_CLASSES_SUCCESS = "FETCH_CLASSES_SUCCESS";

export const fetchClassesSuccess = (classes) => {
  return {
    type: FETCH_CLASSES_SUCCESS,
    payload: classes,
  };
};

export const fetchClasses = () => {
  return async (dispatch) => {
    const querySnapshot = await getDocs(collection(db, "classes"));
    let res = querySnapshot.docs
      .map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      })
      .map((a) => {
        return {
          ...a.data,
          id: a.id,
        };
      });
    dispatch(fetchClassesSuccess(res));
  };
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLASSES_REQUEST:
      return {
        ...state,
      };

    case FETCH_CLASSES_SUCCESS:
      return {
        ...state,
        classes: action.payload,
      };
    default:
      return state;
  }
};
export default classReducer;
