import { createMuiTheme } from '@material-ui/core/styles'

let defaultTheme = createMuiTheme({
    // palette:{
    //     common:{
    //         gunPowder: '#43425D'
    //     },
    //     blackSqueeze:{
    //         main: '#F0F4F9'
    //     },
    //     primary: {
    //         main: '#4949F0'
    //     },
    //     secondary: {
    //         main: '#EDBD00'
    //     },
    //     error: {
    //         main: '#FE5858'
    //     }
    // },
    typography: {
        h1:{
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: '1rem',
            color: '#43425D'
        },
        h6:{
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
            color: '#43425D'
        },
        body1: {
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: '1rem',
            color: '#43425D'
        },
        body2:{
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: '0.875rem',
            color: '#43425D'
        },
        subtitle1:{
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: '0.8rem',
            color: '#43425D'
        },
    },
    
})

const { breakpoints, typography: { pxToRem } } = defaultTheme

const theme = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: "1rem",
        [breakpoints.down("lg")]: {
          fontSize: "0.8rem"
        }
      },
      subtitle1: {
        fontSize: "0.8rem",
        [breakpoints.down("lg")]: {
          fontSize: "0.7rem"
        }
      },
      body1: {
        fontSize: "1rem",
        [breakpoints.down("lg")]: {
          fontSize: "0.89rem"
        },
        [breakpoints.down("md")]: {
          fontSize: "0.67rem"
        }
      },
      body2: {
        fontSize: "0.875rem",
        [breakpoints.down("lg")]: {
          fontSize: "0.59rem"
        }
      },
    }
  }
}


export default theme;