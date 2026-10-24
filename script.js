
/* ==========================================
   KoreaMitra — Your Friend in Korea
   Main JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Korean phrases with Nepali meanings
  const phrases = [
    {
      korean: "안녕하세요",
      pronunciation: "Annyeonghaseyo",
      nepali: "नमस्ते",
      category: "basic"
    },
    {
      korean: "감사합니다",
      pronunciation: "Gamsahamnida",
      nepali: "धन्यवाद",
      category: "basic"
    },
    {
      korean: "죄송합니다",
      pronunciation: "Joesonghamnida",
      nepali: "माफ गर्नुहोस्",
      category: "basic"
    },
    {
      korean: "얼마예요?",
      pronunciation: "Eolmayeyo?",
      nepali: "कति पैसा हो?",
      category: "shopping"
    },
    {
      korean: "이거 주세요",
      pronunciation: "Igeo juseyo",
      nepali: "यो दिनुहोस्",
      category: "shopping"
    },
    {
      korean: "카드로 결제할게요",
      pronunciation: "Kadeuro gyeoljehalgeyo",
      nepali: "म कार्डबाट पैसा तिर्छु",
      category: "shopping"
    },
    {
      korean: "물 주세요",
      pronunciation: "Mul juseyo",
      nepali: "पानी दिनुहोस्",
      category: "restaurant"
    },
    {
      korean: "메뉴판 주세요",
      pronunciation: "Menyupan juseyo",
      nepali: "मेनु दिनुहोस्",
      category: "restaurant"
    },
    {
      korean: "계산해 주세요",
      pronunciation: "Gyesanhae juseyo",
      nepali: "बिल दिनुहोस्",
      category: "restaurant"
    },
    {
      korean: "화장실이 어디예요?",
      pronunciation: "Hwajangsiri eodiyeyo?",
      nepali: "शौचालय कहाँ छ?",
      category: "travel"
    },
    {
      korean: "지하철역이 어디예요?",
      pronunciation: "Jihacheolyeogi eodiyeyo?",
      nepali: "सबवे स्टेशन कहाँ छ?",
      category: "travel"
    },
    {
      korean: "도와주세요",
      pronunciation: "Dowajuseyo",
      nepali: "मलाई मद्दत गर्नुहोस्",
      category: "emergency"
    },
    {
      korean: "병원에 가고 싶어요",
      pronunciation: "Byeongwone gago sipeoyo",
      nepali: "म अस्पताल जान चाहन्छु",
      category: "emergency"
    },
    {
      korean: "천천히 말씀해 주세요",
      pronunciation: "Cheoncheonhi malsseumhae juseyo",
      nepali: "बिस्तारै बोलिदिनुहोस्",
      category: "basic"
    },
    {
      korean: "한국어를 잘 못해요",
      pronunciation: "Hangugeoreul jal mothaeyo",
      nepali: "म कोरियन राम्रोसँग बोल्न सक्दिनँ",
      category: "basic"
    },
    {
      korean: "다시 말씀해 주세요",
      pronunciation: "Dasi malsseumhae juseyo",
      nepali: "फेरि भनिदिनुहोस्",
      category: "basic"
    },
    {
      korean: "일자리를 찾고 있어요",
      pronunciation: "Iljarireul chatgo isseoyo",
      nepali: "म काम खोज्दै छु",
      category: "work"
    },
    {
      korean: "몇 시에 시작해요?",
      pronunciation: "Myeot sie sijakhaeyo?",
      nepali: "कति बजे सुरु हुन्छ?",
      category: "work"
    },
    {
      korean: "알겠습니다",
      pronunciation: "Algesseumnida",
      nepali: "बुझें / हुन्छ",
      category: "work"
    },
    {
      korean: "잘 모르겠어요",
      pronunciation: "Jal moreugesseoyo",
      nepali: "मलाई राम्रोसँग थाहा छैन",
      category: "basic"
    }
  ];

  const phraseGrid = document.querySelector("#phraseGrid");
  const searchInput = document.querySelector("#phraseSearch");
  const categoryButtons = document.querySelectorAll("[data-category]");
  const resultCount = document.querySelector("#phraseCount");

  let activeCategory = "all";
  let searchTerm = "";

  // 2. Safely create phrase cards
  function renderPhrases() {
    if (!phraseGrid) return;

    const filtered = phrases.filter((phrase) => {
      const text = [
        phrase.korean,
        phrase.pronunciation,
        phrase.nepali
      ].join(" ").toLowerCase();

      const matchesSearch = text.includes(searchTerm);
      const matchesCategory =
        activeCategory === "all" ||
        phrase.category === activeCategory;

      return matchesSearch && matchesCategory;
    });

    phraseGrid.replaceChildren();

    if (filtered.length === 0) {
      const message = document.createElement("p");
      message.className = "empty-state";
      message.textContent = "कुनै वाक्य भेटिएन। अर्को शब्द खोज्नुहोस्।";
      phraseGrid.appendChild(message);
    }

    filtered.forEach((phrase) => {
      const card = document.createElement("article");
      card.className = "phrase-card";

      const korean = document.createElement("h3");
      korean.textContent = phrase.korean;

      const pronunciation = document.createElement("p");
      pronunciation.className = "phrase-pronunciation";
      pronunciation.textContent = phrase.pronunciation;

      const nepali = document.createElement("p");
      nepali.className = "phrase-nepali";
      nepali.textContent = phrase.nepali;

      const actions = document.createElement("div");
      actions.className = "phrase-actions";

      const speakButton = document.createElement("button");
      speakButton.type = "button";
      speakButton.textContent = "🔊 Listen";
      speakButton.setAttribute(
        "aria-label",
        `Listen to ${phrase.korean}`
      );
      speakButton.addEventListener("click", () => {
        speakKorean(phrase.korean);
      });

      const copyButton = document.createElement("button");
      copyButton.type = "button";
      copyButton.textContent = "📋 Copy";
      copyButton.addEventListener("click", async () => {
        try {
          await copyText(phrase.korean);
          copyButton.textContent = "✓ Copied!";
          setTimeout(() => {
            copyButton.textContent = "📋 Copy";
          }, 1500);
        } catch {
          copyButton.textContent = "Copy failed";
        }
      });

      actions.append(speakButton, copyButton);
      card.append(korean, pronunciation, nepali, actions);
      phraseGrid.appendChild(card);
    });

    if (resultCount) {
      resultCount.textContent =
        `${filtered.length} phrases found`;
    }
  }

  // 3. Search Korean, pronunciation, or Nepali
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      searchTerm = event.target.value.trim().toLowerCase();
      renderPhrases();
    });
  }

  // 4. Phrase category filters
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory =
        button.dataset.category || "all";

      categoryButtons.forEach((item) => {
        const selected =
          item.dataset.category === activeCategory;

        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      renderPhrases();
    });
  });

  // 5. Speak Korean using browser text-to-speech
  function speakKorean(text) {
    if (!("speechSynthesis" in window)) {
      alert("Audio is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = 0.8;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }

  // 6. Copy text with a fallback for older browsers
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const temporary = document.createElement("textarea");
    temporary.value = text;
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";

    document.body.appendChild(temporary);
    temporary.select();

    const successful = document.execCommand("copy");
    temporary.remove();

    if (!successful) {
      throw new Error("Copy failed");
    }
  }

  // 7. Mobile navigation
  const menuButton = document.querySelector(
    "#menuToggle, .menu-toggle, .nav-toggle"
  );
  const navigation = document.querySelector(
    "#navLinks, .nav-links"
  );

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 8. Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // 9. Reveal elements as they enter the screen
  const revealElements = document.querySelectorAll(
    ".reveal, .fade-in, [data-reveal]"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 10. Current year in footer
  const yearElement = document.querySelector("#currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 11. Back-to-top button
  const backToTop = document.querySelector("#backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 12. Render the phrase collection
  renderPhrases();
});
