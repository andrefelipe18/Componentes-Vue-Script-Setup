<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue"; //Ref é para criar variáveis reativas
import { Topo, Conteudo, Footer } from "@/components/Layouts";
import { VagasFavoritas, Alerta } from "@/components/comuns";

let componente = ref("Home");
const redirecionarPara = (evento: string) => {
  componente.value = evento;
}

const exibirAlert = ref(false);
const instanciaAtual = getCurrentInstance();
const mensagem = ref("Mensagem padrao");
const alertType = ref("alert-success");

interface ExibirAlerta {
  exibir: boolean;
  mensagem: string;
  backgroundColor?: string;
}


onMounted(() => {
  instanciaAtual?.appContext.config.globalProperties.emitter.on("exibirAlerta", (exibir: ExibirAlerta) => {
    exibirAlert.value = exibir.exibir;
    mensagem.value = exibir.mensagem;
    alertType.value = exibir.backgroundColor || 'alert-success';

    setTimeout(() => {
      exibirAlert.value = false;
    }, 3000);
  });

  instanciaAtual?.appContext.config.globalProperties.emitter.on("exibirAlertaNegativo", (exibir: ExibirAlerta) => {
    exibirAlert.value = exibir.exibir;
    mensagem.value = exibir.mensagem;
    alertType.value = exibir.backgroundColor || 'alert-danger';

    setTimeout(() => {
      exibirAlert.value = false;
    }, 3000);
  });
});
</script>

<template>
  <div>
    <Alerta v-if="exibirAlert" :alertType="alertType">
      <template v-slot:mensagem>{{ mensagem }}</template>
    </Alerta>
    <VagasFavoritas />
    <Topo @navegar-para="redirecionarPara($event)"/>
    <Conteudo :componente="componente"/>
    <Footer />
  </div>
</template>

<style>

</style>
