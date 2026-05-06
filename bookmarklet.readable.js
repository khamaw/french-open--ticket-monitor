javascript:(function(){
  if(document.getElementById('rg-api-root')) return;

  // Roland Garros (french open) Resale Ticket Monitor
  // Watches the official RG ticket API for availability on a target date.
  // Fires an audio alert and highlights buy links the instant tickets appear.
  // Requires a human to click — no auto-purchase.
  // Run this bookmarklet on each tab you want to monitor independently.
  // Built in one day using AI as a build partner. MIT License. github.com/[yourusername]/rg-ticket-monitor

  const BASE_URL = 'https://tickets.rolandgarros.com/api/v2/en/ticket/calendar/offers-grouped-by-sorted-offer-type/';
  const TARGET_DATE = '2026-05-24';
  const TARGET_LABEL = 'Sun 24 May';

  let scanCount = 0;
  let foundTickets = {};
  let alertInterval = null;

  function playAlert() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [[600,0],[900,0.22],[1200,0.44],[900,0.66],[600,0.88]].forEach(([freq, t]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = freq;
        o.type = 'triangle';
        g.gain.setValueAtTime(0.7, ctx.currentTime + t);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.38);
        o.start(ctx.currentTime + t);
        o.stop(ctx.currentTime + t + 0.40);
      });
    } catch(e) {}
  }

  // UI omitted for readability — see bookmarklet.js for full minified version

  async function scanAll() {
    scanCount++;
    try {
      const res = await fetch(BASE_URL + TARGET_DATE, { credentials: 'include' });
      const data = await res.json();

      let newFound = false;

      for (const group of data) {
        for (const offer of group.offers || []) {
          if (offer.isAvailable === true) {
            const key = TARGET_DATE + '_' + offer.offerType + '_' + offer.title;
            if (!foundTickets[key]) {
              foundTickets[key] = { date: TARGET_DATE, label: TARGET_LABEL, type: offer.offerType, title: offer.title };
              newFound = true;
            }
          }
        }
        for (const premGroup of group.premiumOffers || []) {
          for (const offer of premGroup.offers || []) {
            if (offer.isAvailable === true) {
              const key = TARGET_DATE + '_PREMIUM_' + offer.title;
              if (!foundTickets[key]) {
                foundTickets[key] = { date: TARGET_DATE, label: TARGET_LABEL, type: 'PREMIUM', title: offer.title };
                newFound = true;
              }
            }
          }
        }
      }

      if (newFound) {
        playAlert();
        setTimeout(playAlert, 700);
        setTimeout(playAlert, 1400);
        // Alert interval and UI rendering in full version
      }

    } catch(e) {}

    // Randomized jitter prevents detection as bot traffic
    setTimeout(scanAll, 3000 + Math.random() * 3000);
  }

  scanAll();
})();
