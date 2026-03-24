import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { Layers } from "lucide-react";
import AlgorithmConfig from "./components/AlgorithmConfig";
import ItemsTable from "./components/ItemsTable";
import OptimizationResults from "./components/OptimizationResults";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Layers size={28} style={{ marginRight: "12px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inteligentny Pakowacz (GA)
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Zespół: Wiktor Pacak, Jakub Pietrzykowski, Oliwia Salwierak
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <AlgorithmConfig onRun={() => console.log("Run algorithm")} />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <ItemsTable />
            <OptimizationResults show={false} byValue={true} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
