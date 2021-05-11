<template>
  <div>
  <toolbar-system />
    <v-container>
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
          <v-flex md4 class="pl-6 pr-6 hidden-xs-only">
            <v-select
                v-if="selectOne==1"
                :items="regioes"
                item-text="region"
                item-value="id"
                v-model="regionId"
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
          <v-flex md4 class="pl-6 pr-6 pa-4" v-for="item in paisesPaginated" :key="item.id">
            <v-card class="card-container">
              <v-img :src="item.flag" height="180px"> </v-img>
            </v-card>
          </v-flex>
          <v-pagination
              v-model="page"
              :length="Math.ceil(paises.length/perPage)"
              @input="visiblePages($event)"
              class="pt-4"
          >
          </v-pagination>
        </v-layout>
      </v-flex>
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
      paises: [],
      paisesPaginated: [],
      page: 1,
      perPage: 9,
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
      regionId: null
    }),
    methods: {
      getPaises(){
        this.axios.get('all').then((res) => {
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
      getPaisesByRegiao(){

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
