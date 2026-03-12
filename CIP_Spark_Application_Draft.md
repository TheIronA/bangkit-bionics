# CIP Spark Application Blueprint - BANGKIT Bionics

This document translates the Internal Strategy into a concrete, 18-month project plan required for the **Cradle CIP Spark (RM 150,000)** grant application. 

**CRITICAL CLARIFICATION (SPARK vs NTIS):** Cradle CIP Spark requires a working "Minimum Viable Product" (MVP) by the end of the 18 months. For a prosthetic hand, an MVP means it must be successfully worn and actuated by **one single amputee pilot patient** (a usability pilot). It does *not* mean running a full-blown multi-site clinical trial. 

The strategy is: 
1. **CIP Spark (18 months, RM 150K):** Build the prototype, prove FMG+EMG works on yourselves (able-bodied), and at the very end, run a **1-patient usability pilot** to prove the MVP works on an amputee. 
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
| **3. 1-Patient Usability Pilot & Regulatory** | **RM 20,000** | **13%** |
| MREC Application | Fees and administrative costs preparing for the Medical Research and Ethics Committee (MREC) submission for the single-patient pilot. | RM 5,000 | |
| Pilot Patient Costs | Transport coverage, time compensation, and 3D scanning overhead for 1 amputee patient testing the final Spark MVP. | RM 5,000 | |
| Regulatory Consultant | Fractional consultant to build initial Quality Management System (QMS) framework and guide MDA pre-submission meetings. | RM 10,000 | |
| **4. Testing Ops & Software** | **RM 10,000** | **7%** |
| Infrastructure | Cloud compute (model training before on-device deployment), CAD/CAM software licenses, server hosting. | RM 5,000 | |
| Contingency | 10% contingency buffer for component lead-time delays or broken prototype remanufacturing. | RM 5,000 | |
| **Total** | | **RM 150,000** | **100%** |

---

## 2. 18-Month Project Timeline (Gantt Chart Details)

The timeline demonstrates rapid de-risking: proving the electronics work on a bench, proving the ML works on a chip, bringing them together into a wearable, and drafting the ethics application for the *next* stage.

### Phase 1: Foundation & Able-Bodied Benchtop (Months 1-5)
* **Hardware:** Procure Bambu Lab P1S and off-the-shelf components. Integrate MyoWare + FSR + MCU + 5 servos into a benchtop test rig. 
* **Software/ML:** Define BLE/UART packet format. Collect baseline able-bodied data on yourselves (6 gestures). Train base SVM/MLP and deploy a "hello world" TFLite Micro model to the nRF52840.
* **Milestone 1:** Benchtop test rig successfully classifies and actuates 3 distinct grip states (power, pinch, open) using live able-bodied muscle signals.

### Phase 2: System Integration & Wearable Miniaturization (Months 6-10)
* **Hardware:** Miniaturize the wiring into a wearable able-bodied form factor. Refine the 5-servo coupled layout for the hand mechanism using PA12 Nylon and TPU. Lock in the battery architecture.
* **Software/ML:** Achieve <5ms inference time on-device. Build the transfer learning pipeline for rapid fine-tuning on new (able-bodied) subjects.
* **Milestone 2:** V2 Wearable Prototype working smoothly on founders without external tethering. 

### Phase 3: "Near-Clinical" V3 Hardware & Ethics Prep (Months 11-15)
* **Hardware:** Transition from off-the-shelf breadboards to a unified custom PCB design based on Phase 2 learnings. Finalize the structural 3D-printed socket design. 
* **Clinical/Reg:** Draft the formal MREC Ethics Application. Confirm clinical session protocols with Alwi's father's hospital affiliation. Engage MDA informally for pre-submission guidance on device classification.
* **Milestone 3:** V3 "Pre-Clinical" hardware finalized. MREC Ethical Application submitted.

### Phase 4: Single-Patient Usability Pilot (Months 16-18)
* **Clinical:** With MREC approval secured, fit the V3 prototype to **1 pilot amputee patient**. 
* **Validation:** Evaluate FMG+EMG fusion accuracy and socket comfort in a controlled clinical setting. Capture video evidence of the patient actuating the hand.
* **Commercialization:** With working video evidence of an amputee using the MVP, finalize the formal application for **NTIS Sandbox 1 (RM 250K)**.
* **Milestone 4:** Single-patient MVP validated. 18-month CIP Spark project successfully closed. Device is ready for its *formal, multi-patient* clinical trials (funded by NTIS).

---

## 3. Recommended Additions for the Proposal
1. **The "Two-Grant Strategy" Narrative:** Explicitly tell the Cradle panel: *"CIP Spark funds the engineering and MVP feasibility (culminating in a 1-patient usability pilot). We will use the resulting functional prototype to unlock our NTIS Sandbox 1 grant, which will fund our formal medical clinical trials."* Grant reviewers *love* a team that knows exactly how to chain funding together without asking for too much at once.
2. **System Architecture Diagram:** Put together a visual block diagram showing `[MyoWare/FSR] -> [nRF52840 (TFLite Micro)] -> [Servo Controller] -> [3D printed Hand]`. Granular system limits (e.g. 5Hz update rate, 20ms total latency) play very well to technical grant reviewers.
