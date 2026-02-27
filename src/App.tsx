import React, { useEffect, useRef, useState } from 'react';
import { Phone, Instagram, ArrowDownRight, Quote } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

const popularBouquets = [
  {
    name: "Ніжність світанку",
    price: "2 500 ₴",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Оксамитова ніч",
    price: "3 200 ₴",
    image: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Весняний подих",
    price: "1 800 ₴",
    image: "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=800&auto=format&fit=crop"
  },
];

const testimonials = [
  {
    name: "Анна К.",
    text: "Замовляю вже втретє — кожного разу букет перевершує очікування. Мама була у захваті від піонів!",
    tag: "Постійна клієнтка"
  },
  {
    name: "Олег М.",
    text: "Доставили за 2 години прямо до ресторану. Дружина була вражена. Дуже красива упаковка.",
    tag: "Клієнт"
  },
  {
    name: "Юлія Р.",
    text: "Неймовірний сервіс та якість квітів. Флорист допоміг підібрати ідеальний букет для корпоративного подарунку.",
    tag: "Корпоративне замовлення"
  }
];

// ─── Animation Variants ───────────────────────────────────────────
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

// ─── Custom Cursor ────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => ringRef.current?.classList.add('is-hovering');
    const onLeave = () => ringRef.current?.classList.remove('is-hovering');

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const links = document.querySelectorAll('a, button');
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      links.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ─── Scroll Progress Bar ──────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, width: '100%' }}
    />
  );
}

// ─── Main App ────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F0EA] font-sans overflow-hidden bg-noise">
      <CustomCursor />
      <ScrollProgressBar />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 md:p-10 flex items-center justify-between mix-blend-difference">
        <div className="flex items-center gap-2 text-xl md:text-2xl font-serif tracking-tighter font-light">
          FLOWERS <span className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] opacity-50 mt-1">WITH LOVE</span>
        </div>
        <div className="flex items-center gap-8 text-[11px] font-sans tracking-[0.15em] uppercase">
          <a href="tel:+380441234567" className="hidden md:flex items-center gap-2 hover:opacity-50 transition-opacity duration-300">
            <Phone size={14} />
            <span>+38 (044) 123-45-67</span>
          </a>
          <a href="https://www.instagram.com/_flowers_with_love___?igsh=MW45YnNqc204aTBjcQ==" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity duration-300 flex items-center gap-2">
            <Instagram size={14} />
            <span className="hidden md:inline">Instagram</span>
          </a>
          <a href="tel:+380441234567" className="md:hidden hover:opacity-50 transition-opacity duration-300 flex items-center gap-2">
            <Phone size={14} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[100svh] flex flex-col justify-end px-6 md:px-10 pb-12 md:pb-20">
        <div className="absolute top-0 right-0 w-full md:w-3/4 h-[75vh] md:h-screen opacity-60 md:opacity-100">
          <img
            src="https://images.unsplash.com/photo-1613539246066-78db6ec4ff0f?q=80&w=2000&auto=format&fit=crop"
            alt="Авторський букет — Flowers with Love, Київ"
            className="w-full h-full object-cover object-center grayscale-[30%] contrast-125"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6 md:mb-10 opacity-60 font-medium">
              [ Авторська флористика в Києві ]
            </p>
            <h1 className="text-[14vw] md:text-[11vw] leading-[0.85] font-serif font-light tracking-tighter uppercase">
              Емоції, <span className="italic text-white/40 lowercase">що</span><br />
              розквітають
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Slogan Section */}
      <section className="py-32 md:py-48 px-6 md:px-10 border-t border-white/10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={staggerItem} className="md:col-span-4 flex flex-col justify-between">
            <span className="text-[10px] tracking-[0.2em] uppercase opacity-50">[ 01 / Філософія ]</span>
            <ArrowDownRight size={48} className="opacity-20 hidden md:block mt-12" />
          </motion.div>
          <motion.div variants={staggerItem} className="md:col-span-8">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif font-light leading-[1.1] tracking-tight">
              "Квіти — це посмішка сонця, що дарує радість. Коли ви думаєте про когось, <span className="italic text-white/40">подаруйте їм квіти.</span>"
            </h2>
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 md:py-48 px-6 md:px-10 border-t border-white/10">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase opacity-50">[ 02 / Колекція ]</span>
          <span className="text-[10px] tracking-[0.2em] uppercase opacity-50 max-w-xs text-left md:text-right">
            Кожен букет — це унікальна історія, створена з любов'ю та увагою до деталей
          </span>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-6 md:gap-10 mt-0">
            <motion.div variants={staggerItem} className="group relative aspect-[3/4] overflow-hidden bg-[#111]">
              <img src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=800&auto=format&fit=crop" alt="Авторський букет з троянд" className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div variants={staggerItem} className="group relative aspect-square overflow-hidden bg-[#111]">
              <img src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=800&auto=format&fit=crop" alt="Букет з піонів" className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            </motion.div>
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-6 md:gap-10 md:mt-32">
            <motion.div variants={staggerItem} className="group relative aspect-square overflow-hidden bg-[#111]">
              <img src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop" alt="Квіткова композиція" className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div variants={staggerItem} className="group relative aspect-[3/4] overflow-hidden bg-[#111]">
              <img src="https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=800&auto=format&fit=crop" alt="Букет у стилі бохо" className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            </motion.div>
          </div>
          {/* Column 3 */}
          <div className="flex flex-col gap-6 md:gap-10 md:mt-16">
            <motion.div variants={staggerItem} className="group relative aspect-[3/4] overflow-hidden bg-[#111]">
              <img src="https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop" alt="Весільний букет" className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div variants={staggerItem} className="group relative aspect-square overflow-hidden bg-[#111]">
              <img src="https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=800&auto=format&fit=crop" alt="Мінімалістичний букет" className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Popular Bouquets Section */}
      <section className="py-32 md:py-48 px-6 md:px-10 border-t border-white/10 overflow-hidden">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span variants={staggerItem} className="text-[10px] tracking-[0.2em] uppercase opacity-50">[ 03 / Популярне ]</motion.span>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-5xl font-serif font-light tracking-tight">
            Бестселери
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {popularBouquets.map((bouquet, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#111] mb-6">
                <img
                  src={bouquet.image}
                  alt={bouquet.name}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex justify-between items-end border-b border-white/20 pb-4 group-hover:border-white/60 transition-colors duration-500">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-light mb-1">{bouquet.name}</h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase opacity-50">Авторський букет</p>
                </div>
                <span className="text-lg font-light">{bouquet.price}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 md:py-48 px-6 md:px-10 border-t border-white/10">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase opacity-50">[ 04 / Відгуки ]</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight">
            Що кажуть клієнти
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-[#050505] p-8 md:p-12 flex flex-col gap-8 group hover:bg-white/[0.03] transition-colors duration-700"
            >
              <Quote size={20} className="opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
              <p className="text-base md:text-lg font-serif font-light leading-relaxed opacity-80 flex-1">
                "{t.text}"
              </p>
              <div className="border-t border-white/10 pt-6">
                <p className="text-sm font-light">{t.name}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase opacity-40 mt-1">{t.tag}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-48 px-6 md:px-10 border-t border-white/10 flex flex-col items-center justify-center text-center min-h-[80vh] relative">
        <motion.div
          className="flex flex-col items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span variants={staggerItem} className="text-[10px] tracking-[0.2em] uppercase opacity-50 mb-12">
            [ 05 / Замовлення ]
          </motion.span>

          <motion.h2
            variants={staggerItem}
            className="text-[12vw] md:text-[8vw] leading-[0.85] font-serif font-light tracking-tighter mb-12 uppercase"
          >
            Зв'яжіться<br /><span className="italic text-white/40 lowercase">з нами</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="max-w-md text-sm md:text-base opacity-60 font-light mb-16 leading-relaxed"
          >
            Швидка та дбайлива доставка квітів по всьому Києву. <br className="hidden md:block" />
            Безкоштовна доставка від 2000 грн.
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-6 items-center">
            <a
              href="tel:+380441234567"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full border border-white/20 flex flex-col items-center justify-center gap-3 hover:bg-[#F4F0EA] hover:text-[#050505] transition-all duration-700 group"
            >
              <Phone size={24} className="group-hover:scale-110 transition-transform duration-500" />
              <span className="text-[10px] tracking-[0.2em] uppercase mt-1">Подзвонити</span>
            </a>
            <a
              href="https://www.instagram.com/_flowers_with_love___?igsh=MW45YnNqc204aTBjcQ=="
              target="_blank"
              rel="noreferrer"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full border border-white/20 flex flex-col items-center justify-center gap-3 hover:bg-[#F4F0EA] hover:text-[#050505] transition-all duration-700 group"
            >
              <Instagram size={24} className="group-hover:scale-110 transition-transform duration-500" />
              <span className="text-[10px] tracking-[0.2em] uppercase mt-1">Instagram</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase opacity-40">
        <p>&copy; {new Date().getFullYear()} Flowers with Love.</p>
        <p>Авторська флористика в Києві</p>
      </footer>
    </div>
  );
}
