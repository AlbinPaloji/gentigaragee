import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent, type PointerEvent } from "react";
import { ArrowRight, Check, ChevronDown, Droplets, Instagram, Menu, MessageCircle, ShieldCheck, Sparkles, SprayCan, WandSparkles, X } from "lucide-react";
import heroImage from "../assets/genti-hero.jpg";
import paintImage from "../assets/genti-paint.jpg";
import polishImage from "../assets/genti-polish.jpg";
import waterImage from "../assets/genti-water.jpg";
import interiorImage from "../assets/genti-interior.jpg";
import ctaImage from "../assets/genti-cta.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GentiGarage | Premium Auto Detailing Kosovo" },
      { name: "description", content: "Premium auto detailing in Kosovo: paint correction, polishing, ceramic coating, deep cleaning, hydrophobic protection and deep gloss finish." },
      { property: "og:title", content: "GentiGarage | Premium Auto Detailing Kosovo" },
      { property: "og:description", content: "Precision paint correction, ceramic protection and showroom finishes for vehicles that deserve more." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: GentiGarage,
});

const services = [
  { name: "Paint Correction", tag: "Paint", text: "Korrigjim profesional i swirl marks dhe gërvishtjeve të lehta për reflektim të pastër.", image: paintImage, icon: WandSparkles },
  { name: "Polishing", tag: "Gloss", text: "Polirim profesional që rikthen shkëlqimin dhe thellësinë natyrale të bojës.", image: polishImage, icon: Sparkles },
  { name: "Ceramic Coating", tag: "Protection", text: "Mbrojtje qeramike premium, rezistente dhe e krijuar për jetëgjatësi.", image: waterImage, icon: ShieldCheck },
  { name: "Deep Cleaning", tag: "Interior", text: "Pastrim shumë i detajuar i interierit dhe eksterierit, pa kompromise.", image: interiorImage, icon: SprayCan },
  { name: "Hydrophobic Finish", tag: "Water", text: "Shtresë hidrofobike që largon ujin, papastërtitë dhe lehtëson mirëmbajtjen.", image: waterImage, icon: Droplets },
  { name: "Deep Gloss", tag: "Finish", text: "Përfundim ultra-gloss me reflektim të thellë dhe pamje showroom.", image: heroImage, icon: Sparkles },
];

const process = [
  ["Inspection", "Kontroll i detajuar i automjetit."], ["Deep Cleaning", "Pastrim profesional i interierit dhe eksterierit."],
  ["Paint Correction", "Korrigjim i defekteve dhe përmirësim i bojës."], ["Polishing", "Rritje e reflektimit dhe shkëlqimit."],
  ["Protection", "Ceramic coating dhe hydrophobic protection."], ["Final Finish", "Kontroll final dhe showroom finish."],
];

const gallery = [
  { title: "Mirror Black", cat: "Exterior", image: heroImage }, { title: "Cabin Reset", cat: "Interior", image: interiorImage },
  { title: "Defect Removal", cat: "Paint Correction", image: polishImage }, { title: "Water Beading", cat: "Ceramic Coating", image: waterImage },
  { title: "Inspection Finish", cat: "Before & After", image: paintImage }, { title: "Final Handover", cat: "Exterior", image: ctaImage },
];

function GentiGarage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");
  const [slider, setSlider] = useState(50);
  const [submitted, setSubmitted] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shownGallery = useMemo(() => filter === "All" ? gallery : gallery.filter((item) => item.cat === filter), [filter]);
  const moveSlider = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = sliderRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setSlider(Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100)));
  };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  return <main className="overflow-x-hidden bg-background text-foreground">
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl transition-all ${scrolled ? "py-0" : "py-2"}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3">
        <a href="#home" className="font-display text-lg uppercase text-foreground">GENTI<span className="text-primary">GARAGE</span></a>
        <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase text-muted-foreground md:flex">
          {["about", "services", "process", "gallery", "contact"].map((item) => <a key={item} href={`#${item}`} className="transition-colors hover:text-primary">{item}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#book" className="bg-primary px-4 py-2 font-mono text-[11px] font-bold uppercase text-primary-foreground">Book your detail</a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid size-9 place-items-center border border-border md:hidden" aria-label="Toggle menu">{menuOpen ? <X size={17}/> : <Menu size={17}/>}</button>
        </div>
      </div>
      {menuOpen && <nav className="border-t border-border bg-background px-5 py-5 md:hidden">{["about", "services", "process", "gallery", "contact"].map((item) => <a key={item} onClick={() => setMenuOpen(false)} href={`#${item}`} className="block border-b border-border py-3 font-mono text-xs uppercase text-muted-foreground">{item}</a>)}</nav>}
    </header>

    <section id="home" className="relative min-h-[92svh] overflow-hidden pt-20">
      <img src={heroImage} width={1920} height={1088} alt="Black luxury sports car inside the GentiGarage detailing studio" className="absolute inset-0 size-full object-cover object-[68%_center]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/15" />
      <div className="kinetic-sweep pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-[130%] -translate-x-1/2 -rotate-12 bg-primary/70 md:block" />
      <div className="relative mx-auto flex min-h-[calc(92svh-5rem)] max-w-[1400px] flex-col justify-end px-5 pb-12 md:pb-16">
        <div className="kinetic-rise mb-4 flex items-center gap-3 font-mono text-[10px] uppercase text-primary"><span className="h-px w-8 bg-primary"/>Premium Auto Detailing by GentiGarage</div>
        <h1 className="max-w-6xl font-display text-[clamp(3rem,9vw,8rem)] uppercase leading-[.88] text-foreground"><span className="kinetic-rise block">Perfection in</span><span className="kinetic-rise block text-primary">Every Detail</span></h1>
        <p className="kinetic-rise mt-5 max-w-[48ch] text-base text-foreground/75">From paint correction to ceramic protection, we bring your vehicle back to its deepest gloss.</p>
        <div className="kinetic-rise mt-7 flex flex-col gap-3 sm:flex-row"><a href="#book" className="inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 font-mono text-xs font-bold uppercase text-primary-foreground">Book your detail <ArrowRight size={15}/></a><a href="#services" className="inline-flex items-center justify-center border border-border bg-background/40 px-6 py-4 font-mono text-xs font-bold uppercase backdrop-blur-md hover:border-primary hover:text-primary">View our services</a></div>
        <div className="mt-8 flex gap-5 font-mono text-[10px] uppercase text-muted-foreground"><span>Precision</span><span className="text-primary">/</span><span>Protection</span><span className="text-primary">/</span><span>Deep Gloss</span></div>
      </div>
    </section>

    <section id="about" className="border-b border-border bg-card"><div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 md:grid-cols-12">
      <div className="md:col-span-4"><Eyebrow text="(a) About GentiGarage"/><h2 className="mt-4 font-display text-4xl uppercase leading-none md:text-5xl">A studio.<br/><span className="text-primary">Not a wash.</span></h2></div>
      <div className="md:col-span-5"><p className="text-base leading-relaxed text-foreground/90">GentiGarage është një studio e fokusuar në auto detailing profesional, ku çdo automjet trajtohet me kujdes maksimal dhe vëmendje ndaj çdo detaji. Nga korrigjimi i bojës deri te mbrojtja qeramike, qëllimi ynë është të rikthejmë dhe të ruajmë pamjen premium të automjetit tuaj.</p><div className="mt-7 grid gap-px bg-border sm:grid-cols-2">{["Professional Detailing","Attention to Detail","Premium Products","Long-Lasting Protection","Showroom Finish"].map(x=><div key={x} className="flex items-center gap-2 bg-background p-3 text-sm"><Check className="text-primary" size={15}/>{x}</div>)}</div></div>
      <div className="md:col-span-3"><img src={paintImage} loading="lazy" width={1200} height={912} alt="Deep glossy corrected black paint" className="h-full min-h-72 w-full object-cover"/></div>
    </div></section>

    <section id="services" className="border-b border-border"><SectionHead eyebrow="(b) Capabilities" title="Six services" side="Select a discipline"/><div className="mx-auto grid max-w-[1400px] gap-px bg-border px-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">{services.map((service,i)=>{const Icon=service.icon;return <article key={service.name} className="group bg-background p-5 transition-colors hover:bg-card"><div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase"><span className="text-primary">0{i+1}</span><span className="text-muted-foreground">{service.tag}</span></div><div className="overflow-hidden"><img src={service.image} loading="lazy" width={1200} height={912} alt={`${service.name} at GentiGarage`} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"/></div><div className="mt-4 flex items-center gap-2 text-primary"><Icon size={17}/><h3 className="font-display text-lg uppercase text-foreground">{service.name}</h3></div><p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">{service.text}</p><a href="#book" className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase group-hover:text-primary">Learn more <ArrowRight size={13}/></a></article>})}</div></section>

    <section className="border-b border-border bg-card py-20"><div className="mx-auto max-w-[1400px] px-5"><div className="mb-9 text-center"><Eyebrow text="(c) The proof"/><h2 className="mt-3 font-display text-4xl uppercase md:text-6xl">See the difference</h2><p className="mt-3 text-muted-foreground">Real results. Real transformation.</p></div><div ref={sliderRef} onPointerDown={(e)=>{e.currentTarget.setPointerCapture(e.pointerId);moveSlider(e)}} onPointerMove={(e)=>{if(e.currentTarget.hasPointerCapture(e.pointerId))moveSlider(e)}} className="relative mx-auto aspect-[16/9] max-h-[680px] cursor-ew-resize touch-none overflow-hidden select-none">
      <img src={paintImage} loading="lazy" width={1200} height={912} alt="Vehicle paint before detailing" className="image-before absolute inset-0 size-full object-cover"/><div className="absolute inset-y-0 left-0 overflow-hidden" style={{width:`${slider}%`}}><img src={paintImage} loading="lazy" width={1200} height={912} alt="Vehicle paint after detailing" className="absolute inset-y-0 left-0 h-full max-w-none object-cover" style={{width:sliderRef.current?.clientWidth ?? "100%"}}/></div><div className="absolute inset-y-0 w-0.5 bg-primary" style={{left:`${slider}%`}}><span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground">↔</span></div><span className="absolute left-4 top-4 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase">Before</span><span className="absolute right-4 top-4 bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase text-primary-foreground">After</span></div></div></section>

    <section id="process" className="border-b border-border"><SectionHead eyebrow="(d) Premium detailing process" title="Six controlled steps"/><ol className="mx-auto grid max-w-[1400px] gap-px bg-border px-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">{process.map(([title,text],i)=><li key={title} className="group bg-background p-6 hover:bg-card"><span className="font-display text-5xl text-border group-hover:text-primary">0{i+1}</span><h3 className="mt-4 font-display uppercase">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p></li>)}</ol></section>

    <section id="gallery" className="border-b border-border bg-card"><div className="mx-auto max-w-[1400px] px-5 py-20"><div className="flex flex-wrap items-end justify-between gap-6"><div><Eyebrow text="(e) Selected work"/><h2 className="mt-3 font-display text-4xl uppercase md:text-6xl">The gallery</h2></div><div className="flex max-w-full gap-2 overflow-x-auto pb-2">{["All","Exterior","Interior","Paint Correction","Ceramic Coating","Before & After"].map(cat=><button key={cat} onClick={()=>setFilter(cat)} className={`shrink-0 border px-3 py-2 font-mono text-[10px] font-bold uppercase ${filter===cat?"border-primary bg-primary text-primary-foreground":"border-border text-muted-foreground hover:border-primary"}`}>{cat}</button>)}</div></div><div className="mt-9 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">{shownGallery.map(item=><figure key={item.title} className="group bg-background"><div className="overflow-hidden"><img src={item.image} loading="lazy" width={1200} height={912} alt={item.title} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"/></div><figcaption className="flex items-center justify-between p-4"><h3 className="font-display uppercase">{item.title}</h3><span className="font-mono text-[9px] uppercase text-primary">{item.cat}</span></figcaption></figure>)}</div></div></section>

    <section className="border-b border-border"><div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 md:grid-cols-12"><div className="md:col-span-5"><Eyebrow text="(f) Why us"/><h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">Why choose<br/><span className="text-primary">GentiGarage?</span></h2></div><div className="grid gap-px bg-border sm:grid-cols-2 md:col-span-7">{["Professional detailing","Premium finish","Attention to every detail","High-quality products","Paint protection","Hydrophobic protection","Deep gloss finish"].map((x,i)=><div key={x} className="flex items-center gap-3 bg-background p-5"><span className="font-display text-primary">0{i+1}</span><span className="text-sm">{x}</span></div>)}</div></div></section>

    <section className="relative min-h-[580px] overflow-hidden"><img src={ctaImage} loading="lazy" width={1920} height={912} alt="Premium black car with a showroom finish" className="absolute inset-0 size-full object-cover object-[65%_center]"/><div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent"/><div className="relative mx-auto flex min-h-[580px] max-w-[1400px] items-center px-5 py-20"><div className="max-w-2xl"><Eyebrow text="(g) Ready"/><h2 className="mt-4 font-display text-5xl uppercase leading-[.9] md:text-7xl">Your car deserves more than a wash.</h2><p className="mt-6 text-lg text-foreground/70">Give your vehicle the finish, protection and attention it deserves.</p><a href="#book" className="mt-8 inline-flex items-center gap-3 bg-primary px-6 py-4 font-mono text-xs font-bold uppercase text-primary-foreground">Book your detail <ArrowRight size={15}/></a></div></div></section>

    <section id="book" className="border-b border-border"><div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-12"><div id="contact" className="md:col-span-4"><Eyebrow text="(h) Booking / Contact"/><h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">Reserve<br/>your bay</h2><p className="mt-5 text-muted-foreground">Dërgo kërkesën dhe GentiGarage do të të kontaktojë për konfirmim.</p><div className="mt-8 space-y-4 text-sm text-muted-foreground"><p><strong className="text-foreground">Phone</strong><br/>+383 XX XXX XXX</p><p><strong className="text-foreground">Instagram / WhatsApp</strong><br/>@gentigarage</p><p><strong className="text-foreground">Location</strong><br/>Kosovo — exact address coming soon</p><p><strong className="text-foreground">Working Hours</strong><br/>Mon–Sat · 09:00–18:00</p></div></div><form onSubmit={submit} className="grid gap-4 md:col-span-8 md:grid-cols-2">{([{label:"Emri dhe Mbiemri",type:"text"},{label:"Numri i telefonit",type:"tel"},{label:"Marka e veturës",type:"text"},{label:"Modeli",type:"text"},{label:"Data e preferuar",type:"date"},{label:"Ora e preferuar",type:"time"}]).map((field)=><Field key={field.label} label={field.label} type={field.type}/>) }<label className="flex flex-col gap-2"><span className="font-mono text-[10px] uppercase text-muted-foreground">Shërbimi</span><select required className="border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"><option value="">Select service</option>{services.map(s=><option key={s.name}>{s.name}</option>)}</select></label><label className="flex flex-col gap-2 md:col-span-2"><span className="font-mono text-[10px] uppercase text-muted-foreground">Mesazhi</span><textarea rows={4} className="resize-none border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Na tregoni më shumë për automjetin..."/></label><button className="inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 font-mono text-xs font-bold uppercase text-primary-foreground md:col-span-2">{submitted?"Request received":"Request booking"}<ArrowRight size={15}/></button>{submitted&&<p className="text-sm text-primary md:col-span-2">Kërkesa u regjistrua në këtë faqe demo. Lidhja me sistemin e rezervimeve kërkon backend.</p>}</form></div></section>

    <footer className="bg-card"><div className="mx-auto grid max-w-[1400px] gap-9 px-5 py-14 md:grid-cols-12"><div className="md:col-span-5"><p className="font-display text-xl uppercase">GENTI<span className="text-primary">GARAGE</span></p><p className="mt-2 text-sm text-muted-foreground">Premium Auto Detailing</p></div><div className="md:col-span-4"><p className="font-mono text-[10px] uppercase text-primary">Index</p><div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">{["Home","Services","Gallery","About","Contact"].map(x=><a key={x} href={`#${x.toLowerCase()}`} className="hover:text-primary">{x}</a>)}</div></div><div className="md:col-span-3"><p className="font-mono text-[10px] uppercase text-primary">Social</p><p className="mt-3 text-sm text-muted-foreground">Instagram · Facebook · WhatsApp</p></div></div><div className="border-t border-border px-5 py-5 text-center font-mono text-[10px] uppercase text-muted-foreground">© 2026 GentiGarage. All rights reserved.</div></footer>

    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2"><a href="https://wa.me/" aria-label="WhatsApp" className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground"><MessageCircle size={21}/></a><a href="https://instagram.com/" aria-label="Instagram" className="grid size-12 place-items-center rounded-full border border-border bg-background text-foreground hover:border-primary hover:text-primary"><Instagram size={20}/></a></div>
  </main>;
}

function Eyebrow({text}:{text:string}) { return <p className="font-mono text-[10px] uppercase text-primary">{text}</p>; }
function SectionHead({eyebrow,title,side}:{eyebrow:string;title:string;side?:string}) { return <div className="mx-auto flex max-w-[1400px] items-end justify-between px-5 py-16"><div><Eyebrow text={eyebrow}/><h2 className="mt-3 font-display text-4xl uppercase md:text-6xl">{title}</h2></div>{side&&<span className="hidden font-mono text-[10px] uppercase text-muted-foreground md:block">{side}</span>}</div>; }
function Field({label,type}:{label:string;type:string}) { return <label className="flex flex-col gap-2"><span className="font-mono text-[10px] uppercase text-muted-foreground">{label}</span><input required type={type} className="border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"/></label>; }