# french-open--ticket-monitor

A JavaScript bookmarklet that watches Roland Garros resale ticket 
availability in real time — because 2 seconds is faster than any 
human refresh.

## The Problem

Official Roland Garros (French Open) resale tickets appear and disappear in under 
2 seconds. Manual refreshing is structurally useless. Tools like 
Distill poll on intervals — their fastest is 5 seconds, which loses 
every drop.

## The Solution

A bookmarklet using a MutationObserver to watch for DOM state changes 
the instant a ticket button transitions from unavailable to priced. 
No polling. No page refresh. Near-zero latency.

- Watches multiple tabs simultaneously
- Fires a triple audio alert on availability
- Highlights the buy button instantly
- Requires a human to click — no auto-purchase

## How It Works

MutationObserver fires on the microtask queue the moment the DOM 
changes — not on a timer, not on a refresh. When the ticket button 
class changes state, the alert fires immediately.

An 800ms fallback timer handles edge cases where the observer 
misses a change due to SPA navigation.

## Why a Bookmarklet

The original approach used Tampermonkey. The site's Content Security 
Policy blocked external script injection entirely. A bookmarklet runs 
in the page's own JavaScript context — same origin, same permissions 
— so CSP can't stop it.

## Installation

1. Copy the bookmarklet code below
2. Create a new bookmark in your browser
3. Paste the code as the URL
4. Navigate to the Roland Garros resale page
5. Click the bookmarklet
6. Open additional tabs for each date and ticket category you want 
   to monitor

## Usage

Open one tab per date and ticket type you want to monitor. Click the 
bookmarklet on each tab. A green status indicator confirms the 
observer is active. When a ticket becomes available the audio alert 
fires and the buy button is highlighted.

## Disclaimer

Built for personal use to solve a specific timing problem. Requires 
manual interaction to complete any purchase. No automated buying, 
no bot behavior.

## License

MIT
