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

* add 'manage activities' page should have two classes of activites (maybe color coded), one for
  uneditable curated activities and the other for custom activities.
  - custom activities can be named anything they want
* on the 'manage activites' page:
  - ordered list should be draggable to be re-ordered
  - ordered list has all 'named' activites (either curated or custom) that can be chosen from
  - each element in the ordered list has some element that can be selected to indicate they
    appear on the edit page
  - 'add/create' button that deposits into other page of icons that can be named arbitrarily.
    These will be 'custom' icons (differently color-coded from the curated, maybe with user
    option to color differently) and be assigned a activitycode-uuid in the name, even for activities with
    the same icon and name.
  - ordered list can edit non-curated activites by depositing into 'add/create' with default values
    which user can change. This changes all occurrences in display (since it's referenced by it's
    underlying 'activitycode-uuid'), maybe with a warning that this will change historic instances of
    activity.
  - one solution is to get feedback from user when 'add/edit' asking them if they want to alter historic
    activites. If so, change activitycode-uuid entry directly. If not, create new activitycode-uuid and
    use that in the future (removing the old activitycode-uuid from list?).
  - add 'trashed' option to activites that will keep them around but put them in a navigatable 'trash' bin
    where user can take it out of trash and put it back into active list. 'Trash' in reality is more like
    a 'hidden' option but named 'trash' for conceptual simplicity.  When moving activites to 'trash' bin,
    give option to remove activities from historic logs.
  - only way to actually delete an activity is to nav to config which will (warn the user and) remove all
    activities from historic log entries (as well as removing from 'trash' bin)
  - Don't allow same icon and same name to appear in list. If user uses same icon/name as 'trashed' item,
    bring item out of 'trash'.
  - from the 'manage activites' page, there should be a 'trash' nav tab (or something)

* sanitize notes so it's not arbitrary html
* icons in timeline be without circles
* daily grouping in it's own 'box' (multiple timeline elements in a day)
  
priotiry for next time:

* nav bottom bar
* swipe to navigate
