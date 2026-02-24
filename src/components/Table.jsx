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

  useEffect(() => {
    const loadUsers = async () => {
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
        console.error(error);
      }
    };

    loadUsers();
  }, [sortField, sortOrder, currentPage, limit, onTotalChange, filterField, filterValue]);

  const { columnWidths, handleMouseDown } = useColumnResize(columns.length);

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table style={{ tableLayout: "fixed", width: "100%" }}>
        <Header
          columns={columns}
          columnWidths={columnWidths}
          onMouseDown={handleMouseDown}
        />
        <tbody>
          {usersData.map(user => (
            <User
              key={user.id}
              user={user}
              onClick={() => onRowClick(user)}
              columns={columns}
              columnWidths={columnWidths}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
