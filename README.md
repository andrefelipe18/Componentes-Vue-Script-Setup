# VueJS - Projeto de estudo de componentes utilizando script setup e Typescript

## Setup do Projeto

```
npm install
```

### Compila e recarrega para desenvolvimento

```
npm run dev
```

### Compila e minifica para produção

```
npm run build
```

### Estrutura do projeto

Dentro da pasta ./src possui toda a estrutura do projeto, _todo diretório possui um arquivo index.ts que é o arquivo de exportação do diretório, facilitando a importação dos componentes._

- App.vue: Componente principal da aplicação, responsável por carregar os demais componentes

- ./Layouts: Pasta com os componentes de layout da aplicação, sendo eles o Topo(Header), Conteúdo(Content) e Footer(Rodapé)

- ./Comuns: Pasta com os componentes comuns da aplicação(facialitar a reutilização de código)

- ./Views: Pasta com os componentes de visualização da aplicação, sendo eles o Home e PublicarVaga.vue

#### Arquivos Individuais (./src)

- ./main.ts: Arquivo principal da aplicação, responsável por carregar fazer a instanciação do Vue e carregar o componente App.vue

- ./App.vue: Componente principal da aplicação, responsável por carregar os demais componentes

- ./shims-vue.d.ts: Arquivo de configuração do TypeScript

- ./components/: Pasta com os componentes da aplicação

##### Diretório ./components/comuns

- ./components/comuns/: Pasta com os componentes comuns da aplicação(facialitar a reutilização de código)

- - **./components/comuns/FormPesquisa.vue:** Componente de formulário de pesquisa de vagas, utilizado no componente Home.vue

- - **./components/comuns/IndicadoresComponent.vue:** Componente de indicadores(usuarios online, vagas criadas), utilizado no componente Home.vue

- - **./components/comuns/VagaComponent.vue:** Componente de vaga, responsavel por exibir as informações de uma vaga, utilizado no componente ListarVagas.vue

- - **./components/comuns/FormPublicarVaga.vue:** Componente de formulário de publicação de vagas, utilizado no componente PublicarVaga.vue

- - **./components/comuns/Alerta.vue:** Componente de alerta para sucesso ou erro, utilizado no componente App.vue

- - **./components/comuns/ListarVagas.vue:** Componente de listagem de vagas, responsável por renderizar o componente VagaComponent.vue, utilizado no componente Home.vue

##### Diretório ./components/layouts

- ./components/layouts/: Pasta com os componentes de layout da aplicação, sendo eles o Topo(Header), Conteúdo(Content) e Footer(Rodapé)

- - **./components/layouts/Topo.vue:** Componente de cabeçalho da aplicação(navbar), utilizado no componente App.vue

- - **./components/layouts/Conteudo.vue:** Componente de conteúdo da aplicação, responsabilizado por renderizar o Home.vue, utilizado no componente App.vue

- - **./components/layouts/Footer.vue:** Componente de rodapé da aplicação, utilizado no componente App.vue

##### Diretório ./components/views

- ./components/views/: Pasta com os componentes de visualização da aplicação, sendo eles o Home e PublicarVaga.vue

- - **./components/views/Home.vue:** Componente de visualização da página inicial da aplicação, responsável por renderizar os componentes de formulário de pesquisa, indicadores e vagas

- - **./components/views/PublicarVaga.vue:** Componente de visualização da página de publicação de vagas da aplicação, responsável por renderizar o formulário de publicação de vagas

### Responsabilidade de cada componente

- **App.vue:** Componente principal da aplicação, responsável por carregar os componentes de layouts Topo.vue, Conteudo.vue, Footer.vue e os componentes comuns Alerta.vue e VagasFavoritas.vue
- - O bloco de código `let componente = ref("Home"); const redirecionarPara = (evento: string) => { componente.value = evento; }` é responsável por controlar o componente que será renderizado no Conteudo.vue, sendo o componente Home.vue o padrão
- - O Componente App.vue tambem fica responsavel por escutar os eventos globais _exibirAlerta_ e _exibirAlertaNegativo_ com base no retorno da requisição, um alerta de sucesso ou erro é exibido utilizando o componente Alerta.vue, esses eventos fazem uso de uma interface para tipagem dos dados recebidos

- **./Views/Home.vue:** Componente renderizado dinamicamente no Conteudo.vue, responsável por renderizar os componentes comuns FormPesquisarVaga, IndicadoresComponent, ListarVagas, VagaComponent
- - O bloco de código `const usuariosOnline = ref<number>(5); setInterval(() => { usuariosOnline.value = Math.floor(Math.random() \* 100); }, 10000);` serve para simular a atualização dos indicadores de usuários online para um dos IndicadoresComponent.vue
- - Logo em seguida é feito a interface de tipagem dos dados das vagas e dentro do lifecycle *onActivated* é retirado os dados do localStorage e atribuido a variavel vagas
- - Após isso possui o ultimo bloco de código que fica responsavel por fazer a filtragem de vagas com base no texto digitado no campo de pesquisa do FormPesquisarVaga.vue

- **./Views/PublicarVaga.vue:** Componente renderizado dinamicamente no Conteudo.vue, responsável por renderizar todo o processo de publicação de vagas, desde o formulário de publicação até a criação da vaga no localStorage
- - Os primeiros trechos de código sao a definifição das variaveis reativas e a interface de tipagem dos dados da vaga
- - A funçao `salvarVaga` inicialmente chama a funçao `validarDados` que verifica se todos os campos foram preenchidos, caso sim, continua o processo de publicação, caso não, exibe um alerta de erro. Após isso é feito a criação do objeto vaga e a inserção no localStorage depois chama o evento global `exibirAlerta` para exibir um alerta de sucesso e limpa os campos do formulário
- - Possui duas propriedades computadas sendo elas `tipoVaga` e `modalidadeVaga` que são responsáveis por retornar o tipo e modalidade da vaga com base no valor do select

- **./Layouts/Topo.vue:** Componente responsável por renderizar o cabeçalho da aplicação(navbar), responsavel por comandar a renderizaçao dinamica entre Home.vue e PublicarVaga.vue através do evento `navegarPara` que é escutado pelo App.vue

- **./Layouts/Footer.vue:** Componente responsável por renderizar o rodapé da aplicação.

- **./Layouts/Conteudo.vue:** Componente responsável por renderizar o conteúdo da aplicação, responsável por renderizar dinamicamente os componentes Home.vue e PublicarVaga.vue através de prop recebida do componente App.vue

- **./Comuns/Alerta.vue:** Componente responsável por renderizar um alerta de sucesso ou erro, recebe uma propriedade do componente App.vue que define o estado do alerta, possui um slot para receber o conteúdo(mensagem) do alerta

- **./Comuns/FormPesquisarVaga.vue:** Componente responsável por renderizar o formulário de pesquisa de vagas, possui um evento(emitido a cada caracter digitado) que é escutado pelo componente Home.vue para fazer a filtragem das vagas

- **./Comuns/IndicadoresComponent.vue:** Componente responsável por renderizar os indicadores de usuários online(simulado), vagas criadas(quantidade de vagas no localStorage) e visitantes online(simulado), recebe as propriedades de cada indicador do componente Home.vue, possui uma propriedade computada para definir o estilo com base em props recebidas

- **./Comuns/ListarVagas.vue:** Componente responsável por renderizar a listagem de vagas, recebe um array de vagas do componente Home.vue e renderiza o componente VagaComponent.vue para cada vaga

- **./Comuns/VagaComponent.vue:** Componente responsável por renderizar as informações de uma vaga, recebe uma propriedade do componente ListarVagas.vue e renderiza as informações da vaga
- - Possui a propriedade computada `descricaoResumida` que retorna a descrição da vaga com base no tamanho da string, caso seja maior que 100 caracteres, retorna os 100 primeiros caracteres e concatena com "..."
- - Possui a propriedade observadora para a propriedade `favoritada` que é responsavel por enviar um evento global para o componente App.vue VagasFavoritas.vue para adicionar ou remover a vaga do array de vagas favoritas

- **./Comuns/VagasFavoritas.vue:**  Esse componente possui um botao que ao ser clicado, carrega um modal com as vagas favoritas.
- - Possui o lifecycle `onMounted` para escutar os eventos globais `favoritar-vaga` e `desfavoritar-vaga` que são responsáveis por adicionar ou remover a vaga do array de vagas favoritas