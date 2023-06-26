<script setup lang="ts">
import { defineProps } from "vue";
import { VagaComponent } from "@/components/comuns";

const props = defineProps({
    vagas: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="row mt-5" v-for="(vaga, index) in vagas" :key="index">
        <div class="col">
            <VagaComponent v-bind="vaga"></VagaComponent>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ListarVagas",
});
</script>