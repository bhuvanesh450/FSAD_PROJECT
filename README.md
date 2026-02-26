# CareerBridge — React + Vite (Clean Component Structure)

## Quick Start
```bash
npm install
npm run dev
```

## Demo Credentials
- **Student:** alex@student.edu / pass123
- **Admin:**   admin@careerfair.com / admin123

---

## File Structure (every file is focused & under ~120 lines)

```
src/
│
├── main.jsx                          # Entry — imports all 4 CSS files
├── App.jsx                           # Router only — maps URL → Page
│
├── styles/
│   ├── globals.css                   # Reset + CSS variables
│   ├── animations.css                # All @keyframes
│   ├── components.css                # Buttons, badges, cards, forms, modals, toasts
│   └── layout.css                    # Topnav, sidebar, dashboard grid, utility classes
│
├── context/
│   ├── DBContext.jsx                 # Global state: students, fairs, companies, chats
│   └── ToastContext.jsx              # Toast notification system
│
├── components/
│   ├── shared/
│   │   ├── BackgroundCanvas.jsx      # Animated particle canvas (fixed background)
│   │   ├── Badge.jsx                 # Colored status badge
│   │   ├── EmptyState.jsx            # Empty placeholder with icon + text
│   │   ├── Modal.jsx                 # Reusable overlay modal
│   │   ├── StatCard.jsx              # Dashboard metric card
│   │   ├── Ticker.jsx                # Scrolling news ticker strip
│   │   └── Topnav.jsx                # Top navigation bar with brand
│   │
│   └── student/
│       ├── ChatPopup.jsx             # Live chat popup with auto-reply recruiter
│       └── ApplyModal.jsx            # Resume upload + apply modal
│
└── pages/
    ├── home/
    │   ├── HomePage.jsx              # Composes hero + stats + features + CTA
    │   ├── HeroSection.jsx           # Hero with orbs, heading, CTA buttons
    │   ├── StatsStrip.jsx            # Live stats bar (fairs, companies, students)
    │   └── FeaturesSection.jsx       # 6-feature grid cards
    │
    ├── auth/
    │   └── AuthPage.jsx              # Login + Register (student & admin)
    │
    ├── student/
    │   ├── StudentDashboard.jsx      # Shell — sidebar + renders active section
    │   ├── SDashHome.jsx             # Home: stats, quick actions, recent activity
    │   ├── SFairs.jsx                # Career fairs list with register/unregister
    │   ├── SBooths.jsx               # Company booths grid with apply + chat
    │   ├── SResume.jsx               # Resume submission + applications table
    │   ├── SChat.jsx                 # Pick a company to chat with
    │   └── SProfile.jsx              # Profile editor + activity summary
    │
    └── admin/
        ├── AdminDashboard.jsx        # Shell — sidebar + renders active section
        ├── AHome.jsx                 # Overview: 8 stat cards + quick actions
        ├── AFairs.jsx                # Fairs table + create/edit/delete modal
        ├── ACompanies.jsx            # Companies table + create/edit/delete modal
        ├── ARegistrations.jsx        # All student registrations table
        ├── AResumes.jsx              # All resumes table + preview modal
        └── AChatMonitor.jsx          # Live chat monitor per booth
```

## Routes
| URL | Component |
|-----|-----------|
| `/` | HomePage |
| `/auth/student` | AuthPage (student login/register) |
| `/auth/admin` | AuthPage (admin login) |
| `/student` | StudentDashboard |
| `/admin` | AdminDashboard |
