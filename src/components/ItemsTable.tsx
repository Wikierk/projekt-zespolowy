import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import { Trash2, Plus } from "lucide-react";

interface Item {
  id: number;
  name: string;
  mass: number;
  surface: number;
  value: number;
}

interface ItemsTableProps {
  items?: Item[];
  onDelete?: (id: number) => void;
  onAdd?: () => void;
}

const defaultItems: Item[] = [
  { id: 1, name: "Lodówka", mass: 50, surface: 1.5, value: 2000 },
  { id: 2, name: "Telewizor", mass: 15, surface: 0.8, value: 3500 },
  { id: 3, name: "Karton książek", mass: 25, surface: 0.3, value: 500 },
  { id: 4, name: "Sofa", mass: 70, surface: 2.5, value: 1200 },
  { id: 5, name: "Lampa", mass: 3, surface: 0.2, value: 150 },
];

export default function ItemsTable({
  items = defaultItems,
  onDelete,
  onAdd,
}: ItemsTableProps) {
  return (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" color="secondary">
            Baza Przedmiotów ({items.length})
          </Typography>
          <IconButton
            color="primary"
            size="small"
            onClick={onAdd}
            title="Dodaj przedmiot"
          >
            <Plus size={20} />
          </IconButton>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    NAZWA
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    MASA (KG)
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    POW. (M²)
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    WARTOŚĆ
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    AKCJA
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Typography variant="body2">{item.name}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">{item.mass}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">{item.surface}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.value} PLN
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete?.(item.id)}
                      title="Usuń przedmiot"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
