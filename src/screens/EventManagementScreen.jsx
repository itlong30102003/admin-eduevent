import React, { useEffect, useState } from 'react';
import {
  collection, getDocs, deleteDoc, doc
} from 'firebase/firestore';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box, Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../firebase/firebase';

export default function EventManagementScreen() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, 'event'));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá sự kiện này?")) {
      await deleteDoc(doc(db, 'event', id));
      fetchEvents();
    }
  };

  return (
    <Box sx={{ width: '93vw', height: '100vh', margin: 'auto', paddingTop: '2%', paddingRight: '2%', paddingLeft: '2%', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" align="center" color='black' gutterBottom>
        Quản lý sự kiện
      </Typography>

      <Box sx={{
        display: 'flex', justifyContent: 'flex-end',
        alignItems: 'center', marginBottom: '2%'
      }}>
        <Typography variant="subtitle1">
          Tổng số sự kiện: <strong>{events.length}</strong>
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Địa điểm</TableCell>
              <TableCell>Người tổ chức</TableCell>
              <TableCell>Điểm</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.title}</TableCell>
                <TableCell>{e.time?.seconds ? new Date(e.time.seconds * 1000).toLocaleString() : ''}</TableCell>
                <TableCell>{e.location}</TableCell>
                <TableCell>{e.organizer?.name}</TableCell>
                <TableCell>{e.point}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(e.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
