const INCREMENT = "increment";
const DECREMENT = "decrement";

export const decrement = () => ({
  type: DECREMENT,
});

export const increment = () => {
  return {
    type: INCREMENT,
  };
};

const initialState = {
  count: 0,
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};
export default counter;
