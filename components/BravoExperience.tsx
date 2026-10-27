"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    title: "Mobile repair & diagnostics",
    image: "/media/service-mobile-diagnostics.jpg",
    alt: "Mobile technician running diagnostics on a commercial cargo van",
  },
  {
    title: "Preventive maintenance",
    image: "/media/service-preventive-maintenance.jpg",
    alt: "Technician inspecting a commercial vehicle engine during preventive maintenance",
  },
  {
    title: "Fleet & commercial support",
    image: "/media/service-fleet-support.jpg",
    alt: "Mobile service truck supporting a row of commercial fleet vans",
  },
  {
    title: "Third-party service support",
    image: "/media/service-partner-support.jpg",
    alt: "Technician documenting a commercial vehicle inspection for a service partner",
  },
  {
    title: "Emergency on-site repair",
    image: "/media/service-emergency-onsite.jpg",
    alt: "Mobile technician performing a safe after-hours repair on a work van",
  },
];

const industries = [
  ["Fleet operations", "Maintenance support that protects uptime across small and mid-sized fleets."],
  ["Delivery & logistics", "On-site service for vehicles that cannot afford unnecessary depot time."],
  ["Construction & trades", "Field-ready support for the trucks and vans that move crews and equipment."],
  ["Independent operators", "Professional diagnostics and repairs for rideshare and owner-operated vehicles."],
  ["Automotive partners", "Disciplined third-party execution with clear findings and closeout documentation."],
] as const;

function BrandMark() {
  return (
    <a className="brand-mark" href="#top" aria-label="54 Bravo Auto Repair home">
      <span className="brand-ambience" aria-hidden="true" />
      <span className="flag-wave" aria-hidden="true">
        <span className="flag-canton">✦ ✦ ✦<br />✦ ✦ ✦</span>
      </span>
      <Image
        className="brand-logo"
        src="/media/54-bravo-logo-polished.png"
        alt=""
        width={1254}
        height={1254}
        priority
      />
    </a>
  );
}

export function BravoExperience() {
  const root = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestState, setRequestState] = useState<"idle" | "ready">("idle");

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const mm = gsap.matchMedia();

      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.to(".hero-orbit", {
        rotate: 360,
        duration: 34,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero-media", {
        yPercent: 12,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach((card) => {
        gsap.from(card, {
          y: 64,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 84%" },
        });
      });

      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.07,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 1,
          },
        },
      );

      mm.add("(min-width: 900px)", () => {
        ScrollTrigger.create({
          trigger: ".proof-layout",
          start: "top 12%",
          end: "bottom 78%",
          pin: ".proof-heading",
          pinSpacing: false,
        });

        gsap.utils.toArray<HTMLElement>(".stack-card").forEach((card, index) => {
          gsap.to(card, {
            y: index * -18,
            scale: 1 - index * 0.018,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 68%",
              end: "top 20%",
              scrub: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  function handleTilt(event: React.PointerEvent<HTMLDivElement>) {
    if (!visual.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    visual.current.style.setProperty("--tilt-x", `${y * -9}deg`);
    visual.current.style.setProperty("--tilt-y", `${x * 11}deg`);
  }

  function resetTilt() {
    visual.current?.style.setProperty("--tilt-x", "0deg");
    visual.current?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <main ref={root} id="top" className="site-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <BrandMark />
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>How we work</a>
          <a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a>
        </nav>
        <a className="header-cta" href="#contact">Request service</a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </header>

      <div id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grain" aria-hidden="true" />
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/field-service-hero.jpg"
            aria-hidden="true"
          >
            <source src="/media/mission-loop.mp4" type="video/mp4" />
          </video>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-reveal">Veteran-owned mobile auto repair</p>
              <h1 id="hero-title" className="hero-reveal">
                Mobile repair.<br />Mission ready.
              </h1>
              <p className="hero-summary hero-reveal">
                Professional-grade diagnostics, repair, and fleet support—delivered where the work is.
              </p>
              <div className="hero-actions hero-reveal">
                <a className="button button-primary" href="#contact">Request service</a>
                <a className="button button-ghost" href="#services">Explore capabilities</a>
              </div>
            </div>
            <div className="hero-art hero-reveal" aria-hidden="true">
              <div className="hero-orbit" />
              <div className="hero-media">
                <Image
                  src="/media/brake-assembly-3d.png"
                  alt=""
                  width={1344}
                  height={1152}
                  priority
                  sizes="(max-width: 980px) 42rem, 47vw"
                />
              </div>
            </div>
          </div>
          <div className="hero-foot hero-reveal" aria-hidden="true">
            <span>Discipline</span><i />
            <span>Precision</span><i />
            <span>Reliability</span>
          </div>
        </section>

        <section className="manifesto" aria-label="Our operating standard">
          <p>
            {"We bring the shop to the mission—combining military-grade discipline with commercial-level execution."
              .split(" ")
              .map((word, index) => (
                <span className="manifesto-word" key={`${word}-${index}`}>{word} </span>
              ))}
          </p>
        </section>

        <section className="services section-shell" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">Built for the field</p>
            <h2 id="services-title">Capability without the shop delay.</h2>
            <p>One disciplined service partner for vehicles, fleets, and third-party programs.</p>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <article className={`service-card service-card-${index + 1} reveal-card`} key={service.title}>
                <Image
                  className="service-card-image"
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 700px) 90vw, (max-width: 1100px) 46vw, 31vw"
                />
                <div className="service-card-shade" aria-hidden="true" />
                <div className="service-card-content">
                  <h3>{service.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="field-force section-shell" aria-labelledby="field-force-title">
          <div className="field-force-intro reveal-card">
            <p className="eyebrow">People + equipment</p>
            <h2 id="field-force-title">The capability arrives with the crew.</h2>
            <p>
              Professional technicians, organized mobile equipment, and a field-ready operating standard—built
              to support working vehicles wherever the mission requires.
            </p>
          </div>
          <div className="field-force-gallery">
            <figure className="field-force-frame field-force-vehicle reveal-card">
              <Image
                src="/media/mobile-service-truck.jpg"
                alt="Fully equipped charcoal mobile auto service truck in a fleet yard"
                fill
                sizes="(max-width: 800px) 90vw, 58vw"
              />
              <figcaption><strong>Equipped for the field</strong></figcaption>
            </figure>
            <figure className="field-force-frame field-force-team reveal-card">
              <Image
                src="/media/service-team.jpg"
                alt="Four professional mobile automotive service technicians beside a service truck"
                fill
                sizes="(max-width: 800px) 90vw, 34vw"
              />
              <figcaption><strong>Disciplined execution</strong></figcaption>
            </figure>
          </div>
        </section>

        <section className="mechanical-stage section-shell" aria-labelledby="precision-title">
          <div
            className="mechanical-visual reveal-card"
            onPointerMove={handleTilt}
            onPointerLeave={resetTilt}
          >
            <div className="mechanical-halo" aria-hidden="true" />
            <div className="mechanical-object" ref={visual}>
              <Image
                src="/media/brake-assembly-3d.png"
                alt="Detailed brake rotor, caliper, and torque wrench assembly"
                width={1344}
                height={1152}
                sizes="(max-width: 980px) 90vw, 56vw"
              />
            </div>
            <span className="coordinate coordinate-a" aria-hidden="true">54B / TORQUE</span>
            <span className="coordinate coordinate-b" aria-hidden="true">SPEC-VERIFIED</span>
          </div>
          <div className="mechanical-copy reveal-card">
            <p className="eyebrow">Precision under pressure</p>
            <h2 id="precision-title">The right diagnosis before the first turn of the wrench.</h2>
            <p>
              Strong repairs start with disciplined troubleshooting. We isolate the issue, explain the finding,
              and execute the service your vehicle actually needs.
            </p>
            <ul>
              <li><span>01</span> Systematic diagnostics</li>
              <li><span>02</span> Clear service recommendations</li>
              <li><span>03</span> Professional closeout</li>
            </ul>
          </div>
        </section>

        <section className="proof section-shell" id="process" aria-labelledby="process-title">
          <div className="proof-layout">
            <div className="proof-heading">
              <p className="eyebrow">A controlled service sequence</p>
              <h2 id="process-title">No guesswork.<br />No loose ends.</h2>
              <p>Every call follows a clear operating rhythm from intake through closeout.</p>
            </div>
            <div className="proof-stack">
              <article className="stack-card">
                <span>Assess</span>
                <h3>Understand the mission.</h3>
                <p>Vehicle, symptoms, location, operating demands, and urgency are established before dispatch.</p>
                <strong>Intake / Scope</strong>
              </article>
              <article className="stack-card">
                <span>Diagnose</span>
                <h3>Find the actual fault.</h3>
                <p>Measured checks and practical experience replace parts-swapping and assumption.</p>
                <strong>Inspect / Verify</strong>
              </article>
              <article className="stack-card">
                <span>Execute</span>
                <h3>Repair with intent.</h3>
                <p>Approved work is completed on site with safety, serviceability, and uptime in view.</p>
                <strong>Repair / Test</strong>
              </article>
              <article className="stack-card">
                <span>Close out</span>
                <h3>Leave clarity behind.</h3>
                <p>Findings, completed work, and next recommendations are communicated before the mission closes.</p>
                <strong>Report / Release</strong>
              </article>
            </div>
          </div>
        </section>

        <section className="industries section-shell" id="industries" aria-labelledby="industries-title">
          <div className="section-heading compact">
            <p className="eyebrow">Who we support</p>
            <h2 id="industries-title">Built around working vehicles.</h2>
          </div>
          <div className="industry-accordion" role="list">
            {industries.map(([title, description], index) => (
              <button
                className={activeIndustry === index ? "industry-panel active" : "industry-panel"}
                key={title}
                type="button"
                onClick={() => setActiveIndustry(index)}
                aria-expanded={activeIndustry === index}
              >
                <span className="industry-index">0{index + 1}</span>
                <span className="industry-title">{title}</span>
                <span className="industry-detail">{description}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="marquee" aria-label="Service values">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-group" aria-hidden={copy === 1} key={copy}>
                <span>Veteran-owned</span><i />
                <span>On-site repair</span><i />
                <span>Fleet support</span><i />
                <span>Mission-focused</span><i />
              </div>
            ))}
          </div>
        </div>

        <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy">
            <p className="eyebrow">Ready when the mission calls</p>
            <h2 id="contact-title">Put 54 Bravo on your service plan.</h2>
            <p>
              Tell us what is down, where it is, and what the vehicle supports. We will turn that into a clear service request.
            </p>
          </div>
          <form
            className="contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              setRequestState("ready");
            }}
          >
            <div className="field-row">
              <label>
                Name
                <input name="name" autoComplete="name" required placeholder="Your name" />
              </label>
              <label>
                Best contact
                <input name="contact" required placeholder="Phone or email" />
              </label>
            </div>
            <label>
              Vehicle or fleet
              <input name="vehicle" required placeholder="Year, make, model, or fleet type" />
            </label>
            <label>
              What is happening?
              <textarea name="details" required rows={4} placeholder="Symptoms, location, and urgency" />
            </label>
            <button className="button button-primary submit-button" type="submit">Prepare service request</button>
            <p className="form-status" role="status" aria-live="polite">
              {requestState === "ready"
                ? "Your request is staged in this browser only. This build does not transmit submissions."
                : "Online dispatch intake is not connected yet. No details are transmitted."}
            </p>
          </form>
        </section>
      </div>

      <footer className="site-footer">
        <BrandMark />
        <p>Veteran-owned. Mission-focused. Built for reliability.</p>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#industries">Industries</a>
          <a href="#contact">Contact</a>
        </div>
        <small>© {new Date().getFullYear()} 54 Bravo Auto Repair. Built by Fee The Developer.</small>
      </footer>
    </main>
  );
}
