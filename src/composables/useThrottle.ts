import { ref } from 'vue';

export function useThrottle(func: (...args: any[]) => Promise<void> | void, limit: number) {
  const lastFunc = ref<number | undefined>(undefined);
  const lastRan = ref<number | undefined>(undefined);

  const throttled = async function (this: any, ...args: any[]) {
    const context = this;

    if (!lastRan.value) {
      await func.apply(context, args);
      lastRan.value = Date.now();
    } else {
      if (lastFunc.value) {
        clearTimeout(lastFunc.value);
      }

      lastFunc.value = window.setTimeout(async () => {
        if ((Date.now() - lastRan.value!) >= limit) {
          await func.apply(context, args);
          lastRan.value = Date.now();
        }
      }, limit - (Date.now() - lastRan.value!));
    }
  };

  return {
    throttled,
  };
}