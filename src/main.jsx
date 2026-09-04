import { StrictMode, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const menu = [
  { category: 'Café', name: 'Espresso', description: 'Doble espresso de tueste medio, intenso y aterciopelado.', price: '$25', calories: '5 kcal', accent: '☕' },
  { category: 'Café', name: 'Americano', description: 'Espresso con agua caliente, de cuerpo limpio y aroma profundo.', price: '$30', calories: '10 kcal', accent: '◉' },
  { category: 'Café', name: 'Capuccino', description: 'Espresso, leche vaporizada y una capa de espuma suave.', price: '$48', calories: '150 kcal', accent: '◒' },
  { category: 'Café', name: 'Capuccino sabor', description: 'Elige entre rompope, cajeta o lechera.', price: '$55', calories: '240 kcal', accent: '✦' },
  { category: 'Café', name: 'Chocolate caliente', description: 'Chocolate de la casa, cremoso y reconfortante.', price: '$35', calories: '230 kcal', accent: '☾' },
  { category: 'Fríos', name: 'Capuccino frío o frappé', description: 'Espresso, leche fría y espuma cremosa sobre hielo.', price: '$50', calories: '170 kcal', accent: '❋' },
  { category: 'Fríos', name: 'Oreo frío o frappé', description: 'Galleta Oreo, leche y café; disponible frío o frappé.', price: '$68', calories: '380 kcal', accent: '◉' },
  { category: 'Fríos', name: 'Moka frío o frappé', description: 'Café, chocolate oscuro y leche; elige tu versión favorita.', price: '$76', calories: '300 kcal', accent: '✦' },
  { category: 'Fríos', name: 'Capuccino sabor frío o frappé', description: 'Elige entre Oreo, cajeta, lechera o rompope; frío o frappé.', price: '$68', calories: '350 kcal', accent: '☾' },
  { category: 'Fríos', name: 'Affogato', description: 'Helado de vainilla servido con un espresso intenso.', price: '$40', calories: '210 kcal', accent: '◌' },
  { category: 'Fríos', name: 'Moka blanco frío o frappé', description: 'Chocolate blanco, espresso y leche, frío o frappé.', price: '$82', calories: '360 kcal', accent: '◇' },
  { category: 'Bebidas', name: 'Licuado de plátano', description: 'Leche cremosa y plátano natural.', price: '$40', calories: '260 kcal', accent: '◐' },
  { category: 'Bebidas', name: 'Licuado de fresa', description: 'Leche fría y fresa natural.', price: '$40', calories: '230 kcal', accent: '✿' },
  { category: 'Bebidas', name: 'Licuado de chocolate', description: 'Leche fría con chocolate de la casa.', price: '$40', calories: '290 kcal', accent: '✦' },
  { category: 'Bebidas', name: 'Especial', description: 'Bebida especial de la casa, preparada al momento.', price: '$50', calories: '320 kcal', accent: '✧' },
  { category: 'Bebidas', name: 'Malteada de fresa', description: 'Helado de vainilla y fresa, bien fría.', price: '$55', calories: '420 kcal', accent: '✿' },
  { category: 'Bebidas', name: 'Malteada de mora', description: 'Helado cremoso con mora y leche.', price: '$55', calories: '410 kcal', accent: '◉' },
  { category: 'Bebidas', name: 'Malteada de Oreo', description: 'Galleta Oreo, helado de vainilla y leche.', price: '$55', calories: '480 kcal', accent: '◒' },
  { category: 'Bebidas', name: 'Malteada de mazapán', description: 'Helado cremoso con mazapán y leche.', price: '$55', calories: '470 kcal', accent: '◇' },
  { category: 'Bebidas', name: 'Malteada de chocolate', description: 'Helado de chocolate y leche cremosa.', price: '$55', calories: '450 kcal', accent: '✦' },
  { category: 'Bebidas', name: 'Soda italiana', description: 'Agua mineral, jarabe de sabor y cítricos.', price: '$60', calories: '150 kcal', accent: '❋' },
  { category: 'Bebidas', name: 'Smoothie', description: 'Fruta natural, hielo y yogur cremoso.', price: '$60', calories: '250 kcal', accent: '☾' },
  { category: 'Bebidas', name: 'Gomiboing', description: 'Jugo Boing, gomitas y chamoy al gusto.', price: '$38', calories: '290 kcal', accent: '〰' },
  { category: 'Bebidas', name: 'Lechita preparada', description: 'Leche fría con sabor, toppings y un toque dulce.', price: '$60', calories: '320 kcal', accent: '☕' },
  { category: 'Bebidas', name: 'Jugo de medio litro', description: 'Jugo natural en presentación de medio litro.', price: '$30', calories: '120 kcal', accent: '◉' },
  { category: 'Bebidas', name: 'Agua del día', description: 'Agua fresca preparada con fruta de temporada.', price: '$20', calories: '110 kcal', accent: '◡' },
  { category: 'Bebidas', name: 'Botella de agua', description: 'Agua natural embotellada.', price: '$20', calories: '0 kcal', accent: '◇' },
  { category: 'Bebidas', name: 'Refresco', description: 'Pregunta por los refrescos disponibles.', price: '$25', calories: '≈ 150 kcal', accent: '◒' },
  { category: 'Bebidas', name: 'Licuado combinado', description: 'Licuado de sabores combinados.', price: '$40', calories: '≈ 280 kcal', accent: '✿' },
  { category: 'Bebidas', name: 'Malteada de vainilla', description: 'Malteada sabor vainilla.', price: '$55', calories: '≈ 400 kcal', accent: '◒' },
  { category: 'Bebidas', name: 'Jugo de un litro', description: 'Jugo natural en presentación de un litro.', price: '$60', calories: '≈ 450 kcal', accent: '◉' },
  { category: 'Bebidas', name: 'Chamoyada', description: 'Pregunta por los sabores disponibles.', price: '$25', calories: '≈ 200 kcal', accent: '❋' },
  { category: 'Bebidas', name: 'Gloria', description: 'Pregunta por su preparación.', price: '$60', calories: '≈ 350 kcal', accent: '✧' },
  { category: 'Comida', name: 'Club sándwich', description: 'Sándwich de tres pisos con pollo, jamón, queso y vegetales.', price: '$75', calories: '650 kcal', accent: '◫' },
  { category: 'Comida', name: 'Croissant (cuernito)', description: 'Cuernito relleno de jamón, queso y vegetales frescos.', price: '$35', calories: '320 kcal', accent: '◐' },
  { category: 'Comida', name: 'Sincronizadas', description: 'Tortillas de harina con jamón y queso fundido.', price: '$35', calories: '430 kcal', accent: '◉' },
  { category: 'Comida', name: 'Molletes', description: 'Pan con frijoles, queso gratinado y pico de gallo.', price: '$50', calories: '480 kcal', accent: '✦' },
  { category: 'Comida', name: 'Cóctel de fruta', description: 'Fruta fresca de temporada preparada al momento.', price: '$35', calories: '160 kcal', accent: '✿' },
  { category: 'Comida', name: 'Papas fritas', description: 'Papas doradas y crujientes, preparadas al momento.', price: '$40', calories: '365 kcal', accent: '〰' },
  { category: 'Comida', name: 'Hot dog', description: 'Hot dog preparado al momento.', price: '$35', calories: '≈ 300 kcal', accent: '◐' },
  { category: 'Comida', name: 'Menú', description: 'Pregunta por el menú disponible.', price: '$60', accent: '◫' },
  { category: 'Postres', name: 'Cheesecake', description: 'Cremoso cheesecake de queso con base de galleta.', price: '$40', calories: '420 kcal', accent: '◉' },
  { category: 'Postres', name: 'Pay de limón', description: 'Relleno cítrico, suave y coronado con merengue.', price: '$30', calories: '350 kcal', accent: '◒' },
  { category: 'Postres', name: 'Pastel de chocolate', description: 'Bizcocho de cacao con cobertura de chocolate oscuro.', price: '$78', calories: '450 kcal', accent: '✦' },
  { category: 'Postres', name: 'Churro', description: 'Churro por pieza.', price: '$7', calories: '≈ 120 kcal', accent: '〰' },
  { category: 'Postres', name: 'Pan artesanal', description: 'Pieza del día recién horneada para acompañar tu café.', price: '$38', calories: '210 kcal', accent: '◐' },
  { category: 'Postres', name: 'Concha preparada', description: 'Concha rellena de crema y fruta de temporada.', price: '$62', calories: '380 kcal', accent: '✿' },
  { category: 'Postres', name: 'Tartas', description: 'Tarta individual de fruta de temporada y crema pastelera.', price: '$30', calories: '340 kcal', accent: '☾' },
  { category: 'Postres', name: 'Panqué', description: 'Rebanada: $15. Panqué completo: $75.', price: '$15 / $75', calories: '310 kcal', accent: '◈' },
  { category: 'Postres', name: 'Galleta', description: 'Galleta casera horneada para acompañar tu café.', price: '$13', calories: '180 kcal', accent: '◉' },
  { category: 'Postres', name: 'Gelatina', description: 'Gelatina de mosaico, fresca y ligera.', price: '$25', calories: '190 kcal', accent: '◇' },
  { category: 'Postres', name: 'Flan de la casa', description: 'Flan cremoso de vainilla con caramelo.', price: '$27', calories: '300 kcal', accent: '◡' },
  { category: 'Postres', name: 'Fresas con crema o chocolate', description: 'Fresas frescas con crema dulce o cobertura de chocolate.', price: '$45', calories: '280 kcal', accent: '✿' },
  { category: 'Postres', name: 'Mini hotcakes', description: 'Sujeto a disponibilidad.', price: '$35', calories: '≈ 300 kcal', accent: '◒' },
  { category: 'Postres', name: 'Brownie', description: 'Sujeto a disponibilidad.', price: '$30', calories: '≈ 250 kcal', accent: '✦' },
  { category: 'Postres', name: 'Helado', description: 'Pregunta por los sabores disponibles.', price: '$15', calories: '≈ 140 kcal', accent: '◌' },
  { category: 'Postres', name: 'Bolis', description: 'Pregunta por los sabores disponibles.', price: '$15', calories: '≈ 120 kcal', accent: '◇' },
];

const categories = ['Todo', 'Café', 'Fríos', 'Bebidas', 'Comida', 'Postres'];

const navigationItems = [
  { label: 'Historia', href: '#historia' },
  { label: 'Menú', href: '#menu' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Visítanos', href: '#visitanos' },
];

const galleryPhotos = [
  { src: '/gallery/cafe.jpeg', alt: 'Bebida de chocolate con galleta Oreo en Le Chat Noir', title: 'Sabor que acompaña' },
  { src: '/gallery/cafe-3.jpeg', alt: 'Bebida fría cremosa frente al emblema de Le Chat Noir', title: 'Una pausa para ti' },
  { src: '/gallery/local.jpeg', alt: 'Fachada de la cafetería Le Chat Noir', title: 'Nuestro rincón' },
  { src: '/gallery/fresas.jpeg', alt: 'Bebida cremosa con fresas frente al emblema de Le Chat Noir', title: 'Un antojo de la casa' },
  { src: '/gallery/cafeteria.mp4', type: 'video', title: 'Así se vive Le Chat Noir' },
];

function App() {
  const pageRef = useRef(null);
  const productsRef = useRef(null);
  const galleryRef = useRef(null);
  const [active, setActive] = useState('Todo');
  const [open, setOpen] = useState(false);
  const [catPlayful, setCatPlayful] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const menuToggleRef = useRef(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const products = active === 'Todo' ? menu : menu.filter((item) => item.category === active);
  const currentPhoto = galleryPhotos[galleryIndex];

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.7 } })
        .from('.hero-copy > .eyebrow', { opacity: 0, y: 12 })
        .from('.hero-line', { opacity: 0, y: 28, stagger: 0.13 }, '-=0.45')
        .from('.hero-copy .lede, .hero-actions', { opacity: 0, y: 16, stagger: 0.12 }, '-=0.4')
        .from('.hero-art', { opacity: 0, y: 20, duration: 1 }, 0.2);
      const select = gsap.utils.selector(pageRef);
      select('.story-title, .story-copy, .menu-section .section-heading, .gallery-main > h2, .gallery-intro, .visit > div, .contact-intro').forEach(element => {
        gsap.from(element, {
          opacity: 0, y: 24, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });
    });
    return () => motion.revert();
  }, { scope: pageRef });

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.product', {
        opacity: 0, y: 12, duration: 0.32,
        stagger: { each: 0.035, amount: 0.3 }, ease: 'power2.out',
      });
    });
    ScrollTrigger.refresh();
    return () => motion.revert();
  }, { scope: productsRef, dependencies: [active], revertOnUpdate: true });

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.gallery-media', { opacity: 0.25, scale: 1.025, duration: 0.65, ease: 'power2.out' });
      gsap.from('.gallery-overlay p', { opacity: 0, y: 10, duration: 0.4, delay: 0.1 });
    });
    return () => motion.revert();
  }, { scope: galleryRef, dependencies: [galleryIndex], revertOnUpdate: true });

  function changePhoto(direction) {
    setGalleryIndex((index) => (index + direction + galleryPhotos.length) % galleryPhotos.length);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get('name');
    const message = form.get('message');
    const text = encodeURIComponent(`Hola, quiero reservar una mesa en Le Chat Noir.\n\nNombre: ${name}\nMensaje: ${message || 'Sin mensaje adicional'}`);
    window.open(`https://wa.me/522226641913?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  return <>
    <header className="topbar">
      <a className="brand" href="#inicio" aria-label="Le Chat Noir, inicio"><img src="/logo.png" alt="Logo de Le Chat Noir" /><span>Le Chat<br/><em>Noir</em></span></a>
      <button ref={menuToggleRef} className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Cerrar menú" : "Abrir menú"}><span/><span/><span/></button>
      <nav id="main-navigation" className={open ? 'open' : ''} onKeyDown={(event) => { if (event.key === 'Escape') { setOpen(false); menuToggleRef.current?.focus(); } }}>
        {navigationItems.map((item) => <a key={item.href} href={item.href} aria-current={selectedSection === item.href ? 'location' : undefined} onClick={() => { setSelectedSection(item.href); setOpen(false); }}>{item.label}</a>)}
        <a className="nav-cta" href="#contacto" onClick={() => setOpen(false)}>Reservar mesa</a>
      </nav>
    </header>

    <main ref={pageRef}>
      <section id="inicio" className="hero">
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow">CAFÉ DE ESPECIALIDAD · HECHO SIN PRISA</p>
          <h1><span className="hero-line">Donde la noche</span><span className="hero-line">sabe a <i>café.</i></span></h1>
          <p className="lede">Una pausa cálida, una taza honesta y el pequeño ritual de volver a ti.</p>
          <div className="hero-actions"><a className="button gold" href="#menu">Explora el menú <span>↘</span></a><a className="text-link" href="#historia">Conoce nuestra historia <span>→</span></a></div>
        </div>
        <div className="hero-art" aria-label="Ilustración decorativa de una taza de café y luna">
          <div className="moon" /><button type="button" className={`cat${catPlayful ? ' playful' : ''}`} aria-label="Jugar con el gato" aria-pressed={catPlayful} onClick={() => setCatPlayful(value => !value)}><span aria-hidden="true">◡</span><span aria-hidden="true">◡</span><b aria-hidden="true">⌣</b></button><div className="cup"><div className="steam" aria-hidden="true"><span/><span/><span/></div><div className="coffee"/><div className="cup-mark">✦</div></div><div className="saucer" />
        </div>
        <p className="scroll">DESLIZA PARA DESCUBRIR <span>↓</span></p>
      </section>

      <section id="historia" className="story section-wrap">
        <div className="story-number">01</div><div className="story-title"><p className="eyebrow">NUESTRA HISTORIA</p><h2>Una casa para<br/><i>buenas historias.</i></h2></div>
        <div className="story-copy"><p>Le Chat Noir nació de una idea sencilla: hacer del café un momento para quedarse. Seleccionamos granos mexicanos, horneamos despacio y dejamos siempre una silla libre para ti.</p><a className="text-link" href="#visitanos">Conoce el espacio <span>→</span></a></div>
      </section>

      <section id="menu" className="menu-section"><div className="section-wrap"><p className="eyebrow">PREPARADO PARA TI</p><div className="section-heading"><h2>Favoritos de<br/><i>la casa.</i></h2><p>Calorías estimadas por porción.<br/>Varían según tamaño e ingredientes.<br/>Pregunta por opciones vegetales.<br/>Postres sujetos a disponibilidad.</p></div><div className="filters">{categories.map((cat) => <button key={cat} className={active === cat ? 'active' : ''} aria-pressed={active === cat} onClick={() => setActive(cat)}>{cat}</button>)}</div><div className="products" ref={productsRef}>{products.map((product) => <article className="product" key={product.name}><div className="product-icon" aria-hidden="true">{product.accent}</div><div><p className="product-category">{product.category}</p><h3>{product.name}</h3><p>{product.description}</p></div><div className="product-meta"><strong>{product.price}</strong>{product.calories && <small>{product.calories}</small>}</div></article>)}</div></div></section>

      <section id="galeria" className="gallery gallery-new"><div className="gallery-main"><p className="eyebrow">UN RINCÓN PARA QUEDARSE</p><h2>Encuentra tu<br/><i>mesa favorita.</i></h2><p className="gallery-intro">Café, conversación y momentos que se quedan.</p><div className="gallery-counter"><span>{String(galleryIndex + 1).padStart(2, '0')}</span> / {String(galleryPhotos.length).padStart(2, '0')}</div></div><div className="gallery-carousel" aria-roledescription="carrusel" aria-label="Galería de Le Chat Noir"><div className="gallery-image-wrap" ref={galleryRef}>{currentPhoto.type === 'video' ? <video className="gallery-media" key={currentPhoto.src} controls playsInline preload="metadata" aria-label="Video de Le Chat Noir"><source src={currentPhoto.src} type="video/mp4" />Tu navegador no puede reproducir este video.</video> : <img className="gallery-media" key={currentPhoto.src} src={currentPhoto.src} alt={currentPhoto.alt} width="1600" height="1200" />}<div className="gallery-overlay"><p>{currentPhoto.title}</p></div></div><div className="gallery-controls"><button type="button" onClick={() => changePhoto(-1)} aria-label="Ver contenido anterior">←</button><div className="gallery-dots" aria-label="Seleccionar contenido">{galleryPhotos.map((photo, index) => <button type="button" key={photo.src} className={index === galleryIndex ? 'active' : ''} onClick={() => setGalleryIndex(index)} aria-label={`Ver ${photo.type === 'video' ? 'video' : 'foto'} ${index + 1}`} aria-current={index === galleryIndex ? 'true' : undefined} />)}</div><button type="button" onClick={() => changePhoto(1)} aria-label="Ver contenido siguiente">→</button></div></div></section>

      <section id="visitanos" className="visit section-wrap"><div><p className="eyebrow">VEN A VERNOS</p><h2>El café está<br/><i>servido.</i></h2></div><div className="visit-details"><div><span>HORARIO</span><p>Lun–Vie · 7:30–21:00<br/>Sáb–Dom · 8:00–22:00</p></div><div><span>ENCUÉNTRANOS</span><p>Col. Pedregal de Guadalupe Hidalgo<br/>N° 12514, Privada A, Oriente de la 16 de Sep.</p></div><a className="button outline" href="https://goo.gl/maps/wBpBBHYBSNmNuJUJ8?g_st=awb" target="_blank" rel="noopener noreferrer">Cómo llegar <span>↗</span></a></div></section>

      <section id="contacto" className="contact"><div className="contact-intro"><p className="eyebrow">RESERVA TU RINCÓN</p><h2>Nos vemos<br/><i>pronto.</i></h2><p>Completa tus datos y te llevaremos a WhatsApp para confirmar tu mesa al momento.</p></div><form onSubmit={handleSubmit}><label>Nombre<input required name="name" placeholder="Tu nombre" /></label><label>Mensaje<textarea name="message" placeholder="¿Para cuándo te gustaría reservar?" /></label><button className="button gold" type="submit">Reservar por WhatsApp <span>↗</span></button></form></section>
    </main>
    <footer><a className="brand" href="#inicio"><img src="/logo.png" alt="" /><span>Le Chat<br/><em>Noir</em></span></a><p>Hecho con cariño, café y una pizca de misterio.</p><div className="social-links"><a href="https://www.instagram.com/lechatnoire14?igsi=MXV2c2pva2d4Nmh2NQ==" target="_blank" rel="noopener noreferrer" aria-label="Visita nuestro Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg><span>Instagram</span></a><a href="https://www.tiktok.com/@lechatnoire14?_r=1&_t=ZS-996DA1JZMqi" target="_blank" rel="noopener noreferrer" aria-label="Visita nuestro TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.1a3.4 3.4 0 1 1-2.6-3.3V8.1A6 6 0 1 0 17 14V8.4c1.2.9 2.6 1.4 4 1.4V6.7c-2.3 0-4.2-1.5-4.8-3.7H14Z"/></svg><span>TikTok</span></a></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
