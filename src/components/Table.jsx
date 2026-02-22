import { useState, useEffect } from "react";
import { fetchUsers } from "../api/usersApi";

import { Header } from "./Header";
import { User } from "./User";

export const Table = ({ sortField, sortOrder }) => {
/*   const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState(''); */

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const params = {};

/*      if (sortField) params.sortBy = sortField;
        if (sortOrder && sortOrder !== 'none') params.order = sortOrder; */

        // Сортировка применяется только если выбрано и поле, и порядок
        if (sortField && sortOrder !== 'none') {
          params.sortBy = sortField;
          params.order = sortOrder;
        }

        const query = new URLSearchParams(params).toString();
        //const result = await fetchUsers(query ? `${query}` : '');
        const result = await fetchUsers(query);
        setUsersData(result);
      } catch (error) {
        console.error(error);
      }
    };

    loadUsers();
  }, [sortField, sortOrder]);

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
