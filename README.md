# french-open--ticket-monitor

A JavaScript bookmarklet that watches Roland Garros resale ticket 
availability in real time — because 2 seconds is faster than any 
human refresh.

## The Problem

Official Roland Garros resale tickets appear and disappear in under 
2 seconds. Manual refreshing is structurally useless. Tools like 
Distill poll on intervals — their fastest is 5 seconds, which loses 
every drop.

## The Solution

Rather than watching the DOM for button state changes, this tool hits 
the Roland Garros ticket API directly — cutting out the UI layer 
entirely and going straight to the data source. Scans run on a 
randomized 3-6 second jitter interval so the requests don't pattern 
like bot traffic.

When a ticket becomes available the tool fires a triple audio alert, 
highlights the buy link, and flashes the tab title. A human still has 
to click.

- Hits the official RG ticket API directly
- Randomized scan interval — 3 to 6 seconds
- Triple audio alert on availability
- Buy link surfaces instantly
- No auto-purchase, no bot behavior

## How It Works

The bookmarklet calls the Roland Garros ticket calendar API on a 
randomized interval. The API returns availability status for all 
offer types — standard and premium — for the target date. The moment 
`isAvailable` flips to true for any offer, the alert fires.

Randomized jitter on the interval prevents the scan pattern from 
looking like automated traffic.

## Why a Bookmarklet

The original approach used Tampermonkey with a MutationObserver 
watching for DOM state changes. The site's Content Security Policy 
blocked external script injection entirely. A bookmarklet runs in 
the page's own JavaScript context — same origin, same permissions 
— so CSP can't stop it.

Once inside the page context, hitting the API directly proved cleaner 
than watching the DOM — fewer failure points, faster signal.

## Files

`bookmarklet.js` — the installable single-line version. This is what 
you actually add to your browser.

`bookmarklet.readable.js` — the annotated readable version. This is 
what you read to understand what it does.

## Installation

1. Copy the code from `bookmarklet.js`
2. Create a new bookmark in your browser
3. Paste the code as the URL
4. Navigate to the Roland Garros resale page
5. Click the bookmarklet to activate

## Usage

Open one tab per date you want to monitor. Click the bookmarklet on 
each tab. A green status panel confirms the watcher is active. When 
a ticket becomes available the audio alert fires and a buy link 
appears instantly.

## Disclaimer

Built for personal use to solve a specific timing problem. Requires 
manual interaction to complete any purchase. No automated buying, 
no bot behavior.

## License

MIT
