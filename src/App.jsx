import { useState } from 'react';

import { Table } from './components/Table';
import { SortingControls } from './components/SortingControls';
import { FilterControls } from './components/FilterControls';
import { Pagination } from './components/Pagination';
import { UserModal } from './components/UserModal';
//import './App.css'

function App() {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [selectedUser, setSelectedUser] = useState(null);

  const [filterField, setFilterField] = useState('none');
  const [filterValue, setFilterValue] = useState('');

  const limit = 10;

  const handleRowClick = (user) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);

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

      <FilterControls
        filterField={filterField}
        filterValue={filterValue}
        onFieldChange={value => {
          setFilterField(value);

          // если выбран "без фильтра" или "выберите фильтр", сбрасываем значение
          if (value === 'none') {
            setFilterValue('');
            setCurrentPage(1); // сброс на первую страницу
          }
        }}
        onValueChange={value => {
          setFilterValue(value);
          setCurrentPage(1); // сбрасываем на первую страницу при фильтре
        }}
      />

      <Table
        sortField={sortField}
        sortOrder={sortOrder}
        currentPage={currentPage}
        limit={limit}
        onTotalChange={setTotal}
        onRowClick={handleRowClick}
        filterField={filterField}
        filterValue={filterValue}
      />
      <Pagination
        currentPage={currentPage}
        total={total}
        limit={limit}
        onPageChange={setCurrentPage}
      />

      {selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
