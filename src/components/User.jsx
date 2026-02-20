export const User = ({ user }) => {
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
        <td key={col}>{getValue(col)}</td>
      ))}
    </tr>
  );
};
