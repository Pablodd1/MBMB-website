// Agentic Website Engine v2.0
// Tracks user behavior, auto-optimizes SEO, self-improves content
// Deployed: May 22, 2026 | Site: MBMB

(function() {
  'use strict';

  class AgenticWebsite {
    constructor(config) {
      this.siteId = config.siteId;
      this.apiEndpoint = config.apiEndpoint || '/api/agentic';
      this.trackers = {};
      this.optimizations = [];
      this.config = config;
      this.sessionStart = Date.now();
      this.init();
    }

    init() {
      this.injectTracking();
      this.startBehaviorAnalysis();
      this.setupAutoOptimization();
      this.applyInitialOptimizations();
    }

    // 1. TRACK USER BEHAVIOR
    injectTracking() {
      // Track all clicks
      document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-track]') || e.target.closest('a') || e.target.closest('button') || e.target;
        this.logEvent('click', {
          element: target.tagName,
          id: target.id,
          class: target.className?.substring(0, 100),
          text: target.innerText?.substring(0, 50),
          href: target.href,
          section: this.getSection(target),
          timestamp: Date.now()
        });
      });

      // Track scroll depth
      let maxScroll = 0;
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
          if (scrollPercent > maxScroll && [25, 50, 75, 90, 100].includes(scrollPercent)) {
            maxScroll = scrollPercent;
            this.logEvent('scroll_depth', { percent: scrollPercent });
          }
        }, 100);
      }, { passive: true });

      // Track search queries
      document.querySelectorAll('input[type="search"], input[placeholder*="search" i], input[name*="search" i]').forEach(input => {
        input.addEventListener('change', (e) => {
          if (e.target.value.trim()) {
            this.logEvent('search', { query: e.target.value.trim() });
          }
        });
      });

      // Track time on page
      window.addEventListener('beforeunload', () => {
        const duration = Math.round((Date.now() - this.sessionStart) / 1000);
        this.logEvent('session_end', { duration_seconds: duration });
      });

      // Track form interactions
      document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
          const formData = new FormData(form);
          const fields = [];
          formData.forEach((value, key) => {
            if (!key.includes('password') && !key.includes('card') && !key.includes('token')) {
              fields.push(key);
            }
          });
          this.logEvent('form_submit', {
            form_id: form.id || form.name || 'unnamed',
            action: form.action,
            fields: fields
          });
        });
      });

      // Track CTA visibility (intersection observer)
      if ('IntersectionObserver' in window) {
        const ctaObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.logEvent('cta_visible', {
                element: entry.target.tagName,
                id: entry.target.id,
                text: entry.target.innerText?.substring(0, 50)
              });
            }
          });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-track="cta"], .cta, [class*="cta"]').forEach(el => ctaObserver.observe(el));
      }
    }

    getSection(element) {
      const section = element.closest('section[id], div[id], article[id]');
      return section ? section.id : 'unknown';
    }

    logEvent(type, data) {
      const event = {
        type,
        data,
        url: window.location.href,
        path: window.location.pathname,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        session_id: this.getSessionId()
      };

      this.sendToServer(event);
      this.storeLocal(event);
    }

    getSessionId() {
      let sessionId = sessionStorage.getItem('agentic_session_id');
      if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        sessionStorage.setItem('agentic_session_id', sessionId);
      }
      return sessionId;
    }

    sendToServer(event) {
      if (!this.eventQueue) this.eventQueue = [];
      this.eventQueue.push(event);

      clearTimeout(this.sendTimeout);
      this.sendTimeout = setTimeout(() => {
        if (this.eventQueue.length > 0) {
          fetch(this.apiEndpoint + '/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ site_id: this.siteId, events: this.eventQueue })
          }).catch(() => {});
          this.eventQueue = [];
        }
      }, 5000);
    }

    storeLocal(event) {
      const key = 'agentic_events_' + this.siteId;
      try {
        const events = JSON.parse(localStorage.getItem(key) || '[]');
        events.push(event);
        if (events.length > 1000) events.shift();
        localStorage.setItem(key, JSON.stringify(events));
      } catch (e) {}
    }

    // 2. ANALYZE BEHAVIOR
    startBehaviorAnalysis() {
      setInterval(() => this.analyzePatterns(), 30000);
      setTimeout(() => this.analyzePatterns(), 5000);
    }

    analyzePatterns() {
      const events = this.getLocalEvents();
      if (events.length < 5) return;

      this.patterns = {
        searchTerms: this.extractSearchTerms(events),
        popularClicks: this.extractPopularClicks(events),
        dropOffPoints: this.extractDropOffs(events),
        engagingSections: this.extractEngagingSections(events),
        conversionPaths: this.extractConversionPaths(events),
        ctaPerformance: this.extractCTAPerformance(events)
      };

      this.applyOptimizations(this.patterns);
    }

    extractSearchTerms(events) {
      const searches = events.filter(e => e.type === 'search');
      const terms = {};
      searches.forEach(e => {
        const query = e.data.query?.toLowerCase().trim();
        if (query) terms[query] = (terms[query] || 0) + 1;
      });
      return Object.entries(terms).sort((a, b) => b[1] - a[1]).slice(0, 10);
    }

    extractPopularClicks(events) {
      const clicks = events.filter(e => e.type === 'click');
      const elements = {};
      clicks.forEach(e => {
        const key = e.data.section + '::' + e.data.text?.substring(0, 30);
        elements[key] = (elements[key] || 0) + 1;
      });
      return Object.entries(elements).sort((a, b) => b[1] - a[1]).slice(0, 10);
    }

    extractDropOffs(events) {
      const sessions = {};
      events.forEach(e => {
        if (!sessions[e.session_id]) sessions[e.session_id] = [];
        sessions[e.session_id].push(e);
      });

      const shortSessions = Object.values(sessions).filter(session => {
        const times = session.map(e => new Date(e.timestamp).getTime());
        return Math.max(...times) - Math.min(...times) < 15000;
      });

      const lastSections = {};
      shortSessions.forEach(session => {
        const last = session[session.length - 1];
        const section = last?.data?.section || 'unknown';
        lastSections[section] = (lastSections[section] || 0) + 1;
      });

      return Object.entries(lastSections).sort((a, b) => b[1] - a[1]).slice(0, 5);
    }

    extractEngagingSections(events) {
      const scrolls = events.filter(e => e.type === 'scroll_depth');
      const deep = scrolls.filter(e => e.data.percent >= 75);
      const sections = {};
      deep.forEach(e => {
        const lastClick = events
          .filter(ev => ev.type === 'click' && new Date(ev.timestamp) <= new Date(e.timestamp))
          .pop();
        const section = lastClick?.data?.section || 'page_body';
        sections[section] = (sections[section] || 0) + 1;
      });
      return Object.entries(sections).sort((a, b) => b[1] - a[1]).slice(0, 5);
    }

    extractConversionPaths(events) {
      const forms = events.filter(e => e.type === 'form_submit');
      return forms.map(form => {
        const sessionEvents = events.filter(e => e.session_id === form.session_id);
        const clicks = sessionEvents.filter(e => e.type === 'click');
        return {
          form: form.data.form_id,
          clicks_before: clicks.length,
          path: clicks.map(e => e.data.section),
          duration_seconds: Math.round(
            (new Date(form.timestamp).getTime() - new Date(sessionEvents[0].timestamp).getTime()) / 1000
          )
        };
      }).sort((a, b) => a.duration_seconds - b.duration_seconds).slice(0, 5);
    }

    extractCTAPerformance(events) {
      const visible = events.filter(e => e.type === 'cta_visible');
      const clicks = events.filter(e => e.type === 'click');
      
      const ctaMap = {};
      visible.forEach(e => {
        const key = e.data.id || e.data.text?.substring(0, 30) || 'unknown';
        ctaMap[key] = { views: (ctaMap[key]?.views || 0) + 1, clicks: 0 };
      });
      
      clicks.forEach(e => {
        const key = e.data.id || e.data.text?.substring(0, 30);
        if (ctaMap[key]) ctaMap[key].clicks++;
      });

      return Object.entries(ctaMap)
        .map(([key, val]) => ({ key, ...val, rate: val.views > 0 ? Math.round((val.clicks / val.views) * 100) : 0 }))
        .sort((a, b) => b.rate - a.rate);
    }

    getLocalEvents() {
      const key = 'agentic_events_' + this.siteId;
      try {
        return JSON.parse(localStorage.getItem(key) || '[]');
      } catch (e) { return []; }
    }

    // 3. AUTO-OPTIMIZE
    setupAutoOptimization() {
      setInterval(() => this.checkOptimizations(), 300000);
    }

    checkOptimizations() {
      if (!this.patterns) return;

      const opts = [];

      if (this.patterns.searchTerms.length > 0) {
        const top = this.patterns.searchTerms[0][0];
        opts.push({
          type: 'meta_title',
          action: 'update',
          value: this.generateOptimizedTitle(top),
          reason: `Top search: "${top}" (${this.patterns.searchTerms[0][1]}x)`
        });
      }

      if (this.patterns.engagingSections.length > 0) {
        const top = this.patterns.engagingSections[0][0];
        opts.push({
          type: 'content_priority',
          action: 'reorder',
          section: top,
          reason: `Most engaging: ${top}`
        });
      }

      if (this.patterns.dropOffPoints.length > 0) {
        const drop = this.patterns.dropOffPoints[0][0];
        opts.push({
          type: 'ux_fix',
          action: 'simplify',
          section: drop,
          reason: `Drop-off at: ${drop}`
        });
      }

      this.optimizations = opts;
      this.applyOptimizations(opts);
    }

    generateOptimizedTitle(topSearch) {
      const current = document.title;
      const capitalized = topSearch.charAt(0).toUpperCase() + topSearch.slice(1);
      if (!current.toLowerCase().includes(topSearch.toLowerCase())) {
        return `${current} | ${capitalized}`;
      }
      return current;
    }

    applyOptimizations(optimizations) {
      optimizations.forEach(opt => {
        switch(opt.type) {
          case 'meta_title':
            if (opt.action === 'update' && opt.value !== document.title) {
              document.title = opt.value;
              this.logOptimization('title_update', opt.reason);
            }
            break;
          case 'meta_description':
            const meta = document.querySelector('meta[name="description"]');
            if (meta && opt.value) {
              meta.content = opt.value;
              this.logOptimization('meta_update', opt.reason);
            }
            break;
          case 'content_priority':
            const section = document.getElementById(opt.section);
            if (section && section.parentElement && section.parentElement.firstChild !== section) {
              section.parentElement.insertBefore(section, section.parentElement.firstChild);
              this.logOptimization('reorder', opt.reason);
            }
            break;
          case 'ux_fix':
            const drop = document.getElementById(opt.section);
            if (drop) {
              drop.style.border = '2px dashed #ef4444';
              drop.setAttribute('data-needs-improvement', 'true');
              this.logOptimization('flag_section', opt.reason);
            }
            break;
        }
      });
      this.storeOptimizations(optimizations);
    }

    logOptimization(action, reason) {
      console.log(`[Agentic] ${action}: ${reason}`);
      this.sendToServer({
        type: 'optimization_applied',
        data: { action, reason },
        timestamp: new Date().toISOString()
      });
    }

    storeOptimizations(optimizations) {
      const key = 'agentic_optimizations_' + this.siteId;
      try {
        const history = JSON.parse(localStorage.getItem(key) || '[]');
        history.push({ timestamp: new Date().toISOString(), optimizations });
        localStorage.setItem(key, JSON.stringify(history.slice(-50)));
      } catch (e) {}
    }

    // 4. APPLY CONFIG RULES
    applyInitialOptimizations() {
      if (!this.config?.rules) return;
      
      this.config.rules.forEach(rule => {
        if (rule.condition.includes('search_contains') && window.location.search) {
          const params = new URLSearchParams(window.location.search);
          const query = params.get('q') || params.get('search') || '';
          const keywords = rule.condition.match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, '')) || [];
          if (keywords.some(kw => query.toLowerCase().includes(kw.toLowerCase()))) {
            this.executeRuleAction(rule.action);
          }
        }
      });
    }

    executeRuleAction(action) {
      const ctaMatch = action.match(/update_cta_to:\s*"([^"]+)"/);
      if (ctaMatch) {
        const text = ctaMatch[1];
        document.querySelectorAll('[data-track="cta"], .cta-button, button[class*="cta"]').forEach(btn => {
          const icon = btn.querySelector('svg, i, img');
          btn.innerHTML = icon ? `${icon.outerHTML} ${text}` : text;
        });
        this.logOptimization('cta_update', `CTA: ${text}`);
      }

      const headlineMatch = action.match(/update_headline_to:\s*"([^"]+)"/);
      if (headlineMatch) {
        const h = headlineMatch[1];
        const hero = document.querySelector('h1, .hero-title, [class*="hero"] h1');
        if (hero) hero.innerHTML = h;
        this.logOptimization('headline', `Headline: ${h}`);
      }
    }

    // 5. DASHBOARD DATA
    getDashboard() {
      const events = this.getLocalEvents();
      return {
        site_id: this.siteId,
        patterns: this.patterns,
        optimizations: this.optimizations,
        recent_events: events.slice(-20),
        stats: {
          total_events: events.length,
          unique_sessions: new Set(events.map(e => e.session_id)).size,
          avg_session_duration: this.calculateAvgSession(),
          top_search: this.patterns?.searchTerms?.[0]?.[0] || 'N/A',
          top_section: this.patterns?.engagingSections?.[0]?.[0] || 'N/A',
          top_cta: this.patterns?.ctaPerformance?.[0] || null,
          last_updated: new Date().toISOString()
        }
      };
    }

    calculateAvgSession() {
      const events = this.getLocalEvents();
      const sessions = {};
      events.forEach(e => {
        if (!sessions[e.session_id]) sessions[e.session_id] = { start: Infinity, end: 0 };
        const t = new Date(e.timestamp).getTime();
        sessions[e.session_id].start = Math.min(sessions[e.session_id].start, t);
        sessions[e.session_id].end = Math.max(sessions[e.session_id].end, t);
      });
      const durations = Object.values(sessions).map(s => (s.end - s.start) / 1000);
      return durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;
    }
  }

  window.AgenticWebsite = AgenticWebsite;
})();
