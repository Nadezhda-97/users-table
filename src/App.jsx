import { useState } from 'react';

import { Table } from './components/Table';
import { SortingControls } from './components/SortingControls';
import { Pagination } from './components/Pagination';
//import './App.css'

function App() {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 5;

/*
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers(30); // получаем первые 50 пользователей
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Ошибка при загрузке пользователей');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Загрузка пользователей...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Ошибка: {error}</div>; */

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Список пользователей</h1>
      <SortingControls
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={setSortField}
        onSortOrderChange={setSortOrder}
      />
      <Table
        sortField={sortField}
        sortOrder={sortOrder}
        currentPage={currentPage}
        limit={limit}
        onTotalChange={setTotal}
      />
      <Pagination
        currentPage={currentPage}
        total={total}
        limit={limit}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
