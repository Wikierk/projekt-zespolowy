import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Alert,
} from "@mui/material";
import { CheckCircle, Truck, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Item } from "../core/types";

interface OptimizationResultsProps {
  results: any; 
}

const FitnessChart = ({ history }: { history: any[] }) => (
  <Box sx={{ mt: 4, height: 280, width: "100%", backgroundColor: "white", p: 2, borderRadius: 1, border: "1px solid #e0e0e0" }}>
    <Typography variant="body2" sx={{ fontWeight: 600, color: "#666", mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
      <TrendingUp size={18} /> PRZEBIEG EWOLUCJI (Wzrost funkcji przystosowania)
    </Typography>
    <ResponsiveContainer width="100%" height="85%">
      <LineChart data={history} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="generation" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          labelFormatter={(label) => `Pokolenie: ${label}`}
        />
        <Line 
          type="monotone" 
          dataKey="fitness" 
          stroke="#1976d2" 
          strokeWidth={3} 
          dot={false} 
          activeDot={{ r: 6 }} 
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  </Box>
);

export default function OptimizationResults({ results }: OptimizationResultsProps) {
  if (!results) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Zmień parametry i uruchom algorytm, aby zobaczyć wyniki optymalizacji.
      </Alert>
    );
  }

  if (results.type === "knapsack") {
    return (
      <Card elevation={3} sx={{ borderLeft: "6px solid #4caf50", backgroundColor: "#fafafa" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <CheckCircle size={24} style={{ color: "#2e7d32" }} />
            <Typography variant="h6" sx={{ color: "#2e7d32" }}>Wynik Optymalizacji</Typography>
            <Chip label={`CZAS: ${results.calcTimeMs}ms`} size="small" color="success" variant="outlined" />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr 1fr" }, gap: 2, mb: 3 }}>
            <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Całkowita Wartość</Typography>
              <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: 600 }}>{results.totalValue} PLN</Typography>
            </Box>
            <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Wykorzystana Masa</Typography>
              <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: 600 }}>{results.usedMass}</Typography>
              <Typography variant="caption" sx={{ color: "#999" }}>kg</Typography>
            </Box>
            <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Zajęta Powierzchnia</Typography>
              <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: 600 }}>{results.usedSurface}</Typography>
              <Typography variant="caption" sx={{ color: "#999" }}>m²</Typography>
            </Box>
            <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Spakowane</Typography>
              <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: 600 }}>{results.packedItems} przedm.</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#666", mb: 1.5 }}>ZAWARTOŚĆ PLECAKA:</Typography>
            <Stack spacing={1}>
              {results.packedList.map((item: Item, idx: number) => (
                <Box key={idx} sx={{ p: 1.5, backgroundColor: "#e8f5e9", borderRadius: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.name}</Typography>
                  <Typography variant="caption" sx={{ color: "#666" }}>{item.mass} kg | {item.surface} m² | {item.value} PLN</Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {results.history && <FitnessChart history={results.history} />}

        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={3} sx={{ borderLeft: "6px solid #4caf50", backgroundColor: "#fafafa" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Truck size={24} style={{ color: "#2e7d32" }} />
          <Typography variant="h6" sx={{ color: "#2e7d32" }}>Wynik Optymalizacji (Bin Packing)</Typography>
          <Chip label={`CZAS: ${results.calcTimeMs}ms`} size="small" color="success" variant="outlined" />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 3 }}>
          <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
            <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Potrzebne Kursy</Typography>
            <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: 600 }}>{results.deliveries.length} Kursy</Typography>
          </Box>
          <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
            <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Fitness (Jakość rozwiązania)</Typography>
            <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 600 }}>{(results.fitness || 0).toFixed(2)}</Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#666", mb: 1.5 }}>ROZKŁAD PAKOWANIA:</Typography>
          <Stack spacing={1.5}>
            {results.deliveries.map((delivery: any) => (
              <Box key={delivery.id} sx={{ p: 2, backgroundColor: "white", borderRadius: 1, border: "1px solid #e0e0e0" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Kurs #{delivery.id}</Typography>
                  <Typography variant="caption" sx={{ color: "#999" }}>
                    Masa: {delivery.mass}/{delivery.maxMass} kg | Pow: {delivery.surface}/{delivery.maxSurface} m²
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {delivery.items.map((item: string, idx: number) => (
                    <Chip key={idx} label={item} variant="outlined" size="small" sx={{ backgroundColor: "#e3f2fd" }} />
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        {results.history && <FitnessChart history={results.history} />}

      </CardContent>
    </Card>
  );
}
