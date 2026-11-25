import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { imageStudies, projects } from "./content";
import "./styles.css";
import "./motion.css";

const ArrowUpRight = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>;
const ArrowDown = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v15m-6-6 6 6 6-6" /></svg>;
const SearchIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>;
const CloseIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>;

function SideRail({ onSearch, activeSection }) {
  const links = [
    ["01", "Overview", "#top"],
    ["02", "The work", "#work"],
    ["03", "Field notes", "#journal"],
    ["04", "Collections", "#collections"],
    ["05", "About", "#about"],
  ];

  return (
    <aside className="side-rail">
      <a className="brand-lockup" href="#top" aria-label="Rudra archive home">
        <span className="brand-mark">r.</span>
        <span className="brand-name">RUDRA <i>—</i><br/>ARCHIVE</span>
      </a>
      <div className="rail-rule" />
      <p className="eyebrow rail-heading">THE INDEX</p>
      <nav className="rail-nav" aria-label="Main navigation">
        {links.map(([number, label, href]) => (
          <a className={activeSection === href.slice(1) ? "rail-link active" : "rail-link"} href={href} key={number}>
            <span className="rail-number">{number}</span><span>{label}</span><span className="rail-dot" />
          </a>
        ))}
      </nav>
      <div className="rail-bottom">
        <div className="status-line"><span className="status-pulse" /> OPEN / IN PROGRESS</div>
        <p>Collected slowly.<br/>Made to be revisited.</p>
        <span className="rail-edition">PERSONAL INDEX · VOL. 01</span>
      </div>
      <button className="rail-search" onClick={onSearch}><SearchIcon /><span>Search the archive</span><kbd>⌘ K</kbd></button>
    </aside>
  );
}

function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const targets = [
      ["Overview", "top", "A note on this place"],
      ["The work", "work", "Projects and experiments"],
      ["Field notes", "journal", "Journal and observations"],
      ["Collections", "collections", "Photographs and memories"],
      ["About", "about", "A little context"],
    ];
    return targets.filter(([title, , desc]) => (title + " " + desc).toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="search-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="search-dialog" role="dialog" aria-modal="true" aria-label="Search the archive">
        <div className="search-dialog-head"><span className="eyebrow">SEARCH THE INDEX</span><button className="icon-button" onClick={onClose} aria-label="Close search"><CloseIcon /></button></div>
        <label className="search-field"><SearchIcon /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “projects” or “memories”…" /></label>
        <div className="search-results">
          {results.length ? results.map(([title, id, desc]) => <a href={`#${id}`} key={id} onClick={onClose}><span><strong>{title}</strong><small>{desc}</small></span><ArrowUpRight /></a>) : <p className="empty-search">Nothing in the index by that name. Try another word.</p>}
        </div>
        <div className="search-hint"><span>ESC TO CLOSE</span><span>AN INDEX, NOT AN ALGORITHM</span></div>
      </section>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={`project-card ${project.tone}`}>
      <div className="project-image-wrap">
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
        <span className="project-number">{project.number} / 04</span>
        <span className="project-open"><ArrowUpRight /></span>
      </div>
      <div className="project-meta"><span>{project.category}</span><span>CASE FILE</span></div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    </article>
  );
}

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [projectFilter, setProjectFilter] = useState("ALL");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const filteredProjects = projectFilter === "ALL" ? projects : projects.filter(project => project.category.includes(projectFilter));

  const openSearch = React.useCallback(() => setSearchOpen(true), []);
  const closeSearch = React.useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const sectionIds = ["top", "work", "journal", "collections", "about"];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.35, 0.6] });
    sectionIds.forEach(id => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const targets = document.querySelectorAll(".section-heading, .project-card, .journal-intro, .journal-empty, .collection-card, .about-content, .site-footer");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    targets.forEach((node) => node.classList.add("reveal-on-scroll"));
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [projectFilter]);

  const filters = ["ALL", "AI", "PRODUCT", "INDUSTRIAL"];

  return (
    <div className="site-shell">
      <SideRail onSearch={openSearch} activeSection={activeSection} />
      <div className="mobile-topbar">
        <a href="#top" className="mobile-brand"><span className="brand-mark">r.</span><span>RUDRA / ARCHIVE</span></a>
        <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <CloseIcon /> : <span className="menu-lines"><i/><i/></span>}<span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span></button>
        {mobileMenuOpen && <nav className="mobile-menu">{[["Overview","#top"],["The work","#work"],["Field notes","#journal"],["Collections","#collections"],["About","#about"]].map(([label,href]) => <a href={href} onClick={() => setMobileMenuOpen(false)} key={href}>{label}<ArrowUpRight /></a>)}<button onClick={() => {setMobileMenuOpen(false);openSearch();}}>Search the archive <SearchIcon /></button></nav>}
      </div>

      <main className="main-content">
        <div className="topline"><span>PERSONAL INDEX <b>✳</b> EST. 2005</span><span>AN ONGOING DOCUMENT <i>·</i> 2026</span></div>

        <section className="hero-section" id="top">
          <div className="hero-kicker"><span className="eyebrow">A RECORD OF THE MAKING</span><span className="eyebrow">ISSUE NO. 001 — ALWAYS OPEN</span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1>A life,<br/><em>in progress.</em></h1>
              <p className="hero-deck">Things made with curiosity. Places remembered in fragments. Ideas that refused to stay ideas.</p>
              <div className="hero-actions"><a className="text-link" href="#work">EXPLORE THE INDEX <ArrowUpRight /></a><a className="quiet-link" href="#journal">READ THE FIELD NOTES <ArrowDown /></a></div>
            </div>
            <aside className="chapter-note">
              <span className="note-index">CURRENT CHAPTER <b>↘</b></span>
              <span className="chapter-number">01<span>/</span>26</span>
              <h2>Making room<br/>for what’s next.</h2>
              <p>A little engineering. A lot of learning. Plenty left to notice.</p>
              <div className="note-footer"><span>STATUS</span><span><i className="status-pulse"/> IN MOTION</span></div>
            </aside>
          </div>

          <div className="hero-gallery" aria-label="Visual studies, temporary images">
            <figure className="hero-photo hero-photo-main">
              <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90" alt="A quiet creative workspace in soft afternoon light" fetchPriority="high" />
              <figcaption><span>01 / THE WORKROOM</span><span>VISUAL STUDY · REPLACE WITH YOUR OWN</span></figcaption>
            </figure>
            <figure className="hero-photo hero-photo-side">
              <img src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85" alt="A landscape with low golden sunlight" />
              <figcaption><span>02 / OUTSIDE</span><span>VISUAL STUDY</span></figcaption>
            </figure>
            <div className="gallery-aside">
              <span className="tiny-star">✳</span>
              <p>Not a finished story.<br/><em>A place to keep becoming.</em></p>
              <span className="eyebrow">SCROLL TO WANDER</span>
              <a href="#work" className="round-arrow" aria-label="Scroll to selected work"><ArrowDown /></a>
            </div>
          </div>
          <div className="hero-footnote"><span>INDEPENDENTLY COLLECTED</span><span>BUILD <b>·</b> LIVE <b>·</b> LEARN <b>·</b> REMEMBER</span></div>
        </section>

        <section className="work-section section-block" id="work">
          <div className="section-heading">
            <div><span className="eyebrow">01 — THE WORKROOM</span><h2>Things I’ve <em>put into the world.</em></h2></div>
            <p>Projects, experiments and half-formed ideas. Each one gets its own case file as the story develops.</p>
          </div>
          <div className="filter-bar" aria-label="Filter projects">
            <span className="eyebrow">BROWSE BY THREAD</span>
            <div>{filters.map(filter => <button key={filter} onClick={() => setProjectFilter(filter)} className={projectFilter === filter ? "filter-pill selected" : "filter-pill"}>{filter}</button>)}</div>
          </div>
          <div className="project-grid">
            {filteredProjects.map(project => <ProjectCard project={project} key={project.number} />)}
          </div>
          <div className="section-endnote"><span>MORE CASE FILES WILL FIND THEIR WAY HERE</span><span>END OF SELECTION <b>↘</b></span></div>
        </section>

        <section className="journal-section section-block" id="journal">
          <div className="section-heading journal-heading">
            <div><span className="eyebrow">02 — THE FIELD NOTES</span><h2>Life, between <em>the milestones.</em></h2></div>
            <p>Small observations, long days, changing plans, trips, people and ordinary moments worth keeping.</p>
          </div>
          <div className="journal-intro">
            <span className="journal-stamp">FIELD<br/>NOTE<br/><b>NO. 001</b></span>
            <div><p className="journal-quote">“The archive is not just what happened. It’s what I chose to keep.”</p><span className="eyebrow">A NOTE TO THE FUTURE SELF</span></div>
            <p className="journal-caption">This is where the days will gather. The first entry should be yours.</p>
          </div>
          <div className="journal-empty">
            <div className="empty-mark">✳</div><div><span className="eyebrow">THE FIRST PAGE IS STILL BLANK</span><h3>Leave room for a life to happen.</h3><p>When the journal is connected, you’ll be able to add a note, a photo set, a video or a full story—right from your phone.</p></div>
            <span className="empty-index">NO. 001<br/>WAITING</span>
          </div>
        </section>

        <section className="collections-section section-block" id="collections">
          <div className="section-heading">
            <div><span className="eyebrow">03 — THE COLLECTIONS</span><h2>Things worth <em>looking back at.</em></h2></div>
            <p>A visual cabinet for places, photographs, people, books, sounds and all the details that make a year feel like a year.</p>
          </div>
          <div className="collection-grid">
            {imageStudies.map((item, index) => <figure className={`collection-card collection-${item.shape}`} key={item.label}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <figcaption><span>{item.label}</span><p>{item.note}</p><small>IMAGE STUDY · TEMPORARY ART DIRECTION</small></figcaption>
            </figure>)}
          </div>
          <div className="collection-footer"><span>THE MEMORY VAULT</span><span>PHOTOS / FILM / PLACES / PEOPLE</span></div>
        </section>

        <section className="about-section section-block" id="about">
          <div className="about-label"><span className="eyebrow">04 — A LITTLE CONTEXT</span><span className="about-mark">R<span>.</span></span></div>
          <div className="about-content"><h2>Not a résumé.<br/><em>A record of becoming.</em></h2><div className="about-copy"><p>I’m Rudra: an engineering student, a builder of small things, and a collector of moments. This space brings those threads together without pretending they are separate parts of a life.</p><p>Some things here will be polished. Some will be unfinished. Some will only make sense to me. That’s the point.</p><a href="#top" className="text-link">BACK TO THE BEGINNING <ArrowUpRight /></a></div></div>
        </section>

        <footer className="site-footer">
          <div className="footer-top"><span className="eyebrow">RUDRA / PERSONAL ARCHIVE</span><span className="footer-edition">A LIFE IN PROGRESS <i>✳</i> 2026</span></div>
          <div className="footer-main"><p>Keep making.<br/><em>Keep noticing.</em></p><a href="#top" className="back-top">BACK TO TOP <ArrowUpRight /></a></div>
          <div className="footer-bottom"><span>MADE TO GROW, NOT TO BE FINISHED.</span><span>DESIGNED AS A PLACE TO RETURN TO.</span></div>
        </footer>
      </main>
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);