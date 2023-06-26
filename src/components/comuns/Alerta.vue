<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
    alertType: {
        type: String,
        default: "alert-success",
    },
});

const estilo = computed(() => {
    return `alert ${props.alertType}`;
});
</script>

<template>
    <div :class="estilo" role="alert">
        <slot name="mensagem"></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Alerta",
});
</script>