export const User = ({ user, sortField }) => {
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
    <tr>
      {columns.map(col => (
        <td key={col} className={sortField === col ? 'active' : ''}>
          {getValue(col)}
        </td>
      ))}
    </tr>
  );
};
