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

export default function OrganizerManagementScreen() {
  const [organizers, setOrganizers] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', field: '', avatar: ''
  });

  const fetchOrganizers = async () => {
    const snapshot = await getDocs(collection(db, 'organizer'));
    setOrganizers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const handleAdd = async () => {
    if (!formData.name || !formData.email || !formData.field) return alert("Thiếu thông tin!");
    await addDoc(collection(db, 'organizer'), {
      ...formData,
      createAt: new Date()
    });
    setFormData({ name: '', email: '', field: '', avatar: '' });
    setOpen(false);
    fetchOrganizers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xoá?")) {
      await deleteDoc(doc(db, 'organizer', id));
      fetchOrganizers();
    }
  };

  return (
    <Box sx={{ width: '95vw', height: '100vh', margin: 'auto', paddingTop: '2%', paddingRight: '2%', paddingLeft: '2%', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" align="center" color='black' gutterBottom>
        Quản lý Organizer
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2%' }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Thêm Organizer
        </Button>

        <Typography variant="subtitle1">
          Tổng số: <strong>{organizers.length}</strong>
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>Ảnh</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Lĩnh vực</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizers.map(org => (
              <TableRow key={org.id}>
                <TableCell>
                  <Avatar src={org.avatar || 'https://via.placeholder.com/40'} />
                </TableCell>
                <TableCell>{org.name}</TableCell>
                <TableCell>{org.field}</TableCell>
                <TableCell>{org.email}</TableCell>
                <TableCell>
                  {org.createAt?.seconds
                    ? new Date(org.createAt.seconds * 1000).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(org.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog thêm organizer */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Thêm Organizer</DialogTitle>
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
            fullWidth label="Lĩnh vực" margin="dense"
            value={formData.field}
            onChange={e => setFormData({ ...formData, field: e.target.value })}
          />
          <TextField
            fullWidth label="Link ảnh avatar" margin="dense"
            value={formData.avatar}
            onChange={e => setFormData({ ...formData, avatar: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleAdd}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
