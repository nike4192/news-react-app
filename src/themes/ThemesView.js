import {Box} from "@mui/material";
import ThemesList from "./ThemesList";

function ThemesView(props) {
  const themes = [
    {
      name: 'dark',
      mainColor: 'rgb(25, 25, 25)'
    },
    {
      name: 'light',
      mainColor: 'rgb(206, 240, 227)'
    },
    {
      name: 'blue',
      mainColor: 'rgb(34, 22, 105)'
    },
  ]
  return (
      <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}
        active={props.active?.toString()}>
        <ThemesList themes={themes}/>
      </Box>
  )
}

export default ThemesView;