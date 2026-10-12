// All lesson text and questions are drawn from QTS_Level2_Study_Guide.md (citing the L2 transcripts) and QTS_Homework_Forecasts.md.
window.QTS_MODULES=[
{id:'algos',title:'Time algos & the 45/90/180 counts',drills:['count','window','nextalgo'],
lesson:`<p>Count <b>trading bars</b> (trading days only, no weekend gaps) from a significant top or bottom. A reversal is expected when the count reaches a division of the 360° circle <span class="src">[L2-1 00:30:06–00:42:47]</span>.</p>
<table><tr><th>Division</th><th>Algos</th><th>Note</th></tr>
<tr><td>÷8 (÷2, ÷4)</td><td>45, 90, 135, 180, 225, 270, 315, 360</td><td>"common to all commodities or indexes"</td></tr>
<tr><td>÷3 / ÷6</td><td>60, 120, 180, 240, 300</td><td>120 is "a very big algo"</td></tr>
<tr><td>÷5</td><td>72, 144, 216, 288</td><td>use <b>only after validation</b></td></tr>
<tr><td>minor</td><td>36, 108, 252</td><td>half-steps of 72</td></tr>
<tr><td>extra</td><td>50, 100 (150 on Nikkei)</td><td>"50 are very active"</td></tr></table>
<p><b>Strength:</b> 180 (circle in two) and 360 ("closing of the circle") are strongest, then 90 and 270; 45 "is not bad" <span class="src">[L2-2 01:17:43]</span>. Counts above 360 wrap: 405→45, 540→180.</p>
<p><b>Time window:</b> algo <b>±2 bars</b> below 90; <b>±3 bars</b> for 90 and above (90 → bars 87–93; 45 → 43–47) <span class="src">[L2-1 01:00:53–01:06:43]</span>.</p>
<p>Repeat counts on monthly, weekly and daily. Several algos on the same bar (a <b>cluster</b>) or agreement across timeframes = stronger signal.</p>
<p>The chart below takes a real major pivot and shades the 45, 90 and 180 windows in trading bars. Press <i>New example</i> to load another.</p>`,
chart:'algos',
quiz:[
{q:'What do you count for a daily time algo?',o:['Trading days (bars) from a significant top or bottom','Calendar days including weekends','Days since the start of the month','Bars since the last eighth was touched'],a:0,e:'Count trading-day bars only; calendar days are "not forbidden" but mixing is "very confusing" [L2-1 00:41:46].'},
{q:'The time window for a 60 algo is:',o:['Bars 58–62','Bars 57–63','Bars 59–61','Bars 55–65'],a:0,e:'Below 90 the window is ±2 bars [L2-1 01:00:53].'},
{q:'The time window for a 135 algo is:',o:['Bars 132–138','Bars 133–137','Bars 130–140','Bar 135 only'],a:0,e:'90 and above use ±3 bars; "135 opens 132" [L2-2 02:50:33].'},
{q:'A count of 540 bars should be read as:',o:['180','360','90','It is ignored'],a:0,e:'Counts above 360 wrap: 540 − 360 = 180 [L2-2 01:11:59].'},
{q:'Which algos does the instructor call the strongest?',o:['180 and 360','45 and 50','72 and 144','36 and 108'],a:0,e:'"The strongest setup comes from the division of the circle in two parts, 180" and the closing of the circle, 360 [L2-2 01:17:43].'},
{q:'Which family should be used only after validation on that market?',o:['÷5 (72, 144, 216, 288)','÷8 (45, 90, 135, 180)','÷2 (180, 360)','None — all are universal'],a:0,e:'The ÷8 family is common to all markets; ÷5 and minor algos need validation [L2-2 00:06:06].'},
{q:'Order of timeframes to study:',o:['Monthly, then weekly, then daily','Daily, then weekly, then monthly','Only daily','Weekly only'],a:0,e:'Start at the top timeframe [L2-1].'},
{q:'108 is built as:',o:['72 + 36','90 + 18','120 − 12','45 + 63'],a:0,e:'108 = 72 + 36, a minor algo [L2-1 00:51:04].'}]},
{id:'setup',title:'Price-time setup, eighths & stops',drills:['eighth','setup'],
lesson:`<blockquote>"To open a new trade, you need price and time at the same time… But to close an already open position and take profit, you just need price." <span class="src">[L2-1 01:11:45]</span></blockquote>
<p><b>Price side:</b> Gann eighths of a range — 12.5, 25, 37.5, 50, 62.5, 75, <b>87.5% (the "death line")</b>; thirds 33/66% also appear. Most important: 25, 50, 75, 87.5. Double/triple tops and bottoms also count.</p>
<p><b>Time side:</b> an open time window. When price hits a level, ask whether a window is open; when a window opens, ask where price is. If price is "in the middle of nowhere," <b>wait</b> — at most until the window closes <span class="src">[L2-1 01:02:13]</span>.</p>
<p><b>Lost motion & stops:</b> measure how far price overshot that eighth before (about the last six months), then stop = level ± (overshoot + buffer), or just beyond the bar that pierced the level.</p>
<table><tr><th>Example</th><th>Overshoot</th><th>Stop</th></tr><tr><td>Gold 87.5% near ATH</td><td>15</td><td>20–25</td></tr><tr><td>Gold 37.5%</td><td>17</td><td>25</td></tr><tr><td>S&P illustration</td><td>20</td><td>30</td></tr><tr><td>Coffee 87.5% (199)</td><td>~2.5</td><td>4 → 203</td></tr></table>
<p><b>Entries:</b> limit at the level; aggressive touch; conservative retest (double bottom/top just beyond the eighth); aggressive near-miss at the close. <b>Worked example (gold 240):</b> double bottom on 25% at bar 239 → window 237–243 open → buy; target one or two eighths higher.</p>
<p>The chart draws the eighths of a real range. Press <i>New example</i>.</p>`,
chart:'eighths',
quiz:[
{q:'To OPEN a new trade the course requires:',o:['Price at a level AND an open time window','Price at any eighth','A time window alone','Two closes beyond the level'],a:0,e:'Price and time at the same time [L2-1 01:11:45].'},
{q:'To CLOSE a position and take profit you need:',o:['Just price','Price and time','A new time window','A Master Time Factor date'],a:0,e:'"To close… you just need price."'},
{q:'The 87.5% level is called:',o:['The death line','The compass','The mother bar','The jubilee'],a:0,e:'7/8 = death line: touch, fail to close above, plus a time algo → sell.'},
{q:'A window opens but price is "in the middle of nowhere." You:',o:['Wait, at most until the window closes','Enter anyway','Skip all windows for a month','Enter at the window midpoint'],a:0,e:'[L2-1 01:02:13–01:03:19].'},
{q:'In QTS, "volatility" for stops means:',o:['How far price overshot the eighths over roughly the last six months','Historical volatility indicator','VIX level','Average true range of 14 days'],a:0,e:'Lost motion near the eighths [L2-1 00:05:34].'},
{q:'Coffee short at the 87.5% line at 199 with ~2.5 points of lost motion. Stop used:',o:['203','201','199.5','210'],a:0,e:'199 + 4 = 203 [L2-1 02:44:15].'},
{q:'Gold 240 example: window open at bar 237 but price not at a level. At bar 239 price is on the 25% double bottom. Action:',o:['Buy at bar 239','Buy at bar 237','Sell at 239','No trade, window wasted'],a:0,e:'Wait for price to reach the level inside the window [L2-1 02:24:13].'},
{q:'The "conservative" entry is:',o:['Wait for overshoot and a retest forming a double bottom/top beyond the eighth','Enter on the first touch','Enter before the window','Use a market order mid-range'],a:0,e:'The instructor corrects himself: the touch entry is the aggressive one [L2-1 00:22:21–00:24:53].'}]},
{id:'validate',title:'Validation of time families',drills:['validate'],
lesson:`<blockquote>"The key is to validate the time algo on that certain security you want to study… some commodities like to react on a certain division, five or three or 45, much more than other time divisions." <span class="src">[L2-1 00:52:24]</span></blockquote>
<ol><li>An algo from a family (e.g. 252, ÷5) shows up at today's level test.</li><li>Go back through past swings of the <b>same market</b>: did that family mark turns? (Coffee had 140/144-day swings → ÷5 "quite active".)</li><li>Only then use it. The ÷8 family needs less proof.</li></ol>
<p><b>Your homework backtest</b> (2005–mid-2025, share of major pivots where a swing landed in the window, random baseline in brackets). Edges are small — this is exactly why the course says validate:</p>
<table><tr><th>Market</th><th>45</th><th>90</th><th>180</th></tr><tr><td>Gold</td><td>37% (32)</td><td>44% (43)</td><td>44% (43)</td></tr><tr><td>Nikkei</td><td>32% (28)</td><td>42% (39)</td><td>42% (39)</td></tr><tr><td>Coffee</td><td>25% (32)</td><td><b>51% (43)</b></td><td><b>52% (42)</b></td></tr><tr><td>S&P 500</td><td>36% (29)</td><td>34% (39)</td><td>39% (40)</td></tr></table>`,
chart:'validate',
quiz:[
{q:'Why validate before trusting a time family?',o:['Markets react to some circle divisions more than others','Because Gann Trader requires it','To find the eighths','To compute lot size'],a:0,e:'[L2-1 00:52:24].'},
{q:'In your homework backtest, which market/algos showed the clearest edge over random?',o:['Coffee 90 and 180','S&P 90 and 180','Coffee 45','Gold 90'],a:0,e:'Coffee 90: 51% vs 43%; 180: 52% vs 42%.'},
{q:'Coffee\'s 45 count in the backtest was:',o:['Below chance (25% vs 32%)','Its strongest algo','Exactly at chance','Not tested'],a:0,e:'So a coffee 45 window gets low weight.'},
{q:'The coffee 252-day short was trusted because:',o:['Past coffee swings showed ÷5 counts (140/144) were active','252 is always strong','It was a weekly 360','The MTF said so'],a:0,e:'[L2-1 02:38:48–02:42:56].'},
{q:'A "random baseline" in the backtest means:',o:['How often a randomly placed window of the same width would hit','The average daily range','The S&P return','Gann\'s own forecast'],a:0,e:'Homework Part 2: the honest yardstick.'}]},
{id:'accel',title:'Acceleration & stop-and-reverse',drills:['sar'],
lesson:`<p>Reversal and acceleration "are two sides of the same coin… of the expansion of the trend." <b>Acceleration</b>: a full price-time setup occurs and price keeps going (higher highs/higher lows or lower lows/lower highs). It is <b>not</b> a failure of the method — "it's a very, very big mistake" to think so <span class="src">[L2-2 00:07:32–00:16:58]</span>.</p>
<p>The book: about <b>70%</b> of setups reverse; in the other 30% "we very often see a steady continuation… very fast run-up or dramatic plunge."</p>
<p><b>Stop-and-reverse:</b> if long 2 contracts on a major setup and the stop is hit, close the long <b>and</b> open the same size short — e.g. one stop order for 4 contracts (2 to close, 2 to reverse). "I hope to be stopped" <span class="src">[L2-2 00:15:53–00:28:51]</span>.</p>
<p>Market note: short setups on S&P/Nasdaq often accelerate.</p>`,
chart:null,
quiz:[
{q:'Long 2 contracts on a major setup; the stop is hit. Per SAR you:',o:['Sell 4: close 2 and open 2 short','Sell 2 and stay flat','Buy 2 more','Wait for the next window'],a:0,e:'Same size in the opposite direction [L2-2 00:15:53].'},
{q:'Acceleration means:',o:['The setup occurs but the trend continues through it','The setup reversed fast','The window was missed','Price never reached the level'],a:0,e:'[L2-2 00:09:44].'},
{q:'Roughly what share of setups reverse per the book?',o:['About 70%','About 30%','About 95%','About 50%'],a:0,e:'Book p.156–157: "seven out of 10 times."'},
{q:'A stopped-out major setup should be viewed as:',o:['A temporary loss that can turn into a big gain via SAR','Proof the method failed','A reason to stop trading the market','A signal to double the original position'],a:0,e:'[L2-2 00:27:40].'},
{q:'Which markets does the instructor say often accelerate on short setups?',o:['S&P / Nasdaq','Coffee','Gold','Nikkei'],a:0,e:'[L2-2 00:21:00].'}]},
{id:'mtf',title:'Master Time Factor',drills:['mtf'],
lesson:`<p>An annual turning-point forecast built from what the market did <b>30, 20 and 10 years</b> earlier (add 60 if you have it; no other cycles, or "every month you're gonna have a turning point") <span class="src">[L2-2 03:17:59]</span>. 60 years is the Master Time Period; 49–50 the Jubilee.</p>
<ol><li>On a <b>daily</b> chart, list each month's major tops and bottoms for the years Y−30, Y−20, Y−10.</li>
<li>Overlay by calendar date. Where turns from <b>different decades</b> fall within <b>about 15 days</b>, join them: e.g. top 2 Mar 2007 + top 7 Mar 1997 → "reversal between 2 and 7 March".</li>
<li>Polarity: all tops → top, all bottoms → bottom, mixed → "top or bottom". Polarity is only an indication — if price falls into a "top" window, expect a low.</li>
<li>A turn a few days outside still counts ("if it happens on the 10th of March it is still correct").</li>
<li><b>Validate (mandatory):</b> build the chart for the year just finished; trust the new year only if ~"three out of four" hit.</li>
<li><b>Never trade the date alone</b> — confirm with weekly/daily algos and a price level.</li></ol>
<p><b>Your homework MTF backtest:</b> Gold 77% vs 65% random; Nikkei 65% vs 64%; Coffee 66% vs 65%; S&P 56% vs 59%. None passed "3 of 4" on 2026 year-to-date, so treat this year's MTF dates as lower reliability.</p>
<p>The chart shows the real decade years overlaid on one calendar for a market. Press <i>New example</i>.</p>`,
chart:'mtf',
quiz:[
{q:'Which cycles build the MTF chart?',o:['30, 20 and 10 years (plus 60 if available)','1, 2 and 3 years','7, 14 and 21 years','Every cycle you can find'],a:0,e:'[L2-2 03:17:59].'},
{q:'Turns from different decades are joined when within about:',o:['15 days','2 bars','45 days','3 months'],a:0,e:'[L2-2 03:19:15].'},
{q:'2 Mar 2007 top + 7 Mar 1997 top give the forecast:',o:['Reversal between 2 and 7 March','Top on 2 March only','Bottom 7 March','No forecast'],a:0,e:'Window = earliest to latest matched date.'},
{q:'Before trusting next year\'s MTF chart you must:',o:['Build it for the year just finished and check it hit ~3 of 4','Check the VIX','Confirm with the 60-year cycle only','Nothing'],a:0,e:'Mandatory validation [L2-2 03:21:44].'},
{q:'Price has been falling into a forecast "top" window. Expect:',o:['A low there instead','A top anyway','No turn','Acceleration up'],a:0,e:'Polarity is only an indication [L2-2 03:40:38].'},
{q:'For the 2018 gold forecast the years used were:',o:['1988, 1998, 2008','1981, 1991, 2001','2015, 2016, 2017','1958, 1978, 1998'],a:0,e:'Y−30, Y−20, Y−10.'},
{q:'Should you go short simply because the MTF says "27 April top"?',o:['No — confirm with time algos and price','Yes, the MTF is 80% reliable','Yes if it is a 60-year cycle','Only on weekly charts'],a:0,e:'"I cannot rely my trading on this…"'},
{q:'In the homework backtest which market beat random most clearly on MTF?',o:['Gold','S&P 500','Coffee','Nikkei'],a:0,e:'77% vs 65%, small sample.'}]}
];
window.QTS_LIVE=[
{m:'S&P 500',k:'GSPC',w:[['2026-10-12','2026-10-21','Reversal — High (strongest cluster): MTF Oct 10–21 + daily 180/135/90/45'],['2026-11-13','2026-11-26','Reversal — Medium-High: MTF Nov 16–26 + daily 45 + weekly 90wk']]},
{m:'Gold',k:'GCF',w:[['2026-10-13','2026-10-21','Likely LOW if decline continues — Medium: daily 180 from Jan 29 ATH + weekly 270wk/180wk'],['2026-11-16','2026-11-24','Major reversal — Medium-High: daily 360 from Jun 16 2025 top + daily 270']]},
{m:'Nikkei 225',k:'N225',w:[['2026-10-29','2026-11-04','Reversal (top or bottom) — High: MTF + daily 90 from Jun 22 record top'],['2026-11-18','2026-11-27','Major reversal — High: daily 180 from Feb 26 top + weekly 135/270 + MTF']]},
{m:'Coffee',k:'KCF',w:[['2026-10-12','2026-10-22','BOTTOM (or top if bounce runs in) — High: MTF lows + daily 90 + weekly 135wk'],['2026-11-06','2026-11-17','Reversal — Medium-High: daily 180 from Feb 24 low (best-validated)']]}];
window.QTS_SEED_LOG=[["2026-10-11", "Gold (GC=F)", "2026-10-13 to 2026-10-21", "Reversal - likely low if decline continues", "", "", "Medium: daily 180 from 2026-01-29 ATH top; weekly 270wk/180wk ~Oct 16"], ["2026-10-11", "Gold (GC=F)", "2026-10-26 to 2026-10-30", "Minor reversal", "", "", "Low: daily 45 from 2026-08-25 top"], ["2026-10-11", "Gold (GC=F)", "2026-11-02 to 2026-11-10", "Reversal (top if rallying)", "", "", "Medium-Low: daily 90 from 2026-06-30 low; weekly 270wk ~Nov 6"], ["2026-10-11", "Gold (GC=F)", "2026-11-16 to 2026-11-24", "Major reversal", "", "", "Medium-High: daily 360 from 2025-06-16 top + daily 270 from 2025-10-20 top"], ["2026-10-11", "Gold (GC=F)", "2026-12-01 to 2026-12-15", "Top or bottom", "", "", "Medium: MTF 2006 top Dec 1 + 2016 low Dec 15; weekly 180wk/45wk ~Dec 11"], ["2026-10-11", "Nikkei 225 (^N225)", "2026-10-15 to 2026-10-23", "Reversal", "", "", "Medium: daily 135 from 2026-03-31 low; weekly 135wk/270wk ~Oct 23"], ["2026-10-11", "Nikkei 225 (^N225)", "2026-10-29 to 2026-11-04", "Reversal (top or bottom)", "", "", "High: MTF Oct 18-Nov 1 (1996/2006/1966) + daily 90 from 2026-06-22 top"], ["2026-10-11", "Nikkei 225 (^N225)", "2026-11-07 to 2026-11-09", "Top or bottom", "", "", "Low: MTF 1966 top + 2016 low"], ["2026-10-11", "Nikkei 225 (^N225)", "2026-11-18 to 2026-11-27", "Major reversal", "", "", "High: daily 180 from 2026-02-26 top; weekly 135wk/270wk ~Nov 20; MTF Nov 27-Dec 5"], ["2026-10-11", "Coffee (KC=F)", "2026-10-12 to 2026-10-22", "Bottom (top if bounce runs into it)", "", "", "High: MTF 2016+2006 lows; daily 90 from 2026-06-09 low; weekly 135wk ~Oct 23"], ["2026-10-11", "Coffee (KC=F)", "2026-10-26 to 2026-10-30", "Minor reversal", "", "", "Low: daily 45 from 2026-08-24 top (45 below chance on coffee)"], ["2026-10-11", "Coffee (KC=F)", "2026-11-06 to 2026-11-17", "Reversal", "", "", "Medium-High: daily 180 from 2026-02-24 low; weekly 360wk/90wk ~Nov 6"], ["2026-10-11", "Coffee (KC=F)", "2026-11-18 to 2026-12-02", "Reversal", "", "", "Medium: daily 270 from 2025-10-23 top; weekly 135wk ~Nov 20; daily 45 from 2026-09-23 low"], ["2026-10-11", "S&P 500 (^GSPC)", "2026-10-12 to 2026-10-21", "Reversal (Oct 6 top may be it)", "", "", "High: MTF Oct 10-21 + daily 180/135/90/45 counts"], ["2026-10-11", "S&P 500 (^GSPC)", "2026-10-26 to 2026-11-04", "Top or bottom", "", "", "Low-Medium: MTF only (2006/2016)"], ["2026-10-11", "S&P 500 (^GSPC)", "2026-11-13 to 2026-11-26", "Reversal", "", "", "Medium-High: MTF Nov 16-26 + daily 45 from 2026-09-16 low + weekly 90wk ~Nov 13"], ["2026-10-11", "S&P 500 (^GSPC)", "2026-11-24 to 2026-12-03", "Reversal", "", "", "Low-Medium: daily 270 from 2025-10-29 top"]];
