(function(){"use strict";var al=document.createElement("style");al.textContent=`:root{--timber-dark: #190f08;--timber-mid: #2a190e;--timber-grain: #3d2514;--brass: #c89b3c;--brass-bright: #e5be67;--brass-dark: #7a581b;--parchment-light: #f4e7c8;--parchment-mid: #e6d1a7;--parchment-edge: #c7a974;--ink-dark: #261509;--ink-sepia: #59381c;--ink-faded: #785230;--wax-red: #8b1e1e;--wax-red-bright: #a92626;--shadow-heavy: 0 16px 44px rgba(8, 4, 1, .72)}*{box-sizing:border-box;margin:0;padding:0;user-select:none;-webkit-user-select:none}html,body{width:100%;height:100%;overflow:hidden;background:#0d161e;font-family:IM Fell English,Georgia,Times New Roman,serif;color:var(--ink-dark)}#canvas-wrap{position:fixed;top:0;right:0;bottom:0;left:0}#webgl{width:100%;height:100%;display:block;cursor:grab}#webgl:active{cursor:grabbing}.label-layer{position:fixed;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:2}.corner-ornament{position:absolute;width:18px;height:18px;border-color:var(--brass-dark);pointer-events:none}.corner-ornament.tl{top:7px;left:7px;border-top:2px solid var(--ink-sepia);border-left:2px solid var(--ink-sepia)}.corner-ornament.tr{top:7px;right:7px;border-top:2px solid var(--ink-sepia);border-right:2px solid var(--ink-sepia)}.corner-ornament.bl{bottom:7px;left:7px;border-bottom:2px solid var(--ink-sepia);border-left:2px solid var(--ink-sepia)}.corner-ornament.br{bottom:7px;right:7px;border-bottom:2px solid var(--ink-sepia);border-right:2px solid var(--ink-sepia)}.loader{position:fixed;top:0;right:0;bottom:0;left:0;z-index:100;background:radial-gradient(circle at 50% 45%,#23160c,#0d0704);display:flex;align-items:center;justify-content:center;transition:opacity .65s ease,visibility .65s ease}.loader.fade-out{opacity:0;visibility:hidden}.loader-parchment{position:relative;text-align:center;padding:40px 54px;max-width:520px;background:radial-gradient(circle at 50% 40%,var(--parchment-light) 0%,var(--parchment-mid) 70%,var(--parchment-edge) 100%);border:3px double var(--ink-sepia);outline:4px solid var(--timber-mid);box-shadow:inset 0 0 40px #5f381273,0 24px 60px #000000d9;color:var(--ink-dark)}.loader-compass{margin-bottom:10px;animation:slowSpin 16s linear infinite}@keyframes slowSpin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.loader-kicker{font-family:IM Fell English SC,serif;font-size:11px;letter-spacing:.16em;color:var(--wax-red);margin-bottom:6px}.loader-parchment h1{font-family:Pirata One,Georgia,serif;font-weight:400;font-size:38px;letter-spacing:.03em;color:var(--ink-dark)}.loader-role{font-style:italic;color:var(--ink-sepia);font-size:15px;margin-top:4px}.loader-rule{height:2px;width:75%;margin:16px auto 12px;background:linear-gradient(90deg,transparent,var(--ink-sepia),var(--wax-red),var(--ink-sepia),transparent)}.loader-sub{font-family:IM Fell English SC,serif;font-size:13px;color:var(--ink-sepia)}.island-label{position:relative;background:linear-gradient(180deg,#f5e8cb,#dfc696);border:1.5px solid #4a2c11;outline:1px solid rgba(200,155,60,.45);box-shadow:inset 0 0 14px #6e441959,0 8px 18px #0a050099;padding:6px 14px 6px 16px;color:var(--ink-dark);cursor:pointer;transition:transform .2s ease,box-shadow .2s ease,opacity .25s ease;white-space:nowrap}.il-seal{position:absolute;left:-8px;top:50%;transform:translateY(-50%);width:15px;height:15px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#c43030,var(--cat, #8b1e1e) 75%);border:1.5px solid #3a1208;box-shadow:0 2px 5px #00000080}.island-label:hover,.island-label.is-near{transform:translateY(-2px) scale(1.06);border-color:var(--wax-red);box-shadow:inset 0 0 16px #8b1e1e40,0 10px 24px #000000bf}.il-kicker{font-family:IM Fell English SC,serif;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--cat, #8b1e1e);line-height:1}.il-title{font-family:Pirata One,Georgia,serif;font-size:16px;letter-spacing:.02em;color:var(--ink-dark);line-height:1.15;margin-top:1px}.il-sub{font-size:10.5px;font-style:italic;color:var(--ink-sepia)}#ui-root{position:fixed;top:0;right:0;bottom:0;left:0;pointer-events:none;z-index:10}.topbar{pointer-events:auto;position:absolute;top:12px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:9px 18px;background:radial-gradient(ellipse at 50% 0%,rgba(229,190,103,.14) 0%,transparent 65%),repeating-linear-gradient(90deg,rgba(255,255,255,.016) 0px,rgba(255,255,255,.016) 2px,transparent 2px,transparent 11px),linear-gradient(180deg,#321d0f,#1d1008 52%,#120904);border-top:2px solid var(--brass);border-bottom:2px solid var(--brass-dark);border-left:3px solid var(--brass);border-right:3px solid var(--brass);outline:2px solid #0b0502;box-shadow:inset 0 2px #ffe8af40,inset 0 -2px #000c,inset 0 0 28px #000c,0 18px 42px #000000c7;color:var(--parchment-light)}.topbar:before,.topbar:after{content:"";position:absolute;left:24px;right:24px;height:1px;pointer-events:none;background:linear-gradient(90deg,transparent 0%,rgba(200,155,60,.55) 15%,rgba(255,230,165,.85) 50%,rgba(200,155,60,.55) 85%,transparent 100%)}.topbar:before{top:3px}.topbar:after{bottom:3px;opacity:.55}.brass-rivet{position:absolute;width:7px;height:7px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff0b8,#b88628 65%,#3d2506);box-shadow:0 1px 2px #000000d9;pointer-events:none}.brass-rivet.tl{top:6px;left:6px}.brass-rivet.tr{top:6px;right:6px}.brass-rivet.bl{bottom:6px;left:6px}.brass-rivet.br{bottom:6px;right:6px}.brand{display:flex;align-items:center;gap:12px;cursor:pointer;padding-right:12px;border-right:1px solid rgba(200,155,60,.28)}.brand-emblem{position:relative;width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#3d2110,#160b04 80%);border:2px solid var(--brass);display:grid;place-items:center;box-shadow:inset 0 0 8px #000000d9,0 4px 12px #000000bf;transition:transform .25s ease,border-color .25s ease}.brand-emblem-ring{position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;border-radius:50%;border:1px dashed rgba(229,190,103,.55);pointer-events:none;transition:transform .6s ease}.brand:hover .brand-emblem{transform:scale(1.06);border-color:var(--brass-bright)}.brand:hover .brand-emblem-ring{transform:rotate(45deg)}.brand-kicker{font-family:Cinzel,serif;font-size:8.5px;font-weight:700;letter-spacing:.22em;color:var(--brass);line-height:1;margin-bottom:2px}.brand-name{font-family:Pirata One,Georgia,serif;font-size:22px;letter-spacing:.03em;background:linear-gradient(180deg,#fff5d1,#e5be67 55%,#b58325);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 2px 3px rgba(0,0,0,.75));line-height:1.02}.brand-sub{font-size:11px;font-style:italic;color:#d4be96;margin-top:2px}.visited-pill{margin-left:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px 11px;background:radial-gradient(circle at 50% 20%,#e5be6738,#140a04d9);border:1.5px solid var(--brass);box-shadow:inset 0 0 8px #c89b3c40,0 3px 8px #0009;position:relative}.visited-crown{font-size:9px;color:var(--brass-bright);line-height:1}#visited-text{font-family:Pirata One,Georgia,serif;font-size:15px;color:#fff2c6;letter-spacing:.05em;line-height:1.1}.visited-pill small{font-family:Cinzel,serif;font-size:7.5px;letter-spacing:.16em;color:var(--brass)}.top-nav{display:flex;align-items:center;gap:8px;padding:5px 8px;background:#090401a6;border:1px solid rgba(200,155,60,.32);box-shadow:inset 0 2px 8px #000000d9}.nav-btn{position:relative;font-family:IM Fell English SC,serif;background:linear-gradient(180deg,#3c2312,#241409 55%,#190d05);color:var(--parchment-light);border:1px solid rgba(200,155,60,.45);padding:5px 11px 5px 7px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:inset 0 1px #ffe1a02e,0 3px 7px #0000008c;transition:all .18s ease}.nav-icon-frame{width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#2f1a0d,#120803);border:1px solid var(--brass);display:grid;place-items:center;box-shadow:inset 0 0 5px #000c;transition:transform .2s ease,border-color .2s ease}.nav-lbl{display:flex;flex-direction:column;align-items:flex-start;text-align:left;line-height:1.05}.nav-lbl small{font-family:Cinzel,serif;font-size:8px;letter-spacing:.16em;color:var(--brass)}.nav-lbl strong{font-family:IM Fell English SC,serif;font-weight:400;font-size:14px;letter-spacing:.03em;color:var(--parchment-light)}.nav-seal{min-width:21px;height:21px;padding:0 5px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#c62f2f,#691010);border:1px solid var(--brass);color:#fff2d6;font-family:Cinzel,serif;font-size:9.5px;font-weight:700;display:grid;place-items:center;box-shadow:0 2px 4px #0009}.nav-btn:hover,.nav-btn.active{background:radial-gradient(circle at 50% 100%,rgba(229,190,103,.28),transparent 70%),linear-gradient(180deg,#523018,#331c0d 55%,#221107);border-color:var(--brass-bright);transform:translateY(-1px);box-shadow:inset 0 1px #fff0be59,0 5px 14px #000000b3}.nav-btn:hover .nav-icon-frame,.nav-btn.active .nav-icon-frame{transform:scale(1.08) rotate(-5deg);border-color:#fff0b8}.nav-btn.active:after{content:"◆";position:absolute;bottom:-9px;left:50%;transform:translate(-50%);font-size:10px;color:var(--brass-bright);text-shadow:0 2px 4px rgba(0,0,0,.9)}.top-actions{display:flex;align-items:center;gap:8px}.icon-btn{background:linear-gradient(180deg,#321d0f,#1b0f07);color:var(--parchment-light);border:1px solid var(--brass-dark);padding:5px 10px 5px 7px;cursor:pointer;display:inline-flex;align-items:center;gap:7px;box-shadow:inset 0 1px #ffdc9624;transition:all .16s ease}.dial-icon{width:28px;height:28px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#2a170b,#100702);border:1px solid rgba(200,155,60,.6);display:grid;place-items:center;transition:transform .25s ease}.dial-text{display:flex;flex-direction:column;align-items:flex-start;line-height:1.05}.dial-text small{font-family:Cinzel,serif;font-size:7.5px;letter-spacing:.16em;color:var(--brass)}.dial-text strong{font-family:IM Fell English SC,serif;font-weight:400;font-size:12.5px;color:var(--parchment-light)}.icon-btn:hover,.icon-btn.active{background:linear-gradient(180deg,#4a2b16,#2a170b);border-color:var(--brass-bright)}.icon-btn:hover .dial-icon{transform:rotate(18deg) scale(1.06);border-color:var(--brass-bright)}.cta-btn{position:relative;background:radial-gradient(circle at 50% 0%,rgba(255,215,130,.25),transparent 65%),linear-gradient(180deg,#ab2424,#7d1515 55%,#560d0d);color:var(--parchment-light);padding:5px 13px 5px 8px;border:1.5px solid var(--brass-bright);outline:1px solid #2b0707;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:inset 0 1px #ffe6b466,0 5px 14px #000000a6;transition:transform .16s ease,filter .16s ease,box-shadow .16s ease}.cta-icon{width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#3d1212,#1c0606);border:1px solid var(--brass-bright);display:grid;place-items:center}.cta-text{display:flex;flex-direction:column;align-items:flex-start;line-height:1.05}.cta-text small{font-family:Cinzel,serif;font-size:7.5px;letter-spacing:.15em;color:#ffdca8}.cta-text strong{font-family:Pirata One,Georgia,serif;font-weight:400;font-size:16px;letter-spacing:.03em;color:#fff6df}.cta-btn:hover{transform:translateY(-1px);filter:brightness(1.1);box-shadow:inset 0 1px #fff0c88c,0 7px 18px #8b1e1e8c}.atlas-panel{pointer-events:auto;position:absolute;top:74px;left:50%;transform:translate(-50%);width:min(940px,calc(100vw - 28px));max-height:calc(100vh - 150px);display:flex;flex-direction:column;background:radial-gradient(circle at 50% 30%,var(--parchment-light) 0%,var(--parchment-mid) 72%,var(--parchment-edge) 100%);border:3px double var(--ink-sepia);outline:4px solid var(--timber-mid);box-shadow:inset 0 0 45px #693e1266,var(--shadow-heavy);padding:20px 24px;z-index:25;color:var(--ink-dark)}.parchment-kicker{font-family:IM Fell English SC,serif;font-size:11px;letter-spacing:.15em;color:var(--wax-red)}.atlas-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;border-bottom:1.5px solid rgba(89,56,28,.35);padding-bottom:10px}.atlas-header h3{font-family:Pirata One,Georgia,serif;font-weight:400;font-size:26px;letter-spacing:.02em;color:var(--ink-dark)}.atlas-header p{font-size:13.5px;color:var(--ink-sepia);margin-top:2px}.atlas-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}.filter-chip{font-family:IM Fell English SC,serif;background:#4a2c1114;color:var(--ink-sepia);border:1px solid rgba(89,56,28,.45);padding:5px 13px;font-size:13px;cursor:pointer}.filter-chip.active,.filter-chip:hover{background:var(--timber-mid);color:var(--brass-bright);border-color:var(--brass-dark)}.atlas-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;overflow-y:auto;padding-right:4px}.atlas-card{background:#fff8e78c;border:1.5px solid rgba(89,56,28,.45);border-left:4px solid var(--cat, var(--wax-red));padding:12px 14px;display:flex;flex-direction:column;gap:5px;box-shadow:inset 0 0 16px #784e1e24}.atlas-card-top{display:flex;justify-content:space-between;align-items:center;font-size:11.5px}.atlas-cat{font-family:IM Fell English SC,serif;color:var(--cat);display:inline-flex;align-items:center;gap:5px;letter-spacing:.05em}.atlas-date{font-style:italic;color:var(--ink-faded)}.atlas-card h4{font-family:Pirata One,Georgia,serif;font-weight:400;font-size:19px;color:var(--ink-dark);display:flex;align-items:center;gap:6px}.visited-check{color:var(--wax-red);font-size:14px}.atlas-sub{font-size:13px;font-style:italic;color:var(--ink-sepia);flex:1}.atlas-actions{display:flex;gap:8px;margin-top:8px}.atlas-sail-btn,.atlas-dock-btn{flex:1;font-family:IM Fell English SC,serif;padding:6px 9px;font-size:12.5px;letter-spacing:.04em;cursor:pointer}.atlas-sail-btn{background:transparent;color:var(--ink-dark);border:1px solid var(--ink-sepia)}.atlas-sail-btn:hover{background:#4a2c1124}.atlas-dock-btn{background:var(--timber-mid);color:var(--brass-bright);border:1px solid var(--brass-dark)}.atlas-dock-btn:hover{background:var(--wax-red);color:var(--parchment-light)}.dock-prompt{pointer-events:auto;position:absolute;bottom:94px;left:50%;transform:translate(-50%);z-index:15}.dock-prompt-inner{display:flex;align-items:center;gap:14px;padding:10px 22px 10px 14px;background:linear-gradient(180deg,var(--parchment-light) 0%,var(--parchment-mid) 100%);border:2px solid var(--ink-dark);outline:2px solid var(--brass);box-shadow:inset 0 0 18px #6e441659,0 12px 30px #000000b3;cursor:pointer;animation:gentleFloat 2.2s infinite ease-in-out}@keyframes gentleFloat{0%,to{transform:translateY(0)}50%{transform:translateY(-4px)}}.dock-wax-seal{width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#c92c2c,#6e1111);border:2px solid #3d0a0a;color:var(--parchment-light);font-family:Cinzel,serif;font-weight:800;font-size:15px;display:grid;place-items:center;box-shadow:0 3px 7px #00000073}.dock-prompt-text{display:flex;flex-direction:column}.dock-prompt-label{font-family:IM Fell English SC,serif;font-size:10.5px;letter-spacing:.1em;color:var(--wax-red)}.dock-prompt-text strong{font-family:Pirata One,Georgia,serif;font-weight:400;font-size:20px;color:var(--ink-dark);line-height:1.05}.dock-prompt-cta{font-family:IM Fell English SC,serif;font-size:13px;color:var(--ink-sepia);border-left:1px solid rgba(89,56,28,.35);padding-left:12px}.autopilot-banner{pointer-events:auto;position:absolute;top:74px;left:50%;transform:translate(-50%);background:linear-gradient(180deg,#2b190d,#190e07);color:var(--parchment-light);border:1.5px solid var(--brass);padding:7px 16px;display:flex;align-items:center;gap:12px;font-size:13.5px;box-shadow:var(--shadow-heavy)}.autopilot-banner strong{color:var(--brass-bright);font-family:IM Fell English SC,serif}.autopilot-banner button{font-family:IM Fell English SC,serif;background:var(--wax-red);color:var(--parchment-light);border:1px solid var(--brass);padding:4px 10px;font-size:12px;cursor:pointer}.helm-hud{pointer-events:auto;position:absolute;bottom:14px;left:14px;display:flex;align-items:center;gap:14px;padding:10px 18px 10px 12px;background:linear-gradient(180deg,#2b190d,#170d06);border:2px solid var(--brass-dark);outline:2px solid #0c0603;box-shadow:inset 0 0 20px #000c,var(--shadow-heavy);color:var(--parchment-light)}.helm-wheel-box{width:56px;height:56px;display:grid;place-items:center;transition:transform .08s linear}.speed-box{text-align:center;padding-right:14px;border-right:1px solid rgba(200,155,60,.3);min-width:72px}.speed-val{font-family:Pirata One,Georgia,serif;font-size:26px;color:var(--brass-bright);line-height:1}.speed-unit{font-family:IM Fell English SC,serif;font-size:9.5px;letter-spacing:.14em;color:#bfa780}.compass-bearing{font-family:Cinzel,serif;font-size:10.5px;color:var(--parchment-mid);margin-top:3px}.helm-nearest{font-family:IM Fell English SC,serif;font-size:14px;color:var(--brass-bright);margin-bottom:4px}.helm-keys{display:flex;gap:10px;flex-wrap:wrap;font-size:12px;color:#cbb389}kbd{font-family:Cinzel,serif;background:#3a2312;border:1px solid var(--brass-dark);padding:1px 5px;font-size:10px;color:var(--parchment-light);margin:0 1px}.minimap-wrap{pointer-events:auto;position:absolute;bottom:14px;right:14px;display:flex;flex-direction:column;align-items:center;gap:6px}.minimap-bezel{padding:5px;border-radius:50%;background:conic-gradient(from 45deg,#8c6623,#e5be67,#6d4c14,#c89b3c,#593d0e,#e5be67,#8c6623);border:2px solid #1e1107;box-shadow:inset 0 0 8px #000000b3,0 14px 36px #000000bf}#minimap{display:block;border-radius:50%;border:2px solid #2b180a}.minimap-caption{font-family:IM Fell English SC,serif;font-size:11px;letter-spacing:.04em;color:var(--parchment-mid);background:#1c1008;border:1px solid var(--brass-dark);padding:2px 10px}.minimap-tooltip{position:absolute;top:-32px;background:var(--parchment-light);color:var(--ink-dark);border:1.5px solid var(--ink-dark);padding:4px 11px;font-family:IM Fell English SC,serif;font-size:12px;white-space:nowrap;box-shadow:0 6px 16px #0000008c}.island-drawer{pointer-events:auto;position:absolute;top:72px;right:14px;bottom:14px;width:min(475px,calc(100vw - 28px));background:radial-gradient(circle at 45% 30%,var(--parchment-light) 0%,var(--parchment-mid) 72%,var(--parchment-edge) 100%);border:3px double var(--ink-sepia);outline:4px solid var(--timber-mid);box-shadow:inset 0 0 48px #5f38106b,var(--shadow-heavy);display:flex;flex-direction:column;z-index:20;color:var(--ink-dark)}.drawer-top{display:flex;justify-content:space-between;align-items:center;padding:14px 20px 10px;border-bottom:1.5px solid rgba(89,56,28,.35)}.drawer-badge{font-family:IM Fell English SC,serif;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border:1.5px solid;display:inline-flex;align-items:center;gap:6px;background:#fff8e780}.wax-close-btn{width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ba2929,#6b1111);color:var(--parchment-light);border:1.5px solid #380909;font-weight:700;font-size:13px;cursor:pointer;box-shadow:0 2px 6px #0006}.wax-close-btn:hover{transform:scale(1.07)}.drawer-body{flex:1;overflow-y:auto;padding:16px 22px 20px;user-select:text;-webkit-user-select:text}.log-entry-stamp{font-family:Cinzel,serif;font-size:10px;letter-spacing:.14em;color:var(--ink-faded);margin-bottom:4px}.drawer-header-block h2{font-family:Pirata One,Georgia,serif;font-weight:400;font-size:32px;line-height:1.08;color:var(--ink-dark)}.drawer-subtitle{font-style:italic;color:var(--wax-red);font-size:16px;margin-top:3px}.drawer-meta{display:flex;gap:16px;font-size:13px;color:var(--ink-sepia);margin-top:6px}.ink-divider{height:2px;margin:12px 0;background:linear-gradient(90deg,var(--ink-sepia),var(--wax-red),transparent)}.metrics-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:10px;margin:14px 0}.metric-card{background:#41260e12;border:1.5px solid var(--ink-sepia);border-top:3px solid var(--cat, var(--wax-red));padding:9px 10px;text-align:center}.metric-val{font-family:Pirata One,Georgia,serif;font-size:24px;color:var(--ink-dark);line-height:1}.metric-lbl{font-family:IM Fell English SC,serif;font-size:11px;color:var(--ink-sepia);margin-top:3px}.drawer-summary{font-size:15px;line-height:1.62;color:var(--ink-dark);margin:12px 0}.drawer-bullets{padding-left:20px;margin:12px 0 16px;display:flex;flex-direction:column;gap:8px;font-size:14.5px;line-height:1.55;color:var(--ink-dark)}.drawer-bullets li::marker{color:var(--wax-red)}.drawer-tags-wrap{margin-top:14px;padding-top:10px;border-top:1px dashed rgba(89,56,28,.4)}.tags-heading{font-family:IM Fell English SC,serif;font-size:12px;letter-spacing:.08em;color:var(--ink-sepia);margin-bottom:6px}.drawer-tags{display:flex;flex-wrap:wrap;gap:6px}.tech-tag{font-family:IM Fell English SC,serif;background:#41260e1a;border:1px solid rgba(89,56,28,.55);color:var(--ink-dark);font-size:12px;padding:2px 9px}.skills-section{margin-top:16px;border-top:1.5px solid rgba(89,56,28,.35);padding-top:12px}.skills-section h4{font-family:IM Fell English SC,serif;font-size:14px;letter-spacing:.06em;color:var(--wax-red);margin-bottom:10px}.skill-group{margin-bottom:10px}.skill-group-name{font-family:Cinzel,serif;font-size:11.5px;font-weight:700;color:var(--ink-sepia);margin-bottom:4px}.contact-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.contact-pill{font-family:IM Fell English SC,serif;text-decoration:none;background:var(--timber-mid);border:1px solid var(--brass);color:var(--brass-bright);padding:6px 12px;font-size:12.5px}.contact-pill:hover{background:var(--wax-red);color:var(--parchment-light)}.drawer-footer{display:flex;gap:8px;padding:12px 18px;border-top:1.5px solid rgba(89,56,28,.35);background:#59381c1f}.drawer-nav-btn{font-family:IM Fell English SC,serif;background:transparent;color:var(--ink-dark);border:1.5px solid var(--ink-sepia);padding:8px 12px;font-size:13px;cursor:pointer}.drawer-nav-btn:hover{background:#59381c26}.drawer-undock-btn{flex:1;font-family:IM Fell English SC,serif;background:linear-gradient(180deg,#9e2424,#6e1414);color:var(--parchment-light);border:1.5px solid var(--brass);padding:8px 12px;font-size:13.5px;letter-spacing:.05em;cursor:pointer}.cv-modal-backdrop{pointer-events:auto;position:fixed;top:0;right:0;bottom:0;left:0;background:#080401d1;display:flex;align-items:center;justify-content:center;padding:24px;z-index:40}.cv-modal-card{position:relative;width:min(860px,100%);max-height:88vh;background:radial-gradient(circle at 50% 30%,var(--parchment-light) 0%,var(--parchment-mid) 72%,var(--parchment-edge) 100%);border:3px double var(--ink-sepia);outline:4px solid var(--timber-mid);box-shadow:inset 0 0 50px #5f38106b,var(--shadow-heavy);display:flex;flex-direction:column;overflow:hidden;color:var(--ink-dark)}.cv-modal-header{display:flex;justify-content:space-between;align-items:flex-start;padding:18px 26px 14px;border-bottom:1.5px solid rgba(89,56,28,.35)}.cv-modal-header h2{font-family:Pirata One,Georgia,serif;font-weight:400;font-size:30px}.cv-modal-header p{font-style:italic;font-size:14px;color:var(--ink-sepia)}.cv-modal-content{padding:20px 26px;overflow-y:auto;user-select:text;-webkit-user-select:text}.cv-banner{background:#4a2c1112;border:1.5px solid rgba(89,56,28,.45);padding:14px 16px;font-size:14.5px;line-height:1.58;margin-bottom:18px}.cv-avail{margin-top:8px;color:var(--wax-red)}.cv-modal-content h3{font-family:Pirata One,Georgia,serif;font-weight:400;font-size:22px;margin:18px 0 10px;color:var(--wax-red);border-bottom:1px solid rgba(89,56,28,.3);padding-bottom:3px}.cv-item{background:#fff8e780;border:1px solid rgba(89,56,28,.4);padding:12px 14px;margin-bottom:10px}.cv-item-head{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;font-size:15px;margin-bottom:6px}.cv-item-right{display:flex;align-items:center;gap:8px}.cv-date{font-style:italic;font-size:13px;color:var(--ink-sepia)}.cv-jump-btn{font-family:IM Fell English SC,serif;background:var(--timber-mid);border:1px solid var(--brass);color:var(--brass-bright);padding:3px 10px;font-size:11.5px;cursor:pointer}.cv-item ul{padding-left:18px;font-size:14px;color:var(--ink-dark);line-height:1.52;margin-bottom:8px}.touch-controls{display:none}.hidden{display:none!important}@media(max-width:960px){.top-nav,.helm-keys{display:none}.touch-controls{pointer-events:auto;display:flex;position:absolute;bottom:88px;left:14px;align-items:center;gap:12px}.joystick-zone{width:96px;height:96px;touch-action:none}.joystick-base{width:100%;height:100%;border-radius:50%;background:#190f08d9;border:2px solid var(--brass);display:grid;place-items:center}.joystick-stick{width:38px;height:38px;border-radius:50%;background:var(--brass);border:2px solid var(--timber-dark)}.touch-buttons{display:flex;flex-direction:column;gap:8px}.touch-btn{font-family:IM Fell English SC,serif;background:var(--timber-mid);color:var(--brass-bright);border:1.5px solid var(--brass);padding:9px 13px;font-size:12px}}
/*$vite$:1*/`,document.head.appendChild(al);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $r="170",Vh=0,ol=1,Wh=2,ll=1,cl=2,Tn=3,Bn=0,Fe=1,ve=2,Gn=0,Ai=1,xn=2,hl=3,dl=4,Xh=5,ai=100,qh=101,Yh=102,$h=103,Zh=104,jh=200,Jh=201,Kh=202,Qh=203,Zr=204,jr=205,td=206,ed=207,nd=208,id=209,sd=210,rd=211,ad=212,od=213,ld=214,Jr=0,Kr=1,Qr=2,Ci=3,ta=4,ea=5,na=6,ia=7,ul=0,cd=1,hd=2,Hn=0,dd=1,ud=2,fd=3,fl=4,pd=5,md=6,gd=7,pl=300,Ri=301,Pi=302,sa=303,ra=304,Xs=306,aa=1e3,Vn=1001,oa=1002,Xe=1003,vd=1004,qs=1005,Be=1006,la=1007,oi=1008,An=1009,ml=1010,gl=1011,us=1012,ca=1013,li=1014,_n=1015,Ii=1016,ha=1017,da=1018,Li=1020,vl=35902,xl=1021,_l=1022,tn=1023,yl=1024,Ml=1025,Di=1026,Ui=1027,ua=1028,fa=1029,bl=1030,pa=1031,ma=1033,Ys=33776,$s=33777,Zs=33778,js=33779,ga=35840,va=35841,xa=35842,_a=35843,ya=36196,Ma=37492,ba=37496,Sa=37808,wa=37809,Ea=37810,Ta=37811,Aa=37812,Ca=37813,Ra=37814,Pa=37815,Ia=37816,La=37817,Da=37818,Ua=37819,Na=37820,Fa=37821,Js=36492,ka=36494,Oa=36495,Sl=36283,za=36284,Ba=36285,Ga=36286,xd=3200,_d=3201,wl=0,yd=1,Wn="",ke="srgb",Ni="srgb-linear",Ks="linear",he="srgb",Fi=7680,El=519,Md=512,bd=513,Sd=514,Tl=515,wd=516,Ed=517,Td=518,Ad=519,Ha=35044,Al="300 es",Cn=2e3,Qs=2001;class ki{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Cl=1234567;const fs=Math.PI/180,ps=180/Math.PI;function yn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function Ae(i,t,e){return Math.max(t,Math.min(e,i))}function Va(i,t){return(i%t+t)%t}function Cd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Rd(i,t,e){return i!==t?(e-i)/(t-i):0}function ms(i,t,e){return(1-e)*i+e*t}function Pd(i,t,e,n){return ms(i,t,1-Math.exp(-e*n))}function Id(i,t=1){return t-Math.abs(Va(i,t*2)-t)}function Ld(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Dd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ud(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Nd(i,t){return i+Math.random()*(t-i)}function Fd(i){return i*(.5-Math.random())}function kd(i){i!==void 0&&(Cl=i);let t=Cl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Od(i){return i*fs}function zd(i){return i*ps}function Bd(i){return(i&i-1)===0&&i!==0}function Gd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Hd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Vd(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),u=a((t-n)/2),f=r((n-t)/2),m=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*m,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*m,o*c);break;case"ZYZ":i.set(l*m,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function cn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function le(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Pe={DEG2RAD:fs,RAD2DEG:ps,generateUUID:yn,clamp:Ae,euclideanModulo:Va,mapLinear:Cd,inverseLerp:Rd,lerp:ms,damp:Pd,pingpong:Id,smoothstep:Ld,smootherstep:Dd,randInt:Ud,randFloat:Nd,randFloatSpread:Fd,seededRandom:kd,degToRad:Od,radToDeg:zd,isPowerOfTwo:Bd,ceilPowerOfTwo:Gd,floorPowerOfTwo:Hd,setQuaternionFromProperEuler:Vd,normalize:le,denormalize:cn};class et{constructor(t=0,e=0){et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vt{constructor(t,e,n,s,r,a,o,l,c){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],v=s[0],g=s[3],p=s[6],M=s[1],_=s[4],x=s[7],L=s[2],A=s[5],C=s[8];return r[0]=a*v+o*M+l*L,r[3]=a*g+o*_+l*A,r[6]=a*p+o*x+l*C,r[1]=c*v+h*M+d*L,r[4]=c*g+h*_+d*A,r[7]=c*p+h*x+d*C,r[2]=u*v+f*M+m*L,r[5]=u*g+f*_+m*A,r[8]=u*p+f*x+m*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,m=e*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=d*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=u*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Wa.makeScale(t,e)),this}rotate(t){return this.premultiply(Wa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Wa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Wa=new Vt;function Rl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function tr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wd(){const i=tr("canvas");return i.style.display="block",i}const Pl={};function gs(i){i in Pl||(Pl[i]=!0,console.warn(i))}function Xd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function qd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Yd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ee={enabled:!0,workingColorSpace:Ni,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===he&&(i.r=Rn(i.r),i.g=Rn(i.g),i.b=Rn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===he&&(i.r=Oi(i.r),i.g=Oi(i.g),i.b=Oi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Wn?Ks:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Rn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Oi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Il=[.64,.33,.3,.6,.15,.06],Ll=[.2126,.7152,.0722],Dl=[.3127,.329],Ul=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nl=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ee.define({[Ni]:{primaries:Il,whitePoint:Dl,transfer:Ks,toXYZ:Ul,fromXYZ:Nl,luminanceCoefficients:Ll,workingColorSpaceConfig:{unpackColorSpace:ke},outputColorSpaceConfig:{drawingBufferColorSpace:ke}},[ke]:{primaries:Il,whitePoint:Dl,transfer:he,toXYZ:Ul,fromXYZ:Nl,luminanceCoefficients:Ll,outputColorSpaceConfig:{drawingBufferColorSpace:ke}}});let zi;class $d{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{zi===void 0&&(zi=tr("canvas")),zi.width=t.width,zi.height=t.height;const n=zi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=zi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=tr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Rn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Rn(e[n]/255)*255):e[n]=Rn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Zd=0;class Fl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=yn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Xa(s[a].image)):r.push(Xa(s[a]))}else r=Xa(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Xa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?$d.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jd=0;class De extends ki{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,n=Vn,s=Vn,r=Be,a=oi,o=tn,l=An,c=De.DEFAULT_ANISOTROPY,h=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=yn(),this.name="",this.source=new Fl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==pl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case aa:t.x=t.x-Math.floor(t.x);break;case Vn:t.x=t.x<0?0:1;break;case oa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case aa:t.y=t.y-Math.floor(t.y);break;case Vn:t.y=t.y<0?0:1;break;case oa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null,De.DEFAULT_MAPPING=pl,De.DEFAULT_ANISOTROPY=1;class ne{constructor(t=0,e=0,n=0,s=1){ne.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,x=(f+1)/2,L=(p+1)/2,A=(h+u)/4,C=(d+v)/4,R=(m+g)/4;return _>x&&_>L?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=A/n,r=C/n):x>L?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=A/s,r=R/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=C/r,s=R/r),this.set(n,s,r,e),this}let M=Math.sqrt((g-m)*(g-m)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(d-v)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jd extends ki{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ne(0,0,t,e),this.scissorTest=!1,this.viewport=new ne(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Be,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new De(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Fl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xn extends Jd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class kl extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Kd extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const u=r[a+0],f=r[a+1],m=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=f,t[e+2]=m,t[e+3]=v;return}if(d!==v||l!==u||c!==f||h!==m){let g=1-o;const p=l*u+c*f+h*m+d*v,M=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const L=Math.sqrt(_),A=Math.atan2(L,p*M);g=Math.sin(g*A)/L,o=Math.sin(o*A)/L}const x=o*M;if(l=l*g+u*x,c=c*g+f*x,h=h*g+m*x,d=d*g+v*x,g===1-o){const L=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=L,c*=L,h*=L,d*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return t[e]=o*m+h*d+l*f-c*u,t[e+1]=l*m+h*u+c*d-o*f,t[e+2]=c*m+h*f+o*u-l*d,t[e+3]=h*m-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ae(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(t=0,e=0,n=0){E.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ol.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ol.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return qa.copy(this).projectOnVector(t),this.sub(qa)}reflect(t){return this.sub(qa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qa=new E,Ol=new qn;class ci{constructor(t=new E(1/0,1/0,1/0),e=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),er.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),er.copy(n.boundingBox)),er.applyMatrix4(t.matrixWorld),this.union(er)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(vs),nr.subVectors(this.max,vs),Bi.subVectors(t.a,vs),Gi.subVectors(t.b,vs),Hi.subVectors(t.c,vs),Yn.subVectors(Gi,Bi),$n.subVectors(Hi,Gi),hi.subVectors(Bi,Hi);let e=[0,-Yn.z,Yn.y,0,-$n.z,$n.y,0,-hi.z,hi.y,Yn.z,0,-Yn.x,$n.z,0,-$n.x,hi.z,0,-hi.x,-Yn.y,Yn.x,0,-$n.y,$n.x,0,-hi.y,hi.x,0];return!Ya(e,Bi,Gi,Hi,nr)||(e=[1,0,0,0,1,0,0,0,1],!Ya(e,Bi,Gi,Hi,nr))?!1:(ir.crossVectors(Yn,$n),e=[ir.x,ir.y,ir.z],Ya(e,Bi,Gi,Hi,nr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Pn=[new E,new E,new E,new E,new E,new E,new E,new E],hn=new E,er=new ci,Bi=new E,Gi=new E,Hi=new E,Yn=new E,$n=new E,hi=new E,vs=new E,nr=new E,ir=new E,di=new E;function Ya(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){di.fromArray(i,r);const o=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),l=t.dot(di),c=e.dot(di),h=n.dot(di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Qd=new ci,xs=new E,$a=new E;class Vi{constructor(t=new E,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Qd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;xs.subVectors(t,this.center);const e=xs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(xs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($a.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(xs.copy(t.center).add($a)),this.expandByPoint(xs.copy(t.center).sub($a))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new E,Za=new E,sr=new E,Zn=new E,ja=new E,rr=new E,Ja=new E;class Ka{constructor(t=new E,e=new E(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Za.copy(t).add(e).multiplyScalar(.5),sr.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(Za);const r=t.distanceTo(e)*.5,a=-this.direction.dot(sr),o=Zn.dot(this.direction),l=-Zn.dot(sr),c=Zn.lengthSq(),h=Math.abs(1-a*a);let d,u,f,m;if(h>0)if(d=a*l-o,u=a*o-l,m=r*h,d>=0)if(u>=-m)if(u<=m){const v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Za).addScaledVector(sr,u),f}intersectSphere(t,e){In.subVectors(t.center,this.origin);const n=In.dot(this.direction),s=In.dot(In)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,n,s,r){ja.subVectors(e,t),rr.subVectors(n,t),Ja.crossVectors(ja,rr);let a=this.direction.dot(Ja),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Zn.subVectors(this.origin,t);const l=o*this.direction.dot(rr.crossVectors(Zn,rr));if(l<0)return null;const c=o*this.direction.dot(ja.cross(Zn));if(c<0||l+c>a)return null;const h=-o*Zn.dot(Ja);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Zt{constructor(t,e,n,s,r,a,o,l,c,h,d,u,f,m,v,g){Zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,u,f,m,v,g)}set(t,e,n,s,r,a,o,l,c,h,d,u,f,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Zt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Wi.setFromMatrixColumn(t,0).length(),r=1/Wi.setFromMatrixColumn(t,1).length(),a=1/Wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,m=o*h,v=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+m*c,e[5]=u-v*c,e[9]=-o*l,e[2]=v-u*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,m=c*h,v=c*d;e[0]=u+v*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=v+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,m=c*h,v=c*d;e[0]=u-v*o,e[4]=-a*d,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=v-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,f=a*d,m=o*h,v=o*d;e[0]=l*h,e[4]=m*c-f,e[8]=u*c+v,e[1]=l*d,e[5]=v*c+u,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,f=a*c,m=o*l,v=o*c;e[0]=l*h,e[4]=v-u*d,e[8]=m*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+m,e[10]=u-v*d}else if(t.order==="XZY"){const u=a*l,f=a*c,m=o*l,v=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+v,e[5]=a*h,e[9]=f*d-m,e[2]=m*d-f,e[6]=o*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(tu,t,eu)}lookAt(t,e,n){const s=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),jn.crossVectors(n,qe),jn.lengthSq()===0&&(Math.abs(n.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),jn.crossVectors(n,qe)),jn.normalize(),ar.crossVectors(qe,jn),s[0]=jn.x,s[4]=ar.x,s[8]=qe.x,s[1]=jn.y,s[5]=ar.y,s[9]=qe.y,s[2]=jn.z,s[6]=ar.z,s[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],M=n[3],_=n[7],x=n[11],L=n[15],A=s[0],C=s[4],R=s[8],S=s[12],y=s[1],I=s[5],U=s[9],D=s[13],F=s[2],X=s[6],z=s[10],q=s[14],H=s[3],rt=s[7],it=s[11],lt=s[15];return r[0]=a*A+o*y+l*F+c*H,r[4]=a*C+o*I+l*X+c*rt,r[8]=a*R+o*U+l*z+c*it,r[12]=a*S+o*D+l*q+c*lt,r[1]=h*A+d*y+u*F+f*H,r[5]=h*C+d*I+u*X+f*rt,r[9]=h*R+d*U+u*z+f*it,r[13]=h*S+d*D+u*q+f*lt,r[2]=m*A+v*y+g*F+p*H,r[6]=m*C+v*I+g*X+p*rt,r[10]=m*R+v*U+g*z+p*it,r[14]=m*S+v*D+g*q+p*lt,r[3]=M*A+_*y+x*F+L*H,r[7]=M*C+_*I+x*X+L*rt,r[11]=M*R+_*U+x*z+L*it,r[15]=M*S+_*D+x*q+L*lt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],m=t[3],v=t[7],g=t[11],p=t[15];return m*(+r*l*d-s*c*d-r*o*u+n*c*u+s*o*f-n*l*f)+v*(+e*l*f-e*c*u+r*a*u-s*a*f+s*c*h-r*l*h)+g*(+e*c*d-e*o*f-r*a*d+n*a*f+r*o*h-n*c*h)+p*(-s*o*h-e*l*d+e*o*u+s*a*d-n*a*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],m=t[12],v=t[13],g=t[14],p=t[15],M=d*g*c-v*u*c+v*l*f-o*g*f-d*l*p+o*u*p,_=m*u*c-h*g*c-m*l*f+a*g*f+h*l*p-a*u*p,x=h*v*c-m*d*c+m*o*f-a*v*f-h*o*p+a*d*p,L=m*d*l-h*v*l-m*o*u+a*v*u+h*o*g-a*d*g,A=e*M+n*_+s*x+r*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return t[0]=M*C,t[1]=(v*u*r-d*g*r-v*s*f+n*g*f+d*s*p-n*u*p)*C,t[2]=(o*g*r-v*l*r+v*s*c-n*g*c-o*s*p+n*l*p)*C,t[3]=(d*l*r-o*u*r-d*s*c+n*u*c+o*s*f-n*l*f)*C,t[4]=_*C,t[5]=(h*g*r-m*u*r+m*s*f-e*g*f-h*s*p+e*u*p)*C,t[6]=(m*l*r-a*g*r-m*s*c+e*g*c+a*s*p-e*l*p)*C,t[7]=(a*u*r-h*l*r+h*s*c-e*u*c-a*s*f+e*l*f)*C,t[8]=x*C,t[9]=(m*d*r-h*v*r-m*n*f+e*v*f+h*n*p-e*d*p)*C,t[10]=(a*v*r-m*o*r+m*n*c-e*v*c-a*n*p+e*o*p)*C,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*f-e*o*f)*C,t[12]=L*C,t[13]=(h*v*s-m*d*s+m*n*u-e*v*u-h*n*g+e*d*g)*C,t[14]=(m*o*s-a*v*s-m*n*l+e*v*l+a*n*g-e*o*g)*C,t[15]=(a*d*s-h*o*s+h*n*l-e*d*l-a*n*u+e*o*u)*C,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,m=r*d,v=a*h,g=a*d,p=o*d,M=l*c,_=l*h,x=l*d,L=n.x,A=n.y,C=n.z;return s[0]=(1-(v+p))*L,s[1]=(f+x)*L,s[2]=(m-_)*L,s[3]=0,s[4]=(f-x)*A,s[5]=(1-(u+p))*A,s[6]=(g+M)*A,s[7]=0,s[8]=(m+_)*C,s[9]=(g-M)*C,s[10]=(1-(u+v))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Wi.set(s[0],s[1],s[2]).length();const a=Wi.set(s[4],s[5],s[6]).length(),o=Wi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],dn.copy(this);const c=1/r,h=1/a,d=1/o;return dn.elements[0]*=c,dn.elements[1]*=c,dn.elements[2]*=c,dn.elements[4]*=h,dn.elements[5]*=h,dn.elements[6]*=h,dn.elements[8]*=d,dn.elements[9]*=d,dn.elements[10]*=d,e.setFromRotationMatrix(dn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Cn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),u=(n+s)/(n-s);let f,m;if(o===Cn)f=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===Qs)f=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Cn){const l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(a-r),u=(e+t)*c,f=(n+s)*h;let m,v;if(o===Cn)m=(a+r)*d,v=-2*d;else if(o===Qs)m=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Wi=new E,dn=new Zt,tu=new E(0,0,0),eu=new E(1,1,1),jn=new E,ar=new E,qe=new E,zl=new Zt,Bl=new qn;class un{constructor(t=0,e=0,n=0,s=un.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ae(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ae(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ae(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return zl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bl.setFromEuler(this),this.setFromQuaternion(Bl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}un.DEFAULT_ORDER="XYZ";class Qa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let nu=0;const Gl=new E,Xi=new qn,Ln=new Zt,or=new E,_s=new E,iu=new E,su=new qn,Hl=new E(1,0,0),Vl=new E(0,1,0),Wl=new E(0,0,1),Xl={type:"added"},ru={type:"removed"},qi={type:"childadded",child:null},to={type:"childremoved",child:null};class Se extends ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Se.DEFAULT_UP.clone();const t=new E,e=new un,n=new qn,s=new E(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Zt},normalMatrix:{value:new Vt}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=Se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Xi.setFromAxisAngle(t,e),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(t,e){return Xi.setFromAxisAngle(t,e),this.quaternion.premultiply(Xi),this}rotateX(t){return this.rotateOnAxis(Hl,t)}rotateY(t){return this.rotateOnAxis(Vl,t)}rotateZ(t){return this.rotateOnAxis(Wl,t)}translateOnAxis(t,e){return Gl.copy(t).applyQuaternion(this.quaternion),this.position.add(Gl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Hl,t)}translateY(t){return this.translateOnAxis(Vl,t)}translateZ(t){return this.translateOnAxis(Wl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?or.copy(t):or.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(_s,or,this.up):Ln.lookAt(or,_s,this.up),this.quaternion.setFromRotationMatrix(Ln),s&&(Ln.extractRotation(s.matrixWorld),Xi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Xi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Xl),qi.child=t,this.dispatchEvent(qi),qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ru),to.child=t,this.dispatchEvent(to),to.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Xl),qi.child=t,this.dispatchEvent(qi),qi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,t,iu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,su,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Se.DEFAULT_UP=new E(0,1,0),Se.DEFAULT_MATRIX_AUTO_UPDATE=!0,Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new E,Dn=new E,eo=new E,Un=new E,Yi=new E,$i=new E,ql=new E,no=new E,io=new E,so=new E,ro=new ne,ao=new ne,oo=new ne;class en{constructor(t=new E,e=new E,n=new E){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),fn.subVectors(t,e),s.cross(fn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){fn.subVectors(s,e),Dn.subVectors(n,e),eo.subVectors(t,e);const a=fn.dot(fn),o=fn.dot(Dn),l=fn.dot(eo),c=Dn.dot(Dn),h=Dn.dot(eo),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Un.x),l.addScaledVector(a,Un.y),l.addScaledVector(o,Un.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return ro.setScalar(0),ao.setScalar(0),oo.setScalar(0),ro.fromBufferAttribute(t,e),ao.fromBufferAttribute(t,n),oo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ro,r.x),a.addScaledVector(ao,r.y),a.addScaledVector(oo,r.z),a}static isFrontFacing(t,e,n,s){return fn.subVectors(n,e),Dn.subVectors(t,e),fn.cross(Dn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),fn.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return en.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return en.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return en.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return en.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return en.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Yi.subVectors(s,n),$i.subVectors(r,n),no.subVectors(t,n);const l=Yi.dot(no),c=$i.dot(no);if(l<=0&&c<=0)return e.copy(n);io.subVectors(t,s);const h=Yi.dot(io),d=$i.dot(io);if(h>=0&&d<=h)return e.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Yi,a);so.subVectors(t,r);const f=Yi.dot(so),m=$i.dot(so);if(m>=0&&f<=m)return e.copy(r);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector($i,o);const g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return ql.subVectors(r,s),o=(d-h)/(d-h+(f-m)),e.copy(s).addScaledVector(ql,o);const p=1/(g+v+u);return a=v*p,o=u*p,e.copy(n).addScaledVector(Yi,a).addScaledVector($i,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Yl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},lr={h:0,s:0,l:0};function lo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=Va(t,1),e=Ae(e,0,1),n=Ae(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=lo(a,r,t+1/3),this.g=lo(a,r,t),this.b=lo(a,r,t-1/3)}return ee.toWorkingColorSpace(this,s),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){const n=Yl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Rn(t.r),this.g=Rn(t.g),this.b=Rn(t.b),this}copyLinearToSRGB(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return ee.fromWorkingColorSpace(Ue.copy(this),t),Math.round(Ae(Ue.r*255,0,255))*65536+Math.round(Ae(Ue.g*255,0,255))*256+Math.round(Ae(Ue.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Ue.copy(this),e);const n=Ue.r,s=Ue.g,r=Ue.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=ke){ee.fromWorkingColorSpace(Ue.copy(this),t);const e=Ue.r,n=Ue.g,s=Ue.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Jn),this.setHSL(Jn.h+t,Jn.s+e,Jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(lr);const n=ms(Jn.h,lr.h,e),s=ms(Jn.s,lr.s,e),r=ms(Jn.l,lr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ue=new zt;zt.NAMES=Yl;let au=0;class ui extends ki{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=yn(),this.name="",this.blending=Ai,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zr,this.blendDst=jr,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=El,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(n.blending=this.blending),this.side!==Bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Zr&&(n.blendSrc=this.blendSrc),this.blendDst!==jr&&(n.blendDst=this.blendDst),this.blendEquation!==ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ci&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==El&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Mn extends ui{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=ul,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const we=new E,cr=new et;class Ee{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ha,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)cr.fromBufferAttribute(this,e),cr.applyMatrix3(t),this.setXY(e,cr.x,cr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=cn(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=cn(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=cn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=cn(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array),r=le(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ha&&(t.usage=this.usage),t}}class $l extends Ee{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Zl extends Ee{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Kt extends Ee{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ou=0;const nn=new Zt,co=new Se,Zi=new E,Ye=new ci,ys=new ci,Ie=new E;class fe extends ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=yn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Rl(t)?Zl:$l)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,n){return nn.makeTranslation(t,e,n),this.applyMatrix4(nn),this}scale(t,e,n){return nn.makeScale(t,e,n),this.applyMatrix4(nn),this}lookAt(t){return co.lookAt(t),co.updateMatrix(),this.applyMatrix4(co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zi).negate(),this.translate(Zi.x,Zi.y,Zi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Kt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ci);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(t){const n=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ys.setFromBufferAttribute(o),this.morphTargetsRelative?(Ie.addVectors(Ye.min,ys.min),Ye.expandByPoint(Ie),Ie.addVectors(Ye.max,ys.max),Ye.expandByPoint(Ie)):(Ye.expandByPoint(ys.min),Ye.expandByPoint(ys.max))}Ye.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ie));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ie.fromBufferAttribute(o,c),l&&(Zi.fromBufferAttribute(t,c),Ie.add(Zi)),s=Math.max(s,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ee(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new E,l[R]=new E;const c=new E,h=new E,d=new E,u=new et,f=new et,m=new et,v=new E,g=new E;function p(R,S,y){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,y),u.fromBufferAttribute(r,R),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,y),h.sub(c),d.sub(c),f.sub(u),m.sub(u);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(I),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(I),o[R].add(v),o[S].add(v),o[y].add(v),l[R].add(g),l[S].add(g),l[y].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let R=0,S=M.length;R<S;++R){const y=M[R],I=y.start,U=y.count;for(let D=I,F=I+U;D<F;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const _=new E,x=new E,L=new E,A=new E;function C(R){L.fromBufferAttribute(s,R),A.copy(L);const S=o[R];_.copy(S),_.sub(L.multiplyScalar(L.dot(S))).normalize(),x.crossVectors(A,S);const I=x.dot(l[R])<0?-1:1;a.setXYZW(R,_.x,_.y,_.z,I)}for(let R=0,S=M.length;R<S;++R){const y=M[R],I=y.start,U=y.count;for(let D=I,F=I+U;D<F;D+=3)C(t.getX(D+0)),C(t.getX(D+1)),C(t.getX(D+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ee(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new E,r=new E,a=new E,o=new E,l=new E,c=new E,h=new E,d=new E;if(t)for(let u=0,f=t.count;u<f;u+=3){const m=t.getX(u+0),v=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)u[m++]=c[f++]}return new Ee(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new fe,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const jl=new Zt,fi=new Ka,hr=new Vi,Jl=new E,dr=new E,ur=new E,fr=new E,ho=new E,pr=new E,Kl=new E,mr=new E;class Tt extends Se{constructor(t=new fe,e=new Mn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){pr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(ho.fromBufferAttribute(d,t),a?pr.addScaledVector(ho,h):pr.addScaledVector(ho.sub(e),h))}e.add(pr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere),hr.applyMatrix4(r),fi.copy(t.ray).recast(t.near),!(hr.containsPoint(fi.origin)===!1&&(fi.intersectSphere(hr,Jl)===null||fi.origin.distanceToSquared(Jl)>(t.far-t.near)**2))&&(jl.copy(r).invert(),fi.copy(t.ray).applyMatrix4(jl),!(n.boundingBox!==null&&fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,fi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=a[g.materialIndex],M=Math.max(g.start,f.start),_=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=M,L=_;x<L;x+=3){const A=o.getX(x),C=o.getX(x+1),R=o.getX(x+2);s=gr(this,p,t,n,c,h,d,A,C,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const M=o.getX(g),_=o.getX(g+1),x=o.getX(g+2);s=gr(this,a,t,n,c,h,d,M,_,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=a[g.materialIndex],M=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=M,L=_;x<L;x+=3){const A=x,C=x+1,R=x+2;s=gr(this,p,t,n,c,h,d,A,C,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const M=g,_=g+1,x=g+2;s=gr(this,a,t,n,c,h,d,M,_,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function lu(i,t,e,n,s,r,a,o){let l;if(t.side===Fe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Bn,o),l===null)return null;mr.copy(o),mr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(mr);return c<e.near||c>e.far?null:{distance:c,point:mr.clone(),object:i}}function gr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,dr),i.getVertexPosition(l,ur),i.getVertexPosition(c,fr);const h=lu(i,t,e,n,dr,ur,fr,Kl);if(h){const d=new E;en.getBarycoord(Kl,dr,ur,fr,d),s&&(h.uv=en.getInterpolatedAttribute(s,o,l,c,d,new et)),r&&(h.uv1=en.getInterpolatedAttribute(r,o,l,c,d,new et)),a&&(h.normal=en.getInterpolatedAttribute(a,o,l,c,d,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new E,materialIndex:0};en.getNormal(dr,ur,fr,u.normal),h.face=u,h.barycoord=d}return h}class Te extends fe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(h,3)),this.setAttribute("uv",new Kt(d,2));function m(v,g,p,M,_,x,L,A,C,R,S){const y=x/C,I=L/R,U=x/2,D=L/2,F=A/2,X=C+1,z=R+1;let q=0,H=0;const rt=new E;for(let it=0;it<z;it++){const lt=it*I-D;for(let yt=0;yt<X;yt++){const Bt=yt*y-U;rt[v]=Bt*M,rt[g]=lt*_,rt[p]=F,c.push(rt.x,rt.y,rt.z),rt[v]=0,rt[g]=0,rt[p]=A>0?1:-1,h.push(rt.x,rt.y,rt.z),d.push(yt/C),d.push(1-it/R),q+=1}}for(let it=0;it<R;it++)for(let lt=0;lt<C;lt++){const yt=u+lt+X*it,Bt=u+lt+X*(it+1),B=u+(lt+1)+X*(it+1),Z=u+(lt+1)+X*it;l.push(yt,Bt,Z),l.push(Bt,B,Z),H+=6}o.addGroup(f,H,S),f+=H,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Te(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ji(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Oe(i){const t={};for(let e=0;e<i.length;e++){const n=ji(i[e]);for(const s in n)t[s]=n[s]}return t}function cu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ql(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const uo={clone:ji,merge:Oe};var hu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,du=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends ui{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hu,this.fragmentShader=du,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ji(t.uniforms),this.uniformsGroups=cu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class tc extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=Cn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Kn=new E,ec=new et,nc=new et;class Ge extends tc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ps*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(fs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ps*2*Math.atan(Math.tan(fs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z)}getViewSize(t,e){return this.getViewBounds(t,ec,nc),e.subVectors(nc,ec)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(fs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ji=-90,Ki=1;class uu extends Se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ge(Ji,Ki,t,e);s.layers=this.layers,this.add(s);const r=new Ge(Ji,Ki,t,e);r.layers=this.layers,this.add(r);const a=new Ge(Ji,Ki,t,e);a.layers=this.layers,this.add(a);const o=new Ge(Ji,Ki,t,e);o.layers=this.layers,this.add(o);const l=new Ge(Ji,Ki,t,e);l.layers=this.layers,this.add(l);const c=new Ge(Ji,Ki,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class ic extends De{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Ri,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class fu extends Xn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ic(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Be}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Te(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fe,blending:Gn});r.uniforms.tEquirect.value=e;const a=new Tt(s,r),o=e.minFilter;return e.minFilter===oi&&(e.minFilter=Be),new uu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const fo=new E,pu=new E,mu=new Vt;class Qn{constructor(t=new E(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=fo.subVectors(n,e).cross(pu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(fo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||mu.getNormalMatrix(t),s=this.coplanarPoint(fo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new Vi,vr=new E;class po{constructor(t=new Qn,e=new Qn,n=new Qn,s=new Qn,r=new Qn,a=new Qn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Cn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],f=s[8],m=s[9],v=s[10],g=s[11],p=s[12],M=s[13],_=s[14],x=s[15];if(n[0].setComponents(l-r,u-c,g-f,x-p).normalize(),n[1].setComponents(l+r,u+c,g+f,x+p).normalize(),n[2].setComponents(l+a,u+h,g+m,x+M).normalize(),n[3].setComponents(l-a,u-h,g-m,x-M).normalize(),n[4].setComponents(l-o,u-d,g-v,x-_).normalize(),e===Cn)n[5].setComponents(l+o,u+d,g+v,x+_).normalize();else if(e===Qs)n[5].setComponents(o,d,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(t){return pi.center.set(0,0,0),pi.radius=.7071067811865476,pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(vr.x=s.normal.x>0?t.max.x:t.min.x,vr.y=s.normal.y>0?t.max.y:t.min.y,vr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(vr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sc(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function gu(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){const m=d[u],v=d[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){const v=d[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class pn extends fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,f=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const M=p*u-a;for(let _=0;_<c;_++){const x=_*d-r;m.push(x,-M,0),v.push(0,0,1),g.push(_/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){const _=M+c*p,x=M+c*(p+1),L=M+1+c*(p+1),A=M+1+c*p;f.push(_,x,A),f.push(x,L,A)}this.setIndex(f),this.setAttribute("position",new Kt(m,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pn(t.width,t.height,t.widthSegments,t.heightSegments)}}var vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_u=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Su=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Eu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Tu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Au=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ru=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Pu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Iu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Du=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ku=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Bu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Gu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Hu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Vu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yu="gl_FragColor = linearToOutputTexel( gl_FragColor );",$u=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ju=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ju=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ku=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ef=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,af=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,of=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,hf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,df=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ff=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,vf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_f=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ef=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Af=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,If=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Df=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Uf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ff=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Gf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Yf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$f=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Kf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,tp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ep=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,np=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ip=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ap=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,op=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,dp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,up=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qt={alphahash_fragment:vu,alphahash_pars_fragment:xu,alphamap_fragment:_u,alphamap_pars_fragment:yu,alphatest_fragment:Mu,alphatest_pars_fragment:bu,aomap_fragment:Su,aomap_pars_fragment:wu,batching_pars_vertex:Eu,batching_vertex:Tu,begin_vertex:Au,beginnormal_vertex:Cu,bsdfs:Ru,iridescence_fragment:Pu,bumpmap_pars_fragment:Iu,clipping_planes_fragment:Lu,clipping_planes_pars_fragment:Du,clipping_planes_pars_vertex:Uu,clipping_planes_vertex:Nu,color_fragment:Fu,color_pars_fragment:ku,color_pars_vertex:Ou,color_vertex:zu,common:Bu,cube_uv_reflection_fragment:Gu,defaultnormal_vertex:Hu,displacementmap_pars_vertex:Vu,displacementmap_vertex:Wu,emissivemap_fragment:Xu,emissivemap_pars_fragment:qu,colorspace_fragment:Yu,colorspace_pars_fragment:$u,envmap_fragment:Zu,envmap_common_pars_fragment:ju,envmap_pars_fragment:Ju,envmap_pars_vertex:Ku,envmap_physical_pars_fragment:hf,envmap_vertex:Qu,fog_vertex:tf,fog_pars_vertex:ef,fog_fragment:nf,fog_pars_fragment:sf,gradientmap_pars_fragment:rf,lightmap_pars_fragment:af,lights_lambert_fragment:of,lights_lambert_pars_fragment:lf,lights_pars_begin:cf,lights_toon_fragment:df,lights_toon_pars_fragment:uf,lights_phong_fragment:ff,lights_phong_pars_fragment:pf,lights_physical_fragment:mf,lights_physical_pars_fragment:gf,lights_fragment_begin:vf,lights_fragment_maps:xf,lights_fragment_end:_f,logdepthbuf_fragment:yf,logdepthbuf_pars_fragment:Mf,logdepthbuf_pars_vertex:bf,logdepthbuf_vertex:Sf,map_fragment:wf,map_pars_fragment:Ef,map_particle_fragment:Tf,map_particle_pars_fragment:Af,metalnessmap_fragment:Cf,metalnessmap_pars_fragment:Rf,morphinstance_vertex:Pf,morphcolor_vertex:If,morphnormal_vertex:Lf,morphtarget_pars_vertex:Df,morphtarget_vertex:Uf,normal_fragment_begin:Nf,normal_fragment_maps:Ff,normal_pars_fragment:kf,normal_pars_vertex:Of,normal_vertex:zf,normalmap_pars_fragment:Bf,clearcoat_normal_fragment_begin:Gf,clearcoat_normal_fragment_maps:Hf,clearcoat_pars_fragment:Vf,iridescence_pars_fragment:Wf,opaque_fragment:Xf,packing:qf,premultiplied_alpha_fragment:Yf,project_vertex:$f,dithering_fragment:Zf,dithering_pars_fragment:jf,roughnessmap_fragment:Jf,roughnessmap_pars_fragment:Kf,shadowmap_pars_fragment:Qf,shadowmap_pars_vertex:tp,shadowmap_vertex:ep,shadowmask_pars_fragment:np,skinbase_vertex:ip,skinning_pars_vertex:sp,skinning_vertex:rp,skinnormal_vertex:ap,specularmap_fragment:op,specularmap_pars_fragment:lp,tonemapping_fragment:cp,tonemapping_pars_fragment:hp,transmission_fragment:dp,transmission_pars_fragment:up,uv_pars_fragment:fp,uv_pars_vertex:pp,uv_vertex:mp,worldpos_vertex:gp,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},ft={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},Sn={basic:{uniforms:Oe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:Oe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new zt(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:Oe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:Oe([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:Oe([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new zt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:Oe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:Oe([ft.points,ft.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:Oe([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:Oe([ft.common,ft.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:Oe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:Oe([ft.sprite,ft.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:Oe([ft.common,ft.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:Oe([ft.lights,ft.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};Sn.physical={uniforms:Oe([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const xr={r:0,b:0,g:0},mi=new un,vp=new Zt;function xp(i,t,e,n,s,r,a){const o=new zt(0);let l=r===!0?0:1,c,h,d=null,u=0,f=null;function m(M){let _=M.isScene===!0?M.background:null;return _&&_.isTexture&&(_=(M.backgroundBlurriness>0?e:t).get(_)),_}function v(M){let _=!1;const x=m(M);x===null?p(o,l):x&&x.isColor&&(p(x,1),_=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(M,_){const x=m(_);x&&(x.isCubeTexture||x.mapping===Xs)?(h===void 0&&(h=new Tt(new Te(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:ji(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Fe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),mi.copy(_.backgroundRotation),mi.x*=-1,mi.y*=-1,mi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(vp.makeRotationFromEuler(mi)),h.material.toneMapped=ee.getTransfer(x.colorSpace)!==he,(d!==x||u!==x.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Tt(new pn(2,2),new bn({name:"BackgroundMaterial",uniforms:ji(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=ee.getTransfer(x.colorSpace)!==he,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,_){M.getRGB(xr,Ql(i)),n.buffers.color.setClear(xr.r,xr.g,xr.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(M,_=1){o.set(M),l=_,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(o,l)},render:v,addToRenderList:g}}function _p(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(y,I,U,D,F){let X=!1;const z=d(D,U,I);r!==z&&(r=z,c(r.object)),X=f(y,D,U,F),X&&m(y,D,U,F),F!==null&&t.update(F,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,x(y,I,U,D),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function d(y,I,U){const D=U.wireframe===!0;let F=n[y.id];F===void 0&&(F={},n[y.id]=F);let X=F[I.id];X===void 0&&(X={},F[I.id]=X);let z=X[D];return z===void 0&&(z=u(l()),X[D]=z),z}function u(y){const I=[],U=[],D=[];for(let F=0;F<e;F++)I[F]=0,U[F]=0,D[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:U,attributeDivisors:D,object:y,attributes:{},index:null}}function f(y,I,U,D){const F=r.attributes,X=I.attributes;let z=0;const q=U.getAttributes();for(const H in q)if(q[H].location>=0){const it=F[H];let lt=X[H];if(lt===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(lt=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(lt=y.instanceColor)),it===void 0||it.attribute!==lt||lt&&it.data!==lt.data)return!0;z++}return r.attributesNum!==z||r.index!==D}function m(y,I,U,D){const F={},X=I.attributes;let z=0;const q=U.getAttributes();for(const H in q)if(q[H].location>=0){let it=X[H];it===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(it=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(it=y.instanceColor));const lt={};lt.attribute=it,it&&it.data&&(lt.data=it.data),F[H]=lt,z++}r.attributes=F,r.attributesNum=z,r.index=D}function v(){const y=r.newAttributes;for(let I=0,U=y.length;I<U;I++)y[I]=0}function g(y){p(y,0)}function p(y,I){const U=r.newAttributes,D=r.enabledAttributes,F=r.attributeDivisors;U[y]=1,D[y]===0&&(i.enableVertexAttribArray(y),D[y]=1),F[y]!==I&&(i.vertexAttribDivisor(y,I),F[y]=I)}function M(){const y=r.newAttributes,I=r.enabledAttributes;for(let U=0,D=I.length;U<D;U++)I[U]!==y[U]&&(i.disableVertexAttribArray(U),I[U]=0)}function _(y,I,U,D,F,X,z){z===!0?i.vertexAttribIPointer(y,I,U,F,X):i.vertexAttribPointer(y,I,U,D,F,X)}function x(y,I,U,D){v();const F=D.attributes,X=U.getAttributes(),z=I.defaultAttributeValues;for(const q in X){const H=X[q];if(H.location>=0){let rt=F[q];if(rt===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(rt=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(rt=y.instanceColor)),rt!==void 0){const it=rt.normalized,lt=rt.itemSize,yt=t.get(rt);if(yt===void 0)continue;const Bt=yt.buffer,B=yt.type,Z=yt.bytesPerElement,ot=B===i.INT||B===i.UNSIGNED_INT||rt.gpuType===ca;if(rt.isInterleavedBufferAttribute){const nt=rt.data,_t=nt.stride,Ut=rt.offset;if(nt.isInstancedInterleavedBuffer){for(let Nt=0;Nt<H.locationSize;Nt++)p(H.location+Nt,nt.meshPerAttribute);y.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Nt=0;Nt<H.locationSize;Nt++)g(H.location+Nt);i.bindBuffer(i.ARRAY_BUFFER,Bt);for(let Nt=0;Nt<H.locationSize;Nt++)_(H.location+Nt,lt/H.locationSize,B,it,_t*Z,(Ut+lt/H.locationSize*Nt)*Z,ot)}else{if(rt.isInstancedBufferAttribute){for(let nt=0;nt<H.locationSize;nt++)p(H.location+nt,rt.meshPerAttribute);y.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let nt=0;nt<H.locationSize;nt++)g(H.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Bt);for(let nt=0;nt<H.locationSize;nt++)_(H.location+nt,lt/H.locationSize,B,it,lt*Z,lt/H.locationSize*nt*Z,ot)}}else if(z!==void 0){const it=z[q];if(it!==void 0)switch(it.length){case 2:i.vertexAttrib2fv(H.location,it);break;case 3:i.vertexAttrib3fv(H.location,it);break;case 4:i.vertexAttrib4fv(H.location,it);break;default:i.vertexAttrib1fv(H.location,it)}}}}M()}function L(){R();for(const y in n){const I=n[y];for(const U in I){const D=I[U];for(const F in D)h(D[F].object),delete D[F];delete I[U]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const I=n[y.id];for(const U in I){const D=I[U];for(const F in D)h(D[F].object),delete D[F];delete I[U]}delete n[y.id]}function C(y){for(const I in n){const U=n[I];if(U[y.id]===void 0)continue;const D=U[y.id];for(const F in D)h(D[F].object),delete D[F];delete U[y.id]}}function R(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:S,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:g,disableUnusedAttributes:M}}function yp(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let m=0;m<d;m++)f+=h[m];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],u[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let m=0;for(let v=0;v<d;v++)m+=h[v]*u[v];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Mp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==tn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const R=C===Ii&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==An&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==_n&&!R)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=m>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:L,maxSamples:A}}function bp(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Qn,o=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const m=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{const M=r?0:n,_=M*4;let x=p.clippingState||null;l.value=x,x=h(m,u,_,f);for(let L=0;L!==_;++L)x[L]=e[L];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,m){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,x=f;_!==v;++_,x+=4)a.copy(d[_]).applyMatrix4(M,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function Sp(i){let t=new WeakMap;function e(a,o){return o===sa?a.mapping=Ri:o===ra&&(a.mapping=Pi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===sa||o===ra)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new fu(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class rc extends tc{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Qi=4,ac=[.125,.215,.35,.446,.526,.582],gi=20,mo=new rc,oc=new zt;let go=null,vo=0,xo=0,_o=!1;const vi=(1+Math.sqrt(5))/2,ts=1/vi,lc=[new E(-vi,ts,0),new E(vi,ts,0),new E(-ts,0,vi),new E(ts,0,vi),new E(0,vi,-ts),new E(0,vi,ts),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)];class yo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){go=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),xo=this._renderer.getActiveMipmapLevel(),_o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(go,vo,xo),this._renderer.xr.enabled=_o,t.scissorTest=!1,_r(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ri||t.mapping===Pi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),go=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),xo=this._renderer.getActiveMipmapLevel(),_o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Be,minFilter:Be,generateMipmaps:!1,type:Ii,format:tn,colorSpace:Ni,depthBuffer:!1},s=cc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wp(r)),this._blurMaterial=Ep(r,t,e)}return s}_compileMaterial(t){const e=new Tt(this._lodPlanes[0],t);this._renderer.compile(e,mo)}_sceneToCubeUV(t,e,n,s){const o=new Ge(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(oc),h.toneMapping=Hn,h.autoClear=!1;const f=new Mn({name:"PMREM.Background",side:Fe,depthWrite:!1,depthTest:!1}),m=new Tt(new Te,f);let v=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,v=!0):(f.color.copy(oc),v=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const _=this._cubeSize;_r(s,M*_,p>2?_:0,_,_),h.setRenderTarget(s),v&&h.render(m,o),h.render(t,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ri||t.mapping===Pi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=dc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Tt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;_r(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,mo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=lc[(s-r-1)%lc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Tt(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*gi-1),v=r/m,g=isFinite(r)?1+Math.floor(h*v):gi;g>gi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${gi}`);const p=[];let M=0;for(let C=0;C<gi;++C){const R=C/v,S=Math.exp(-R*R/2);p.push(S),C===0?M+=S:C<g&&(M+=2*S)}for(let C=0;C<p.length;C++)p[C]=p[C]/M;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:_}=this;u.dTheta.value=m,u.mipInt.value=_-n;const x=this._sizeLods[s],L=3*x*(s>_-Qi?s-_+Qi:0),A=4*(this._cubeSize-x);_r(e,L,A,3*x,2*x),l.setRenderTarget(e),l.render(d,mo)}}function wp(i){const t=[],e=[],n=[];let s=i;const r=i-Qi+1+ac.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Qi?l=ac[a-i+Qi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,m=6,v=3,g=2,p=1,M=new Float32Array(v*m*f),_=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let A=0;A<f;A++){const C=A%3*2/3-1,R=A>2?0:-1,S=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];M.set(S,v*m*A),_.set(u,g*m*A);const y=[A,A,A,A,A,A];x.set(y,p*m*A)}const L=new fe;L.setAttribute("position",new Ee(M,v)),L.setAttribute("uv",new Ee(_,g)),L.setAttribute("faceIndex",new Ee(x,p)),t.push(L),s>Qi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function cc(i,t,e){const n=new Xn(i,t,e);return n.texture.mapping=Xs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _r(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Ep(i,t,e){const n=new Float32Array(gi),s=new E(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function hc(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function dc(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Mo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Tp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===sa||l===ra,h=l===Ri||l===Pi;if(c||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new yo(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new yo(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Ap(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&gs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Cp(i,t,e,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const m in u.attributes)t.remove(u.attributes[m]);for(const m in u.morphAttributes){const v=u.morphAttributes[m];for(let g=0,p=v.length;g<p;g++)t.remove(v[g])}u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const m in u)t.update(u[m],i.ARRAY_BUFFER);const f=d.morphAttributes;for(const m in f){const v=f[m];for(let g=0,p=v.length;g<p;g++)t.update(v[g],i.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,m=d.attributes.position;let v=0;if(f!==null){const M=f.array;v=f.version;for(let _=0,x=M.length;_<x;_+=3){const L=M[_+0],A=M[_+1],C=M[_+2];u.push(L,A,A,C,C,L)}}else if(m!==void 0){const M=m.array;v=m.version;for(let _=0,x=M.length/3-1;_<x;_+=3){const L=_+0,A=_+1,C=_+2;u.push(L,A,A,C,C,L)}}else return;const g=new(Rl(u)?Zl:$l)(u,1);g.version=v;const p=r.get(d);p&&t.remove(p),r.set(d,g)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Rp(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*a),e.update(f,n,1)}function c(u,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,u*a,m),e.update(f,n,m))}function h(u,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function d(u,f,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<u.length;p++)c(u[p]/a,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,v,0,m);let p=0;for(let M=0;M<m;M++)p+=f[M]*v[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Pp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Ip(i,t,e){const n=new WeakMap,s=new ne;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let S=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let _=0;f===!0&&(_=1),m===!0&&(_=2),v===!0&&(_=3);let x=o.attributes.position.count*_,L=1;x>t.maxTextureSize&&(L=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const A=new Float32Array(x*L*4*d),C=new kl(A,x,L,d);C.type=_n,C.needsUpdate=!0;const R=_*4;for(let y=0;y<d;y++){const I=g[y],U=p[y],D=M[y],F=x*L*4*y;for(let X=0;X<I.count;X++){const z=X*R;f===!0&&(s.fromBufferAttribute(I,X),A[F+z+0]=s.x,A[F+z+1]=s.y,A[F+z+2]=s.z,A[F+z+3]=0),m===!0&&(s.fromBufferAttribute(U,X),A[F+z+4]=s.x,A[F+z+5]=s.y,A[F+z+6]=s.z,A[F+z+7]=0),v===!0&&(s.fromBufferAttribute(D,X),A[F+z+8]=s.x,A[F+z+9]=s.y,A[F+z+10]=s.z,A[F+z+11]=D.itemSize===4?s.w:1)}}u={count:d,texture:C,size:new et(x,L)},n.set(o,u),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Lp(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class uc extends De{constructor(t,e,n,s,r,a,o,l,c,h=Di){if(h!==Di&&h!==Ui)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Di&&(n=li),n===void 0&&h===Ui&&(n=Li),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Xe,this.minFilter=l!==void 0?l:Xe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const fc=new De,pc=new uc(1,1),mc=new kl,gc=new Kd,vc=new ic,xc=[],_c=[],yc=new Float32Array(16),Mc=new Float32Array(9),bc=new Float32Array(4);function es(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=xc[s];if(r===void 0&&(r=new Float32Array(s),xc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ce(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function yr(i,t){let e=_c[t];e===void 0&&(e=new Int32Array(t),_c[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Dp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Up(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function Np(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function Fp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function kp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;bc.set(n),i.uniformMatrix2fv(this.addr,!1,bc),Re(e,n)}}function Op(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Mc.set(n),i.uniformMatrix3fv(this.addr,!1,Mc),Re(e,n)}}function zp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;yc.set(n),i.uniformMatrix4fv(this.addr,!1,yc),Re(e,n)}}function Bp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Gp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function Hp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function Vp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function Wp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Xp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function qp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function Yp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function $p(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(pc.compareFunction=Tl,r=pc):r=fc,e.setTexture2D(t||r,s)}function Zp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||gc,s)}function jp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||vc,s)}function Jp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||mc,s)}function Kp(i){switch(i){case 5126:return Dp;case 35664:return Up;case 35665:return Np;case 35666:return Fp;case 35674:return kp;case 35675:return Op;case 35676:return zp;case 5124:case 35670:return Bp;case 35667:case 35671:return Gp;case 35668:case 35672:return Hp;case 35669:case 35673:return Vp;case 5125:return Wp;case 36294:return Xp;case 36295:return qp;case 36296:return Yp;case 35678:case 36198:case 36298:case 36306:case 35682:return $p;case 35679:case 36299:case 36307:return Zp;case 35680:case 36300:case 36308:case 36293:return jp;case 36289:case 36303:case 36311:case 36292:return Jp}}function Qp(i,t){i.uniform1fv(this.addr,t)}function tm(i,t){const e=es(t,this.size,2);i.uniform2fv(this.addr,e)}function em(i,t){const e=es(t,this.size,3);i.uniform3fv(this.addr,e)}function nm(i,t){const e=es(t,this.size,4);i.uniform4fv(this.addr,e)}function im(i,t){const e=es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function sm(i,t){const e=es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function rm(i,t){const e=es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function am(i,t){i.uniform1iv(this.addr,t)}function om(i,t){i.uniform2iv(this.addr,t)}function lm(i,t){i.uniform3iv(this.addr,t)}function cm(i,t){i.uniform4iv(this.addr,t)}function hm(i,t){i.uniform1uiv(this.addr,t)}function dm(i,t){i.uniform2uiv(this.addr,t)}function um(i,t){i.uniform3uiv(this.addr,t)}function fm(i,t){i.uniform4uiv(this.addr,t)}function pm(i,t,e){const n=this.cache,s=t.length,r=yr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||fc,r[a])}function mm(i,t,e){const n=this.cache,s=t.length,r=yr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||gc,r[a])}function gm(i,t,e){const n=this.cache,s=t.length,r=yr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||vc,r[a])}function vm(i,t,e){const n=this.cache,s=t.length,r=yr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||mc,r[a])}function xm(i){switch(i){case 5126:return Qp;case 35664:return tm;case 35665:return em;case 35666:return nm;case 35674:return im;case 35675:return sm;case 35676:return rm;case 5124:case 35670:return am;case 35667:case 35671:return om;case 35668:case 35672:return lm;case 35669:case 35673:return cm;case 5125:return hm;case 36294:return dm;case 36295:return um;case 36296:return fm;case 35678:case 36198:case 36298:case 36306:case 35682:return pm;case 35679:case 36299:case 36307:return mm;case 35680:case 36300:case 36308:case 36293:return gm;case 36289:case 36303:case 36311:case 36292:return vm}}class _m{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Kp(e.type)}}class ym{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=xm(e.type)}}class Mm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const bo=/(\w+)(\])?(\[|\.)?/g;function Sc(i,t){i.seq.push(t),i.map[t.id]=t}function bm(i,t,e){const n=i.name,s=n.length;for(bo.lastIndex=0;;){const r=bo.exec(n),a=bo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Sc(e,c===void 0?new _m(o,i,t):new ym(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new Mm(o),Sc(e,d)),e=d}}}class Mr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);bm(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function wc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Sm=37297;let wm=0;function Em(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Ec=new Vt;function Tm(i){ee._getMatrix(Ec,ee.workingColorSpace,i);const t=`mat3( ${Ec.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case Ks:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Tc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Em(i.getShaderSource(t),a)}else return s}function Am(i,t){const e=Tm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Cm(i,t){let e;switch(t){case dd:e="Linear";break;case ud:e="Reinhard";break;case fd:e="Cineon";break;case fl:e="ACESFilmic";break;case md:e="AgX";break;case gd:e="Neutral";break;case pd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const br=new E;function Rm(){ee.getLuminanceCoefficients(br);const i=br.x.toFixed(4),t=br.y.toFixed(4),e=br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Pm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ms).join(`
`)}function Im(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Lm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ms(i){return i!==""}function Ac(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Cc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Dm=/^[ \t]*#include +<([\w\d./]+)>/gm;function So(i){return i.replace(Dm,Nm)}const Um=new Map;function Nm(i,t){let e=qt[t];if(e===void 0){const n=Um.get(t);if(n!==void 0)e=qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return So(e)}const Fm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rc(i){return i.replace(Fm,km)}function km(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Pc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Om(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ll?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===cl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Tn&&(t="SHADOWMAP_TYPE_VSM"),t}function zm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ri:case Pi:t="ENVMAP_TYPE_CUBE";break;case Xs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Bm(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Pi:t="ENVMAP_MODE_REFRACTION";break}return t}function Gm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ul:t="ENVMAP_BLENDING_MULTIPLY";break;case cd:t="ENVMAP_BLENDING_MIX";break;case hd:t="ENVMAP_BLENDING_ADD";break}return t}function Hm(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Vm(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Om(e),c=zm(e),h=Bm(e),d=Gm(e),u=Hm(e),f=Pm(e),m=Im(r),v=s.createProgram();let g,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ms).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ms).join(`
`),p.length>0&&(p+=`
`)):(g=[Pc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),p=[Pc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hn?"#define TONE_MAPPING":"",e.toneMapping!==Hn?qt.tonemapping_pars_fragment:"",e.toneMapping!==Hn?Cm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,Am("linearToOutputTexel",e.outputColorSpace),Rm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ms).join(`
`)),a=So(a),a=Ac(a,e),a=Cc(a,e),o=So(o),o=Ac(o,e),o=Cc(o,e),a=Rc(a),o=Rc(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Al?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=M+g+a,x=M+p+o,L=wc(s,s.VERTEX_SHADER,_),A=wc(s,s.FRAGMENT_SHADER,x);s.attachShader(v,L),s.attachShader(v,A),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(I){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(v).trim(),D=s.getShaderInfoLog(L).trim(),F=s.getShaderInfoLog(A).trim();let X=!0,z=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,L,A);else{const q=Tc(s,L,"vertex"),H=Tc(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+U+`
`+q+`
`+H)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(D===""||F==="")&&(z=!1);z&&(I.diagnostics={runnable:X,programLog:U,vertexShader:{log:D,prefix:g},fragmentShader:{log:F,prefix:p}})}s.deleteShader(L),s.deleteShader(A),R=new Mr(s,v),S=Lm(s,v)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,Sm)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=wm++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=A,this}let Wm=0;class Xm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new qm(t),e.set(t,n)),n}}class qm{constructor(t){this.id=Wm++,this.code=t,this.usedTimes=0}}function Ym(i,t,e,n,s,r,a){const o=new Qa,l=new Xm,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,y,I,U,D){const F=U.fog,X=D.geometry,z=S.isMeshStandardMaterial?U.environment:null,q=(S.isMeshStandardMaterial?e:t).get(S.envMap||z),H=q&&q.mapping===Xs?q.image.height:null,rt=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const it=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,lt=it!==void 0?it.length:0;let yt=0;X.morphAttributes.position!==void 0&&(yt=1),X.morphAttributes.normal!==void 0&&(yt=2),X.morphAttributes.color!==void 0&&(yt=3);let Bt,B,Z,ot;if(rt){const ce=Sn[rt];Bt=ce.vertexShader,B=ce.fragmentShader}else Bt=S.vertexShader,B=S.fragmentShader,l.update(S),Z=l.getVertexShaderID(S),ot=l.getFragmentShaderID(S);const nt=i.getRenderTarget(),_t=i.state.buffers.depth.getReversed(),Ut=D.isInstancedMesh===!0,Nt=D.isBatchedMesh===!0,$t=!!S.map,Q=!!S.matcap,ct=!!q,P=!!S.aoMap,Lt=!!S.lightMap,st=!!S.bumpMap,St=!!S.normalMap,ut=!!S.displacementMap,kt=!!S.emissiveMap,Mt=!!S.metalnessMap,T=!!S.roughnessMap,b=S.anisotropy>0,G=S.clearcoat>0,j=S.dispersion>0,tt=S.iridescence>0,J=S.sheen>0,Ct=S.transmission>0,pt=b&&!!S.anisotropyMap,bt=G&&!!S.clearcoatMap,Jt=G&&!!S.clearcoatNormalMap,at=G&&!!S.clearcoatRoughnessMap,wt=tt&&!!S.iridescenceMap,Ot=tt&&!!S.iridescenceThicknessMap,Gt=J&&!!S.sheenColorMap,Et=J&&!!S.sheenRoughnessMap,te=!!S.specularMap,Yt=!!S.specularColorMap,de=!!S.specularIntensityMap,N=Ct&&!!S.transmissionMap,mt=Ct&&!!S.thicknessMap,$=!!S.gradientMap,K=!!S.alphaMap,xt=S.alphaTest>0,gt=!!S.alphaHash,Wt=!!S.extensions;let ye=Hn;S.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(ye=i.toneMapping);const Ne={shaderID:rt,shaderType:S.type,shaderName:S.name,vertexShader:Bt,fragmentShader:B,defines:S.defines,customVertexShaderID:Z,customFragmentShaderID:ot,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Nt,batchingColor:Nt&&D._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&D.instanceColor!==null,instancingMorph:Ut&&D.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Ni,alphaToCoverage:!!S.alphaToCoverage,map:$t,matcap:Q,envMap:ct,envMapMode:ct&&q.mapping,envMapCubeUVHeight:H,aoMap:P,lightMap:Lt,bumpMap:st,normalMap:St,displacementMap:u&&ut,emissiveMap:kt,normalMapObjectSpace:St&&S.normalMapType===yd,normalMapTangentSpace:St&&S.normalMapType===wl,metalnessMap:Mt,roughnessMap:T,anisotropy:b,anisotropyMap:pt,clearcoat:G,clearcoatMap:bt,clearcoatNormalMap:Jt,clearcoatRoughnessMap:at,dispersion:j,iridescence:tt,iridescenceMap:wt,iridescenceThicknessMap:Ot,sheen:J,sheenColorMap:Gt,sheenRoughnessMap:Et,specularMap:te,specularColorMap:Yt,specularIntensityMap:de,transmission:Ct,transmissionMap:N,thicknessMap:mt,gradientMap:$,opaque:S.transparent===!1&&S.blending===Ai&&S.alphaToCoverage===!1,alphaMap:K,alphaTest:xt,alphaHash:gt,combine:S.combine,mapUv:$t&&v(S.map.channel),aoMapUv:P&&v(S.aoMap.channel),lightMapUv:Lt&&v(S.lightMap.channel),bumpMapUv:st&&v(S.bumpMap.channel),normalMapUv:St&&v(S.normalMap.channel),displacementMapUv:ut&&v(S.displacementMap.channel),emissiveMapUv:kt&&v(S.emissiveMap.channel),metalnessMapUv:Mt&&v(S.metalnessMap.channel),roughnessMapUv:T&&v(S.roughnessMap.channel),anisotropyMapUv:pt&&v(S.anisotropyMap.channel),clearcoatMapUv:bt&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Jt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:wt&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ot&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Gt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Et&&v(S.sheenRoughnessMap.channel),specularMapUv:te&&v(S.specularMap.channel),specularColorMapUv:Yt&&v(S.specularColorMap.channel),specularIntensityMapUv:de&&v(S.specularIntensityMap.channel),transmissionMapUv:N&&v(S.transmissionMap.channel),thicknessMapUv:mt&&v(S.thicknessMap.channel),alphaMapUv:K&&v(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(St||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!X.attributes.uv&&($t||K),fog:!!F,useFog:S.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:_t,skinning:D.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:lt,morphTextureStride:yt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ye,decodeVideoTexture:$t&&S.map.isVideoTexture===!0&&ee.getTransfer(S.map.colorSpace)===he,decodeVideoTextureEmissive:kt&&S.emissiveMap.isVideoTexture===!0&&ee.getTransfer(S.emissiveMap.colorSpace)===he,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ve,flipSided:S.side===Fe,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Wt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Wt&&S.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function p(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)y.push(I),y.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(M(y,S),_(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function M(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function _(S,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),S.push(o.mask)}function x(S){const y=m[S.type];let I;if(y){const U=Sn[y];I=uo.clone(U.uniforms)}else I=S.uniforms;return I}function L(S,y){let I;for(let U=0,D=h.length;U<D;U++){const F=h[U];if(F.cacheKey===y){I=F,++I.usedTimes;break}}return I===void 0&&(I=new Vm(i,y,S,r),h.push(I)),I}function A(S){if(--S.usedTimes===0){const y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function C(S){l.remove(S)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:L,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:R}}function $m(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Zm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Ic(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Lc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,u,f,m,v,g){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:m,renderOrder:d.renderOrder,z:v,group:g},i[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=v,p.group=g),t++,p}function o(d,u,f,m,v,g){const p=a(d,u,f,m,v,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(d,u,f,m,v,g){const p=a(d,u,f,m,v,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||Zm),n.length>1&&n.sort(u||Ic),s.length>1&&s.sort(u||Ic)}function h(){for(let d=t,u=i.length;d<u;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function jm(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Lc,i.set(n,[a])):s>=r.length?(a=new Lc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Jm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new E,color:new zt};break;case"SpotLight":e={position:new E,direction:new E,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new E,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new E,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new E,halfWidth:new E,halfHeight:new E};break}return i[t.id]=e,e}}}function Km(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Qm=0;function t0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function e0(i){const t=new Jm,e=Km(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);const s=new E,r=new Zt,a=new Zt;function o(c){let h=0,d=0,u=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,M=0,_=0,x=0,L=0,A=0,C=0;c.sort(t0);for(let S=0,y=c.length;S<y;S++){const I=c[S],U=I.color,D=I.intensity,F=I.distance,X=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=U.r*D,d+=U.g*D,u+=U.b*D;else if(I.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(I.sh.coefficients[z],D);C++}else if(I.isDirectionalLight){const z=t.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const q=I.shadow,H=e.get(I);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=I.shadow.matrix,M++}n.directional[f]=z,f++}else if(I.isSpotLight){const z=t.get(I);z.position.setFromMatrixPosition(I.matrixWorld),z.color.copy(U).multiplyScalar(D),z.distance=F,z.coneCos=Math.cos(I.angle),z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),z.decay=I.decay,n.spot[v]=z;const q=I.shadow;if(I.map&&(n.spotLightMap[L]=I.map,L++,q.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[v]=q.matrix,I.castShadow){const H=e.get(I);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,n.spotShadow[v]=H,n.spotShadowMap[v]=X,x++}v++}else if(I.isRectAreaLight){const z=t.get(I);z.color.copy(U).multiplyScalar(D),z.halfWidth.set(I.width*.5,0,0),z.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=z,g++}else if(I.isPointLight){const z=t.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),z.distance=I.distance,z.decay=I.decay,I.castShadow){const q=I.shadow,H=e.get(I);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,H.shadowCameraNear=q.camera.near,H.shadowCameraFar=q.camera.far,n.pointShadow[m]=H,n.pointShadowMap[m]=X,n.pointShadowMatrix[m]=I.shadow.matrix,_++}n.point[m]=z,m++}else if(I.isHemisphereLight){const z=t.get(I);z.skyColor.copy(I.color).multiplyScalar(D),z.groundColor.copy(I.groundColor).multiplyScalar(D),n.hemi[p]=z,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const R=n.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==v||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==M||R.numPointShadows!==_||R.numSpotShadows!==x||R.numSpotMaps!==L||R.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=x+L-A,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,R.directionalLength=f,R.pointLength=m,R.spotLength=v,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=M,R.numPointShadows=_,R.numSpotShadows=x,R.numSpotMaps=L,R.numLightProbes=C,n.version=Qm++)}function l(c,h){let d=0,u=0,f=0,m=0,v=0;const g=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const _=c[p];if(_.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),d++}else if(_.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),f++}else if(_.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),a.identity(),r.copy(_.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(_.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),u++}else if(_.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Dc(i){const t=new e0(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function n0(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Dc(i),t.set(s,[o])):r>=a.length?(o=new Dc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class i0 extends ui{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=xd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class s0 extends ui{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const r0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,a0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function o0(i,t,e){let n=new po;const s=new et,r=new et,a=new ne,o=new i0({depthPacking:_d}),l=new s0,c={},h=e.maxTextureSize,d={[Bn]:Fe,[Fe]:Bn,[ve]:ve},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:r0,fragmentShader:a0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const m=new fe;m.setAttribute("position",new Ee(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Tt(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ll;let p=this.type;this.render=function(A,C,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),y=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Gn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const D=p!==Tn&&this.type===Tn,F=p===Tn&&this.type!==Tn;for(let X=0,z=A.length;X<z;X++){const q=A[X],H=q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const rt=H.getFrameExtents();if(s.multiply(rt),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/rt.x),s.x=r.x*rt.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/rt.y),s.y=r.y*rt.y,H.mapSize.y=r.y)),H.map===null||D===!0||F===!0){const lt=this.type!==Tn?{minFilter:Xe,magFilter:Xe}:{};H.map!==null&&H.map.dispose(),H.map=new Xn(s.x,s.y,lt),H.map.texture.name=q.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const it=H.getViewportCount();for(let lt=0;lt<it;lt++){const yt=H.getViewport(lt);a.set(r.x*yt.x,r.y*yt.y,r.x*yt.z,r.y*yt.w),U.viewport(a),H.updateMatrices(q,lt),n=H.getFrustum(),x(C,R,H.camera,q,this.type)}H.isPointLightShadow!==!0&&this.type===Tn&&M(H,R),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,y,I)};function M(A,C){const R=t.update(v);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Xn(s.x,s.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(C,null,R,u,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(C,null,R,f,v,null)}function _(A,C,R,S){let y=null;const I=R.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)y=I;else if(y=R.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const U=y.uuid,D=C.uuid;let F=c[U];F===void 0&&(F={},c[U]=F);let X=F[D];X===void 0&&(X=y.clone(),F[D]=X,C.addEventListener("dispose",L)),y=X}if(y.visible=C.visible,y.wireframe=C.wireframe,S===Tn?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:d[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const U=i.properties.get(y);U.light=R}return y}function x(A,C,R,S,y){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Tn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,A.matrixWorld);const D=t.update(A),F=A.material;if(Array.isArray(F)){const X=D.groups;for(let z=0,q=X.length;z<q;z++){const H=X[z],rt=F[H.materialIndex];if(rt&&rt.visible){const it=_(A,rt,S,y);A.onBeforeShadow(i,A,C,R,D,it,H),i.renderBufferDirect(R,null,D,it,A,H),A.onAfterShadow(i,A,C,R,D,it,H)}}}else if(F.visible){const X=_(A,F,S,y);A.onBeforeShadow(i,A,C,R,D,X,null),i.renderBufferDirect(R,null,D,X,A,null),A.onAfterShadow(i,A,C,R,D,X,null)}}const U=A.children;for(let D=0,F=U.length;D<F;D++)x(U[D],C,R,S,y)}function L(A){A.target.removeEventListener("dispose",L);for(const R in c){const S=c[R],y=A.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const l0={[Jr]:Kr,[Qr]:na,[ta]:ia,[Ci]:ea,[Kr]:Jr,[na]:Qr,[ia]:ta,[ea]:Ci};function c0(i,t){function e(){let N=!1;const mt=new ne;let $=null;const K=new ne(0,0,0,0);return{setMask:function(xt){$!==xt&&!N&&(i.colorMask(xt,xt,xt,xt),$=xt)},setLocked:function(xt){N=xt},setClear:function(xt,gt,Wt,ye,Ne){Ne===!0&&(xt*=ye,gt*=ye,Wt*=ye),mt.set(xt,gt,Wt,ye),K.equals(mt)===!1&&(i.clearColor(xt,gt,Wt,ye),K.copy(mt))},reset:function(){N=!1,$=null,K.set(-1,0,0,0)}}}function n(){let N=!1,mt=!1,$=null,K=null,xt=null;return{setReversed:function(gt){if(mt!==gt){const Wt=t.get("EXT_clip_control");mt?Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.ZERO_TO_ONE_EXT):Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.NEGATIVE_ONE_TO_ONE_EXT);const ye=xt;xt=null,this.setClear(ye)}mt=gt},getReversed:function(){return mt},setTest:function(gt){gt?nt(i.DEPTH_TEST):_t(i.DEPTH_TEST)},setMask:function(gt){$!==gt&&!N&&(i.depthMask(gt),$=gt)},setFunc:function(gt){if(mt&&(gt=l0[gt]),K!==gt){switch(gt){case Jr:i.depthFunc(i.NEVER);break;case Kr:i.depthFunc(i.ALWAYS);break;case Qr:i.depthFunc(i.LESS);break;case Ci:i.depthFunc(i.LEQUAL);break;case ta:i.depthFunc(i.EQUAL);break;case ea:i.depthFunc(i.GEQUAL);break;case na:i.depthFunc(i.GREATER);break;case ia:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=gt}},setLocked:function(gt){N=gt},setClear:function(gt){xt!==gt&&(mt&&(gt=1-gt),i.clearDepth(gt),xt=gt)},reset:function(){N=!1,$=null,K=null,xt=null,mt=!1}}}function s(){let N=!1,mt=null,$=null,K=null,xt=null,gt=null,Wt=null,ye=null,Ne=null;return{setTest:function(ce){N||(ce?nt(i.STENCIL_TEST):_t(i.STENCIL_TEST))},setMask:function(ce){mt!==ce&&!N&&(i.stencilMask(ce),mt=ce)},setFunc:function(ce,gn,On){($!==ce||K!==gn||xt!==On)&&(i.stencilFunc(ce,gn,On),$=ce,K=gn,xt=On)},setOp:function(ce,gn,On){(gt!==ce||Wt!==gn||ye!==On)&&(i.stencilOp(ce,gn,On),gt=ce,Wt=gn,ye=On)},setLocked:function(ce){N=ce},setClear:function(ce){Ne!==ce&&(i.clearStencil(ce),Ne=ce)},reset:function(){N=!1,mt=null,$=null,K=null,xt=null,gt=null,Wt=null,ye=null,Ne=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],m=null,v=!1,g=null,p=null,M=null,_=null,x=null,L=null,A=null,C=new zt(0,0,0),R=0,S=!1,y=null,I=null,U=null,D=null,F=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,q=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(H)[1]),z=q>=1):H.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),z=q>=2);let rt=null,it={};const lt=i.getParameter(i.SCISSOR_BOX),yt=i.getParameter(i.VIEWPORT),Bt=new ne().fromArray(lt),B=new ne().fromArray(yt);function Z(N,mt,$,K){const xt=new Uint8Array(4),gt=i.createTexture();i.bindTexture(N,gt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Wt=0;Wt<$;Wt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(mt,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(mt+Wt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return gt}const ot={};ot[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),ot[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ot[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ot[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(i.DEPTH_TEST),a.setFunc(Ci),st(!1),St(ol),nt(i.CULL_FACE),P(Gn);function nt(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function _t(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Ut(N,mt){return d[N]!==mt?(i.bindFramebuffer(N,mt),d[N]=mt,N===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=mt),N===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=mt),!0):!1}function Nt(N,mt){let $=f,K=!1;if(N){$=u.get(mt),$===void 0&&($=[],u.set(mt,$));const xt=N.textures;if($.length!==xt.length||$[0]!==i.COLOR_ATTACHMENT0){for(let gt=0,Wt=xt.length;gt<Wt;gt++)$[gt]=i.COLOR_ATTACHMENT0+gt;$.length=xt.length,K=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,K=!0);K&&i.drawBuffers($)}function $t(N){return m!==N?(i.useProgram(N),m=N,!0):!1}const Q={[ai]:i.FUNC_ADD,[qh]:i.FUNC_SUBTRACT,[Yh]:i.FUNC_REVERSE_SUBTRACT};Q[$h]=i.MIN,Q[Zh]=i.MAX;const ct={[jh]:i.ZERO,[Jh]:i.ONE,[Kh]:i.SRC_COLOR,[Zr]:i.SRC_ALPHA,[sd]:i.SRC_ALPHA_SATURATE,[nd]:i.DST_COLOR,[td]:i.DST_ALPHA,[Qh]:i.ONE_MINUS_SRC_COLOR,[jr]:i.ONE_MINUS_SRC_ALPHA,[id]:i.ONE_MINUS_DST_COLOR,[ed]:i.ONE_MINUS_DST_ALPHA,[rd]:i.CONSTANT_COLOR,[ad]:i.ONE_MINUS_CONSTANT_COLOR,[od]:i.CONSTANT_ALPHA,[ld]:i.ONE_MINUS_CONSTANT_ALPHA};function P(N,mt,$,K,xt,gt,Wt,ye,Ne,ce){if(N===Gn){v===!0&&(_t(i.BLEND),v=!1);return}if(v===!1&&(nt(i.BLEND),v=!0),N!==Xh){if(N!==g||ce!==S){if((p!==ai||x!==ai)&&(i.blendEquation(i.FUNC_ADD),p=ai,x=ai),ce)switch(N){case Ai:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xn:i.blendFunc(i.ONE,i.ONE);break;case hl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case dl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ai:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xn:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case hl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case dl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}M=null,_=null,L=null,A=null,C.set(0,0,0),R=0,g=N,S=ce}return}xt=xt||mt,gt=gt||$,Wt=Wt||K,(mt!==p||xt!==x)&&(i.blendEquationSeparate(Q[mt],Q[xt]),p=mt,x=xt),($!==M||K!==_||gt!==L||Wt!==A)&&(i.blendFuncSeparate(ct[$],ct[K],ct[gt],ct[Wt]),M=$,_=K,L=gt,A=Wt),(ye.equals(C)===!1||Ne!==R)&&(i.blendColor(ye.r,ye.g,ye.b,Ne),C.copy(ye),R=Ne),g=N,S=!1}function Lt(N,mt){N.side===ve?_t(i.CULL_FACE):nt(i.CULL_FACE);let $=N.side===Fe;mt&&($=!$),st($),N.blending===Ai&&N.transparent===!1?P(Gn):P(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const K=N.stencilWrite;o.setTest(K),K&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),kt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):_t(i.SAMPLE_ALPHA_TO_COVERAGE)}function st(N){y!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),y=N)}function St(N){N!==Vh?(nt(i.CULL_FACE),N!==I&&(N===ol?i.cullFace(i.BACK):N===Wh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_t(i.CULL_FACE),I=N}function ut(N){N!==U&&(z&&i.lineWidth(N),U=N)}function kt(N,mt,$){N?(nt(i.POLYGON_OFFSET_FILL),(D!==mt||F!==$)&&(i.polygonOffset(mt,$),D=mt,F=$)):_t(i.POLYGON_OFFSET_FILL)}function Mt(N){N?nt(i.SCISSOR_TEST):_t(i.SCISSOR_TEST)}function T(N){N===void 0&&(N=i.TEXTURE0+X-1),rt!==N&&(i.activeTexture(N),rt=N)}function b(N,mt,$){$===void 0&&(rt===null?$=i.TEXTURE0+X-1:$=rt);let K=it[$];K===void 0&&(K={type:void 0,texture:void 0},it[$]=K),(K.type!==N||K.texture!==mt)&&(rt!==$&&(i.activeTexture($),rt=$),i.bindTexture(N,mt||ot[N]),K.type=N,K.texture=mt)}function G(){const N=it[rt];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ct(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function bt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Jt(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function at(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function wt(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ot(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Gt(N){Bt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Bt.copy(N))}function Et(N){B.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),B.copy(N))}function te(N,mt){let $=c.get(mt);$===void 0&&($=new WeakMap,c.set(mt,$));let K=$.get(N);K===void 0&&(K=i.getUniformBlockIndex(mt,N.name),$.set(N,K))}function Yt(N,mt){const K=c.get(mt).get(N);l.get(mt)!==K&&(i.uniformBlockBinding(mt,K,N.__bindingPointIndex),l.set(mt,K))}function de(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},rt=null,it={},d={},u=new WeakMap,f=[],m=null,v=!1,g=null,p=null,M=null,_=null,x=null,L=null,A=null,C=new zt(0,0,0),R=0,S=!1,y=null,I=null,U=null,D=null,F=null,Bt.set(0,0,i.canvas.width,i.canvas.height),B.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:_t,bindFramebuffer:Ut,drawBuffers:Nt,useProgram:$t,setBlending:P,setMaterial:Lt,setFlipSided:st,setCullFace:St,setLineWidth:ut,setPolygonOffset:kt,setScissorTest:Mt,activeTexture:T,bindTexture:b,unbindTexture:G,compressedTexImage2D:j,compressedTexImage3D:tt,texImage2D:wt,texImage3D:Ot,updateUBOMapping:te,uniformBlockBinding:Yt,texStorage2D:Jt,texStorage3D:at,texSubImage2D:J,texSubImage3D:Ct,compressedTexSubImage2D:pt,compressedTexSubImage3D:bt,scissor:Gt,viewport:Et,reset:de}}function Uc(i,t,e,n){const s=h0(n);switch(e){case xl:return i*t;case yl:return i*t;case Ml:return i*t*2;case ua:return i*t/s.components*s.byteLength;case fa:return i*t/s.components*s.byteLength;case bl:return i*t*2/s.components*s.byteLength;case pa:return i*t*2/s.components*s.byteLength;case _l:return i*t*3/s.components*s.byteLength;case tn:return i*t*4/s.components*s.byteLength;case ma:return i*t*4/s.components*s.byteLength;case Ys:case $s:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Zs:case js:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case va:case _a:return Math.max(i,16)*Math.max(t,8)/4;case ga:case xa:return Math.max(i,8)*Math.max(t,8)/2;case ya:case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ea:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ca:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ra:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Pa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case La:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Da:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ua:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Na:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Fa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Js:case ka:case Oa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Sl:case za:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ba:case Ga:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function h0(i){switch(i){case An:case ml:return{byteLength:1,components:1};case us:case gl:case Ii:return{byteLength:2,components:1};case ha:case da:return{byteLength:2,components:4};case li:case ca:case _n:return{byteLength:4,components:1};case vl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function d0(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new et,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(T,b){return f?new OffscreenCanvas(T,b):tr("canvas")}function v(T,b,G){let j=1;const tt=Mt(T);if((tt.width>G||tt.height>G)&&(j=G/Math.max(tt.width,tt.height)),j<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const J=Math.floor(j*tt.width),Ct=Math.floor(j*tt.height);d===void 0&&(d=m(J,Ct));const pt=b?m(J,Ct):d;return pt.width=J,pt.height=Ct,pt.getContext("2d").drawImage(T,0,0,J,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+J+"x"+Ct+")."),pt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),T;return T}function g(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(T,b,G,j,tt=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let J=b;if(b===i.RED&&(G===i.FLOAT&&(J=i.R32F),G===i.HALF_FLOAT&&(J=i.R16F),G===i.UNSIGNED_BYTE&&(J=i.R8)),b===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(J=i.R8UI),G===i.UNSIGNED_SHORT&&(J=i.R16UI),G===i.UNSIGNED_INT&&(J=i.R32UI),G===i.BYTE&&(J=i.R8I),G===i.SHORT&&(J=i.R16I),G===i.INT&&(J=i.R32I)),b===i.RG&&(G===i.FLOAT&&(J=i.RG32F),G===i.HALF_FLOAT&&(J=i.RG16F),G===i.UNSIGNED_BYTE&&(J=i.RG8)),b===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(J=i.RG8UI),G===i.UNSIGNED_SHORT&&(J=i.RG16UI),G===i.UNSIGNED_INT&&(J=i.RG32UI),G===i.BYTE&&(J=i.RG8I),G===i.SHORT&&(J=i.RG16I),G===i.INT&&(J=i.RG32I)),b===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(J=i.RGB8UI),G===i.UNSIGNED_SHORT&&(J=i.RGB16UI),G===i.UNSIGNED_INT&&(J=i.RGB32UI),G===i.BYTE&&(J=i.RGB8I),G===i.SHORT&&(J=i.RGB16I),G===i.INT&&(J=i.RGB32I)),b===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),G===i.UNSIGNED_INT&&(J=i.RGBA32UI),G===i.BYTE&&(J=i.RGBA8I),G===i.SHORT&&(J=i.RGBA16I),G===i.INT&&(J=i.RGBA32I)),b===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),b===i.RGBA){const Ct=tt?Ks:ee.getTransfer(j);G===i.FLOAT&&(J=i.RGBA32F),G===i.HALF_FLOAT&&(J=i.RGBA16F),G===i.UNSIGNED_BYTE&&(J=Ct===he?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function x(T,b){let G;return T?b===null||b===li||b===Li?G=i.DEPTH24_STENCIL8:b===_n?G=i.DEPTH32F_STENCIL8:b===us&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===li||b===Li?G=i.DEPTH_COMPONENT24:b===_n?G=i.DEPTH_COMPONENT32F:b===us&&(G=i.DEPTH_COMPONENT16),G}function L(T,b){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==Xe&&T.minFilter!==Be?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function A(T){const b=T.target;b.removeEventListener("dispose",A),R(b),b.isVideoTexture&&h.delete(b)}function C(T){const b=T.target;b.removeEventListener("dispose",C),y(b)}function R(T){const b=n.get(T);if(b.__webglInit===void 0)return;const G=T.source,j=u.get(G);if(j){const tt=j[b.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&S(T),Object.keys(j).length===0&&u.delete(G)}n.remove(T)}function S(T){const b=n.get(T);i.deleteTexture(b.__webglTexture);const G=T.source,j=u.get(G);delete j[b.__cacheKey],a.memory.textures--}function y(T){const b=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(b.__webglFramebuffer[j]))for(let tt=0;tt<b.__webglFramebuffer[j].length;tt++)i.deleteFramebuffer(b.__webglFramebuffer[j][tt]);else i.deleteFramebuffer(b.__webglFramebuffer[j]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[j])}else{if(Array.isArray(b.__webglFramebuffer))for(let j=0;j<b.__webglFramebuffer.length;j++)i.deleteFramebuffer(b.__webglFramebuffer[j]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let j=0;j<b.__webglColorRenderbuffer.length;j++)b.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[j]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const G=T.textures;for(let j=0,tt=G.length;j<tt;j++){const J=n.get(G[j]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),a.memory.textures--),n.remove(G[j])}n.remove(T)}let I=0;function U(){I=0}function D(){const T=I;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),I+=1,T}function F(T){const b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function X(T,b){const G=n.get(T);if(T.isVideoTexture&&ut(T),T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){const j=T.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{B(G,T,b);return}}e.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+b)}function z(T,b){const G=n.get(T);if(T.version>0&&G.__version!==T.version){B(G,T,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+b)}function q(T,b){const G=n.get(T);if(T.version>0&&G.__version!==T.version){B(G,T,b);return}e.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+b)}function H(T,b){const G=n.get(T);if(T.version>0&&G.__version!==T.version){Z(G,T,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+b)}const rt={[aa]:i.REPEAT,[Vn]:i.CLAMP_TO_EDGE,[oa]:i.MIRRORED_REPEAT},it={[Xe]:i.NEAREST,[vd]:i.NEAREST_MIPMAP_NEAREST,[qs]:i.NEAREST_MIPMAP_LINEAR,[Be]:i.LINEAR,[la]:i.LINEAR_MIPMAP_NEAREST,[oi]:i.LINEAR_MIPMAP_LINEAR},lt={[Md]:i.NEVER,[Ad]:i.ALWAYS,[bd]:i.LESS,[Tl]:i.LEQUAL,[Sd]:i.EQUAL,[Td]:i.GEQUAL,[wd]:i.GREATER,[Ed]:i.NOTEQUAL};function yt(T,b){if(b.type===_n&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Be||b.magFilter===la||b.magFilter===qs||b.magFilter===oi||b.minFilter===Be||b.minFilter===la||b.minFilter===qs||b.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,rt[b.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,rt[b.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,rt[b.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,it[b.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,it[b.minFilter]),b.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,lt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Xe||b.minFilter!==qs&&b.minFilter!==oi||b.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Bt(T,b){let G=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",A));const j=b.source;let tt=u.get(j);tt===void 0&&(tt={},u.set(j,tt));const J=F(b);if(J!==T.__cacheKey){tt[J]===void 0&&(tt[J]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),tt[J].usedTimes++;const Ct=tt[T.__cacheKey];Ct!==void 0&&(tt[T.__cacheKey].usedTimes--,Ct.usedTimes===0&&S(b)),T.__cacheKey=J,T.__webglTexture=tt[J].texture}return G}function B(T,b,G){let j=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(j=i.TEXTURE_3D);const tt=Bt(T,b),J=b.source;e.bindTexture(j,T.__webglTexture,i.TEXTURE0+G);const Ct=n.get(J);if(J.version!==Ct.__version||tt===!0){e.activeTexture(i.TEXTURE0+G);const pt=ee.getPrimaries(ee.workingColorSpace),bt=b.colorSpace===Wn?null:ee.getPrimaries(b.colorSpace),Jt=b.colorSpace===Wn||pt===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);let at=v(b.image,!1,s.maxTextureSize);at=kt(b,at);const wt=r.convert(b.format,b.colorSpace),Ot=r.convert(b.type);let Gt=_(b.internalFormat,wt,Ot,b.colorSpace,b.isVideoTexture);yt(j,b);let Et;const te=b.mipmaps,Yt=b.isVideoTexture!==!0,de=Ct.__version===void 0||tt===!0,N=J.dataReady,mt=L(b,at);if(b.isDepthTexture)Gt=x(b.format===Ui,b.type),de&&(Yt?e.texStorage2D(i.TEXTURE_2D,1,Gt,at.width,at.height):e.texImage2D(i.TEXTURE_2D,0,Gt,at.width,at.height,0,wt,Ot,null));else if(b.isDataTexture)if(te.length>0){Yt&&de&&e.texStorage2D(i.TEXTURE_2D,mt,Gt,te[0].width,te[0].height);for(let $=0,K=te.length;$<K;$++)Et=te[$],Yt?N&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,Et.width,Et.height,wt,Ot,Et.data):e.texImage2D(i.TEXTURE_2D,$,Gt,Et.width,Et.height,0,wt,Ot,Et.data);b.generateMipmaps=!1}else Yt?(de&&e.texStorage2D(i.TEXTURE_2D,mt,Gt,at.width,at.height),N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,at.width,at.height,wt,Ot,at.data)):e.texImage2D(i.TEXTURE_2D,0,Gt,at.width,at.height,0,wt,Ot,at.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Yt&&de&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Gt,te[0].width,te[0].height,at.depth);for(let $=0,K=te.length;$<K;$++)if(Et=te[$],b.format!==tn)if(wt!==null)if(Yt){if(N)if(b.layerUpdates.size>0){const xt=Uc(Et.width,Et.height,b.format,b.type);for(const gt of b.layerUpdates){const Wt=Et.data.subarray(gt*xt/Et.data.BYTES_PER_ELEMENT,(gt+1)*xt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,gt,Et.width,Et.height,1,wt,Wt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Et.width,Et.height,at.depth,wt,Et.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,Gt,Et.width,Et.height,at.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Yt?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Et.width,Et.height,at.depth,wt,Ot,Et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,Gt,Et.width,Et.height,at.depth,0,wt,Ot,Et.data)}else{Yt&&de&&e.texStorage2D(i.TEXTURE_2D,mt,Gt,te[0].width,te[0].height);for(let $=0,K=te.length;$<K;$++)Et=te[$],b.format!==tn?wt!==null?Yt?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,Et.width,Et.height,wt,Et.data):e.compressedTexImage2D(i.TEXTURE_2D,$,Gt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Yt?N&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,Et.width,Et.height,wt,Ot,Et.data):e.texImage2D(i.TEXTURE_2D,$,Gt,Et.width,Et.height,0,wt,Ot,Et.data)}else if(b.isDataArrayTexture)if(Yt){if(de&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Gt,at.width,at.height,at.depth),N)if(b.layerUpdates.size>0){const $=Uc(at.width,at.height,b.format,b.type);for(const K of b.layerUpdates){const xt=at.data.subarray(K*$/at.data.BYTES_PER_ELEMENT,(K+1)*$/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,at.width,at.height,1,wt,Ot,xt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,wt,Ot,at.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Gt,at.width,at.height,at.depth,0,wt,Ot,at.data);else if(b.isData3DTexture)Yt?(de&&e.texStorage3D(i.TEXTURE_3D,mt,Gt,at.width,at.height,at.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,wt,Ot,at.data)):e.texImage3D(i.TEXTURE_3D,0,Gt,at.width,at.height,at.depth,0,wt,Ot,at.data);else if(b.isFramebufferTexture){if(de)if(Yt)e.texStorage2D(i.TEXTURE_2D,mt,Gt,at.width,at.height);else{let $=at.width,K=at.height;for(let xt=0;xt<mt;xt++)e.texImage2D(i.TEXTURE_2D,xt,Gt,$,K,0,wt,Ot,null),$>>=1,K>>=1}}else if(te.length>0){if(Yt&&de){const $=Mt(te[0]);e.texStorage2D(i.TEXTURE_2D,mt,Gt,$.width,$.height)}for(let $=0,K=te.length;$<K;$++)Et=te[$],Yt?N&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,wt,Ot,Et):e.texImage2D(i.TEXTURE_2D,$,Gt,wt,Ot,Et);b.generateMipmaps=!1}else if(Yt){if(de){const $=Mt(at);e.texStorage2D(i.TEXTURE_2D,mt,Gt,$.width,$.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,wt,Ot,at)}else e.texImage2D(i.TEXTURE_2D,0,Gt,wt,Ot,at);g(b)&&p(j),Ct.__version=J.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function Z(T,b,G){if(b.image.length!==6)return;const j=Bt(T,b),tt=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+G);const J=n.get(tt);if(tt.version!==J.__version||j===!0){e.activeTexture(i.TEXTURE0+G);const Ct=ee.getPrimaries(ee.workingColorSpace),pt=b.colorSpace===Wn?null:ee.getPrimaries(b.colorSpace),bt=b.colorSpace===Wn||Ct===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const Jt=b.isCompressedTexture||b.image[0].isCompressedTexture,at=b.image[0]&&b.image[0].isDataTexture,wt=[];for(let K=0;K<6;K++)!Jt&&!at?wt[K]=v(b.image[K],!0,s.maxCubemapSize):wt[K]=at?b.image[K].image:b.image[K],wt[K]=kt(b,wt[K]);const Ot=wt[0],Gt=r.convert(b.format,b.colorSpace),Et=r.convert(b.type),te=_(b.internalFormat,Gt,Et,b.colorSpace),Yt=b.isVideoTexture!==!0,de=J.__version===void 0||j===!0,N=tt.dataReady;let mt=L(b,Ot);yt(i.TEXTURE_CUBE_MAP,b);let $;if(Jt){Yt&&de&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,te,Ot.width,Ot.height);for(let K=0;K<6;K++){$=wt[K].mipmaps;for(let xt=0;xt<$.length;xt++){const gt=$[xt];b.format!==tn?Gt!==null?Yt?N&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt,0,0,gt.width,gt.height,Gt,gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt,te,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Yt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt,0,0,gt.width,gt.height,Gt,Et,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt,te,gt.width,gt.height,0,Gt,Et,gt.data)}}}else{if($=b.mipmaps,Yt&&de){$.length>0&&mt++;const K=Mt(wt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,te,K.width,K.height)}for(let K=0;K<6;K++)if(at){Yt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,wt[K].width,wt[K].height,Gt,Et,wt[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,te,wt[K].width,wt[K].height,0,Gt,Et,wt[K].data);for(let xt=0;xt<$.length;xt++){const Wt=$[xt].image[K].image;Yt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt+1,0,0,Wt.width,Wt.height,Gt,Et,Wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt+1,te,Wt.width,Wt.height,0,Gt,Et,Wt.data)}}else{Yt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Gt,Et,wt[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,te,Gt,Et,wt[K]);for(let xt=0;xt<$.length;xt++){const gt=$[xt];Yt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt+1,0,0,Gt,Et,gt.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,xt+1,te,Gt,Et,gt.image[K])}}}g(b)&&p(i.TEXTURE_CUBE_MAP),J.__version=tt.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function ot(T,b,G,j,tt,J){const Ct=r.convert(G.format,G.colorSpace),pt=r.convert(G.type),bt=_(G.internalFormat,Ct,pt,G.colorSpace),Jt=n.get(b),at=n.get(G);if(at.__renderTarget=b,!Jt.__hasExternalTextures){const wt=Math.max(1,b.width>>J),Ot=Math.max(1,b.height>>J);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,J,bt,wt,Ot,b.depth,0,Ct,pt,null):e.texImage2D(tt,J,bt,wt,Ot,0,Ct,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),St(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,tt,at.__webglTexture,0,st(b)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,tt,at.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function nt(T,b,G){if(i.bindRenderbuffer(i.RENDERBUFFER,T),b.depthBuffer){const j=b.depthTexture,tt=j&&j.isDepthTexture?j.type:null,J=x(b.stencilBuffer,tt),Ct=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=st(b);St(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,J,b.width,b.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,J,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,J,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ct,i.RENDERBUFFER,T)}else{const j=b.textures;for(let tt=0;tt<j.length;tt++){const J=j[tt],Ct=r.convert(J.format,J.colorSpace),pt=r.convert(J.type),bt=_(J.internalFormat,Ct,pt,J.colorSpace),Jt=st(b);G&&St(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Jt,bt,b.width,b.height):St(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Jt,bt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,bt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function _t(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(b.depthTexture);j.__renderTarget=b,(!j.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),X(b.depthTexture,0);const tt=j.__webglTexture,J=st(b);if(b.depthTexture.format===Di)St(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0);else if(b.depthTexture.format===Ui)St(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Ut(T){const b=n.get(T),G=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){const j=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),j){const tt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,j.removeEventListener("dispose",tt)};j.addEventListener("dispose",tt),b.__depthDisposeCallback=tt}b.__boundDepthTexture=j}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");_t(b.__webglFramebuffer,T)}else if(G){b.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[j]),b.__webglDepthbuffer[j]===void 0)b.__webglDepthbuffer[j]=i.createRenderbuffer(),nt(b.__webglDepthbuffer[j],T,!1);else{const tt=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=b.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,J)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),nt(b.__webglDepthbuffer,T,!1);else{const j=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,tt=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,tt),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,tt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(T,b,G){const j=n.get(T);b!==void 0&&ot(j.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Ut(T)}function $t(T){const b=T.texture,G=n.get(T),j=n.get(b);T.addEventListener("dispose",C);const tt=T.textures,J=T.isWebGLCubeRenderTarget===!0,Ct=tt.length>1;if(Ct||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=b.version,a.memory.textures++),J){G.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer[pt]=[];for(let bt=0;bt<b.mipmaps.length;bt++)G.__webglFramebuffer[pt][bt]=i.createFramebuffer()}else G.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer=[];for(let pt=0;pt<b.mipmaps.length;pt++)G.__webglFramebuffer[pt]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(Ct)for(let pt=0,bt=tt.length;pt<bt;pt++){const Jt=n.get(tt[pt]);Jt.__webglTexture===void 0&&(Jt.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&St(T)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let pt=0;pt<tt.length;pt++){const bt=tt[pt];G.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[pt]);const Jt=r.convert(bt.format,bt.colorSpace),at=r.convert(bt.type),wt=_(bt.internalFormat,Jt,at,bt.colorSpace,T.isXRRenderTarget===!0),Ot=st(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ot,wt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,G.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),nt(G.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),yt(i.TEXTURE_CUBE_MAP,b);for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0)for(let bt=0;bt<b.mipmaps.length;bt++)ot(G.__webglFramebuffer[pt][bt],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,bt);else ot(G.__webglFramebuffer[pt],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);g(b)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let pt=0,bt=tt.length;pt<bt;pt++){const Jt=tt[pt],at=n.get(Jt);e.bindTexture(i.TEXTURE_2D,at.__webglTexture),yt(i.TEXTURE_2D,Jt),ot(G.__webglFramebuffer,T,Jt,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,0),g(Jt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(pt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,j.__webglTexture),yt(pt,b),b.mipmaps&&b.mipmaps.length>0)for(let bt=0;bt<b.mipmaps.length;bt++)ot(G.__webglFramebuffer[bt],T,b,i.COLOR_ATTACHMENT0,pt,bt);else ot(G.__webglFramebuffer,T,b,i.COLOR_ATTACHMENT0,pt,0);g(b)&&p(pt),e.unbindTexture()}T.depthBuffer&&Ut(T)}function Q(T){const b=T.textures;for(let G=0,j=b.length;G<j;G++){const tt=b[G];if(g(tt)){const J=M(T),Ct=n.get(tt).__webglTexture;e.bindTexture(J,Ct),p(J),e.unbindTexture()}}}const ct=[],P=[];function Lt(T){if(T.samples>0){if(St(T)===!1){const b=T.textures,G=T.width,j=T.height;let tt=i.COLOR_BUFFER_BIT;const J=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ct=n.get(T),pt=b.length>1;if(pt)for(let bt=0;bt<b.length;bt++)e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let bt=0;bt<b.length;bt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[bt]);const Jt=n.get(b[bt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Jt,0)}i.blitFramebuffer(0,0,G,j,0,0,G,j,tt,i.NEAREST),l===!0&&(ct.length=0,P.length=0,ct.push(i.COLOR_ATTACHMENT0+bt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ct.push(J),P.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ct))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let bt=0;bt<b.length;bt++){e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[bt]);const Jt=n.get(b[bt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,Jt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const b=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function st(T){return Math.min(s.maxSamples,T.samples)}function St(T){const b=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ut(T){const b=a.render.frame;h.get(T)!==b&&(h.set(T,b),T.update())}function kt(T,b){const G=T.colorSpace,j=T.format,tt=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||G!==Ni&&G!==Wn&&(ee.getTransfer(G)===he?(j!==tn||tt!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),b}function Mt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=U,this.setTexture2D=X,this.setTexture2DArray=z,this.setTexture3D=q,this.setTextureCube=H,this.rebindTextures=Nt,this.setupRenderTarget=$t,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=St}function u0(i,t){function e(n,s=Wn){let r;const a=ee.getTransfer(s);if(n===An)return i.UNSIGNED_BYTE;if(n===ha)return i.UNSIGNED_SHORT_4_4_4_4;if(n===da)return i.UNSIGNED_SHORT_5_5_5_1;if(n===vl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ml)return i.BYTE;if(n===gl)return i.SHORT;if(n===us)return i.UNSIGNED_SHORT;if(n===ca)return i.INT;if(n===li)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===Ii)return i.HALF_FLOAT;if(n===xl)return i.ALPHA;if(n===_l)return i.RGB;if(n===tn)return i.RGBA;if(n===yl)return i.LUMINANCE;if(n===Ml)return i.LUMINANCE_ALPHA;if(n===Di)return i.DEPTH_COMPONENT;if(n===Ui)return i.DEPTH_STENCIL;if(n===ua)return i.RED;if(n===fa)return i.RED_INTEGER;if(n===bl)return i.RG;if(n===pa)return i.RG_INTEGER;if(n===ma)return i.RGBA_INTEGER;if(n===Ys||n===$s||n===Zs||n===js)if(a===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ys)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ys)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ga||n===va||n===xa||n===_a)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ga)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===va)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_a)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ya||n===Ma||n===ba)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ya||n===Ma)return a===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ba)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Sa||n===wa||n===Ea||n===Ta||n===Aa||n===Ca||n===Ra||n===Pa||n===Ia||n===La||n===Da||n===Ua||n===Na||n===Fa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Sa)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wa)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ea)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ta)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Aa)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ca)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ra)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Pa)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ia)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===La)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Da)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ua)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Na)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fa)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Js||n===ka||n===Oa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Js)return a===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ka)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Oa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sl||n===za||n===Ba||n===Ga)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Js)return r.COMPRESSED_RED_RGTC1_EXT;if(n===za)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ba)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ga)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Li?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class f0 extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class At extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}}const p0={type:"move"};class wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(p0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new At;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const m0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,g0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class v0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new De,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new bn({vertexShader:m0,fragmentShader:g0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Tt(new pn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class x0 extends ki{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null;const v=new v0,g=e.getContextAttributes();let p=null,M=null;const _=[],x=[],L=new et;let A=null;const C=new Ge;C.viewport=new ne;const R=new Ge;R.viewport=new ne;const S=[C,R],y=new f0;let I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let Z=_[B];return Z===void 0&&(Z=new wo,_[B]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(B){let Z=_[B];return Z===void 0&&(Z=new wo,_[B]=Z),Z.getGripSpace()},this.getHand=function(B){let Z=_[B];return Z===void 0&&(Z=new wo,_[B]=Z),Z.getHandSpace()};function D(B){const Z=x.indexOf(B.inputSource);if(Z===-1)return;const ot=_[Z];ot!==void 0&&(ot.update(B.inputSource,B.frame,c||a),ot.dispatchEvent({type:B.type,data:B.inputSource}))}function F(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",X);for(let B=0;B<_.length;B++){const Z=x[B];Z!==null&&(x[B]=null,_[B].disconnect(Z))}I=null,U=null,v.reset(),t.setRenderTarget(p),f=null,u=null,d=null,s=null,M=null,Bt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(B){c=B},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",F),s.addEventListener("inputsourceschange",X),g.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const Z={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Z),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Xn(f.framebufferWidth,f.framebufferHeight,{format:tn,type:An,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let Z=null,ot=null,nt=null;g.depth&&(nt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Z=g.stencil?Ui:Di,ot=g.stencil?Li:li);const _t={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:r};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(_t),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),M=new Xn(u.textureWidth,u.textureHeight,{format:tn,type:An,depthTexture:new uc(u.textureWidth,u.textureHeight,ot,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Bt.setContext(s),Bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function X(B){for(let Z=0;Z<B.removed.length;Z++){const ot=B.removed[Z],nt=x.indexOf(ot);nt>=0&&(x[nt]=null,_[nt].disconnect(ot))}for(let Z=0;Z<B.added.length;Z++){const ot=B.added[Z];let nt=x.indexOf(ot);if(nt===-1){for(let Ut=0;Ut<_.length;Ut++)if(Ut>=x.length){x.push(ot),nt=Ut;break}else if(x[Ut]===null){x[Ut]=ot,nt=Ut;break}if(nt===-1)break}const _t=_[nt];_t&&_t.connect(ot)}}const z=new E,q=new E;function H(B,Z,ot){z.setFromMatrixPosition(Z.matrixWorld),q.setFromMatrixPosition(ot.matrixWorld);const nt=z.distanceTo(q),_t=Z.projectionMatrix.elements,Ut=ot.projectionMatrix.elements,Nt=_t[14]/(_t[10]-1),$t=_t[14]/(_t[10]+1),Q=(_t[9]+1)/_t[5],ct=(_t[9]-1)/_t[5],P=(_t[8]-1)/_t[0],Lt=(Ut[8]+1)/Ut[0],st=Nt*P,St=Nt*Lt,ut=nt/(-P+Lt),kt=ut*-P;if(Z.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(kt),B.translateZ(ut),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),_t[10]===-1)B.projectionMatrix.copy(Z.projectionMatrix),B.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const Mt=Nt+ut,T=$t+ut,b=st-kt,G=St+(nt-kt),j=Q*$t/T*Mt,tt=ct*$t/T*Mt;B.projectionMatrix.makePerspective(b,G,j,tt,Mt,T),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function rt(B,Z){Z===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(Z.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;let Z=B.near,ot=B.far;v.texture!==null&&(v.depthNear>0&&(Z=v.depthNear),v.depthFar>0&&(ot=v.depthFar)),y.near=R.near=C.near=Z,y.far=R.far=C.far=ot,(I!==y.near||U!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),I=y.near,U=y.far),C.layers.mask=B.layers.mask|2,R.layers.mask=B.layers.mask|4,y.layers.mask=C.layers.mask|R.layers.mask;const nt=B.parent,_t=y.cameras;rt(y,nt);for(let Ut=0;Ut<_t.length;Ut++)rt(_t[Ut],nt);_t.length===2?H(y,C,R):y.projectionMatrix.copy(C.projectionMatrix),it(B,y,nt)};function it(B,Z,ot){ot===null?B.matrix.copy(Z.matrixWorld):(B.matrix.copy(ot.matrixWorld),B.matrix.invert(),B.matrix.multiply(Z.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(Z.projectionMatrix),B.projectionMatrixInverse.copy(Z.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=ps*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(B){l=B,u!==null&&(u.fixedFoveation=B),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=B)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let lt=null;function yt(B,Z){if(h=Z.getViewerPose(c||a),m=Z,h!==null){const ot=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let nt=!1;ot.length!==y.cameras.length&&(y.cameras.length=0,nt=!0);for(let Ut=0;Ut<ot.length;Ut++){const Nt=ot[Ut];let $t=null;if(f!==null)$t=f.getViewport(Nt);else{const ct=d.getViewSubImage(u,Nt);$t=ct.viewport,Ut===0&&(t.setRenderTargetTextures(M,ct.colorTexture,u.ignoreDepthValues?void 0:ct.depthStencilTexture),t.setRenderTarget(M))}let Q=S[Ut];Q===void 0&&(Q=new Ge,Q.layers.enable(Ut),Q.viewport=new ne,S[Ut]=Q),Q.matrix.fromArray(Nt.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Nt.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set($t.x,$t.y,$t.width,$t.height),Ut===0&&(y.matrix.copy(Q.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),nt===!0&&y.cameras.push(Q)}const _t=s.enabledFeatures;if(_t&&_t.includes("depth-sensing")){const Ut=d.getDepthInformation(ot[0]);Ut&&Ut.isValid&&Ut.texture&&v.init(t,Ut,s.renderState)}}for(let ot=0;ot<_.length;ot++){const nt=x[ot],_t=_[ot];nt!==null&&_t!==void 0&&_t.update(nt,Z,c||a)}lt&&lt(B,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),m=null}const Bt=new sc;Bt.setAnimationLoop(yt),this.setAnimationLoop=function(B){lt=B},this.dispose=function(){}}}const xi=new un,_0=new Zt;function y0(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Ql(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,_,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,M,_):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Fe&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Fe&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const M=t.get(p),_=M.envMap,x=M.envMapRotation;_&&(g.envMap.value=_,xi.copy(x),xi.x*=-1,xi.y*=-1,xi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),g.envMapRotation.value.setFromMatrix4(_0.makeRotationFromEuler(xi)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,M,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=_*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Fe&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const M=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function M0(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,_){const x=_.program;n.uniformBlockBinding(M,x)}function c(M,_){let x=s[M.id];x===void 0&&(m(M),x=h(M),s[M.id]=x,M.addEventListener("dispose",g));const L=_.program;n.updateUBOMapping(M,L);const A=t.render.frame;r[M.id]!==A&&(u(M),r[M.id]=A)}function h(M){const _=d();M.__bindingPointIndex=_;const x=i.createBuffer(),L=M.__size,A=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,L,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,x),x}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const _=s[M.id],x=M.uniforms,L=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let A=0,C=x.length;A<C;A++){const R=Array.isArray(x[A])?x[A]:[x[A]];for(let S=0,y=R.length;S<y;S++){const I=R[S];if(f(I,A,S,L)===!0){const U=I.__offset,D=Array.isArray(I.value)?I.value:[I.value];let F=0;for(let X=0;X<D.length;X++){const z=D[X],q=v(z);typeof z=="number"||typeof z=="boolean"?(I.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,U+F,I.__data)):z.isMatrix3?(I.__data[0]=z.elements[0],I.__data[1]=z.elements[1],I.__data[2]=z.elements[2],I.__data[3]=0,I.__data[4]=z.elements[3],I.__data[5]=z.elements[4],I.__data[6]=z.elements[5],I.__data[7]=0,I.__data[8]=z.elements[6],I.__data[9]=z.elements[7],I.__data[10]=z.elements[8],I.__data[11]=0):(z.toArray(I.__data,F),F+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,_,x,L){const A=M.value,C=_+"_"+x;if(L[C]===void 0)return typeof A=="number"||typeof A=="boolean"?L[C]=A:L[C]=A.clone(),!0;{const R=L[C];if(typeof A=="number"||typeof A=="boolean"){if(R!==A)return L[C]=A,!0}else if(R.equals(A)===!1)return R.copy(A),!0}return!1}function m(M){const _=M.uniforms;let x=0;const L=16;for(let C=0,R=_.length;C<R;C++){const S=Array.isArray(_[C])?_[C]:[_[C]];for(let y=0,I=S.length;y<I;y++){const U=S[y],D=Array.isArray(U.value)?U.value:[U.value];for(let F=0,X=D.length;F<X;F++){const z=D[F],q=v(z),H=x%L,rt=H%q.boundary,it=H+rt;x+=rt,it!==0&&L-it<q.storage&&(x+=L-it),U.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=q.storage}}}const A=x%L;return A>0&&(x+=L-A),M.__size=x,M.__cache={},this}function v(M){const _={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(_.boundary=4,_.storage=4):M.isVector2?(_.boundary=8,_.storage=8):M.isVector3||M.isColor?(_.boundary=16,_.storage=12):M.isVector4?(_.boundary=16,_.storage=16):M.isMatrix3?(_.boundary=48,_.storage=48):M.isMatrix4?(_.boundary=64,_.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),_}function g(M){const _=M.target;_.removeEventListener("dispose",g);const x=a.indexOf(_.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class b0{constructor(t={}){const{canvas:e=Wd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const M=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ke,this.toneMapping=Hn,this.toneMappingExposure=1;const x=this;let L=!1,A=0,C=0,R=null,S=-1,y=null;const I=new ne,U=new ne;let D=null;const F=new zt(0);let X=0,z=e.width,q=e.height,H=1,rt=null,it=null;const lt=new ne(0,0,z,q),yt=new ne(0,0,z,q);let Bt=!1;const B=new po;let Z=!1,ot=!1;const nt=new Zt,_t=new Zt,Ut=new E,Nt=new ne,$t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function ct(){return R===null?H:1}let P=n;function Lt(w,k){return e.getContext(w,k)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${$r}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),P===null){const k="webgl2";if(P=Lt(k,w),P===null)throw Lt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let st,St,ut,kt,Mt,T,b,G,j,tt,J,Ct,pt,bt,Jt,at,wt,Ot,Gt,Et,te,Yt,de,N;function mt(){st=new Ap(P),st.init(),Yt=new u0(P,st),St=new Mp(P,st,t,Yt),ut=new c0(P,st),St.reverseDepthBuffer&&u&&ut.buffers.depth.setReversed(!0),kt=new Pp(P),Mt=new $m,T=new d0(P,st,ut,Mt,St,Yt,kt),b=new Sp(x),G=new Tp(x),j=new gu(P),de=new _p(P,j),tt=new Cp(P,j,kt,de),J=new Lp(P,tt,j,kt),Gt=new Ip(P,St,T),at=new bp(Mt),Ct=new Ym(x,b,G,st,St,de,at),pt=new y0(x,Mt),bt=new jm,Jt=new n0(st),Ot=new xp(x,b,G,ut,J,f,l),wt=new o0(x,J,St),N=new M0(P,kt,St,ut),Et=new yp(P,st,kt),te=new Rp(P,st,kt),kt.programs=Ct.programs,x.capabilities=St,x.extensions=st,x.properties=Mt,x.renderLists=bt,x.shadowMap=wt,x.state=ut,x.info=kt}mt();const $=new x0(x,P);this.xr=$,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const w=st.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=st.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(w){w!==void 0&&(H=w,this.setSize(z,q,!1))},this.getSize=function(w){return w.set(z,q)},this.setSize=function(w,k,V=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=w,q=k,e.width=Math.floor(w*H),e.height=Math.floor(k*H),V===!0&&(e.style.width=w+"px",e.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(z*H,q*H).floor()},this.setDrawingBufferSize=function(w,k,V){z=w,q=k,H=V,e.width=Math.floor(w*V),e.height=Math.floor(k*V),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(lt)},this.setViewport=function(w,k,V,W){w.isVector4?lt.set(w.x,w.y,w.z,w.w):lt.set(w,k,V,W),ut.viewport(I.copy(lt).multiplyScalar(H).round())},this.getScissor=function(w){return w.copy(yt)},this.setScissor=function(w,k,V,W){w.isVector4?yt.set(w.x,w.y,w.z,w.w):yt.set(w,k,V,W),ut.scissor(U.copy(yt).multiplyScalar(H).round())},this.getScissorTest=function(){return Bt},this.setScissorTest=function(w){ut.setScissorTest(Bt=w)},this.setOpaqueSort=function(w){rt=w},this.setTransparentSort=function(w){it=w},this.getClearColor=function(w){return w.copy(Ot.getClearColor())},this.setClearColor=function(){Ot.setClearColor.apply(Ot,arguments)},this.getClearAlpha=function(){return Ot.getClearAlpha()},this.setClearAlpha=function(){Ot.setClearAlpha.apply(Ot,arguments)},this.clear=function(w=!0,k=!0,V=!0){let W=0;if(w){let O=!1;if(R!==null){const ht=R.texture.format;O=ht===ma||ht===pa||ht===fa}if(O){const ht=R.texture.type,vt=ht===An||ht===li||ht===us||ht===Li||ht===ha||ht===da,Rt=Ot.getClearColor(),Pt=Ot.getClearAlpha(),Ht=Rt.r,Xt=Rt.g,It=Rt.b;vt?(m[0]=Ht,m[1]=Xt,m[2]=It,m[3]=Pt,P.clearBufferuiv(P.COLOR,0,m)):(v[0]=Ht,v[1]=Xt,v[2]=It,v[3]=Pt,P.clearBufferiv(P.COLOR,0,v))}else W|=P.COLOR_BUFFER_BIT}k&&(W|=P.DEPTH_BUFFER_BIT),V&&(W|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),bt.dispose(),Jt.dispose(),Mt.dispose(),b.dispose(),G.dispose(),J.dispose(),de.dispose(),N.dispose(),Ct.dispose(),$.dispose(),$.removeEventListener("sessionstart",Nh),$.removeEventListener("sessionend",Fh),Ti.stop()};function K(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const w=kt.autoReset,k=wt.enabled,V=wt.autoUpdate,W=wt.needsUpdate,O=wt.type;mt(),kt.autoReset=w,wt.enabled=k,wt.autoUpdate=V,wt.needsUpdate=W,wt.type=O}function gt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Wt(w){const k=w.target;k.removeEventListener("dispose",Wt),ye(k)}function ye(w){Ne(w),Mt.remove(w)}function Ne(w){const k=Mt.get(w).programs;k!==void 0&&(k.forEach(function(V){Ct.releaseProgram(V)}),w.isShaderMaterial&&Ct.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,V,W,O,ht){k===null&&(k=$t);const vt=O.isMesh&&O.matrixWorld.determinant()<0,Rt=Wg(w,k,V,W,O);ut.setMaterial(W,vt);let Pt=V.index,Ht=1;if(W.wireframe===!0){if(Pt=tt.getWireframeAttribute(V),Pt===void 0)return;Ht=2}const Xt=V.drawRange,It=V.attributes.position;let re=Xt.start*Ht,ue=(Xt.start+Xt.count)*Ht;ht!==null&&(re=Math.max(re,ht.start*Ht),ue=Math.min(ue,(ht.start+ht.count)*Ht)),Pt!==null?(re=Math.max(re,0),ue=Math.min(ue,Pt.count)):It!=null&&(re=Math.max(re,0),ue=Math.min(ue,It.count));const pe=ue-re;if(pe<0||pe===1/0)return;de.setup(O,W,Rt,V,Pt);let We,ae=Et;if(Pt!==null&&(We=j.get(Pt),ae=te,ae.setIndex(We)),O.isMesh)W.wireframe===!0?(ut.setLineWidth(W.wireframeLinewidth*ct()),ae.setMode(P.LINES)):ae.setMode(P.TRIANGLES);else if(O.isLine){let Dt=W.linewidth;Dt===void 0&&(Dt=1),ut.setLineWidth(Dt*ct()),O.isLineSegments?ae.setMode(P.LINES):O.isLineLoop?ae.setMode(P.LINE_LOOP):ae.setMode(P.LINE_STRIP)}else O.isPoints?ae.setMode(P.POINTS):O.isSprite&&ae.setMode(P.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ae.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(st.get("WEBGL_multi_draw"))ae.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Dt=O._multiDrawStarts,zn=O._multiDrawCounts,oe=O._multiDrawCount,vn=Pt?j.get(Pt).bytesPerElement:1,ds=Mt.get(W).currentProgram.getUniforms();for(let Qe=0;Qe<oe;Qe++)ds.setValue(P,"_gl_DrawID",Qe),ae.render(Dt[Qe]/vn,zn[Qe])}else if(O.isInstancedMesh)ae.renderInstances(re,pe,O.count);else if(V.isInstancedBufferGeometry){const Dt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,zn=Math.min(V.instanceCount,Dt);ae.renderInstances(re,pe,zn)}else ae.render(re,pe)};function ce(w,k,V){w.transparent===!0&&w.side===ve&&w.forceSinglePass===!1?(w.side=Fe,w.needsUpdate=!0,Yr(w,k,V),w.side=Bn,w.needsUpdate=!0,Yr(w,k,V),w.side=ve):Yr(w,k,V)}this.compile=function(w,k,V=null){V===null&&(V=w),p=Jt.get(V),p.init(k),_.push(p),V.traverseVisible(function(O){O.isLight&&O.layers.test(k.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),w!==V&&w.traverseVisible(function(O){O.isLight&&O.layers.test(k.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const W=new Set;return w.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ht=O.material;if(ht)if(Array.isArray(ht))for(let vt=0;vt<ht.length;vt++){const Rt=ht[vt];ce(Rt,V,O),W.add(Rt)}else ce(ht,V,O),W.add(ht)}),_.pop(),p=null,W},this.compileAsync=function(w,k,V=null){const W=this.compile(w,k,V);return new Promise(O=>{function ht(){if(W.forEach(function(vt){Mt.get(vt).currentProgram.isReady()&&W.delete(vt)}),W.size===0){O(w);return}setTimeout(ht,10)}st.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let gn=null;function On(w){gn&&gn(w)}function Nh(){Ti.stop()}function Fh(){Ti.start()}const Ti=new sc;Ti.setAnimationLoop(On),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(w){gn=w,$.setAnimationLoop(w),w===null?Ti.stop():Ti.start()},$.addEventListener("sessionstart",Nh),$.addEventListener("sessionend",Fh),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(k),k=$.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,k,R),p=Jt.get(w,_.length),p.init(k),_.push(p),_t.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),B.setFromProjectionMatrix(_t),ot=this.localClippingEnabled,Z=at.init(this.clippingPlanes,ot),g=bt.get(w,M.length),g.init(),M.push(g),$.enabled===!0&&$.isPresenting===!0){const ht=x.xr.getDepthSensingMesh();ht!==null&&rl(ht,k,-1/0,x.sortObjects)}rl(w,k,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(rt,it),Q=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Q&&Ot.addToRenderList(g,w),this.info.render.frame++,Z===!0&&at.beginShadows();const V=p.state.shadowsArray;wt.render(V,w,k),Z===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,O=g.transmissive;if(p.setupLights(),k.isArrayCamera){const ht=k.cameras;if(O.length>0)for(let vt=0,Rt=ht.length;vt<Rt;vt++){const Pt=ht[vt];Oh(W,O,w,Pt)}Q&&Ot.render(w);for(let vt=0,Rt=ht.length;vt<Rt;vt++){const Pt=ht[vt];kh(g,w,Pt,Pt.viewport)}}else O.length>0&&Oh(W,O,w,k),Q&&Ot.render(w),kh(g,w,k);R!==null&&(T.updateMultisampleRenderTarget(R),T.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(x,w,k),de.resetDefaultState(),S=-1,y=null,_.pop(),_.length>0?(p=_[_.length-1],Z===!0&&at.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function rl(w,k,V,W){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)V=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||B.intersectsSprite(w)){W&&Nt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(_t);const vt=J.update(w),Rt=w.material;Rt.visible&&g.push(w,vt,Rt,V,Nt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||B.intersectsObject(w))){const vt=J.update(w),Rt=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Nt.copy(w.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Nt.copy(vt.boundingSphere.center)),Nt.applyMatrix4(w.matrixWorld).applyMatrix4(_t)),Array.isArray(Rt)){const Pt=vt.groups;for(let Ht=0,Xt=Pt.length;Ht<Xt;Ht++){const It=Pt[Ht],re=Rt[It.materialIndex];re&&re.visible&&g.push(w,vt,re,V,Nt.z,It)}}else Rt.visible&&g.push(w,vt,Rt,V,Nt.z,null)}}const ht=w.children;for(let vt=0,Rt=ht.length;vt<Rt;vt++)rl(ht[vt],k,V,W)}function kh(w,k,V,W){const O=w.opaque,ht=w.transmissive,vt=w.transparent;p.setupLightsView(V),Z===!0&&at.setGlobalState(x.clippingPlanes,V),W&&ut.viewport(I.copy(W)),O.length>0&&qr(O,k,V),ht.length>0&&qr(ht,k,V),vt.length>0&&qr(vt,k,V),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function Oh(w,k,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Xn(1,1,{generateMipmaps:!0,type:st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float")?Ii:An,minFilter:oi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const ht=p.state.transmissionRenderTarget[W.id],vt=W.viewport||I;ht.setSize(vt.z,vt.w);const Rt=x.getRenderTarget();x.setRenderTarget(ht),x.getClearColor(F),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear(),Q&&Ot.render(V);const Pt=x.toneMapping;x.toneMapping=Hn;const Ht=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),Z===!0&&at.setGlobalState(x.clippingPlanes,W),qr(w,V,W),T.updateMultisampleRenderTarget(ht),T.updateRenderTargetMipmap(ht),st.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let It=0,re=k.length;It<re;It++){const ue=k[It],pe=ue.object,We=ue.geometry,ae=ue.material,Dt=ue.group;if(ae.side===ve&&pe.layers.test(W.layers)){const zn=ae.side;ae.side=Fe,ae.needsUpdate=!0,zh(pe,V,W,We,ae,Dt),ae.side=zn,ae.needsUpdate=!0,Xt=!0}}Xt===!0&&(T.updateMultisampleRenderTarget(ht),T.updateRenderTargetMipmap(ht))}x.setRenderTarget(Rt),x.setClearColor(F,X),Ht!==void 0&&(W.viewport=Ht),x.toneMapping=Pt}function qr(w,k,V){const W=k.isScene===!0?k.overrideMaterial:null;for(let O=0,ht=w.length;O<ht;O++){const vt=w[O],Rt=vt.object,Pt=vt.geometry,Ht=W===null?vt.material:W,Xt=vt.group;Rt.layers.test(V.layers)&&zh(Rt,k,V,Pt,Ht,Xt)}}function zh(w,k,V,W,O,ht){w.onBeforeRender(x,k,V,W,O,ht),w.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),O.onBeforeRender(x,k,V,W,w,ht),O.transparent===!0&&O.side===ve&&O.forceSinglePass===!1?(O.side=Fe,O.needsUpdate=!0,x.renderBufferDirect(V,k,W,O,w,ht),O.side=Bn,O.needsUpdate=!0,x.renderBufferDirect(V,k,W,O,w,ht),O.side=ve):x.renderBufferDirect(V,k,W,O,w,ht),w.onAfterRender(x,k,V,W,O,ht)}function Yr(w,k,V){k.isScene!==!0&&(k=$t);const W=Mt.get(w),O=p.state.lights,ht=p.state.shadowsArray,vt=O.state.version,Rt=Ct.getParameters(w,O.state,ht,k,V),Pt=Ct.getProgramCacheKey(Rt);let Ht=W.programs;W.environment=w.isMeshStandardMaterial?k.environment:null,W.fog=k.fog,W.envMap=(w.isMeshStandardMaterial?G:b).get(w.envMap||W.environment),W.envMapRotation=W.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Ht===void 0&&(w.addEventListener("dispose",Wt),Ht=new Map,W.programs=Ht);let Xt=Ht.get(Pt);if(Xt!==void 0){if(W.currentProgram===Xt&&W.lightsStateVersion===vt)return Gh(w,Rt),Xt}else Rt.uniforms=Ct.getUniforms(w),w.onBeforeCompile(Rt,x),Xt=Ct.acquireProgram(Rt,Pt),Ht.set(Pt,Xt),W.uniforms=Rt.uniforms;const It=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(It.clippingPlanes=at.uniform),Gh(w,Rt),W.needsLights=qg(w),W.lightsStateVersion=vt,W.needsLights&&(It.ambientLightColor.value=O.state.ambient,It.lightProbe.value=O.state.probe,It.directionalLights.value=O.state.directional,It.directionalLightShadows.value=O.state.directionalShadow,It.spotLights.value=O.state.spot,It.spotLightShadows.value=O.state.spotShadow,It.rectAreaLights.value=O.state.rectArea,It.ltc_1.value=O.state.rectAreaLTC1,It.ltc_2.value=O.state.rectAreaLTC2,It.pointLights.value=O.state.point,It.pointLightShadows.value=O.state.pointShadow,It.hemisphereLights.value=O.state.hemi,It.directionalShadowMap.value=O.state.directionalShadowMap,It.directionalShadowMatrix.value=O.state.directionalShadowMatrix,It.spotShadowMap.value=O.state.spotShadowMap,It.spotLightMatrix.value=O.state.spotLightMatrix,It.spotLightMap.value=O.state.spotLightMap,It.pointShadowMap.value=O.state.pointShadowMap,It.pointShadowMatrix.value=O.state.pointShadowMatrix),W.currentProgram=Xt,W.uniformsList=null,Xt}function Bh(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=Mr.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function Gh(w,k){const V=Mt.get(w);V.outputColorSpace=k.outputColorSpace,V.batching=k.batching,V.batchingColor=k.batchingColor,V.instancing=k.instancing,V.instancingColor=k.instancingColor,V.instancingMorph=k.instancingMorph,V.skinning=k.skinning,V.morphTargets=k.morphTargets,V.morphNormals=k.morphNormals,V.morphColors=k.morphColors,V.morphTargetsCount=k.morphTargetsCount,V.numClippingPlanes=k.numClippingPlanes,V.numIntersection=k.numClipIntersection,V.vertexAlphas=k.vertexAlphas,V.vertexTangents=k.vertexTangents,V.toneMapping=k.toneMapping}function Wg(w,k,V,W,O){k.isScene!==!0&&(k=$t),T.resetTextureUnits();const ht=k.fog,vt=W.isMeshStandardMaterial?k.environment:null,Rt=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ni,Pt=(W.isMeshStandardMaterial?G:b).get(W.envMap||vt),Ht=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Xt=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),It=!!V.morphAttributes.position,re=!!V.morphAttributes.normal,ue=!!V.morphAttributes.color;let pe=Hn;W.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(pe=x.toneMapping);const We=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ae=We!==void 0?We.length:0,Dt=Mt.get(W),zn=p.state.lights;if(Z===!0&&(ot===!0||w!==y)){const ln=w===y&&W.id===S;at.setState(W,w,ln)}let oe=!1;W.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==zn.state.version||Dt.outputColorSpace!==Rt||O.isBatchedMesh&&Dt.batching===!1||!O.isBatchedMesh&&Dt.batching===!0||O.isBatchedMesh&&Dt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Dt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Dt.instancing===!1||!O.isInstancedMesh&&Dt.instancing===!0||O.isSkinnedMesh&&Dt.skinning===!1||!O.isSkinnedMesh&&Dt.skinning===!0||O.isInstancedMesh&&Dt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Dt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Dt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Dt.instancingMorph===!1&&O.morphTexture!==null||Dt.envMap!==Pt||W.fog===!0&&Dt.fog!==ht||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==at.numPlanes||Dt.numIntersection!==at.numIntersection)||Dt.vertexAlphas!==Ht||Dt.vertexTangents!==Xt||Dt.morphTargets!==It||Dt.morphNormals!==re||Dt.morphColors!==ue||Dt.toneMapping!==pe||Dt.morphTargetsCount!==ae)&&(oe=!0):(oe=!0,Dt.__version=W.version);let vn=Dt.currentProgram;oe===!0&&(vn=Yr(W,k,O));let ds=!1,Qe=!1,Vs=!1;const me=vn.getUniforms(),En=Dt.uniforms;if(ut.useProgram(vn.program)&&(ds=!0,Qe=!0,Vs=!0),W.id!==S&&(S=W.id,Qe=!0),ds||y!==w){ut.buffers.depth.getReversed()?(nt.copy(w.projectionMatrix),qd(nt),Yd(nt),me.setValue(P,"projectionMatrix",nt)):me.setValue(P,"projectionMatrix",w.projectionMatrix),me.setValue(P,"viewMatrix",w.matrixWorldInverse);const si=me.map.cameraPosition;si!==void 0&&si.setValue(P,Ut.setFromMatrixPosition(w.matrixWorld)),St.logarithmicDepthBuffer&&me.setValue(P,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&me.setValue(P,"isOrthographic",w.isOrthographicCamera===!0),y!==w&&(y=w,Qe=!0,Vs=!0)}if(O.isSkinnedMesh){me.setOptional(P,O,"bindMatrix"),me.setOptional(P,O,"bindMatrixInverse");const ln=O.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),me.setValue(P,"boneTexture",ln.boneTexture,T))}O.isBatchedMesh&&(me.setOptional(P,O,"batchingTexture"),me.setValue(P,"batchingTexture",O._matricesTexture,T),me.setOptional(P,O,"batchingIdTexture"),me.setValue(P,"batchingIdTexture",O._indirectTexture,T),me.setOptional(P,O,"batchingColorTexture"),O._colorsTexture!==null&&me.setValue(P,"batchingColorTexture",O._colorsTexture,T));const Ws=V.morphAttributes;if((Ws.position!==void 0||Ws.normal!==void 0||Ws.color!==void 0)&&Gt.update(O,V,vn),(Qe||Dt.receiveShadow!==O.receiveShadow)&&(Dt.receiveShadow=O.receiveShadow,me.setValue(P,"receiveShadow",O.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(En.envMap.value=Pt,En.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&k.environment!==null&&(En.envMapIntensity.value=k.environmentIntensity),Qe&&(me.setValue(P,"toneMappingExposure",x.toneMappingExposure),Dt.needsLights&&Xg(En,Vs),ht&&W.fog===!0&&pt.refreshFogUniforms(En,ht),pt.refreshMaterialUniforms(En,W,H,q,p.state.transmissionRenderTarget[w.id]),Mr.upload(P,Bh(Dt),En,T)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Mr.upload(P,Bh(Dt),En,T),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&me.setValue(P,"center",O.center),me.setValue(P,"modelViewMatrix",O.modelViewMatrix),me.setValue(P,"normalMatrix",O.normalMatrix),me.setValue(P,"modelMatrix",O.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const ln=W.uniformsGroups;for(let si=0,ri=ln.length;si<ri;si++){const Hh=ln[si];N.update(Hh,vn),N.bind(Hh,vn)}}return vn}function Xg(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function qg(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,k,V){Mt.get(w.texture).__webglTexture=k,Mt.get(w.depthTexture).__webglTexture=V;const W=Mt.get(w);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||st.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,k){const V=Mt.get(w);V.__webglFramebuffer=k,V.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,V=0){R=w,A=k,C=V;let W=!0,O=null,ht=!1,vt=!1;if(w){const Pt=Mt.get(w);if(Pt.__useDefaultFramebuffer!==void 0)ut.bindFramebuffer(P.FRAMEBUFFER,null),W=!1;else if(Pt.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(Pt.__hasExternalTextures)T.rebindTextures(w,Mt.get(w.texture).__webglTexture,Mt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const It=w.depthTexture;if(Pt.__boundDepthTexture!==It){if(It!==null&&Mt.has(It)&&(w.width!==It.image.width||w.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}const Ht=w.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(vt=!0);const Xt=Mt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Xt[k])?O=Xt[k][V]:O=Xt[k],ht=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?O=Mt.get(w).__webglMultisampledFramebuffer:Array.isArray(Xt)?O=Xt[V]:O=Xt,I.copy(w.viewport),U.copy(w.scissor),D=w.scissorTest}else I.copy(lt).multiplyScalar(H).floor(),U.copy(yt).multiplyScalar(H).floor(),D=Bt;if(ut.bindFramebuffer(P.FRAMEBUFFER,O)&&W&&ut.drawBuffers(w,O),ut.viewport(I),ut.scissor(U),ut.setScissorTest(D),ht){const Pt=Mt.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+k,Pt.__webglTexture,V)}else if(vt){const Pt=Mt.get(w.texture),Ht=k||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Pt.__webglTexture,V||0,Ht)}S=-1},this.readRenderTargetPixels=function(w,k,V,W,O,ht,vt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=Mt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&vt!==void 0&&(Rt=Rt[vt]),Rt){ut.bindFramebuffer(P.FRAMEBUFFER,Rt);try{const Pt=w.texture,Ht=Pt.format,Xt=Pt.type;if(!St.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-W&&V>=0&&V<=w.height-O&&P.readPixels(k,V,W,O,Yt.convert(Ht),Yt.convert(Xt),ht)}finally{const Pt=R!==null?Mt.get(R).__webglFramebuffer:null;ut.bindFramebuffer(P.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(w,k,V,W,O,ht,vt){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=Mt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&vt!==void 0&&(Rt=Rt[vt]),Rt){const Pt=w.texture,Ht=Pt.format,Xt=Pt.type;if(!St.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=w.width-W&&V>=0&&V<=w.height-O){ut.bindFramebuffer(P.FRAMEBUFFER,Rt);const It=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,It),P.bufferData(P.PIXEL_PACK_BUFFER,ht.byteLength,P.STREAM_READ),P.readPixels(k,V,W,O,Yt.convert(Ht),Yt.convert(Xt),0);const re=R!==null?Mt.get(R).__webglFramebuffer:null;ut.bindFramebuffer(P.FRAMEBUFFER,re);const ue=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Xd(P,ue,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,It),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ht),P.deleteBuffer(It),P.deleteSync(ue),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,k=null,V=0){w.isTexture!==!0&&(gs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,w=arguments[1]);const W=Math.pow(2,-V),O=Math.floor(w.image.width*W),ht=Math.floor(w.image.height*W),vt=k!==null?k.x:0,Rt=k!==null?k.y:0;T.setTexture2D(w,0),P.copyTexSubImage2D(P.TEXTURE_2D,V,0,0,vt,Rt,O,ht),ut.unbindTexture()},this.copyTextureToTexture=function(w,k,V=null,W=null,O=0){w.isTexture!==!0&&(gs("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,w=arguments[1],k=arguments[2],O=arguments[3]||0,V=null);let ht,vt,Rt,Pt,Ht,Xt,It,re,ue;const pe=w.isCompressedTexture?w.mipmaps[O]:w.image;V!==null?(ht=V.max.x-V.min.x,vt=V.max.y-V.min.y,Rt=V.isBox3?V.max.z-V.min.z:1,Pt=V.min.x,Ht=V.min.y,Xt=V.isBox3?V.min.z:0):(ht=pe.width,vt=pe.height,Rt=pe.depth||1,Pt=0,Ht=0,Xt=0),W!==null?(It=W.x,re=W.y,ue=W.z):(It=0,re=0,ue=0);const We=Yt.convert(k.format),ae=Yt.convert(k.type);let Dt;k.isData3DTexture?(T.setTexture3D(k,0),Dt=P.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(T.setTexture2DArray(k,0),Dt=P.TEXTURE_2D_ARRAY):(T.setTexture2D(k,0),Dt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,k.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,k.unpackAlignment);const zn=P.getParameter(P.UNPACK_ROW_LENGTH),oe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),vn=P.getParameter(P.UNPACK_SKIP_PIXELS),ds=P.getParameter(P.UNPACK_SKIP_ROWS),Qe=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,pe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,pe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Pt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ht),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Xt);const Vs=w.isDataArrayTexture||w.isData3DTexture,me=k.isDataArrayTexture||k.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const En=Mt.get(w),Ws=Mt.get(k),ln=Mt.get(En.__renderTarget),si=Mt.get(Ws.__renderTarget);ut.bindFramebuffer(P.READ_FRAMEBUFFER,ln.__webglFramebuffer),ut.bindFramebuffer(P.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let ri=0;ri<Rt;ri++)Vs&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Mt.get(w).__webglTexture,O,Xt+ri),w.isDepthTexture?(me&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Mt.get(k).__webglTexture,O,ue+ri),P.blitFramebuffer(Pt,Ht,ht,vt,It,re,ht,vt,P.DEPTH_BUFFER_BIT,P.NEAREST)):me?P.copyTexSubImage3D(Dt,O,It,re,ue+ri,Pt,Ht,ht,vt):P.copyTexSubImage2D(Dt,O,It,re,ue+ri,Pt,Ht,ht,vt);ut.bindFramebuffer(P.READ_FRAMEBUFFER,null),ut.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else me?w.isDataTexture||w.isData3DTexture?P.texSubImage3D(Dt,O,It,re,ue,ht,vt,Rt,We,ae,pe.data):k.isCompressedArrayTexture?P.compressedTexSubImage3D(Dt,O,It,re,ue,ht,vt,Rt,We,pe.data):P.texSubImage3D(Dt,O,It,re,ue,ht,vt,Rt,We,ae,pe):w.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,O,It,re,ht,vt,We,ae,pe.data):w.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,O,It,re,pe.width,pe.height,We,pe.data):P.texSubImage2D(P.TEXTURE_2D,O,It,re,ht,vt,We,ae,pe);P.pixelStorei(P.UNPACK_ROW_LENGTH,zn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,oe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,vn),P.pixelStorei(P.UNPACK_SKIP_ROWS,ds),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Qe),O===0&&k.generateMipmaps&&P.generateMipmap(Dt),ut.unbindTexture()},this.copyTextureToTexture3D=function(w,k,V=null,W=null,O=0){return w.isTexture!==!0&&(gs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,w=arguments[2],k=arguments[3],O=arguments[4]||0),gs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,k,V,W,O)},this.initRenderTarget=function(w){Mt.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),ut.unbindTexture()},this.resetState=function(){A=0,C=0,R=null,ut.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}class Eo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new zt(t),this.density=e}clone(){return new Eo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Nc extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class S0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ha,this.updateRanges=[],this.version=0,this.uuid=yn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ze=new E;class Sr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=cn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=cn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=cn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=cn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array),r=le(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ee(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Sr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class wr extends ui{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ns;const bs=new E,is=new E,ss=new E,rs=new et,Ss=new et,Fc=new Zt,Er=new E,ws=new E,Tr=new E,kc=new et,To=new et,Oc=new et;class Ao extends Se{constructor(t=new wr){if(super(),this.isSprite=!0,this.type="Sprite",ns===void 0){ns=new fe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new S0(e,5);ns.setIndex([0,1,2,0,2,3]),ns.setAttribute("position",new Sr(n,3,0,!1)),ns.setAttribute("uv",new Sr(n,2,3,!1))}this.geometry=ns,this.material=t,this.center=new et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),is.setFromMatrixScale(this.matrixWorld),Fc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ss.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&is.multiplyScalar(-ss.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Ar(Er.set(-.5,-.5,0),ss,a,is,s,r),Ar(ws.set(.5,-.5,0),ss,a,is,s,r),Ar(Tr.set(.5,.5,0),ss,a,is,s,r),kc.set(0,0),To.set(1,0),Oc.set(1,1);let o=t.ray.intersectTriangle(Er,ws,Tr,!1,bs);if(o===null&&(Ar(ws.set(-.5,.5,0),ss,a,is,s,r),To.set(0,1),o=t.ray.intersectTriangle(Er,Tr,ws,!1,bs),o===null))return;const l=t.ray.origin.distanceTo(bs);l<t.near||l>t.far||e.push({distance:l,point:bs.clone(),uv:en.getInterpolation(bs,Er,ws,Tr,kc,To,Oc,new et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Ar(i,t,e,n,s,r){rs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ss.x=r*rs.x-s*rs.y,Ss.y=s*rs.x+r*rs.y):Ss.copy(rs),i.copy(t),i.x+=Ss.x,i.y+=Ss.y,i.applyMatrix4(Fc)}class zc extends De{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Xe,h=Xe,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bc extends Ee{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const as=new Zt,Gc=new Zt,Cr=[],Hc=new ci,w0=new Zt,Es=new Tt,Ts=new Vi;class Vc extends Tt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Bc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,w0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ci),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,as),Hc.copy(t.boundingBox).applyMatrix4(as),this.boundingBox.union(Hc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,as),Ts.copy(t.boundingSphere).applyMatrix4(as),this.boundingSphere.union(Ts)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Es.geometry=this.geometry,Es.material=this.material,Es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ts.copy(this.boundingSphere),Ts.applyMatrix4(n),t.ray.intersectsSphere(Ts)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,as),Gc.multiplyMatrices(n,as),Es.matrixWorld=Gc,Es.raycast(t,Cr);for(let a=0,o=Cr.length;a<o;a++){const l=Cr[a];l.instanceId=r,l.object=this,e.push(l)}Cr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Bc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new zc(new Float32Array(s*this.count),s,this.count,ua,_n));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Co extends ui{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Wc=new Zt,Ro=new Ka,Rr=new Vi,Pr=new E;class Xc extends Se{constructor(t=new fe,e=new Co){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(s),Rr.radius+=r,t.ray.intersectsSphere(Rr)===!1)return;Wc.copy(s).invert(),Ro.copy(t.ray).applyMatrix4(Wc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=u,v=f;m<v;m++){const g=c.getX(m);Pr.fromBufferAttribute(d,g),qc(Pr,g,l,s,t,e,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=u,v=f;m<v;m++)Pr.fromBufferAttribute(d,m),qc(Pr,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function qc(i,t,e,n,s,r,a){const o=Ro.distanceSqToPoint(i);if(o<e){const l=new E;Ro.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Po extends De{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new et:new E);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new E,s=[],r=[],a=[],o=new E,l=new Zt;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new E)}r[0]=new E,a[0]=new E;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Ae(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ae(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Io extends wn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new et){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class E0 extends Io{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Lo(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Ir=new E,Do=new Lo,Uo=new Lo,No=new Lo;class Lr extends wn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new E){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Ir.subVectors(s[0],s[1]).add(s[0]),c=Ir);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Ir.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ir),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),Do.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,m,v,g),Uo.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,m,v,g),No.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,m,v,g)}else this.curveType==="catmullrom"&&(Do.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Uo.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),No.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Do.calc(l),Uo.calc(l),No.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new E().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Yc(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function T0(i,t){const e=1-i;return e*e*t}function A0(i,t){return 2*(1-i)*i*t}function C0(i,t){return i*i*t}function As(i,t,e,n){return T0(i,t)+A0(i,e)+C0(i,n)}function R0(i,t){const e=1-i;return e*e*e*t}function P0(i,t){const e=1-i;return 3*e*e*i*t}function I0(i,t){return 3*(1-i)*i*i*t}function L0(i,t){return i*i*i*t}function Cs(i,t,e,n,s){return R0(i,t)+P0(i,e)+I0(i,n)+L0(i,s)}class $c extends wn{constructor(t=new et,e=new et,n=new et,s=new et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new et){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Cs(t,s.x,r.x,a.x,o.x),Cs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class D0 extends wn{constructor(t=new E,e=new E,n=new E,s=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new E){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Cs(t,s.x,r.x,a.x,o.x),Cs(t,s.y,r.y,a.y,o.y),Cs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Zc extends wn{constructor(t=new et,e=new et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jc extends wn{constructor(t=new E,e=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new E){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new E){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jc extends wn{constructor(t=new et,e=new et,n=new et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new et){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(As(t,s.x,r.x,a.x),As(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fo extends wn{constructor(t=new E,e=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new E){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(As(t,s.x,r.x,a.x),As(t,s.y,r.y,a.y),As(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kc extends wn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new et){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Yc(o,l.x,c.x,h.x,d.x),Yc(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new et().fromArray(s))}return this}}var Dr=Object.freeze({__proto__:null,ArcCurve:E0,CatmullRomCurve3:Lr,CubicBezierCurve:$c,CubicBezierCurve3:D0,EllipseCurve:Io,LineCurve:Zc,LineCurve3:jc,QuadraticBezierCurve:Jc,QuadraticBezierCurve3:Fo,SplineCurve:Kc});class U0 extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Dr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Dr[s.type]().fromJSON(s))}return this}}class Qc extends U0{constructor(t){super(),this.type="Path",this.currentPoint=new et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Zc(this.currentPoint.clone(),new et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Jc(this.currentPoint.clone(),new et(t,e),new et(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new $c(this.currentPoint.clone(),new et(t,e),new et(n,s),new et(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Kc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new Io(t,e,n,s,r,a,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ko extends fe{constructor(t=[new et(0,-.5),new et(.5,0),new et(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ae(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,d=new E,u=new et,f=new E,m=new E,v=new E;let g=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:g=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-g,f.z=p*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:g=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(m)}for(let M=0;M<=e;M++){const _=n+M*h*s,x=Math.sin(_),L=Math.cos(_);for(let A=0;A<=t.length-1;A++){d.x=t[A].x*x,d.y=t[A].y,d.z=t[A].x*L,a.push(d.x,d.y,d.z),u.x=M/e,u.y=A/(t.length-1),o.push(u.x,u.y);const C=l[3*A+0]*x,R=l[3*A+1],S=l[3*A+0]*L;c.push(C,R,S)}}for(let M=0;M<e;M++)for(let _=0;_<t.length-1;_++){const x=_+M*t.length,L=x,A=x+t.length,C=x+t.length+1,R=x+1;r.push(L,A,R),r.push(C,R,A)}this.setIndex(r),this.setAttribute("position",new Kt(a,3)),this.setAttribute("uv",new Kt(o,2)),this.setAttribute("normal",new Kt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ko(t.points,t.segments,t.phiStart,t.phiLength)}}class Rs extends fe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new E,h=new et;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(o,3)),this.setAttribute("uv",new Kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rs(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ie extends fe{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let m=0;const v=[],g=n/2;let p=0;M(),a===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Kt(d,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(f,2));function M(){const x=new E,L=new E;let A=0;const C=(e-t)/n;for(let R=0;R<=r;R++){const S=[],y=R/r,I=y*(e-t)+t;for(let U=0;U<=s;U++){const D=U/s,F=D*l+o,X=Math.sin(F),z=Math.cos(F);L.x=I*X,L.y=-y*n+g,L.z=I*z,d.push(L.x,L.y,L.z),x.set(X,C,z).normalize(),u.push(x.x,x.y,x.z),f.push(D,1-y),S.push(m++)}v.push(S)}for(let R=0;R<s;R++)for(let S=0;S<r;S++){const y=v[S][R],I=v[S+1][R],U=v[S+1][R+1],D=v[S][R+1];(t>0||S!==0)&&(h.push(y,I,D),A+=3),(e>0||S!==r-1)&&(h.push(I,U,D),A+=3)}c.addGroup(p,A,0),p+=A}function _(x){const L=m,A=new et,C=new E;let R=0;const S=x===!0?t:e,y=x===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,g*y,0),u.push(0,y,0),f.push(.5,.5),m++;const I=m;for(let U=0;U<=s;U++){const F=U/s*l+o,X=Math.cos(F),z=Math.sin(F);C.x=S*z,C.y=g*y,C.z=S*X,d.push(C.x,C.y,C.z),u.push(0,y,0),A.x=X*.5+.5,A.y=z*.5*y+.5,f.push(A.x,A.y),m++}for(let U=0;U<s;U++){const D=L+U,F=I+U;x===!0?h.push(F,F+1,D):h.push(F+1,F,D),R+=3}c.addGroup(p,R,x===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ie(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $e extends ie{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new $e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ps extends fe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new Kt(r,3)),this.setAttribute("normal",new Kt(r.slice(),3)),this.setAttribute("uv",new Kt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const _=new E,x=new E,L=new E;for(let A=0;A<e.length;A+=3)f(e[A+0],_),f(e[A+1],x),f(e[A+2],L),l(_,x,L,M)}function l(M,_,x,L){const A=L+1,C=[];for(let R=0;R<=A;R++){C[R]=[];const S=M.clone().lerp(x,R/A),y=_.clone().lerp(x,R/A),I=A-R;for(let U=0;U<=I;U++)U===0&&R===A?C[R][U]=S:C[R][U]=S.clone().lerp(y,U/I)}for(let R=0;R<A;R++)for(let S=0;S<2*(A-R)-1;S++){const y=Math.floor(S/2);S%2===0?(u(C[R][y+1]),u(C[R+1][y]),u(C[R][y])):(u(C[R][y+1]),u(C[R+1][y+1]),u(C[R+1][y]))}}function c(M){const _=new E;for(let x=0;x<r.length;x+=3)_.x=r[x+0],_.y=r[x+1],_.z=r[x+2],_.normalize().multiplyScalar(M),r[x+0]=_.x,r[x+1]=_.y,r[x+2]=_.z}function h(){const M=new E;for(let _=0;_<r.length;_+=3){M.x=r[_+0],M.y=r[_+1],M.z=r[_+2];const x=g(M)/2/Math.PI+.5,L=p(M)/Math.PI+.5;a.push(x,1-L)}m(),d()}function d(){for(let M=0;M<a.length;M+=6){const _=a[M+0],x=a[M+2],L=a[M+4],A=Math.max(_,x,L),C=Math.min(_,x,L);A>.9&&C<.1&&(_<.2&&(a[M+0]+=1),x<.2&&(a[M+2]+=1),L<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function f(M,_){const x=M*3;_.x=t[x+0],_.y=t[x+1],_.z=t[x+2]}function m(){const M=new E,_=new E,x=new E,L=new E,A=new et,C=new et,R=new et;for(let S=0,y=0;S<r.length;S+=9,y+=6){M.set(r[S+0],r[S+1],r[S+2]),_.set(r[S+3],r[S+4],r[S+5]),x.set(r[S+6],r[S+7],r[S+8]),A.set(a[y+0],a[y+1]),C.set(a[y+2],a[y+3]),R.set(a[y+4],a[y+5]),L.copy(M).add(_).add(x).divideScalar(3);const I=g(L);v(A,y+0,M,I),v(C,y+2,_,I),v(R,y+4,x,I)}}function v(M,_,x,L){L<0&&M.x===1&&(a[_]=M.x-1),x.x===0&&x.z===0&&(a[_]=L/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ps(t.vertices,t.indices,t.radius,t.details)}}class Oo extends Ps{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Oo(t.radius,t.detail)}}class th extends Qc{constructor(t){super(t),this.uuid=yn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Qc().fromJSON(s))}return this}}const N0={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=eh(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,d,u,f;if(n&&(r=B0(i,t,r,e)),i.length>80*e){o=c=i[0],l=h=i[1];for(let m=e;m<s;m+=e)d=i[m],u=i[m+1],d<o&&(o=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return Is(r,a,e,o,l,f,0),a}};function eh(i,t,e,n,s){let r,a;if(s===J0(i,t,e,n)>0)for(r=t;r<e;r+=n)a=sh(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=sh(r,i[r],i[r+1],a);return a&&Ur(a,a.next)&&(Ds(a),a=a.next),a}function _i(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ur(e,e.next)||ge(e.prev,e,e.next)===0)){if(Ds(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Is(i,t,e,n,s,r,a){if(!i)return;!a&&r&&X0(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?k0(i,n,s,r):F0(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),Ds(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=O0(_i(i),t,e),Is(i,t,e,n,s,r,2)):a===2&&z0(i,t,e,n,s,r):Is(_i(i),t,e,n,s,r,1);break}}}function F0(i){const t=i.prev,e=i,n=i.next;if(ge(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=s<r?s<a?s:a:r<a?r:a,d=o<l?o<c?o:c:l<c?l:c,u=s>r?s>a?s:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c;let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&os(s,o,r,l,a,c,m.x,m.y)&&ge(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function k0(i,t,e,n){const s=i.prev,r=i,a=i.next;if(ge(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,u=a.y,f=o<l?o<c?o:c:l<c?l:c,m=h<d?h<u?h:u:d<u?d:u,v=o>l?o>c?o:c:l>c?l:c,g=h>d?h>u?h:u:d>u?d:u,p=zo(f,m,t,e,n),M=zo(v,g,t,e,n);let _=i.prevZ,x=i.nextZ;for(;_&&_.z>=p&&x&&x.z<=M;){if(_.x>=f&&_.x<=v&&_.y>=m&&_.y<=g&&_!==s&&_!==a&&os(o,h,l,d,c,u,_.x,_.y)&&ge(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=f&&x.x<=v&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&os(o,h,l,d,c,u,x.x,x.y)&&ge(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=v&&_.y>=m&&_.y<=g&&_!==s&&_!==a&&os(o,h,l,d,c,u,_.x,_.y)&&ge(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=M;){if(x.x>=f&&x.x<=v&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&os(o,h,l,d,c,u,x.x,x.y)&&ge(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function O0(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Ur(s,r)&&nh(s,n,n.next,r)&&Ls(s,r)&&Ls(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Ds(n),Ds(n.next),n=i=r),n=n.next}while(n!==i);return _i(n)}function z0(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&$0(a,o)){let l=ih(a,o);a=_i(a,a.next),l=_i(l,l.next),Is(a,t,e,n,s,r,0),Is(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function B0(i,t,e,n){const s=[];let r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=eh(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(Y0(c));for(s.sort(G0),r=0;r<s.length;r++)e=H0(s[r],e);return e}function G0(i,t){return i.x-t.x}function H0(i,t){const e=V0(i,t);if(!e)return t;const n=ih(e,i);return _i(n,n.next),_i(e,e.next)}function V0(i,t){let e=t,n=-1/0,s;const r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const u=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,s=e.x<e.next.x?e:e.next,u===r))return s}e=e.next}while(e!==t);if(!s)return null;const o=s,l=s.x,c=s.y;let h=1/0,d;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&os(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(d=Math.abs(a-e.y)/(r-e.x),Ls(e,i)&&(d<h||d===h&&(e.x>s.x||e.x===s.x&&W0(s,e)))&&(s=e,h=d)),e=e.next;while(e!==o);return s}function W0(i,t){return ge(i.prev,i,t.prev)<0&&ge(t.next,i,i.next)<0}function X0(i,t,e,n){let s=i;do s.z===0&&(s.z=zo(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,q0(s)}function q0(i){let t,e,n,s,r,a,o,l,c=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(a>1);return i}function zo(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Y0(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function os(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function $0(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Z0(i,t)&&(Ls(i,t)&&Ls(t,i)&&j0(i,t)&&(ge(i.prev,i,t.prev)||ge(i,t.prev,t))||Ur(i,t)&&ge(i.prev,i,i.next)>0&&ge(t.prev,t,t.next)>0)}function ge(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ur(i,t){return i.x===t.x&&i.y===t.y}function nh(i,t,e,n){const s=Fr(ge(i,t,e)),r=Fr(ge(i,t,n)),a=Fr(ge(e,n,i)),o=Fr(ge(e,n,t));return!!(s!==r&&a!==o||s===0&&Nr(i,e,t)||r===0&&Nr(i,n,t)||a===0&&Nr(e,i,n)||o===0&&Nr(e,t,n))}function Nr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Fr(i){return i>0?1:i<0?-1:0}function Z0(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&nh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ls(i,t){return ge(i.prev,i,i.next)<0?ge(i,t,i.next)>=0&&ge(i,i.prev,t)>=0:ge(i,t,i.prev)<0||ge(i,i.next,t)<0}function j0(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function ih(i,t){const e=new Bo(i.i,i.x,i.y),n=new Bo(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function sh(i,t,e,n){const s=new Bo(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ds(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Bo(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function J0(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Us{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Us.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];rh(t),ah(n,t);let a=t.length;e.forEach(rh);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,ah(n,e[l]);const o=N0.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function rh(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function ah(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Go extends fe{constructor(t=new th([new et(.5,.5),new et(-.5,.5),new et(-.5,-.5),new et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new Kt(s,3)),this.setAttribute("uv",new Kt(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:K0;let _,x=!1,L,A,C,R;p&&(_=p.getSpacedPoints(h),x=!0,u=!1,L=p.computeFrenetFrames(h,!1),A=new E,C=new E,R=new E),u||(g=0,f=0,m=0,v=0);const S=o.extractPoints(c);let y=S.shape;const I=S.holes;if(!Us.isClockWise(y)){y=y.reverse();for(let Q=0,ct=I.length;Q<ct;Q++){const P=I[Q];Us.isClockWise(P)&&(I[Q]=P.reverse())}}const D=Us.triangulateShape(y,I),F=y;for(let Q=0,ct=I.length;Q<ct;Q++){const P=I[Q];y=y.concat(P)}function X(Q,ct,P){return ct||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(ct,P)}const z=y.length,q=D.length;function H(Q,ct,P){let Lt,st,St;const ut=Q.x-ct.x,kt=Q.y-ct.y,Mt=P.x-Q.x,T=P.y-Q.y,b=ut*ut+kt*kt,G=ut*T-kt*Mt;if(Math.abs(G)>Number.EPSILON){const j=Math.sqrt(b),tt=Math.sqrt(Mt*Mt+T*T),J=ct.x-kt/j,Ct=ct.y+ut/j,pt=P.x-T/tt,bt=P.y+Mt/tt,Jt=((pt-J)*T-(bt-Ct)*Mt)/(ut*T-kt*Mt);Lt=J+ut*Jt-Q.x,st=Ct+kt*Jt-Q.y;const at=Lt*Lt+st*st;if(at<=2)return new et(Lt,st);St=Math.sqrt(at/2)}else{let j=!1;ut>Number.EPSILON?Mt>Number.EPSILON&&(j=!0):ut<-Number.EPSILON?Mt<-Number.EPSILON&&(j=!0):Math.sign(kt)===Math.sign(T)&&(j=!0),j?(Lt=-kt,st=ut,St=Math.sqrt(b)):(Lt=ut,st=kt,St=Math.sqrt(b/2))}return new et(Lt/St,st/St)}const rt=[];for(let Q=0,ct=F.length,P=ct-1,Lt=Q+1;Q<ct;Q++,P++,Lt++)P===ct&&(P=0),Lt===ct&&(Lt=0),rt[Q]=H(F[Q],F[P],F[Lt]);const it=[];let lt,yt=rt.concat();for(let Q=0,ct=I.length;Q<ct;Q++){const P=I[Q];lt=[];for(let Lt=0,st=P.length,St=st-1,ut=Lt+1;Lt<st;Lt++,St++,ut++)St===st&&(St=0),ut===st&&(ut=0),lt[Lt]=H(P[Lt],P[St],P[ut]);it.push(lt),yt=yt.concat(lt)}for(let Q=0;Q<g;Q++){const ct=Q/g,P=f*Math.cos(ct*Math.PI/2),Lt=m*Math.sin(ct*Math.PI/2)+v;for(let st=0,St=F.length;st<St;st++){const ut=X(F[st],rt[st],Lt);nt(ut.x,ut.y,-P)}for(let st=0,St=I.length;st<St;st++){const ut=I[st];lt=it[st];for(let kt=0,Mt=ut.length;kt<Mt;kt++){const T=X(ut[kt],lt[kt],Lt);nt(T.x,T.y,-P)}}}const Bt=m+v;for(let Q=0;Q<z;Q++){const ct=u?X(y[Q],yt[Q],Bt):y[Q];x?(C.copy(L.normals[0]).multiplyScalar(ct.x),A.copy(L.binormals[0]).multiplyScalar(ct.y),R.copy(_[0]).add(C).add(A),nt(R.x,R.y,R.z)):nt(ct.x,ct.y,0)}for(let Q=1;Q<=h;Q++)for(let ct=0;ct<z;ct++){const P=u?X(y[ct],yt[ct],Bt):y[ct];x?(C.copy(L.normals[Q]).multiplyScalar(P.x),A.copy(L.binormals[Q]).multiplyScalar(P.y),R.copy(_[Q]).add(C).add(A),nt(R.x,R.y,R.z)):nt(P.x,P.y,d/h*Q)}for(let Q=g-1;Q>=0;Q--){const ct=Q/g,P=f*Math.cos(ct*Math.PI/2),Lt=m*Math.sin(ct*Math.PI/2)+v;for(let st=0,St=F.length;st<St;st++){const ut=X(F[st],rt[st],Lt);nt(ut.x,ut.y,d+P)}for(let st=0,St=I.length;st<St;st++){const ut=I[st];lt=it[st];for(let kt=0,Mt=ut.length;kt<Mt;kt++){const T=X(ut[kt],lt[kt],Lt);x?nt(T.x,T.y+_[h-1].y,_[h-1].x+P):nt(T.x,T.y,d+P)}}}B(),Z();function B(){const Q=s.length/3;if(u){let ct=0,P=z*ct;for(let Lt=0;Lt<q;Lt++){const st=D[Lt];_t(st[2]+P,st[1]+P,st[0]+P)}ct=h+g*2,P=z*ct;for(let Lt=0;Lt<q;Lt++){const st=D[Lt];_t(st[0]+P,st[1]+P,st[2]+P)}}else{for(let ct=0;ct<q;ct++){const P=D[ct];_t(P[2],P[1],P[0])}for(let ct=0;ct<q;ct++){const P=D[ct];_t(P[0]+z*h,P[1]+z*h,P[2]+z*h)}}n.addGroup(Q,s.length/3-Q,0)}function Z(){const Q=s.length/3;let ct=0;ot(F,ct),ct+=F.length;for(let P=0,Lt=I.length;P<Lt;P++){const st=I[P];ot(st,ct),ct+=st.length}n.addGroup(Q,s.length/3-Q,1)}function ot(Q,ct){let P=Q.length;for(;--P>=0;){const Lt=P;let st=P-1;st<0&&(st=Q.length-1);for(let St=0,ut=h+g*2;St<ut;St++){const kt=z*St,Mt=z*(St+1),T=ct+Lt+kt,b=ct+st+kt,G=ct+st+Mt,j=ct+Lt+Mt;Ut(T,b,G,j)}}}function nt(Q,ct,P){l.push(Q),l.push(ct),l.push(P)}function _t(Q,ct,P){Nt(Q),Nt(ct),Nt(P);const Lt=s.length/3,st=M.generateTopUV(n,s,Lt-3,Lt-2,Lt-1);$t(st[0]),$t(st[1]),$t(st[2])}function Ut(Q,ct,P,Lt){Nt(Q),Nt(ct),Nt(Lt),Nt(ct),Nt(P),Nt(Lt);const st=s.length/3,St=M.generateSideWallUV(n,s,st-6,st-3,st-2,st-1);$t(St[0]),$t(St[1]),$t(St[3]),$t(St[1]),$t(St[2]),$t(St[3])}function Nt(Q){s.push(l[Q*3+0]),s.push(l[Q*3+1]),s.push(l[Q*3+2])}function $t(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Q0(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Dr[s.type]().fromJSON(s)),new Go(n,t.options)}}const K0={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new et(r,a),new et(o,l),new et(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[s*3],f=t[s*3+1],m=t[s*3+2],v=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new et(a,1-l),new et(c,1-d),new et(u,1-m),new et(v,1-p)]:[new et(o,1-l),new et(h,1-d),new et(f,1-m),new et(g,1-p)]}};function Q0(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class sn extends Ps{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new sn(t.radius,t.detail)}}class Ns extends Ps{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ns(t.radius,t.detail)}}class kr extends fe{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let d=t;const u=(e-t)/s,f=new E,m=new et;for(let v=0;v<=s;v++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}d+=u}for(let v=0;v<s;v++){const g=v*(n+1);for(let p=0;p<n;p++){const M=p+g,_=M,x=M+n+1,L=M+n+2,A=M+1;o.push(_,x,A),o.push(x,L,A)}}this.setIndex(o),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(c,3)),this.setAttribute("uv",new Kt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class yi extends fe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new E,u=new E,f=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const M=[],_=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let L=0;L<=e;L++){const A=L/e;d.x=-t*Math.cos(s+A*r)*Math.sin(a+_*o),d.y=t*Math.cos(a+_*o),d.z=t*Math.sin(s+A*r)*Math.sin(a+_*o),m.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),g.push(A+x,1-_),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const _=h[p][M+1],x=h[p][M],L=h[p+1][M],A=h[p+1][M+1];(p!==0||a>0)&&f.push(_,x,A),(p!==n-1||l<Math.PI)&&f.push(x,L,A)}this.setIndex(f),this.setAttribute("position",new Kt(m,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class rn extends fe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new E,d=new E,u=new E;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const v=m/s*r,g=f/n*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(v),d.y=(t+e*Math.cos(g))*Math.sin(v),d.z=e*Math.sin(g),o.push(d.x,d.y,d.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const v=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,M=(s+1)*f+m;a.push(v,g,M),a.push(g,p,M)}this.setIndex(a),this.setAttribute("position",new Kt(o,3)),this.setAttribute("normal",new Kt(l,3)),this.setAttribute("uv",new Kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Mi extends fe{constructor(t=new Fo(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new E,l=new E,c=new et;let h=new E;const d=[],u=[],f=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new Kt(d,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(f,2));function v(){for(let _=0;_<e;_++)g(_);g(r===!1?e:0),M(),p()}function g(_){h=t.getPointAt(_/e,h);const x=a.normals[_],L=a.binormals[_];for(let A=0;A<=s;A++){const C=A/s*Math.PI*2,R=Math.sin(C),S=-Math.cos(C);l.x=S*x.x+R*L.x,l.y=S*x.y+R*L.y,l.z=S*x.z+R*L.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let _=1;_<=e;_++)for(let x=1;x<=s;x++){const L=(s+1)*(_-1)+(x-1),A=(s+1)*_+(x-1),C=(s+1)*_+x,R=(s+1)*(_-1)+x;m.push(L,A,R),m.push(A,C,R)}}function M(){for(let _=0;_<=e;_++)for(let x=0;x<=s;x++)c.x=_/e,c.y=x/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Mi(new Dr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class ti extends ui{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wl,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class tg extends ti{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new et(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ae(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new zt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new zt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new zt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Ho extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class eg extends Ho{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Vo=new Zt,oh=new E,lh=new E;class ch{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.map=null,this.mapPass=null,this.matrix=new Zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new po,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;oh.setFromMatrixPosition(t.matrixWorld),e.position.copy(oh),lh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(lh),e.updateMatrixWorld(),Vo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const hh=new Zt,Fs=new E,Wo=new E;class ng extends ch{constructor(){super(new Ge(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new et(4,2),this._viewportCount=6,this._viewports=[new ne(2,1,1,1),new ne(0,1,1,1),new ne(3,1,1,1),new ne(1,1,1,1),new ne(3,0,1,1),new ne(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Fs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Fs),Wo.copy(n.position),Wo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Wo),n.updateMatrixWorld(),s.makeTranslation(-Fs.x,-Fs.y,-Fs.z),hh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hh)}}class Xo extends Ho{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ng}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class ig extends ch{constructor(){super(new rc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sg extends Ho{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new ig}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class rg{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=dh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=dh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function dh(){return performance.now()}const uh=new Zt;class ag{constructor(t,e,n=0,s=1/0){this.ray=new Ka(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Qa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return uh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(uh),this}intersectObject(t,e=!0,n=[]){return qo(t,this,n,e),n.sort(fh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)qo(t[s],this,n,e);return n.sort(fh),n}}function fh(i,t){return i.distance-t.distance}function qo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)qo(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$r}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$r);class og extends Se{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new et(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const ls=new E,ph=new Zt,mh=new Zt,gh=new E,vh=new E;class lg{constructor(t={}){const e=this;let n,s,r,a;const o={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:s}},this.render=function(m,v){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),ph.copy(v.matrixWorldInverse),mh.multiplyMatrices(v.projectionMatrix,ph),h(m,m,v),f(m)},this.setSize=function(m,v){n=m,s=v,r=n/2,a=s/2,l.style.width=m+"px",l.style.height=v+"px"};function c(m){m.isCSS2DObject&&(m.element.style.display="none");for(let v=0,g=m.children.length;v<g;v++)c(m.children[v])}function h(m,v,g){if(m.visible===!1){c(m);return}if(m.isCSS2DObject){ls.setFromMatrixPosition(m.matrixWorld),ls.applyMatrix4(mh);const p=ls.z>=-1&&ls.z<=1&&m.layers.test(g.layers)===!0,M=m.element;M.style.display=p===!0?"":"none",p===!0&&(m.onBeforeRender(e,v,g),M.style.transform="translate("+-100*m.center.x+"%,"+-100*m.center.y+"%)translate("+(ls.x*r+r)+"px,"+(-ls.y*a+a)+"px)",M.parentNode!==l&&l.appendChild(M),m.onAfterRender(e,v,g));const _={distanceToCameraSquared:d(g,m)};o.objects.set(m,_)}for(let p=0,M=m.children.length;p<M;p++)h(m.children[p],v,g)}function d(m,v){return gh.setFromMatrixPosition(m.matrixWorld),vh.setFromMatrixPosition(v.matrixWorld),gh.distanceToSquared(vh)}function u(m){const v=[];return m.traverseVisible(function(g){g.isCSS2DObject&&v.push(g)}),v}function f(m){const v=u(m).sort(function(p,M){if(p.renderOrder!==M.renderOrder)return M.renderOrder-p.renderOrder;const _=o.objects.get(p).distanceToCameraSquared,x=o.objects.get(M).distanceToCameraSquared;return _-x}),g=v.length;for(let p=0,M=v.length;p<M;p++)v[p].element.style.zIndex=g-p}}}const He={name:"Sami Nouicer",headline:"Data Scientist · ML Engineer · Data Engineer",location:"Paris area, France",email:"nouicer.samiilyas@gmail.com",linkedin:"https://linkedin.com/in/Samillyas-Nouicer",github:"https://github.com/SamiIlyas-Nouicer",availability:"Looking for a Data Scientist / Data Analyst / Data Engineer apprenticeship from September 2026 (4 weeks / 4 weeks rhythm)."},ei={about:{label:"Captain's Haven",color:"#b8860b",ink:"#6b4413",icon:"anchor"},experience:{label:"Naval Campaigns",color:"#9e2a2b",ink:"#7a1c1d",icon:"swords"},project:{label:"Artificer Works",color:"#1d5c63",ink:"#14454a",icon:"sextant"},education:{label:"Royal Academies",color:"#5c3d75",ink:"#422956",icon:"scroll"}},Me=[{id:"home",category:"about",landmark:"lighthouse",title:"Sami Nouicer",subtitle:"Data Scientist · ML · Data Engineering",date:"Paris area, France",position:[0,0],radius:26,summary:"Master's student in Distributed Systems & Data Science Technologies at UPEC. Hands-on experience in data science, machine learning and data analysis on industrial and operational problems. I turn complex data into actionable indicators and explain technical results clearly to non-specialists.",bullets:["Looking for a Data Scientist / Data Analyst / Data Engineer apprenticeship starting September 2026 (4 weeks / 4 weeks).","Languages: French (native), English (C1, professional)."],skills:{Languages:["Python","SQL (advanced)","Java","JavaScript","Bash"],"Machine Learning":["Scikit-learn","TensorFlow","PyTorch","YOLO","OpenCV","Feature Engineering","Model Evaluation","Cross-Validation","Classification","Clustering","Model Monitoring"],"Data Eng. & MLOps":["Apache Kafka","PySpark","Delta Lake","MLflow","ETL Pipelines","Data Modeling","Pandas","NumPy"],Databases:["PostgreSQL","MySQL","MongoDB"],"Cloud & DevOps":["AWS","Docker","Git","Linux","CI/CD"],Visualisation:["Power BI","Looker Studio","Tableau","Matplotlib","Seaborn","Excel"],Other:["GitLab","Jira","Agile","Scrum","Technical documentation"]},tags:[],metrics:[{value:"2",label:"Internships"},{value:"7",label:"Projects"},{value:"C1",label:"English"}]},{id:"dpworld",category:"experience",landmark:"port",title:"DP World",subtitle:"Data Scientist Intern",date:"May 2024 – Oct 2024",org:"International port logistics",position:[150,-95],radius:30,summary:"Designed and deployed a computer-vision system that automatically recognises shipping containers in a live port environment.",bullets:["Built an automatic container recognition system with YOLOv8, reaching 96% accuracy and cutting manual processing by 60%.","Built the full data pipeline: image preparation, model training, handling difficult edge cases and model version tracking to simplify future updates."],tags:["YOLOv8","Computer Vision","Python","OpenCV","Model Versioning","Data Pipeline"],metrics:[{value:"96%",label:"Accuracy"},{value:"−60%",label:"Manual processing"},{value:"6 mo",label:"Duration"}]},{id:"sonelgaz",category:"experience",landmark:"powerplant",title:"SONELGAZ",subtitle:"Full Stack Software Engineer Intern",date:"Feb 2023 – Jun 2023",org:"National electricity & gas company",position:[255,-10],radius:26,summary:"Designed and built an internal cloud provisioning portal, front-end to back-end.",bullets:["Designed and developed an internal cloud provisioning portal (front-end and back-end).","Back-end development and SQL database integration.","Worked in an Agile / Scrum team."],tags:["Full Stack","JavaScript","SQL","Cloud Provisioning","Agile / Scrum"],metrics:[{value:"5 mo",label:"Duration"},{value:"Full",label:"Stack"}]},{id:"grid",category:"project",landmark:"windfarm",title:"Power Grid Forecasting Platform",subtitle:"Real-time streaming & ML forecasting",date:"Apr 2026",position:[150,135],radius:27,summary:"End-to-end platform that ingests, transforms and reliably stores real-time electricity grid events, then forecasts consumption with monitored ML models.",bullets:["Ingests more than 10,000 events per minute in real time, transforms them and stores them reliably for analysis.","Consumption forecasting with automatic model performance tracking.","Automatic anomaly detection with alerting to keep predictions reliable, shown in an interactive dashboard."],tags:["Kafka","PySpark","Delta Lake","LightGBM","MLflow","Streamlit","Docker"],metrics:[{value:"10k+",label:"Events / min"},{value:"Real",label:"Time"}]},{id:"waste",category:"project",landmark:"recycling",title:"Automated Waste Sorting",subtitle:"Image recognition with transfer learning",date:"Mar 2026",position:[290,165],radius:22,summary:"An image classifier that automatically sorts waste into categories by adapting a pre-trained network.",bullets:["Built an image classifier that sorts waste into categories automatically, reaching 95% accuracy by adapting a pre-trained model (transfer learning).","Used data augmentation to make the model robust to real-world variation."],tags:["MobileNetV2","TensorFlow","Transfer Learning","Data Augmentation"],metrics:[{value:"95%",label:"Accuracy"}]},{id:"quantum",category:"project",landmark:"crystal",title:"Quantum Machine Learning",subtitle:"Master's thesis (PFE)",date:"2025",position:[40,265],radius:25,summary:"Comparative study of quantum vs. classical machine learning models on real-world datasets.",bullets:["Compared quantum models (QSVM, VQC, Hybrid QNN) with classical ones (SVM, MLP) on 7 real datasets.","Quantum models proved competitive with classical ones, reaching accuracy up to 0.95.",'Thesis graded "Excellent".'],tags:["Qiskit","Qiskit ML","Scikit-learn","PCA","SMOTE","NumPy"],metrics:[{value:"0.95",label:"Best accuracy"},{value:"7",label:"Datasets"},{value:"5",label:"Models compared"}]},{id:"stereo",category:"project",landmark:"observatory",title:"3D Detection & Positioning",subtitle:"Stereo vision system",date:"2024 – 2025",position:[-95,300],radius:22,summary:"A stereo-vision system that detects objects and computes their 3D coordinates in real time.",bullets:["Built a stereo-vision system with OpenCV and YOLO.","Implemented triangulation algorithms to compute (x, y, z) coordinates in real time.","Optimised performance for real-time processing."],tags:["OpenCV","YOLO","Stereo Vision","Triangulation","Python"],metrics:[{value:"x,y,z",label:"Real time"}]},{id:"twitter",category:"project",landmark:"birdnest",title:"Twitter Sentiment Analysis",subtitle:"NLP classification pipeline",date:"2024",position:[200,280],radius:21,summary:"NLP pipeline that classifies tweet sentiment on the Sentiment140 dataset (1.6M tweets).",bullets:["Preprocessing and feature extraction on 1.6M tweets (Sentiment140).","Compared classical ML models (LR, SVC, KNN) with an RNN; the RNN performed best (AUC 0.87)."],tags:["NLTK","Scikit-learn","TensorFlow","Keras","Pandas","NumPy"],metrics:[{value:"1.6M",label:"Tweets"},{value:"0.87",label:"AUC (RNN)"}]},{id:"climate",category:"project",landmark:"desert",title:"Algerian Climate & Soil Analysis",subtitle:"Geospatial data fusion & dashboard",date:"2024",position:[330,60],radius:24,summary:"Merged an Algerian soil dataset with ERA5/WFDE5 climate data and built an interactive map dashboard.",bullets:["Merged an Algerian soil dataset with the 2019 ERA5/WFDE5 climate dataset using spatial joins on NetCDF4 files.","Built an interactive dashboard with maps and climate-variable visualisations clipped to Algeria."],tags:["Xarray","GeoPandas","Folium","Streamlit","NetCDF4"],metrics:[{value:"2019",label:"ERA5 / WFDE5"}]},{id:"lung",category:"project",landmark:"medical",title:"Lung Nodule Segmentation",subtitle:"Bachelor's thesis (PFE) · Deep learning",date:"2023",position:[-60,170],radius:23,summary:"2D segmentation of lung nodules in CT scans with deep learning, plus K-means based classification.",bullets:["Segmented lung nodules with U-Net and Mask R-CNN and classified them with K-means clustering (LUNA16 CT scans).","U-Net performed best (Dice 0.77, IoU 0.62) vs. Mask R-CNN (Dice 0.67, IoU 0.56).","Desktop interface built with Tkinter."],tags:["LUNA16","U-Net","Mask R-CNN","TensorFlow","Keras","OpenCV","Scikit-learn","Tkinter"],metrics:[{value:"0.77",label:"Dice (U-Net)"},{value:"0.62",label:"IoU"}]},{id:"upec",category:"education",landmark:"university",title:"UPEC",subtitle:"Master's · Distributed Systems & Data Science Technologies",date:"2026 – 2028",org:"Créteil, France",position:[-165,-70],radius:26,summary:"Master's programme focused on distributed systems and data-science technologies, as an apprenticeship.",bullets:["Distributed systems, big-data processing and data-science engineering.","Apprenticeship rhythm: 4 weeks at school / 4 weeks at the company."],tags:["Distributed Systems","Big Data","Data Science"],metrics:[{value:"2026",label:"Start"}]},{id:"ece",category:"education",landmark:"tower",title:"ECE Paris",subtitle:"MSc Data Management & Artificial Intelligence",date:"2025 – 2026",org:"Paris, France",position:[-275,35],radius:23,summary:"MSc programme in data management and artificial intelligence.",bullets:["Data management, data engineering and applied AI."],tags:["Data Management","Artificial Intelligence"],metrics:[]},{id:"usthb",category:"education",landmark:"temple",title:"USTHB",subtitle:"Master's in Intelligent Computer Systems · Bachelor's in Information Systems Engineering",date:"2020 – 2025",org:"Algiers, Algeria",position:[-190,150],radius:27,summary:"Five years at USTHB: a Bachelor's in Information Systems Engineering followed by a Master's in Intelligent Computer Systems.",bullets:[`Master's in Intelligent Computer Systems (2023 – 2025): thesis graded "Excellent" (Quantum Machine Learning).`,"Bachelor's in Information Systems Engineering (2020 – 2023): thesis on lung nodule segmentation with deep learning."],tags:["Artificial Intelligence","Information Systems","Software Engineering"],metrics:[{value:"5 yrs",label:"Studies"},{value:"Excellent",label:"Thesis grade"}]}],Or=9.81,xh=[[1,.35,.085,62],[.55,1,.1,35],[-.45,.9,.095,22],[.9,-.45,.085,13.5],[-.8,-.35,.075,8.5],[.25,-1,.06,5.2]],Yo={intensity:1,time:0},_h=xh.length,zr=xh.map(([i,t,e,n])=>{const s=Math.hypot(i,t),r=2*Math.PI/n;return{dx:i/s,dz:t/s,baseSteepness:e,steepness:e,L:n,k:r,c:Math.sqrt(Or/r)}});function cg(i){Yo.intensity=i;for(const t of zr)t.steepness=t.baseSteepness*i}function yh(){return zr.map(i=>[i.dx,i.dz,i.steepness,i.L])}const hg={x:0,y:0,z:0,vx:0,vy:0,vz:0};function Mh(i,t,e,n){let s=0,r=0,a=0,o=0,l=0,c=0;for(let h=0;h<zr.length;h++){const d=zr[h],u=d.k*(d.dx*i+d.dz*t-d.c*e),f=d.steepness/d.k,m=Math.cos(u),v=Math.sin(u);s+=d.dx*f*m,r+=f*v,a+=d.dz*f*m;const g=f*d.k*d.c;o+=d.dx*g*v,l+=-g*m,c+=d.dz*g*v}return n.x=s,n.y=r,n.z=a,n.vx=o,n.vy=l,n.vz=c,n}const ni={x:0,y:0,z:0,vx:0,vy:0,vz:0};function Br(i,t,e=Yo.time,n=hg){let s=i,r=t;for(let a=0;a<4;a++)Mh(s,r,e,ni),s=i-ni.x,r=t-ni.z;return Mh(s,r,e,ni),n.y=ni.y,n.vx=ni.vx,n.vy=ni.vy,n.vz=ni.vz,n}const dg=`
  uniform vec4 uWaves[${_h}];
  uniform float uTime;

  // returns displacement, accumulates tangent/binormal & jacobian terms
  vec3 gerstner(vec2 p, float dist, inout vec3 tangent, inout vec3 binormal, inout float jxx, inout float jzz, inout float jxz) {
    vec3 disp = vec3(0.0);
    for (int i = 0; i < ${_h}; i++) {
      vec4 w = uWaves[i];
      vec2 d = w.xy;
      // fade short waves in the distance (where the mesh is coarse) to avoid aliasing
      float steep = w.z * (1.0 - smoothstep(w.w * 45.0, w.w * 110.0, dist));
      float k = 6.28318530718 / w.w;
      float c = sqrt(${Or.toFixed(2)} / k);
      float f = k * (dot(d, p) - c * uTime);
      float a = steep / k;
      float cf = cos(f);
      float sf = sin(f);
      disp += vec3(d.x * a * cf, a * sf, d.y * a * cf);
      tangent += vec3(-d.x * d.x * steep * sf, d.x * steep * cf, -d.x * d.y * steep * sf);
      binormal += vec3(-d.x * d.y * steep * sf, d.y * steep * cf, -d.y * d.y * steep * sf);
      jxx += d.x * d.x * steep * sf;
      jzz += d.y * d.y * steep * sf;
      jxz += d.x * d.y * steep * sf;
    }
    return disp;
  }
`;function Gr(i,t){let e=i*374761393+t*668265263;return e=(e^e>>>13)*1274126177,e=e^e>>>16,(e>>>0)/4294967295}function bh(i){return i*i*(3-2*i)}function bi(i,t){const e=Math.floor(i),n=Math.floor(t),s=i-e,r=t-n,a=Gr(e,n),o=Gr(e+1,n),l=Gr(e,n+1),c=Gr(e+1,n+1),h=bh(s),d=bh(r);return a+(o-a)*h+(l-a)*d+(a-o-l+c)*h*d}function Sh(i,t,e=4){let n=0,s=.5,r=1,a=0;for(let o=0;o<e;o++)n+=bi(i*r,t*r)*s,a+=s,s*=.5,r*=2.03;return n/a}function $o(i){let t=i>>>0||1;return()=>(t^=t<<13,t>>>=0,t^=t>>>17,t^=t<<5,t>>>=0,t/4294967295)}const Zo=(i,t,e)=>{const n=Math.min(Math.max((e-i)/(t-i),0),1);return n*n*(3-2*n)},ug={lighthouse:6.5,port:.6,powerplant:1.4,windfarm:4.5,recycling:1.6,crystal:5.5,observatory:5,birdnest:3.5,desert:2.6,medical:2.2,university:2.4,tower:2,temple:3.2},fg={port:.55,powerplant:.45,university:.4,tower:.38};function pg(i,t){i.seed=t*17.31+3.7,i.hill=ug[i.landmark]??3,i.plateauR=fg[i.landmark]??.3,i.cx=i.position[0],i.cz=i.position[1];const e=i.id==="home"?Math.PI/2:Math.atan2(-i.cz,-i.cx);i.dockAngle=e,i.plateauH=1.4+i.hill*.62;const n=Math.cos(e),s=Math.sin(e);let r=i.radius;for(let c=0;c<i.radius*1.6;c+=.25)if(Nn(i,n*c,s*c)<-.15){r=c;break}i.coastDist=r;const a=15;i.dockStart=new et(i.cx+n*(r-7),i.cz+s*(r-7)),i.dockEnd=new et(i.cx+n*(r+a),i.cz+s*(r+a));const o=-s,l=n;i.moor=new et(i.cx+n*(r+a-4)+o*4.2,i.cz+s*(r+a-4)+l*4.2),i.approach=new et(i.cx+n*(r+a+22),i.cz+s*(r+a+22))}function Nn(i,t,e){const n=i.radius,s=i.seed,r=Math.hypot(t,e);if(r>n*2.2)return-14;const a=Sh(t*.045+s,e*.045-s,3),o=r/(n*(.78+.42*a));let l;if(o<1){const u=Math.min((1-o)*7.5,1.4),f=Sh(t*.09-s*2,e*.09+s,3),m=i.hill*Zo(.88,.32,o)*(.45+.75*f);l=u+m}else l=-(o-1)*n*.42,l-=(o-1)*(o-1)*10;const c=r/n,h=i.plateauR,d=Zo(h+.14,h-.04,c);return l=l+(i.plateauH-l)*d,l+=(bi(t*.35+s,e*.35)-.5)*.25*Zo(1,.85,o),Math.max(l,-14)}let jo=[];function mg(i){jo=i}function ks(i,t){let e=-14;for(let n=0;n<jo.length;n++){const s=jo[n],r=i-s.cx,a=t-s.cz,o=s.radius*2.2;if(r*r+a*a>o*o)continue;const l=Nn(s,r,a);l>e&&(e=l)}return e}function gg(i,t,e){return e.set(ks(i-.5,t)-ks(i+.5,t),2*.5,ks(i,t-.5)-ks(i,t+.5)).normalize(),e}function vg(i){let t=1/0,e=-1/0,n=1/0,s=-1/0;for(const g of i)t=Math.min(t,g.cx-g.radius*2.3),e=Math.max(e,g.cx+g.radius*2.3),n=Math.min(n,g.cz-g.radius*2.3),s=Math.max(s,g.cz+g.radius*2.3);const r=Math.max(e-t,s-n),a=(t+e)/2,o=(n+s)/2,l=1024,c=new Uint8Array(l*l*4),h=r/l,d=g=>Math.round(Pe.clamp((g+12)/16,0,1)*255),u=d(-14);for(let g=0;g<l*l;g++)c[g*4]=u,c[g*4+3]=255;const f=a-r/2,m=o-r/2;for(const g of i){const p=g.radius*2.2,M=Math.max(0,Math.floor((g.cx-p-f)/h)),_=Math.min(l-1,Math.ceil((g.cx+p-f)/h)),x=Math.max(0,Math.floor((g.cz-p-m)/h)),L=Math.min(l-1,Math.ceil((g.cz+p-m)/h));for(let A=x;A<=L;A++)for(let C=M;C<=_;C++){const R=f+(C+.5)*h,S=m+(A+.5)*h,y=Nn(g,R-g.cx,S-g.cz),I=(A*l+C)*4,U=d(y);U>c[I]&&(c[I]=U)}}const v=new zc(c,l,l,tn);return v.magFilter=Be,v.minFilter=Be,v.wrapS=v.wrapT=Vn,v.needsUpdate=!0,{texture:v,bounds:new ne(f,m,r,r)}}class Os extends Tt{constructor(){const t=Os.SkyShader,e=new bn({name:t.name,uniforms:uo.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:Fe,depthWrite:!1});super(new Te(1,1,1),e),this.isSky=!0}}Os.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new E},up:{value:new E(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function Fn(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new fe;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=wh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][u]);const m=wh(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function wh(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new Ee(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/e;for(let u=0,f=h.count;u<f;u++)for(let m=0;m<e;m++){const v=h.getComponent(u,m);o.setComponent(u+d,m,v)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}function xg(){const i=document.createElement("canvas");i.width=256,i.height=256;const t=i.getContext("2d"),e=t.createRadialGradient(128,128,4,128,128,128);e.addColorStop(0,"rgba(255, 252, 235, 1.0)"),e.addColorStop(.14,"rgba(255, 230, 165, 0.85)"),e.addColorStop(.38,"rgba(255, 180, 95, 0.28)"),e.addColorStop(.7,"rgba(255, 140, 60, 0.06)"),e.addColorStop(1,"rgba(255, 120, 40, 0.0)"),t.fillStyle=e,t.fillRect(0,0,256,256);const n=new Po(i);return n.colorSpace=ke,n}class _g{constructor(t,e){this.renderer=t,this.scene=e,this.sunElevation=16.5,this.sunAzimuth=212,this.sunDir=new E,this.sunColor=new zt(1,.91,.76),this.sky=new Os,this.sky.scale.setScalar(9e3);const n=this.sky.material.uniforms;n.turbidity.value=3.8,n.rayleigh.value=1.55,n.mieCoefficient.value=.0045,n.mieDirectionalG.value=.88,e.add(this.sky),this.sunSprite=new Ao(new wr({map:xg(),color:16771256,transparent:!0,blending:xn,depthWrite:!1,fog:!1})),this.sunSprite.scale.setScalar(620),e.add(this.sunSprite),this.sun=new sg(this.sunColor,4.1),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1536,1536);const s=this.sun.shadow.camera;s.left=-46,s.right=46,s.top=46,s.bottom=-46,s.near=10,s.far=320,this.sun.shadow.bias=-35e-5,this.sun.shadow.normalBias=.03,e.add(this.sun),e.add(this.sun.target),this.hemi=new eg(10147071,1988178,.82),e.add(this.hemi),this.fog=new Eo(13228258,.00125),e.fog=this.fog,this.updateSun(),this.bakeEnvironment(),this.buildClouds()}updateSun(){const t=Pe.degToRad(90-this.sunElevation),e=Pe.degToRad(this.sunAzimuth);this.sunDir.setFromSphericalCoords(1,t,e),this.sky.material.uniforms.sunPosition.value.copy(this.sunDir)}setTimePreset(t){const e=this.sky.material.uniforms;t==="noon"?(this.sunElevation=44,this.sunAzimuth=195,this.sunColor.setRGB(1,.98,.92),this.sun.intensity=4.4,this.hemi.color.setHex(12116735),this.hemi.groundColor.setHex(2190184),this.hemi.intensity=.92,this.sunSprite.material.color.setHex(16777215),this.sunSprite.visible=!0,e.turbidity.value=2.8,e.rayleigh.value=1.15):t==="sunset"?(this.sunElevation=5,this.sunAzimuth=245,this.sunColor.setRGB(1,.58,.3),this.sun.intensity=3.4,this.hemi.color.setHex(16756869),this.hemi.groundColor.setHex(2827320),this.hemi.intensity=.62,this.sunSprite.material.color.setHex(16749645),this.sunSprite.visible=!0,e.turbidity.value=8.2,e.rayleigh.value=2.6):t==="night"?(this.sunElevation=-3.5,this.sunAzimuth=240,this.sunColor.setRGB(.38,.54,.86),this.sun.intensity=1.15,this.hemi.color.setHex(2967155),this.hemi.groundColor.setHex(727337),this.hemi.intensity=.42,this.sunSprite.visible=!1,e.turbidity.value=1.8,e.rayleigh.value=.45):(this.sunElevation=16.5,this.sunAzimuth=212,this.sunColor.setRGB(1,.91,.76),this.sun.intensity=4.1,this.hemi.color.setHex(10147071),this.hemi.groundColor.setHex(1988178),this.hemi.intensity=.82,this.sunSprite.material.color.setHex(16771256),this.sunSprite.visible=!0,e.turbidity.value=3.8,e.rayleigh.value=1.55),this.sun.color.copy(this.sunColor),this.updateSun(),this.bakeEnvironment()}bakeEnvironment(){const t=this.renderer;try{const e=new yo(t),n=new Nc,s=new Os;s.scale.setScalar(9e3),s.material.uniforms=uo.clone(this.sky.material.uniforms),n.add(s);const r=e.fromScene(n,0,1,2e4);this.scene.environment=r.texture,this.scene.environmentIntensity=.82,e.dispose()}catch(e){console.warn("PMREM bake skipped:",e)}this.sunElevation<0?this.fog.color.set("#0b172a"):this.sunElevation<8?this.fog.color.set("#d98a6c"):this.sunElevation<25?this.fog.color.set("#cedce6"):this.fog.color.set("#b8d6ec"),this.horizonColor=this.fog.color.clone()}buildClouds(){const t=$o(424242),e=new sn(1,1),n=[];for(let a=0;a<24;a++){const o=t()*Math.PI*2,l=320+t()*820,c=Math.cos(o)*l,h=95+t()*80,d=Math.sin(o)*l,u=1+t()*1.4,f=5+Math.floor(t()*4);for(let m=0;m<f;m++){const v=e.clone(),g=(4+t()*6)*u;v.scale(g,g*(.55+t()*.2),g),v.translate(c+(t()-.5)*24*u,h+t()*3.5*u,d+(t()-.5)*12*u),n.push(v)}}const s=Fn(n);s.computeVertexNormals();const r=new ti({color:16777215,roughness:.95,flatShading:!0,emissive:11058900,emissiveIntensity:.32});this.clouds=new Tt(s,r),this.clouds.frustumCulled=!1,this.scene.add(this.clouds)}update(t,e){const n=this.sunDir,s=92/1536,r=Math.round(e.x/s)*s,a=Math.round(e.z/s)*s;this.sun.target.position.set(r,0,a),this.sun.position.set(r+n.x*160,n.y*160,a+n.z*160),this.sky.position.set(e.x,0,e.z),this.sunSprite.position.set(e.x+n.x*2600,n.y*2600,e.z+n.z*2600),this.clouds.rotation.y+=t*.0025,this.clouds.position.set(e.x,0,e.z)}}const Hr=36;function yg(i=280,t=1500){const e=i+1,n=new Float32Array(e*e*3),s=l=>{const c=Math.abs(l);return Math.sign(l)*t*(.045*c+.255*c*c+.7*c*c*c)};for(let l=0;l<e;l++){const c=l/i*2-1,h=s(c);for(let d=0;d<e;d++){const u=d/i*2-1,f=(l*e+d)*3;n[f]=s(u),n[f+1]=0,n[f+2]=h}}const r=new Uint32Array(i*i*6);let a=0;for(let l=0;l<i;l++)for(let c=0;c<i;c++){const h=l*e+c,d=h+1,u=h+e,f=u+1;r[a++]=h,r[a++]=u,r[a++]=d,r[a++]=d,r[a++]=u,r[a++]=f}const o=new fe;return o.setAttribute("position",new Ee(n,3)),o.setIndex(new Ee(r,1)),o}const Mg=`
  ${dg}
  uniform mat4 uTextureMatrix;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vJacobian;
  varying float vWaveH;
  varying vec4 vReflCoord;

  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    float dist = length(wp.xz - cameraPosition.xz);
    vec3 tangent = vec3(1.0, 0.0, 0.0);
    vec3 binormal = vec3(0.0, 0.0, 1.0);
    float jxx = 0.0, jzz = 0.0, jxz = 0.0;
    vec3 disp = gerstner(wp.xz, dist, tangent, binormal, jxx, jzz, jxz);
    vec3 pos = wp.xyz + disp;
    vNormal = normalize(cross(binormal, tangent));
    vJacobian = (1.0 - jxx) * (1.0 - jzz) - jxz * jxz;
    vWaveH = disp.y;
    vWorldPos = pos;
    vReflCoord = uTextureMatrix * vec4(pos.x, 0.0, pos.z, 1.0);
    gl_Position = projectionMatrix * viewMatrix * vec4(pos, 1.0);
  }
`,bg=`
  uniform float uTime;
  uniform sampler2D tReflection;
  uniform sampler2D uDepthMap;
  uniform vec4 uDepthBounds;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  uniform vec4 uWake[${Hr}];
  uniform int uWakeCount;
  uniform vec3 uWakeBounds;
  uniform float uFoamIntensity;

  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vJacobian;
  varying float vWaveH;
  varying vec4 vReflCoord;

  // Fast hash-free value noise using dot-fract
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm3(vec2 p) {
    float s = 0.0, a = 0.54;
    for (int i = 0; i < 3; i++) {
      s += vnoise(p) * a;
      p = p * 2.12 + vec2(1.7, 9.2);
      a *= 0.48;
    }
    return s;
  }

  // Precomputed 10-cascade high-resolution capillary & chop normal gradient
  // Avoids per-pixel trig/sqrt calls on wave constants while adding fine micro-ripples
  vec2 highResRippleGrad(vec2 p, float t, float closeMask) {
    vec2 g = vec2(0.0);
    // Medium chop waves (always active out to 340m)
    g += vec2( 0.764,  0.644) * (0.115 * cos(dot(vec2( 1.38,  1.16), p) - 4.20 * t));
    g += vec2(-0.839,  0.544) * (0.105 * cos(dot(vec2(-2.05,  1.33), p) - 4.90 * t + 1.3));
    g += vec2( 0.198, -0.980) * (0.095 * cos(dot(vec2( 0.66, -3.28), p) - 5.72 * t + 2.6));
    g += vec2( 0.653,  0.757) * (0.088 * cos(dot(vec2( 2.95,  3.42), p) - 6.65 * t + 3.9));
    g += vec2(-0.951, -0.309) * (0.080 * cos(dot(vec2(-5.80, -1.88), p) - 7.73 * t + 5.2));
    g += vec2( 0.891, -0.454) * (0.072 * cos(dot(vec2( 7.30, -3.72), p) - 8.98 * t + 6.5));

    // Ultra-crisp close-range capillary ripples (within 110m of camera)
    if (closeMask > 0.01) {
      vec2 gc = vec2(0.0);
      gc += vec2(-0.258,  0.966) * (0.068 * cos(dot(vec2(-2.85, 10.65), p) - 10.4 * t + 1.1));
      gc += vec2(-0.588, -0.809) * (0.060 * cos(dot(vec2(-8.80,-12.10), p) - 12.1 * t + 2.7));
      gc += vec2( 0.985,  0.174) * (0.052 * cos(dot(vec2(19.70,  3.48), p) - 14.0 * t + 4.3));
      gc += vec2(-0.707,  0.707) * (0.045 * cos(dot(vec2(-18.4,  18.4), p) - 16.0 * t + 5.9));
      g += gc * closeMask;
    }
    return g;
  }

  float segDist(vec2 p, vec2 a, vec2 b, out float h) {
    vec2 pa = p - a, ba = b - a;
    h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-4), 0.0, 1.0);
    return length(pa - ba * h);
  }

  void main() {
    vec3 toCam = cameraPosition - vWorldPos;
    float dist = length(toCam);
    vec3 V = toCam / dist;
    vec3 L = normalize(uSunDir);

    // ── 1. High-Resolution Multi-Scale Surface Normal ──
    float midFade = 1.0 - smoothstep(45.0, 360.0, dist);
    float closeFade = 1.0 - smoothstep(15.0, 115.0, dist);
    vec2 rg = highResRippleGrad(vWorldPos.xz, uTime, closeFade) * midFade;
    vec3 N = normalize(vNormal + vec3(-rg.x, 0.0, -rg.y));

    // ── 2. Depth from Archipelago Depth Map ──
    vec2 duv = (vWorldPos.xz - uDepthBounds.xy) / uDepthBounds.zw;
    float terrainH = -14.0;
    if (duv.x > 0.0 && duv.x < 1.0 && duv.y > 0.0 && duv.y < 1.0) {
      terrainH = texture2D(uDepthMap, duv).r * 16.0 - 12.0;
    }
    float depth = max(vWorldPos.y - terrainH, 0.0);

    // ── 3. Planar Reflection with Distance-Stabilized Distortion ──
    vec2 ruv = vReflCoord.xy / vReflCoord.w;
    float distort = 0.042 * (1.0 - smoothstep(12.0, 380.0, dist)) + 0.007;
    ruv = clamp(ruv + N.xz * distort, 0.002, 0.998);
    vec3 refl = texture2D(tReflection, ruv).rgb;

    // ── 4. Rich Water Body & Emerald Subsurface Scattering ──
    float NdotV = max(dot(N, V), 0.001);
    // Schlick Fresnel with realistic water IOR (1.333 -> F0 = 0.02)
    float fresnel = 0.02 + 0.98 * pow(1.0 - NdotV, 5.0);
    fresnel = clamp(fresnel * 0.92, 0.0, 0.94);

    vec3 abyssCol   = vec3(0.003, 0.026, 0.058);
    vec3 deepCol    = vec3(0.006, 0.088, 0.135);
    vec3 shallowCol = vec3(0.025, 0.380, 0.375);
    vec3 reefSand   = vec3(0.620, 0.520, 0.330);

    float shallowFactor = exp(-depth * 0.26);
    vec3 body = mix(abyssCol, deepCol, smoothstep(-1.1, 1.4, vWaveH));
    body = mix(body, shallowCol, shallowFactor);
    body = mix(body, reefSand * 0.82, exp(-depth * 1.45) * 0.68);

    // Backlit wave-crest Subsurface Scattering (SSS)
    vec3 Lh = normalize(vec3(L.x, 0.0, L.z));
    float crestHeightMask = smoothstep(-0.3, 1.45, vWaveH);
    float backLight = pow(clamp(dot(V, -Lh), 0.0, 1.0), 2.5);
    float grazeLight = pow(clamp(1.0 - NdotV, 0.0, 1.0), 2.2) * max(0.0, L.y + 0.15);
    float sss = (backLight * 1.35 + grazeLight * 0.55) * crestHeightMask;
    body += vec3(0.03, 0.34, 0.28) * sss * uSunColor;

    // Sun diffuse wrap lighting on wave slopes
    float sunWrap = clamp((dot(N, L) + 0.35) / 1.35, 0.0, 1.0);
    body *= (0.42 + 0.68 * sunWrap) * (0.55 + 0.45 * uSunColor);

    vec3 col = mix(body, refl, fresnel);

    // ── 5. Triple-Lobe Sun Glints & Shimmering Sun Path ──
    vec3 H = normalize(L + V);
    float NdotH = max(dot(N, H), 0.0);
    float sunVis = smoothstep(-0.02, 0.09, L.y);
    // Broad golden sun path + medium wave sheen + razor-sharp diamond glints
    float specBroad   = pow(NdotH, 38.0)   * 0.22;
    float specMedium  = pow(NdotH, 260.0)  * 1.65;
    float specDiamond = pow(NdotH, 1800.0) * 42.0;
    vec3 sunGlint = uSunColor * (specBroad + specMedium + specDiamond) * sunVis;
    col += sunGlint;

    // ── 6. Crest, Shoreline & Wake Foam (Lazy-Evaluated FBM for Speed!) ──
    float crest = smoothstep(0.76, 0.36, vJacobian) * uFoamIntensity;

    float shore = 0.0;
    if (depth < 4.6) {
      shore = smoothstep(1.65, 0.05, depth) * 0.88;
      float band = abs(fract(depth * 0.45 - uTime * 0.22) - 0.5);
      shore += smoothstep(0.12, 0.0, band) * smoothstep(4.5, 0.6, depth) * 0.72;
    }

    float wake = 0.0;
    if (uWakeCount > 1 && distance(vWorldPos.xz, uWakeBounds.xy) < uWakeBounds.z) {
      for (int i = 0; i < ${Hr-1}; i++) {
        if (i >= uWakeCount - 1) break;
        vec4 a = uWake[i];
        vec4 b = uWake[i + 1];
        float h;
        float d = segDist(vWorldPos.xz, a.xy, b.xy, h);
        float age = mix(a.z, b.z, h);
        float strength = mix(a.w, b.w, h);
        float life = 1.0 - clamp(age / 9.5, 0.0, 1.0);
        if (life <= 0.0) continue;
        float w = 0.8 + age * 1.15;
        float edgeW = 0.45 + age * 0.22;
        float t1 = (d - w) / edgeW;
        float t2 = d / (0.9 + age * 0.35);
        float edge = exp(-t1 * t1);
        float centre = exp(-t2 * t2) * (1.0 - clamp(age / 4.0, 0.0, 1.0));
        wake = max(wake, (edge * 0.78 + centre * 1.1) * life * life * strength);
      }
    }

    float foamAmt = max(max(crest, shore), wake);
    // Only sample procedural FBM noise on pixels that actually have foam!
    if (foamAmt > 0.02) {
      float pat1 = fbm3(vWorldPos.xz * 0.62 + vec2(uTime * 0.11, -uTime * 0.07));
      float pat2 = vnoise(vWorldPos.xz * 2.4 - vec2(uTime * 0.18, uTime * 0.05));
      float foamPat = pat1 * 0.7 + pat2 * 0.3;
      float foam = clamp(foamAmt * 1.55 - (1.0 - foamPat) * 1.02, 0.0, 1.0);
      foam = smoothstep(0.0, 0.58, foam);
      vec3 foamCol = vec3(0.95, 0.97, 0.99) * (0.58 + 0.42 * max(dot(N, L), 0.0)) * (0.55 + 0.55 * uSunColor);
      col = mix(col, foamCol, foam * 0.92);
    }

    // ── 7. Aerial Perspective / Horizon Fog ──
    float fogF = 1.0 - exp(-uFogDensity * uFogDensity * dist * dist);
    col = mix(col, uFogColor, clamp(fogF, 0.0, 1.0));

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;class Sg{constructor(t,e,n,s){this.renderer=t,this.scene=e,this.camera=n;const r=new et;t.getDrawingBufferSize(r),this.reflScale=.38,this.reflectionTarget=new Xn(Math.max(1,Math.round(r.x*this.reflScale)),Math.max(1,Math.round(r.y*this.reflScale)),{type:Ii,minFilter:Be,magFilter:Be,depthBuffer:!0}),this.mirrorCamera=new Ge,this.textureMatrix=new Zt,this.wakeData=Array.from({length:Hr},()=>new ne),this.uniforms={uTime:{value:0},uWaves:{value:yh().map(a=>new ne(...a))},uTextureMatrix:{value:this.textureMatrix},tReflection:{value:this.reflectionTarget.texture},uDepthMap:{value:s.texture},uDepthBounds:{value:s.bounds},uSunDir:{value:new E(0,1,0)},uSunColor:{value:new zt(1,.95,.85)},uFogColor:{value:new zt},uFogDensity:{value:.0012},uWake:{value:this.wakeData},uWakeCount:{value:0},uWakeBounds:{value:new E},uFoamIntensity:{value:1}},this.material=new bn({vertexShader:Mg,fragmentShader:bg,uniforms:this.uniforms}),this.mesh=new Tt(yg(),this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-1,e.add(this.mesh)}setSize(t,e){const n=this.renderer.getPixelRatio();this.reflectionTarget.setSize(Math.max(1,Math.round(t*n*this.reflScale)),Math.max(1,Math.round(e*n*this.reflScale)))}refreshWaves(){yh().forEach((e,n)=>this.uniforms.uWaves.value[n].set(...e))}setWake(t){const e=Math.min(t.length,Hr);let n=0,s=0;for(let r=0;r<e;r++){const a=t[r];this.wakeData[r].set(a.x,a.z,a.age,a.strength),n+=a.x,s+=a.z}if(this.uniforms.uWakeCount.value=e,e>0){n/=e,s/=e;let r=0;for(let a=0;a<e;a++){const o=t[a];r=Math.max(r,Math.hypot(o.x-n,o.z-s)+2+o.age*1.6)}this.uniforms.uWakeBounds.value.set(n,s,r)}}update(t,e,n,s){this.uniforms.uTime.value=t,this.uniforms.uSunDir.value.copy(e),this.uniforms.uSunColor.value.copy(n),s&&(this.uniforms.uFogColor.value.copy(s.color),this.uniforms.uFogDensity.value=s.density);const r=.5;this.mesh.position.set(Math.round(this.camera.position.x/r)*r,0,Math.round(this.camera.position.z/r)*r)}renderReflection(t=[]){const e=this.camera,n=this.mirrorCamera;e.updateMatrixWorld();const s=new E(0,1,0),r=new E().setFromMatrixPosition(e.matrixWorld);r.y<.05&&(r.y=.05);const a=r.clone();a.y=-a.y;const o=new Zt().extractRotation(e.matrixWorld),c=new E(0,0,-1).applyMatrix4(o).add(r).clone();c.y=-c.y,n.position.copy(a),n.up.set(0,1,0).applyMatrix4(o).reflect(s),n.lookAt(c),n.far=900,n.near=e.near,n.updateMatrixWorld(),n.projectionMatrix.copy(e.projectionMatrix),this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(n.projectionMatrix),this.textureMatrix.multiply(n.matrixWorldInverse);const h=new Qn().setFromNormalAndCoplanarPoint(s,new E(0,-.6,0));h.applyMatrix4(n.matrixWorldInverse);const d=new ne(h.normal.x,h.normal.y,h.normal.z,h.constant),u=n.projectionMatrix,f=new ne((Math.sign(d.x)+u.elements[8])/u.elements[0],(Math.sign(d.y)+u.elements[9])/u.elements[5],-1,(1+u.elements[10])/u.elements[14]);d.multiplyScalar(2/d.dot(f)),u.elements[2]=d.x,u.elements[6]=d.y,u.elements[10]=d.z+1,u.elements[14]=d.w;const m=this.renderer,v=m.getRenderTarget(),g=m.shadowMap.autoUpdate;m.shadowMap.autoUpdate=!1,this.mesh.visible=!1;const p=t.map(M=>M.visible);t.forEach(M=>M.visible=!1),m.setRenderTarget(this.reflectionTarget),m.clear(),m.render(this.scene,n),m.setRenderTarget(v),t.forEach((M,_)=>M.visible=p[_]),this.mesh.visible=!0,m.shadowMap.autoUpdate=g}}const Jo=new Map;function Y(i,t={}){const e=i+JSON.stringify(t);return Jo.has(e)||Jo.set(e,new ti({color:i,roughness:.75,metalness:0,flatShading:!0,...t})),Jo.get(e)}function xe(i,t=2.5,e={}){return Y(i,{emissive:i,emissiveIntensity:t,roughness:.4,...e})}function Qt(i,t,e,n=0,s=0,r=0){const a=new Tt(t,e);return a.position.set(n,s,r),i.add(a),a}const dt=(i,t,e,n,s,r,a,o)=>Qt(i,new Te(t,e,n),s,r,a,o),_e=(i,t,e,n,s,r,a,o,l)=>Qt(i,new ie(t,e,n,s),r,a,o,l),be=(i,t,e,n,s,r,a=1)=>Qt(i,new sn(t,a),e,n,s,r);function Si(i,t,e,n,s){const r=new E().subVectors(e,t),a=r.length(),o=Qt(i,new ie(n,n,a,6),s);return o.position.copy(t).addScaledVector(r,.5),o.quaternion.setFromUnitVectors(new E(0,1,0),r.normalize()),o}function Eh(i,t,e,n,s,r,a,o){const l=new th;l.moveTo(-t/2,0),l.lineTo(t/2,0),l.lineTo(0,e),l.lineTo(-t/2,0);const c=new Go(l,{depth:n,bevelEnabled:!1});return c.translate(0,0,-n/2),Qt(i,c,s,r,a,o)}function wg(i,t,e,n=0,s="#f4efe6",r="#c0533a",a=4,o=3.5,l=2.6){const c=new At;return dt(c,a,l,o,Y(s),0,l/2,0),Eh(c,a+.5,1.6,o+.5,Y(r),0,l,0).rotation.y=0,dt(c,.9,1.6,.1,Y("#6d4c41"),0,.8,o/2+.02),dt(c,.8,.7,.1,Y("#9ad1ff",{emissive:"#ffd59a",emissiveIntensity:.25,roughness:.2}),-a/3,1.6,o/2+.02),dt(c,.8,.7,.1,Y("#9ad1ff",{emissive:"#ffd59a",emissiveIntensity:.25,roughness:.2}),a/3,1.6,o/2+.02),c.position.set(t,0,e),c.rotation.y=n,i.add(c),c}function Vr(i,t,e){const n=document.createElement("canvas");n.width=i,n.height=t;const s=n.getContext("2d");e(s,i,t);const r=new Po(n);return r.colorSpace=ke,r.anisotropy=4,{texture:r,ctx:s,canvas:n}}function Eg(i,t){const{texture:e}=Vr(128,128,s=>{s.fillStyle=t,s.beginPath(),s.arc(64,58,50,0,Math.PI*2),s.fill(),s.beginPath(),s.moveTo(40,98),s.lineTo(30,124),s.lineTo(64,104),s.fill(),s.font='62px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif',s.textAlign="center",s.textBaseline="middle",s.fillText(i,64,62)});return new Ao(new wr({map:e,transparent:!0,depthWrite:!1}))}const Th={lighthouse(){const i=new At,t=Y("#d64541"),e=Y("#f7f4ee");_e(i,3.4,4.2,1.2,9,Y("#8b8680"),0,.6,0);let n=1.2;const s=6,r=2.2;for(let f=0;f<s;f++){const m=2.6-f*.22,v=2.6-(f+1)*.22;_e(i,v,m,r,12,f%2?t:e,0,n+r/2,0),n+=r}_e(i,2.3,2.3,.35,14,Y("#3a3a3a"),0,n+.17,0);const a=Qt(i,new rn(2.15,.06,4,20),Y("#2b2b2b"),0,n+1,0);a.rotation.x=Math.PI/2,_e(i,1.15,1.15,1.8,10,xe("#fff2b0",4,{transparent:!0,opacity:.95}),0,n+1.25,0),Qt(i,new $e(1.6,1.6,10),t,0,n+2.95,0),be(i,.25,Y("#2b2b2b"),0,n+3.85,0);const o=n+1.25,l=new At;l.position.y=o;const c=new Mn({color:"#fff3c4",transparent:!0,opacity:.16,blending:xn,depthWrite:!1,side:ve,fog:!1});for(const f of[1,-1]){const m=new Tt(new $e(4.5,40,20,1,!0),c);m.rotation.z=f*Math.PI/2,m.position.x=-f*20,l.add(m)}i.add(l);const h=new Xo("#ffd98a",60,60,1.6);h.position.y=o,i.add(h),wg(i,6.5,2.5,-.4,"#f4efe6","#3d6a8f",5,4,2.8);const d=new At;dt(d,.35,3,.35,Y("#37474f",{metalness:.6,roughness:.4}),0,1.5,0),dt(d,2.2,.3,.35,Y("#37474f",{metalness:.6,roughness:.4}),0,2.6,0);const u=Qt(d,new rn(1.2,.17,6,16,Math.PI),Y("#37474f",{metalness:.6,roughness:.4}),0,1.2,0);return u.rotation.z=Math.PI,Qt(d,new rn(.4,.1,6,12),Y("#37474f",{metalness:.6,roughness:.4}),0,3.3,0),d.position.set(-5.5,0,4),d.rotation.y=.5,i.add(d),{group:i,height:n+5,update(f){l.rotation.y=f*.9}}},port(){const i=new At;dt(i,30,5,22,Y("#9aa0a6",{roughness:.95}),0,-1.9,0);for(let g=-2;g<=2;g++)dt(i,.25,.02,20,Y("#f5d547"),g*5.5,.61,0);const t=["#c0392b","#2471a3","#1e8449","#f39c12","#7d3c98","#117a65","#d35400","#eaecee","#1b4f72"],e=new Te(4.6,1.9,1.95),n=64,s=new Vc(e,Y("#ffffff",{roughness:.6}),n),r=new Zt,a=new zt;let o=0,l=7;const c=()=>(l=l*16807%2147483647)/2147483647;for(let g=0;g<4&&o<n;g++)for(let p=0;p<4&&o<n;p++){const M=1+Math.floor(c()*4);for(let _=0;_<M&&o<n;_++)r.makeTranslation(-11+p*5.2,.6+.95+_*1.92,-8+g*2.1),s.setMatrixAt(o,r),s.setColorAt(o,a.set(t[Math.floor(c()*t.length)])),o++}s.count=o,i.add(s);const h=Y("#1f5fa8",{roughness:.55}),d=Y("#f2f2f2"),u=[];for(const g of[6,12.5]){const p=new At;for(const L of[-1.8,1.8])for(const A of[-3,3])dt(p,.5,12,.5,h,L,6,A);dt(p,4.2,.6,.6,h,0,12,-3),dt(p,4.2,.6,.6,h,0,12,3),dt(p,.6,.6,6.5,h,-1.8,4.5,0),dt(p,.6,.6,6.5,h,1.8,4.5,0),dt(p,.8,.8,26,d,-1.2,13.2,8),dt(p,.8,.8,26,d,1.2,13.2,8),dt(p,3,2,3,Y("#e8e8e8"),0,14.5,-4),Si(p,new E(0,17,-2),new E(0,13.4,20),.08,Y("#333")),Si(p,new E(0,17,-2),new E(0,13.4,-9),.08,Y("#333")),dt(p,.6,4,.6,h,0,15,-2);const M=new At;dt(M,2.8,.6,1.6,Y("#ffcc00"),0,12.6,0);const _=dt(M,.06,1,.06,Y("#222"),0,0,0),x=new At;dt(x,4.7,.3,2.1,Y("#ffcc00"),0,0,0),dt(x,4.6,1.9,1.95,Y(t[u.length*3+1]),0,-1.1,0),M.add(x),p.add(M),p.position.set(g,.6,5),i.add(p),u.push({trolley:M,spreader:x,cable:_,phase:u.length*2.4})}const f=new At;_e(f,.12,.15,7,6,Y("#555"),0,3.5,0),dt(f,.8,.5,1.2,Y("#222"),0,7.1,.2),_e(f,.22,.22,.3,10,xe("#3cff8a",3),0,7.1,.9).rotation.x=Math.PI/2;const m=new Tt(new $e(4,9,4,1,!0),new Mn({color:"#3cff8a",transparent:!0,opacity:.1,side:ve,depthWrite:!1,blending:xn}));m.position.set(0,7.1,5.4),m.rotation.x=-Math.PI/2-.5;const v=new At;return v.position.y=0,v.add(m),f.add(v),f.position.set(-13,.6,9),i.add(f),{group:i,height:19,update(g){for(const p of u){const M=g*.35+p.phase;p.trolley.position.z=8+Math.sin(M)*9;const _=3+(Math.sin(M*2)*.5+.5)*6;p.spreader.position.y=12.3-_,p.cable.scale.y=_,p.cable.position.y=12.3-_/2}v.rotation.y=Math.sin(g*.6)*.6-.9}}},powerplant(){const i=new At;dt(i,22,5,18,Y("#a7a9a3",{roughness:.95}),0,-2.1,0),dt(i,9,5,6,Y("#e6e2d8"),-3,2.9,-2),dt(i,9.2,.6,6.2,Y("#2e7d32"),-3,5.6,-2);for(let l=0;l<5;l++)dt(i,1,1.2,.1,Y("#5aa9e6",{roughness:.2,emissive:"#ffd9a0",emissiveIntensity:.15}),-6.5+l*1.8,3.3,1.02);for(const[l,c]of[[-5.5,-4],[-2.5,-4]])for(let h=0;h<4;h++)_e(i,.55,.62,3,10,Y(h%2?"#d64541":"#f5f5f5"),l,6+h*3-1.5+1.5,c);const t=[];for(let l=0;l<=12;l++){const c=l/12*11,h=3+Math.pow((c-7.5)/7.5,2)*2.2;t.push(new et(h,c))}Qt(i,new ko(t,20),Y("#cfcac0",{side:ve}),6,.4,-2);const e=[],n=new ti({color:"#ffffff",roughness:1,transparent:!0,opacity:.6,flatShading:!0,depthWrite:!1});for(let l=0;l<10;l++){const c=be(i,1,n.clone(),6,12,-2,1);e.push({mesh:c,phase:l/10})}const s=Y("#6b6f73",{metalness:.5,roughness:.5}),r=[];for(const[l,c]of[[-8,6],[3,7]]){const h=new At;for(const d of[-1,1])for(const u of[-1,1])Si(h,new E(d*1.3,0,u*1.3),new E(d*.3,10,u*.3),.08,s);dt(h,5,.25,.25,s,0,8,0),dt(h,3.6,.25,.25,s,0,9.6,0),Qt(h,new $e(.5,1.4,4),s,0,10.6,0),h.position.set(l,.4,c),i.add(h),r.push(new E(l,8.4,c))}for(const l of[-2.3,2.3]){const c=r[0].clone().add(new E(l,0,0)),h=r[1].clone().add(new E(l,0,0)),d=c.clone().lerp(h,.5);d.y-=1.3;const u=new Fo(c,d,h);Qt(i,new Mi(u,16,.04,4),Y("#222"))}const a=new At,o=Y("#ffffff",{emissive:"#bfe3ff",emissiveIntensity:.4});be(a,1.4,o,0,0,0),be(a,1.1,o,1.4,-.2,0),be(a,1,o,-1.4,-.3,0),be(a,.9,o,.6,.7,.3);for(let l=0;l<3;l++)dt(a,.9,.18,.6,xe("#4cc9f0",2.5),-.9+l*.9,-1.6,0);return a.position.set(-3,9.5,-2),i.add(a),{group:i,height:17,update(l){for(const c of e){const h=(l*.12+c.phase)%1;c.mesh.position.set(6+Math.sin(h*6+c.phase*9)*.8+h*4,11.6+h*10,-2+h*2);const d=1.6+h*3.2;c.mesh.scale.setScalar(d),c.mesh.material.opacity=.55*(1-h)*Math.min(1,h*8)}a.position.y=9.5+Math.sin(l*1.2)*.4,a.rotation.y=Math.sin(l*.3)*.3}}},windfarm(){const i=new At,t=[],e=Y("#f4f6f7",{roughness:.4});for(const[d,u,f]of[[-6,-6,1],[6,-8,.9],[9,4,1.05]]){const m=new At;_e(m,.28,.6,18,10,e,0,9,0),dt(m,1,1,2.6,e,0,18.2,-.3);const v=new At;be(v,.55,e,0,0,0);for(let g=0;g<3;g++){const p=new Tt(new Te(.7,8.5,.18),e);p.geometry.translate(0,4.4,0);const M=p.geometry.attributes.position;for(let _=0;_<M.count;_++)M.getY(_)>4&&M.setX(_,M.getX(_)*.45);p.rotation.z=g*Math.PI*2/3,v.add(p)}v.position.set(0,18.2,1.1),m.add(v),be(m,.15,xe("#ff3b3b",3),0,18.8,-1.2,0),m.position.set(d,0,u),m.scale.setScalar(f),m.rotation.y=.5,i.add(m),t.push({rotor:v,speed:1.2+Math.random()*.5})}dt(i,7,3.4,4.5,Y("#ecf0f1"),-4,1.7,5),dt(i,7.4,.4,4.9,Y("#34495e"),-4,3.6,5);const n=Vr(512,256,()=>{}),s=Qt(i,new pn(6,3),new Mn({map:n.texture,toneMapped:!1}),-4,6,7.3);s.rotation.y=0,dt(i,6.4,3.4,.2,Y("#2c3e50"),-4,6,7.18),_e(i,.12,.12,2.4,6,Y("#2c3e50"),-4,4.2,7.1);const r=new Lr([new E(-6,1,-6),new E(-1,2.5,-3),new E(6,1.5,-8),new E(9,1,4),new E(2,2.5,6),new E(-4,3.6,5)]);Qt(i,new Mi(r,60,.06,4),Y("#1b2631"));const a=[],o=xe("#4cc9f0",4);for(let d=0;d<18;d++)a.push({m:be(i,.18,o,0,0,0,0),o:d/18});const l=n.ctx;let c=-1;const h=d=>{l.fillStyle="#071521",l.fillRect(0,0,512,256),l.strokeStyle="rgba(76,201,240,0.15)",l.lineWidth=1;for(let v=0;v<8;v++)l.beginPath(),l.moveTo(0,v*32),l.lineTo(512,v*32),l.stroke();l.fillStyle="#4cc9f0",l.font="bold 22px Inter, sans-serif",l.fillText("GRID LOAD · FORECAST",16,30),l.fillStyle="#8be9a0",l.font="16px Inter, sans-serif",l.fillText("10k+ events/min  ·  MLflow ✓",16,54);const u=v=>140+Math.sin(v*.035+d)*40+Math.sin(v*.11+d*1.7)*14;l.lineWidth=3,l.strokeStyle="#ffffff",l.beginPath();for(let v=0;v<=330;v+=6)l.lineTo(v+10,u(v)+50);l.stroke(),l.setLineDash([8,6]),l.strokeStyle="#ffd166",l.beginPath();for(let v=330;v<=500;v+=6)l.lineTo(v+10,u(v)+50);l.stroke(),l.setLineDash([]);const f=220,m=u(f)+50;l.fillStyle="#ff6b6b",l.beginPath(),l.arc(f+10,m,7,0,Math.PI*2),l.fill(),n.texture.needsUpdate=!0};return{group:i,height:24,update(d){for(const f of t)f.rotor.rotation.z=-d*f.speed;for(const f of a)f.m.position.copy(r.getPointAt((d*.08+f.o)%1));const u=Math.floor(d*10);u!==c&&(c=u,h(d*.8))}}},recycling(){const i=new At;dt(i,18,5,14,Y("#b0b5ad"),0,-2.15,0);const t=[["#2e7d32",-5],["#1565c0",0],["#f9a825",5]];for(const[a,o]of t){const l=new At,c=Qt(l,new ie(1.6,1.3,3.6,4),Y(a),0,1.8,0);c.rotation.y=Math.PI/4;const h=Qt(l,new ie(1.75,1.75,.35,4),Y(a,{roughness:.5}),0,3.75,0);h.rotation.y=Math.PI/4,dt(l,1.2,.2,.4,Y("#222"),0,3.9,0),l.position.set(o,.35,-4),i.add(l)}dt(i,13,.4,2,Y("#2b2b2b"),0,1.6,2.5);for(let a=-6;a<=6;a+=2)dt(i,.3,1.4,.3,Y("#666"),a,.9,1.7),dt(i,.3,1.4,.3,Y("#666"),a,.9,3.3);dt(i,.4,4,.4,Y("#37474f"),0,2.2,1.1),dt(i,.4,4,.4,Y("#37474f"),0,2.2,3.9),dt(i,.6,.6,3.4,Y("#37474f"),0,4.2,2.5);const e=Qt(i,new pn(2.6,2.4),new Mn({color:"#00ffa3",transparent:!0,opacity:.25,side:ve,blending:xn,depthWrite:!1}),0,2.9,2.5);e.rotation.y=Math.PI/2,dt(i,.3,.3,.3,xe("#00ffa3",4),0,3.85,2.5);const n=["#2e7d32","#1565c0","#f9a825"],s=[];for(let a=0;a<7;a++){const o=a%3,l=o===0?new ie(.3,.3,.8,8):o===1?new Te(.7,.5,.6):new sn(.38,0);s.push({m:Qt(i,l,Y(n[o])),o:a/7,type:o})}const r=Vr(256,256,a=>{a.fillStyle="#2e7d32",a.beginPath(),a.arc(128,128,120,0,Math.PI*2),a.fill(),a.fillStyle="#fff",a.font='170px "Segoe UI Symbol", sans-serif',a.textAlign="center",a.textBaseline="middle",a.fillText("♻",128,138)});return Qt(i,new Rs(1.6,24),new ti({map:r.texture,transparent:!0,side:ve}),-7.5,5.5,-1),_e(i,.1,.1,4,6,Y("#555"),-7.5,2.2,-1.05),{group:i,height:10,update(a){e.material.opacity=.18+Math.sin(a*8)*.08;for(const o of s){const c=-6.2+(a*.09+o.o)%1*12.4;o.m.position.set(c,2.15,2.5),o.m.rotation.y=a+o.o*5;const h=c>0;o.m.material=h?Y(n[o.type],{emissive:n[o.type],emissiveIntensity:.6}):Y("#9e9e9e")}}}},crystal(){const i=new At;for(let a=0;a<8;a++){const o=a/8*Math.PI*2,l=dt(i,1,3.5+a%3*.6,.7,Y("#5d6d7e"),Math.cos(o)*7,1.8,Math.sin(o)*7);l.rotation.y=-o,dt(i,.12,2,.75,xe("#b388ff",2.2),Math.cos(o)*6.95,2,Math.sin(o)*6.95).rotation.y=-o}_e(i,3,3.4,.6,8,Y("#4a5568"),0,.3,0);const t=new At;t.position.y=7;const e=new Tt(new Ns(2,0),new tg({color:"#c8a8ff",emissive:"#7b2ff7",emissiveIntensity:1.4,roughness:.1,metalness:.1,flatShading:!0,transmission:0,clearcoat:1}));e.scale.y=1.5,t.add(e);const n=new Tt(new Ns(.9,0),xe("#4cc9f0",5));t.add(n);const s=[];for(let a=0;a<3;a++){const o=new At,l=new Tt(new rn(4+a*.6,.05,6,64),xe(a===1?"#4cc9f0":"#b388ff",3));o.add(l),be(o,.28,xe("#ffffff",4),4+a*.6,0,0,1),o.rotation.set(Math.PI/2+a*.7,a*1.1,0),t.add(o),s.push(o)}i.add(t);const r=new Xo("#a06bff",40,30,1.5);return r.position.y=7,i.add(r),{group:i,height:14,update(a){e.rotation.y=a*.5,n.rotation.y=-a*1.2,n.rotation.x=a*.7,t.position.y=7+Math.sin(a*1.3)*.5,s.forEach((o,l)=>{o.children[0].rotation.z=0,o.rotation.z=a*(.6+l*.35)}),r.intensity=35+Math.sin(a*3)*10}}},observatory(){const i=new At;_e(i,4,4.4,4,16,Y("#eceff1"),0,2,0),Qt(i,new yi(4.1,20,10,0,Math.PI*2,0,Math.PI/2),Y("#cfd8dc",{metalness:.5,roughness:.35}),0,4,0),dt(i,1.2,3.5,8.4,Y("#263238"),0,6,0).rotation.z=0;const t=new At,e=new At;dt(e,1.2,.3,1.2,Y("#ff6b6b"),0,0,0);for(const[h,d]of[[-.9,-.9],[.9,-.9],[-.9,.9],[.9,.9]])_e(e,.5,.5,.05,12,Y("#ddd",{transparent:!0,opacity:.6}),h,.2,d);t.add(e),i.add(t);const n=[];for(const h of[-1,1]){const d=new At;_e(d,.15,.2,5,6,Y("#455a64"),0,2.5,0);const u=new At;dt(u,.9,.7,1.3,Y("#212121"),0,0,0),_e(u,.3,.3,.4,12,xe("#4cc9f0",3),0,0,-.8).rotation.x=Math.PI/2,u.position.y=5.3,d.add(u),d.position.set(h*8,0,4),i.add(d);const f=new Mn({color:"#ff3b6b",transparent:!0,opacity:.8,blending:xn,depthWrite:!1}),m=new Tt(new ie(.04,.04,1,4),f);i.add(m),n.push({c:d,head:u,laser:m})}const s=Vr(256,64,()=>{}),r=new Ao(new wr({map:s.texture,depthWrite:!1,transparent:!0}));r.scale.set(5,1.25,1),i.add(r);const a=new E,o=new E,l=new E;let c=-1;return{group:i,height:14,update(h){t.position.set(Math.sin(h*.5)*6,9+Math.sin(h*1.1)*1.5,6+Math.cos(h*.4)*3),t.rotation.y=h,o.copy(t.position);for(const u of n){l.set(u.c.position.x,5.3,u.c.position.z),u.head.lookAt(a.copy(o).applyMatrix4(i.matrixWorld)),u.head.rotateY(Math.PI);const f=a.subVectors(o,l),m=f.length();u.laser.position.copy(l).addScaledVector(f,.5),u.laser.scale.y=m,u.laser.quaternion.setFromUnitVectors(new E(0,1,0),f.normalize())}r.position.copy(o).add(new E(0,2,0));const d=Math.floor(h*6);if(d!==c){c=d;const u=s.ctx;u.clearRect(0,0,256,64),u.fillStyle="rgba(5,15,25,0.75)",u.fillRect(0,0,256,64),u.fillStyle="#4cc9f0",u.font="bold 22px monospace",u.textAlign="center",u.fillText(`${o.x.toFixed(1)}, ${o.y.toFixed(1)}, ${o.z.toFixed(1)}`,128,40),s.texture.needsUpdate=!0}}}},birdnest(){const i=new At;_e(i,2.2,2.8,3,9,Y("#6d4c41"),0,1.5,0);const t=Qt(i,new rn(2.2,.7,6,12),Y("#a1887f"),0,3.2,0);t.rotation.x=Math.PI/2;const e=new At,n=Y("#1da1f2",{roughness:.5});be(e,2,n,0,0,0,1).scale.set(1.25,1,1),be(e,1.35,n,1.9,1.2,0,1);const r=Qt(e,new $e(.4,1.1,5),Y("#ffb300"),3.4,1.1,0);r.rotation.z=-Math.PI/2,be(e,.28,Y("#ffffff"),2.75,1.6,.75,0),be(e,.16,Y("#111"),2.92,1.62,.82,0),be(e,.28,Y("#ffffff"),2.75,1.6,-.75,0),be(e,.16,Y("#111"),2.92,1.62,-.82,0);const a=[];for(const c of[1,-1]){const h=new At;be(h,1.4,Y("#1a8cd8"),0,0,c*1.2,0).scale.set(1.3,.35,1),h.position.set(-.2,.4,c*1.2),e.add(h),a.push({w:h,s:c})}const o=Qt(e,new $e(.9,2,4),n,-2.6,.5,0);o.rotation.z=Math.PI/2+.4,e.position.y=5.2,i.add(e);const l=[["😊","#2ecc71"],["😡","#e74c3c"],["😐","#95a5a6"],["😍","#2ecc71"],["😢","#e74c3c"]].map(([c,h],d)=>{const u=Eg(c,h);return u.scale.setScalar(2.4),i.add(u),{s:u,o:d/5*Math.PI*2}});return{group:i,height:13,update(c){e.rotation.y=Math.sin(c*.4)*.5,e.position.y=5.2+Math.abs(Math.sin(c*2))*.15;for(const{w:h,s:d}of a)h.rotation.x=d*(Math.sin(c*6)*.25-.1);for(const h of l){const d=h.o+c*.35;h.s.position.set(Math.cos(d)*6.5,8+Math.sin(c*1.5+h.o)*.8,Math.sin(d)*6.5)}}}},desert(){const i=new At,t=Qt(i,new Rs(4,20),new ti({color:"#1fa3a3",roughness:.1,metalness:.2,emissive:"#0b4f5c",emissiveIntensity:.3}),2,.12,2);t.rotation.x=-Math.PI/2,Qt(i,new kr(4,4.8,20),Y("#c9a66b"),2,.1,2).rotation.x=-Math.PI/2;const e=new At;_e(e,.1,.12,7,6,Y("#b0bec5",{metalness:.6,roughness:.4}),0,3.5,0);const n=new At;for(let h=0;h<3;h++){const d=h/3*Math.PI*2;Si(n,new E(0,0,0),new E(Math.cos(d)*.9,0,Math.sin(d)*.9),.03,Y("#90a4ae"));const u=Qt(n,new yi(.22,8,6,0,Math.PI),Y("#eceff1"),Math.cos(d)*.9,0,Math.sin(d)*.9);u.rotation.y=-d}n.position.y=7.1,e.add(n);const s=new At;dt(s,1.6,.06,.06,Y("#90a4ae"),0,0,0),dt(s,.05,.5,.5,Y("#e53935"),-.8,0,0),s.position.y=6.3,e.add(s);const r=dt(e,2,.08,1.3,Y("#1a237e",{metalness:.6,roughness:.25}),0,3.2,.9);r.rotation.x=.6,dt(e,.8,1,.6,Y("#eceff1"),0,1.6,-.2),e.position.set(-5,0,-3),i.add(e);const a=Qt(i,new $e(3.4,3,6,1,!0),Y("#b5651d",{side:ve}),-6,1.5,5);a.rotation.y=.3;const o=Qt(i,new rn(2.5,.8,5,10,Math.PI),Y("#c0773f"),7,0,-5);o.rotation.y=.8;const l=[],c=["#2b83ba","#abdda4","#ffffbf","#fdae61","#d7191c"];for(let h=0;h<4;h++)for(let d=0;d<4;d++){const u=dt(i,1.1,.15,1.1,xe(c[(h+d)%5],.8),-1.8+h*1.2,8,-1.8+d*1.2);l.push({m:u,i:h,j:d})}return{group:i,height:12,update(h){n.rotation.y=h*4,s.rotation.y=Math.sin(h*.5)*.6;for(const d of l)d.m.position.y=8+Math.sin(h*1.5+d.i*.7+d.j*.5)*.45}}},medical(){const i=new At;dt(i,12,5,9,Y("#cfd8dc"),0,-2.2,0),dt(i,8,4.5,5,Y("#fafafa"),-1,2.5,-2);for(let o=0;o<4;o++)dt(i,1,1,.1,Y("#81d4fa",{roughness:.2}),-3.6+o*1.8,3,.52);const t=new At;dt(t,2.4,.8,.3,xe("#e53935",1.8),0,0,0),dt(t,.8,2.4,.3,xe("#e53935",1.8),0,0,0),t.position.set(-1,6.3,-2),i.add(t);const e=Qt(i,new rn(3,.7,10,32),Y("#eceff1",{roughness:.35}),4,4,3);e.rotation.y=Math.PI/2,dt(i,1.2,2.6,2.2,Y("#eceff1"),4,1.3,3);const n=Qt(i,new Rs(2.3,32),new Mn({color:"#4cc9f0",transparent:!0,opacity:.2,side:ve,blending:xn,depthWrite:!1}),4,4,3);n.rotation.y=Math.PI/2;const s=new At,r=Y("#f48fb1",{roughness:.6});for(const o of[-1,1])be(s,.9,r,0,0,o*.75,1).scale.set(.8,1.35,.7);_e(s,.15,.15,1.3,6,Y("#f8bbd0"),0,1.4,0);const a=be(s,.18,xe("#ffeb3b",4),.35,.3,.9,0);return s.position.set(4,4,3),i.add(s),{group:i,height:10,update(o){const l=Math.sin(o*1.4);n.position.x=4+l*1.6,s.scale.setScalar(1+Math.sin(o*2.2)*.06),s.rotation.y=o*.3,a.material.emissiveIntensity=2+Math.max(0,1-Math.abs(n.position.x-4.3)*2)*6}}},university(){const i=new At,t=Y("#efe9dd"),e=Y("#e2d9c6");dt(i,16,5,10,e,0,-2,0),dt(i,14,.5,8.5,e,0,.75,0),dt(i,12,6,5,t,0,4,-1.5);for(let s=0;s<6;s++)_e(i,.38,.45,5.5,10,t,-5+s*2,3.75,2.2);dt(i,12.4,.8,1.6,e,0,6.9,2.1),Eh(i,12.6,2.2,1.8,t,0,7.3,2.1),dt(i,12,.5,5,e,0,7.25,-1.5),Qt(i,new yi(2.6,16,8,0,Math.PI*2,0,Math.PI/2),Y("#5d8aa8",{metalness:.4,roughness:.4}),0,7.5,-1.5),dt(i,1.6,2.8,.2,Y("#5d4037"),0,2.4,1);const n=new At;return dt(n,3,.18,3,Y("#1c1c1c"),0,0,0),_e(n,1,1.1,.9,12,Y("#1c1c1c"),0,-.5,0),Si(n,new E(0,.1,0),new E(1.4,-.9,1.4),.05,xe("#ffd166",1.5)),be(n,.16,xe("#ffd166",2),1.4,-1,1.4,0),n.position.y=13.5,n.rotation.y=.4,i.add(n),{group:i,height:17,update(s){n.position.y=13.5+Math.sin(s*1.2)*.5,n.rotation.y=s*.4,n.rotation.z=Math.sin(s*.9)*.08}}},tower(){const i=new At,t=Y("#7a5c44",{metalness:.45,roughness:.55});dt(i,14,5,14,Y("#c8bba3"),0,-2.2,0);const e=[[6,0,3.4,6],[3.4,6,1.6,12.5],[1.6,12.5,.45,22]];for(const[l,c,h,d]of e)for(const u of[-1,1])for(const f of[-1,1]){const m=new E(u*l,c,f*l),v=new E(u*h,d,f*h);Si(i,m,v,c===0?.55:c<10?.38:.25,t),new E(-u*l,c,f*l);const g=new E(-u*h,d,f*h);Si(i,m,g,.06,t)}for(let l=0;l<4;l++){const c=Qt(i,new rn(3.6,.22,4,14,Math.PI),t,0,2.3,0);c.rotation.y=l*Math.PI/2,c.position.set(Math.sin(l*Math.PI/2)*4.7,2.3,Math.cos(l*Math.PI/2)*4.7),c.scale.y=.75}dt(i,8.2,.7,8.2,t,0,6,0),dt(i,4,.5,4,t,0,12.5,0),dt(i,1.4,1,1.4,t,0,22.2,0),_e(i,.08,.15,3,6,t,0,24.2,0);const n=140,s=new Float32Array(n*3),r=(l,c,h)=>l+(c-l)*h;for(let l=0;l<n;l++){const c=Math.random()*22,h=c<6?r(6,3.4,c/6):c<12.5?r(3.4,1.6,(c-6)/6.5):r(1.6,.45,(c-12.5)/9.5),d=Math.floor(Math.random()*4),u=Math.random()*2-1,f=d<2?d?h:-h:u*h,m=d<2?u*h:d===2?h:-h;s[l*3]=f,s[l*3+1]=c,s[l*3+2]=m}const a=new fe;a.setAttribute("position",new Ee(s,3));const o=new Xc(a,new Co({color:"#fff4c8",size:.35,transparent:!0,opacity:0,blending:xn,depthWrite:!1}));return i.add(o),be(i,.3,xe("#ffd166",5),0,25.8,0,0),{group:i,height:28,update(l){const c=l%10;o.material.opacity=c<3?(.5+.5*Math.sin(l*40))*.9:0,o.rotation.y=Math.floor(l*12)*.5*0}}},temple(){const i=new At,t=Y("#f5f3ee");dt(i,20,5,14,Y("#d9d2c3"),0,-2.15,0),Qt(i,new yi(5,24,10,0,Math.PI*2,0,Math.PI/2.4),t,-4,.3,-1).scale.y=.8,dt(i,12,.8,4,t,4,4.4,3);for(let a=0;a<5;a++){const o=Qt(i,new rn(1.1,.25,4,12,Math.PI),t,-.8+a*2.4,2.8,4.8);o.scale.y=1.4,dt(i,.5,2.8,.5,t,-1.9+a*2.4,1.6,4.8)}dt(i,.5,2.8,.5,t,10.1,1.6,4.8),dt(i,12,3.6,3,Y("#ebe6dc"),4,2.3,2.2),dt(i,1.6,12,1.6,t,8,6,-4),dt(i,2.2,.4,2.2,Y("#2e7d32"),8,12.2,-4);const e=new At;_e(e,.05,.05,3,6,Y("#888"),0,1.5,0),dt(e,1,1,.04,Y("#1b8a3a"),.5,2.5,0),dt(e,1,1,.04,Y("#ffffff"),1.5,2.5,0),e.position.set(8,12.4,-4),i.add(e);const n=new At,s=dt(n,1.6,.12,2.2,Y("#fafafa"),-.8,0,0);s.rotation.z=.15;const r=dt(n,1.6,.12,2.2,Y("#fafafa"),.8,0,0);return r.rotation.z=-.15,dt(n,3.4,.08,2.4,Y("#b388ff"),0,-.12,0),n.position.set(-4,8,-1),i.add(n),{group:i,height:16,update(a){n.position.y=8+Math.sin(a*1.1)*.4,n.rotation.y=a*.35}}}};function Tg(i){const e=(Th[i]??Th.lighthouse)();return e.group.traverse(n=>{n.isMesh&&!(n.material&&n.material.blending===xn)&&(n.castShadow=!0,n.receiveShadow=!0)}),e}const se=i=>new zt(i),Ze={deep:se("#9c8458"),wet:se("#c4aa78"),sand:se("#ecdcab"),sand2:se("#e4cf98"),grass:se("#74ad45"),grass2:se("#8cc057"),grassDark:se("#558f35"),grassHigh:se("#4c8231"),rock:se("#8e8982"),rock2:se("#74706a"),dsand:se("#ebc68c"),dsand2:se("#dcae6e"),drock:se("#b46a38")};function an(i,t){const e=i.index?i.toNonIndexed():i,n=e.attributes.position.count,s=new Float32Array(n*3),r=t instanceof zt?t:new zt(t);for(let a=0;a<n;a++)s[a*3]=r.r,s[a*3+1]=r.g,s[a*3+2]=r.b;return e.setAttribute("color",new Ee(s,3)),e.attributes.uv&&e.deleteAttribute("uv"),e}function Ah(i){const t=[],e=se("#8a6a48"),n=se("#9f7b52"),s=6,r=6.2+i*1.2,a=.9+i*.6;let o=new E;for(let h=0;h<s;h++){const d=h/s,u=(h+1)/s,f=new E(a*d*d,r*d,0),m=new E(a*u*u,r*u,0),v=new ie(.2-u*.06,.24-d*.06,f.distanceTo(m)*1.04,6),g=m.clone().sub(f),p=new qn().setFromUnitVectors(new E(0,1,0),g.clone().normalize());v.applyQuaternion(p);const M=f.clone().add(m).multiplyScalar(.5);v.translate(M.x,M.y,M.z),t.push(an(v,h%2?e:n)),o=m}const l=[se("#3f8f3a"),se("#4fa043"),se("#5bb04a")],c=8;for(let h=0;h<c;h++){const d=3.6+h%3*.4,u=new pn(1.1,d,1,6),f=u.attributes.position;for(let m=0;m<f.count;m++){const v=f.getY(m)+d/2,g=v/d;f.setX(m,f.getX(m)*Math.sin(Math.PI*Math.min(1,g*1.1+.08))*1),f.setZ(m,-g*g*2+Math.abs(f.getX(m))*.35),f.setY(m,v)}u.rotateX(-Math.PI/2+.25),u.rotateY(h/c*Math.PI*2+i),u.translate(o.x,o.y,o.z),t.push(an(u,l[h%3]))}for(let h=0;h<3;h++){const d=new sn(.22,0),u=h/3*Math.PI*2;d.translate(o.x+Math.cos(u)*.3,o.y-.35,o.z+Math.sin(u)*.3),t.push(an(d,se("#5d4632")))}return Fn(t)}function Ag(){const i=[],t=new ie(.22,.32,2.4,6);t.translate(0,1.2,0),i.push(an(t,se("#7a5a3c")));const e=[se("#4f9a3a"),se("#5fae45"),se("#448a33")];return[[0,3.4,0,1.7],[.9,2.9,.3,1.2],[-.8,3,-.4,1.25],[.1,4.4,.1,1.15]].forEach(([s,r,a,o],l)=>{const c=new sn(o,0);c.translate(s,r,a),i.push(an(c,e[l%3]))}),Fn(i)}function Cg(){const i=[],t=new ie(.16,.24,1.6,5);t.translate(0,.8,0),i.push(an(t,se("#6b4c33")));const e=[se("#2f6f3a"),se("#367c40"),se("#3f8a47")];for(let n=0;n<3;n++){const s=new $e(1.7-n*.42,2.4,7);s.translate(0,2.2+n*1.25,0),i.push(an(s,e[n]))}return Fn(i)}function Rg(){const i=[],t=new sn(.9,0);t.scale(1.2,.8,1),t.translate(0,.5,0);const e=new sn(.6,0);e.translate(.7,.4,.2),i.push(an(t,se("#5a9e3d")),an(e,se("#6cb24a")));for(let n=0;n<4;n++){const s=new sn(.13,0),r=n*1.7;s.translate(Math.cos(r)*.7,.95,Math.sin(r)*.6),i.push(an(s,se(["#ff6b8a","#ffd166","#ffffff","#c084fc"][n])))}return Fn(i)}function Ch(i){const t=new Oo(1,0),e=t.attributes.position,n=$o(i),s=new Map;for(let r=0;r<e.count;r++){const a=`${e.getX(r).toFixed(3)},${e.getY(r).toFixed(3)},${e.getZ(r).toFixed(3)}`;s.has(a)||s.set(a,.75+n()*.45);const o=s.get(a);e.setXYZ(r,e.getX(r)*o*1.2,e.getY(r)*o*.75,e.getZ(r)*o)}return t.computeVertexNormals(),an(t,se("#8a867f"))}function Pg(){const i=[],t=se("#5f8f3e"),e=new ie(.35,.4,3.2,7);e.translate(0,1.6,0);const n=new ie(.22,.22,1.2,6);n.translate(.75,2.2,0);const s=new ie(.22,.22,.6,6);s.rotateZ(Math.PI/2),s.translate(.45,1.65,0);const r=new ie(.2,.2,.9,6);r.translate(-.7,1.9,0);const a=new ie(.2,.2,.5,6);return a.rotateZ(Math.PI/2),a.translate(-.42,1.45,0),[e,n,s,r,a].forEach(o=>i.push(an(o,t))),Fn(i)}const Rh={value:0};function Ig(){const i=new ti({vertexColors:!0,flatShading:!0,roughness:.85,side:ve});return i.onBeforeCompile=t=>{t.uniforms.uWind=Rh,t.vertexShader=`uniform float uWind;
`+t.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      #ifdef USE_INSTANCING
        vec3 ip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
        float hgt = max(position.y - 1.0, 0.0);
        float sway = hgt * hgt * 0.006;
        transformed.x += sin(uWind * 1.6 + ip.x * 0.31 + ip.z * 0.17) * sway + sin(uWind * 4.3 + position.x * 2.0 + ip.z) * sway * 0.25;
        transformed.z += cos(uWind * 1.3 + ip.z * 0.27) * sway * 0.7;
      #endif`)},i}class Lg{constructor(t,e){this.scene=t,this.data=e,this.items=[],this.pickables=[],this.group=new At,t.add(this.group),this.terrainMat=new ti({vertexColors:!0,flatShading:!0,roughness:.92}),this.vegMat=Ig(),this.vegTypes={palm0:{geo:Ah(0),list:[]},palm1:{geo:Ah(1),list:[]},tree:{geo:Ag(),list:[]},pine:{geo:Cg(),list:[]},bush:{geo:Rg(),list:[]},rock0:{geo:Ch(11),list:[]},rock1:{geo:Ch(29),list:[]},cactus:{geo:Pg(),list:[]}},e.forEach((n,s)=>this.buildIsland(n,s)),this.buildVegetationInstances()}buildIsland(t,e){const n=new At;n.position.set(t.cx,0,t.cz),this.group.add(n);const s=this.buildTerrain(t);s.userData.islandId=t.id,n.add(s),this.pickables.push(s);const r=Tg(t.landmark);r.group.position.y=t.plateauH-.05,r.group.rotation.y=-t.dockAngle+Math.PI/2,r.group.traverse(h=>{h.isMesh&&(h.userData.islandId=t.id)}),n.add(r.group),this.pickables.push(r.group),this.scatterVegetation(t,e);const a=this.buildDock(t);this.group.add(a.group);const o=ei[t.category],l=document.createElement("div");l.className=`island-label cat-${t.category}`,l.style.setProperty("--cat",o.color),l.style.setProperty("--ink",o.ink||"#4a2c11"),l.innerHTML=`
      <div class="il-seal"></div>
      <div class="il-kicker">${o.label}</div>
      <div class="il-title">${t.title}</div>
      <div class="il-sub">${t.date??""}</div>`,l.dataset.island=t.id;const c=new og(l);c.position.set(0,t.plateauH+r.height+3,0),n.add(c),this.items.push({data:t,root:n,landmark:r,dock:a,label:c,labelEl:l,labelHeight:t.plateauH+r.height+3})}buildTerrain(t){const e=t.radius,n=e*1.42,s=Math.round(n*2/1.65),r=new pn(n*2,n*2,s,s);r.rotateX(-Math.PI/2);const a=r.attributes.position,o=n*2/s;for(let C=0;C<a.count;C++){let R=a.getX(C),S=a.getZ(C);Math.abs(R)>=n-.001||Math.abs(S)>=n-.001||(R+=(bi(R*.7+13.1,S*.7)-.5)*o*.7,S+=(bi(R*.7-7.3,S*.7+3.1)-.5)*o*.7),a.setXYZ(C,R,Nn(t,R,S),S)}const c=r.toNonIndexed().attributes.position,h=[];for(let C=0;C<c.count;C+=3){const R=c.getY(C),S=c.getY(C+1),y=c.getY(C+2);Math.max(R,S,y)>-4.5&&h.push(C)}const d=new Float32Array(h.length*9),u=new Float32Array(h.length*9),f=new E,m=new E,v=new E,g=new E,p=new E,M=new E,_=new zt,x=t.landmark==="desert";h.forEach((C,R)=>{f.fromBufferAttribute(c,C),m.fromBufferAttribute(c,C+1),v.fromBufferAttribute(c,C+2),d.set([f.x,f.y,f.z,m.x,m.y,m.z,v.x,v.y,v.z],R*9),p.subVectors(m,f),M.subVectors(v,f),g.crossVectors(p,M).normalize(),g.y<0&&g.negate();const S=(f.y+m.y+v.y)/3,y=(f.x+m.x+v.x)/3,I=(f.z+m.z+v.z)/3,U=bi(y*.15+t.seed,I*.15),F=Math.hypot(y,I)/e<t.plateauR+.05;S<-.6?_.copy(Ze.deep):S<.25?_.copy(Ze.wet):x?g.y<.7?_.copy(Ze.drock):_.copy(Ze.dsand).lerp(Ze.dsand2,U):S<1.05+U*.45&&!F?_.copy(Ze.sand).lerp(Ze.sand2,U):g.y<.74?_.copy(Ze.rock).lerp(Ze.rock2,U):(_.copy(Ze.grass).lerp(Ze.grass2,U),S>4?_.lerp(Ze.grassHigh,Math.min(1,(S-4)/4)):U>.62&&_.lerp(Ze.grassDark,.5));const X=(bi(y*3.1,I*3.1)-.5)*.06;_.offsetHSL(0,0,X);for(let z=0;z<3;z++)u.set([_.r,_.g,_.b],R*9+z*3)});const L=new fe;L.setAttribute("position",new Ee(d,3)),L.setAttribute("color",new Ee(u,3)),L.computeVertexNormals();const A=new Tt(L,this.terrainMat);return A.receiveShadow=!0,A.castShadow=!0,A}scatterVegetation(t,e){const n=$o(e*7919+13),s=t.radius,r=Math.cos(t.dockAngle),a=Math.sin(t.dockAngle),o=t.landmark==="desert",l=["lighthouse","crystal","birdnest","observatory","windfarm","temple"].includes(t.landmark),c=Math.round(s*s*.5),h=[];for(let d=0;d<c;d++){const u=n()*Math.PI*2,f=Math.sqrt(n())*s*1.05,m=Math.cos(u)*f,v=Math.sin(u)*f;if(f/s<t.plateauR+.16)continue;const p=m*r+v*a,M=Math.abs(-m*a+v*r);if(p>0&&M<5)continue;const _=Nn(t,m,v);if(_<.5)continue;let x=!0;for(const y of h)if((y[0]-m)**2+(y[1]-v)**2<6){x=!1;break}if(!x)continue;const L=.6,A=Math.hypot(Nn(t,m+L,v)-Nn(t,m-L,v),Nn(t,m,v+L)-Nn(t,m,v-L))/(2*L),C=n();let R=null;if(o)_<1.6&&C<.2?R=n()<.5?"palm0":"palm1":C<.32?R="cactus":C<.45&&(R=n()<.5?"rock0":"rock1");else if(_<1.4)C<.28?R=n()<.5?"palm0":"palm1":C<.36&&(R=n()<.5?"rock0":"rock1");else if(A>.9)C<.35&&(R=n()<.5?"rock0":"rock1");else{const y=l?.55:.32;C<y*.35?R="tree":C<y*.6?R=_>3.5?"pine":"palm0":C<y?R="bush":C<y+.05&&(R="rock0")}if(!R)continue;h.push([m,v]);const S=R.startsWith("rock")?.5+n()*1.1:.8+n()*.45;this.vegTypes[R].list.push({x:t.cx+m,y:_-(R.startsWith("rock")?.25*S:.1),z:t.cz+v,rot:n()*Math.PI*2,s:S})}}buildVegetationInstances(){const t=new Zt,e=new qn,n=new E(0,1,0);for(const s of Object.keys(this.vegTypes)){const{geo:r,list:a}=this.vegTypes[s];if(!a.length)continue;const o=new Vc(r,this.vegMat,a.length);a.forEach((l,c)=>{e.setFromAxisAngle(n,l.rot),t.compose(new E(l.x,l.y,l.z),e,new E(l.s,l.s,l.s)),o.setMatrixAt(c,t)}),o.castShadow=!0,o.receiveShadow=!0,o.computeBoundingSphere(),this.group.add(o)}}buildDock(t){const e=new At,n=t.dockStart,s=t.dockEnd,r=n.distanceTo(s);e.position.set(n.x,0,n.y),e.rotation.y=-t.dockAngle;const a=Y("#7d5c3b",{roughness:.9}),o=Y("#2a221c",{metalness:.6,roughness:.45}),l=1.7,c=[];for(let _=0;_<r;_+=.6){const x=new Te(.52,.16,3.2);x.translate(_+.25,l,(bi(_*3,t.seed)-.5)*.15),c.push(x)}for(let _=.3;_<r;_+=3.4)for(const x of[-1.5,1.5]){const L=new ie(.17,.2,7,6);L.translate(_,l-3.2,x),c.push(L)}for(const _ of[-1.55,1.55]){const x=new Te(r,.22,.18);x.translate(r/2,l-.2,_),c.push(x)}const h=new ie(.09,.12,7,7);h.translate(r-.6,l+3.5,-1.2),c.push(h);const d=new Tt(Fn(c),a);d.castShadow=d.receiveShadow=!0,e.add(d);const u=[];for(const _ of[r-2,r-7]){const x=new ie(.18,.22,.6,7);x.translate(_,l+.35,1.25),u.push(x)}for(const _ of[3,r*.55]){const x=new ie(.06,.07,2.4,6);x.translate(_,l+1.2,1.45),u.push(x)}e.add(new Tt(Fn(u),o));const f=[];for(const _ of[3,r*.55]){const x=new sn(.17,0);x.translate(_,l+2.45,1.45),f.push(x)}e.add(new Tt(Fn(f),xe("#ffcf78",3.2)));const m=ei[t.category],v=new Tt(new sn(.32,1),xe(m.color,4));v.position.set(r-.6,l+7.15,-1.2),e.add(v);const g=new pn(2.2,1.3,8,3);g.translate(1.1,0,0);const p=new Tt(g,Y(m.color,{side:ve,flatShading:!1,roughness:.8}));p.position.set(r-.6,l+6.2,-1.2),p.castShadow=!0,e.add(p);const M=Float32Array.from(g.attributes.position.array);return{group:e,flag:p,flagRest:M,lantern:v}}update(t,e,n){Rh.value=t;for(const s of this.items){const r=n.position.x-s.data.cx,a=n.position.z-s.data.cz,o=Math.hypot(r,a);if(o<320&&s.landmark.update(t,e),o<170){const l=s.dock.flag.geometry.attributes.position,c=s.dock.flagRest;for(let h=0;h<l.count;h++){const d=c[h*3],u=c[h*3+1];l.setZ(h,Math.sin(d*2.6-t*6+u*.8)*.18*d)}l.needsUpdate=!0}}}}const Wr=[{pos:new E(0,-.35,3.4),area:.9},{pos:new E(-1.05,-.42,1.8),area:1.15},{pos:new E(1.05,-.42,1.8),area:1.15},{pos:new E(-1.35,-.45,0),area:1.35},{pos:new E(1.35,-.45,0),area:1.35},{pos:new E(-1.15,-.42,-2),area:1.25},{pos:new E(1.15,-.42,-2),area:1.25},{pos:new E(0,-.48,-2.7),area:1}],zs=90;function Dg(){const i=document.createElement("canvas");i.width=256,i.height=160;const t=i.getContext("2d");t.fillStyle="#141210",t.fillRect(0,0,256,160),t.strokeStyle="#efe6d5",t.lineWidth=12,t.lineCap="round",t.beginPath(),t.moveTo(65,125),t.lineTo(190,35),t.moveTo(65,35),t.lineTo(190,125),t.stroke(),t.fillStyle="#efe6d5",t.beginPath(),t.arc(128,70,30,0,Math.PI*2),t.fill(),t.fillRect(112,88,32,22),t.fillStyle="#141210",t.beginPath(),t.arc(116,68,7,0,Math.PI*2),t.arc(140,68,7,0,Math.PI*2),t.fill(),t.beginPath(),t.moveTo(128,76),t.lineTo(123,86),t.lineTo(133,86),t.closePath(),t.fill();const e=new Po(i);return e.colorSpace=ke,e}class Ug{constructor(t){this.scene=t,this.group=new At,this.position=new E(8,.3,46),this.velocity=new E,this.heading=-Math.PI*.85,this.yawRate=0,this.pitch=0,this.pitchRate=0,this.roll=0,this.rollRate=0,this.throttle=0,this.steer=0,this.boost=!1,this.speedKnots=0,this.autopilot=null,this.wake=[],this.wakeTimer=0,this.sails=[],this.buildMesh(),this.buildSpray(),this.group.position.copy(this.position),t.add(this.group)}buildMesh(){this.hullGroup=new At,this.group.add(this.hullGroup);const t=Y("#352012",{roughness:.82}),e=Y("#1c110a",{roughness:.85}),n=Y("#6e4b2e",{roughness:.85}),s=Y("#4e2718",{roughness:.7}),r=Y("#c89b3c",{metalness:.65,roughness:.35}),a=Y("#22252a",{metalness:.75,roughness:.4}),o=Y("#8c6d46",{roughness:.9}),l=xe("#ffae42",4),c=Y("#ffb74d",{roughness:.2,emissive:"#ff9800",emissiveIntensity:1.2}),h=[[-3.15,1.12,.85,1.38,.12,-.38],[-2.15,1.32,1.08,1.28,.02,-.48],[-1.05,1.44,1.2,.74,-.05,-.54],[.45,1.4,1.14,.74,-.04,-.52],[1.75,1.06,.76,.86,.04,-.44],[2.85,.48,.25,1.05,.22,-.25],[3.65,.05,.02,1.22,.52,.16]],d=(U,D)=>{const F=[],X=(it,lt,yt)=>F.push(it[0],it[1],it[2],lt[0],lt[1],lt[2],yt[0],yt[1],yt[2]),z=(it,lt,yt,Bt)=>{X(it,lt,yt),X(it,yt,Bt)};for(let it=0;it<h.length-1;it++){const lt=h[it],yt=h[it+1];for(const Bt of[-1,1]){const B=[Bt*lt[1],lt[3],lt[0]],Z=[Bt*lt[2],lt[4],lt[0]],ot=[0,lt[5],lt[0]],nt=[Bt*yt[1],yt[3],yt[0]],_t=[Bt*yt[2],yt[4],yt[0]],Ut=[0,yt[5],yt[0]];U?Bt===1?z(Z,_t,nt,B):z(B,nt,_t,Z):Bt===1?z(ot,Ut,_t,Z):z(Z,_t,Ut,ot)}}const q=h[0];U?z([-q[1],q[3],q[0]],[-q[2],q[4],q[0]],[q[2],q[4],q[0]],[q[1],q[3],q[0]]):X([-q[2],q[4],q[0]],[0,q[5],q[0]],[q[2],q[4],q[0]]);const H=new fe;H.setAttribute("position",new Kt(F,3)),H.computeVertexNormals();const rt=new Tt(H,D);return rt.castShadow=rt.receiveShadow=!0,rt};this.hullGroup.add(d(!0,t)),this.hullGroup.add(d(!1,s));for(const U of[-1,1]){const D=h.map(q=>new E(U*(q[1]+.03),q[3]+.03,q[0])),F=new Tt(new Mi(new Lr(D),24,.065,6,!1),e);this.hullGroup.add(F);const X=h.map(q=>new E(U*(q[1]*.96+.02),q[3]-.14,q[0])),z=new Tt(new Mi(new Lr(X),24,.032,5,!1),r);this.hullGroup.add(z)}const u=[];for(let U=0;U<h.length-1;U++){const D=h[U],F=h[U+1],X=D[3]-.08,z=F[3]-.08;u.push(-D[1]*.94,X,D[0],D[1]*.94,X,D[0],F[1]*.94,z,F[0],-D[1]*.94,X,D[0],F[1]*.94,z,F[0],-F[1]*.94,z,F[0])}const f=new fe;f.setAttribute("position",new Kt(u,3)),f.computeVertexNormals();const m=new Tt(f,n);m.receiveShadow=!0,this.hullGroup.add(m);const v=new At;v.position.set(0,.72,-2.05);const g=new Tt(new Te(2.15,.62,1.95),t);g.position.set(0,.25,0),g.castShadow=!0,v.add(g);const p=new Tt(new Te(2.24,.1,2.05),n);p.position.set(0,.58,0),v.add(p);for(const U of[-.6,0,.6]){const D=new Tt(new Te(.36,.34,.08),c);D.position.set(U,.28,-.98),v.add(D);const F=new Tt(new Te(.42,.4,.06),r);F.position.set(U,.28,-.97),v.add(F)}for(const U of[-.85,.85]){const D=new Tt(new ie(.03,.03,.55,6),a);D.rotation.x=-.5,D.position.set(U,.75,-1.08),v.add(D);const F=new Tt(new Ns(.18,0),l);F.position.set(U,.92,-1.22),v.add(F);const X=new Tt(new $e(.22,.16,6),r);X.position.set(U,1.08,-1.22),v.add(X)}this.helmWheel=new At,this.helmWheel.position.set(0,.92,-.35);const M=new Tt(new rn(.28,.035,6,16),t);this.helmWheel.add(M);for(let U=0;U<8;U++){const D=new Tt(new ie(.016,.016,.72,5),r);D.rotation.z=U*Math.PI/4,this.helmWheel.add(D)}v.add(this.helmWheel);const _=new Tt(new ie(.08,.11,.45,8),t);_.position.set(0,.72,-.42),v.add(_),this.cabinLight=new Xo("#ffaa33",6,12,1.5),this.cabinLight.position.set(0,1.1,-1.35),v.add(this.cabinLight),this.hullGroup.add(v);for(const U of[-1,1])for(const D of[-.65,.25,1.15]){const F=new At,X=new Tt(new Te(.32,.18,.24),t);F.add(X);const z=new Tt(new ie(.065,.095,.62,8),a);z.rotation.z=-U*(Math.PI/2-.08),z.position.set(U*.22,.08,0),F.add(z),F.position.set(U*1.18,.76,D),this.hullGroup.add(F)}const x=new Tt(new ie(.04,.09,2.3,7),e);x.rotation.x=Math.PI/2-.28,x.position.set(0,1.38,4.35),this.hullGroup.add(x);const L=new Tt(new $e(.18,.75,5),r);L.rotation.x=Math.PI/2-.15,L.position.set(0,1.05,3.85),this.hullGroup.add(L);const A=Y("#e8d7b4",{side:ve,roughness:.85,flatShading:!1,emissive:"#3d2712",emissiveIntensity:.1}),C=Y("#8c1d1d",{side:ve,roughness:.85,flatShading:!1}),R=(U,D,F=!1)=>{const q=new pn(U,D,12,8),H=q.attributes.position;for(let it=0;it<H.count;it++){const lt=H.getX(it)/U+.5,yt=H.getY(it)/D+.5,Bt=Math.sin(lt*Math.PI)*Math.sin(yt*Math.PI)*(.38*U*.35);H.setZ(it,Bt)}q.computeVertexNormals();const rt=new Tt(q,F?C:A);return rt.castShadow=!0,this.sails.push({geo:q,rest:Float32Array.from(H.array),width:U,height:D}),rt},S=(U,D,F)=>{const X=new At;X.position.set(0,.7,U),X.rotation.x=-.05;const z=new Tt(new ie(.06*F,.12*F,D,8),e);z.position.y=D/2,z.castShadow=!0,X.add(z);const q=new Tt(new ie(.32*F,.24*F,.38,10),t);q.position.y=D*.72,X.add(q);for(const yt of[-1,1]){const Bt=[new E(yt*1.25,.05,-.2),new E(yt*.22*F,D*.7,0)],B=new Tt(new Mi(new jc(Bt[0],Bt[1]),4,.02,4,!1),o);X.add(B)}const H=new At;H.position.set(0,D*.36,.08);const rt=new Tt(new ie(.04,.04,3.2*F,7),e);rt.rotation.z=Math.PI/2,rt.position.y=1.05*F,H.add(rt),H.add(R(3*F,2*F,!1)),X.add(H);const it=new At;it.position.set(0,D*.76,.08);const lt=new Tt(new ie(.035,.035,2.3*F,7),e);return lt.rotation.z=Math.PI/2,lt.position.y=.75*F,it.add(lt),it.add(R(2.15*F,1.45*F,F>=1)),X.add(it),this.hullGroup.add(X),{mg:X,lowerYard:H,upperYard:it}};this.mainMast=S(-.35,7.2,1),this.foreMast=S(1.65,5.9,.82);const y=new pn(1.45,.9,10,4);y.translate(-.725,0,0),this.jollyRoger=new Tt(y,new Mn({map:Dg(),side:ve})),this.jollyRoger.position.set(0,7.35,0),this.jollyRoger.rotation.y=Math.PI/2,this.mainMast.mg.add(this.jollyRoger),this.flagRest=Float32Array.from(y.attributes.position.array),this.rudder=new Tt(new Te(.1,.85,.55),e),this.rudder.position.set(0,-.22,-3.25),this.hullGroup.add(this.rudder);const I=new kr(1.7,2.3,32);I.rotateX(-Math.PI/2),this.targetMarker=new Tt(I,new Mn({color:"#d4a038",transparent:!0,opacity:.85,side:ve,depthWrite:!1})),this.targetMarker.visible=!1,this.scene.add(this.targetMarker)}buildSpray(){this.sprayPositions=new Float32Array(zs*3),this.sprayVelocities=Array.from({length:zs},()=>new E),this.sprayLife=new Float32Array(zs),this.sprayCursor=0;const t=new fe;t.setAttribute("position",new Ee(this.sprayPositions,3));const e=new Co({color:"#f5efe2",size:.42,transparent:!0,opacity:.75,depthWrite:!1});this.sprayPoints=new Xc(t,e),this.sprayPoints.frustumCulled=!1,this.scene.add(this.sprayPoints)}spawnSpray(t,e,n=2){for(let s=0;s<n;s++){const r=this.sprayCursor;this.sprayCursor=(this.sprayCursor+1)%zs,this.sprayPositions[r*3]=t.x+(Math.random()-.5)*.5,this.sprayPositions[r*3+1]=t.y+.15,this.sprayPositions[r*3+2]=t.z+(Math.random()-.5)*.5,this.sprayVelocities[r].set(e.x+(Math.random()-.5)*3.5,2.2+Math.random()*2.6,e.z+(Math.random()-.5)*3.5),this.sprayLife[r]=.55+Math.random()*.35}}setAutopilot(t,e=null){if(!t){this.autopilot=null,this.targetMarker.visible=!1;return}this.autopilot={target:t.clone(),island:e},this.targetMarker.visible=!0}teleportTo(t,e=0){this.setAutopilot(null),this.position.set(t.x,.35,t.y),this.velocity.set(0,0,0),this.heading=e,this.yawRate=0,this.pitch=0,this.roll=0,this.wake.length=0}update(t,e){const n=Math.min(t,.05);let s=this.throttle,r=this.steer,a=this.boost;if(Math.abs(s)>.05||Math.abs(r)>.05)this.autopilot&&this.setAutopilot(null);else if(this.autopilot){const B=this.autopilot.target.x-this.position.x,Z=this.autopilot.target.y-this.position.z,ot=Math.hypot(B,Z);if(this.targetMarker.position.set(this.autopilot.target.x,Br(this.autopilot.target.x,this.autopilot.target.y,e).y+.25,this.autopilot.target.y),this.targetMarker.scale.setScalar(1+Math.sin(e*4)*.15),ot<4.5){if(this.velocity.multiplyScalar(.88),ot<2.5||this.velocity.length()<.8){const nt=this.autopilot.island;this.setAutopilot(null),nt&&this.onAutopilotArrive&&this.onAutopilotArrive(nt)}}else{let _t=Math.atan2(B,Z)-this.heading;for(;_t>Math.PI;)_t-=Math.PI*2;for(;_t<-Math.PI;)_t+=Math.PI*2;r=Pe.clamp(_t*1.4,-1,1),s=ot>22?1:Pe.clamp(ot/22,.28,.85),a=ot>55&&Math.abs(_t)<.5}}const o=new E(Math.sin(this.heading),0,Math.cos(this.heading)),l=new E(Math.cos(this.heading),0,-Math.sin(this.heading)),c=new qn().setFromEuler(new un(this.pitch,this.heading,this.roll,"YXZ"));let h=-Or*1,d=0,u=0,f=0,m=0,v=0;const g=new E;for(let B=0;B<Wr.length;B++){const Z=Wr[B];g.copy(Z.pos).applyQuaternion(c).add(this.position);const ot=Br(g.x,g.z,e),nt=ot.y-g.y;if(m+=ot.vx,v+=ot.vz,nt>0){f++;const _t=Math.min(nt/.85,1.6),Ut=this.velocity.y-this.pitchRate*Z.pos.z+this.rollRate*Z.pos.x,Nt=ot.vy-Ut,$t=(_t*3.15+Nt*.52)*Z.area;h+=$t,d-=Z.pos.z*$t*.42,u-=Z.pos.x*$t*.65}}m/=Wr.length,v/=Wr.length,this.velocity.y+=h*n,this.velocity.y*=Math.exp(-3.2*n),this.position.y+=this.velocity.y*n;const p=Br(this.position.x,this.position.z,e).y;this.position.y<p-.35&&(this.position.y=p-.35,this.velocity.y<0&&(this.velocity.y*=.2));const M=this.velocity.dot(o),_=a?29:19.5,x=s*(s>=0?_:11);this.velocity.addScaledVector(o,x*n),this.velocity.x+=(m*.12-this.velocity.x*.05)*n,this.velocity.z+=(v*.12-this.velocity.z*.05)*n;const L=this.velocity.dot(o)*Math.exp(-.78*n)-this.velocity.dot(o)*Math.abs(this.velocity.dot(o))*.012*n,A=this.velocity.dot(l)*Math.exp(-5.5*n);this.velocity.x=o.x*L+l.x*A,this.velocity.z=o.z*L+l.z*A;const C=Pe.clamp(Math.abs(M)/6.5,.35,1.25),R=M<-.5?-1:1,S=-r*1.65*C*R;this.yawRate=Pe.lerp(this.yawRate,S,1-Math.exp(-6.5*n)),this.heading+=this.yawRate*n;const y=-Pe.clamp(x*.0045+M*.004,-.05,.14),I=-this.yawRate*Pe.clamp(M*.018,-.18,.22);this.pitchRate+=(d-(this.pitch-y)*14-this.pitchRate*4.2)*n,this.rollRate+=(u-(this.roll-I)*16-this.rollRate*4.5)*n,this.pitch=Pe.clamp(this.pitch+this.pitchRate*n,-.38,.38),this.roll=Pe.clamp(this.roll+this.rollRate*n,-.45,.45),this.position.x+=this.velocity.x*n,this.position.z+=this.velocity.z*n;const U=ks(this.position.x,this.position.z),D=-.22;if(U>D){const B=gg(this.position.x,this.position.z,new E),Z=new et(B.x,B.z);if(Z.lengthSq()>1e-4){Z.normalize();const ot=Math.min(U-D,2.5);this.position.x+=Z.x*ot*1.4,this.position.z+=Z.y*ot*1.4;const nt=this.velocity.x*Z.x+this.velocity.z*Z.y;nt<0&&(this.velocity.x-=1.35*nt*Z.x,this.velocity.z-=1.35*nt*Z.y,this.velocity.multiplyScalar(.75))}}const F=520,X=Math.hypot(this.position.x,this.position.z);if(X>F){const B=(X-F)*.5;this.position.x-=this.position.x/X*B,this.position.z-=this.position.z/X*B}this.group.position.copy(this.position),this.group.rotation.order="YXZ",this.group.rotation.set(this.pitch,this.heading,this.roll);const z=Math.hypot(this.velocity.x,this.velocity.z);this.speedKnots=z*1.45,this.rudder.rotation.y=r*.55,this.helmWheel.rotation.z=-r*1.8;const q=r*.22+Math.sin(e*.9)*.04;this.mainMast.lowerYard.rotation.y=q,this.mainMast.upperYard.rotation.y=q*1.1,this.foreMast.lowerYard.rotation.y=q,this.foreMast.upperYard.rotation.y=q*1.1;const H=.65+Math.min(z/10,.95);for(const B of this.sails){const Z=B.geo.attributes.position;for(let ot=0;ot<Z.count;ot++){const nt=B.rest[ot*3],_t=B.rest[ot*3+1],Ut=B.rest[ot*3+2],Nt=Math.sin(e*5.2+nt*2.5-_t*1.8)*.045*(Ut/.4);Z.setZ(ot,Ut*H+Nt)}Z.needsUpdate=!0}const rt=this.jollyRoger.geometry.attributes.position;for(let B=0;B<rt.count;B++){const Z=this.flagRest[B*3],ot=this.flagRest[B*3+1];rt.setZ(B,Math.sin(e*8.5+Z*4.2+ot)*.16*Math.abs(Z))}rt.needsUpdate=!0;for(let B=this.wake.length-1;B>=0;B--)this.wake[B].age+=n,this.wake[B].age>9.5&&this.wake.splice(B,1);this.wakeTimer+=n;const it=this.position.x-o.x*2.7,lt=this.position.z-o.z*2.7,yt=this.wake[0];if(((yt?Math.hypot(it-yt.x,lt-yt.z):99)>1.35||this.wakeTimer>.22)&&z>.6&&(this.wakeTimer=0,this.wake.unshift({x:it,z:lt,age:0,strength:Pe.clamp(z/9.5,.25,1.35)}),this.wake.length>46&&this.wake.pop()),z>4.2&&f>0){const B=new E(0,.1,3.2).applyMatrix4(this.group.matrixWorld),Z=Math.random()<.5?-1:1,ot=new E().copy(l).multiplyScalar(Z*(2+z*.22)).addScaledVector(o,z*.35);this.spawnSpray(B,ot,z>11?2:1)}for(let B=0;B<zs;B++)if(this.sprayLife[B]>0){this.sprayLife[B]-=n;const Z=this.sprayVelocities[B];Z.y-=Or*1.15*n,this.sprayPositions[B*3]+=Z.x*n,this.sprayPositions[B*3+1]+=Z.y*n,this.sprayPositions[B*3+2]+=Z.z*n,(this.sprayLife[B]<=0||this.sprayPositions[B*3+1]<-1)&&(this.sprayPositions[B*3+1]=-999)}else this.sprayPositions[B*3+1]=-999;this.sprayPoints.geometry.attributes.position.needsUpdate=!0}}class Ng{constructor(t,e){this.scene=t,this.group=new At,t.add(this.group),this.gulls=[],this.buoys=[],this.buildSeagulls(e),this.buildChannelBuoys(e)}buildSeagulls(t){const e=Y("#fafafa",{roughness:.6}),n=new Te(.65,.04,.22);n.translate(-.32,0,0);const s=new Te(.65,.04,.22);s.translate(.32,0,0);const r=new $e(.11,.48,5);r.rotateX(Math.PI/2),t.forEach((a,o)=>{const l=o===0?4:2;for(let c=0;c<l;c++){const h=new At;h.add(new Tt(r,e));const d=new Tt(n,e),u=new Tt(s,e);h.add(d,u),this.group.add(h),this.gulls.push({bird:h,wl:d,wr:u,cx:a.cx,cz:a.cz,radius:a.radius*(.75+c%3*.28),height:16+o%4*3+c*2.2,speed:.35+o%3*.08+c*.05,phase:o*1.7+c*2.1,dir:c%2===0?1:-1})}})}buildChannelBuoys(t){const e=t[0],n=t.filter(r=>r.id!=="home"),s=Y("#37474f",{metalness:.5,roughness:.45});n.forEach((r,a)=>{if(a%2!==0)return;const o=ei[r.category],l=.42,c=e.cx+(r.cx-e.cx)*l,h=e.cz+(r.cz-e.cz)*l,d=new At,u=new Tt(new ie(.65,.48,.7,10),Y(o.color,{roughness:.45}));u.position.y=.1,d.add(u);const f=new Tt(new ie(.18,.38,1.3,6),s);f.position.y=1.05,d.add(f);const m=new Tt(new yi(.18,8,8),xe(o.color,3.5));m.position.y=1.8,d.add(m),d.position.set(c,0,h),this.group.add(d),this.buoys.push({buoy:d,beacon:m,x:c,z:h,phase:a*1.3})})}update(t,e){for(const n of this.gulls){if(Math.hypot(e.position.x-n.cx,e.position.z-n.cz)>380)continue;const s=t*n.speed*n.dir+n.phase,r=n.cx+Math.cos(s)*n.radius,a=n.cz+Math.sin(s)*n.radius,o=n.height+Math.sin(t*1.4+n.phase)*1.4;n.bird.position.set(r,o,a),n.bird.rotation.y=-s+(n.dir>0?0:Math.PI),n.bird.rotation.z=n.dir*.18;const l=Math.sin(t*7.5+n.phase)*.42;n.wl.rotation.z=l,n.wr.rotation.z=-l}for(const n of this.buoys){if(Math.hypot(e.position.x-n.x,e.position.z-n.z)>340)continue;const s=Br(n.x,n.z,t);n.buoy.position.y=s.y,n.buoy.rotation.x=Math.sin(t*1.8+n.phase)*.16,n.buoy.rotation.z=Math.cos(t*1.5+n.phase)*.16,n.beacon.scale.setScalar(.85+.3*Math.sin(t*4+n.phase))}}}class Fg{constructor(){this.ctx=null,this.enabled=!1,this.surfGain=null,this.wakeFilter=null,this.wakeGain=null}init(){if(this.ctx)return;const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t;const e=this.ctx.sampleRate,n=e*3,s=this.ctx.createBuffer(1,n,e),r=s.getChannelData(0);let a=0,o=0,l=0,c=0,h=0,d=0,u=0;for(let g=0;g<n;g++){const p=Math.random()*2-1;a=.99886*a+p*.0555179,o=.99332*o+p*.0750759,l=.969*l+p*.153852,c=.8665*c+p*.3104856,h=.55*h+p*.5329522,d=-.7616*d-p*.016898,r[g]=(a+o+l+c+h+d+u+p*.5362)*.04,u=p*.115926}const f=this.ctx.createBufferSource();f.buffer=s,f.loop=!0;const m=this.ctx.createBiquadFilter();m.type="lowpass",m.frequency.value=260,this.surfGain=this.ctx.createGain(),this.surfGain.gain.value=0,f.connect(m).connect(this.surfGain).connect(this.ctx.destination),f.start();const v=this.ctx.createBufferSource();v.buffer=s,v.loop=!0,this.wakeFilter=this.ctx.createBiquadFilter(),this.wakeFilter.type="bandpass",this.wakeFilter.frequency.value=420,this.wakeFilter.Q.value=.9,this.wakeGain=this.ctx.createGain(),this.wakeGain.gain.value=0,v.connect(this.wakeFilter).connect(this.wakeGain).connect(this.ctx.destination),v.start()}toggle(){return this.init(),this.ctx?(this.ctx.state==="suspended"&&this.ctx.resume(),this.enabled=!this.enabled,!this.enabled&&this.surfGain&&(this.surfGain.gain.setTargetAtTime(0,this.ctx.currentTime,.15),this.wakeGain.gain.setTargetAtTime(0,this.ctx.currentTime,.15)),this.enabled):!1}update(t,e){if(!this.enabled||!this.ctx)return;const n=this.ctx.currentTime,s=.08+.035*Math.sin(t*.55);this.surfGain.gain.setTargetAtTime(s,n,.2);const r=Math.min(e/18,1);this.wakeGain.gain.setTargetAtTime(r*.16,n,.12),this.wakeFilter.frequency.setTargetAtTime(320+r*680,n,.12)}playDockChime(){if(!this.enabled||!this.ctx)return;const t=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((n,s)=>{const r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="sine",r.frequency.value=n,a.gain.setValueAtTime(1e-4,t+s*.08),a.gain.exponentialRampToValueAtTime(.07,t+s*.08+.03),a.gain.exponentialRampToValueAtTime(1e-4,t+s*.08+1.1),r.connect(a).connect(this.ctx.destination),r.start(t+s*.08),r.stop(t+s*.08+1.15)})}}const kg=`
  <svg width="0" height="0" style="position:absolute;pointer-events:none" aria-hidden="true">
    <defs>
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff0b8" />
        <stop offset="38%" stop-color="#dfb252" />
        <stop offset="72%" stop-color="#9e6f1a" />
        <stop offset="100%" stop-color="#f2cd74" />
      </linearGradient>
      <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="50%" stop-color="#c9d3dc" />
        <stop offset="100%" stop-color="#7c8a96" />
      </linearGradient>
      <linearGradient id="crimson-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#d93838" />
        <stop offset="100%" stop-color="#6b1010" />
      </linearGradient>
    </defs>
  </svg>
`,on={crest:`<svg viewBox="0 0 36 36" width="28" height="28">
    <circle cx="18" cy="18" r="16" fill="#231208" stroke="url(#gold-grad)" stroke-width="1.8" stroke-dasharray="3 1.5"/>
    <circle cx="18" cy="18" r="13" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1.2"/>
    <path d="M18 5 L20 11 L18 9.5 L16 11 Z" fill="url(#gold-grad)"/>
    <circle cx="18" cy="9.5" r="2.3" fill="none" stroke="url(#gold-grad)" stroke-width="1.6"/>
    <line x1="18" y1="12" x2="18" y2="27" stroke="url(#gold-grad)" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="12" y1="15.5" x2="24" y2="15.5" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <path d="M10.5 20.5 C10.5 26 14 28.5 18 28.5 C22 28.5 25.5 26 25.5 20.5" fill="none" stroke="url(#gold-grad)" stroke-width="2.1" stroke-linecap="round"/>
    <polygon points="8.5,21.5 10.5,18 13,21.5" fill="url(#gold-grad)"/>
    <polygon points="27.5,21.5 25.5,18 23,21.5" fill="url(#gold-grad)"/>
    <path d="M14 13 C16 17 20 19 20 23 C20 25 16 26 15 24" fill="none" stroke="#f5e6c4" stroke-width="1.1" stroke-dasharray="2 1"/>
  </svg>`,anchor:`<svg viewBox="0 0 28 28" width="20" height="20">
    <circle cx="14" cy="5.5" r="2.4" fill="none" stroke="url(#gold-grad)" stroke-width="2"/>
    <line x1="14" y1="8" x2="14" y2="23" stroke="url(#gold-grad)" stroke-width="2.3" stroke-linecap="round"/>
    <line x1="8.5" y1="11.5" x2="19.5" y2="11.5" stroke="url(#gold-grad)" stroke-width="2.1" stroke-linecap="round"/>
    <path d="M6.5 17 C6.5 22 10 24.5 14 24.5 C18 24.5 21.5 22 21.5 17" fill="none" stroke="url(#gold-grad)" stroke-width="2.2" stroke-linecap="round"/>
    <polygon points="4.5,18 6.8,14.5 9.2,18" fill="url(#gold-grad)"/>
    <polygon points="23.5,18 21.2,14.5 18.8,18" fill="url(#gold-grad)"/>
    <path d="M11 9.5 C16 13 17.5 17 12 20" fill="none" stroke="#f5e6c4" stroke-width="1.2"/>
  </svg>`,compass:`<svg viewBox="0 0 28 28" width="21" height="21">
    <circle cx="14" cy="14" r="11.5" fill="none" stroke="url(#gold-grad)" stroke-width="1.3" stroke-dasharray="2 1.5"/>
    <circle cx="14" cy="14" r="8.5" fill="rgba(20,10,4,0.55)" stroke="url(#gold-grad)" stroke-width="1"/>
    <polygon points="14,1.5 16.5,11.5 14,9.5 11.5,11.5" fill="#d93838"/>
    <polygon points="14,26.5 16.5,16.5 14,18.5 11.5,16.5" fill="url(#gold-grad)"/>
    <polygon points="1.5,14 11.5,11.5 9.5,14 11.5,16.5" fill="url(#gold-grad)"/>
    <polygon points="26.5,14 16.5,11.5 18.5,14 16.5,16.5" fill="url(#gold-grad)"/>
    <polygon points="5.5,5.5 12.5,11 11,12.5" fill="#b88932"/>
    <polygon points="22.5,5.5 17,12.5 15.5,11" fill="#b88932"/>
    <polygon points="5.5,22.5 11,15.5 12.5,17" fill="#b88932"/>
    <polygon points="22.5,22.5 15.5,17 17,15.5" fill="#b88932"/>
    <circle cx="14" cy="14" r="2.1" fill="#fff0b8" stroke="#2a1508" stroke-width="1"/>
  </svg>`,swords:`<svg viewBox="0 0 28 28" width="21" height="21">
    <path d="M5 4 C10 5 16 11 21 19 L19 20.5 C13 13 8 8 4 6 Z" fill="url(#silver-grad)"/>
    <path d="M23 4 C18 5 12 11 7 19 L9 20.5 C15 13 20 8 24 6 Z" fill="url(#silver-grad)"/>
    <path d="M18.5 18 C21 17 23.5 19.5 22 22.5 C20.5 24 18 22.5 17.5 21" fill="none" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="17" y1="20" x2="22.5" y2="17" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <path d="M9.5 18 C7 17 4.5 19.5 6 22.5 C7.5 24 10 22.5 10.5 21" fill="none" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="11" y1="20" x2="5.5" y2="17" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <polygon points="14,9 18,12 16.5,18 14,20 11.5,18 10,12" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1.3"/>
    <circle cx="14" cy="14" r="1.5" fill="url(#gold-grad)"/>
  </svg>`,sextant:`<svg viewBox="0 0 28 28" width="21" height="21">
    <circle cx="14" cy="6" r="2.5" fill="#231208" stroke="url(#gold-grad)" stroke-width="1.8"/>
    <path d="M4.5 19.5 A11.5 11.5 0 0 0 23.5 19.5" fill="none" stroke="url(#gold-grad)" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M6.5 17.5 A9.5 9.5 0 0 0 21.5 17.5" fill="none" stroke="#f5e6c4" stroke-width="1" stroke-dasharray="1.5 1.5"/>
    <line x1="14" y1="7.5" x2="6" y2="21" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="14" y1="7.5" x2="22" y2="21" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="14" y1="7.5" x2="16.5" y2="24" stroke="url(#silver-grad)" stroke-width="1.8" stroke-linecap="round"/>
    <rect x="7" y="12.5" width="14" height="2.2" rx="1" fill="url(#gold-grad)"/>
    <circle cx="16.5" cy="23.5" r="1.8" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1"/>
  </svg>`,scroll:`<svg viewBox="0 0 28 28" width="21" height="21">
    <path d="M7 5 H19 A2.5 2.5 0 0 1 21.5 7.5 V20.5 A2.5 2.5 0 0 1 19 23 H8 A2.5 2.5 0 0 1 5.5 20.5 V7.5 A2.5 2.5 0 0 1 8 5 Z" fill="#ebd5a7" stroke="url(#gold-grad)" stroke-width="1.5"/>
    <line x1="9" y1="9.5" x2="17.5" y2="9.5" stroke="#5c3818" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="9" y1="13" x2="16.5" y2="13" stroke="#5c3818" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="9" y1="16.5" x2="14" y2="16.5" stroke="#5c3818" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="18" cy="19.5" r="3.4" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1.2"/>
    <path d="M23.5 3.5 C19.5 6 17.5 11 16 15.5 L19.5 13 C22 10.5 24 7 23.5 3.5 Z" fill="#fffdf7" stroke="url(#gold-grad)" stroke-width="1"/>
  </svg>`,sun:`<svg viewBox="0 0 28 28" width="19" height="19">
    <g stroke="url(#gold-grad)" stroke-width="1.8" stroke-linecap="round">
      <line x1="14" y1="2" x2="14" y2="5"/>
      <line x1="14" y1="23" x2="14" y2="26"/>
      <line x1="2" y1="14" x2="5" y2="14"/>
      <line x1="23" y1="14" x2="26" y2="14"/>
      <line x1="5.5" y1="5.5" x2="7.8" y2="7.8"/>
      <line x1="20.2" y1="20.2" x2="22.5" y2="22.5"/>
      <line x1="22.5" y1="5.5" x2="20.2" y2="7.8"/>
      <line x1="7.8" y1="20.2" x2="5.5" y2="22.5"/>
    </g>
    <circle cx="14" cy="14" r="6" fill="url(#gold-grad)" stroke="#2a1508" stroke-width="1"/>
    <path d="M15.5 9.5 A4.5 4.5 0 0 0 15.5 18.5 A5 5 0 0 1 15.5 9.5 Z" fill="#2a1508" opacity="0.45"/>
  </svg>`,waves:`<svg viewBox="0 0 28 28" width="19" height="19">
    <circle cx="14" cy="14" r="11.5" fill="rgba(16,32,44,0.6)" stroke="url(#gold-grad)" stroke-width="1.5"/>
    <path d="M4 13.5 C6.5 10 9.5 10 12 13 C14.5 16 17.5 16 20 12.5 C21.5 10.5 23 11 24 12.5" fill="none" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <path d="M4.5 18.5 C7 15.5 10 15.5 12.5 18 C15 20.5 18 20.5 20.5 17.5 C22 16 23 16.5 23.5 17.5" fill="none" stroke="#f5e6c4" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,bell:`<svg viewBox="0 0 28 28" width="19" height="19">
    <path d="M10 4 H18" stroke="url(#gold-grad)" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M14 4 V6.5" stroke="url(#gold-grad)" stroke-width="2"/>
    <path d="M14 6.5 C9.5 6.5 7.5 10 7 15.5 L5 19.5 H23 L21 15.5 C20.5 10 18.5 6.5 14 6.5 Z" fill="url(#gold-grad)" stroke="#2a1508" stroke-width="1.2"/>
    <line x1="7" y1="16.5" x2="21" y2="16.5" stroke="#5c3818" stroke-width="1.3"/>
    <circle cx="14" cy="22" r="2.3" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1.2"/>
  </svg>`,dossier:`<svg viewBox="0 0 28 28" width="21" height="21">
    <rect x="3.5" y="5.5" width="21" height="17" rx="2" fill="#ebd5a7" stroke="url(#gold-grad)" stroke-width="1.6"/>
    <path d="M4 6.5 L14 15 L24 6.5" fill="none" stroke="#5c3818" stroke-width="1.5"/>
    <circle cx="14" cy="14.5" r="4.2" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1.3"/>
    <polygon points="14,11.8 14.9,13.6 16.8,13.9 15.4,15.2 15.8,17 14,16 12.2,17 12.6,15.2 11.2,13.9 13.1,13.6" fill="url(#gold-grad)"/>
  </svg>`,wheel:'<svg viewBox="0 0 100 100" width="56" height="56"><circle cx="50" cy="50" r="32" fill="none" stroke="#c89b3c" stroke-width="6"/><circle cx="50" cy="50" r="24" fill="none" stroke="#5c3818" stroke-width="3"/><g stroke="#c89b3c" stroke-width="4" stroke-linecap="round"><line x1="50" y1="4" x2="50" y2="96"/><line x1="4" y1="50" x2="96" y2="50"/><line x1="17" y1="17" x2="83" y2="83"/><line x1="83" y1="17" x2="17" y2="83"/></g><circle cx="50" cy="50" r="9" fill="#c89b3c" stroke="#2a1608" stroke-width="3"/></svg>'},Og=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];function zg(i){let t=((180-Bg(i))%360+360)%360;const e=Math.round(t/22.5)%16;return{deg:Math.round(t),dir:Og[e]}}function Bg(i){return i*180/Math.PI}class Gg{constructor({onSelectIsland:t,onUndock:e,onChangeTime:n,onChangeWaves:s,onToggleAudio:r}){this.onSelectIsland=t,this.onUndock=e,this.onChangeTime=n,this.onChangeWaves=s,this.onToggleAudio=r,this.visited=new Set(["home"]),this.activeIsland=null,this.nearIsland=null,this.atlasOpen=!1,this.atlasFilter="all",this.timePresets=[{id:"golden",label:"Golden Dusk"},{id:"noon",label:"High Noon"},{id:"sunset",label:"Crimson Horizon"},{id:"night",label:"Dead of Night"}],this.timeIdx=0,this.wavePresets=[{val:1,label:"Trade Swell"},{val:1.65,label:"Gale Seas"},{val:.45,label:"Dead Calm"}],this.waveIdx=0,this.buildDOM(),this.setupMinimapInteraction()}buildDOM(){const t=document.getElementById("ui-root");t.innerHTML=`
      ${kg}
      <!-- Top Carved Galleon Transom & Brass Navigator's Console -->
      <header class="topbar">
        <span class="brass-rivet tl"></span>
        <span class="brass-rivet tr"></span>
        <span class="brass-rivet bl"></span>
        <span class="brass-rivet br"></span>

        <div class="brand" id="btn-home-brand" title="Return to Captain's Haven">
          <div class="brand-emblem">
            <div class="brand-emblem-ring"></div>
            ${on.crest}
          </div>
          <div class="brand-text">
            <div class="brand-kicker">ADMIRAL OF THE FLEET</div>
            <div class="brand-name">Cap’n ${He.name}</div>
            <div class="brand-sub">${He.headline}</div>
          </div>
          <div class="visited-pill" id="visited-pill" title="Charted Isles">
            <span class="visited-crown">✦</span>
            <span id="visited-text">I / XIII</span>
            <small>CHARTED</small>
          </div>
        </div>

        <nav class="top-nav" aria-label="Archipelago Ledgers">
          <button class="nav-btn" data-cat="all" id="btn-atlas-toggle">
            <span class="nav-icon-frame">${on.compass}</span>
            <span class="nav-lbl">
              <small>ROYAL</small>
              <strong>Sea Chart</strong>
            </span>
            <span class="nav-seal">XIII</span>
          </button>
          <button class="nav-btn" data-cat="experience">
            <span class="nav-icon-frame">${on.swords}</span>
            <span class="nav-lbl">
              <small>NAVAL</small>
              <strong>Campaigns</strong>
            </span>
            <span class="nav-seal">II</span>
          </button>
          <button class="nav-btn" data-cat="project">
            <span class="nav-icon-frame">${on.sextant}</span>
            <span class="nav-lbl">
              <small>ARTIFICER</small>
              <strong>Contraptions</strong>
            </span>
            <span class="nav-seal">VII</span>
          </button>
          <button class="nav-btn" data-cat="education">
            <span class="nav-icon-frame">${on.scroll}</span>
            <span class="nav-lbl">
              <small>ROYAL</small>
              <strong>Academies</strong>
            </span>
            <span class="nav-seal">III</span>
          </button>
        </nav>

        <div class="top-actions">
          <button class="icon-btn" id="btn-time" title="Change Sky Watch">
            <span class="dial-icon">${on.sun}</span>
            <span class="dial-text">
              <small>WATCH</small>
              <strong id="lbl-time">${this.timePresets[0].label}</strong>
            </span>
          </button>
          <button class="icon-btn" id="btn-waves" title="Change Sea Swell">
            <span class="dial-icon">${on.waves}</span>
            <span class="dial-text">
              <small>WATERS</small>
              <strong id="lbl-waves">${this.wavePresets[0].label}</strong>
            </span>
          </button>
          <button class="icon-btn" id="btn-audio" title="Toggle Sea Shanty & Surf">
            <span class="dial-icon">${on.bell}</span>
            <span class="dial-text">
              <small>BELL</small>
              <strong id="lbl-audio">Muted</strong>
            </span>
          </button>
          <button class="cta-btn" id="btn-cv-modal">
            <span class="cta-icon">${on.dossier}</span>
            <span class="cta-text">
              <small>LETTERS OF MARQUE</small>
              <strong>Captain’s Dossier</strong>
            </span>
          </button>
        </div>
      </header>

      <!-- Sea Chart Gazetteer (Quick-Travel Parchment Map) -->
      <section class="atlas-panel hidden" id="atlas-panel">
        <div class="corner-ornament tl"></div>
        <div class="corner-ornament tr"></div>
        <div class="corner-ornament bl"></div>
        <div class="corner-ornament br"></div>
        <div class="atlas-header">
          <div>
            <div class="parchment-kicker">ROYAL ADMIRALTY GAZETTEER OF THE ARCHIPELAGO</div>
            <h3>Known Isles, Campaigns &amp; Contraptions</h3>
            <p>Plot a course for the helmsman with <b>Set Course</b>, or make immediate landfall with <b>Drop Anchor</b>.</p>
          </div>
          <button class="wax-close-btn" id="btn-atlas-close" aria-label="Close Gazetteer">✕</button>
        </div>
        <div class="atlas-filters" id="atlas-filters">
          <button class="filter-chip active" data-filter="all">All XIII Isles (13)</button>
          <button class="filter-chip" data-filter="about">Captain’s Haven</button>
          <button class="filter-chip" data-filter="experience">Naval Campaigns (2)</button>
          <button class="filter-chip" data-filter="project">Artificer Works (7)</button>
          <button class="filter-chip" data-filter="education">Royal Academies (3)</button>
        </div>
        <div class="atlas-grid" id="atlas-grid"></div>
      </section>

      <!-- Proximity Drop-Anchor Scroll Prompt -->
      <div class="dock-prompt hidden" id="dock-prompt">
        <div class="dock-prompt-inner" id="dock-prompt-btn">
          <div class="dock-wax-seal"><span>E</span></div>
          <div class="dock-prompt-text">
            <span class="dock-prompt-label" id="dock-prompt-cat">Naval Campaign</span>
            <strong id="dock-prompt-title">DP World</strong>
          </div>
          <span class="dock-prompt-cta">Drop Anchor &amp; Read Log &raquo;</span>
        </div>
      </div>

      <!-- Helmsman Autopilot Banner -->
      <div class="autopilot-banner hidden" id="autopilot-banner">
        <span>Helmsman steering for <strong id="autopilot-name"></strong></span>
        <button id="btn-autopilot-warp">Make Immediate Landfall</button>
        <button id="btn-autopilot-cancel" title="Take the Helm">✕</button>
      </div>

      <!-- Bottom-Left Ship's Binnacle & Rotating Helm Wheel -->
      <div class="helm-hud">
        <div class="helm-wheel-box" id="helm-wheel-graphic" title="Ship's Helm">
          ${on.wheel}
        </div>
        <div class="speed-box">
          <div class="speed-val" id="hud-speed">0.0</div>
          <div class="speed-unit">KNOTS</div>
          <div class="compass-bearing" id="hud-bearing">N · 000°</div>
        </div>
        <div class="helm-meta">
          <div class="helm-nearest" id="hud-nearest">Landfall: Sami Nouicer (45m)</div>
          <div class="helm-keys">
            <span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> Helm &amp; Sails</span>
            <span><kbd>Shift</kbd> Full Canvas</span>
            <span><kbd>E</kbd> Anchor</span>
            <span><kbd>M</kbd> Chart</span>
          </div>
        </div>
      </div>

      <!-- Touch Controls for Mobile / Tablet -->
      <div class="touch-controls" id="touch-controls">
        <div class="joystick-zone" id="joystick-zone">
          <div class="joystick-base">
            <div class="joystick-stick" id="joystick-stick"></div>
          </div>
        </div>
        <div class="touch-buttons">
          <button class="touch-btn" id="touch-boost">FULL SAIL</button>
          <button class="touch-btn" id="touch-dock">ANCHOR</button>
        </div>
      </div>

      <!-- Bottom-Right 17th-Century Parchment Sea Chart & Compass Rose -->
      <div class="minimap-wrap">
        <div class="minimap-bezel">
          <canvas id="minimap" width="224" height="224"></canvas>
        </div>
        <div class="minimap-tooltip hidden" id="minimap-tooltip"></div>
        <div class="minimap-caption">Click any isle on the chart to plot course</div>
      </div>

      <!-- Captain's Logbook (Island Inspection Tome) -->
      <aside class="island-drawer hidden" id="island-drawer">
        <div class="corner-ornament tl"></div>
        <div class="corner-ornament tr"></div>
        <div class="corner-ornament bl"></div>
        <div class="corner-ornament br"></div>
        <div class="drawer-top">
          <span class="drawer-badge" id="drawer-badge">Naval Campaign</span>
          <button class="wax-close-btn" id="btn-drawer-close" title="Weigh Anchor (Esc)">✕</button>
        </div>
        <div class="drawer-body" id="drawer-body"></div>
        <div class="drawer-footer">
          <button class="drawer-nav-btn" id="btn-prev-island">&laquo; Prev Isle</button>
          <button class="drawer-undock-btn" id="btn-undock-main">Weigh Anchor &amp; Set Sail</button>
          <button class="drawer-nav-btn" id="btn-next-island">Next Isle &raquo;</button>
        </div>
      </aside>

      <!-- Admiralty Dossier (Full CV & Letters of Marque Modal) -->
      <div class="cv-modal-backdrop hidden" id="cv-modal">
        <div class="cv-modal-card">
          <div class="corner-ornament tl"></div>
          <div class="corner-ornament tr"></div>
          <div class="corner-ornament bl"></div>
          <div class="corner-ornament br"></div>
          <div class="cv-modal-header">
            <div>
              <div class="parchment-kicker">LETTERS OF MARQUE &amp; FULL SERVICE RECORD</div>
              <h2>Cap’n ${He.name}</h2>
              <p>${He.headline} · ${He.location}</p>
            </div>
            <button class="wax-close-btn" id="btn-cv-close">✕</button>
          </div>
          <div class="cv-modal-content" id="cv-modal-content"></div>
        </div>
      </div>
    `,document.getElementById("btn-home-brand").addEventListener("click",()=>{const n=Me.find(s=>s.id==="home");this.onSelectIsland(n,"dock")}),document.querySelectorAll(".top-nav .nav-btn").forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.cat;this.atlasOpen&&this.atlasFilter===s?this.toggleAtlas(!1):(this.atlasFilter=s,this.toggleAtlas(!0),this.renderAtlas())})}),document.getElementById("btn-atlas-close").addEventListener("click",()=>this.toggleAtlas(!1)),document.querySelectorAll("#atlas-filters .filter-chip").forEach(n=>{n.addEventListener("click",()=>{this.atlasFilter=n.dataset.filter,this.renderAtlas()})}),document.getElementById("btn-time").addEventListener("click",()=>{this.timeIdx=(this.timeIdx+1)%this.timePresets.length;const n=this.timePresets[this.timeIdx];document.getElementById("lbl-time").textContent=n.label,this.onChangeTime(n.id)}),document.getElementById("btn-waves").addEventListener("click",()=>{this.waveIdx=(this.waveIdx+1)%this.wavePresets.length;const n=this.wavePresets[this.waveIdx];document.getElementById("lbl-waves").textContent=n.label,this.onChangeWaves(n.val)}),document.getElementById("btn-audio").addEventListener("click",n=>{const s=this.onToggleAudio();document.getElementById("lbl-audio").textContent=s?"Sea Sound":"Muted",n.currentTarget.classList.toggle("active",s)}),document.getElementById("dock-prompt-btn").addEventListener("click",()=>{this.nearIsland&&this.onSelectIsland(this.nearIsland,"dock")}),document.getElementById("btn-drawer-close").addEventListener("click",()=>this.onUndock()),document.getElementById("btn-undock-main").addEventListener("click",()=>this.onUndock()),document.getElementById("btn-prev-island").addEventListener("click",()=>this.stepIsland(-1)),document.getElementById("btn-next-island").addEventListener("click",()=>this.stepIsland(1)),document.getElementById("btn-autopilot-warp").addEventListener("click",()=>{this.autopilotIsland&&this.onSelectIsland(this.autopilotIsland,"dock")}),document.getElementById("btn-autopilot-cancel").addEventListener("click",()=>{this.onSelectIsland(null,"cancel")});const e=document.getElementById("cv-modal");document.getElementById("btn-cv-modal").addEventListener("click",()=>{this.renderFullCVModal(),e.classList.remove("hidden")}),document.getElementById("btn-cv-close").addEventListener("click",()=>{e.classList.add("hidden")}),e.addEventListener("click",n=>{n.target===e&&e.classList.add("hidden")}),this.renderAtlas()}toRoman(t){return["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII"][t]||String(t)}toggleAtlas(t){this.atlasOpen=t??!this.atlasOpen,document.getElementById("atlas-panel").classList.toggle("hidden",!this.atlasOpen),document.querySelectorAll(".top-nav .nav-btn").forEach(e=>{e.classList.toggle("active",this.atlasOpen&&e.dataset.cat===this.atlasFilter)})}renderAtlas(){document.querySelectorAll("#atlas-filters .filter-chip").forEach(n=>{n.classList.toggle("active",n.dataset.filter===this.atlasFilter)}),document.querySelectorAll(".top-nav .nav-btn").forEach(n=>{n.classList.toggle("active",this.atlasOpen&&n.dataset.cat===this.atlasFilter)});const t=document.getElementById("atlas-grid"),e=Me.filter(n=>this.atlasFilter==="all"||n.category===this.atlasFilter);t.innerHTML=e.map(n=>{const s=ei[n.category],r=this.visited.has(n.id);return`
          <div class="atlas-card" style="--cat: ${s.color}">
            <div class="atlas-card-top">
              <span class="atlas-cat">${on[s.icon]||""} ${s.label}</span>
              <span class="atlas-date">${n.date??""}</span>
            </div>
            <h4>${n.title} ${r?'<span class="visited-check" title="Charted">✦</span>':""}</h4>
            <p class="atlas-sub">${n.subtitle}</p>
            <div class="atlas-actions">
              <button class="atlas-sail-btn" data-id="${n.id}" data-mode="sail">Set Course</button>
              <button class="atlas-dock-btn" data-id="${n.id}" data-mode="dock">Drop Anchor</button>
            </div>
          </div>
        `}).join(""),t.querySelectorAll("button[data-id]").forEach(n=>{n.addEventListener("click",()=>{const s=Me.find(a=>a.id===n.dataset.id),r=n.dataset.mode;this.toggleAtlas(!1),this.onSelectIsland(s,r)})})}showIslandDetails(t){this.activeIsland=t,this.visited.add(t.id);const e=document.getElementById("visited-text");e&&(e.textContent=`${this.toRoman(this.visited.size)} / XIII`);const n=ei[t.category],s=document.getElementById("drawer-badge");s.innerHTML=`${on[n.icon]||""} <span>${n.label}</span>`,s.style.color=n.color,s.style.borderColor=n.color;const r=t.metrics&&t.metrics.length?`<div class="metrics-row">
            ${t.metrics.map(h=>`
              <div class="metric-card" style="--cat:${n.color}">
                <div class="metric-val">${h.value}</div>
                <div class="metric-lbl">${h.label}</div>
              </div>`).join("")}
          </div>`:"",a=t.bullets&&t.bullets.length?`<ul class="drawer-bullets">
            ${t.bullets.map(h=>`<li>${h}</li>`).join("")}
          </ul>`:"",o=t.tags&&t.tags.length?`<div class="drawer-tags-wrap">
            <div class="tags-heading">Articles of Craft &amp; Armament</div>
            <div class="drawer-tags">
              ${t.tags.map(h=>`<span class="tech-tag">${h}</span>`).join("")}
            </div>
          </div>`:"";let l="";t.skills&&(l=`
        <div class="skills-section">
          <h4>Ship’s Arsenal &amp; Technical Mastery</h4>
          ${Object.entries(t.skills).map(([h,d])=>`
            <div class="skill-group">
              <div class="skill-group-name">${h}</div>
              <div class="drawer-tags">
                ${d.map(u=>`<span class="tech-tag">${u}</span>`).join("")}
              </div>
            </div>`).join("")}
        </div>
        <div class="contact-links">
          <a href="mailto:${He.email}" class="contact-pill">Dispatch Letter (${He.email})</a>
          <a href="${He.linkedin}" target="_blank" rel="noopener" class="contact-pill">LinkedIn Ledger</a>
          <a href="${He.github}" target="_blank" rel="noopener" class="contact-pill">GitHub Foundry</a>
        </div>
      `);const c=document.getElementById("drawer-body");c.innerHTML=`
      <div class="drawer-header-block">
        <div class="log-entry-stamp">LOGBOOK ENTRY · LAT ${Math.abs(t.cz)}°${t.cz<=0?"N":"S"} LON ${Math.abs(t.cx)}°${t.cx>=0?"E":"W"}</div>
        <h2>${t.title}</h2>
        <div class="drawer-subtitle">${t.subtitle}</div>
        <div class="drawer-meta">
          ${t.org?`<span>Port: <b>${t.org}</b></span>`:""}
          ${t.date?`<span>Anno: <b>${t.date}</b></span>`:""}
        </div>
      </div>
      <div class="ink-divider"></div>
      ${r}
      <p class="drawer-summary">${t.summary}</p>
      ${a}
      ${o}
      ${l}
    `,document.getElementById("island-drawer").classList.remove("hidden"),document.getElementById("dock-prompt").classList.add("hidden")}hideIslandDetails(){this.activeIsland=null,document.getElementById("island-drawer").classList.add("hidden")}stepIsland(t){const n=((this.activeIsland?Me.findIndex(s=>s.id===this.activeIsland.id):0)+t+Me.length)%Me.length;this.onSelectIsland(Me[n],"dock")}setAutopilotBanner(t){this.autopilotIsland=t;const e=document.getElementById("autopilot-banner");t?(document.getElementById("autopilot-name").textContent=t.title,e.classList.remove("hidden")):e.classList.add("hidden")}update(t,e,n){document.getElementById("hud-speed").textContent=t.speedKnots.toFixed(1);const s=zg(t.heading);document.getElementById("hud-bearing").textContent=`${s.dir} · ${String(s.deg).padStart(3,"0")}°`;const r=document.getElementById("helm-wheel-graphic");if(r&&(this.wheelAngle=(this.wheelAngle||0)+(t.steer*55-(this.wheelAngle||0))*.15,r.style.transform=`rotate(${this.wheelAngle.toFixed(1)}deg)`),e){const o=Math.max(0,Math.round(n-e.radius));document.getElementById("hud-nearest").textContent=`Landfall: ${e.title} (${o} fathoms)`}const a=e?e.radius+32:0;if(e&&n<a&&!this.activeIsland){this.nearIsland=e;const o=ei[e.category],l=document.getElementById("dock-prompt");document.getElementById("dock-prompt-cat").textContent=o.label,document.getElementById("dock-prompt-title").textContent=e.title,l.classList.remove("hidden")}else this.nearIsland=null,document.getElementById("dock-prompt").classList.add("hidden");this.drawMinimap(t)}setupMinimapInteraction(){const t=document.getElementById("minimap"),e=document.getElementById("minimap-tooltip"),n=s=>{const r=t.getBoundingClientRect(),a=(s.clientX-r.left)/r.width*t.width,o=(s.clientY-r.top)/r.height*t.height,l=t.width/2,c=t.height/2,h=.25;let d=null,u=15;for(const f of Me){const m=l+f.cx*h,v=c+f.cz*h,g=Math.hypot(a-m,o-v);g<u&&(u=g,d=f)}return d};t.addEventListener("mousemove",s=>{const r=n(s);r?(t.style.cursor="pointer",e.textContent=`${r.title} (${ei[r.category].label})`,e.classList.remove("hidden")):(t.style.cursor="default",e.classList.add("hidden"))}),t.addEventListener("mouseleave",()=>{e.classList.add("hidden")}),t.addEventListener("click",s=>{const r=n(s);r&&this.onSelectIsland(r,"sail")})}drawMinimap(t){const e=document.getElementById("minimap"),n=e.getContext("2d"),s=e.width,r=e.height,a=s/2,o=r/2,l=s/2-3,c=.25;n.clearRect(0,0,s,r),n.save(),n.beginPath(),n.arc(a,o,l,0,Math.PI*2),n.clip();const h=n.createRadialGradient(a-18,o-18,12,a,o,l);h.addColorStop(0,"#f3e3c2"),h.addColorStop(.7,"#e2ca9c"),h.addColorStop(1,"#bfa06d"),n.fillStyle=h,n.fillRect(0,0,s,r),n.strokeStyle="rgba(105, 68, 32, 0.22)",n.lineWidth=.8;for(let f=0;f<16;f++){const m=f*Math.PI/8;n.beginPath(),n.moveTo(a,o),n.lineTo(a+Math.cos(m)*l,o+Math.sin(m)*l),n.stroke()}for(const f of[38,74,102])n.beginPath(),n.arc(a,o,f,0,Math.PI*2),n.stroke();if(t.autopilot){const f=a+t.autopilot.target.x*c,m=o+t.autopilot.target.y*c;n.save(),n.setLineDash([4,3]),n.strokeStyle="#8b1e1e",n.lineWidth=1.8,n.beginPath(),n.moveTo(a+t.position.x*c,o+t.position.z*c),n.lineTo(f,m),n.stroke(),n.restore(),n.strokeStyle="#8b1e1e",n.lineWidth=2.2,n.beginPath(),n.moveTo(f-5,m-5),n.lineTo(f+5,m+5),n.moveTo(f+5,m-5),n.lineTo(f-5,m+5),n.stroke()}for(const f of Me){const m=a+f.cx*c,v=o+f.cz*c,g=Math.max(4.5,f.radius*c*.85),p=ei[f.category];n.strokeStyle="rgba(92, 58, 28, 0.35)",n.lineWidth=.9,n.beginPath(),n.arc(m,v,g+2.5,0,Math.PI*2),n.stroke(),n.fillStyle=this.visited.has(f.id)?p.color:"#b8945f",n.strokeStyle="#3b2313",n.lineWidth=1.3,n.beginPath(),n.arc(m,v,g,0,Math.PI*2),n.fill(),n.stroke()}const d=a+t.position.x*c,u=o+t.position.z*c;n.save(),n.translate(d,u),n.rotate(Math.PI/2-t.heading),n.strokeStyle="rgba(139, 30, 30, 0.65)",n.lineWidth=1.2,n.beginPath(),n.moveTo(0,0),n.lineTo(18,0),n.stroke(),n.fillStyle="#8b1e1e",n.strokeStyle="#f8ecd4",n.lineWidth=1.2,n.beginPath(),n.moveTo(7.5,0),n.lineTo(-5,-4.5),n.lineTo(-3,0),n.lineTo(-5,4.5),n.closePath(),n.fill(),n.stroke(),n.restore(),n.strokeStyle="#3b2313",n.lineWidth=1.2;for(let f=0;f<36;f++){const m=f*Math.PI/18,v=f%3===0?l-7:l-4;n.beginPath(),n.moveTo(a+Math.cos(m)*v,o+Math.sin(m)*v),n.lineTo(a+Math.cos(m)*l,o+Math.sin(m)*l),n.stroke()}n.fillStyle="#7a1c1d",n.font='bold 12px "Pirata One", Georgia, serif',n.textAlign="center",n.fillText("N",a,18),n.fillStyle="#3b2313",n.font='10px "Cinzel", Georgia, serif',n.fillText("S",a,r-10),n.fillText("E",s-13,o+4),n.fillText("W",14,o+4),n.restore()}renderFullCVModal(){const t=document.getElementById("cv-modal-content"),e=Me.filter(o=>o.category==="experience"),n=Me.filter(o=>o.category==="project"),s=Me.filter(o=>o.category==="education"),r=Me.find(o=>o.id==="home"),a=o=>o.map(l=>`
        <div class="cv-item">
          <div class="cv-item-head">
            <div>
              <strong>${l.title}</strong> — <span>${l.subtitle}</span>
              ${l.org?`<small> · ${l.org}</small>`:""}
            </div>
            <div class="cv-item-right">
              <span class="cv-date">${l.date??""}</span>
              <button class="cv-jump-btn" data-jump="${l.id}">Sail to Isle &raquo;</button>
            </div>
          </div>
          <ul>${l.bullets.map(c=>`<li>${c}</li>`).join("")}</ul>
          <div class="drawer-tags">${l.tags.map(c=>`<span class="tech-tag">${c}</span>`).join("")}</div>
        </div>`).join("");t.innerHTML=`
      <div class="cv-banner">
        <p>${r.summary}</p>
        <p class="cv-avail"><strong>Commission Sought:</strong> ${He.availability}</p>
        <div class="contact-links">
          <a href="mailto:${He.email}" class="contact-pill">${He.email}</a>
          <a href="${He.linkedin}" target="_blank" rel="noopener" class="contact-pill">LinkedIn</a>
          <a href="${He.github}" target="_blank" rel="noopener" class="contact-pill">GitHub</a>
        </div>
      </div>

      <h3>Naval Campaigns (Professional Experience)</h3>
      ${a(e)}

      <h3>Artificer Contraptions (Technical Projects)</h3>
      ${a(n)}

      <h3>Royal Academies (Education)</h3>
      ${a(s)}
    `,t.querySelectorAll("button[data-jump]").forEach(o=>{o.addEventListener("click",()=>{const l=Me.find(c=>c.id===o.dataset.jump);document.getElementById("cv-modal").classList.add("hidden"),this.onSelectIsland(l,"dock")})})}}Me.forEach((i,t)=>pg(i,t)),mg(Me);const Hg=vg(Me),Ko=document.getElementById("webgl"),mn=new b0({canvas:Ko,antialias:!0,powerPreference:"high-performance"});mn.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),mn.setSize(window.innerWidth,window.innerHeight),mn.toneMapping=fl,mn.toneMappingExposure=1,mn.shadowMap.enabled=!0,mn.shadowMap.type=cl;const Bs=new lg;Bs.setSize(window.innerWidth,window.innerHeight),Bs.domElement.className="label-layer",document.getElementById("canvas-wrap").appendChild(Bs.domElement);const wi=new Nc,je=new Ge(52,window.innerWidth/window.innerHeight,.5,4500);je.position.set(12,11,64);const Gs=new _g(mn,wi),Hs=new Sg(mn,wi,je,Hg),Xr=new Lg(wi,Me),jt=new Ug(wi),Ph=new Ng(wi,Me),Qo=new Fg,Ft={yawOffset:0,pitchAngle:.34,distance:21,currentPos:new E(12,11,64),currentLook:new E(0,2,20),dragging:!1,dragMoved:!1,lastX:0,lastY:0,dockedIsland:null,dockOrbitAngle:0};let ii=Me[0],cs=1/0;function hs(i,t=!1){if(i){if(jt.setAutopilot(null),Je.setAutopilotBanner(null),t){const e=i.dockAngle+Math.PI;jt.teleportTo(i.moor,e)}else jt.velocity.multiplyScalar(.15);Ft.dockedIsland=i,Ft.dockOrbitAngle=i.dockAngle+.55,Qo.playDockChime(),Je.showIslandDetails(i)}}function kn(){Ft.dockedIsland=null,Je.hideIslandDetails()}const Je=new Gg({onSelectIsland(i,t){if(t==="cancel"||!i){jt.setAutopilot(null),Je.setAutopilotBanner(null);return}t==="dock"?hs(i,!0):t==="sail"&&(kn(),jt.setAutopilot(i.moor,i),Je.setAutopilotBanner(i))},onUndock(){kn()},onChangeTime(i){Gs.setTimePreset(i),mn.toneMappingExposure=i==="night"?.68:i==="sunset"?.9:.95},onChangeWaves(i){cg(i),Hs.refreshWaves()},onToggleAudio(){return Qo.toggle()}});jt.onAutopilotArrive=i=>{Je.setAutopilotBanner(null),hs(i,!1)},Xr.items.forEach(i=>{i.labelEl.style.pointerEvents="auto",i.labelEl.addEventListener("click",t=>{t.stopPropagation(),Math.hypot(jt.position.x-i.data.cx,jt.position.z-i.data.cz)<i.data.radius+36?hs(i.data,!1):(kn(),jt.setAutopilot(i.data.moor,i.data),Je.setAutopilotBanner(i.data))})});const Ke=new Set;window.addEventListener("keydown",i=>{const t=i.key.toLowerCase();Ke.add(t),["arrowup","arrowdown","arrowleft","arrowright"," "].includes(t)&&i.preventDefault(),["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(t)&&Ft.dockedIsland&&kn(),t==="e"||t==="enter"?Ft.dockedIsland?kn():ii&&cs<ii.radius+32&&hs(ii,!1):t==="escape"?document.getElementById("cv-modal").classList.contains("hidden")?Je.atlasOpen?Je.toggleAtlas(!1):Ft.dockedIsland?kn():jt.autopilot&&(jt.setAutopilot(null),Je.setAutopilotBanner(null)):document.getElementById("cv-modal").classList.add("hidden"):t==="m"&&Je.toggleAtlas()}),window.addEventListener("keyup",i=>{Ke.delete(i.key.toLowerCase())});const Ih=new ag,tl=new et;Ko.addEventListener("pointerdown",i=>{i.button===0&&(Ft.dragging=!0,Ft.dragMoved=!1,Ft.lastX=i.clientX,Ft.lastY=i.clientY)}),window.addEventListener("pointermove",i=>{if(!Ft.dragging)return;const t=i.clientX-Ft.lastX,e=i.clientY-Ft.lastY;Math.hypot(t,e)>4&&(Ft.dragMoved=!0),Ft.lastX=i.clientX,Ft.lastY=i.clientY,Ft.yawOffset-=t*.0055,Ft.dockOrbitAngle-=t*.0055,Ft.pitchAngle=Pe.clamp(Ft.pitchAngle+e*.004,.14,1.05)}),window.addEventListener("pointerup",i=>{if(Ft.dragging&&(Ft.dragging=!1,!Ft.dragMoved)){tl.x=i.clientX/window.innerWidth*2-1,tl.y=-(i.clientY/window.innerHeight)*2+1,Ih.setFromCamera(tl,je);const t=Ih.intersectObjects(Xr.pickables,!0);if(t.length>0){let e=t[0].object;for(;e&&!e.userData.islandId;)e=e.parent;if(e&&e.userData.islandId){const n=Me.find(s=>s.id===e.userData.islandId);n&&(Math.hypot(jt.position.x-n.cx,jt.position.z-n.cz)<n.radius+36?hs(n,!1):(kn(),jt.setAutopilot(n.moor,n),Je.setAutopilotBanner(n)))}}}}),Ko.addEventListener("wheel",i=>{i.preventDefault(),Ft.distance=Pe.clamp(Ft.distance+i.deltaY*.018,11,52)},{passive:!1});const Ve={x:0,y:0,active:!1,boost:!1},Ei=document.getElementById("joystick-zone"),el=document.getElementById("joystick-stick");if(Ei&&el){const i=(n,s)=>{const r=Ei.getBoundingClientRect(),a=r.left+r.width/2,o=r.top+r.height/2,l=r.width*.38;let c=n-a,h=s-o;const d=Math.hypot(c,h);d>l&&(c=c/d*l,h=h/d*l),el.style.transform=`translate(${c}px, ${h}px)`,Ve.x=c/l,Ve.y=-h/l};Ei.addEventListener("pointerdown",n=>{n.stopPropagation(),Ve.active=!0,Ei.setPointerCapture(n.pointerId),Ft.dockedIsland&&kn(),i(n.clientX,n.clientY)}),Ei.addEventListener("pointermove",n=>{Ve.active&&i(n.clientX,n.clientY)});const t=()=>{Ve.active=!1,Ve.x=0,Ve.y=0,el.style.transform="translate(0px, 0px)"};Ei.addEventListener("pointerup",t),Ei.addEventListener("pointercancel",t);const e=document.getElementById("touch-boost");e.addEventListener("pointerdown",()=>Ve.boost=!0),e.addEventListener("pointerup",()=>Ve.boost=!1),e.addEventListener("pointerleave",()=>Ve.boost=!1),document.getElementById("touch-dock").addEventListener("click",()=>{Ft.dockedIsland?kn():ii&&hs(ii,cs>ii.radius+32)})}window.addEventListener("resize",()=>{const i=window.innerWidth,t=window.innerHeight;je.aspect=i/t,je.updateProjectionMatrix(),mn.setSize(i,t),Bs.setSize(i,t),Hs.setSize(i,t)});const nl=document.getElementById("loader");nl&&(setTimeout(()=>nl.classList.add("fade-out"),250),setTimeout(()=>nl.remove(),950));const Lh=new rg,il=new E,sl=new E,Dh=new E,Vg=[jt.sprayPoints,jt.targetMarker,Ph.group];function Uh(){requestAnimationFrame(Uh);const i=Math.min(Lh.getDelta(),.05),t=Lh.elapsedTime;Yo.time=t;let e=0,n=0;(Ke.has("w")||Ke.has("arrowup")||Ke.has("z"))&&(e+=1),(Ke.has("s")||Ke.has("arrowdown"))&&(e-=1),(Ke.has("a")||Ke.has("arrowleft")||Ke.has("q"))&&(n-=1),(Ke.has("d")||Ke.has("arrowright"))&&(n+=1),Ve.active&&(e=Ve.y,n=Ve.x),jt.throttle=Pe.clamp(e,-1,1),jt.steer=Pe.clamp(n,-1,1),jt.boost=Ke.has("shift")||Ve.boost,!Ft.dragging&&Math.abs(jt.throttle)>.1&&(Ft.yawOffset=Pe.lerp(Ft.yawOffset,0,i*1.4)),jt.update(i,t),Hs.setWake(jt.wake),cs=1/0;for(const r of Xr.items){const a=Math.hypot(jt.position.x-r.data.cx,jt.position.z-r.data.cz);a<cs&&(cs=a,ii=r.data);const o=Math.hypot(je.position.x-r.data.cx,je.position.z-r.data.cz),c=o<360&&(!Ft.dockedIsland||Ft.dockedIsland.id!==r.data.id)?Math.round(Pe.clamp(1-(o-180)/180,.25,1)*20)/20:0;r._lastOpacity!==c&&(r._lastOpacity=c,r.labelEl.style.opacity=String(c));const h=a<r.data.radius+32;r._lastNear!==h&&(r._lastNear=h,r.labelEl.classList.toggle("is-near",h))}if(Ft.dockedIsland){const r=Ft.dockedIsland;Ft.dragging||(Ft.dockOrbitAngle+=i*.18);const a=r.radius*1.35+14,o=r.plateauH+11;il.set(r.cx+Math.cos(Ft.dockOrbitAngle)*a,o,r.cz+Math.sin(Ft.dockOrbitAngle)*a),Dh.set(-Math.sin(Ft.dockOrbitAngle),0,Math.cos(Ft.dockOrbitAngle)),sl.set(r.cx,r.plateauH+4.5,r.cz).addScaledVector(Dh,7.5)}else{const r=jt.heading+Math.PI+Ft.yawOffset,a=Math.cos(Ft.pitchAngle)*Ft.distance,o=Math.sin(Ft.pitchAngle)*Ft.distance;il.set(jt.position.x+Math.sin(r)*a,Math.max(2.2,jt.position.y+o),jt.position.z+Math.cos(r)*a),sl.set(jt.position.x+Math.sin(jt.heading)*4.5,jt.position.y+1.8,jt.position.z+Math.cos(jt.heading)*4.5)}const s=1-Math.exp(-6.5*i);Ft.currentPos.lerp(il,s),Ft.currentLook.lerp(sl,s),je.position.copy(Ft.currentPos),je.lookAt(Ft.currentLook),Gs.update(i,jt.position),Xr.update(t,i,je),Ph.update(t,je),Hs.update(t,Gs.sunDir,Gs.sunColor,Gs.fog),Qo.update(t,jt.speedKnots),Je.update(jt,ii,cs),Hs.renderReflection(Vg),mn.render(wi,je),Bs.render(wi,je)}Uh()})();
