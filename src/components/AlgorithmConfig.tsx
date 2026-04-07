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
import type { AlgorithmParams } from "../core/types";

interface AlgorithmConfigProps {
  params: AlgorithmParams;
  onChange: (newParams: Partial<AlgorithmParams>) => void;
  onRun: () => void;
  loading?: boolean;
}

export default function AlgorithmConfig({
  params,
  onChange,
  onRun,
  loading = false,
}: AlgorithmConfigProps) {
  return (
    <Card elevation={3} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Konfiguracja Algorytmu
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 2.5 }}>
          <FormControl fullWidth>
            <InputLabel id="optimization-label">Cel Optymalizacji</InputLabel>
            <Select
              labelId="optimization-label"
              value={params.mode}
              onChange={(e) => onChange({ mode: e.target.value as any })}
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
              value={params.maxMass}
              onChange={(e) => onChange({ maxMass: Number(e.target.value) })}
              size="small"
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Max Pow. (m²)"
              type="number"
              value={params.maxSurface}
              onChange={(e) => onChange({ maxSurface: Number(e.target.value) })}
              size="small"
              inputProps={{ min: 0, step: 0.1 }}
            />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Wielkość Populacji"
              type="number"
              value={params.populationSize}
              onChange={(e) => onChange({ populationSize: Number(e.target.value) })}
              size="small"
              inputProps={{ min: 10 }}
            />
            <TextField
              label="Liczba Pokoleń"
              type="number"
              value={params.generations}
              onChange={(e) => onChange({ generations: Number(e.target.value) })}
              size="small"
              inputProps={{ min: 1 }}
            />
          </Box>

          <TextField
            label="Prawdopodobieństwo Mutacji"
            type="number"
            value={params.mutationRate}
            onChange={(e) => onChange({ mutationRate: Number(e.target.value) })}
            size="small"
            inputProps={{ min: 0, max: 1, step: 0.01 }}
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