---
title: "Tally Prime Mein Serial Number Aur IMEI Kaise Daale (Batch Se)"
slug: "tally-prime-mein-serial-number-imei-kaise-daale"
meta_title: "Tally Prime Mein Serial Number Aur IMEI Kaise Daale"
meta_description: "Tally Prime mein serial number aur IMEI kaise daale: batch chalu kare, har unit ka batch uske number se banaye, bina bika maal dekhe, aur kya nahi hota."
primary_keyword: "tally prime mein serial number kaise daale"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "How-To"
excerpt: "Tally Prime mein serial number ka alag field nahi hota. Har phone ya har gaadi ko ek batch banao jiska naam uska IMEI ya chassis number ho. Steps, 3 phone ka example, aur is tareeke ki seemayein."
---

Tally Prime mein serial number kaise daale, iska seedha jawab hai: har unit ko ek batch banao jiska naam uska serial number ya IMEI ho. Tally Prime mein stock item ka alag serial number field nahi hota, isliye Tally ki apni help bhi mobile phone ke IMEI ko batch number banane ka tareeka batati hai. F11 (Company Features) mein Enable Batches ko Yes karo, stock item mein Maintain in batches ko Yes karo, aur purchase par har phone ko quantity 1 ke saath uske IMEI wale batch mein daalo. Sale par wahi batch chuno. Phir Alt+G se Batch Summary kholo: jo unit bik gayi uska closing khaali dikhta hai, aur jo bachi hai uska closing 1. Yeh tareeka number to rakhta hai, par colour, storage ya engine number jaisi baaki details nahi rakhta, aur bill par number har baar haath se likhna padta hai. Neeche steps, 3 phone ka example, batch aur serial number ka fark, aur is tareeke ki seemayein hain.

## Key Highlights

- Tally Prime mein har unit ek batch hai jiska naam uska serial number, IMEI ya chassis number hai, aur stock item par "Maintain in batches" Yes hona chahiye
- Purchase par har unit quantity 1 ke saath alag batch mein jaati hai, toh 20 phone ka carton matlab 20 batch lines
- Batch Summary mein bika hua phone khaali closing ke saath aur bina bika phone closing 1 ke saath dikhta hai

## In This Article

- Kaunsa serial number?
- Tally Prime mein batch se serial number kaise daale
- Example: 3 phone aaye, 1 bika
- Batch number aur serial number mein fark
- Is tareeke ki seemayein
- Takkada mein yeh kaise hota hai
- Frequently Asked Questions

## Kaunsa serial number?

Tally mein "serial number" teen alag cheezon ke liye bola jaata hai. Yeh post pehli wali ke baare mein hai.

| Kya | Matlab | Kahan milta hai |
|---|---|---|
| Item ka serial number | Har unit ka apna number: phone ka IMEI, gaadi ka chassis number, battery ka number | Is post ka vishay: batch ke roop mein |
| Voucher number | Bill ka number, jaise INV/0033 | Voucher type ki numbering setting mein |
| Licence serial number | Aapke Tally licence ka number | Tally ke licence aur support ke kaam ke liye |

## Tally Prime mein batch se serial number kaise daale

Yeh steps Tally ki apni help se hain (10 November 2026 ko check kiye).

1. F11 (Company Features) dabao aur Enable Batches ko Yes karo.
2. Alt+G (Go To) > Alter Master > Stock Item se phone ka item kholo aur Maintain in batches ko Yes karo. Agar yeh option nahi dikhta, toh F12 (Configure) mein Maintain Stock Item in Batches chalu karo.
3. Purchase voucher mein phone ki line par batch allocation mein har phone ka IMEI batch ke naam mein daalo, quantity 1 ke saath. 3 phone matlab 3 batch lines.
4. Sale par list mein se wahi IMEI wala batch chuno.
5. Bina bika maal dekhne ke liye Alt+G > Batch Summary kholo aur item chuno. Kisi batch par Enter dabane se uske Batch Vouchers khulte hain, jahan purchase aur sale ka bill dikhta hai.

Tally ki help ek aur baat batati hai: IMEI ke aage lot ya consignment ka code laga sakte ho, jaise Feb-356789104562318, taaki unit aur lot dono pata rahe. Isse batch ka naam lamba hota hai, toh ek hi tareeka chuno aur har baar wahi rakho.

## Example: 3 phone aaye, 1 bika

October mein "Smartphone 128 GB" ke 3 phone ek purchase bill par aaye. Ek phone INV/0033 par Ravi Kumar ko bika. Neeche ke number example ke liye banaye gaye hain.

| Batch (IMEI) | Inward | Outward | Closing |
|---|---|---|---|
| 356789104562318 | 1 | 1 | |
| 356789104562326 | 1 | | 1 |
| 356789104562334 | 1 | | 1 |

Batch Summary saaf batata hai ki 2 phone godown mein hain aur kaunse. Pehle phone ke batch par Enter dabao toh purchase bill aur INV/0033 dono dikhte hain. Phone ka colour, Black hai ya Blue, is report mein kahin nahi hai, kyunki batch ka naam IMEI ke liye use ho chuka hai.

## Batch number aur serial number mein fark

| | Batch number | Serial number |
|---|---|---|
| Kitni units | Ek saath bani ya aayi bahut saari units, jaise dawai ki 500 strip | Sirf ek unit |
| Kya batata hai | Lot, manufacturing date, expiry | Wohi ek phone, gaadi ya battery |
| Tally mein | Batch, quantity zyada | Batch, quantity hamesha 1 |

Tally mein dono ek hi feature se chalte hain. Fark sirf itna hai ki serial number wale batch mein quantity 1 hoti hai. Dawai jaise batch wale kaam ke liye [batch-wise billing](/blog/batch-wise-billing-for-tally/) wali post padhiye.

## Is tareeke ki seemayein

- Baaki details nahi rehti: colour, storage, engine ya motor number, battery number ke liye alag register ya Excel rakhna padta hai
- Purchase par har number Tally computer par ek ek karke type hota hai
- Ek hi number do baar galti se type ho jaye, toh dhyan clerk ko hi rakhna hai
- Bill par IMEI ya chassis number chahiye toh item ke description lines mein har bill par haath se likhna padta hai
- "Is mahine kitne Black phone bik gaye" jaisa sawaal batch report se nahi nikalta

Poora tareeka aur iski seemayein English mein padhni ho toh [English mein poora tareeka](/blog/serial-number-in-tally-prime-batch-method/) dekhiye.

## Takkada mein yeh kaise hota hai

Takkada ka Custom Fields add-on har unit ki details Takkada mein rakhta hai. Stock group par aap apne fields banate ho, jaise IMEI aur Color, aur ek field Unit no hota hai, jo Tally mein batch ka naam banta hai. Isliye Tally mein in items ke liye "Maintain in batches" Yes karna zaroori hai, aur app un items ki list dikhata hai jinpe yeh abhi chalu nahi hai.

Purchase par 20 phone matlab 20 rows, ek har phone ki, aur supplier ki list se IMEI ka poora column ek saath paste ho jaata hai. Sales order, challan ya invoice par sirf wahi phone dikhte hain jo us godown mein abhi stock mein hain, har ek apni details ke saath, aur IMEI ke aakhri number se search hota hai. Takkada mein koi phone do baar nahi bikta: bill wahin ruk jaata hai aur us bill ka number batata hai jisme woh phone pehle se hai. Jo fields aap "Print on the bill" mark karte ho, woh bill par item ke neeche chhapte hain, aur sale Takkada ke through Tally mein jaati hai, har Unit no batch ke roop mein aur details item ki description lines mein. Phone ke liye poora tareeka [IMEI tracking for Tally](/imei-tracking-tally/) page par hai, aur har tarah ki unit ke liye [serial number tracking for Tally](/serial-number-tracking-tally/) page par.

## Frequently Asked Questions

**Q: Tally Prime me batch kaise banaye?**

A: Pehle F11 (Company Features) mein Enable Batches ko Yes karo, phir stock item mein Maintain in batches ko Yes karo. Uske baad purchase voucher mein item ki line par batch allocation khulta hai, jahan batch ka naam aur quantity daalte ho. Serial number ke liye har unit ka alag batch, quantity 1.

**Q: Tally me IMEI number kaise dale?**

A: Phone ke stock item par Maintain in batches Yes karo aur purchase par har phone ka IMEI ek alag batch ke naam mein daalo, quantity 1 ke saath. Sale par wahi IMEI wala batch chuno. Bill par IMEI chhapna ho toh item ki description line mein bhi likho.

**Q: Batch number aur serial number me kya fark hai?**

A: Batch number ek saath bani ya aayi bahut saari units ka hota hai, jaise 500 strip ka ek lot. Serial number sirf ek unit ka hota hai, jaise ek phone ka IMEI. Tally mein dono batch se hi chalte hain, serial number wale batch mein quantity hamesha 1 hoti hai.

**Q: Tally me bina bika maal kaise dekhe?**

A: Alt+G (Go To) se Batch Summary kholo aur item chuno. Jis batch ka closing 1 hai woh unit abhi stock mein hai, aur jiska closing khaali hai woh bik chuki hai. Example mein 3 mein se 2 phone ka closing 1 dikhta hai.

Takkada ka Custom Fields add-on har company ke liye alag se chalu hota hai aur iska daam aapka partner batata hai; partner se add-on ka price poochiye, ya [WhatsApp par message kariye](https://wa.me/919435977777), hum aapki company ke liye chalu kar denge. Tally mein in items ke liye "Maintain in batches" Yes rakhna yaad rakhiye.
