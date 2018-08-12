2018-08-05
---

* Timeline should be able to add an entry
* Timeline entries need to have an 'edit' option, maybe
  a button in the upper right hand corner.
* Timeline should have a date filter
* Timeline needs a facility to add an entry to a day
  that hasn't been added to. Options are:
  - leave it calendar
  - modal with calendar
  - default the new entry to today with some facility to
    change it in the newly created entry, either another
    date picker or a 'carousel'

* 'Add' button in the activites page needs to be in line
  with other activities and dimmed

* sql.js load slow (5-6s), look into possible alternatives
  (in-browser mongodb)


2018-08-12
---

* move over to some SQL backend database
* make sure to keep historic log entries (for debugging)
* get rid of glitchy jump to timeline on load (add empty element to render before JS load)

* timeline entries should have an edit button (and have them go to their respective edit pages
  when hit)
  - decorate the timeline card with an edit button (only), which when pressed will deposit into edit
    page

* edit page should have a (confirmed) delete button

* swipe from timeline to calendar
* nav bar at bottom to nav to timeline, calendar, stats, config and main 'add' button
  that expands to yesterday, today and day picker option

