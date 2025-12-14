export default function EditFilm({ onClose, children }) {
  return (
    <div className="editBack" onClick={onClose}>
      <div className="editBox" onClick={(e) => e.stopPropagation()}>
        <div className="editHead">
          <h3>Edit Film</h3>
        </div>
        {children}
      </div>
    </div>
  );
}