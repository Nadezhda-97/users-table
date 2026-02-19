const BASE_URL = 'https://dummyjson.com/users';

export const fetchUsers = async (limit = 30, skip = 0) => {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Проверяем, что есть поле users
    if (!data.users) {
      throw new Error('Неверный формат ответа от сервера');
    }

    return data.users;
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error.message);
    throw error; // пробрасываем дальше, чтобы компонент мог обработать
  }
};
