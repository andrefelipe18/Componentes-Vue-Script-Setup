<script setup lang="ts">
import { ref, defineEmits } from "vue";

const pesquisa = ref<string>("");

const emmit = defineEmits(["buscarVaga"]);

const buscarVaga = () => {
  emmit("buscarVaga", pesquisa.value);
};
</script>

<template>
    <div class="h-100 p-5 bg-light border rounded-3">
      <h2>Pesquisar Vagas</h2>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="pesquisa">Título da vaga</label>
            <input
              type="text"
              class="form-control"
              id="pesquisa"
              placeholder="Pesquise por palavras chaves, como PHP, Pleno, Ruby"
              v-model="pesquisa"
              @input="buscarVaga()"
            />
            <small class="form-text text-muted"
              >Informe palavras que estajam relacionadas com a vaga</small
            >
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormPesquisarVaga",
});
</script>