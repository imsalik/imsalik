/* ============================================================
   SALIK SALAM — portfolio logic
   Edit the DATA below to make this page yours.
   ============================================================ */

const EMAIL = "salam.salik96@gmail.com";
const GITHUB = "https://github.com/imsalik";
const SCHOLAR = "https://scholar.google.com/citations?user=qDd4K7wAAAAJ&hl=en";

/* ---- 1. PROJECTS: shown in the "Selected Work" board ----
   status: "live" | "wip" | "archived"  (drives the colored dot)  */
const PROJECTS = [
  {
    name: "ports",
    desc: "A TUI to inspect and kill whatever's bound to your local ports — tmux- and Docker-aware.",
    stack: "bash · tui · tmux",
    status: "live",
    url: "https://github.com/imsalik/ports",
  },
  {
    name: "kate",
    desc: "A k9s-inspired Kubernetes TUI — live logs, describe, port-forward, vim-style nav. Talks to the cluster directly.",
    stack: "typescript · react · bun · opentui",
    status: "live",
    url: "https://github.com/imsalik/kate",
  },
  {
    name: "customer-segmentation",
    desc: "RFM-based customer segmentation on UK online-retail data — K-means, PCA, outlier handling.",
    stack: "python · scikit-learn · pandas",
    status: "archived",
    url: "https://github.com/imsalik/CustomerSegmentation",
  },
  {
    name: "image-captioning",
    desc: "Generates image captions with a CNN encoder + LSTM decoder, trained on Flickr8k.",
    stack: "python · tensorflow · cnn+lstm",
    status: "archived",
    url: "https://github.com/imsalik/image_captions_generation",
  },
  {
    name: "image-classification",
    desc: "CNNs and transfer learning (ResNet-18) for image classification.",
    stack: "python · pytorch · cnn",
    status: "archived",
    url: "https://github.com/imsalik/image_classification_CNN",
  },
];

/* ---- 2. PUBLICATIONS: shown in the "Research" section ---- */
const PUBLICATIONS = [
  {
    title: "UrbanFlow-GST: A Dynamic Graph-Based Spatio-Temporal Fusion Model for Real-Time Traffic Speed Forecasting",
    venue: "J. of Computational Informatics & Business",
    year: "2026",
    url: "https://jcib.org/index.php/jcib/article/view/66",
  },
  {
    title: "Deep Learning-Based Energy Load Forecasting Using a Hybrid TCN–LSTM Model with Attention",
    venue: "J. of Computational Informatics & Business",
    year: "2025",
    url: "https://jcib.org/index.php/jcib/article/view/65",
  },
  {
    title: "Pothole Detection using Computer Vision and Raspberry Pi",
    venue: "J. of Computing & Biomedical Informatics",
    year: "2024",
    url: "https://www.jcbi.org/index.php/Main/article/view/515",
  },
  {
    title: "Wind Farms and Flexible Loads Contribution in Automatic Generation Control",
    venue: "Energies · MDPI",
    year: "2023",
    url: "https://www.mdpi.com/1996-1073/16/14/5498",
  },
  {
    title: "Optimal Utilization of Load Frequency Control in the Future Pakistan Power System",
    venue: "IEEE Int. Conf. on Emerging Technologies",
    year: "2023",
    url: "https://ieeexplore.ieee.org/abstract/document/10374928",
  },
  {
    title: "Image Processing Based Pattern Recognition and Computerized Embroidery Machine",
    venue: "Pakistan J. of Engineering & Technology",
    year: "2022",
    url: "https://journals.uol.edu.pk/pakjet/article/view/2234",
  },
];

/* ---- 3. STACK: chips under "Tools I Reach For" ---- */
const STACK = [
  "Python", "FastAPI", "LLM Agents", "Knowledge Graphs", "GraphQL",
  "TypeScript", "PyTorch", "React", "Kubernetes", "Docker", "PostgreSQL", "AWS",
];

/* ============================================================
   Rendering — you usually don't need to touch below here.
   ============================================================ */

function renderBoard(list) {
  const tbody = document.querySelector("#board tbody");
  const empty = document.getElementById("boardEmpty");
  tbody.innerHTML = "";

  if (!list.length) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  list.forEach((p, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="rank">${String(i + 1).padStart(2, "0")}</td>
      <td>
        <div class="pname">${p.name}
          <span class="arrow">&#8599;</span>
        </div>
        <div class="pdesc">${p.desc}</div>
      </td>
      <td class="ptag">${p.stack}</td>`;
    tr.addEventListener("click", () => {
      if (p.url && p.url !== "#") window.open(p.url, "_blank", "noopener");
    });
    tbody.appendChild(tr);
  });
}

function renderPubs() {
  const wrap = document.getElementById("pubs");
  wrap.innerHTML = PUBLICATIONS.map(
    (p) => `
    <a class="pub" href="${p.url}" target="_blank" rel="noopener">
      <span class="pub-year">${p.year}</span>
      <span class="pub-body">
        <span class="pub-title">${p.title}</span>
        <span class="pub-venue">${p.venue}</span>
      </span>
      <span class="pub-arrow">&#8599;</span>
    </a>`
  ).join("");
}

function renderChips() {
  const wrap = document.getElementById("chips");
  wrap.innerHTML = STACK.map((s) => `<span class="chip">${s}</span>`).join("");
}

/* ---- search / filter ---- */
function initFilter() {
  const input = document.getElementById("filter");
  input.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    const filtered = PROJECTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.stack.toLowerCase().includes(q)
    );
    renderBoard(filtered);
  });

  // "/" focuses the search, like the reference design
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
    if (e.key === "Escape") {
      input.value = "";
      input.blur();
      renderBoard(PROJECTS);
    }
  });
}

/* ---- click email to copy ---- */
function initEmailCopy() {
  const el = document.getElementById("emailCopy");
  const hint = el.querySelector(".email-hint");
  const orig = hint.textContent;

  el.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      el.classList.add("copied");
      hint.textContent = "copied ✓";
      setTimeout(() => {
        hint.textContent = orig;
        el.classList.remove("copied");
      }, 1400);
    } catch (_) {
      window.location.href = `mailto:${EMAIL}`;
    }
  });
}

/* ---- reveal-on-scroll for sections ---- */
function initReveal() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.style.opacity = "1";
          en.target.style.transform = "none";
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll("section").forEach((s, i) => {
    if (i === 0) return; // hero animates on its own
    s.style.opacity = "0";
    s.style.transform = "translateY(28px)";
    s.style.transition = "opacity .7s var(--ease), transform .7s var(--ease)";
    io.observe(s);
  });
}

/* ---- init ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderBoard(PROJECTS);
  renderPubs();
  renderChips();
  initFilter();
  initEmailCopy();
  initReveal();
  document.getElementById("year").textContent = "2026";
});
