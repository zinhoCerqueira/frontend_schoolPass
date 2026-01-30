// src/plugins/vuetify.js

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'


// Vuetify
import { createVuetify } from 'vuetify'

const lightTheme = {
  dark: false,
  colors: {
    primary:            '#021024', // Azul principal para confiança e cuidado
    secondary:          '#7DA0CA', // Azul secundário para elementos interativos
    'primary-darken-1': '#2C668D', // Para hover/elementos mais fortes
    accent:             '#6AC390', // Verde de destaque para CTAs primários
    background:         '#F8F9FA', // Cinza quase branco para o fundo
    surface:            '#FFFFFF', // Branco para superfícies de cartão/modais
    error:              '#B00020',
    info:               '#2196F3',
    success:            '#6AC390', // Mantendo success para compatibilidade, mas usando 'accent' para CTAs
    warning:            '#FB8C00',
    'text-primary':     '#212529', // Preto para títulos
    'text-secondary':   '#6C757D', // Cinza médio para textos secundários
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
    }
  }
})

