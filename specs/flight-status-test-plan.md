
# SAS Flight Status Webpage – Refined Comprehensive Test Plan

## Overview
This plan covers all user journeys, error handling, and UI behaviors for the SAS Flight Status page ([https://www.flysas.com/gb-en/flight-status](https://www.flysas.com/gb-en/flight-status)). It is designed for independent, reproducible Playwright/QA automation.

---

## Table of Contents
1. Environment & Assumptions
2. Scenario Index
3. Detailed Scenarios
4. Known Gaps / TODOs
5. References

---

## 1. Environment & Assumptions

- Base URL: https://www.flysas.com/gb-en/flight-status
- User role: Guest (no login required)
- Supported browsers: Chrome, Firefox, Safari, mobile
- Accessibility: WCAG 2.1 minimum
- Localization: English (default), others via market/language switch
- Fresh state for each scenario

---

## 2. Scenario Index

1. Search by Route (Cities tab)
2. Search by Flight Number (Flight number tab)
3. Search by Airport (if available)
4. No Results Found
5. Invalid Input Handling
6. System Error Handling
7. Date Selection Edge Cases
8. UI Responsiveness
9. Accessibility
10. Localization
11. Cookie Consent Dialog
12. Favorites Tab (if available)

---

## 3. Detailed Scenarios

### 1. Search by Route (Cities Tab)
**GIVEN**: Guest user at Flight Status page, "Cities" tab selected  
**WHEN**:
1. Wait for tab "Cities" (`[role="tab"]:contains("Cities")`) to be selected
2. Select "Departure" combobox (`label:contains("Departure") + [role="combobox"]`), choose a valid city (e.g., "London LHR")
3. Select "Arrival" combobox (`label:contains("Arrival") + [role="combobox"]`), choose a valid city (e.g., "Stockholm ARN")
4. Select date via date button (`button:contains("2025-12-01")`), pick a valid date
5. Click "Search" button (`button:contains("Search")`)
6. Wait for results to appear
**THEN**:
- Results list displays flights matching route, with status, times, and details
- No console errors
- URL remains `/gb-en/flight-status`

### 2. Search by Flight Number (Flight Number Tab)
**GIVEN**: Guest user at Flight Status page, "Flight number" tab selected  
**WHEN**:
1. Click "Flight number" tab (`[role="tab"]:contains("Flight number")`)
2. Enter valid flight number in input (selector TBD, e.g., `[name="flightNumber"]`)
3. Select date
4. Click "Search"
5. Wait for results
**THEN**:
- Flight details and status shown
- No console errors

### 3. Search by Airport (If Available)
**GIVEN**: Guest user at Flight Status page  
**WHEN**:
1. Select airport from combobox (if present)
2. Select date
3. Click "Search"
**THEN**:
- All flights for airport/date shown

### 4. No Results Found
**GIVEN**: Valid search with no matching flights  
**WHEN**:
1. Enter route/flight number/airport with no scheduled flights
2. Click "Search"
**THEN**:
- "No results found" message displayed
- No console errors

### 5. Invalid Input Handling
**GIVEN**: Incomplete or invalid search criteria  
**WHEN**:
1. Leave required fields blank or enter invalid values
2. Click "Search"
**THEN**:
- Error message shown (e.g., "Please enter both departure and arrival")
- No search performed

### 6. System Error Handling
**GIVEN**: Backend returns error or is unavailable  
**WHEN**:
1. Simulate backend error (network failure, 500 response)
2. Click "Search"
**THEN**:
- Generic error message shown ("Unable to retrieve flight status, please try again")
- No crash

### 7. Date Selection Edge Cases
**GIVEN**: User selects past or far future date  
**WHEN**:
1. Select date in past/future
2. Click "Search"
**THEN**:
- Historical flights shown, or message if no flights scheduled

### 8. UI Responsiveness
**GIVEN**: User on desktop, tablet, mobile  
**WHEN**:
1. Load page at various viewport sizes
2. Perform search
**THEN**:
- UI adapts, controls usable

### 9. Accessibility
**GIVEN**: User with keyboard/screen reader  
**WHEN**:
1. Tab through controls
2. Use ARIA labels, roles
3. Perform search
**THEN**:
- All controls accessible, labeled

### 10. Localization
**GIVEN**: User changes language/market  
**WHEN**:
1. Click "Change market" button
2. Select new language
3. Reload page
**THEN**:
- All labels/messages/results in selected language

### 11. Cookie Consent Dialog
**GIVEN**: First visit  
**WHEN**:
1. Wait for cookie dialog (`dialog:contains("SAS & Cookies")`)
2. Click "Allow all", "Deny", or "Settings"
**THEN**:
- Dialog closes, consent stored

### 12. Favorites Tab (If Available)
**GIVEN**: User clicks "Favorites" tab  
**WHEN**:
1. Click "Favorites" tab
**THEN**:
- Favorites list shown or empty state

---

## 4. Known Gaps / TODOs

- Explicit selectors for flight number input and airport search (TBD)
- Error message text and selectors (TBD, verify on live error)
- Confirm "Favorites" tab behavior
- Confirm localization options and selectors

---

## 5. References

- [SAS Flight Status](https://www.flysas.com/gb-en/flight-status)
- WCAG 2.1 Accessibility Guidelines

---

Let me know if you want this plan saved to your workspace or need further scenario expansion.
