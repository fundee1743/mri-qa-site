import { useState, useEffect } from "react";

// ============================================================
// SEGMENT 1 — COLOR THEME
// Edit these hex values to change the whole site's color scheme
// ============================================================
const G = {
  50:  "#f1f8f2",  // page background
  100: "#d6eeda",  // light green (number badges, borders)
  200: "#a8d8ae",  // medium border color
  400: "#5aab65",  // icons, chevrons
  600: "#2e7d32",  // primary buttons, active filters
  800: "#1b5e20",  // headings, dark text
};

// ============================================================
// SEGMENT 2 — DEFAULT Q&A DATA
// These are the questions shown when the site first loads.
// Add, remove, or edit questions here.
// Each item: { id (unique number), q (question), cat (category), a (answer) }
// ============================================================
const DEFAULT_QA = [
  {
    id: 1,
    cat: "ทั่วไป",
    q: "MRI คืออะไร?",
    a: "MRI (Magnetic Resonance Imaging) คือการตรวจด้วยคลื่นแม่เหล็กไฟฟ้าและคลื่นวิทยุ ไม่มีรังสีเอกซ์ใดๆ สร้างภาพอวัยวะภายในได้อย่างละเอียดชัดเจน โดยเฉพาะสมอง ไขสันหลัง ข้อต่อ และเนื้อเยื่ออ่อน",
  },
  {
    id: 2,
    cat: "ทั่วไป",
    q: "MRI ใช้เวลานานแค่ไหน?",
    a: "ขึ้นอยู่กับอวัยวะที่ตรวจ โดยทั่วไป 20–60 นาที บางส่วนอาจนานถึง 90 นาที เช่น MRI ทั้งร่างกาย หรือในรายที่ต้องฉีดสีเพิ่มเติม ผู้ป่วยควรนอนนิ่งตลอดการตรวจ",
  },
  {
    id: 3,
    cat: "การเตรียมตัว",
    q: "ต้องเตรียมตัวอย่างไรก่อน MRI?",
    a: "โดยทั่วไปไม่ต้องงดน้ำงดอาหาร ยกเว้นกรณีที่ต้องฉีดสีหรือตรวจช่องท้อง ต้องถอดสิ่งของโลหะทุกชนิด ได้แก่ นาฬิกา กุญแจ เข็มขัด เครื่องประดับ และแจ้งเจ้าหน้าที่หากมีอุปกรณ์ฝังในร่างกาย",
  },
  {
    id: 4,
    cat: "ความปลอดภัย",
    q: "MRI อันตรายไหม?",
    a: "MRI ปลอดภัยมาก ไม่ใช้รังสีไอออไนซ์ สามารถทำซ้ำได้หลายครั้งโดยไม่เป็นอันตราย เสียงดังระหว่างตรวจมาจากแม่เหล็กที่ทำงาน แต่หากมีโลหะฝังในร่างกายต้องแจ้งแพทย์ก่อนเสมอ",
  },
  {
    id: 5,
    cat: "ความปลอดภัย",
    q: "ทำไมต้องถอดโลหะออก?",
    a: "เครื่อง MRI ใช้สนามแม่เหล็กแรงสูง โลหะจะถูกดูดเข้าหาเครื่องด้วยแรงมหาศาล อาจทำให้บาดเจ็บได้ และยังทำให้ภาพบิดเบี้ยวไม่ชัดเจน",
  },
  {
    id: 6,
    cat: "ทั่วไป",
    q: "MRI กับ CT Scan ต่างกันอย่างไร?",
    a: "MRI ใช้คลื่นแม่เหล็ก ไม่มีรังสี เห็นเนื้อเยื่ออ่อนดีมาก เช่น สมอง เส้นประสาท หมอนรองกระดูก ส่วน CT Scan ใช้รังสีเอกซ์ เห็นกระดูกดี ตรวจเร็วกว่า เหมาะกับกรณีฉุกเฉิน",
  },
  {
    id: 7,
    cat: "ผลการตรวจ",
    q: "ผลตรวจออกเมื่อไหร่?",
    a: "โดยทั่วไป 1–3 วันทำการ กรณีเร่งด่วนอาจได้ผลในวันเดียวกัน รังสีแพทย์จะอ่านและแปลผล จากนั้นแพทย์ที่ดูแลจะนัดอธิบายผลให้ฟัง",
  },
  {
    id: 8,
    cat: "ผลการตรวจ",
    q: "MRI ราคาเท่าไหร่โดยประมาณ?",
    a: "โรงพยาบาลรัฐ: ประมาณ 3,000–8,000 บาท (สิทธิประกันสังคม/บัตรทองอาจครอบคลุม) โรงพยาบาลเอกชน: ประมาณ 8,000–25,000 บาทขึ้นไป ควรสอบถามก่อนนัดหมาย",
  },
];

// ============================================================
// SEGMENT 3 — CATEGORIES
// Add or rename categories here (must match cat values in SEGMENT 2)
// CAT_COLORS: bg = badge background, color = badge text color
// ============================================================
const CATS = ["ทั่วไป", "ความปลอดภัย", "การเตรียมตัว", "ผลการตรวจ"];

const CAT_COLORS = {
  "ทั่วไป":       { bg: "#e8f5e9", color: "#2e7d32" },
  "ความปลอดภัย": { bg: "#fff3e0", color: "#e65100" },
  "การเตรียมตัว": { bg: "#e3f2fd", color: "#1565c0" },
  "ผลการตรวจ":   { bg: "#f3e5f5", color: "#6a1b9a" },
};

// ============================================================
// SEGMENT 4 — ADMIN PASSWORD
// Password is stored as a GitHub secret (VITE_ADMIN_PASS).
// Never hardcode it here. Change it in GitHub → Settings → Secrets.
// ============================================================
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "";

// ============================================================
// SEGMENT 5 — BUTTON BASE STYLE
// Base style for all buttons. Pass overrides via the extra object.
// ============================================================
const btn = (extra = {}) => ({
  border: "1.5px solid " + G[200],
  background: "white",
  borderRadius: 8,
  padding: "9px 18px",
  fontFamily: "'Sarabun', sans-serif",
  fontSize: 14,
  cursor: "pointer",
  fontWeight: 500,
  transition: "all 0.18s",
  ...extra,
});

// ============================================================
// MAIN APP
// ============================================================
export default function App() {

  // ----------------------------------------------------------
  // SEGMENT 6 — APP STATE (internal — no need to edit)
  // ----------------------------------------------------------
  const [qaList, setQaList]           = useState([]);
  const [loaded, setLoaded]           = useState(false);
  const [search, setSearch]           = useState("");
  const [filterCat, setFilterCat]     = useState("ทั้งหมด");
  const [openIds, setOpenIds]         = useState({});
  const [view, setView]               = useState("public");
  const [showLogin, setShowLogin]     = useState(false);
  const [pass, setPass]               = useState("");
  const [passErr, setPassErr]         = useState(false);
  const [attempts, setAttempts]       = useState(0);
  const [lockedUntil, setLockedUntil] = useState(null);
  const [editItem, setEditItem]       = useState(null);
  const [form, setForm]               = useState({ q: "", cat: "ทั่วไป", a: "" });
  const [formErr, setFormErr]         = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast]             = useState("");

  // ----------------------------------------------------------
  // SEGMENT 7 — DATA LOADING & HASH-BASED ADMIN TRIGGER
  // Loads Q&A from localStorage on first visit.
  // Admin login form appears only when URL ends with #admin.
  // ----------------------------------------------------------
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mri-qa-list");
      if (stored) {
        setQaList(JSON.parse(stored));
      } else {
        setQaList(DEFAULT_QA);
        localStorage.setItem("mri-qa-list", JSON.stringify(DEFAULT_QA));
      }
    } catch {
      setQaList(DEFAULT_QA);
    }
    setLoaded(true);

    const checkHash = () => setShowLogin(window.location.hash === "#admin");
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const save = (list) => {
    setQaList(list);
    try { localStorage.setItem("mri-qa-list", JSON.stringify(list)); } catch {}
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const filtered = qaList.filter(item => {
    const matchCat = filterCat === "ทั้งหมด" || item.cat === filterCat;
    const s = search.toLowerCase();
    return matchCat && (!s || item.q.toLowerCase().includes(s) || item.a.toLowerCase().includes(s));
  });

  const toggle = (id) => setOpenIds(p => ({ ...p, [id]: !p[id] }));

  // ----------------------------------------------------------
  // SEGMENT 8 — ADMIN LOGIN LOGIC
  // Locks out for 60 seconds after 5 failed attempts.
  // -------------------------------------------------------
  const isLocked = lockedUntil && Date.now() < lockedUntil;
  const lockSecondsLeft = isLocked ? Math.ceil((lockedUntil - Date.now()) / 1000) : 0;

  const handleLogin = () => {
    if (isLocked) return;
    if (pass === ADMIN_PASS) {
      setView("admin");
      setPassErr(false);
      setPass("");
      setAttempts(0);
      setLockedUntil(null);
      window.location.hash = "";
      setShowLogin(false);
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setPassErr(true);
      setPass("");
      if (next >= 5) {
        setLockedUntil(Date.now() + 60_000);
        setAttempts(0);
      }
    }
  };

  // ----------------------------------------------------------
  // SEGMENT 9 — ADD / EDIT / DELETE LOGIC
  // ----------------------------------------------------------
  const openAdd  = () => { setEditItem(null); setForm({ q: "", cat: "ทั่วไป", a: "" }); setFormErr(""); };
  const openEdit = (item) => { setEditItem(item); setForm({ q: item.q, cat: item.cat, a: item.a }); setFormErr(""); };

  const handleSave = () => {
    if (!form.q.trim() || !form.a.trim()) { setFormErr("กรุณากรอกคำถามและคำตอบ"); return; }
    let list;
    if (editItem) {
      list = qaList.map(x => x.id === editItem.id ? { ...x, ...form } : x);
      showToast("✅ แก้ไขสำเร็จ");
    } else {
      list = [...qaList, { id: Date.now(), ...form }];
      showToast("✅ เพิ่มคำถามสำเร็จ");
    }
    save(list);
    setEditItem(null);
    setForm({ q: "", cat: "ทั่วไป", a: "" });
  };

  const handleDelete = (id) => {
    save(qaList.filter(x => x.id !== id));
    setDeleteConfirm(null);
    showToast("🗑️ ลบสำเร็จ");
  };

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: G[600], fontFamily: "'Sarabun',sans-serif", fontSize: 16 }}>
      กำลังโหลด...
    </div>
  );

  // ==========================================================
  // RENDER
  // ==========================================================
  return (
    <div style={{ fontFamily: "'Sarabun','Noto Sans Thai',sans-serif", background: G[50], minHeight: "100vh" }}>

      {/* --------------------------------------------------------
          SEGMENT 10 — TOAST NOTIFICATION
          Small pop-up message shown after add / edit / delete.
          Edit the duration in showToast() in SEGMENT 9 above.
          -------------------------------------------------------- */}
      {toast && (
        <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", background: G[800], color: "white", padding: "10px 24px", borderRadius: 24, fontSize: 14, zIndex: 9999, fontFamily: "'Sarabun',sans-serif", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
          {toast}
        </div>
      )}

      {/* --------------------------------------------------------
          SEGMENT 11 — HERO BANNER
          Edit: emoji (🧲), title text, subtitle text, gradient colors.
          Gradient colors come from SEGMENT 1 (G[600], G[400]).
          -------------------------------------------------------- */}
      <div style={{ background: `linear-gradient(135deg, ${G[600]} 0%, #43a047 60%, ${G[400]} 100%)`, borderRadius: "0 0 24px 24px", padding: "28px 24px 22px", color: "white", textAlign: "center", position: "relative" }}>
        {/* -- SEGMENT 11A: Hero icon -- */}
        <div style={{ fontSize: 34, marginBottom: 6 }}>🧲</div>

        {/* -- SEGMENT 11B: Hero title -- */}
        <h1 style={{ fontSize: 21, fontWeight: 600, marginBottom: 4, color: "white" }}>
          คำถาม-คำตอบเกี่ยวกับ MRI
        </h1>

        {/* -- SEGMENT 11C: Hero subtitle -- */}
        <p style={{ fontSize: 13, opacity: 0.88 }}>
          รวมคำถามที่พบบ่อย ตอบโดยนักรังสีเทคนิคผู้เชี่ยวชาญ
        </p>

        {/* -- SEGMENT 11D: Back button (admin only) -- */}
        {view === "admin" && (
          <button onClick={() => { setView("public"); window.location.hash = ""; }}
            style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.4)", color: "white", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'Sarabun',sans-serif" }}>
            ← กลับหน้าเว็บ
          </button>
        )}
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 16px 48px" }}>

        {/* --------------------------------------------------------
            SEGMENT 12 — ADMIN LOGIN FORM
            Visible only when URL = yoursite.com/#admin
            Edit: title, subtitle text, button label.
            Lockout settings are in SEGMENT 8 (handleLogin).
            -------------------------------------------------------- */}
        {showLogin && view !== "admin" && (
          <div style={{ maxWidth: 360, margin: "40px auto", background: "white", borderRadius: 16, border: `1.5px solid ${G[200]}`, padding: 28 }}>
            {/* -- SEGMENT 12A: Login title -- */}
            <h2 style={{ fontSize: 18, fontWeight: 600, color: G[800], marginBottom: 4 }}>เข้าสู่ระบบ Admin</h2>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>สำหรับเจ้าของเว็บไซต์เท่านั้น</p>

            {/* -- SEGMENT 12B: Lockout message -- */}
            {isLocked ? (
              <div style={{ background: "#fff3e0", border: "1.5px solid #ffcc80", borderRadius: 8, padding: "14px 16px", textAlign: "center" }}>
                <p style={{ color: "#e65100", fontSize: 14, fontWeight: 600 }}>🔒 ล็อคชั่วคราว</p>
                <p style={{ color: "#e65100", fontSize: 13, marginTop: 4 }}>ลองใหม่อีกครั้งใน {lockSecondsLeft} วินาที</p>
              </div>
            ) : (
              <>
                {/* -- SEGMENT 12C: Password input -- */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 13, color: "#555", display: "block", marginBottom: 6 }}>รหัสผ่าน</label>
                  <input type="password" value={pass} onChange={e => setPass(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleLogin()}
                    placeholder="กรอกรหัสผ่าน"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${passErr ? "#e53935" : G[200]}`, fontSize: 14, fontFamily: "'Sarabun',sans-serif", outline: "none", boxSizing: "border-box" }} />
                  {passErr && (
                    <p style={{ color: "#e53935", fontSize: 12, marginTop: 4 }}>
                      รหัสผ่านไม่ถูกต้อง ({5 - attempts} ครั้งที่เหลือก่อนล็อค)
                    </p>
                  )}
                </div>

                {/* -- SEGMENT 12D: Login button -- */}
                <button onClick={handleLogin} style={{ ...btn({ background: G[600], color: "white", border: "none", width: "100%", padding: "11px 0", borderRadius: 8, fontSize: 15 }) }}>
                  เข้าสู่ระบบ
                </button>
              </>
            )}
          </div>
        )}

        {/* --------------------------------------------------------
            SEGMENT 13 — ADMIN PANEL
            Only visible after successful login.
            -------------------------------------------------------- */}
        {view === "admin" && (
          <div style={{ marginTop: 24 }}>

            {/* -- SEGMENT 13A: Admin header + Add button -- */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: G[800] }}>จัดการ Q&A</h2>
                <p style={{ fontSize: 13, color: "#777" }}>ทั้งหมด {qaList.length} คำถาม</p>
              </div>
              <button onClick={openAdd} style={{ ...btn({ background: G[600], color: "white", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14 }) }}>
                + เพิ่มคำถามใหม่
              </button>
            </div>

            {/* -- SEGMENT 13B: Add / Edit form -- */}
            {(editItem !== null || form.q !== "" || form.a !== "") && (
              <div style={{ background: "white", border: `2px solid ${G[400]}`, borderRadius: 14, padding: 22, marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: G[800], marginBottom: 16 }}>
                  {editItem ? "✏️ แก้ไขคำถาม" : "➕ เพิ่มคำถามใหม่"}
                </h3>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 13, color: "#555", display: "block", marginBottom: 5 }}>คำถาม *</label>
                  <input value={form.q} onChange={e => setForm(p => ({ ...p, q: e.target.value }))}
                    placeholder="พิมพ์คำถามที่นี่..."
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${G[200]}`, fontSize: 14, fontFamily: "'Sarabun',sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 13, color: "#555", display: "block", marginBottom: 5 }}>หมวดหมู่</label>
                  <select value={form.cat} onChange={e => setForm(p => ({ ...p, cat: e.target.value }))}
                    style={{ padding: "9px 14px", borderRadius: 8, border: `1.5px solid ${G[200]}`, fontSize: 14, fontFamily: "'Sarabun',sans-serif", outline: "none", background: "white" }}>
                    {CATS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, color: "#555", display: "block", marginBottom: 5 }}>คำตอบ *</label>
                  <textarea value={form.a} onChange={e => setForm(p => ({ ...p, a: e.target.value }))}
                    rows={4} placeholder="พิมพ์คำตอบที่นี่..."
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${G[200]}`, fontSize: 14, fontFamily: "'Sarabun',sans-serif", outline: "none", resize: "vertical", lineHeight: 1.7, boxSizing: "border-box" }} />
                </div>
                {formErr && <p style={{ color: "#e53935", fontSize: 12, marginBottom: 10 }}>{formErr}</p>}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={handleSave} style={{ ...btn({ background: G[600], color: "white", border: "none", borderRadius: 8 }) }}>
                    {editItem ? "บันทึกการแก้ไข" : "บันทึก"}
                  </button>
                  <button onClick={() => { setEditItem(null); setForm({ q: "", cat: "ทั่วไป", a: "" }); setFormErr(""); }}
                    style={btn()}>ยกเลิก</button>
                </div>
              </div>
            )}

            {/* -- SEGMENT 13C: Q&A list (admin view) -- */}
            {editItem === null && form.q === "" && form.a === "" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {qaList.map((item, i) => (
                  <div key={item.id} style={{ background: "white", borderRadius: 10, border: `1px solid ${G[100]}`, padding: "13px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ minWidth: 26, height: 26, borderRadius: "50%", background: G[100], color: G[800], fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>{item.q}</span>
                        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 8, background: CAT_COLORS[item.cat]?.bg, color: CAT_COLORS[item.cat]?.color }}>{item.cat}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{item.a.substring(0, 80)}{item.a.length > 80 ? "..." : ""}</p>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button onClick={() => openEdit(item)} style={{ ...btn({ padding: "6px 12px", fontSize: 12, color: G[600] }) }}>✏️ แก้ไข</button>
                      <button onClick={() => setDeleteConfirm(item.id)} style={{ ...btn({ padding: "6px 12px", fontSize: 12, color: "#e53935", borderColor: "#ffcdd2" }) }}>🗑️ ลบ</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* -- SEGMENT 13D: Delete confirmation modal -- */}
            {deleteConfirm && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
                <div style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 320, width: "90%", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🗑️</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "#1a1a1a" }}>ยืนยันการลบ?</h3>
                  <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                    <button onClick={() => handleDelete(deleteConfirm)} style={{ ...btn({ background: "#e53935", color: "white", border: "none", borderRadius: 8 }) }}>ลบ</button>
                    <button onClick={() => setDeleteConfirm(null)} style={btn()}>ยกเลิก</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --------------------------------------------------------
            SEGMENT 14 — PUBLIC VIEW
            What regular visitors see.
            -------------------------------------------------------- */}
        {view === "public" && (
          <div>

            {/* -- SEGMENT 14A: Search bar -- */}
            <div style={{ position: "relative", margin: "22px 0 16px" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: G[400], fontSize: 18 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="ค้นหาคำถาม..."
                style={{ width: "100%", padding: "12px 16px 12px 42px", borderRadius: 12, border: `1.5px solid ${G[200]}`, background: "white", fontSize: 15, fontFamily: "'Sarabun',sans-serif", outline: "none", boxSizing: "border-box" }} />
            </div>

            {/* -- SEGMENT 14B: Category filter buttons -- */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {["ทั้งหมด", ...CATS].map(cat => (
                <button key={cat} onClick={() => setFilterCat(cat)}
                  style={{ padding: "7px 14px", borderRadius: 20, border: `1.5px solid ${filterCat === cat ? G[600] : G[200]}`, background: filterCat === cat ? G[600] : "white", color: filterCat === cat ? "white" : G[600], fontSize: 13, fontFamily: "'Sarabun',sans-serif", cursor: "pointer", fontWeight: 500, transition: "all 0.18s" }}>
                  {cat}
                </button>
              ))}
            </div>

            <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>แสดง {filtered.length} คำถาม</p>

            {/* -- SEGMENT 14C: Q&A accordion list -- */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontSize: 15 }}>ไม่พบคำถามที่ตรงกัน</div>
              )}
              {filtered.map((item, i) => (
                <div key={item.id} style={{ background: "white", borderRadius: 12, border: `1px solid ${G[100]}`, overflow: "hidden" }}>
                  <div onClick={() => toggle(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer" }}>
                    <div style={{ minWidth: 28, height: 28, borderRadius: "50%", background: G[100], color: G[800], fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                    <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.4 }}>{item.q}</span>
                    <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 10, background: CAT_COLORS[item.cat]?.bg, color: CAT_COLORS[item.cat]?.color, whiteSpace: "nowrap" }}>{item.cat}</span>
                    <span style={{ color: G[400], fontSize: 18, transition: "transform 0.25s", display: "inline-block", transform: openIds[item.id] ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                  </div>
                  {openIds[item.id] && (
                    <div style={{ padding: "13px 16px 16px 56px", fontSize: 14, color: "#444", lineHeight: 1.8, borderTop: `1px solid ${G[100]}` }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* -- SEGMENT 14D: Contact section -- */}
            <div style={{ marginTop: 32, background: "white", borderRadius: 12, border: `1.5px solid ${G[200]}`, padding: 24, textAlign: "center" }}>
              <h3 style={{ color: G[800], fontSize: 17, marginBottom: 8 }}>มีคำถามเพิ่มเติม?</h3>
              <p style={{ color: "#666", fontSize: 14, marginBottom: 16, lineHeight: 1.7 }}>
                หากไม่พบคำตอบที่ต้องการ สามารถส่งคำถามมาได้เลย<br />
                ทีมนักรังสีเทคนิคยินดีให้คำแนะนำ
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button style={{ ...btn({ background: G[600], color: "white", border: "none", borderRadius: 8, padding: "10px 22px" }) }}>📧 ส่งอีเมล</button>
                <button style={{ ...btn({ borderColor: G[200], borderRadius: 8, color: G[600], padding: "10px 22px" }) }}>📞 โทรสอบถาม</button>
              </div>
            </div>

            {/* -- SEGMENT 14E: Footer disclaimer -- */}
            <p style={{ textAlign: "center", fontSize: 11, color: "#bbb", marginTop: 20 }}>
              ข้อมูลนี้ใช้เพื่อการศึกษาเท่านั้น กรุณาปรึกษาแพทย์หรือนักรังสีเทคนิคโดยตรง
            </p>

          </div>
        )}
      </div>
    </div>
  );
}
