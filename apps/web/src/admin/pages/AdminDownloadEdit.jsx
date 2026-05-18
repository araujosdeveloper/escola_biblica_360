
import React from 'react';
import { useParams } from 'react-router-dom';
import AdminDownloadForm from '../components/AdminDownloadForm.jsx';

export default function AdminDownloadEdit() {
  const { id } = useParams();
  return <AdminDownloadForm downloadId={id} />;
}
