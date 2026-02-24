export const User = ({ user, onClick, columns, columnWidths }) => {
  const getValue = (key) => key.split('.').reduce((acc, part) => acc?.[part], user);

  return (
    <tr
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {columns.map((col, index) => (
        <td
          key={col.key}
          style={{
            width: columnWidths[index] ?? undefined,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {getValue(col.key)}
        </td>
      ))}
    </tr>
  );
};
