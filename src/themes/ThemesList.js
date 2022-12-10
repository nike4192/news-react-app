import {List} from "@mui/material";
import ThemesListItem from "./ThemesListItem";

function ThemesList(props) {
  return (
      <List sx={{
          width: '100%',
          maxWidth: 240,
          bgcolor: 'background.paper',
          borderRadius: 2
        }} >
        {props.themes.map(t => <ThemesListItem key={t.name} theme={t} />)}
      </List>
  )
}

export default ThemesList;