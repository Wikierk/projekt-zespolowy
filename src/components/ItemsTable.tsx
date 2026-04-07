import { useState } from "react";
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
  TextField,
} from "@mui/material";
import { Trash2, Plus } from "lucide-react";
import type { Item } from "../core/types";

interface ItemsTableProps {
  items: Item[];
  onDelete: (id: number) => void;
  onAdd: (item: Omit<Item, "id">) => void;
}

export default function ItemsTable({ items, onDelete, onAdd }: ItemsTableProps) {
  const [newItem, setNewItem] = useState({ name: '', mass: '', surface: '', value: '' });

  const handleAdd = () => {
    if (!newItem.name || !newItem.mass || !newItem.surface || !newItem.value) return;
    onAdd({
      name: newItem.name,
      mass: Number(newItem.mass),
      surface: Number(newItem.surface),
      value: Number(newItem.value),
    });
    setNewItem({ name: '', mass: '', surface: '', value: '' });
  };

  return (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" color="secondary">
            Baza Przedmiotów ({items.length})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
           <TextField size="small" label="Nazwa" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} sx={{flexGrow: 1}}/>
           <TextField size="small" label="Masa" type="number" value={newItem.mass} onChange={e => setNewItem({...newItem, mass: e.target.value})} sx={{width: 80}}/>
           <TextField size="small" label="Pow." type="number" value={newItem.surface} onChange={e => setNewItem({...newItem, surface: e.target.value})} sx={{width: 80}}/>
           <TextField size="small" label="PLN" type="number" value={newItem.value} onChange={e => setNewItem({...newItem, value: e.target.value})} sx={{width: 90}}/>
           <IconButton color="primary" onClick={handleAdd} title="Dodaj przedmiot">
             <Plus size={24} />
           </IconButton>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><Typography variant="body2" sx={{ fontWeight: 600 }}>NAZWA</Typography></TableCell>
                <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>MASA (KG)</Typography></TableCell>
                <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>POW. (M²)</Typography></TableCell>
                <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>WARTOŚĆ</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2" sx={{ fontWeight: 600 }}>AKCJA</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell><Typography variant="body2">{item.name}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2">{item.mass}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2">{item.surface}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>{item.value} PLN</Typography></TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="error" onClick={() => onDelete(item.id)} title="Usuń przedmiot">
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