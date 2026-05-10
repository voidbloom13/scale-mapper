# End‑State Application Specification

**Audience:** Large Language Models (LLMs), tooling agents, and system designers  

**Purpose:**  
This document defines the **authoritative end state** of the application: its conceptual model, user interaction paths, data responsibilities, and computation boundaries. It is intended to be consumed by other LLMs to reason about correctness, feature completeness, and future evolution **without requiring access to source code**.

---

## 1. Core Framing

The application is a **music‑theory visualization engine**, not a DAW, not a composition tool, and not a pedagogy system.

Its sole responsibility is to:

> Translate abstract music theory (notes, intervals, scales, chords) into concrete visual positions on real instrument layouts.

All logic flows from:

**theory → pitch → physical projection → emphasis**

Never the reverse.

---

## 2. Canonical User Entry Modes

The application supports **two mutually exclusive theory entry modes**.  
These modes define *what theoretical context exists* and *what does not*.

---

### Mode A — Scale‑Context Mode

**User selects:**
- Root (`NoteToken`)
- Scale (`Scale`)

**System behavior:**
- Generates the full scale from root + scale intervals
- Derives diatonic chords from that scale
- Establishes a harmonic context

**Conceptual guarantees:**
- Every chord shown is **derived from** the selected scale
- Chord tones are a **subset of scale tones**
- The scale remains the parent theoretical structure

**Use cases:**
- Understanding harmony within a key
- Seeing how chords relate to a scale on an instrument
- Diatonic exploration

---

### Mode B — Chord‑Only Mode

**User selects:**
- Root (`NoteToken`)
- Chord (`Chord`)

**System behavior:**
- Generates **only** the selected chord tones
- **No scale is assumed, inferred, or displayed**
- No diatonic context exists

**Conceptual guarantees:**
- Chord tones are shown **in isolation**
- Any scale relevance is **intentionally undefined**
- No scale‑degree semantics apply

**Use cases:**
- Learning a chord shape
- Visualizing extensions or altered chords
- Exploring non‑diatonic harmony

---

### Mode Exclusivity Rule

- A session is always in **exactly one** of the above modes
- Selecting a scale **clears chord‑only context**
- Selecting a chord **clears scale context**
- The application **never attempts to infer** one mode from the other

---

## 3. Theory Engine (`theoryEngine.tsx`) Responsibilities

`theoryEngine.tsx` is the **single orchestration layer**.

It is:
- Stateless
- Deterministic
- Driven entirely by user selections

---

### Inputs

**Common (all modes):**
- Root (`NoteToken`)

**Scale‑Context Mode:**
- Scale definition

**Chord‑Only Mode:**
- Chord definition

**Always:**
- Instrument family
- Instrument variant
- Tuning (if applicable)

---

### Outputs

The engine always produces a **`noteMap`**, whose shape depends on the selected instrument:

- **Fretboard grid** (strings × frets) for guitar/bass
- **Linear MIDI range** for keyboard

Each note position includes semantic tagging:
- Absolute MIDI value
- Pitch class
- Membership flags:
  - `isScaleTone` (scale‑context mode only)
  - `isChordTone`

---

## 4. Theory Data Contract (Dataset A)

Theory data defines **what notes exist**, never **where** they exist.

Key properties:
- All theory is **relative to a root**
- Enharmonic spellings are preserved
- Semitone collisions are allowed and intentional

The theory engine treats theory data as **immutable and authoritative**.  
No theory logic is duplicated elsewhere.

---

## 5. Instrument Data Contract (Dataset B)

Instrument data defines **where notes can physically exist**.

**Instrument families:**
- Guitar
- Bass
- Keyboard

Each family has:
- Its own variant array
- Its own physical projection model

Arrays are used intentionally for:
- Stable ordering
- Predictable indexing
- Direct binding to UI dropdown selections

---

## 6. Physical Projection Models

### Stringed Instruments (Guitar / Bass)

- Base tuning defines open‑string MIDI values
- Frets increment pitch in semitones
- Physical model is a **2D grid**

### Keyboard Instruments

- Defined by lowest MIDI note + key count
- No strings, no frets
- Physical model is **linear**

These models are **never mixed**.

---

## 7. Visualization Semantics

Visualization is **purely representational**.

**Rules:**

**Scale‑Context Mode**
- All scale tones are visible
- Chord tones are emphasized
- Non‑chord scale tones are de‑emphasized

**Chord‑Only Mode**
- Only chord tones are highlighted
- No implication of key or scale

Rendering layers must **never infer theory**.

---

## 8. Non‑Goals (Hard Boundaries)

The application explicitly does **not**:
- Recommend chords or scales
- Generate progressions
- Teach music theory concepts
- Infer musical intent

Any future features must **not violate these constraints**.

---

## 9. End‑State Definition

The application is considered complete when:
- Both user entry modes are fully supported
- Theory and instrument datasets remain isolated
- `theoryEngine.tsx` is the **only join layer**
- Every visual output is explainable via theory rules
- No hidden assumptions or inferred context exist

> If an LLM can answer **why a note is shown** using *only this document*, the system is correct.

---

## 10. Mental Model Summary

> “The user defines theory intent.  
> The engine resolves pitch.  
> Instruments only constrain location.  
> Visualization reflects nothing more.”