export const User = ({ user, onClick }) => {
  const getValue = (key) => key.split('.').reduce((acc, part) => acc?.[part], user);

  const columns = [
    'lastName',
    'firstName',
    'maidenName',
    'age',
    'gender',
    'phone',
    'email',
    'address.country',
    'address.city',
  ];

  return (
    <tr
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {columns.map(col => (
        <td key={col}>{getValue(col)}</td>
      ))}
    </tr>
  );
};
