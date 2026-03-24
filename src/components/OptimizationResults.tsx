import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Alert,
} from "@mui/material";
import { CheckCircle, Truck } from "lucide-react";

interface OptimizationResultsProps {
  show?: boolean;
  byValue?: boolean;
}

interface Delivery {
  id: number;
  items: string[];
  mass: number;
  maxMass: number;
  surface: number;
  maxSurface: number;
}

const mockResultsByValue = {
  totalValue: "6000 PLN",
  usedMass: "90 / 100",
  usedSurface: "2.6 / 3.0",
  packedItems: 3,
  packedList: [
    { name: "Telewizor", mass: 15, surface: 0.8, value: 3500 },
    { name: "Lodówka", mass: 50, surface: 1.5, value: 2000 },
    { name: "Karton książek", mass: 25, surface: 0.3, value: 500 },
  ],
};

const mockDeliveries: Delivery[] = [
  {
    id: 1,
    items: ["Sofa", "Lampa"],
    mass: 73,
    maxMass: 100,
    surface: 2.7,
    maxSurface: 3.0,
  },
  {
    id: 2,
    items: ["Lodówka", "Telewizor", "Karton książek"],
    mass: 90,
    maxMass: 100,
    surface: 2.6,
    maxSurface: 3.0,
  },
];

export default function OptimizationResults({
  show = true,
  byValue = true,
}: OptimizationResultsProps) {
  if (!show) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Uruchom algorytm, aby zobaczyć wyniki optymalizacji
      </Alert>
    );
  }

  if (byValue) {
    return (
      <Card
        elevation={3}
        sx={{
          borderLeft: "6px solid #4caf50",
          backgroundColor: "#fafafa",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <CheckCircle size={24} style={{ color: "#2e7d32" }} />
            <Typography variant="h6" sx={{ color: "#2e7d32" }}>
              Wynik Optymalizacji
            </Typography>
            <Chip label="UKOŃCZONO" size="small" color="success" />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "1fr 1fr 1fr 1fr",
              },
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}
              >
                Całkowita Wartość
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#2e7d32", fontWeight: 600 }}
              >
                {mockResultsByValue.totalValue}
              </Typography>
            </Box>

            <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}
              >
                Wykorzystana Masa
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#1976d2", fontWeight: 600 }}
              >
                {mockResultsByValue.usedMass}
              </Typography>
              <Typography variant="caption" sx={{ color: "#999" }}>
                kg
              </Typography>
            </Box>

            <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}
              >
                Zajęta Powierzchnia
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#1976d2", fontWeight: 600 }}
              >
                {mockResultsByValue.usedSurface}
              </Typography>
              <Typography variant="caption" sx={{ color: "#999" }}>
                m²
              </Typography>
            </Box>

            <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}
              >
                Spakowane
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#1976d2", fontWeight: 600 }}
              >
                {mockResultsByValue.packedItems} przedm.
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#666", mb: 1.5 }}
            >
              ZAWARTOŚĆ PLECAKA:
            </Typography>
            <Stack spacing={1}>
              {mockResultsByValue.packedList.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 1.5,
                    backgroundColor: "#e8f5e9",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666" }}>
                    {item.mass} kg | {item.surface} m² | {item.value} PLN
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      elevation={3}
      sx={{
        borderLeft: "6px solid #4caf50",
        backgroundColor: "#fafafa",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Truck size={24} style={{ color: "#2e7d32" }} />
          <Typography variant="h6" sx={{ color: "#2e7d32" }}>
            Wynik Optymalizacji
          </Typography>
          <Chip label="UKOŃCZONO" size="small" color="success" />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}
            >
              Potrzebne Kursy
            </Typography>
            <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: 600 }}>
              {mockDeliveries.length} Kursy
            </Typography>
          </Box>

          <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "#666", textTransform: "uppercase", mb: 0.5 }}
            >
              Czas Obliczeń Algorytmu
            </Typography>
            <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: 600 }}>
              345 ms
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#666", mb: 1.5 }}
          >
            ROZKŁAD PAKOWANIA:
          </Typography>
          <Stack spacing={1.5}>
            {mockDeliveries.map((delivery) => (
              <Box
                key={delivery.id}
                sx={{
                  p: 2,
                  backgroundColor: "white",
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Kurs #{delivery.id}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#999" }}>
                    Masa: {delivery.mass}/{delivery.maxMass} kg | Pow:
                    {delivery.surface}/{delivery.maxSurface} m²
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {delivery.items.map((item: string, idx: number) => (
                    <Chip
                      key={idx}
                      label={item}
                      variant="outlined"
                      size="small"
                      sx={{ backgroundColor: "#e3f2fd" }}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
