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

export const Header = () => {
  return(
    <thead>
      <tr>
        {columns.map(col => (
          <th key={col.key}>{col.label}</th>
        ))}
      </tr>
    </thead>
  );
};
