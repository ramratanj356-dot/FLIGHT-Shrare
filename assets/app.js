/* ============================================================
   FLIGHT — interactions
   Vanilla JS, no dependencies. Demo persistence via localStorage.
   ============================================================ */
(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

  /* ---------------- NAV ---------------- */
  const nav = $('#nav');
  const burger = $('#burger');
  const mobileMenu = $('#mobileMenu');

  const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const closeMenu = () => {
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
  };
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    mobileMenu.hidden = open;
  });
  $$('#mobileMenu a').forEach((a) => a.addEventListener('click', closeMenu));

  /* ---------------- REVEAL ON SCROLL ---------------- */
  const revealables = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = `${Math.min(i, 4) * 70}ms`;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------------- STAT COUNTERS ---------------- */
  const animateCount = (el) => {
    const target = Number(el.dataset.count || 0);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const text = el.dataset.text;
    if (!target) {
      el.textContent = text || `${prefix}0${suffix}`;
      return;
    }
    const duration = 1300;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased).toLocaleString('en-IN') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        animateCount(e.target);
        cio.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------------- TABS ---------------- */
  $$('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const key = tab.dataset.tab;
      $('#panel-pilot').hidden = key !== 'pilot';
      $('#panel-traveller').hidden = key !== 'traveller';
    });
  });

  /* ---------------- EMPTY-LEG BOARD ---------------- */
  const legs = [
    { from: 'DEL', fc: 'Delhi', to: 'BOM', tc: 'Mumbai', date: '26 Oct', time: '16:20', aircraft: 'Citation XLS+', seats: 5, total: 8, price: 34000, full: 145000 },
    { from: 'BOM', fc: 'Mumbai', to: 'GOI', tc: 'Goa', date: '27 Oct', time: '09:10', aircraft: 'Phenom 300', seats: 4, total: 6, price: 22500, full: 78000 },
    { from: 'BLR', fc: 'Bengaluru', to: 'HYD', tc: 'Hyderabad', date: '28 Oct', time: '07:45', aircraft: 'King Air 250', seats: 6, total: 8, price: 18000, full: 52000 },
    { from: 'DEL', fc: 'Delhi', to: 'JAI', tc: 'Jaipur', date: '29 Oct', time: '11:30', aircraft: 'Citation CJ3+', seats: 3, total: 6, price: 16000, full: 46000 },
    { from: 'PNQ', fc: 'Pune', to: 'DEL', tc: 'Delhi', date: '30 Oct', time: '14:00', aircraft: 'Hawker 800XP', seats: 6, total: 8, price: 31000, full: 120000 },
    { from: 'HYD', fc: 'Hyderabad', to: 'GOI', tc: 'Goa', date: '31 Oct', time: '17:15', aircraft: 'Phenom 100', seats: 3, total: 4, price: 19500, full: 62000 },
    { from: 'BOM', fc: 'Mumbai', to: 'AMD', tc: 'Ahmedabad', date: '01 Nov', time: '08:00', aircraft: 'King Air C90', seats: 5, total: 6, price: 14500, full: 41000 },
    { from: 'BLR', fc: 'Bengaluru', to: 'COK', tc: 'Kochi', date: '02 Nov', time: '10:40', aircraft: 'Citation Mustang', seats: 4, total: 4, price: 21000, full: 68000 }
  ];

  const boardList = $('#boardList');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const renderBoard = (filter = 'all') => {
    const shown = legs.filter((l) => filter === 'all' || l.from === filter || l.to === filter);
    if (!shown.length) {
      boardList.innerHTML = '<p class="board__empty">No legs on that route right now — join the list and we will ping you.</p>';
      return;
    }
    boardList.innerHTML = `
      <div class="board__head" aria-hidden="true">
        <span>Route</span><span>Departs</span><span>Aircraft</span>
        <span>Seats</span><span>Per seat</span><span>Save</span><span></span>
      </div>
      ${shown.map((l) => {
        const save = Math.round((1 - l.price / l.full) * 100);
        return `
        <div class="row">
          <div class="route">
            <div>
              <span class="route__code">${esc(l.from)}</span>
              <span class="route__city">${esc(l.fc)}</span>
            </div>
            <span class="route__line" aria-hidden="true"></span>
            <div>
              <span class="route__code">${esc(l.to)}</span>
              <span class="route__city">${esc(l.tc)}</span>
            </div>
          </div>
          <div class="row__cell">${esc(l.date)} · ${esc(l.time)}<small>IST · 1h 45m</small></div>
          <div class="row__cell">${esc(l.aircraft)}<small>Private · jet</small></div>
          <div class="row__cell">${l.seats} left<small>of ${l.total}</small></div>
          <div class="row__price">${inr(l.price)}<small>${inr(l.full)}</small></div>
          <div class="row__save">−${save}%</div>
          <button class="row__btn" type="button"
            data-route="${esc(l.from)} → ${esc(l.to)}"
            data-detail="${esc(l.aircraft)} · ${esc(l.date)} at ${esc(l.time)} · ${inr(l.price)} per seat">
            Hold a seat
          </button>
        </div>`;
      }).join('')}
    `;
    $$('.row__btn', boardList).forEach((btn) => {
      btn.addEventListener('click', () => openModal(btn.dataset.route, btn.dataset.detail));
    });
  };

  $$('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      $$('.chip').forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      renderBoard(chip.dataset.filter);
    });
  });
  renderBoard();

  /* ---------------- EARNINGS CALCULATOR ---------------- */
  const els = {
    legs: $('#legs'), seats: $('#seats'), fare: $('#fare'), fill: $('#fill'),
    legsOut: $('#legsOut'), seatsOut: $('#seatsOut'), fareOut: $('#fareOut'), fillOut: $('#fillOut'),
    revMonth: $('#revMonth'), seatsSold: $('#seatsSold'), gross: $('#gross'),
    fee: $('#fee'), netYear: $('#netYear')
  };

  const recalc = () => {
    const legsN = +els.legs.value;
    const seatsN = +els.seats.value;
    const fareN = +els.fare.value;
    const fillN = +els.fill.value;

    els.legsOut.textContent = legsN;
    els.seatsOut.textContent = seatsN;
    els.fareOut.textContent = inr(fareN);
    els.fillOut.textContent = fillN + '%';

    const sold = Math.round(legsN * seatsN * (fillN / 100));
    const gross = sold * fareN;
    const fee = gross * 0.08;
    const net = gross - fee;

    els.seatsSold.textContent = sold.toLocaleString('en-IN');
    els.gross.textContent = inr(gross);
    els.fee.textContent = '− ' + inr(fee);
    els.revMonth.textContent = inr(net);
    els.netYear.textContent = inr(net * 12);

    els.revMonth.classList.remove('is-pop');
    void els.revMonth.offsetWidth;
    els.revMonth.classList.add('is-pop');
  };

  ['legs', 'seats', 'fare', 'fill'].forEach((k) => {
    els[k].addEventListener('input', recalc);
  });
  recalc();

  /* ---------------- STORAGE HELPERS ---------------- */
  const store = (key) => {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
  };
  const save = (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch { return false; }
  };

  /* ---------------- TOAST ---------------- */
  const toastEl = $('#toast');
  let toastTimer;
  const toast = (msg) => {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 3200);
  };

  /* ---------------- MODAL ---------------- */
  const modal = $('#modal');
  const modalRoute = $('#modalRoute');
  const modalSub = $('#modalSub');
  const seatForm = $('#seatForm');
  const seatSuccess = $('#seatSuccess');
  const seatSuccessMsg = $('#seatSuccessMsg');
  const seatError = $('#seatError');
  let lastFocused = null;
  let currentRoute = '';

  function openModal(route, detail) {
    lastFocused = document.activeElement;
    currentRoute = route;
    modalRoute.textContent = route;
    modalSub.textContent = detail;
    seatForm.hidden = false;
    seatSuccess.hidden = true;
    seatError.hidden = true;
    seatForm.reset();
    modal.hidden = false;
    document.body.classList.add('is-locked');
    setTimeout(() => $('#sName').focus(), 60);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocused) lastFocused.focus();
  }

  $$('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  seatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#sName').value.trim();
    const contact = $('#sContact').value.trim();
    const seats = $('#sSeats').value;
    if (!name || !contact) {
      seatError.textContent = 'Add your name and a way to reach you.';
      seatError.hidden = false;
      (!name ? $('#sName') : $('#sContact')).focus();
      return;
    }
    const requests = store('flight_requests');
    requests.push({ route: currentRoute, name, contact, seats, at: new Date().toISOString() });
    save('flight_requests', requests);
    seatError.hidden = true;
    seatForm.hidden = true;
    seatSuccess.hidden = false;
    seatSuccessMsg.textContent = `${name}, your request for ${seats} seat${seats > 1 ? 's' : ''} on ${currentRoute} is saved on this device. We will confirm availability at launch.`;
  });

  /* ---------------- WAITLIST ---------------- */
  const waitlistForm = $('#waitlistForm');
  const waitlistSuccess = $('#waitlistSuccess');
  const successMsg = $('#successMsg');
  const formError = $('#formError');

  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#wName').value.trim();
    const contact = $('#wContact').value.trim();
    const role = (new FormData(waitlistForm).get('role') || 'Operator').toString();
    const consent = $('#wConsent').checked;

    const problems = [];
    if (!name) problems.push('name');
    if (!contact) problems.push('contact');
    if (!consent) problems.push('consent');

    ['#wName', '#wContact'].forEach((sel) => $(sel).removeAttribute('aria-invalid'));

    if (problems.length) {
      formError.textContent = !consent
        ? 'Please tick the consent box so we can email you.'
        : 'Please add your name and contact.';
      formError.hidden = false;
      if (!name) $('#wName').setAttribute('aria-invalid', 'true');
      if (!contact) $('#wContact').setAttribute('aria-invalid', 'true');
      return;
    }

    const list = store('flight_waitlist');
    list.push({
      name, contact, role,
      base: $('#wBase').value,
      legs: $('#wLegs').value,
      at: new Date().toISOString()
    });
    const ok = save('flight_waitlist', list);

    formError.hidden = true;
    waitlistForm.hidden = true;
    waitlistSuccess.hidden = false;
    successMsg.textContent = ok
      ? `${name}, you're #${list.length} on this device's list as ${role.toLowerCase()}. Founding members keep the lower success fee for 12 months.`
      : `${name}, add this site to a real backend to store your spot — this browser blocked local storage.`;
    toast('Added to the founding list');
  });

  $('#addAnother').addEventListener('click', () => {
    waitlistForm.reset();
    waitlistForm.hidden = false;
    waitlistSuccess.hidden = true;
    $('#wName').focus();
  });

  /* ---------------- ACTIVE NAV HIGHLIGHT ---------------- */
  const sections = ['problem', 'how', 'board', 'earnings', 'pricing']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$('.nav__links a').forEach((a) => {
          const active = a.getAttribute('href') === '#' + entry.target.id;
          a.style.color = active ? 'var(--text)' : '';
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => sio.observe(s));
  }
})();
