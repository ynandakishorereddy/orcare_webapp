import { DISEASES, SYMPTOMS, SYMPTOM_DETAILS, TIPS, LEARNING, DEFAULT_REMINDERS, ONBOARDING_SLIDES, API_BASE, RAG_API_BASE } from "./constants/data.js";
const S = {
  screen: 'splash',
  params: {},
  user: null,
  token: null,
  language: 'en',
  onboarded: false,
  reminders: JSON.parse(JSON.stringify(DEFAULT_REMINDERS)),
  tipsFilter: 'All',
  activeTab: 'home',
  chat: { messages: [], typing: false, sessionId: null, useRag: false },
  quizState: { catId: null, modId: null, qIdx: 0, answered: false, score: 0, done: false, lessonTab: 0 },
  privacyToggles: { analytics: true, notifications: true, healthData: false }
};

function loadStorage() {
  try {
    const tok = localStorage.getItem('oc_token');
    const usr = localStorage.getItem('oc_user');
    const lang = localStorage.getItem('oc_lang');
    const onb = localStorage.getItem('oc_onboarded');
    if (tok) S.token = tok;
    if (usr) S.user = JSON.parse(usr);
    if (lang) S.language = lang;
    if (onb) S.onboarded = true;
  } catch(e) {}
}

function saveSession(token, user) {
  S.token = token; S.user = user;
  localStorage.setItem('oc_token', token);
  localStorage.setItem('oc_user', JSON.stringify(user));
}

function clearSession() {
  S.token = null; S.user = null; S.onboarded = false;
  localStorage.removeItem('oc_token');
  localStorage.removeItem('oc_user');
  localStorage.removeItem('oc_onboarded');
}

/* =====================================================
   ROUTER
   ===================================================== */
let internalHistoryCount = 0;
function go(screen, params = {}, skipHistory = false) {
  S.screen = screen; S.params = params;
  if (screen === 'onboarding') _obSlide = 0;

  if (!skipHistory && screen !== 'splash') {
    let hash = '#' + screen;
    if (Object.keys(params).length > 0) {
      const qs = new URLSearchParams(params).toString();
      hash += '?' + qs;
    }
    if (window.location.hash !== hash) {
      internalHistoryCount++;
      window.history.pushState(null, '', hash);
    }
  }

  render();
}

function render() {
  const c = document.getElementById('screen-container');
  const screens = {
    splash:          renderSplash,

    signin:          renderSignIn,
    signup:          renderSignUp,
    otp_signup:      renderOtpSignup,
    forgot:          renderForgot,
    otp_forgot:      renderOtpForgot,
    reset:           renderReset,
    onboarding:      renderOnboarding,
    main:            renderMain,
    symptom_checker: renderSymptomChecker,
    symptom_detail:  renderSymptomDetail,
    disease_detail:  renderDiseaseDetail,
    learn_category:  renderLearnCategory,
    module_detail:   renderModuleDetail,
    reminders:       renderReminders,
    daily_tips:      renderDailyTips,
    edit_profile:    renderEditProfile,
    privacy_security:renderPrivacySecurity,
    privacy_policy:  renderPrivacyPolicy,
    help_feedback:   renderHelpFeedback,
    delete_account:  renderDeleteAccount,
  };
  const fn = screens[S.screen];
  if (fn) { c.innerHTML = fn(); attachHandlers(); }
}

/* =====================================================
   API SERVICE
   ===================================================== */
async function apiCall(method, path, body = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (S.token) opts.headers['Authorization'] = `Bearer ${S.token}`;
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(API_BASE + path, opts);
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json;
}

/* =====================================================
   TOAST
   ===================================================== */
function toast(msg, type = '') {
  const tc = document.getElementById('toast-container');
  const icons = { success: '<i class="ph ph-check-circle"></i>', danger: '<i class="ph ph-x-circle"></i>', warning: '<i class="ph ph-warning"></i>️', '': 'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  tc.appendChild(el);
  setTimeout(() => { el.classList.add('toast-fade-out'); setTimeout(() => el.remove(), 300); }, 3000);
}

/* =====================================================
   MODAL HELPERS
   ===================================================== */
function showModal(html) {
  const ov = document.createElement('div');
  ov.className = 'modal-overlay'; ov.id = 'modal-overlay';
  ov.innerHTML = `<div class="modal-sheet">${html}</div>`;
  ov.addEventListener('click', e => { if (e.target === ov) closeModal(); });
  document.body.appendChild(ov);
}
function closeModal() {
  const m = document.getElementById('modal-overlay');
  if (m) m.remove();
}

/* =====================================================
   UTILITIES
   ===================================================== */
function greet() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}
function fmtTime(t) {
  const [h, m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  return `${hh}:${String(m).padStart(2,'0')} ${ap}`;
}
function getDailyTip() {
  const d = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return TIPS[(d - 1) % 30];
}
function initials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
}
function chatTime() {
  return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}
function genSessionId() {
  return 'sess_' + Math.random().toString(36).slice(2);
}


/* =====================================================
   SCREEN: SPLASH
   ===================================================== */
function renderSplash() {
  return '<div class="screen splash"><div class="splash-logo"><i class="ph ph-tooth"></i></div><h1>ORCare</h1><p>Your personal oral health companion for a healthier, brighter smile</p><div class="splash-loader"></div></div>';
}


/* =====================================================
   SCREEN: SIGN IN & SIGN UP (Google Only)
   ===================================================== */
function renderSignIn() {
  return '<div class="screen auth-layout">'
    + '<div class="auth-left"><div class="auth-brand"><div class="auth-brand-icon"><i class="ph ph-tooth"></i></div>'
    + '<h1>ORCare</h1><p>Your personal oral health companion for a healthier, brighter smile</p></div>'
    + '<div class="auth-features">'
    + '<div class="auth-feature"><span class="auth-feature-icon"><i class="ph ph-microscope"></i></span><span class="auth-feature-text">AI-powered oral health guidance</span></div>'
    + '<div class="auth-feature"><span class="auth-feature-icon"><i class="ph ph-books"></i></span><span class="auth-feature-text">Expert learning modules</span></div>'
    + '<div class="auth-feature"><span class="auth-feature-icon"><i class="ph ph-clock"></i></span><span class="auth-feature-text">Smart hygiene reminders</span></div>'
    + '</div></div>'
    + '<div class="auth-right"><div class="auth-form-box" style="text-align:center; padding: 40px 20px;">'
    + '<div class="auth-brand-icon" style="margin: 0 auto 20px auto; background: var(--primary-bg); width: 64px; height: 64px; font-size: 32px; display:flex; align-items:center; justify-content:center; border-radius:16px;"><i class="ph ph-tooth"></i></div>'
    + '<div class="auth-form-title">Welcome to ORCare <i class="ph ph-sparkle"></i></div>'
    + '<div class="auth-form-sub" style="margin-bottom:30px">Sign in or create an account to start your oral health journey</div>'
    + '<button class="btn-primary" id="google-login-btn" style="background:#fff; color:#333; border: 1px solid #ddd; display:flex; align-items:center; justify-content:center; gap:10px;">'
    + '<img src="https://www.google.com/favicon.ico" width="20" height="20" />'
    + '<span id="google-btn-text">Continue with Google</span></button>'
    + '</div></div></div>';
}
function renderSignUp() { return renderSignIn(); }
function renderOtpSignup() { return renderSignIn(); }
function renderForgot() { return renderSignIn(); }
function renderOtpForgot() { return renderSignIn(); }
function renderReset() { return renderSignIn(); }

/* =====================================================
   SCREEN: ONBOARDING (5-slide carousel)
   ===================================================== */
var _obSlide = 0;
function renderOnboarding() {
  const slides = ONBOARDING_SLIDES.map(function(s,i){
    return '<div class="onboard-slide ' + (i===_obSlide?'active':'') + '" id="ob-slide-' + i + '">'
      + '<div class="onboard-img" style="background:' + s.bg + '">' + s.icon + '</div>'
      + '<h2>' + s.title + '</h2><p>' + s.desc + '</p></div>';
  }).join('');
  const dots = ONBOARDING_SLIDES.map(function(_,i){
    return '<div class="onboard-dot ' + (i===_obSlide?'active':'') + '" id="ob-dot-' + i + '"></div>';
  }).join('');
  return '<div class="screen onboard-page">'
    + '<div class="onboard-inner">' + slides + '</div>'
    + '<div class="onboard-footer"><div class="onboard-dots">' + dots + '</div>'
    + '<div class="onboard-nav"><button class="onboard-skip" id="ob-skip">Skip</button>'
    + '<button class="btn-primary onboard-next" id="ob-next">Next →</button></div></div></div>';
}

/* =====================================================
   MAIN TAB SHELL
   ===================================================== */
function tabIcon(id) {
  return {home:'<i class="ph ph-house"></i>', chat:'<i class="ph ph-robot"></i>', learn:'<i class="ph ph-books"></i>', disease:'<i class="ph ph-tooth"></i>', profile:'<i class="ph ph-user"></i>'}[id];
}
function tabLabel(id) {
  return {home:'Home', chat:'AI Chat', learn:'Learn', disease:'Diseases', profile:'Profile'}[id];
}
function renderMain() {
  const tabContent = {
    home:    renderHomeContent,
    chat:    renderChatContent,
    learn:   renderLearnContent,
    disease: renderDiseaseContent,
    profile: renderProfileContent
  };
  const fn = tabContent[S.activeTab];
  const inner = fn ? fn() : '';
  const name  = S.user ? (S.user.name  || S.user.email || 'User') : 'User';
  const email = S.user ? (S.user.email || '') : '';
  const ini   = initials(name);
  const tabs = ['home','chat','learn','disease','profile'].map(function(id){
    return '<button class="tab-item ' + (S.activeTab===id?'active':'') + '" data-tab="' + id + '">'
      + '<span class="tab-icon">' + tabIcon(id) + '</span>'
      + '<span class="tab-label">' + tabLabel(id) + '</span></button>';
  }).join('');
  const sidebarItems = [
    {id:'home',    icon:'<i class="ph ph-house"></i>', label:'Home'},
    {id:'chat',    icon:'<i class="ph ph-robot"></i>', label:'AI Chat'},
    {id:'learn',   icon:'<i class="ph ph-books"></i>', label:'Learn'},
    {id:'disease', icon:'<i class="ph ph-tooth"></i>', label:'Oral Diseases'},
    {id:'profile', icon:'<i class="ph ph-user"></i>', label:'Profile'}
  ];
  const sidebarNav = sidebarItems.map(function(it){
    return '<button class="sidebar-item ' + (S.activeTab===it.id?'active':'') + '" data-tab="' + it.id + '">'
      + '<span class="sidebar-item-icon">' + it.icon + '</span>'
      + '<span class="sidebar-item-label">' + it.label + '</span></button>';
  }).join('');
  const topBarTitles = {home:'Home', chat:'AI Chat', learn:'Learning Center', disease:'Oral Diseases', profile:'Profile'};
  const topBarIcons  = {home:'<i class="ph ph-house"></i>', chat:'<i class="ph ph-robot"></i>', learn:'<i class="ph ph-books"></i>', disease:'<i class="ph ph-tooth"></i>', profile:'<i class="ph ph-user"></i>'};
  // Chat needs flex column layout without overflow-y:auto so messages can scroll internally
  const appContentStyle = S.activeTab === 'chat'
    ? 'style="display:flex;flex-direction:column;overflow:hidden;flex:1"'
    : '';
  const topBarExtra = S.activeTab === 'chat'
    ? '<button class="top-bar-action" id="chat-new-btn" title="New Chat"><i class="ph ph-arrows-clockwise"></i></button>'
    : '';
  return '<div class="screen app-layout">'
    + '<nav class="sidebar">'
    + '<div class="sidebar-logo"><div class="sidebar-logo-icon"><i class="ph ph-tooth"></i></div>'
    + '<div><div class="sidebar-logo-text">ORCare</div><div class="sidebar-logo-sub">Oral Health Companion</div></div></div>'
    + '<div class="sidebar-user"><div class="sidebar-avatar">' + ini + '</div>'
    + '<div><div class="sidebar-user-name">' + name + '</div><div class="sidebar-user-email">' + email + '</div></div></div>'
    + '<div class="sidebar-nav">' + sidebarNav + '</div>'
    + '<div class="sidebar-footer"><button class="sidebar-signout" id="sidebar-signout">'
    + '<span class="sidebar-signout-icon"><i class="ph ph-sign-out"></i></span><span class="sidebar-signout-label">Sign Out</span></button></div>'
    + '</nav>'
    + '<div class="app-main">'
    + '<div class="top-bar"><div class="top-bar-title">' + topBarIcons[S.activeTab] + ' ' + topBarTitles[S.activeTab] + '</div>' + topBarExtra + '</div>'
    + '<div class="app-content" ' + appContentStyle + '>' + inner + '</div>'
    + '<nav class="bottom-nav">' + tabs + '</nav>'
    + '</div>'
    + renderContextPanel()
    + '</div>';
}

function renderContextPanel() {
  // Only show right panel on Home and Chat (or everywhere on desktop)
  return '<aside class="context-panel">'
    + '<div class="context-panel-header">Patient Analytics & Records</div>'
    + '<div class="context-panel-sub">Sarah Jenkins</div>'
    + '<div class="card context-card">'
    + '  <div class="card-body" style="padding:16px;">'
    + '    <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">'
    + '      <div style="width:40px; height:40px; border-radius:50%; background:var(--primary-bg); color:var(--primary); display:flex; align-items:center; justify-content:center; font-weight:700;">SJ</div>'
    + '      <div><div style="font-size:14px; font-weight:700; color:var(--text-1);">Dental Summary</div><div style="font-size:12px; color:var(--text-3);">Last Visit: Jun 15, 2025</div></div>'
    + '    </div>'
    + '    <div style="background:var(--bg); border-radius:var(--radius-sm); padding:12px; border:1px solid var(--border-light);">'
    + '       <div style="font-size:12px; font-weight:600; color:var(--text-2); margin-bottom:4px;">Tooth #18</div>'
    + '       <div style="font-size:12px; color:var(--primary); font-weight:600;"><i class="ph ph-warning-circle"></i> Cavity Risk 88%</div>'
    + '    </div>'
    + '  </div>'
    + '</div>'
    + '<div class="context-section-title">Recent Documents</div>'
    + '<div class="context-doc-card">'
    + '  <div class="context-doc-icon"><i class="ph ph-file-pdf"></i></div>'
    + '  <div class="context-doc-info"><div class="context-doc-name">Sarah_J_Pan_XR.pdf</div><div class="context-doc-meta">2.4 MB · Analyzed <i class="ph ph-check-circle" style="color:var(--success);"></i></div></div>'
    + '</div>'
    + '<div class="context-doc-card">'
    + '  <div class="context-doc-icon"><i class="ph ph-file-pdf"></i></div>'
    + '  <div class="context-doc-info"><div class="context-doc-name">Care_Plan_V2.pdf</div><div class="context-doc-meta">1.1 MB</div></div>'
    + '</div>'
    + '<div class="context-section-title">Dental Statistics</div>'
    + '<div class="stat-progress-row">'
    + '  <div class="stat-progress-label">Gum Health Index: 7.2/10</div>'
    + '  <div class="stat-progress-bar"><div class="stat-progress-fill" style="width:72%; background:var(--primary-light);"></div></div>'
    + '</div>'
    + '<div class="stat-progress-row">'
    + '  <div class="stat-progress-label">Risk Assessment: <span style="color:var(--warning);">Medium</span></div>'
    + '  <div class="stat-progress-bar"><div class="stat-progress-fill" style="width:50%; background:var(--warning);"></div></div>'
    + '</div>'
    + '</aside>';
}

/* =====================================================
   HOME TAB CONTENT
   ===================================================== */
function renderHomeContent() {
  const tip = getDailyTip();
  const name = S.user ? S.user.name || S.user.email : 'Guest';
  
  return '<div class="page page-dashboard">'
    + '<div class="home-hero-dark">'
    + '  <div class="hero-status"><span class="status-dot"></span> AI SYSTEMS ONLINE</div>'
    + '  <h1 class="hero-greeting">Good morning, Dr. ' + name.split(' ')[0] + ' <i class="ph ph-hand-waving" style="color:#FFD700;"></i></h1>'
    + '  <p class="hero-subtext">You have <strong>4 patients</strong> scheduled today and <strong>2 AI analyses</strong> pending review.</p>'
    + '  <div class="hero-actions">'
    + '    <button class="btn-primary" data-action="chat_tab"><i class="ph ph-chat-teardrop-text"></i> Open AI Chat</button>'
    + '    <button class="btn-ghost hero-ghost-btn"><i class="ph ph-eye"></i> View Analyses</button>'
    + '  </div>'
    + '</div>'
    
    + '<div class="section-title">Quick Actions <span class="see-all">View all</span></div>'
    + '<div class="quick-grid-vertical">'
    + quickCardVertical('<i class="ph ph-upload-simple"></i>','Upload X-Ray','Analyze dental images with AI','var(--primary-bg)','var(--primary)','chat_tab')
    + quickCardVertical('<i class="ph ph-chat-circle-dots"></i>','New AI Chat','Start a diagnostic session','#ede9fe','#8B5CF6','chat_tab')
    + quickCardVertical('<i class="ph ph-activity"></i>','View Tips','Oral hygiene guidance','var(--success-bg)','var(--success)','daily_tips')
    + quickCardVertical('<i class="ph ph-trend-up"></i>','Health Report','Patient progress overview','#dbeafe','#3B82F6','symptom_checker')
    + '</div>'
    + '</div>';
}

function quickCardVertical(icon,title,sub,bg,color,action) {
  return '<div class="quick-card-vertical" data-action="' + action + '">'
    + '<div class="quick-card-v-icon" style="background:' + bg + '; color:' + color + ';">' + icon + '</div>'
    + '<div class="quick-card-v-title">' + title + '</div>'
    + '<div class="quick-card-v-sub">' + sub + '</div>'
    + '<div class="quick-card-v-link" style="color:' + color + ';">Open <i class="ph ph-arrow-up-right"></i></div>'
    + '</div>';
}

/* =====================================================
   CHAT TAB CONTENT
   ===================================================== */
function renderChatContent() {
  if (!S.chat.sessionId) {
    S.chat.sessionId = genSessionId();
    S.chat.messages = [{ role:'bot', text:'Hi there! <i class="ph ph-hand-waving"></i> I\'m ORCare AI, your oral health assistant. Ask me anything about teeth, gums, dental procedures, or oral hygiene!', time: chatTime() }];
  }
  const msgs = S.chat.messages.map(function(m){ return renderChatMsg(m); }).join('');
  const typingBubble = S.chat.typing
    ? '<div class="chat-msg bot"><div class="chat-avatar"><i class="ph ph-robot"></i></div><div class="chat-bubble bot"><div class="typing-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div></div>'
    : '';
  const toolsHtml = S.user ? `
    <div class="chat-tools" style="padding: 10px; border-bottom: 1px solid var(--border); display: flex; gap: 10px; align-items: center; background: var(--surface);">
      <label style="display: flex; align-items: center; gap: 5px; font-size: 14px; cursor: pointer;">
        <input type="checkbox" id="rag-toggle" ${S.chat.useRag ? 'checked' : ''} style="cursor: pointer;">
        <span>Use Document KB</span>
      </label>
      <div style="width: 1px; height: 20px; background: var(--border);"></div>
      <input type="file" id="pdf-upload" accept="application/pdf" style="display: none;">
      <button id="upload-btn" class="btn btn-outline" style="padding: 5px 10px; font-size: 12px; display: flex; align-items: center; gap: 5px;">
        <i class="ph ph-upload-simple"></i> Upload PDF
      </button>
    </div>
  ` : '';
  const suggestions = ['How to brush properly?','What causes bad breath?','When to see a dentist?','Foods bad for teeth'];
  const chips = suggestions.map(function(s){
    return '<span class="chat-suggestion" data-sug="' + s + '">' + s + '</span>';
  }).join('');
  return toolsHtml + '<div class="chat-messages" id="chat-messages">' + msgs + typingBubble + '</div>'
    + '<div class="chat-suggestions">' + chips + '</div>'
    + '<div class="chat-input-row">'
    + '<div class="chat-input-wrap"><textarea class="chat-input" id="chat-input" placeholder="Ask about oral health..." rows="1"></textarea></div>'
    + '<button class="chat-send-btn" id="chat-send-btn"><i class="ph ph-caret-right"></i></button>'
    + '</div>';
}
function renderChatMsg(m) {
  if (m.role === 'bot') {
    return '<div class="chat-msg bot"><div class="chat-avatar"><i class="ph ph-robot"></i></div><div><div class="chat-bubble">' + m.text + '</div><div class="chat-time">' + m.time + '</div></div></div>';
  }
  return '<div class="chat-msg user"><div class="chat-avatar" style="background:var(--accent-bg)"><i class="ph ph-user"></i></div><div><div class="chat-bubble">' + m.text + '</div><div class="chat-time">' + m.time + '</div></div></div>';
}

/* =====================================================
   LEARNING CENTER TAB CONTENT
   ===================================================== */
function renderLearnContent() {
  const cats = LEARNING.map(function(cat){
    const modCount = cat.modules.length;
    return '<div class="learn-cat-card" data-cat="' + cat.id + '">'
      + '<div class="learn-cat-icon" style="background:' + cat.bg + '">' + cat.icon + '</div>'
      + '<div class="learn-cat-title">' + cat.title + '</div>'
      + '<div class="learn-cat-count">' + modCount + ' modules</div>'
      + '<div class="learn-cat-cta">Start Learning <i class="ph ph-arrow-right"></i></div>'
      + '<div class="learn-cat-progress"><div class="learn-cat-bar" style="width:0%"></div></div>'
      + '</div>';
  }).join('');
  return '<div class="page page-dashboard">'
    + '<div class="subpage-hero-dark">'
    + '  <div class="hero-status"><i class="ph ph-books"></i> KNOWLEDGE BASE</div>'
    + '  <h1 class="hero-greeting">Learning Center</h1>'
    + '  <p class="hero-subtext">Explore <strong>' + LEARNING.length + '</strong> categories and <strong>24+</strong> expert modules to improve your oral hygiene.</p>'
    + '</div>'
    + '<div class="section-title">Educational Modules</div>'
    + '<div class="learning-grid">' + cats + '</div>'
    + '</div>';
}

/* =====================================================
   ORAL DISEASE TAB CONTENT
   ===================================================== */
function renderDiseaseContent() {
  const cards = DISEASES.map(function(d){
    return '<div class="disease-v-card" data-disease="' + d.id + '">'
      + '<div class="disease-v-icon" style="background:' + d.bg + '; color:' + d.color + '">' + d.icon + '</div>'
      + '<div class="disease-v-name">' + d.name + '</div>'
      + '<div class="disease-v-desc">' + d.whatPeopleNotice.slice(0,70) + '...</div>'
      + '<div class="disease-v-cta">View Details <i class="ph ph-arrow-right"></i></div>'
      + '</div>';
  }).join('');
  return '<div class="page page-dashboard">'
    + '<div class="subpage-hero-dark">'
    + '  <div class="hero-status"><i class="ph ph-tooth"></i> CLINICAL REFERENCE</div>'
    + '  <h1 class="hero-greeting">Oral Diseases Guide</h1>'
    + '  <p class="hero-subtext">Learn about common oral diseases, early warning signs, causes, and when to consult a professional.</p>'
    + '</div>'
    + '<div class="section-title">Common Conditions</div>'
    + '<div class="disease-grid">' + cards + '</div>'
    + '</div>';
}

/* =====================================================
   PROFILE TAB CONTENT
   ===================================================== */
function renderProfileContent() {
  const name  = S.user ? (S.user.name || 'User') : 'Guest';
  const email = S.user ? (S.user.email || '') : '';
  const age   = S.user ? (S.user.age   || '') : '';
  const gender= S.user ? (S.user.gender|| '') : '';
  const ini   = initials(name);
  const badges= [age?'Age '+age:'',gender||''].filter(Boolean).map(function(b){
    return '<span class="profile-badge">' + b + '</span>';
  }).join('');
  const menuSections = [
    { title:'My Health', items:[
      {icon:'<i class="ph ph-pencil"></i>️',bg:'#dbeafe',title:'Edit Profile',sub:'Update your information',action:'edit_profile'},
      {icon:'<i class="ph ph-clock"></i>',bg:'#ccfbf1',title:'Reminders',sub:'Manage hygiene alerts',action:'reminders'},
      {icon:'<i class="ph ph-lightbulb"></i>',bg:'#fef3c7',title:'Daily Tips',sub:'Browse all oral health tips',action:'daily_tips'}
    ]},
    { title:'Settings & Privacy', items:[
      {icon:'<i class="ph ph-lock"></i>',bg:'#ede9fe',title:'Privacy & Security',sub:'Control your data',action:'privacy_security'},
      {icon:'<i class="ph ph-clipboard-text"></i>',bg:'#dcfce7',title:'Privacy Policy',sub:'How we use your data',action:'privacy_policy'}
    ]},
    { title:'Support', items:[
      {icon:'<i class="ph ph-chat-circle-text"></i>',bg:'#fee2e2',title:'Help & Feedback',sub:'Get help or send feedback',action:'help_feedback'}
    ]},
    { title:'Account', items:[
      {icon:'<i class="ph ph-sign-out"></i>',bg:'#f1f5f9',title:'Sign Out',sub:'Sign out of ORCare',action:'signout'},
      {icon:'<i class="ph ph-trash"></i>️',bg:'#fee2e2',title:'Delete Account',sub:'Permanently remove account',action:'delete_account',danger:true}
    ]}
  ];
  const sectionsHtml = menuSections.map(function(sec){
    const items = sec.items.map(function(item){
      return '<button class="menu-item ' + (item.danger?'danger':'') + '" data-action="' + item.action + '">'
        + '<div class="menu-item-icon" style="background:' + item.bg + '">' + item.icon + '</div>'
        + '<div class="menu-item-text"><div class="menu-item-title">' + item.title + '</div>'
        + '<div class="menu-item-sub">' + item.sub + '</div></div>'
        + '<span class="menu-item-chevron">›</span></button>';
    }).join('');
    return '<div class="menu-section"><div class="menu-section-title">' + sec.title + '</div>'
      + '<div class="menu-card">' + items + '</div></div>';
  }).join('');
  return '<div class="profile-hero"><div class="profile-avatar">' + ini + '</div>'
    + '<div><div class="profile-name">' + name + '</div>'
    + '<div class="profile-email">' + email + '</div>'
    + (badges ? '<div class="profile-badges">' + badges + '</div>' : '')
    + '</div></div>'
    + '<div class="page"><div class="profile-content">' + sectionsHtml + '</div></div>';
}


/* =====================================================
   SCREEN: DISEASE DETAIL
   ===================================================== */
function renderDiseaseDetail() {
  const d = DISEASES.find(function(x){ return x.id === S.params.id; });
  if (!d) return '<div class="screen"><div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button><div class="top-bar-title">Disease</div></div><div style="padding:40px;text-align:center">Not found</div></div>';
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">' + d.name + '</div></div>'
    + '<div class="detail-hero" style="background:' + d.bg + '">'
    + '<div class="detail-hero-icon" style="background:' + d.bg + ';border:2px solid ' + d.color + '33">' + d.icon + '</div>'
    + '<h1>' + d.name + '</h1>'
    + '<p class="tagline">Understanding what is happening and what to do about it</p></div>'
    + '<div class="detail-body">'
    + detailSection('<i class="ph ph-microscope"></i>','What Is Happening',d.whatIsHappening)
    + detailSection('<i class="ph ph-eye"></i>️','What People Notice',d.whatPeopleNotice)
    + detailSection('<i class="ph ph-question"></i>','Why It Happens',d.whyItHappens)
    + detailSection('<i class="ph ph-lightning"></i>','Why You Should Not Ignore It',d.whyNotIgnore)
    + '<div class="dentist-card"><div class="dentist-icon"><i class="ph ph-hospital"></i></div><div><h4>When to See a Dentist</h4><p>' + d.whenToSeeDentist + '</p></div></div>'
    + '</div></div>';
}
function detailSection(icon,title,text) {
  return '<div class="detail-section"><div class="detail-section-title"><span class="ds-icon">' + icon + '</span>' + title + '</div><p>' + text + '</p></div>';
}

/* =====================================================
   SCREEN: SYMPTOM CHECKER
   ===================================================== */
function renderSymptomChecker() {
  var q = S.params.q || '';
  const chips = SYMPTOMS.filter(function(s){
    return !q || s.title.toLowerCase().includes(q.toLowerCase());
  }).map(function(s){
    return '<div class="symptom-chip" data-symptom="' + s.title.toLowerCase() + '">'
      + '<div class="chip-icon" style="background:' + s.bg + '; color:' + s.color + '">' + s.icon + '</div>'
      + '<div class="chip-name">' + s.title + '</div></div>';
  }).join('');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Symptom Checker</div></div>'
    + '<div class="search-bar-wrap"><div class="search-bar"><span class="search-icon"><i class="ph ph-magnifying-glass"></i></span>'
    + '<input id="sym-search" placeholder="Search symptom..." value="' + q + '" /></div></div>'
    + '<div class="page"><div class="symptom-grid">' + chips + '</div></div>'
    + '</div>';
}

/* =====================================================
   SCREEN: SYMPTOM DETAIL
   ===================================================== */
function renderSymptomDetail() {
  const key = S.params.symptom || '';
  const d = SYMPTOM_DETAILS[key];
  const sym = SYMPTOMS.find(function(s){ return s.title.toLowerCase() === key; });
  if (!d || !sym) return '<div class="screen"><div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button><div class="top-bar-title">Symptom</div></div><div style="padding:40px;text-align:center">Not found</div></div>';
  const reasons = d.possibleReasons.map(function(r){ return '<div class="detail-list-item">' + r + '</div>'; }).join('');
  const todos   = d.whatToDo.map(function(t){ return '<div class="detail-list-item">' + t + '</div>'; }).join('');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">' + sym.title + '</div></div>'
    + '<div class="detail-hero" style="background:' + sym.bg + '">'
    + '<div class="detail-hero-icon" style="background:' + sym.bg + '">' + sym.icon + '</div>'
    + '<h1>' + sym.title + '</h1>'
    + '<p class="tagline">' + d.whatIsHappening + '</p></div>'
    + '<div class="detail-body">'
    + detailSection('<i class="ph ph-eye"></i>️','What People Notice',d.whatPeopleNotice)
    + '<div class="detail-section"><div class="detail-section-title"><span class="ds-icon"><i class="ph ph-question"></i></span>Possible Reasons</div><div class="detail-list">' + reasons + '</div></div>'
    + '<div class="detail-section"><div class="detail-section-title"><span class="ds-icon"><i class="ph ph-pill"></i></span>What You Can Do</div><div class="detail-list">' + todos + '</div></div>'
    + '<div class="dentist-card"><div class="dentist-icon"><i class="ph ph-hospital"></i></div><div><h4>When to See a Dentist</h4><p>' + d.whenToSeeDentist + '</p></div></div>'
    + '</div></div>';
}

/* =====================================================
   SCREEN: LEARNING CATEGORY
   ===================================================== */
function renderLearnCategory() {
  const cat = LEARNING.find(function(c){ return c.id === S.params.catId; });
  if (!cat) return '<div class="screen"><div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button></div></div>';
  const mods = cat.modules.map(function(m){
    return '<div class="module-card" data-cat="' + cat.id + '" data-mod="' + m.id + '">'
      + '<div class="module-icon">' + m.icon + '</div>'
      + '<div class="module-body"><div class="module-title">' + m.title + '</div><div class="module-desc">' + m.desc + '</div></div>'
      + '<div class="module-pts">+' + m.pts + 'pts</div></div>';
  }).join('');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">' + cat.icon + ' ' + cat.title + '</div></div>'
    + '<div style="background:' + cat.bg + ';padding:14px 28px;font-size:13px;color:var(--text-2);flex-shrink:0">' + cat.desc + ' — ' + cat.modules.length + ' modules</div>'
    + '<div class="page"><div class="module-list">' + mods + '</div></div>'
    + '</div>';
}

/* =====================================================
   SCREEN: MODULE DETAIL (Lessons + Quiz)
   ===================================================== */
function renderModuleDetail() {
  const cat = LEARNING.find(function(c){ return c.id === S.params.catId; });
  const mod = cat && cat.modules.find(function(m){ return m.id === S.params.modId; });
  if (!mod) return '<div class="screen"><div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button></div></div>';
  const qs = S.quizState;
  const tabs = mod.lessons.map(function(l,i){
    return '<button class="lesson-tab ' + (qs.lessonTab===i?'active':'') + '" data-ltab="' + i + '">' + (i+1) + '. ' + l.t + '</button>';
  }).join('') + '<button class="lesson-tab ' + (qs.lessonTab===mod.lessons.length?'active':'') + '" data-ltab="' + mod.lessons.length + '">Quiz</button>';
  let body;
  if (qs.lessonTab < mod.lessons.length) {
    const l = mod.lessons[qs.lessonTab];
    body = '<div class="lesson-content"><div class="lesson-card">'
      + '<div class="lesson-num">LESSON ' + (qs.lessonTab+1) + ' OF ' + mod.lessons.length + '</div>'
      + '<div class="lesson-title">' + l.t + '</div>'
      + '<div class="lesson-text">' + l.c + '</div></div>'
      + (qs.lessonTab < mod.lessons.length-1
          ? '<button class="btn-primary" id="next-lesson-btn" style="margin:0 18px 18px">Next Lesson →</button>'
          : '<button class="btn-accent" id="to-quiz-btn" style="margin:0 18px 18px">Take the Quiz →</button>')
      + '</div>';
  } else if (qs.done) {
    const pct = Math.round((qs.score/mod.quiz.length)*100);
    const emoji = pct >= 80 ? '<i class="ph ph-trophy"></i>' : pct >= 50 ? '<i class="ph ph-thumbs-up"></i>' : '<i class="ph ph-book-open"></i>';
    body = '<div class="quiz-container"><div class="quiz-result">'
      + '<div class="result-icon">' + emoji + '</div>'
      + '<h3>' + (pct>=80?'Excellent!':pct>=50?'Good Job!':'Keep Learning!') + '</h3>'
      + '<div class="quiz-score-badge">' + qs.score + '/' + mod.quiz.length + '</div>'
      + '<p>You scored ' + pct + '% — ' + (pct>=80?'Outstanding!':pct>=50?'You\'re making progress!':'Review the lessons and try again.') + '</p>'
      + '<button class="btn-primary" id="quiz-retry-btn">Retry Quiz</button>'
      + '<div style="height:12px"></div>'
      + '<button class="btn-ghost" id="back-to-cat-btn" style="margin-top:8px">Back to Modules</button>'
      + '</div></div>';
  } else {
    const q = mod.quiz[qs.qIdx];
    const opts = q.opts.map(function(opt,i){
      let cls = 'quiz-option';
      const letter = String.fromCharCode(65+i);
      if (qs.answered) {
        if (i === q.ans) cls += ' correct';
        else if (i === qs.selectedOpt) cls += ' wrong';
      }
      return '<button class="' + cls + '" data-opt="' + i + '"><span class="opt-letter">' + letter + '</span>' + opt + '</button>';
    }).join('');
    const prog = Math.round(((qs.qIdx)/(mod.quiz.length))*100);
    body = '<div class="quiz-container">'
      + '<div class="quiz-progress"><span style="font-size:12px;font-weight:700;color:var(--text-2)">Q' + (qs.qIdx+1) + '</span>'
      + '<div class="quiz-prog-bar-wrap"><div class="quiz-prog-bar" style="width:' + prog + '%"></div></div>'
      + '<span style="font-size:12px;font-weight:700;color:var(--text-2)">' + mod.quiz.length + '</span></div>'
      + '<div class="quiz-q-counter">Question ' + (qs.qIdx+1) + ' of ' + mod.quiz.length + '</div>'
      + '<div class="quiz-question">' + q.q + '</div>'
      + '<div class="quiz-options">' + opts + '</div>'
      + (qs.answered ? '<button class="btn-primary" id="quiz-next-btn" style="margin-top:16px">' + (qs.qIdx < mod.quiz.length-1 ? 'Next Question →' : 'See Results') + '</button>' : '')
      + '</div>';
  }
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">' + mod.icon + ' ' + mod.title + '</div>'
    + '<span class="badge badge-accent">+' + mod.pts + 'pts</span></div>'
    + '<div class="lesson-tabs">' + tabs + '</div>'
    + body + '</div>';
}

/* =====================================================
   SCREEN: REMINDERS
   ===================================================== */
function renderReminders() {
  const periods = ['Morning','Afternoon','Evening'];
  const sections = periods.map(function(p){
    const items = S.reminders.filter(function(r){ return r.period===p; }).map(function(r){
      return '<div class="reminder-card">'
        + '<div class="reminder-icon">' + r.icon + '</div>'
        + '<div class="reminder-body"><div class="reminder-name">' + r.name + '</div>'
        + '<div class="reminder-time">' + fmtTime(r.time) + '</div></div>'
        + '<button class="reminder-edit-btn" data-rid="' + r.id + '"><i class="ph ph-pencil"></i>️</button>'
        + '<button class="reminder-toggle ' + (r.on?'on':'') + '" data-rid="' + r.id + '"></button>'
        + '</div>';
    }).join('');
    const icons = {Morning:'<i class="ph ph-sun-horizon"></i>',Afternoon:'<i class="ph ph-sun"></i>️',Evening:'<i class="ph ph-moon"></i>'};
    return '<div class="reminder-period"><div class="reminder-period-title"><span>' + icons[p] + '</span>' + p + '</div>' + items + '</div>';
  }).join('');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title"><i class="ph ph-clock"></i> Reminders</div></div>'
    + '<div class="page">' + sections + '</div>'
    + '</div>';
}

/* =====================================================
   SCREEN: DAILY TIPS
   ===================================================== */
function renderDailyTips() {
  const cats = ['All','Hygiene','Food','Lifestyle','Myth Busting','Age 7-9'];
  const chips = cats.map(function(c){
    return '<div class="tips-filter-chip ' + (S.tipsFilter===c?'active':'') + '" data-cat="' + c + '">' + c + '</div>';
  }).join('');
  const filtered = S.tipsFilter === 'All' ? TIPS : TIPS.filter(function(t){ return t.cat===S.tipsFilter; });
  const items = filtered.map(function(t){
    return '<div class="tip-item"><div class="tip-item-icon">' + t.icon + '</div>'
      + '<div class="tip-item-body"><div class="tip-item-cat">' + t.cat + '</div>'
      + '<div class="tip-item-title">' + t.title + '</div>'
      + '<div class="tip-item-desc">' + t.desc + '</div></div></div>';
  }).join('');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title"><i class="ph ph-lightbulb"></i> Daily Tips</div></div>'
    + '<div class="page">'
    + '<div class="tips-filter">' + chips + '</div>'
    + '<div class="tips-grid">' + items + '</div>'
    + '</div>'
    + '</div>';
}

/* =====================================================
   SCREEN: EDIT PROFILE
   ===================================================== */
function renderEditProfile() {
  const u = S.user || {};
  const ini = initials(u.name || 'U');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Edit Profile</div></div>'
    + '<div class="edit-avatar-wrap"><div class="edit-avatar">' + ini + '</div></div>'
    + '<div class="edit-form">'
    + epField('Full Name','<i class="ph ph-user"></i>','ep-name','text',u.name||'','Your full name')
    + epField('Email Address','<i class="ph ph-envelope"></i>','ep-email','email',u.email||'','your@email.com')
    + epField('Age','<i class="ph ph-cake"></i>','ep-age','number',u.age||'','Your age')
    + '<div class="form-group"><label class="form-label">Gender</label>'
    + '<div class="form-input-wrap"><span class="input-icon"><i class="ph ph-gender-intersex"></i></span>'
    + '<select id="ep-gender"><option value="">Select</option>'
    + ['Male','Female','Other'].map(function(g){ return '<option ' + (u.gender===g?'selected':'') + '>' + g + '</option>'; }).join('')
    + '</select></div></div>'
    + epField('District','<i class="ph ph-map-pin"></i>','ep-district','text',u.district||'','Your district')
    + epField('State','<i class="ph ph-map"></i>️','ep-state','text',u.state||'','Your state')
    + '<button class="btn-primary" id="save-profile-btn"><span id="save-profile-text">Save Changes</span></button>'
    + '</div></div>';
}
function epField(label,icon,id,type,val,ph) {
  return '<div class="form-group"><label class="form-label">' + label + '</label>'
    + '<div class="form-input-wrap"><span class="input-icon">' + icon + '</span>'
    + '<input type="' + type + '" id="' + id + '" value="' + val + '" placeholder="' + ph + '" /></div></div>';
}

/* =====================================================
   SCREEN: PRIVACY & SECURITY
   ===================================================== */
function renderPrivacySecurity() {
  const row = function(id,title,sub) {
    return '<div class="toggle-row"><div class="toggle-row-info"><div class="toggle-row-title">' + title + '</div>'
      + '<div class="toggle-row-sub">' + sub + '</div></div>'
      + '<button class="toggle-switch ' + (S.privacyToggles[id]?'on':'') + '" data-toggle="' + id + '"></button></div>';
  };
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Privacy &amp; Security</div></div>'
    + '<div class="privacy-body">'
    + '<div class="privacy-section"><h3>Data &amp; Privacy</h3><p>Control how ORCare uses your data. Your health information is always encrypted and never sold.</p></div>'
    + row('analytics','Usage Analytics','Help us improve the app by sharing anonymous usage data')
    + row('notifications','Push Notifications','Receive reminders and health tips')
    + row('healthData','Share Health Data','Allow health data to be used for personalised recommendations')
    + '<div style="height:20px"></div>'
    + '<div class="privacy-section"><h3>Security</h3></div>'
    + '<div class="menu-card"><button class="menu-item" data-action="change_pw"><div class="menu-item-icon" style="background:#dbeafe"><i class="ph ph-lock"></i></div><div class="menu-item-text"><div class="menu-item-title">Change Password</div><div class="menu-item-sub">Update your account password</div></div><span class="menu-item-chevron">›</span></button>'
    + '<button class="menu-item" id="clear-data-btn"><div class="menu-item-icon" style="background:#fee2e2"><i class="ph ph-trash"></i>️</div><div class="menu-item-text"><div class="menu-item-title">Clear App Data</div><div class="menu-item-sub">Reset all local data and preferences</div></div><span class="menu-item-chevron">›</span></button></div>'
    + '</div></div>';
}

/* =====================================================
   SCREEN: PRIVACY POLICY
   ===================================================== */
function renderPrivacyPolicy() {
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Privacy Policy</div></div>'
    + '<div class="privacy-body">'
    + ppSection('Introduction','ORCare is committed to protecting your personal information and your right to privacy. This policy explains what information we collect, how we use it, and your rights in relation to it.')
    + ppSection('Information We Collect','We collect information you provide directly to us, such as your name, email address, age, gender, and location. We also collect information about how you use the app, including features you access and reminders you set.')
    + ppSection('How We Use Your Information','We use the information we collect to: provide, maintain, and improve our services; send you reminders and health tips; analyze usage to improve the app experience; and respond to your feedback and support requests.')
    + ppSection('Data Security','We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit using TLS 1.3.')
    + ppSection('Data Retention','We retain your personal data for as long as you maintain an account with us. You can request deletion of your account and data at any time from the Delete Account screen.')
    + ppSection('Your Rights','You have the right to access, correct, or delete your personal data. You can update your profile information in the Edit Profile screen. To delete your account, visit Account Settings.')
    + ppSection('Contact Us','If you have any questions about this Privacy Policy, please contact us at privacy@orcare.health')
    + '</div></div>';
}
function ppSection(title,text) {
  return '<div class="privacy-section"><h3>' + title + '</h3><p>' + text + '</p></div>';
}

/* =====================================================
   SCREEN: HELP & FEEDBACK
   ===================================================== */
function renderHelpFeedback() {
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Help &amp; Feedback</div></div>'
    + '<div class="help-body">'
    + '<div class="help-card"><div class="help-card-icon"><i class="ph ph-chat-circle-text"></i></div>'
    + '<div><h3>We are here to help!</h3><p>Share your feedback or report an issue and we will get back to you shortly.</p></div></div>'
    + '<div class="help-form">'
    + epField('Your Name','<i class="ph ph-user"></i>','hf-name','text',S.user?S.user.name||'':'','Your name')
    + epField('Email Address','<i class="ph ph-envelope"></i>','hf-email','email',S.user?S.user.email||'':'','your@email.com')
    + '<div class="form-group"><label class="form-label">Message</label>'
    + '<div class="textarea-wrap"><textarea id="hf-msg" placeholder="Describe your issue or feedback in detail..."></textarea></div></div>'
    + '<button class="btn-primary" id="hf-submit-btn"><span id="hf-submit-text">Send Feedback</span></button>'
    + '</div></div></div>';
}

/* =====================================================
   SCREEN: DELETE ACCOUNT
   ===================================================== */
function renderDeleteAccount() {
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Delete Account</div></div>'
    + '<div class="delete-body">'
    + '<div class="delete-warning"><div class="delete-warning-icon"><i class="ph ph-warning"></i>️</div>'
    + '<div><h4>This action cannot be undone</h4><p>Deleting your account is permanent and will remove all your data, including progress, reminders, and profile information.</p></div></div>'
    + '<div class="delete-consequences"><h4>What you will lose:</h4>'
    + ['All profile and personal data','Learning progress and points','Custom reminders and settings','Chat history with ORCare AI','Access to personalized features'].map(function(c){
        return '<div class="delete-consequence-item"><span class="ci-icon"><i class="ph ph-x-circle"></i></span>' + c + '</div>';
      }).join('')
    + '</div>'
    + '<button class="btn-danger-outline" id="del-confirm-btn" style="margin-top:24px"><span id="del-btn-text">Delete My Account</span></button>'
    + '</div></div>';
}

/* =====================================================
   EVENT HANDLERS (attached after each render)
   ===================================================== */
function attachHandlers() {
  const sc = S.screen;

  /* ---- Universal back button ---- */
  on('back-btn', 'click', function(){
    if (internalHistoryCount > 0) {
      internalHistoryCount--;
      window.history.back();
    } else {
      const backMap = {
        symptom_checker: function(){ S.activeTab='home'; go('main'); },
        symptom_detail:  function(){ go('symptom_checker'); },
        disease_detail:  function(){ S.activeTab='disease'; go('main'); },
        learn_category:  function(){ S.activeTab='learn'; go('main'); },
        module_detail:   function(){ go('learn_category',{catId:S.params.catId}); },
        reminders:       function(){ S.activeTab='profile'; go('main'); },
        daily_tips:      function(){ S.activeTab='profile'; go('main'); },
        edit_profile:    function(){ S.activeTab='profile'; go('main'); },
        privacy_security:function(){ S.activeTab='profile'; go('main'); },
        privacy_policy:  function(){ S.activeTab='profile'; go('main'); },
        help_feedback:   function(){ S.activeTab='profile'; go('main'); },
        delete_account:  function(){ S.activeTab='profile'; go('main'); },
      };
      const fn = backMap[sc];
      if (fn) fn(); else go('main');
    }
  });

  /* ---- ONBOARDING ---- */
  if (sc === 'onboarding') {
    on('ob-next','click', function(){
      if (_obSlide < ONBOARDING_SLIDES.length - 1) {
        _obSlide++;
        render();
      } else {
        finishOnboarding();
      }
    });
    on('ob-skip','click', function(){
      finishOnboarding();
    });
  }

  /* ---- SPLASH ---- */
  if (sc === 'splash') {
    setTimeout(function(){
      if (S.user && S.token) { 
        if (S.initialHashScreen && !['signin', 'signup', 'forgot', 'reset', 'otp_signup', 'otp_forgot'].includes(S.initialHashScreen)) {
          const scr = S.initialHashScreen; const prms = S.initialHashParams;
          S.initialHashScreen = null; S.initialHashParams = null;
          go(scr, prms);
        } else {
          go('main'); 
        }
      }
      else { 
        if (S.initialHashScreen && ['signin', 'signup', 'forgot', 'reset', 'otp_signup', 'otp_forgot'].includes(S.initialHashScreen)) {
          const scr = S.initialHashScreen; const prms = S.initialHashParams;
          S.initialHashScreen = null; S.initialHashParams = null;
          go(scr, prms);
        } else {
          go('signin'); 
        }
      }
    }, 2200);
  }


  /* ---- SIGN IN / SIGN UP ---- */
  if (sc === 'signin' || sc === 'signup' || sc === 'otp_signup' || sc === 'forgot' || sc === 'otp_forgot' || sc === 'reset') {
    on('google-login-btn', 'click', async function() {
      setBtnLoading('google-login-btn', 'google-btn-text', 'Redirecting...', true);
      try {
        if (!window.supabaseClient) throw new Error("Supabase is not initialized.");
        const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: window.location.origin }
        });
        if (error) throw error;
      } catch (err) {
        toast('Google Login Error: ' + err.message, 'danger');
        setBtnLoading('google-login-btn', 'google-btn-text', 'Continue with Google', false);
      }
    });
  }

  /* ---- MAIN TABS ---- */
  if (sc === 'main') {
    /* Bottom nav tabs (mobile) */
    qAll('.tab-item').forEach(function(el){
      el.addEventListener('click', function(){
        S.activeTab = el.dataset.tab;
        render();
      });
    });
    /* Sidebar nav items (desktop) */
    qAll('.sidebar-item[data-tab]').forEach(function(el){
      el.addEventListener('click', function(){
        S.activeTab = el.dataset.tab;
        render();
      });
    });
    /* Sidebar sign out */
    on('sidebar-signout','click',function(){
      if (confirm('Are you sure you want to sign out?')) { clearSession(); go('signin'); }
    });

    /* Overview quick actions */
    qAll('.quick-card[data-action]').forEach(function(el){
      el.addEventListener('click', function(){
        const a = el.dataset.action;
        if (a==='symptom_checker') go('symptom_checker');
        else if (a==='chat_tab') { S.activeTab='chat'; render(); }
        else if (a==='learn_category') { S.activeTab='learn'; render(); }
        else if (a==='reminders') go('reminders');
        else if (a==='daily_tips') go('daily_tips');
      });
    });

    /* Oral Diseases */
    qAll('.disease-card[data-disease]').forEach(function(el){
      el.addEventListener('click', function(){
        go('disease_detail', { id: el.dataset.disease });
      });
    });

    /* Profile avatar */
    on('home-avatar-btn','click',function(){ S.activeTab='profile'; render(); });

    /* Profile menu items */
    qAll('.menu-item[data-action]').forEach(function(el){
      el.addEventListener('click', function(){
        const a = el.dataset.action;
        if (a==='reminders') go('reminders');
        else if (a==='edit_profile') { toast('Edit profile coming soon!'); }
        else if (a==='privacy_security') { toast('Privacy & security settings coming soon!'); }
        else if (a==='privacy_policy') window.open('https://example.com/privacy','_blank');
        else if (a==='help_feedback') go('help_feedback');
        else if (a==='delete_account') go('delete_account');
        else if (a==='signout') { clearSession(); go('signin'); }
        else if (a==='daily_tips') go('daily_tips');
      });
    });

    /* Learning category cards */
    qAll('.learn-cat-card[data-cat]').forEach(function(el){
      el.addEventListener('click', function(){
        S.quizState = {catId:el.dataset.cat, modId:null, qIdx:0, answered:false, score:0, done:false, lessonTab:0, selectedOpt:-1};
        go('learn_category',{catId:el.dataset.cat});
      });
    });

    /* Chat handlers */
    setupChatHandlers();
  }

  /* ---- SYMPTOM CHECKER ---- */
  if (sc === 'symptom_checker') {
    on('sym-search','input',function(){ S.params.q=this.value; render(); });
    qAll('.symptom-chip').forEach(function(el){
      el.addEventListener('click', function(){ go('symptom_detail',{symptom:el.dataset.symptom}); });
    });
  }

  /* ---- LEARNING CATEGORY ---- */
  if (sc === 'learn_category') {
    qAll('.module-card[data-mod]').forEach(function(el){
      el.addEventListener('click', function(){
        S.quizState = {catId:el.dataset.cat, modId:el.dataset.mod, qIdx:0, answered:false, score:0, done:false, lessonTab:0, selectedOpt:-1};
        go('module_detail',{catId:el.dataset.cat, modId:el.dataset.mod});
      });
    });
  }

  /* ---- MODULE DETAIL ---- */
  if (sc === 'module_detail') {
    qAll('.lesson-tab[data-ltab]').forEach(function(el){
      el.addEventListener('click', function(){
        S.quizState.lessonTab = parseInt(el.dataset.ltab);
        S.quizState.answered = false;
        render();
      });
    });
    on('next-lesson-btn','click',function(){
      S.quizState.lessonTab++;
      render();
    });
    on('to-quiz-btn','click',function(){
      const cat = LEARNING.find(function(c){ return c.id===S.params.catId; });
      const mod = cat && cat.modules.find(function(m){ return m.id===S.params.modId; });
      S.quizState.lessonTab = mod ? mod.lessons.length : 0;
      S.quizState.qIdx = 0;
      S.quizState.done = false;
      S.quizState.score = 0;
      render();
    });
    qAll('.quiz-option[data-opt]').forEach(function(el){
      el.addEventListener('click', function(){
        if (S.quizState.answered) return;
        const cat = LEARNING.find(function(c){ return c.id===S.params.catId; });
        const mod = cat && cat.modules.find(function(m){ return m.id===S.params.modId; });
        if (!mod) return;
        const q2 = mod.quiz[S.quizState.qIdx];
        const chosen = parseInt(el.dataset.opt);
        S.quizState.answered = true;
        S.quizState.selectedOpt = chosen;
        if (chosen === q2.ans) S.quizState.score++;
        render();
      });
    });
    on('quiz-next-btn','click',function(){
      const cat = LEARNING.find(function(c){ return c.id===S.params.catId; });
      const mod = cat && cat.modules.find(function(m){ return m.id===S.params.modId; });
      if (!mod) return;
      if (S.quizState.qIdx < mod.quiz.length-1) {
        S.quizState.qIdx++;
        S.quizState.answered = false;
        S.quizState.selectedOpt = -1;
      } else {
        S.quizState.done = true;
      }
      render();
    });
    on('quiz-retry-btn','click',function(){
      S.quizState.qIdx = 0; S.quizState.answered = false;
      S.quizState.score = 0; S.quizState.done = false; S.quizState.selectedOpt = -1;
      render();
    });
    on('back-to-cat-btn','click',function(){ go('learn_category',{catId:S.params.catId}); });
  }

  /* ---- REMINDERS ---- */
  if (sc === 'reminders') {
    qAll('.reminder-toggle[data-rid]').forEach(function(el){
      el.addEventListener('click', function(){
        var rid = parseInt(el.dataset.rid);
        var rem = S.reminders.find(function(r){ return r.id===rid; });
        if (rem) { rem.on = !rem.on; render(); }
      });
    });
    qAll('.reminder-edit-btn[data-rid]').forEach(function(el){
      el.addEventListener('click', function(){
        var rid = parseInt(el.dataset.rid);
        var rem = S.reminders.find(function(r){ return r.id===rid; });
        if (!rem) return;
        showModal('<div class="modal-handle"></div>'
          + '<div class="modal-title">Edit Reminder</div>'
          + '<div class="form-group"><label class="form-label">Reminder Name</label>'
          + '<div class="form-input-wrap"><span class="input-icon">' + rem.icon + '</span>'
          + '<input id="rem-name" value="' + rem.name + '" /></div></div>'
          + '<div class="form-group"><label class="form-label">Time (HH:MM)</label>'
          + '<div class="form-input-wrap"><span class="input-icon"><i class="ph ph-clock"></i></span>'
          + '<input id="rem-time" type="time" value="' + rem.time + '" /></div></div>'
          + '<div class="modal-actions">'
          + '<button class="modal-cancel" id="modal-cancel">Cancel</button>'
          + '<button class="modal-save" id="modal-save" data-rid="' + rid + '">Save</button></div>'
        );
        document.getElementById('modal-cancel').onclick = closeModal;
        document.getElementById('modal-save').onclick = function(){
          rem.name = document.getElementById('rem-name').value || rem.name;
          var t = document.getElementById('rem-time').value;
          if (/^\d{2}:\d{2}$/.test(t)) rem.time = t;
          closeModal(); render();
          toast('Reminder updated','success');
        };
      });
    });
  }

  /* ---- DAILY TIPS ---- */
  if (sc === 'daily_tips') {
    qAll('.tips-filter-chip[data-cat]').forEach(function(el){
      el.addEventListener('click', function(){
        S.tipsFilter = el.dataset.cat; render();
      });
    });
  }

  /* ---- EDIT PROFILE ---- */
  if (sc === 'edit_profile') {
    on('save-profile-btn','click', async function(){
      const data = {
        name:    val('ep-name'),
        email:   val('ep-email'),
        age:     val('ep-age'),
        gender:  val('ep-gender'),
        district:val('ep-district'),
        state:   val('ep-state')
      };
      setBtnLoading('save-profile-btn','save-profile-text','Saving...',true);
      try { await apiCall('PUT','/users/profile',data); } catch(e){}
      S.user = Object.assign({}, S.user, data);
      localStorage.setItem('oc_user', JSON.stringify(S.user));
      toast('Profile updated!','success');
      S.activeTab='profile'; go('main');
    });
  }

  /* ---- PRIVACY & SECURITY ---- */
  if (sc === 'privacy_security') {
    qAll('.toggle-switch[data-toggle]').forEach(function(el){
      el.addEventListener('click', function(){
        var k = el.dataset.toggle;
        S.privacyToggles[k] = !S.privacyToggles[k];
        el.classList.toggle('on', S.privacyToggles[k]);
      });
    });
    on('clear-data-btn','click',function(){
      if (confirm('Clear all local app data? You will be signed out.')) {
        clearSession();
        localStorage.clear();
        go('signin');
        toast('App data cleared','success');
      }
    });
    on('change_pw','click',function(){ toast('Change password coming soon!'); });
  }

  /* ---- HELP & FEEDBACK ---- */
  if (sc === 'help_feedback') {
    on('hf-submit-btn','click', async function(){
      const name=val('hf-name'), email=val('hf-email'), msg=val('hf-msg');
      if (!name||!email||!msg) { toast('Please fill in all fields','warning'); return; }
      setBtnLoading('hf-submit-btn','hf-submit-text','Sending...',true);
      try { await apiCall('POST','/content/feedback',{name,email,message:msg}); } catch(e){}
      toast('Feedback sent! Thank you.','success');
      S.activeTab='profile'; go('main');
    });
  }

  /* ---- DELETE ACCOUNT ---- */
  if (sc === 'delete_account') {
    on('del-confirm-btn','click', async function(){
      if (!confirm("Are you absolutely sure you want to delete your account? This cannot be undone.")) return;
      setBtnLoading('del-confirm-btn','del-btn-text','Deleting...',true);
      try { await apiCall('POST','/auth/confirm-delete-account',{}); } catch(e){}
      clearSession();
      toast('Account deleted. Goodbye!','danger');
      go('signin');
    });
  }
}

/* ---- Chat handlers (inside main tab) ---- */
function setupChatHandlers() {
  if (S.activeTab !== 'chat') return;
  on('chat-new-btn','click',function(){
    S.chat.sessionId = genSessionId();
    S.chat.messages = [{role:'bot', text:'New session started! How can I help you with your oral health today?', time:chatTime()}];
    render();
  });
  on('chat-send-btn','click', sendChatMsg);
  const inp = document.getElementById('chat-input');
  if (inp) inp.addEventListener('keydown', function(e){ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChatMsg();} });
  qAll('.chat-suggestion[data-sug]').forEach(function(el){
    el.addEventListener('click', function(){
      var inp2 = document.getElementById('chat-input');
      if (inp2) { inp2.value = el.dataset.sug; sendChatMsg(); }
    });
  });

  const ragToggle = document.getElementById('rag-toggle');
  if (ragToggle) {
    ragToggle.addEventListener('change', (e) => {
      S.chat.useRag = e.target.checked;
    });
  }

  const uploadBtn = document.getElementById('upload-btn');
  const pdfUpload = document.getElementById('pdf-upload');
  if (uploadBtn && pdfUpload) {
    uploadBtn.addEventListener('click', () => pdfUpload.click());
    pdfUpload.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.type !== 'application/pdf') {
        toast('Only PDF files are allowed', 'error');
        return;
      }
      
      toast('Uploading document...', 'info');
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const res = await fetch(`${RAG_API_BASE}/documents/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${S.token}` },
          body: formData
        });
        
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        toast(`Successfully uploaded ${data.filename} (${data.num_chunks} chunks)`, 'success');
        S.chat.useRag = true;
        render();
      } catch (err) {
        console.error(err);
        toast(err.message, 'error');
      }
      pdfUpload.value = ''; // reset
    });
  }
}

async function sendChatMsg() {
  const inp = document.getElementById('chat-input');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text || S.chat.typing) return;
  inp.value = '';
  S.chat.messages.push({role:'user', text, time:chatTime()});
  S.chat.typing = true;
  render();
  const botReply = await getBotReply(text);
  S.chat.typing = false;
  S.chat.messages.push({role:'bot', text:botReply, time:chatTime()});
  render();
  setTimeout(function(){ var m=document.getElementById('chat-messages'); if(m) m.scrollTop=m.scrollHeight; },50);
}

async function getBotReply(msg) {
  try {
    let endpoint = `${API_BASE}/chat/message`;
    let payload = { sessionId: S.chat.sessionId, message: msg };
    
    if (S.chat.useRag) {
      endpoint = `${RAG_API_BASE}/rag/ask`;
      payload = { question: msg, top_k: 3 };
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${S.token}` },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.message || 'Failed to get response');
    
    let answerText = data.text || data.answer || "I'm sorry, I couldn't generate a response.";
    
    if (S.chat.useRag && data.sources && data.sources.length > 0) {
        answerText += "\n\nSources:\n" + data.sources.map(s => `- ${s.document_name} (Page ${s.page_number})`).join("\n");
    }
    return answerText;
  } catch(e) {
    return getLocalBotReply(msg);
  }
}

function getLocalBotReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes('brush') || m.includes('brushing')) return 'Great question about brushing! <i class="ph ph-tooth"></i> You should brush twice daily for 2 minutes using a soft-bristled toothbrush at a 45-degree angle to your gumline. Use gentle circular motions and make sure to clean all surfaces — outer, inner, and chewing surfaces. And spit, don\'t rinse, so the fluoride keeps working!';
  if (m.includes('floss') || m.includes('flossing')) return 'Flossing is essential! <i class="ph ph-yarn"></i> Your toothbrush only cleans 60% of tooth surfaces — the remaining 40% between teeth need floss. Use 18 inches of floss, curve it into a "C" shape around each tooth and slide gently under the gumline. Floss once daily, preferably at night.';
  if (m.includes('bad breath') || m.includes('halitosis')) return 'Bad breath is usually caused by bacteria on the tongue and between teeth. <i class="ph ph-wind"></i> Try: tongue scraping every morning, flossing daily, staying hydrated, and using an antimicrobial mouthwash. If it persists after 2 weeks of good hygiene, see a dentist — it could indicate gum disease.';
  if (m.includes('bleed') || m.includes('gum')) return 'Bleeding gums are a sign of gingivitis — the earliest stage of gum disease! <i class="ph ph-drop"></i> The good news is it\'s reversible. Don\'t stop brushing; instead, brush MORE gently with a soft bristle brush. Floss daily to remove plaque between teeth. If bleeding doesn\'t improve in 2 weeks, see a dentist.';
  if (m.includes('sensitive') || m.includes('sensitivity') || m.includes('pain')) return 'Tooth sensitivity is usually caused by worn enamel or exposed roots. <i class="ph ph-snowflake"></i>️ Switch to sensitivity toothpaste with potassium nitrate. Use a soft brush, avoid hard brushing, and cut down on acidic foods. If sensitivity is in just one tooth or is severe, see a dentist — it could be a cavity or cracked tooth.';
  if (m.includes('cavity') || m.includes('decay') || m.includes('hole')) return 'Cavities are caused by bacteria feeding on sugar and producing acid that erodes enamel. <i class="ph ph-warning"></i>️ Early cavities can be detected at check-ups before they cause pain. A filling stops the decay. If left untreated, it spreads to the nerve and requires a root canal. Prevention: fluoride toothpaste, limit sugar, and regular check-ups!';
  if (m.includes('whitening') || m.includes('whiten') || m.includes('yellow')) return 'For safer whitening: <i class="ph ph-sparkle"></i> Get a professional cleaning first to remove surface stains. Over-the-counter whitening strips with 10-15% carbamide peroxide are safe for most people. Avoid "natural" remedies like lemon juice or charcoal — they damage enamel. If staining is severe, ask your dentist about professional whitening.';
  if (m.includes('dentist') || m.includes('checkup') || m.includes('visit')) return 'Most people should see a dentist every 6 months for a check-up and professional cleaning. <i class="ph ph-hospital"></i> If you\'re high-risk (smoker, diabetic, prone to cavities), every 3-4 months is better. Regular visits catch problems early — before they become painful and expensive. Don\'t wait for pain to visit!';
  if (m.includes('hello') || m.includes('hi') || m.includes('hey')) return 'Hello! <i class="ph ph-hand-waving"></i> Great to chat with you. I\'m ORCare AI, specialized in oral health. You can ask me anything about: brushing and flossing technique, tooth sensitivity or pain, gum disease, cavities, dental procedures, nutrition for teeth, or when to see a dentist!';
  const oralKeywords = ['tooth','teeth','brush','floss','gum','cavity','dental','dentist','mouth','oral','tongue','enamel','plaque','tartar','crown','filling','braces','whitening','sensitivity','decay','abscess','molar','wisdom','root canal','bleeding','ulcer','canker','bad breath','halitosis','jaw','tmj','grinding','bruxism','implant','denture','retainer','orthodont','periodon','gingivitis','fluoride','mouthwash','toothpaste','toothbrush','extraction','hygiene','sore','pain','swelling','dry socket','thrush'];
  const isOralRelated = oralKeywords.some(function(kw){ return m.includes(kw); });
  if (!isOralRelated) return 'I appreciate your question, but I\'m specialized exclusively in oral and dental health. <i class="ph ph-tooth"></i> I can help you with topics like brushing technique, gum disease, cavities, dental procedures, and oral hygiene. How can I assist you with your oral health today?';
  return 'That\'s a great oral health question! <i class="ph ph-tooth"></i> I specialize in topics like brushing technique, gum disease, cavities, sensitivity, whitening, and dental procedures. Could you give me a bit more detail about what you\'d like to know? Or feel free to use one of the suggestion chips below!';
}

/* =====================================================
   HELPERS
   ===================================================== */
function q(id) { return document.getElementById(id); }
function qAll(sel) { return Array.from(document.querySelectorAll(sel)); }
function val(id) { var el=q(id); return el?el.value.trim():''; }
function on(id,ev,fn) { var el=q(id); if(el) el.addEventListener(ev,fn); }

function togglePw(inputId, btnId) {
  on(btnId,'click',function(){
    var inp = q(inputId);
    if (!inp) return;
    inp.type = inp.type==='password'?'text':'password';
    q(btnId).textContent = inp.type==='password'?'<i class="ph ph-eye"></i>️':'<i class="ph ph-eye-slash"></i>';
  });
}

function setBtnLoading(btnId, textId, text, loading) {
  var btn=q(btnId), txt=q(textId);
  if (btn) btn.disabled = loading;
  if (txt) txt.innerHTML = loading ? '<span class="spinner"></span> ' + text : text;
}

function setupOtpBoxes() {
  for (var i=0;i<6;i++) {
    (function(idx){
      var el = q('otp-'+idx);
      if (!el) return;
      el.addEventListener('input',function(){
        if (this.value.length===1) {
          this.classList.add('filled');
          var next=q('otp-'+(idx+1));
          if(next) next.focus();
        }
      });
      el.addEventListener('keydown',function(e){
        if(e.key==='Backspace'&&!this.value){
          this.classList.remove('filled');
          var prev=q('otp-'+(idx-1));
          if(prev){prev.focus();prev.value='';}
        }
      });
    })(i);
  }
  var first=q('otp-0'); if(first) first.focus();
}

var _otpTimer = null;
function startOtpTimer() {
  if(_otpTimer) clearInterval(_otpTimer);
  var secs=60;
  _otpTimer = setInterval(function(){
    secs--;
    var el=q('otp-seconds');
    if(el) el.textContent=secs;
    if(secs<=0){
      clearInterval(_otpTimer);
      var btn=q('otp-resend-btn');
      if(btn){ btn.disabled=false; }
      var tw=q('otp-timer-wrap');
      if(tw) tw.innerHTML='';
    }
  },1000);
}

function finishOnboarding() {
  localStorage.setItem('oc_onboarded','1');
  S.onboarded=true;
  go('main');
}

/* =====================================================
   BOOT
   ===================================================== */
(function boot() {
  loadStorage();

  function parseHash() {
    const h = window.location.hash.substring(1);
    if (!h) return null;
    const parts = h.split('?');
    const screen = parts[0];
    const params = {};
    if (parts[1]) {
      const sp = new URLSearchParams(parts[1]);
      sp.forEach((val, key) => { params[key] = val; });
    }
    return { screen, params };
  }

  const initialRoute = parseHash();
  if (initialRoute) {
    S.initialHashScreen = initialRoute.screen;
    S.initialHashParams = initialRoute.params;
  }

  window.addEventListener('hashchange', () => {
    const route = parseHash();
    if (route && route.screen) {
      go(route.screen, route.params, true);
    }
  });
  const SUPABASE_URL = "https://cgnkcweyutjguhcxkhqh.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbmtjd2V5dXRqZ3VoY3hraHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzg4NTIsImV4cCI6MjA5MTg1NDg1Mn0.bnDVTs73KGLzlzXGAAKqvfL_WhPG815ZBDKPuhqt4Pg";
  const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
  window.supabaseClient = supabase;
  if (supabase) {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          const res = await apiCall('POST', '/auth/google-login', { access_token: session.access_token });
          saveSession(res.token, res.user || res.data?.user);
          toast('Welcome to ORCare!', 'success');
          go('main');
        } catch (err) {
          toast('Failed to login: ' + err.message, 'danger');
        }
      }
    });
  }
  render();
})();
