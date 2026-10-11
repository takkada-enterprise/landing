---
title: "FMCG Distributor ka Billing Mobile se Tally mein Kaise Kare"
slug: "fmcg-distributor-billing-mobile-se-tally-mein"
meta_description: "FMCG distributor ka billing mobile se Tally mein: har item pe MRP aur retailer margin ek baar daalo, phir in items ka rate bill pe khud sahi aata hai."
primary_keyword: "billing mobile se Tally mein"
date: "2026-10-11"
author: "harsh"
category: "Schemes"
excerpt: "Rate list purani, salesman ka calculator alag, aur shaam ko Tally mein entry alag. Takkada mein FMCG billing mobile se kaise hoti hai, MRP se retailer rate tak, step by step."
---

FMCG distributor ka billing mobile se Tally mein karne ka seedha tarika hai: Takkada mein har stock item pe MRP aur retailer margin ek baar daal do, phir salesman phone se naya sales invoice ya sales order banaye toh in items ka rate khud sahi aata hai. Item add karte hi rate MRP hi rehta hai aur retailer ka margin line pe discount ban ke lag jata hai, trade ke hisaab se divisor wala tarika: 20% margin matlab 16.67% discount. Company ka trade discount ho toh salesman line pe Discount 1 ya Discount 2 daal sakta hai, lekin aapki rakhi hui limit se zyada nahi, aur margin wala box uske liye band rehta hai. Invoice Tally mein sales voucher ban ke jata hai aur sales order, sales order ban ke, item line pe discount ke saath. Matlab rate list ka register band, salesman ka calculator band, aur shaam ko Tally mein dobara entry karne ka jhanjhat bhi khatam.

## Problem jo har FMCG distributor jaanta hai

Company ka letter aaya: is pack ka MRP badla, us pack pe margin 18% se 20% hua. Office ne sheet update ki, salesman ke paas pichhle mahine wali sheet hai. Dukaan pe woh rate dimaag se lagata hai, aur 40 line ke order mein ek line galat ho jati hai. Retailer pakad leta hai, aur aapko pata bhi nahi chalta.

Upar se margin ka hisaab bhi tricky hai. Retailer ka margin uski kharid pe hota hai, isliye 20% margin pe rate MRP ko 1.20 se divide karke aata hai: ₹10 ke pack pe woh ₹8.33 mein kharidta hai. ₹8 pe de diya toh aapne 25% de diya.

## Step 1: Billing Module kholo

Owner wale login se Settings mein jao, phir Invoices, phir **Billing Module**. Yahan Tally ke stock group dikhte hain, har group ke neeche likha hota hai jaise "48 items · 12 configured". Staff wale login se yeh screen nahi khulti.

## Step 2: Har item pe paanch box bharo

Group kholo, item pe tap karo, aur bharo:

- **MRP (incl. GST)**: pack pe chhapa hua MRP
- **Retail Margin %**: company ka diya margin (yeh zaroori hai, 0 bhi chalega)
- **Discount 1 %** aur **Discount 2 %**: salesman zyada se zyada kitna de sakta hai
- **Salesman commission %**: Team Sales chalate ho toh

Save dabao. Yahi box item ke apne page pe **Billing Configuration** card mein bhi milte hain.

## Step 3: Salesman bill banaye

Salesman naya invoice banata hai aur ₹10 wala biscuit 120 pack daalta hai, 5% GST, Incl. GST invoice. Cart mein dikhega "Discount 16.7%". Invoice pe line aayegi "Rate: ₹ 10 / item", "Disc: 16.7% (-₹ 190.44)" aur "Retail Margin: 20%", total ₹999.56. Calculator ₹1,000 bolega, lekin app Tally wala rounding karta hai: pehle bina GST ka rate paise tak, phir discount, phir CGST aur SGST alag alag.

Retailer ko trade discount banta hai toh salesman line ka discount tap karta hai, **Item Discount** sheet khulti hai. Wahan limit likhi hoti hai, aur zyada daalo toh "Cannot exceed" aa jata hai. Retailer margin wala box staff ke liye band rehta hai.

## Kahan margin nahi lagta

Sales order se bana invoice order wala rate hi rakhta hai. Purana bill edit karo, credit note banao ya purchase bill, wahan margin nahi lagta. Jis item pe margin nahi daala, woh Tally ke normal rate pe bikta hai.

Poori jaankari ke liye [FMCG billing software for Tally](/blog/fmcg-billing-software-for-tally) padho, ya [MRP-based billing for Tally](/fmcg-module-tally) page dekho.

## Frequently Asked Questions

**Q: Kya har pack size ka margin alag rakh sakte hain?**

A: Haan. MRP aur margin har stock item pe alag set hota hai, toh ₹5, ₹10 aur ₹20 wale pack ka apna apna rate banta hai.

**Q: Kya salesman margin badal sakta hai?**

A: Item Discount sheet pe nahi, wahan Retailer margin ka box staff ke liye band hai. Haan, agar woh Rate box mein khud rate type kare, toh woh rate MRP ki jagah le leta hai aur margin upar se nahi lagta.

**Q: Sales order se invoice banaya toh margin dobara lagega kya?**

A: Nahi. Sales order se bana invoice wahi rate rakhta hai jo order mein tha, isliye margin do baar nahi lagta.

**Q: MRP Tally mein jata hai kya?**

A: MRP Takkada mein rehta hai. Tally mein invoice sales voucher ban ke jata hai, item line pe discount ke saath, aur Tally ka item master nahi badalta.

## Shuru karo

WhatsApp karo [https://wa.me/919435977777](https://wa.me/919435977777) pe, hum aapka pehla stock group saath mein set kar denge.
