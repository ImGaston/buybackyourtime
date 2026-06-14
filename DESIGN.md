---
name: Efficient Growth
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#3e484e'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#6e797f'
  outline-variant: '#bdc8cf'
  surface-tint: '#006684'
  primary: '#006684'
  on-primary: '#ffffff'
  primary-container: '#00a2cf'
  on-primary-container: '#003343'
  inverse-primary: '#68d3ff'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#646464'
  tertiary: '#984700'
  on-tertiary: '#ffffff'
  tertiary-container: '#ed7300'
  on-tertiary-container: '#4e2100'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bee9ff'
  primary-fixed-dim: '#68d3ff'
  on-primary-fixed: '#001f2a'
  on-primary-fixed-variant: '#004d64'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#ffb68a'
  on-tertiary-fixed: '#321300'
  on-tertiary-fixed-variant: '#743500'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
  surface-off-white: '#F8F9FA'
  border-subtle: '#E2E8F0'
  time-gold: '#FF7C00'
  focus-cyan: '#00A2CF'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  button:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 40px
  gutter: 16px
---

## Brand & Style

This design system is engineered for high-performance entrepreneurs and individuals seeking to reclaim their time. The brand personality is **authoritative, architectural, and hyper-efficient**. It draws inspiration from the "Buy Back Your Time" philosophy, emphasizing clarity over clutter and action over deliberation.

The design style is **Corporate Modern with a Minimalist edge**. It utilizes a strict grid, generous negative space, and high-contrast elements to ensure the user’s focus remains on high-value tasks. The aesthetic is "premium utility"—every element must serve a functional purpose, mirroring the mindset of a successful CEO. The UI should evoke a sense of immediate control and strategic headspace.

## Colors

The color palette is built on a foundation of **monochromatic rigor punctuated by high-energy accents**. 

- **Primary (#00A2CF):** Used for "Growth" actions—primary buttons, progress indicators, and active states. It represents focus and clarity.
- **Secondary (#000000):** Used for deep-contrast headers and navigation elements to provide a "premium" and grounded feel.
- **Tertiary (#FF7C00):** Reserved for high-urgency or high-value callouts, such as "Buy Back" opportunities or critical time-leaks.
- **Neutrals:** We use a crisp white background with `#555555` for secondary text to maintain legibility without the harshness of pure black on every line.

## Typography

The typography system prioritizes **vertical rhythm and scan-ability**.

- **Headlines (Hanken Grotesk):** A sharp, modern sans-serif that conveys professionalism. Large display sizes use heavy weights and tight tracking for an editorial, impactful look.
- **Body (Inter):** The industry standard for readability. It is used for all descriptive text to ensure no friction during consumption.
- **Labels (JetBrains Mono):** Monospaced labels are used for data points, time durations, and metadata. This introduces a "technical/precision" feel, signaling that these are metrics to be managed.

## Layout & Spacing

This system utilizes a **Fluid-Fixed Hybrid** approach. While the layout adapts to screen width, the internal content is constrained by a strict 8px baseline grid to maintain a "structured" feel.

- **Margins:** A standard 20px horizontal margin is applied to mobile screens to prevent content from feeling cramped.
- **Stacking:** Use `stack-lg` (40px) to separate major conceptual sections (e.g., "Time Audit" vs "Energy Map"). Use `stack-sm` (12px) for related items within a card.
- **Alignment:** All text should be left-aligned to mimic the flow of a professional document or audit report.

## Elevation & Depth

To maintain a clean and focused environment, this design system rejects heavy shadows in favor of **Tonal Layers and Crisp Outlines**.

- **Surface Tiers:** The base background is white (`#FFFFFF`). Secondary containers (cards) use a subtle off-white surface (`#F8F9FA`) with a 1px border (`#E2E8F0`).
- **Active Elevation:** Only the primary "Action" cards should utilize a shadow. These shadows should be extremely diffused (20px blur), low opacity (8%), and tinted with the Primary Cyan to suggest growth and importance.
- **Flat Depth:** Depth is primarily conveyed through contrast. Darker backgrounds (Deep Navy or Black) are used for "Focus Mode" or navigation bars to pin the user's attention.

## Shapes

The shape language is **geometric and precise**. We use "Soft" roundedness (4px - 8px) to provide a modern feel without becoming "bubbly" or unprofessional.

- **Buttons:** 4px radius for a sharp, executive look.
- **Cards:** 8px radius (`rounded-lg`) to distinguish content blocks from the screen edge.
- **Inputs:** 4px radius to match buttons, creating a cohesive form-entry experience.
- **Selection Indicators:** Use vertical bars or underlines rather than circles where possible to maintain the "grid-like" efficiency.

## Components

- **Primary Buttons:** Solid `#00A2CF` background, white text, 4px radius. Use for high-leverage tasks (e.g., "Delegate Task").
- **Audit Cards:** Off-white background, 1px border, with a `label-caps` monospaced tag at the top right indicating the "Time Value" (e.g., "$500/hr").
- **Time Trackers:** Use `JetBrains Mono` for all time-based counters. The numbers should be high-contrast (Black) to emphasize that time is a finite currency.
- **Chips:** Used for categorizing tasks (e.g., "Administrative", "Strategic"). Chips should be "Ghost Style"—transparent background with a 1px border and `label-caps` typography.
- **Progress Bars:** Thin 4px bars using the Primary Cyan for completion and the Tertiary Orange for "Time Leaks" or warning states.
- **Inputs:** Clean, bottom-border only or very light grey border. Focus state is a 2px Primary Cyan bottom border.