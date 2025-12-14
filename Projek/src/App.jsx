import { useEffect, useMemo, useState } from "react";
import "./index.css";

import FilmForm from "./components/FilmForm.jsx";
import TableFilm from "./components/TableFilm.jsx";
import EditFilm from "./components/EditFilm.jsx";

const API = "http://localhost/UJIAN_NaufalMuammar_51423084/Server/index.php";
const empty = { judul: "", genre: "", tahun: "", durasi: "", status: "Plan" };

const post = (action, body) =>
  fetch(`${API}?action=${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

export default function App() {
  const [film, setFilm] = useState([]);
  const [q, setQ] = useState("");
  const [form, setForm] = useState(empty);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null); // { id, judul }

  const load = async () => {
    const r = await fetch(`${API}?action=getFilm`);
    setFilm((await r.json()) || []);
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!form.judul.trim()) return alert("Judul wajib diisi!");
    await post("addFilm", {
      ...form,
      tahun: Number(form.tahun || 0),
      durasi: Number(form.durasi || 0),
    });
    setForm(empty);
    load();
  };

  const openEdit = (f) =>
    setEdit({
      id: f.id,
      judul: f.judul ?? "",
      genre: f.genre ?? "",
      tahun: String(f.tahun ?? ""),
      durasi: String(f.durasi ?? ""),
      status: f.status ?? "Plan",
    });

  const saveEdit = async () => {
    if (!edit.judul.trim()) return alert("Judul wajib diisi!");
    await post("updateFilm", {
      ...edit,
      tahun: Number(edit.tahun || 0),
      durasi: Number(edit.durasi || 0),
    });
    setEdit(null);
    load();
  };

  const hapus = (id) => {
    const f = film.find((x) => String(x.id) === String(id));
    setDel({ id, judul: f?.judul || "" });
  };

  const confirmDelete = async () => {
    await fetch(`${API}?action=deleteFilm&id=${del.id}`);
    setDel(null);
    load();
  };

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s
      ? film.filter((f) =>
          `${f.judul} ${f.genre} ${f.status}`.toLowerCase().includes(s)
        )
      : film;
  }, [film, q]);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Daftar Tonton Film</h1>
        <p className="sub">Naufal Muammar_51423084</p>
      </div>

      <FilmForm
        title="Tambah Film"
        value={form}
        setValue={setForm}
        onSubmit={submit}
        submitText="Simpan"
      />

      <TableFilm
        q={q}
        setQ={setQ}
        data={filtered}
        onEdit={openEdit}
        onDelete={hapus}
      />

      {edit && (
        <EditFilm onClose={() => setEdit(null)}>
          <FilmForm
            value={edit}
            setValue={setEdit}
            onSubmit={saveEdit}
            submitText="Simpan Perubahan"
          />
        </EditFilm>
      )}

      {del && (
        <EditFilm onClose={() => setDel(null)}>
          <div className="confirmBox">
            <h3 className="confirmTitle">Konfirmasi</h3>
            <p className="confirmText">
              Yakin mau menghapus film ini{del.judul ? `: "${del.judul}"` : ""}?
            </p>
            <div className="confirmActions">
              <button className="btnSmall" onClick={() => setDel(null)}>Batal</button>
              <button className="btnSmall danger" onClick={confirmDelete}>Ya, Hapus</button>
            </div>
          </div>
        </EditFilm>
      )}
    </div>
  );
}