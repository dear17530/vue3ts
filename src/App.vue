<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataCard from './components/DataCard.vue'
import axios from 'axios'
import type { DataRes } from './components/interface/Data'
import { useDebounce } from '@/composables/useDebounce'
import { useThrottle } from '@/composables/useThrottle'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'

const data = ref<DataRes[]>([])
const keyword = ref<string>('')

const getList = (): void => {
  axios.get('https://fakestoreapi.com/products?limit=10').then((response: { data: any }) => {
    data.value = response.data
  })
}

const search = (e: string) => {
  console.log('search', e)
}

const { debounced: debouncedSearch } = useDebounce(search, 500)

const loadMoreItem = () => {
  axios.get('https://fakestoreapi.com/products?limit=10').then((response: { data: any }) => {
    data.value = [...data.value, ...response.data]
  })
}

const { throttled: throttledLoadMore } = useThrottle(loadMoreItem, 500)
const { target } = useInfiniteScroll(throttledLoadMore)

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  debouncedSearch(target.value)
}

onMounted(() => {
  getList()
})
</script>

<template>
  <main>
    <input :value="keyword" @input="handleChange" type="text" />
    <div class="cards">
      <DataCard v-for="item in data" :key="item.id" :data="item" />
    </div>
    <div ref="target">_</div>
  </main>
</template>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
