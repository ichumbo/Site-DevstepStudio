import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const portfolioAnimations = {
  // Animação de entrada dos cards com efeito magnético
  initCards: (cards, section) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse"
      }
    });

    // Efeito de "explosão" inicial
    tl.set(cards, {
      scale: 0,
      rotation: 180,
      opacity: 0,
      filter: "blur(20px) brightness(0.3)"
    })
    .to(cards, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      filter: "blur(0px) brightness(1)",
      duration: 1.8,
      ease: "elastic.out(1, 0.8)",
      stagger: {
        amount: 1.2,
        from: "center",
        grid: "auto"
      }
    })
    // Efeito de flutuação contínua
    .to(cards, {
      y: "-=15",
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 0.5,
        from: "random"
      }
    }, "-=0.5");

    return tl;
  },

  // Animação de hover com efeito 3D e partículas
  setupHoverEffects: (card, index) => {
    const img = card.querySelector('img');
    const overlay = card.querySelector('.overlay');
    const title = card.querySelector('h3');
    const description = card.querySelector('p');
    const button = card.querySelector('button');
    
    // Criar partículas de hover
    const particles = [];
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-violet-400 rounded-full opacity-0 pointer-events-none';
      card.appendChild(particle);
      particles.push(particle);
    }
    
    const hoverTl = gsap.timeline({ paused: true });
    const leaveTl = gsap.timeline({ paused: true });
    
    // Animação de entrada do hover
    hoverTl.to(card, {
      y: -35,
      scale: 1.12,
      rotationX: 8,
      rotationY: 5,
      z: 100,
      boxShadow: "0 25px 50px rgba(116, 72, 255, 0.4)",
      duration: 0.7,
      ease: "power3.out"
    }, 0)
    .to(img, {
      scale: 1.2,
      rotation: 2,
      filter: "brightness(1.1) saturate(1.2)",
      duration: 0.8,
      ease: "power2.out"
    }, 0)
    .to(overlay, {
      opacity: 1,
      backdropFilter: "blur(2px)",
      duration: 0.4
    }, 0.1)
    .fromTo(title, {
      y: 40,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(2)"
    }, 0.2)
    .fromTo(description, {
      y: 30,
      opacity: 0,
      x: -20
    }, {
      y: 0,
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power2.out"
    }, 0.3)
    .fromTo(button, {
      scale: 0,
      rotation: 180
    }, {
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, 0.4)
    // Animação das partículas
    .to(particles, {
      opacity: 1,
      scale: 1.5,
      x: () => gsap.utils.random(-50, 50),
      y: () => gsap.utils.random(-50, 50),
      rotation: () => gsap.utils.random(0, 360),
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.05
    }, 0.2);

    // Animação de saída do hover
    leaveTl.to(particles, {
      opacity: 0,
      scale: 0,
      duration: 0.3
    }, 0)
    .to([title, description, button], {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05
    }, 0)
    .to(overlay, {
      opacity: 0,
      duration: 0.3
    }, 0.1)
    .to(card, {
      y: 0,
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      z: 0,
      boxShadow: "0 0 0 rgba(116, 72, 255, 0)",
      duration: 0.5,
      ease: "power2.inOut"
    }, 0)
    .to(img, {
      scale: 1,
      rotation: 0,
      filter: "brightness(1) saturate(1)",
      duration: 0.5,
      ease: "power2.inOut"
    }, 0);

    card.addEventListener('mouseenter', () => {
      leaveTl.pause();
      hoverTl.restart();
    });
    
    card.addEventListener('mouseleave', () => {
      hoverTl.pause();
      leaveTl.restart();
    });
    
    return { hoverTl, leaveTl };
  },

  // Animação de transição do carrossel
  slideTransition: (carousel, targetScroll) => {
    return gsap.to(carousel, {
      scrollLeft: targetScroll,
      duration: 1.2,
      ease: "power3.inOut"
    });
  },

  // Animação dos indicadores
  animateIndicator: (indicator, isActive) => {
    return gsap.to(indicator, {
      scale: isActive ? 1.3 : 1,
      backgroundColor: isActive ? "#7448FF" : "#6B7280",
      duration: 0.4,
      ease: "power2.out"
    });
  },

  // Sistema de partículas avançado
  createFloatingParticles: (container) => {
    const particles = [];
    const colors = ['#7448FF', '#9333EA', '#C084FC', '#DDD6FE'];
    
    for (let i = 0; i < 35; i++) {
      const particle = document.createElement('div');
      const size = gsap.utils.random(2, 8);
      const color = gsap.utils.random(colors);
      
      particle.className = 'absolute rounded-full opacity-0 pointer-events-none';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.backgroundColor = color;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.filter = 'blur(0.5px)';
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animação complexa das partículas
    particles.forEach((particle, i) => {
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.set(particle, {
        opacity: 0,
        scale: 0
      })
      .to(particle, {
        opacity: gsap.utils.random(0.3, 0.8),
        scale: gsap.utils.random(0.5, 1.5),
        duration: gsap.utils.random(1, 2),
        ease: "power2.out",
        delay: i * 0.1
      })
      .to(particle, {
        y: gsap.utils.random(-200, -400),
        x: gsap.utils.random(-100, 100),
        rotation: gsap.utils.random(0, 360),
        scale: 0,
        opacity: 0,
        duration: gsap.utils.random(3, 6),
        ease: "power1.out"
      })
      .set(particle, {
        y: 0,
        x: 0,
        rotation: 0,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%'
      });
    });

    return particles;
  },

  // Animação de reveal com efeito de desintegração
  revealAnimation: (element) => {
    const tl = gsap.timeline();
    
    // Criar efeito de máscara dinâmica
    tl.set(element, { 
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      filter: "blur(10px) brightness(0.5)"
    })
    .to(element, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      filter: "blur(0px) brightness(1)",
      duration: 2,
      ease: "power3.inOut"
    })
    .from(element.children, {
      y: 80,
      opacity: 0,
      scale: 0.8,
      rotation: 5,
      duration: 1.2,
      stagger: {
        amount: 0.6,
        from: "random"
      },
      ease: "back.out(1.7)"
    }, "-=1.2")
    // Adicionar brilho final
    .to(element, {
      boxShadow: "0 0 30px rgba(116, 72, 255, 0.3)",
      duration: 0.5,
      yoyo: true,
      repeat: 1
    }, "-=0.3");
    
    return tl;
  },

  // Efeito de ondulação magnética
  magneticEffect: (cards) => {
    cards.forEach((card, index) => {
      if (!card) return;
      
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(card, {
          x: x * 0.1,
          y: y * 0.1,
          rotationX: y * 0.05,
          rotationY: x * 0.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  },

  // Efeito de pulsação nos indicadores
  pulseIndicators: (indicators) => {
    indicators.forEach((indicator, index) => {
      if (!indicator) return;
      
      gsap.to(indicator, {
        scale: 1.2,
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
        ease: "sine.inOut"
      });
    });
  },

  // Animação do hero banner
  animateHeroBanner: (selector) => {
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(selector, {
      y: -20,
      rotation: 2,
      duration: 3,
      ease: "sine.inOut"
    })
    .to(selector, {
      y: 20,
      rotation: -2,
      duration: 3,
      ease: "sine.inOut"
    })
    .to(selector, {
      y: 0,
      rotation: 0,
      duration: 2,
      ease: "sine.inOut"
    });
    
    return tl;
  },

  // Animação do container do hero banner
  animateHeroBannerContainer: (selector) => {
    gsap.set(selector, {
      scale: 0.8,
      opacity: 0,
      filter: "blur(10px)"
    });
    
    gsap.to(selector, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 2,
      ease: "elastic.out(1, 0.5)",
      delay: 0.5
    });
    
    // Efeito de hover
    const element = document.querySelector(selector);
    if (element) {
      element.addEventListener('mouseenter', () => {
        gsap.to(selector, {
          scale: 1.05,
          filter: "drop-shadow(0 10px 20px rgba(116, 72, 255, 0.3))",
          duration: 0.5,
          ease: "power2.out"
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(selector, {
          scale: 1,
          filter: "drop-shadow(0 0 0 rgba(116, 72, 255, 0))",
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  },

  // Efeito de ondas de energia
  createEnergyWaves: (container) => {
    const waves = [];
    for (let i = 0; i < 5; i++) {
      const wave = document.createElement('div');
      wave.className = 'absolute rounded-full border-2 border-violet-400/30 pointer-events-none';
      wave.style.width = '100px';
      wave.style.height = '100px';
      wave.style.left = '50%';
      wave.style.top = '50%';
      wave.style.transform = 'translate(-50%, -50%)';
      container.appendChild(wave);
      waves.push(wave);
    }

    waves.forEach((wave, i) => {
      gsap.set(wave, { scale: 0, opacity: 0 });
      gsap.to(wave, {
        scale: 8,
        opacity: 0,
        duration: 3,
        repeat: -1,
        delay: i * 0.6,
        ease: "power2.out"
      });
    });

    return waves;
  },

  // Efeito de cristais flutuantes
  createFloatingCrystals: (container) => {
    const crystals = [];
    const shapes = ['◆', '◇', '▲', '▼', '●', '◯'];
    
    for (let i = 0; i < 12; i++) {
      const crystal = document.createElement('div');
      crystal.textContent = gsap.utils.random(shapes);
      crystal.className = 'absolute text-violet-400/40 pointer-events-none select-none';
      crystal.style.fontSize = gsap.utils.random(12, 24) + 'px';
      crystal.style.left = Math.random() * 100 + '%';
      crystal.style.top = Math.random() * 100 + '%';
      container.appendChild(crystal);
      crystals.push(crystal);
    }

    crystals.forEach((crystal, i) => {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(crystal, {
        y: gsap.utils.random(-300, -500),
        x: gsap.utils.random(-50, 50),
        rotation: gsap.utils.random(360, 720),
        opacity: 0,
        duration: gsap.utils.random(8, 12),
        ease: "none",
        delay: i * 0.5
      })
      .set(crystal, {
        y: 0,
        x: 0,
        rotation: 0,
        opacity: 0.6,
        left: Math.random() * 100 + '%',
        top: '100%'
      });
    });

    return crystals;
  },

  // Efeito de raios de luz
  createLightRays: (container) => {
    const rays = [];
    for (let i = 0; i < 8; i++) {
      const ray = document.createElement('div');
      ray.className = 'absolute bg-gradient-to-r from-transparent via-violet-400/20 to-transparent pointer-events-none';
      ray.style.width = '2px';
      ray.style.height = '200px';
      ray.style.left = '50%';
      ray.style.top = '50%';
      ray.style.transformOrigin = 'center bottom';
      ray.style.transform = `translate(-50%, -100%) rotate(${i * 45}deg)`;
      container.appendChild(ray);
      rays.push(ray);
    }

    const tl = gsap.timeline({ repeat: -1 });
    tl.set(rays, { scaleY: 0, opacity: 0 })
      .to(rays, {
        scaleY: 1,
        opacity: 1,
        duration: 2,
        stagger: 0.1,
        ease: "power2.out"
      })
      .to(rays, {
        rotation: "+=360",
        duration: 8,
        ease: "none"
      }, 0)
      .to(rays, {
        scaleY: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.05
      }, "-=1");

    return rays;
  },

  // Efeito de partículas magnéticas
  createMagneticParticles: (container, cards) => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-violet-400 rounded-full pointer-events-none';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      container.appendChild(particle);
      particles.push(particle);
    }

    cards.forEach(card => {
      if (!card) return;
      
      card.addEventListener('mouseenter', () => {
        particles.forEach(particle => {
          const cardRect = card.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const targetX = (cardRect.left + cardRect.width / 2 - containerRect.left) / containerRect.width * 100;
          const targetY = (cardRect.top + cardRect.height / 2 - containerRect.top) / containerRect.height * 100;
          
          gsap.to(particle, {
            left: targetX + '%',
            top: targetY + '%',
            scale: 2,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
          });
        });
      });
      
      card.addEventListener('mouseleave', () => {
        particles.forEach(particle => {
          gsap.to(particle, {
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            scale: 1,
            opacity: 0.3,
            duration: 2,
            ease: "power2.inOut"
          });
        });
      });
    });

    return particles;
  },

  // Efeito de holografia nos cards
  createHolographicEffect: (card) => {
    const hologram = document.createElement('div');
    hologram.className = 'absolute inset-0 pointer-events-none opacity-0 rounded-xl';
    hologram.style.background = 'linear-gradient(45deg, transparent 30%, rgba(116, 72, 255, 0.1) 50%, transparent 70%)';
    hologram.style.backgroundSize = '200% 200%';
    card.appendChild(hologram);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      gsap.to(hologram, {
        backgroundPosition: `${x}% ${y}%`,
        opacity: 0.6,
        duration: 0.3
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(hologram, {
        opacity: 0,
        duration: 0.5
      });
    });

    return hologram;
  },

  // Efeito de glitch nos textos
  createGlitchEffect: (element) => {
    const glitchTl = gsap.timeline({ paused: true });
    
    glitchTl.to(element, {
      x: 2,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(element, {
      x: -2,
      skewX: 2,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(element, {
      x: 1,
      skewX: -1,
      duration: 0.1,
      ease: "power2.inOut"
    })
    .to(element, {
      x: 0,
      skewX: 0,
      duration: 0.1,
      ease: "power2.inOut"
    });

    // Trigger aleatório do glitch
    setInterval(() => {
      if (Math.random() < 0.1) {
        glitchTl.restart();
      }
    }, 3000);

    return glitchTl;
  },

  // Efeito de scan line
  createScanLine: (container) => {
    const scanLine = document.createElement('div');
    scanLine.className = 'absolute w-full h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent pointer-events-none opacity-0';
    scanLine.style.top = '0';
    container.appendChild(scanLine);

    const tl = gsap.timeline({ repeat: -1 });
    tl.set(scanLine, { top: '0%', opacity: 0 })
      .to(scanLine, {
        opacity: 0.8,
        duration: 0.1
      })
      .to(scanLine, {
        top: '100%',
        duration: 2,
        ease: "none"
      })
      .to(scanLine, {
        opacity: 0,
        duration: 0.1
      })
      .set(scanLine, { top: '0%' })
      .to({}, { duration: 3 }); // Pausa

    return scanLine;
  }
};