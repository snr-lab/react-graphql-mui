import { createTheme } from '@material-ui/core/styles';
import {blue, orange} from '@material-ui/core/colors';

// ...
export default createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
    status: {
        danger: 'orange',
    },
})
