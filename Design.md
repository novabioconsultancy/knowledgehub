# NovaBio Exchange Website Design

## Overview
- **Motion Style**: "Fluid Precision" - Organic, liquid transitions meeting scientific rigor
- **Animation Intensity**: Ultra-Dynamic
- **Technology Stack**: React, GSAP (ScrollTrigger, Flip), WebGL (for specific hero/distortion effects), CSS Modules

## Brand Foundation
- **Colors**: 
  - Primary: #062633 (Deep Navy)
  - Secondary: #0f5066 (Teal)
  - Accent: #c07c48 (Amber)
  - Background: #f1f1ef (Light Warm Grey)
  - Text: #1a1a1a (Black)
  - White: #ffffff
- **Typography**: 
  - Primary: "Inter" (400, 500, 600, 700)
  - Secondary: "Lato" (100-900)
  - Accent: "Cardo" (Regular, Italic)
  - Serif: "PT Serif" (Regular, Italic, 700)
- **Core Message**: Bridging innovation and accessibility in biotech.
- **Font Family**: Inter, Lato, Cardo, PT Serif

## Global Motion System

### Animation Timing
- **Easing Library**: 
  - `fluid`: `cubic-bezier(0.19, 1, 0.22, 1)` (Luxurious, long settle)
  - `snap`: `cubic-bezier(0.87, 0, 0.13, 1)` (High contrast, abrupt start)
  - `drift`: `linear` (For continuous ambient motion)
- **Duration Scale**: 
  - Micro-interactions: 0.3s
  - Layout shifts: 0.8s
  - Page transitions: 1.2s
- **Stagger Patterns**: 0.05s per letter for text, 0.1s per item for grids

### Continuous Effects
- **Living Layouts**: Subtle breathing room – elements have a 0.5% scale pulse on idle.
- **Texture**: Grain overlay (opacity 0.03) fixed to viewport to unify the digital/organic feel.
- **Cursor**: Custom ring cursor that magnetically snaps to interactive elements, scaling up and blending (exclusion mode) over dark sections.

### Scroll Engine
- **Physics**: Smooth scroll dampening (lerp: 0.1) for weight.
- **Parallax**: 
  - Foreground elements: speed 1.2
  - Content: speed 1.0
  - Background accents: speed 0.8
- **Reveal**: Content doesn't just fade in; it unmasks (clip-path) or slides up with skew.

## Section 1: Navigation Bar

### Layout
**Dynamic Island Header**: Instead of a full-width bar, the nav is a floating capsule that expands/contracts based on scroll direction.
- **State A (Top)**: Full width transparent, integrated with hero.
- **State B (Scrolled)**: Compact glass-morphism capsule centered at top, blurring content behind it.

#### Spatial Composition
- **Z-Index**: 1000 (Always top)
- **Structure**: Flex row, items spread across the capsule width.

### Content
- **Logo**: NovaBio SVG
- **Links**: Home, About, Articles, Podcasts, Contact
- **CTA**: "Get in Touch"

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Navbar | Slide Down | Y: -100% → 0% | 0.8s | 0.2s | fluid |
| Links | Stagger Fade | Opacity: 0 → 1, Y: -20px → 0 | 0.6s | 0.4s | fluid |

#### Interaction Effects
- **Hover**: Links glow (text-shadow) and a small dot appears below them. The capsule background morphs slightly towards the hovered item (magnetic field effect).
- **Scroll**: On scroll down, capsule retracts to just logo + "Menu". On scroll up, expands to full links.

## Section 2: Hero Section

### Layout
**Asymmetric Fluid Grid**: Breaking the standard 2-column.
- The **Headline** is massive, breaking container bounds on the left.
- The **Hero Image** is not a rectangle but a fluid organic shape (SVG mask) that floats on the right, overlapping the text slightly.
- **Description** floats freely in the bottom-right negative space.

#### Spatial Composition
- **Headline**: Absolute positioning left, z-index 2.
- **Image**: Right-aligned, z-index 1.
- **Depth**: Text creates a "cutout" effect against the image.

### Content
- **Headline**: "Connecting the dots in biotechnology for a healthier tomorrow"
- **Description**: "Join us in exploring the latest advancements, insights, and stories shaping the future of healthcare and life sciences."

### Images
**Hero Image**
- **Resolution:** 1792w maximum
- **Aspect Ratio:** 4:3
- **Transparent Background:** No
- **Visual Style:** Modern, clean, professional healthcare photography
- **Subject:** Young woman with long dark hair in white lab coat and blue gloves holding flask with blue solution
- **Color Palette:** White, Blue, Natural tones
- **Generation Prompt:** "Professional biotech laboratory photograph, young woman scientist in white lab coat and blue gloves holding a flask with blue solution, modern lab equipment in background, soft natural lighting, clean and minimal composition, high resolution, 4:3 aspect ratio"

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Headline | Split-Line Reveal | Y: 100% → 0% (masked) | 1.0s | 0.2s | fluid |
| Image | Liquid Reveal | Mask Scale: 0 → 1 | 1.2s | 0.4s | fluid |
| Description | Fade Up | Y: 40px → 0, Opacity: 0 → 1 | 0.8s | 0.8s | fluid |

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Hero Image | Parallax | Top | Bottom | Y: -50px → 50px |
| Scroll | Headline | Opacity/Blur | Top | 50% | Opacity: 1 → 0, Blur: 0 → 10px |

#### Continuous Animations
- **Image**: Very subtle "breathing" scale (1.0 to 1.02) over 10s.
- **Background**: A faint, slow-moving noise texture overlay on the section background.

#### Interaction Effects
- **Mouse Move**: The Hero Image has a "3D Tilt" effect (perspective 1000px, rotateX/Y based on mouse position) to give it depth.

### Advanced Effects

#### Shader Effects
- **Image Reveal**: On load, the image materializes using a "dissolve" shader effect, where pixels appear to coalesce from noise.

## Section 3: Latest Articles

### Layout
**Parallax Offset Grid**: A 3-column grid where the middle column is vertically offset (translated down by 80px).
- **Card Design**: Minimalist. Image is full top, but the title/author section is a "glass" pane that slides up over the image on hover.

#### Spatial Composition
- **Column 1 & 3**: Standard scroll.
- **Column 2**: `transform: translateY(80px)` creating a staggered visual rhythm.

### Content
- **Title**: "Latest Articles"
- **Link**: "See all articles"

### Images
**Article Thumbnails**
- **Resolution:** 624w
- **Aspect Ratio:** 3:2
- **Transparent Background:** No
- **Visual Style:** Professional healthcare photography
- **Subject:** Various healthcare/biotech scenes
- **Color Palette:** Natural, clinical colors

### Motion Choreography

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Column 2 | Parallax | Top | Bottom | Y: 80px → 0px |
| Scroll | Cards | Scale/Fade | Entry | 20% | Scale: 0.9 → 1, Opacity: 0 → 1 |

#### Interaction Effects
- **Card Hover**: 
  - Image scales (1.0 → 1.1).
  - The "glass" info pane slides up further.
  - A "Read Article" circular button magnetizes to the cursor within the card area.

## Section 4: Podcasts

### Layout
**Horizontal Drag Slider**: Instead of a grid, this section locks the vertical scroll and becomes a horizontal experience.
- **Progress**: A progress bar at the bottom indicates the slider state.
- **Background**: Dark Teal (#062633) with a large, faint, spinning circular text logo in the background ("NOVABIO • NOVABIO •").

#### Spatial Composition
- **Container**: Full viewport width.
- **Cards**: Large, poster-like cards arranged horizontally with generous spacing.

### Content
- **Title**: "Latest Podcasts"
- **Link**: "See all podcasts"

### Images
**Podcast Thumbnails**
- **Resolution:** 608w
- **Aspect Ratio:** 3:2
- **Transparent Background:** No
- **Visual Style:** Professional healthcare photography
- **Subject:** Various healthcare scenes

### Motion Choreography

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Section | Pin | Top | Bottom | Horizontal Scroll |
| Scroll | Background Text | Rotate | Start | End | Rotation: 0 → 45deg |

#### Interaction Effects
- **Drag**: Users can drag the slider. The cards have "physics" - they tilt (skew) in the direction of the drag.
- **Hover**: Play button appears centrally, pulsing.

## Section 5: About

### Layout
**Cinematic Split**: A 50/50 split where the image acts as a "window".
- **Image Mask**: The image is masked by a large circle that expands to a rounded rectangle as it enters the viewport.
- **Text**: Sticky positioning on the right, scrolling naturally while the image holds momentarily.

### Content
- **Title**: "About NovaBio"
- **Body**: Description text...
- **CTA**: "Learn More"

### Images
**About Image**
- **Resolution:** 1792w
- **Aspect Ratio:** 4:3
- **Transparent Background:** No
- **Visual Style:** Professional healthcare photography
- **Subject:** Two women in lab coats using tablet in lab
- **Color Palette:** White, teal, clinical colors

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Image Mask | Expand | Circle → Rounded Rect | 1.0s | 0.0s | fluid |
| Text | Slide Up | Y: 60px → 0 | 0.8s | 0.3s | fluid |

#### Scroll Effects
- **Image**: The image inside the mask has a subtle zoom-out effect (scale 1.2 → 1.0) during the initial scroll.

## Section 6: CTA Section

### Layout
**Magnetic Typography**: A centered layout where the text is the hero.
- **Background**: The background image is treated with a "halftone" or "pixelate" shader effect that resolves to clear image on hover.

### Content
- **Headline**: "Let's collaborate..."
- **Body**: "Whether you're a startup..."
- **Button**: "Get in Touch"

### Images
**CTA Background**
- **Resolution:** 3008w
- **Aspect Ratio:** 16:9
- **Transparent Background:** No
- **Visual Style:** Professional healthcare photography
- **Subject:** Woman with cochlear implant using tablet
- **Color Palette:** Warm natural tones

### Motion Choreography

#### Interaction Effects
- **Button**: Magnetic effect (button moves towards cursor).
- **Background**: On hover over the section, the background image blur clears (Blur: 10px → 0px).

## Section 7: Footer

### Layout
**Curtain Reveal**: The footer is fixed at `z-index: -1` at the bottom of the page. The preceding section (CTA) has a `margin-bottom` equal to the footer height. As the user scrolls to the end, the CTA section lifts up like a curtain to reveal the footer underneath.

### Content
- **Logo**: NovaBio
- **Links**: Navigation, Admin
- **Socials**: Icons
- **Legal**: Copyright

### Motion Choreography
- **Links**: On hover, links shift x: 10px and change color to Amber.

---

## Technical Implementation Notes

### Required Libraries
- **GSAP**: Core animation engine (ScrollTrigger for scroll, Flip for layout changes).
- **Lenis**: For smooth scroll dampening (essential for the "fluid" feel).
- **React-Spring** or **Framer Motion**: For micro-interactions (hover states).
- **Three.js / React-Three-Fiber**: For the Hero image liquid distortion (optional, can fallback to CSS clip-path for performance).

### Critical Performance Rules
- ✅ **Use transform3d()** to force hardware acceleration.
- ✅ **Will-change**: Apply `will-change: transform` only to active elements.
- ❌ **No Layout Thrashing**: Do not animate `width`, `margin`, or `padding`. Use `scale` and `translate`.
- ❌ **Limit Blurs**: Backdrop-filter is expensive. Use sparingly (Nav only).
- **React**: Use `useRef` for all animations to bypass React render cycle.

### Browser Support
- **Progressive Enhancement**: Fallback to standard grid layout if JS is disabled.
- **Reduced Motion**: If `prefers-reduced-motion: reduce` is detected, disable parallax and smooth scroll, switch to simple fades.
