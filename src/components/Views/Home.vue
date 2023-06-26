<script setup lang="ts">
import { FormPesquisarVaga, IndicadoresComponent, ListarVagas, VagaComponent } from "@/components/comuns";
import { ref, onActivated, computed } from "vue";

const usuariosOnline = ref<number>(5);

setInterval(() => {
    usuariosOnline.value = Math.floor(Math.random() * 100);

}, 10000);

// Pegando as vagas do localstorage
interface Vaga {
    titulo: string;
    descricao: string;
    salario: number | string;
    modalidade: string;
    tipo: string;
    publicacao: string | undefined;
}
const vagas = ref<Vaga[]>([]);

onActivated(() => {
  const vagasStorage = localStorage.getItem("vagas");

  if (vagasStorage) {
      vagas.value = JSON.parse(vagasStorage);
  }
});

// Função para filtrar as vagas
const filtrarVagas = (pesquisa: string) => {
    const vagasStorage = localStorage.getItem("vagas");

    if (vagasStorage) {
        const vagasArray: Vaga[] = JSON.parse(vagasStorage);
        vagas.value = vagasArray.filter((vaga) => vaga.titulo.includes(pesquisa));
    }
};

const totalVagas = computed(() => {
    return vagas.value.length;
});
</script>


<template>
    <div class="container py-4">
        <div class="row">
            <div class="col">
                <FormPesquisarVaga @buscarVaga="filtrarVagas($event)"/>
            </div>
        </div>

        <!-- Percorrendo todas as vagas -->
        <ListarVagas :vagas="vagas"/>

        <div class="row mt-5">
            <div class="col-4">
                <IndicadoresComponent titulo="Vagas Abertas" :valor="totalVagas"/>
            </div>
            <div class="col-4">
                <IndicadoresComponent titulo="Profissionais cadastrados" valor="125"/>
            </div>
            <div class="col-4">
                <IndicadoresComponent titulo="Visitantes online" :valor="usuariosOnline" background="bg-light" corTitulo="text-dark"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Home",
});
</script>

<style scoped></style>