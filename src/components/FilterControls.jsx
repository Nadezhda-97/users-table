export const FilterControls = ({ filterField, filterValue, onFieldChange, onValueChange }) => {
  // проверяем, выбран ли фильтр или нет
  const isDisabled = !filterField || filterField === 'none';

  const handleValueChange = (value) => {
    // нормализация для определённых полей
    let normalizedValue = value;
    if (['firstName','lastName','address.city'].includes(filterField)) {
      normalizedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    onValueChange(normalizedValue);
  };

  return (
    <div className="filter-controls">
      <label>
        Фильтр по:
          <select value={filterField} onChange={e => onFieldChange(e.target.value)}>
            <option value="firstName">Имя</option>
            <option value="lastName">Фамилия</option>
            <option value="gender">Пол</option>
            <option value="address.city">Город</option>
            <option value="none">Без фильтра</option>
          </select>
      </label>

      <input
        type="text"
        placeholder="Введите значение"
        value={filterValue}
        onChange={e => handleValueChange(e.target.value)}
        disabled={isDisabled}
      />
    </div>
  );
};
