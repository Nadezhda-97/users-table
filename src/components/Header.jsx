export const Header = ({ columns, columnWidths, onMouseDown, onHoverColumn }) => {
  return(
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th
            key={col.key}
            style={{
              width: columnWidths[index] ?? undefined,
              position: 'relative'
            }}
            onMouseEnter={() => onHoverColumn(index)}
            onMouseLeave={() => onHoverColumn(null)}
          >
            {col.label}

            <div
              onMouseDown={(e) => onMouseDown(index, e)}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                height: '100%',
                width: '5px',
                cursor: 'col-resize',
                userSelect: 'none'
              }}
            />
          </th>
        ))}
      </tr>
    </thead>
  );
};
