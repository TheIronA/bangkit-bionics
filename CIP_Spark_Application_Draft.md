# CIP Spark Application Blueprint - BANGKIT Bionics

This document translates the Internal Strategy into a concrete, 18-month project plan required for the **Cradle CIP Spark (RM 150,000)** grant application. 

**CRITICAL CLARIFICATION (SPARK vs NTIS):** Cradle CIP Spark requires a working "Minimum Viable Product" (MVP) by the end of the 18 months. For a prosthetic hand, an MVP means it must be successfully worn and actuated by **one single amputee pilot patient** (a technical usability validation). It does *not* mean running a full-blown multi-site clinical trial. 

The strategy is: 
1. **CIP Spark (18 months, RM 150K):** Build the prototype, prove FMG+EMG works on yourselves (able-bodied), and at the very end, run a **1-patient technical usability validation** to prove the MVP works on an amputee. 
2. **NTIS Sandbox 1 (6 months, RM 250K):** Use that working Spark prototype and the 1-patient data to unlock the Sandbox 1 grant, which will fund the formal, multi-patient clinical trials required by regulators.

---

## 1. Budget Breakdown (Total Ask: RM 150,000)

Cradle wants to see that RM 150K gets you to a commercially viable milestone. For you, that milestone is a working, wearable bionic arm prototype ready for clinical testing.

| Category | Description | Allocation (RM) | % of Budget |
| :--- | :--- | :--- | :--- |
| **1. Hardware R&D & Prototyping** | **RM 62,000** | **41%** |
| 3D Printing Hardware | Bambu Lab P1S Combo (vital enclosed chamber for PA12 Nylon structural printing) + structural maintenance parts + 3D scanner rental. | RM 12,000 | |
| Dedicated Prototyping Workshop | Rent for a dedicated secure lab space for 18 months, exclusively housing 3D printing activity, assembly tools, and benchtop testing rigs. | RM 18,000 | |
| Sensors & Compute | Iterative batches of MyoWare 2.0 EMGs, FSR 400s, Adafruit nRF52840 MCU boards, servos (e.g., MG90S), and batteries. | RM 15,000 | |
| 3D Printing Materials | PA12 Nylon and TPU filament for iterative 3D-printed rigid shells and flexible skin contacts. | RM 11,000 | |
| PCB Manufacturing | Small batch custom PCB fabrication (V3 prototype) to consolidate development boards into a single footprint. | RM 6,000 | |
| **2. Talent & Engineering Stipends (Non-Developmental)** | **RM 58,000** | **39%** |
| ML & Firmware Development | Allocation for Martynas: dedicated ML pipeline optimization (transfer learning deployment) & embedded C++ on the Cortex-M4F processor. | RM 31,000 | |
| Hardware Assembly & CAD | Allocation for Alwi: dedicated hours for hardware integration, iterative socket printing, and CAD redesigns. | RM 27,000 | |
| **3. 1-Patient Technical Usability Validation & Regulatory** | **RM 20,000** | **13%** |
| MREC Application | Fees and administrative costs preparing for the Medical Research and Ethics Committee (MREC) submission for the single-patient pilot. | RM 5,000 | |
| Pilot Patient Costs | Transport coverage, time compensation, and 3D scanning overhead for 1 amputee patient testing the final Spark MVP. | RM 5,000 | |
| Regulatory Consultant | Fractional consultant to build initial Quality Management System (QMS) framework and guide MDA pre-submission meetings. | RM 10,000 | |
| **4. Testing Ops & Software** | **RM 10,000** | **7%** |
| Infrastructure | Cloud compute (model training before on-device deployment), CAD/CAM software licenses, server hosting. | RM 5,000 | |
| Contingency | 10% contingency buffer for component lead-time delays or broken prototype remanufacturing. | RM 5,000 | |
| **Total** | | **RM 150,000** | **100%** |

---

## 2. 18-Month Project Timeline (Gantt Chart Details)

The timeline demonstrates rapid de-risking: proving the electronics work on a bench, proving the ML works on a chip, bringing them together into a wearable. MREC ethics applications approve protocols — not finished hardware — so submission is front-loaded to Month 8–10 to ensure approval lands well before the patient validation window.

### Phase 1: Foundation & Able-Bodied Benchtop (Months 1-5)
* **Hardware:** Procure Bambu Lab P1S and off-the-shelf components. Integrate MyoWare + FSR + MCU + 5 servos into a benchtop test rig. 
* **Software/ML:** Define BLE/UART packet format. Collect baseline able-bodied data on yourselves (6 gestures). Train base SVM/MLP and deploy a "hello world" TFLite Micro model to the nRF52840.
* **Milestone 1:** Benchtop test rig successfully classifies and actuates 3 distinct grip states (power, pinch, open) using live able-bodied muscle signals.

### Phase 2: System Integration, Wearable Miniaturization & Ethics Submission (Months 6-10)
* **Hardware:** Miniaturize the wiring into a wearable able-bodied form factor. Refine the 5-servo coupled layout for the hand mechanism using PA12 Nylon and TPU. Lock in the battery architecture.
* **Software/ML:** Achieve <5ms inference time on-device. Build the transfer learning pipeline for rapid fine-tuning on new (able-bodied) subjects.
* **Clinical/Reg (Month 8–10):** Submit MREC ethics application. Ethics boards approve study protocols, not finished hardware — submission at this stage is standard and appropriate. Define clinical session protocols through existing orthopaedic network contacts. Engage MDA informally for pre-submission guidance on device classification.
* **Milestone 2:** V2 Wearable Prototype working smoothly on founders without external tethering. MREC ethics application submitted.

### Phase 3: "Near-Clinical" V3 Hardware (Months 11-15)
* **Hardware:** Transition from off-the-shelf breadboards to a unified custom PCB design based on Phase 2 learnings. Finalize the structural 3D-printed socket design.
* **Clinical/Reg:** Respond to any MREC queries. MREC approval expected by Month 14–15 (3–6 month review window from Month 8–10 submission).
* **Milestone 3:** V3 "Pre-Clinical" hardware finalized. MREC approval received.

### Phase 4: Single-Patient Technical Usability Validation (Months 16-18)
* **Clinical:** With MREC approval secured, fit the V3 prototype to **1 pilot amputee patient**. 
* **Validation:** Evaluate FMG+EMG fusion accuracy and socket comfort in a controlled clinical setting. Capture video evidence of the patient actuating the hand.
* **Commercialization:** With working video evidence of an amputee using the MVP, finalize the formal application for **NTIS Sandbox 1 (RM 250K)**.
* **Milestone 4:** Single-patient MVP validated. 18-month CIP Spark project successfully closed. Device is ready for its *formal, multi-patient* clinical trials (funded by NTIS).

---

## 3. Recommended Additions for the Proposal
1. **The "Two-Grant Strategy" Narrative:** Explicitly tell the Cradle panel: *"CIP Spark funds the engineering and MVP feasibility (culminating in a 1-patient technical usability validation). We will use the resulting functional prototype to unlock our NTIS Sandbox 1 grant, which will fund our formal medical clinical trials."* Grant reviewers *love* a team that knows exactly how to chain funding together without asking for too much at once.
2. **System Architecture Diagram:** Put together a visual block diagram showing `[MyoWare/FSR] -> [nRF52840 (TFLite Micro)] -> [Servo Controller] -> [3D printed Hand]`. Include validated system specs (e.g. inference latency, model size) once measured — specific numbers play well to technical grant reviewers.

---

## 4. Primary Applicant Experience and Expertise

**Primary Applicant 1: Alwi Al-Haddad**
UCL MEng Biomedical Engineering graduate. Developed deep learning pipeline for automated NEC diagnosis achieving 87.5% accuracy via SE-ResNet50 transfer learning. Built and shipped multiple products solo from zero to live users. Brings clinical access via neurosurgery and orthopaedic networks. Co-developed the EMG signal processing pipeline underpinning BANGKIT's prosthetic control system. (47 words)

**Primary Applicant 2: Martynas Pocius**
UCL MEng Biomedical Engineering graduate with first-author IEEE ISBI 2024 publication on reinforcement learning. Former Senior ML Engineer at Autodesk and Founding Engineer at Drafted.ai. Co-developed EMG-controlled cursor interface during UCL embedded systems research, optimizing embedded C++ threshold logic to translate analog muscle signals into reliable, noise-resistant cursor commands. (47 words)

---

## 5. Section C — Product

### C1. Problem Statement

In Malaysia, upper-limb amputation is driven primarily by industrial accidents and road trauma. SOCSO caps prosthetic reimbursement at RM 2,000. Government hospitals have no device budget. The patient is predominantly B40 — a young working-age adult who cannot afford the RM 20,000–80,000 imported myoelectric devices that exist, and has no functional alternative. Patients either go without, or take on debt for devices that arrive without local clinical support or follow-up fitting.

This gap is not unique to Malaysia — it represents an estimated 180,000 new amputees annually across Southeast Asia with no affordable myoelectric solution. The problem is local. The opportunity is regional.

---

### C2. Solution and Innovation Value

BANGKIT Bionics is developing a myoelectric prosthetic hand powered by FMG+EMG sensor fusion and an on-device neural network classifier. The device classifies 3 grip intentions (power grasp, pinch, open) directly on the microcontroller — no cloud, no latency, no recurring subscription. A custom 3D-printed socket, fitted using 3D scanning at each clinical appointment, provides patient-specific comfort and a lower abandonment rate.

Target price: RM 4,500–14,500 — a fraction of any existing myoelectric device, with equivalent functional capability for the grip patterns covering 80%+ of daily tasks, per published activities-of-daily-living studies (Pylatiuk et al., *Prosthet. Orthot. Int.*, 2006).

**Innovation:** No competitor at this price point combines FMG+EMG sensor fusion with on-device ML classification. Existing affordable devices use binary threshold control and fixed thumb positions — the leading cause of patient abandonment. Our motorized thumb architecture eliminates manual repositioning. Our transfer learning pipeline adapts the classifier per patient and accommodates residual limb changes over time, designed to significantly reduce recalibration burden at follow-up appointments.

---

### C3. Technology Readiness Level (TRL)

**TRL 3 — Experimental Proof of Concept**

The EMG signal acquisition, analog filtering, and threshold-based control pipeline has been demonstrated through UCL embedded systems research (Arduino, MyoWare EMG sensors, C++). The same signal pipeline underpins BANGKIT's prosthetic control system design. FMG+EMG sensor fusion and on-device ML classification are validated at the research level by peer-reviewed literature (Ke et al., *Sensors*, 2020, doi:10.3390/s20174775), with >97% classification accuracy demonstrated under impeded-contact conditions.

The integrated wearable prosthetic system — combining the sensor module, neural net classifier, servo actuation, and 3D-printed socket — has not yet been built as a complete working prototype. CIP Spark funds the build.

---

### C4. What Has Been Developed So Far

- **EMG signal pipeline demonstrated** through UCL embedded systems coursework: analog signal conditioning, threshold-based classification, and C++ firmware on Arduino controlling output actuators via muscle signals — the direct technical precursor to the prosthetic control architecture.
- **Clinical network established:** Co-founder Alwi Al-Haddad has direct access to a consultant neurosurgeon (family network) and an orthopaedic referral network in Malaysia. Early pilot patient outreach is facilitated through existing local clinical contacts, enabling patient recruitment and ethics-board engagement prior to prototype completion.
- **Regulatory pathway mapped:** MDA device classification and MREC ethics application process have been scoped. Pre-submission engagement with MDA is planned for Month 3 of the Spark period.
- **Market research and competitive analysis completed:** Competitive benchmarking of Ottobock, Open Bionics, and Vulcan completed; BOM, pricing model, and gross margin projections estimated against published component costs.

---

### C5. Technical Modules to be Developed During CIP Funding (18 months)

> *(~148 words)*

1. **FMG+EMG sensor module** — MyoWare 2.0 EMG analog front-end + FSR 400 force myography sensors; analog filtering and signal conditioning circuit.
2. **On-device gesture classifier** — TFLite Micro quantized neural net on nRF52840 (Cortex-M4F); MAV+RMS feature extraction; trained via SVM→MLP→int8 quantized pipeline. Target: <5ms inference, <100KB model.
3. **Servo actuation system** — 5-servo coupled layout; 3 grip states (power grasp, pinch, open); motorized thumb to eliminate manual repositioning.
4. **3D-printed prosthetic hand mechanism** — PA12 Nylon rigid shell; TPU flexible skin contact layer; enclosed FDM printing for structural integrity.
5. **Patient-specific socket fitting workflow** — 3D scanning of residual limb; patient-specific STL → socket print iteration.
6. **Transfer learning pipeline** — Base model pre-trained on able-bodied data; per-patient fine-tuning on 5–10 minutes of calibration data at fitting appointment.
7. **Custom PCB (Phase 3)** — Consolidated single-board design replacing development modules for wearable form factor.
8. **1-patient technical usability validation (Phase 4)** — MREC-approved clinical session; FMG+EMG accuracy and socket comfort evaluation on one amputee patient.

---

### C6. Target Market and Go-to-Market Strategy

> *(~148 words)*

**Primary market: Singapore.** Insurance reimbursement frameworks exist for prosthetic devices, with functioning prosthetist infrastructure and high GDP per capita supporting private pay. Entry price SGD 3,000 into a market where comparable myoelectric devices cost SGD 15,000–50,000. 45 minutes from our Malaysia manufacturing base.

**Operations and validation base: Malaysia.** Low-cost manufacturing, CIP Spark and NTIS grant funding, and clinical validation via MREC-approved ethics pathway. B40 patients access the device at subsidised price through hospital referral.

**Scale market: United Kingdom.** NHS prosthetics budget, private medical insurance, and CE Mark pathway. Target Year 3+ following Singapore commercial establishment.

**GTM model:** Clinical partnership → prosthetist referral → device fitting + annual service subscription. Revenue per patient: RM 9,500 device + RM 1,200–2,000/year service. Gross margin 63–74% at pilot stage, targeting 75%+ at volume. Full distribution operation not required at entry — fitting is performed by our clinical team directly.

**Funding Roadmap:** We are leveraging the RM 150,000 CIP Spark grant to build the functional MVP and achieve 1-patient technical validation. This milestone is designed to directly qualify BANGKIT for the RM 250,000 NTIS Sandbox 1 grant, which will fund the formal, multi-patient clinical trials required for Singapore and UK commercial entry.

---

### C7. Funding Required

**RM 150,000** (maximum Cradle CIP Spark allocation)

---

### C8. High-Level Funding Breakdown

| Category | Allocation | % |
|---|---|---|
| Hardware R&D & Prototyping (3D printer, sensors, MCU, servos, PCB, lab rent, materials) | RM 62,000 | 41% |
| Talent & Engineering Stipends (ML/firmware — Martynas; hardware/CAD — Alwi) | RM 58,000 | 39% |
| 1-Patient Usability Validation & Regulatory (MREC fees, pilot patient costs, regulatory consultant) | RM 20,000 | 13% |
| Testing Ops, Software & Contingency | RM 10,000 | 7% |
| **Total** | **RM 150,000** | **100%** |
