import '../styles/UserModal.css';

export const UserModal = ({ user, onClose }) => {
  const {
    firstName,
    lastName,
    maidenName,
    age,
    phone,
    email,
    height,
    weight,
    image,
    address,
  } = user;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} />

        <h2>
          {lastName} {firstName} {maidenName}
        </h2>

        <img src={image} alt="avatar" />

        <div className="modal-columns">
          <div className="modal-column">
            <p><strong>Возраст:</strong> {age}</p>
            <p><strong>Рост:</strong> {height} см</p>
            <p><strong>Вес:</strong> {weight} кг</p>
          </div>
          <div className="modal-column">
            <p><strong>Телефон:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
          </div>
        </div>

        <div className="modal-address">
          <strong>Адрес:</strong>{' '}
          {address.country}, {address.city}, {address.address}, {address.postalCode}
        </div>
      </div>
    </div>
  );
};
