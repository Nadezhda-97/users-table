import React, { useState } from "react";

import { Header } from "./Header";
import { User } from "./User";

export const Table = ({ users }) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      // переключаем порядок
      if (sortOrder === 'asc') setSortOrder('desc');
      else if (sortOrder === 'desc') setSortField(null); // без сортировки
      else setSortOrder('asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedUsers = React.useMemo(() => {
    if (!sortField || !sortOrder) return users;

    return [...users].sort((a, b) => {
      const getValue = (obj, key) => {
        return key.split('.').reduce((acc, part) => acc?.[part], obj);
      };

      const valA = getValue(a, sortField);
      const valB = getValue(b, sortField);

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }

      return 0;
    });
  }, [users, sortField, sortOrder]);

  return (
    <table>
      <Header onSort={handleSort} sortField={sortField} sortOrder={sortOrder} />
      <tbody>
        {sortedUsers.map(user => (
          <User key={user.id} user={user} sortField={sortField} />
        ))}
      </tbody>
    </table>
  );
};
