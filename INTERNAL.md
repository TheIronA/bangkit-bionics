# BANGKIT Bionics — Internal Reference

**Private. Not for investors or website.**
Last updated: March 2026

---

## Who does what

|                                     | Alwi Al-Haddad                                  | Martynas Pocius                      |
| ----------------------------------- | ----------------------------------------------- | ------------------------------------ |
| **Role**                            | Hardware, clinical access, regulatory,          | ML pipeline, embedded software       |
| **Background**                      | UCL BME, neurosurgeon father, SOCSO/OKU network | UCL BME, ML research background      |
| **Primary deliverable (prototype)** | Physical arm + sensor module                    | Gesture classifier running on-device |

---

## What we're actually building (prototype scope)

A benchtop-to-wearable myoelectric prosthetic arm with:

- **FMG + EMG signal acquisition** from residual limb
- **On-device gesture classifier** (3 grip states: power grasp, pinch, open)
- **5-servo motorized hand** driven by classified intent
- **3D-printed socket** custom-fitted for each patient

**Not in prototype scope:** full per-finger actuation, continuous online adaptation, waterproofing certification, regulatory submission, CE Mark.

---

## Alwi — Hardware Build

### Phase 1: Off-the-shelf prototype (start here)

Do not design a PCB yet. Validate the signal pipeline first.

**Component list:**
| Component | What it does | Approx cost |
|---|---|---|
| [MyoWare 2.0](https://myoware.com/) × 2–4 | Integrated EMG analog front-end. Handles amplification (~1000×), bandpass (20–500 Hz), rectification, envelope. No op-amp design needed. | ~$50 each |
| FSR 400 (Interlink Electronics) × 4–8 | FMG pressure sensors. Attach around forearm. Voltage divider circuit only. | ~$5 each |
| Adafruit Feather nRF52840 | MCU. Cortex-M4F, hardware float, BLE, TFLite Micro compatible. Runs Martynas's classifier. | ~$25 |
| 5× micro servo (e.g. SG90 or MG90S) | Finger/thumb actuation. 3 grip states minimum. | ~$3 each |
| Li-Po 3.7V 1000–2000 mAh | Battery. Target 6–8hr use. | ~$10 |
| 3D Printer (Bambu Lab P1S Combo) | **CRITICAL UPGRADE:** Do not use the A1. PA12 Nylon requires a fully enclosed chamber to prevent warping, and the AMS drybox is vital for hygroscopic filaments. The A1 will fail here. | RM ~4,000 |
| 3D printer filament (PA12 nylon + TPU) | Socket shell + flexible skin layer | RM ~200/arm |
https://shopee.com.my/product/992967691/43009973474?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkVEdTU3BlMW9zMXB6bGYrZ0J1VEdQdmlZOTlBMkd5bjJkc2F0Tlp2RXhwcVN6Qi8yeDYyd0VJNlJXNWVQVHNTVjBsRm95YnNiVVA4VUt6OUtzVHpUMUplbGx6ZXVOZXRPbW5IL254L2E1cGhXOTh6ekVEa3YxSEI2bUZsNDZiaStRPT0

**Total BOM estimate (prototype):** ~RM 600–800 all-in.

### Why off-the-shelf is fine for now

- MyoWare already handles the hard analog filtering problem
- The UCL embedded systems work demonstrated the EMG signal chain
- PCB design only makes sense once the circuit is validated and you're miniaturising for clinical units
- Custom PCB reference (when the time comes): Ke et al. 2020 used AD8220 + AD8244 (ADI chips) — datasheets are public

### Analog vs digital filtering

- **Analog (on MyoWare):** removes noise _before_ the ADC — mandatory, cannot be skipped or replaced in software
- **Digital (on nRF52840):** runs after ADC, coordinate with Martynas for IIR notch filter and feature smoothing
- You need both; they do different jobs

### Socket fitting workflow (to validate)

1. 3D scan residual limb (photogrammetry app on phone is a starting point; structured-light scanner better)
2. Generate STL in CAD
3. Print: rigid nylon shell, TPU contact surface
4. Fit, adjust, iterate — plan for 2–3 print iterations per patient
5. Document fit outcomes for regulatory submission later

### Servo / grip architecture

- 5-servo coupled layout: thumb + 4 fingers in 2–3 groups
- 3 grip modes triggered by classifier: power grasp / lateral pinch / open
- Avoid manual thumb repositioning — this is the #1 complaint against Vulcan
- Independent per-finger actuation: **post-prototype target only**

---

## Martynas — ML Pipeline

### Phase 1: Able-bodied data collection (no ethics needed yet)

Train on yourselves and friends before touching amputee data.

**Session protocol (same as Ke et al. 2020):**

1. Clean forearm skin with alcohol
2. Attach 4× MyoWare + 4× FSR evenly around forearm
3. Record 6 gestures × 10 reps × 3s hold + 3s rest
4. Gestures to start with: relax, fist (power grasp), pinch, open, wrist flex, wrist extend
5. Window: 200ms, 100ms step — gives ~5 Hz classifier update rate (fast enough)
6. Store raw CSV: timestamp, 4× EMG envelope, 4× FSR voltage

**Features (keep it simple):**

- Time-domain only: MAV + RMS per channel
- That's 16 features total (4 EMG × 2 + 4 FMG × 2) — tiny, fast
- Ke et al. got >97% with just this feature set + cubic SVM

**Classifier:**

- Start with sklearn SVM / MLP locally — quick to iterate
- Once accuracy is good, convert to TFLite Micro (int8 quantized) for nRF52840
- Target: <5ms inference time on M4F, <100KB model size

**Per-patient adaptation (transfer learning — simple version):**

- Pre-train a base model on all subjects
- At each fitting appointment: collect 5–10min of calibration data from patient
- Fine-tune final dense layer only (freeze earlier layers)
- This is the entire "transfer learning pipeline" claim — it's realistic and straightforward

**Tools:**

- Python, numpy, sklearn, TensorFlow 2.x
- [TensorFlow Lite for Microcontrollers](https://www.tensorflow.org/lite/microcontrollers) — official docs, well-maintained
- [Edge Impulse](https://www.edgeimpulse.com/) — free tier, has nRF52840 support, good for rapid prototyping without writing deployment code from scratch

### Integration with Alwi

- Alwi sends ADC samples over BLE or UART → coordinate on packet format early
- Agree on sampling rate (1 kHz as per Ke et al. works well) and channel ordering
- Classify on-device; send intent command (grip_open / grip_close / grip_switch) to servo controller

---

## Shared: What to do before any amputee

**This is the actual blocker.** Everything above can be done on able-bodied subjects. To work with amputees you need:

1. **Ethics approval** (MREC Malaysia or institutional equivalent) — Alwi's father's hospital affiliation is the fastest route in. Start the conversation now; approval takes 3–6 months.
2. **MDA guidance meeting** — Book a pre-submission meeting with Malaysian Medical Device Authority to confirm device classification (likely Class B/C active implant-adjacent device). This determines your submission timeline.
3. **Prototype in hand** — You need a working device before you can book a clinical slot.

Realistic order: **build prototype → get ethics → recruit 3–5 pilot patients → validate → then talk to MDA formally.**

---

## Regulatory roadmap (simplified)

| Stage                 | What it is                                             | Who leads                   | Timeline                                         |
| --------------------- | ------------------------------------------------------ | --------------------------- | ------------------------------------------------ |
| NTIS registration     | Malaysia national trial site, enables clinical testing | Alwi (via hospital contact) | Apply once prototype exists                      |
| MDA notification      | Register as medical device manufacturer in Malaysia    | Alwi                        | Can start now; doesn't need finished device      |
| CE Mark (UKCA for UK) | Required for UK commercial sales                       | Both                        | Year 3+ — hire a regulatory consultant don't DIY |
| Singapore HSA         | Required for SG commercial sales                       | Both                        | Year 2–3                                         |

The CE Mark process alone takes 18–24 months minimum with a Notified Body. Do not promise a UK launch date that depends on it without a clear timeline.

---

## Funding targets

| Fund                        | What it is                                     | Notes                                                                                                                            |
| --------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **CIP Spark**               | Cradle Investment Programme, Malaysia          | Single most important near-term target. Up to RM 300K. Prototype not required to apply but helps.                                |
| **MaGIC**                   | Malaysia Global Innovation & Creativity Centre | Accelerator + grant hybrid                                                                                                       |
| **SOCSO/PERKESO**           | National Social Security Organisation          | Potential reimbursement pathway _for patients_, not direct funding — but a conversation with them now builds the commercial case |
| **UCL networks**            | Alumni, Hatchery, UCL Business grant schemes   | Martynas + Alwi both eligible                                                                                                    |
| **Angels (Southeast Asia)** | Once prototype exists                          | Don't raise equity until you have hardware in hand                                                                               |
| **Venture Capital**         | Post-NTIS Sandbox                              | Targeting Series A once clinical data is validated and Singapore revenue is scaling.                                              |

---

## Company Incorporation & Out-of-Pocket Costs

**IMPORTANT: Cradle CIP Spark funds cannot be used for incorporation.**

- **Timing:** Apply for the grant as a team of individuals. Only incorporate (Sdn Bhd) **after** receiving the "Letter of Offer" from Cradle. 
- **Cost:** Budget ~RM 1,500 for incorporation fees + digital company secretary setup.
- **Pay-out:** This is a 50/50 out-of-pocket split between Alwi and Martynas. It is the skin in the game required to unlock the RM 150,000.
- **Paid-up Capital:** Usually RM 1,000 minimum is fine for the grant requirement.

---

## What the website/deck claims vs current status

| Claim                                  | Status                                                               |
| -------------------------------------- | -------------------------------------------------------------------- |
| FMG+EMG sensor fusion                  | Research-validated (Ke et al. 2020); **not yet built by us**         |
| On-device ML classifier                | Research-demonstrated (TFLite Micro); **not yet implemented by us**  |
| Motorized thumb (no manual reposition) | Target prototype design; **not yet built**                           |
| 3D-printed custom socket               | Workflow described; **not yet validated clinically**                 |
| 6–8hr battery                          | Estimate; **not yet measured**                                       |
| 63–74% gross margin                    | Modelled from BOM estimates; **not yet costed against a real build** |
| Year 3 break-even                      | Financial model; **highly assumption-dependent**                     |
| Singapore commercial entry             | Plan; **no regulatory filing yet**                                   |
| UK clinical pilot                      | Aspiration; **CE Mark pathway not started**                          |

The website is appropriately hedged throughout ("prototype target", "to be validated in our clinical trial"). Keep it that way — don't let investor conversations harden these claims before the prototype exists.

---

## Near-term action items

### Alwi

- [ ] Order MyoWare 2.0 × 4, FSR 400 × 8, Adafruit nRF52840 Feather, servos × 5
- [ ] Buy Bambu Lab P1S Combo (not A1) for reliable enclosed PA12 Nylon structural printing
- [ ] Design first 3D-printed hand mechanism (start with a known open-source design like e-NABLE or Dextrus as base)
- [ ] Contact father's hospital: start ethics conversation
- [ ] Book pre-submission meeting with MDA (can be informal at this stage)
- [ ] Research MDA manufacturer registration requirements
- [ ] Apply for CIP Spark (can apply without prototype if you have a plan and team)

### Martynas

- [ ] Set up data collection protocol (session script, CSV logger from nRF52840)
- [ ] Collect baseline dataset on yourself + Alwi (min 3 sessions each)
- [ ] Train baseline gesture classifier: SVM first, then small MLP
- [ ] Get TFLite Micro "hello classifier" running on an nRF52840 Feather
- [ ] Evaluate Edge Impulse for faster deployment iteration

### Both

- [ ] Build one complete working arm benchtop-to-wearable (even ugly, even wired)
- [ ] Video the arm moving from muscle signal — this is your fundraising asset
- [ ] Agree on BLE/UART packet format between sensor MCU and servo controller
- [ ] Start ethics application draft

---

## Key references

- **Ke et al. (2020)** — "An Ultra-Sensitive Modular Hybrid EMG–FMG Sensor with Floating Electrodes", _Sensors_ (MDPI), doi:[10.3390/s20174775](https://doi.org/10.3390/s20174775) — direct reference for sensor design, feature extraction, classifier approach, and the >97% accuracy stat
- **TFLite Micro docs** — https://www.tensorflow.org/lite/microcontrollers
- **Edge Impulse nRF52840 tutorial** — https://docs.edgeimpulse.com/docs/development-platforms/officially-supported-mcu-targets/nordic-semi-nrf52840-dk
- **MDA Malaysia** — https://www.mda.gov.my — manufacturer registration and device classification
- **CIP Spark** — https://www.cradle.com.my
