<script setup lang="ts">
import type { PropType } from 'vue'
import type { DataRes } from './interface/Data'

const props = defineProps({
  data: {
    type: Object as PropType<DataRes>,
    default: () => {}
  }
})
</script>

<template>
  <div class="card-wrap">
    <span>{{ data.title }}</span>
  </div>
</template>

<style scoped>
.card-wrap {
  height: 300px;
  width: 100px;

  border: 1px solid bisque;
}
</style>
