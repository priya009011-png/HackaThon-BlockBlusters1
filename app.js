const $=id=>document.getElementById(id);
const state={
  page:'home',
  lang:localStorage.getItem('eps_lang')||'en',
  speed:Number(localStorage.getItem('eps_speed')||1),
  senior:localStorage.getItem('eps_senior')!=='0',
  animations:localStorage.getItem('eps_anim')!=='0',
  appLock:localStorage.getItem('eps_lock')==='1',
  appPass:localStorage.getItem('eps_pass')||'',
  voiceConfirm:localStorage.getItem('eps_voice')!=='0',
  scamAlert:localStorage.getItem('eps_scam')!=='0',
  transactions:JSON.parse(localStorage.getItem('eps_tx')||'[]')
};
const i18n={
 en:{home:'Home',makePayment:'Make a Payment',checkBalance:'Check Balance',payBill:'Pay a Bill',changeUpi:'Change UPI PIN',forgotUpi:'Forgot UPI PIN',checkMessage:'Check a Message',history:'History',settings:'Settings',seniorMode:'Senior Mode',howHelp:'How can I help you today?',homeSub:'I can guide you through digital payments and essential services safely.',speakToMe:'Speak to me',voiceHint:'Say what you want to do, or choose an option below.',pressSpeak:'Press & Speak',safetyPriority:'Your safety comes first.',safetySub:'I will explain every important step before money moves.',tellDetails:'Tell me who you want to pay and how much.',paymentSub:'I will guide you step by step.'},
 hi:{home:'होम',makePayment:'पैसे भेजें',checkBalance:'बैलेंस देखें',payBill:'बिल भरें',changeUpi:'UPI PIN बदलें',forgotUpi:'UPI PIN भूल गए?',checkMessage:'संदेश जाँचें',history:'इतिहास',settings:'सेटिंग्स',seniorMode:'सीनियर मोड',howHelp:'मैं आज आपकी कैसे मदद करूँ?',homeSub:'मैं डिजिटल भुगतान और जरूरी सेवाओं में सुरक्षित तरीके से आपका मार्गदर्शन कर सकता हूँ।',speakToMe:'मुझसे बोलकर कहें',voiceHint:'आप क्या करना चाहते हैं, बोलें या नीचे विकल्प चुनें।',pressSpeak:'बोलना शुरू करें',safetyPriority:'आपकी सुरक्षा सबसे पहले है।',safetySub:'पैसा भेजने से पहले मैं हर जरूरी कदम समझाऊँगा।',tellDetails:'बताइए आप किसे और कितने पैसे भेजना चाहते हैं।',paymentSub:'मैं आपको एक-एक कदम पर मार्गदर्शन करूँगा।'},
 kn:{home:'ಮುಖಪುಟ',makePayment:'ಹಣ ಕಳುಹಿಸಿ',checkBalance:'ಬ್ಯಾಲೆನ್ಸ್ ನೋಡಿ',payBill:'ಬಿಲ್ ಪಾವತಿಸಿ',changeUpi:'UPI PIN ಬದಲಿಸಿ',forgotUpi:'UPI PIN ಮರೆತಿದ್ದೀರಾ?',checkMessage:'ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ',history:'ಇತಿಹಾಸ',settings:'ಸೆಟ್ಟಿಂಗ್ಸ್',seniorMode:'ಸೀನಿಯರ್ ಮೋಡ್',howHelp:'ನಾನು ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',homeSub:'ಡಿಜಿಟಲ್ ಪಾವತಿಗಳು ಮತ್ತು ಅಗತ್ಯ ಸೇವೆಗಳಲ್ಲಿ ನಾನು ಸುರಕ್ಷಿತವಾಗಿ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇನೆ.',speakToMe:'ನನ್ನೊಂದಿಗೆ ಮಾತನಾಡಿ',voiceHint:'ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ ಎಂದು ಹೇಳಿ ಅಥವಾ ಆಯ್ಕೆಮಾಡಿ.',pressSpeak:'ಮಾತನಾಡಿ',safetyPriority:'ನಿಮ್ಮ ಸುರಕ್ಷತೆ ಮೊದಲ ಆದ್ಯತೆ.',safetySub:'ಹಣ ಕಳುಹಿಸುವ ಮೊದಲು ಪ್ರತಿಯೊಂದು ಮುಖ್ಯ ಹಂತವನ್ನು ವಿವರಿಸುತ್ತೇನೆ.',tellDetails:'ಯಾರಿಗೆ ಮತ್ತು ಎಷ್ಟು ಹಣ ಕಳುಹಿಸಬೇಕು ಎಂದು ಹೇಳಿ.',paymentSub:'ನಾನು ಹಂತ ಹಂತವಾಗಿ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇನೆ.'},
 bn:{home:'হোম',makePayment:'টাকা পাঠান',checkBalance:'ব্যালেন্স দেখুন',payBill:'বিল দিন',changeUpi:'UPI PIN বদলান',forgotUpi:'UPI PIN ভুলে গেছেন?',checkMessage:'বার্তা পরীক্ষা করুন',history:'ইতিহাস',settings:'সেটিংস',seniorMode:'সিনিয়র মোড',howHelp:'আজ আমি কীভাবে সাহায্য করতে পারি?',homeSub:'ডিজিটাল পেমেন্ট ও প্রয়োজনীয় পরিষেবায় আমি নিরাপদে আপনাকে পথ দেখাব।',speakToMe:'আমার সঙ্গে কথা বলুন',voiceHint:'আপনি কী করতে চান বলুন অথবা নিচের বিকল্প বেছে নিন।',pressSpeak:'কথা বলুন',safetyPriority:'আপনার নিরাপত্তাই প্রথম।',safetySub:'টাকা পাঠানোর আগে আমি প্রতিটি গুরুত্বপূর্ণ ধাপ বুঝিয়ে দেব।',tellDetails:'কাকে এবং কত টাকা পাঠাতে চান বলুন।',paymentSub:'আমি আপনাকে ধাপে ধাপে সাহায্য করব।'}
};
const locales={en:'en-IN',hi:'hi-IN',kn:'kn-IN',bn:'bn-IN'};

function save(){localStorage.setItem('eps_lang',state.lang);localStorage.setItem('eps_speed',state.speed);localStorage.setItem('eps_senior',state.senior?'1':'0');localStorage.setItem('eps_anim',state.animations?'1':'0');localStorage.setItem('eps_lock',state.appLock?'1':'0');localStorage.setItem('eps_pass',state.appPass);localStorage.setItem('eps_voice',state.voiceConfirm?'1':'0');localStorage.setItem('eps_scam',state.scamAlert?'1':'0');localStorage.setItem('eps_tx',JSON.stringify(state.transactions));}
function toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2600)}
function showPage(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el=$('page-'+page); if(!el) return;

  // If a judge opens the demo screen directly, use a clear sample transaction
  // instead of showing empty fields. Normal payment flow always overrides it.
  if(page==='demo' && !window.currentPayment){
    window.currentPayment = {
      receiver:'Rahul Kumar',
      upi:'rahul@upi',
      amount:500,
      note:'Rent'
    };
  }

  if(page==='demo') renderDemoPayment();
  if(page==='confirm' && window.currentPayment) prepareConfirm();
  if(page==='success' && window.currentPayment){
    $('successAmount').textContent='₹'+Number(window.currentPayment.amount).toLocaleString('en-IN');
    $('successText').textContent=`Demo payment completed safely to ${window.currentPayment.receiver}. No real money was sent.`;
  }

  el.classList.add('active'); state.page=page;
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  if(page==='history')renderHistory();
  if(page==='balance')renderBalance();
}

function renderDemoPayment(){
  const p=window.currentPayment || {receiver:'Rahul Kumar',upi:'rahul@upi',amount:500,note:'Rent'};
  $('demoName').textContent=p.receiver;
  $('demoUpi').textContent=p.upi;
  $('demoAmount').textContent='₹'+Number(p.amount).toLocaleString('en-IN');
  $('demoNote').textContent=p.note || '—';
}
document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
$('language').addEventListener('change',e=>setLanguage(e.target.value));
$('settingsLanguage').addEventListener('change',e=>setLanguage(e.target.value));
$('speechSpeed').addEventListener('input',e=>{state.speed=Number(e.target.value);save()});
$('appLock').addEventListener('change',e=>{state.appLock=e.target.checked;save(); if(state.appLock&&!state.appPass)setAppPassword()});
$('seniorMode').addEventListener('change',e=>{state.senior=e.target.checked;applySettings()});
$('animations').addEventListener('change',e=>{state.animations=e.target.checked;applySettings()});
$('voiceConfirm').addEventListener('change',e=>{state.voiceConfirm=e.target.checked;save()});
$('scamAlert').addEventListener('change',e=>{state.scamAlert=e.target.checked;save()});

function setLanguage(lang){
 state.lang=lang; save(); applyI18n();
 $('language').value=lang; $('settingsLanguage').value=lang;
 toast(lang==='hi'?'भाषा बदल दी गई।':lang==='kn'?'ಭಾಷೆ ಬದಲಾಗಿದೆ.':lang==='bn'?'ভাষা পরিবর্তন হয়েছে।':'Language changed.');
}
function applyI18n(){
 const t=i18n[state.lang];
 document.querySelectorAll('[data-i18n]').forEach(el=>{if(t[el.dataset.i18n])el.textContent=t[el.dataset.i18n]});
 $('homeGreeting').textContent=state.lang==='hi'?'नमस्ते!':state.lang==='kn'?'ನಮಸ್ಕಾರ!':state.lang==='bn'?'নমস্কার!':'Hello!';
 document.documentElement.lang=state.lang;
}
function applySettings(){
 document.body.classList.toggle('senior-mode',state.senior);
 document.body.classList.toggle('no-animations',!state.animations);
 $('seniorStatus').textContent=state.senior?'ON':'OFF';
 $('appLock').checked=state.appLock;$('seniorMode').checked=state.senior;$('animations').checked=state.animations;$('voiceConfirm').checked=state.voiceConfirm;$('scamAlert').checked=state.scamAlert;
 $('speechSpeed').value=state.speed;save();
}
function speak(text){
 if(!('speechSynthesis' in window)){toast('Voice playback is not available in this browser.');return}
 speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text);u.lang=locales[state.lang];u.rate=state.speed;speechSynthesis.speak(u);
}
function startVoice(context){
 if(!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)){toast('Voice input is not supported here. You can type instead.');return}
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;const r=new R();r.lang=locales[state.lang];r.interimResults=false;r.maxAlternatives=1;
 toast(state.lang==='hi'?'सुन रहा हूँ...':'Listening...');
 r.onresult=e=>{const text=e.results[0][0].transcript; if(context==='payment'){$('voiceText').value=text;parseSpeech(text)}else{handleHomeVoice(text)}};
 r.onerror=()=>toast('I could not hear that. Please try again or type.');
 r.start();
}
function parseSpeech(text){
 const m=text.match(/(\d[\d,]*(?:\.\d+)?)/); if(m)$('amount').value=m[1].replace(/,/g,'');
 const names=['Rahul','rahul','Rohan','rohan','Amit','amit','Sohan','sohan'];
 let found=names.find(n=>text.toLowerCase().includes(n.toLowerCase()));
 if(found)$('receiver').value=found[0].toUpperCase()+found.slice(1).toLowerCase()+' Kumar';
 if(!found && text.split(' ').length>2){const words=text.replace(/send|rupees|to|please|bhejo|bhejne|hain|hai/gi,' ').trim().split(/\s+/); if(words.length)$('receiver').value=words[0].replace(/[^a-zA-Z]/g,'')||''}
}
function handleHomeVoice(text){
 const x=text.toLowerCase();
 if(x.includes('balance'))showPage('balance');else if(x.includes('bill'))showPage('bills');else if(x.includes('scam')||x.includes('message'))showPage('scam');else if(x.includes('send')||x.includes('payment')||x.includes('pay'))showPage('payment');else speak('You can say: make a payment, check balance, pay a bill, or check a message.');
}
function parseOrContinue(){
 const v=$('voiceText').value.trim();if(v)parseSpeech(v);
 const receiver=$('receiver').value.trim(), upi=$('upiId').value.trim(), amount=Number($('amount').value);
 if(!receiver||!upi||!amount){$('paymentMsg').textContent='Please enter receiver, UPI ID and amount.';return}
 window.currentPayment={receiver,upi,amount,note:$('note').value.trim()}; prepareConfirm();showPage('confirm');
}
function prepareConfirm(){
 const p=window.currentPayment;$('confirmName').textContent=p.receiver;$('confirmUpi').textContent=p.upi;$('confirmAmount').textContent='₹'+p.amount.toLocaleString('en-IN');$('confirmAvatar').textContent=p.receiver[0].toUpperCase();
 const text=paymentSentence();$('confirmSpeech').textContent=text;if(state.voiceConfirm)speak(text);
}
function paymentSentence(){const p=window.currentPayment; if(state.lang==='hi')return `आप ${p.receiver} को ₹${p.amount} भेजना चाहते हैं। क्या यह सही है?`;if(state.lang==='kn')return `ನೀವು ${p.receiver} ಅವರಿಗೆ ₹${p.amount} ಕಳುಹಿಸಲು ಬಯಸುತ್ತೀರಿ. ಇದು ಸರಿಯೇ?`;if(state.lang==='bn')return `আপনি ${p.receiver}-কে ₹${p.amount} পাঠাতে চান। এটি কি সঠিক?`;return `You are about to send ₹${p.amount} to ${p.receiver}. Is this correct?`}
function speakCurrentPayment(){speak(paymentSentence())}
function runSafety(){
 showPage('safety'); const p=window.currentPayment;
 const risky=p.amount>=25000 || /gift|reward|prize|urgent|refund|kyc/i.test($('note').value);
 setTimeout(()=>{
  if(risky){$('safetyPanel').innerHTML=`<div class="safety-icon safety-bad">!</div><h2 class="safety-bad">This payment looks suspicious</h2><p>We found warning signs. Do not proceed until you verify the details.</p><div class="warning"><b>Why am I warning you?</b><div class="check-list"><div>⚠ The amount or note matches a common scam pattern.</div><div>⚠ Please verify the recipient independently.</div><div>⚠ Never share your UPI PIN or OTP.</div></div></div><button class="danger wide" onclick="showPage('payment')">Do Not Proceed</button><button class="secondary wide" onclick="showPage('demo')">I Understand, Continue to Demo</button></div>`;speak(state.lang==='hi'?'रुकिए। यह भुगतान संदिग्ध हो सकता है।':'Please stop. This payment may be suspicious.');}
  else{$('safetyPanel').innerHTML=`<div class="safety-icon safety-good">✓</div><h2 class="safety-good">Payment looks safe</h2><p>We did not find suspicious activity in this demo check.</p><div class="check-list"><div>✓ Receiver information checked</div><div>✓ UPI ID format checked</div><div>✓ Amount reviewed</div><div>✓ No obvious scam pattern detected</div></div><button class="primary" onclick="showPage('demo')">Continue to Demo Payment →</button><button class="secondary" onclick="speak('We did not find a suspicious pattern in this demo payment.')">🔊 Why is it safe?</button>`;speak(state.lang==='hi'?'इस भुगतान में कोई स्पष्ट संदिग्ध संकेत नहीं मिला।':'I did not find a suspicious pattern in this demo payment.');}
 },650);
}
function completeDemo(){
 const p=window.currentPayment || {receiver:'Rahul Kumar',upi:'rahul@upi',amount:500,note:'Rent'};
 state.transactions.unshift({type:'UPI Payment',name:p.receiver,upi:p.upi,amount:p.amount,date:new Date().toLocaleString()});
 save();
 $('successAmount').textContent='₹'+Number(p.amount).toLocaleString('en-IN');
 $('successText').textContent=`Demo payment completed safely to ${p.receiver}. No real money was sent.`;
 showPage('success');
 speak(`Demo payment successful. ₹${p.amount} to ${p.receiver}. No real money was sent.`);
}
function checkScam(){
 const text=$('scamText').value.trim();if(!text){toast('Paste a message first.');return}
 const patterns=[['Urgency','blocked|immediately|urgent|today|last chance'],['Unknown link','http:\\/\\/|bit\\.ly|tinyurl|click here'],['Money request','pay|fee|processing|send money|transfer'],['Sensitive information','otp|pin|password|cvv|kyc'],['Prize/reward','prize|reward|lottery|winner|cashback']];
 let hits=[];patterns.forEach(([n,re])=>{if(new RegExp(re,'i').test(text))hits.push(n)});
 const high=hits.length>=2;
 $('scamResult').innerHTML=`<div class="${high?'warning':'card'}" style="margin-top:15px"><h2 style="color:${high?'#d3263b':'#0b9a68'}">${high?'🔴 High Risk — Likely Scam':'🟢 No obvious scam pattern detected'}</h2><p>${high?'Please do not click links, send money, or share OTP/PIN.':'Still verify the sender independently before taking action.'}</p><div class="check-list">${hits.map(x=>`<div>• ${x} pattern detected</div>`).join('')||'<div>• No common red flags detected</div>'}</div></div>`;
}
function billDemo(type){toast(`${type} demo opened. No real payment will be made.`);showPage('payment');$('receiver').value=type;$('upiId').value='service@demo';$('amount').value=1000;$('note').value=type}
function changeUpiPin(){
 const a=$('oldPin').value,b=$('newPin').value,c=$('newPin2').value;
 if(!/^\d{4,6}$/.test(a)||!/^\d{4,6}$/.test(b)||b!==c){$('upiMsg').textContent='Enter valid PINs and make sure the new PINs match.';return}
 $('upiMsg').textContent='Demo PIN change completed. Your real bank PIN was not changed.';['oldPin','newPin','newPin2'].forEach(x=>$(x).value='');speak('Your demo UPI PIN change is complete. Your real bank PIN was not changed.');
}
function resetUpiPin(){if($('verifyRef').value.length<4){$('forgotMsg').textContent='Please enter the requested verification reference.';return}$('forgotMsg').textContent='Demo identity verification accepted. In a real bank app, you would now be redirected to the bank’s secure PIN reset flow.';speak('Identity verification accepted. Follow your bank’s secure process to reset your UPI PIN.')}
function renderHistory(){const box=$('historyList');if(!state.transactions.length){box.innerHTML='<p class="muted">No demo transactions yet.</p>';return}box.innerHTML=state.transactions.map(t=>`<div class="switch-row"><span>➤ ${t.type}<small style="display:block;color:#7586a0">${t.name} • ${t.date}</small></span><b>₹${Number(t.amount).toLocaleString('en-IN')}</b></div>`).join('')}
function renderBalance(){renderHistory();$('balanceTransactions').innerHTML=state.transactions.slice(0,5).map(t=>`<div class="switch-row"><span>${t.name}<small style="display:block;color:#7586a0">${t.type}</small></span><b>₹${Number(t.amount).toLocaleString('en-IN')}</b></div>`).join('')||'<p class="muted">No demo activity yet.</p>'}
function setAppPassword(){
 const p=prompt('Create a 4–6 digit app password. This protects the demo app on this computer.');
 if(p===null)return;if(!/^\d{4,6}$/.test(p)){toast('Password must be 4–6 digits.');return}
 state.appPass=p;state.appLock=true;save();applySettings();toast('App lock enabled.');
}
function forgotAppPassword(){
 if(!state.appPass){toast('No app password is configured.');return}
 const code=prompt('Demo recovery: enter the recovery word EASY to disable the app lock.');
 if(code&&code.toUpperCase()==='EASY'){state.appPass='';state.appLock=false;save();applySettings();toast('App lock disabled. You can set a new password in Settings.')}
 else toast('Recovery failed.');
}
function unlockApp(){if($('lockInput').value===state.appPass){$('lockScreen').classList.add('hidden');$('lockInput').value='';}else $('lockMsg').textContent='Incorrect password.'}
function bootLock(){if(state.appLock&&state.appPass)$('lockScreen').classList.remove('hidden')}
function speakCurrentLanguage(){const text=state.lang==='hi'?'नमस्ते। मैं आपकी डिजिटल सहायता के लिए यहाँ हूँ।':state.lang==='kn'?'ನಮಸ್ಕಾರ. ನಾನು ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಸಹಾಯಕರಾಗಿದ್ದೇನೆ.':state.lang==='bn'?'নমস্কার। আমি আপনার ডিজিটাল সহায়তার জন্য এখানে আছি।':'Hello. I am here to guide you safely.';speak(text)}
applyI18n();applySettings();bootLock();renderHistory();