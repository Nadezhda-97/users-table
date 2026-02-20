import { useState, useEffect } from "react";
import { fetchUsers } from "../api/usersApi";

import { Header } from "./Header";
import { User } from "./User";

export const Table = () => {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const params = {};
        if (sortField) params.sortBy = sortField;
        if (sortOrder && sortOrder !== 'none') params.order = sortOrder;

        const query = new URLSearchParams(params).toString();
        const result = await fetchUsers(query ? `${query}` : '');
        setUsersData(result);
      } catch (error) {
        console.error(error);
      }
    };

    loadUsers();
  }, [sortField, sortOrder]);

  return (
    <>
      <div className="sorting-controls">
        <select value={sortField} onChange={e => setSortField(e.target.value)}>
          <option value="">Поле для сортировки</option>
          <option value="firstName">Имя</option>
          <option value="lastName">Фамилия</option>
          <option value="maidenName">Отчество</option>
          <option value="age">Возраст</option>
          <option value="gender">Пол</option>
          <option value="phone">Номер телефона</option>
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="none">Без сортировки</option>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
      <table>
        <Header />
        <tbody>
          {usersData.map(user => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};
