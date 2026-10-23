# JustGo Plus (Expo demo)

A faithful recreation of the JustGo highway companion UI (toll/ANPR onboarding, transactions, e-Invoice, Me) built with Expo Router and an MVVM structure. **All data is local demo data.** No OTP, identity, payment or account services are connected; every such action explains that clearly.

## Architecture (MVVM)

| Layer | Location | Responsibility |
|---|---|---|
| Model | models/index.ts | Typed domain models (Profile, Vehicle, TollCard, TransactionFilter, ...) and defaults |
| Repository | repositories/demoRepository.ts | AsyncStorage persistence (load/save/clear) of AppData |
| Services | services/validation.ts, services/content.ts, services/haptics.ts | Typed form validation, informational copy, haptic feedback |
| ViewModels | viewmodels/ | AppContext (shared state + CRUD actions), useProfileProgress, useAuthViewModel (login/register), useTransactionsViewModel, useEntityForms (profile, vehicle, cards) |
| Views | app/ (routes), components/ | Screens and UI only; no persistence or business rules |

## Routes
- (tabs): Home, Transactions, e-Invoice, Me, with a custom dark tab bar matching the reference
- auth: Login (phone OTP / email / MyDigital ID, all marked unavailable) and Register (personal then account details), plus a labeled demo entry
- profile, vehicles, vehicle-form, cards?kind=tng|rfid, payment-methods, identity, change-password, notifications, info/[slug]

## What is never stored
Passwords, ID numbers, identity images, or payment card details. "Delete local JustGO demo data" only clears this device's AsyncStorage; it does not delete any real account.
