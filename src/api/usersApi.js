export const fetchUsers = async (queryString = '', baseUrl = 'https://dummyjson.com/users') => {
  try {
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data.users) {
      throw new Error('Неверный формат ответа от сервера');
    }

    return data;
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error.message);
    throw error;
  }
};
