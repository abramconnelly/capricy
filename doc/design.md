Capricy Design
===

Capricy is a daily mood tracker application.

Log Entries
---


Log entries consist of:
* `entry_uuid` - UUID of entry
* `log_uuid` - UUID of log entry object
* `mood` - ID of mood
* `activity` - array of activity IDs
* `note` - text note
* `entry_timestamp` - timestamp of entry
* `modified_timestamp` - last modified time of entry

Log entries should be append only, with the valid log entry being the one with the most recent modified timestamp.
As a later feature, there can be a facility to remove entries completely, but for now, append only.
`log_uuid` will remain the same and is the uuid to tie modified entries to one another.
`entry_uuid` is the unique id for the entry and should be completely unique for all entries.

Example:

```
{ "log_uuid":"baecafe", "entry_uuid":"000cafe", "mood":"mood-3", "activity":["activity-120000"], "note":"feeling meh", "entry_date":"2020-02-25 10:00 UTC", "modified_date":2020-02-25 10:00 UTC" }
{ "log_uuid":"dabcafe", "entry_uuid":"001cafe", "mood":"mood-4", "activity":["activity-120000"], "note":"feeling meh", "entry_date":"2020-02-25 12:00 UTC", "modified_date":2020-02-25 12:00 UTC" }
{ "log_uuid":"baecafe", "entry_uuid":"002cafe", "mood":"mood-4", "activity":["activity-120000"], "note":"feeling ok",  "entry_date":"2020-02-25 10:00 UTC", "modified_date":2020-02-25 13:00 UTC" }
```


Activities
---

Activities represent an action taken by the user.
The idea is to signify what happened of significance in close temporal proximity to
the log entry created.

The activity should be a representation of what happened.
One way to think about it is that the activity is a "verb" that happened ("went out for drinks", "had a good nights sleep", etc.)
that is represented by a word and/or icon ("martini glass", "bed", etc.).

Internally, activities are represented by an `activity_id`.
The `activity_id` is mapped to a `name` that is displayed and an `icon_id` that is mapped to the
icon dislayed.

A 'standard' `activity_id` may not have its name changed and should not have its icon changed.
A 'custom' `activity_id` can be added by the user, including adding a custom `name`.
Multiple `activity_id`s can have the same name and `icon_id`, including having the same `name`
and `icon_id` as from the 'standard' set.

Three concepts of activities need to differentiated:

* `activity_id` - A unique ID for the activity
* `name` - The displayed name of the activity to the user
* `icon_id` - The ID for the icon displayed

The activity ID is either a 'standard' ID provided by the system or a custom ID that is derived from the name.
The activity name is what is displayed to the user when interfacing with the application.
The icon is the visual representation of the activity.

An activity ID must be unique.
An activity name, as displayed, may not be unique.
An activity icon may not be unique.

A 'standard' activity cannot have an editible name.



