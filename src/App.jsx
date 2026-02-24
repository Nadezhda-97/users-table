import { useState } from 'react';

import { Table } from './components/Table';
import { SortingControls } from './components/SortingControls';
import { FilterControls } from './components/FilterControls';
import { Pagination } from './components/Pagination';
import { UserModal } from './components/UserModal';

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

  return (
    <div>
      <h1>Список пользователей</h1>

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

          if (value === 'none') {
            setFilterValue('');
            setCurrentPage(1);
          }
        }}
        onValueChange={value => {
          setFilterValue(value);
          setCurrentPage(1);
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
