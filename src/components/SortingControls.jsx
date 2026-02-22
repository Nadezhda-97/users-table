export const SortingControls = ({
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
}) => {
  const handleFieldChange = (value) => {
    onSortFieldChange(value);

    // если поле очищено — сбрасываем порядок
    if (!value) {
      onSortOrderChange('none');
    }
  };

  return (
    <div className="sorting-controls">
      <select
        value={sortField}
        onChange={(e) => handleFieldChange(e.target.value)}
      >
        <option value="">Поле для сортировки</option>
        <option value="lastName">Фамилия</option>
        <option value="firstName">Имя</option>
        <option value="maidenName">Отчество</option>
        <option value="age">Возраст</option>
        <option value="gender">Пол</option>
        <option value="phone">Номер телефона</option>
      </select>
      <select
        value={sortOrder}
        onChange={e => onSortOrderChange(e.target.value)}
        disabled={!sortField}
      >
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
        <option value="none">Без сортировки</option>
      </select>
    </div>
  );
};
