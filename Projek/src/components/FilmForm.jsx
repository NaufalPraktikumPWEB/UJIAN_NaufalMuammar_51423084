const STATUS = ["Plan", "Watching", "Completed"];

export default function FilmForm({ title, value, setValue, onSubmit, submitText }) {

  const set = (k) => (e) =>
    setValue((s) => ({ ...s, [k]: e.target.value }));

  // ⬇️ BIAR 0 DEPAN BISA DIHAPUS
  const setNum = (k) => (e) => {
    const v = e.target.value;
    // izinkan kosong atau angka saja
    if (/^\d*$/.test(v)) {
      setValue((s) => ({ ...s, [k]: v }));
    }
  };

  return (
    <div className="card">
      {title && <h2>{title}</h2>}

      <div className="grid">
        <div className="field">
          <label>Judul Film</label>
          <input
            className="input"
            value={value.judul}
            onChange={set("judul")}
          />
        </div>

        <div className="field">
          <label>Genre</label>
          <input
            className="input"
            value={value.genre}
            onChange={set("genre")}
          />
        </div>

        <div className="field">
          <label>Tahun</label>
          <input
            className="input"
            inputMode="numeric"
            value={value.tahun}
            onChange={setNum("tahun")}
          />
        </div>

        <div className="field">
          <label>Durasi (menit)</label>
          <input
            className="input"
            inputMode="numeric"
            value={value.durasi}
            onChange={setNum("durasi")}
          />
        </div>

        <div className="field">
          <label>Status</label>
          <select
            className="select"
            value={value.status}
            onChange={set("status")}
          >
            {STATUS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="actions">
        <button className="btn" onClick={onSubmit}>
          {submitText}
        </button>
      </div>
    </div>
  );
}