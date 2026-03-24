import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { Play } from "lucide-react";

interface AlgorithmConfigProps {
  onRun?: () => void;
  loading?: boolean;
}

export default function AlgorithmConfig({
  onRun,
  loading = false,
}: AlgorithmConfigProps) {
  return (
    <Card elevation={3} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Konfiguracja Algorytmu
        </Typography>

        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 2.5 }}
        >
          <FormControl fullWidth>
            <InputLabel id="optimization-label">Cel Optymalizacji</InputLabel>
            <Select
              labelId="optimization-label"
              id="optimization-select"
              defaultValue="wartość"
              label="Cel Optymalizacji"
            >
              <MenuItem value="wartość">Maksymalizacja Wartości</MenuItem>
              <MenuItem value="masa">Minimalizacja Masy</MenuItem>
              <MenuItem value="kursy">Minimalizacja Liczby Kursów</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Max Masa (kg)"
              type="number"
              defaultValue="100"
              size="small"
              slotProps={{
                htmlInput: { min: 1 },
              }}
            />
            <TextField
              label="Max Pow. (m²)"
              type="number"
              defaultValue="3"
              size="small"
              slotProps={{
                htmlInput: { min: 0, step: 0.1 },
              }}
            />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Wielkość Populacji"
              type="number"
              defaultValue="150"
              size="small"
              slotProps={{
                htmlInput: { min: 10 },
              }}
            />
            <TextField
              label="Liczba Pokoleń"
              type="number"
              defaultValue="100"
              size="small"
              slotProps={{
                htmlInput: { min: 1 },
              }}
            />
          </Box>

          <TextField
            label="Prawdopodobieństwo Mutacji"
            type="number"
            defaultValue="0.1"
            size="small"
            slotProps={{
              htmlInput: { min: 0, max: 1, step: 0.01 },
            }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          startIcon={<Play size={20} />}
          sx={{ py: 1.5, mt: 3 }}
          onClick={onRun}
          disabled={loading}
        >
          {loading ? "Uruchamianie..." : "Uruchom Algorytm"}
        </Button>
      </CardContent>
    </Card>
  );
}
