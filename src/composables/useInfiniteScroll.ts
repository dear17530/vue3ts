import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export const useInfiniteScroll = (callback: () => Promise<void>) => {
  const observer: Ref<IntersectionObserver | null> = ref(null);
  const target: Ref<HTMLElement | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);

  const createObserver = () => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && !isLoading.value) {
          isLoading.value = true;
          await callback();
          isLoading.value = false;
        }
      });
    });

    if (target.value) {
      observer.value.observe(target.value);
    }
  };

  onMounted(() => {
    createObserver();
  });

  onUnmounted(() => {
    if (observer.value && target.value) {
      observer.value.unobserve(target.value);
    }
  });

  return { target };
};