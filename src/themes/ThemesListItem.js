import {Box, ListItemButton, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchTheme, selectCurrentTheme} from "../store/themes";
import CheckIcon from '@mui/icons-material/Check';
import "./ThemesListItem.css";

function ThemesListItem(props) {
  const theme = props.theme;
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(fetchTheme(theme.name));
  }

  const thumb = (
    <Box
        className="ThemeThumb"
        component="span"
        sx={{
          mr: 2,
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: theme.mainColor,
          border: '2px solid white'
        }}>
    </Box>
  )

  const currentTheme = useSelector(selectCurrentTheme);

  return (
    <ListItemButton onClick={handleClick}>
      {thumb}
      <ListItemText primary={theme.name}></ListItemText>
      {currentTheme?.name === theme.name && <CheckIcon />}
    </ListItemButton>
  )
}

export default ThemesListItem;