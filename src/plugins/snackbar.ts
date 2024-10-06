// plugins/snackbar.ts
import { reactive } from 'vue';

interface SnackbarState {
  message: string;
  color: string;
  timeout: number;
}

const state = reactive<SnackbarState>({
  message: '',
  color: 'success',
  timeout: 3000
});

function showSnackbar(message: string, color: string = 'success', timeout: number = 3000) {
    state.message = '';
    setTimeout(() => {
      state.message = message;
      state.color = color;
      state.timeout = timeout;
    }, 0);
}

export function useSnackbar() {
  return {
    state,
    showSnackbar
  };
}