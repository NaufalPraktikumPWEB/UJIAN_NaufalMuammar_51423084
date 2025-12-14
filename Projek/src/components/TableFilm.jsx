const cls = { Completed: "ok", Watching: "watch", Plan: "plan" };

export default function TableFilm({ q, setQ, data, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="row">
        <h2>Daftar Film</h2>
        <input
          className="input search"
          placeholder="Cari judul/genre/status..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              {["Judul", "Genre", "Tahun", "Durasi", "Status", "Aksi"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length ? (
              data.map((f) => (
                <tr key={f.id}>
                  <td>{f.judul}</td>
                  <td>{f.genre || "-"}</td>
                  <td>{f.tahun || "-"}</td>
                  <td>{f.durasi ? `${f.durasi} menit` : "-"}</td>
                  <td>
                    <span className={`badge ${cls[f.status] || "plan"}`}>{f.status}</span>
                  </td>
                  <td>
                    <button className="btnSmall warn" onClick={() => onEdit(f)}>Edit</button>{" "}
                    <button className="btnSmall danger" onClick={() => onDelete(f.id)}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ color: "#9ca3af" }}>Tidak ada data.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}