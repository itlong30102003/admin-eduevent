import React, { useEffect, useState } from 'react';
import {
  collection, getDocs, addDoc, deleteDoc, doc
} from 'firebase/firestore';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Dialog, DialogActions,
  DialogContent, DialogTitle, Avatar, IconButton, Typography, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { db } from '../firebase/firebase';

export default function UserManagementScreen() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: ''
  });

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, 'USER'));
    setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAddUser = async () => {
    if (!formData.name || !formData.email) return alert("Tên và Email bắt buộc");
    await addDoc(collection(db, 'USER'), {
      ...formData, mode: 'light', provider: 'manual'
    });
    setFormData({ name: '', email: '', phone: '', address: '' });
    setOpen(false);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá người dùng này?")) {
      await deleteDoc(doc(db, 'USER', id));
      fetchUsers();
    }
  };

  return (
    <Box sx={{ width: '95vw',height: '100vh', margin: 'auto', paddingTop: '2%', paddingRight: '2%' , paddingLeft: '2%',backgroundColor: '#f9f9f9', }}>
      <Typography variant="h4" align="center" color='black' gutterBottom>
        Quản lý người dùng
      </Typography>

      <Box sx={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '2%'
      }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Thêm người dùng
        </Button>

        <Typography variant="subtitle1">
          Tổng số người dùng: <strong>{users.length}</strong>
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell width="10%">Ảnh</TableCell>
              <TableCell width="20%">Họ tên</TableCell>
              <TableCell width="25%">Email</TableCell>
              <TableCell width="15%">SĐT</TableCell>
              <TableCell width="20%">Địa chỉ</TableCell>
              <TableCell width="10%">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(u => (
              <TableRow key={u.id}>
                <TableCell>
                  <Avatar src={u.photoURL || 'https://via.placeholder.com/40'} />
                </TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.phone}</TableCell>
                <TableCell>{u.address}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(u.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog thêm user */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Thêm người dùng</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Họ tên" margin="dense"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth label="Email" margin="dense"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            fullWidth label="Số điện thoại" margin="dense"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
          <TextField
            fullWidth label="Địa chỉ" margin="dense"
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleAddUser}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
