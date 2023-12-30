import { ref } from "vue";

const useDisclosure = (initialState = false) => {
  const state = ref(initialState);

  const open = () => {
    state.value = true;
  };

  const close = () => {
    state.value = false;
  };

  const toggle = () => {
    state.value = !state.value;
  };

  return { state, open, close, toggle };
};

export default useDisclosure;
