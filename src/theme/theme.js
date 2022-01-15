import { blue, deepPurple } from '@mui/material/colors'
import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      extraLight: deepPurple[100],
      light: deepPurple[300],
      main: deepPurple[600],
      dark: deepPurple[900]
    },
    secondary: {
      extraLight: blue[100],
      light: blue[300],
      main: blue[600]
    }
  }
})

export default theme
