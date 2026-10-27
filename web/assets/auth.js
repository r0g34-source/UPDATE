// Enkapta Universal Auth & Session Management

const ROGER_USER = {
  name: "Roger",
  email: "rogeralejandroquijadaavilera@gmail.com",
  role: "Visitante",
  plan: "Plan visitante",
  verified: true,
  shortEmail: "rogeralejandroqu..."
};

// Check if user is logged in
function getAuthUser() {
  const sessionStatus = localStorage.getItem("enkapta_session");
  if (!sessionStatus || sessionStatus === "logged_out") {
    if (typeof window !== "undefined" && window.location && window.location.search && (window.location.search.includes("preview=true") || window.location.search.includes("u=me"))) {
      return ROGER_USER;
    }
    return null;
  }
  try {
    const saved = localStorage.getItem("enkapta_user_data");
    if (saved) {
      return { ...ROGER_USER, ...JSON.parse(saved) };
    }
  } catch (e) {}
  return ROGER_USER;
}

// Realtor Profile Models (Demo Showcase vs Authenticated Real Profile)
const DUENAS_REALTOR_PROFILE = {
  name: "Daniel Dueñas",
  slug: "duenas",
  agency: "Dueñas Real Estate",
  legalAgency: "Dueñas Real Estate, C.A.",
  title: "Director & Broker Principal",
  shortBio: "Especialista en inmuebles corporativos, oficinas comerciales y residencias exclusivas en el Distrito Capital y Miranda.",
  bio: "Broker fundador de Dueñas Real Estate. Especializado en transacciones comerciales y residenciales de alto perfil en Caracas. Validación legal previa en cada cierre para garantizar total seguridad jurídica.",
  phone: "+58 424 840 7372",
  email: "jdb@dre.com.ve",
  zones: "Las Mercedes, Chacao, Altamira, El Hatillo",
  avatar: "assets/duenas-logo.jpg",
  banner: "assets/banner-background.jpg",
  isVerified: true,
  isCertified: true,
  propertyCount: 6,
  stats: {
    properties: "14",
    responseTime: "< 5 min",
    experience: "10+ años",
    rating: "5.0",
    reviewsCount: "48 reseñas auditadas"
  },
  socials: {
    instagram: "https://instagram.com/duenasrealestate",
    facebook: "https://facebook.com/duenasrealestate",
    linkedin: "https://linkedin.com/in/danielduenas",
    website: ""
  }
};

const ROGER_DEFAULT_REALTOR_PROFILE = {
  name: "Roger",
  slug: "roger",
  agency: "",
  legalAgency: "",
  title: "Asesor Inmobiliario",
  shortBio: "",
  bio: "",
  phone: "",
  email: "rogeralejandroquijadaavilera@gmail.com",
  zones: "",
  avatar: "",
  banner: "",
  isVerified: true,
  isCertified: false,
  propertyCount: 0,
  stats: {
    properties: "0",
    responseTime: "—",
    experience: "Nuevo asesor",
    rating: "—",
    reviewsCount: "Sin valoraciones"
  },
  socials: {
    instagram: "",
    facebook: "",
    linkedin: "",
    website: ""
  }
};

const DEFAULT_REALTOR_PROFILE = DUENAS_REALTOR_PROFILE;

// Limpieza inmediata de datos residuales del demo Daniel Dueñas en localStorage
(function purgeLegacyDemoData() {
  try {
    const raw = localStorage.getItem("enkapta_realtor_profile");
    if (raw) {
      const p = JSON.parse(raw);
      if (p.name === "Daniel Dueñas" || p.slug === "duenas" || (p.agency && p.agency.includes("Dueñas"))) {
        localStorage.removeItem("enkapta_realtor_profile");
      }
    }
  } catch (e) {}
})();

function getRealtorProfile(requestedSlug = null) {
  let target = requestedSlug;
  if (!target && typeof window !== "undefined" && window.location) {
    const params = new URLSearchParams(window.location.search);
    target = params.get("u") || params.get("user") || params.get("slug");
  }

  // 1. Si se solicita ver el perfil personal de Roger (u=me, u=roger, etc.)
  const isRogerTarget = target === "me" || target === "roger" || target === "self" || target === "mi-perfil";
  
  if (isRogerTarget) {
    const authUser = getAuthUser() || ROGER_USER;

    const rogerCleanProfile = {
      name: authUser.name || "Roger",
      slug: authUser.slug || "roger",
      email: authUser.email || "rogeralejandroquijadaavilera@gmail.com",
      role: authUser.role || "Visitante",
      agency: authUser.agency || "",
      legalAgency: authUser.agency || "",
      title: authUser.title || "Asesor Inmobiliario",
      shortBio: authUser.shortBio || authUser.bio || "",
      bio: authUser.bio || "",
      phone: authUser.phone || "",
      zones: authUser.zones || "",
      avatar: authUser.avatar || "",
      banner: authUser.banner || "",
      isVerified: true,
      isCertified: !!authUser.isCertified,
      propertyCount: 0,
      stats: {
        properties: "0",
        responseTime: "—",
        experience: "Nuevo asesor",
        rating: "—",
        reviewsCount: "Sin valoraciones"
      },
      socials: {
        instagram: (authUser.socials && authUser.socials.instagram) || "",
        facebook: (authUser.socials && authUser.socials.facebook) || "",
        linkedin: (authUser.socials && authUser.socials.linkedin) || "",
        website: (authUser.socials && authUser.socials.website) || ""
      }
    };

    // Si el usuario guardó personalizaciones legítimas (no del mock de Dueñas)
    try {
      const raw = localStorage.getItem("enkapta_realtor_profile");
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && saved.name !== "Daniel Dueñas" && saved.slug !== "duenas" && (!saved.agency || !saved.agency.includes("Dueñas"))) {
          return {
            ...rogerCleanProfile,
            ...saved,
            name: authUser.name || saved.name || "Roger",
            email: authUser.email || saved.email || "rogeralejandroquijadaavilera@gmail.com",
            propertyCount: 0,
            stats: {
              ...rogerCleanProfile.stats,
              ...(saved.stats || {}),
              properties: "0"
            },
            socials: {
              ...rogerCleanProfile.socials,
              ...(saved.socials || {})
            }
          };
        } else {
          localStorage.removeItem("enkapta_realtor_profile");
        }
      }
    } catch (e) {}

    return rogerCleanProfile;
  }

  // 2. Por defecto: perfil del publisher broker público (Daniel Dueñas)
  return { ...DUENAS_REALTOR_PROFILE };
}

function saveRealtorProfile(profileData) {
  const current = getRealtorProfile("me");
  const updated = {
    ...current,
    ...profileData,
    name: profileData.name || current.name || "Roger",
    slug: profileData.slug || current.slug || "roger",
    propertyCount: 0,
    socials: {
      ...current.socials,
      ...(profileData.socials || {})
    }
  };
  localStorage.setItem("enkapta_realtor_profile", JSON.stringify(updated));
  return updated;
}


// Universal Contact Action: Requires authentication before contacting via WhatsApp
function requireAuthForContact(whatsappUrl) {
  const user = getAuthUser();
  if (!user) {
    // User is not logged in: redirect to login with return target
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const redirectTarget = currentPath + (window.location.search || "");
    window.location.href = `iniciar-sesion.html?redirect=${encodeURIComponent(redirectTarget)}`;
    return false;
  }
  
  // User is authenticated: open WhatsApp
  if (whatsappUrl) {
    window.open(whatsappUrl, "_blank");
  }
  return true;
}

// Log in as Roger
function loginAsRoger(redirectUrl = "index.html") {
  localStorage.setItem("enkapta_session", "roger");
  window.location.href = redirectUrl;
}

// Log out
function logout(event = null, redirectUrl = null) {
  if (event && typeof event === "object") {
    if (event.preventDefault) event.preventDefault();
    if (event.stopPropagation) event.stopPropagation();
  }
  localStorage.setItem("enkapta_session", "logged_out");
  if (typeof redirectUrl === "string") {
    window.location.href = redirectUrl;
  } else {
    // If on a private page, redirect to index
    const p = window.location.pathname;
    if (p.includes("mi-cuenta") || p.includes("cuenta.html")) {
      window.location.href = "index.html";
    } else {
      renderHeaderAuth();
    }
  }
}

// Stub for backward compatibility
window.toggleUserDropdown = function() {};

// Render the right-side auth section in the desktop and mobile header
function renderHeaderAuth() {
  const user = getAuthUser();
  const authContainer = document.getElementById("header-auth-container");
  const mobileAuthContainer = document.getElementById("mobile-auth-container");

  // Check if on protected account page while logged out
  const p = window.location.pathname;
  if ((p.includes("mi-cuenta") || p.includes("cuenta.html")) && !user) {
    window.location.href = "iniciar-sesion.html";
    return;
  }

  if (authContainer) {
    if (user) {
      authContainer.innerHTML = `
        <div class="group/user relative flex items-center bg-transparent hover:bg-white border border-transparent hover:border-gray-200/90 hover:shadow-2xs rounded-full p-1 pl-1.5 pr-2.5 group-hover/user:pr-3.5 transition-all duration-300">
          <!-- User Profile Link -->
          <a href="mi-cuenta.html" class="flex items-center gap-2 pr-0.5 focus:outline-none select-none">
            <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-gray-800 text-xs border border-gray-200/90 shadow-2xs shrink-0 overflow-hidden">
              ${user.avatar ? `<img src="${user.avatar}" class="w-full h-full object-cover" alt="${user.name}">` : `R`}
            </div>
            <div class="text-left leading-tight">
              <div class="text-xs font-bold text-gray-900">${user.name}</div>
              <div class="text-[11px] font-semibold text-gray-500">${user.role}</div>
            </div>
          </a>

          <!-- Logout Icon with hover animation (spacious, unclipped) -->
          <div class="max-w-0 opacity-0 -translate-x-1 group-hover/user:max-w-[55px] group-hover/user:opacity-100 group-hover/user:translate-x-0 group-hover/user:ml-2.5 transition-all duration-300 ease-out overflow-hidden flex items-center border-l border-transparent group-hover/user:border-gray-200/90 pl-2">
            <button onclick="logout(event)" title="Cerrar sesión" aria-label="Cerrar sesión" class="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer focus:outline-none shrink-0">
              <i data-lucide="log-out" class="w-3.5 h-3.5 transition-transform duration-200 hover:translate-x-0.5"></i>
            </button>
          </div>
        </div>
      `;
    } else {
      authContainer.innerHTML = `
        <div class="flex items-center space-x-3">
          <a href="iniciar-sesion.html" class="px-3.5 py-1.5 rounded-lg border border-gray-300 hover:border-primary text-gray-800 hover:text-primary font-bold text-xs transition-all bg-white hover:bg-orange-50/50 shadow-2xs">
            Iniciar sesión
          </a>
          <a href="registrarse.html" class="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-primary-glow hover:shadow-md hover:shadow-primary/20 text-white text-xs font-bold shadow-xs transition-all transform hover:scale-105 active:scale-95">
            Registrarse
          </a>
        </div>
      `;
    }
  }

  if (mobileAuthContainer) {
    if (user) {
      mobileAuthContainer.innerHTML = `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-3">
          <a href="mi-cuenta.html" class="flex items-center gap-3 flex-1">
            <div class="w-9 h-9 rounded-full bg-white text-gray-800 font-bold flex items-center justify-center text-sm shadow-2xs border border-gray-200 overflow-hidden">
              ${user.avatar ? `<img src="${user.avatar}" class="w-full h-full object-cover" alt="${user.name}">` : `R`}
            </div>
            <div>
              <div class="text-sm font-bold text-gray-900">${user.name}</div>
              <div class="text-xs text-gray-500">${user.role}</div>
            </div>
          </a>
          <button onclick="logout(event)" title="Cerrar sesión" aria-label="Cerrar sesión" class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </button>
        </div>
        <a href="mi-cuenta.html" class="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Mi cuenta</a>
      `;
    } else {
      mobileAuthContainer.innerHTML = `
        <div class="flex items-center gap-3 p-2 mb-3">
          <a href="iniciar-sesion.html" class="flex-1 py-2 text-center rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Iniciar Sesión
          </a>
          <a href="registrarse.html" class="flex-1 py-2 text-center rounded-lg bg-primary text-white text-sm font-bold shadow-sm">
            Registrarse
          </a>
        </div>
      `;
    }
  }

  // Re-initialize Lucide icons if loaded
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }
}

// Auto run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderHeaderAuth);
} else {
  renderHeaderAuth();
}
