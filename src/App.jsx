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
  Calendar,
  ShieldCheck,
  Video
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger para o GSAP no navegador
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * BANCO DE DADOS DE PROJETOS (ICP-BASED)
 * =========================================================================
 * Mestre, você e o cliente podem alterar, adicionar ou remover projetos aqui.
 * As imagens usam links reais e de altíssima qualidade do Unsplash.
 */
const PROJECTS_DATA = [
  {
    id: 1,
    title: "Residência Atlântica",
    type: "Arquitetura & Obra",
    intent: "Construir do Zero",
    vocation: "Casa / Residencial de Luxo",
    priority: "Design Autoral & Exclusividade",
    location: "Litoral Norte / Salvador, BA",
    area: "720 m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    desc: "Estrutura em balanço com concreto aparente e painéis pivotantes de madeira ripada, projetada para otimizar a ventilação natural vinda da costa de Salvador."
  },
  {
    id: 2,
    title: "Edifício Barra Corporate",
    type: "Compatibilização & Reforma",
    intent: "Reforma Completa",
    vocation: "Comercial / Corporativo de Alta Performance",
    priority: "Execução Técnica & Rigor de Prazos",
    location: "Barra, Salvador, BA",
    area: "1.850 m²",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    desc: "Retrofit completo e compatibilização de infraestrutura predial complexa, eliminando colisões de dutos e cabeamento via modelagem BIM 5D."
  },
  {
    id: 3,
    title: "Apartamento Vitória Ocean Front",
    type: "Design & Execução",
    intent: "Reforma Completa",
    vocation: "Casa / Residencial de Luxo",
    priority: "Design Autoral & Exclusividade",
    location: "Corredor da Vitória, Salvador, BA",
    area: "340 m²",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    desc: "Reforma de altíssimo padrão com integração de varanda gourmet, revestimentos em rochas exóticas e automação de iluminação Dali e áudio hi-end."
  },
  {
    id: 4,
    title: "Sede Executiva Tancredo Neves",
    type: "Compatibilização BIM",
    intent: "Projeto de Arquitetura",
    vocation: "Comercial / Corporativo de Alta Performance",
    priority: "Tecnologia & Sustentabilidade",
    location: "Caminho das Árvores, Salvador, BA",
    area: "980 m²",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    desc: "Desenvolvimento de projeto executivo integrado com focos bioclimáticos, fachadas ventiladas e eficiência energética baseada em simulações térmicas."
  },
  {
    id: 5,
    title: "Residência Horto Privée",
    type: "Obra de Alto Padrão",
    intent: "Construir do Zero",
    vocation: "Casa / Residencial de Luxo",
    priority: "Tecnologia & Sustentabilidade",
    location: "Horto Florestal, Salvador, BA",
    area: "850 m²",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    desc: "Casa contemporânea em estrutura mista (aço e concreto armado), com captação solar integrada na cobertura e automação de climatização zonal."
  },
  {
    id: 6,
    title: "Centro Médico Caminho das Árvores",
    type: "Retrofit Técnico",
    intent: "Reforma Completa",
    vocation: "Comercial / Corporativo de Alta Performance",
    priority: "Execução Técnica & Rigor de Prazos",
    location: "Caminho das Árvores, Salvador, BA",
    area: "620 m²",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    desc: "Conversão de layout corporativo em clínica médica de alta complexidade seguindo os mais rígidos parâmetros acústicos, elétricos e de assepsia técnica."
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
    { title: "COMPATIBILIZAÇÃO BIM 5D", value: "0 interferências espaciais físicas detectadas entre elétrica e estrutural." },
    { title: "ESCANEAMENTO LASER 3D", value: "Nuvem de 12 milhões de pontos gerando modelagem topográfica milimétrica." },
    { title: "LEAN CONSTRUCTION METRICS", value: "Minimização de resíduos de alvenaria e concreto em até 16% via modulação computacional." }
  ];

  const typewriterLogs = [
    "EXECUÇÃO: Carregando projeto executivo compatibilizado... [BIM OK]",
    "TELEMETRIA: Resistência mecânica aferida em concreto: 35 MPa... [OK]",
    "CRONOGRAMA: Planejamento físico-financeiro integrado via MS Project... [NO DELAYS]",
    "STATUS: Canteiro Salvador-Horto operando sob padrões Lean... [100% OPERATIONAL]",
    "FISCALIZAÇÃO: Termografia infravermelha de tubulações ativa... [0 INFILTRAÇÕES]",
  ];

  // Efeito de Scroll da Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito 3D de Rotação/Escala do Vídeo do Hero no Scroll (Apple/Premium Style)
  useEffect(() => {
    if (!heroVideoContainerRef.current) return;

    // Animação do container do vídeo girando e diminuindo escala no scroll
    gsap.fromTo(heroVideoContainerRef.current,
      {
        transform: "perspective(1000px) rotateX(0deg) scale(1)",
        borderRadius: "0rem",
      },
      {
        transform: "perspective(1200px) rotateX(12deg) scale(0.92)",
        borderRadius: "2.5rem",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    // Efeito parallax de fade-out sutil do vídeo no scroll
    gsap.to(heroVideoRef.current, {
      opacity: 0.35,
      y: 80,
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
          { y: 25, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.8)", stagger: 0.08 }
        );
      }
    }, 4200);
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
        timer = setTimeout(type, 30);
      } else {
        timer = setTimeout(() => {
          setTypewriterIndex(prev => (prev + 1) % typewriterLogs.length);
        }, 3000);
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

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    tl.to(cursor, { opacity: 1, duration: 0.3 })
      .to(cursor, { x: 35, y: 30, duration: 1, ease: "power3.out" }) 
      .to(dayCells[3], { scale: 0.92, duration: 0.1 })
      .to(dayCells[3], { scale: 1, backgroundColor: 'rgba(0, 255, 102, 0.25)', borderColor: '#00FF66', duration: 0.1 }) 
      .to(cursor, { x: 130, y: 30, duration: 0.8, ease: "power3.out" }) 
      .to(dayCells[5], { scale: 0.92, duration: 0.1 })
      .to(dayCells[5], { scale: 1, backgroundColor: 'rgba(0, 255, 102, 0.25)', borderColor: '#00FF66', duration: 0.1 }) 
      .to(cursor, { x: 90, y: 100, duration: 0.9, ease: "power3.out" }) 
      .to(saveBtn, { scale: 0.96, duration: 0.12 })
      .to(saveBtn, { scale: 1, borderColor: '#00FF66', color: '#00FF66', duration: 0.12 })
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
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textEl,
          start: "top 85%",
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
    const basePhone = "5571999999999"; 
    let message = "Olá Erguer! Gostaria de conversar com um engenheiro técnico sobre meu projeto executivo em Salvador.";
    if (customMessage) {
      message = customMessage;
    } else if (selectedIntent || selectedVocation || selectedPriority) {
      message = `Olá Erguer! Fiz o filtro técnico no site da Erguer para Salvador/BA:\n` +
                `- Serviço: ${selectedIntent || 'Sob consulta'}\n` +
                `- Vocação: ${selectedVocation || 'Sob consulta'}\n` +
                `- Foco: ${selectedPriority || 'Sob consulta'}\n` +
                `Gostaria de agendar uma apresentação de portfólio e briefing de engenharia!`;
    }
    return `https://wa.me/${basePhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="relative min-h-screen selection:bg-emerald/30 selection:text-emerald">
      
      {/* A. NAVBAR — "A Ilha Flutuante" */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500">
        <nav className={`w-full max-w-5xl rounded-full px-6 py-4 flex items-center justify-between transition-all duration-500 ${
          isScrolled 
            ? 'glass-pill shadow-2xl py-3 border-emerald/15 translate-y-1' 
            : 'bg-transparent border-transparent'
        }`}>
          {/* Logo oficial da Erguer redimensionada e ajustada */}
          <a href="#hero" className="flex items-center gap-3 group">
            <img 
              src="/logo-erguer.png" 
              alt="Erguer Projetos e Engenharia" 
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </a>

          {/* Links de navegação - Desktop */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono text-gray-400">
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
            className="magnetic-btn btn-slide-bg flex items-center gap-2 bg-emerald hover:bg-emerald-hover text-black text-[11px] md:text-xs font-mono font-bold px-4 md:px-5 py-2.5 rounded-full"
          >
            FALAR COM ENGENHEIRO
            <ArrowRight size={14} />
          </a>
        </nav>
      </header>

      {/* B. HERO SECTION — "A Cena de Abertura" com Vídeo Rotativo no Scroll */}
      <section id="hero" className="relative h-[100dvh] w-full flex flex-col justify-end px-6 md:px-16 pb-20 overflow-hidden bg-obsidian-dark">
        
        {/* Container do vídeo com transformação 3D no scroll */}
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
            className="w-full h-full object-cover opacity-35 filter grayscale contrast-115 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-transparent"></div>
        </div>

        {/* Tipografia de Alto Padrão - Alinhada à esquerda */}
        <div className="relative z-20 w-full max-w-4xl flex flex-col items-start mt-20">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald/30 bg-emerald/5 mb-6">
            <MapPin size={11} className="text-emerald animate-pulse" />
            <span className="text-[10px] font-mono text-emerald tracking-widest uppercase">SALVADOR, BAHIA</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-outfit text-white tracking-tight leading-[0.85] mb-4">
            Erguer é a
            <span className="text-drama text-emerald italic font-light lowercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-2 tracking-normal block">
              precisão que desafia o tempo.
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-sans text-gray-400 max-w-xl mb-8 leading-relaxed">
            Engenharia de precisão e obras de alto padrão em Salvador e Litoral Norte. 
            Substituímos o improviso por compatibilização tridimensional BIM e rigor geométrico estrutural.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
            <a 
              href="#icp" 
              className="magnetic-btn btn-slide-bg flex items-center justify-center gap-3 bg-emerald text-black text-xs font-mono font-bold px-8 py-4 rounded-full shadow-lg shadow-emerald/10 text-center"
            >
              QUALIFICAR MEU PROJETO (ICP)
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
          <span className="flex items-center gap-1.5 text-emerald"><Video size={10} /> CINEMATIC_STREAM_ACTIVE</span>
          <span>LOCATION_LAT: -12.9777° S | LON: -38.5016° W</span>
        </div>
      </section>

      {/* C. ICP DYNAMIC FILTER + PINTEREST SHOWCASE — "Filtro de Projetos" */}
      <section id="icp" className="relative py-24 px-4 sm:px-6 md:px-16 bg-obsidian border-t border-obsidian-border">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="flex flex-col">
              <span className="text-xs font-mono text-emerald tracking-widest uppercase">QUALIFICAÇÃO PREVENTIVA</span>
              <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
                Qualifique o seu <span className="text-drama text-emerald italic font-light lowercase">projeto</span>.
              </h2>
            </div>
            <p className="text-xs font-mono text-gray-400 max-w-md">
              [SISTEMA DE FILTRO ICP]. Configure o perfil da sua obra e veja o portfólio técnico correspondente de nossa engenharia em Salvador/BA.
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
                    className="text-[10px] font-mono text-gray-400 hover:text-emerald border border-gray-800 hover:border-emerald px-2 py-0.5 rounded transition-all"
                  >
                    LIMPAR
                  </button>
                )}
              </div>

              {/* Corpo do Filtro por Passos */}
              {icpStep === 1 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-base sm:text-lg font-bold font-outfit text-white">Qual a intenção da sua obra?</h3>
                  <p className="text-xs text-gray-400 mb-2">Identificamos o escopo técnico preliminar necessário.</p>
                  
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
                  <p className="text-xs text-gray-400 mb-2">Segmentamos o padrão normativo e a tipologia da obra.</p>
                  
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
                  <p className="text-xs text-gray-400 mb-2">Define o foco do nosso controle operacional de qualidade.</p>
                  
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
                      <span className="text-[10px] font-mono text-emerald animate-pulse">✓ Filtro Aplicado!</span>
                    )}
                  </div>
                </div>
              )}

              {/* Resumo do Filtro Ativo */}
              <div className="mt-8 pt-6 border-t border-obsidian-border flex flex-col gap-2">
                <span className="text-[9px] font-mono text-gray-500">PARAMETRIZAÇÃO ATIVA</span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black border border-obsidian-border text-gray-300">
                    📍 Salvador / Litoral Norte
                  </span>
                  {selectedIntent && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald/10 border border-emerald/30 text-emerald">
                      {selectedIntent}
                    </span>
                  )}
                  {selectedVocation && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald/10 border border-emerald/30 text-emerald">
                      {selectedVocation}
                    </span>
                  )}
                  {selectedPriority && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald/10 border border-emerald/30 text-emerald">
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
                className="mt-6 w-full flex items-center justify-center gap-2 bg-emerald text-black py-4 rounded-xl text-xs font-mono font-bold hover:bg-emerald-hover transition-colors magnetic-btn"
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
                    : `EXIBINDO ${filteredProjects.length} PROJETO(S) COMPATÍVEIS`
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85"></div>

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
                          <span>ÁREA: {project.area}</span>
                          <span className="flex items-center gap-1 text-emerald">DETALHES TÉCNICOS <Maximize2 size={10} /></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-obsidian-border rounded-[2.5rem]">
                  <Compass size={36} className="text-gray-700 mb-4 animate-spin-slow" />
                  <h4 className="text-base font-bold text-white mb-2">Combinação específica não catalogada</h4>
                  <p className="text-xs text-gray-400 text-center max-w-sm leading-relaxed">
                    Não possuímos imagens no portfólio para esta exata combinação, mas executamos este perfil sob medida em Salvador e Litoral Norte.
                  </p>
                  <button onClick={resetIcp} className="mt-4 text-[10px] font-mono text-emerald border border-emerald/30 hover:border-emerald px-4 py-2 rounded-full transition-colors">
                    REDEFINIR CRITÉRIOS (VER TODOS)
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
                    <span className="text-[10px] font-mono text-emerald border border-emerald/30 px-2 py-0.5 rounded uppercase">
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
                      <span className="text-xs sm:text-sm font-bold font-mono text-white">{activeProject.area}</span>
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
                    className="w-full text-center bg-emerald hover:bg-emerald-hover text-black py-4 rounded-xl text-xs font-mono font-bold transition-transform"
                  >
                    INICIAR ESTUDO SEMELHANTE
                  </a>
                  <button 
                    onClick={() => setActiveProject(null)}
                    className="w-full text-center text-xs font-mono text-gray-500 hover:text-white"
                  >
                    Voltar para a galeria
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </section>

      {/* D. FEATURES (Funcionalidades) — "Artefatos Funcionais Interativos" */}
      <section id="features" className="relative py-24 px-4 sm:px-6 md:px-16 bg-obsidian-dark border-t border-obsidian-border">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col mb-16 max-w-xl">
            <span className="text-xs font-mono text-emerald tracking-widest uppercase">TECNOLOGIA INTEGRADA</span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
              Nossa tecnologia reduz <span className="text-drama text-emerald italic font-light lowercase">atritos</span>.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-4 leading-relaxed">
              Substituímos suposições por algoritmos de controle geométrico, modelagem estrutural avançada e relatórios técnicos sistemáticos semanais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* CARD 1 — "Diagnostic Shuffler" */}
            <div className="bg-obsidian-card border border-obsidian-border rounded-[2.5rem] p-8 flex flex-col justify-between glass-card h-[380px]">
              <div>
                <div className="flex items-center gap-2 text-emerald mb-6">
                  <Layers size={16} />
                  <span className="text-[9px] font-mono tracking-widest uppercase">COMPATIBILIZAÇÃO BIM</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold font-outfit text-white mb-2">Engenharia de Precisão Digital</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Modelamos a engenharia estrutural de forma sobreposta à arquitetura autoral. Isso garante que cada viga, pilar e duto técnico caiba de forma milimétrica.
                </p>
              </div>

              {/* Shuffler UI */}
              <div ref={shufflerContainerRef} className="relative h-24 bg-black/60 rounded-2xl border border-obsidian-border p-4 flex flex-col justify-center overflow-hidden">
                <span className="absolute right-3 top-2.5 text-[7px] font-mono text-emerald tracking-widest uppercase animate-pulse">
                  BIM_ENGINE // LIVE
                </span>
                <span className="text-[9px] font-mono text-emerald mb-1">
                  {shufflerData[shuffleIndex].title}
                </span>
                <p className="text-xs text-gray-300 leading-tight">
                  {shufflerData[shuffleIndex].value}
                </p>
              </div>
            </div>

            {/* CARD 2 — "Telemetry Typewriter" */}
            <div className="bg-obsidian-card border border-obsidian-border rounded-[2.5rem] p-8 flex flex-col justify-between glass-card h-[380px]">
              <div>
                <div className="flex items-center gap-2 text-emerald mb-6">
                  <Cpu size={16} />
                  <span className="text-[9px] font-mono tracking-widest uppercase">MÉTRICAS E CONTROLE</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold font-outfit text-white mb-2">Gestão Executiva Rigorosa</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Erradicamos improvisos. Acompanhamos o andamento de compras e o cronograma semanal de tarefas com rigor analítico absoluto.
                </p>
              </div>

              {/* Typewriter UI */}
              <div className="h-24 bg-black/80 rounded-2xl border border-obsidian-border p-4 font-mono text-[9px] text-gray-400 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-white/5 pb-1">
                  <span className="flex items-center gap-1 text-emerald">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-ping"></span>
                    LOG_STREAM
                  </span>
                  <span>SYS: 100% OK</span>
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
            <div className="bg-obsidian-card border border-obsidian-border rounded-[2.5rem] p-8 flex flex-col justify-between glass-card h-[380px]">
              <div>
                <div className="flex items-center gap-2 text-emerald mb-6">
                  <Compass size={16} />
                  <span className="text-[9px] font-mono tracking-widest uppercase">CONCURSO DE PRAZOS</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold font-outfit text-white mb-2">Gestão de Fornecedores Premium</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Compatibilidade total com marmorarias, marcenarias de grife e equipes de automação predial de alta competência técnica na Bahia.
                </p>
              </div>

              {/* Scheduler UI */}
              <div ref={schedulerGridRef} className="relative h-24 bg-black/60 rounded-2xl border border-obsidian-border p-3 flex flex-col justify-between overflow-hidden select-none">
                
                {/* SVG Cursor Simulado */}
                <svg className="scheduler-cursor absolute w-4.5 h-4.5 pointer-events-none z-10 fill-emerald stroke-black" style={{ left: 0, top: 0 }} viewBox="0 0 24 24">
                  <path d="M4 4l11.733 11.733-4.733.933 2.933 6.4-2.667 1.2-2.933-6.4-4.333 4.267v-18.133z" strokeWidth="2"/>
                </svg>

                <div className="flex items-center justify-between text-[8px] font-mono text-gray-500 border-b border-white/5 pb-0.5">
                  <span>GANTT_WEEKLY_TRACKING</span>
                  <span>MAR - ABR</span>
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

      {/* E. PHILOSOPHY — "O Manifesto" */}
      <section id="philosophy" className="relative py-28 px-4 sm:px-6 md:px-16 bg-obsidian-dark overflow-hidden text-center flex flex-col items-center justify-center">
        {/* Imagem de textura sutil com efeito Parallax */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-dark via-transparent to-obsidian-dark"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-10 h-10 flex items-center justify-center border border-emerald/30 rounded-full mb-8 bg-emerald/5">
            <Sparkles size={14} className="text-emerald animate-pulse" />
          </div>

          <div ref={philosophyTextRef} className="flex flex-col gap-6 text-center">
            <p className="split-line text-[9px] font-mono text-emerald tracking-widest uppercase">
              // O MANIFESTO DA RIGIDEZ TÉCNICA
            </p>
            
            <blockquote className="split-line text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug text-gray-300 px-2 sm:px-4">
              "A maioria das construtoras foca apenas em empilhar materiais. Nós erguemos projetos blindando o cronograma através de
              <span className="text-drama text-emerald italic font-light lowercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide px-3 inline-block">
                rigor técnico de controle
              </span> 
              e fidelidade à arquitetura autoral."
            </blockquote>
          </div>

          <div className="w-16 h-px bg-emerald/20 my-8"></div>

          <p className="text-[10px] font-mono text-gray-500 max-w-md">
            Consolidado na solidez estrutural e conformidade regulamentar. Da Bahia para quem valoriza a engenharia como um ativo de precisão.
          </p>
        </div>
      </section>

      {/* F. PROTOCOL — "Empilhamento Estático/Sticky Fluido" (SUBSTITUINDO GSAP PIN PARA EVITAR TRAVAMENTOS) */}
      <section id="protocol" className="relative bg-obsidian py-24 px-4 sm:px-6 md:px-16 border-t border-obsidian-border">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col mb-16 max-w-xl">
            <span className="text-xs font-mono text-emerald tracking-widest uppercase">METODOLOGIA EM 3 ETAPAS</span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
              Nosso protocolo de <span className="text-drama text-emerald italic font-light lowercase">execução</span>.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-4 leading-relaxed">
              Estruturamos o ciclo de vida da obra para evitar retrabalhos técnicos, otimizar a compra de materiais e garantir previsibilidade contratual absoluta.
            </p>
          </div>

          {/* Sistema Sticky Stacking utilizando CSS robusto e à prova de travamentos */}
          <div className="relative flex flex-col gap-12 sm:gap-24">
            
            {/* ETAPA 01 */}
            <div className="sticky top-28 bg-[#090f0c] border border-emerald/10 rounded-[2.5rem] p-8 md:p-12 glass-card shadow-2xl flex flex-col lg:flex-row gap-8 items-center min-h-[380px] transition-transform duration-500 hover:scale-[1.01]">
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <span className="text-[10px] font-mono text-emerald tracking-wider">PASSO 01 // CONCEPÇÃO E LEVANTAMENTO</span>
                <h3 className="text-2xl md:text-4xl font-bold font-outfit text-white mt-3 mb-4">
                  Escaneamento e Estudos BIM
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                  Capturamos o terreno em nuvem de pontos tridimensional por meio de varredura a laser do local. Sincronizamos esses dados diretamente nos softwares BIM para obter a máxima fidelidade milimétrica do terreno real.
                </p>
                <div className="flex flex-col gap-2 font-mono text-[10px] text-gray-500">
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> LEVANTAMENTO TOPOGRÁFICO A LASER 3D</span>
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> MONTAGEM DE DIRETRIZ E VOLUME BIM INICIAL</span>
                </div>
              </div>

              {/* Visual Animado 1 */}
              <div className="w-full lg:w-1/2 flex items-center justify-center h-48 sm:h-64 bg-black/40 border border-obsidian-border rounded-[2rem] overflow-hidden relative">
                <div className="absolute right-4 top-3.5 text-[8px] font-mono text-gray-600 uppercase">SYS_VIEW: STRUCTURE_BIM_GRID</div>
                <svg className="w-36 h-36 animate-spin-slow stroke-emerald/20 fill-none" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="32" strokeWidth="1.2" />
                  <circle cx="50" cy="50" r="20" strokeWidth="1" strokeDasharray="2 2" />
                  <path d="M50 5 L50 95 M5 50 L95 50" strokeWidth="0.5" strokeDasharray="1 1" />
                  <polygon points="50,15 85,50 50,85 15,50" strokeWidth="0.8" />
                </svg>
              </div>
            </div>

            {/* ETAPA 02 */}
            <div className="sticky top-32 bg-[#060c07] border border-emerald/10 rounded-[2.5rem] p-8 md:p-12 glass-card shadow-2xl flex flex-col lg:flex-row gap-8 items-center min-h-[380px] transition-transform duration-500 hover:scale-[1.01]">
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <span className="text-[10px] font-mono text-emerald tracking-wider">PASSO 02 // RIGOR TÉCNICO PREVENTIVO</span>
                <h3 className="text-2xl md:text-4xl font-bold font-outfit text-white mt-3 mb-4">
                  Compatibilização de Colisões
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                  Sobrepomos integralmente as disciplinas complementares (estrutural, hidrossanitária, climatização e elétrica). Resolvemos colisões geométricas no modelo digital antes de dar início à execução física.
                </p>
                <div className="flex flex-col gap-2 font-mono text-[10px] text-gray-500">
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> CO-AUTORIA E COORDENAÇÃO DE DISCIPLINAS</span>
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> 0% DE ADITIVOS DE RECOBRIMENTO POR IMPREVISTO</span>
                </div>
              </div>

              {/* Visual Animado 2 */}
              <div className="w-full lg:w-1/2 flex items-center justify-center h-48 sm:h-64 bg-black/40 border border-obsidian-border rounded-[2rem] overflow-hidden relative">
                <div className="absolute right-4 top-3.5 text-[8px] font-mono text-gray-600 uppercase">SYS_VIEW: CLASH_DETECTION</div>
                <div className="absolute left-0 right-0 h-[1.5px] bg-emerald/60 shadow-md shadow-emerald animate-[bounce_4.5s_ease-in-out_infinite]"></div>
                <svg className="w-48 h-28 stroke-emerald/20 fill-none" viewBox="0 0 100 60">
                  <g className="opacity-15">
                    <line x1="10" y1="10" x2="90" y2="10" strokeWidth="0.5" />
                    <line x1="10" y1="30" x2="90" y2="30" strokeWidth="0.5" />
                    <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" />
                  </g>
                  <path d="M15,40 L35,15 L50,45 L68,20 L85,38" stroke="#00FF66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="35" cy="15" r="2.5" fill="#00FF66" />
                  <circle cx="50" cy="45" r="2.5" fill="#00FF66" />
                  <circle cx="68" cy="20" r="2.5" fill="#00FF66" />
                </svg>
              </div>
            </div>

            {/* ETAPA 03 */}
            <div className="sticky top-36 bg-[#050608] border border-emerald/10 rounded-[2.5rem] p-8 md:p-12 glass-card shadow-2xl flex flex-col lg:flex-row gap-8 items-center min-h-[380px] transition-transform duration-500 hover:scale-[1.01]">
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <span className="text-[10px] font-mono text-emerald tracking-wider">PASSO 03 // RIGOR TÉCNICO & CONTROLES</span>
                <h3 className="text-2xl md:text-4xl font-bold font-outfit text-white mt-3 mb-4">
                  Rigor de Acabamento & Entrega
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                  Transformamos plantas digitais em realidade concreta. Executamos canteiros altamente coordenados com verificação de prumo mecânico, ensaios de tração térmica e termografia eletrônica pós-obra com garantia contratual padrão de 5 anos.
                </p>
                <div className="flex flex-col gap-2 font-mono text-[10px] text-gray-500">
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> RELATÓRIOS FOTOGRÁFICOS DE ANÁLISE SEMANAL</span>
                  <span className="flex items-center gap-1.5"><Check size={11} className="text-emerald" /> LAUDOS E GARANTIA CONTRATUAL ESCRITA DE 5 ANOS</span>
                </div>
              </div>

              {/* Visual Animado 3 */}
              <div className="w-full lg:w-1/2 flex items-center justify-center h-48 sm:h-64 bg-black/40 border border-obsidian-border rounded-[2rem] overflow-hidden relative">
                <div className="absolute right-4 top-3.5 text-[8px] font-mono text-gray-600 uppercase">SYS_VIEW: TELEMETRY_WAVEFORM</div>
                <svg className="w-52 h-24 stroke-emerald/30 fill-none" viewBox="0 0 200 80">
                  <path d="M0,40 Q25,15 50,40 T100,40 T150,40 T200,40" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M0,40 Q25,5 50,40 T100,40 T150,40 T200,40" stroke="#00FF66" strokeWidth="1.2" className="animate-[dash_8s_linear_infinite]" strokeDasharray="1000" />
                </svg>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* G. SOLUTIONS / PRICING — "Como Começar" */}
      <section id="solutions" className="relative py-24 px-4 sm:px-6 md:px-16 bg-obsidian-dark border-t border-obsidian-border">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-mono text-emerald tracking-widest uppercase">// NOSSAS LINHAS DE ATUAÇÃO</span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mt-2">
              Frentes técnicas estruturadas.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-4 max-w-xl leading-relaxed">
              Três abordagens de engenharia e modelagem projetadas para viabilizar construções de alto padrão de ponta a ponta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Tier 1 */}
            <div className="bg-obsidian-card border border-obsidian-border rounded-[2.5rem] p-8 flex flex-col justify-between glass-card transition-all duration-300 hover:border-emerald/30">
              <div>
                <span className="text-[10px] font-mono text-gray-500 block mb-6">01 // ESTUDOS BIM</span>
                <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white mb-2">Concepção & Modelagem 3D</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-8">
                  Destinado a validar tecnicamente o potencial de um terreno ou imóvel em Salvador. Inclui análise prévia de volumetria estrutural, compatibilização com leis municipais e levantamento métrico completo.
                </p>
              </div>

              <div>
                <ul className="flex flex-col gap-3 font-mono text-[9px] text-gray-400 border-t border-obsidian-border pt-6 mb-8">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> MODELAGEM EM NUVEM DE PONTOS INICIAL</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> AVALIAÇÃO DE GABARITO DE ZONEAMENTO</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> ORÇAMENTO ESTIMADO OPERACIONAL (+/- 15%)</li>
                </ul>

                <a 
                  href={getWhatsAppLink("Olá Erguer! Tenho interesse na 'Concepção & Modelagem 3D' para planejar tecnicamente meu terreno em Salvador.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block border border-emerald/30 hover:border-emerald text-white hover:text-black hover:bg-emerald py-4 rounded-xl text-xs font-mono font-bold transition-all magnetic-btn"
                >
                  SOLICITAR ESTUDO INICIAL
                </a>
              </div>
            </div>

            {/* Tier 2 (Destacado) */}
            <div className="bg-emerald/5 border-2 border-emerald rounded-[2.5rem] p-8 flex flex-col justify-between relative transition-all duration-300">
              <span className="absolute top-6 right-8 text-[8px] font-mono text-emerald border border-emerald/40 px-2.5 py-0.5 rounded bg-black/80 tracking-widest uppercase">
                FRENTE PRINCIPAL
              </span>
              
              <div>
                <span className="text-[10px] font-mono text-emerald block mb-6">02 // CHAVE NA MÃO</span>
                <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white mb-2">Gestão e Execução de Obra</h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-8">
                  Controle total do primeiro piquete topográfico à limpeza final de entrega. Assumimos a responsabilidade física, técnica e civil por meio de uma gestão baseada em metas de cronograma semanais.
                </p>
              </div>

              <div>
                <ul className="flex flex-col gap-3 font-mono text-[9px] text-gray-300 border-t border-emerald/20 pt-6 mb-8">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> GESTÃO DE SUPRIMENTOS E COMPRAS SEM DESVIOS</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> COMPATIBILIDADE PLENA BIM E ARQUITETURA</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> DIÁRIOS FOTOGRÁFICOS DE OBRA EM CLOUD</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> RIGOR CONTRATUAL DE PRAZOS ACORDADOS</li>
                </ul>

                <a 
                  href={getWhatsAppLink("Olá Erguer! Gostaria de agendar uma reunião de apresentação técnica para a 'Gestão e Execução de Obra' em Salvador.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block bg-emerald text-black py-4 rounded-xl text-xs font-mono font-bold shadow-lg shadow-emerald/10 transition-all hover:scale-103 magnetic-btn"
                >
                  CONTRATAR ENGENHARIA COMPLETA
                </a>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-obsidian-card border border-obsidian-border rounded-[2.5rem] p-8 flex flex-col justify-between glass-card transition-all duration-300 hover:border-emerald/30">
              <div>
                <span className="text-[10px] font-mono text-gray-500 block mb-6">03 // ENGENHARIA LEGAL</span>
                <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white mb-2">Laudos e Consultoria Estrutural</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-8">
                  Consultoria especializada para patologia de estruturas em concreto, laudos de vizinhança preventivos com fé pública técnica e laudos de vistoria técnica em Salvador e região metropolitana.
                </p>
              </div>

              <div>
                <ul className="flex flex-col gap-3 font-mono text-[9px] text-gray-400 border-t border-obsidian-border pt-6 mb-8">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> EMISSÃO EXCLUSIVA DE ART (CREA-BA)</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> DIAGNÓSTICOS TERMOGRÁFICOS PREVENTIVOS</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-emerald" /> LAUDOS DE ENGENHARIA DE VIZINHANÇA</li>
                </ul>

                <a 
                  href={getWhatsAppLink("Olá Erguer! Gostaria de solicitar um orçamento para 'Laudo ou Consultoria Estrutural' para minha edificação.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block border border-emerald/30 hover:border-emerald text-white hover:text-black hover:bg-emerald py-4 rounded-xl text-xs font-mono font-bold transition-all magnetic-btn"
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
              <img 
                src="/logo-erguer.png" 
                alt="Erguer Projetos e Engenharia" 
                className="h-10 md:h-12 w-auto object-contain"
              />
              <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
                Rigor geométrico, compatibilização estrutural e fidelidade arquitetônica. 
                Erguendo residências de luxo e espaços corporativos de alta performance em Salvador e Litoral Norte.
              </p>
            </div>

            {/* Links Rápidos */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">/NAVEGAÇÃO</span>
              <ul className="flex flex-col gap-2.5 text-xs font-mono text-gray-400">
                <li><a href="#hero" className="hover:text-emerald transition-colors">Retornar ao Topo</a></li>
                <li><a href="#icp" className="hover:text-emerald transition-colors">Portfólio & Filtro ICP</a></li>
                <li><a href="#features" className="hover:text-emerald transition-colors">Tecnologia Construtiva</a></li>
                <li><a href="#protocol" className="hover:text-emerald transition-colors">Metodologia e Fases</a></li>
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
                  (71) 99999-9999
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
