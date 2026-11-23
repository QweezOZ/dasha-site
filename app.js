/* ============================================================
   Всё, что нужно менять — здесь, в CONFIG.
   Фото: положи файлы в папку photos/ и впиши имя файла в src.
   Пустой src = рамка-заглушка.
   ============================================================ */

const CONFIG = {
  // дата, с которой считается счётчик (можно менять)
  since: "2026-07-12T00:00:00+03:00",

  photos: [
    { src: "", caption: "первое фото" },
    { src: "", caption: "тот самый вечер" },
    { src: "", caption: "лето" },
    { src: "", caption: "без повода" },
    { src: "", caption: "у моря" },
    { src: "", caption: "просто вы" },
  ],

  songs: [
    { title: "Название песни", artist: "Исполнитель", note: "почему она про вас" },
    { title: "Название песни", artist: "Исполнитель", note: "" },
    { title: "Название песни", artist: "Исполнитель", note: "" },
    { title: "Название песни", artist: "Исполнитель", note: "" },
  ],

  moments: [
    { when: "12 июля 2026", what: "день, с которого всё началось" },
    { when: "лето 2026", what: "первая совместная поездка" },
    { when: "осень 2026", what: "что-то, что хочется помнить" },
  ],
};

/* ============================================================ */

const MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

const DAY = 86400000;

function humanDate(iso) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function tick() {
  const start = new Date(CONFIG.since).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - start);

  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  const hoursText = `${hours} ${plural(hours, "час", "часа", "часов")} ` +
                    `${minutes} ${plural(minutes, "минута", "минуты", "минут")}`;

  const daysEl = document.getElementById("days");
  if (daysEl) daysEl.textContent = days.toLocaleString("ru-RU");

  const hoursEl = document.getElementById("hours");
  if (hoursEl) hoursEl.textContent = hoursText;

  const statDays = document.getElementById("stat-days");
  if (statDays) statDays.textContent = days.toLocaleString("ru-RU");
}

const CAMERA_SVG = `
<svg width="34" height="34" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
     stroke-linejoin="round" aria-hidden="true">
  <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.7l1.1-1.6A2 2 0 0 1 10 3.6h4a2 2 0 0 1 1.7.8L16.8 6h1.7A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z"/>
  <circle cx="12" cy="12.5" r="3.4"/>
</svg>`;

function renderPhotos() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  CONFIG.photos.forEach((photo) => {
    const frame = document.createElement("figure");
    frame.className = "frame";

    if (photo.src) {
      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.caption || "";
      img.loading = "lazy";
      frame.appendChild(img);
      frame.classList.add("has-photo");
    } else {
      const holder = document.createElement("div");
      holder.className = "placeholder";
      holder.innerHTML = CAMERA_SVG;
      const hint = document.createElement("span");
      hint.textContent = "фото";
      holder.appendChild(hint);
      frame.appendChild(holder);
    }

    if (photo.caption) {
      const cap = document.createElement("figcaption");
      cap.className = "caption";
      cap.textContent = photo.caption;
      frame.appendChild(cap);
    }

    grid.appendChild(frame);
  });
}

function renderSongs() {
  const list = document.getElementById("songs-list");
  if (!list) return;

  CONFIG.songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.className = "song";

    const num = document.createElement("span");
    num.className = "num";
    num.textContent = String(i + 1).padStart(2, "0");

    const body = document.createElement("div");
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = song.title || "—";
    body.appendChild(title);

    if (song.artist) {
      const artist = document.createElement("div");
      artist.className = "artist";
      artist.textContent = song.artist;
      body.appendChild(artist);
    }

    if (song.note) {
      const note = document.createElement("div");
      note.className = "note";
      note.textContent = song.note;
      body.appendChild(note);
    }

    li.append(num, body);
    list.appendChild(li);
  });
}

function renderTimeline() {
  const list = document.getElementById("timeline");
  if (!list) return;

  CONFIG.moments.forEach((moment) => {
    const li = document.createElement("li");

    const when = document.createElement("div");
    when.className = "when";
    when.textContent = moment.when || "";

    const what = document.createElement("div");
    what.className = "what";
    what.textContent = moment.what || "";

    li.append(when, what);
    list.appendChild(li);
  });
}

function renderStats() {
  const photos = document.getElementById("stat-photos");
  if (photos) photos.textContent = CONFIG.photos.length;

  const songs = document.getElementById("stat-songs");
  if (songs) songs.textContent = CONFIG.songs.length;
}

function renderLabel() {
  const label = document.querySelector("[data-since-label]");
  if (label) label.textContent = `с ${humanDate(CONFIG.since)}`;
}

function reveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((el) => io.observe(el));
}

renderLabel();
renderStats();
renderPhotos();
renderSongs();
renderTimeline();
reveal();
tick();
setInterval(tick, 15000);
