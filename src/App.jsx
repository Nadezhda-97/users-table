import { useState } from 'react';

import { Table } from './components/Table';
import { SortingControls } from './components/SortingControls';
//import './App.css'

function App() {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

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
      />
    </div>
  );
};

export default App;
