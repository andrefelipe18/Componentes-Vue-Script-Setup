<script setup lang="ts">
import { defineProps, computed, getCurrentInstance, ref, watch  } from "vue";

const props = defineProps({
  vaga: {
    type: Object,
  },
  titulo: {
    type: String,
  },
  descricao: {
    type: String,
  },
  salario: {
    type: [Number, String],
    default: "Não informado",
  },
  modalidade: {
    type: String,
    default: "Não informado",
  },
  tipo: {
    type: String,
    default: "Não informado",
  },
  publicacao: {
    type: String,
  },
});

const descricaoResumida = computed(() => {
  if(!props.descricao) {
    return "";
  }
  if(props.descricao.length <= 100) {
    return props.descricao;
  }
  return props.descricao.substring(0, 100) + "...";
});

const favoritada = ref(false);

//Pegando a instância atual
const instanciaAtual = getCurrentInstance();

watch(favoritada, (valorAtual) => {
  if (valorAtual) {
    instanciaAtual?.appContext.config.globalProperties.emitter.emit("favoritar-vaga", props.titulo);
  } else {
    instanciaAtual?.appContext.config.globalProperties.emitter.emit("desfavoritar-vaga", props.titulo);
  }
}); 

</script>

<template>
  <div class="card">
    <div class="card-header bg-dark text-white">
      <div class="row">
        <div class="col-6">
          {{ titulo }} --- {{ publicacao }}
        </div>
        <div class="col-6 d-flex justify-content-end">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" v-model="favoritada">
            <label class="form-check-label">
              Favoritar vaga 
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <p>{{ descricaoResumida }}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Salário da vaga: {{ salario }} || Modalidade: {{ modalidade }} || Tipo: {{ tipo }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VagaComponent",
});
</script>
