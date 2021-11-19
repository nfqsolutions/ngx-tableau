# Release Notes

This file contains changes based on [this template](https://github.com/palantir/plottable/wiki/Release-Notes-Template)

Upgrade Steps
List out, as concretely as possible, any steps users have to take when they upgrade beyond just dumping the dependency.
Write pseudocode that highlights what code should change and how.
Call out if users are recommended to upgrade because of known problems with older releases.
Preferably, there's nothing here.

Breaking Changes
A complete list of breaking changes (preferably there are none, unless this is a major version).

New Features
Describe the new feature and when/why to use it. Add some pictures! Call out any caveats/warnings? Is it a beta feature?

Bug Fixes
Call out any existing feature/functionality that now works as intended or expected.

Improvements
Improvements/enhancements to a workflow, performance, logging, error messaging, or user experience

Other Changes
Other miscellaneous changes that don't fit into any of the above categories. Try to leave this empty - ideally, all changes fit into the categories above

## 1.2.0

New feature

- Added Tableau viz options as an input
- Added event `loaded`

## 1.1.1

Other Changes

- Disabled Ivy compilation

## 1.1.0

Bug Fixes

- Moved initialization logic to ngOnInit. Fixes [issue #1](https://github.com/nfqsolutions/ngx-tableau/issues/1)

## 1.0.0

New Features

- Add logic to embed a Tableau if the required inputs are given

- Add unit test
