const MODAL_TOGGLE = "MODAL_TOGGLE";

const initialState = {
  modalOpen: false,
};

export const modalToggle = (modal) => {
  return {
    type: MODAL_TOGGLE,
    payload: modal,
  };
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_TOGGLE:
      return {
        modalOpen: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
