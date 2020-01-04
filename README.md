# DatePicker

A small CodeSandbox project to built a datepicker from "scratch" (using vue, moment, and popper). It has for me always seemed as a daunting task, but turned out to be quite simple so far.
UX wise it is heavily inspired by the element-ui datepicker.

#### TODO

- [x] UpdateGrid should not rely on selectedDate
- [ ] ~~Move updateGrid inside DatePage~~
- [x] Centralize page data updates
- [ ] Month view
  - [x] Layout
  - [x] Navigation
  - [ ] MoveRequest
  - [x] Create updateGrid for MonthPage
    - [ ] Highlight current month and selected month
    - [x] ~~Disable months..?~~
- [ ] Year view
  - [ ] Layout
  - [ ] Navigation
  - [ ] MoveRequest
- [ ] Handle MoveRequest on page with no selectedDate
- [ ] Style buttons
- [x] Refactor scss
- [ ] Connect with input
  - [ ] Implement popper
  - [ ] Implement arrow keys navigation
