import { useState, useEffect } from "react";
import { fetchUsers } from "../api/usersApi";
import { useColumnResize } from "../hooks/useColumnResize";

import { Header } from "./Header";
import { User } from "./User";

const columns = [
  { key: 'lastName', label: 'Фамилия' },
  { key: 'firstName', label: 'Имя' },
  { key: 'maidenName', label: 'Отчество' },
  { key: 'age', label: 'Возраст' },
  { key: 'gender', label: 'Пол' },
  { key: 'phone', label: 'Номер телефона' },
  { key: 'email', label: 'Email' },
  { key: 'address.country', label: 'Страна' },
  { key: 'address.city', label: 'Город' },
];

export const Table = ({
  sortField,
  sortOrder,
  currentPage,
  limit,
  onTotalChange,
  onRowClick,
  filterField,
  filterValue,
}) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredColumn, setHoveredColumn] = useState(null);

  const { columnWidths, handleMouseDown } = useColumnResize(columns.length);

  const handleHoverColumn = (index) => setHoveredColumn(index);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError('');

      try {
        let baseUrl = 'https://dummyjson.com/users';
        const params = {};

        // Сортировка
        if (sortField && sortOrder !== 'none') {
          params.sortBy = sortField;
          params.order = sortOrder;
        }

        // пагинация
        params.limit = limit;
        params.skip = (currentPage - 1) * limit;

        // Фильтрация через /users/filter
        if (filterField && filterField !== 'none' && filterValue) {
          baseUrl = 'https://dummyjson.com/users/filter';
          params.key = filterField;
          params.value = filterValue;
        }

        const query = new URLSearchParams(params).toString();
        const result = await fetchUsers(query, baseUrl);

        setUsersData(result.users);
        onTotalChange(result.total);
      } catch (error) {
        setError(error.message || 'Ошибка при загрузке пользователей');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [sortField, sortOrder, currentPage, limit, onTotalChange, filterField, filterValue]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        Загрузка пользователей...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        Ошибка: {error}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table style={{ tableLayout: "fixed", width: "100%" }}>
        <Header
          columns={columns}
          columnWidths={columnWidths}
          onMouseDown={handleMouseDown}
          onHoverColumn={handleHoverColumn}
        />
        <tbody>
          {usersData.map(user => (
            <User
              key={user.id}
              user={user}
              onClick={() => onRowClick(user)}
              columns={columns}
              columnWidths={columnWidths}
              hoveredColumn={hoveredColumn}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
