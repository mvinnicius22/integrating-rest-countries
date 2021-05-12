<template>
  <div>
  <toolbar-system @clicked="onBackChild"/>
  <v-container v-show="!viewPais">
    <v-flex d-flex>
      <v-layout wrap>
        <v-flex md4 class="pl-6 pr-6">
          <v-select
              label="Escolha uma opção"
              :items="optionsOne"
              item-text="nome"
              item-value="id"
              v-model="selectOne"
          >
          </v-select>
        </v-flex>
        <v-flex md4 class="pl-6 pr-6">
          <v-select
              v-if="selectOne==1"
              label="Escolha uma região"
              :items="regioes"
              item-text="region"
              item-value="id"
              v-model="regionId"
              @input="getPaisesByRegiao()"
          >
          </v-select>
        </v-flex>
        <v-flex md4 class="pl-6 pr-6 pt-sm-4 pt-xs-0">
          <v-btn elevation="2"
                  color="purple"
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
          <v-card class="card-container">
            <v-img :src="item.flag" height="180px" @click="[getDataPais(item.alpha2Code)]"> </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-pagination
            v-model="page"
            :length="Math.ceil(paises.length/perPage)"
            @input="visiblePages($event)"
            class="pt-4"
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
                        Região: {{pais.region}}
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
          <v-card-text>
            Países vizinhos
          </v-card-text>
        </v-card>
      </v-layout>
      <v-layout row wrap>
        <v-flex d-flex>
          <v-layout wrap>
            <v-flex md4 sm4 class="pl-6 pr-6 pa-4" v-for="item in paisesVizinhosPaginated.slice(0,3)" :key="item.id">
              <v-card class="card-container">
                <v-img :src="item.flag" height="180px"> </v-img>
              </v-card>
            </v-flex>
          </v-layout> 
        </v-flex>
        <v-pagination
            v-model="pageVizinho"
            :length="Math.ceil(paisesVizinhos.length/perPageVizinho)"
            @input="visiblePagesVizinhos($event)"
            class="pt-4"
        >
        </v-pagination>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
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
    methods: {
      onBackChild (value) {
        this.viewPais = value
      },
      async getPaises(){
        await this.axios.get('all?fields=name;flag;region;capital;languages;alpha2Code;currencies').then((res) => {
          this.paises = res.data
          this.paisesPaginated = res.data.slice((this.page - 1)* this.perPage, this.page* this.perPage)
        }).finally(() => {
          this.regioes = this.paises.map((pais) => {
            if(pais){
              return {
                id: pais.region.toLowerCase(),
                region: pais.region
              }
            }
          })
        })
      },
      visiblePages(){
        this.paisesPaginated = this.paises.slice((this.page - 1)* this.perPage, this.page* this.perPage)
      },
      visiblePagesVizinhos(){
        this.paisesVizinhosPaginated = this.paisesVizinhos.slice((this.pageVizinho - 1)* this.perPageVizinho, this.pageVizinho* this.perPageVizinho)
      },
      async getPaisesByRegiao(){
        await this.axios.get(`region/${this.regionId}?fields=name;flag;region;capital;languages;alpha2Code`).then((res) => {
          this.paises = res.data
          this.paisesPaginated = res.data.slice((this.page - 1)* this.perPage, this.page* this.perPage)
        })
      },
      resetVariaveis(){
        this.paisesVizinhos = []
        this.paisesVizinhosPaginated = []
        this.page = 1
        this.pageVizinho = 1
      },
      async getDataPais(alpha){
        await this.axios.get(`alpha/${alpha}?fields=name;flag;region;capital;languages;alpha2Code;population;subregion;borders`).then((res) => {
          this.pais = res.data
          this.resetVariaveis()
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
      getSelectTwo(){
        switch (this.selectOne){
          case 1:
            this.getPaisesByRegiao()
            break;
          case 2:
            this.getPaisesByRegiao()
            break;
          case 3:
            this.getPaisesByRegiao()
            break;
          case 4:
            this.getPaisesByRegiao()
            break;
          case 5:
            this.getPaisesByRegiao()
            break;
          default:
            break
        }
      }
    },
    created() {
      // nao funcionou, descobrir o motivo
      // nova zelandia e noruega de fora
    },
    mounted() {
      this.getPaises()
    }
  }
</script>
