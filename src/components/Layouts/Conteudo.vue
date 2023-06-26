<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  componente: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <keep-alive>
    <component :is="componente" />
  </keep-alive>
</template>

<script lang="ts">
import { Home, PublicarVaga } from '@/components/Views';
import { defineComponent } from "vue";

export default defineComponent({
  name: "Conteudo",
  components: {
    Home,
    PublicarVaga,
  },
});
</script>