import { useState, useEffect } from "react";
import { fetchUsers } from "../api/usersApi";

import { Header } from "./Header";
import { User } from "./User";

export const Table = ({ sortField, sortOrder, currentPage, limit, onTotalChange }) => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const params = {};

        // Сортировка применяется только если выбрано и поле, и порядок
        if (sortField && sortOrder !== 'none') {
          params.sortBy = sortField;
          params.order = sortOrder;
        }

        // пагинация
        params.limit = limit;
        params.skip = (currentPage - 1) * limit;

        const query = new URLSearchParams(params).toString();
        //const result = await fetchUsers(query ? `${query}` : '');
        const result = await fetchUsers(query);
        setUsersData(result.users);
        onTotalChange(result.total);
      } catch (error) {
        console.error(error);
      }
    };

    loadUsers();
  }, [sortField, sortOrder, currentPage, limit, onTotalChange]);

  return (
    <table>
      <Header />
      <tbody>
        {usersData.map(user => (
          <User key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
};
