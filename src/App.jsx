import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Layers, 
  Cpu, 
  MapPin, 
  ArrowRight, 
  Instagram, 
  Smartphone, 
  Check, 
  ChevronRight, 
  Sliders,
  Sparkles,
  Maximize2,
  Video,
  FileText,
  Activity
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * BANCO DE DADOS DE PROJETOS DA ERGUER (FOCADO EM SALVADOR/BA)
 * =========================================================================
 * Mestre, altere as fotos, nomes e dados dos projetos do cliente aqui facilmente!
 */
const PROJECTS_DATA = [
  {
    id: 1,
    title: "Mansão Recôncavo",
    type: "Arquitetura & Obra Civil",
    intent: "Construir do Zero",
    vocation: "Casa / Residencial de Luxo",
    priority: "Design Autoral & Exclusividade",
    location: "Litoral Norte / Salvador, BA",
    area: "750 m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    desc: "Residência contemporânea de veraneio em concreto armado protendido e balanços estruturais audaciosos, projetada para total aproveitamento da brisa litorânea de Salvador.",
    instaUrl: "https://www.instagram.com/erguer_projetos_eng?igsh=aGZrZWhoeTJjYjM="
  },
  {
    id: 2,
    title: "Edifício Barra Premium Corporate",
    type: "Retrofit Estrutural & BIM",
    intent: "Reforma Completa",
    vocation: "Comercial / Corporativo de Alta Performance",
    priority: "Execução Técnica & Rigor de Prazos",
    location: "Barra, Salvador, BA",
    area: "1.920 m²",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    desc: "Retrofit técnico predial completo e compatibilização estrutural complexa para adequação de lajes corporativas integradas.",
    instaUrl: "https://www.instagram.com/erguer_projetos_eng?igsh=aGZrZWhoeTJjYjM="
  },
  {
    id: 3,
    title: "Apartamento Vitória Ocean View",
    type: "Reforma & Acabamento Premium",
    intent: "Reforma Completa",
    vocation: "Casa / Residencial de Luxo",
    priority: "Design Autoral & Exclusividade",
    location: "Corredor da Vitória, Salvador, BA",
    area: "380 m²",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    desc: "Reforma residencial de altíssimo padrão com integração de vãos livres, revestimentos em mármores exóticos importados e acústica refinada.",
    instaUrl: "https://www.instagram.com/erguer_projetos_eng?igsh=aGZrZWhoeTJjYjM="
  },
  {
    id: 4,
    title: "Sede Corporativa Caminho das Árvores",
    type: "Compatibilização Estrutural",
    intent: "Projeto de Arquitetura",
    vocation: "Comercial / Corporativo de Alta Performance",
    priority: "Tecnologia & Sustentabilidade",
    location: "Caminho das Árvores, Salvador, BA",
    area: "1.100 m²",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    desc: "Desenvolvimento técnico predial com foco em eficiência térmica, estruturas metálicas ventiladas e integração de automação predial.",
    instaUrl: "https://www.instagram.com/erguer_projetos_eng?igsh=aGZrZWhoeTJjYjM="
  },
  {
    id: 5,
    title: "Residência Horto Florestal",
    type: "Obra Estrutural Completa",
    intent: "Construir do Zero",
    vocation: "Casa / Residencial de Luxo",
    priority: "Tecnologia & Sustentabilidade",
    location: "Horto Florestal, Salvador, BA",
    area: "920 m²",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    desc: "Projeto estrutural arrojado com vãos livres de 12 metros, piscina suspensa em concreto aparente e aproveitamento solar inteligente.",
    instaUrl: "https://www.instagram.com/erguer_projetos_eng?igsh=aGZrZWhoeTJjYjM="
  },
  {
    id: 6,
    title: "Retrofit Comercial Rio Vermelho",
    type: "Reforma & Adequação Técnica",
    intent: "Reforma Completa",
    vocation: "Comercial / Corporativo de Alta Performance",
    priority: "Execução Técnica & Rigor de Prazos",
    location: "Rio Vermelho, Salvador, BA",
    area: "750 m²",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    desc: "Adequação civil complexa para clínica executiva de alta tecnologia, seguindo critérios rigorosos de isolamento acústico e estabilidade de rede.",
    instaUrl: "https://www.instagram.com/erguer_projetos_eng?igsh=aGZrZWhoeTJjYjM="
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  // Estados do Filtro Interativo (ICP)
  const [icpStep, setIcpStep] = useState(1);
  const [selectedIntent, setSelectedIntent] = useState("");
  const [selectedVocation, setSelectedVocation] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS_DATA);

  // Telemetria Typewriter
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  // Refs de Animação e Elementos
  const heroVideoRef = useRef(null);
  const heroVideoContainerRef = useRef(null);
  const shufflerContainerRef = useRef(null);
  const schedulerGridRef = useRef(null);
  const philosophyTextRef = useRef(null);
  
  const [shuffleIndex, setShuffleIndex] = useState(0);
  const shufflerData = [
    { title: "NIVELAMENTO A LASER MILIMÉTRICO", value: "Aferição de nivelamento de lajes de concreto protendido com desvio de 0.0mm." },
    { title: "COMPATIBILIZAÇÃO ESTRUTURAL 3D", value: "Prevenção de furos e interferências entre armações de aço e instalações elétricas." },
    { title: "LEAN CONSTRUCTION E COMPRAS", value: "Redução sistemática de desperdícios de argamassas e insumos em até 16%." }
  ];

  const typewriterLogs = [
    "AFERIÇÃO: Sincronizando nível a laser geométrico... [0.0mm ERRO]",
    "CONCRETAGEM: Aferição térmica de cura do concreto estrutural... [fck 38 MPa OK]",
    "CRONOGRAMA: Logística de entrega de vigas de aço... [NO DELAYS - RASTREADO]",
    "ESTRUTURA: Verificação tridimensional de prumo de pilares... [CONFORME]",
    "CONTROLE: Inspeção de prumo de revestimentos em mármores importados... [APROVADO]",
  ];

  // Efeito de Scroll da Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito 3D de Rotação/Escala do Vídeo do Hero no Scroll - TOTALMENTE CONTROLADO PELO SCROLL
  useEffect(() => {
    if (!heroVideoContainerRef.current) return;

    // A rotação e a escala do vídeo ocorrem de forma imediata e controlada pelo scroll (gira e volta)
    gsap.fromTo(heroVideoContainerRef.current,
      {
        transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)",
        borderRadius: "0rem",
      },
      {
        // Gira no eixo X e faz uma inclinação leve no Z para dar sensação 3D de maquete física
        transform: "perspective(1200px) rotateX(15deg) rotateY(-4deg) rotateZ(2deg) scale(0.86)",
        borderRadius: "3rem",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.5, // Resposta rápida e suave (gira e volta rápido)
        }
      }
    );

    // Efeito de fade sutil no vídeo para focar no conteúdo de baixo
    gsap.to(heroVideoRef.current, {
      opacity: 0.45,
      y: 50,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

  }, []);

  // Lógica do Diagnostic Shuffler (Features Card 1)
  useEffect(() => {
    const interval = setInterval(() => {
      setShuffleIndex(prev => (prev + 1) % shufflerData.length);
      const cards = shufflerContainerRef.current?.children;
      if (cards) {
        gsap.fromTo(cards, 
          { y: 15, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", stagger: 0.05 }
        );
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Lógica do Telemetry Typewriter (Features Card 2)
  useEffect(() => {
    let charIndex = 0;
    let timer;
    const currentText = typewriterLogs[typewriterIndex];
    
    const type = () => {
      if (charIndex <= currentText.length) {
        setTypewriterText(currentText.substring(0, charIndex));
        charIndex++;
        timer = setTimeout(type, 25);
      } else {
        timer = setTimeout(() => {
          setTypewriterIndex(prev => (prev + 1) % typewriterLogs.length);
        }, 2800);
      }
    };
    type();
    return () => clearTimeout(timer);
  }, [typewriterIndex]);

  // Lógica do Cursor Scheduler (Features Card 3)
  useEffect(() => {
    const grid = schedulerGridRef.current;
    if (!grid) return;

    const cursor = grid.querySelector('.scheduler-cursor');
    const dayCells = grid.querySelectorAll('.day-cell');
    const saveBtn = grid.querySelector('.save-btn');

    if (!cursor || dayCells.length === 0 || !saveBtn) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });

    tl.to(cursor, { opacity: 1, duration: 0.3 })
      .to(cursor, { x: 30, y: 25, duration: 0.8, ease: "power3.out" }) 
      .to(dayCells[3], { scale: 0.94, duration: 0.1 })
      .to(dayCells[3], { scale: 1, backgroundColor: 'rgba(0, 255, 102, 0.25)', borderColor: '#00FF66', duration: 0.1 }) 
      .to(cursor, { x: 125, y: 25, duration: 0.7, ease: "power3.out" }) 
      .to(dayCells[5], { scale: 0.94, duration: 0.1 })
      .to(dayCells[5], { scale: 1, backgroundColor: 'rgba(0, 255, 102, 0.25)', borderColor: '#00FF66', duration: 0.1 }) 
      .to(cursor, { x: 90, y: 95, duration: 0.8, ease: "power3.out" }) 
      .to(saveBtn, { scale: 0.97, duration: 0.1 })
      .to(saveBtn, { scale: 1, borderColor: '#00FF66', color: '#00FF66', duration: 0.1 })
      .to(cursor, { opacity: 0, duration: 0.3 })
      .to(dayCells, { backgroundColor: 'rgba(20, 37, 27, 0.2)', borderColor: 'rgba(20, 37, 27, 0.6)', duration: 0.5, delay: 1 })
      .to(saveBtn, { borderColor: 'rgba(20, 37, 27, 0.6)', color: '#F3F4F6', duration: 0.5 })
      .set(cursor, { x: -20, y: -20 });

  }, []);

  // GSAP ScrollTrigger para revelar Filosofia
  useEffect(() => {
    if (!philosophyTextRef.current) return;
    const textEl = philosophyTextRef.current;
    
    gsap.fromTo(textEl.querySelectorAll('.split-line'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textEl,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  // Sincronizar Filtros de Projetos (ICP)
  useEffect(() => {
    let result = PROJECTS_DATA;
    if (selectedIntent) result = result.filter(p => p.intent === selectedIntent);
    if (selectedVocation) result = result.filter(p => p.vocation === selectedVocation);
    if (selectedPriority) result = result.filter(p => p.priority === selectedPriority);
    setFilteredProjects(result);
  }, [selectedIntent, selectedVocation, selectedPriority]);

  const resetIcp = () => {
    setSelectedIntent("");
    setSelectedVocation("");
    setSelectedPriority("");
    setIcpStep(1);
  };

  const getWhatsAppLink = (customMessage = null) => {
    const basePhone = "5571992515641"; 
    let message = "Olá Erguer! Gostaria de conversar com um engenheiro técnico sobre meu projeto executivo em Salvador.";
    if (customMessage) {
      message = customMessage;
    } else if (selectedIntent || selectedVocation || selectedPriority) {
      message = `Olá Erguer! Fiz a parametrização do meu perfil técnico de obra em Salvador/BA:\n` +
                `- Escopo: ${selectedIntent || 'Sob consulta'}\n` +
                `- Vocação: ${selectedVocation || 'Sob consulta'}\n` +
                `- Foco: ${selectedPriority || 'Sob consulta'}\n` +
                `Gostaria de agendar uma reunião de apresentação técnica e briefing estrutural!`;
    }
    return `https://wa.me/${basePhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="relative min-h-screen selection:bg-emerald/30 selection:text-emerald">
      
      {/* A. NAVBAR — "A Ilha Flutuante" */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500">
        <nav className={`w-full max-w-5xl rounded-full px-6 py-4 flex items-center justify-between transition-all duration-500 ${
          isScrolled 
            ? 'glass-pill shadow-2xl py-2.5 border-emerald/15 translate-y-1' 
            : 'bg-transparent border-transparent'
        }`}>
          {/* Logo oficial da Erguer direcionando diretamente para o Instagram da empresa */}
          <a 
            href="https://www.instagram.com/erguer_projetos_eng?igsh=aGZrZWhoeTJjYjM=" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group relative transition-transform duration-300 hover:scale-[1.03]"
          >
            <div className="bg-obsidian-dark/40 border border-white/5 rounded-2xl p-1 md:p-1.5 backdrop-blur-sm">
              <img 
                src="/logo-erguer.png" 
                alt="Erguer Projetos e Engenharia" 
                className="h-9 sm:h-11 md:h-12 w-auto object-contain"
              />
            </div>
          </a>

          {/* Links de navegação - Desktop */}
          <div className="hidden md:flex items-center gap-8 text-[11px] font-mono text-gray-400">
            <a href="#icp" className="hover:text-emerald transition-colors">/PROJETOS_BA</a>
            <a href="#features" className="hover:text-emerald transition-colors">/TECNOLOGIAS</a>
            <a href="#philosophy" className="hover:text-emerald transition-colors">/MANIFESTO</a>
            <a href="#protocol" className="hover:text-emerald transition-colors">/METODOLOGIA</a>
            <a href="#solutions" className="hover:text-emerald transition-colors">/ESTUDOS_3D</a>
          </div>

          {/* CTA Link WhatsApp */}
          <a 
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn btn-slide-bg flex items-center gap-2 bg-emerald hover:bg-emerald-hover text-black text-[10px] md:text-xs font-mono font-bold px-4 md:px-5 py-2.5 rounded-full"
          >
            FALAR COM ENGENHEIRO
            <ArrowRight size={14} />
          </a>
        </nav>
      </header>

      {/* B. HERO SECTION — Vídeo Rotativo 3D Controlado pelo Scroll */}
      <section id="hero" className="relative h-[100dvh] w-full flex flex-col justify-end px-6 md:px-16 pb-20 overflow-hidden bg-obsidian-dark">
        
        {/* Container do vídeo com transformação 3D e rotação no scroll (Gira e Volta) */}
        <div 
          ref={heroVideoContainerRef} 
          className="absolute inset-0 overflow-hidden z-0 transition-all duration-300 ease-out origin-center"
        >
          <video 
            ref={heroVideoRef}
            src="/hero-house.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-40 filter contrast-110 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-transparent"></div>
        </div>

        {/* Tipografia de Alto Padrão - Blend de Preto, Dourado e Verde */}
        <div className="relative z-20 w-full max-w-4xl flex flex-col items-start mt-20">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald/30 bg-emerald/5 mb-6">
            <MapPin size={11} className="text-emerald animate-pulse" />
            <span className="text-[9px] font-mono text-emerald tracking-widest uppercase font-bold">SALVADOR, BAHIA</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-outfit text-white tracking-tight leading-[0.85] mb-4">
            <span className="bg-gradient-to-r from-[#C9A84C] via-[#00FF66] to-[#C9A84C] bg-[length:200%_auto] bg-clip-text text-transparent animate-metallic-shine font-black tracking-tighter">
              Erguer
            </span>{" "}
            é a
            <span className="text-drama text-champagne italic font-light lowercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-2 tracking-normal block">
              precisão que desafia o <span className="text-emerald font-serif">tempo</span>.
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-sans text-gray-400 max-w-xl mb-8 leading-relaxed">
            Engenharia civil de precisão e obras de alto padrão residencial e comercial. 
            Fusão impecável de <span className="text-champagne font-semibold">arquitetura autoral de luxo</span> com <span className="text-emerald font-semibold">segurança estrutural absoluta</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
            <a 
              href="#icp" 
              className="magnetic-btn btn-slide-bg flex items-center justify-center gap-3 bg-[#00FF66] hover:bg-[#00E65C] text-[#050508] text-xs font-mono font-bold px-8 py-4 rounded-full shadow-lg shadow-emerald/10 text-center"
            >
              PARAMETRIZAR PROJETO (ICP)
              <Sliders size={16} />
            </a>
            <a 
              href="#features" 
              className="magnetic-btn flex items-center justify-center gap-2 border border-emerald/20 hover:border-emerald bg-transparent text-white hover:text-emerald text-xs font-mono px-8 py-4 rounded-full transition-all text-center"
            >
              /VER_TECNOLOGIAS
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute right-8 bottom-8 hidden lg:flex flex-col items-end gap-2 font-mono text-[9px] text-gray-500 z-20">
          <span className="flex items-center gap-1.5 text-emerald"><Video size={10} /> HERO_VIDEO // CONTROLANDO NO SCROLL</span>
          <span>LOCATION_LAT: -12.9777° S | LON: -38.5016° W</span>
        </div>
      </section>

      {/* C. ICP DYNAMIC FILTER + PINTEREST SHOWCASE */}
      <section id="icp" className="relative py-24 px-4 sm:px-6 md:px-16 bg-obsidian border-t border-obsidian-border">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="flex flex-col">
              <span className="text-xs font-mono text-emerald tracking-widest uppercase">CONCURSO DE PROJETOS</span>
              <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
                O que planeja <span className="text-drama text-champagne italic font-light lowercase">construir</span> em Salvador?
              </h2>
            </div>
            <p className="text-xs font-mono text-gray-400 max-w-md">
              [SISTEMA DE FILTRO ICP]. Configure o perfil da sua obra e veja o portfólio de engenharia civil correspondente de nossa construtora.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Bloco do ICP Filtro (Lado Esquerdo - 4 colunas) */}
            <div className="lg:col-span-4 bg-obsidian-card border border-obsidian-border rounded-[2.5rem] p-6 md:p-8 glass-card">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-emerald">PASSO {icpStep} DE 3</span>
                {(selectedIntent || selectedVocation || selectedPriority) && (
                  <button 
                    onClick={resetIcp} 
                    className="text-[10px] font-mono text-champagne hover:text-emerald border border-gray-800 hover:border-emerald px-2 py-0.5 rounded transition-all"
                  >
                    RESETAR
                  </button>
                )}
              </div>

              {/* Corpo do Filtro por Passos */}
              {icpStep === 1 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-base sm:text-lg font-bold font-outfit text-white">Qual a intenção da sua obra?</h3>
                  <p className="text-xs text-gray-400 mb-2">Selecione o estágio técnico básico da demanda.</p>
                  
                  {["Construir do Zero", "Reforma Completa", "Projeto de Arquitetura"].map((option) => (
                    <button
                      key={option}
                      onClick={() => { setSelectedIntent(option); setIcpStep(2); }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-xs sm:text-sm transition-all ${
                        selectedIntent === option 
                          ? 'border-emerald bg-emerald/5 text-emerald' 
                          : 'border-obsidian-border hover:border-emerald/40 text-gray-300 bg-black/40'
                      }`}
                    >
                      {option}
                      <ChevronRight size={16} />
                    </button>
                  ))}
                </div>
              )}

              {icpStep === 2 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-base sm:text-lg font-bold font-outfit text-white">Qual a vocação do espaço?</h3>
                  <p className="text-xs text-gray-400 mb-2">Identificamos o padrão e tipo do imóvel corporativo ou residencial.</p>
                  
                  {["Casa / Residencial de Luxo", "Comercial / Corporativo de Alta Performance"].map((option) => (
                    <button
                      key={option}
                      onClick={() => { setSelectedVocation(option); setIcpStep(3); }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-xs sm:text-sm transition-all ${
                        selectedVocation === option 
                          ? 'border-emerald bg-emerald/5 text-emerald' 
                          : 'border-obsidian-border hover:border-emerald/40 text-gray-300 bg-black/40'
                      }`}
                    >
                      {option}
                      <ChevronRight size={16} />
                    </button>
                  ))}
                  
                  <button onClick={() => setIcpStep(1)} className="text-[10px] font-mono text-gray-500 hover:text-white mt-2 text-center transition-colors">
                    ← Voltar para Passo 1
                  </button>
                </div>
              )}

              {icpStep === 3 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-base sm:text-lg font-bold font-outfit text-white">Sua prioridade estratégica?</h3>
                  <p className="text-xs text-gray-400 mb-2">Ajusta o nosso controle de engenharia ao seu foco.</p>
                  
                  {["Design Autoral & Exclusividade", "Execução Técnica & Rigor de Prazos", "Tecnologia & Sustentabilidade"].map((option) => (
                    <button
                      key={option}
                      onClick={() => { setSelectedPriority(option); }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-xs sm:text-sm transition-all ${
                        selectedPriority === option 
                          ? 'border-emerald bg-emerald/5 text-emerald' 
                          : 'border-obsidian-border hover:border-emerald/40 text-gray-300 bg-black/40'
                      }`}
                    >
                      {option}
                      <Check size={14} className={selectedPriority === option ? 'opacity-100 text-emerald' : 'opacity-0'} />
                    </button>
                  ))}
                  
                  <div className="flex justify-between items-center mt-2">
                    <button onClick={() => setIcpStep(2)} className="text-[10px] font-mono text-gray-500 hover:text-white transition-colors">
                      ← Voltar para Passo 2
                    </button>
                    {selectedPriority && (
                      <span className="text-[10px] font-mono text-emerald animate-pulse">✓ Filtro Ativo</span>
                    )}
                  </div>
                </div>
              )}

              {/* Resumo do Filtro Ativo */}
              <div className="mt-8 pt-6 border-t border-obsidian-border flex flex-col gap-2">
                <span className="text-[9px] font-mono text-gray-500">PARAMETRIZAÇÃO ATIVA</span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-mono px-2.5 py-0.5 rounded bg-black border border-obsidian-border text-gray-300">
                    📍 Salvador / BA
                  </span>
                  {selectedIntent && (
                    <span className="text-[9px] font-mono px-2.5 py-0.5 rounded bg-emerald/10 border border-emerald/30 text-emerald">
                      {selectedIntent}
                    </span>
                  )}
                  {selectedVocation && (
                    <span className="text-[9px] font-mono px-2.5 py-0.5 rounded bg-emerald/10 border border-emerald/30 text-emerald">
                      {selectedVocation}
                    </span>
                  )}
                  {selectedPriority && (
                    <span className="text-[9px] font-mono px-2.5 py-0.5 rounded bg-emerald/10 border border-emerald/30 text-emerald">
                      {selectedPriority}
                    </span>
                  )}
                </div>
              </div>

              {/* Botão de Enviar Dados via WhatsApp */}
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 border border-white/20 hover:border-[#00FF66]/50 bg-black/40 text-white hover:text-[#00FF66] py-4 rounded-xl text-xs font-mono font-extrabold transition-all duration-300 magnetic-btn"
              >
                SOLICITAR ORÇAMENTO DESTE PERFIL
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Bloco da Galeria Estilo Pinterest (Lado Direito - 8 colunas) */}
            <div className="lg:col-span-8">
              
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-[10px] font-mono text-gray-400">
                  {filteredProjects.length === PROJECTS_DATA.length 
                    ? `EXIBINDO TODOS OS ${PROJECTS_DATA.length} PROJETOS` 
                    : `EXIBINDO ${filteredProjects.length} PROJETO(S) CORRESPONDENTES`
                  }
                </span>
                {filteredProjects.length === 0 && (
                  <button onClick={resetIcp} className="text-xs font-mono text-emerald hover:underline">
                    Ver todos os projetos
                  </button>
                )}
              </div>

              {/* Grid Estilo Pinterest com colunas dinâmicas */}
              {filteredProjects.length > 0 ? (
                <div className="columns-1 sm:columns-2 gap-6 space-y-6">
                  {filteredProjects.map((project) => (
                    <div 
                      key={project.id}
                      onClick={() => setActiveProject(project)}
                      className="pinterest-col group cursor-pointer relative rounded-[2.5rem] overflow-hidden border border-obsidian-border bg-obsidian-card glass-card hover:border-emerald/40 transition-all duration-500 block"
                    >
                      {/* Container da Imagem */}
                      <div className="w-full overflow-hidden aspect-[4/5] sm:aspect-auto">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full object-cover transition-transform duration-700 scale-100 group-hover:scale-103 filter grayscale group-hover:grayscale-0 contrast-105"
                          style={{ maxHeight: '420px' }}
                        />
                      </div>

                      {/* Gradiente Interno */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85"></div>

                      {/* Conteúdo sobreposto */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start z-10">
                        <span className="text-[8px] font-mono text-emerald border border-emerald/30 px-2.5 py-0.5 rounded mb-2 bg-black/60 uppercase">
                          {project.type}
                        </span>
                        
                        <h3 className="text-lg md:text-xl font-bold text-white font-outfit tracking-tight group-hover:text-emerald transition-colors">
                          {project.title}
                        </h3>
                        
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
                          <MapPin size={11} className="text-emerald" />
                          <span>{project.location}</span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10 w-full flex items-center justify-between text-[10px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-champagne">ÁREA: {project.area}</span>
                          <span className="flex items-center gap-1 text-emerald">ABRIR PORTFÓLIO <Maximize2 size={10} /></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-obsidian-border rounded-[2.5rem]">
                  <Compass size={36} className="text-gray-700 mb-4 animate-spin-slow" />
                  <h4 className="text-base font-bold text-white mb-2">Nenhum projeto específico catalogado</h4>
                  <p className="text-xs text-gray-400 text-center max-w-sm leading-relaxed">
                    Não possuímos imagens no portfólio para esta exata combinação, mas construímos este perfil técnico sob medida em Salvador.
                  </p>
                  <button onClick={resetIcp} className="mt-4 text-[10px] font-mono text-emerald border border-emerald/30 hover:border-emerald px-4 py-2 rounded-full transition-colors">
                    VER PORTFÓLIO COMPLETO
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Modal de visualização do projeto */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-4xl bg-obsidian-card border border-emerald/25 rounded-[2.5rem] overflow-hidden glass-card shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
              
              {/* Imagem do Projeto */}
              <div className="w-full md:w-1/2 relative h-52 md:h-auto">
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20"></div>
              </div>

              {/* Informações */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-emerald border border-emerald/30 px-2.5 py-0.5 rounded uppercase">
                      {activeProject.type}
                    </span>
                    <button 
                      onClick={() => setActiveProject(null)}
                      className="text-gray-400 hover:text-white font-mono text-xs border border-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:border-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-outfit text-white mb-2">{activeProject.title}</h3>
                  
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                    <MapPin size={12} className="text-emerald" />
                    <span>{activeProject.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    {activeProject.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-t border-b border-obsidian-border py-4 mb-6">
                    <div>
                      <span className="block text-[9px] font-mono text-gray-500">ÁREA CONSTRUÍDA</span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-champagne">{activeProject.area}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-gray-500">DIRETRIZ ICP</span>
                      <span className="text-[10px] sm:text-xs font-bold font-outfit text-white leading-tight">
                        {activeProject.priority.split(" & ")[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a 
                    href={getWhatsAppLink(`Olá Erguer! Fiquei extremamente interessado no projeto "${activeProject.title}" localizado em Salvador/BA. Gostaria de solicitar informações técnicas sobre soluções similares.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center border border-[#00FF66] hover:bg-[#00FF66]/10 text-[#00FF66] hover:text-[#00E65C] py-4 rounded-xl text-xs font-mono font-extrabold transition-all duration-300 shadow-md shadow-emerald/5 magnetic-btn"
                  >
                    INICIAR ESTUDO SEMELHANTE
                  </a>
                  
                  {activeProject.instaUrl && (
                    <a 
                      href={activeProject.instaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center block border border-white/20 hover:border-[#00FF66]/50 bg-black/40 text-white hover:text-[#00FF66] py-3.5 rounded-xl text-xs font-mono font-extrabold transition-all duration-300"
                    >
                      VER PUBLICAÇÃO NO INSTAGRAM
                    </a>
                  )}
                  
                  <button 
                    onClick={() => setActiveProject(null)}
                    className="w-full text-center text-xs font-mono text-gray-500 hover:text-white pt-2"
                  >
                    Voltar para a galeria
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </section>

      {/* D. FEATURES — "Instrumentos de Controle" (Preto, Dourado e Verde) */}
      <section id="features" className="relative py-24 px-4 sm:px-6 md:px-16 bg-obsidian-dark border-t border-obsidian-border">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col mb-16 max-w-xl">
            <span className="text-xs font-mono text-emerald tracking-widest uppercase">// TECNOLOGIA DE EXECUÇÃO CIVIL</span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
              Nossa engenharia reduz <span className="text-drama text-champagne italic font-light lowercase">atritos em obra</span>.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-4 leading-relaxed">
              Erradicamos a improvisação em canteiros de obra. Substituímos suposições por compatibilização geométrica 3D rigorosa e controle rigoroso de tolerâncias de materiais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* CARD 1 — "Diagnostic Shuffler" */}
            <div className="bg-obsidian-card border border-obsidian-border rounded-[2.5rem] p-8 flex flex-col justify-between glass-card h-[380px] hover:border-champagne/20 transition-colors duration-300">
              <div>
                <div className="flex items-center gap-2 text-champagne mb-6">
                  <Layers size={16} className="text-emerald" />
                  <span className="text-[9px] font-mono tracking-widest uppercase text-champagne">COMPATIBILIZAÇÃO BIM 5D</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold font-outfit text-white mb-2">Projetos Tridimensionais Integrados</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Sobreposição de projetos de fundações, estruturas, hidráulica e elétrica. Garantimos que pilares e passagens de dutos caibam de forma exata e antecipada.
                </p>
              </div>

              {/* Shuffler UI */}
              <div ref={shufflerContainerRef} className="relative h-24 bg-black/60 rounded-2xl border border-obsidian-border p-4 flex flex-col justify-center overflow-hidden">
                <span className="absolute right-3 top-2.5 text-[7px] font-mono text-emerald tracking-widest uppercase animate-pulse">
                  CONSTRUTORA // MONITOR
                </span>
                <span className="text-[9px] font-mono text-champagne mb-1 font-bold">
                  {shufflerData[shuffleIndex].title}
                </span>
                <p className="text-xs text-gray-300 leading-tight">
                  {shufflerData[shuffleIndex].value}
                </p>
              </div>
            </div>

            {/* CARD 2 — "Telemetry Typewriter" */}
            <div className="bg-obsidian-card border border-obsidian-border rounded-[2.5rem] p-8 flex flex-col justify-between glass-card h-[380px] hover:border-champagne/20 transition-colors duration-300">
              <div>
                <div className="flex items-center gap-2 text-champagne mb-6">
                  <Cpu size={16} className="text-emerald" />
                  <span className="text-[9px] font-mono tracking-widest uppercase text-champagne">TELEMETRIA CIVIL</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold font-outfit text-white mb-2">Controle Físico-Financeiro Rígido</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Acompanhamento de cura de concreto, testes de estanqueidade e cronograma de suprimentos rastreado de ponta a ponta sem aditivos de custo.
                </p>
              </div>

              {/* Typewriter UI */}
              <div className="h-24 bg-black/80 rounded-2xl border border-obsidian-border p-4 font-mono text-[9px] text-gray-400 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-white/5 pb-1">
                  <span className="flex items-center gap-1 text-emerald">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-ping"></span>
                    TELEMETRIA_OBRA
                  </span>
                  <span className="text-[8px] text-champagne font-bold">PRECISÃO_LASER</span>
                </div>
                <div className="flex-1 flex items-center">
                  <p className="text-emerald/90 leading-tight">
                    {typewriterText}
                    <span className="inline-block w-1 h-3 bg-emerald ml-0.5 animate-pulse"></span>
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3 — "Cursor Protocol Scheduler" */}
            <div className="bg-obsidian-card border border-obsidian-border rounded-[2.5rem] p-8 flex flex-col justify-between glass-card h-[380px] hover:border-champagne/20 transition-colors duration-300">
              <div>
                <div className="flex items-center gap-2 text-champagne mb-6">
                  <Compass size={16} className="text-emerald" />
                  <span className="text-[9px] font-mono tracking-widest uppercase text-champagne">CURADORIA DE FORNECEDORES</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold font-outfit text-white mb-2">Acabamentos e Fornecedores Premium</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Compatibilização rigorosa de marcenarias sob medida, mármores translúcidos importados e esquadrias termoacústicas de alta performance na Bahia.
                </p>
              </div>

              {/* Scheduler UI */}
              <div ref={schedulerGridRef} className="relative h-24 bg-black/60 rounded-2xl border border-obsidian-border p-3 flex flex-col justify-between overflow-hidden select-none">
                
                {/* SVG Cursor Simulado */}
                <svg className="scheduler-cursor absolute w-4.5 h-4.5 pointer-events-none z-10 fill-emerald stroke-black" style={{ left: 0, top: 0 }} viewBox="0 0 24 24">
                  <path d="M4 4l11.733 11.733-4.733.933 2.933 6.4-2.667 1.2-2.933-6.4-4.333 4.267v-18.133z" strokeWidth="2"/>
                </svg>

                <div className="flex items-center justify-between text-[8px] font-mono text-gray-500 border-b border-white/5 pb-0.5">
                  <span>LOGÍSTICA_DE_MONTAGEM</span>
                  <span className="text-champagne font-bold">CURADORIA</span>
                </div>

                <div className="grid grid-cols-7 gap-1 mt-0.5">
                  {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, idx) => (
                    <div 
                      key={idx} 
                      className="day-cell h-5 rounded bg-obsidian/60 border border-obsidian-border flex items-center justify-center text-[8px] font-mono text-gray-400 transition-all"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <button className="save-btn w-full py-1 border border-obsidian-border rounded text-[8px] font-mono text-gray-300 mt-1 transition-all">
                  SALVAR LOGÍSTICA
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* E. PHILOSOPHY — "O Manifesto" (Preto, Dourado e Verde) */}
      <section id="philosophy" className="relative py-28 px-4 sm:px-6 md:px-16 bg-obsidian-dark overflow-hidden text-center flex flex-col items-center justify-center">
        {/* Imagem de textura sutil com efeito Parallax */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-dark via-transparent to-obsidian-dark"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-10 h-10 flex items-center justify-center border border-champagne/30 rounded-full mb-8 bg-emerald/5">
            <Sparkles size={14} className="text-emerald animate-pulse" />
          </div>

          <div ref={philosophyTextRef} className="flex flex-col gap-6 text-center">
            <p className="split-line text-[9px] font-mono text-emerald tracking-widest uppercase font-bold">
              // O MANIFESTO DA RIGIDEZ TÉCNICA
            </p>
            
            <blockquote className="split-line text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug text-gray-300 px-2 sm:px-4">
              "A maioria das construtoras foca apenas em empilhar materiais. Nós erguemos projetos blindando o cronograma através de
              <span className="text-drama text-champagne italic font-light lowercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide px-3 inline-block">
                rigor técnico de controle
              </span> 
              e fidelidade à <span className="text-emerald">arquitetura autoral de alto padrão</span>."
            </blockquote>
          </div>

          <div className="w-16 h-px bg-emerald/20 my-8"></div>

          <p className="text-[10px] font-mono text-gray-500 max-w-md">
            Consolidado na solidez estrutural e conformidade regulamentar. Da Bahia para quem valoriza a engenharia civil como um ativo de precisão.
          </p>
        </div>
      </section>

      {/* F. PROTOCOL — "Metodologia Construtiva" (Substituindo vibes de TI por vibes de Construtora Civil de Luxo) */}
      <section id="protocol" className="relative bg-obsidian py-24 px-4 sm:px-6 md:px-16 border-t border-obsidian-border">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col mb-16 max-w-xl">
            <span className="text-xs font-mono text-emerald tracking-widest uppercase">// METODOLOGIA OPERACIONAL</span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
              Nosso protocolo de <span className="text-drama text-champagne italic font-light lowercase">obras exclusivas</span>.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-4 leading-relaxed">
              Estruturamos o ciclo de vida da construção civil para anular desperdícios, blindar orçamentos e assegurar uma entrega impecável e assistida pós-obra.
            </p>
          </div>

          <div className="relative flex flex-col gap-12 sm:gap-24">
            
            {/* ETAPA 01 */}
            <div className="sticky top-28 bg-[#090f0c] border border-emerald/10 rounded-[2.5rem] p-8 md:p-12 glass-card shadow-2xl flex flex-col lg:flex-row gap-8 items-center min-h-[380px] transition-transform duration-500 hover:scale-[1.01] hover:border-champagne/20">
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <span className="text-[10px] font-mono text-emerald tracking-wider font-bold">ETAPA 01 // LEVANTAMENTO TOPOGRÁFICO A LASER & MODELAGEM</span>
                <h3 className="text-2xl md:text-4xl font-bold font-outfit text-white mt-3 mb-4">
                  Topografia Tridimensional e Nuvem de Pontos
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                  Capturamos a planimetria e altimetria do terreno em Salvador por meio de varredura a laser do local. Sincronizamos os dados diretamente para modelagem BIM, garantindo a concordância milimétrica da topografia real com o projeto de fundação.
                </p>
                <div className="flex flex-col gap-2 font-mono text-[10px] text-gray-500">
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> MAPEAMENTO DE NÍVEIS E DECLIVIDADES VIA SENSOR LASER</span>
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> COMPATIBILIZAÇÃO MILIMÉTRICA DE CORTES E ATERROS</span>
                </div>
              </div>

              {/* Desenho Técnico 1 */}
              <div className="w-full lg:w-1/2 flex items-center justify-center h-48 sm:h-64 bg-black/40 border border-obsidian-border rounded-[2rem] overflow-hidden relative">
                <div className="absolute right-4 top-3.5 text-[8px] font-mono text-champagne uppercase font-bold">SYS_VIEW: TOPOGRAPHY_CONTOUR_LINES</div>
                <svg className="w-36 h-36 animate-spin-slow stroke-emerald/30 fill-none" viewBox="0 0 100 100">
                  {/* Curvas de nível topográficas */}
                  <path d="M10,50 Q30,20 50,50 T90,50" strokeWidth="0.8" />
                  <path d="M20,50 Q35,30 50,50 T80,50" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M30,50 Q40,40 50,50 T70,50" strokeWidth="1.2" stroke="#C9A84C" />
                  <circle cx="50" cy="50" r="45" strokeWidth="0.5" strokeDasharray="5 5" />
                  <path d="M50 5 L50 95 M5 50 L95 50" strokeWidth="0.5" strokeDasharray="1 1" />
                </svg>
              </div>
            </div>

            {/* ETAPA 02 */}
            <div className="sticky top-32 bg-[#060c07] border border-emerald/10 rounded-[2.5rem] p-8 md:p-12 glass-card shadow-2xl flex flex-col lg:flex-row gap-8 items-center min-h-[380px] transition-transform duration-500 hover:scale-[1.01] hover:border-champagne/20">
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <span className="text-[10px] font-mono text-emerald tracking-wider font-bold">ETAPA 02 // RIGOR E COMPATIBILIZAÇÃO</span>
                <h3 className="text-2xl md:text-4xl font-bold font-outfit text-white mt-3 mb-4">
                  Compatibilização Estrutural e CÁLCULOS
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                  Sobrepomos integralmente os projetos complementares estruturais, hidrossanitários, elétricos e de climatização. Eliminamos qualquer colisão física ou retrabalho de furação de vigas e lajes de concreto protendido.
                </p>
                <div className="flex flex-col gap-2 font-mono text-[10px] text-gray-500">
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> ARMAÇÃO DE AÇO E CONCRETO COMPATIBILIZADOS</span>
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> 0% DE ADITIVOS DE CUSTO POR ERRO DE DETALHAMENTO</span>
                </div>
              </div>

              {/* Desenho Técnico 2 */}
              <div className="w-full lg:w-1/2 flex items-center justify-center h-48 sm:h-64 bg-black/40 border border-obsidian-border rounded-[2rem] overflow-hidden relative">
                <div className="absolute right-4 top-3.5 text-[8px] font-mono text-champagne uppercase font-bold">SYS_VIEW: STRUCTURAL_GRID_REINFORCEMENT</div>
                <div className="absolute left-0 right-0 h-[1.5px] bg-emerald/60 shadow-md shadow-emerald animate-[bounce_4.5s_ease-in-out_infinite]"></div>
                <svg className="w-48 h-28 stroke-emerald/20 fill-none" viewBox="0 0 100 60">
                  {/* Grid de concreto armado / ferragens de viga */}
                  <g className="opacity-20" stroke="#C9A84C">
                    <line x1="10" y1="10" x2="90" y2="10" strokeWidth="1" />
                    <line x1="10" y1="30" x2="90" y2="30" strokeWidth="1" />
                    <line x1="10" y1="50" x2="90" y2="50" strokeWidth="1" />
                    <line x1="20" y1="5" x2="20" y2="55" strokeWidth="0.5" />
                    <line x1="40" y1="5" x2="40" y2="55" strokeWidth="0.5" />
                    <line x1="60" y1="5" x2="60" y2="55" strokeWidth="0.5" />
                    <line x1="80" y1="5" x2="80" y2="55" strokeWidth="0.5" />
                  </g>
                  <path d="M15,40 L35,15 L50,45 L68,20 L85,38" stroke="#00FF66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* ETAPA 03 */}
            <div className="sticky top-36 bg-[#050608] border border-emerald/10 rounded-[2.5rem] p-8 md:p-12 glass-card shadow-2xl flex flex-col lg:flex-row gap-8 items-center min-h-[380px] transition-transform duration-500 hover:scale-[1.01] hover:border-champagne/20">
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <span className="text-[10px] font-mono text-emerald tracking-wider font-bold">ETAPA 03 // RIGOR DE ACABAMENTOS & LAUDOS</span>
                <h3 className="text-2xl md:text-4xl font-bold font-outfit text-white mt-3 mb-4">
                  Rigor de Prumos, Curing & Garantia
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                  Executamos canteiros organizados com ensaios sistemáticos de tração, verificação termográfica infravermelha preventiva de instalações e acompanhamento fotográfico semanal das etapas de acabamentos finos. Entregamos com garantia contratual robusta de 5 anos.
                </p>
                <div className="flex flex-col gap-2 font-mono text-[10px] text-gray-500">
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> RELATÓRIOS FOTOGRÁFICOS SEMANAIS INTEGRADOS NO PAINEL</span>
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> LAUDO DE CONFORMIDADE TÉCNICA E GARANTIA DE 5 ANOS</span>
                </div>
              </div>

              {/* Desenho Técnico 3 */}
              <div className="w-full lg:w-1/2 flex items-center justify-center h-48 sm:h-64 bg-black/40 border border-obsidian-border rounded-[2rem] overflow-hidden relative">
                <div className="absolute right-4 top-3.5 text-[8px] font-mono text-champagne uppercase font-bold">SYS_VIEW: MECHANICAL_TENSION_CURING</div>
                <svg className="w-52 h-24 stroke-emerald/30 fill-none" viewBox="0 0 200 80">
                  {/* Curva de cura e resistência mecânica do concreto */}
                  <path d="M10,70 Q50,65 80,40 T150,15 T190,12" stroke="#C9A84C" strokeWidth="1.5" />
                  <path d="M10,70 Q50,70 80,45 T150,20 T190,15" stroke="#00FF66" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="10" y1="70" x2="190" y2="70" strokeWidth="0.5" />
                  <line x1="10" y1="10" x2="10" y2="70" strokeWidth="0.5" />
                </svg>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* G. SOLUTIONS / PRICING (Preto, Dourado e Verde) */}
      <section id="solutions" className="relative py-24 px-4 sm:px-6 md:px-16 bg-obsidian-dark border-t border-obsidian-border">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-mono text-emerald tracking-widest uppercase font-bold">// SERVIÇOS E ESTUDOS TÉCNICOS</span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
              Nossas soluções de <span className="text-drama text-champagne italic font-light lowercase">engenharia civil</span>.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-4 max-w-xl leading-relaxed">
              Diferentes frentes de atuação técnica estruturadas sob medida para viabilizar e fiscalizar obras residenciais e corporativas de alto padrão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Tier 1 */}
            <div className="bg-obsidian-card border border-obsidian-border rounded-[2.5rem] p-8 flex flex-col justify-between glass-card transition-all duration-300 hover:border-champagne/20">
              <div>
                <span className="text-[10px] font-mono text-gray-500 block mb-6">01 // ESTUDO 3D & CONCEPÇÃO</span>
                <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white mb-2">Projetos Executivos & 3D</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-8">
                  Ideal para validação técnica preliminar de um terreno em Salvador/BA. Contempla estudos de volumetria 3D, verificação de índices de gabarito municipais e pré-orçamento detalhado de custos civis.
                </p>
              </div>

              <div>
                <ul className="flex flex-col gap-3 font-mono text-[9px] text-gray-400 border-t border-obsidian-border pt-6 mb-8">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> MODELAGEM EM NUVEM DE PONTOS DIGITAL</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> COMPATIBILIZAÇÃO COM LEGISLAÇÃO MUNICIPAL</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> ANÁLISE DE ORÇAMENTO E INSUMOS (+/- 15% DESVIO)</li>
                </ul>

                <a 
                  href={getWhatsAppLink("Olá Erguer! Tenho interesse no pacote 'Estudo Preliminar & Projeto 3D' para planejar tecnicamente meu terreno em Salvador.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block border border-emerald/30 hover:border-[#00FF66] text-white hover:text-black hover:bg-[#00FF66] py-4 rounded-xl text-xs font-mono font-bold transition-all magnetic-btn"
                >
                  SOLICITAR ESTUDO INICIAL
                </a>
              </div>
            </div>

            {/* Tier 2 (Destacado) */}
            <div className="bg-emerald/5 border-2 border-emerald rounded-[2.5rem] p-8 flex flex-col justify-between relative transition-all duration-300 hover:border-champagne">
              <span className="absolute top-6 right-8 text-[8px] font-mono text-champagne border border-champagne/40 px-2.5 py-0.5 rounded bg-black/85 tracking-widest uppercase font-bold">
                FRENTE CONSTRUTORA
              </span>
              
              <div>
                <span className="text-[10px] font-mono text-emerald block mb-6">02 // OBRA COMPLETA E CHAVE NA MÃO</span>
                <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white mb-2">Execução & Gestão de Obras</h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-8">
                  Assumimos a responsabilidade física, técnica e civil completa do projeto. Coordenamos as equipes técnicas, a compra programada de materiais e garantimos a fidelidade cirúrgica à arquitetura.
                </p>
              </div>

              <div>
                <ul className="flex flex-col gap-3 font-mono text-[9px] text-gray-300 border-t border-emerald/20 pt-6 mb-8">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> COMPATIBILIZAÇÃO PLENA ENTRE PROJETOS E CANTEIRO</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> FISCALIZAÇÃO CONSTANTE DE SUPRIMENTOS E CRONOGRAMAS</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> RELATÓRIOS FOTOGRÁFICOS DE ANÁLISE SEMANAL</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> GARANTIA DE PRAZO E ENTREGAS DE ACABAMENTOS</li>
                </ul>

                <a 
                  href={getWhatsAppLink("Olá Erguer! Gostaria de uma proposta para a 'Execução e Gestão de Obra Completa' da minha obra em Salvador.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block bg-[#00FF66] hover:bg-[#00E65C] text-[#050508] py-4 rounded-xl text-xs font-mono font-extrabold shadow-lg shadow-emerald/10 transition-all hover:scale-103 magnetic-btn"
                >
                  CONTRATAR ENGENHARIA COMPLETA
                </a>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-obsidian-card border border-obsidian-border rounded-[2.5rem] p-8 flex flex-col justify-between glass-card transition-all duration-300 hover:border-champagne/20">
              <div>
                <span className="text-[10px] font-mono text-gray-500 block mb-6">03 // INTELIGÊNCIA TÉCNICA E FISCALIZAÇÃO</span>
                <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white mb-2">Laudos e Consultorias</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-8">
                  Inspeções prediais e laudos preventivos de vizinhança. Emissão de pareceres técnicos sobre patologia de concreto armado e consultorias independentes de obras estruturais complexas.
                </p>
              </div>

              <div>
                <ul className="flex flex-col gap-3 font-mono text-[9px] text-gray-400 border-t border-obsidian-border pt-6 mb-8">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> EMISSÃO ANOTADA DE ART (CREA-BA)</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> VISTORIAS E LAUDOS PREVENTIVOS DE VIZINHANÇA</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> TERMOGRAFIA ELETRÔNICA E DETECÇÕES PREVENTIVAS</li>
                </ul>

                <a 
                  href={getWhatsAppLink("Olá Erguer! Gostaria de contratar a sua assessoria para 'Consultoria & Laudos Técnicos' estruturais.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block border border-emerald/30 hover:border-[#00FF66] text-white hover:text-black hover:bg-[#00FF66] py-4 rounded-xl text-xs font-mono font-bold transition-all magnetic-btn"
                >
                  SOLICITAR LAUDO TÉCNICO
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* H. FOOTER — "Painel de Controle Final" */}
      <footer className="bg-obsidian-dark border-t border-obsidian-border pt-20 pb-12 px-4 sm:px-6 md:px-16 rounded-t-[3rem] sm:rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Bloco de identidade do rodapé */}
            <div className="lg:col-span-6 flex flex-col items-start gap-4">
              <div className="bg-obsidian-dark/40 border border-white/5 rounded-2xl p-1 md:p-1.5">
                <img 
                  src="/logo-erguer.png" 
                  alt="Erguer Projetos e Engenharia" 
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
                Rigor geométrico, compatibilização predial avançada e fidelidade à arquitetura autoral de alto padrão. 
                Erguendo residências de luxo e espaços corporativos de alta performance em Salvador e Litoral Norte.
              </p>
            </div>

            {/* Links Rápidos */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">/NAVEGAÇÃO</span>
              <ul className="flex flex-col gap-2.5 text-xs font-mono text-gray-400">
                <li><a href="#hero" className="hover:text-emerald transition-colors">Retornar ao Topo</a></li>
                <li><a href="#icp" className="hover:text-emerald transition-colors">Portfólio & Filtro ICP</a></li>
                <li><a href="#features" className="hover:text-emerald transition-colors">Controles de Canteiro</a></li>
                <li><a href="#protocol" className="hover:text-emerald transition-colors">Metodologia Construtiva</a></li>
              </ul>
            </div>

            {/* Redes e Contatos */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">/CONTATO_E_REDES</span>
              <ul className="flex flex-col gap-2.5 text-xs font-mono text-gray-400">
                <li>
                  <a 
                    href="https://www.instagram.com/erguer_projetos_eng" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 hover:text-emerald transition-colors"
                  >
                    <Instagram size={13} />
                    @erguer_projetos_eng
                  </a>
                </li>
                <li className="flex items-center gap-1.5">
                  <Smartphone size={13} />
                  (71) 99251-5641
                </li>
                <li>Salvador, Bahia, Brasil.</li>
              </ul>
            </div>

          </div>

          {/* Barra de Sistema Operacional no rodapé */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-obsidian-border pt-8 text-[9px] sm:text-[10px] font-mono text-gray-500 gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} ERGUER PROJETOS E ENGENHARIA. TODOS OS DIREITOS RESERVADOS.</span>
            
            <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 border border-obsidian-border rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald"></span>
              </span>
              <span>SYSTEM OPERATIONAL // 100% OK</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
