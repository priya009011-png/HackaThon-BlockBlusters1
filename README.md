# EASY PAY – SAFE PAY
Hackathon prototype for Problem Statement 8: Guided Assistant for Older Adults.

## Run on Windows
1. Install Python 3 if it is not already installed.
2. Double-click `run.bat`.
3. Chrome/Edge will open the app at http://127.0.0.1:8765.

## Included working flows
- Desktop-style senior-friendly UI
- English / Hindi / Kannada / Bengali language switching
- Browser text-to-speech in the selected language
- Voice input where Chrome/Edge supports Speech Recognition, plus typing fallback
- Guided UPI demo payment flow
- Voice confirmation before payment
- Scam-pattern safety check before money moves
- Suspicious-payment warning with reasons
- Safe demo payment confirmation (no real money)
- Check demo balance
- Bill-payment demo
- Change UPI PIN demo
- Forgot UPI PIN demo recovery flow
- Check SMS/WhatsApp/email text for common scam patterns
- Local demo history
- Optional app lock/password
- Forgot app password recovery demo
- Senior Mode / larger UI
- Animation toggle
- LocalStorage persistence

## Safety note
This prototype never connects to a bank, never sends real money, and never stores a real UPI PIN. It is designed for a hackathon demonstration.


## v2 fixes
- Demo Payment fields are always populated.
- Direct navigation to Demo Payment uses a clearly labeled sample transaction.
- Payment data now carries reliably into confirmation, safety and success screens.
- Added an explicit “Demo only / no real money / no real UPI PIN” notice.


## v3 cache/port fix
- Runs on port 8770 so an older running server on 8765 cannot accidentally be opened.
- Disables browser caching for local development.
- Forces app.js?v=3 to load the latest payment-data fix.
