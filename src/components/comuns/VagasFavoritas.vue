<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue';


const vagasFavoritas = ref<string[]>([]);
const instanciaAtual = getCurrentInstance();

//Escutando o evento global
onMounted(() => {
    //Verificando se tem algum evento global acontecendo

    instanciaAtual?.appContext.config.globalProperties.emitter.on("favoritar-vaga", (titulo: string) => {
        vagasFavoritas.value.push(titulo);
    });

    instanciaAtual?.appContext.config.globalProperties.emitter.on("desfavoritar-vaga", (titulo: string) => {
        vagasFavoritas.value = vagasFavoritas.value.filter((vaga: string) => vaga !== titulo);
    });
});


</script>

<template>
    <div>
        <div class="botao-offcanvas">
            <button class="btn btn-dark text-white" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Vagas Favoritadas</button>
        </div>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Vagas Favoritadas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="card mt-2" v-for="(vaga) in vagasFavoritas" :key="vaga">
                    <div class="card-header bg-dark text-white rounded-2">
                        <div class="row">
                            <div class="col-6">
                                {{ vaga }} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'VagasFavoritas',
})
</script>
<style scoped>
.botao-offcanvas {
    position: absolute;
    z-index: 1;
    top: 70px;
    right: 5px;
}
</style>