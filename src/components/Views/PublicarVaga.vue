<script setup lang="ts">
import { ref, computed, getCurrentInstance } from "vue";

const titulo = ref("");
const descricao = ref("");
const salario = ref("");
const modalidade = ref("");
const tipo = ref("");

interface Vaga {
    titulo: string;
    descricao: string;
    salario: number | string;
    modalidade: string;
    tipo: string;
    publicacao: any;
}
//Pegando a instância atual
const instanciaAtual = getCurrentInstance();
// Função para salvar a vaga
const salvarVaga = () => {
    //Validação dos campos
    if (!validarDados()) {
        return;
    }


    const vaga: Vaga = {
        titulo: titulo.value,
        descricao: descricao.value,
        salario: salario.value,
        modalidade: modalidadeVaga.value,
        tipo: tipoVaga.value,
        publicacao: new Date().toLocaleDateString(),
    };

    //Salvando a vaga no localstorage
    const vagas = localStorage.getItem("vagas");
    
    if (vagas) {
        const vagasArray: Vaga[] = JSON.parse(vagas);
        vagasArray.push(vaga);
        localStorage.setItem("vagas", JSON.stringify(vagasArray));
    } else {
        localStorage.setItem("vagas", JSON.stringify([vaga]));
    }

    instanciaAtual?.appContext.config.globalProperties.emitter.emit("exibirAlerta", {exibir: true, mensagem: `Vaga "${titulo.value}" cadastrada com sucesso!`, backgroundColor: "alert-success"});

    //Limpando os campos
    titulo.value = "";
    descricao.value = "";
    salario.value = "";
    modalidade.value = "";
    tipo.value = "";   
};

// Propriedade computada para retornar o tipo da vaga
const tipoVaga = computed(() => {
    switch (tipo.value) {
        case "1":
            return "PJ";
        case "2":
            return "CLT";
        case "3":
            return "Estágio";
        default:
            return "Não informado";
    }
});

//Propriedade computada para retornar a modalidade da vaga
const modalidadeVaga = computed(() => {
    switch (modalidade.value) {
        case "1":
            return "Home Office";
        case "2":
            return "Presencial";
        case "3":
            return "Híbrido";
        default:
            return "Não informado";
    }
});
const validarDados = () => {
    if (!titulo.value) {
        instanciaAtual?.appContext.config.globalProperties.emitter.emit("exibirAlertaNegativo", {exibir: true, mensagem: `Preencha o campo título`, backgroundColor: "alert-danger"});
        return false;
    } 
    if (!descricao.value) {
        instanciaAtual?.appContext.config.globalProperties.emitter.emit("exibirAlertaNegativo", {exibir: true, mensagem: `Preencha o campo descrição`, backgroundColor: "alert-danger"});
        return false;
    }
    if (!salario.value) {
        instanciaAtual?.appContext.config.globalProperties.emitter.emit("exibirAlertaNegativo", {exibir: true, mensagem: `Preencha o campo salário`, backgroundColor: "alert-danger"});
        return false;
    }
    if (!modalidade.value) {
        instanciaAtual?.appContext.config.globalProperties.emitter.emit("exibirAlertaNegativo", {exibir: true, mensagem: `Escolha uma modalidade`, backgroundColor: "alert-danger"});
        return false;
    }
    if (!tipo.value) {
        instanciaAtual?.appContext.config.globalProperties.emitter.emit("exibirAlertaNegativo", {exibir: true, mensagem: `Escolha um tipo de contrato`, backgroundColor: "alert-danger"});
        return false;
    }
    return true;
};

</script>
<template>
    <div class="container py-4 bg-dark text-white border rounded mt-3">
        <div class="row">
            <div class="col">
                <h4>Apresente sua vaga para milhares de profissionais e de graça</h4>
            </div>
        </div>

        <div class="row mt-3 ">
            <div class="col">
                <label class="form-label">Título da Vaga <span id="obrigatorio"></span></label>
                <input type="text" class="form-control" v-model="titulo">
                <div class="form-text">Por exemplo: Programador Javascript e VueJS</div>
            </div>
        </div>

        <div class="row mt-3 ">
            <div class="col">
                <label class="form-label">Descriçao <span id="obrigatorio"></span></label>
                <input type="text" class="form-control" v-model="descricao">
                <div class="form-text">Por exemplo: Informe detalhes e atividades exercidadas</div>
            </div>
        </div>

        <div class="row mt-3 ">
            <div class="col">
                <label class="form-label">Salário <span id="obrigatorio"></span></label>
                <input type="number" class="form-control" v-model="salario">
                <div class="form-text">Por exemplo: Informe o salário</div>
            </div>

            <div class="col">
                <label class="form-label">Modalidade <span id="obrigatorio"></span></label>
                <select class="form-select" v-model="modalidade">
                    <option value="" disabled>Selecione</option>
                    <option value="1">Home Office</option>
                    <option value="2">Presencial</option>
                    <option value="3">Hibrido</option>
                </select>
                <div class="form-text">Por exemplo: Informe onde as atividades serao realizadas</div>
            </div>

            <div class="col">
                <label class="form-label">Tipo <span id="obrigatorio"></span></label>
                <select class="form-select" v-model="tipo">
                    <option value="" disabled>Selecione</option>
                    <option value="1">PJ</option>
                    <option value="2">CLT</option>
                    <option value="3">Estágio</option>
                </select>
                <div class="form-text">Por exemplo: Informe o tipo de contrato</div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col">
                <button type="submit" class="btn btn-primary" @click="salvarVaga()">Cadastrar</button>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "PublicarVaga",
});
</script>

<style scoped>
#obrigatorio {
    color: red;
    content: "*";
}
#obrigatorio::after {
    content: "*";
}
</style>