document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".searchable form");
  const searchInput = document.getElementById("site-search");

  if (!searchForm || !searchInput) return;

  const siteIndex = [
    {
      title: "Home - Welcome to Taniti",
      url: "index.html",
      keywords:
        "pacific island honeymoon vacation sandy rocky beaches harbor tropical rainforest volcano 20000 population fishing agriculture 120 volts power outlets alcohol midnight 9am drinking age 18 english hospital clinics multilingual crime pickpocketing holidays currency us dollar euros yen credit cards"
    },
    {
      title: "Lodging in Taniti",
      url: "lodging.html",
      keywords:
        "lodging accommodations stay hotel hostel four-star resort family-owned hotels bed and breakfasts regulated inspected government"
    },
    {
      title: "Activities & Entertainment",
      url: "activities.html",
      keywords:
        "entertainment sightseeing beaches rainforest volcano local history museum chartered fishing tours snorkeling ziplining pubs microbrewery dance club movie helicopter rides arcade art galleries bowling nine-hole golf course merriton landing yellow leaf bay taniti city native architecture boat bus tours hikes"
    },
    {
      title: "Transportation in Taniti",
      url: "transportation.html",
      keywords:
        "transportation air cruise ship yellow leaf bay small airport jets propeller planes ground transportation public buses taniti city 5am 11pm private buses taxis rental cars agency bikes helmets walkable merriton landing"
    },
    {
      title: "Food & Dining in Taniti",
      url: "dining.html",
      keywords:
        "food dining restaurants local fish and rice american-style meals pan-asian cuisine grocery stores supermarkets convenience store 24 hours"
    }
  ];

  const resultsBox = document.createElement("div");
  resultsBox.className = "search-results";
  Object.assign(resultsBox.style, {
    position: "absolute",
    top: "100%",
    right: "0",
    marginTop: "0.5rem",
    backgroundColor: "#ffffff",
    color: "#1d2d35",
    borderRadius: "8px",
    boxShadow: "0 8px 20px rgba(0, 78, 100, 0.2)",
    width: "280px",
    zIndex: "1000",
    overflow: "hidden",
    display: "none"
  });

  const searchContainer = document.querySelector(".searchable");
  searchContainer.style.position = "relative";
  searchContainer.appendChild(resultsBox);

  function performSearch(query) {
    const cleanQuery = query.trim().toLowerCase();
    resultsBox.innerHTML = "";

    if (!cleanQuery) {
      resultsBox.style.display = "none";
      return;
    }

    const matches = siteIndex.filter(
      (page) =>
        page.title.toLowerCase().includes(cleanQuery) ||
        page.keywords.includes(cleanQuery)
    );

    if (matches.length === 0) {
      const noResult = document.createElement("div");
      noResult.textContent = `No pages found matching "${query}"`;
      noResult.style.padding = "0.75rem 1rem";
      noResult.style.fontSize = "0.9rem";
      noResult.style.color = "#526773";
      resultsBox.appendChild(noResult);
    } else {
      matches.forEach((match) => {
        const link = document.createElement("a");
        link.href = match.url;
        link.textContent = match.title;
        Object.assign(link.style, {
          display: "block",
          padding: "0.75rem 1rem",
          textDecoration: "none",
          color: "#004e64",
          fontWeight: "600",
          fontSize: "0.95rem",
          borderBottom: "1px solid #e0fbfc"
        });

        link.addEventListener("mouseenter", () => {
          link.style.backgroundColor = "#e0fbfc";
        });
        link.addEventListener("mouseleave", () => {
          link.style.backgroundColor = "#ffffff";
        });

        resultsBox.appendChild(link);
      });
    }

    resultsBox.style.display = "block";
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    performSearch(searchInput.value);
  });

  searchInput.addEventListener("input", () => {
    performSearch(searchInput.value);
  });

  document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
      resultsBox.style.display = "none";
    }
  });
});
