import { createMuiTheme } from "@material-ui/core/styles";
import color from "./color";

const MuiTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#212121"
        },
        secondary: {
            main: color.JLLRed
        }
    },
    overrides: {
        MuiListItemText: {
            root: {
                color: color.Black50,
                padding: "0 8px",
            }
        }
    },
    typography: {
        useNextVariants: true
    }
});

export default MuiTheme;