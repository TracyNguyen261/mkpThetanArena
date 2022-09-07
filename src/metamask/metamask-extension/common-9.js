LavaPack.loadBundle([[81,{"../../../shared/constants/app":6186,"./extractEthjsErrorMessage":57,"./sentry-filter-events":80,"@babel/runtime/helpers/interopRequireDefault":202,"@sentry/browser":1585,"@sentry/integrations":1625,_process:5430},function(){with(this)return function(){"use strict";return function(e,t,n){(function(t){(function(){var r=e("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(n,"__esModule",{value:!0}),n.SENTRY_STATE=void 0,n.default=function({release:e,getState:t}){if(!e)throw new Error("Missing release");if(l)return undefined;const n=f===i.BuildType.main?p:"production-main";let r;console.log(`Setting up Sentry Remote Error Reporting for '${n}': SENTRY_DSN`),r="https://3567c198f8a8412082d32655da2961d0@sentry.io/273505";return o.init({dsn:r,debug:l,environment:n,integrations:[new u.FilterEvents({getMetaMetricsEnabled:function(){if(!t)return!1;{var e,n;const r=t();if(null==r||null===(e=r.store)||void 0===e||null===(n=e.metamask)||void 0===n||!n.participateInMetaMetrics)return!1}return!0}}),new a.Dedupe,new a.ExtraErrorData],release:e,beforeSend:e=>function(e){try{if(function(e){!function(e,t){"string"==typeof e.message&&(e.message=t(e.message));e.exception&&e.exception.values&&e.exception.values.forEach((e=>{"string"==typeof e.value&&(e.value=t(e.value))}))}(e,(e=>{let t=(0,s.default)(e);return 0===t.indexOf("Transaction Failed: known transaction")&&(t="Transaction Failed: known transaction"),t}))}(e),function(e){e.request.url=d(e.request.url),e.exception&&e.exception.values&&e.exception.values.forEach((e=>{e.stacktrace&&e.stacktrace.frames.forEach((e=>{e.filename=d(e.filename)}))}))}(e),t){const n=t();e.extra||(e.extra={}),e.extra.appState=n}}catch(e){console.warn(e)}return e}(e),beforeBreadcrumb(e){if(!t)return null;{var n,r,o,a;const i=t();if(Object.values(i).length&&(null==i||null===(n=i.store)||void 0===n||null===(r=n.metamask)||void 0===r||!r.participateInMetaMetrics||null==i||null===(o=i.store)||void 0===o||null===(a=o.metamask)||void 0===a||!a.completedOnboarding||"ui.input"===(null==e?void 0:e.category)))return null}return e}}),o};var o=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=c(t);if(n&&n.has(e))return n.get(e);var r={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var i=o?Object.getOwnPropertyDescriptor(e,a):null;i&&(i.get||i.set)?Object.defineProperty(r,a,i):r[a]=e[a]}r.default=e,n&&n.set(e,r);return r}(e("@sentry/browser")),a=e("@sentry/integrations"),i=e("../../../shared/constants/app"),u=e("./sentry-filter-events"),s=r(e("./extractEthjsErrorMessage"));function c(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(c=function(e){return e?n:t})(e)}const l=t.env.METAMASK_DEBUG,p="production",f="main";function d(e){const t=e.split(window.location.origin)[1];if(!t)return e;return`metamask${t}`}n.SENTRY_STATE={gas:!0,history:!0,metamask:{alertEnabledness:!0,completedOnboarding:!0,connectedStatusPopoverHasBeenShown:!0,conversionDate:!0,conversionRate:!0,currentBlockGasLimit:!0,currentCurrency:!0,currentLocale:!0,customNonceValue:!0,defaultHomeActiveTabName:!0,featureFlags:!0,firstTimeFlowType:!0,forgottenPassword:!0,incomingTxLastFetchedBlockByChainId:!0,ipfsGateway:!0,isAccountMenuOpen:!0,isInitialized:!0,isUnlocked:!0,metaMetricsId:!0,nativeCurrency:!0,network:!0,nextNonce:!0,participateInMetaMetrics:!0,preferences:!0,provider:{nickname:!0,ticker:!0,type:!0},seedPhraseBackedUp:!0,showRestorePrompt:!0,threeBoxDisabled:!0,threeBoxLastUpdated:!0,threeBoxSynced:!0,threeBoxSyncingAllowed:!0,unapprovedDecryptMsgCount:!0,unapprovedEncryptionPublicKeyMsgCount:!0,unapprovedMsgCount:!0,unapprovedPersonalMsgCount:!0,unapprovedTypedMessagesCount:!0,useBlockie:!0,useNonceField:!0,usePhishDetect:!0,welcomeScreenSeen:!0},unconnectedAccount:!0}}).call(this)}).call(this,e("_process"))}}},{package:"$root$"}],[82,{"@babel/runtime/helpers/interopRequireDefault":202,"obj-multiplex":5315,pump:5529},function(){with(this)return function(){"use strict";return function(e,t,n){var r=e("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(n,"__esModule",{value:!0}),n.setupMultiplex=function(e){const t=new o.default;return(0,a.default)(e,t,e,(e=>{e&&console.error(e)})),t};var o=r(e("obj-multiplex")),a=r(e("pump"))}}},{package:"$root$"}],[84,{"../../../shared/constants/app":6186,"../../../shared/constants/network":6191,"@babel/runtime/helpers/interopRequireDefault":202,"bn.js":2088,"ethereumjs-util":2564,lodash:5188,"webextension-polyfill":6161},function(){with(this)return function(){"use strict";return function(e,t,n){var r=e("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(n,"__esModule",{value:!0}),n.BnMultiplyByFraction=function(e,t,n){const r=new i.default(t),o=new i.default(n);return e.mul(r).div(o)},n.addHexPrefix=void 0,n.bnToHex=function(e){return p(e.toString(16))},n.checkForError=function(){const{lastError:e}=o.default.runtime;if(!e)return undefined;if(e.stack&&e.message)return e;return new Error(e.message)},n.getChainType=function(e){if(e===s.MAINNET_CHAIN_ID)return"mainnet";if(s.TEST_CHAINS.includes(e))return"testnet";return"custom"},n.getPlatform=n.getEnvironmentType=void 0,n.hexToBn=function(e){return new i.default((0,a.stripHexPrefix)(e),16)};var o=r(e("webextension-polyfill")),a=e("ethereumjs-util"),i=r(e("bn.js")),u=e("lodash"),s=e("../../../shared/constants/network"),c=e("../../../shared/constants/app");const l=(0,u.memoize)((e=>{const t=new URL(e);return"/popup.html"===t.pathname?c.ENVIRONMENT_TYPE_POPUP:["/home.html"].includes(t.pathname)?c.ENVIRONMENT_TYPE_FULLSCREEN:"/notification.html"===t.pathname?c.ENVIRONMENT_TYPE_NOTIFICATION:c.ENVIRONMENT_TYPE_BACKGROUND}));n.getEnvironmentType=(e=window.location.href)=>l(e);n.getPlatform=()=>{const{navigator:e}=window,{userAgent:t}=e;return t.includes("Firefox")?c.PLATFORM_FIREFOX:"brave"in e?c.PLATFORM_BRAVE:t.includes("Edg/")?c.PLATFORM_EDGE:t.includes("OPR")?c.PLATFORM_OPERA:c.PLATFORM_CHROME};const p=e=>"string"!=typeof e||e.match(/^-?0x/u)?e:e.match(/^-?0X/u)?e.replace("0X","0x"):e.startsWith("-")?e.replace("-","-0x"):`0x${e}`;n.addHexPrefix=p}}},{package:"$root$"}]],[],{});