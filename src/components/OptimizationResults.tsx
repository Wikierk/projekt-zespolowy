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
import type { Item, ProblemResult, KnapsackResult, DeliveriesResult, DeliveryTrip } from "../core/types";

interface OptimizationResultsProps {
  results: ProblemResult | null;
}

interface ResultHeaderProps {
  icon: React.ReactNode;
  timeInMs: number;
}

interface FitnessChartProps {
  history: Array<{ generation: number; fitness: number }>;
}

interface KnapsackStatsProps {
  totalValue: number;
  usedMass: number;
  usedSurface: number;
  packedItems: number;
}

interface KnapsackItemRowProps {
  item: Item;
}

interface KnapsackItemsListProps {
  items: Item[];
}

interface KnapsackProblemResultProps {
  results: KnapsackResult;
}

interface DeliveryStatsProps {
  deliveryCount: number;
  fitness: number;
}

interface DeliveryRowProps {
  delivery: DeliveryTrip;
}

interface DeliveryListProps {
  deliveries: DeliveryTrip[];
}

interface DeliveryProblemResultProps {
  results: DeliveriesResult;
}

const ResultHeader = ({ icon, timeInMs }: ResultHeaderProps) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
    {icon}
    <Typography variant="h6" sx={{ color: "#2e7d32" }}>Wynik Optymalizacji</Typography>
    <Chip label={`CZAS: ${timeInMs}ms`} size="small" color="success" variant="outlined" />
  </Box>
);

const FitnessChart = ({ history }: FitnessChartProps) => (
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

const KnapsackStats = ({ totalValue, usedMass, usedSurface, packedItems }: KnapsackStatsProps) => (
  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr 1fr" }, gap: 2, mb: 3 }}>
    <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
      <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Całkowita Wartość</Typography>
      <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: 600 }}>{totalValue} PLN</Typography>
    </Box>
    <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
      <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Wykorzystana Masa</Typography>
      <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: 600 }}>{usedMass}</Typography>
      <Typography variant="caption" sx={{ color: "#999" }}>kg</Typography>
    </Box>
    <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
      <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Zajęta Powierzchnia</Typography>
      <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: 600 }}>{usedSurface}</Typography>
      <Typography variant="caption" sx={{ color: "#999" }}>m²</Typography>
    </Box>
    <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
      <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Spakowane</Typography>
      <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: 600 }}>{packedItems} przedm.</Typography>
    </Box>
  </Box>
);

const KnapsackItemRow = ({ item }: KnapsackItemRowProps) => (
  <Box sx={{ p: 1.5, backgroundColor: "#e8f5e9", borderRadius: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.name}</Typography>
    <Typography variant="caption" sx={{ color: "#666" }}>{item.mass} kg | {item.surface} m² | {item.value} PLN</Typography>
  </Box>
);

const KnapsackItemsList = ({ items }: KnapsackItemsListProps) => (
  <Box>
    <Typography variant="body2" sx={{ fontWeight: 600, color: "#666", mb: 1.5 }}>ZAWARTOŚĆ PLECAKA:</Typography>
    <Stack spacing={1}>
      {items.map((item: Item, idx: number) => (
        <KnapsackItemRow key={idx} item={item} />
      ))}
    </Stack>
  </Box>
);

const KnapsackProblemResult = ({ results }: KnapsackProblemResultProps) => {
  return (
    <Card elevation={3} sx={{ borderLeft: "6px solid #4caf50", backgroundColor: "#fafafa" }}>
      <CardContent>
        <ResultHeader icon={<CheckCircle size={24} style={{ color: "#2e7d32" }} />} timeInMs={results.calcTimeMs} />
        <KnapsackStats totalValue={results.totalValue} usedMass={results.usedMass} usedSurface={results.usedSurface} packedItems={results.packedItems} />
        <KnapsackItemsList items={results.packedList} />
        {results.history && <FitnessChart history={results.history} />}
      </CardContent>
    </Card>
  );
}

const DeliveryStats = ({ deliveryCount, fitness }: DeliveryStatsProps) => (
  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 3 }}>
    <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
      <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Potrzebne Kursy</Typography>
      <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: 600 }}>{deliveryCount} Kursy</Typography>
    </Box>
    <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
      <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}>Fitness (Jakość rozwiązania)</Typography>
      <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 600 }}>{fitness.toFixed(2)}</Typography>
    </Box>
  </Box>
);

const DeliveryRow = ({ delivery }: DeliveryRowProps) => (
  <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1, border: "1px solid #e0e0e0" }}>
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
);

const DeliveryList = ({ deliveries }: DeliveryListProps) => (
  <Box>
    <Typography variant="body2" sx={{ fontWeight: 600, color: "#666", mb: 1.5 }}>ROZKŁAD PAKOWANIA:</Typography>
    <Stack spacing={1.5}>
      {deliveries.map((delivery: DeliveryTrip) => (
        <DeliveryRow key={delivery.id} delivery={delivery} />
      ))}
    </Stack>
  </Box>
);


const DeliveryProblemResult = ({ results }: DeliveryProblemResultProps) => {
  return (
    <Card elevation={3} sx={{ borderLeft: "6px solid #4caf50", backgroundColor: "#fafafa" }}>
      <CardContent>
        <ResultHeader icon={<Truck size={24} style={{ color: "#2e7d32" }} />} timeInMs={results.calcTimeMs} />
        <DeliveryStats deliveryCount={results.deliveries.length} fitness={results.fitness || 0} />
        <DeliveryList deliveries={results.deliveries} />
        {results.history && <FitnessChart history={results.history} />}
      </CardContent>
    </Card>
  );
}

export default function OptimizationResults({ results }: OptimizationResultsProps) {
  if (!results) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Zmień parametry i uruchom algorytm, aby zobaczyć wyniki optymalizacji.
      </Alert>
    );
  }

  if (results.type === "knapsack") {
    return <KnapsackProblemResult results={results} />;
  }
  return <DeliveryProblemResult results={results} />;
}
