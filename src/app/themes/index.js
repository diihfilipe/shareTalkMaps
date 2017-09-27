import { getMuiTheme } from 'material-ui/styles' // o metodo que lida com essa estilização

import { deepPurple600 } from 'material-ui/styles/colors' // nossa cor diferente da cor padrão

export const muiTheme = getMuiTheme({
  appBar: {
    color: deepPurple600
  }
})