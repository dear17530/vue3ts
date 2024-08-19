import { ref } from 'vue';

export function useDebounce(func: Function, wait: number, immediate = false) {
  const timeout = ref<number | undefined>(undefined);

  const debounced = function (this: any, ...args: any[]) {
    const context = this;

    const later = () => {
      timeout.value = undefined;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout.value;

    if (timeout.value) {
      clearTimeout(timeout.value);
    }

    timeout.value = window.setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };

  return {
    debounced,
  };
}
