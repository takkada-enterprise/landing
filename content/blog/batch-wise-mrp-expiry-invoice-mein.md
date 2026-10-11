---
title: "Batch Wise MRP aur Expiry Date Invoice mein Kaise Dikhaye"
slug: "batch-wise-mrp-expiry-invoice-mein"
meta_description: "Batch wise MRP aur expiry date invoice mein kaise dikhaye: phone se batch chuno, MRP, Mfg aur Exp dekho, rate line par aaye, PDF par Mfg aur Exp chhape."
primary_keyword: "batch wise MRP aur expiry date"
date: "2026-10-12"
author: "harsh"
category: "Tally Mobile"
excerpt: "Ek hi item, do batch, do MRP, do expiry. Phone se bill banate waqt sahi batch kaise chune aur invoice par Mfg aur Exp kaise chhape, seedhi bhasha mein."
---

Batch wise MRP aur expiry date invoice mein dikhane ka tarika hai Takkada ki Price by batch setting: business admin ise Settings, Invoices mein on karta hai, aur phir sales invoice ki line par Batch box dabate hi us item ke batch ki list khulti hai. List mein batch ka naam, godown mein kitna maal bacha hai, line ka rate, aur MRP, purchase rate, Mfg aur Exp dikhte hain, jab Tally mein bhare hon. Batch chuno to line par uska rate aa jaata hai: pehle batch ka MRP, MRP na ho to us batch ka last selling rate, woh bhi na ho to line par pehle se jo rate hai. Expired batch list mein sabse neeche laal Expired label ke saath dikhta hai. Doosra batch alag line par apne rate ke saath aata hai. PDF par item ke neeche batch ke saath Mfg aur Exp chhapte hain, aur Tally mein bhi line par batch jaata hai, dates ho to dates bhi.

## Godown ka asli scene

Aapke paas ek hi syrup ke teen batch pade hain. Ek ka MRP ₹95, naye wale ka ₹105. Ek batch agle mahine expire hone wala hai. Order aaya 20 bottle ka, packer ne 12 purane aur 8 naye utha liye.

Bill mein batch nahi likha, ya galat likha. Teen mahine baad chemist expired maal wapas bhejta hai aur poochta hai kis bill ka hai. Tally kholke ghanta bhar dhoondte raho.

## Setting kahan hai

Settings, Invoices kholo. Wahan do switch hain:

- **Batch numbers on invoices**: line par Batch box dikhata hai
- **Price by batch**: ek line par ek batch, us batch ke rate ke saath, aur bill par Mfg aur Exp

Price by batch on karo, Batch box apne aap on ho jaata hai. Batch box off karoge to Price by batch bhi off ho jaayega. Yeh switch sirf business admin badal sakta hai.

## Batch kaise chune

Sales invoice banao, item daalo, quantity likho. Phir Batch box dabao. Ek row aisi dikhegi:

- `SY2409`, 40 left, rate ₹105
- Neeche `MRP ₹105 · Bought ₹78 · Mfg 01-Sep-2026 · Exp 31-Aug-2028`

List batch ke naam ke hisaab se chalti hai, expired batch sabse neeche laal mein. Batch app khud nahi chunta, aap chunte ho. Expired batch bhi chun sakte ho agar jaan-boojh ke bechna hai, laal label bas yaad dilata hai.

12 purane wale chune, phir Batch box dobara dabake naya batch chuno. App neeche nayi line jodta hai, quantity 1, naye batch ke rate par. Quantity 8 kar do. Ab bill mein do line hain, do batch, do rate.

## Rate ka hisaab

Pehle batch ka MRP aata hai. Incl. GST bill mein MRP seedha rate ban jaata hai. Excl. GST bill mein GST nikal ke: ₹105 MRP, 5% GST, to rate ₹100.00.

Chemist ko aap MRP se kam par dete ho. Apna rate MRP ke upar likh do, line wahi rakhegi, bas ladder discount ka rate lock on na ho. Tally mein batch ka MRP bhara hi nahi hai to us batch ka last selling rate aata hai, woh bhi na ho to line par pehle se jo rate hai.

## PDF aur Tally mein kya jaata hai

PDF par item ke neeche likha aata hai `SY2409 · Mfg 01-Sep-2026 · Exp 31-Aug-2028`. Jo date Tally mein nahi hai, woh nahi chhapti. Tally mein sales voucher ki line par wahi batch jaata hai, Mfg aur expiry ho to woh bhi, line ke apne rate ke saath.

## Kya abhi nahi hota

Batch Tally ki purchase entry se aate hain, app mein naya batch nahi banta. Purchase bill import batch aur expiry nahi padhta. Price by batch sirf sales invoice par hai, sales order aur credit note par batch list nahi aati. Expiry se pehle alert bhi nahi aata.

Poore niyam [batch-wise billing guide](/blog/batch-wise-billing-for-tally) mein hain, aur pharma ke liye baaki kaam [Tally app for pharma distributors](/tally-app-for-pharma-distributors) page par.

## Frequently Asked Questions

**Q: Invoice par expiry date kab chhapti hai?**

A: Jab Tally mein us batch ki expiry bhari ho aur aapne Price by batch on karke batch chuna ho.

**Q: Kya rate hamesha MRP hi rahega?**

A: Nahi. MRP pehle aata hai, aap apna rate likh sakte ho aur line wahi rakhegi.

**Q: Ek item ke do batch ek bill mein ja sakte hain?**

A: Haan, alag-alag line par, apne apne rate ke saath.

**Q: Expired batch bill ho jaayega?**

A: Haan. List mein laal Expired label dikhta hai, faisla aapka.

## Baat karein

WhatsApp karo [https://wa.me/919435977777](https://wa.me/919435977777) par, apna ek batch-wise item bhejo, hum phone par uski batch list dikha denge.
