# Positive Barta - Design Document

A comprehensive design reference for the Positive Barta reels app. This document covers the full design system, component library, screen inventory, theming, and conventions to follow during development.

---

## 1. Project Overview

**Positive Barta** is a mobile-first, video-based reels app focused on positive content - uplifting news, wellness, nature, and community events.

**Tech approach:** Each screen is a standalone HTML file with inline `<style>` blocks, sharing a global stylesheet (`css/theme.css`) and theme script (`js/theme.js`). No frameworks - purely vanilla HTML, CSS, and JavaScript.

**Phone mockup:** Every screen renders inside a 390x844px phone frame with a dynamic island, status bar, and (where applicable) a bottom tab bar. This simulates an iPhone 14 Pro form factor.

---

## 2. File Structure

```
Positive Barta/
  index.html              # Gallery page - grid of all 16 screens with theme toggle
  Design.md               # This document
  css/
    theme.css             # Design tokens + shared component styles (665 lines)
  js/
    theme.js              # Theme toggle with localStorage persistence (69 lines)
  assets/                 # (empty - reserved for future static assets)
  screens/
    splash.html           # Onboarding / intro slides
    login.html            # Email + social login
    signup.html           # Registration form
    forgot-password.html  # Password reset flow
    home.html             # Vertical video reels feed (core screen)
    news.html             # Curated news articles with categories
    create.html           # Camera / video recording interface
    events.html           # Discover & RSVP to events
    profile.html          # User profile with video grid
    edit-profile.html     # Edit profile form
    search.html           # Search / explore with trending tags
    notifications.html    # Notifications grouped by type & time
    settings.html         # Account, privacy, preferences
    comments.html         # Bottom-sheet comment thread with replies
    messages.html         # Chat / DM list + conversation
    followers.html        # Followers / following user list
    rewards.html          # Reward points catalog with claim functionality
```

---

## 3. Design Tokens

All tokens are CSS custom properties defined in `css/theme.css` on `:root` (dark, default) and overridden by `[data-theme="light"]`.

### 3.1 Colors

| Token | Dark (default) | Light |
|---|---|---|
| `--bg-primary` | `#0A0A0F` | `#F5F5FA` |
| `--bg-surface` | `#1A1A2E` | `#FFFFFF` |
| `--bg-surface-light` | `#222240` | `#EEEEF4` |
| `--bg-card` | `#16162A` | `#FFFFFF` |
| `--bg-input` | `#1E1E36` | `#F0F0F6` |
| `--bg-tab-bar` | `rgba(15,15,26,0.95)` | `rgba(255,255,255,0.95)` |
| `--bg-page` | `#050508` | `#E8E8F0` |
| `--accent-primary` | `#E94560` | `#E94560` |
| `--accent-secondary` | `#533483` | `#533483` |
| `--accent-gradient` | `linear-gradient(135deg, #E94560, #533483)` | same |
| `--text-primary` | `#FFFFFF` | `#1A1A2E` |
| `--text-secondary` | `#A0A0B0` | `#5C5C70` |
| `--text-muted` | `#666680` | `#9090A0` |
| `--text-link` | `#7B8CFF` | `#4F5BD5` |
| `--border-color` | `#2A2A3E` | `#DDDDE8` |
| `--border-light` | `#3A3A52` | `#C8C8D8` |
| `--success` | `#00D68F` | `#00B377` |
| `--warning` | `#FFAA00` | `#E09500` |
| `--error` | `#FF3D71` | `#E0354F` |
| `--frame-border-inner` | `#1a1a2e` | `#C8C8D8` |
| `--frame-border-outer` | `#0a0a0f` | `#B0B0C0` |
| `--dynamic-island-bg` | `#000` | `#1A1A2E` |
| `--hover-overlay` | `rgba(255,255,255,0.03)` | `rgba(0,0,0,0.03)` |
| `--hover-overlay-strong` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.05)` |
| `--accent-subtle` | `rgba(233,69,96,0.1)` | `rgba(233,69,96,0.08)` |

### 3.2 Typography

| Token | Value |
|---|---|
| `--font-family` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` |
| `--font-xs` | `11px` |
| `--font-sm` | `13px` |
| `--font-md` | `15px` |
| `--font-lg` | `17px` |
| `--font-xl` | `20px` |
| `--font-2xl` | `24px` |
| `--font-3xl` | `32px` |

### 3.3 Spacing

| Token | Value |
|---|---|
| `--space-xs` | `4px` |
| `--space-sm` | `8px` |
| `--space-md` | `12px` |
| `--space-lg` | `16px` |
| `--space-xl` | `24px` |
| `--space-2xl` | `32px` |
| `--space-3xl` | `48px` |

### 3.4 Border Radius

| Token | Value |
|---|---|
| `--radius-sm` | `6px` |
| `--radius-md` | `10px` |
| `--radius-lg` | `16px` |
| `--radius-xl` | `24px` |
| `--radius-full` | `9999px` |

### 3.5 Shadows

| Token | Dark | Light |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.3)` | `0 1px 3px rgba(0,0,0,0.08)` |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | `0 4px 12px rgba(0,0,0,0.1)` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | `0 8px 24px rgba(0,0,0,0.12)` |

### 3.6 Phone Frame

| Token | Value |
|---|---|
| `--phone-width` | `390px` |
| `--phone-height` | `844px` |

---

## 4. Component Library

All shared components are defined in `css/theme.css`. Screen-specific styles live in each screen's inline `<style>` block.

### 4.1 Phone Frame

```html
<div class="phone-frame">
  <div class="dynamic-island"></div>
  <div class="status-bar">
    <span class="time">9:41</span>
    <span class="icons"><!-- wifi + battery SVGs --></span>
  </div>
  <div class="screen-content">
    <!-- page content -->
  </div>
  <nav class="tab-bar"><!-- tabs --></nav>
</div>
```

- **`.phone-frame`**: 390x844px, 44px border-radius, triple-ring border (inner/outer/shadow), flex column layout.
- **`.dynamic-island`**: 126x36px, centered at top, `z-index: 200`.
- **`.status-bar`**: Time left, icons right. 14px top padding, `z-index: 100`. On home.html it's `position: absolute` with `z-index: 50` to overlay the video.
- **`.screen-content`**: `flex: 1`, scrollable (hidden scrollbar via `-webkit-scrollbar: none` and `scrollbar-width: none`).

### 4.2 Top Navigation Bar

```html
<div class="top-bar">
  <span class="top-bar-title">Title</span>
  <div class="top-bar-icons">
    <button class="icon-btn"><!-- SVG --></button>
  </div>
</div>
```

- **`.icon-btn`**: 36x36px circle, `var(--bg-surface)` background, with optional `.badge` (16px red dot).

### 4.3 Bottom Tab Bar

```html
<nav class="tab-bar">
  <a class="tab-item active" href="home.html"><!-- SVG + label --></a>
  <a class="tab-item" href="news.html"><!-- SVG + label --></a>
  <a class="tab-item create-btn" href="create.html">
    <div class="create-btn-inner"><!-- + SVG --></div>
  </a>
  <a class="tab-item" href="events.html"><!-- SVG + label --></a>
  <a class="tab-item" href="profile.html"><!-- SVG + label --></a>
</nav>
```

**5 tabs:** Home, News, Create (+), Events, Profile.

- Tab bar uses `var(--bg-tab-bar)` with `backdrop-filter: blur(20px)`.
- `.tab-item.active` gets `var(--text-primary)` color + filled SVG.
- `.create-btn` is raised 10px with an accent gradient inner button and white glow shadow.
- On `home.html` the tab bar is `position: absolute; bottom: 0; z-index: 30`.

### 4.4 Buttons

| Class | Description |
|---|---|
| `.btn` | Base: 14px/24px padding, `--radius-md`, 600 weight, flex centered |
| `.btn-primary` | Red accent background, white text |
| `.btn-secondary` | Surface background, bordered |
| `.btn-outline` | Transparent, red accent border |
| `.btn-ghost` | Transparent, no border, muted text |
| `.btn-full` | `width: 100%` |
| `.btn-sm` | 8px/16px padding, smaller font, `--radius-sm` |

### 4.5 Input Fields

```html
<div class="input-group">
  <label>Label</label>
  <div class="input-with-icon">
    <span class="input-icon"><!-- SVG --></span>
    <input class="input-field" placeholder="...">
    <button class="input-action"><!-- eye icon etc --></button>
  </div>
</div>
```

- **`.input-field`**: `var(--bg-input)` background, `var(--border-color)` border, focus highlights with `var(--accent-primary)`.
- **`.input-with-icon`**: Adds left padding for icon, optional right-side action button.

### 4.6 Chips

```html
<div class="chips-row">
  <button class="chip active">All</button>
  <button class="chip">Trending</button>
</div>
```

- Horizontal scrollable row (hidden scrollbar).
- `.chip.active` gets accent background + white text.

### 4.7 Cards

```html
<div class="card"><!-- content --></div>
```

- `var(--bg-card)` background, `--radius-lg` corners, `var(--border-color)` border.

### 4.8 Avatars

```html
<div class="avatar">S</div>            <!-- 40px default -->
<div class="avatar avatar-sm">S</div>  <!-- 32px -->
<div class="avatar avatar-lg">S</div>  <!-- 56px -->
<div class="avatar avatar-xl">S</div>  <!-- 80px -->
```

- Circular, accent gradient background by default, white bold text.
- Individual avatars use inline `style="background: linear-gradient(...);"` with unique color pairs.
- Can contain `<img>` for real profile photos.

### 4.9 Toggle Switch

```html
<button class="toggle active"></button>
```

- 48x28px, sliding 22px circle knob.
- `.active` state: accent red background, knob slides right 20px.
- For the Dark Mode toggle specifically, add class `theme-toggle` to auto-wire with `js/theme.js`.

### 4.10 List Items

```html
<div class="list-item">
  <div class="avatar"><!-- icon/avatar --></div>
  <div class="list-item-content">
    <div class="list-item-title">Title</div>
    <div class="list-item-subtitle">Subtitle</div>
  </div>
  <div class="list-item-right"><!-- chevron, time, etc --></div>
</div>
```

- Hover uses `var(--hover-overlay)`.

### 4.11 Section Headers

```html
<div class="section-header">
  <span class="section-title">Title</span>
  <button class="section-action">See All</button>
</div>
```

### 4.12 Divider

```html
<div class="divider">or</div>
```

- Horizontal line with centered text (used on login/signup between form and social buttons).

### 4.13 Social Login Buttons

```html
<div class="social-login-row">
  <button class="social-btn"><!-- Google SVG --></button>
  <button class="social-btn"><!-- Apple SVG --></button>
  <button class="social-btn"><!-- Facebook SVG --></button>
</div>
```

### 4.14 Back Button

```html
<button class="back-btn">
  <svg><!-- left arrow --></svg>
</button>
```

- 36px circle, transparent background, `var(--text-primary)` color.

### 4.15 Utility Classes

**Text:** `.text-center`, `.text-muted`, `.text-secondary`, `.text-accent`, `.text-link`, `.text-sm`, `.text-xs`, `.text-lg`, `.text-xl`, `.text-2xl`, `.text-3xl`, `.font-bold`, `.font-medium`

**Spacing:** `.mt-xs` through `.mt-2xl`, `.mb-sm` through `.mb-xl`, `.px-lg`, `.py-lg`, `.p-lg`

**Flex:** `.flex`, `.flex-col`, `.flex-1`, `.items-center`, `.justify-center`, `.justify-between`, `.flex-wrap`

**Gap:** `.gap-sm`, `.gap-md`, `.gap-lg`

**Text overflow:** `.truncate` (single line ellipsis), `.line-clamp-2` (2-line clamp)

---

## 5. Screen Inventory & Navigation Map

### 5.1 Screen Categories

**Authentication Flow (4 screens):**

| Screen | File | Description | Navigates to |
|---|---|---|---|
| Splash / Onboarding | `splash.html` | Animated intro slides | login, signup |
| Login | `login.html` | Email + social login | signup, forgot-password, home |
| Sign Up | `signup.html` | Registration form with validation | login |
| Forgot Password | `forgot-password.html` | Email reset with success state | login |

**Main Tab Screens (5 screens):**

| Screen | File | Description | Tab |
|---|---|---|---|
| Home / Reels | `home.html` | Full-screen vertical video feed | Home (1st) |
| News | `news.html` | Curated articles with category chips | News (2nd) |
| Create | `create.html` | Camera/recording interface | Create + (3rd) |
| Events | `events.html` | Discover & RSVP to events | Events (4th) |
| Profile | `profile.html` | User profile with video grid | Profile (5th) |

**Secondary Screens (5 screens):**

| Screen | File | Description | Reached from |
|---|---|---|---|
| Search / Explore | `search.html` | Trending tags, creators, grid | Home top bar, News |
| Notifications | `notifications.html` | Grouped by type & time | Home top bar |
| Edit Profile | `edit-profile.html` | Update profile form | Profile |
| Settings | `settings.html` | Account, privacy, theme toggle | Profile |
| Rewards | `rewards.html` | Earn points & claim rewards | Profile rewards card |

**Social Screens (3 screens):**

| Screen | File | Description | Reached from |
|---|---|---|---|
| Comments | `comments.html` | Bottom-sheet comment thread | Home reel actions |
| Messages / DM | `messages.html` | Chat list + conversation | Profile, notifications |
| Followers | `followers.html` | User list with follow actions | Profile |

### 5.2 Navigation Map

```
splash.html
  -> login.html
  -> signup.html

login.html
  -> signup.html
  -> forgot-password.html
  -> home.html (on success)

signup.html
  -> login.html

forgot-password.html
  -> login.html

home.html (Tab 1)
  -> search.html (top bar)
  -> notifications.html (top bar)
  -> profile.html (reel avatar)
  -> comments.html (reel comment action)
  <-> news.html, create.html, events.html, profile.html (tab bar)

news.html (Tab 2)
  <-> all tab screens (tab bar)

create.html (Tab 3)
  <-> all tab screens (tab bar)

events.html (Tab 4)
  <-> all tab screens (tab bar)

profile.html (Tab 5)
  -> edit-profile.html
  -> settings.html
  -> followers.html
  -> rewards.html (rewards card)
  <-> all tab screens (tab bar)

settings.html
  -> profile.html (back)
  Contains Dark Mode toggle (wired to theme.js)

edit-profile.html
  -> profile.html (back / save)

followers.html
  -> profile.html (back)

comments.html
  -> home.html (back / close)

messages.html
  (standalone / reached from profile or notifications)

notifications.html
  -> home.html (back)

search.html
  -> home.html (back)

rewards.html
  -> profile.html (back)
  Contains reward catalog with claim actions and success modal
```

---

## 6. Theme System

### 6.1 How It Works

1. **CSS variables** in `:root` define the dark theme (default). `[data-theme="light"]` overrides them for light mode.
2. **`js/theme.js`** is an IIFE that:
   - Reads `localStorage` key `pb-theme` **before paint** and sets `data-theme="light"` on `<html>` if saved.
   - Default is dark (no attribute on `<html>`).
   - Exposes `window.PBTheme` API.
3. **Persistence** via `localStorage` key `pb-theme` with values `"dark"` or `"light"`.

### 6.2 JavaScript API

```js
window.PBTheme.get()      // Returns 'dark' or 'light'
window.PBTheme.set(theme) // Sets theme ('dark' or 'light') and persists
window.PBTheme.toggle()   // Toggles between dark and light
```

### 6.3 Auto-wiring Toggle Buttons

Any element with class `.theme-toggle` is automatically wired on `DOMContentLoaded`:
- Click toggles the theme.
- The `.active` class is added when dark mode is on, removed for light mode.

Used on `settings.html` for the Dark Mode toggle switch. The `index.html` gallery has its own inline toggle logic using the same `pb-theme` localStorage key.

### 6.4 Adding Theme Support to New Screens

1. Include `<link rel="stylesheet" href="../css/theme.css">` in `<head>`.
2. Include `<script src="../js/theme.js"></script>` at the end of `<body>`.
3. Use CSS variables (e.g., `var(--bg-primary)`, `var(--text-primary)`) for all colors. **Never hardcode color values** in inline styles or `<style>` blocks (except for content that should be theme-independent, like video overlays or camera interfaces).
4. For hover states, use `var(--hover-overlay)` or `var(--hover-overlay-strong)`.
5. For subtle accent backgrounds, use `var(--accent-subtle)`.

### 6.5 Theme Exceptions

- **`create.html`**: The camera/recording screen stays dark by design. It has hardcoded `#000` backgrounds for `.phone-frame`, `.camera-bottom`, and `.camera-modes`.
- **`home.html` video overlays**: Reel overlays (gradients, text shadows, action buttons) use hardcoded `rgba(0,0,0,...)` and white text because they render on top of video content regardless of theme.
- **Avatar inline gradients**: Each avatar has a unique inline `background: linear-gradient(...)` that stays the same in both themes.

---

## 7. Home Screen - Video Reels

The home screen (`screens/home.html`) is the core experience: a full-screen vertical video feed with swipe navigation.

### 7.1 Reel Data

| # | User | Avatar | Video Source | Caption |
|---|---|---|---|---|
| 1 | @sarah_creates | S (purple) | `8417476/8417476-sd_540_960_30fps.mp4` | Sunset capture |
| 2 | @mike_travels | M (pink) | `29279025/12628755_540_960_30fps.mp4` | Tokyo exploration |
| 3 | @alex_fitness | A (blue) | `6171973/6171973-sd_540_960_30fps.mp4` | Morning routine |
| 4 | @priya_wellness | P (orange) | `4111496/4111496-sd_540_960_30fps.mp4` | Lake meditation |
| 5 | @david_nature | D (green) | `11500789/11500789-sd_540_960_30fps.mp4` | Waterfall trail |

All videos are from Pexels (540x960, 30fps SD). Base URL: `https://videos.pexels.com/video-files/`

### 7.2 Reel Structure

Each reel contains:
- **`<video>`** element: `loop muted playsinline`, first reel has `autoplay`, others have `preload="metadata"`.
- **Top overlay**: App logo + search/notification action buttons (gradient fade from black).
- **Right-side actions** (vertical stack): Avatar with follow badge, Like (heart), Comment, Share, Save, More (three dots).
- **Bottom overlay**: Username, caption with hashtags, music ticker (gradient fade from black).
- **Progress bar**: 2px white bar at bottom tracking video `currentTime / duration`.
- **Pause indicator**: 64px circle with pause icon, shown/hidden on single-tap.
- **Double-tap heart**: 80px heart animation on double-tap (scale + fade keyframes).
- **Swipe hint**: "Swipe up for next" fades in and out once.

### 7.3 Interaction Patterns

| Gesture | Action |
|---|---|
| Swipe up (>50px) | Next reel |
| Swipe down (>50px) | Previous reel |
| Single tap | Toggle play/pause (310ms delay to distinguish from double-tap) |
| Double tap (<300ms) | Heart animation (like) |
| Tap like icon | Toggle `.liked` class (fills heart red) |

### 7.4 Video Playback

- Only the active reel's video plays; all others are paused.
- On reel switch: `currentTime` resets to 0, `play()` is called.
- Progress bar updates via `requestAnimationFrame` loop reading `video.currentTime / video.duration`.
- Touch and mouse events are both handled for swipe detection.

---

## 8. Reward Points System

The reward points system lets users earn points through engagement and redeem them for in-app perks.

### 8.1 Profile Integration

A **rewards card** is displayed on `profile.html` between the action buttons and the content tabs. It shows:
- Trophy icon with gold gradient background
- "Reward Points" label with the total points (e.g., 2,450 pts)
- "Claim" button linking to `rewards.html`

### 8.2 Rewards Page Structure (`screens/rewards.html`)

The rewards page contains:

1. **Points Banner**: Full-width gradient card (accent gradient) showing the user's total points and a motivational subtitle. Decorative translucent circles for visual flair.

2. **How to Earn**: Three cards explaining earning methods:
   | Action | Points | Icon Color |
   |---|---|---|
   | Watch Reels | +5 pts | Blue (#4E82FF) |
   | Share | +10 pts | Green (--success) |
   | Create | +25 pts | Red (--accent-primary) |

3. **Reward Catalog**: List of claimable rewards, each with:
   - Color-coded thumbnail icon (gradient backgrounds)
   - Reward name and description
   - Point cost (shown with trophy icon in gold)
   - Claim button (state-dependent)

4. **Points History Link**: Placeholder link at the bottom for future history view.

5. **Claim Success Modal**: Overlay modal with checkmark icon, reward name, and confirmation message.

### 8.3 Reward Catalog Items

| Reward | Cost | Thumbnail | Description |
|---|---|---|---|
| Verified Badge | 500 pts | Gold gradient | Profile badge for 30 days |
| Exclusive Profile Frame | 750 pts | Blue gradient | Premium animated profile frame |
| Reel Boost | 1,000 pts | Purple gradient | 2x visibility for 24 hours |
| Mystery Gift Box | 2,000 pts | Red gradient | Random premium reward |
| Ad-Free Week | 3,500 pts | Orange gradient | No ads for 7 days |
| Exclusive Merch | 5,000 pts | Green gradient | Limited edition t-shirt |

### 8.4 Claim Button States

| State | Class | Appearance | Behavior |
|---|---|---|---|
| Available | `.claim-btn.available` | Red accent background, white text | Clickable, triggers claim |
| Insufficient | `.claim-btn.insufficient` | Muted surface background | Disabled, shows "Not Enough" |
| Claimed | `.claim-btn.claimed` | Green-tinted background | Disabled, shows "Claimed" |

### 8.5 Claim Flow (JavaScript)

1. User clicks "Claim" on an available reward.
2. Points are deducted from `totalPoints`.
3. Button changes to "Claimed" state.
4. All other buttons are re-evaluated (some may become "Not Enough" after deduction).
5. Success modal appears with reward name and cost confirmation.
6. Modal dismissed by clicking "Awesome!" or clicking the overlay.

---

## 9. Conventions & Guidelines

### 8.1 Adding a New Screen

1. Create `screens/new-screen.html`.
2. Start with the standard boilerplate:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Positive Barta - Screen Name</title>
     <link rel="stylesheet" href="../css/theme.css">
     <style>
       /* Screen-specific styles using CSS variables */
     </style>
   </head>
   <body>
     <div class="phone-frame">
       <div class="dynamic-island"></div>
       <div class="status-bar">
         <span class="time">9:41</span>
         <span class="icons"><!-- wifi + battery SVGs --></span>
       </div>
       <div class="screen-content">
         <!-- Page content -->
       </div>
       <nav class="tab-bar">
         <!-- 5 tab items with correct href links -->
       </nav>
     </div>
     <script src="../js/theme.js"></script>
   </body>
   </html>
   ```
3. Use only CSS variables for colors - never hardcode hex values in styles (except for theme-independent content like video overlays).
4. Use `var(--hover-overlay)` for hover backgrounds on interactive elements.
5. Use `var(--accent-subtle)` for subtle accent highlight backgrounds.
6. Mark the active tab with `.active` class in the tab bar.
7. Add the screen to `index.html` gallery in the appropriate section.

### 8.2 Color Rules

- **Always use CSS variables** for colors that should respond to theme changes.
- **Hardcoded colors are allowed only for:**
  - Video/camera overlay gradients (always dark regardless of theme)
  - Avatar inline gradient backgrounds (user-specific, theme-independent)
  - Content that sits on top of media (white text with text-shadow on video)
- The accent colors (`--accent-primary: #E94560`, `--accent-secondary: #533483`) are the **same** in both themes.

### 8.3 SVG Icons

- All icons are inline SVGs for easy color control via `fill: currentColor` or `fill: var(--text-primary)`.
- Icon sizes: 16px (status bar), 18px (input icons), 20px (top bar actions), 22px (back button), 24px (tab bar, social buttons), 28px (reel actions).
- Apple logo SVG on login/signup uses `fill="currentColor"` (not `fill="white"`) so it adapts to theme.

### 8.4 Naming Conventions

- **Files**: lowercase kebab-case (`edit-profile.html`, `forgot-password.html`).
- **CSS classes**: lowercase kebab-case with BEM-like nesting (`reel-action-item`, `list-item-content`).
- **CSS variables**: `--category-name` pattern (`--bg-primary`, `--text-secondary`, `--radius-md`).
- **JavaScript**: camelCase for variables/functions, UPPER_SNAKE_CASE for constants (`STORAGE_KEY`).

### 8.5 Status Bar Template

Every screen includes the same status bar with time "9:41" and wifi + battery icons:

```html
<div class="status-bar">
  <span class="time">9:41</span>
  <span class="icons">
    <svg viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
    <svg viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
  </span>
</div>
```

### 8.6 Tab Bar Template

The standard 5-tab navigation (mark the current screen's tab as `.active`):

```html
<nav class="tab-bar">
  <a class="tab-item" href="home.html">
    <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
    <span>Home</span>
  </a>
  <a class="tab-item" href="news.html">
    <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
    <span>News</span>
  </a>
  <a class="tab-item create-btn" href="create.html">
    <div class="create-btn-inner">
      <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
    </div>
  </a>
  <a class="tab-item" href="events.html">
    <svg viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
    <span>Events</span>
  </a>
  <a class="tab-item" href="profile.html">
    <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
    <span>Profile</span>
  </a>
</nav>
```

---

## 10. Gallery Page (index.html)

The root `index.html` is a development-only gallery page that shows all 16 screens in a card grid. It has:

- Its own light/dark theme toggle using the same `pb-theme` localStorage key.
- Its own CSS variables (`--gallery-bg`, `--gallery-card-bg`, etc.) separate from `theme.css` since it doesn't use the phone frame.
- Screen cards organized into 4 sections: Authentication Flow, Main Tab Screens, Secondary Screens, Social Features.
- Cards link directly to each screen HTML file.

This page is for browsing/previewing during development and is not part of the app's user-facing flow.
