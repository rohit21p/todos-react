import { createMuiTheme } from '@material-ui/core/styles'

let defaultTheme = createMuiTheme({
    palette:{
        common:{
            gunPowder: '#43425D'
        },
        blackSqueeze:{
            main: '#F0F4F9'
        },
        primary: {
            main: '#4949F0'
        },
        secondary: {
            main: '#EDBD00'
        },
        error: {
            main: '#FE5858'
        }
    },
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
        cardHeader: {
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1.5rem'
        },
        counter: {
            fontFamily: 'Montserrat',
            fontWeight: 700,
            fontSize: '2rem'
        },
        sectionHeader: {
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: '1.25rem'
        },
        typeButtonActive: {
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1rem',
            backgroundColor: '#4949F0',
            textTransform: 'none',
            color: '#FFFFFF',
            '&:hover': {
                backgroundColor: '#4949F0',
                color: '#FFFFFF',
            }

        },
        typeButtonInactive: {
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1rem',
            backgroundColor: 'transparent',
            textTransform: 'none',
            color: '#4949F0',
            '&:hover': {
                backgroundColor: 'transparent',
                color: '#4949F0',
            }

        },
        filterButtonActive: {
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1rem',
            backgroundColor: '#9BC5F8',
            textTransform: 'none',
            color: '#FFFFFF',
            '&:hover': {
                backgroundColor: '#9BC5F8',
                color: '#FFFFFF',
            }
        },
        filterButtonInactive: {
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1rem',
            backgroundColor: 'transparent',
            textTransform: 'none',
            color: '#9BC5F8',
            '&:hover': {
                backgroundColor: 'transparent',
                color: '#9BC5F8',
            }
        },
        summaryHeader: {
            textAlign: "center",
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1.5rem',
            backgroundColor: 'transparent',
            textTransform: 'none',
            color: '#919191',
        },
        chartHeader: {
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1.5rem',
            textTransform: 'none',
            color: '#43425D',
        },
        positiveIndicator: {
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1.5rem',
            textTransform: 'none',
            color: '#28AE14',
            textAlign: 'center'
        },
        negativeIndicator: {
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '1.5rem',
            textTransform: 'none',
            color: '#FE5858',
            textAlign: 'center'
        }
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
      counter: {
        fontSize: "2rem",
        [breakpoints.down("lg")]: {
          fontSize: "1.4rem"
        }
      }
    }
  }
}


export default theme;