# Changelog

## [1.12.1](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.12.0...analytics-v1.12.1) (2024-10-16)


### Bug Fixes

* git shortlog command fails on windows with single quotes in parameter values gf-612 ([#613](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/613)) ([ccb001e](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/ccb001e2ffd9accf74a44ad337238919809c62e0))

## [1.12.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.11.0...analytics-v1.12.0) (2024-10-09)


### Features

* add an ability to mark contributors as hidden gf-346 ([#400](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/400)) ([6143e4c](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/6143e4cb851e28de4080230e5e80e0665f65f41f))
* add script for collecting statistics gf-247 ([#315](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/315)) ([4ada7e5](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/4ada7e54d759ae3ab865d1bd04b4ed1b7d87ce85))
* **analytics:** add new workspace for analytics gf-296 ([#298](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/298)) ([6388631](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/638863144608db4eaa22e13a061fa1f6cdb03207))
* authorize the request before starting background job for analytics gf-464 ([#467](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/467)) ([fb682c3](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/fb682c36b7159031475896e12169738756928d6e))
* change script to support more than 1 git repository gf-589 ([#590](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/590)) ([a7e9082](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/a7e9082823aad891c6aed34174ee11385918a8fb))
* change script to take parameters from configuration file instead of CLI gf-595 ([#595](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/595)) ([#596](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/596)) ([00acb5a](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/00acb5afe103271f4d23723fd6591c3f515e0513))
* replace forever with pm2 for analytics script gf-385 ([#397](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/397)) ([168db21](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/168db2101a3cac49339c5a10bd847db40a8c406d))
* run analytics upload immediately on start gf-592 ([#592](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/592)) ([#593](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/593)) ([1f0b90c](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/1f0b90cec8253cbdb7902078071a193d52abb868))
* split cd actions for analytics and shared gf-375 ([#433](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/433)) ([bc730a5](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/bc730a557f169877536d5421a1ab12c3d0cc8221))
* trigger analytics release gf-375 ([#430](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/430)) ([a8e06e5](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/a8e06e58119001bf9b4e379116af84d0b87c85fe))
* update analytics cd config gf-375 ([#438](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/438)) ([6f99875](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/6f99875eda4711dbb733e5ddbd6bbc7ea25ec88e))
* upload statistics for the last week on each run gf-600 ([#601](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/601)) ([bafc5f4](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/bafc5f4aa9998dc6722d4aa57e9d0418a73ce708))


### Bug Fixes

* activity for specific date should be cleared on new analytics uploading gf-604 ([#608](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/608)) ([7ced49d](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/7ced49df2d52c79ece92253d4c75bc30242b5953))
* replace workspaces with appropriate ones in linter commands gf-296 ([#339](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/339)) ([d986718](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/d986718d6ce8a1e7fce270924a4672ba379fd9b6))
* resolve merge conflict in app.tsx and complete merge gf-21 ([06565a3](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/06565a3a1352499da451e9c8a6c82e6e26c6b1a9))

## [1.11.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.10.0...analytics-v1.11.0) (2024-10-08)


### Features

* upload statistics for the last week on each run gf-600 ([#601](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/601)) ([bafc5f4](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/bafc5f4aa9998dc6722d4aa57e9d0418a73ce708))

## [1.10.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.9.0...analytics-v1.10.0) (2024-10-04)


### Features

* change script to take parameters from configuration file instead of CLI gf-595 ([#595](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/595)) ([#596](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/596)) ([00acb5a](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/00acb5afe103271f4d23723fd6591c3f515e0513))
* run analytics upload immediately on start gf-592 ([#592](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/592)) ([#593](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/593)) ([1f0b90c](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/1f0b90cec8253cbdb7902078071a193d52abb868))

## [1.9.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.8.0...analytics-v1.9.0) (2024-10-03)


### Features

* change script to support more than 1 git repository gf-589 ([#590](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/590)) ([a7e9082](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/a7e9082823aad891c6aed34174ee11385918a8fb))

## [1.8.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.7.0...analytics-v1.8.0) (2024-09-25)


### Features

* add an ability to mark contributors as hidden gf-346 ([#400](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/400)) ([6143e4c](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/6143e4cb851e28de4080230e5e80e0665f65f41f))

## [1.7.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.6.0...analytics-v1.7.0) (2024-09-23)


### Features

* authorize the request before starting background job for analytics gf-464 ([#467](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/467)) ([fb682c3](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/fb682c36b7159031475896e12169738756928d6e))

## [1.6.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.5.0...analytics-v1.6.0) (2024-09-20)


### Features

* update analytics cd config gf-375 ([#438](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/438)) ([6f99875](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/6f99875eda4711dbb733e5ddbd6bbc7ea25ec88e))

## [1.5.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.4.0...analytics-v1.5.0) (2024-09-19)


### Features

* split cd actions for analytics and shared gf-375 ([#433](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/433)) ([bc730a5](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/bc730a557f169877536d5421a1ab12c3d0cc8221))

## [1.4.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.3.0...analytics-v1.4.0) (2024-09-19)


### Features

* trigger analytics release gf-375 ([#430](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/430)) ([a8e06e5](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/a8e06e58119001bf9b4e379116af84d0b87c85fe))

## [1.3.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.2.0...analytics-v1.3.0) (2024-09-19)


### Features

* replace forever with pm2 for analytics script gf-385 ([#397](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/397)) ([168db21](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/168db2101a3cac49339c5a10bd847db40a8c406d))

## [1.2.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.1.1...analytics-v1.2.0) (2024-09-18)


### Features

* add script for collecting statistics gf-247 ([#315](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/315)) ([4ada7e5](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/4ada7e54d759ae3ab865d1bd04b4ed1b7d87ce85))
* **analytics:** add new workspace for analytics gf-296 ([#298](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/298)) ([6388631](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/638863144608db4eaa22e13a061fa1f6cdb03207))


### Bug Fixes

* replace workspaces with appropriate ones in linter commands gf-296 ([#339](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/339)) ([d986718](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/d986718d6ce8a1e7fce270924a4672ba379fd9b6))
* resolve merge conflict in app.tsx and complete merge gf-21 ([06565a3](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/06565a3a1352499da451e9c8a6c82e6e26c6b1a9))

## [1.1.1](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.1.0...analytics-v1.1.1) (2024-09-16)


### Bug Fixes

* replace workspaces with appropriate ones in linter commands gf-296 ([#339](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/339)) ([d986718](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/d986718d6ce8a1e7fce270924a4672ba379fd9b6))

## [1.1.0](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/compare/analytics-v1.0.0...analytics-v1.1.0) (2024-09-16)


### Features

* add script for collecting statistics gf-247 ([#315](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/315)) ([4ada7e5](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/4ada7e54d759ae3ab865d1bd04b4ed1b7d87ce85))

## 1.0.0 (2024-09-13)


### Features

* **analytics:** add new workspace for analytics gf-296 ([#298](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/issues/298)) ([6388631](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/638863144608db4eaa22e13a061fa1f6cdb03207))


### Bug Fixes

* resolve merge conflict in app.tsx and complete merge gf-21 ([06565a3](https://github.com/BinaryStudioAcademy/bsa-2024-gitfit/commit/06565a3a1352499da451e9c8a6c82e6e26c6b1a9))
