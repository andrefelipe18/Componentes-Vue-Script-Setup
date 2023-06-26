<script setup lang="ts">
import { defineProps } from "vue";
import { computed } from "vue";

const props = defineProps({
    titulo: {
        type: String,
        required: true,
    },
    valor: {
        required: true,
    },
    background: {
        type: String,
        default: "bg-dark",
    },
    corTitulo: {
        type: String,
        default: "text-white",
    },
});

const estilo = computed(() => {
    return `h-100 p-5 rounded-3 border ${props.background} ${props.corTitulo}`;
});
</script>

<template>
  <div :class="estilo">
    <p>{{ titulo }}</p>
    <h2>{{ valor }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndicadoresComponent",

});
</script>
