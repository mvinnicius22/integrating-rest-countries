<template>
  <div>
  <toolbar-system @clicked="onBackChild"/>
  <v-container v-show="!viewPais">
    <v-flex d-flex>
      <v-layout wrap>
        <v-flex md4 sm6 xs12 class="pl-6 pr-6">
          <v-select
                label="Escolha uma opção"
                :items="optionsOne"
                item-text="nome"
                color="purple"
                item-color="purple"
                item-value="id"
                v-model="selectOne"
                @change="option = null"
          >
          </v-select>
        </v-flex>
        <v-flex md4 sm6 xs12 class="pl-6 pr-6">
          <v-select
                v-if="selectOne == 1"
                label="Escolha uma região"
                :items="filteredRegioes"
                item-text="region"
                color="purple"
                item-color="purple"
                item-value="id"
                v-model="regionId"
                @input="option = 1"
          >
          </v-select>
          <v-autocomplete
                v-if="selectOne == 2"
                label="Escolha uma capital"
                :items="capitais"
                item-text="capital"
                color="purple"
                item-color="purple"
                item-value="id"
                v-model="capitalId"
                @input="option = 2"
          >
          </v-autocomplete>
          <v-autocomplete
                v-if="selectOne == 3"
                label="Escolha uma língua"
                :items="linguas"
                item-text="lingua"
                color="purple"
                item-color="purple"
                item-value="id"
                v-model="linguaId"
                @input="option = 3"
          >
          </v-autocomplete>
          <v-autocomplete
                v-if="selectOne == 4"
                label="Escolha um país"
                :items="paisesSelect"
                item-text="pais"
                color="purple"
                item-color="purple"
                item-value="id"
                v-model="paisId"
                @input="option = 4"
          >
          </v-autocomplete>
          <v-select
                v-if="selectOne == 5"
                label="Escolha uma região"
                :items="filteredRegioes"
                item-text="region"
                color="purple"
                item-color="purple"
                item-value="id"
                v-model="regionId"
                @input="option = 5"
          >
          </v-select>
        </v-flex>
        <v-flex md4 :class="{'pesquisarRight': $vuetify.breakpoint.xs}" class="pl-6 pr-6 pt-md-4 pt-sm-0 pt-xs-0">
          <v-btn elevation="2"
                color="purple"
                @click="goFilter()"
                :loading="loadingPesquisar"
                class="white--text"
                id="input-select"
          >
            <span class="white--text pr-4 pl-4">
              Pesquisar
            </span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex d-flex>
      <v-layout wrap>
        <v-flex md4 sm4 class="pl-6 pr-6 pa-4" v-for="item in paisesPaginated" :key="item.id">
          <v-hover v-slot="{ hover }">
            <v-card class="card-container">
              <v-img :class="{ 'on-hover': hover }" 
                    :src="item.flag" 
                    height="180px" 
                    @click="[getDataPais(item.alpha2Code)]"
              >
              </v-img>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-pagination
          v-model="page"
          :length="Math.ceil(paises.length/perPage)"
          @input="visiblePages($event)"
          class="pt-4"
          color="purple"
      >
    </v-pagination>
  </v-container>
  <v-container v-show="viewPais" grid-list-xl class="mt-md-12">
      <v-layout row wrap>
          <v-flex d-flex xs12 sm6 md5>
            <v-card elevation="0">
              <v-img :src="pais.flag" height="100%"> </v-img>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md7>
              <v-flex d-flex>
                <v-layout row wrap>
                    <v-card elevation="0">
                      <v-card-subtitle>
                        Nome: {{pais.name}}
                      </v-card-subtitle>
                      <v-card-subtitle>
                        Capital: {{pais.capital}}
                      </v-card-subtitle>
                      <v-card-subtitle>
                        Região: <span class="linkClickable" @click="[selectOne = 1, option = 1, regionId = pais.region, onBackChild(false), goFilter()]"> {{pais.region}} </span>
                      </v-card-subtitle>
                      <v-card-subtitle>
                        Sub-região: {{pais.subregion}}
                      </v-card-subtitle>
                      <v-card-subtitle>
                        População: {{pais.population}}
                      </v-card-subtitle>
                      <v-card-subtitle>
                        Línguas: 
                        <span v-for="language in pais.languages" :key="language.index">{{language.nativeName}}, </span>
                      </v-card-subtitle>
                    </v-card>
                </v-layout>
              </v-flex>
          </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-card elevation="0" class="mt-md-12">
          <v-card-text v-if="paisesVizinhos.length>0">
            Países vizinhos:
          </v-card-text>
          <v-card-text v-else>
            Não há países vizinhos
          </v-card-text>
        </v-card>
      </v-layout>
      <v-layout row wrap>
        <v-flex d-flex>
          <v-layout wrap>
            <v-flex md4 sm4 v-for="item in paisesVizinhosPaginated.slice(0,3)" :key="item.id">
              <v-hover v-slot="{ hover }">
                <v-card class="card-container">
                  <v-img 
                        :class="{ 'on-hover': hover }" 
                        :src="item.flag" 
                        height="200px" 
                        @click="[getDataPais(item.alpha2Code)]"
                  >
                  </v-img>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout> 
        </v-flex>
      </v-layout>
      <v-layout row wrap 
          class="d-flex 
                justify-center 
                align-center"
      >
        <v-pagination v-if="paisesVizinhos.length>0"
              v-model="pageVizinho"
              :length="Math.ceil(paisesVizinhos.length/perPageVizinho)"
              @input="visiblePagesVizinhos($event)"
              class="pt-4"
              color="purple"
        >
        </v-pagination>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import numeral from 'numeral'
  import ToolbarSystem from '../components/ToolbarSystem'
  export default {
    name: 'Home',
    components: {
      ToolbarSystem,
    },
    data: () => ({
      viewPais: false,
      paises: [],
      paisesPaginated: [],
      paisesVizinhos: [],
      paisesVizinhosPaginated: [],
      page: 1,
      pageVizinho: 1,
      perPage: 12,
      perPageVizinho: 3,
      optionsOne: [
        {
          id: 1,
          nome: 'Região'
        },
        {
          id: 2,
          nome: 'Capital'
        },
        {
          id: 3,
          nome: 'Língua'
        },
        {
          id: 4,
          nome: 'País'
        },
        {
          id: 5,
          nome: 'Código de ligação'
        }
      ],
      selectOne: null,
      regioes: [],
      regionId: null,
      capitais: [],
      capitalId: null,
      linguas: [],
      linguaId: null,
      paisesSelect: [],
      paisId: null,
      option: null,
      loadingPesquisar: false,
      pais: {
        name: null,
        population: null,
        region: null,
        subregion: null,
        languages: null,
        alpha2Code: null,
        flag: null,
        capital: null,
        border: null
      },
    }),
    computed: {
      filteredRegioes(){
          return this.regioes.filter(item => item.id != '')
      }
    },
    methods: {
      onBackChild (value) {
        this.viewPais = value
      },
      async getPaises(){
        await this.axios.get('all?fields=name;flag;region;capital;languages;alpha2Code;currencies;population;subregion;borders').then((res) => {
          this.paises = res.data
          this.paisesPaginated = res.data.slice((this.page - 1)* this.perPage, this.page* this.perPage)
        }).finally(() => {
          this.getRegioes()
          this.getCapitais()
          this.getLinguas()
          this.getPaisesForSelect()
        })
      },
      getRegioes(){
        this.regioes = this.paises.map((pais) => {
          if(pais){
            return {
              id: pais.region,
              region: pais.region
            }
          }
        })
      },
      getCapitais(){
        this.capitais = this.paises.map((pais) => {
          if(pais){
            return {
              id: pais.capital,
              capital: pais.capital
            }
          }
        })
      },
      getLinguas(){
        this.linguas = this.paises.map((pais) => {
          for(var i = 0; i < pais.languages.length; i++){
            if(pais){
              return {
                id: pais.languages[i].iso639_1,
                lingua: pais.languages[i].nativeName
              }
            }
          }
        })
      },
      getPaisesForSelect(){
        this.paisesSelect = this.paises.map((pais) => {
          if(pais){
            return {
              id: pais.alpha2Code,
              pais: pais.name
            }
          }
        })
      },
      goFilter(){
        if(this.option != null){
          this.loadingPesquisar = true
          switch (this.option){
            case 1:     this.getPaisesByRegiao();      break;
            case 2:     this.getPaisesByCapital();      break;
            case 3:     this.getPaisesByLanguage();      break;
            case 4:     this.getPaisesById();       break;
            case 5:     this.getPaisesByRegiao();      break;
            default:
              break
          }
          this.resetVariaveis()
        }else{
          var inputSelect = document.getElementById("input-select");
          inputSelect.classList.add("bounce");
          setTimeout(function() {
            inputSelect.classList.remove("bounce");
          }, 1000); 
        }
      },
      visiblePages(){
        this.paisesPaginated = this.paises.slice((this.page - 1)* this.perPage, this.page* this.perPage)
        this.loadingPesquisar = false
      },
      visiblePagesVizinhos(){
        this.paisesVizinhosPaginated = this.paisesVizinhos.slice((this.pageVizinho - 1)* this.perPageVizinho, this.pageVizinho* this.perPageVizinho)
      },
      async getPaisesByRegiao(){
        await this.axios.get(`region/${this.regionId}?fields=name;flag;region;capital;languages;alpha2Code;population;subregion;borders`).then((res) => {
          this.paises = res.data
          this.visiblePages()
        })
      },
      async getPaisesByCapital(){
        await this.axios.get(`capital/${this.capitalId}?fields=name;flag;region;capital;languages;alpha2Code;population;subregion;borders`).then((res) => {
          this.paises = res.data
          this.visiblePages()
        })
      },
      async getPaisesByLanguage(){
        await this.axios.get(`lang/${this.linguaId}?fields=name;flag;region;capital;languages;alpha2Code;population;subregion;borders`).then((res) => {
          this.paises = res.data
          this.visiblePages()
        })
      },
      async getPaisesById(){
        await this.axios.get(`alpha/${this.paisId}?fields=name;flag;region;capital;languages;alpha2Code;population;subregion;borders`).then((res) => {
          this.paises = []
          this.paises.push(res.data)
          this.visiblePages()
        })
      },
      resetVariaveis(){
        this.paisesVizinhos = []
        this.paisesVizinhosPaginated = []
        this.page = 1
        this.pageVizinho = 1
      },
      async getDataPais(alpha){
        this.resetVariaveis()
        await this.axios.get(`alpha/${alpha}?fields=name;flag;region;capital;languages;alpha2Code;population;subregion;borders`).then((res) => {
          this.pais = res.data
          this.pais.population = numeral(this.pais.population).format('0.0a');
          for(var i = 0; i < res.data.borders.length; i++){
            this.axios.get(`alpha/${res.data.borders[i]}?fields=alpha2Code;flag`).then((response) => {
              this.paisesVizinhos.push({
                alpha2Code: response.data.alpha2Code,
                flag: response.data.flag
              })
            })
          }
        }).finally(() => {
          this.paisesVizinhosPaginated = this.paisesVizinhos
          this.viewPais = true
        })
      },
    },
    created() {
      // nova zelandia e noruega de fora
    },
    mounted() {
      this.getPaises()
    }
  }
</script>
<style scoped>
.v-card .on-hover {
  transition: opacity .4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 1;
 }
.v-card:hover .on-hover{
   opacity: 0.7;
   cursor: pointer;
 }
.linkClickable {
  color: purple;
  text-decoration: underline;
  text-decoration-color: purple;
}
.linkClickable:hover {
  cursor: pointer;
}
.bounce {
  outline: 0;
  animation-name: bounce;
  animation-duration: .5s;
}
@keyframes bounce {
  0% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
  37% {
    transform: translateX(5px);
    timing-function: ease-out;
  }
  55% {
    transform: translateX(-5px);
    timing-function: ease-in;
  }
  73% {
    transform: translateX(4px);
    timing-function: ease-out;
  }
  82% {
    transform: translateX(-4px);
    timing-function: ease-in;
  }
  91% {
    transform: translateX(2px);
    timing-function: ease-out;
  }
  96% {
    transform: translateX(-2px);
    timing-function: ease-in;
  }
  100% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
}
.pesquisarRight{
  text-align: right;
}
</style>
