/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["Horizon2080_Production_SP_metadata.xml","d8e4fd600aa52606210920fb19175e2d"],["__pycache__/manage.cpython-34.pyc","1f352f9020c4330741ce101d52628897"],["backend_service/__init__.py","d41d8cd98f00b204e9800998ecf8427e"],["backend_service/__pycache__/__init__.cpython-34.pyc","f64930207176cd24451cca4bbfddf617"],["backend_service/__pycache__/__init__.cpython-36.pyc","2190da24273b56f0b7d74527b942bc68"],["backend_service/__pycache__/admin.cpython-34.pyc","53b4514f39541c74503061f9b2e284a9"],["backend_service/__pycache__/admin.cpython-36.pyc","00d0ccf5567f7befb0a48e5ae9172769"],["backend_service/__pycache__/cron.cpython-34.pyc","fbbb3f4b08fdfab244af38ef86bef16b"],["backend_service/__pycache__/crontab.cpython-34.pyc","a52d12760393116637396f10c55b6dae"],["backend_service/__pycache__/crontab_local.cpython-34.pyc","9902cfda5fd0822b00f4649d2495d3ba"],["backend_service/__pycache__/models.cpython-34.pyc","20c0622b4be6d92ea0612fcc4787c545"],["backend_service/__pycache__/models.cpython-36.pyc","32dc6388bb2adfc585a9ab67fa3332c3"],["backend_service/__pycache__/serializers.cpython-34.pyc","70b295ecb063a7e993aafb9f36363f06"],["backend_service/__pycache__/serializers.cpython-36.pyc","69f3e22b85371eb649addb92f18ce695"],["backend_service/__pycache__/urls.cpython-34.pyc","2efcae9b7ca97d5d846cc940b3f82235"],["backend_service/__pycache__/urls.cpython-36.pyc","f6e2d78cc09d40646691e4a8296bdc44"],["backend_service/__pycache__/views.cpython-34.pyc","8c29743802beea6316c465fba00b2dc6"],["backend_service/__pycache__/views.cpython-36.pyc","023ef10ed95a34d261bcc536d9f3d608"],["backend_service/admin.py","3fbd7aa15ed12402037000b1de83a03e"],["backend_service/apps.py","37930d111ccc975d98cdf4e633aa50c6"],["backend_service/base_boxed_basic_query.html","f92c84f9f01866b5b8381a1f48da7688"],["backend_service/crontab.py","defe04cc6340ed4cc00a7c33184bc61d"],["backend_service/crontab_local.py","316e9827febcc9d8fa8a07067c68d972"],["backend_service/fixtures/comment.json","dc53edc0ac1b66c3ec789fddfd183c97"],["backend_service/fixtures/event.json","5bd7f8a24c4003da159ec022be96969d"],["backend_service/fixtures/folder.json","803918db187595d7d660b8f61f2fcc3d"],["backend_service/fixtures/horizon_target_group.json","3665b77ac3a966b698b7508be71e9721"],["backend_service/fixtures/horizon_target_individual.json","fefa4bad066d59e7303c268cef8616a1"],["backend_service/fixtures/sub_target.json","b2db61a00be532daae3c5645e3406790"],["backend_service/migrations/0001_initial.py","a83c303257a36ea19bee9fb61b161a76"],["backend_service/migrations/0002_auto_20181129_1027.py","04be3e7dbae7b7182ed58714711bf5a1"],["backend_service/migrations/0003_auto_20181129_1032.py","be8510b13da960e9f8b4b34f2c12af55"],["backend_service/migrations/0004_auto_20181129_1108.py","c80e81ac336c8ca383f75104baecf8bb"],["backend_service/migrations/0005_horizon_target_individual_urgent.py","72f6aafa2c834e8e9433c2a088e97a98"],["backend_service/migrations/0006_comment_mention_user_id.py","f05e33f2ae12b687abb778b0fcfef6b6"],["backend_service/migrations/0007_action.py","f3ec0cfc7c4e508276ee4a92ec6c9f65"],["backend_service/migrations/0008_folder_active.py","f3b40b540d5549f57ad59b4db2c48ff2"],["backend_service/migrations/__init__.py","d41d8cd98f00b204e9800998ecf8427e"],["backend_service/migrations/__pycache__/0001_initial.cpython-34.pyc","fb05d514af98f96f6d8f703431dbb66e"],["backend_service/migrations/__pycache__/0002_auto_20181129_1027.cpython-34.pyc","93508ee258ee522bbe5368d5b2f69b11"],["backend_service/migrations/__pycache__/0003_auto_20181129_1032.cpython-34.pyc","f9ce97e4c38352714f392d782cca81bf"],["backend_service/migrations/__pycache__/0004_auto_20181129_1108.cpython-34.pyc","f437ead8396d8b210058ce0e388c8a15"],["backend_service/migrations/__pycache__/0005_horizon_target_individual_urgent.cpython-34.pyc","b2db3ade87950dc5209c91cc35fa2837"],["backend_service/migrations/__pycache__/0006_comment_mention_user_id.cpython-34.pyc","250e067360954ba84dad2e02318268b6"],["backend_service/migrations/__pycache__/0007_action.cpython-34.pyc","a45e5bccb3df68b8b8605a97147b4034"],["backend_service/migrations/__pycache__/0008_folder_active.cpython-34.pyc","5465a7d7a1ae38ad8d3e4269521eb02d"],["backend_service/migrations/__pycache__/__init__.cpython-34.pyc","c30e89e86d8f51de39022b510418f6a9"],["backend_service/models.py","57ef5c350970dd14589bc1f3144fb796"],["backend_service/serializers.py","2242685a083d3155b2a649d41235bcb8"],["backend_service/tests.py","465b7e9f69bfd158c850cdfbc7306818"],["backend_service/urls.py","601d96fcf55bfdfbbd81e761fc98af00"],["backend_service/views.py","35bec60dcf09aeab1736bd5327277503"],["db.sqlite3","d41d8cd98f00b204e9800998ecf8427e"],["frontend/__init__.py","d41d8cd98f00b204e9800998ecf8427e"],["frontend/__pycache__/__init__.cpython-34.pyc","dbb289571e5b48f5acb84c4528bda87d"],["frontend/__pycache__/__init__.cpython-36.pyc","f76d616ceeebd8218ce2a24ed41802e5"],["frontend/__pycache__/admin.cpython-34.pyc","00bd59e7270045725fa87346921f31c2"],["frontend/__pycache__/admin.cpython-36.pyc","4bfd731c18486cff11bb1aa6446b4225"],["frontend/__pycache__/models.cpython-34.pyc","1700159a3190df279106e36379c8ccd7"],["frontend/__pycache__/models.cpython-36.pyc","bf714d774ea73dbb7df3c6804a9786f8"],["frontend/__pycache__/urls.cpython-34.pyc","9b384defb2773ca0542095ad6e43b086"],["frontend/__pycache__/urls.cpython-36.pyc","b092c4fc7bd1914875dbc046713814b1"],["frontend/__pycache__/views.cpython-34.pyc","b0a70e120fd3c0e26e3a69e0f9f88dd8"],["frontend/__pycache__/views.cpython-36.pyc","225df4476e5625764cf08cd121a15cf6"],["frontend/admin.py","e3dc717de887db03a015667a5fec59d8"],["frontend/apps.py","0d0121093c3617baa320454873c89ad5"],["frontend/cypress.json","cebe62fb370f79f89316f1ab1547a80b"],["frontend/cypress/fixtures/example.json","27a3bcc2e4f95afbc74c8928ba0072df"],["frontend/cypress/fixtures/profile.json","835f146ce3b30a6ebbc947c04459e41a"],["frontend/cypress/fixtures/users.json","3318801a4237641ae39b4c621037f0ab"],["frontend/cypress/integration/app_spec.js","3019321b4e385c4ff703f995e995e91c"],["frontend/cypress/integration/examples/actions.spec.js","23340260abebedaf41dbcf5bbd6bff67"],["frontend/cypress/integration/examples/aliasing.spec.js","7421975be9adbf8b5abdc226d1bd36bd"],["frontend/cypress/integration/examples/assertions.spec.js","385da64711325c661eec4b82554d2121"],["frontend/cypress/integration/examples/connectors.spec.js","8015477658988b988f6cf83f418e9dc2"],["frontend/cypress/integration/examples/cookies.spec.js","c243a5b5fd9a4340615bcaa390d51cf9"],["frontend/cypress/integration/examples/cypress_api.spec.js","8eb29a90876360d7a5f5286e96ae0f92"],["frontend/cypress/integration/examples/files.spec.js","c0b176cc5fbab0f287394d8586e5090a"],["frontend/cypress/integration/examples/local_storage.spec.js","dc6867a5a56526c8665ca1f548bc0318"],["frontend/cypress/integration/examples/location.spec.js","5d9decb5a8ffeeb22368bf4da81bd004"],["frontend/cypress/integration/examples/misc.spec.js","8a620306a912d9ebde48d6218898b6d4"],["frontend/cypress/integration/examples/navigation.spec.js","198bfc2ddc2d69c40d73e870d2fdb4cf"],["frontend/cypress/integration/examples/network_requests.spec.js","0ffdf29d015b8230b225aeac5b091828"],["frontend/cypress/integration/examples/querying.spec.js","e0a8b383ec33fdaf4a1d276082b795e7"],["frontend/cypress/integration/examples/spies_stubs_clocks.spec.js","13a3348c32ee18485b2e61c06c54ea29"],["frontend/cypress/integration/examples/traversal.spec.js","4e00298f2be667596b1000399d5e3e7f"],["frontend/cypress/integration/examples/utilities.spec.js","7e970fbbb56959df100aa1703df803d0"],["frontend/cypress/integration/examples/viewport.spec.js","67dd4f36c902106953074cc49861a237"],["frontend/cypress/integration/examples/waiting.spec.js","0f86fa0f5c800436e248f8b0eabde3ca"],["frontend/cypress/integration/examples/window.spec.js","8b8a00da2bf65e2d6eaebcc1260cb5df"],["frontend/cypress/plugins/index.js","bd1332407566e7e1ae4816421570626d"],["frontend/cypress/screenshots/All Specs/my-image.png","1efe0344002dcf5d24e4378bf9db02e0"],["frontend/cypress/support/commands.js","a928b1c0b23b12ab1e27375474123721"],["frontend/cypress/support/index.js","b393644ed524f0514b95437c0796f383"],["frontend/migrations/__init__.py","d41d8cd98f00b204e9800998ecf8427e"],["frontend/migrations/__pycache__/__init__.cpython-34.pyc","c72c87b5dd73dd93922a2f0f97cf69f5"],["frontend/models.py","8c4eb991c6dca757bdd77f539092e29b"],["frontend/src/App.css","100fb6221b3c085a5115fb4caea4c4da"],["frontend/src/App.js","ea6b30676628feedaf31f4de638d0834"],["frontend/src/App.test.js","076aa265faa2c720d7c3339398e14e1d"],["frontend/src/MuiTheme/color.js","9334858b59ba5ed6eda4b5baf2dbab5e"],["frontend/src/MuiTheme/index.js","6208f3c6b23fe80b2f15d217e74dfb86"],["frontend/src/_old/components/App.js","ba87d9c5cc5a12b00ec03ae76ba751f5"],["frontend/src/_old/components/DataProvider.js","509dc5d5ea19436d1725b4a8b0369f0f"],["frontend/src/_old/components/Form.js","4e575a9654a805d6a5ddb99ca925d406"],["frontend/src/_old/components/Table.js","208655fabc310e0e366448c92bee4db2"],["frontend/src/_old/index.js","3d6ff38caf7cb5874620cb9f4df7c533"],["frontend/src/components/Actions.js","4d8514f9c6336e2a609d4ce43ac00dfc"],["frontend/src/components/ActionsList.js","da373f1eae55936e994b9d3086768977"],["frontend/src/components/Comments.js","fbccf34abb4a85a2e9862dfa8008f618"],["frontend/src/components/CommentsList.js","521710b2754fb60b09de23cbf31826d4"],["frontend/src/components/Events.js","e82ed87d560fbc3d780175de4e1f10ae"],["frontend/src/components/EventsList.js","347c6163b1048a34c09136d92cf8c0fc"],["frontend/src/components/Folder.js","31e174a67ee09ba7b1cf9dd02792ba29"],["frontend/src/components/Header.js","ac20c5564c7be0cca31f2b2a3ef43ca9"],["frontend/src/components/MonthlyGoal.js","502482b74f09df63729982d7b87b9aa3"],["frontend/src/components/MonthlyGoalList.js","b0541bb0858b9728b41031020c90ec4d"],["frontend/src/components/Performance.js","24f56615e74ce460d707e50bac555ce8"],["frontend/src/components/Settings.js","7ce0ab254a636600ec308bf18e60f3b7"],["frontend/src/components/_actions/common.js","753c97c189ec37ddad0041c2a288a975"],["frontend/src/components/_actions/event.js","52d54b2fca678e73dd4602eaed7a156d"],["frontend/src/components/_actions/header.js","810452b85ec7261447da310137b9d9ea"],["frontend/src/components/_actions/performance.js","79e74c06a3192cc5cc0d94811f7af5db"],["frontend/src/components/_common/Checklist.js","ecdc2dff3f118162a22894f6c63ff3da"],["frontend/src/components/_common/Directory.js","79594cdca52032e939b02347e259d4b0"],["frontend/src/components/_common/ExpansionPanel.js","13d2f494f5b641aeeb936aa02e3e3835"],["frontend/src/components/_common/FilterBar.js","41c0d6506df6e88a2446338b8848ee3b"],["frontend/src/components/_common/Form.js","ceffd3a7c7d956d634e40ff205093deb"],["frontend/src/components/_common/MonthPicker.js","aae0a93b48f6e2a07ba828f9d53a5f9c"],["frontend/src/components/_common/Navigation.js","be8da784be40c90da4af5068ebe85df9"],["frontend/src/components/_common/Progress.js","c9a63b9c11e80a6d021f96fd97fac3ce"],["frontend/src/components/_common/SingleInput.js","1d29741d80acf1274c1ca7325995f386"],["frontend/src/components/_common/Snackbar.js","ce6737274fe62606fc1205c9a3efd1b7"],["frontend/src/components/_common/Table/TableHeader.js","3992632b0246ef31b6be57220a97d9a1"],["frontend/src/components/_common/Table/TableToolbar.js","3aa723b88d11e3d11d8ead5757735d2b"],["frontend/src/components/_common/Table/index.js","f0a77f272488c376559f8baf5c774c3a"],["frontend/src/components/_common/Tabs.js","89584ed2b35247006cad3a11799b4c4b"],["frontend/src/components/_common/Warning.js","dfad86a522fe7e209282eae21b1d6d97"],["frontend/src/components/_common/WithLoadingScreen.js","3aa2bc3f010bd7d55aa5f2db5fe29879"],["frontend/src/components/_common/YearPicker.js","5897bff88153335858b16ffb9dffc75b"],["frontend/src/components/_containers/ActionsContainer.js","dcdfd4d4d54c7cc945020ec66de370dc"],["frontend/src/components/_containers/CommentsContainer.js","3e7f0014e622ed555859e0d2caa1f690"],["frontend/src/components/_containers/DetailsContainer.js","009b72fe1363efeecbacf683e7f396b9"],["frontend/src/components/_containers/EventsContainer.js","bc520b8667dc2f5ffacf7df271b94f4a"],["frontend/src/components/_containers/FolderContainer.js","781198acc8375b049e3c4c53a0544c63"],["frontend/src/components/_containers/HeaderContainer.js","47d912b7a8dd9082daf2e36d3756b7e8"],["frontend/src/components/_containers/MonthlyGoalContainer.js","6b7b7c738faab7bd246932def3dc4305"],["frontend/src/components/_containers/PerformanceContainer.js","d4893db184b51a555f6e88dd8fa88045"],["frontend/src/components/_containers/RootContainer.js","6fab4db3adae491c295446442fed4a46"],["frontend/src/components/_containers/SettingsContainer.js","2d506d5809ae02fe621dee04a3baffa5"],["frontend/src/components/_containers/TabsContainer.js","0a13f5c693091f4972a67cb72a64e846"],["frontend/src/components/_reducers/eventStore.js","dd4c7eeae65701b655bd6315daf5d92b"],["frontend/src/components/_reducers/headerStore.js","afb9bcd41b486f85b5cd0571da50b81b"],["frontend/src/components/_reducers/navigationStore.js","d41d8cd98f00b204e9800998ecf8427e"],["frontend/src/components/_reducers/performanceStore.js","7c8b82040aeb9270f120184b29682278"],["frontend/src/components/_reducers/rootReducer.js","59d4cc56eafdc3f763fec4775954ade2"],["frontend/src/components/_utils/DataProvider.js","509dc5d5ea19436d1725b4a8b0369f0f"],["frontend/src/components/_utils/getDate.js","9217cae816956a10a72092b6ff2a924e"],["frontend/src/components/_utils/index.js","adbeb4b4daa9ddcedb350bff7a5e93c7"],["frontend/src/components/sub_components/ActionsField.js","7506665d81fc5bd2481416bd56d9ff04"],["frontend/src/components/sub_components/CommentInput.js","6a04b3d3d6886a215f03f7812de1fbf8"],["frontend/src/components/sub_components/CommentList.js","09495658c369a5b55bbab9d4e6d12fac"],["frontend/src/components/sub_components/CommentsField.js","b16cbb0f990943b07d928d32bf7ff43a"],["frontend/src/components/sub_components/Details.js","328bb88da3439b2c447d2d11db88a1e6"],["frontend/src/components/sub_components/DetailsField.js","f7a22fcd85bb8fb6d3a58573ac3e711c"],["frontend/src/components/sub_components/SubtargetEvent.js","f60db71338b49f80db2bb447f132e2f0"],["frontend/src/components/sub_components/SubtargetEventList.js","9ff9579519bd2565c65cbc4b2e8539b3"],["frontend/src/components/sub_components/SubtargetField.js","db4c62653f265c6c9b1a2e620eea814e"],["frontend/src/images/logo/JLL_Logo.png","90716e24d82ea1861326299d346ae34f"],["frontend/src/index.css","0b690741c56f1e25320b678a27a18387"],["frontend/src/index.js","25d95163e77394f1b415f4d2204135e2"],["frontend/src/registerServiceWorker.js","6a53af4fb6096f1ff45ce2268f0a6206"],["frontend/static/frontend/img/JLL_Logo.png","90716e24d82ea1861326299d346ae34f"],["frontend/static/img/JLL_Logo.png","90716e24d82ea1861326299d346ae34f"],["frontend/static/img/intro.png","7505ef5dc9995764569d312a63fd6e59"],["frontend/templates/frontend/img/JLL_Logo.png","90716e24d82ea1861326299d346ae34f"],["frontend/templates/frontend/img/intro.png","7505ef5dc9995764569d312a63fd6e59"],["frontend/templates/frontend/index.html","ba59155020202c5cdb057db464d8c52b"],["frontend/tests.py","465b7e9f69bfd158c850cdfbc7306818"],["frontend/urls.py","2f7e92926536884fac41575135a701e0"],["frontend/views.py","aa292b4ba659840ca27df58f6200eee0"],["horizon_2080/__init__.py","7215ee9c7d9dc229d2921a40e899ec5f"],["horizon_2080/__pycache__/__init__.cpython-34.pyc","1340f39a897b24c5c6afa1ce0b8979e6"],["horizon_2080/__pycache__/__init__.cpython-36.pyc","feef27b73fc022ff173c6c458dbb6808"],["horizon_2080/__pycache__/settings.cpython-34.pyc","560b057d1fd5537032c3e460a7de91db"],["horizon_2080/__pycache__/settings.cpython-36.pyc","3ba1531c581bca4cf42444e57afead82"],["horizon_2080/__pycache__/urls.cpython-34.pyc","1bf4c71295bb368d8e779d6c9dd77c6f"],["horizon_2080/__pycache__/urls.cpython-36.pyc","82838c4b552bf27467a1d43d057405a4"],["horizon_2080/__pycache__/wsgi.cpython-34.pyc","44630a31d886c42b61883f692c71561a"],["horizon_2080/settings.py","aaaebf8b1bd4302edc1273b167d678d9"],["horizon_2080/urls.py","c2b4382d70fd276de75e3837eb056d65"],["horizon_2080/wsgi.py","0c92f8c3322f708db2d786e7d20ef1d5"],["manage.py","8b14073e2b1d2ce4e9fd55449b64fb39"],["metadata.xml","c44467226db773d9fa95bec1de428fe4"],["okta/__init__.py","d41d8cd98f00b204e9800998ecf8427e"],["okta/__pycache__/__init__.cpython-34.pyc","23fc2761a61ef6847363cedb1a38e511"],["okta/__pycache__/__init__.cpython-36.pyc","9f90ad1dcc41d35ff8c330da87d07143"],["okta/__pycache__/admin.cpython-34.pyc","956a5b9ddd9ff094675f3312f831213e"],["okta/__pycache__/admin.cpython-36.pyc","a073af72df0e0b8f66d2d6a7e0d8d141"],["okta/__pycache__/middleware.cpython-34.pyc","d3020619186607421e48bd1eea0d1020"],["okta/__pycache__/models.cpython-34.pyc","75b7293966f425cb3815c143ed3b0c5b"],["okta/__pycache__/models.cpython-36.pyc","44415c278e8395f5b26bc4d061ebbb77"],["okta/__pycache__/urls.cpython-34.pyc","251a17fe74325ec0abe229d182cfb681"],["okta/__pycache__/urls.cpython-36.pyc","03a4b24ae939b6fb182316ca6e555fb9"],["okta/__pycache__/views.cpython-34.pyc","2ef0e908ea2bb5d086629fe77dc93b0d"],["okta/__pycache__/views.cpython-36.pyc","84429e3e5a2628b30dfa6b8b3b1aa107"],["okta/admin.py","e3dc717de887db03a015667a5fec59d8"],["okta/apps.py","5cfdcef48b6b038331d9a7bd8a330ca9"],["okta/middleware.py","899a9842bdfcf48f71be07e1c20d5838"],["okta/models.py","2a2738651879e044eebf5f6da28d127a"],["okta/tests.py","465b7e9f69bfd158c850cdfbc7306818"],["okta/urls.py","c0068ba3461f909fa6d3639a06c0ef68"],["okta/views.py","1f3f9c9c088ce537e6743ffdf9fcb55c"],["users/__init__.py","18d5481961a63256168c11f7086a2813"],["users/__pycache__/__init__.cpython-34.pyc","7114ddd5abe7328f924b899babac6f53"],["users/__pycache__/__init__.cpython-36.pyc","7e6d56f91b7f60e9166ed01def36731f"],["users/__pycache__/admin.cpython-34.pyc","0205d5e6d5fbec101a1061995997b26a"],["users/__pycache__/admin.cpython-36.pyc","9c61b399cff20f96afb2c63e43b08140"],["users/__pycache__/conf.cpython-34.pyc","16e77bd40780f7328e5ed4ce8caec90e"],["users/__pycache__/conf.cpython-36.pyc","d804e13ee88ee781359ad1e05fcb44bf"],["users/__pycache__/fields.cpython-34.pyc","a0a4f5eaef7a7063f401ad1a23b5ffdc"],["users/__pycache__/fields.cpython-36.pyc","cb1dd1b4b9cdb4fcc6072ea50c3cf82e"],["users/__pycache__/forms.cpython-34.pyc","83dd76bf488baa4d988a866c48f8e968"],["users/__pycache__/managers.cpython-34.pyc","374abf662cea0fe95c644450537f994d"],["users/__pycache__/managers.cpython-36.pyc","5a9b3120e08d43ff3f214eaff867c71d"],["users/__pycache__/models.cpython-34.pyc","b5c4c5547f41af6b865188e83cdc3309"],["users/__pycache__/models.cpython-36.pyc","7fbea4d8d119c4e175e68accd35f37b2"],["users/__pycache__/urls.cpython-34.pyc","e35748d7dd0ca8adc97f86798f27b652"],["users/__pycache__/urls.cpython-36.pyc","c912ce662bfc2cc7eeaf3e88da6e6438"],["users/__pycache__/views.cpython-34.pyc","331d8d86e6ef2b4b53f1292e8b0f383d"],["users/__pycache__/views.cpython-36.pyc","533afe1a9d7abd56d7447eafe93b2384"],["users/admin.py","2a9388708fcf794c3a7921526a9c29d2"],["users/compat.py","63bdd2b8be28abb3465b858cb73b73c5"],["users/conf.py","8e6a3a3623892e9e977ce122d0ffb556"],["users/fields.py","8d61cadfaacfb4f4bd374c4ae4cb763b"],["users/fixtures/user.json","965d0cf08089873730f99300c31e3ed0"],["users/forms.py","171505c097dd2c1025fa1f3ea0e5ab60"],["users/managers.py","ebe555ba5544d14592ec5c39b69c57e3"],["users/migrations/0001_initial.py","e7657bf9044aa277bd7111dc1f2a0c24"],["users/migrations/0002_auto_20181128_1449.py","5b8e52e342c6ea26ea67a91f0fe147e0"],["users/migrations/0003_auto_20181128_1509.py","e7a96992b2b35d43ee802071d37c6a24"],["users/migrations/0004_user_report_to.py","d2efce0dc60e7161c9018ab979da3918"],["users/migrations/0005_auto_20181129_1544.py","2fe484292336120d5672003e23fea909"],["users/migrations/0006_auto_20181129_1544.py","a27ea5350b5486881004f17a4a0ba8c4"],["users/migrations/0007_user_action_access_permission.py","2f7e7178cf8f8de4149657fac194e480"],["users/migrations/0008_auto_20190111_1718.py","dbac71f183ab766184f36e0a95279e34"],["users/migrations/0009_auto_20190115_1733.py","ea26657fcb94724089da61740f97c53a"],["users/migrations/0010_auto_20190115_1739.py","990e66766045db204e8143ad7d26af73"],["users/migrations/__init__.py","d41d8cd98f00b204e9800998ecf8427e"],["users/migrations/__pycache__/0001_initial.cpython-34.pyc","9b0d15264ee278e334e04140d6f2c82b"],["users/migrations/__pycache__/0002_auto_20181128_1449.cpython-34.pyc","d4676edfac38ea226cfaebc9008491d0"],["users/migrations/__pycache__/0003_auto_20181128_1509.cpython-34.pyc","cbc295c6fe3eb628fd8dce890cfa843e"],["users/migrations/__pycache__/0004_user_report_to.cpython-34.pyc","afa35d62dd1ac3d9ee51424362da81e7"],["users/migrations/__pycache__/0005_auto_20181129_1544.cpython-34.pyc","f61d0976ba0b0f9b2ffe5cb31ff67377"],["users/migrations/__pycache__/0006_auto_20181129_1544.cpython-34.pyc","1a047102076d6fdd303d40a453ce629b"],["users/migrations/__pycache__/0007_user_action_access_permission.cpython-34.pyc","f1f2afc93b9d1f0f3aa5860104414109"],["users/migrations/__pycache__/0008_auto_20190111_1718.cpython-34.pyc","1034b85e3810881bd92f312ef9bc8394"],["users/migrations/__pycache__/0009_auto_20190115_1733.cpython-34.pyc","5cb0e6c0ade45b4951e23cd086ce9f4f"],["users/migrations/__pycache__/0010_auto_20190115_1739.cpython-34.pyc","3f1e52a20ba741d8db76476e2adc9a0f"],["users/migrations/__pycache__/__init__.cpython-34.pyc","3be2a97fe06d5aad081655deb1724cc9"],["users/models.py","69d1b433168daa6ba928e740265d3e91"],["users/signals.py","fd2943aa1125b619d5fc318ed78a8293"],["users/templates/base.html","d1f1aef530dd9e209d60ffce910b4806"],["users/templates/users/activate.html","7d7e99d28f5bd5df175b19cffb7c6b06"],["users/templates/users/activation_complete.html","ee933be4b793f96c8eda2635843694a0"],["users/templates/users/activation_email.html","d11d52d4fa6206ea31a0546db4ee2027"],["users/templates/users/activation_email_subject.html","d66ff6004b1ee99e40409a0bf6dd1154"],["users/templates/users/login.html","60a477754c05d2bf8f21647b5ea84df0"],["users/templates/users/logout.html","0d6c810bad425586b45cd14dc36fd2df"],["users/templates/users/partials/errors.html","0d62c8678867cfa8d10545bae92961ec"],["users/templates/users/partials/field.html","b323698fe79c7483f32026e174beb901"],["users/templates/users/partials/honeypot.html","f36b9dff70e4b0fadec62e895b299d1e"],["users/templates/users/password_change_done.html","b574c69d01f87a59b63eec5f93d0df27"],["users/templates/users/password_change_form.html","527bb82e24b7b8ed0df3242a199d71f4"],["users/templates/users/password_reset_complete.html","e0ea6017161f6877cd5cdfd2ae099218"],["users/templates/users/password_reset_confirm.html","c3f7460227574bde35515c7c8add0cfd"],["users/templates/users/password_reset_done.html","1d187e7bc7c93311a8c5d0f47f1d4fd5"],["users/templates/users/password_reset_email.html","a09e12f37e2f6ec3f4801b863b36f443"],["users/templates/users/password_reset_form.html","0133b6e9f62faa141f70c7a2541370a5"],["users/templates/users/password_reset_subject.html","c025278520878b714007de0c9cde348d"],["users/templates/users/registration_closed.html","f27f2268c953e2ea1e2234536a49a2ca"],["users/templates/users/registration_complete.html","fb4ebcaa40b33cb46fe43f4c60342bed"],["users/templates/users/registration_form.html","42b12359814f720cfbf5b739dd584b3a"],["users/templatetags/__init__.py","d41d8cd98f00b204e9800998ecf8427e"],["users/templatetags/__pycache__/__init__.cpython-34.pyc","15482f389e19af865b21cdde4f5c510d"],["users/templatetags/__pycache__/__init__.cpython-36.pyc","34b7928e2cda90d5ba109739c1844276"],["users/templatetags/__pycache__/form_tags.cpython-34.pyc","10fd2ed4339272767957ba7dd87861bd"],["users/templatetags/__pycache__/form_tags.cpython-36.pyc","7b3da158c534168c68e50afce0333ae7"],["users/templatetags/form_tags.py","8c3beb62763d1d995fb7f7faf8463b71"],["users/urls.py","7ba650fd0d3b576e05e081f120a831e1"],["users/views.py","26e0233a10bef56a6ef795e0c9234da4"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







