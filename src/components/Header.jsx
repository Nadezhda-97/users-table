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

export const Header = ({ onSort, sortField, sortOrder }) => {
  const handleClick = (key) => {
    onSort(key);
  };

  return(
    <thead>
      <tr>
        {columns.map(col => (
          <th
            key={col.key}
            onClick={() => handleClick(col.key)}
            className={sortField === col.key ? 'active' : ''}
          >
            {col.label} {sortField === col.key ? (sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : '') : ''}
          </th>
        ))}
      </tr>
    </thead>
  );
};
