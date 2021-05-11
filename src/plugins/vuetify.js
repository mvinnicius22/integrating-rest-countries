import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/lib/locale/pt';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { pt },
      current: 'pt',
    },
  icons: {
    iconfont: 'md',
  },
});
