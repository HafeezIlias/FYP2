/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@firebase/app/dist/esm/index.esm2017.js":
/*!**************************************************************!*\
  !*** ./node_modules/@firebase/app/dist/esm/index.esm2017.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirebaseError: () => (/* reexport safe */ _firebase_util__WEBPACK_IMPORTED_MODULE_2__.FirebaseError),
/* harmony export */   SDK_VERSION: () => (/* binding */ SDK_VERSION),
/* harmony export */   _DEFAULT_ENTRY_NAME: () => (/* binding */ DEFAULT_ENTRY_NAME),
/* harmony export */   _addComponent: () => (/* binding */ _addComponent),
/* harmony export */   _addOrOverwriteComponent: () => (/* binding */ _addOrOverwriteComponent),
/* harmony export */   _apps: () => (/* binding */ _apps),
/* harmony export */   _clearComponents: () => (/* binding */ _clearComponents),
/* harmony export */   _components: () => (/* binding */ _components),
/* harmony export */   _getProvider: () => (/* binding */ _getProvider),
/* harmony export */   _isFirebaseApp: () => (/* binding */ _isFirebaseApp),
/* harmony export */   _isFirebaseServerApp: () => (/* binding */ _isFirebaseServerApp),
/* harmony export */   _registerComponent: () => (/* binding */ _registerComponent),
/* harmony export */   _removeServiceInstance: () => (/* binding */ _removeServiceInstance),
/* harmony export */   _serverApps: () => (/* binding */ _serverApps),
/* harmony export */   deleteApp: () => (/* binding */ deleteApp),
/* harmony export */   getApp: () => (/* binding */ getApp),
/* harmony export */   getApps: () => (/* binding */ getApps),
/* harmony export */   initializeApp: () => (/* binding */ initializeApp),
/* harmony export */   initializeServerApp: () => (/* binding */ initializeServerApp),
/* harmony export */   onLog: () => (/* binding */ onLog),
/* harmony export */   registerVersion: () => (/* binding */ registerVersion),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _firebase_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/component */ "./node_modules/@firebase/component/dist/esm/index.esm2017.js");
/* harmony import */ var _firebase_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @firebase/logger */ "./node_modules/@firebase/logger/dist/esm/index.esm2017.js");
/* harmony import */ var _firebase_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @firebase/util */ "./node_modules/@firebase/util/dist/index.esm2017.js");
/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! idb */ "./node_modules/idb/build/index.js");






/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PlatformLoggerServiceImpl {
    constructor(container) {
        this.container = container;
    }
    // In initial implementation, this will be called by installations on
    // auth token refresh, and installations will send this string.
    getPlatformInfoString() {
        const providers = this.container.getProviders();
        // Loop through providers and get library/version pairs from any that are
        // version components.
        return providers
            .map(provider => {
            if (isVersionServiceProvider(provider)) {
                const service = provider.getImmediate();
                return `${service.library}/${service.version}`;
            }
            else {
                return null;
            }
        })
            .filter(logString => logString)
            .join(' ');
    }
}
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */
function isVersionServiceProvider(provider) {
    const component = provider.getComponent();
    return (component === null || component === void 0 ? void 0 : component.type) === "VERSION" /* ComponentType.VERSION */;
}

const name$q = "@firebase/app";
const version$1 = "0.11.5";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logger = new _firebase_logger__WEBPACK_IMPORTED_MODULE_1__.Logger('@firebase/app');

const name$p = "@firebase/app-compat";

const name$o = "@firebase/analytics-compat";

const name$n = "@firebase/analytics";

const name$m = "@firebase/app-check-compat";

const name$l = "@firebase/app-check";

const name$k = "@firebase/auth";

const name$j = "@firebase/auth-compat";

const name$i = "@firebase/database";

const name$h = "@firebase/data-connect";

const name$g = "@firebase/database-compat";

const name$f = "@firebase/functions";

const name$e = "@firebase/functions-compat";

const name$d = "@firebase/installations";

const name$c = "@firebase/installations-compat";

const name$b = "@firebase/messaging";

const name$a = "@firebase/messaging-compat";

const name$9 = "@firebase/performance";

const name$8 = "@firebase/performance-compat";

const name$7 = "@firebase/remote-config";

const name$6 = "@firebase/remote-config-compat";

const name$5 = "@firebase/storage";

const name$4 = "@firebase/storage-compat";

const name$3 = "@firebase/firestore";

const name$2 = "@firebase/vertexai";

const name$1 = "@firebase/firestore-compat";

const name = "firebase";
const version = "11.6.1";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The default app name
 *
 * @internal
 */
const DEFAULT_ENTRY_NAME = '[DEFAULT]';
const PLATFORM_LOG_STRING = {
    [name$q]: 'fire-core',
    [name$p]: 'fire-core-compat',
    [name$n]: 'fire-analytics',
    [name$o]: 'fire-analytics-compat',
    [name$l]: 'fire-app-check',
    [name$m]: 'fire-app-check-compat',
    [name$k]: 'fire-auth',
    [name$j]: 'fire-auth-compat',
    [name$i]: 'fire-rtdb',
    [name$h]: 'fire-data-connect',
    [name$g]: 'fire-rtdb-compat',
    [name$f]: 'fire-fn',
    [name$e]: 'fire-fn-compat',
    [name$d]: 'fire-iid',
    [name$c]: 'fire-iid-compat',
    [name$b]: 'fire-fcm',
    [name$a]: 'fire-fcm-compat',
    [name$9]: 'fire-perf',
    [name$8]: 'fire-perf-compat',
    [name$7]: 'fire-rc',
    [name$6]: 'fire-rc-compat',
    [name$5]: 'fire-gcs',
    [name$4]: 'fire-gcs-compat',
    [name$3]: 'fire-fst',
    [name$1]: 'fire-fst-compat',
    [name$2]: 'fire-vertex',
    'fire-js': 'fire-js', // Platform identifier for JS SDK.
    [name]: 'fire-js-all'
};

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @internal
 */
const _apps = new Map();
/**
 * @internal
 */
const _serverApps = new Map();
/**
 * Registered components.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _components = new Map();
/**
 * @param component - the component being added to this app's container
 *
 * @internal
 */
function _addComponent(app, component) {
    try {
        app.container.addComponent(component);
    }
    catch (e) {
        logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
    }
}
/**
 *
 * @internal
 */
function _addOrOverwriteComponent(app, component) {
    app.container.addOrOverwriteComponent(component);
}
/**
 *
 * @param component - the component to register
 * @returns whether or not the component is registered successfully
 *
 * @internal
 */
function _registerComponent(component) {
    const componentName = component.name;
    if (_components.has(componentName)) {
        logger.debug(`There were multiple attempts to register component ${componentName}.`);
        return false;
    }
    _components.set(componentName, component);
    // add the component to existing app instances
    for (const app of _apps.values()) {
        _addComponent(app, component);
    }
    for (const serverApp of _serverApps.values()) {
        _addComponent(serverApp, component);
    }
    return true;
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 *
 * @returns the provider for the service with the matching name
 *
 * @internal
 */
function _getProvider(app, name) {
    const heartbeatController = app.container
        .getProvider('heartbeat')
        .getImmediate({ optional: true });
    if (heartbeatController) {
        void heartbeatController.triggerHeartbeat();
    }
    return app.container.getProvider(name);
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 * @param instanceIdentifier - service instance identifier in case the service supports multiple instances
 *
 * @internal
 */
function _removeServiceInstance(app, name, instanceIdentifier = DEFAULT_ENTRY_NAME) {
    _getProvider(app, name).clearInstance(instanceIdentifier);
}
/**
 *
 * @param obj - an object of type FirebaseApp or FirebaseOptions.
 *
 * @returns true if the provide object is of type FirebaseApp.
 *
 * @internal
 */
function _isFirebaseApp(obj) {
    return obj.options !== undefined;
}
/**
 *
 * @param obj - an object of type FirebaseApp.
 *
 * @returns true if the provided object is of type FirebaseServerAppImpl.
 *
 * @internal
 */
function _isFirebaseServerApp(obj) {
    if (obj === null || obj === undefined) {
        return false;
    }
    return obj.settings !== undefined;
}
/**
 * Test only
 *
 * @internal
 */
function _clearComponents() {
    _components.clear();
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ERRORS = {
    ["no-app" /* AppError.NO_APP */]: "No Firebase App '{$appName}' has been created - " +
        'call initializeApp() first',
    ["bad-app-name" /* AppError.BAD_APP_NAME */]: "Illegal App name: '{$appName}'",
    ["duplicate-app" /* AppError.DUPLICATE_APP */]: "Firebase App named '{$appName}' already exists with different options or config",
    ["app-deleted" /* AppError.APP_DELETED */]: "Firebase App named '{$appName}' already deleted",
    ["server-app-deleted" /* AppError.SERVER_APP_DELETED */]: 'Firebase Server App has been deleted',
    ["no-options" /* AppError.NO_OPTIONS */]: 'Need to provide options, when not being deployed to hosting via source.',
    ["invalid-app-argument" /* AppError.INVALID_APP_ARGUMENT */]: 'firebase.{$appName}() takes either no argument or a ' +
        'Firebase App instance.',
    ["invalid-log-argument" /* AppError.INVALID_LOG_ARGUMENT */]: 'First argument to `onLog` must be null or a function.',
    ["idb-open" /* AppError.IDB_OPEN */]: 'Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.',
    ["idb-get" /* AppError.IDB_GET */]: 'Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.',
    ["idb-set" /* AppError.IDB_WRITE */]: 'Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.',
    ["idb-delete" /* AppError.IDB_DELETE */]: 'Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.',
    ["finalization-registry-not-supported" /* AppError.FINALIZATION_REGISTRY_NOT_SUPPORTED */]: 'FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.',
    ["invalid-server-app-environment" /* AppError.INVALID_SERVER_APP_ENVIRONMENT */]: 'FirebaseServerApp is not for use in browser environments.'
};
const ERROR_FACTORY = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.ErrorFactory('app', 'Firebase', ERRORS);

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FirebaseAppImpl {
    constructor(options, config, container) {
        this._isDeleted = false;
        this._options = Object.assign({}, options);
        this._config = Object.assign({}, config);
        this._name = config.name;
        this._automaticDataCollectionEnabled =
            config.automaticDataCollectionEnabled;
        this._container = container;
        this.container.addComponent(new _firebase_component__WEBPACK_IMPORTED_MODULE_0__.Component('app', () => this, "PUBLIC" /* ComponentType.PUBLIC */));
    }
    get automaticDataCollectionEnabled() {
        this.checkDestroyed();
        return this._automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(val) {
        this.checkDestroyed();
        this._automaticDataCollectionEnabled = val;
    }
    get name() {
        this.checkDestroyed();
        return this._name;
    }
    get options() {
        this.checkDestroyed();
        return this._options;
    }
    get config() {
        this.checkDestroyed();
        return this._config;
    }
    get container() {
        return this._container;
    }
    get isDeleted() {
        return this._isDeleted;
    }
    set isDeleted(val) {
        this._isDeleted = val;
    }
    /**
     * This function will throw an Error if the App has already been deleted -
     * use before performing API actions on the App.
     */
    checkDestroyed() {
        if (this.isDeleted) {
            throw ERROR_FACTORY.create("app-deleted" /* AppError.APP_DELETED */, { appName: this._name });
        }
    }
}

/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Parse the token and check to see if the `exp` claim is in the future.
// Reports an error to the console if the token or claim could not be parsed, or if `exp` is in
// the past.
function validateTokenTTL(base64Token, tokenName) {
    const secondPart = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.base64Decode)(base64Token.split('.')[1]);
    if (secondPart === null) {
        console.error(`FirebaseServerApp ${tokenName} is invalid: second part could not be parsed.`);
        return;
    }
    const expClaim = JSON.parse(secondPart).exp;
    if (expClaim === undefined) {
        console.error(`FirebaseServerApp ${tokenName} is invalid: expiration claim could not be parsed`);
        return;
    }
    const exp = JSON.parse(secondPart).exp * 1000;
    const now = new Date().getTime();
    const diff = exp - now;
    if (diff <= 0) {
        console.error(`FirebaseServerApp ${tokenName} is invalid: the token has expired.`);
    }
}
class FirebaseServerAppImpl extends FirebaseAppImpl {
    constructor(options, serverConfig, name, container) {
        // Build configuration parameters for the FirebaseAppImpl base class.
        const automaticDataCollectionEnabled = serverConfig.automaticDataCollectionEnabled !== undefined
            ? serverConfig.automaticDataCollectionEnabled
            : false;
        // Create the FirebaseAppSettings object for the FirebaseAppImp constructor.
        const config = {
            name,
            automaticDataCollectionEnabled
        };
        if (options.apiKey !== undefined) {
            // Construct the parent FirebaseAppImp object.
            super(options, config, container);
        }
        else {
            const appImpl = options;
            super(appImpl.options, config, container);
        }
        // Now construct the data for the FirebaseServerAppImpl.
        this._serverConfig = Object.assign({ automaticDataCollectionEnabled }, serverConfig);
        // Ensure that the current time is within the `authIdtoken` window of validity.
        if (this._serverConfig.authIdToken) {
            validateTokenTTL(this._serverConfig.authIdToken, 'authIdToken');
        }
        // Ensure that the current time is within the `appCheckToken` window of validity.
        if (this._serverConfig.appCheckToken) {
            validateTokenTTL(this._serverConfig.appCheckToken, 'appCheckToken');
        }
        this._finalizationRegistry = null;
        if (typeof FinalizationRegistry !== 'undefined') {
            this._finalizationRegistry = new FinalizationRegistry(() => {
                this.automaticCleanup();
            });
        }
        this._refCount = 0;
        this.incRefCount(this._serverConfig.releaseOnDeref);
        // Do not retain a hard reference to the dref object, otherwise the FinalizationRegistry
        // will never trigger.
        this._serverConfig.releaseOnDeref = undefined;
        serverConfig.releaseOnDeref = undefined;
        registerVersion(name$q, version$1, 'serverapp');
    }
    toJSON() {
        return undefined;
    }
    get refCount() {
        return this._refCount;
    }
    // Increment the reference count of this server app. If an object is provided, register it
    // with the finalization registry.
    incRefCount(obj) {
        if (this.isDeleted) {
            return;
        }
        this._refCount++;
        if (obj !== undefined && this._finalizationRegistry !== null) {
            this._finalizationRegistry.register(obj, this);
        }
    }
    // Decrement the reference count.
    decRefCount() {
        if (this.isDeleted) {
            return 0;
        }
        return --this._refCount;
    }
    // Invoked by the FinalizationRegistry callback to note that this app should go through its
    // reference counts and delete itself if no reference count remain. The coordinating logic that
    // handles this is in deleteApp(...).
    automaticCleanup() {
        void deleteApp(this);
    }
    get settings() {
        this.checkDestroyed();
        return this._serverConfig;
    }
    /**
     * This function will throw an Error if the App has already been deleted -
     * use before performing API actions on the App.
     */
    checkDestroyed() {
        if (this.isDeleted) {
            throw ERROR_FACTORY.create("server-app-deleted" /* AppError.SERVER_APP_DELETED */);
        }
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The current SDK version.
 *
 * @public
 */
const SDK_VERSION = version;
function initializeApp(_options, rawConfig = {}) {
    let options = _options;
    if (typeof rawConfig !== 'object') {
        const name = rawConfig;
        rawConfig = { name };
    }
    const config = Object.assign({ name: DEFAULT_ENTRY_NAME, automaticDataCollectionEnabled: false }, rawConfig);
    const name = config.name;
    if (typeof name !== 'string' || !name) {
        throw ERROR_FACTORY.create("bad-app-name" /* AppError.BAD_APP_NAME */, {
            appName: String(name)
        });
    }
    options || (options = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getDefaultAppConfig)());
    if (!options) {
        throw ERROR_FACTORY.create("no-options" /* AppError.NO_OPTIONS */);
    }
    const existingApp = _apps.get(name);
    if (existingApp) {
        // return the existing app if options and config deep equal the ones in the existing app.
        if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.deepEqual)(options, existingApp.options) &&
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.deepEqual)(config, existingApp.config)) {
            return existingApp;
        }
        else {
            throw ERROR_FACTORY.create("duplicate-app" /* AppError.DUPLICATE_APP */, { appName: name });
        }
    }
    const container = new _firebase_component__WEBPACK_IMPORTED_MODULE_0__.ComponentContainer(name);
    for (const component of _components.values()) {
        container.addComponent(component);
    }
    const newApp = new FirebaseAppImpl(options, config, container);
    _apps.set(name, newApp);
    return newApp;
}
function initializeServerApp(_options, _serverAppConfig) {
    if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isBrowser)() && !(0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isWebWorker)()) {
        // FirebaseServerApp isn't designed to be run in browsers.
        throw ERROR_FACTORY.create("invalid-server-app-environment" /* AppError.INVALID_SERVER_APP_ENVIRONMENT */);
    }
    if (_serverAppConfig.automaticDataCollectionEnabled === undefined) {
        _serverAppConfig.automaticDataCollectionEnabled = false;
    }
    let appOptions;
    if (_isFirebaseApp(_options)) {
        appOptions = _options.options;
    }
    else {
        appOptions = _options;
    }
    // Build an app name based on a hash of the configuration options.
    const nameObj = Object.assign(Object.assign({}, _serverAppConfig), appOptions);
    // However, Do not mangle the name based on releaseOnDeref, since it will vary between the
    // construction of FirebaseServerApp instances. For example, if the object is the request headers.
    if (nameObj.releaseOnDeref !== undefined) {
        delete nameObj.releaseOnDeref;
    }
    const hashCode = (s) => {
        return [...s].reduce((hash, c) => (Math.imul(31, hash) + c.charCodeAt(0)) | 0, 0);
    };
    if (_serverAppConfig.releaseOnDeref !== undefined) {
        if (typeof FinalizationRegistry === 'undefined') {
            throw ERROR_FACTORY.create("finalization-registry-not-supported" /* AppError.FINALIZATION_REGISTRY_NOT_SUPPORTED */, {});
        }
    }
    const nameString = '' + hashCode(JSON.stringify(nameObj));
    const existingApp = _serverApps.get(nameString);
    if (existingApp) {
        existingApp.incRefCount(_serverAppConfig.releaseOnDeref);
        return existingApp;
    }
    const container = new _firebase_component__WEBPACK_IMPORTED_MODULE_0__.ComponentContainer(nameString);
    for (const component of _components.values()) {
        container.addComponent(component);
    }
    const newApp = new FirebaseServerAppImpl(appOptions, _serverAppConfig, nameString, container);
    _serverApps.set(nameString, newApp);
    return newApp;
}
/**
 * Retrieves a {@link @firebase/app#FirebaseApp} instance.
 *
 * When called with no arguments, the default app is returned. When an app name
 * is provided, the app corresponding to that name is returned.
 *
 * An exception is thrown if the app being retrieved has not yet been
 * initialized.
 *
 * @example
 * ```javascript
 * // Return the default app
 * const app = getApp();
 * ```
 *
 * @example
 * ```javascript
 * // Return a named app
 * const otherApp = getApp("otherApp");
 * ```
 *
 * @param name - Optional name of the app to return. If no name is
 *   provided, the default is `"[DEFAULT]"`.
 *
 * @returns The app corresponding to the provided app name.
 *   If no app name is provided, the default app is returned.
 *
 * @public
 */
function getApp(name = DEFAULT_ENTRY_NAME) {
    const app = _apps.get(name);
    if (!app && name === DEFAULT_ENTRY_NAME && (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getDefaultAppConfig)()) {
        return initializeApp();
    }
    if (!app) {
        throw ERROR_FACTORY.create("no-app" /* AppError.NO_APP */, { appName: name });
    }
    return app;
}
/**
 * A (read-only) array of all initialized apps.
 * @public
 */
function getApps() {
    return Array.from(_apps.values());
}
/**
 * Renders this app unusable and frees the resources of all associated
 * services.
 *
 * @example
 * ```javascript
 * deleteApp(app)
 *   .then(function() {
 *     console.log("App deleted successfully");
 *   })
 *   .catch(function(error) {
 *     console.log("Error deleting app:", error);
 *   });
 * ```
 *
 * @public
 */
async function deleteApp(app) {
    let cleanupProviders = false;
    const name = app.name;
    if (_apps.has(name)) {
        cleanupProviders = true;
        _apps.delete(name);
    }
    else if (_serverApps.has(name)) {
        const firebaseServerApp = app;
        if (firebaseServerApp.decRefCount() <= 0) {
            _serverApps.delete(name);
            cleanupProviders = true;
        }
    }
    if (cleanupProviders) {
        await Promise.all(app.container
            .getProviders()
            .map(provider => provider.delete()));
        app.isDeleted = true;
    }
}
/**
 * Registers a library's name and version for platform logging purposes.
 * @param library - Name of 1p or 3p library (e.g. firestore, angularfire)
 * @param version - Current version of that library.
 * @param variant - Bundle variant, e.g., node, rn, etc.
 *
 * @public
 */
function registerVersion(libraryKeyOrName, version, variant) {
    var _a;
    // TODO: We can use this check to whitelist strings when/if we set up
    // a good whitelist system.
    let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
    if (variant) {
        library += `-${variant}`;
    }
    const libraryMismatch = library.match(/\s|\//);
    const versionMismatch = version.match(/\s|\//);
    if (libraryMismatch || versionMismatch) {
        const warning = [
            `Unable to register library "${library}" with version "${version}":`
        ];
        if (libraryMismatch) {
            warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
        }
        if (libraryMismatch && versionMismatch) {
            warning.push('and');
        }
        if (versionMismatch) {
            warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
        }
        logger.warn(warning.join(' '));
        return;
    }
    _registerComponent(new _firebase_component__WEBPACK_IMPORTED_MODULE_0__.Component(`${library}-version`, () => ({ library, version }), "VERSION" /* ComponentType.VERSION */));
}
/**
 * Sets log handler for all Firebase SDKs.
 * @param logCallback - An optional custom log handler that executes user code whenever
 * the Firebase SDK makes a logging call.
 *
 * @public
 */
function onLog(logCallback, options) {
    if (logCallback !== null && typeof logCallback !== 'function') {
        throw ERROR_FACTORY.create("invalid-log-argument" /* AppError.INVALID_LOG_ARGUMENT */);
    }
    (0,_firebase_logger__WEBPACK_IMPORTED_MODULE_1__.setUserLogHandler)(logCallback, options);
}
/**
 * Sets log level for all Firebase SDKs.
 *
 * All of the log types above the current log level are captured (i.e. if
 * you set the log level to `info`, errors are logged, but `debug` and
 * `verbose` logs are not).
 *
 * @public
 */
function setLogLevel(logLevel) {
    (0,_firebase_logger__WEBPACK_IMPORTED_MODULE_1__.setLogLevel)(logLevel);
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DB_NAME = 'firebase-heartbeat-database';
const DB_VERSION = 1;
const STORE_NAME = 'firebase-heartbeat-store';
let dbPromise = null;
function getDbPromise() {
    if (!dbPromise) {
        dbPromise = (0,idb__WEBPACK_IMPORTED_MODULE_3__.openDB)(DB_NAME, DB_VERSION, {
            upgrade: (db, oldVersion) => {
                // We don't use 'break' in this switch statement, the fall-through
                // behavior is what we want, because if there are multiple versions between
                // the old version and the current version, we want ALL the migrations
                // that correspond to those versions to run, not only the last one.
                // eslint-disable-next-line default-case
                switch (oldVersion) {
                    case 0:
                        try {
                            db.createObjectStore(STORE_NAME);
                        }
                        catch (e) {
                            // Safari/iOS browsers throw occasional exceptions on
                            // db.createObjectStore() that may be a bug. Avoid blocking
                            // the rest of the app functionality.
                            console.warn(e);
                        }
                }
            }
        }).catch(e => {
            throw ERROR_FACTORY.create("idb-open" /* AppError.IDB_OPEN */, {
                originalErrorMessage: e.message
            });
        });
    }
    return dbPromise;
}
async function readHeartbeatsFromIndexedDB(app) {
    try {
        const db = await getDbPromise();
        const tx = db.transaction(STORE_NAME);
        const result = await tx.objectStore(STORE_NAME).get(computeKey(app));
        // We already have the value but tx.done can throw,
        // so we need to await it here to catch errors
        await tx.done;
        return result;
    }
    catch (e) {
        if (e instanceof _firebase_util__WEBPACK_IMPORTED_MODULE_2__.FirebaseError) {
            logger.warn(e.message);
        }
        else {
            const idbGetError = ERROR_FACTORY.create("idb-get" /* AppError.IDB_GET */, {
                originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
            });
            logger.warn(idbGetError.message);
        }
    }
}
async function writeHeartbeatsToIndexedDB(app, heartbeatObject) {
    try {
        const db = await getDbPromise();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const objectStore = tx.objectStore(STORE_NAME);
        await objectStore.put(heartbeatObject, computeKey(app));
        await tx.done;
    }
    catch (e) {
        if (e instanceof _firebase_util__WEBPACK_IMPORTED_MODULE_2__.FirebaseError) {
            logger.warn(e.message);
        }
        else {
            const idbGetError = ERROR_FACTORY.create("idb-set" /* AppError.IDB_WRITE */, {
                originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
            });
            logger.warn(idbGetError.message);
        }
    }
}
function computeKey(app) {
    return `${app.name}!${app.options.appId}`;
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const MAX_HEADER_BYTES = 1024;
const MAX_NUM_STORED_HEARTBEATS = 30;
class HeartbeatServiceImpl {
    constructor(container) {
        this.container = container;
        /**
         * In-memory cache for heartbeats, used by getHeartbeatsHeader() to generate
         * the header string.
         * Stores one record per date. This will be consolidated into the standard
         * format of one record per user agent string before being sent as a header.
         * Populated from indexedDB when the controller is instantiated and should
         * be kept in sync with indexedDB.
         * Leave public for easier testing.
         */
        this._heartbeatsCache = null;
        const app = this.container.getProvider('app').getImmediate();
        this._storage = new HeartbeatStorageImpl(app);
        this._heartbeatsCachePromise = this._storage.read().then(result => {
            this._heartbeatsCache = result;
            return result;
        });
    }
    /**
     * Called to report a heartbeat. The function will generate
     * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
     * to IndexedDB.
     * Note that we only store one heartbeat per day. So if a heartbeat for today is
     * already logged, subsequent calls to this function in the same day will be ignored.
     */
    async triggerHeartbeat() {
        var _a, _b;
        try {
            const platformLogger = this.container
                .getProvider('platform-logger')
                .getImmediate();
            // This is the "Firebase user agent" string from the platform logger
            // service, not the browser user agent.
            const agent = platformLogger.getPlatformInfoString();
            const date = getUTCDateString();
            if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null) {
                this._heartbeatsCache = await this._heartbeatsCachePromise;
                // If we failed to construct a heartbeats cache, then return immediately.
                if (((_b = this._heartbeatsCache) === null || _b === void 0 ? void 0 : _b.heartbeats) == null) {
                    return;
                }
            }
            // Do not store a heartbeat if one is already stored for this day
            // or if a header has already been sent today.
            if (this._heartbeatsCache.lastSentHeartbeatDate === date ||
                this._heartbeatsCache.heartbeats.some(singleDateHeartbeat => singleDateHeartbeat.date === date)) {
                return;
            }
            else {
                // There is no entry for this date. Create one.
                this._heartbeatsCache.heartbeats.push({ date, agent });
                // If the number of stored heartbeats exceeds the maximum number of stored heartbeats, remove the heartbeat with the earliest date.
                // Since this is executed each time a heartbeat is pushed, the limit can only be exceeded by one, so only one needs to be removed.
                if (this._heartbeatsCache.heartbeats.length > MAX_NUM_STORED_HEARTBEATS) {
                    const earliestHeartbeatIdx = getEarliestHeartbeatIdx(this._heartbeatsCache.heartbeats);
                    this._heartbeatsCache.heartbeats.splice(earliestHeartbeatIdx, 1);
                }
            }
            return this._storage.overwrite(this._heartbeatsCache);
        }
        catch (e) {
            logger.warn(e);
        }
    }
    /**
     * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
     * It also clears all heartbeats from memory as well as in IndexedDB.
     *
     * NOTE: Consuming product SDKs should not send the header if this method
     * returns an empty string.
     */
    async getHeartbeatsHeader() {
        var _a;
        try {
            if (this._heartbeatsCache === null) {
                await this._heartbeatsCachePromise;
            }
            // If it's still null or the array is empty, there is no data to send.
            if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null ||
                this._heartbeatsCache.heartbeats.length === 0) {
                return '';
            }
            const date = getUTCDateString();
            // Extract as many heartbeats from the cache as will fit under the size limit.
            const { heartbeatsToSend, unsentEntries } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
            const headerString = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.base64urlEncodeWithoutPadding)(JSON.stringify({ version: 2, heartbeats: heartbeatsToSend }));
            // Store last sent date to prevent another being logged/sent for the same day.
            this._heartbeatsCache.lastSentHeartbeatDate = date;
            if (unsentEntries.length > 0) {
                // Store any unsent entries if they exist.
                this._heartbeatsCache.heartbeats = unsentEntries;
                // This seems more likely than emptying the array (below) to lead to some odd state
                // since the cache isn't empty and this will be called again on the next request,
                // and is probably safest if we await it.
                await this._storage.overwrite(this._heartbeatsCache);
            }
            else {
                this._heartbeatsCache.heartbeats = [];
                // Do not wait for this, to reduce latency.
                void this._storage.overwrite(this._heartbeatsCache);
            }
            return headerString;
        }
        catch (e) {
            logger.warn(e);
            return '';
        }
    }
}
function getUTCDateString() {
    const today = new Date();
    // Returns date format 'YYYY-MM-DD'
    return today.toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
    // Heartbeats grouped by user agent in the standard format to be sent in
    // the header.
    const heartbeatsToSend = [];
    // Single date format heartbeats that are not sent.
    let unsentEntries = heartbeatsCache.slice();
    for (const singleDateHeartbeat of heartbeatsCache) {
        // Look for an existing entry with the same user agent.
        const heartbeatEntry = heartbeatsToSend.find(hb => hb.agent === singleDateHeartbeat.agent);
        if (!heartbeatEntry) {
            // If no entry for this user agent exists, create one.
            heartbeatsToSend.push({
                agent: singleDateHeartbeat.agent,
                dates: [singleDateHeartbeat.date]
            });
            if (countBytes(heartbeatsToSend) > maxSize) {
                // If the header would exceed max size, remove the added heartbeat
                // entry and stop adding to the header.
                heartbeatsToSend.pop();
                break;
            }
        }
        else {
            heartbeatEntry.dates.push(singleDateHeartbeat.date);
            // If the header would exceed max size, remove the added date
            // and stop adding to the header.
            if (countBytes(heartbeatsToSend) > maxSize) {
                heartbeatEntry.dates.pop();
                break;
            }
        }
        // Pop unsent entry from queue. (Skipped if adding the entry exceeded
        // quota and the loop breaks early.)
        unsentEntries = unsentEntries.slice(1);
    }
    return {
        heartbeatsToSend,
        unsentEntries
    };
}
class HeartbeatStorageImpl {
    constructor(app) {
        this.app = app;
        this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
    }
    async runIndexedDBEnvironmentCheck() {
        if (!(0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isIndexedDBAvailable)()) {
            return false;
        }
        else {
            return (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.validateIndexedDBOpenable)()
                .then(() => true)
                .catch(() => false);
        }
    }
    /**
     * Read all heartbeats.
     */
    async read() {
        const canUseIndexedDB = await this._canUseIndexedDBPromise;
        if (!canUseIndexedDB) {
            return { heartbeats: [] };
        }
        else {
            const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
            if (idbHeartbeatObject === null || idbHeartbeatObject === void 0 ? void 0 : idbHeartbeatObject.heartbeats) {
                return idbHeartbeatObject;
            }
            else {
                return { heartbeats: [] };
            }
        }
    }
    // overwrite the storage with the provided heartbeats
    async overwrite(heartbeatsObject) {
        var _a;
        const canUseIndexedDB = await this._canUseIndexedDBPromise;
        if (!canUseIndexedDB) {
            return;
        }
        else {
            const existingHeartbeatsObject = await this.read();
            return writeHeartbeatsToIndexedDB(this.app, {
                lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
                heartbeats: heartbeatsObject.heartbeats
            });
        }
    }
    // add heartbeats
    async add(heartbeatsObject) {
        var _a;
        const canUseIndexedDB = await this._canUseIndexedDBPromise;
        if (!canUseIndexedDB) {
            return;
        }
        else {
            const existingHeartbeatsObject = await this.read();
            return writeHeartbeatsToIndexedDB(this.app, {
                lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
                heartbeats: [
                    ...existingHeartbeatsObject.heartbeats,
                    ...heartbeatsObject.heartbeats
                ]
            });
        }
    }
}
/**
 * Calculate bytes of a HeartbeatsByUserAgent array after being wrapped
 * in a platform logging header JSON object, stringified, and converted
 * to base 64.
 */
function countBytes(heartbeatsCache) {
    // base64 has a restricted set of characters, all of which should be 1 byte.
    return (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.base64urlEncodeWithoutPadding)(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: heartbeatsCache })).length;
}
/**
 * Returns the index of the heartbeat with the earliest date.
 * If the heartbeats array is empty, -1 is returned.
 */
function getEarliestHeartbeatIdx(heartbeats) {
    if (heartbeats.length === 0) {
        return -1;
    }
    let earliestHeartbeatIdx = 0;
    let earliestHeartbeatDate = heartbeats[0].date;
    for (let i = 1; i < heartbeats.length; i++) {
        if (heartbeats[i].date < earliestHeartbeatDate) {
            earliestHeartbeatDate = heartbeats[i].date;
            earliestHeartbeatIdx = i;
        }
    }
    return earliestHeartbeatIdx;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerCoreComponents(variant) {
    _registerComponent(new _firebase_component__WEBPACK_IMPORTED_MODULE_0__.Component('platform-logger', container => new PlatformLoggerServiceImpl(container), "PRIVATE" /* ComponentType.PRIVATE */));
    _registerComponent(new _firebase_component__WEBPACK_IMPORTED_MODULE_0__.Component('heartbeat', container => new HeartbeatServiceImpl(container), "PRIVATE" /* ComponentType.PRIVATE */));
    // Register `app` package.
    registerVersion(name$q, version$1, variant);
    // BUILD_TARGET will be replaced by values like esm2017, cjs2017, etc during the compilation
    registerVersion(name$q, version$1, 'esm2017');
    // Register platform SDK identifier (no version).
    registerVersion('fire-js', '');
}

/**
 * Firebase App
 *
 * @remarks This package coordinates the communication between the different Firebase components
 * @packageDocumentation
 */
registerCoreComponents('');


//# sourceMappingURL=index.esm2017.js.map


/***/ }),

/***/ "./node_modules/@firebase/component/dist/esm/index.esm2017.js":
/*!********************************************************************!*\
  !*** ./node_modules/@firebase/component/dist/esm/index.esm2017.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* binding */ Component),
/* harmony export */   ComponentContainer: () => (/* binding */ ComponentContainer),
/* harmony export */   Provider: () => (/* binding */ Provider)
/* harmony export */ });
/* harmony import */ var _firebase_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/util */ "./node_modules/@firebase/util/dist/index.esm2017.js");


/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
class Component {
    /**
     *
     * @param name The public service name, e.g. app, auth, firestore, database
     * @param instanceFactory Service factory responsible for creating the public interface
     * @param type whether the service provided by the component is public or private
     */
    constructor(name, instanceFactory, type) {
        this.name = name;
        this.instanceFactory = instanceFactory;
        this.type = type;
        this.multipleInstances = false;
        /**
         * Properties to be added to the service namespace
         */
        this.serviceProps = {};
        this.instantiationMode = "LAZY" /* InstantiationMode.LAZY */;
        this.onInstanceCreated = null;
    }
    setInstantiationMode(mode) {
        this.instantiationMode = mode;
        return this;
    }
    setMultipleInstances(multipleInstances) {
        this.multipleInstances = multipleInstances;
        return this;
    }
    setServiceProps(props) {
        this.serviceProps = props;
        return this;
    }
    setInstanceCreatedCallback(callback) {
        this.onInstanceCreated = callback;
        return this;
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ENTRY_NAME = '[DEFAULT]';

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */
class Provider {
    constructor(name, container) {
        this.name = name;
        this.container = container;
        this.component = null;
        this.instances = new Map();
        this.instancesDeferred = new Map();
        this.instancesOptions = new Map();
        this.onInitCallbacks = new Map();
    }
    /**
     * @param identifier A provider can provide multiple instances of a service
     * if this.component.multipleInstances is true.
     */
    get(identifier) {
        // if multipleInstances is not supported, use the default name
        const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        if (!this.instancesDeferred.has(normalizedIdentifier)) {
            const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_0__.Deferred();
            this.instancesDeferred.set(normalizedIdentifier, deferred);
            if (this.isInitialized(normalizedIdentifier) ||
                this.shouldAutoInitialize()) {
                // initialize the service if it can be auto-initialized
                try {
                    const instance = this.getOrInitializeService({
                        instanceIdentifier: normalizedIdentifier
                    });
                    if (instance) {
                        deferred.resolve(instance);
                    }
                }
                catch (e) {
                    // when the instance factory throws an exception during get(), it should not cause
                    // a fatal error. We just return the unresolved promise in this case.
                }
            }
        }
        return this.instancesDeferred.get(normalizedIdentifier).promise;
    }
    getImmediate(options) {
        var _a;
        // if multipleInstances is not supported, use the default name
        const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
        const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
        if (this.isInitialized(normalizedIdentifier) ||
            this.shouldAutoInitialize()) {
            try {
                return this.getOrInitializeService({
                    instanceIdentifier: normalizedIdentifier
                });
            }
            catch (e) {
                if (optional) {
                    return null;
                }
                else {
                    throw e;
                }
            }
        }
        else {
            // In case a component is not initialized and should/cannot be auto-initialized at the moment, return null if the optional flag is set, or throw
            if (optional) {
                return null;
            }
            else {
                throw Error(`Service ${this.name} is not available`);
            }
        }
    }
    getComponent() {
        return this.component;
    }
    setComponent(component) {
        if (component.name !== this.name) {
            throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
        }
        if (this.component) {
            throw Error(`Component for ${this.name} has already been provided`);
        }
        this.component = component;
        // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)
        if (!this.shouldAutoInitialize()) {
            return;
        }
        // if the service is eager, initialize the default instance
        if (isComponentEager(component)) {
            try {
                this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME });
            }
            catch (e) {
                // when the instance factory for an eager Component throws an exception during the eager
                // initialization, it should not cause a fatal error.
                // TODO: Investigate if we need to make it configurable, because some component may want to cause
                // a fatal error in this case?
            }
        }
        // Create service instances for the pending promises and resolve them
        // NOTE: if this.multipleInstances is false, only the default instance will be created
        // and all promises with resolve with it regardless of the identifier.
        for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
            const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
            try {
                // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
                const instance = this.getOrInitializeService({
                    instanceIdentifier: normalizedIdentifier
                });
                instanceDeferred.resolve(instance);
            }
            catch (e) {
                // when the instance factory throws an exception, it should not cause
                // a fatal error. We just leave the promise unresolved.
            }
        }
    }
    clearInstance(identifier = DEFAULT_ENTRY_NAME) {
        this.instancesDeferred.delete(identifier);
        this.instancesOptions.delete(identifier);
        this.instances.delete(identifier);
    }
    // app.delete() will call this method on every provider to delete the services
    // TODO: should we mark the provider as deleted?
    async delete() {
        const services = Array.from(this.instances.values());
        await Promise.all([
            ...services
                .filter(service => 'INTERNAL' in service) // legacy services
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map(service => service.INTERNAL.delete()),
            ...services
                .filter(service => '_delete' in service) // modularized services
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map(service => service._delete())
        ]);
    }
    isComponentSet() {
        return this.component != null;
    }
    isInitialized(identifier = DEFAULT_ENTRY_NAME) {
        return this.instances.has(identifier);
    }
    getOptions(identifier = DEFAULT_ENTRY_NAME) {
        return this.instancesOptions.get(identifier) || {};
    }
    initialize(opts = {}) {
        const { options = {} } = opts;
        const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
        if (this.isInitialized(normalizedIdentifier)) {
            throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
        }
        if (!this.isComponentSet()) {
            throw Error(`Component ${this.name} has not been registered yet`);
        }
        const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier,
            options
        });
        // resolve any pending promise waiting for the service instance
        for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
            const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
            if (normalizedIdentifier === normalizedDeferredIdentifier) {
                instanceDeferred.resolve(instance);
            }
        }
        return instance;
    }
    /**
     *
     * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
     * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
     *
     * @param identifier An optional instance identifier
     * @returns a function to unregister the callback
     */
    onInit(callback, identifier) {
        var _a;
        const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
        existingCallbacks.add(callback);
        this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
        const existingInstance = this.instances.get(normalizedIdentifier);
        if (existingInstance) {
            callback(existingInstance, normalizedIdentifier);
        }
        return () => {
            existingCallbacks.delete(callback);
        };
    }
    /**
     * Invoke onInit callbacks synchronously
     * @param instance the service instance`
     */
    invokeOnInitCallbacks(instance, identifier) {
        const callbacks = this.onInitCallbacks.get(identifier);
        if (!callbacks) {
            return;
        }
        for (const callback of callbacks) {
            try {
                callback(instance, identifier);
            }
            catch (_a) {
                // ignore errors in the onInit callback
            }
        }
    }
    getOrInitializeService({ instanceIdentifier, options = {} }) {
        let instance = this.instances.get(instanceIdentifier);
        if (!instance && this.component) {
            instance = this.component.instanceFactory(this.container, {
                instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
                options
            });
            this.instances.set(instanceIdentifier, instance);
            this.instancesOptions.set(instanceIdentifier, options);
            /**
             * Invoke onInit listeners.
             * Note this.component.onInstanceCreated is different, which is used by the component creator,
             * while onInit listeners are registered by consumers of the provider.
             */
            this.invokeOnInitCallbacks(instance, instanceIdentifier);
            /**
             * Order is important
             * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
             * makes `isInitialized()` return true.
             */
            if (this.component.onInstanceCreated) {
                try {
                    this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
                }
                catch (_a) {
                    // ignore errors in the onInstanceCreatedCallback
                }
            }
        }
        return instance || null;
    }
    normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
        if (this.component) {
            return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
        }
        else {
            return identifier; // assume multiple instances are supported before the component is provided.
        }
    }
    shouldAutoInitialize() {
        return (!!this.component &&
            this.component.instantiationMode !== "EXPLICIT" /* InstantiationMode.EXPLICIT */);
    }
}
// undefined should be passed to the service factory for the default instance
function normalizeIdentifierForFactory(identifier) {
    return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}
function isComponentEager(component) {
    return component.instantiationMode === "EAGER" /* InstantiationMode.EAGER */;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */
class ComponentContainer {
    constructor(name) {
        this.name = name;
        this.providers = new Map();
    }
    /**
     *
     * @param component Component being added
     * @param overwrite When a component with the same name has already been registered,
     * if overwrite is true: overwrite the existing component with the new component and create a new
     * provider with the new component. It can be useful in tests where you want to use different mocks
     * for different tests.
     * if overwrite is false: throw an exception
     */
    addComponent(component) {
        const provider = this.getProvider(component.name);
        if (provider.isComponentSet()) {
            throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
        }
        provider.setComponent(component);
    }
    addOrOverwriteComponent(component) {
        const provider = this.getProvider(component.name);
        if (provider.isComponentSet()) {
            // delete the existing provider from the container, so we can register the new component
            this.providers.delete(component.name);
        }
        this.addComponent(component);
    }
    /**
     * getProvider provides a type safe interface where it can only be called with a field name
     * present in NameServiceMapping interface.
     *
     * Firebase SDKs providing services should extend NameServiceMapping interface to register
     * themselves.
     */
    getProvider(name) {
        if (this.providers.has(name)) {
            return this.providers.get(name);
        }
        // create a Provider for a service that hasn't registered with Firebase
        const provider = new Provider(name, this);
        this.providers.set(name, provider);
        return provider;
    }
    getProviders() {
        return Array.from(this.providers.values());
    }
}


//# sourceMappingURL=index.esm2017.js.map


/***/ }),

/***/ "./node_modules/@firebase/database/dist/index.esm2017.js":
/*!***************************************************************!*\
  !*** ./node_modules/@firebase/database/dist/index.esm2017.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataSnapshot: () => (/* binding */ DataSnapshot),
/* harmony export */   Database: () => (/* binding */ Database),
/* harmony export */   OnDisconnect: () => (/* binding */ OnDisconnect),
/* harmony export */   QueryConstraint: () => (/* binding */ QueryConstraint),
/* harmony export */   TransactionResult: () => (/* binding */ TransactionResult),
/* harmony export */   _QueryImpl: () => (/* binding */ QueryImpl),
/* harmony export */   _QueryParams: () => (/* binding */ QueryParams),
/* harmony export */   _ReferenceImpl: () => (/* binding */ ReferenceImpl),
/* harmony export */   _TEST_ACCESS_forceRestClient: () => (/* binding */ forceRestClient),
/* harmony export */   _TEST_ACCESS_hijackHash: () => (/* binding */ hijackHash),
/* harmony export */   _initStandalone: () => (/* binding */ _initStandalone),
/* harmony export */   _repoManagerDatabaseFromApp: () => (/* binding */ repoManagerDatabaseFromApp),
/* harmony export */   _setSDKVersion: () => (/* binding */ setSDKVersion),
/* harmony export */   _validatePathString: () => (/* binding */ validatePathString),
/* harmony export */   _validateWritablePath: () => (/* binding */ validateWritablePath),
/* harmony export */   child: () => (/* binding */ child),
/* harmony export */   connectDatabaseEmulator: () => (/* binding */ connectDatabaseEmulator),
/* harmony export */   enableLogging: () => (/* binding */ enableLogging),
/* harmony export */   endAt: () => (/* binding */ endAt),
/* harmony export */   endBefore: () => (/* binding */ endBefore),
/* harmony export */   equalTo: () => (/* binding */ equalTo),
/* harmony export */   forceLongPolling: () => (/* binding */ forceLongPolling),
/* harmony export */   forceWebSockets: () => (/* binding */ forceWebSockets),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   getDatabase: () => (/* binding */ getDatabase),
/* harmony export */   goOffline: () => (/* binding */ goOffline),
/* harmony export */   goOnline: () => (/* binding */ goOnline),
/* harmony export */   increment: () => (/* binding */ increment),
/* harmony export */   limitToFirst: () => (/* binding */ limitToFirst),
/* harmony export */   limitToLast: () => (/* binding */ limitToLast),
/* harmony export */   off: () => (/* binding */ off),
/* harmony export */   onChildAdded: () => (/* binding */ onChildAdded),
/* harmony export */   onChildChanged: () => (/* binding */ onChildChanged),
/* harmony export */   onChildMoved: () => (/* binding */ onChildMoved),
/* harmony export */   onChildRemoved: () => (/* binding */ onChildRemoved),
/* harmony export */   onDisconnect: () => (/* binding */ onDisconnect),
/* harmony export */   onValue: () => (/* binding */ onValue),
/* harmony export */   orderByChild: () => (/* binding */ orderByChild),
/* harmony export */   orderByKey: () => (/* binding */ orderByKey),
/* harmony export */   orderByPriority: () => (/* binding */ orderByPriority),
/* harmony export */   orderByValue: () => (/* binding */ orderByValue),
/* harmony export */   push: () => (/* binding */ push),
/* harmony export */   query: () => (/* binding */ query),
/* harmony export */   ref: () => (/* binding */ ref),
/* harmony export */   refFromURL: () => (/* binding */ refFromURL),
/* harmony export */   remove: () => (/* binding */ remove),
/* harmony export */   runTransaction: () => (/* binding */ runTransaction),
/* harmony export */   serverTimestamp: () => (/* binding */ serverTimestamp),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   setPriority: () => (/* binding */ setPriority),
/* harmony export */   setWithPriority: () => (/* binding */ setWithPriority),
/* harmony export */   startAfter: () => (/* binding */ startAfter),
/* harmony export */   startAt: () => (/* binding */ startAt),
/* harmony export */   update: () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/app */ "./node_modules/@firebase/app/dist/esm/index.esm2017.js");
/* harmony import */ var _firebase_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @firebase/component */ "./node_modules/@firebase/component/dist/esm/index.esm2017.js");
/* harmony import */ var _firebase_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @firebase/util */ "./node_modules/@firebase/util/dist/index.esm2017.js");
/* harmony import */ var _firebase_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @firebase/logger */ "./node_modules/@firebase/logger/dist/esm/index.esm2017.js");





const name = "@firebase/database";
const version = "1.0.14";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** The semver (www.semver.org) version of the SDK. */
let SDK_VERSION = '';
/**
 * SDK_VERSION should be set before any database instance is created
 * @internal
 */
function setSDKVersion(version) {
    SDK_VERSION = version;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Wraps a DOM Storage object and:
 * - automatically encode objects as JSON strings before storing them to allow us to store arbitrary types.
 * - prefixes names with "firebase:" to avoid collisions with app data.
 *
 * We automatically (see storage.js) create two such wrappers, one for sessionStorage,
 * and one for localStorage.
 *
 */
class DOMStorageWrapper {
    /**
     * @param domStorage_ - The underlying storage object (e.g. localStorage or sessionStorage)
     */
    constructor(domStorage_) {
        this.domStorage_ = domStorage_;
        // Use a prefix to avoid collisions with other stuff saved by the app.
        this.prefix_ = 'firebase:';
    }
    /**
     * @param key - The key to save the value under
     * @param value - The value being stored, or null to remove the key.
     */
    set(key, value) {
        if (value == null) {
            this.domStorage_.removeItem(this.prefixedName_(key));
        }
        else {
            this.domStorage_.setItem(this.prefixedName_(key), (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(value));
        }
    }
    /**
     * @returns The value that was stored under this key, or null
     */
    get(key) {
        const storedVal = this.domStorage_.getItem(this.prefixedName_(key));
        if (storedVal == null) {
            return null;
        }
        else {
            return (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.jsonEval)(storedVal);
        }
    }
    remove(key) {
        this.domStorage_.removeItem(this.prefixedName_(key));
    }
    prefixedName_(name) {
        return this.prefix_ + name;
    }
    toString() {
        return this.domStorage_.toString();
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An in-memory storage implementation that matches the API of DOMStorageWrapper
 * (TODO: create interface for both to implement).
 */
class MemoryStorage {
    constructor() {
        this.cache_ = {};
        this.isInMemoryStorage = true;
    }
    set(key, value) {
        if (value == null) {
            delete this.cache_[key];
        }
        else {
            this.cache_[key] = value;
        }
    }
    get(key) {
        if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.contains)(this.cache_, key)) {
            return this.cache_[key];
        }
        return null;
    }
    remove(key) {
        delete this.cache_[key];
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Helper to create a DOMStorageWrapper or else fall back to MemoryStorage.
 * TODO: Once MemoryStorage and DOMStorageWrapper have a shared interface this method annotation should change
 * to reflect this type
 *
 * @param domStorageName - Name of the underlying storage object
 *   (e.g. 'localStorage' or 'sessionStorage').
 * @returns Turning off type information until a common interface is defined.
 */
const createStoragefor = function (domStorageName) {
    try {
        // NOTE: just accessing "localStorage" or "window['localStorage']" may throw a security exception,
        // so it must be inside the try/catch.
        if (typeof window !== 'undefined' &&
            typeof window[domStorageName] !== 'undefined') {
            // Need to test cache. Just because it's here doesn't mean it works
            const domStorage = window[domStorageName];
            domStorage.setItem('firebase:sentinel', 'cache');
            domStorage.removeItem('firebase:sentinel');
            return new DOMStorageWrapper(domStorage);
        }
    }
    catch (e) { }
    // Failed to create wrapper.  Just return in-memory storage.
    // TODO: log?
    return new MemoryStorage();
};
/** A storage object that lasts across sessions */
const PersistentStorage = createStoragefor('localStorage');
/** A storage object that only lasts one session */
const SessionStorage = createStoragefor('sessionStorage');

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logClient = new _firebase_logger__WEBPACK_IMPORTED_MODULE_3__.Logger('@firebase/database');
/**
 * Returns a locally-unique ID (generated by just incrementing up from 0 each time its called).
 */
const LUIDGenerator = (function () {
    let id = 1;
    return function () {
        return id++;
    };
})();
/**
 * Sha1 hash of the input string
 * @param str - The string to hash
 * @returns {!string} The resulting hash
 */
const sha1 = function (str) {
    const utf8Bytes = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringToByteArray)(str);
    const sha1 = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Sha1();
    sha1.update(utf8Bytes);
    const sha1Bytes = sha1.digest();
    return _firebase_util__WEBPACK_IMPORTED_MODULE_2__.base64.encodeByteArray(sha1Bytes);
};
const buildLogMessage_ = function (...varArgs) {
    let message = '';
    for (let i = 0; i < varArgs.length; i++) {
        const arg = varArgs[i];
        if (Array.isArray(arg) ||
            (arg &&
                typeof arg === 'object' &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                typeof arg.length === 'number')) {
            message += buildLogMessage_.apply(null, arg);
        }
        else if (typeof arg === 'object') {
            message += (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(arg);
        }
        else {
            message += arg;
        }
        message += ' ';
    }
    return message;
};
/**
 * Use this for all debug messages in Firebase.
 */
let logger = null;
/**
 * Flag to check for log availability on first log message
 */
let firstLog_ = true;
/**
 * The implementation of Firebase.enableLogging (defined here to break dependencies)
 * @param logger_ - A flag to turn on logging, or a custom logger
 * @param persistent - Whether or not to persist logging settings across refreshes
 */
const enableLogging$1 = function (logger_, persistent) {
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(!persistent || logger_ === true || logger_ === false, "Can't turn on custom loggers persistently.");
    if (logger_ === true) {
        logClient.logLevel = _firebase_logger__WEBPACK_IMPORTED_MODULE_3__.LogLevel.VERBOSE;
        logger = logClient.log.bind(logClient);
        if (persistent) {
            SessionStorage.set('logging_enabled', true);
        }
    }
    else if (typeof logger_ === 'function') {
        logger = logger_;
    }
    else {
        logger = null;
        SessionStorage.remove('logging_enabled');
    }
};
const log = function (...varArgs) {
    if (firstLog_ === true) {
        firstLog_ = false;
        if (logger === null && SessionStorage.get('logging_enabled') === true) {
            enableLogging$1(true);
        }
    }
    if (logger) {
        const message = buildLogMessage_.apply(null, varArgs);
        logger(message);
    }
};
const logWrapper = function (prefix) {
    return function (...varArgs) {
        log(prefix, ...varArgs);
    };
};
const error = function (...varArgs) {
    const message = 'FIREBASE INTERNAL ERROR: ' + buildLogMessage_(...varArgs);
    logClient.error(message);
};
const fatal = function (...varArgs) {
    const message = `FIREBASE FATAL ERROR: ${buildLogMessage_(...varArgs)}`;
    logClient.error(message);
    throw new Error(message);
};
const warn = function (...varArgs) {
    const message = 'FIREBASE WARNING: ' + buildLogMessage_(...varArgs);
    logClient.warn(message);
};
/**
 * Logs a warning if the containing page uses https. Called when a call to new Firebase
 * does not use https.
 */
const warnIfPageIsSecure = function () {
    // Be very careful accessing browser globals. Who knows what may or may not exist.
    if (typeof window !== 'undefined' &&
        window.location &&
        window.location.protocol &&
        window.location.protocol.indexOf('https:') !== -1) {
        warn('Insecure Firebase access from a secure page. ' +
            'Please use https in calls to new Firebase().');
    }
};
/**
 * Returns true if data is NaN, or +/- Infinity.
 */
const isInvalidJSONNumber = function (data) {
    return (typeof data === 'number' &&
        (data !== data || // NaN
            data === Number.POSITIVE_INFINITY ||
            data === Number.NEGATIVE_INFINITY));
};
const executeWhenDOMReady = function (fn) {
    if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isNodeSdk)() || document.readyState === 'complete') {
        fn();
    }
    else {
        // Modeled after jQuery. Try DOMContentLoaded and onreadystatechange (which
        // fire before onload), but fall back to onload.
        let called = false;
        const wrappedFn = function () {
            if (!document.body) {
                setTimeout(wrappedFn, Math.floor(10));
                return;
            }
            if (!called) {
                called = true;
                fn();
            }
        };
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', wrappedFn, false);
            // fallback to onload.
            window.addEventListener('load', wrappedFn, false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        else if (document.attachEvent) {
            // IE.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            document.attachEvent('onreadystatechange', () => {
                if (document.readyState === 'complete') {
                    wrappedFn();
                }
            });
            // fallback to onload.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.attachEvent('onload', wrappedFn);
            // jQuery has an extra hack for IE that we could employ (based on
            // http://javascript.nwbox.com/IEContentLoaded/) But it looks really old.
            // I'm hoping we don't need it.
        }
    }
};
/**
 * Minimum key name. Invalid for actual data, used as a marker to sort before any valid names
 */
const MIN_NAME = '[MIN_NAME]';
/**
 * Maximum key name. Invalid for actual data, used as a marker to sort above any valid names
 */
const MAX_NAME = '[MAX_NAME]';
/**
 * Compares valid Firebase key names, plus min and max name
 */
const nameCompare = function (a, b) {
    if (a === b) {
        return 0;
    }
    else if (a === MIN_NAME || b === MAX_NAME) {
        return -1;
    }
    else if (b === MIN_NAME || a === MAX_NAME) {
        return 1;
    }
    else {
        const aAsInt = tryParseInt(a), bAsInt = tryParseInt(b);
        if (aAsInt !== null) {
            if (bAsInt !== null) {
                return aAsInt - bAsInt === 0 ? a.length - b.length : aAsInt - bAsInt;
            }
            else {
                return -1;
            }
        }
        else if (bAsInt !== null) {
            return 1;
        }
        else {
            return a < b ? -1 : 1;
        }
    }
};
/**
 * @returns {!number} comparison result.
 */
const stringCompare = function (a, b) {
    if (a === b) {
        return 0;
    }
    else if (a < b) {
        return -1;
    }
    else {
        return 1;
    }
};
const requireKey = function (key, obj) {
    if (obj && key in obj) {
        return obj[key];
    }
    else {
        throw new Error('Missing required key (' + key + ') in object: ' + (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(obj));
    }
};
const ObjectToUniqueKey = function (obj) {
    if (typeof obj !== 'object' || obj === null) {
        return (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(obj);
    }
    const keys = [];
    // eslint-disable-next-line guard-for-in
    for (const k in obj) {
        keys.push(k);
    }
    // Export as json, but with the keys sorted.
    keys.sort();
    let key = '{';
    for (let i = 0; i < keys.length; i++) {
        if (i !== 0) {
            key += ',';
        }
        key += (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(keys[i]);
        key += ':';
        key += ObjectToUniqueKey(obj[keys[i]]);
    }
    key += '}';
    return key;
};
/**
 * Splits a string into a number of smaller segments of maximum size
 * @param str - The string
 * @param segsize - The maximum number of chars in the string.
 * @returns The string, split into appropriately-sized chunks
 */
const splitStringBySize = function (str, segsize) {
    const len = str.length;
    if (len <= segsize) {
        return [str];
    }
    const dataSegs = [];
    for (let c = 0; c < len; c += segsize) {
        if (c + segsize > len) {
            dataSegs.push(str.substring(c, len));
        }
        else {
            dataSegs.push(str.substring(c, c + segsize));
        }
    }
    return dataSegs;
};
/**
 * Apply a function to each (key, value) pair in an object or
 * apply a function to each (index, value) pair in an array
 * @param obj - The object or array to iterate over
 * @param fn - The function to apply
 */
function each(obj, fn) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            fn(key, obj[key]);
        }
    }
}
/**
 * Borrowed from http://hg.secondlife.com/llsd/src/tip/js/typedarray.js (MIT License)
 * I made one modification at the end and removed the NaN / Infinity
 * handling (since it seemed broken [caused an overflow] and we don't need it).  See MJL comments.
 * @param v - A double
 *
 */
const doubleToIEEE754String = function (v) {
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(!isInvalidJSONNumber(v), 'Invalid JSON number'); // MJL
    const ebits = 11, fbits = 52;
    const bias = (1 << (ebits - 1)) - 1;
    let s, e, f, ln, i;
    // Compute sign, exponent, fraction
    // Skip NaN / Infinity handling --MJL.
    if (v === 0) {
        e = 0;
        f = 0;
        s = 1 / v === -Infinity ? 1 : 0;
    }
    else {
        s = v < 0;
        v = Math.abs(v);
        if (v >= Math.pow(2, 1 - bias)) {
            // Normalized
            ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
            e = ln + bias;
            f = Math.round(v * Math.pow(2, fbits - ln) - Math.pow(2, fbits));
        }
        else {
            // Denormalized
            e = 0;
            f = Math.round(v / Math.pow(2, 1 - bias - fbits));
        }
    }
    // Pack sign, exponent, fraction
    const bits = [];
    for (i = fbits; i; i -= 1) {
        bits.push(f % 2 ? 1 : 0);
        f = Math.floor(f / 2);
    }
    for (i = ebits; i; i -= 1) {
        bits.push(e % 2 ? 1 : 0);
        e = Math.floor(e / 2);
    }
    bits.push(s ? 1 : 0);
    bits.reverse();
    const str = bits.join('');
    // Return the data as a hex string. --MJL
    let hexByteString = '';
    for (i = 0; i < 64; i += 8) {
        let hexByte = parseInt(str.substr(i, 8), 2).toString(16);
        if (hexByte.length === 1) {
            hexByte = '0' + hexByte;
        }
        hexByteString = hexByteString + hexByte;
    }
    return hexByteString.toLowerCase();
};
/**
 * Used to detect if we're in a Chrome content script (which executes in an
 * isolated environment where long-polling doesn't work).
 */
const isChromeExtensionContentScript = function () {
    return !!(typeof window === 'object' &&
        window['chrome'] &&
        window['chrome']['extension'] &&
        !/^chrome/.test(window.location.href));
};
/**
 * Used to detect if we're in a Windows 8 Store app.
 */
const isWindowsStoreApp = function () {
    // Check for the presence of a couple WinRT globals
    return typeof Windows === 'object' && typeof Windows.UI === 'object';
};
/**
 * Converts a server error code to a JavaScript Error
 */
function errorForServerCode(code, query) {
    let reason = 'Unknown Error';
    if (code === 'too_big') {
        reason =
            'The data requested exceeds the maximum size ' +
                'that can be accessed with a single request.';
    }
    else if (code === 'permission_denied') {
        reason = "Client doesn't have permission to access the desired data.";
    }
    else if (code === 'unavailable') {
        reason = 'The service is unavailable';
    }
    const error = new Error(code + ' at ' + query._path.toString() + ': ' + reason);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error.code = code.toUpperCase();
    return error;
}
/**
 * Used to test for integer-looking strings
 */
const INTEGER_REGEXP_ = new RegExp('^-?(0*)\\d{1,10}$');
/**
 * For use in keys, the minimum possible 32-bit integer.
 */
const INTEGER_32_MIN = -2147483648;
/**
 * For use in keys, the maximum possible 32-bit integer.
 */
const INTEGER_32_MAX = 2147483647;
/**
 * If the string contains a 32-bit integer, return it.  Else return null.
 */
const tryParseInt = function (str) {
    if (INTEGER_REGEXP_.test(str)) {
        const intVal = Number(str);
        if (intVal >= INTEGER_32_MIN && intVal <= INTEGER_32_MAX) {
            return intVal;
        }
    }
    return null;
};
/**
 * Helper to run some code but catch any exceptions and re-throw them later.
 * Useful for preventing user callbacks from breaking internal code.
 *
 * Re-throwing the exception from a setTimeout is a little evil, but it's very
 * convenient (we don't have to try to figure out when is a safe point to
 * re-throw it), and the behavior seems reasonable:
 *
 * * If you aren't pausing on exceptions, you get an error in the console with
 *   the correct stack trace.
 * * If you're pausing on all exceptions, the debugger will pause on your
 *   exception and then again when we rethrow it.
 * * If you're only pausing on uncaught exceptions, the debugger will only pause
 *   on us re-throwing it.
 *
 * @param fn - The code to guard.
 */
const exceptionGuard = function (fn) {
    try {
        fn();
    }
    catch (e) {
        // Re-throw exception when it's safe.
        setTimeout(() => {
            // It used to be that "throw e" would result in a good console error with
            // relevant context, but as of Chrome 39, you just get the firebase.js
            // file/line number where we re-throw it, which is useless. So we log
            // e.stack explicitly.
            const stack = e.stack || '';
            warn('Exception was thrown by user callback.', stack);
            throw e;
        }, Math.floor(0));
    }
};
/**
 * @returns {boolean} true if we think we're currently being crawled.
 */
const beingCrawled = function () {
    const userAgent = (typeof window === 'object' &&
        window['navigator'] &&
        window['navigator']['userAgent']) ||
        '';
    // For now we whitelist the most popular crawlers.  We should refine this to be the set of crawlers we
    // believe to support JavaScript/AJAX rendering.
    // NOTE: Google Webmaster Tools doesn't really belong, but their "This is how a visitor to your website
    // would have seen the page" is flaky if we don't treat it as a crawler.
    return (userAgent.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0);
};
/**
 * Same as setTimeout() except on Node.JS it will /not/ prevent the process from exiting.
 *
 * It is removed with clearTimeout() as normal.
 *
 * @param fn - Function to run.
 * @param time - Milliseconds to wait before running.
 * @returns The setTimeout() return value.
 */
const setTimeoutNonBlocking = function (fn, time) {
    const timeout = setTimeout(fn, time);
    // Note: at the time of this comment, unrefTimer is under the unstable set of APIs. Run with --unstable to enable the API.
    if (typeof timeout === 'number' &&
        // @ts-ignore Is only defined in Deno environments.
        typeof Deno !== 'undefined' &&
        // @ts-ignore Deno and unrefTimer are only defined in Deno environments.
        Deno['unrefTimer']) {
        // @ts-ignore Deno and unrefTimer are only defined in Deno environments.
        Deno.unrefTimer(timeout);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    else if (typeof timeout === 'object' && timeout['unref']) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        timeout['unref']();
    }
    return timeout;
};

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Abstraction around AppCheck's token fetching capabilities.
 */
class AppCheckTokenProvider {
    constructor(app, appCheckProvider) {
        this.appCheckProvider = appCheckProvider;
        this.appName = app.name;
        if ((0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._isFirebaseServerApp)(app) && app.settings.appCheckToken) {
            this.serverAppAppCheckToken = app.settings.appCheckToken;
        }
        this.appCheck = appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.getImmediate({ optional: true });
        if (!this.appCheck) {
            appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.get().then(appCheck => (this.appCheck = appCheck));
        }
    }
    getToken(forceRefresh) {
        if (this.serverAppAppCheckToken) {
            if (forceRefresh) {
                throw new Error('Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.');
            }
            return Promise.resolve({ token: this.serverAppAppCheckToken });
        }
        if (!this.appCheck) {
            return new Promise((resolve, reject) => {
                // Support delayed initialization of FirebaseAppCheck. This allows our
                // customers to initialize the RTDB SDK before initializing Firebase
                // AppCheck and ensures that all requests are authenticated if a token
                // becomes available before the timeout below expires.
                setTimeout(() => {
                    if (this.appCheck) {
                        this.getToken(forceRefresh).then(resolve, reject);
                    }
                    else {
                        resolve(null);
                    }
                }, 0);
            });
        }
        return this.appCheck.getToken(forceRefresh);
    }
    addTokenChangeListener(listener) {
        var _a;
        (_a = this.appCheckProvider) === null || _a === void 0 ? void 0 : _a.get().then(appCheck => appCheck.addTokenListener(listener));
    }
    notifyForInvalidToken() {
        warn(`Provided AppCheck credentials for the app named "${this.appName}" ` +
            'are invalid. This usually indicates your app was not initialized correctly.');
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Abstraction around FirebaseApp's token fetching capabilities.
 */
class FirebaseAuthTokenProvider {
    constructor(appName_, firebaseOptions_, authProvider_) {
        this.appName_ = appName_;
        this.firebaseOptions_ = firebaseOptions_;
        this.authProvider_ = authProvider_;
        this.auth_ = null;
        this.auth_ = authProvider_.getImmediate({ optional: true });
        if (!this.auth_) {
            authProvider_.onInit(auth => (this.auth_ = auth));
        }
    }
    getToken(forceRefresh) {
        if (!this.auth_) {
            return new Promise((resolve, reject) => {
                // Support delayed initialization of FirebaseAuth. This allows our
                // customers to initialize the RTDB SDK before initializing Firebase
                // Auth and ensures that all requests are authenticated if a token
                // becomes available before the timeout below expires.
                setTimeout(() => {
                    if (this.auth_) {
                        this.getToken(forceRefresh).then(resolve, reject);
                    }
                    else {
                        resolve(null);
                    }
                }, 0);
            });
        }
        return this.auth_.getToken(forceRefresh).catch(error => {
            // TODO: Need to figure out all the cases this is raised and whether
            // this makes sense.
            if (error && error.code === 'auth/token-not-initialized') {
                log('Got auth/token-not-initialized error.  Treating as null token.');
                return null;
            }
            else {
                return Promise.reject(error);
            }
        });
    }
    addTokenChangeListener(listener) {
        // TODO: We might want to wrap the listener and call it with no args to
        // avoid a leaky abstraction, but that makes removing the listener harder.
        if (this.auth_) {
            this.auth_.addAuthTokenListener(listener);
        }
        else {
            this.authProvider_
                .get()
                .then(auth => auth.addAuthTokenListener(listener));
        }
    }
    removeTokenChangeListener(listener) {
        this.authProvider_
            .get()
            .then(auth => auth.removeAuthTokenListener(listener));
    }
    notifyForInvalidToken() {
        let errorMessage = 'Provided authentication credentials for the app named "' +
            this.appName_ +
            '" are invalid. This usually indicates your app was not ' +
            'initialized correctly. ';
        if ('credential' in this.firebaseOptions_) {
            errorMessage +=
                'Make sure the "credential" property provided to initializeApp() ' +
                    'is authorized to access the specified "databaseURL" and is from the correct ' +
                    'project.';
        }
        else if ('serviceAccount' in this.firebaseOptions_) {
            errorMessage +=
                'Make sure the "serviceAccount" property provided to initializeApp() ' +
                    'is authorized to access the specified "databaseURL" and is from the correct ' +
                    'project.';
        }
        else {
            errorMessage +=
                'Make sure the "apiKey" and "databaseURL" properties provided to ' +
                    'initializeApp() match the values provided for your app at ' +
                    'https://console.firebase.google.com/.';
        }
        warn(errorMessage);
    }
}
/* AuthTokenProvider that supplies a constant token. Used by Admin SDK or mockUserToken with emulators. */
class EmulatorTokenProvider {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }
    getToken(forceRefresh) {
        return Promise.resolve({
            accessToken: this.accessToken
        });
    }
    addTokenChangeListener(listener) {
        // Invoke the listener immediately to match the behavior in Firebase Auth
        // (see packages/auth/src/auth.js#L1807)
        listener(this.accessToken);
    }
    removeTokenChangeListener(listener) { }
    notifyForInvalidToken() { }
}
/** A string that is treated as an admin access token by the RTDB emulator. Used by Admin SDK. */
EmulatorTokenProvider.OWNER = 'owner';

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const PROTOCOL_VERSION = '5';
const VERSION_PARAM = 'v';
const TRANSPORT_SESSION_PARAM = 's';
const REFERER_PARAM = 'r';
const FORGE_REF = 'f';
// Matches console.firebase.google.com, firebase-console-*.corp.google.com and
// firebase.corp.google.com
const FORGE_DOMAIN_RE = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/;
const LAST_SESSION_PARAM = 'ls';
const APPLICATION_ID_PARAM = 'p';
const APP_CHECK_TOKEN_PARAM = 'ac';
const WEBSOCKET = 'websocket';
const LONG_POLLING = 'long_polling';

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A class that holds metadata about a Repo object
 */
class RepoInfo {
    /**
     * @param host - Hostname portion of the url for the repo
     * @param secure - Whether or not this repo is accessed over ssl
     * @param namespace - The namespace represented by the repo
     * @param webSocketOnly - Whether to prefer websockets over all other transports (used by Nest).
     * @param nodeAdmin - Whether this instance uses Admin SDK credentials
     * @param persistenceKey - Override the default session persistence storage key
     */
    constructor(host, secure, namespace, webSocketOnly, nodeAdmin = false, persistenceKey = '', includeNamespaceInQueryParams = false, isUsingEmulator = false, emulatorOptions = null) {
        this.secure = secure;
        this.namespace = namespace;
        this.webSocketOnly = webSocketOnly;
        this.nodeAdmin = nodeAdmin;
        this.persistenceKey = persistenceKey;
        this.includeNamespaceInQueryParams = includeNamespaceInQueryParams;
        this.isUsingEmulator = isUsingEmulator;
        this.emulatorOptions = emulatorOptions;
        this._host = host.toLowerCase();
        this._domain = this._host.substr(this._host.indexOf('.') + 1);
        this.internalHost =
            PersistentStorage.get('host:' + host) || this._host;
    }
    isCacheableHost() {
        return this.internalHost.substr(0, 2) === 's-';
    }
    isCustomHost() {
        return (this._domain !== 'firebaseio.com' &&
            this._domain !== 'firebaseio-demo.com');
    }
    get host() {
        return this._host;
    }
    set host(newHost) {
        if (newHost !== this.internalHost) {
            this.internalHost = newHost;
            if (this.isCacheableHost()) {
                PersistentStorage.set('host:' + this._host, this.internalHost);
            }
        }
    }
    toString() {
        let str = this.toURLString();
        if (this.persistenceKey) {
            str += '<' + this.persistenceKey + '>';
        }
        return str;
    }
    toURLString() {
        const protocol = this.secure ? 'https://' : 'http://';
        const query = this.includeNamespaceInQueryParams
            ? `?ns=${this.namespace}`
            : '';
        return `${protocol}${this.host}/${query}`;
    }
}
function repoInfoNeedsQueryParam(repoInfo) {
    return (repoInfo.host !== repoInfo.internalHost ||
        repoInfo.isCustomHost() ||
        repoInfo.includeNamespaceInQueryParams);
}
/**
 * Returns the websocket URL for this repo
 * @param repoInfo - RepoInfo object
 * @param type - of connection
 * @param params - list
 * @returns The URL for this repo
 */
function repoInfoConnectionURL(repoInfo, type, params) {
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(typeof type === 'string', 'typeof type must == string');
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(typeof params === 'object', 'typeof params must == object');
    let connURL;
    if (type === WEBSOCKET) {
        connURL =
            (repoInfo.secure ? 'wss://' : 'ws://') + repoInfo.internalHost + '/.ws?';
    }
    else if (type === LONG_POLLING) {
        connURL =
            (repoInfo.secure ? 'https://' : 'http://') +
                repoInfo.internalHost +
                '/.lp?';
    }
    else {
        throw new Error('Unknown connection type: ' + type);
    }
    if (repoInfoNeedsQueryParam(repoInfo)) {
        params['ns'] = repoInfo.namespace;
    }
    const pairs = [];
    each(params, (key, value) => {
        pairs.push(key + '=' + value);
    });
    return connURL + pairs.join('&');
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Tracks a collection of stats.
 */
class StatsCollection {
    constructor() {
        this.counters_ = {};
    }
    incrementCounter(name, amount = 1) {
        if (!(0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.contains)(this.counters_, name)) {
            this.counters_[name] = 0;
        }
        this.counters_[name] += amount;
    }
    get() {
        return (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.deepCopy)(this.counters_);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const collections = {};
const reporters = {};
function statsManagerGetCollection(repoInfo) {
    const hashString = repoInfo.toString();
    if (!collections[hashString]) {
        collections[hashString] = new StatsCollection();
    }
    return collections[hashString];
}
function statsManagerGetOrCreateReporter(repoInfo, creatorFunction) {
    const hashString = repoInfo.toString();
    if (!reporters[hashString]) {
        reporters[hashString] = creatorFunction();
    }
    return reporters[hashString];
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * This class ensures the packets from the server arrive in order
 * This class takes data from the server and ensures it gets passed into the callbacks in order.
 */
class PacketReceiver {
    /**
     * @param onMessage_
     */
    constructor(onMessage_) {
        this.onMessage_ = onMessage_;
        this.pendingResponses = [];
        this.currentResponseNum = 0;
        this.closeAfterResponse = -1;
        this.onClose = null;
    }
    closeAfter(responseNum, callback) {
        this.closeAfterResponse = responseNum;
        this.onClose = callback;
        if (this.closeAfterResponse < this.currentResponseNum) {
            this.onClose();
            this.onClose = null;
        }
    }
    /**
     * Each message from the server comes with a response number, and an array of data. The responseNumber
     * allows us to ensure that we process them in the right order, since we can't be guaranteed that all
     * browsers will respond in the same order as the requests we sent
     */
    handleResponse(requestNum, data) {
        this.pendingResponses[requestNum] = data;
        while (this.pendingResponses[this.currentResponseNum]) {
            const toProcess = this.pendingResponses[this.currentResponseNum];
            delete this.pendingResponses[this.currentResponseNum];
            for (let i = 0; i < toProcess.length; ++i) {
                if (toProcess[i]) {
                    exceptionGuard(() => {
                        this.onMessage_(toProcess[i]);
                    });
                }
            }
            if (this.currentResponseNum === this.closeAfterResponse) {
                if (this.onClose) {
                    this.onClose();
                    this.onClose = null;
                }
                break;
            }
            this.currentResponseNum++;
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// URL query parameters associated with longpolling
const FIREBASE_LONGPOLL_START_PARAM = 'start';
const FIREBASE_LONGPOLL_CLOSE_COMMAND = 'close';
const FIREBASE_LONGPOLL_COMMAND_CB_NAME = 'pLPCommand';
const FIREBASE_LONGPOLL_DATA_CB_NAME = 'pRTLPCB';
const FIREBASE_LONGPOLL_ID_PARAM = 'id';
const FIREBASE_LONGPOLL_PW_PARAM = 'pw';
const FIREBASE_LONGPOLL_SERIAL_PARAM = 'ser';
const FIREBASE_LONGPOLL_CALLBACK_ID_PARAM = 'cb';
const FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM = 'seg';
const FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET = 'ts';
const FIREBASE_LONGPOLL_DATA_PARAM = 'd';
const FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM = 'dframe';
//Data size constants.
//TODO: Perf: the maximum length actually differs from browser to browser.
// We should check what browser we're on and set accordingly.
const MAX_URL_DATA_SIZE = 1870;
const SEG_HEADER_SIZE = 30; //ie: &seg=8299234&ts=982389123&d=
const MAX_PAYLOAD_SIZE = MAX_URL_DATA_SIZE - SEG_HEADER_SIZE;
/**
 * Keepalive period
 * send a fresh request at minimum every 25 seconds. Opera has a maximum request
 * length of 30 seconds that we can't exceed.
 */
const KEEPALIVE_REQUEST_INTERVAL = 25000;
/**
 * How long to wait before aborting a long-polling connection attempt.
 */
const LP_CONNECT_TIMEOUT = 30000;
/**
 * This class manages a single long-polling connection.
 */
class BrowserPollConnection {
    /**
     * @param connId An identifier for this connection, used for logging
     * @param repoInfo The info for the endpoint to send data to.
     * @param applicationId The Firebase App ID for this project.
     * @param appCheckToken The AppCheck token for this client.
     * @param authToken The AuthToken to use for this connection.
     * @param transportSessionId Optional transportSessionid if we are
     * reconnecting for an existing transport session
     * @param lastSessionId Optional lastSessionId if the PersistentConnection has
     * already created a connection previously
     */
    constructor(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
        this.connId = connId;
        this.repoInfo = repoInfo;
        this.applicationId = applicationId;
        this.appCheckToken = appCheckToken;
        this.authToken = authToken;
        this.transportSessionId = transportSessionId;
        this.lastSessionId = lastSessionId;
        this.bytesSent = 0;
        this.bytesReceived = 0;
        this.everConnected_ = false;
        this.log_ = logWrapper(connId);
        this.stats_ = statsManagerGetCollection(repoInfo);
        this.urlFn = (params) => {
            // Always add the token if we have one.
            if (this.appCheckToken) {
                params[APP_CHECK_TOKEN_PARAM] = this.appCheckToken;
            }
            return repoInfoConnectionURL(repoInfo, LONG_POLLING, params);
        };
    }
    /**
     * @param onMessage - Callback when messages arrive
     * @param onDisconnect - Callback with connection lost.
     */
    open(onMessage, onDisconnect) {
        this.curSegmentNum = 0;
        this.onDisconnect_ = onDisconnect;
        this.myPacketOrderer = new PacketReceiver(onMessage);
        this.isClosed_ = false;
        this.connectTimeoutTimer_ = setTimeout(() => {
            this.log_('Timed out trying to connect.');
            // Make sure we clear the host cache
            this.onClosed_();
            this.connectTimeoutTimer_ = null;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, Math.floor(LP_CONNECT_TIMEOUT));
        // Ensure we delay the creation of the iframe until the DOM is loaded.
        executeWhenDOMReady(() => {
            if (this.isClosed_) {
                return;
            }
            //Set up a callback that gets triggered once a connection is set up.
            this.scriptTagHolder = new FirebaseIFrameScriptHolder((...args) => {
                const [command, arg1, arg2, arg3, arg4] = args;
                this.incrementIncomingBytes_(args);
                if (!this.scriptTagHolder) {
                    return; // we closed the connection.
                }
                if (this.connectTimeoutTimer_) {
                    clearTimeout(this.connectTimeoutTimer_);
                    this.connectTimeoutTimer_ = null;
                }
                this.everConnected_ = true;
                if (command === FIREBASE_LONGPOLL_START_PARAM) {
                    this.id = arg1;
                    this.password = arg2;
                }
                else if (command === FIREBASE_LONGPOLL_CLOSE_COMMAND) {
                    // Don't clear the host cache. We got a response from the server, so we know it's reachable
                    if (arg1) {
                        // We aren't expecting any more data (other than what the server's already in the process of sending us
                        // through our already open polls), so don't send any more.
                        this.scriptTagHolder.sendNewPolls = false;
                        // arg1 in this case is the last response number sent by the server. We should try to receive
                        // all of the responses up to this one before closing
                        this.myPacketOrderer.closeAfter(arg1, () => {
                            this.onClosed_();
                        });
                    }
                    else {
                        this.onClosed_();
                    }
                }
                else {
                    throw new Error('Unrecognized command received: ' + command);
                }
            }, (...args) => {
                const [pN, data] = args;
                this.incrementIncomingBytes_(args);
                this.myPacketOrderer.handleResponse(pN, data);
            }, () => {
                this.onClosed_();
            }, this.urlFn);
            //Send the initial request to connect. The serial number is simply to keep the browser from pulling previous results
            //from cache.
            const urlParams = {};
            urlParams[FIREBASE_LONGPOLL_START_PARAM] = 't';
            urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = Math.floor(Math.random() * 100000000);
            if (this.scriptTagHolder.uniqueCallbackIdentifier) {
                urlParams[FIREBASE_LONGPOLL_CALLBACK_ID_PARAM] =
                    this.scriptTagHolder.uniqueCallbackIdentifier;
            }
            urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
            if (this.transportSessionId) {
                urlParams[TRANSPORT_SESSION_PARAM] = this.transportSessionId;
            }
            if (this.lastSessionId) {
                urlParams[LAST_SESSION_PARAM] = this.lastSessionId;
            }
            if (this.applicationId) {
                urlParams[APPLICATION_ID_PARAM] = this.applicationId;
            }
            if (this.appCheckToken) {
                urlParams[APP_CHECK_TOKEN_PARAM] = this.appCheckToken;
            }
            if (typeof location !== 'undefined' &&
                location.hostname &&
                FORGE_DOMAIN_RE.test(location.hostname)) {
                urlParams[REFERER_PARAM] = FORGE_REF;
            }
            const connectURL = this.urlFn(urlParams);
            this.log_('Connecting via long-poll to ' + connectURL);
            this.scriptTagHolder.addTag(connectURL, () => {
                /* do nothing */
            });
        });
    }
    /**
     * Call this when a handshake has completed successfully and we want to consider the connection established
     */
    start() {
        this.scriptTagHolder.startLongPoll(this.id, this.password);
        this.addDisconnectPingFrame(this.id, this.password);
    }
    /**
     * Forces long polling to be considered as a potential transport
     */
    static forceAllow() {
        BrowserPollConnection.forceAllow_ = true;
    }
    /**
     * Forces longpolling to not be considered as a potential transport
     */
    static forceDisallow() {
        BrowserPollConnection.forceDisallow_ = true;
    }
    // Static method, use string literal so it can be accessed in a generic way
    static isAvailable() {
        if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isNodeSdk)()) {
            return false;
        }
        else if (BrowserPollConnection.forceAllow_) {
            return true;
        }
        else {
            // NOTE: In React-Native there's normally no 'document', but if you debug a React-Native app in
            // the Chrome debugger, 'document' is defined, but document.createElement is null (2015/06/08).
            return (!BrowserPollConnection.forceDisallow_ &&
                typeof document !== 'undefined' &&
                document.createElement != null &&
                !isChromeExtensionContentScript() &&
                !isWindowsStoreApp());
        }
    }
    /**
     * No-op for polling
     */
    markConnectionHealthy() { }
    /**
     * Stops polling and cleans up the iframe
     */
    shutdown_() {
        this.isClosed_ = true;
        if (this.scriptTagHolder) {
            this.scriptTagHolder.close();
            this.scriptTagHolder = null;
        }
        //remove the disconnect frame, which will trigger an XHR call to the server to tell it we're leaving.
        if (this.myDisconnFrame) {
            document.body.removeChild(this.myDisconnFrame);
            this.myDisconnFrame = null;
        }
        if (this.connectTimeoutTimer_) {
            clearTimeout(this.connectTimeoutTimer_);
            this.connectTimeoutTimer_ = null;
        }
    }
    /**
     * Triggered when this transport is closed
     */
    onClosed_() {
        if (!this.isClosed_) {
            this.log_('Longpoll is closing itself');
            this.shutdown_();
            if (this.onDisconnect_) {
                this.onDisconnect_(this.everConnected_);
                this.onDisconnect_ = null;
            }
        }
    }
    /**
     * External-facing close handler. RealTime has requested we shut down. Kill our connection and tell the server
     * that we've left.
     */
    close() {
        if (!this.isClosed_) {
            this.log_('Longpoll is being closed.');
            this.shutdown_();
        }
    }
    /**
     * Send the JSON object down to the server. It will need to be stringified, base64 encoded, and then
     * broken into chunks (since URLs have a small maximum length).
     * @param data - The JSON data to transmit.
     */
    send(data) {
        const dataStr = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(data);
        this.bytesSent += dataStr.length;
        this.stats_.incrementCounter('bytes_sent', dataStr.length);
        //first, lets get the base64-encoded data
        const base64data = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.base64Encode)(dataStr);
        //We can only fit a certain amount in each URL, so we need to split this request
        //up into multiple pieces if it doesn't fit in one request.
        const dataSegs = splitStringBySize(base64data, MAX_PAYLOAD_SIZE);
        //Enqueue each segment for transmission. We assign each chunk a sequential ID and a total number
        //of segments so that we can reassemble the packet on the server.
        for (let i = 0; i < dataSegs.length; i++) {
            this.scriptTagHolder.enqueueSegment(this.curSegmentNum, dataSegs.length, dataSegs[i]);
            this.curSegmentNum++;
        }
    }
    /**
     * This is how we notify the server that we're leaving.
     * We aren't able to send requests with DHTML on a window close event, but we can
     * trigger XHR requests in some browsers (everything but Opera basically).
     */
    addDisconnectPingFrame(id, pw) {
        if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isNodeSdk)()) {
            return;
        }
        this.myDisconnFrame = document.createElement('iframe');
        const urlParams = {};
        urlParams[FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM] = 't';
        urlParams[FIREBASE_LONGPOLL_ID_PARAM] = id;
        urlParams[FIREBASE_LONGPOLL_PW_PARAM] = pw;
        this.myDisconnFrame.src = this.urlFn(urlParams);
        this.myDisconnFrame.style.display = 'none';
        document.body.appendChild(this.myDisconnFrame);
    }
    /**
     * Used to track the bytes received by this client
     */
    incrementIncomingBytes_(args) {
        // TODO: This is an annoying perf hit just to track the number of incoming bytes.  Maybe it should be opt-in.
        const bytesReceived = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(args).length;
        this.bytesReceived += bytesReceived;
        this.stats_.incrementCounter('bytes_received', bytesReceived);
    }
}
/*********************************************************************************************
 * A wrapper around an iframe that is used as a long-polling script holder.
 *********************************************************************************************/
class FirebaseIFrameScriptHolder {
    /**
     * @param commandCB - The callback to be called when control commands are received from the server.
     * @param onMessageCB - The callback to be triggered when responses arrive from the server.
     * @param onDisconnect - The callback to be triggered when this tag holder is closed
     * @param urlFn - A function that provides the URL of the endpoint to send data to.
     */
    constructor(commandCB, onMessageCB, onDisconnect, urlFn) {
        this.onDisconnect = onDisconnect;
        this.urlFn = urlFn;
        //We maintain a count of all of the outstanding requests, because if we have too many active at once it can cause
        //problems in some browsers.
        this.outstandingRequests = new Set();
        //A queue of the pending segments waiting for transmission to the server.
        this.pendingSegs = [];
        //A serial number. We use this for two things:
        // 1) A way to ensure the browser doesn't cache responses to polls
        // 2) A way to make the server aware when long-polls arrive in a different order than we started them. The
        //    server needs to release both polls in this case or it will cause problems in Opera since Opera can only execute
        //    JSONP code in the order it was added to the iframe.
        this.currentSerial = Math.floor(Math.random() * 100000000);
        // This gets set to false when we're "closing down" the connection (e.g. we're switching transports but there's still
        // incoming data from the server that we're waiting for).
        this.sendNewPolls = true;
        if (!(0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isNodeSdk)()) {
            //Each script holder registers a couple of uniquely named callbacks with the window. These are called from the
            //iframes where we put the long-polling script tags. We have two callbacks:
            //   1) Command Callback - Triggered for control issues, like starting a connection.
            //   2) Message Callback - Triggered when new data arrives.
            this.uniqueCallbackIdentifier = LUIDGenerator();
            window[FIREBASE_LONGPOLL_COMMAND_CB_NAME + this.uniqueCallbackIdentifier] = commandCB;
            window[FIREBASE_LONGPOLL_DATA_CB_NAME + this.uniqueCallbackIdentifier] =
                onMessageCB;
            //Create an iframe for us to add script tags to.
            this.myIFrame = FirebaseIFrameScriptHolder.createIFrame_();
            // Set the iframe's contents.
            let script = '';
            // if we set a javascript url, it's IE and we need to set the document domain. The javascript url is sufficient
            // for ie9, but ie8 needs to do it again in the document itself.
            if (this.myIFrame.src &&
                this.myIFrame.src.substr(0, 'javascript:'.length) === 'javascript:') {
                const currentDomain = document.domain;
                script = '<script>document.domain="' + currentDomain + '";</script>';
            }
            const iframeContents = '<html><body>' + script + '</body></html>';
            try {
                this.myIFrame.doc.open();
                this.myIFrame.doc.write(iframeContents);
                this.myIFrame.doc.close();
            }
            catch (e) {
                log('frame writing exception');
                if (e.stack) {
                    log(e.stack);
                }
                log(e);
            }
        }
        else {
            this.commandCB = commandCB;
            this.onMessageCB = onMessageCB;
        }
    }
    /**
     * Each browser has its own funny way to handle iframes. Here we mush them all together into one object that I can
     * actually use.
     */
    static createIFrame_() {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        // This is necessary in order to initialize the document inside the iframe
        if (document.body) {
            document.body.appendChild(iframe);
            try {
                // If document.domain has been modified in IE, this will throw an error, and we need to set the
                // domain of the iframe's document manually. We can do this via a javascript: url as the src attribute
                // Also note that we must do this *after* the iframe has been appended to the page. Otherwise it doesn't work.
                const a = iframe.contentWindow.document;
                if (!a) {
                    // Apologies for the log-spam, I need to do something to keep closure from optimizing out the assignment above.
                    log('No IE domain setting required');
                }
            }
            catch (e) {
                const domain = document.domain;
                iframe.src =
                    "javascript:void((function(){document.open();document.domain='" +
                        domain +
                        "';document.close();})())";
            }
        }
        else {
            // LongPollConnection attempts to delay initialization until the document is ready, so hopefully this
            // never gets hit.
            throw 'Document body has not initialized. Wait to initialize Firebase until after the document is ready.';
        }
        // Get the document of the iframe in a browser-specific way.
        if (iframe.contentDocument) {
            iframe.doc = iframe.contentDocument; // Firefox, Opera, Safari
        }
        else if (iframe.contentWindow) {
            iframe.doc = iframe.contentWindow.document; // Internet Explorer
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        else if (iframe.document) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            iframe.doc = iframe.document; //others?
        }
        return iframe;
    }
    /**
     * Cancel all outstanding queries and remove the frame.
     */
    close() {
        //Mark this iframe as dead, so no new requests are sent.
        this.alive = false;
        if (this.myIFrame) {
            //We have to actually remove all of the html inside this iframe before removing it from the
            //window, or IE will continue loading and executing the script tags we've already added, which
            //can lead to some errors being thrown. Setting textContent seems to be the safest way to do this.
            this.myIFrame.doc.body.textContent = '';
            setTimeout(() => {
                if (this.myIFrame !== null) {
                    document.body.removeChild(this.myIFrame);
                    this.myIFrame = null;
                }
            }, Math.floor(0));
        }
        // Protect from being called recursively.
        const onDisconnect = this.onDisconnect;
        if (onDisconnect) {
            this.onDisconnect = null;
            onDisconnect();
        }
    }
    /**
     * Actually start the long-polling session by adding the first script tag(s) to the iframe.
     * @param id - The ID of this connection
     * @param pw - The password for this connection
     */
    startLongPoll(id, pw) {
        this.myID = id;
        this.myPW = pw;
        this.alive = true;
        //send the initial request. If there are requests queued, make sure that we transmit as many as we are currently able to.
        while (this.newRequest_()) { }
    }
    /**
     * This is called any time someone might want a script tag to be added. It adds a script tag when there aren't
     * too many outstanding requests and we are still alive.
     *
     * If there are outstanding packet segments to send, it sends one. If there aren't, it sends a long-poll anyways if
     * needed.
     */
    newRequest_() {
        // We keep one outstanding request open all the time to receive data, but if we need to send data
        // (pendingSegs.length > 0) then we create a new request to send the data.  The server will automatically
        // close the old request.
        if (this.alive &&
            this.sendNewPolls &&
            this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
            //construct our url
            this.currentSerial++;
            const urlParams = {};
            urlParams[FIREBASE_LONGPOLL_ID_PARAM] = this.myID;
            urlParams[FIREBASE_LONGPOLL_PW_PARAM] = this.myPW;
            urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = this.currentSerial;
            let theURL = this.urlFn(urlParams);
            //Now add as much data as we can.
            let curDataString = '';
            let i = 0;
            while (this.pendingSegs.length > 0) {
                //first, lets see if the next segment will fit.
                const nextSeg = this.pendingSegs[0];
                if (nextSeg.d.length +
                    SEG_HEADER_SIZE +
                    curDataString.length <=
                    MAX_URL_DATA_SIZE) {
                    //great, the segment will fit. Lets append it.
                    const theSeg = this.pendingSegs.shift();
                    curDataString =
                        curDataString +
                            '&' +
                            FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM +
                            i +
                            '=' +
                            theSeg.seg +
                            '&' +
                            FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET +
                            i +
                            '=' +
                            theSeg.ts +
                            '&' +
                            FIREBASE_LONGPOLL_DATA_PARAM +
                            i +
                            '=' +
                            theSeg.d;
                    i++;
                }
                else {
                    break;
                }
            }
            theURL = theURL + curDataString;
            this.addLongPollTag_(theURL, this.currentSerial);
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Queue a packet for transmission to the server.
     * @param segnum - A sequential id for this packet segment used for reassembly
     * @param totalsegs - The total number of segments in this packet
     * @param data - The data for this segment.
     */
    enqueueSegment(segnum, totalsegs, data) {
        //add this to the queue of segments to send.
        this.pendingSegs.push({ seg: segnum, ts: totalsegs, d: data });
        //send the data immediately if there isn't already data being transmitted, unless
        //startLongPoll hasn't been called yet.
        if (this.alive) {
            this.newRequest_();
        }
    }
    /**
     * Add a script tag for a regular long-poll request.
     * @param url - The URL of the script tag.
     * @param serial - The serial number of the request.
     */
    addLongPollTag_(url, serial) {
        //remember that we sent this request.
        this.outstandingRequests.add(serial);
        const doNewRequest = () => {
            this.outstandingRequests.delete(serial);
            this.newRequest_();
        };
        // If this request doesn't return on its own accord (by the server sending us some data), we'll
        // create a new one after the KEEPALIVE interval to make sure we always keep a fresh request open.
        const keepaliveTimeout = setTimeout(doNewRequest, Math.floor(KEEPALIVE_REQUEST_INTERVAL));
        const readyStateCB = () => {
            // Request completed.  Cancel the keepalive.
            clearTimeout(keepaliveTimeout);
            // Trigger a new request so we can continue receiving data.
            doNewRequest();
        };
        this.addTag(url, readyStateCB);
    }
    /**
     * Add an arbitrary script tag to the iframe.
     * @param url - The URL for the script tag source.
     * @param loadCB - A callback to be triggered once the script has loaded.
     */
    addTag(url, loadCB) {
        if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isNodeSdk)()) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.doNodeLongPoll(url, loadCB);
        }
        else {
            setTimeout(() => {
                try {
                    // if we're already closed, don't add this poll
                    if (!this.sendNewPolls) {
                        return;
                    }
                    const newScript = this.myIFrame.doc.createElement('script');
                    newScript.type = 'text/javascript';
                    newScript.async = true;
                    newScript.src = url;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    newScript.onload = newScript.onreadystatechange =
                        function () {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const rstate = newScript.readyState;
                            if (!rstate || rstate === 'loaded' || rstate === 'complete') {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                newScript.onload = newScript.onreadystatechange = null;
                                if (newScript.parentNode) {
                                    newScript.parentNode.removeChild(newScript);
                                }
                                loadCB();
                            }
                        };
                    newScript.onerror = () => {
                        log('Long-poll script failed to load: ' + url);
                        this.sendNewPolls = false;
                        this.close();
                    };
                    this.myIFrame.doc.body.appendChild(newScript);
                }
                catch (e) {
                    // TODO: we should make this error visible somehow
                }
            }, Math.floor(1));
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const WEBSOCKET_MAX_FRAME_SIZE = 16384;
const WEBSOCKET_KEEPALIVE_INTERVAL = 45000;
let WebSocketImpl = null;
if (typeof MozWebSocket !== 'undefined') {
    WebSocketImpl = MozWebSocket;
}
else if (typeof WebSocket !== 'undefined') {
    WebSocketImpl = WebSocket;
}
/**
 * Create a new websocket connection with the given callbacks.
 */
class WebSocketConnection {
    /**
     * @param connId identifier for this transport
     * @param repoInfo The info for the websocket endpoint.
     * @param applicationId The Firebase App ID for this project.
     * @param appCheckToken The App Check Token for this client.
     * @param authToken The Auth Token for this client.
     * @param transportSessionId Optional transportSessionId if this is connecting
     * to an existing transport session
     * @param lastSessionId Optional lastSessionId if there was a previous
     * connection
     */
    constructor(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
        this.connId = connId;
        this.applicationId = applicationId;
        this.appCheckToken = appCheckToken;
        this.authToken = authToken;
        this.keepaliveTimer = null;
        this.frames = null;
        this.totalFrames = 0;
        this.bytesSent = 0;
        this.bytesReceived = 0;
        this.log_ = logWrapper(this.connId);
        this.stats_ = statsManagerGetCollection(repoInfo);
        this.connURL = WebSocketConnection.connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken, applicationId);
        this.nodeAdmin = repoInfo.nodeAdmin;
    }
    /**
     * @param repoInfo - The info for the websocket endpoint.
     * @param transportSessionId - Optional transportSessionId if this is connecting to an existing transport
     *                                         session
     * @param lastSessionId - Optional lastSessionId if there was a previous connection
     * @returns connection url
     */
    static connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken, applicationId) {
        const urlParams = {};
        urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
        if (!(0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isNodeSdk)() &&
            typeof location !== 'undefined' &&
            location.hostname &&
            FORGE_DOMAIN_RE.test(location.hostname)) {
            urlParams[REFERER_PARAM] = FORGE_REF;
        }
        if (transportSessionId) {
            urlParams[TRANSPORT_SESSION_PARAM] = transportSessionId;
        }
        if (lastSessionId) {
            urlParams[LAST_SESSION_PARAM] = lastSessionId;
        }
        if (appCheckToken) {
            urlParams[APP_CHECK_TOKEN_PARAM] = appCheckToken;
        }
        if (applicationId) {
            urlParams[APPLICATION_ID_PARAM] = applicationId;
        }
        return repoInfoConnectionURL(repoInfo, WEBSOCKET, urlParams);
    }
    /**
     * @param onMessage - Callback when messages arrive
     * @param onDisconnect - Callback with connection lost.
     */
    open(onMessage, onDisconnect) {
        this.onDisconnect = onDisconnect;
        this.onMessage = onMessage;
        this.log_('Websocket connecting to ' + this.connURL);
        this.everConnected_ = false;
        // Assume failure until proven otherwise.
        PersistentStorage.set('previous_websocket_failure', true);
        try {
            let options;
            if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isNodeSdk)()) {
                const device = this.nodeAdmin ? 'AdminNode' : 'Node';
                // UA Format: Firebase/<wire_protocol>/<sdk_version>/<platform>/<device>
                options = {
                    headers: {
                        'User-Agent': `Firebase/${PROTOCOL_VERSION}/${SDK_VERSION}/${process.platform}/${device}`,
                        'X-Firebase-GMPID': this.applicationId || ''
                    }
                };
                // If using Node with admin creds, AppCheck-related checks are unnecessary.
                // Note that we send the credentials here even if they aren't admin credentials, which is
                // not a problem.
                // Note that this header is just used to bypass appcheck, and the token should still be sent
                // through the websocket connection once it is established.
                if (this.authToken) {
                    options.headers['Authorization'] = `Bearer ${this.authToken}`;
                }
                if (this.appCheckToken) {
                    options.headers['X-Firebase-AppCheck'] = this.appCheckToken;
                }
                // Plumb appropriate http_proxy environment variable into faye-websocket if it exists.
                const env = process['env'];
                const proxy = this.connURL.indexOf('wss://') === 0
                    ? env['HTTPS_PROXY'] || env['https_proxy']
                    : env['HTTP_PROXY'] || env['http_proxy'];
                if (proxy) {
                    options['proxy'] = { origin: proxy };
                }
            }
            this.mySock = new WebSocketImpl(this.connURL, [], options);
        }
        catch (e) {
            this.log_('Error instantiating WebSocket.');
            const error = e.message || e.data;
            if (error) {
                this.log_(error);
            }
            this.onClosed_();
            return;
        }
        this.mySock.onopen = () => {
            this.log_('Websocket connected.');
            this.everConnected_ = true;
        };
        this.mySock.onclose = () => {
            this.log_('Websocket connection was disconnected.');
            this.mySock = null;
            this.onClosed_();
        };
        this.mySock.onmessage = m => {
            this.handleIncomingFrame(m);
        };
        this.mySock.onerror = e => {
            this.log_('WebSocket error.  Closing connection.');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const error = e.message || e.data;
            if (error) {
                this.log_(error);
            }
            this.onClosed_();
        };
    }
    /**
     * No-op for websockets, we don't need to do anything once the connection is confirmed as open
     */
    start() { }
    static forceDisallow() {
        WebSocketConnection.forceDisallow_ = true;
    }
    static isAvailable() {
        let isOldAndroid = false;
        if (typeof navigator !== 'undefined' && navigator.userAgent) {
            const oldAndroidRegex = /Android ([0-9]{0,}\.[0-9]{0,})/;
            const oldAndroidMatch = navigator.userAgent.match(oldAndroidRegex);
            if (oldAndroidMatch && oldAndroidMatch.length > 1) {
                if (parseFloat(oldAndroidMatch[1]) < 4.4) {
                    isOldAndroid = true;
                }
            }
        }
        return (!isOldAndroid &&
            WebSocketImpl !== null &&
            !WebSocketConnection.forceDisallow_);
    }
    /**
     * Returns true if we previously failed to connect with this transport.
     */
    static previouslyFailed() {
        // If our persistent storage is actually only in-memory storage,
        // we default to assuming that it previously failed to be safe.
        return (PersistentStorage.isInMemoryStorage ||
            PersistentStorage.get('previous_websocket_failure') === true);
    }
    markConnectionHealthy() {
        PersistentStorage.remove('previous_websocket_failure');
    }
    appendFrame_(data) {
        this.frames.push(data);
        if (this.frames.length === this.totalFrames) {
            const fullMess = this.frames.join('');
            this.frames = null;
            const jsonMess = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.jsonEval)(fullMess);
            //handle the message
            this.onMessage(jsonMess);
        }
    }
    /**
     * @param frameCount - The number of frames we are expecting from the server
     */
    handleNewFrameCount_(frameCount) {
        this.totalFrames = frameCount;
        this.frames = [];
    }
    /**
     * Attempts to parse a frame count out of some text. If it can't, assumes a value of 1
     * @returns Any remaining data to be process, or null if there is none
     */
    extractFrameCount_(data) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(this.frames === null, 'We already have a frame buffer');
        // TODO: The server is only supposed to send up to 9999 frames (i.e. length <= 4), but that isn't being enforced
        // currently.  So allowing larger frame counts (length <= 6).  See https://app.asana.com/0/search/8688598998380/8237608042508
        if (data.length <= 6) {
            const frameCount = Number(data);
            if (!isNaN(frameCount)) {
                this.handleNewFrameCount_(frameCount);
                return null;
            }
        }
        this.handleNewFrameCount_(1);
        return data;
    }
    /**
     * Process a websocket frame that has arrived from the server.
     * @param mess - The frame data
     */
    handleIncomingFrame(mess) {
        if (this.mySock === null) {
            return; // Chrome apparently delivers incoming packets even after we .close() the connection sometimes.
        }
        const data = mess['data'];
        this.bytesReceived += data.length;
        this.stats_.incrementCounter('bytes_received', data.length);
        this.resetKeepAlive();
        if (this.frames !== null) {
            // we're buffering
            this.appendFrame_(data);
        }
        else {
            // try to parse out a frame count, otherwise, assume 1 and process it
            const remainingData = this.extractFrameCount_(data);
            if (remainingData !== null) {
                this.appendFrame_(remainingData);
            }
        }
    }
    /**
     * Send a message to the server
     * @param data - The JSON object to transmit
     */
    send(data) {
        this.resetKeepAlive();
        const dataStr = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(data);
        this.bytesSent += dataStr.length;
        this.stats_.incrementCounter('bytes_sent', dataStr.length);
        //We can only fit a certain amount in each websocket frame, so we need to split this request
        //up into multiple pieces if it doesn't fit in one request.
        const dataSegs = splitStringBySize(dataStr, WEBSOCKET_MAX_FRAME_SIZE);
        //Send the length header
        if (dataSegs.length > 1) {
            this.sendString_(String(dataSegs.length));
        }
        //Send the actual data in segments.
        for (let i = 0; i < dataSegs.length; i++) {
            this.sendString_(dataSegs[i]);
        }
    }
    shutdown_() {
        this.isClosed_ = true;
        if (this.keepaliveTimer) {
            clearInterval(this.keepaliveTimer);
            this.keepaliveTimer = null;
        }
        if (this.mySock) {
            this.mySock.close();
            this.mySock = null;
        }
    }
    onClosed_() {
        if (!this.isClosed_) {
            this.log_('WebSocket is closing itself');
            this.shutdown_();
            // since this is an internal close, trigger the close listener
            if (this.onDisconnect) {
                this.onDisconnect(this.everConnected_);
                this.onDisconnect = null;
            }
        }
    }
    /**
     * External-facing close handler.
     * Close the websocket and kill the connection.
     */
    close() {
        if (!this.isClosed_) {
            this.log_('WebSocket is being closed');
            this.shutdown_();
        }
    }
    /**
     * Kill the current keepalive timer and start a new one, to ensure that it always fires N seconds after
     * the last activity.
     */
    resetKeepAlive() {
        clearInterval(this.keepaliveTimer);
        this.keepaliveTimer = setInterval(() => {
            //If there has been no websocket activity for a while, send a no-op
            if (this.mySock) {
                this.sendString_('0');
            }
            this.resetKeepAlive();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, Math.floor(WEBSOCKET_KEEPALIVE_INTERVAL));
    }
    /**
     * Send a string over the websocket.
     *
     * @param str - String to send.
     */
    sendString_(str) {
        // Firefox seems to sometimes throw exceptions (NS_ERROR_UNEXPECTED) from websocket .send()
        // calls for some unknown reason.  We treat these as an error and disconnect.
        // See https://app.asana.com/0/58926111402292/68021340250410
        try {
            this.mySock.send(str);
        }
        catch (e) {
            this.log_('Exception thrown from WebSocket.send():', e.message || e.data, 'Closing connection.');
            setTimeout(this.onClosed_.bind(this), 0);
        }
    }
}
/**
 * Number of response before we consider the connection "healthy."
 */
WebSocketConnection.responsesRequiredToBeHealthy = 2;
/**
 * Time to wait for the connection te become healthy before giving up.
 */
WebSocketConnection.healthyTimeout = 30000;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Currently simplistic, this class manages what transport a Connection should use at various stages of its
 * lifecycle.
 *
 * It starts with longpolling in a browser, and httppolling on node. It then upgrades to websockets if
 * they are available.
 */
class TransportManager {
    static get ALL_TRANSPORTS() {
        return [BrowserPollConnection, WebSocketConnection];
    }
    /**
     * Returns whether transport has been selected to ensure WebSocketConnection or BrowserPollConnection are not called after
     * TransportManager has already set up transports_
     */
    static get IS_TRANSPORT_INITIALIZED() {
        return this.globalTransportInitialized_;
    }
    /**
     * @param repoInfo - Metadata around the namespace we're connecting to
     */
    constructor(repoInfo) {
        this.initTransports_(repoInfo);
    }
    initTransports_(repoInfo) {
        const isWebSocketsAvailable = WebSocketConnection && WebSocketConnection['isAvailable']();
        let isSkipPollConnection = isWebSocketsAvailable && !WebSocketConnection.previouslyFailed();
        if (repoInfo.webSocketOnly) {
            if (!isWebSocketsAvailable) {
                warn("wss:// URL used, but browser isn't known to support websockets.  Trying anyway.");
            }
            isSkipPollConnection = true;
        }
        if (isSkipPollConnection) {
            this.transports_ = [WebSocketConnection];
        }
        else {
            const transports = (this.transports_ = []);
            for (const transport of TransportManager.ALL_TRANSPORTS) {
                if (transport && transport['isAvailable']()) {
                    transports.push(transport);
                }
            }
            TransportManager.globalTransportInitialized_ = true;
        }
    }
    /**
     * @returns The constructor for the initial transport to use
     */
    initialTransport() {
        if (this.transports_.length > 0) {
            return this.transports_[0];
        }
        else {
            throw new Error('No transports available');
        }
    }
    /**
     * @returns The constructor for the next transport, or null
     */
    upgradeTransport() {
        if (this.transports_.length > 1) {
            return this.transports_[1];
        }
        else {
            return null;
        }
    }
}
// Keeps track of whether the TransportManager has already chosen a transport to use
TransportManager.globalTransportInitialized_ = false;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Abort upgrade attempt if it takes longer than 60s.
const UPGRADE_TIMEOUT = 60000;
// For some transports (WebSockets), we need to "validate" the transport by exchanging a few requests and responses.
// If we haven't sent enough requests within 5s, we'll start sending noop ping requests.
const DELAY_BEFORE_SENDING_EXTRA_REQUESTS = 5000;
// If the initial data sent triggers a lot of bandwidth (i.e. it's a large put or a listen for a large amount of data)
// then we may not be able to exchange our ping/pong requests within the healthy timeout.  So if we reach the timeout
// but we've sent/received enough bytes, we don't cancel the connection.
const BYTES_SENT_HEALTHY_OVERRIDE = 10 * 1024;
const BYTES_RECEIVED_HEALTHY_OVERRIDE = 100 * 1024;
const MESSAGE_TYPE = 't';
const MESSAGE_DATA = 'd';
const CONTROL_SHUTDOWN = 's';
const CONTROL_RESET = 'r';
const CONTROL_ERROR = 'e';
const CONTROL_PONG = 'o';
const SWITCH_ACK = 'a';
const END_TRANSMISSION = 'n';
const PING = 'p';
const SERVER_HELLO = 'h';
/**
 * Creates a new real-time connection to the server using whichever method works
 * best in the current browser.
 */
class Connection {
    /**
     * @param id - an id for this connection
     * @param repoInfo_ - the info for the endpoint to connect to
     * @param applicationId_ - the Firebase App ID for this project
     * @param appCheckToken_ - The App Check Token for this device.
     * @param authToken_ - The auth token for this session.
     * @param onMessage_ - the callback to be triggered when a server-push message arrives
     * @param onReady_ - the callback to be triggered when this connection is ready to send messages.
     * @param onDisconnect_ - the callback to be triggered when a connection was lost
     * @param onKill_ - the callback to be triggered when this connection has permanently shut down.
     * @param lastSessionId - last session id in persistent connection. is used to clean up old session in real-time server
     */
    constructor(id, repoInfo_, applicationId_, appCheckToken_, authToken_, onMessage_, onReady_, onDisconnect_, onKill_, lastSessionId) {
        this.id = id;
        this.repoInfo_ = repoInfo_;
        this.applicationId_ = applicationId_;
        this.appCheckToken_ = appCheckToken_;
        this.authToken_ = authToken_;
        this.onMessage_ = onMessage_;
        this.onReady_ = onReady_;
        this.onDisconnect_ = onDisconnect_;
        this.onKill_ = onKill_;
        this.lastSessionId = lastSessionId;
        this.connectionCount = 0;
        this.pendingDataMessages = [];
        this.state_ = 0 /* RealtimeState.CONNECTING */;
        this.log_ = logWrapper('c:' + this.id + ':');
        this.transportManager_ = new TransportManager(repoInfo_);
        this.log_('Connection created');
        this.start_();
    }
    /**
     * Starts a connection attempt
     */
    start_() {
        const conn = this.transportManager_.initialTransport();
        this.conn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId);
        // For certain transports (WebSockets), we need to send and receive several messages back and forth before we
        // can consider the transport healthy.
        this.primaryResponsesRequired_ = conn['responsesRequiredToBeHealthy'] || 0;
        const onMessageReceived = this.connReceiver_(this.conn_);
        const onConnectionLost = this.disconnReceiver_(this.conn_);
        this.tx_ = this.conn_;
        this.rx_ = this.conn_;
        this.secondaryConn_ = null;
        this.isHealthy_ = false;
        /*
         * Firefox doesn't like when code from one iframe tries to create another iframe by way of the parent frame.
         * This can occur in the case of a redirect, i.e. we guessed wrong on what server to connect to and received a reset.
         * Somehow, setTimeout seems to make this ok. That doesn't make sense from a security perspective, since you should
         * still have the context of your originating frame.
         */
        setTimeout(() => {
            // this.conn_ gets set to null in some of the tests. Check to make sure it still exists before using it
            this.conn_ && this.conn_.open(onMessageReceived, onConnectionLost);
        }, Math.floor(0));
        const healthyTimeoutMS = conn['healthyTimeout'] || 0;
        if (healthyTimeoutMS > 0) {
            this.healthyTimeout_ = setTimeoutNonBlocking(() => {
                this.healthyTimeout_ = null;
                if (!this.isHealthy_) {
                    if (this.conn_ &&
                        this.conn_.bytesReceived > BYTES_RECEIVED_HEALTHY_OVERRIDE) {
                        this.log_('Connection exceeded healthy timeout but has received ' +
                            this.conn_.bytesReceived +
                            ' bytes.  Marking connection healthy.');
                        this.isHealthy_ = true;
                        this.conn_.markConnectionHealthy();
                    }
                    else if (this.conn_ &&
                        this.conn_.bytesSent > BYTES_SENT_HEALTHY_OVERRIDE) {
                        this.log_('Connection exceeded healthy timeout but has sent ' +
                            this.conn_.bytesSent +
                            ' bytes.  Leaving connection alive.');
                        // NOTE: We don't want to mark it healthy, since we have no guarantee that the bytes have made it to
                        // the server.
                    }
                    else {
                        this.log_('Closing unhealthy connection after timeout.');
                        this.close();
                    }
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }, Math.floor(healthyTimeoutMS));
        }
    }
    nextTransportId_() {
        return 'c:' + this.id + ':' + this.connectionCount++;
    }
    disconnReceiver_(conn) {
        return everConnected => {
            if (conn === this.conn_) {
                this.onConnectionLost_(everConnected);
            }
            else if (conn === this.secondaryConn_) {
                this.log_('Secondary connection lost.');
                this.onSecondaryConnectionLost_();
            }
            else {
                this.log_('closing an old connection');
            }
        };
    }
    connReceiver_(conn) {
        return (message) => {
            if (this.state_ !== 2 /* RealtimeState.DISCONNECTED */) {
                if (conn === this.rx_) {
                    this.onPrimaryMessageReceived_(message);
                }
                else if (conn === this.secondaryConn_) {
                    this.onSecondaryMessageReceived_(message);
                }
                else {
                    this.log_('message on old connection');
                }
            }
        };
    }
    /**
     * @param dataMsg - An arbitrary data message to be sent to the server
     */
    sendRequest(dataMsg) {
        // wrap in a data message envelope and send it on
        const msg = { t: 'd', d: dataMsg };
        this.sendData_(msg);
    }
    tryCleanupConnection() {
        if (this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_) {
            this.log_('cleaning up and promoting a connection: ' + this.secondaryConn_.connId);
            this.conn_ = this.secondaryConn_;
            this.secondaryConn_ = null;
            // the server will shutdown the old connection
        }
    }
    onSecondaryControl_(controlData) {
        if (MESSAGE_TYPE in controlData) {
            const cmd = controlData[MESSAGE_TYPE];
            if (cmd === SWITCH_ACK) {
                this.upgradeIfSecondaryHealthy_();
            }
            else if (cmd === CONTROL_RESET) {
                // Most likely the session wasn't valid. Abandon the switch attempt
                this.log_('Got a reset on secondary, closing it');
                this.secondaryConn_.close();
                // If we were already using this connection for something, than we need to fully close
                if (this.tx_ === this.secondaryConn_ ||
                    this.rx_ === this.secondaryConn_) {
                    this.close();
                }
            }
            else if (cmd === CONTROL_PONG) {
                this.log_('got pong on secondary.');
                this.secondaryResponsesRequired_--;
                this.upgradeIfSecondaryHealthy_();
            }
        }
    }
    onSecondaryMessageReceived_(parsedData) {
        const layer = requireKey('t', parsedData);
        const data = requireKey('d', parsedData);
        if (layer === 'c') {
            this.onSecondaryControl_(data);
        }
        else if (layer === 'd') {
            // got a data message, but we're still second connection. Need to buffer it up
            this.pendingDataMessages.push(data);
        }
        else {
            throw new Error('Unknown protocol layer: ' + layer);
        }
    }
    upgradeIfSecondaryHealthy_() {
        if (this.secondaryResponsesRequired_ <= 0) {
            this.log_('Secondary connection is healthy.');
            this.isHealthy_ = true;
            this.secondaryConn_.markConnectionHealthy();
            this.proceedWithUpgrade_();
        }
        else {
            // Send a ping to make sure the connection is healthy.
            this.log_('sending ping on secondary.');
            this.secondaryConn_.send({ t: 'c', d: { t: PING, d: {} } });
        }
    }
    proceedWithUpgrade_() {
        // tell this connection to consider itself open
        this.secondaryConn_.start();
        // send ack
        this.log_('sending client ack on secondary');
        this.secondaryConn_.send({ t: 'c', d: { t: SWITCH_ACK, d: {} } });
        // send end packet on primary transport, switch to sending on this one
        // can receive on this one, buffer responses until end received on primary transport
        this.log_('Ending transmission on primary');
        this.conn_.send({ t: 'c', d: { t: END_TRANSMISSION, d: {} } });
        this.tx_ = this.secondaryConn_;
        this.tryCleanupConnection();
    }
    onPrimaryMessageReceived_(parsedData) {
        // Must refer to parsedData properties in quotes, so closure doesn't touch them.
        const layer = requireKey('t', parsedData);
        const data = requireKey('d', parsedData);
        if (layer === 'c') {
            this.onControl_(data);
        }
        else if (layer === 'd') {
            this.onDataMessage_(data);
        }
    }
    onDataMessage_(message) {
        this.onPrimaryResponse_();
        // We don't do anything with data messages, just kick them up a level
        this.onMessage_(message);
    }
    onPrimaryResponse_() {
        if (!this.isHealthy_) {
            this.primaryResponsesRequired_--;
            if (this.primaryResponsesRequired_ <= 0) {
                this.log_('Primary connection is healthy.');
                this.isHealthy_ = true;
                this.conn_.markConnectionHealthy();
            }
        }
    }
    onControl_(controlData) {
        const cmd = requireKey(MESSAGE_TYPE, controlData);
        if (MESSAGE_DATA in controlData) {
            const payload = controlData[MESSAGE_DATA];
            if (cmd === SERVER_HELLO) {
                const handshakePayload = Object.assign({}, payload);
                if (this.repoInfo_.isUsingEmulator) {
                    // Upon connecting, the emulator will pass the hostname that it's aware of, but we prefer the user's set hostname via `connectDatabaseEmulator` over what the emulator passes.
                    handshakePayload.h = this.repoInfo_.host;
                }
                this.onHandshake_(handshakePayload);
            }
            else if (cmd === END_TRANSMISSION) {
                this.log_('recvd end transmission on primary');
                this.rx_ = this.secondaryConn_;
                for (let i = 0; i < this.pendingDataMessages.length; ++i) {
                    this.onDataMessage_(this.pendingDataMessages[i]);
                }
                this.pendingDataMessages = [];
                this.tryCleanupConnection();
            }
            else if (cmd === CONTROL_SHUTDOWN) {
                // This was previously the 'onKill' callback passed to the lower-level connection
                // payload in this case is the reason for the shutdown. Generally a human-readable error
                this.onConnectionShutdown_(payload);
            }
            else if (cmd === CONTROL_RESET) {
                // payload in this case is the host we should contact
                this.onReset_(payload);
            }
            else if (cmd === CONTROL_ERROR) {
                error('Server Error: ' + payload);
            }
            else if (cmd === CONTROL_PONG) {
                this.log_('got pong on primary.');
                this.onPrimaryResponse_();
                this.sendPingOnPrimaryIfNecessary_();
            }
            else {
                error('Unknown control packet command: ' + cmd);
            }
        }
    }
    /**
     * @param handshake - The handshake data returned from the server
     */
    onHandshake_(handshake) {
        const timestamp = handshake.ts;
        const version = handshake.v;
        const host = handshake.h;
        this.sessionId = handshake.s;
        this.repoInfo_.host = host;
        // if we've already closed the connection, then don't bother trying to progress further
        if (this.state_ === 0 /* RealtimeState.CONNECTING */) {
            this.conn_.start();
            this.onConnectionEstablished_(this.conn_, timestamp);
            if (PROTOCOL_VERSION !== version) {
                warn('Protocol version mismatch detected');
            }
            // TODO: do we want to upgrade? when? maybe a delay?
            this.tryStartUpgrade_();
        }
    }
    tryStartUpgrade_() {
        const conn = this.transportManager_.upgradeTransport();
        if (conn) {
            this.startUpgrade_(conn);
        }
    }
    startUpgrade_(conn) {
        this.secondaryConn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId);
        // For certain transports (WebSockets), we need to send and receive several messages back and forth before we
        // can consider the transport healthy.
        this.secondaryResponsesRequired_ =
            conn['responsesRequiredToBeHealthy'] || 0;
        const onMessage = this.connReceiver_(this.secondaryConn_);
        const onDisconnect = this.disconnReceiver_(this.secondaryConn_);
        this.secondaryConn_.open(onMessage, onDisconnect);
        // If we haven't successfully upgraded after UPGRADE_TIMEOUT, give up and kill the secondary.
        setTimeoutNonBlocking(() => {
            if (this.secondaryConn_) {
                this.log_('Timed out trying to upgrade.');
                this.secondaryConn_.close();
            }
        }, Math.floor(UPGRADE_TIMEOUT));
    }
    onReset_(host) {
        this.log_('Reset packet received.  New host: ' + host);
        this.repoInfo_.host = host;
        // TODO: if we're already "connected", we need to trigger a disconnect at the next layer up.
        // We don't currently support resets after the connection has already been established
        if (this.state_ === 1 /* RealtimeState.CONNECTED */) {
            this.close();
        }
        else {
            // Close whatever connections we have open and start again.
            this.closeConnections_();
            this.start_();
        }
    }
    onConnectionEstablished_(conn, timestamp) {
        this.log_('Realtime connection established.');
        this.conn_ = conn;
        this.state_ = 1 /* RealtimeState.CONNECTED */;
        if (this.onReady_) {
            this.onReady_(timestamp, this.sessionId);
            this.onReady_ = null;
        }
        // If after 5 seconds we haven't sent enough requests to the server to get the connection healthy,
        // send some pings.
        if (this.primaryResponsesRequired_ === 0) {
            this.log_('Primary connection is healthy.');
            this.isHealthy_ = true;
        }
        else {
            setTimeoutNonBlocking(() => {
                this.sendPingOnPrimaryIfNecessary_();
            }, Math.floor(DELAY_BEFORE_SENDING_EXTRA_REQUESTS));
        }
    }
    sendPingOnPrimaryIfNecessary_() {
        // If the connection isn't considered healthy yet, we'll send a noop ping packet request.
        if (!this.isHealthy_ && this.state_ === 1 /* RealtimeState.CONNECTED */) {
            this.log_('sending ping on primary.');
            this.sendData_({ t: 'c', d: { t: PING, d: {} } });
        }
    }
    onSecondaryConnectionLost_() {
        const conn = this.secondaryConn_;
        this.secondaryConn_ = null;
        if (this.tx_ === conn || this.rx_ === conn) {
            // we are relying on this connection already in some capacity. Therefore, a failure is real
            this.close();
        }
    }
    /**
     * @param everConnected - Whether or not the connection ever reached a server. Used to determine if
     * we should flush the host cache
     */
    onConnectionLost_(everConnected) {
        this.conn_ = null;
        // NOTE: IF you're seeing a Firefox error for this line, I think it might be because it's getting
        // called on window close and RealtimeState.CONNECTING is no longer defined.  Just a guess.
        if (!everConnected && this.state_ === 0 /* RealtimeState.CONNECTING */) {
            this.log_('Realtime connection failed.');
            // Since we failed to connect at all, clear any cached entry for this namespace in case the machine went away
            if (this.repoInfo_.isCacheableHost()) {
                PersistentStorage.remove('host:' + this.repoInfo_.host);
                // reset the internal host to what we would show the user, i.e. <ns>.firebaseio.com
                this.repoInfo_.internalHost = this.repoInfo_.host;
            }
        }
        else if (this.state_ === 1 /* RealtimeState.CONNECTED */) {
            this.log_('Realtime connection lost.');
        }
        this.close();
    }
    onConnectionShutdown_(reason) {
        this.log_('Connection shutdown command received. Shutting down...');
        if (this.onKill_) {
            this.onKill_(reason);
            this.onKill_ = null;
        }
        // We intentionally don't want to fire onDisconnect (kill is a different case),
        // so clear the callback.
        this.onDisconnect_ = null;
        this.close();
    }
    sendData_(data) {
        if (this.state_ !== 1 /* RealtimeState.CONNECTED */) {
            throw 'Connection is not connected';
        }
        else {
            this.tx_.send(data);
        }
    }
    /**
     * Cleans up this connection, calling the appropriate callbacks
     */
    close() {
        if (this.state_ !== 2 /* RealtimeState.DISCONNECTED */) {
            this.log_('Closing realtime connection.');
            this.state_ = 2 /* RealtimeState.DISCONNECTED */;
            this.closeConnections_();
            if (this.onDisconnect_) {
                this.onDisconnect_();
                this.onDisconnect_ = null;
            }
        }
    }
    closeConnections_() {
        this.log_('Shutting down all connections');
        if (this.conn_) {
            this.conn_.close();
            this.conn_ = null;
        }
        if (this.secondaryConn_) {
            this.secondaryConn_.close();
            this.secondaryConn_ = null;
        }
        if (this.healthyTimeout_) {
            clearTimeout(this.healthyTimeout_);
            this.healthyTimeout_ = null;
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Interface defining the set of actions that can be performed against the Firebase server
 * (basically corresponds to our wire protocol).
 *
 * @interface
 */
class ServerActions {
    put(pathString, data, onComplete, hash) { }
    merge(pathString, data, onComplete, hash) { }
    /**
     * Refreshes the auth token for the current connection.
     * @param token - The authentication token
     */
    refreshAuthToken(token) { }
    /**
     * Refreshes the app check token for the current connection.
     * @param token The app check token
     */
    refreshAppCheckToken(token) { }
    onDisconnectPut(pathString, data, onComplete) { }
    onDisconnectMerge(pathString, data, onComplete) { }
    onDisconnectCancel(pathString, onComplete) { }
    reportStats(stats) { }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Base class to be used if you want to emit events. Call the constructor with
 * the set of allowed event names.
 */
class EventEmitter {
    constructor(allowedEvents_) {
        this.allowedEvents_ = allowedEvents_;
        this.listeners_ = {};
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(Array.isArray(allowedEvents_) && allowedEvents_.length > 0, 'Requires a non-empty array');
    }
    /**
     * To be called by derived classes to trigger events.
     */
    trigger(eventType, ...varArgs) {
        if (Array.isArray(this.listeners_[eventType])) {
            // Clone the list, since callbacks could add/remove listeners.
            const listeners = [...this.listeners_[eventType]];
            for (let i = 0; i < listeners.length; i++) {
                listeners[i].callback.apply(listeners[i].context, varArgs);
            }
        }
    }
    on(eventType, callback, context) {
        this.validateEventType_(eventType);
        this.listeners_[eventType] = this.listeners_[eventType] || [];
        this.listeners_[eventType].push({ callback, context });
        const eventData = this.getInitialEvent(eventType);
        if (eventData) {
            callback.apply(context, eventData);
        }
    }
    off(eventType, callback, context) {
        this.validateEventType_(eventType);
        const listeners = this.listeners_[eventType] || [];
        for (let i = 0; i < listeners.length; i++) {
            if (listeners[i].callback === callback &&
                (!context || context === listeners[i].context)) {
                listeners.splice(i, 1);
                return;
            }
        }
    }
    validateEventType_(eventType) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(this.allowedEvents_.find(et => {
            return et === eventType;
        }), 'Unknown event: ' + eventType);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Monitors online state (as reported by window.online/offline events).
 *
 * The expectation is that this could have many false positives (thinks we are online
 * when we're not), but no false negatives.  So we can safely use it to determine when
 * we definitely cannot reach the internet.
 */
class OnlineMonitor extends EventEmitter {
    static getInstance() {
        return new OnlineMonitor();
    }
    constructor() {
        super(['online']);
        this.online_ = true;
        // We've had repeated complaints that Cordova apps can get stuck "offline", e.g.
        // https://forum.ionicframework.com/t/firebase-connection-is-lost-and-never-come-back/43810
        // It would seem that the 'online' event does not always fire consistently. So we disable it
        // for Cordova.
        if (typeof window !== 'undefined' &&
            typeof window.addEventListener !== 'undefined' &&
            !(0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isMobileCordova)()) {
            window.addEventListener('online', () => {
                if (!this.online_) {
                    this.online_ = true;
                    this.trigger('online', true);
                }
            }, false);
            window.addEventListener('offline', () => {
                if (this.online_) {
                    this.online_ = false;
                    this.trigger('online', false);
                }
            }, false);
        }
    }
    getInitialEvent(eventType) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(eventType === 'online', 'Unknown event type: ' + eventType);
        return [this.online_];
    }
    currentlyOnline() {
        return this.online_;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Maximum key depth. */
const MAX_PATH_DEPTH = 32;
/** Maximum number of (UTF8) bytes in a Firebase path. */
const MAX_PATH_LENGTH_BYTES = 768;
/**
 * An immutable object representing a parsed path.  It's immutable so that you
 * can pass them around to other functions without worrying about them changing
 * it.
 */
class Path {
    /**
     * @param pathOrString - Path string to parse, or another path, or the raw
     * tokens array
     */
    constructor(pathOrString, pieceNum) {
        if (pieceNum === void 0) {
            this.pieces_ = pathOrString.split('/');
            // Remove empty pieces.
            let copyTo = 0;
            for (let i = 0; i < this.pieces_.length; i++) {
                if (this.pieces_[i].length > 0) {
                    this.pieces_[copyTo] = this.pieces_[i];
                    copyTo++;
                }
            }
            this.pieces_.length = copyTo;
            this.pieceNum_ = 0;
        }
        else {
            this.pieces_ = pathOrString;
            this.pieceNum_ = pieceNum;
        }
    }
    toString() {
        let pathString = '';
        for (let i = this.pieceNum_; i < this.pieces_.length; i++) {
            if (this.pieces_[i] !== '') {
                pathString += '/' + this.pieces_[i];
            }
        }
        return pathString || '/';
    }
}
function newEmptyPath() {
    return new Path('');
}
function pathGetFront(path) {
    if (path.pieceNum_ >= path.pieces_.length) {
        return null;
    }
    return path.pieces_[path.pieceNum_];
}
/**
 * @returns The number of segments in this path
 */
function pathGetLength(path) {
    return path.pieces_.length - path.pieceNum_;
}
function pathPopFront(path) {
    let pieceNum = path.pieceNum_;
    if (pieceNum < path.pieces_.length) {
        pieceNum++;
    }
    return new Path(path.pieces_, pieceNum);
}
function pathGetBack(path) {
    if (path.pieceNum_ < path.pieces_.length) {
        return path.pieces_[path.pieces_.length - 1];
    }
    return null;
}
function pathToUrlEncodedString(path) {
    let pathString = '';
    for (let i = path.pieceNum_; i < path.pieces_.length; i++) {
        if (path.pieces_[i] !== '') {
            pathString += '/' + encodeURIComponent(String(path.pieces_[i]));
        }
    }
    return pathString || '/';
}
/**
 * Shallow copy of the parts of the path.
 *
 */
function pathSlice(path, begin = 0) {
    return path.pieces_.slice(path.pieceNum_ + begin);
}
function pathParent(path) {
    if (path.pieceNum_ >= path.pieces_.length) {
        return null;
    }
    const pieces = [];
    for (let i = path.pieceNum_; i < path.pieces_.length - 1; i++) {
        pieces.push(path.pieces_[i]);
    }
    return new Path(pieces, 0);
}
function pathChild(path, childPathObj) {
    const pieces = [];
    for (let i = path.pieceNum_; i < path.pieces_.length; i++) {
        pieces.push(path.pieces_[i]);
    }
    if (childPathObj instanceof Path) {
        for (let i = childPathObj.pieceNum_; i < childPathObj.pieces_.length; i++) {
            pieces.push(childPathObj.pieces_[i]);
        }
    }
    else {
        const childPieces = childPathObj.split('/');
        for (let i = 0; i < childPieces.length; i++) {
            if (childPieces[i].length > 0) {
                pieces.push(childPieces[i]);
            }
        }
    }
    return new Path(pieces, 0);
}
/**
 * @returns True if there are no segments in this path
 */
function pathIsEmpty(path) {
    return path.pieceNum_ >= path.pieces_.length;
}
/**
 * @returns The path from outerPath to innerPath
 */
function newRelativePath(outerPath, innerPath) {
    const outer = pathGetFront(outerPath), inner = pathGetFront(innerPath);
    if (outer === null) {
        return innerPath;
    }
    else if (outer === inner) {
        return newRelativePath(pathPopFront(outerPath), pathPopFront(innerPath));
    }
    else {
        throw new Error('INTERNAL ERROR: innerPath (' +
            innerPath +
            ') is not within ' +
            'outerPath (' +
            outerPath +
            ')');
    }
}
/**
 * @returns -1, 0, 1 if left is less, equal, or greater than the right.
 */
function pathCompare(left, right) {
    const leftKeys = pathSlice(left, 0);
    const rightKeys = pathSlice(right, 0);
    for (let i = 0; i < leftKeys.length && i < rightKeys.length; i++) {
        const cmp = nameCompare(leftKeys[i], rightKeys[i]);
        if (cmp !== 0) {
            return cmp;
        }
    }
    if (leftKeys.length === rightKeys.length) {
        return 0;
    }
    return leftKeys.length < rightKeys.length ? -1 : 1;
}
/**
 * @returns true if paths are the same.
 */
function pathEquals(path, other) {
    if (pathGetLength(path) !== pathGetLength(other)) {
        return false;
    }
    for (let i = path.pieceNum_, j = other.pieceNum_; i <= path.pieces_.length; i++, j++) {
        if (path.pieces_[i] !== other.pieces_[j]) {
            return false;
        }
    }
    return true;
}
/**
 * @returns True if this path is a parent of (or the same as) other
 */
function pathContains(path, other) {
    let i = path.pieceNum_;
    let j = other.pieceNum_;
    if (pathGetLength(path) > pathGetLength(other)) {
        return false;
    }
    while (i < path.pieces_.length) {
        if (path.pieces_[i] !== other.pieces_[j]) {
            return false;
        }
        ++i;
        ++j;
    }
    return true;
}
/**
 * Dynamic (mutable) path used to count path lengths.
 *
 * This class is used to efficiently check paths for valid
 * length (in UTF8 bytes) and depth (used in path validation).
 *
 * Throws Error exception if path is ever invalid.
 *
 * The definition of a path always begins with '/'.
 */
class ValidationPath {
    /**
     * @param path - Initial Path.
     * @param errorPrefix_ - Prefix for any error messages.
     */
    constructor(path, errorPrefix_) {
        this.errorPrefix_ = errorPrefix_;
        this.parts_ = pathSlice(path, 0);
        /** Initialize to number of '/' chars needed in path. */
        this.byteLength_ = Math.max(1, this.parts_.length);
        for (let i = 0; i < this.parts_.length; i++) {
            this.byteLength_ += (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringLength)(this.parts_[i]);
        }
        validationPathCheckValid(this);
    }
}
function validationPathPush(validationPath, child) {
    // Count the needed '/'
    if (validationPath.parts_.length > 0) {
        validationPath.byteLength_ += 1;
    }
    validationPath.parts_.push(child);
    validationPath.byteLength_ += (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringLength)(child);
    validationPathCheckValid(validationPath);
}
function validationPathPop(validationPath) {
    const last = validationPath.parts_.pop();
    validationPath.byteLength_ -= (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringLength)(last);
    // Un-count the previous '/'
    if (validationPath.parts_.length > 0) {
        validationPath.byteLength_ -= 1;
    }
}
function validationPathCheckValid(validationPath) {
    if (validationPath.byteLength_ > MAX_PATH_LENGTH_BYTES) {
        throw new Error(validationPath.errorPrefix_ +
            'has a key path longer than ' +
            MAX_PATH_LENGTH_BYTES +
            ' bytes (' +
            validationPath.byteLength_ +
            ').');
    }
    if (validationPath.parts_.length > MAX_PATH_DEPTH) {
        throw new Error(validationPath.errorPrefix_ +
            'path specified exceeds the maximum depth that can be written (' +
            MAX_PATH_DEPTH +
            ') or object contains a cycle ' +
            validationPathToErrorString(validationPath));
    }
}
/**
 * String for use in error messages - uses '.' notation for path.
 */
function validationPathToErrorString(validationPath) {
    if (validationPath.parts_.length === 0) {
        return '';
    }
    return "in property '" + validationPath.parts_.join('.') + "'";
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class VisibilityMonitor extends EventEmitter {
    static getInstance() {
        return new VisibilityMonitor();
    }
    constructor() {
        super(['visible']);
        let hidden;
        let visibilityChange;
        if (typeof document !== 'undefined' &&
            typeof document.addEventListener !== 'undefined') {
            if (typeof document['hidden'] !== 'undefined') {
                // Opera 12.10 and Firefox 18 and later support
                visibilityChange = 'visibilitychange';
                hidden = 'hidden';
            }
            else if (typeof document['mozHidden'] !== 'undefined') {
                visibilityChange = 'mozvisibilitychange';
                hidden = 'mozHidden';
            }
            else if (typeof document['msHidden'] !== 'undefined') {
                visibilityChange = 'msvisibilitychange';
                hidden = 'msHidden';
            }
            else if (typeof document['webkitHidden'] !== 'undefined') {
                visibilityChange = 'webkitvisibilitychange';
                hidden = 'webkitHidden';
            }
        }
        // Initially, we always assume we are visible. This ensures that in browsers
        // without page visibility support or in cases where we are never visible
        // (e.g. chrome extension), we act as if we are visible, i.e. don't delay
        // reconnects
        this.visible_ = true;
        if (visibilityChange) {
            document.addEventListener(visibilityChange, () => {
                const visible = !document[hidden];
                if (visible !== this.visible_) {
                    this.visible_ = visible;
                    this.trigger('visible', visible);
                }
            }, false);
        }
    }
    getInitialEvent(eventType) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(eventType === 'visible', 'Unknown event type: ' + eventType);
        return [this.visible_];
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const RECONNECT_MIN_DELAY = 1000;
const RECONNECT_MAX_DELAY_DEFAULT = 60 * 5 * 1000; // 5 minutes in milliseconds (Case: 1858)
const RECONNECT_MAX_DELAY_FOR_ADMINS = 30 * 1000; // 30 seconds for admin clients (likely to be a backend server)
const RECONNECT_DELAY_MULTIPLIER = 1.3;
const RECONNECT_DELAY_RESET_TIMEOUT = 30000; // Reset delay back to MIN_DELAY after being connected for 30sec.
const SERVER_KILL_INTERRUPT_REASON = 'server_kill';
// If auth fails repeatedly, we'll assume something is wrong and log a warning / back off.
const INVALID_TOKEN_THRESHOLD = 3;
/**
 * Firebase connection.  Abstracts wire protocol and handles reconnecting.
 *
 * NOTE: All JSON objects sent to the realtime connection must have property names enclosed
 * in quotes to make sure the closure compiler does not minify them.
 */
class PersistentConnection extends ServerActions {
    /**
     * @param repoInfo_ - Data about the namespace we are connecting to
     * @param applicationId_ - The Firebase App ID for this project
     * @param onDataUpdate_ - A callback for new data from the server
     */
    constructor(repoInfo_, applicationId_, onDataUpdate_, onConnectStatus_, onServerInfoUpdate_, authTokenProvider_, appCheckTokenProvider_, authOverride_) {
        super();
        this.repoInfo_ = repoInfo_;
        this.applicationId_ = applicationId_;
        this.onDataUpdate_ = onDataUpdate_;
        this.onConnectStatus_ = onConnectStatus_;
        this.onServerInfoUpdate_ = onServerInfoUpdate_;
        this.authTokenProvider_ = authTokenProvider_;
        this.appCheckTokenProvider_ = appCheckTokenProvider_;
        this.authOverride_ = authOverride_;
        // Used for diagnostic logging.
        this.id = PersistentConnection.nextPersistentConnectionId_++;
        this.log_ = logWrapper('p:' + this.id + ':');
        this.interruptReasons_ = {};
        this.listens = new Map();
        this.outstandingPuts_ = [];
        this.outstandingGets_ = [];
        this.outstandingPutCount_ = 0;
        this.outstandingGetCount_ = 0;
        this.onDisconnectRequestQueue_ = [];
        this.connected_ = false;
        this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_DEFAULT;
        this.securityDebugCallback_ = null;
        this.lastSessionId = null;
        this.establishConnectionTimer_ = null;
        this.visible_ = false;
        // Before we get connected, we keep a queue of pending messages to send.
        this.requestCBHash_ = {};
        this.requestNumber_ = 0;
        this.realtime_ = null;
        this.authToken_ = null;
        this.appCheckToken_ = null;
        this.forceTokenRefresh_ = false;
        this.invalidAuthTokenCount_ = 0;
        this.invalidAppCheckTokenCount_ = 0;
        this.firstConnection_ = true;
        this.lastConnectionAttemptTime_ = null;
        this.lastConnectionEstablishedTime_ = null;
        if (authOverride_ && !(0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isNodeSdk)()) {
            throw new Error('Auth override specified in options, but not supported on non Node.js platforms');
        }
        VisibilityMonitor.getInstance().on('visible', this.onVisible_, this);
        if (repoInfo_.host.indexOf('fblocal') === -1) {
            OnlineMonitor.getInstance().on('online', this.onOnline_, this);
        }
    }
    sendRequest(action, body, onResponse) {
        const curReqNum = ++this.requestNumber_;
        const msg = { r: curReqNum, a: action, b: body };
        this.log_((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(msg));
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(this.connected_, "sendRequest call when we're not connected not allowed.");
        this.realtime_.sendRequest(msg);
        if (onResponse) {
            this.requestCBHash_[curReqNum] = onResponse;
        }
    }
    get(query) {
        this.initConnection_();
        const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
        const request = {
            p: query._path.toString(),
            q: query._queryObject
        };
        const outstandingGet = {
            action: 'g',
            request,
            onComplete: (message) => {
                const payload = message['d'];
                if (message['s'] === 'ok') {
                    deferred.resolve(payload);
                }
                else {
                    deferred.reject(payload);
                }
            }
        };
        this.outstandingGets_.push(outstandingGet);
        this.outstandingGetCount_++;
        const index = this.outstandingGets_.length - 1;
        if (this.connected_) {
            this.sendGet_(index);
        }
        return deferred.promise;
    }
    listen(query, currentHashFn, tag, onComplete) {
        this.initConnection_();
        const queryId = query._queryIdentifier;
        const pathString = query._path.toString();
        this.log_('Listen called for ' + pathString + ' ' + queryId);
        if (!this.listens.has(pathString)) {
            this.listens.set(pathString, new Map());
        }
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), 'listen() called for non-default but complete query');
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(!this.listens.get(pathString).has(queryId), `listen() called twice for same path/queryId.`);
        const listenSpec = {
            onComplete,
            hashFn: currentHashFn,
            query,
            tag
        };
        this.listens.get(pathString).set(queryId, listenSpec);
        if (this.connected_) {
            this.sendListen_(listenSpec);
        }
    }
    sendGet_(index) {
        const get = this.outstandingGets_[index];
        this.sendRequest('g', get.request, (message) => {
            delete this.outstandingGets_[index];
            this.outstandingGetCount_--;
            if (this.outstandingGetCount_ === 0) {
                this.outstandingGets_ = [];
            }
            if (get.onComplete) {
                get.onComplete(message);
            }
        });
    }
    sendListen_(listenSpec) {
        const query = listenSpec.query;
        const pathString = query._path.toString();
        const queryId = query._queryIdentifier;
        this.log_('Listen on ' + pathString + ' for ' + queryId);
        const req = { /*path*/ p: pathString };
        const action = 'q';
        // Only bother to send query if it's non-default.
        if (listenSpec.tag) {
            req['q'] = query._queryObject;
            req['t'] = listenSpec.tag;
        }
        req[ /*hash*/'h'] = listenSpec.hashFn();
        this.sendRequest(action, req, (message) => {
            const payload = message[ /*data*/'d'];
            const status = message[ /*status*/'s'];
            // print warnings in any case...
            PersistentConnection.warnOnListenWarnings_(payload, query);
            const currentListenSpec = this.listens.get(pathString) &&
                this.listens.get(pathString).get(queryId);
            // only trigger actions if the listen hasn't been removed and readded
            if (currentListenSpec === listenSpec) {
                this.log_('listen response', message);
                if (status !== 'ok') {
                    this.removeListen_(pathString, queryId);
                }
                if (listenSpec.onComplete) {
                    listenSpec.onComplete(status, payload);
                }
            }
        });
    }
    static warnOnListenWarnings_(payload, query) {
        if (payload && typeof payload === 'object' && (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.contains)(payload, 'w')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const warnings = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.safeGet)(payload, 'w');
            if (Array.isArray(warnings) && ~warnings.indexOf('no_index')) {
                const indexSpec = '".indexOn": "' + query._queryParams.getIndex().toString() + '"';
                const indexPath = query._path.toString();
                warn(`Using an unspecified index. Your data will be downloaded and ` +
                    `filtered on the client. Consider adding ${indexSpec} at ` +
                    `${indexPath} to your security rules for better performance.`);
            }
        }
    }
    refreshAuthToken(token) {
        this.authToken_ = token;
        this.log_('Auth token refreshed');
        if (this.authToken_) {
            this.tryAuth();
        }
        else {
            //If we're connected we want to let the server know to unauthenticate us. If we're not connected, simply delete
            //the credential so we dont become authenticated next time we connect.
            if (this.connected_) {
                this.sendRequest('unauth', {}, () => { });
            }
        }
        this.reduceReconnectDelayIfAdminCredential_(token);
    }
    reduceReconnectDelayIfAdminCredential_(credential) {
        // NOTE: This isn't intended to be bulletproof (a malicious developer can always just modify the client).
        // Additionally, we don't bother resetting the max delay back to the default if auth fails / expires.
        const isFirebaseSecret = credential && credential.length === 40;
        if (isFirebaseSecret || (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isAdmin)(credential)) {
            this.log_('Admin auth credential detected.  Reducing max reconnect time.');
            this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
        }
    }
    refreshAppCheckToken(token) {
        this.appCheckToken_ = token;
        this.log_('App check token refreshed');
        if (this.appCheckToken_) {
            this.tryAppCheck();
        }
        else {
            //If we're connected we want to let the server know to unauthenticate us.
            //If we're not connected, simply delete the credential so we dont become
            // authenticated next time we connect.
            if (this.connected_) {
                this.sendRequest('unappeck', {}, () => { });
            }
        }
    }
    /**
     * Attempts to authenticate with the given credentials. If the authentication attempt fails, it's triggered like
     * a auth revoked (the connection is closed).
     */
    tryAuth() {
        if (this.connected_ && this.authToken_) {
            const token = this.authToken_;
            const authMethod = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isValidFormat)(token) ? 'auth' : 'gauth';
            const requestData = { cred: token };
            if (this.authOverride_ === null) {
                requestData['noauth'] = true;
            }
            else if (typeof this.authOverride_ === 'object') {
                requestData['authvar'] = this.authOverride_;
            }
            this.sendRequest(authMethod, requestData, (res) => {
                const status = res[ /*status*/'s'];
                const data = res[ /*data*/'d'] || 'error';
                if (this.authToken_ === token) {
                    if (status === 'ok') {
                        this.invalidAuthTokenCount_ = 0;
                    }
                    else {
                        // Triggers reconnect and force refresh for auth token
                        this.onAuthRevoked_(status, data);
                    }
                }
            });
        }
    }
    /**
     * Attempts to authenticate with the given token. If the authentication
     * attempt fails, it's triggered like the token was revoked (the connection is
     * closed).
     */
    tryAppCheck() {
        if (this.connected_ && this.appCheckToken_) {
            this.sendRequest('appcheck', { 'token': this.appCheckToken_ }, (res) => {
                const status = res[ /*status*/'s'];
                const data = res[ /*data*/'d'] || 'error';
                if (status === 'ok') {
                    this.invalidAppCheckTokenCount_ = 0;
                }
                else {
                    this.onAppCheckRevoked_(status, data);
                }
            });
        }
    }
    /**
     * @inheritDoc
     */
    unlisten(query, tag) {
        const pathString = query._path.toString();
        const queryId = query._queryIdentifier;
        this.log_('Unlisten called for ' + pathString + ' ' + queryId);
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), 'unlisten() called for non-default but complete query');
        const listen = this.removeListen_(pathString, queryId);
        if (listen && this.connected_) {
            this.sendUnlisten_(pathString, queryId, query._queryObject, tag);
        }
    }
    sendUnlisten_(pathString, queryId, queryObj, tag) {
        this.log_('Unlisten on ' + pathString + ' for ' + queryId);
        const req = { /*path*/ p: pathString };
        const action = 'n';
        // Only bother sending queryId if it's non-default.
        if (tag) {
            req['q'] = queryObj;
            req['t'] = tag;
        }
        this.sendRequest(action, req);
    }
    onDisconnectPut(pathString, data, onComplete) {
        this.initConnection_();
        if (this.connected_) {
            this.sendOnDisconnect_('o', pathString, data, onComplete);
        }
        else {
            this.onDisconnectRequestQueue_.push({
                pathString,
                action: 'o',
                data,
                onComplete
            });
        }
    }
    onDisconnectMerge(pathString, data, onComplete) {
        this.initConnection_();
        if (this.connected_) {
            this.sendOnDisconnect_('om', pathString, data, onComplete);
        }
        else {
            this.onDisconnectRequestQueue_.push({
                pathString,
                action: 'om',
                data,
                onComplete
            });
        }
    }
    onDisconnectCancel(pathString, onComplete) {
        this.initConnection_();
        if (this.connected_) {
            this.sendOnDisconnect_('oc', pathString, null, onComplete);
        }
        else {
            this.onDisconnectRequestQueue_.push({
                pathString,
                action: 'oc',
                data: null,
                onComplete
            });
        }
    }
    sendOnDisconnect_(action, pathString, data, onComplete) {
        const request = { /*path*/ p: pathString, /*data*/ d: data };
        this.log_('onDisconnect ' + action, request);
        this.sendRequest(action, request, (response) => {
            if (onComplete) {
                setTimeout(() => {
                    onComplete(response[ /*status*/'s'], response[ /* data */'d']);
                }, Math.floor(0));
            }
        });
    }
    put(pathString, data, onComplete, hash) {
        this.putInternal('p', pathString, data, onComplete, hash);
    }
    merge(pathString, data, onComplete, hash) {
        this.putInternal('m', pathString, data, onComplete, hash);
    }
    putInternal(action, pathString, data, onComplete, hash) {
        this.initConnection_();
        const request = {
            /*path*/ p: pathString,
            /*data*/ d: data
        };
        if (hash !== undefined) {
            request[ /*hash*/'h'] = hash;
        }
        // TODO: Only keep track of the most recent put for a given path?
        this.outstandingPuts_.push({
            action,
            request,
            onComplete
        });
        this.outstandingPutCount_++;
        const index = this.outstandingPuts_.length - 1;
        if (this.connected_) {
            this.sendPut_(index);
        }
        else {
            this.log_('Buffering put: ' + pathString);
        }
    }
    sendPut_(index) {
        const action = this.outstandingPuts_[index].action;
        const request = this.outstandingPuts_[index].request;
        const onComplete = this.outstandingPuts_[index].onComplete;
        this.outstandingPuts_[index].queued = this.connected_;
        this.sendRequest(action, request, (message) => {
            this.log_(action + ' response', message);
            delete this.outstandingPuts_[index];
            this.outstandingPutCount_--;
            // Clean up array occasionally.
            if (this.outstandingPutCount_ === 0) {
                this.outstandingPuts_ = [];
            }
            if (onComplete) {
                onComplete(message[ /*status*/'s'], message[ /* data */'d']);
            }
        });
    }
    reportStats(stats) {
        // If we're not connected, we just drop the stats.
        if (this.connected_) {
            const request = { /*counters*/ c: stats };
            this.log_('reportStats', request);
            this.sendRequest(/*stats*/ 's', request, result => {
                const status = result[ /*status*/'s'];
                if (status !== 'ok') {
                    const errorReason = result[ /* data */'d'];
                    this.log_('reportStats', 'Error sending stats: ' + errorReason);
                }
            });
        }
    }
    onDataMessage_(message) {
        if ('r' in message) {
            // this is a response
            this.log_('from server: ' + (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(message));
            const reqNum = message['r'];
            const onResponse = this.requestCBHash_[reqNum];
            if (onResponse) {
                delete this.requestCBHash_[reqNum];
                onResponse(message[ /*body*/'b']);
            }
        }
        else if ('error' in message) {
            throw 'A server-side error has occurred: ' + message['error'];
        }
        else if ('a' in message) {
            // a and b are action and body, respectively
            this.onDataPush_(message['a'], message['b']);
        }
    }
    onDataPush_(action, body) {
        this.log_('handleServerMessage', action, body);
        if (action === 'd') {
            this.onDataUpdate_(body[ /*path*/'p'], body[ /*data*/'d'], 
            /*isMerge*/ false, body['t']);
        }
        else if (action === 'm') {
            this.onDataUpdate_(body[ /*path*/'p'], body[ /*data*/'d'], 
            /*isMerge=*/ true, body['t']);
        }
        else if (action === 'c') {
            this.onListenRevoked_(body[ /*path*/'p'], body[ /*query*/'q']);
        }
        else if (action === 'ac') {
            this.onAuthRevoked_(body[ /*status code*/'s'], body[ /* explanation */'d']);
        }
        else if (action === 'apc') {
            this.onAppCheckRevoked_(body[ /*status code*/'s'], body[ /* explanation */'d']);
        }
        else if (action === 'sd') {
            this.onSecurityDebugPacket_(body);
        }
        else {
            error('Unrecognized action received from server: ' +
                (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(action) +
                '\nAre you using the latest client?');
        }
    }
    onReady_(timestamp, sessionId) {
        this.log_('connection ready');
        this.connected_ = true;
        this.lastConnectionEstablishedTime_ = new Date().getTime();
        this.handleTimestamp_(timestamp);
        this.lastSessionId = sessionId;
        if (this.firstConnection_) {
            this.sendConnectStats_();
        }
        this.restoreState_();
        this.firstConnection_ = false;
        this.onConnectStatus_(true);
    }
    scheduleConnect_(timeout) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(!this.realtime_, "Scheduling a connect when we're already connected/ing?");
        if (this.establishConnectionTimer_) {
            clearTimeout(this.establishConnectionTimer_);
        }
        // NOTE: Even when timeout is 0, it's important to do a setTimeout to work around an infuriating "Security Error" in
        // Firefox when trying to write to our long-polling iframe in some scenarios (e.g. Forge or our unit tests).
        this.establishConnectionTimer_ = setTimeout(() => {
            this.establishConnectionTimer_ = null;
            this.establishConnection_();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, Math.floor(timeout));
    }
    initConnection_() {
        if (!this.realtime_ && this.firstConnection_) {
            this.scheduleConnect_(0);
        }
    }
    onVisible_(visible) {
        // NOTE: Tabbing away and back to a window will defeat our reconnect backoff, but I think that's fine.
        if (visible &&
            !this.visible_ &&
            this.reconnectDelay_ === this.maxReconnectDelay_) {
            this.log_('Window became visible.  Reducing delay.');
            this.reconnectDelay_ = RECONNECT_MIN_DELAY;
            if (!this.realtime_) {
                this.scheduleConnect_(0);
            }
        }
        this.visible_ = visible;
    }
    onOnline_(online) {
        if (online) {
            this.log_('Browser went online.');
            this.reconnectDelay_ = RECONNECT_MIN_DELAY;
            if (!this.realtime_) {
                this.scheduleConnect_(0);
            }
        }
        else {
            this.log_('Browser went offline.  Killing connection.');
            if (this.realtime_) {
                this.realtime_.close();
            }
        }
    }
    onRealtimeDisconnect_() {
        this.log_('data client disconnected');
        this.connected_ = false;
        this.realtime_ = null;
        // Since we don't know if our sent transactions succeeded or not, we need to cancel them.
        this.cancelSentTransactions_();
        // Clear out the pending requests.
        this.requestCBHash_ = {};
        if (this.shouldReconnect_()) {
            if (!this.visible_) {
                this.log_("Window isn't visible.  Delaying reconnect.");
                this.reconnectDelay_ = this.maxReconnectDelay_;
                this.lastConnectionAttemptTime_ = new Date().getTime();
            }
            else if (this.lastConnectionEstablishedTime_) {
                // If we've been connected long enough, reset reconnect delay to minimum.
                const timeSinceLastConnectSucceeded = new Date().getTime() - this.lastConnectionEstablishedTime_;
                if (timeSinceLastConnectSucceeded > RECONNECT_DELAY_RESET_TIMEOUT) {
                    this.reconnectDelay_ = RECONNECT_MIN_DELAY;
                }
                this.lastConnectionEstablishedTime_ = null;
            }
            const timeSinceLastConnectAttempt = Math.max(0, new Date().getTime() - this.lastConnectionAttemptTime_);
            let reconnectDelay = Math.max(0, this.reconnectDelay_ - timeSinceLastConnectAttempt);
            reconnectDelay = Math.random() * reconnectDelay;
            this.log_('Trying to reconnect in ' + reconnectDelay + 'ms');
            this.scheduleConnect_(reconnectDelay);
            // Adjust reconnect delay for next time.
            this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * RECONNECT_DELAY_MULTIPLIER);
        }
        this.onConnectStatus_(false);
    }
    async establishConnection_() {
        if (this.shouldReconnect_()) {
            this.log_('Making a connection attempt');
            this.lastConnectionAttemptTime_ = new Date().getTime();
            this.lastConnectionEstablishedTime_ = null;
            const onDataMessage = this.onDataMessage_.bind(this);
            const onReady = this.onReady_.bind(this);
            const onDisconnect = this.onRealtimeDisconnect_.bind(this);
            const connId = this.id + ':' + PersistentConnection.nextConnectionId_++;
            const lastSessionId = this.lastSessionId;
            let canceled = false;
            let connection = null;
            const closeFn = function () {
                if (connection) {
                    connection.close();
                }
                else {
                    canceled = true;
                    onDisconnect();
                }
            };
            const sendRequestFn = function (msg) {
                (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(connection, "sendRequest call when we're not connected not allowed.");
                connection.sendRequest(msg);
            };
            this.realtime_ = {
                close: closeFn,
                sendRequest: sendRequestFn
            };
            const forceRefresh = this.forceTokenRefresh_;
            this.forceTokenRefresh_ = false;
            try {
                // First fetch auth and app check token, and establish connection after
                // fetching the token was successful
                const [authToken, appCheckToken] = await Promise.all([
                    this.authTokenProvider_.getToken(forceRefresh),
                    this.appCheckTokenProvider_.getToken(forceRefresh)
                ]);
                if (!canceled) {
                    log('getToken() completed. Creating connection.');
                    this.authToken_ = authToken && authToken.accessToken;
                    this.appCheckToken_ = appCheckToken && appCheckToken.token;
                    connection = new Connection(connId, this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, onDataMessage, onReady, onDisconnect, 
                    /* onKill= */ reason => {
                        warn(reason + ' (' + this.repoInfo_.toString() + ')');
                        this.interrupt(SERVER_KILL_INTERRUPT_REASON);
                    }, lastSessionId);
                }
                else {
                    log('getToken() completed but was canceled');
                }
            }
            catch (error) {
                this.log_('Failed to get token: ' + error);
                if (!canceled) {
                    if (this.repoInfo_.nodeAdmin) {
                        // This may be a critical error for the Admin Node.js SDK, so log a warning.
                        // But getToken() may also just have temporarily failed, so we still want to
                        // continue retrying.
                        warn(error);
                    }
                    closeFn();
                }
            }
        }
    }
    interrupt(reason) {
        log('Interrupting connection for reason: ' + reason);
        this.interruptReasons_[reason] = true;
        if (this.realtime_) {
            this.realtime_.close();
        }
        else {
            if (this.establishConnectionTimer_) {
                clearTimeout(this.establishConnectionTimer_);
                this.establishConnectionTimer_ = null;
            }
            if (this.connected_) {
                this.onRealtimeDisconnect_();
            }
        }
    }
    resume(reason) {
        log('Resuming connection for reason: ' + reason);
        delete this.interruptReasons_[reason];
        if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(this.interruptReasons_)) {
            this.reconnectDelay_ = RECONNECT_MIN_DELAY;
            if (!this.realtime_) {
                this.scheduleConnect_(0);
            }
        }
    }
    handleTimestamp_(timestamp) {
        const delta = timestamp - new Date().getTime();
        this.onServerInfoUpdate_({ serverTimeOffset: delta });
    }
    cancelSentTransactions_() {
        for (let i = 0; i < this.outstandingPuts_.length; i++) {
            const put = this.outstandingPuts_[i];
            if (put && /*hash*/ 'h' in put.request && put.queued) {
                if (put.onComplete) {
                    put.onComplete('disconnect');
                }
                delete this.outstandingPuts_[i];
                this.outstandingPutCount_--;
            }
        }
        // Clean up array occasionally.
        if (this.outstandingPutCount_ === 0) {
            this.outstandingPuts_ = [];
        }
    }
    onListenRevoked_(pathString, query) {
        // Remove the listen and manufacture a "permission_denied" error for the failed listen.
        let queryId;
        if (!query) {
            queryId = 'default';
        }
        else {
            queryId = query.map(q => ObjectToUniqueKey(q)).join('$');
        }
        const listen = this.removeListen_(pathString, queryId);
        if (listen && listen.onComplete) {
            listen.onComplete('permission_denied');
        }
    }
    removeListen_(pathString, queryId) {
        const normalizedPathString = new Path(pathString).toString(); // normalize path.
        let listen;
        if (this.listens.has(normalizedPathString)) {
            const map = this.listens.get(normalizedPathString);
            listen = map.get(queryId);
            map.delete(queryId);
            if (map.size === 0) {
                this.listens.delete(normalizedPathString);
            }
        }
        else {
            // all listens for this path has already been removed
            listen = undefined;
        }
        return listen;
    }
    onAuthRevoked_(statusCode, explanation) {
        log('Auth token revoked: ' + statusCode + '/' + explanation);
        this.authToken_ = null;
        this.forceTokenRefresh_ = true;
        this.realtime_.close();
        if (statusCode === 'invalid_token' || statusCode === 'permission_denied') {
            // We'll wait a couple times before logging the warning / increasing the
            // retry period since oauth tokens will report as "invalid" if they're
            // just expired. Plus there may be transient issues that resolve themselves.
            this.invalidAuthTokenCount_++;
            if (this.invalidAuthTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
                // Set a long reconnect delay because recovery is unlikely
                this.reconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
                // Notify the auth token provider that the token is invalid, which will log
                // a warning
                this.authTokenProvider_.notifyForInvalidToken();
            }
        }
    }
    onAppCheckRevoked_(statusCode, explanation) {
        log('App check token revoked: ' + statusCode + '/' + explanation);
        this.appCheckToken_ = null;
        this.forceTokenRefresh_ = true;
        // Note: We don't close the connection as the developer may not have
        // enforcement enabled. The backend closes connections with enforcements.
        if (statusCode === 'invalid_token' || statusCode === 'permission_denied') {
            // We'll wait a couple times before logging the warning / increasing the
            // retry period since oauth tokens will report as "invalid" if they're
            // just expired. Plus there may be transient issues that resolve themselves.
            this.invalidAppCheckTokenCount_++;
            if (this.invalidAppCheckTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
                this.appCheckTokenProvider_.notifyForInvalidToken();
            }
        }
    }
    onSecurityDebugPacket_(body) {
        if (this.securityDebugCallback_) {
            this.securityDebugCallback_(body);
        }
        else {
            if ('msg' in body) {
                console.log('FIREBASE: ' + body['msg'].replace('\n', '\nFIREBASE: '));
            }
        }
    }
    restoreState_() {
        //Re-authenticate ourselves if we have a credential stored.
        this.tryAuth();
        this.tryAppCheck();
        // Puts depend on having received the corresponding data update from the server before they complete, so we must
        // make sure to send listens before puts.
        for (const queries of this.listens.values()) {
            for (const listenSpec of queries.values()) {
                this.sendListen_(listenSpec);
            }
        }
        for (let i = 0; i < this.outstandingPuts_.length; i++) {
            if (this.outstandingPuts_[i]) {
                this.sendPut_(i);
            }
        }
        while (this.onDisconnectRequestQueue_.length) {
            const request = this.onDisconnectRequestQueue_.shift();
            this.sendOnDisconnect_(request.action, request.pathString, request.data, request.onComplete);
        }
        for (let i = 0; i < this.outstandingGets_.length; i++) {
            if (this.outstandingGets_[i]) {
                this.sendGet_(i);
            }
        }
    }
    /**
     * Sends client stats for first connection
     */
    sendConnectStats_() {
        const stats = {};
        let clientName = 'js';
        if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isNodeSdk)()) {
            if (this.repoInfo_.nodeAdmin) {
                clientName = 'admin_node';
            }
            else {
                clientName = 'node';
            }
        }
        stats['sdk.' + clientName + '.' + SDK_VERSION.replace(/\./g, '-')] = 1;
        if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isMobileCordova)()) {
            stats['framework.cordova'] = 1;
        }
        else if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isReactNative)()) {
            stats['framework.reactnative'] = 1;
        }
        this.reportStats(stats);
    }
    shouldReconnect_() {
        const online = OnlineMonitor.getInstance().currentlyOnline();
        return (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(this.interruptReasons_) && online;
    }
}
PersistentConnection.nextPersistentConnectionId_ = 0;
/**
 * Counter for number of connections created. Mainly used for tagging in the logs
 */
PersistentConnection.nextConnectionId_ = 0;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class NamedNode {
    constructor(name, node) {
        this.name = name;
        this.node = node;
    }
    static Wrap(name, node) {
        return new NamedNode(name, node);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Index {
    /**
     * @returns A standalone comparison function for
     * this index
     */
    getCompare() {
        return this.compare.bind(this);
    }
    /**
     * Given a before and after value for a node, determine if the indexed value has changed. Even if they are different,
     * it's possible that the changes are isolated to parts of the snapshot that are not indexed.
     *
     *
     * @returns True if the portion of the snapshot being indexed changed between oldNode and newNode
     */
    indexedValueChanged(oldNode, newNode) {
        const oldWrapped = new NamedNode(MIN_NAME, oldNode);
        const newWrapped = new NamedNode(MIN_NAME, newNode);
        return this.compare(oldWrapped, newWrapped) !== 0;
    }
    /**
     * @returns a node wrapper that will sort equal to or less than
     * any other node wrapper, using this index
     */
    minPost() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return NamedNode.MIN;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let __EMPTY_NODE;
class KeyIndex extends Index {
    static get __EMPTY_NODE() {
        return __EMPTY_NODE;
    }
    static set __EMPTY_NODE(val) {
        __EMPTY_NODE = val;
    }
    compare(a, b) {
        return nameCompare(a.name, b.name);
    }
    isDefinedOn(node) {
        // We could probably return true here (since every node has a key), but it's never called
        // so just leaving unimplemented for now.
        throw (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assertionError)('KeyIndex.isDefinedOn not expected to be called.');
    }
    indexedValueChanged(oldNode, newNode) {
        return false; // The key for a node never changes.
    }
    minPost() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return NamedNode.MIN;
    }
    maxPost() {
        // TODO: This should really be created once and cached in a static property, but
        // NamedNode isn't defined yet, so I can't use it in a static.  Bleh.
        return new NamedNode(MAX_NAME, __EMPTY_NODE);
    }
    makePost(indexValue, name) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(typeof indexValue === 'string', 'KeyIndex indexValue must always be a string.');
        // We just use empty node, but it'll never be compared, since our comparator only looks at name.
        return new NamedNode(indexValue, __EMPTY_NODE);
    }
    /**
     * @returns String representation for inclusion in a query spec
     */
    toString() {
        return '.key';
    }
}
const KEY_INDEX = new KeyIndex();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An iterator over an LLRBNode.
 */
class SortedMapIterator {
    /**
     * @param node - Node to iterate.
     * @param isReverse_ - Whether or not to iterate in reverse
     */
    constructor(node, startKey, comparator, isReverse_, resultGenerator_ = null) {
        this.isReverse_ = isReverse_;
        this.resultGenerator_ = resultGenerator_;
        this.nodeStack_ = [];
        let cmp = 1;
        while (!node.isEmpty()) {
            node = node;
            cmp = startKey ? comparator(node.key, startKey) : 1;
            // flip the comparison if we're going in reverse
            if (isReverse_) {
                cmp *= -1;
            }
            if (cmp < 0) {
                // This node is less than our start key. ignore it
                if (this.isReverse_) {
                    node = node.left;
                }
                else {
                    node = node.right;
                }
            }
            else if (cmp === 0) {
                // This node is exactly equal to our start key. Push it on the stack, but stop iterating;
                this.nodeStack_.push(node);
                break;
            }
            else {
                // This node is greater than our start key, add it to the stack and move to the next one
                this.nodeStack_.push(node);
                if (this.isReverse_) {
                    node = node.right;
                }
                else {
                    node = node.left;
                }
            }
        }
    }
    getNext() {
        if (this.nodeStack_.length === 0) {
            return null;
        }
        let node = this.nodeStack_.pop();
        let result;
        if (this.resultGenerator_) {
            result = this.resultGenerator_(node.key, node.value);
        }
        else {
            result = { key: node.key, value: node.value };
        }
        if (this.isReverse_) {
            node = node.left;
            while (!node.isEmpty()) {
                this.nodeStack_.push(node);
                node = node.right;
            }
        }
        else {
            node = node.right;
            while (!node.isEmpty()) {
                this.nodeStack_.push(node);
                node = node.left;
            }
        }
        return result;
    }
    hasNext() {
        return this.nodeStack_.length > 0;
    }
    peek() {
        if (this.nodeStack_.length === 0) {
            return null;
        }
        const node = this.nodeStack_[this.nodeStack_.length - 1];
        if (this.resultGenerator_) {
            return this.resultGenerator_(node.key, node.value);
        }
        else {
            return { key: node.key, value: node.value };
        }
    }
}
/**
 * Represents a node in a Left-leaning Red-Black tree.
 */
class LLRBNode {
    /**
     * @param key - Key associated with this node.
     * @param value - Value associated with this node.
     * @param color - Whether this node is red.
     * @param left - Left child.
     * @param right - Right child.
     */
    constructor(key, value, color, left, right) {
        this.key = key;
        this.value = value;
        this.color = color != null ? color : LLRBNode.RED;
        this.left =
            left != null ? left : SortedMap.EMPTY_NODE;
        this.right =
            right != null ? right : SortedMap.EMPTY_NODE;
    }
    /**
     * Returns a copy of the current node, optionally replacing pieces of it.
     *
     * @param key - New key for the node, or null.
     * @param value - New value for the node, or null.
     * @param color - New color for the node, or null.
     * @param left - New left child for the node, or null.
     * @param right - New right child for the node, or null.
     * @returns The node copy.
     */
    copy(key, value, color, left, right) {
        return new LLRBNode(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
    }
    /**
     * @returns The total number of nodes in the tree.
     */
    count() {
        return this.left.count() + 1 + this.right.count();
    }
    /**
     * @returns True if the tree is empty.
     */
    isEmpty() {
        return false;
    }
    /**
     * Traverses the tree in key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     *   node.  If it returns true, traversal is aborted.
     * @returns The first truthy value returned by action, or the last falsey
     *   value returned by action
     */
    inorderTraversal(action) {
        return (this.left.inorderTraversal(action) ||
            !!action(this.key, this.value) ||
            this.right.inorderTraversal(action));
    }
    /**
     * Traverses the tree in reverse key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @returns True if traversal was aborted.
     */
    reverseTraversal(action) {
        return (this.right.reverseTraversal(action) ||
            action(this.key, this.value) ||
            this.left.reverseTraversal(action));
    }
    /**
     * @returns The minimum node in the tree.
     */
    min_() {
        if (this.left.isEmpty()) {
            return this;
        }
        else {
            return this.left.min_();
        }
    }
    /**
     * @returns The maximum key in the tree.
     */
    minKey() {
        return this.min_().key;
    }
    /**
     * @returns The maximum key in the tree.
     */
    maxKey() {
        if (this.right.isEmpty()) {
            return this.key;
        }
        else {
            return this.right.maxKey();
        }
    }
    /**
     * @param key - Key to insert.
     * @param value - Value to insert.
     * @param comparator - Comparator.
     * @returns New tree, with the key/value added.
     */
    insert(key, value, comparator) {
        let n = this;
        const cmp = comparator(key, n.key);
        if (cmp < 0) {
            n = n.copy(null, null, null, n.left.insert(key, value, comparator), null);
        }
        else if (cmp === 0) {
            n = n.copy(null, value, null, null, null);
        }
        else {
            n = n.copy(null, null, null, null, n.right.insert(key, value, comparator));
        }
        return n.fixUp_();
    }
    /**
     * @returns New tree, with the minimum key removed.
     */
    removeMin_() {
        if (this.left.isEmpty()) {
            return SortedMap.EMPTY_NODE;
        }
        let n = this;
        if (!n.left.isRed_() && !n.left.left.isRed_()) {
            n = n.moveRedLeft_();
        }
        n = n.copy(null, null, null, n.left.removeMin_(), null);
        return n.fixUp_();
    }
    /**
     * @param key - The key of the item to remove.
     * @param comparator - Comparator.
     * @returns New tree, with the specified item removed.
     */
    remove(key, comparator) {
        let n, smallest;
        n = this;
        if (comparator(key, n.key) < 0) {
            if (!n.left.isEmpty() && !n.left.isRed_() && !n.left.left.isRed_()) {
                n = n.moveRedLeft_();
            }
            n = n.copy(null, null, null, n.left.remove(key, comparator), null);
        }
        else {
            if (n.left.isRed_()) {
                n = n.rotateRight_();
            }
            if (!n.right.isEmpty() && !n.right.isRed_() && !n.right.left.isRed_()) {
                n = n.moveRedRight_();
            }
            if (comparator(key, n.key) === 0) {
                if (n.right.isEmpty()) {
                    return SortedMap.EMPTY_NODE;
                }
                else {
                    smallest = n.right.min_();
                    n = n.copy(smallest.key, smallest.value, null, null, n.right.removeMin_());
                }
            }
            n = n.copy(null, null, null, null, n.right.remove(key, comparator));
        }
        return n.fixUp_();
    }
    /**
     * @returns Whether this is a RED node.
     */
    isRed_() {
        return this.color;
    }
    /**
     * @returns New tree after performing any needed rotations.
     */
    fixUp_() {
        let n = this;
        if (n.right.isRed_() && !n.left.isRed_()) {
            n = n.rotateLeft_();
        }
        if (n.left.isRed_() && n.left.left.isRed_()) {
            n = n.rotateRight_();
        }
        if (n.left.isRed_() && n.right.isRed_()) {
            n = n.colorFlip_();
        }
        return n;
    }
    /**
     * @returns New tree, after moveRedLeft.
     */
    moveRedLeft_() {
        let n = this.colorFlip_();
        if (n.right.left.isRed_()) {
            n = n.copy(null, null, null, null, n.right.rotateRight_());
            n = n.rotateLeft_();
            n = n.colorFlip_();
        }
        return n;
    }
    /**
     * @returns New tree, after moveRedRight.
     */
    moveRedRight_() {
        let n = this.colorFlip_();
        if (n.left.left.isRed_()) {
            n = n.rotateRight_();
            n = n.colorFlip_();
        }
        return n;
    }
    /**
     * @returns New tree, after rotateLeft.
     */
    rotateLeft_() {
        const nl = this.copy(null, null, LLRBNode.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, nl, null);
    }
    /**
     * @returns New tree, after rotateRight.
     */
    rotateRight_() {
        const nr = this.copy(null, null, LLRBNode.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, nr);
    }
    /**
     * @returns Newt ree, after colorFlip.
     */
    colorFlip_() {
        const left = this.left.copy(null, null, !this.left.color, null, null);
        const right = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, left, right);
    }
    /**
     * For testing.
     *
     * @returns True if all is well.
     */
    checkMaxDepth_() {
        const blackDepth = this.check_();
        return Math.pow(2.0, blackDepth) <= this.count() + 1;
    }
    check_() {
        if (this.isRed_() && this.left.isRed_()) {
            throw new Error('Red node has red child(' + this.key + ',' + this.value + ')');
        }
        if (this.right.isRed_()) {
            throw new Error('Right child of (' + this.key + ',' + this.value + ') is red');
        }
        const blackDepth = this.left.check_();
        if (blackDepth !== this.right.check_()) {
            throw new Error('Black depths differ');
        }
        else {
            return blackDepth + (this.isRed_() ? 0 : 1);
        }
    }
}
LLRBNode.RED = true;
LLRBNode.BLACK = false;
/**
 * Represents an empty node (a leaf node in the Red-Black Tree).
 */
class LLRBEmptyNode {
    /**
     * Returns a copy of the current node.
     *
     * @returns The node copy.
     */
    copy(key, value, color, left, right) {
        return this;
    }
    /**
     * Returns a copy of the tree, with the specified key/value added.
     *
     * @param key - Key to be added.
     * @param value - Value to be added.
     * @param comparator - Comparator.
     * @returns New tree, with item added.
     */
    insert(key, value, comparator) {
        return new LLRBNode(key, value, null);
    }
    /**
     * Returns a copy of the tree, with the specified key removed.
     *
     * @param key - The key to remove.
     * @param comparator - Comparator.
     * @returns New tree, with item removed.
     */
    remove(key, comparator) {
        return this;
    }
    /**
     * @returns The total number of nodes in the tree.
     */
    count() {
        return 0;
    }
    /**
     * @returns True if the tree is empty.
     */
    isEmpty() {
        return true;
    }
    /**
     * Traverses the tree in key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @returns True if traversal was aborted.
     */
    inorderTraversal(action) {
        return false;
    }
    /**
     * Traverses the tree in reverse key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @returns True if traversal was aborted.
     */
    reverseTraversal(action) {
        return false;
    }
    minKey() {
        return null;
    }
    maxKey() {
        return null;
    }
    check_() {
        return 0;
    }
    /**
     * @returns Whether this node is red.
     */
    isRed_() {
        return false;
    }
}
/**
 * An immutable sorted map implementation, based on a Left-leaning Red-Black
 * tree.
 */
class SortedMap {
    /**
     * @param comparator_ - Key comparator.
     * @param root_ - Optional root node for the map.
     */
    constructor(comparator_, root_ = SortedMap.EMPTY_NODE) {
        this.comparator_ = comparator_;
        this.root_ = root_;
    }
    /**
     * Returns a copy of the map, with the specified key/value added or replaced.
     * (TODO: We should perhaps rename this method to 'put')
     *
     * @param key - Key to be added.
     * @param value - Value to be added.
     * @returns New map, with item added.
     */
    insert(key, value) {
        return new SortedMap(this.comparator_, this.root_
            .insert(key, value, this.comparator_)
            .copy(null, null, LLRBNode.BLACK, null, null));
    }
    /**
     * Returns a copy of the map, with the specified key removed.
     *
     * @param key - The key to remove.
     * @returns New map, with item removed.
     */
    remove(key) {
        return new SortedMap(this.comparator_, this.root_
            .remove(key, this.comparator_)
            .copy(null, null, LLRBNode.BLACK, null, null));
    }
    /**
     * Returns the value of the node with the given key, or null.
     *
     * @param key - The key to look up.
     * @returns The value of the node with the given key, or null if the
     * key doesn't exist.
     */
    get(key) {
        let cmp;
        let node = this.root_;
        while (!node.isEmpty()) {
            cmp = this.comparator_(key, node.key);
            if (cmp === 0) {
                return node.value;
            }
            else if (cmp < 0) {
                node = node.left;
            }
            else if (cmp > 0) {
                node = node.right;
            }
        }
        return null;
    }
    /**
     * Returns the key of the item *before* the specified key, or null if key is the first item.
     * @param key - The key to find the predecessor of
     * @returns The predecessor key.
     */
    getPredecessorKey(key) {
        let cmp, node = this.root_, rightParent = null;
        while (!node.isEmpty()) {
            cmp = this.comparator_(key, node.key);
            if (cmp === 0) {
                if (!node.left.isEmpty()) {
                    node = node.left;
                    while (!node.right.isEmpty()) {
                        node = node.right;
                    }
                    return node.key;
                }
                else if (rightParent) {
                    return rightParent.key;
                }
                else {
                    return null; // first item.
                }
            }
            else if (cmp < 0) {
                node = node.left;
            }
            else if (cmp > 0) {
                rightParent = node;
                node = node.right;
            }
        }
        throw new Error('Attempted to find predecessor key for a nonexistent key.  What gives?');
    }
    /**
     * @returns True if the map is empty.
     */
    isEmpty() {
        return this.root_.isEmpty();
    }
    /**
     * @returns The total number of nodes in the map.
     */
    count() {
        return this.root_.count();
    }
    /**
     * @returns The minimum key in the map.
     */
    minKey() {
        return this.root_.minKey();
    }
    /**
     * @returns The maximum key in the map.
     */
    maxKey() {
        return this.root_.maxKey();
    }
    /**
     * Traverses the map in key order and calls the specified action function
     * for each key/value pair.
     *
     * @param action - Callback function to be called
     * for each key/value pair.  If action returns true, traversal is aborted.
     * @returns The first truthy value returned by action, or the last falsey
     *   value returned by action
     */
    inorderTraversal(action) {
        return this.root_.inorderTraversal(action);
    }
    /**
     * Traverses the map in reverse key order and calls the specified action function
     * for each key/value pair.
     *
     * @param action - Callback function to be called
     * for each key/value pair.  If action returns true, traversal is aborted.
     * @returns True if the traversal was aborted.
     */
    reverseTraversal(action) {
        return this.root_.reverseTraversal(action);
    }
    /**
     * Returns an iterator over the SortedMap.
     * @returns The iterator.
     */
    getIterator(resultGenerator) {
        return new SortedMapIterator(this.root_, null, this.comparator_, false, resultGenerator);
    }
    getIteratorFrom(key, resultGenerator) {
        return new SortedMapIterator(this.root_, key, this.comparator_, false, resultGenerator);
    }
    getReverseIteratorFrom(key, resultGenerator) {
        return new SortedMapIterator(this.root_, key, this.comparator_, true, resultGenerator);
    }
    getReverseIterator(resultGenerator) {
        return new SortedMapIterator(this.root_, null, this.comparator_, true, resultGenerator);
    }
}
/**
 * Always use the same empty node, to reduce memory.
 */
SortedMap.EMPTY_NODE = new LLRBEmptyNode();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function NAME_ONLY_COMPARATOR(left, right) {
    return nameCompare(left.name, right.name);
}
function NAME_COMPARATOR(left, right) {
    return nameCompare(left, right);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let MAX_NODE$2;
function setMaxNode$1(val) {
    MAX_NODE$2 = val;
}
const priorityHashText = function (priority) {
    if (typeof priority === 'number') {
        return 'number:' + doubleToIEEE754String(priority);
    }
    else {
        return 'string:' + priority;
    }
};
/**
 * Validates that a priority snapshot Node is valid.
 */
const validatePriorityNode = function (priorityNode) {
    if (priorityNode.isLeafNode()) {
        const val = priorityNode.val();
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(typeof val === 'string' ||
            typeof val === 'number' ||
            (typeof val === 'object' && (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.contains)(val, '.sv')), 'Priority must be a string or number.');
    }
    else {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(priorityNode === MAX_NODE$2 || priorityNode.isEmpty(), 'priority of unexpected type.');
    }
    // Don't call getPriority() on MAX_NODE to avoid hitting assertion.
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(priorityNode === MAX_NODE$2 || priorityNode.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let __childrenNodeConstructor;
/**
 * LeafNode is a class for storing leaf nodes in a DataSnapshot.  It
 * implements Node and stores the value of the node (a string,
 * number, or boolean) accessible via getValue().
 */
class LeafNode {
    static set __childrenNodeConstructor(val) {
        __childrenNodeConstructor = val;
    }
    static get __childrenNodeConstructor() {
        return __childrenNodeConstructor;
    }
    /**
     * @param value_ - The value to store in this leaf node. The object type is
     * possible in the event of a deferred value
     * @param priorityNode_ - The priority of this node.
     */
    constructor(value_, priorityNode_ = LeafNode.__childrenNodeConstructor.EMPTY_NODE) {
        this.value_ = value_;
        this.priorityNode_ = priorityNode_;
        this.lazyHash_ = null;
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(this.value_ !== undefined && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value.");
        validatePriorityNode(this.priorityNode_);
    }
    /** @inheritDoc */
    isLeafNode() {
        return true;
    }
    /** @inheritDoc */
    getPriority() {
        return this.priorityNode_;
    }
    /** @inheritDoc */
    updatePriority(newPriorityNode) {
        return new LeafNode(this.value_, newPriorityNode);
    }
    /** @inheritDoc */
    getImmediateChild(childName) {
        // Hack to treat priority as a regular child
        if (childName === '.priority') {
            return this.priorityNode_;
        }
        else {
            return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
        }
    }
    /** @inheritDoc */
    getChild(path) {
        if (pathIsEmpty(path)) {
            return this;
        }
        else if (pathGetFront(path) === '.priority') {
            return this.priorityNode_;
        }
        else {
            return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
        }
    }
    hasChild() {
        return false;
    }
    /** @inheritDoc */
    getPredecessorChildName(childName, childNode) {
        return null;
    }
    /** @inheritDoc */
    updateImmediateChild(childName, newChildNode) {
        if (childName === '.priority') {
            return this.updatePriority(newChildNode);
        }
        else if (newChildNode.isEmpty() && childName !== '.priority') {
            return this;
        }
        else {
            return LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(childName, newChildNode).updatePriority(this.priorityNode_);
        }
    }
    /** @inheritDoc */
    updateChild(path, newChildNode) {
        const front = pathGetFront(path);
        if (front === null) {
            return newChildNode;
        }
        else if (newChildNode.isEmpty() && front !== '.priority') {
            return this;
        }
        else {
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(front !== '.priority' || pathGetLength(path) === 1, '.priority must be the last token in a path');
            return this.updateImmediateChild(front, LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateChild(pathPopFront(path), newChildNode));
        }
    }
    /** @inheritDoc */
    isEmpty() {
        return false;
    }
    /** @inheritDoc */
    numChildren() {
        return 0;
    }
    /** @inheritDoc */
    forEachChild(index, action) {
        return false;
    }
    val(exportFormat) {
        if (exportFormat && !this.getPriority().isEmpty()) {
            return {
                '.value': this.getValue(),
                '.priority': this.getPriority().val()
            };
        }
        else {
            return this.getValue();
        }
    }
    /** @inheritDoc */
    hash() {
        if (this.lazyHash_ === null) {
            let toHash = '';
            if (!this.priorityNode_.isEmpty()) {
                toHash +=
                    'priority:' +
                        priorityHashText(this.priorityNode_.val()) +
                        ':';
            }
            const type = typeof this.value_;
            toHash += type + ':';
            if (type === 'number') {
                toHash += doubleToIEEE754String(this.value_);
            }
            else {
                toHash += this.value_;
            }
            this.lazyHash_ = sha1(toHash);
        }
        return this.lazyHash_;
    }
    /**
     * Returns the value of the leaf node.
     * @returns The value of the node.
     */
    getValue() {
        return this.value_;
    }
    compareTo(other) {
        if (other === LeafNode.__childrenNodeConstructor.EMPTY_NODE) {
            return 1;
        }
        else if (other instanceof LeafNode.__childrenNodeConstructor) {
            return -1;
        }
        else {
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(other.isLeafNode(), 'Unknown node type');
            return this.compareToLeafNode_(other);
        }
    }
    /**
     * Comparison specifically for two leaf nodes
     */
    compareToLeafNode_(otherLeaf) {
        const otherLeafType = typeof otherLeaf.value_;
        const thisLeafType = typeof this.value_;
        const otherIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(otherLeafType);
        const thisIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(thisLeafType);
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(otherIndex >= 0, 'Unknown leaf type: ' + otherLeafType);
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(thisIndex >= 0, 'Unknown leaf type: ' + thisLeafType);
        if (otherIndex === thisIndex) {
            // Same type, compare values
            if (thisLeafType === 'object') {
                // Deferred value nodes are all equal, but we should also never get to this point...
                return 0;
            }
            else {
                // Note that this works because true > false, all others are number or string comparisons
                if (this.value_ < otherLeaf.value_) {
                    return -1;
                }
                else if (this.value_ === otherLeaf.value_) {
                    return 0;
                }
                else {
                    return 1;
                }
            }
        }
        else {
            return thisIndex - otherIndex;
        }
    }
    withIndex() {
        return this;
    }
    isIndexed() {
        return true;
    }
    equals(other) {
        if (other === this) {
            return true;
        }
        else if (other.isLeafNode()) {
            const otherLeaf = other;
            return (this.value_ === otherLeaf.value_ &&
                this.priorityNode_.equals(otherLeaf.priorityNode_));
        }
        else {
            return false;
        }
    }
}
/**
 * The sort order for comparing leaf nodes of different types. If two leaf nodes have
 * the same type, the comparison falls back to their value
 */
LeafNode.VALUE_TYPE_ORDER = ['object', 'boolean', 'number', 'string'];

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let nodeFromJSON$1;
let MAX_NODE$1;
function setNodeFromJSON(val) {
    nodeFromJSON$1 = val;
}
function setMaxNode(val) {
    MAX_NODE$1 = val;
}
class PriorityIndex extends Index {
    compare(a, b) {
        const aPriority = a.node.getPriority();
        const bPriority = b.node.getPriority();
        const indexCmp = aPriority.compareTo(bPriority);
        if (indexCmp === 0) {
            return nameCompare(a.name, b.name);
        }
        else {
            return indexCmp;
        }
    }
    isDefinedOn(node) {
        return !node.getPriority().isEmpty();
    }
    indexedValueChanged(oldNode, newNode) {
        return !oldNode.getPriority().equals(newNode.getPriority());
    }
    minPost() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return NamedNode.MIN;
    }
    maxPost() {
        return new NamedNode(MAX_NAME, new LeafNode('[PRIORITY-POST]', MAX_NODE$1));
    }
    makePost(indexValue, name) {
        const priorityNode = nodeFromJSON$1(indexValue);
        return new NamedNode(name, new LeafNode('[PRIORITY-POST]', priorityNode));
    }
    /**
     * @returns String representation for inclusion in a query spec
     */
    toString() {
        return '.priority';
    }
}
const PRIORITY_INDEX = new PriorityIndex();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const LOG_2 = Math.log(2);
class Base12Num {
    constructor(length) {
        const logBase2 = (num) => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parseInt((Math.log(num) / LOG_2), 10);
        const bitMask = (bits) => parseInt(Array(bits + 1).join('1'), 2);
        this.count = logBase2(length + 1);
        this.current_ = this.count - 1;
        const mask = bitMask(this.count);
        this.bits_ = (length + 1) & mask;
    }
    nextBitIsOne() {
        //noinspection JSBitwiseOperatorUsage
        const result = !(this.bits_ & (0x1 << this.current_));
        this.current_--;
        return result;
    }
}
/**
 * Takes a list of child nodes and constructs a SortedSet using the given comparison
 * function
 *
 * Uses the algorithm described in the paper linked here:
 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.46.1458
 *
 * @param childList - Unsorted list of children
 * @param cmp - The comparison method to be used
 * @param keyFn - An optional function to extract K from a node wrapper, if K's
 * type is not NamedNode
 * @param mapSortFn - An optional override for comparator used by the generated sorted map
 */
const buildChildSet = function (childList, cmp, keyFn, mapSortFn) {
    childList.sort(cmp);
    const buildBalancedTree = function (low, high) {
        const length = high - low;
        let namedNode;
        let key;
        if (length === 0) {
            return null;
        }
        else if (length === 1) {
            namedNode = childList[low];
            key = keyFn ? keyFn(namedNode) : namedNode;
            return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, null, null);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const middle = parseInt((length / 2), 10) + low;
            const left = buildBalancedTree(low, middle);
            const right = buildBalancedTree(middle + 1, high);
            namedNode = childList[middle];
            key = keyFn ? keyFn(namedNode) : namedNode;
            return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, left, right);
        }
    };
    const buildFrom12Array = function (base12) {
        let node = null;
        let root = null;
        let index = childList.length;
        const buildPennant = function (chunkSize, color) {
            const low = index - chunkSize;
            const high = index;
            index -= chunkSize;
            const childTree = buildBalancedTree(low + 1, high);
            const namedNode = childList[low];
            const key = keyFn ? keyFn(namedNode) : namedNode;
            attachPennant(new LLRBNode(key, namedNode.node, color, null, childTree));
        };
        const attachPennant = function (pennant) {
            if (node) {
                node.left = pennant;
                node = pennant;
            }
            else {
                root = pennant;
                node = pennant;
            }
        };
        for (let i = 0; i < base12.count; ++i) {
            const isOne = base12.nextBitIsOne();
            // The number of nodes taken in each slice is 2^(arr.length - (i + 1))
            const chunkSize = Math.pow(2, base12.count - (i + 1));
            if (isOne) {
                buildPennant(chunkSize, LLRBNode.BLACK);
            }
            else {
                // current == 2
                buildPennant(chunkSize, LLRBNode.BLACK);
                buildPennant(chunkSize, LLRBNode.RED);
            }
        }
        return root;
    };
    const base12 = new Base12Num(childList.length);
    const root = buildFrom12Array(base12);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new SortedMap(mapSortFn || cmp, root);
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let _defaultIndexMap;
const fallbackObject = {};
class IndexMap {
    /**
     * The default IndexMap for nodes without a priority
     */
    static get Default() {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(fallbackObject && PRIORITY_INDEX, 'ChildrenNode.ts has not been loaded');
        _defaultIndexMap =
            _defaultIndexMap ||
                new IndexMap({ '.priority': fallbackObject }, { '.priority': PRIORITY_INDEX });
        return _defaultIndexMap;
    }
    constructor(indexes_, indexSet_) {
        this.indexes_ = indexes_;
        this.indexSet_ = indexSet_;
    }
    get(indexKey) {
        const sortedMap = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.safeGet)(this.indexes_, indexKey);
        if (!sortedMap) {
            throw new Error('No index defined for ' + indexKey);
        }
        if (sortedMap instanceof SortedMap) {
            return sortedMap;
        }
        else {
            // The index exists, but it falls back to just name comparison. Return null so that the calling code uses the
            // regular child map
            return null;
        }
    }
    hasIndex(indexDefinition) {
        return (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.contains)(this.indexSet_, indexDefinition.toString());
    }
    addIndex(indexDefinition, existingChildren) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(indexDefinition !== KEY_INDEX, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
        const childList = [];
        let sawIndexedValue = false;
        const iter = existingChildren.getIterator(NamedNode.Wrap);
        let next = iter.getNext();
        while (next) {
            sawIndexedValue =
                sawIndexedValue || indexDefinition.isDefinedOn(next.node);
            childList.push(next);
            next = iter.getNext();
        }
        let newIndex;
        if (sawIndexedValue) {
            newIndex = buildChildSet(childList, indexDefinition.getCompare());
        }
        else {
            newIndex = fallbackObject;
        }
        const indexName = indexDefinition.toString();
        const newIndexSet = Object.assign({}, this.indexSet_);
        newIndexSet[indexName] = indexDefinition;
        const newIndexes = Object.assign({}, this.indexes_);
        newIndexes[indexName] = newIndex;
        return new IndexMap(newIndexes, newIndexSet);
    }
    /**
     * Ensure that this node is properly tracked in any indexes that we're maintaining
     */
    addToIndexes(namedNode, existingChildren) {
        const newIndexes = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.map)(this.indexes_, (indexedChildren, indexName) => {
            const index = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.safeGet)(this.indexSet_, indexName);
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(index, 'Missing index implementation for ' + indexName);
            if (indexedChildren === fallbackObject) {
                // Check to see if we need to index everything
                if (index.isDefinedOn(namedNode.node)) {
                    // We need to build this index
                    const childList = [];
                    const iter = existingChildren.getIterator(NamedNode.Wrap);
                    let next = iter.getNext();
                    while (next) {
                        if (next.name !== namedNode.name) {
                            childList.push(next);
                        }
                        next = iter.getNext();
                    }
                    childList.push(namedNode);
                    return buildChildSet(childList, index.getCompare());
                }
                else {
                    // No change, this remains a fallback
                    return fallbackObject;
                }
            }
            else {
                const existingSnap = existingChildren.get(namedNode.name);
                let newChildren = indexedChildren;
                if (existingSnap) {
                    newChildren = newChildren.remove(new NamedNode(namedNode.name, existingSnap));
                }
                return newChildren.insert(namedNode, namedNode.node);
            }
        });
        return new IndexMap(newIndexes, this.indexSet_);
    }
    /**
     * Create a new IndexMap instance with the given value removed
     */
    removeFromIndexes(namedNode, existingChildren) {
        const newIndexes = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.map)(this.indexes_, (indexedChildren) => {
            if (indexedChildren === fallbackObject) {
                // This is the fallback. Just return it, nothing to do in this case
                return indexedChildren;
            }
            else {
                const existingSnap = existingChildren.get(namedNode.name);
                if (existingSnap) {
                    return indexedChildren.remove(new NamedNode(namedNode.name, existingSnap));
                }
                else {
                    // No record of this child
                    return indexedChildren;
                }
            }
        });
        return new IndexMap(newIndexes, this.indexSet_);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// TODO: For memory savings, don't store priorityNode_ if it's empty.
let EMPTY_NODE;
/**
 * ChildrenNode is a class for storing internal nodes in a DataSnapshot
 * (i.e. nodes with children).  It implements Node and stores the
 * list of children in the children property, sorted by child name.
 */
class ChildrenNode {
    static get EMPTY_NODE() {
        return (EMPTY_NODE ||
            (EMPTY_NODE = new ChildrenNode(new SortedMap(NAME_COMPARATOR), null, IndexMap.Default)));
    }
    /**
     * @param children_ - List of children of this node..
     * @param priorityNode_ - The priority of this node (as a snapshot node).
     */
    constructor(children_, priorityNode_, indexMap_) {
        this.children_ = children_;
        this.priorityNode_ = priorityNode_;
        this.indexMap_ = indexMap_;
        this.lazyHash_ = null;
        /**
         * Note: The only reason we allow null priority is for EMPTY_NODE, since we can't use
         * EMPTY_NODE as the priority of EMPTY_NODE.  We might want to consider making EMPTY_NODE its own
         * class instead of an empty ChildrenNode.
         */
        if (this.priorityNode_) {
            validatePriorityNode(this.priorityNode_);
        }
        if (this.children_.isEmpty()) {
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(!this.priorityNode_ || this.priorityNode_.isEmpty(), 'An empty node cannot have a priority');
        }
    }
    /** @inheritDoc */
    isLeafNode() {
        return false;
    }
    /** @inheritDoc */
    getPriority() {
        return this.priorityNode_ || EMPTY_NODE;
    }
    /** @inheritDoc */
    updatePriority(newPriorityNode) {
        if (this.children_.isEmpty()) {
            // Don't allow priorities on empty nodes
            return this;
        }
        else {
            return new ChildrenNode(this.children_, newPriorityNode, this.indexMap_);
        }
    }
    /** @inheritDoc */
    getImmediateChild(childName) {
        // Hack to treat priority as a regular child
        if (childName === '.priority') {
            return this.getPriority();
        }
        else {
            const child = this.children_.get(childName);
            return child === null ? EMPTY_NODE : child;
        }
    }
    /** @inheritDoc */
    getChild(path) {
        const front = pathGetFront(path);
        if (front === null) {
            return this;
        }
        return this.getImmediateChild(front).getChild(pathPopFront(path));
    }
    /** @inheritDoc */
    hasChild(childName) {
        return this.children_.get(childName) !== null;
    }
    /** @inheritDoc */
    updateImmediateChild(childName, newChildNode) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(newChildNode, 'We should always be passing snapshot nodes');
        if (childName === '.priority') {
            return this.updatePriority(newChildNode);
        }
        else {
            const namedNode = new NamedNode(childName, newChildNode);
            let newChildren, newIndexMap;
            if (newChildNode.isEmpty()) {
                newChildren = this.children_.remove(childName);
                newIndexMap = this.indexMap_.removeFromIndexes(namedNode, this.children_);
            }
            else {
                newChildren = this.children_.insert(childName, newChildNode);
                newIndexMap = this.indexMap_.addToIndexes(namedNode, this.children_);
            }
            const newPriority = newChildren.isEmpty()
                ? EMPTY_NODE
                : this.priorityNode_;
            return new ChildrenNode(newChildren, newPriority, newIndexMap);
        }
    }
    /** @inheritDoc */
    updateChild(path, newChildNode) {
        const front = pathGetFront(path);
        if (front === null) {
            return newChildNode;
        }
        else {
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(pathGetFront(path) !== '.priority' || pathGetLength(path) === 1, '.priority must be the last token in a path');
            const newImmediateChild = this.getImmediateChild(front).updateChild(pathPopFront(path), newChildNode);
            return this.updateImmediateChild(front, newImmediateChild);
        }
    }
    /** @inheritDoc */
    isEmpty() {
        return this.children_.isEmpty();
    }
    /** @inheritDoc */
    numChildren() {
        return this.children_.count();
    }
    /** @inheritDoc */
    val(exportFormat) {
        if (this.isEmpty()) {
            return null;
        }
        const obj = {};
        let numKeys = 0, maxKey = 0, allIntegerKeys = true;
        this.forEachChild(PRIORITY_INDEX, (key, childNode) => {
            obj[key] = childNode.val(exportFormat);
            numKeys++;
            if (allIntegerKeys && ChildrenNode.INTEGER_REGEXP_.test(key)) {
                maxKey = Math.max(maxKey, Number(key));
            }
            else {
                allIntegerKeys = false;
            }
        });
        if (!exportFormat && allIntegerKeys && maxKey < 2 * numKeys) {
            // convert to array.
            const array = [];
            // eslint-disable-next-line guard-for-in
            for (const key in obj) {
                array[key] = obj[key];
            }
            return array;
        }
        else {
            if (exportFormat && !this.getPriority().isEmpty()) {
                obj['.priority'] = this.getPriority().val();
            }
            return obj;
        }
    }
    /** @inheritDoc */
    hash() {
        if (this.lazyHash_ === null) {
            let toHash = '';
            if (!this.getPriority().isEmpty()) {
                toHash +=
                    'priority:' +
                        priorityHashText(this.getPriority().val()) +
                        ':';
            }
            this.forEachChild(PRIORITY_INDEX, (key, childNode) => {
                const childHash = childNode.hash();
                if (childHash !== '') {
                    toHash += ':' + key + ':' + childHash;
                }
            });
            this.lazyHash_ = toHash === '' ? '' : sha1(toHash);
        }
        return this.lazyHash_;
    }
    /** @inheritDoc */
    getPredecessorChildName(childName, childNode, index) {
        const idx = this.resolveIndex_(index);
        if (idx) {
            const predecessor = idx.getPredecessorKey(new NamedNode(childName, childNode));
            return predecessor ? predecessor.name : null;
        }
        else {
            return this.children_.getPredecessorKey(childName);
        }
    }
    getFirstChildName(indexDefinition) {
        const idx = this.resolveIndex_(indexDefinition);
        if (idx) {
            const minKey = idx.minKey();
            return minKey && minKey.name;
        }
        else {
            return this.children_.minKey();
        }
    }
    getFirstChild(indexDefinition) {
        const minKey = this.getFirstChildName(indexDefinition);
        if (minKey) {
            return new NamedNode(minKey, this.children_.get(minKey));
        }
        else {
            return null;
        }
    }
    /**
     * Given an index, return the key name of the largest value we have, according to that index
     */
    getLastChildName(indexDefinition) {
        const idx = this.resolveIndex_(indexDefinition);
        if (idx) {
            const maxKey = idx.maxKey();
            return maxKey && maxKey.name;
        }
        else {
            return this.children_.maxKey();
        }
    }
    getLastChild(indexDefinition) {
        const maxKey = this.getLastChildName(indexDefinition);
        if (maxKey) {
            return new NamedNode(maxKey, this.children_.get(maxKey));
        }
        else {
            return null;
        }
    }
    forEachChild(index, action) {
        const idx = this.resolveIndex_(index);
        if (idx) {
            return idx.inorderTraversal(wrappedNode => {
                return action(wrappedNode.name, wrappedNode.node);
            });
        }
        else {
            return this.children_.inorderTraversal(action);
        }
    }
    getIterator(indexDefinition) {
        return this.getIteratorFrom(indexDefinition.minPost(), indexDefinition);
    }
    getIteratorFrom(startPost, indexDefinition) {
        const idx = this.resolveIndex_(indexDefinition);
        if (idx) {
            return idx.getIteratorFrom(startPost, key => key);
        }
        else {
            const iterator = this.children_.getIteratorFrom(startPost.name, NamedNode.Wrap);
            let next = iterator.peek();
            while (next != null && indexDefinition.compare(next, startPost) < 0) {
                iterator.getNext();
                next = iterator.peek();
            }
            return iterator;
        }
    }
    getReverseIterator(indexDefinition) {
        return this.getReverseIteratorFrom(indexDefinition.maxPost(), indexDefinition);
    }
    getReverseIteratorFrom(endPost, indexDefinition) {
        const idx = this.resolveIndex_(indexDefinition);
        if (idx) {
            return idx.getReverseIteratorFrom(endPost, key => {
                return key;
            });
        }
        else {
            const iterator = this.children_.getReverseIteratorFrom(endPost.name, NamedNode.Wrap);
            let next = iterator.peek();
            while (next != null && indexDefinition.compare(next, endPost) > 0) {
                iterator.getNext();
                next = iterator.peek();
            }
            return iterator;
        }
    }
    compareTo(other) {
        if (this.isEmpty()) {
            if (other.isEmpty()) {
                return 0;
            }
            else {
                return -1;
            }
        }
        else if (other.isLeafNode() || other.isEmpty()) {
            return 1;
        }
        else if (other === MAX_NODE) {
            return -1;
        }
        else {
            // Must be another node with children.
            return 0;
        }
    }
    withIndex(indexDefinition) {
        if (indexDefinition === KEY_INDEX ||
            this.indexMap_.hasIndex(indexDefinition)) {
            return this;
        }
        else {
            const newIndexMap = this.indexMap_.addIndex(indexDefinition, this.children_);
            return new ChildrenNode(this.children_, this.priorityNode_, newIndexMap);
        }
    }
    isIndexed(index) {
        return index === KEY_INDEX || this.indexMap_.hasIndex(index);
    }
    equals(other) {
        if (other === this) {
            return true;
        }
        else if (other.isLeafNode()) {
            return false;
        }
        else {
            const otherChildrenNode = other;
            if (!this.getPriority().equals(otherChildrenNode.getPriority())) {
                return false;
            }
            else if (this.children_.count() === otherChildrenNode.children_.count()) {
                const thisIter = this.getIterator(PRIORITY_INDEX);
                const otherIter = otherChildrenNode.getIterator(PRIORITY_INDEX);
                let thisCurrent = thisIter.getNext();
                let otherCurrent = otherIter.getNext();
                while (thisCurrent && otherCurrent) {
                    if (thisCurrent.name !== otherCurrent.name ||
                        !thisCurrent.node.equals(otherCurrent.node)) {
                        return false;
                    }
                    thisCurrent = thisIter.getNext();
                    otherCurrent = otherIter.getNext();
                }
                return thisCurrent === null && otherCurrent === null;
            }
            else {
                return false;
            }
        }
    }
    /**
     * Returns a SortedMap ordered by index, or null if the default (by-key) ordering can be used
     * instead.
     *
     */
    resolveIndex_(indexDefinition) {
        if (indexDefinition === KEY_INDEX) {
            return null;
        }
        else {
            return this.indexMap_.get(indexDefinition.toString());
        }
    }
}
ChildrenNode.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
class MaxNode extends ChildrenNode {
    constructor() {
        super(new SortedMap(NAME_COMPARATOR), ChildrenNode.EMPTY_NODE, IndexMap.Default);
    }
    compareTo(other) {
        if (other === this) {
            return 0;
        }
        else {
            return 1;
        }
    }
    equals(other) {
        // Not that we every compare it, but MAX_NODE is only ever equal to itself
        return other === this;
    }
    getPriority() {
        return this;
    }
    getImmediateChild(childName) {
        return ChildrenNode.EMPTY_NODE;
    }
    isEmpty() {
        return false;
    }
}
/**
 * Marker that will sort higher than any other snapshot.
 */
const MAX_NODE = new MaxNode();
Object.defineProperties(NamedNode, {
    MIN: {
        value: new NamedNode(MIN_NAME, ChildrenNode.EMPTY_NODE)
    },
    MAX: {
        value: new NamedNode(MAX_NAME, MAX_NODE)
    }
});
/**
 * Reference Extensions
 */
KeyIndex.__EMPTY_NODE = ChildrenNode.EMPTY_NODE;
LeafNode.__childrenNodeConstructor = ChildrenNode;
setMaxNode$1(MAX_NODE);
setMaxNode(MAX_NODE);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const USE_HINZE = true;
/**
 * Constructs a snapshot node representing the passed JSON and returns it.
 * @param json - JSON to create a node for.
 * @param priority - Optional priority to use.  This will be ignored if the
 * passed JSON contains a .priority property.
 */
function nodeFromJSON(json, priority = null) {
    if (json === null) {
        return ChildrenNode.EMPTY_NODE;
    }
    if (typeof json === 'object' && '.priority' in json) {
        priority = json['.priority'];
    }
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(priority === null ||
        typeof priority === 'string' ||
        typeof priority === 'number' ||
        (typeof priority === 'object' && '.sv' in priority), 'Invalid priority type found: ' + typeof priority);
    if (typeof json === 'object' && '.value' in json && json['.value'] !== null) {
        json = json['.value'];
    }
    // Valid leaf nodes include non-objects or server-value wrapper objects
    if (typeof json !== 'object' || '.sv' in json) {
        const jsonLeaf = json;
        return new LeafNode(jsonLeaf, nodeFromJSON(priority));
    }
    if (!(json instanceof Array) && USE_HINZE) {
        const children = [];
        let childrenHavePriority = false;
        const hinzeJsonObj = json;
        each(hinzeJsonObj, (key, child) => {
            if (key.substring(0, 1) !== '.') {
                // Ignore metadata nodes
                const childNode = nodeFromJSON(child);
                if (!childNode.isEmpty()) {
                    childrenHavePriority =
                        childrenHavePriority || !childNode.getPriority().isEmpty();
                    children.push(new NamedNode(key, childNode));
                }
            }
        });
        if (children.length === 0) {
            return ChildrenNode.EMPTY_NODE;
        }
        const childSet = buildChildSet(children, NAME_ONLY_COMPARATOR, namedNode => namedNode.name, NAME_COMPARATOR);
        if (childrenHavePriority) {
            const sortedChildSet = buildChildSet(children, PRIORITY_INDEX.getCompare());
            return new ChildrenNode(childSet, nodeFromJSON(priority), new IndexMap({ '.priority': sortedChildSet }, { '.priority': PRIORITY_INDEX }));
        }
        else {
            return new ChildrenNode(childSet, nodeFromJSON(priority), IndexMap.Default);
        }
    }
    else {
        let node = ChildrenNode.EMPTY_NODE;
        each(json, (key, childData) => {
            if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.contains)(json, key)) {
                if (key.substring(0, 1) !== '.') {
                    // ignore metadata nodes.
                    const childNode = nodeFromJSON(childData);
                    if (childNode.isLeafNode() || !childNode.isEmpty()) {
                        node = node.updateImmediateChild(key, childNode);
                    }
                }
            }
        });
        return node.updatePriority(nodeFromJSON(priority));
    }
}
setNodeFromJSON(nodeFromJSON);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PathIndex extends Index {
    constructor(indexPath_) {
        super();
        this.indexPath_ = indexPath_;
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(!pathIsEmpty(indexPath_) && pathGetFront(indexPath_) !== '.priority', "Can't create PathIndex with empty path or .priority key");
    }
    extractChild(snap) {
        return snap.getChild(this.indexPath_);
    }
    isDefinedOn(node) {
        return !node.getChild(this.indexPath_).isEmpty();
    }
    compare(a, b) {
        const aChild = this.extractChild(a.node);
        const bChild = this.extractChild(b.node);
        const indexCmp = aChild.compareTo(bChild);
        if (indexCmp === 0) {
            return nameCompare(a.name, b.name);
        }
        else {
            return indexCmp;
        }
    }
    makePost(indexValue, name) {
        const valueNode = nodeFromJSON(indexValue);
        const node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, valueNode);
        return new NamedNode(name, node);
    }
    maxPost() {
        const node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, MAX_NODE);
        return new NamedNode(MAX_NAME, node);
    }
    toString() {
        return pathSlice(this.indexPath_, 0).join('/');
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ValueIndex extends Index {
    compare(a, b) {
        const indexCmp = a.node.compareTo(b.node);
        if (indexCmp === 0) {
            return nameCompare(a.name, b.name);
        }
        else {
            return indexCmp;
        }
    }
    isDefinedOn(node) {
        return true;
    }
    indexedValueChanged(oldNode, newNode) {
        return !oldNode.equals(newNode);
    }
    minPost() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return NamedNode.MIN;
    }
    maxPost() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return NamedNode.MAX;
    }
    makePost(indexValue, name) {
        const valueNode = nodeFromJSON(indexValue);
        return new NamedNode(name, valueNode);
    }
    /**
     * @returns String representation for inclusion in a query spec
     */
    toString() {
        return '.value';
    }
}
const VALUE_INDEX = new ValueIndex();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function changeValue(snapshotNode) {
    return { type: "value" /* ChangeType.VALUE */, snapshotNode };
}
function changeChildAdded(childName, snapshotNode) {
    return { type: "child_added" /* ChangeType.CHILD_ADDED */, snapshotNode, childName };
}
function changeChildRemoved(childName, snapshotNode) {
    return { type: "child_removed" /* ChangeType.CHILD_REMOVED */, snapshotNode, childName };
}
function changeChildChanged(childName, snapshotNode, oldSnap) {
    return {
        type: "child_changed" /* ChangeType.CHILD_CHANGED */,
        snapshotNode,
        childName,
        oldSnap
    };
}
function changeChildMoved(childName, snapshotNode) {
    return { type: "child_moved" /* ChangeType.CHILD_MOVED */, snapshotNode, childName };
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Doesn't really filter nodes but applies an index to the node and keeps track of any changes
 */
class IndexedFilter {
    constructor(index_) {
        this.index_ = index_;
    }
    updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(snap.isIndexed(this.index_), 'A node must be indexed if only a child is updated');
        const oldChild = snap.getImmediateChild(key);
        // Check if anything actually changed.
        if (oldChild.getChild(affectedPath).equals(newChild.getChild(affectedPath))) {
            // There's an edge case where a child can enter or leave the view because affectedPath was set to null.
            // In this case, affectedPath will appear null in both the old and new snapshots.  So we need
            // to avoid treating these cases as "nothing changed."
            if (oldChild.isEmpty() === newChild.isEmpty()) {
                // Nothing changed.
                // This assert should be valid, but it's expensive (can dominate perf testing) so don't actually do it.
                //assert(oldChild.equals(newChild), 'Old and new snapshots should be equal.');
                return snap;
            }
        }
        if (optChangeAccumulator != null) {
            if (newChild.isEmpty()) {
                if (snap.hasChild(key)) {
                    optChangeAccumulator.trackChildChange(changeChildRemoved(key, oldChild));
                }
                else {
                    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(snap.isLeafNode(), 'A child remove without an old child only makes sense on a leaf node');
                }
            }
            else if (oldChild.isEmpty()) {
                optChangeAccumulator.trackChildChange(changeChildAdded(key, newChild));
            }
            else {
                optChangeAccumulator.trackChildChange(changeChildChanged(key, newChild, oldChild));
            }
        }
        if (snap.isLeafNode() && newChild.isEmpty()) {
            return snap;
        }
        else {
            // Make sure the node is indexed
            return snap.updateImmediateChild(key, newChild).withIndex(this.index_);
        }
    }
    updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
        if (optChangeAccumulator != null) {
            if (!oldSnap.isLeafNode()) {
                oldSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
                    if (!newSnap.hasChild(key)) {
                        optChangeAccumulator.trackChildChange(changeChildRemoved(key, childNode));
                    }
                });
            }
            if (!newSnap.isLeafNode()) {
                newSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
                    if (oldSnap.hasChild(key)) {
                        const oldChild = oldSnap.getImmediateChild(key);
                        if (!oldChild.equals(childNode)) {
                            optChangeAccumulator.trackChildChange(changeChildChanged(key, childNode, oldChild));
                        }
                    }
                    else {
                        optChangeAccumulator.trackChildChange(changeChildAdded(key, childNode));
                    }
                });
            }
        }
        return newSnap.withIndex(this.index_);
    }
    updatePriority(oldSnap, newPriority) {
        if (oldSnap.isEmpty()) {
            return ChildrenNode.EMPTY_NODE;
        }
        else {
            return oldSnap.updatePriority(newPriority);
        }
    }
    filtersNodes() {
        return false;
    }
    getIndexedFilter() {
        return this;
    }
    getIndex() {
        return this.index_;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Filters nodes by range and uses an IndexFilter to track any changes after filtering the node
 */
class RangedFilter {
    constructor(params) {
        this.indexedFilter_ = new IndexedFilter(params.getIndex());
        this.index_ = params.getIndex();
        this.startPost_ = RangedFilter.getStartPost_(params);
        this.endPost_ = RangedFilter.getEndPost_(params);
        this.startIsInclusive_ = !params.startAfterSet_;
        this.endIsInclusive_ = !params.endBeforeSet_;
    }
    getStartPost() {
        return this.startPost_;
    }
    getEndPost() {
        return this.endPost_;
    }
    matches(node) {
        const isWithinStart = this.startIsInclusive_
            ? this.index_.compare(this.getStartPost(), node) <= 0
            : this.index_.compare(this.getStartPost(), node) < 0;
        const isWithinEnd = this.endIsInclusive_
            ? this.index_.compare(node, this.getEndPost()) <= 0
            : this.index_.compare(node, this.getEndPost()) < 0;
        return isWithinStart && isWithinEnd;
    }
    updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
        if (!this.matches(new NamedNode(key, newChild))) {
            newChild = ChildrenNode.EMPTY_NODE;
        }
        return this.indexedFilter_.updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
    }
    updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
        if (newSnap.isLeafNode()) {
            // Make sure we have a children node with the correct index, not a leaf node;
            newSnap = ChildrenNode.EMPTY_NODE;
        }
        let filtered = newSnap.withIndex(this.index_);
        // Don't support priorities on queries
        filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
        const self = this;
        newSnap.forEachChild(PRIORITY_INDEX, (key, childNode) => {
            if (!self.matches(new NamedNode(key, childNode))) {
                filtered = filtered.updateImmediateChild(key, ChildrenNode.EMPTY_NODE);
            }
        });
        return this.indexedFilter_.updateFullNode(oldSnap, filtered, optChangeAccumulator);
    }
    updatePriority(oldSnap, newPriority) {
        // Don't support priorities on queries
        return oldSnap;
    }
    filtersNodes() {
        return true;
    }
    getIndexedFilter() {
        return this.indexedFilter_;
    }
    getIndex() {
        return this.index_;
    }
    static getStartPost_(params) {
        if (params.hasStart()) {
            const startName = params.getIndexStartName();
            return params.getIndex().makePost(params.getIndexStartValue(), startName);
        }
        else {
            return params.getIndex().minPost();
        }
    }
    static getEndPost_(params) {
        if (params.hasEnd()) {
            const endName = params.getIndexEndName();
            return params.getIndex().makePost(params.getIndexEndValue(), endName);
        }
        else {
            return params.getIndex().maxPost();
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Applies a limit and a range to a node and uses RangedFilter to do the heavy lifting where possible
 */
class LimitedFilter {
    constructor(params) {
        this.withinDirectionalStart = (node) => this.reverse_ ? this.withinEndPost(node) : this.withinStartPost(node);
        this.withinDirectionalEnd = (node) => this.reverse_ ? this.withinStartPost(node) : this.withinEndPost(node);
        this.withinStartPost = (node) => {
            const compareRes = this.index_.compare(this.rangedFilter_.getStartPost(), node);
            return this.startIsInclusive_ ? compareRes <= 0 : compareRes < 0;
        };
        this.withinEndPost = (node) => {
            const compareRes = this.index_.compare(node, this.rangedFilter_.getEndPost());
            return this.endIsInclusive_ ? compareRes <= 0 : compareRes < 0;
        };
        this.rangedFilter_ = new RangedFilter(params);
        this.index_ = params.getIndex();
        this.limit_ = params.getLimit();
        this.reverse_ = !params.isViewFromLeft();
        this.startIsInclusive_ = !params.startAfterSet_;
        this.endIsInclusive_ = !params.endBeforeSet_;
    }
    updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
        if (!this.rangedFilter_.matches(new NamedNode(key, newChild))) {
            newChild = ChildrenNode.EMPTY_NODE;
        }
        if (snap.getImmediateChild(key).equals(newChild)) {
            // No change
            return snap;
        }
        else if (snap.numChildren() < this.limit_) {
            return this.rangedFilter_
                .getIndexedFilter()
                .updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
        }
        else {
            return this.fullLimitUpdateChild_(snap, key, newChild, source, optChangeAccumulator);
        }
    }
    updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
        let filtered;
        if (newSnap.isLeafNode() || newSnap.isEmpty()) {
            // Make sure we have a children node with the correct index, not a leaf node;
            filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
        }
        else {
            if (this.limit_ * 2 < newSnap.numChildren() &&
                newSnap.isIndexed(this.index_)) {
                // Easier to build up a snapshot, since what we're given has more than twice the elements we want
                filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
                // anchor to the startPost, endPost, or last element as appropriate
                let iterator;
                if (this.reverse_) {
                    iterator = newSnap.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_);
                }
                else {
                    iterator = newSnap.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
                }
                let count = 0;
                while (iterator.hasNext() && count < this.limit_) {
                    const next = iterator.getNext();
                    if (!this.withinDirectionalStart(next)) {
                        // if we have not reached the start, skip to the next element
                        continue;
                    }
                    else if (!this.withinDirectionalEnd(next)) {
                        // if we have reached the end, stop adding elements
                        break;
                    }
                    else {
                        filtered = filtered.updateImmediateChild(next.name, next.node);
                        count++;
                    }
                }
            }
            else {
                // The snap contains less than twice the limit. Faster to delete from the snap than build up a new one
                filtered = newSnap.withIndex(this.index_);
                // Don't support priorities on queries
                filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
                let iterator;
                if (this.reverse_) {
                    iterator = filtered.getReverseIterator(this.index_);
                }
                else {
                    iterator = filtered.getIterator(this.index_);
                }
                let count = 0;
                while (iterator.hasNext()) {
                    const next = iterator.getNext();
                    const inRange = count < this.limit_ &&
                        this.withinDirectionalStart(next) &&
                        this.withinDirectionalEnd(next);
                    if (inRange) {
                        count++;
                    }
                    else {
                        filtered = filtered.updateImmediateChild(next.name, ChildrenNode.EMPTY_NODE);
                    }
                }
            }
        }
        return this.rangedFilter_
            .getIndexedFilter()
            .updateFullNode(oldSnap, filtered, optChangeAccumulator);
    }
    updatePriority(oldSnap, newPriority) {
        // Don't support priorities on queries
        return oldSnap;
    }
    filtersNodes() {
        return true;
    }
    getIndexedFilter() {
        return this.rangedFilter_.getIndexedFilter();
    }
    getIndex() {
        return this.index_;
    }
    fullLimitUpdateChild_(snap, childKey, childSnap, source, changeAccumulator) {
        // TODO: rename all cache stuff etc to general snap terminology
        let cmp;
        if (this.reverse_) {
            const indexCmp = this.index_.getCompare();
            cmp = (a, b) => indexCmp(b, a);
        }
        else {
            cmp = this.index_.getCompare();
        }
        const oldEventCache = snap;
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(oldEventCache.numChildren() === this.limit_, '');
        const newChildNamedNode = new NamedNode(childKey, childSnap);
        const windowBoundary = this.reverse_
            ? oldEventCache.getFirstChild(this.index_)
            : oldEventCache.getLastChild(this.index_);
        const inRange = this.rangedFilter_.matches(newChildNamedNode);
        if (oldEventCache.hasChild(childKey)) {
            const oldChildSnap = oldEventCache.getImmediateChild(childKey);
            let nextChild = source.getChildAfterChild(this.index_, windowBoundary, this.reverse_);
            while (nextChild != null &&
                (nextChild.name === childKey || oldEventCache.hasChild(nextChild.name))) {
                // There is a weird edge case where a node is updated as part of a merge in the write tree, but hasn't
                // been applied to the limited filter yet. Ignore this next child which will be updated later in
                // the limited filter...
                nextChild = source.getChildAfterChild(this.index_, nextChild, this.reverse_);
            }
            const compareNext = nextChild == null ? 1 : cmp(nextChild, newChildNamedNode);
            const remainsInWindow = inRange && !childSnap.isEmpty() && compareNext >= 0;
            if (remainsInWindow) {
                if (changeAccumulator != null) {
                    changeAccumulator.trackChildChange(changeChildChanged(childKey, childSnap, oldChildSnap));
                }
                return oldEventCache.updateImmediateChild(childKey, childSnap);
            }
            else {
                if (changeAccumulator != null) {
                    changeAccumulator.trackChildChange(changeChildRemoved(childKey, oldChildSnap));
                }
                const newEventCache = oldEventCache.updateImmediateChild(childKey, ChildrenNode.EMPTY_NODE);
                const nextChildInRange = nextChild != null && this.rangedFilter_.matches(nextChild);
                if (nextChildInRange) {
                    if (changeAccumulator != null) {
                        changeAccumulator.trackChildChange(changeChildAdded(nextChild.name, nextChild.node));
                    }
                    return newEventCache.updateImmediateChild(nextChild.name, nextChild.node);
                }
                else {
                    return newEventCache;
                }
            }
        }
        else if (childSnap.isEmpty()) {
            // we're deleting a node, but it was not in the window, so ignore it
            return snap;
        }
        else if (inRange) {
            if (cmp(windowBoundary, newChildNamedNode) >= 0) {
                if (changeAccumulator != null) {
                    changeAccumulator.trackChildChange(changeChildRemoved(windowBoundary.name, windowBoundary.node));
                    changeAccumulator.trackChildChange(changeChildAdded(childKey, childSnap));
                }
                return oldEventCache
                    .updateImmediateChild(childKey, childSnap)
                    .updateImmediateChild(windowBoundary.name, ChildrenNode.EMPTY_NODE);
            }
            else {
                return snap;
            }
        }
        else {
            return snap;
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * This class is an immutable-from-the-public-api struct containing a set of query parameters defining a
 * range to be returned for a particular location. It is assumed that validation of parameters is done at the
 * user-facing API level, so it is not done here.
 *
 * @internal
 */
class QueryParams {
    constructor() {
        this.limitSet_ = false;
        this.startSet_ = false;
        this.startNameSet_ = false;
        this.startAfterSet_ = false; // can only be true if startSet_ is true
        this.endSet_ = false;
        this.endNameSet_ = false;
        this.endBeforeSet_ = false; // can only be true if endSet_ is true
        this.limit_ = 0;
        this.viewFrom_ = '';
        this.indexStartValue_ = null;
        this.indexStartName_ = '';
        this.indexEndValue_ = null;
        this.indexEndName_ = '';
        this.index_ = PRIORITY_INDEX;
    }
    hasStart() {
        return this.startSet_;
    }
    /**
     * @returns True if it would return from left.
     */
    isViewFromLeft() {
        if (this.viewFrom_ === '') {
            // limit(), rather than limitToFirst or limitToLast was called.
            // This means that only one of startSet_ and endSet_ is true. Use them
            // to calculate which side of the view to anchor to. If neither is set,
            // anchor to the end.
            return this.startSet_;
        }
        else {
            return this.viewFrom_ === "l" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_LEFT */;
        }
    }
    /**
     * Only valid to call if hasStart() returns true
     */
    getIndexStartValue() {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(this.startSet_, 'Only valid if start has been set');
        return this.indexStartValue_;
    }
    /**
     * Only valid to call if hasStart() returns true.
     * Returns the starting key name for the range defined by these query parameters
     */
    getIndexStartName() {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(this.startSet_, 'Only valid if start has been set');
        if (this.startNameSet_) {
            return this.indexStartName_;
        }
        else {
            return MIN_NAME;
        }
    }
    hasEnd() {
        return this.endSet_;
    }
    /**
     * Only valid to call if hasEnd() returns true.
     */
    getIndexEndValue() {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(this.endSet_, 'Only valid if end has been set');
        return this.indexEndValue_;
    }
    /**
     * Only valid to call if hasEnd() returns true.
     * Returns the end key name for the range defined by these query parameters
     */
    getIndexEndName() {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(this.endSet_, 'Only valid if end has been set');
        if (this.endNameSet_) {
            return this.indexEndName_;
        }
        else {
            return MAX_NAME;
        }
    }
    hasLimit() {
        return this.limitSet_;
    }
    /**
     * @returns True if a limit has been set and it has been explicitly anchored
     */
    hasAnchoredLimit() {
        return this.limitSet_ && this.viewFrom_ !== '';
    }
    /**
     * Only valid to call if hasLimit() returns true
     */
    getLimit() {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(this.limitSet_, 'Only valid if limit has been set');
        return this.limit_;
    }
    getIndex() {
        return this.index_;
    }
    loadsAllData() {
        return !(this.startSet_ || this.endSet_ || this.limitSet_);
    }
    isDefault() {
        return this.loadsAllData() && this.index_ === PRIORITY_INDEX;
    }
    copy() {
        const copy = new QueryParams();
        copy.limitSet_ = this.limitSet_;
        copy.limit_ = this.limit_;
        copy.startSet_ = this.startSet_;
        copy.startAfterSet_ = this.startAfterSet_;
        copy.indexStartValue_ = this.indexStartValue_;
        copy.startNameSet_ = this.startNameSet_;
        copy.indexStartName_ = this.indexStartName_;
        copy.endSet_ = this.endSet_;
        copy.endBeforeSet_ = this.endBeforeSet_;
        copy.indexEndValue_ = this.indexEndValue_;
        copy.endNameSet_ = this.endNameSet_;
        copy.indexEndName_ = this.indexEndName_;
        copy.index_ = this.index_;
        copy.viewFrom_ = this.viewFrom_;
        return copy;
    }
}
function queryParamsGetNodeFilter(queryParams) {
    if (queryParams.loadsAllData()) {
        return new IndexedFilter(queryParams.getIndex());
    }
    else if (queryParams.hasLimit()) {
        return new LimitedFilter(queryParams);
    }
    else {
        return new RangedFilter(queryParams);
    }
}
function queryParamsLimitToFirst(queryParams, newLimit) {
    const newParams = queryParams.copy();
    newParams.limitSet_ = true;
    newParams.limit_ = newLimit;
    newParams.viewFrom_ = "l" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_LEFT */;
    return newParams;
}
function queryParamsLimitToLast(queryParams, newLimit) {
    const newParams = queryParams.copy();
    newParams.limitSet_ = true;
    newParams.limit_ = newLimit;
    newParams.viewFrom_ = "r" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_RIGHT */;
    return newParams;
}
function queryParamsStartAt(queryParams, indexValue, key) {
    const newParams = queryParams.copy();
    newParams.startSet_ = true;
    if (indexValue === undefined) {
        indexValue = null;
    }
    newParams.indexStartValue_ = indexValue;
    if (key != null) {
        newParams.startNameSet_ = true;
        newParams.indexStartName_ = key;
    }
    else {
        newParams.startNameSet_ = false;
        newParams.indexStartName_ = '';
    }
    return newParams;
}
function queryParamsStartAfter(queryParams, indexValue, key) {
    let params;
    if (queryParams.index_ === KEY_INDEX || !!key) {
        params = queryParamsStartAt(queryParams, indexValue, key);
    }
    else {
        params = queryParamsStartAt(queryParams, indexValue, MAX_NAME);
    }
    params.startAfterSet_ = true;
    return params;
}
function queryParamsEndAt(queryParams, indexValue, key) {
    const newParams = queryParams.copy();
    newParams.endSet_ = true;
    if (indexValue === undefined) {
        indexValue = null;
    }
    newParams.indexEndValue_ = indexValue;
    if (key !== undefined) {
        newParams.endNameSet_ = true;
        newParams.indexEndName_ = key;
    }
    else {
        newParams.endNameSet_ = false;
        newParams.indexEndName_ = '';
    }
    return newParams;
}
function queryParamsEndBefore(queryParams, indexValue, key) {
    let params;
    if (queryParams.index_ === KEY_INDEX || !!key) {
        params = queryParamsEndAt(queryParams, indexValue, key);
    }
    else {
        params = queryParamsEndAt(queryParams, indexValue, MIN_NAME);
    }
    params.endBeforeSet_ = true;
    return params;
}
function queryParamsOrderBy(queryParams, index) {
    const newParams = queryParams.copy();
    newParams.index_ = index;
    return newParams;
}
/**
 * Returns a set of REST query string parameters representing this query.
 *
 * @returns query string parameters
 */
function queryParamsToRestQueryStringParameters(queryParams) {
    const qs = {};
    if (queryParams.isDefault()) {
        return qs;
    }
    let orderBy;
    if (queryParams.index_ === PRIORITY_INDEX) {
        orderBy = "$priority" /* REST_QUERY_CONSTANTS.PRIORITY_INDEX */;
    }
    else if (queryParams.index_ === VALUE_INDEX) {
        orderBy = "$value" /* REST_QUERY_CONSTANTS.VALUE_INDEX */;
    }
    else if (queryParams.index_ === KEY_INDEX) {
        orderBy = "$key" /* REST_QUERY_CONSTANTS.KEY_INDEX */;
    }
    else {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(queryParams.index_ instanceof PathIndex, 'Unrecognized index type!');
        orderBy = queryParams.index_.toString();
    }
    qs["orderBy" /* REST_QUERY_CONSTANTS.ORDER_BY */] = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(orderBy);
    if (queryParams.startSet_) {
        const startParam = queryParams.startAfterSet_
            ? "startAfter" /* REST_QUERY_CONSTANTS.START_AFTER */
            : "startAt" /* REST_QUERY_CONSTANTS.START_AT */;
        qs[startParam] = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(queryParams.indexStartValue_);
        if (queryParams.startNameSet_) {
            qs[startParam] += ',' + (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(queryParams.indexStartName_);
        }
    }
    if (queryParams.endSet_) {
        const endParam = queryParams.endBeforeSet_
            ? "endBefore" /* REST_QUERY_CONSTANTS.END_BEFORE */
            : "endAt" /* REST_QUERY_CONSTANTS.END_AT */;
        qs[endParam] = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(queryParams.indexEndValue_);
        if (queryParams.endNameSet_) {
            qs[endParam] += ',' + (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(queryParams.indexEndName_);
        }
    }
    if (queryParams.limitSet_) {
        if (queryParams.isViewFromLeft()) {
            qs["limitToFirst" /* REST_QUERY_CONSTANTS.LIMIT_TO_FIRST */] = queryParams.limit_;
        }
        else {
            qs["limitToLast" /* REST_QUERY_CONSTANTS.LIMIT_TO_LAST */] = queryParams.limit_;
        }
    }
    return qs;
}
function queryParamsGetQueryObject(queryParams) {
    const obj = {};
    if (queryParams.startSet_) {
        obj["sp" /* WIRE_PROTOCOL_CONSTANTS.INDEX_START_VALUE */] =
            queryParams.indexStartValue_;
        if (queryParams.startNameSet_) {
            obj["sn" /* WIRE_PROTOCOL_CONSTANTS.INDEX_START_NAME */] =
                queryParams.indexStartName_;
        }
        obj["sin" /* WIRE_PROTOCOL_CONSTANTS.INDEX_START_IS_INCLUSIVE */] =
            !queryParams.startAfterSet_;
    }
    if (queryParams.endSet_) {
        obj["ep" /* WIRE_PROTOCOL_CONSTANTS.INDEX_END_VALUE */] = queryParams.indexEndValue_;
        if (queryParams.endNameSet_) {
            obj["en" /* WIRE_PROTOCOL_CONSTANTS.INDEX_END_NAME */] = queryParams.indexEndName_;
        }
        obj["ein" /* WIRE_PROTOCOL_CONSTANTS.INDEX_END_IS_INCLUSIVE */] =
            !queryParams.endBeforeSet_;
    }
    if (queryParams.limitSet_) {
        obj["l" /* WIRE_PROTOCOL_CONSTANTS.LIMIT */] = queryParams.limit_;
        let viewFrom = queryParams.viewFrom_;
        if (viewFrom === '') {
            if (queryParams.isViewFromLeft()) {
                viewFrom = "l" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_LEFT */;
            }
            else {
                viewFrom = "r" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_RIGHT */;
            }
        }
        obj["vf" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM */] = viewFrom;
    }
    // For now, priority index is the default, so we only specify if it's some other index
    if (queryParams.index_ !== PRIORITY_INDEX) {
        obj["i" /* WIRE_PROTOCOL_CONSTANTS.INDEX */] = queryParams.index_.toString();
    }
    return obj;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An implementation of ServerActions that communicates with the server via REST requests.
 * This is mostly useful for compatibility with crawlers, where we don't want to spin up a full
 * persistent connection (using WebSockets or long-polling)
 */
class ReadonlyRestClient extends ServerActions {
    reportStats(stats) {
        throw new Error('Method not implemented.');
    }
    static getListenId_(query, tag) {
        if (tag !== undefined) {
            return 'tag$' + tag;
        }
        else {
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(query._queryParams.isDefault(), "should have a tag if it's not a default query.");
            return query._path.toString();
        }
    }
    /**
     * @param repoInfo_ - Data about the namespace we are connecting to
     * @param onDataUpdate_ - A callback for new data from the server
     */
    constructor(repoInfo_, onDataUpdate_, authTokenProvider_, appCheckTokenProvider_) {
        super();
        this.repoInfo_ = repoInfo_;
        this.onDataUpdate_ = onDataUpdate_;
        this.authTokenProvider_ = authTokenProvider_;
        this.appCheckTokenProvider_ = appCheckTokenProvider_;
        /** @private {function(...[*])} */
        this.log_ = logWrapper('p:rest:');
        /**
         * We don't actually need to track listens, except to prevent us calling an onComplete for a listen
         * that's been removed. :-/
         */
        this.listens_ = {};
    }
    /** @inheritDoc */
    listen(query, currentHashFn, tag, onComplete) {
        const pathString = query._path.toString();
        this.log_('Listen called for ' + pathString + ' ' + query._queryIdentifier);
        // Mark this listener so we can tell if it's removed.
        const listenId = ReadonlyRestClient.getListenId_(query, tag);
        const thisListen = {};
        this.listens_[listenId] = thisListen;
        const queryStringParameters = queryParamsToRestQueryStringParameters(query._queryParams);
        this.restRequest_(pathString + '.json', queryStringParameters, (error, result) => {
            let data = result;
            if (error === 404) {
                data = null;
                error = null;
            }
            if (error === null) {
                this.onDataUpdate_(pathString, data, /*isMerge=*/ false, tag);
            }
            if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.safeGet)(this.listens_, listenId) === thisListen) {
                let status;
                if (!error) {
                    status = 'ok';
                }
                else if (error === 401) {
                    status = 'permission_denied';
                }
                else {
                    status = 'rest_error:' + error;
                }
                onComplete(status, null);
            }
        });
    }
    /** @inheritDoc */
    unlisten(query, tag) {
        const listenId = ReadonlyRestClient.getListenId_(query, tag);
        delete this.listens_[listenId];
    }
    get(query) {
        const queryStringParameters = queryParamsToRestQueryStringParameters(query._queryParams);
        const pathString = query._path.toString();
        const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
        this.restRequest_(pathString + '.json', queryStringParameters, (error, result) => {
            let data = result;
            if (error === 404) {
                data = null;
                error = null;
            }
            if (error === null) {
                this.onDataUpdate_(pathString, data, 
                /*isMerge=*/ false, 
                /*tag=*/ null);
                deferred.resolve(data);
            }
            else {
                deferred.reject(new Error(data));
            }
        });
        return deferred.promise;
    }
    /** @inheritDoc */
    refreshAuthToken(token) {
        // no-op since we just always call getToken.
    }
    /**
     * Performs a REST request to the given path, with the provided query string parameters,
     * and any auth credentials we have.
     */
    restRequest_(pathString, queryStringParameters = {}, callback) {
        queryStringParameters['format'] = 'export';
        return Promise.all([
            this.authTokenProvider_.getToken(/*forceRefresh=*/ false),
            this.appCheckTokenProvider_.getToken(/*forceRefresh=*/ false)
        ]).then(([authToken, appCheckToken]) => {
            if (authToken && authToken.accessToken) {
                queryStringParameters['auth'] = authToken.accessToken;
            }
            if (appCheckToken && appCheckToken.token) {
                queryStringParameters['ac'] = appCheckToken.token;
            }
            const url = (this.repoInfo_.secure ? 'https://' : 'http://') +
                this.repoInfo_.host +
                pathString +
                '?' +
                'ns=' +
                this.repoInfo_.namespace +
                (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.querystring)(queryStringParameters);
            this.log_('Sending REST request for ' + url);
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (callback && xhr.readyState === 4) {
                    this.log_('REST Response for ' + url + ' received. status:', xhr.status, 'response:', xhr.responseText);
                    let res = null;
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            res = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.jsonEval)(xhr.responseText);
                        }
                        catch (e) {
                            warn('Failed to parse JSON response for ' +
                                url +
                                ': ' +
                                xhr.responseText);
                        }
                        callback(null, res);
                    }
                    else {
                        // 401 and 404 are expected.
                        if (xhr.status !== 401 && xhr.status !== 404) {
                            warn('Got unsuccessful REST response for ' +
                                url +
                                ' Status: ' +
                                xhr.status);
                        }
                        callback(xhr.status);
                    }
                    callback = null;
                }
            };
            xhr.open('GET', url, /*asynchronous=*/ true);
            xhr.send();
        });
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Mutable object which basically just stores a reference to the "latest" immutable snapshot.
 */
class SnapshotHolder {
    constructor() {
        this.rootNode_ = ChildrenNode.EMPTY_NODE;
    }
    getNode(path) {
        return this.rootNode_.getChild(path);
    }
    updateSnapshot(path, newSnapshotNode) {
        this.rootNode_ = this.rootNode_.updateChild(path, newSnapshotNode);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function newSparseSnapshotTree() {
    return {
        value: null,
        children: new Map()
    };
}
/**
 * Stores the given node at the specified path. If there is already a node
 * at a shallower path, it merges the new data into that snapshot node.
 *
 * @param path - Path to look up snapshot for.
 * @param data - The new data, or null.
 */
function sparseSnapshotTreeRemember(sparseSnapshotTree, path, data) {
    if (pathIsEmpty(path)) {
        sparseSnapshotTree.value = data;
        sparseSnapshotTree.children.clear();
    }
    else if (sparseSnapshotTree.value !== null) {
        sparseSnapshotTree.value = sparseSnapshotTree.value.updateChild(path, data);
    }
    else {
        const childKey = pathGetFront(path);
        if (!sparseSnapshotTree.children.has(childKey)) {
            sparseSnapshotTree.children.set(childKey, newSparseSnapshotTree());
        }
        const child = sparseSnapshotTree.children.get(childKey);
        path = pathPopFront(path);
        sparseSnapshotTreeRemember(child, path, data);
    }
}
/**
 * Purge the data at path from the cache.
 *
 * @param path - Path to look up snapshot for.
 * @returns True if this node should now be removed.
 */
function sparseSnapshotTreeForget(sparseSnapshotTree, path) {
    if (pathIsEmpty(path)) {
        sparseSnapshotTree.value = null;
        sparseSnapshotTree.children.clear();
        return true;
    }
    else {
        if (sparseSnapshotTree.value !== null) {
            if (sparseSnapshotTree.value.isLeafNode()) {
                // We're trying to forget a node that doesn't exist
                return false;
            }
            else {
                const value = sparseSnapshotTree.value;
                sparseSnapshotTree.value = null;
                value.forEachChild(PRIORITY_INDEX, (key, tree) => {
                    sparseSnapshotTreeRemember(sparseSnapshotTree, new Path(key), tree);
                });
                return sparseSnapshotTreeForget(sparseSnapshotTree, path);
            }
        }
        else if (sparseSnapshotTree.children.size > 0) {
            const childKey = pathGetFront(path);
            path = pathPopFront(path);
            if (sparseSnapshotTree.children.has(childKey)) {
                const safeToRemove = sparseSnapshotTreeForget(sparseSnapshotTree.children.get(childKey), path);
                if (safeToRemove) {
                    sparseSnapshotTree.children.delete(childKey);
                }
            }
            return sparseSnapshotTree.children.size === 0;
        }
        else {
            return true;
        }
    }
}
/**
 * Recursively iterates through all of the stored tree and calls the
 * callback on each one.
 *
 * @param prefixPath - Path to look up node for.
 * @param func - The function to invoke for each tree.
 */
function sparseSnapshotTreeForEachTree(sparseSnapshotTree, prefixPath, func) {
    if (sparseSnapshotTree.value !== null) {
        func(prefixPath, sparseSnapshotTree.value);
    }
    else {
        sparseSnapshotTreeForEachChild(sparseSnapshotTree, (key, tree) => {
            const path = new Path(prefixPath.toString() + '/' + key);
            sparseSnapshotTreeForEachTree(tree, path, func);
        });
    }
}
/**
 * Iterates through each immediate child and triggers the callback.
 * Only seems to be used in tests.
 *
 * @param func - The function to invoke for each child.
 */
function sparseSnapshotTreeForEachChild(sparseSnapshotTree, func) {
    sparseSnapshotTree.children.forEach((tree, key) => {
        func(key, tree);
    });
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns the delta from the previous call to get stats.
 *
 * @param collection_ - The collection to "listen" to.
 */
class StatsListener {
    constructor(collection_) {
        this.collection_ = collection_;
        this.last_ = null;
    }
    get() {
        const newStats = this.collection_.get();
        const delta = Object.assign({}, newStats);
        if (this.last_) {
            each(this.last_, (stat, value) => {
                delta[stat] = delta[stat] - value;
            });
        }
        this.last_ = newStats;
        return delta;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Assuming some apps may have a short amount of time on page, and a bulk of firebase operations probably
// happen on page load, we try to report our first set of stats pretty quickly, but we wait at least 10
// seconds to try to ensure the Firebase connection is established / settled.
const FIRST_STATS_MIN_TIME = 10 * 1000;
const FIRST_STATS_MAX_TIME = 30 * 1000;
// We'll continue to report stats on average every 5 minutes.
const REPORT_STATS_INTERVAL = 5 * 60 * 1000;
class StatsReporter {
    constructor(collection, server_) {
        this.server_ = server_;
        this.statsToReport_ = {};
        this.statsListener_ = new StatsListener(collection);
        const timeout = FIRST_STATS_MIN_TIME +
            (FIRST_STATS_MAX_TIME - FIRST_STATS_MIN_TIME) * Math.random();
        setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(timeout));
    }
    reportStats_() {
        const stats = this.statsListener_.get();
        const reportedStats = {};
        let haveStatsToReport = false;
        each(stats, (stat, value) => {
            if (value > 0 && (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.contains)(this.statsToReport_, stat)) {
                reportedStats[stat] = value;
                haveStatsToReport = true;
            }
        });
        if (haveStatsToReport) {
            this.server_.reportStats(reportedStats);
        }
        // queue our next run.
        setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * REPORT_STATS_INTERVAL));
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 *
 * @enum
 */
var OperationType;
(function (OperationType) {
    OperationType[OperationType["OVERWRITE"] = 0] = "OVERWRITE";
    OperationType[OperationType["MERGE"] = 1] = "MERGE";
    OperationType[OperationType["ACK_USER_WRITE"] = 2] = "ACK_USER_WRITE";
    OperationType[OperationType["LISTEN_COMPLETE"] = 3] = "LISTEN_COMPLETE";
})(OperationType || (OperationType = {}));
function newOperationSourceUser() {
    return {
        fromUser: true,
        fromServer: false,
        queryId: null,
        tagged: false
    };
}
function newOperationSourceServer() {
    return {
        fromUser: false,
        fromServer: true,
        queryId: null,
        tagged: false
    };
}
function newOperationSourceServerTaggedQuery(queryId) {
    return {
        fromUser: false,
        fromServer: true,
        queryId,
        tagged: true
    };
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AckUserWrite {
    /**
     * @param affectedTree - A tree containing true for each affected path. Affected paths can't overlap.
     */
    constructor(
    /** @inheritDoc */ path, 
    /** @inheritDoc */ affectedTree, 
    /** @inheritDoc */ revert) {
        this.path = path;
        this.affectedTree = affectedTree;
        this.revert = revert;
        /** @inheritDoc */
        this.type = OperationType.ACK_USER_WRITE;
        /** @inheritDoc */
        this.source = newOperationSourceUser();
    }
    operationForChild(childName) {
        if (!pathIsEmpty(this.path)) {
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(pathGetFront(this.path) === childName, 'operationForChild called for unrelated child.');
            return new AckUserWrite(pathPopFront(this.path), this.affectedTree, this.revert);
        }
        else if (this.affectedTree.value != null) {
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(this.affectedTree.children.isEmpty(), 'affectedTree should not have overlapping affected paths.');
            // All child locations are affected as well; just return same operation.
            return this;
        }
        else {
            const childTree = this.affectedTree.subtree(new Path(childName));
            return new AckUserWrite(newEmptyPath(), childTree, this.revert);
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ListenComplete {
    constructor(source, path) {
        this.source = source;
        this.path = path;
        /** @inheritDoc */
        this.type = OperationType.LISTEN_COMPLETE;
    }
    operationForChild(childName) {
        if (pathIsEmpty(this.path)) {
            return new ListenComplete(this.source, newEmptyPath());
        }
        else {
            return new ListenComplete(this.source, pathPopFront(this.path));
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Overwrite {
    constructor(source, path, snap) {
        this.source = source;
        this.path = path;
        this.snap = snap;
        /** @inheritDoc */
        this.type = OperationType.OVERWRITE;
    }
    operationForChild(childName) {
        if (pathIsEmpty(this.path)) {
            return new Overwrite(this.source, newEmptyPath(), this.snap.getImmediateChild(childName));
        }
        else {
            return new Overwrite(this.source, pathPopFront(this.path), this.snap);
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Merge {
    constructor(
    /** @inheritDoc */ source, 
    /** @inheritDoc */ path, 
    /** @inheritDoc */ children) {
        this.source = source;
        this.path = path;
        this.children = children;
        /** @inheritDoc */
        this.type = OperationType.MERGE;
    }
    operationForChild(childName) {
        if (pathIsEmpty(this.path)) {
            const childTree = this.children.subtree(new Path(childName));
            if (childTree.isEmpty()) {
                // This child is unaffected
                return null;
            }
            else if (childTree.value) {
                // We have a snapshot for the child in question.  This becomes an overwrite of the child.
                return new Overwrite(this.source, newEmptyPath(), childTree.value);
            }
            else {
                // This is a merge at a deeper level
                return new Merge(this.source, newEmptyPath(), childTree);
            }
        }
        else {
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(pathGetFront(this.path) === childName, "Can't get a merge for a child not on the path of the operation");
            return new Merge(this.source, pathPopFront(this.path), this.children);
        }
    }
    toString() {
        return ('Operation(' +
            this.path +
            ': ' +
            this.source.toString() +
            ' merge: ' +
            this.children.toString() +
            ')');
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A cache node only stores complete children. Additionally it holds a flag whether the node can be considered fully
 * initialized in the sense that we know at one point in time this represented a valid state of the world, e.g.
 * initialized with data from the server, or a complete overwrite by the client. The filtered flag also tracks
 * whether a node potentially had children removed due to a filter.
 */
class CacheNode {
    constructor(node_, fullyInitialized_, filtered_) {
        this.node_ = node_;
        this.fullyInitialized_ = fullyInitialized_;
        this.filtered_ = filtered_;
    }
    /**
     * Returns whether this node was fully initialized with either server data or a complete overwrite by the client
     */
    isFullyInitialized() {
        return this.fullyInitialized_;
    }
    /**
     * Returns whether this node is potentially missing children due to a filter applied to the node
     */
    isFiltered() {
        return this.filtered_;
    }
    isCompleteForPath(path) {
        if (pathIsEmpty(path)) {
            return this.isFullyInitialized() && !this.filtered_;
        }
        const childKey = pathGetFront(path);
        return this.isCompleteForChild(childKey);
    }
    isCompleteForChild(key) {
        return ((this.isFullyInitialized() && !this.filtered_) || this.node_.hasChild(key));
    }
    getNode() {
        return this.node_;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An EventGenerator is used to convert "raw" changes (Change) as computed by the
 * CacheDiffer into actual events (Event) that can be raised.  See generateEventsForChanges()
 * for details.
 *
 */
class EventGenerator {
    constructor(query_) {
        this.query_ = query_;
        this.index_ = this.query_._queryParams.getIndex();
    }
}
/**
 * Given a set of raw changes (no moved events and prevName not specified yet), and a set of
 * EventRegistrations that should be notified of these changes, generate the actual events to be raised.
 *
 * Notes:
 *  - child_moved events will be synthesized at this time for any child_changed events that affect
 *    our index.
 *  - prevName will be calculated based on the index ordering.
 */
function eventGeneratorGenerateEventsForChanges(eventGenerator, changes, eventCache, eventRegistrations) {
    const events = [];
    const moves = [];
    changes.forEach(change => {
        if (change.type === "child_changed" /* ChangeType.CHILD_CHANGED */ &&
            eventGenerator.index_.indexedValueChanged(change.oldSnap, change.snapshotNode)) {
            moves.push(changeChildMoved(change.childName, change.snapshotNode));
        }
    });
    eventGeneratorGenerateEventsForType(eventGenerator, events, "child_removed" /* ChangeType.CHILD_REMOVED */, changes, eventRegistrations, eventCache);
    eventGeneratorGenerateEventsForType(eventGenerator, events, "child_added" /* ChangeType.CHILD_ADDED */, changes, eventRegistrations, eventCache);
    eventGeneratorGenerateEventsForType(eventGenerator, events, "child_moved" /* ChangeType.CHILD_MOVED */, moves, eventRegistrations, eventCache);
    eventGeneratorGenerateEventsForType(eventGenerator, events, "child_changed" /* ChangeType.CHILD_CHANGED */, changes, eventRegistrations, eventCache);
    eventGeneratorGenerateEventsForType(eventGenerator, events, "value" /* ChangeType.VALUE */, changes, eventRegistrations, eventCache);
    return events;
}
/**
 * Given changes of a single change type, generate the corresponding events.
 */
function eventGeneratorGenerateEventsForType(eventGenerator, events, eventType, changes, registrations, eventCache) {
    const filteredChanges = changes.filter(change => change.type === eventType);
    filteredChanges.sort((a, b) => eventGeneratorCompareChanges(eventGenerator, a, b));
    filteredChanges.forEach(change => {
        const materializedChange = eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache);
        registrations.forEach(registration => {
            if (registration.respondsTo(change.type)) {
                events.push(registration.createEvent(materializedChange, eventGenerator.query_));
            }
        });
    });
}
function eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache) {
    if (change.type === 'value' || change.type === 'child_removed') {
        return change;
    }
    else {
        change.prevName = eventCache.getPredecessorChildName(change.childName, change.snapshotNode, eventGenerator.index_);
        return change;
    }
}
function eventGeneratorCompareChanges(eventGenerator, a, b) {
    if (a.childName == null || b.childName == null) {
        throw (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assertionError)('Should only compare child_ events.');
    }
    const aWrapped = new NamedNode(a.childName, a.snapshotNode);
    const bWrapped = new NamedNode(b.childName, b.snapshotNode);
    return eventGenerator.index_.compare(aWrapped, bWrapped);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function newViewCache(eventCache, serverCache) {
    return { eventCache, serverCache };
}
function viewCacheUpdateEventSnap(viewCache, eventSnap, complete, filtered) {
    return newViewCache(new CacheNode(eventSnap, complete, filtered), viewCache.serverCache);
}
function viewCacheUpdateServerSnap(viewCache, serverSnap, complete, filtered) {
    return newViewCache(viewCache.eventCache, new CacheNode(serverSnap, complete, filtered));
}
function viewCacheGetCompleteEventSnap(viewCache) {
    return viewCache.eventCache.isFullyInitialized()
        ? viewCache.eventCache.getNode()
        : null;
}
function viewCacheGetCompleteServerSnap(viewCache) {
    return viewCache.serverCache.isFullyInitialized()
        ? viewCache.serverCache.getNode()
        : null;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let emptyChildrenSingleton;
/**
 * Singleton empty children collection.
 *
 */
const EmptyChildren = () => {
    if (!emptyChildrenSingleton) {
        emptyChildrenSingleton = new SortedMap(stringCompare);
    }
    return emptyChildrenSingleton;
};
/**
 * A tree with immutable elements.
 */
class ImmutableTree {
    static fromObject(obj) {
        let tree = new ImmutableTree(null);
        each(obj, (childPath, childSnap) => {
            tree = tree.set(new Path(childPath), childSnap);
        });
        return tree;
    }
    constructor(value, children = EmptyChildren()) {
        this.value = value;
        this.children = children;
    }
    /**
     * True if the value is empty and there are no children
     */
    isEmpty() {
        return this.value === null && this.children.isEmpty();
    }
    /**
     * Given a path and predicate, return the first node and the path to that node
     * where the predicate returns true.
     *
     * TODO Do a perf test -- If we're creating a bunch of `{path: value:}`
     * objects on the way back out, it may be better to pass down a pathSoFar obj.
     *
     * @param relativePath - The remainder of the path
     * @param predicate - The predicate to satisfy to return a node
     */
    findRootMostMatchingPathAndValue(relativePath, predicate) {
        if (this.value != null && predicate(this.value)) {
            return { path: newEmptyPath(), value: this.value };
        }
        else {
            if (pathIsEmpty(relativePath)) {
                return null;
            }
            else {
                const front = pathGetFront(relativePath);
                const child = this.children.get(front);
                if (child !== null) {
                    const childExistingPathAndValue = child.findRootMostMatchingPathAndValue(pathPopFront(relativePath), predicate);
                    if (childExistingPathAndValue != null) {
                        const fullPath = pathChild(new Path(front), childExistingPathAndValue.path);
                        return { path: fullPath, value: childExistingPathAndValue.value };
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
            }
        }
    }
    /**
     * Find, if it exists, the shortest subpath of the given path that points a defined
     * value in the tree
     */
    findRootMostValueAndPath(relativePath) {
        return this.findRootMostMatchingPathAndValue(relativePath, () => true);
    }
    /**
     * @returns The subtree at the given path
     */
    subtree(relativePath) {
        if (pathIsEmpty(relativePath)) {
            return this;
        }
        else {
            const front = pathGetFront(relativePath);
            const childTree = this.children.get(front);
            if (childTree !== null) {
                return childTree.subtree(pathPopFront(relativePath));
            }
            else {
                return new ImmutableTree(null);
            }
        }
    }
    /**
     * Sets a value at the specified path.
     *
     * @param relativePath - Path to set value at.
     * @param toSet - Value to set.
     * @returns Resulting tree.
     */
    set(relativePath, toSet) {
        if (pathIsEmpty(relativePath)) {
            return new ImmutableTree(toSet, this.children);
        }
        else {
            const front = pathGetFront(relativePath);
            const child = this.children.get(front) || new ImmutableTree(null);
            const newChild = child.set(pathPopFront(relativePath), toSet);
            const newChildren = this.children.insert(front, newChild);
            return new ImmutableTree(this.value, newChildren);
        }
    }
    /**
     * Removes the value at the specified path.
     *
     * @param relativePath - Path to value to remove.
     * @returns Resulting tree.
     */
    remove(relativePath) {
        if (pathIsEmpty(relativePath)) {
            if (this.children.isEmpty()) {
                return new ImmutableTree(null);
            }
            else {
                return new ImmutableTree(null, this.children);
            }
        }
        else {
            const front = pathGetFront(relativePath);
            const child = this.children.get(front);
            if (child) {
                const newChild = child.remove(pathPopFront(relativePath));
                let newChildren;
                if (newChild.isEmpty()) {
                    newChildren = this.children.remove(front);
                }
                else {
                    newChildren = this.children.insert(front, newChild);
                }
                if (this.value === null && newChildren.isEmpty()) {
                    return new ImmutableTree(null);
                }
                else {
                    return new ImmutableTree(this.value, newChildren);
                }
            }
            else {
                return this;
            }
        }
    }
    /**
     * Gets a value from the tree.
     *
     * @param relativePath - Path to get value for.
     * @returns Value at path, or null.
     */
    get(relativePath) {
        if (pathIsEmpty(relativePath)) {
            return this.value;
        }
        else {
            const front = pathGetFront(relativePath);
            const child = this.children.get(front);
            if (child) {
                return child.get(pathPopFront(relativePath));
            }
            else {
                return null;
            }
        }
    }
    /**
     * Replace the subtree at the specified path with the given new tree.
     *
     * @param relativePath - Path to replace subtree for.
     * @param newTree - New tree.
     * @returns Resulting tree.
     */
    setTree(relativePath, newTree) {
        if (pathIsEmpty(relativePath)) {
            return newTree;
        }
        else {
            const front = pathGetFront(relativePath);
            const child = this.children.get(front) || new ImmutableTree(null);
            const newChild = child.setTree(pathPopFront(relativePath), newTree);
            let newChildren;
            if (newChild.isEmpty()) {
                newChildren = this.children.remove(front);
            }
            else {
                newChildren = this.children.insert(front, newChild);
            }
            return new ImmutableTree(this.value, newChildren);
        }
    }
    /**
     * Performs a depth first fold on this tree. Transforms a tree into a single
     * value, given a function that operates on the path to a node, an optional
     * current value, and a map of child names to folded subtrees
     */
    fold(fn) {
        return this.fold_(newEmptyPath(), fn);
    }
    /**
     * Recursive helper for public-facing fold() method
     */
    fold_(pathSoFar, fn) {
        const accum = {};
        this.children.inorderTraversal((childKey, childTree) => {
            accum[childKey] = childTree.fold_(pathChild(pathSoFar, childKey), fn);
        });
        return fn(pathSoFar, this.value, accum);
    }
    /**
     * Find the first matching value on the given path. Return the result of applying f to it.
     */
    findOnPath(path, f) {
        return this.findOnPath_(path, newEmptyPath(), f);
    }
    findOnPath_(pathToFollow, pathSoFar, f) {
        const result = this.value ? f(pathSoFar, this.value) : false;
        if (result) {
            return result;
        }
        else {
            if (pathIsEmpty(pathToFollow)) {
                return null;
            }
            else {
                const front = pathGetFront(pathToFollow);
                const nextChild = this.children.get(front);
                if (nextChild) {
                    return nextChild.findOnPath_(pathPopFront(pathToFollow), pathChild(pathSoFar, front), f);
                }
                else {
                    return null;
                }
            }
        }
    }
    foreachOnPath(path, f) {
        return this.foreachOnPath_(path, newEmptyPath(), f);
    }
    foreachOnPath_(pathToFollow, currentRelativePath, f) {
        if (pathIsEmpty(pathToFollow)) {
            return this;
        }
        else {
            if (this.value) {
                f(currentRelativePath, this.value);
            }
            const front = pathGetFront(pathToFollow);
            const nextChild = this.children.get(front);
            if (nextChild) {
                return nextChild.foreachOnPath_(pathPopFront(pathToFollow), pathChild(currentRelativePath, front), f);
            }
            else {
                return new ImmutableTree(null);
            }
        }
    }
    /**
     * Calls the given function for each node in the tree that has a value.
     *
     * @param f - A function to be called with the path from the root of the tree to
     * a node, and the value at that node. Called in depth-first order.
     */
    foreach(f) {
        this.foreach_(newEmptyPath(), f);
    }
    foreach_(currentRelativePath, f) {
        this.children.inorderTraversal((childName, childTree) => {
            childTree.foreach_(pathChild(currentRelativePath, childName), f);
        });
        if (this.value) {
            f(currentRelativePath, this.value);
        }
    }
    foreachChild(f) {
        this.children.inorderTraversal((childName, childTree) => {
            if (childTree.value) {
                f(childName, childTree.value);
            }
        });
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * This class holds a collection of writes that can be applied to nodes in unison. It abstracts away the logic with
 * dealing with priority writes and multiple nested writes. At any given path there is only allowed to be one write
 * modifying that path. Any write to an existing path or shadowing an existing path will modify that existing write
 * to reflect the write added.
 */
class CompoundWrite {
    constructor(writeTree_) {
        this.writeTree_ = writeTree_;
    }
    static empty() {
        return new CompoundWrite(new ImmutableTree(null));
    }
}
function compoundWriteAddWrite(compoundWrite, path, node) {
    if (pathIsEmpty(path)) {
        return new CompoundWrite(new ImmutableTree(node));
    }
    else {
        const rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
        if (rootmost != null) {
            const rootMostPath = rootmost.path;
            let value = rootmost.value;
            const relativePath = newRelativePath(rootMostPath, path);
            value = value.updateChild(relativePath, node);
            return new CompoundWrite(compoundWrite.writeTree_.set(rootMostPath, value));
        }
        else {
            const subtree = new ImmutableTree(node);
            const newWriteTree = compoundWrite.writeTree_.setTree(path, subtree);
            return new CompoundWrite(newWriteTree);
        }
    }
}
function compoundWriteAddWrites(compoundWrite, path, updates) {
    let newWrite = compoundWrite;
    each(updates, (childKey, node) => {
        newWrite = compoundWriteAddWrite(newWrite, pathChild(path, childKey), node);
    });
    return newWrite;
}
/**
 * Will remove a write at the given path and deeper paths. This will <em>not</em> modify a write at a higher
 * location, which must be removed by calling this method with that path.
 *
 * @param compoundWrite - The CompoundWrite to remove.
 * @param path - The path at which a write and all deeper writes should be removed
 * @returns The new CompoundWrite with the removed path
 */
function compoundWriteRemoveWrite(compoundWrite, path) {
    if (pathIsEmpty(path)) {
        return CompoundWrite.empty();
    }
    else {
        const newWriteTree = compoundWrite.writeTree_.setTree(path, new ImmutableTree(null));
        return new CompoundWrite(newWriteTree);
    }
}
/**
 * Returns whether this CompoundWrite will fully overwrite a node at a given location and can therefore be
 * considered "complete".
 *
 * @param compoundWrite - The CompoundWrite to check.
 * @param path - The path to check for
 * @returns Whether there is a complete write at that path
 */
function compoundWriteHasCompleteWrite(compoundWrite, path) {
    return compoundWriteGetCompleteNode(compoundWrite, path) != null;
}
/**
 * Returns a node for a path if and only if the node is a "complete" overwrite at that path. This will not aggregate
 * writes from deeper paths, but will return child nodes from a more shallow path.
 *
 * @param compoundWrite - The CompoundWrite to get the node from.
 * @param path - The path to get a complete write
 * @returns The node if complete at that path, or null otherwise.
 */
function compoundWriteGetCompleteNode(compoundWrite, path) {
    const rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
    if (rootmost != null) {
        return compoundWrite.writeTree_
            .get(rootmost.path)
            .getChild(newRelativePath(rootmost.path, path));
    }
    else {
        return null;
    }
}
/**
 * Returns all children that are guaranteed to be a complete overwrite.
 *
 * @param compoundWrite - The CompoundWrite to get children from.
 * @returns A list of all complete children.
 */
function compoundWriteGetCompleteChildren(compoundWrite) {
    const children = [];
    const node = compoundWrite.writeTree_.value;
    if (node != null) {
        // If it's a leaf node, it has no children; so nothing to do.
        if (!node.isLeafNode()) {
            node.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
                children.push(new NamedNode(childName, childNode));
            });
        }
    }
    else {
        compoundWrite.writeTree_.children.inorderTraversal((childName, childTree) => {
            if (childTree.value != null) {
                children.push(new NamedNode(childName, childTree.value));
            }
        });
    }
    return children;
}
function compoundWriteChildCompoundWrite(compoundWrite, path) {
    if (pathIsEmpty(path)) {
        return compoundWrite;
    }
    else {
        const shadowingNode = compoundWriteGetCompleteNode(compoundWrite, path);
        if (shadowingNode != null) {
            return new CompoundWrite(new ImmutableTree(shadowingNode));
        }
        else {
            return new CompoundWrite(compoundWrite.writeTree_.subtree(path));
        }
    }
}
/**
 * Returns true if this CompoundWrite is empty and therefore does not modify any nodes.
 * @returns Whether this CompoundWrite is empty
 */
function compoundWriteIsEmpty(compoundWrite) {
    return compoundWrite.writeTree_.isEmpty();
}
/**
 * Applies this CompoundWrite to a node. The node is returned with all writes from this CompoundWrite applied to the
 * node
 * @param node - The node to apply this CompoundWrite to
 * @returns The node with all writes applied
 */
function compoundWriteApply(compoundWrite, node) {
    return applySubtreeWrite(newEmptyPath(), compoundWrite.writeTree_, node);
}
function applySubtreeWrite(relativePath, writeTree, node) {
    if (writeTree.value != null) {
        // Since there a write is always a leaf, we're done here
        return node.updateChild(relativePath, writeTree.value);
    }
    else {
        let priorityWrite = null;
        writeTree.children.inorderTraversal((childKey, childTree) => {
            if (childKey === '.priority') {
                // Apply priorities at the end so we don't update priorities for either empty nodes or forget
                // to apply priorities to empty nodes that are later filled
                (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(childTree.value !== null, 'Priority writes must always be leaf nodes');
                priorityWrite = childTree.value;
            }
            else {
                node = applySubtreeWrite(pathChild(relativePath, childKey), childTree, node);
            }
        });
        // If there was a priority write, we only apply it if the node is not empty
        if (!node.getChild(relativePath).isEmpty() && priorityWrite !== null) {
            node = node.updateChild(pathChild(relativePath, '.priority'), priorityWrite);
        }
        return node;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Create a new WriteTreeRef for the given path. For use with a new sync point at the given path.
 *
 */
function writeTreeChildWrites(writeTree, path) {
    return newWriteTreeRef(path, writeTree);
}
/**
 * Record a new overwrite from user code.
 *
 * @param visible - This is set to false by some transactions. It should be excluded from event caches
 */
function writeTreeAddOverwrite(writeTree, path, snap, writeId, visible) {
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(writeId > writeTree.lastWriteId, 'Stacking an older write on top of newer ones');
    if (visible === undefined) {
        visible = true;
    }
    writeTree.allWrites.push({
        path,
        snap,
        writeId,
        visible
    });
    if (visible) {
        writeTree.visibleWrites = compoundWriteAddWrite(writeTree.visibleWrites, path, snap);
    }
    writeTree.lastWriteId = writeId;
}
/**
 * Record a new merge from user code.
 */
function writeTreeAddMerge(writeTree, path, changedChildren, writeId) {
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(writeId > writeTree.lastWriteId, 'Stacking an older merge on top of newer ones');
    writeTree.allWrites.push({
        path,
        children: changedChildren,
        writeId,
        visible: true
    });
    writeTree.visibleWrites = compoundWriteAddWrites(writeTree.visibleWrites, path, changedChildren);
    writeTree.lastWriteId = writeId;
}
function writeTreeGetWrite(writeTree, writeId) {
    for (let i = 0; i < writeTree.allWrites.length; i++) {
        const record = writeTree.allWrites[i];
        if (record.writeId === writeId) {
            return record;
        }
    }
    return null;
}
/**
 * Remove a write (either an overwrite or merge) that has been successfully acknowledge by the server. Recalculates
 * the tree if necessary.  We return true if it may have been visible, meaning views need to reevaluate.
 *
 * @returns true if the write may have been visible (meaning we'll need to reevaluate / raise
 * events as a result).
 */
function writeTreeRemoveWrite(writeTree, writeId) {
    // Note: disabling this check. It could be a transaction that preempted another transaction, and thus was applied
    // out of order.
    //const validClear = revert || this.allWrites_.length === 0 || writeId <= this.allWrites_[0].writeId;
    //assert(validClear, "Either we don't have this write, or it's the first one in the queue");
    const idx = writeTree.allWrites.findIndex(s => {
        return s.writeId === writeId;
    });
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(idx >= 0, 'removeWrite called with nonexistent writeId.');
    const writeToRemove = writeTree.allWrites[idx];
    writeTree.allWrites.splice(idx, 1);
    let removedWriteWasVisible = writeToRemove.visible;
    let removedWriteOverlapsWithOtherWrites = false;
    let i = writeTree.allWrites.length - 1;
    while (removedWriteWasVisible && i >= 0) {
        const currentWrite = writeTree.allWrites[i];
        if (currentWrite.visible) {
            if (i >= idx &&
                writeTreeRecordContainsPath_(currentWrite, writeToRemove.path)) {
                // The removed write was completely shadowed by a subsequent write.
                removedWriteWasVisible = false;
            }
            else if (pathContains(writeToRemove.path, currentWrite.path)) {
                // Either we're covering some writes or they're covering part of us (depending on which came first).
                removedWriteOverlapsWithOtherWrites = true;
            }
        }
        i--;
    }
    if (!removedWriteWasVisible) {
        return false;
    }
    else if (removedWriteOverlapsWithOtherWrites) {
        // There's some shadowing going on. Just rebuild the visible writes from scratch.
        writeTreeResetTree_(writeTree);
        return true;
    }
    else {
        // There's no shadowing.  We can safely just remove the write(s) from visibleWrites.
        if (writeToRemove.snap) {
            writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, writeToRemove.path);
        }
        else {
            const children = writeToRemove.children;
            each(children, (childName) => {
                writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, pathChild(writeToRemove.path, childName));
            });
        }
        return true;
    }
}
function writeTreeRecordContainsPath_(writeRecord, path) {
    if (writeRecord.snap) {
        return pathContains(writeRecord.path, path);
    }
    else {
        for (const childName in writeRecord.children) {
            if (writeRecord.children.hasOwnProperty(childName) &&
                pathContains(pathChild(writeRecord.path, childName), path)) {
                return true;
            }
        }
        return false;
    }
}
/**
 * Re-layer the writes and merges into a tree so we can efficiently calculate event snapshots
 */
function writeTreeResetTree_(writeTree) {
    writeTree.visibleWrites = writeTreeLayerTree_(writeTree.allWrites, writeTreeDefaultFilter_, newEmptyPath());
    if (writeTree.allWrites.length > 0) {
        writeTree.lastWriteId =
            writeTree.allWrites[writeTree.allWrites.length - 1].writeId;
    }
    else {
        writeTree.lastWriteId = -1;
    }
}
/**
 * The default filter used when constructing the tree. Keep everything that's visible.
 */
function writeTreeDefaultFilter_(write) {
    return write.visible;
}
/**
 * Static method. Given an array of WriteRecords, a filter for which ones to include, and a path, construct the tree of
 * event data at that path.
 */
function writeTreeLayerTree_(writes, filter, treeRoot) {
    let compoundWrite = CompoundWrite.empty();
    for (let i = 0; i < writes.length; ++i) {
        const write = writes[i];
        // Theory, a later set will either:
        // a) abort a relevant transaction, so no need to worry about excluding it from calculating that transaction
        // b) not be relevant to a transaction (separate branch), so again will not affect the data for that transaction
        if (filter(write)) {
            const writePath = write.path;
            let relativePath;
            if (write.snap) {
                if (pathContains(treeRoot, writePath)) {
                    relativePath = newRelativePath(treeRoot, writePath);
                    compoundWrite = compoundWriteAddWrite(compoundWrite, relativePath, write.snap);
                }
                else if (pathContains(writePath, treeRoot)) {
                    relativePath = newRelativePath(writePath, treeRoot);
                    compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), write.snap.getChild(relativePath));
                }
                else ;
            }
            else if (write.children) {
                if (pathContains(treeRoot, writePath)) {
                    relativePath = newRelativePath(treeRoot, writePath);
                    compoundWrite = compoundWriteAddWrites(compoundWrite, relativePath, write.children);
                }
                else if (pathContains(writePath, treeRoot)) {
                    relativePath = newRelativePath(writePath, treeRoot);
                    if (pathIsEmpty(relativePath)) {
                        compoundWrite = compoundWriteAddWrites(compoundWrite, newEmptyPath(), write.children);
                    }
                    else {
                        const child = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.safeGet)(write.children, pathGetFront(relativePath));
                        if (child) {
                            // There exists a child in this node that matches the root path
                            const deepNode = child.getChild(pathPopFront(relativePath));
                            compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), deepNode);
                        }
                    }
                }
                else ;
            }
            else {
                throw (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assertionError)('WriteRecord should have .snap or .children');
            }
        }
    }
    return compoundWrite;
}
/**
 * Given optional, underlying server data, and an optional set of constraints (exclude some sets, include hidden
 * writes), attempt to calculate a complete snapshot for the given path
 *
 * @param writeIdsToExclude - An optional set to be excluded
 * @param includeHiddenWrites - Defaults to false, whether or not to layer on writes with visible set to false
 */
function writeTreeCalcCompleteEventCache(writeTree, treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
    if (!writeIdsToExclude && !includeHiddenWrites) {
        const shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
        if (shadowingNode != null) {
            return shadowingNode;
        }
        else {
            const subMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
            if (compoundWriteIsEmpty(subMerge)) {
                return completeServerCache;
            }
            else if (completeServerCache == null &&
                !compoundWriteHasCompleteWrite(subMerge, newEmptyPath())) {
                // We wouldn't have a complete snapshot, since there's no underlying data and no complete shadow
                return null;
            }
            else {
                const layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
                return compoundWriteApply(subMerge, layeredCache);
            }
        }
    }
    else {
        const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
        if (!includeHiddenWrites && compoundWriteIsEmpty(merge)) {
            return completeServerCache;
        }
        else {
            // If the server cache is null, and we don't have a complete cache, we need to return null
            if (!includeHiddenWrites &&
                completeServerCache == null &&
                !compoundWriteHasCompleteWrite(merge, newEmptyPath())) {
                return null;
            }
            else {
                const filter = function (write) {
                    return ((write.visible || includeHiddenWrites) &&
                        (!writeIdsToExclude ||
                            !~writeIdsToExclude.indexOf(write.writeId)) &&
                        (pathContains(write.path, treePath) ||
                            pathContains(treePath, write.path)));
                };
                const mergeAtPath = writeTreeLayerTree_(writeTree.allWrites, filter, treePath);
                const layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
                return compoundWriteApply(mergeAtPath, layeredCache);
            }
        }
    }
}
/**
 * With optional, underlying server data, attempt to return a children node of children that we have complete data for.
 * Used when creating new views, to pre-fill their complete event children snapshot.
 */
function writeTreeCalcCompleteEventChildren(writeTree, treePath, completeServerChildren) {
    let completeChildren = ChildrenNode.EMPTY_NODE;
    const topLevelSet = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
    if (topLevelSet) {
        if (!topLevelSet.isLeafNode()) {
            // we're shadowing everything. Return the children.
            topLevelSet.forEachChild(PRIORITY_INDEX, (childName, childSnap) => {
                completeChildren = completeChildren.updateImmediateChild(childName, childSnap);
            });
        }
        return completeChildren;
    }
    else if (completeServerChildren) {
        // Layer any children we have on top of this
        // We know we don't have a top-level set, so just enumerate existing children
        const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
        completeServerChildren.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
            const node = compoundWriteApply(compoundWriteChildCompoundWrite(merge, new Path(childName)), childNode);
            completeChildren = completeChildren.updateImmediateChild(childName, node);
        });
        // Add any complete children we have from the set
        compoundWriteGetCompleteChildren(merge).forEach(namedNode => {
            completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
        });
        return completeChildren;
    }
    else {
        // We don't have anything to layer on top of. Layer on any children we have
        // Note that we can return an empty snap if we have a defined delete
        const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
        compoundWriteGetCompleteChildren(merge).forEach(namedNode => {
            completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
        });
        return completeChildren;
    }
}
/**
 * Given that the underlying server data has updated, determine what, if anything, needs to be
 * applied to the event cache.
 *
 * Possibilities:
 *
 * 1. No writes are shadowing. Events should be raised, the snap to be applied comes from the server data
 *
 * 2. Some write is completely shadowing. No events to be raised
 *
 * 3. Is partially shadowed. Events
 *
 * Either existingEventSnap or existingServerSnap must exist
 */
function writeTreeCalcEventCacheAfterServerOverwrite(writeTree, treePath, childPath, existingEventSnap, existingServerSnap) {
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(existingEventSnap || existingServerSnap, 'Either existingEventSnap or existingServerSnap must exist');
    const path = pathChild(treePath, childPath);
    if (compoundWriteHasCompleteWrite(writeTree.visibleWrites, path)) {
        // At this point we can probably guarantee that we're in case 2, meaning no events
        // May need to check visibility while doing the findRootMostValueAndPath call
        return null;
    }
    else {
        // No complete shadowing. We're either partially shadowing or not shadowing at all.
        const childMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, path);
        if (compoundWriteIsEmpty(childMerge)) {
            // We're not shadowing at all. Case 1
            return existingServerSnap.getChild(childPath);
        }
        else {
            // This could be more efficient if the serverNode + updates doesn't change the eventSnap
            // However this is tricky to find out, since user updates don't necessary change the server
            // snap, e.g. priority updates on empty nodes, or deep deletes. Another special case is if the server
            // adds nodes, but doesn't change any existing writes. It is therefore not enough to
            // only check if the updates change the serverNode.
            // Maybe check if the merge tree contains these special cases and only do a full overwrite in that case?
            return compoundWriteApply(childMerge, existingServerSnap.getChild(childPath));
        }
    }
}
/**
 * Returns a complete child for a given server snap after applying all user writes or null if there is no
 * complete child for this ChildKey.
 */
function writeTreeCalcCompleteChild(writeTree, treePath, childKey, existingServerSnap) {
    const path = pathChild(treePath, childKey);
    const shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
    if (shadowingNode != null) {
        return shadowingNode;
    }
    else {
        if (existingServerSnap.isCompleteForChild(childKey)) {
            const childMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, path);
            return compoundWriteApply(childMerge, existingServerSnap.getNode().getImmediateChild(childKey));
        }
        else {
            return null;
        }
    }
}
/**
 * Returns a node if there is a complete overwrite for this path. More specifically, if there is a write at
 * a higher path, this will return the child of that write relative to the write and this path.
 * Returns null if there is no write at this path.
 */
function writeTreeShadowingWrite(writeTree, path) {
    return compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
}
/**
 * This method is used when processing child remove events on a query. If we can, we pull in children that were outside
 * the window, but may now be in the window.
 */
function writeTreeCalcIndexedSlice(writeTree, treePath, completeServerData, startPost, count, reverse, index) {
    let toIterate;
    const merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
    const shadowingNode = compoundWriteGetCompleteNode(merge, newEmptyPath());
    if (shadowingNode != null) {
        toIterate = shadowingNode;
    }
    else if (completeServerData != null) {
        toIterate = compoundWriteApply(merge, completeServerData);
    }
    else {
        // no children to iterate on
        return [];
    }
    toIterate = toIterate.withIndex(index);
    if (!toIterate.isEmpty() && !toIterate.isLeafNode()) {
        const nodes = [];
        const cmp = index.getCompare();
        const iter = reverse
            ? toIterate.getReverseIteratorFrom(startPost, index)
            : toIterate.getIteratorFrom(startPost, index);
        let next = iter.getNext();
        while (next && nodes.length < count) {
            if (cmp(next, startPost) !== 0) {
                nodes.push(next);
            }
            next = iter.getNext();
        }
        return nodes;
    }
    else {
        return [];
    }
}
function newWriteTree() {
    return {
        visibleWrites: CompoundWrite.empty(),
        allWrites: [],
        lastWriteId: -1
    };
}
/**
 * If possible, returns a complete event cache, using the underlying server data if possible. In addition, can be used
 * to get a cache that includes hidden writes, and excludes arbitrary writes. Note that customizing the returned node
 * can lead to a more expensive calculation.
 *
 * @param writeIdsToExclude - Optional writes to exclude.
 * @param includeHiddenWrites - Defaults to false, whether or not to layer on writes with visible set to false
 */
function writeTreeRefCalcCompleteEventCache(writeTreeRef, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
    return writeTreeCalcCompleteEventCache(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites);
}
/**
 * If possible, returns a children node containing all of the complete children we have data for. The returned data is a
 * mix of the given server data and write data.
 *
 */
function writeTreeRefCalcCompleteEventChildren(writeTreeRef, completeServerChildren) {
    return writeTreeCalcCompleteEventChildren(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerChildren);
}
/**
 * Given that either the underlying server data has updated or the outstanding writes have updated, determine what,
 * if anything, needs to be applied to the event cache.
 *
 * Possibilities:
 *
 * 1. No writes are shadowing. Events should be raised, the snap to be applied comes from the server data
 *
 * 2. Some write is completely shadowing. No events to be raised
 *
 * 3. Is partially shadowed. Events should be raised
 *
 * Either existingEventSnap or existingServerSnap must exist, this is validated via an assert
 *
 *
 */
function writeTreeRefCalcEventCacheAfterServerOverwrite(writeTreeRef, path, existingEventSnap, existingServerSnap) {
    return writeTreeCalcEventCacheAfterServerOverwrite(writeTreeRef.writeTree, writeTreeRef.treePath, path, existingEventSnap, existingServerSnap);
}
/**
 * Returns a node if there is a complete overwrite for this path. More specifically, if there is a write at
 * a higher path, this will return the child of that write relative to the write and this path.
 * Returns null if there is no write at this path.
 *
 */
function writeTreeRefShadowingWrite(writeTreeRef, path) {
    return writeTreeShadowingWrite(writeTreeRef.writeTree, pathChild(writeTreeRef.treePath, path));
}
/**
 * This method is used when processing child remove events on a query. If we can, we pull in children that were outside
 * the window, but may now be in the window
 */
function writeTreeRefCalcIndexedSlice(writeTreeRef, completeServerData, startPost, count, reverse, index) {
    return writeTreeCalcIndexedSlice(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerData, startPost, count, reverse, index);
}
/**
 * Returns a complete child for a given server snap after applying all user writes or null if there is no
 * complete child for this ChildKey.
 */
function writeTreeRefCalcCompleteChild(writeTreeRef, childKey, existingServerCache) {
    return writeTreeCalcCompleteChild(writeTreeRef.writeTree, writeTreeRef.treePath, childKey, existingServerCache);
}
/**
 * Return a WriteTreeRef for a child.
 */
function writeTreeRefChild(writeTreeRef, childName) {
    return newWriteTreeRef(pathChild(writeTreeRef.treePath, childName), writeTreeRef.writeTree);
}
function newWriteTreeRef(path, writeTree) {
    return {
        treePath: path,
        writeTree
    };
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ChildChangeAccumulator {
    constructor() {
        this.changeMap = new Map();
    }
    trackChildChange(change) {
        const type = change.type;
        const childKey = change.childName;
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(type === "child_added" /* ChangeType.CHILD_ADDED */ ||
            type === "child_changed" /* ChangeType.CHILD_CHANGED */ ||
            type === "child_removed" /* ChangeType.CHILD_REMOVED */, 'Only child changes supported for tracking');
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(childKey !== '.priority', 'Only non-priority child changes can be tracked.');
        const oldChange = this.changeMap.get(childKey);
        if (oldChange) {
            const oldType = oldChange.type;
            if (type === "child_added" /* ChangeType.CHILD_ADDED */ &&
                oldType === "child_removed" /* ChangeType.CHILD_REMOVED */) {
                this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.snapshotNode));
            }
            else if (type === "child_removed" /* ChangeType.CHILD_REMOVED */ &&
                oldType === "child_added" /* ChangeType.CHILD_ADDED */) {
                this.changeMap.delete(childKey);
            }
            else if (type === "child_removed" /* ChangeType.CHILD_REMOVED */ &&
                oldType === "child_changed" /* ChangeType.CHILD_CHANGED */) {
                this.changeMap.set(childKey, changeChildRemoved(childKey, oldChange.oldSnap));
            }
            else if (type === "child_changed" /* ChangeType.CHILD_CHANGED */ &&
                oldType === "child_added" /* ChangeType.CHILD_ADDED */) {
                this.changeMap.set(childKey, changeChildAdded(childKey, change.snapshotNode));
            }
            else if (type === "child_changed" /* ChangeType.CHILD_CHANGED */ &&
                oldType === "child_changed" /* ChangeType.CHILD_CHANGED */) {
                this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.oldSnap));
            }
            else {
                throw (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assertionError)('Illegal combination of changes: ' +
                    change +
                    ' occurred after ' +
                    oldChange);
            }
        }
        else {
            this.changeMap.set(childKey, change);
        }
    }
    getChanges() {
        return Array.from(this.changeMap.values());
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An implementation of CompleteChildSource that never returns any additional children
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class NoCompleteChildSource_ {
    getCompleteChild(childKey) {
        return null;
    }
    getChildAfterChild(index, child, reverse) {
        return null;
    }
}
/**
 * Singleton instance.
 */
const NO_COMPLETE_CHILD_SOURCE = new NoCompleteChildSource_();
/**
 * An implementation of CompleteChildSource that uses a WriteTree in addition to any other server data or
 * old event caches available to calculate complete children.
 */
class WriteTreeCompleteChildSource {
    constructor(writes_, viewCache_, optCompleteServerCache_ = null) {
        this.writes_ = writes_;
        this.viewCache_ = viewCache_;
        this.optCompleteServerCache_ = optCompleteServerCache_;
    }
    getCompleteChild(childKey) {
        const node = this.viewCache_.eventCache;
        if (node.isCompleteForChild(childKey)) {
            return node.getNode().getImmediateChild(childKey);
        }
        else {
            const serverNode = this.optCompleteServerCache_ != null
                ? new CacheNode(this.optCompleteServerCache_, true, false)
                : this.viewCache_.serverCache;
            return writeTreeRefCalcCompleteChild(this.writes_, childKey, serverNode);
        }
    }
    getChildAfterChild(index, child, reverse) {
        const completeServerData = this.optCompleteServerCache_ != null
            ? this.optCompleteServerCache_
            : viewCacheGetCompleteServerSnap(this.viewCache_);
        const nodes = writeTreeRefCalcIndexedSlice(this.writes_, completeServerData, child, 1, reverse, index);
        if (nodes.length === 0) {
            return null;
        }
        else {
            return nodes[0];
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function newViewProcessor(filter) {
    return { filter };
}
function viewProcessorAssertIndexed(viewProcessor, viewCache) {
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(viewCache.eventCache.getNode().isIndexed(viewProcessor.filter.getIndex()), 'Event snap not indexed');
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(viewCache.serverCache.getNode().isIndexed(viewProcessor.filter.getIndex()), 'Server snap not indexed');
}
function viewProcessorApplyOperation(viewProcessor, oldViewCache, operation, writesCache, completeCache) {
    const accumulator = new ChildChangeAccumulator();
    let newViewCache, filterServerNode;
    if (operation.type === OperationType.OVERWRITE) {
        const overwrite = operation;
        if (overwrite.source.fromUser) {
            newViewCache = viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, accumulator);
        }
        else {
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(overwrite.source.fromServer, 'Unknown source.');
            // We filter the node if it's a tagged update or the node has been previously filtered  and the
            // update is not at the root in which case it is ok (and necessary) to mark the node unfiltered
            // again
            filterServerNode =
                overwrite.source.tagged ||
                    (oldViewCache.serverCache.isFiltered() && !pathIsEmpty(overwrite.path));
            newViewCache = viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, filterServerNode, accumulator);
        }
    }
    else if (operation.type === OperationType.MERGE) {
        const merge = operation;
        if (merge.source.fromUser) {
            newViewCache = viewProcessorApplyUserMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, accumulator);
        }
        else {
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(merge.source.fromServer, 'Unknown source.');
            // We filter the node if it's a tagged update or the node has been previously filtered
            filterServerNode =
                merge.source.tagged || oldViewCache.serverCache.isFiltered();
            newViewCache = viewProcessorApplyServerMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, filterServerNode, accumulator);
        }
    }
    else if (operation.type === OperationType.ACK_USER_WRITE) {
        const ackUserWrite = operation;
        if (!ackUserWrite.revert) {
            newViewCache = viewProcessorAckUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, ackUserWrite.affectedTree, writesCache, completeCache, accumulator);
        }
        else {
            newViewCache = viewProcessorRevertUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, writesCache, completeCache, accumulator);
        }
    }
    else if (operation.type === OperationType.LISTEN_COMPLETE) {
        newViewCache = viewProcessorListenComplete(viewProcessor, oldViewCache, operation.path, writesCache, accumulator);
    }
    else {
        throw (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assertionError)('Unknown operation type: ' + operation.type);
    }
    const changes = accumulator.getChanges();
    viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache, changes);
    return { viewCache: newViewCache, changes };
}
function viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache, accumulator) {
    const eventSnap = newViewCache.eventCache;
    if (eventSnap.isFullyInitialized()) {
        const isLeafOrEmpty = eventSnap.getNode().isLeafNode() || eventSnap.getNode().isEmpty();
        const oldCompleteSnap = viewCacheGetCompleteEventSnap(oldViewCache);
        if (accumulator.length > 0 ||
            !oldViewCache.eventCache.isFullyInitialized() ||
            (isLeafOrEmpty && !eventSnap.getNode().equals(oldCompleteSnap)) ||
            !eventSnap.getNode().getPriority().equals(oldCompleteSnap.getPriority())) {
            accumulator.push(changeValue(viewCacheGetCompleteEventSnap(newViewCache)));
        }
    }
}
function viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, viewCache, changePath, writesCache, source, accumulator) {
    const oldEventSnap = viewCache.eventCache;
    if (writeTreeRefShadowingWrite(writesCache, changePath) != null) {
        // we have a shadowing write, ignore changes
        return viewCache;
    }
    else {
        let newEventCache, serverNode;
        if (pathIsEmpty(changePath)) {
            // TODO: figure out how this plays with "sliding ack windows"
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(viewCache.serverCache.isFullyInitialized(), 'If change path is empty, we must have complete server data');
            if (viewCache.serverCache.isFiltered()) {
                // We need to special case this, because we need to only apply writes to complete children, or
                // we might end up raising events for incomplete children. If the server data is filtered deep
                // writes cannot be guaranteed to be complete
                const serverCache = viewCacheGetCompleteServerSnap(viewCache);
                const completeChildren = serverCache instanceof ChildrenNode
                    ? serverCache
                    : ChildrenNode.EMPTY_NODE;
                const completeEventChildren = writeTreeRefCalcCompleteEventChildren(writesCache, completeChildren);
                newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeEventChildren, accumulator);
            }
            else {
                const completeNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
                newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeNode, accumulator);
            }
        }
        else {
            const childKey = pathGetFront(changePath);
            if (childKey === '.priority') {
                (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(pathGetLength(changePath) === 1, "Can't have a priority with additional path components");
                const oldEventNode = oldEventSnap.getNode();
                serverNode = viewCache.serverCache.getNode();
                // we might have overwrites for this priority
                const updatedPriority = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventNode, serverNode);
                if (updatedPriority != null) {
                    newEventCache = viewProcessor.filter.updatePriority(oldEventNode, updatedPriority);
                }
                else {
                    // priority didn't change, keep old node
                    newEventCache = oldEventSnap.getNode();
                }
            }
            else {
                const childChangePath = pathPopFront(changePath);
                // update child
                let newEventChild;
                if (oldEventSnap.isCompleteForChild(childKey)) {
                    serverNode = viewCache.serverCache.getNode();
                    const eventChildUpdate = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventSnap.getNode(), serverNode);
                    if (eventChildUpdate != null) {
                        newEventChild = oldEventSnap
                            .getNode()
                            .getImmediateChild(childKey)
                            .updateChild(childChangePath, eventChildUpdate);
                    }
                    else {
                        // Nothing changed, just keep the old child
                        newEventChild = oldEventSnap.getNode().getImmediateChild(childKey);
                    }
                }
                else {
                    newEventChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
                }
                if (newEventChild != null) {
                    newEventCache = viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newEventChild, childChangePath, source, accumulator);
                }
                else {
                    // no complete child available or no change
                    newEventCache = oldEventSnap.getNode();
                }
            }
        }
        return viewCacheUpdateEventSnap(viewCache, newEventCache, oldEventSnap.isFullyInitialized() || pathIsEmpty(changePath), viewProcessor.filter.filtersNodes());
    }
}
function viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, filterServerNode, accumulator) {
    const oldServerSnap = oldViewCache.serverCache;
    let newServerCache;
    const serverFilter = filterServerNode
        ? viewProcessor.filter
        : viewProcessor.filter.getIndexedFilter();
    if (pathIsEmpty(changePath)) {
        newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), changedSnap, null);
    }
    else if (serverFilter.filtersNodes() && !oldServerSnap.isFiltered()) {
        // we want to filter the server node, but we didn't filter the server node yet, so simulate a full update
        const newServerNode = oldServerSnap
            .getNode()
            .updateChild(changePath, changedSnap);
        newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), newServerNode, null);
    }
    else {
        const childKey = pathGetFront(changePath);
        if (!oldServerSnap.isCompleteForPath(changePath) &&
            pathGetLength(changePath) > 1) {
            // We don't update incomplete nodes with updates intended for other listeners
            return oldViewCache;
        }
        const childChangePath = pathPopFront(changePath);
        const childNode = oldServerSnap.getNode().getImmediateChild(childKey);
        const newChildNode = childNode.updateChild(childChangePath, changedSnap);
        if (childKey === '.priority') {
            newServerCache = serverFilter.updatePriority(oldServerSnap.getNode(), newChildNode);
        }
        else {
            newServerCache = serverFilter.updateChild(oldServerSnap.getNode(), childKey, newChildNode, childChangePath, NO_COMPLETE_CHILD_SOURCE, null);
        }
    }
    const newViewCache = viewCacheUpdateServerSnap(oldViewCache, newServerCache, oldServerSnap.isFullyInitialized() || pathIsEmpty(changePath), serverFilter.filtersNodes());
    const source = new WriteTreeCompleteChildSource(writesCache, newViewCache, completeCache);
    return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, newViewCache, changePath, writesCache, source, accumulator);
}
function viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, accumulator) {
    const oldEventSnap = oldViewCache.eventCache;
    let newViewCache, newEventCache;
    const source = new WriteTreeCompleteChildSource(writesCache, oldViewCache, completeCache);
    if (pathIsEmpty(changePath)) {
        newEventCache = viewProcessor.filter.updateFullNode(oldViewCache.eventCache.getNode(), changedSnap, accumulator);
        newViewCache = viewCacheUpdateEventSnap(oldViewCache, newEventCache, true, viewProcessor.filter.filtersNodes());
    }
    else {
        const childKey = pathGetFront(changePath);
        if (childKey === '.priority') {
            newEventCache = viewProcessor.filter.updatePriority(oldViewCache.eventCache.getNode(), changedSnap);
            newViewCache = viewCacheUpdateEventSnap(oldViewCache, newEventCache, oldEventSnap.isFullyInitialized(), oldEventSnap.isFiltered());
        }
        else {
            const childChangePath = pathPopFront(changePath);
            const oldChild = oldEventSnap.getNode().getImmediateChild(childKey);
            let newChild;
            if (pathIsEmpty(childChangePath)) {
                // Child overwrite, we can replace the child
                newChild = changedSnap;
            }
            else {
                const childNode = source.getCompleteChild(childKey);
                if (childNode != null) {
                    if (pathGetBack(childChangePath) === '.priority' &&
                        childNode.getChild(pathParent(childChangePath)).isEmpty()) {
                        // This is a priority update on an empty node. If this node exists on the server, the
                        // server will send down the priority in the update, so ignore for now
                        newChild = childNode;
                    }
                    else {
                        newChild = childNode.updateChild(childChangePath, changedSnap);
                    }
                }
                else {
                    // There is no complete child node available
                    newChild = ChildrenNode.EMPTY_NODE;
                }
            }
            if (!oldChild.equals(newChild)) {
                const newEventSnap = viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newChild, childChangePath, source, accumulator);
                newViewCache = viewCacheUpdateEventSnap(oldViewCache, newEventSnap, oldEventSnap.isFullyInitialized(), viewProcessor.filter.filtersNodes());
            }
            else {
                newViewCache = oldViewCache;
            }
        }
    }
    return newViewCache;
}
function viewProcessorCacheHasChild(viewCache, childKey) {
    return viewCache.eventCache.isCompleteForChild(childKey);
}
function viewProcessorApplyUserMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, accumulator) {
    // HACK: In the case of a limit query, there may be some changes that bump things out of the
    // window leaving room for new items.  It's important we process these changes first, so we
    // iterate the changes twice, first processing any that affect items currently in view.
    // TODO: I consider an item "in view" if cacheHasChild is true, which checks both the server
    // and event snap.  I'm not sure if this will result in edge cases when a child is in one but
    // not the other.
    let curViewCache = viewCache;
    changedChildren.foreach((relativePath, childNode) => {
        const writePath = pathChild(path, relativePath);
        if (viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) {
            curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
        }
    });
    changedChildren.foreach((relativePath, childNode) => {
        const writePath = pathChild(path, relativePath);
        if (!viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) {
            curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
        }
    });
    return curViewCache;
}
function viewProcessorApplyMerge(viewProcessor, node, merge) {
    merge.foreach((relativePath, childNode) => {
        node = node.updateChild(relativePath, childNode);
    });
    return node;
}
function viewProcessorApplyServerMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, filterServerNode, accumulator) {
    // If we don't have a cache yet, this merge was intended for a previously listen in the same location. Ignore it and
    // wait for the complete data update coming soon.
    if (viewCache.serverCache.getNode().isEmpty() &&
        !viewCache.serverCache.isFullyInitialized()) {
        return viewCache;
    }
    // HACK: In the case of a limit query, there may be some changes that bump things out of the
    // window leaving room for new items.  It's important we process these changes first, so we
    // iterate the changes twice, first processing any that affect items currently in view.
    // TODO: I consider an item "in view" if cacheHasChild is true, which checks both the server
    // and event snap.  I'm not sure if this will result in edge cases when a child is in one but
    // not the other.
    let curViewCache = viewCache;
    let viewMergeTree;
    if (pathIsEmpty(path)) {
        viewMergeTree = changedChildren;
    }
    else {
        viewMergeTree = new ImmutableTree(null).setTree(path, changedChildren);
    }
    const serverNode = viewCache.serverCache.getNode();
    viewMergeTree.children.inorderTraversal((childKey, childTree) => {
        if (serverNode.hasChild(childKey)) {
            const serverChild = viewCache.serverCache
                .getNode()
                .getImmediateChild(childKey);
            const newChild = viewProcessorApplyMerge(viewProcessor, serverChild, childTree);
            curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
        }
    });
    viewMergeTree.children.inorderTraversal((childKey, childMergeTree) => {
        const isUnknownDeepMerge = !viewCache.serverCache.isCompleteForChild(childKey) &&
            childMergeTree.value === null;
        if (!serverNode.hasChild(childKey) && !isUnknownDeepMerge) {
            const serverChild = viewCache.serverCache
                .getNode()
                .getImmediateChild(childKey);
            const newChild = viewProcessorApplyMerge(viewProcessor, serverChild, childMergeTree);
            curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
        }
    });
    return curViewCache;
}
function viewProcessorAckUserWrite(viewProcessor, viewCache, ackPath, affectedTree, writesCache, completeCache, accumulator) {
    if (writeTreeRefShadowingWrite(writesCache, ackPath) != null) {
        return viewCache;
    }
    // Only filter server node if it is currently filtered
    const filterServerNode = viewCache.serverCache.isFiltered();
    // Essentially we'll just get our existing server cache for the affected paths and re-apply it as a server update
    // now that it won't be shadowed.
    const serverCache = viewCache.serverCache;
    if (affectedTree.value != null) {
        // This is an overwrite.
        if ((pathIsEmpty(ackPath) && serverCache.isFullyInitialized()) ||
            serverCache.isCompleteForPath(ackPath)) {
            return viewProcessorApplyServerOverwrite(viewProcessor, viewCache, ackPath, serverCache.getNode().getChild(ackPath), writesCache, completeCache, filterServerNode, accumulator);
        }
        else if (pathIsEmpty(ackPath)) {
            // This is a goofy edge case where we are acking data at this location but don't have full data.  We
            // should just re-apply whatever we have in our cache as a merge.
            let changedChildren = new ImmutableTree(null);
            serverCache.getNode().forEachChild(KEY_INDEX, (name, node) => {
                changedChildren = changedChildren.set(new Path(name), node);
            });
            return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, changedChildren, writesCache, completeCache, filterServerNode, accumulator);
        }
        else {
            return viewCache;
        }
    }
    else {
        // This is a merge.
        let changedChildren = new ImmutableTree(null);
        affectedTree.foreach((mergePath, value) => {
            const serverCachePath = pathChild(ackPath, mergePath);
            if (serverCache.isCompleteForPath(serverCachePath)) {
                changedChildren = changedChildren.set(mergePath, serverCache.getNode().getChild(serverCachePath));
            }
        });
        return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, changedChildren, writesCache, completeCache, filterServerNode, accumulator);
    }
}
function viewProcessorListenComplete(viewProcessor, viewCache, path, writesCache, accumulator) {
    const oldServerNode = viewCache.serverCache;
    const newViewCache = viewCacheUpdateServerSnap(viewCache, oldServerNode.getNode(), oldServerNode.isFullyInitialized() || pathIsEmpty(path), oldServerNode.isFiltered());
    return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, newViewCache, path, writesCache, NO_COMPLETE_CHILD_SOURCE, accumulator);
}
function viewProcessorRevertUserWrite(viewProcessor, viewCache, path, writesCache, completeServerCache, accumulator) {
    let complete;
    if (writeTreeRefShadowingWrite(writesCache, path) != null) {
        return viewCache;
    }
    else {
        const source = new WriteTreeCompleteChildSource(writesCache, viewCache, completeServerCache);
        const oldEventCache = viewCache.eventCache.getNode();
        let newEventCache;
        if (pathIsEmpty(path) || pathGetFront(path) === '.priority') {
            let newNode;
            if (viewCache.serverCache.isFullyInitialized()) {
                newNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
            }
            else {
                const serverChildren = viewCache.serverCache.getNode();
                (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(serverChildren instanceof ChildrenNode, 'serverChildren would be complete if leaf node');
                newNode = writeTreeRefCalcCompleteEventChildren(writesCache, serverChildren);
            }
            newNode = newNode;
            newEventCache = viewProcessor.filter.updateFullNode(oldEventCache, newNode, accumulator);
        }
        else {
            const childKey = pathGetFront(path);
            let newChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
            if (newChild == null &&
                viewCache.serverCache.isCompleteForChild(childKey)) {
                newChild = oldEventCache.getImmediateChild(childKey);
            }
            if (newChild != null) {
                newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, newChild, pathPopFront(path), source, accumulator);
            }
            else if (viewCache.eventCache.getNode().hasChild(childKey)) {
                // No complete child available, delete the existing one, if any
                newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, ChildrenNode.EMPTY_NODE, pathPopFront(path), source, accumulator);
            }
            else {
                newEventCache = oldEventCache;
            }
            if (newEventCache.isEmpty() &&
                viewCache.serverCache.isFullyInitialized()) {
                // We might have reverted all child writes. Maybe the old event was a leaf node
                complete = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
                if (complete.isLeafNode()) {
                    newEventCache = viewProcessor.filter.updateFullNode(newEventCache, complete, accumulator);
                }
            }
        }
        complete =
            viewCache.serverCache.isFullyInitialized() ||
                writeTreeRefShadowingWrite(writesCache, newEmptyPath()) != null;
        return viewCacheUpdateEventSnap(viewCache, newEventCache, complete, viewProcessor.filter.filtersNodes());
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A view represents a specific location and query that has 1 or more event registrations.
 *
 * It does several things:
 *  - Maintains the list of event registrations for this location/query.
 *  - Maintains a cache of the data visible for this location/query.
 *  - Applies new operations (via applyOperation), updates the cache, and based on the event
 *    registrations returns the set of events to be raised.
 */
class View {
    constructor(query_, initialViewCache) {
        this.query_ = query_;
        this.eventRegistrations_ = [];
        const params = this.query_._queryParams;
        const indexFilter = new IndexedFilter(params.getIndex());
        const filter = queryParamsGetNodeFilter(params);
        this.processor_ = newViewProcessor(filter);
        const initialServerCache = initialViewCache.serverCache;
        const initialEventCache = initialViewCache.eventCache;
        // Don't filter server node with other filter than index, wait for tagged listen
        const serverSnap = indexFilter.updateFullNode(ChildrenNode.EMPTY_NODE, initialServerCache.getNode(), null);
        const eventSnap = filter.updateFullNode(ChildrenNode.EMPTY_NODE, initialEventCache.getNode(), null);
        const newServerCache = new CacheNode(serverSnap, initialServerCache.isFullyInitialized(), indexFilter.filtersNodes());
        const newEventCache = new CacheNode(eventSnap, initialEventCache.isFullyInitialized(), filter.filtersNodes());
        this.viewCache_ = newViewCache(newEventCache, newServerCache);
        this.eventGenerator_ = new EventGenerator(this.query_);
    }
    get query() {
        return this.query_;
    }
}
function viewGetServerCache(view) {
    return view.viewCache_.serverCache.getNode();
}
function viewGetCompleteNode(view) {
    return viewCacheGetCompleteEventSnap(view.viewCache_);
}
function viewGetCompleteServerCache(view, path) {
    const cache = viewCacheGetCompleteServerSnap(view.viewCache_);
    if (cache) {
        // If this isn't a "loadsAllData" view, then cache isn't actually a complete cache and
        // we need to see if it contains the child we're interested in.
        if (view.query._queryParams.loadsAllData() ||
            (!pathIsEmpty(path) &&
                !cache.getImmediateChild(pathGetFront(path)).isEmpty())) {
            return cache.getChild(path);
        }
    }
    return null;
}
function viewIsEmpty(view) {
    return view.eventRegistrations_.length === 0;
}
function viewAddEventRegistration(view, eventRegistration) {
    view.eventRegistrations_.push(eventRegistration);
}
/**
 * @param eventRegistration - If null, remove all callbacks.
 * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
 * @returns Cancel events, if cancelError was provided.
 */
function viewRemoveEventRegistration(view, eventRegistration, cancelError) {
    const cancelEvents = [];
    if (cancelError) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(eventRegistration == null, 'A cancel should cancel all event registrations.');
        const path = view.query._path;
        view.eventRegistrations_.forEach(registration => {
            const maybeEvent = registration.createCancelEvent(cancelError, path);
            if (maybeEvent) {
                cancelEvents.push(maybeEvent);
            }
        });
    }
    if (eventRegistration) {
        let remaining = [];
        for (let i = 0; i < view.eventRegistrations_.length; ++i) {
            const existing = view.eventRegistrations_[i];
            if (!existing.matches(eventRegistration)) {
                remaining.push(existing);
            }
            else if (eventRegistration.hasAnyCallback()) {
                // We're removing just this one
                remaining = remaining.concat(view.eventRegistrations_.slice(i + 1));
                break;
            }
        }
        view.eventRegistrations_ = remaining;
    }
    else {
        view.eventRegistrations_ = [];
    }
    return cancelEvents;
}
/**
 * Applies the given Operation, updates our cache, and returns the appropriate events.
 */
function viewApplyOperation(view, operation, writesCache, completeServerCache) {
    if (operation.type === OperationType.MERGE &&
        operation.source.queryId !== null) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(viewCacheGetCompleteServerSnap(view.viewCache_), 'We should always have a full cache before handling merges');
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(viewCacheGetCompleteEventSnap(view.viewCache_), 'Missing event cache, even though we have a server cache');
    }
    const oldViewCache = view.viewCache_;
    const result = viewProcessorApplyOperation(view.processor_, oldViewCache, operation, writesCache, completeServerCache);
    viewProcessorAssertIndexed(view.processor_, result.viewCache);
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(result.viewCache.serverCache.isFullyInitialized() ||
        !oldViewCache.serverCache.isFullyInitialized(), 'Once a server snap is complete, it should never go back');
    view.viewCache_ = result.viewCache;
    return viewGenerateEventsForChanges_(view, result.changes, result.viewCache.eventCache.getNode(), null);
}
function viewGetInitialEvents(view, registration) {
    const eventSnap = view.viewCache_.eventCache;
    const initialChanges = [];
    if (!eventSnap.getNode().isLeafNode()) {
        const eventNode = eventSnap.getNode();
        eventNode.forEachChild(PRIORITY_INDEX, (key, childNode) => {
            initialChanges.push(changeChildAdded(key, childNode));
        });
    }
    if (eventSnap.isFullyInitialized()) {
        initialChanges.push(changeValue(eventSnap.getNode()));
    }
    return viewGenerateEventsForChanges_(view, initialChanges, eventSnap.getNode(), registration);
}
function viewGenerateEventsForChanges_(view, changes, eventCache, eventRegistration) {
    const registrations = eventRegistration
        ? [eventRegistration]
        : view.eventRegistrations_;
    return eventGeneratorGenerateEventsForChanges(view.eventGenerator_, changes, eventCache, registrations);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let referenceConstructor$1;
/**
 * SyncPoint represents a single location in a SyncTree with 1 or more event registrations, meaning we need to
 * maintain 1 or more Views at this location to cache server data and raise appropriate events for server changes
 * and user writes (set, transaction, update).
 *
 * It's responsible for:
 *  - Maintaining the set of 1 or more views necessary at this location (a SyncPoint with 0 views should be removed).
 *  - Proxying user / server operations to the views as appropriate (i.e. applyServerOverwrite,
 *    applyUserOverwrite, etc.)
 */
class SyncPoint {
    constructor() {
        /**
         * The Views being tracked at this location in the tree, stored as a map where the key is a
         * queryId and the value is the View for that query.
         *
         * NOTE: This list will be quite small (usually 1, but perhaps 2 or 3; any more is an odd use case).
         */
        this.views = new Map();
    }
}
function syncPointSetReferenceConstructor(val) {
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(!referenceConstructor$1, '__referenceConstructor has already been defined');
    referenceConstructor$1 = val;
}
function syncPointGetReferenceConstructor() {
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(referenceConstructor$1, 'Reference.ts has not been loaded');
    return referenceConstructor$1;
}
function syncPointIsEmpty(syncPoint) {
    return syncPoint.views.size === 0;
}
function syncPointApplyOperation(syncPoint, operation, writesCache, optCompleteServerCache) {
    const queryId = operation.source.queryId;
    if (queryId !== null) {
        const view = syncPoint.views.get(queryId);
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(view != null, 'SyncTree gave us an op for an invalid query.');
        return viewApplyOperation(view, operation, writesCache, optCompleteServerCache);
    }
    else {
        let events = [];
        for (const view of syncPoint.views.values()) {
            events = events.concat(viewApplyOperation(view, operation, writesCache, optCompleteServerCache));
        }
        return events;
    }
}
/**
 * Get a view for the specified query.
 *
 * @param query - The query to return a view for
 * @param writesCache
 * @param serverCache
 * @param serverCacheComplete
 * @returns Events to raise.
 */
function syncPointGetView(syncPoint, query, writesCache, serverCache, serverCacheComplete) {
    const queryId = query._queryIdentifier;
    const view = syncPoint.views.get(queryId);
    if (!view) {
        // TODO: make writesCache take flag for complete server node
        let eventCache = writeTreeRefCalcCompleteEventCache(writesCache, serverCacheComplete ? serverCache : null);
        let eventCacheComplete = false;
        if (eventCache) {
            eventCacheComplete = true;
        }
        else if (serverCache instanceof ChildrenNode) {
            eventCache = writeTreeRefCalcCompleteEventChildren(writesCache, serverCache);
            eventCacheComplete = false;
        }
        else {
            eventCache = ChildrenNode.EMPTY_NODE;
            eventCacheComplete = false;
        }
        const viewCache = newViewCache(new CacheNode(eventCache, eventCacheComplete, false), new CacheNode(serverCache, serverCacheComplete, false));
        return new View(query, viewCache);
    }
    return view;
}
/**
 * Add an event callback for the specified query.
 *
 * @param query
 * @param eventRegistration
 * @param writesCache
 * @param serverCache - Complete server cache, if we have it.
 * @param serverCacheComplete
 * @returns Events to raise.
 */
function syncPointAddEventRegistration(syncPoint, query, eventRegistration, writesCache, serverCache, serverCacheComplete) {
    const view = syncPointGetView(syncPoint, query, writesCache, serverCache, serverCacheComplete);
    if (!syncPoint.views.has(query._queryIdentifier)) {
        syncPoint.views.set(query._queryIdentifier, view);
    }
    // This is guaranteed to exist now, we just created anything that was missing
    viewAddEventRegistration(view, eventRegistration);
    return viewGetInitialEvents(view, eventRegistration);
}
/**
 * Remove event callback(s).  Return cancelEvents if a cancelError is specified.
 *
 * If query is the default query, we'll check all views for the specified eventRegistration.
 * If eventRegistration is null, we'll remove all callbacks for the specified view(s).
 *
 * @param eventRegistration - If null, remove all callbacks.
 * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
 * @returns removed queries and any cancel events
 */
function syncPointRemoveEventRegistration(syncPoint, query, eventRegistration, cancelError) {
    const queryId = query._queryIdentifier;
    const removed = [];
    let cancelEvents = [];
    const hadCompleteView = syncPointHasCompleteView(syncPoint);
    if (queryId === 'default') {
        // When you do ref.off(...), we search all views for the registration to remove.
        for (const [viewQueryId, view] of syncPoint.views.entries()) {
            cancelEvents = cancelEvents.concat(viewRemoveEventRegistration(view, eventRegistration, cancelError));
            if (viewIsEmpty(view)) {
                syncPoint.views.delete(viewQueryId);
                // We'll deal with complete views later.
                if (!view.query._queryParams.loadsAllData()) {
                    removed.push(view.query);
                }
            }
        }
    }
    else {
        // remove the callback from the specific view.
        const view = syncPoint.views.get(queryId);
        if (view) {
            cancelEvents = cancelEvents.concat(viewRemoveEventRegistration(view, eventRegistration, cancelError));
            if (viewIsEmpty(view)) {
                syncPoint.views.delete(queryId);
                // We'll deal with complete views later.
                if (!view.query._queryParams.loadsAllData()) {
                    removed.push(view.query);
                }
            }
        }
    }
    if (hadCompleteView && !syncPointHasCompleteView(syncPoint)) {
        // We removed our last complete view.
        removed.push(new (syncPointGetReferenceConstructor())(query._repo, query._path));
    }
    return { removed, events: cancelEvents };
}
function syncPointGetQueryViews(syncPoint) {
    const result = [];
    for (const view of syncPoint.views.values()) {
        if (!view.query._queryParams.loadsAllData()) {
            result.push(view);
        }
    }
    return result;
}
/**
 * @param path - The path to the desired complete snapshot
 * @returns A complete cache, if it exists
 */
function syncPointGetCompleteServerCache(syncPoint, path) {
    let serverCache = null;
    for (const view of syncPoint.views.values()) {
        serverCache = serverCache || viewGetCompleteServerCache(view, path);
    }
    return serverCache;
}
function syncPointViewForQuery(syncPoint, query) {
    const params = query._queryParams;
    if (params.loadsAllData()) {
        return syncPointGetCompleteView(syncPoint);
    }
    else {
        const queryId = query._queryIdentifier;
        return syncPoint.views.get(queryId);
    }
}
function syncPointViewExistsForQuery(syncPoint, query) {
    return syncPointViewForQuery(syncPoint, query) != null;
}
function syncPointHasCompleteView(syncPoint) {
    return syncPointGetCompleteView(syncPoint) != null;
}
function syncPointGetCompleteView(syncPoint) {
    for (const view of syncPoint.views.values()) {
        if (view.query._queryParams.loadsAllData()) {
            return view;
        }
    }
    return null;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let referenceConstructor;
function syncTreeSetReferenceConstructor(val) {
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(!referenceConstructor, '__referenceConstructor has already been defined');
    referenceConstructor = val;
}
function syncTreeGetReferenceConstructor() {
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(referenceConstructor, 'Reference.ts has not been loaded');
    return referenceConstructor;
}
/**
 * Static tracker for next query tag.
 */
let syncTreeNextQueryTag_ = 1;
/**
 * SyncTree is the central class for managing event callback registration, data caching, views
 * (query processing), and event generation.  There are typically two SyncTree instances for
 * each Repo, one for the normal Firebase data, and one for the .info data.
 *
 * It has a number of responsibilities, including:
 *  - Tracking all user event callbacks (registered via addEventRegistration() and removeEventRegistration()).
 *  - Applying and caching data changes for user set(), transaction(), and update() calls
 *    (applyUserOverwrite(), applyUserMerge()).
 *  - Applying and caching data changes for server data changes (applyServerOverwrite(),
 *    applyServerMerge()).
 *  - Generating user-facing events for server and user changes (all of the apply* methods
 *    return the set of events that need to be raised as a result).
 *  - Maintaining the appropriate set of server listens to ensure we are always subscribed
 *    to the correct set of paths and queries to satisfy the current set of user event
 *    callbacks (listens are started/stopped using the provided listenProvider).
 *
 * NOTE: Although SyncTree tracks event callbacks and calculates events to raise, the actual
 * events are returned to the caller rather than raised synchronously.
 *
 */
class SyncTree {
    /**
     * @param listenProvider_ - Used by SyncTree to start / stop listening
     *   to server data.
     */
    constructor(listenProvider_) {
        this.listenProvider_ = listenProvider_;
        /**
         * Tree of SyncPoints.  There's a SyncPoint at any location that has 1 or more views.
         */
        this.syncPointTree_ = new ImmutableTree(null);
        /**
         * A tree of all pending user writes (user-initiated set()'s, transaction()'s, update()'s, etc.).
         */
        this.pendingWriteTree_ = newWriteTree();
        this.tagToQueryMap = new Map();
        this.queryToTagMap = new Map();
    }
}
/**
 * Apply the data changes for a user-generated set() or transaction() call.
 *
 * @returns Events to raise.
 */
function syncTreeApplyUserOverwrite(syncTree, path, newData, writeId, visible) {
    // Record pending write.
    writeTreeAddOverwrite(syncTree.pendingWriteTree_, path, newData, writeId, visible);
    if (!visible) {
        return [];
    }
    else {
        return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceUser(), path, newData));
    }
}
/**
 * Apply the data from a user-generated update() call
 *
 * @returns Events to raise.
 */
function syncTreeApplyUserMerge(syncTree, path, changedChildren, writeId) {
    // Record pending merge.
    writeTreeAddMerge(syncTree.pendingWriteTree_, path, changedChildren, writeId);
    const changeTree = ImmutableTree.fromObject(changedChildren);
    return syncTreeApplyOperationToSyncPoints_(syncTree, new Merge(newOperationSourceUser(), path, changeTree));
}
/**
 * Acknowledge a pending user write that was previously registered with applyUserOverwrite() or applyUserMerge().
 *
 * @param revert - True if the given write failed and needs to be reverted
 * @returns Events to raise.
 */
function syncTreeAckUserWrite(syncTree, writeId, revert = false) {
    const write = writeTreeGetWrite(syncTree.pendingWriteTree_, writeId);
    const needToReevaluate = writeTreeRemoveWrite(syncTree.pendingWriteTree_, writeId);
    if (!needToReevaluate) {
        return [];
    }
    else {
        let affectedTree = new ImmutableTree(null);
        if (write.snap != null) {
            // overwrite
            affectedTree = affectedTree.set(newEmptyPath(), true);
        }
        else {
            each(write.children, (pathString) => {
                affectedTree = affectedTree.set(new Path(pathString), true);
            });
        }
        return syncTreeApplyOperationToSyncPoints_(syncTree, new AckUserWrite(write.path, affectedTree, revert));
    }
}
/**
 * Apply new server data for the specified path..
 *
 * @returns Events to raise.
 */
function syncTreeApplyServerOverwrite(syncTree, path, newData) {
    return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceServer(), path, newData));
}
/**
 * Apply new server data to be merged in at the specified path.
 *
 * @returns Events to raise.
 */
function syncTreeApplyServerMerge(syncTree, path, changedChildren) {
    const changeTree = ImmutableTree.fromObject(changedChildren);
    return syncTreeApplyOperationToSyncPoints_(syncTree, new Merge(newOperationSourceServer(), path, changeTree));
}
/**
 * Apply a listen complete for a query
 *
 * @returns Events to raise.
 */
function syncTreeApplyListenComplete(syncTree, path) {
    return syncTreeApplyOperationToSyncPoints_(syncTree, new ListenComplete(newOperationSourceServer(), path));
}
/**
 * Apply a listen complete for a tagged query
 *
 * @returns Events to raise.
 */
function syncTreeApplyTaggedListenComplete(syncTree, path, tag) {
    const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
    if (queryKey) {
        const r = syncTreeParseQueryKey_(queryKey);
        const queryPath = r.path, queryId = r.queryId;
        const relativePath = newRelativePath(queryPath, path);
        const op = new ListenComplete(newOperationSourceServerTaggedQuery(queryId), relativePath);
        return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
    }
    else {
        // We've already removed the query. No big deal, ignore the update
        return [];
    }
}
/**
 * Remove event callback(s).
 *
 * If query is the default query, we'll check all queries for the specified eventRegistration.
 * If eventRegistration is null, we'll remove all callbacks for the specified query/queries.
 *
 * @param eventRegistration - If null, all callbacks are removed.
 * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
 * @param skipListenerDedup - When performing a `get()`, we don't add any new listeners, so no
 *  deduping needs to take place. This flag allows toggling of that behavior
 * @returns Cancel events, if cancelError was provided.
 */
function syncTreeRemoveEventRegistration(syncTree, query, eventRegistration, cancelError, skipListenerDedup = false) {
    // Find the syncPoint first. Then deal with whether or not it has matching listeners
    const path = query._path;
    const maybeSyncPoint = syncTree.syncPointTree_.get(path);
    let cancelEvents = [];
    // A removal on a default query affects all queries at that location. A removal on an indexed query, even one without
    // other query constraints, does *not* affect all queries at that location. So this check must be for 'default', and
    // not loadsAllData().
    if (maybeSyncPoint &&
        (query._queryIdentifier === 'default' ||
            syncPointViewExistsForQuery(maybeSyncPoint, query))) {
        const removedAndEvents = syncPointRemoveEventRegistration(maybeSyncPoint, query, eventRegistration, cancelError);
        if (syncPointIsEmpty(maybeSyncPoint)) {
            syncTree.syncPointTree_ = syncTree.syncPointTree_.remove(path);
        }
        const removed = removedAndEvents.removed;
        cancelEvents = removedAndEvents.events;
        if (!skipListenerDedup) {
            /**
             * We may have just removed one of many listeners and can short-circuit this whole process
             * We may also not have removed a default listener, in which case all of the descendant listeners should already be
             * properly set up.
             */
            // Since indexed queries can shadow if they don't have other query constraints, check for loadsAllData(), instead of
            // queryId === 'default'
            const removingDefault = -1 !==
                removed.findIndex(query => {
                    return query._queryParams.loadsAllData();
                });
            const covered = syncTree.syncPointTree_.findOnPath(path, (relativePath, parentSyncPoint) => syncPointHasCompleteView(parentSyncPoint));
            if (removingDefault && !covered) {
                const subtree = syncTree.syncPointTree_.subtree(path);
                // There are potentially child listeners. Determine what if any listens we need to send before executing the
                // removal
                if (!subtree.isEmpty()) {
                    // We need to fold over our subtree and collect the listeners to send
                    const newViews = syncTreeCollectDistinctViewsForSubTree_(subtree);
                    // Ok, we've collected all the listens we need. Set them up.
                    for (let i = 0; i < newViews.length; ++i) {
                        const view = newViews[i], newQuery = view.query;
                        const listener = syncTreeCreateListenerForView_(syncTree, view);
                        syncTree.listenProvider_.startListening(syncTreeQueryForListening_(newQuery), syncTreeTagForQuery(syncTree, newQuery), listener.hashFn, listener.onComplete);
                    }
                }
                // Otherwise there's nothing below us, so nothing we need to start listening on
            }
            // If we removed anything and we're not covered by a higher up listen, we need to stop listening on this query
            // The above block has us covered in terms of making sure we're set up on listens lower in the tree.
            // Also, note that if we have a cancelError, it's already been removed at the provider level.
            if (!covered && removed.length > 0 && !cancelError) {
                // If we removed a default, then we weren't listening on any of the other queries here. Just cancel the one
                // default. Otherwise, we need to iterate through and cancel each individual query
                if (removingDefault) {
                    // We don't tag default listeners
                    const defaultTag = null;
                    syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(query), defaultTag);
                }
                else {
                    removed.forEach((queryToRemove) => {
                        const tagToRemove = syncTree.queryToTagMap.get(syncTreeMakeQueryKey_(queryToRemove));
                        syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToRemove), tagToRemove);
                    });
                }
            }
        }
        // Now, clear all of the tags we're tracking for the removed listens
        syncTreeRemoveTags_(syncTree, removed);
    }
    return cancelEvents;
}
/**
 * Apply new server data for the specified tagged query.
 *
 * @returns Events to raise.
 */
function syncTreeApplyTaggedQueryOverwrite(syncTree, path, snap, tag) {
    const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
    if (queryKey != null) {
        const r = syncTreeParseQueryKey_(queryKey);
        const queryPath = r.path, queryId = r.queryId;
        const relativePath = newRelativePath(queryPath, path);
        const op = new Overwrite(newOperationSourceServerTaggedQuery(queryId), relativePath, snap);
        return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
    }
    else {
        // Query must have been removed already
        return [];
    }
}
/**
 * Apply server data to be merged in for the specified tagged query.
 *
 * @returns Events to raise.
 */
function syncTreeApplyTaggedQueryMerge(syncTree, path, changedChildren, tag) {
    const queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
    if (queryKey) {
        const r = syncTreeParseQueryKey_(queryKey);
        const queryPath = r.path, queryId = r.queryId;
        const relativePath = newRelativePath(queryPath, path);
        const changeTree = ImmutableTree.fromObject(changedChildren);
        const op = new Merge(newOperationSourceServerTaggedQuery(queryId), relativePath, changeTree);
        return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
    }
    else {
        // We've already removed the query. No big deal, ignore the update
        return [];
    }
}
/**
 * Add an event callback for the specified query.
 *
 * @returns Events to raise.
 */
function syncTreeAddEventRegistration(syncTree, query, eventRegistration, skipSetupListener = false) {
    const path = query._path;
    let serverCache = null;
    let foundAncestorDefaultView = false;
    // Any covering writes will necessarily be at the root, so really all we need to find is the server cache.
    // Consider optimizing this once there's a better understanding of what actual behavior will be.
    syncTree.syncPointTree_.foreachOnPath(path, (pathToSyncPoint, sp) => {
        const relativePath = newRelativePath(pathToSyncPoint, path);
        serverCache =
            serverCache || syncPointGetCompleteServerCache(sp, relativePath);
        foundAncestorDefaultView =
            foundAncestorDefaultView || syncPointHasCompleteView(sp);
    });
    let syncPoint = syncTree.syncPointTree_.get(path);
    if (!syncPoint) {
        syncPoint = new SyncPoint();
        syncTree.syncPointTree_ = syncTree.syncPointTree_.set(path, syncPoint);
    }
    else {
        foundAncestorDefaultView =
            foundAncestorDefaultView || syncPointHasCompleteView(syncPoint);
        serverCache =
            serverCache || syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
    }
    let serverCacheComplete;
    if (serverCache != null) {
        serverCacheComplete = true;
    }
    else {
        serverCacheComplete = false;
        serverCache = ChildrenNode.EMPTY_NODE;
        const subtree = syncTree.syncPointTree_.subtree(path);
        subtree.foreachChild((childName, childSyncPoint) => {
            const completeCache = syncPointGetCompleteServerCache(childSyncPoint, newEmptyPath());
            if (completeCache) {
                serverCache = serverCache.updateImmediateChild(childName, completeCache);
            }
        });
    }
    const viewAlreadyExists = syncPointViewExistsForQuery(syncPoint, query);
    if (!viewAlreadyExists && !query._queryParams.loadsAllData()) {
        // We need to track a tag for this query
        const queryKey = syncTreeMakeQueryKey_(query);
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(!syncTree.queryToTagMap.has(queryKey), 'View does not exist, but we have a tag');
        const tag = syncTreeGetNextQueryTag_();
        syncTree.queryToTagMap.set(queryKey, tag);
        syncTree.tagToQueryMap.set(tag, queryKey);
    }
    const writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, path);
    let events = syncPointAddEventRegistration(syncPoint, query, eventRegistration, writesCache, serverCache, serverCacheComplete);
    if (!viewAlreadyExists && !foundAncestorDefaultView && !skipSetupListener) {
        const view = syncPointViewForQuery(syncPoint, query);
        events = events.concat(syncTreeSetupListener_(syncTree, query, view));
    }
    return events;
}
/**
 * Returns a complete cache, if we have one, of the data at a particular path. If the location does not have a
 * listener above it, we will get a false "null". This shouldn't be a problem because transactions will always
 * have a listener above, and atomic operations would correctly show a jitter of <increment value> ->
 *     <incremented total> as the write is applied locally and then acknowledged at the server.
 *
 * Note: this method will *include* hidden writes from transaction with applyLocally set to false.
 *
 * @param path - The path to the data we want
 * @param writeIdsToExclude - A specific set to be excluded
 */
function syncTreeCalcCompleteEventCache(syncTree, path, writeIdsToExclude) {
    const includeHiddenSets = true;
    const writeTree = syncTree.pendingWriteTree_;
    const serverCache = syncTree.syncPointTree_.findOnPath(path, (pathSoFar, syncPoint) => {
        const relativePath = newRelativePath(pathSoFar, path);
        const serverCache = syncPointGetCompleteServerCache(syncPoint, relativePath);
        if (serverCache) {
            return serverCache;
        }
    });
    return writeTreeCalcCompleteEventCache(writeTree, path, serverCache, writeIdsToExclude, includeHiddenSets);
}
function syncTreeGetServerValue(syncTree, query) {
    const path = query._path;
    let serverCache = null;
    // Any covering writes will necessarily be at the root, so really all we need to find is the server cache.
    // Consider optimizing this once there's a better understanding of what actual behavior will be.
    syncTree.syncPointTree_.foreachOnPath(path, (pathToSyncPoint, sp) => {
        const relativePath = newRelativePath(pathToSyncPoint, path);
        serverCache =
            serverCache || syncPointGetCompleteServerCache(sp, relativePath);
    });
    let syncPoint = syncTree.syncPointTree_.get(path);
    if (!syncPoint) {
        syncPoint = new SyncPoint();
        syncTree.syncPointTree_ = syncTree.syncPointTree_.set(path, syncPoint);
    }
    else {
        serverCache =
            serverCache || syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
    }
    const serverCacheComplete = serverCache != null;
    const serverCacheNode = serverCacheComplete
        ? new CacheNode(serverCache, true, false)
        : null;
    const writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, query._path);
    const view = syncPointGetView(syncPoint, query, writesCache, serverCacheComplete ? serverCacheNode.getNode() : ChildrenNode.EMPTY_NODE, serverCacheComplete);
    return viewGetCompleteNode(view);
}
/**
 * A helper method that visits all descendant and ancestor SyncPoints, applying the operation.
 *
 * NOTES:
 * - Descendant SyncPoints will be visited first (since we raise events depth-first).
 *
 * - We call applyOperation() on each SyncPoint passing three things:
 *   1. A version of the Operation that has been made relative to the SyncPoint location.
 *   2. A WriteTreeRef of any writes we have cached at the SyncPoint location.
 *   3. A snapshot Node with cached server data, if we have it.
 *
 * - We concatenate all of the events returned by each SyncPoint and return the result.
 */
function syncTreeApplyOperationToSyncPoints_(syncTree, operation) {
    return syncTreeApplyOperationHelper_(operation, syncTree.syncPointTree_, 
    /*serverCache=*/ null, writeTreeChildWrites(syncTree.pendingWriteTree_, newEmptyPath()));
}
/**
 * Recursive helper for applyOperationToSyncPoints_
 */
function syncTreeApplyOperationHelper_(operation, syncPointTree, serverCache, writesCache) {
    if (pathIsEmpty(operation.path)) {
        return syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache);
    }
    else {
        const syncPoint = syncPointTree.get(newEmptyPath());
        // If we don't have cached server data, see if we can get it from this SyncPoint.
        if (serverCache == null && syncPoint != null) {
            serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
        }
        let events = [];
        const childName = pathGetFront(operation.path);
        const childOperation = operation.operationForChild(childName);
        const childTree = syncPointTree.children.get(childName);
        if (childTree && childOperation) {
            const childServerCache = serverCache
                ? serverCache.getImmediateChild(childName)
                : null;
            const childWritesCache = writeTreeRefChild(writesCache, childName);
            events = events.concat(syncTreeApplyOperationHelper_(childOperation, childTree, childServerCache, childWritesCache));
        }
        if (syncPoint) {
            events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
        }
        return events;
    }
}
/**
 * Recursive helper for applyOperationToSyncPoints_
 */
function syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache) {
    const syncPoint = syncPointTree.get(newEmptyPath());
    // If we don't have cached server data, see if we can get it from this SyncPoint.
    if (serverCache == null && syncPoint != null) {
        serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
    }
    let events = [];
    syncPointTree.children.inorderTraversal((childName, childTree) => {
        const childServerCache = serverCache
            ? serverCache.getImmediateChild(childName)
            : null;
        const childWritesCache = writeTreeRefChild(writesCache, childName);
        const childOperation = operation.operationForChild(childName);
        if (childOperation) {
            events = events.concat(syncTreeApplyOperationDescendantsHelper_(childOperation, childTree, childServerCache, childWritesCache));
        }
    });
    if (syncPoint) {
        events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
    }
    return events;
}
function syncTreeCreateListenerForView_(syncTree, view) {
    const query = view.query;
    const tag = syncTreeTagForQuery(syncTree, query);
    return {
        hashFn: () => {
            const cache = viewGetServerCache(view) || ChildrenNode.EMPTY_NODE;
            return cache.hash();
        },
        onComplete: (status) => {
            if (status === 'ok') {
                if (tag) {
                    return syncTreeApplyTaggedListenComplete(syncTree, query._path, tag);
                }
                else {
                    return syncTreeApplyListenComplete(syncTree, query._path);
                }
            }
            else {
                // If a listen failed, kill all of the listeners here, not just the one that triggered the error.
                // Note that this may need to be scoped to just this listener if we change permissions on filtered children
                const error = errorForServerCode(status, query);
                return syncTreeRemoveEventRegistration(syncTree, query, 
                /*eventRegistration*/ null, error);
            }
        }
    };
}
/**
 * Return the tag associated with the given query.
 */
function syncTreeTagForQuery(syncTree, query) {
    const queryKey = syncTreeMakeQueryKey_(query);
    return syncTree.queryToTagMap.get(queryKey);
}
/**
 * Given a query, computes a "queryKey" suitable for use in our queryToTagMap_.
 */
function syncTreeMakeQueryKey_(query) {
    return query._path.toString() + '$' + query._queryIdentifier;
}
/**
 * Return the query associated with the given tag, if we have one
 */
function syncTreeQueryKeyForTag_(syncTree, tag) {
    return syncTree.tagToQueryMap.get(tag);
}
/**
 * Given a queryKey (created by makeQueryKey), parse it back into a path and queryId.
 */
function syncTreeParseQueryKey_(queryKey) {
    const splitIndex = queryKey.indexOf('$');
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(splitIndex !== -1 && splitIndex < queryKey.length - 1, 'Bad queryKey.');
    return {
        queryId: queryKey.substr(splitIndex + 1),
        path: new Path(queryKey.substr(0, splitIndex))
    };
}
/**
 * A helper method to apply tagged operations
 */
function syncTreeApplyTaggedOperation_(syncTree, queryPath, operation) {
    const syncPoint = syncTree.syncPointTree_.get(queryPath);
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(syncPoint, "Missing sync point for query tag that we're tracking");
    const writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, queryPath);
    return syncPointApplyOperation(syncPoint, operation, writesCache, null);
}
/**
 * This collapses multiple unfiltered views into a single view, since we only need a single
 * listener for them.
 */
function syncTreeCollectDistinctViewsForSubTree_(subtree) {
    return subtree.fold((relativePath, maybeChildSyncPoint, childMap) => {
        if (maybeChildSyncPoint && syncPointHasCompleteView(maybeChildSyncPoint)) {
            const completeView = syncPointGetCompleteView(maybeChildSyncPoint);
            return [completeView];
        }
        else {
            // No complete view here, flatten any deeper listens into an array
            let views = [];
            if (maybeChildSyncPoint) {
                views = syncPointGetQueryViews(maybeChildSyncPoint);
            }
            each(childMap, (_key, childViews) => {
                views = views.concat(childViews);
            });
            return views;
        }
    });
}
/**
 * Normalizes a query to a query we send the server for listening
 *
 * @returns The normalized query
 */
function syncTreeQueryForListening_(query) {
    if (query._queryParams.loadsAllData() && !query._queryParams.isDefault()) {
        // We treat queries that load all data as default queries
        // Cast is necessary because ref() technically returns Firebase which is actually fb.api.Firebase which inherits
        // from Query
        return new (syncTreeGetReferenceConstructor())(query._repo, query._path);
    }
    else {
        return query;
    }
}
function syncTreeRemoveTags_(syncTree, queries) {
    for (let j = 0; j < queries.length; ++j) {
        const removedQuery = queries[j];
        if (!removedQuery._queryParams.loadsAllData()) {
            // We should have a tag for this
            const removedQueryKey = syncTreeMakeQueryKey_(removedQuery);
            const removedQueryTag = syncTree.queryToTagMap.get(removedQueryKey);
            syncTree.queryToTagMap.delete(removedQueryKey);
            syncTree.tagToQueryMap.delete(removedQueryTag);
        }
    }
}
/**
 * Static accessor for query tags.
 */
function syncTreeGetNextQueryTag_() {
    return syncTreeNextQueryTag_++;
}
/**
 * For a given new listen, manage the de-duplication of outstanding subscriptions.
 *
 * @returns This method can return events to support synchronous data sources
 */
function syncTreeSetupListener_(syncTree, query, view) {
    const path = query._path;
    const tag = syncTreeTagForQuery(syncTree, query);
    const listener = syncTreeCreateListenerForView_(syncTree, view);
    const events = syncTree.listenProvider_.startListening(syncTreeQueryForListening_(query), tag, listener.hashFn, listener.onComplete);
    const subtree = syncTree.syncPointTree_.subtree(path);
    // The root of this subtree has our query. We're here because we definitely need to send a listen for that, but we
    // may need to shadow other listens as well.
    if (tag) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(!syncPointHasCompleteView(subtree.value), "If we're adding a query, it shouldn't be shadowed");
    }
    else {
        // Shadow everything at or below this location, this is a default listener.
        const queriesToStop = subtree.fold((relativePath, maybeChildSyncPoint, childMap) => {
            if (!pathIsEmpty(relativePath) &&
                maybeChildSyncPoint &&
                syncPointHasCompleteView(maybeChildSyncPoint)) {
                return [syncPointGetCompleteView(maybeChildSyncPoint).query];
            }
            else {
                // No default listener here, flatten any deeper queries into an array
                let queries = [];
                if (maybeChildSyncPoint) {
                    queries = queries.concat(syncPointGetQueryViews(maybeChildSyncPoint).map(view => view.query));
                }
                each(childMap, (_key, childQueries) => {
                    queries = queries.concat(childQueries);
                });
                return queries;
            }
        });
        for (let i = 0; i < queriesToStop.length; ++i) {
            const queryToStop = queriesToStop[i];
            syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToStop), syncTreeTagForQuery(syncTree, queryToStop));
        }
    }
    return events;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ExistingValueProvider {
    constructor(node_) {
        this.node_ = node_;
    }
    getImmediateChild(childName) {
        const child = this.node_.getImmediateChild(childName);
        return new ExistingValueProvider(child);
    }
    node() {
        return this.node_;
    }
}
class DeferredValueProvider {
    constructor(syncTree, path) {
        this.syncTree_ = syncTree;
        this.path_ = path;
    }
    getImmediateChild(childName) {
        const childPath = pathChild(this.path_, childName);
        return new DeferredValueProvider(this.syncTree_, childPath);
    }
    node() {
        return syncTreeCalcCompleteEventCache(this.syncTree_, this.path_);
    }
}
/**
 * Generate placeholders for deferred values.
 */
const generateWithValues = function (values) {
    values = values || {};
    values['timestamp'] = values['timestamp'] || new Date().getTime();
    return values;
};
/**
 * Value to use when firing local events. When writing server values, fire
 * local events with an approximate value, otherwise return value as-is.
 */
const resolveDeferredLeafValue = function (value, existingVal, serverValues) {
    if (!value || typeof value !== 'object') {
        return value;
    }
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)('.sv' in value, 'Unexpected leaf node or priority contents');
    if (typeof value['.sv'] === 'string') {
        return resolveScalarDeferredValue(value['.sv'], existingVal, serverValues);
    }
    else if (typeof value['.sv'] === 'object') {
        return resolveComplexDeferredValue(value['.sv'], existingVal);
    }
    else {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(false, 'Unexpected server value: ' + JSON.stringify(value, null, 2));
    }
};
const resolveScalarDeferredValue = function (op, existing, serverValues) {
    switch (op) {
        case 'timestamp':
            return serverValues['timestamp'];
        default:
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(false, 'Unexpected server value: ' + op);
    }
};
const resolveComplexDeferredValue = function (op, existing, unused) {
    if (!op.hasOwnProperty('increment')) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(false, 'Unexpected server value: ' + JSON.stringify(op, null, 2));
    }
    const delta = op['increment'];
    if (typeof delta !== 'number') {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(false, 'Unexpected increment value: ' + delta);
    }
    const existingNode = existing.node();
    (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(existingNode !== null && typeof existingNode !== 'undefined', 'Expected ChildrenNode.EMPTY_NODE for nulls');
    // Incrementing a non-number sets the value to the incremented amount
    if (!existingNode.isLeafNode()) {
        return delta;
    }
    const leaf = existingNode;
    const existingVal = leaf.getValue();
    if (typeof existingVal !== 'number') {
        return delta;
    }
    // No need to do over/underflow arithmetic here because JS only handles floats under the covers
    return existingVal + delta;
};
/**
 * Recursively replace all deferred values and priorities in the tree with the
 * specified generated replacement values.
 * @param path - path to which write is relative
 * @param node - new data written at path
 * @param syncTree - current data
 */
const resolveDeferredValueTree = function (path, node, syncTree, serverValues) {
    return resolveDeferredValue(node, new DeferredValueProvider(syncTree, path), serverValues);
};
/**
 * Recursively replace all deferred values and priorities in the node with the
 * specified generated replacement values.  If there are no server values in the node,
 * it'll be returned as-is.
 */
const resolveDeferredValueSnapshot = function (node, existing, serverValues) {
    return resolveDeferredValue(node, new ExistingValueProvider(existing), serverValues);
};
function resolveDeferredValue(node, existingVal, serverValues) {
    const rawPri = node.getPriority().val();
    const priority = resolveDeferredLeafValue(rawPri, existingVal.getImmediateChild('.priority'), serverValues);
    let newNode;
    if (node.isLeafNode()) {
        const leafNode = node;
        const value = resolveDeferredLeafValue(leafNode.getValue(), existingVal, serverValues);
        if (value !== leafNode.getValue() ||
            priority !== leafNode.getPriority().val()) {
            return new LeafNode(value, nodeFromJSON(priority));
        }
        else {
            return node;
        }
    }
    else {
        const childrenNode = node;
        newNode = childrenNode;
        if (priority !== childrenNode.getPriority().val()) {
            newNode = newNode.updatePriority(new LeafNode(priority));
        }
        childrenNode.forEachChild(PRIORITY_INDEX, (childName, childNode) => {
            const newChildNode = resolveDeferredValue(childNode, existingVal.getImmediateChild(childName), serverValues);
            if (newChildNode !== childNode) {
                newNode = newNode.updateImmediateChild(childName, newChildNode);
            }
        });
        return newNode;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A light-weight tree, traversable by path.  Nodes can have both values and children.
 * Nodes are not enumerated (by forEachChild) unless they have a value or non-empty
 * children.
 */
class Tree {
    /**
     * @param name - Optional name of the node.
     * @param parent - Optional parent node.
     * @param node - Optional node to wrap.
     */
    constructor(name = '', parent = null, node = { children: {}, childCount: 0 }) {
        this.name = name;
        this.parent = parent;
        this.node = node;
    }
}
/**
 * Returns a sub-Tree for the given path.
 *
 * @param pathObj - Path to look up.
 * @returns Tree for path.
 */
function treeSubTree(tree, pathObj) {
    // TODO: Require pathObj to be Path?
    let path = pathObj instanceof Path ? pathObj : new Path(pathObj);
    let child = tree, next = pathGetFront(path);
    while (next !== null) {
        const childNode = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.safeGet)(child.node.children, next) || {
            children: {},
            childCount: 0
        };
        child = new Tree(next, child, childNode);
        path = pathPopFront(path);
        next = pathGetFront(path);
    }
    return child;
}
/**
 * Returns the data associated with this tree node.
 *
 * @returns The data or null if no data exists.
 */
function treeGetValue(tree) {
    return tree.node.value;
}
/**
 * Sets data to this tree node.
 *
 * @param value - Value to set.
 */
function treeSetValue(tree, value) {
    tree.node.value = value;
    treeUpdateParents(tree);
}
/**
 * @returns Whether the tree has any children.
 */
function treeHasChildren(tree) {
    return tree.node.childCount > 0;
}
/**
 * @returns Whether the tree is empty (no value or children).
 */
function treeIsEmpty(tree) {
    return treeGetValue(tree) === undefined && !treeHasChildren(tree);
}
/**
 * Calls action for each child of this tree node.
 *
 * @param action - Action to be called for each child.
 */
function treeForEachChild(tree, action) {
    each(tree.node.children, (child, childTree) => {
        action(new Tree(child, tree, childTree));
    });
}
/**
 * Does a depth-first traversal of this node's descendants, calling action for each one.
 *
 * @param action - Action to be called for each child.
 * @param includeSelf - Whether to call action on this node as well. Defaults to
 *   false.
 * @param childrenFirst - Whether to call action on children before calling it on
 *   parent.
 */
function treeForEachDescendant(tree, action, includeSelf, childrenFirst) {
    if (includeSelf && !childrenFirst) {
        action(tree);
    }
    treeForEachChild(tree, child => {
        treeForEachDescendant(child, action, true, childrenFirst);
    });
    if (includeSelf && childrenFirst) {
        action(tree);
    }
}
/**
 * Calls action on each ancestor node.
 *
 * @param action - Action to be called on each parent; return
 *   true to abort.
 * @param includeSelf - Whether to call action on this node as well.
 * @returns true if the action callback returned true.
 */
function treeForEachAncestor(tree, action, includeSelf) {
    let node = includeSelf ? tree : tree.parent;
    while (node !== null) {
        if (action(node)) {
            return true;
        }
        node = node.parent;
    }
    return false;
}
/**
 * @returns The path of this tree node, as a Path.
 */
function treeGetPath(tree) {
    return new Path(tree.parent === null
        ? tree.name
        : treeGetPath(tree.parent) + '/' + tree.name);
}
/**
 * Adds or removes this child from its parent based on whether it's empty or not.
 */
function treeUpdateParents(tree) {
    if (tree.parent !== null) {
        treeUpdateChild(tree.parent, tree.name, tree);
    }
}
/**
 * Adds or removes the passed child to this tree node, depending on whether it's empty.
 *
 * @param childName - The name of the child to update.
 * @param child - The child to update.
 */
function treeUpdateChild(tree, childName, child) {
    const childEmpty = treeIsEmpty(child);
    const childExists = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.contains)(tree.node.children, childName);
    if (childEmpty && childExists) {
        delete tree.node.children[childName];
        tree.node.childCount--;
        treeUpdateParents(tree);
    }
    else if (!childEmpty && !childExists) {
        tree.node.children[childName] = child.node;
        tree.node.childCount++;
        treeUpdateParents(tree);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * True for invalid Firebase keys
 */
const INVALID_KEY_REGEX_ = /[\[\].#$\/\u0000-\u001F\u007F]/;
/**
 * True for invalid Firebase paths.
 * Allows '/' in paths.
 */
const INVALID_PATH_REGEX_ = /[\[\].#$\u0000-\u001F\u007F]/;
/**
 * Maximum number of characters to allow in leaf value
 */
const MAX_LEAF_SIZE_ = 10 * 1024 * 1024;
const isValidKey = function (key) {
    return (typeof key === 'string' && key.length !== 0 && !INVALID_KEY_REGEX_.test(key));
};
const isValidPathString = function (pathString) {
    return (typeof pathString === 'string' &&
        pathString.length !== 0 &&
        !INVALID_PATH_REGEX_.test(pathString));
};
const isValidRootPathString = function (pathString) {
    if (pathString) {
        // Allow '/.info/' at the beginning.
        pathString = pathString.replace(/^\/*\.info(\/|$)/, '/');
    }
    return isValidPathString(pathString);
};
const isValidPriority = function (priority) {
    return (priority === null ||
        typeof priority === 'string' ||
        (typeof priority === 'number' && !isInvalidJSONNumber(priority)) ||
        (priority &&
            typeof priority === 'object' &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.contains)(priority, '.sv')));
};
/**
 * Pre-validate a datum passed as an argument to Firebase function.
 */
const validateFirebaseDataArg = function (fnName, value, path, optional) {
    if (optional && value === undefined) {
        return;
    }
    validateFirebaseData((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.errorPrefix)(fnName, 'value'), value, path);
};
/**
 * Validate a data object client-side before sending to server.
 */
const validateFirebaseData = function (errorPrefix, data, path_) {
    const path = path_ instanceof Path ? new ValidationPath(path_, errorPrefix) : path_;
    if (data === undefined) {
        throw new Error(errorPrefix + 'contains undefined ' + validationPathToErrorString(path));
    }
    if (typeof data === 'function') {
        throw new Error(errorPrefix +
            'contains a function ' +
            validationPathToErrorString(path) +
            ' with contents = ' +
            data.toString());
    }
    if (isInvalidJSONNumber(data)) {
        throw new Error(errorPrefix +
            'contains ' +
            data.toString() +
            ' ' +
            validationPathToErrorString(path));
    }
    // Check max leaf size, but try to avoid the utf8 conversion if we can.
    if (typeof data === 'string' &&
        data.length > MAX_LEAF_SIZE_ / 3 &&
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringLength)(data) > MAX_LEAF_SIZE_) {
        throw new Error(errorPrefix +
            'contains a string greater than ' +
            MAX_LEAF_SIZE_ +
            ' utf8 bytes ' +
            validationPathToErrorString(path) +
            " ('" +
            data.substring(0, 50) +
            "...')");
    }
    // TODO = Perf = Consider combining the recursive validation of keys into NodeFromJSON
    // to save extra walking of large objects.
    if (data && typeof data === 'object') {
        let hasDotValue = false;
        let hasActualChild = false;
        each(data, (key, value) => {
            if (key === '.value') {
                hasDotValue = true;
            }
            else if (key !== '.priority' && key !== '.sv') {
                hasActualChild = true;
                if (!isValidKey(key)) {
                    throw new Error(errorPrefix +
                        ' contains an invalid key (' +
                        key +
                        ') ' +
                        validationPathToErrorString(path) +
                        '.  Keys must be non-empty strings ' +
                        'and can\'t contain ".", "#", "$", "/", "[", or "]"');
                }
            }
            validationPathPush(path, key);
            validateFirebaseData(errorPrefix, value, path);
            validationPathPop(path);
        });
        if (hasDotValue && hasActualChild) {
            throw new Error(errorPrefix +
                ' contains ".value" child ' +
                validationPathToErrorString(path) +
                ' in addition to actual children.');
        }
    }
};
/**
 * Pre-validate paths passed in the firebase function.
 */
const validateFirebaseMergePaths = function (errorPrefix, mergePaths) {
    let i, curPath;
    for (i = 0; i < mergePaths.length; i++) {
        curPath = mergePaths[i];
        const keys = pathSlice(curPath);
        for (let j = 0; j < keys.length; j++) {
            if (keys[j] === '.priority' && j === keys.length - 1) ;
            else if (!isValidKey(keys[j])) {
                throw new Error(errorPrefix +
                    'contains an invalid key (' +
                    keys[j] +
                    ') in path ' +
                    curPath.toString() +
                    '. Keys must be non-empty strings ' +
                    'and can\'t contain ".", "#", "$", "/", "[", or "]"');
            }
        }
    }
    // Check that update keys are not descendants of each other.
    // We rely on the property that sorting guarantees that ancestors come
    // right before descendants.
    mergePaths.sort(pathCompare);
    let prevPath = null;
    for (i = 0; i < mergePaths.length; i++) {
        curPath = mergePaths[i];
        if (prevPath !== null && pathContains(prevPath, curPath)) {
            throw new Error(errorPrefix +
                'contains a path ' +
                prevPath.toString() +
                ' that is ancestor of another path ' +
                curPath.toString());
        }
        prevPath = curPath;
    }
};
/**
 * pre-validate an object passed as an argument to firebase function (
 * must be an object - e.g. for firebase.update()).
 */
const validateFirebaseMergeDataArg = function (fnName, data, path, optional) {
    if (optional && data === undefined) {
        return;
    }
    const errorPrefix$1 = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.errorPrefix)(fnName, 'values');
    if (!(data && typeof data === 'object') || Array.isArray(data)) {
        throw new Error(errorPrefix$1 + ' must be an object containing the children to replace.');
    }
    const mergePaths = [];
    each(data, (key, value) => {
        const curPath = new Path(key);
        validateFirebaseData(errorPrefix$1, value, pathChild(path, curPath));
        if (pathGetBack(curPath) === '.priority') {
            if (!isValidPriority(value)) {
                throw new Error(errorPrefix$1 +
                    "contains an invalid value for '" +
                    curPath.toString() +
                    "', which must be a valid " +
                    'Firebase priority (a string, finite number, server value, or null).');
            }
        }
        mergePaths.push(curPath);
    });
    validateFirebaseMergePaths(errorPrefix$1, mergePaths);
};
const validatePriority = function (fnName, priority, optional) {
    if (optional && priority === undefined) {
        return;
    }
    if (isInvalidJSONNumber(priority)) {
        throw new Error((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.errorPrefix)(fnName, 'priority') +
            'is ' +
            priority.toString() +
            ', but must be a valid Firebase priority (a string, finite number, ' +
            'server value, or null).');
    }
    // Special case to allow importing data with a .sv.
    if (!isValidPriority(priority)) {
        throw new Error((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.errorPrefix)(fnName, 'priority') +
            'must be a valid Firebase priority ' +
            '(a string, finite number, server value, or null).');
    }
};
const validateKey = function (fnName, argumentName, key, optional) {
    if (optional && key === undefined) {
        return;
    }
    if (!isValidKey(key)) {
        throw new Error((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.errorPrefix)(fnName, argumentName) +
            'was an invalid key = "' +
            key +
            '".  Firebase keys must be non-empty strings and ' +
            'can\'t contain ".", "#", "$", "/", "[", or "]").');
    }
};
/**
 * @internal
 */
const validatePathString = function (fnName, argumentName, pathString, optional) {
    if (optional && pathString === undefined) {
        return;
    }
    if (!isValidPathString(pathString)) {
        throw new Error((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.errorPrefix)(fnName, argumentName) +
            'was an invalid path = "' +
            pathString +
            '". Paths must be non-empty strings and ' +
            'can\'t contain ".", "#", "$", "[", or "]"');
    }
};
const validateRootPathString = function (fnName, argumentName, pathString, optional) {
    if (pathString) {
        // Allow '/.info/' at the beginning.
        pathString = pathString.replace(/^\/*\.info(\/|$)/, '/');
    }
    validatePathString(fnName, argumentName, pathString, optional);
};
/**
 * @internal
 */
const validateWritablePath = function (fnName, path) {
    if (pathGetFront(path) === '.info') {
        throw new Error(fnName + " failed = Can't modify data under /.info/");
    }
};
const validateUrl = function (fnName, parsedUrl) {
    // TODO = Validate server better.
    const pathString = parsedUrl.path.toString();
    if (!(typeof parsedUrl.repoInfo.host === 'string') ||
        parsedUrl.repoInfo.host.length === 0 ||
        (!isValidKey(parsedUrl.repoInfo.namespace) &&
            parsedUrl.repoInfo.host.split(':')[0] !== 'localhost') ||
        (pathString.length !== 0 && !isValidRootPathString(pathString))) {
        throw new Error((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.errorPrefix)(fnName, 'url') +
            'must be a valid firebase URL and ' +
            'the path can\'t contain ".", "#", "$", "[", or "]".');
    }
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The event queue serves a few purposes:
 * 1. It ensures we maintain event order in the face of event callbacks doing operations that result in more
 *    events being queued.
 * 2. raiseQueuedEvents() handles being called reentrantly nicely.  That is, if in the course of raising events,
 *    raiseQueuedEvents() is called again, the "inner" call will pick up raising events where the "outer" call
 *    left off, ensuring that the events are still raised synchronously and in order.
 * 3. You can use raiseEventsAtPath and raiseEventsForChangedPath to ensure only relevant previously-queued
 *    events are raised synchronously.
 *
 * NOTE: This can all go away if/when we move to async events.
 *
 */
class EventQueue {
    constructor() {
        this.eventLists_ = [];
        /**
         * Tracks recursion depth of raiseQueuedEvents_, for debugging purposes.
         */
        this.recursionDepth_ = 0;
    }
}
/**
 * @param eventDataList - The new events to queue.
 */
function eventQueueQueueEvents(eventQueue, eventDataList) {
    // We group events by path, storing them in a single EventList, to make it easier to skip over them quickly.
    let currList = null;
    for (let i = 0; i < eventDataList.length; i++) {
        const data = eventDataList[i];
        const path = data.getPath();
        if (currList !== null && !pathEquals(path, currList.path)) {
            eventQueue.eventLists_.push(currList);
            currList = null;
        }
        if (currList === null) {
            currList = { events: [], path };
        }
        currList.events.push(data);
    }
    if (currList) {
        eventQueue.eventLists_.push(currList);
    }
}
/**
 * Queues the specified events and synchronously raises all events (including previously queued ones)
 * for the specified path.
 *
 * It is assumed that the new events are all for the specified path.
 *
 * @param path - The path to raise events for.
 * @param eventDataList - The new events to raise.
 */
function eventQueueRaiseEventsAtPath(eventQueue, path, eventDataList) {
    eventQueueQueueEvents(eventQueue, eventDataList);
    eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, eventPath => pathEquals(eventPath, path));
}
/**
 * Queues the specified events and synchronously raises all events (including previously queued ones) for
 * locations related to the specified change path (i.e. all ancestors and descendants).
 *
 * It is assumed that the new events are all related (ancestor or descendant) to the specified path.
 *
 * @param changedPath - The path to raise events for.
 * @param eventDataList - The events to raise
 */
function eventQueueRaiseEventsForChangedPath(eventQueue, changedPath, eventDataList) {
    eventQueueQueueEvents(eventQueue, eventDataList);
    eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, eventPath => pathContains(eventPath, changedPath) ||
        pathContains(changedPath, eventPath));
}
function eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, predicate) {
    eventQueue.recursionDepth_++;
    let sentAll = true;
    for (let i = 0; i < eventQueue.eventLists_.length; i++) {
        const eventList = eventQueue.eventLists_[i];
        if (eventList) {
            const eventPath = eventList.path;
            if (predicate(eventPath)) {
                eventListRaise(eventQueue.eventLists_[i]);
                eventQueue.eventLists_[i] = null;
            }
            else {
                sentAll = false;
            }
        }
    }
    if (sentAll) {
        eventQueue.eventLists_ = [];
    }
    eventQueue.recursionDepth_--;
}
/**
 * Iterates through the list and raises each event
 */
function eventListRaise(eventList) {
    for (let i = 0; i < eventList.events.length; i++) {
        const eventData = eventList.events[i];
        if (eventData !== null) {
            eventList.events[i] = null;
            const eventFn = eventData.getEventRunner();
            if (logger) {
                log('event: ' + eventData.toString());
            }
            exceptionGuard(eventFn);
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const INTERRUPT_REASON = 'repo_interrupt';
/**
 * If a transaction does not succeed after 25 retries, we abort it. Among other
 * things this ensure that if there's ever a bug causing a mismatch between
 * client / server hashes for some data, we won't retry indefinitely.
 */
const MAX_TRANSACTION_RETRIES = 25;
/**
 * A connection to a single data repository.
 */
class Repo {
    constructor(repoInfo_, forceRestClient_, authTokenProvider_, appCheckProvider_) {
        this.repoInfo_ = repoInfo_;
        this.forceRestClient_ = forceRestClient_;
        this.authTokenProvider_ = authTokenProvider_;
        this.appCheckProvider_ = appCheckProvider_;
        this.dataUpdateCount = 0;
        this.statsListener_ = null;
        this.eventQueue_ = new EventQueue();
        this.nextWriteId_ = 1;
        this.interceptServerDataCallback_ = null;
        /** A list of data pieces and paths to be set when this client disconnects. */
        this.onDisconnect_ = newSparseSnapshotTree();
        /** Stores queues of outstanding transactions for Firebase locations. */
        this.transactionQueueTree_ = new Tree();
        // TODO: This should be @private but it's used by test_access.js and internal.js
        this.persistentConnection_ = null;
        // This key is intentionally not updated if RepoInfo is later changed or replaced
        this.key = this.repoInfo_.toURLString();
    }
    /**
     * @returns The URL corresponding to the root of this Firebase.
     */
    toString() {
        return ((this.repoInfo_.secure ? 'https://' : 'http://') + this.repoInfo_.host);
    }
}
function repoStart(repo, appId, authOverride) {
    repo.stats_ = statsManagerGetCollection(repo.repoInfo_);
    if (repo.forceRestClient_ || beingCrawled()) {
        repo.server_ = new ReadonlyRestClient(repo.repoInfo_, (pathString, data, isMerge, tag) => {
            repoOnDataUpdate(repo, pathString, data, isMerge, tag);
        }, repo.authTokenProvider_, repo.appCheckProvider_);
        // Minor hack: Fire onConnect immediately, since there's no actual connection.
        setTimeout(() => repoOnConnectStatus(repo, /* connectStatus= */ true), 0);
    }
    else {
        // Validate authOverride
        if (typeof authOverride !== 'undefined' && authOverride !== null) {
            if (typeof authOverride !== 'object') {
                throw new Error('Only objects are supported for option databaseAuthVariableOverride');
            }
            try {
                (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(authOverride);
            }
            catch (e) {
                throw new Error('Invalid authOverride provided: ' + e);
            }
        }
        repo.persistentConnection_ = new PersistentConnection(repo.repoInfo_, appId, (pathString, data, isMerge, tag) => {
            repoOnDataUpdate(repo, pathString, data, isMerge, tag);
        }, (connectStatus) => {
            repoOnConnectStatus(repo, connectStatus);
        }, (updates) => {
            repoOnServerInfoUpdate(repo, updates);
        }, repo.authTokenProvider_, repo.appCheckProvider_, authOverride);
        repo.server_ = repo.persistentConnection_;
    }
    repo.authTokenProvider_.addTokenChangeListener(token => {
        repo.server_.refreshAuthToken(token);
    });
    repo.appCheckProvider_.addTokenChangeListener(result => {
        repo.server_.refreshAppCheckToken(result.token);
    });
    // In the case of multiple Repos for the same repoInfo (i.e. there are multiple Firebase.Contexts being used),
    // we only want to create one StatsReporter.  As such, we'll report stats over the first Repo created.
    repo.statsReporter_ = statsManagerGetOrCreateReporter(repo.repoInfo_, () => new StatsReporter(repo.stats_, repo.server_));
    // Used for .info.
    repo.infoData_ = new SnapshotHolder();
    repo.infoSyncTree_ = new SyncTree({
        startListening: (query, tag, currentHashFn, onComplete) => {
            let infoEvents = [];
            const node = repo.infoData_.getNode(query._path);
            // This is possibly a hack, but we have different semantics for .info endpoints. We don't raise null events
            // on initial data...
            if (!node.isEmpty()) {
                infoEvents = syncTreeApplyServerOverwrite(repo.infoSyncTree_, query._path, node);
                setTimeout(() => {
                    onComplete('ok');
                }, 0);
            }
            return infoEvents;
        },
        stopListening: () => { }
    });
    repoUpdateInfo(repo, 'connected', false);
    repo.serverSyncTree_ = new SyncTree({
        startListening: (query, tag, currentHashFn, onComplete) => {
            repo.server_.listen(query, currentHashFn, tag, (status, data) => {
                const events = onComplete(status, data);
                eventQueueRaiseEventsForChangedPath(repo.eventQueue_, query._path, events);
            });
            // No synchronous events for network-backed sync trees
            return [];
        },
        stopListening: (query, tag) => {
            repo.server_.unlisten(query, tag);
        }
    });
}
/**
 * @returns The time in milliseconds, taking the server offset into account if we have one.
 */
function repoServerTime(repo) {
    const offsetNode = repo.infoData_.getNode(new Path('.info/serverTimeOffset'));
    const offset = offsetNode.val() || 0;
    return new Date().getTime() + offset;
}
/**
 * Generate ServerValues using some variables from the repo object.
 */
function repoGenerateServerValues(repo) {
    return generateWithValues({
        timestamp: repoServerTime(repo)
    });
}
/**
 * Called by realtime when we get new messages from the server.
 */
function repoOnDataUpdate(repo, pathString, data, isMerge, tag) {
    // For testing.
    repo.dataUpdateCount++;
    const path = new Path(pathString);
    data = repo.interceptServerDataCallback_
        ? repo.interceptServerDataCallback_(pathString, data)
        : data;
    let events = [];
    if (tag) {
        if (isMerge) {
            const taggedChildren = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.map)(data, (raw) => nodeFromJSON(raw));
            events = syncTreeApplyTaggedQueryMerge(repo.serverSyncTree_, path, taggedChildren, tag);
        }
        else {
            const taggedSnap = nodeFromJSON(data);
            events = syncTreeApplyTaggedQueryOverwrite(repo.serverSyncTree_, path, taggedSnap, tag);
        }
    }
    else if (isMerge) {
        const changedChildren = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.map)(data, (raw) => nodeFromJSON(raw));
        events = syncTreeApplyServerMerge(repo.serverSyncTree_, path, changedChildren);
    }
    else {
        const snap = nodeFromJSON(data);
        events = syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap);
    }
    let affectedPath = path;
    if (events.length > 0) {
        // Since we have a listener outstanding for each transaction, receiving any events
        // is a proxy for some change having occurred.
        affectedPath = repoRerunTransactions(repo, path);
    }
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, events);
}
function repoOnConnectStatus(repo, connectStatus) {
    repoUpdateInfo(repo, 'connected', connectStatus);
    if (connectStatus === false) {
        repoRunOnDisconnectEvents(repo);
    }
}
function repoOnServerInfoUpdate(repo, updates) {
    each(updates, (key, value) => {
        repoUpdateInfo(repo, key, value);
    });
}
function repoUpdateInfo(repo, pathString, value) {
    const path = new Path('/.info/' + pathString);
    const newNode = nodeFromJSON(value);
    repo.infoData_.updateSnapshot(path, newNode);
    const events = syncTreeApplyServerOverwrite(repo.infoSyncTree_, path, newNode);
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
}
function repoGetNextWriteId(repo) {
    return repo.nextWriteId_++;
}
/**
 * The purpose of `getValue` is to return the latest known value
 * satisfying `query`.
 *
 * This method will first check for in-memory cached values
 * belonging to active listeners. If they are found, such values
 * are considered to be the most up-to-date.
 *
 * If the client is not connected, this method will wait until the
 *  repo has established a connection and then request the value for `query`.
 * If the client is not able to retrieve the query result for another reason,
 * it reports an error.
 *
 * @param query - The query to surface a value for.
 */
function repoGetValue(repo, query, eventRegistration) {
    // Only active queries are cached. There is no persisted cache.
    const cached = syncTreeGetServerValue(repo.serverSyncTree_, query);
    if (cached != null) {
        return Promise.resolve(cached);
    }
    return repo.server_.get(query).then(payload => {
        const node = nodeFromJSON(payload).withIndex(query._queryParams.getIndex());
        /**
         * Below we simulate the actions of an `onlyOnce` `onValue()` event where:
         * Add an event registration,
         * Update data at the path,
         * Raise any events,
         * Cleanup the SyncTree
         */
        syncTreeAddEventRegistration(repo.serverSyncTree_, query, eventRegistration, true);
        let events;
        if (query._queryParams.loadsAllData()) {
            events = syncTreeApplyServerOverwrite(repo.serverSyncTree_, query._path, node);
        }
        else {
            const tag = syncTreeTagForQuery(repo.serverSyncTree_, query);
            events = syncTreeApplyTaggedQueryOverwrite(repo.serverSyncTree_, query._path, node, tag);
        }
        /*
         * We need to raise events in the scenario where `get()` is called at a parent path, and
         * while the `get()` is pending, `onValue` is called at a child location. While get() is waiting
         * for the data, `onValue` will register a new event. Then, get() will come back, and update the syncTree
         * and its corresponding serverCache, including the child location where `onValue` is called. Then,
         * `onValue` will receive the event from the server, but look at the syncTree and see that the data received
         * from the server is already at the SyncPoint, and so the `onValue` callback will never get fired.
         * Calling `eventQueueRaiseEventsForChangedPath()` is the correct way to propagate the events and
         * ensure the corresponding child events will get fired.
         */
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, query._path, events);
        syncTreeRemoveEventRegistration(repo.serverSyncTree_, query, eventRegistration, null, true);
        return node;
    }, err => {
        repoLog(repo, 'get for query ' + (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(query) + ' failed: ' + err);
        return Promise.reject(new Error(err));
    });
}
function repoSetWithPriority(repo, path, newVal, newPriority, onComplete) {
    repoLog(repo, 'set', {
        path: path.toString(),
        value: newVal,
        priority: newPriority
    });
    // TODO: Optimize this behavior to either (a) store flag to skip resolving where possible and / or
    // (b) store unresolved paths on JSON parse
    const serverValues = repoGenerateServerValues(repo);
    const newNodeUnresolved = nodeFromJSON(newVal, newPriority);
    const existing = syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path);
    const newNode = resolveDeferredValueSnapshot(newNodeUnresolved, existing, serverValues);
    const writeId = repoGetNextWriteId(repo);
    const events = syncTreeApplyUserOverwrite(repo.serverSyncTree_, path, newNode, writeId, true);
    eventQueueQueueEvents(repo.eventQueue_, events);
    repo.server_.put(path.toString(), newNodeUnresolved.val(/*export=*/ true), (status, errorReason) => {
        const success = status === 'ok';
        if (!success) {
            warn('set at ' + path + ' failed: ' + status);
        }
        const clearEvents = syncTreeAckUserWrite(repo.serverSyncTree_, writeId, !success);
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, clearEvents);
        repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
    });
    const affectedPath = repoAbortTransactions(repo, path);
    repoRerunTransactions(repo, affectedPath);
    // We queued the events above, so just flush the queue here
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, []);
}
function repoUpdate(repo, path, childrenToMerge, onComplete) {
    repoLog(repo, 'update', { path: path.toString(), value: childrenToMerge });
    // Start with our existing data and merge each child into it.
    let empty = true;
    const serverValues = repoGenerateServerValues(repo);
    const changedChildren = {};
    each(childrenToMerge, (changedKey, changedValue) => {
        empty = false;
        changedChildren[changedKey] = resolveDeferredValueTree(pathChild(path, changedKey), nodeFromJSON(changedValue), repo.serverSyncTree_, serverValues);
    });
    if (!empty) {
        const writeId = repoGetNextWriteId(repo);
        const events = syncTreeApplyUserMerge(repo.serverSyncTree_, path, changedChildren, writeId);
        eventQueueQueueEvents(repo.eventQueue_, events);
        repo.server_.merge(path.toString(), childrenToMerge, (status, errorReason) => {
            const success = status === 'ok';
            if (!success) {
                warn('update at ' + path + ' failed: ' + status);
            }
            const clearEvents = syncTreeAckUserWrite(repo.serverSyncTree_, writeId, !success);
            const affectedPath = clearEvents.length > 0 ? repoRerunTransactions(repo, path) : path;
            eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, clearEvents);
            repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
        });
        each(childrenToMerge, (changedPath) => {
            const affectedPath = repoAbortTransactions(repo, pathChild(path, changedPath));
            repoRerunTransactions(repo, affectedPath);
        });
        // We queued the events above, so just flush the queue here
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, []);
    }
    else {
        log("update() called with empty data.  Don't do anything.");
        repoCallOnCompleteCallback(repo, onComplete, 'ok', undefined);
    }
}
/**
 * Applies all of the changes stored up in the onDisconnect_ tree.
 */
function repoRunOnDisconnectEvents(repo) {
    repoLog(repo, 'onDisconnectEvents');
    const serverValues = repoGenerateServerValues(repo);
    const resolvedOnDisconnectTree = newSparseSnapshotTree();
    sparseSnapshotTreeForEachTree(repo.onDisconnect_, newEmptyPath(), (path, node) => {
        const resolved = resolveDeferredValueTree(path, node, repo.serverSyncTree_, serverValues);
        sparseSnapshotTreeRemember(resolvedOnDisconnectTree, path, resolved);
    });
    let events = [];
    sparseSnapshotTreeForEachTree(resolvedOnDisconnectTree, newEmptyPath(), (path, snap) => {
        events = events.concat(syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap));
        const affectedPath = repoAbortTransactions(repo, path);
        repoRerunTransactions(repo, affectedPath);
    });
    repo.onDisconnect_ = newSparseSnapshotTree();
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, newEmptyPath(), events);
}
function repoOnDisconnectCancel(repo, path, onComplete) {
    repo.server_.onDisconnectCancel(path.toString(), (status, errorReason) => {
        if (status === 'ok') {
            sparseSnapshotTreeForget(repo.onDisconnect_, path);
        }
        repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
    });
}
function repoOnDisconnectSet(repo, path, value, onComplete) {
    const newNode = nodeFromJSON(value);
    repo.server_.onDisconnectPut(path.toString(), newNode.val(/*export=*/ true), (status, errorReason) => {
        if (status === 'ok') {
            sparseSnapshotTreeRemember(repo.onDisconnect_, path, newNode);
        }
        repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
    });
}
function repoOnDisconnectSetWithPriority(repo, path, value, priority, onComplete) {
    const newNode = nodeFromJSON(value, priority);
    repo.server_.onDisconnectPut(path.toString(), newNode.val(/*export=*/ true), (status, errorReason) => {
        if (status === 'ok') {
            sparseSnapshotTreeRemember(repo.onDisconnect_, path, newNode);
        }
        repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
    });
}
function repoOnDisconnectUpdate(repo, path, childrenToMerge, onComplete) {
    if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(childrenToMerge)) {
        log("onDisconnect().update() called with empty data.  Don't do anything.");
        repoCallOnCompleteCallback(repo, onComplete, 'ok', undefined);
        return;
    }
    repo.server_.onDisconnectMerge(path.toString(), childrenToMerge, (status, errorReason) => {
        if (status === 'ok') {
            each(childrenToMerge, (childName, childNode) => {
                const newChildNode = nodeFromJSON(childNode);
                sparseSnapshotTreeRemember(repo.onDisconnect_, pathChild(path, childName), newChildNode);
            });
        }
        repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
    });
}
function repoAddEventCallbackForQuery(repo, query, eventRegistration) {
    let events;
    if (pathGetFront(query._path) === '.info') {
        events = syncTreeAddEventRegistration(repo.infoSyncTree_, query, eventRegistration);
    }
    else {
        events = syncTreeAddEventRegistration(repo.serverSyncTree_, query, eventRegistration);
    }
    eventQueueRaiseEventsAtPath(repo.eventQueue_, query._path, events);
}
function repoRemoveEventCallbackForQuery(repo, query, eventRegistration) {
    // These are guaranteed not to raise events, since we're not passing in a cancelError. However, we can future-proof
    // a little bit by handling the return values anyways.
    let events;
    if (pathGetFront(query._path) === '.info') {
        events = syncTreeRemoveEventRegistration(repo.infoSyncTree_, query, eventRegistration);
    }
    else {
        events = syncTreeRemoveEventRegistration(repo.serverSyncTree_, query, eventRegistration);
    }
    eventQueueRaiseEventsAtPath(repo.eventQueue_, query._path, events);
}
function repoInterrupt(repo) {
    if (repo.persistentConnection_) {
        repo.persistentConnection_.interrupt(INTERRUPT_REASON);
    }
}
function repoResume(repo) {
    if (repo.persistentConnection_) {
        repo.persistentConnection_.resume(INTERRUPT_REASON);
    }
}
function repoLog(repo, ...varArgs) {
    let prefix = '';
    if (repo.persistentConnection_) {
        prefix = repo.persistentConnection_.id + ':';
    }
    log(prefix, ...varArgs);
}
function repoCallOnCompleteCallback(repo, callback, status, errorReason) {
    if (callback) {
        exceptionGuard(() => {
            if (status === 'ok') {
                callback(null);
            }
            else {
                const code = (status || 'error').toUpperCase();
                let message = code;
                if (errorReason) {
                    message += ': ' + errorReason;
                }
                const error = new Error(message);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                error.code = code;
                callback(error);
            }
        });
    }
}
/**
 * Creates a new transaction, adds it to the transactions we're tracking, and
 * sends it to the server if possible.
 *
 * @param path - Path at which to do transaction.
 * @param transactionUpdate - Update callback.
 * @param onComplete - Completion callback.
 * @param unwatcher - Function that will be called when the transaction no longer
 * need data updates for `path`.
 * @param applyLocally - Whether or not to make intermediate results visible
 */
function repoStartTransaction(repo, path, transactionUpdate, onComplete, unwatcher, applyLocally) {
    repoLog(repo, 'transaction on ' + path);
    // Initialize transaction.
    const transaction = {
        path,
        update: transactionUpdate,
        onComplete,
        // One of TransactionStatus enums.
        status: null,
        // Used when combining transactions at different locations to figure out
        // which one goes first.
        order: LUIDGenerator(),
        // Whether to raise local events for this transaction.
        applyLocally,
        // Count of how many times we've retried the transaction.
        retryCount: 0,
        // Function to call to clean up our .on() listener.
        unwatcher,
        // Stores why a transaction was aborted.
        abortReason: null,
        currentWriteId: null,
        currentInputSnapshot: null,
        currentOutputSnapshotRaw: null,
        currentOutputSnapshotResolved: null
    };
    // Run transaction initially.
    const currentState = repoGetLatestState(repo, path, undefined);
    transaction.currentInputSnapshot = currentState;
    const newVal = transaction.update(currentState.val());
    if (newVal === undefined) {
        // Abort transaction.
        transaction.unwatcher();
        transaction.currentOutputSnapshotRaw = null;
        transaction.currentOutputSnapshotResolved = null;
        if (transaction.onComplete) {
            transaction.onComplete(null, false, transaction.currentInputSnapshot);
        }
    }
    else {
        validateFirebaseData('transaction failed: Data returned ', newVal, transaction.path);
        // Mark as run and add to our queue.
        transaction.status = 0 /* TransactionStatus.RUN */;
        const queueNode = treeSubTree(repo.transactionQueueTree_, path);
        const nodeQueue = treeGetValue(queueNode) || [];
        nodeQueue.push(transaction);
        treeSetValue(queueNode, nodeQueue);
        // Update visibleData and raise events
        // Note: We intentionally raise events after updating all of our
        // transaction state, since the user could start new transactions from the
        // event callbacks.
        let priorityForNode;
        if (typeof newVal === 'object' &&
            newVal !== null &&
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.contains)(newVal, '.priority')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            priorityForNode = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.safeGet)(newVal, '.priority');
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(isValidPriority(priorityForNode), 'Invalid priority returned by transaction. ' +
                'Priority must be a valid string, finite number, server value, or null.');
        }
        else {
            const currentNode = syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path) ||
                ChildrenNode.EMPTY_NODE;
            priorityForNode = currentNode.getPriority().val();
        }
        const serverValues = repoGenerateServerValues(repo);
        const newNodeUnresolved = nodeFromJSON(newVal, priorityForNode);
        const newNode = resolveDeferredValueSnapshot(newNodeUnresolved, currentState, serverValues);
        transaction.currentOutputSnapshotRaw = newNodeUnresolved;
        transaction.currentOutputSnapshotResolved = newNode;
        transaction.currentWriteId = repoGetNextWriteId(repo);
        const events = syncTreeApplyUserOverwrite(repo.serverSyncTree_, path, newNode, transaction.currentWriteId, transaction.applyLocally);
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
        repoSendReadyTransactions(repo, repo.transactionQueueTree_);
    }
}
/**
 * @param excludeSets - A specific set to exclude
 */
function repoGetLatestState(repo, path, excludeSets) {
    return (syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path, excludeSets) ||
        ChildrenNode.EMPTY_NODE);
}
/**
 * Sends any already-run transactions that aren't waiting for outstanding
 * transactions to complete.
 *
 * Externally it's called with no arguments, but it calls itself recursively
 * with a particular transactionQueueTree node to recurse through the tree.
 *
 * @param node - transactionQueueTree node to start at.
 */
function repoSendReadyTransactions(repo, node = repo.transactionQueueTree_) {
    // Before recursing, make sure any completed transactions are removed.
    if (!node) {
        repoPruneCompletedTransactionsBelowNode(repo, node);
    }
    if (treeGetValue(node)) {
        const queue = repoBuildTransactionQueue(repo, node);
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(queue.length > 0, 'Sending zero length transaction queue');
        const allRun = queue.every((transaction) => transaction.status === 0 /* TransactionStatus.RUN */);
        // If they're all run (and not sent), we can send them.  Else, we must wait.
        if (allRun) {
            repoSendTransactionQueue(repo, treeGetPath(node), queue);
        }
    }
    else if (treeHasChildren(node)) {
        treeForEachChild(node, childNode => {
            repoSendReadyTransactions(repo, childNode);
        });
    }
}
/**
 * Given a list of run transactions, send them to the server and then handle
 * the result (success or failure).
 *
 * @param path - The location of the queue.
 * @param queue - Queue of transactions under the specified location.
 */
function repoSendTransactionQueue(repo, path, queue) {
    // Mark transactions as sent and increment retry count!
    const setsToIgnore = queue.map(txn => {
        return txn.currentWriteId;
    });
    const latestState = repoGetLatestState(repo, path, setsToIgnore);
    let snapToSend = latestState;
    const latestHash = latestState.hash();
    for (let i = 0; i < queue.length; i++) {
        const txn = queue[i];
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(txn.status === 0 /* TransactionStatus.RUN */, 'tryToSendTransactionQueue_: items in queue should all be run.');
        txn.status = 1 /* TransactionStatus.SENT */;
        txn.retryCount++;
        const relativePath = newRelativePath(path, txn.path);
        // If we've gotten to this point, the output snapshot must be defined.
        snapToSend = snapToSend.updateChild(relativePath /** @type {!Node} */, txn.currentOutputSnapshotRaw);
    }
    const dataToSend = snapToSend.val(true);
    const pathToSend = path;
    // Send the put.
    repo.server_.put(pathToSend.toString(), dataToSend, (status) => {
        repoLog(repo, 'transaction put response', {
            path: pathToSend.toString(),
            status
        });
        let events = [];
        if (status === 'ok') {
            // Queue up the callbacks and fire them after cleaning up all of our
            // transaction state, since the callback could trigger more
            // transactions or sets.
            const callbacks = [];
            for (let i = 0; i < queue.length; i++) {
                queue[i].status = 2 /* TransactionStatus.COMPLETED */;
                events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[i].currentWriteId));
                if (queue[i].onComplete) {
                    // We never unset the output snapshot, and given that this
                    // transaction is complete, it should be set
                    callbacks.push(() => queue[i].onComplete(null, true, queue[i].currentOutputSnapshotResolved));
                }
                queue[i].unwatcher();
            }
            // Now remove the completed transactions.
            repoPruneCompletedTransactionsBelowNode(repo, treeSubTree(repo.transactionQueueTree_, path));
            // There may be pending transactions that we can now send.
            repoSendReadyTransactions(repo, repo.transactionQueueTree_);
            eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
            // Finally, trigger onComplete callbacks.
            for (let i = 0; i < callbacks.length; i++) {
                exceptionGuard(callbacks[i]);
            }
        }
        else {
            // transactions are no longer sent.  Update their status appropriately.
            if (status === 'datastale') {
                for (let i = 0; i < queue.length; i++) {
                    if (queue[i].status === 3 /* TransactionStatus.SENT_NEEDS_ABORT */) {
                        queue[i].status = 4 /* TransactionStatus.NEEDS_ABORT */;
                    }
                    else {
                        queue[i].status = 0 /* TransactionStatus.RUN */;
                    }
                }
            }
            else {
                warn('transaction at ' + pathToSend.toString() + ' failed: ' + status);
                for (let i = 0; i < queue.length; i++) {
                    queue[i].status = 4 /* TransactionStatus.NEEDS_ABORT */;
                    queue[i].abortReason = status;
                }
            }
            repoRerunTransactions(repo, path);
        }
    }, latestHash);
}
/**
 * Finds all transactions dependent on the data at changedPath and reruns them.
 *
 * Should be called any time cached data changes.
 *
 * Return the highest path that was affected by rerunning transactions. This
 * is the path at which events need to be raised for.
 *
 * @param changedPath - The path in mergedData that changed.
 * @returns The rootmost path that was affected by rerunning transactions.
 */
function repoRerunTransactions(repo, changedPath) {
    const rootMostTransactionNode = repoGetAncestorTransactionNode(repo, changedPath);
    const path = treeGetPath(rootMostTransactionNode);
    const queue = repoBuildTransactionQueue(repo, rootMostTransactionNode);
    repoRerunTransactionQueue(repo, queue, path);
    return path;
}
/**
 * Does all the work of rerunning transactions (as well as cleans up aborted
 * transactions and whatnot).
 *
 * @param queue - The queue of transactions to run.
 * @param path - The path the queue is for.
 */
function repoRerunTransactionQueue(repo, queue, path) {
    if (queue.length === 0) {
        return; // Nothing to do!
    }
    // Queue up the callbacks and fire them after cleaning up all of our
    // transaction state, since the callback could trigger more transactions or
    // sets.
    const callbacks = [];
    let events = [];
    // Ignore all of the sets we're going to re-run.
    const txnsToRerun = queue.filter(q => {
        return q.status === 0 /* TransactionStatus.RUN */;
    });
    const setsToIgnore = txnsToRerun.map(q => {
        return q.currentWriteId;
    });
    for (let i = 0; i < queue.length; i++) {
        const transaction = queue[i];
        const relativePath = newRelativePath(path, transaction.path);
        let abortTransaction = false, abortReason;
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(relativePath !== null, 'rerunTransactionsUnderNode_: relativePath should not be null.');
        if (transaction.status === 4 /* TransactionStatus.NEEDS_ABORT */) {
            abortTransaction = true;
            abortReason = transaction.abortReason;
            events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
        }
        else if (transaction.status === 0 /* TransactionStatus.RUN */) {
            if (transaction.retryCount >= MAX_TRANSACTION_RETRIES) {
                abortTransaction = true;
                abortReason = 'maxretry';
                events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
            }
            else {
                // This code reruns a transaction
                const currentNode = repoGetLatestState(repo, transaction.path, setsToIgnore);
                transaction.currentInputSnapshot = currentNode;
                const newData = queue[i].update(currentNode.val());
                if (newData !== undefined) {
                    validateFirebaseData('transaction failed: Data returned ', newData, transaction.path);
                    let newDataNode = nodeFromJSON(newData);
                    const hasExplicitPriority = typeof newData === 'object' &&
                        newData != null &&
                        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.contains)(newData, '.priority');
                    if (!hasExplicitPriority) {
                        // Keep the old priority if there wasn't a priority explicitly specified.
                        newDataNode = newDataNode.updatePriority(currentNode.getPriority());
                    }
                    const oldWriteId = transaction.currentWriteId;
                    const serverValues = repoGenerateServerValues(repo);
                    const newNodeResolved = resolveDeferredValueSnapshot(newDataNode, currentNode, serverValues);
                    transaction.currentOutputSnapshotRaw = newDataNode;
                    transaction.currentOutputSnapshotResolved = newNodeResolved;
                    transaction.currentWriteId = repoGetNextWriteId(repo);
                    // Mutates setsToIgnore in place
                    setsToIgnore.splice(setsToIgnore.indexOf(oldWriteId), 1);
                    events = events.concat(syncTreeApplyUserOverwrite(repo.serverSyncTree_, transaction.path, newNodeResolved, transaction.currentWriteId, transaction.applyLocally));
                    events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, oldWriteId, true));
                }
                else {
                    abortTransaction = true;
                    abortReason = 'nodata';
                    events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
                }
            }
        }
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
        events = [];
        if (abortTransaction) {
            // Abort.
            queue[i].status = 2 /* TransactionStatus.COMPLETED */;
            // Removing a listener can trigger pruning which can muck with
            // mergedData/visibleData (as it prunes data). So defer the unwatcher
            // until we're done.
            (function (unwatcher) {
                setTimeout(unwatcher, Math.floor(0));
            })(queue[i].unwatcher);
            if (queue[i].onComplete) {
                if (abortReason === 'nodata') {
                    callbacks.push(() => queue[i].onComplete(null, false, queue[i].currentInputSnapshot));
                }
                else {
                    callbacks.push(() => queue[i].onComplete(new Error(abortReason), false, null));
                }
            }
        }
    }
    // Clean up completed transactions.
    repoPruneCompletedTransactionsBelowNode(repo, repo.transactionQueueTree_);
    // Now fire callbacks, now that we're in a good, known state.
    for (let i = 0; i < callbacks.length; i++) {
        exceptionGuard(callbacks[i]);
    }
    // Try to send the transaction result to the server.
    repoSendReadyTransactions(repo, repo.transactionQueueTree_);
}
/**
 * Returns the rootmost ancestor node of the specified path that has a pending
 * transaction on it, or just returns the node for the given path if there are
 * no pending transactions on any ancestor.
 *
 * @param path - The location to start at.
 * @returns The rootmost node with a transaction.
 */
function repoGetAncestorTransactionNode(repo, path) {
    let front;
    // Start at the root and walk deeper into the tree towards path until we
    // find a node with pending transactions.
    let transactionNode = repo.transactionQueueTree_;
    front = pathGetFront(path);
    while (front !== null && treeGetValue(transactionNode) === undefined) {
        transactionNode = treeSubTree(transactionNode, front);
        path = pathPopFront(path);
        front = pathGetFront(path);
    }
    return transactionNode;
}
/**
 * Builds the queue of all transactions at or below the specified
 * transactionNode.
 *
 * @param transactionNode
 * @returns The generated queue.
 */
function repoBuildTransactionQueue(repo, transactionNode) {
    // Walk any child transaction queues and aggregate them into a single queue.
    const transactionQueue = [];
    repoAggregateTransactionQueuesForNode(repo, transactionNode, transactionQueue);
    // Sort them by the order the transactions were created.
    transactionQueue.sort((a, b) => a.order - b.order);
    return transactionQueue;
}
function repoAggregateTransactionQueuesForNode(repo, node, queue) {
    const nodeQueue = treeGetValue(node);
    if (nodeQueue) {
        for (let i = 0; i < nodeQueue.length; i++) {
            queue.push(nodeQueue[i]);
        }
    }
    treeForEachChild(node, child => {
        repoAggregateTransactionQueuesForNode(repo, child, queue);
    });
}
/**
 * Remove COMPLETED transactions at or below this node in the transactionQueueTree_.
 */
function repoPruneCompletedTransactionsBelowNode(repo, node) {
    const queue = treeGetValue(node);
    if (queue) {
        let to = 0;
        for (let from = 0; from < queue.length; from++) {
            if (queue[from].status !== 2 /* TransactionStatus.COMPLETED */) {
                queue[to] = queue[from];
                to++;
            }
        }
        queue.length = to;
        treeSetValue(node, queue.length > 0 ? queue : undefined);
    }
    treeForEachChild(node, childNode => {
        repoPruneCompletedTransactionsBelowNode(repo, childNode);
    });
}
/**
 * Aborts all transactions on ancestors or descendants of the specified path.
 * Called when doing a set() or update() since we consider them incompatible
 * with transactions.
 *
 * @param path - Path for which we want to abort related transactions.
 */
function repoAbortTransactions(repo, path) {
    const affectedPath = treeGetPath(repoGetAncestorTransactionNode(repo, path));
    const transactionNode = treeSubTree(repo.transactionQueueTree_, path);
    treeForEachAncestor(transactionNode, (node) => {
        repoAbortTransactionsOnNode(repo, node);
    });
    repoAbortTransactionsOnNode(repo, transactionNode);
    treeForEachDescendant(transactionNode, (node) => {
        repoAbortTransactionsOnNode(repo, node);
    });
    return affectedPath;
}
/**
 * Abort transactions stored in this transaction queue node.
 *
 * @param node - Node to abort transactions for.
 */
function repoAbortTransactionsOnNode(repo, node) {
    const queue = treeGetValue(node);
    if (queue) {
        // Queue up the callbacks and fire them after cleaning up all of our
        // transaction state, since the callback could trigger more transactions
        // or sets.
        const callbacks = [];
        // Go through queue.  Any already-sent transactions must be marked for
        // abort, while the unsent ones can be immediately aborted and removed.
        let events = [];
        let lastSent = -1;
        for (let i = 0; i < queue.length; i++) {
            if (queue[i].status === 3 /* TransactionStatus.SENT_NEEDS_ABORT */) ;
            else if (queue[i].status === 1 /* TransactionStatus.SENT */) {
                (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(lastSent === i - 1, 'All SENT items should be at beginning of queue.');
                lastSent = i;
                // Mark transaction for abort when it comes back.
                queue[i].status = 3 /* TransactionStatus.SENT_NEEDS_ABORT */;
                queue[i].abortReason = 'set';
            }
            else {
                (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(queue[i].status === 0 /* TransactionStatus.RUN */, 'Unexpected transaction status in abort');
                // We can abort it immediately.
                queue[i].unwatcher();
                events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[i].currentWriteId, true));
                if (queue[i].onComplete) {
                    callbacks.push(queue[i].onComplete.bind(null, new Error('set'), false, null));
                }
            }
        }
        if (lastSent === -1) {
            // We're not waiting for any sent transactions.  We can clear the queue.
            treeSetValue(node, undefined);
        }
        else {
            // Remove the transactions we aborted.
            queue.length = lastSent + 1;
        }
        // Now fire the callbacks.
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, treeGetPath(node), events);
        for (let i = 0; i < callbacks.length; i++) {
            exceptionGuard(callbacks[i]);
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function decodePath(pathString) {
    let pathStringDecoded = '';
    const pieces = pathString.split('/');
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].length > 0) {
            let piece = pieces[i];
            try {
                piece = decodeURIComponent(piece.replace(/\+/g, ' '));
            }
            catch (e) { }
            pathStringDecoded += '/' + piece;
        }
    }
    return pathStringDecoded;
}
/**
 * @returns key value hash
 */
function decodeQuery(queryString) {
    const results = {};
    if (queryString.charAt(0) === '?') {
        queryString = queryString.substring(1);
    }
    for (const segment of queryString.split('&')) {
        if (segment.length === 0) {
            continue;
        }
        const kv = segment.split('=');
        if (kv.length === 2) {
            results[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
        }
        else {
            warn(`Invalid query segment '${segment}' in query '${queryString}'`);
        }
    }
    return results;
}
const parseRepoInfo = function (dataURL, nodeAdmin) {
    const parsedUrl = parseDatabaseURL(dataURL), namespace = parsedUrl.namespace;
    if (parsedUrl.domain === 'firebase.com') {
        fatal(parsedUrl.host +
            ' is no longer supported. ' +
            'Please use <YOUR FIREBASE>.firebaseio.com instead');
    }
    // Catch common error of uninitialized namespace value.
    if ((!namespace || namespace === 'undefined') &&
        parsedUrl.domain !== 'localhost') {
        fatal('Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com');
    }
    if (!parsedUrl.secure) {
        warnIfPageIsSecure();
    }
    const webSocketOnly = parsedUrl.scheme === 'ws' || parsedUrl.scheme === 'wss';
    return {
        repoInfo: new RepoInfo(parsedUrl.host, parsedUrl.secure, namespace, webSocketOnly, nodeAdmin, 
        /*persistenceKey=*/ '', 
        /*includeNamespaceInQueryParams=*/ namespace !== parsedUrl.subdomain),
        path: new Path(parsedUrl.pathString)
    };
};
const parseDatabaseURL = function (dataURL) {
    // Default to empty strings in the event of a malformed string.
    let host = '', domain = '', subdomain = '', pathString = '', namespace = '';
    // Always default to SSL, unless otherwise specified.
    let secure = true, scheme = 'https', port = 443;
    // Don't do any validation here. The caller is responsible for validating the result of parsing.
    if (typeof dataURL === 'string') {
        // Parse scheme.
        let colonInd = dataURL.indexOf('//');
        if (colonInd >= 0) {
            scheme = dataURL.substring(0, colonInd - 1);
            dataURL = dataURL.substring(colonInd + 2);
        }
        // Parse host, path, and query string.
        let slashInd = dataURL.indexOf('/');
        if (slashInd === -1) {
            slashInd = dataURL.length;
        }
        let questionMarkInd = dataURL.indexOf('?');
        if (questionMarkInd === -1) {
            questionMarkInd = dataURL.length;
        }
        host = dataURL.substring(0, Math.min(slashInd, questionMarkInd));
        if (slashInd < questionMarkInd) {
            // For pathString, questionMarkInd will always come after slashInd
            pathString = decodePath(dataURL.substring(slashInd, questionMarkInd));
        }
        const queryParams = decodeQuery(dataURL.substring(Math.min(dataURL.length, questionMarkInd)));
        // If we have a port, use scheme for determining if it's secure.
        colonInd = host.indexOf(':');
        if (colonInd >= 0) {
            secure = scheme === 'https' || scheme === 'wss';
            port = parseInt(host.substring(colonInd + 1), 10);
        }
        else {
            colonInd = host.length;
        }
        const hostWithoutPort = host.slice(0, colonInd);
        if (hostWithoutPort.toLowerCase() === 'localhost') {
            domain = 'localhost';
        }
        else if (hostWithoutPort.split('.').length <= 2) {
            domain = hostWithoutPort;
        }
        else {
            // Interpret the subdomain of a 3 or more component URL as the namespace name.
            const dotInd = host.indexOf('.');
            subdomain = host.substring(0, dotInd).toLowerCase();
            domain = host.substring(dotInd + 1);
            // Normalize namespaces to lowercase to share storage / connection.
            namespace = subdomain;
        }
        // Always treat the value of the `ns` as the namespace name if it is present.
        if ('ns' in queryParams) {
            namespace = queryParams['ns'];
        }
    }
    return {
        host,
        port,
        domain,
        subdomain,
        secure,
        scheme,
        pathString,
        namespace
    };
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Modeled after base64 web-safe chars, but ordered by ASCII.
const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
/**
 * Fancy ID generator that creates 20-character string identifiers with the
 * following properties:
 *
 * 1. They're based on timestamp so that they sort *after* any existing ids.
 * 2. They contain 72-bits of random data after the timestamp so that IDs won't
 *    collide with other clients' IDs.
 * 3. They sort *lexicographically* (so the timestamp is converted to characters
 *    that will sort properly).
 * 4. They're monotonically increasing. Even if you generate more than one in
 *    the same timestamp, the latter ones will sort after the former ones. We do
 *    this by using the previous random bits but "incrementing" them by 1 (only
 *    in the case of a timestamp collision).
 */
const nextPushId = (function () {
    // Timestamp of last push, used to prevent local collisions if you push twice
    // in one ms.
    let lastPushTime = 0;
    // We generate 72-bits of randomness which get turned into 12 characters and
    // appended to the timestamp to prevent collisions with other clients. We
    // store the last characters we generated because in the event of a collision,
    // we'll use those same characters except "incremented" by one.
    const lastRandChars = [];
    return function (now) {
        const duplicateTime = now === lastPushTime;
        lastPushTime = now;
        let i;
        const timeStampChars = new Array(8);
        for (i = 7; i >= 0; i--) {
            timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
            // NOTE: Can't use << here because javascript will convert to int and lose
            // the upper bits.
            now = Math.floor(now / 64);
        }
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(now === 0, 'Cannot push at time == 0');
        let id = timeStampChars.join('');
        if (!duplicateTime) {
            for (i = 0; i < 12; i++) {
                lastRandChars[i] = Math.floor(Math.random() * 64);
            }
        }
        else {
            // If the timestamp hasn't changed since last push, use the same random
            // number, except incremented by 1.
            for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
                lastRandChars[i] = 0;
            }
            lastRandChars[i]++;
        }
        for (i = 0; i < 12; i++) {
            id += PUSH_CHARS.charAt(lastRandChars[i]);
        }
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(id.length === 20, 'nextPushId: Length should be 20.');
        return id;
    };
})();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Encapsulates the data needed to raise an event
 */
class DataEvent {
    /**
     * @param eventType - One of: value, child_added, child_changed, child_moved, child_removed
     * @param eventRegistration - The function to call to with the event data. User provided
     * @param snapshot - The data backing the event
     * @param prevName - Optional, the name of the previous child for child_* events.
     */
    constructor(eventType, eventRegistration, snapshot, prevName) {
        this.eventType = eventType;
        this.eventRegistration = eventRegistration;
        this.snapshot = snapshot;
        this.prevName = prevName;
    }
    getPath() {
        const ref = this.snapshot.ref;
        if (this.eventType === 'value') {
            return ref._path;
        }
        else {
            return ref.parent._path;
        }
    }
    getEventType() {
        return this.eventType;
    }
    getEventRunner() {
        return this.eventRegistration.getEventRunner(this);
    }
    toString() {
        return (this.getPath().toString() +
            ':' +
            this.eventType +
            ':' +
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.stringify)(this.snapshot.exportVal()));
    }
}
class CancelEvent {
    constructor(eventRegistration, error, path) {
        this.eventRegistration = eventRegistration;
        this.error = error;
        this.path = path;
    }
    getPath() {
        return this.path;
    }
    getEventType() {
        return 'cancel';
    }
    getEventRunner() {
        return this.eventRegistration.getEventRunner(this);
    }
    toString() {
        return this.path.toString() + ':cancel';
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A wrapper class that converts events from the database@exp SDK to the legacy
 * Database SDK. Events are not converted directly as event registration relies
 * on reference comparison of the original user callback (see `matches()`) and
 * relies on equality of the legacy SDK's `context` object.
 */
class CallbackContext {
    constructor(snapshotCallback, cancelCallback) {
        this.snapshotCallback = snapshotCallback;
        this.cancelCallback = cancelCallback;
    }
    onValue(expDataSnapshot, previousChildName) {
        this.snapshotCallback.call(null, expDataSnapshot, previousChildName);
    }
    onCancel(error) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(this.hasCancelCallback, 'Raising a cancel event on a listener with no cancel callback');
        return this.cancelCallback.call(null, error);
    }
    get hasCancelCallback() {
        return !!this.cancelCallback;
    }
    matches(other) {
        return (this.snapshotCallback === other.snapshotCallback ||
            (this.snapshotCallback.userCallback !== undefined &&
                this.snapshotCallback.userCallback ===
                    other.snapshotCallback.userCallback &&
                this.snapshotCallback.context === other.snapshotCallback.context));
    }
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The `onDisconnect` class allows you to write or clear data when your client
 * disconnects from the Database server. These updates occur whether your
 * client disconnects cleanly or not, so you can rely on them to clean up data
 * even if a connection is dropped or a client crashes.
 *
 * The `onDisconnect` class is most commonly used to manage presence in
 * applications where it is useful to detect how many clients are connected and
 * when other clients disconnect. See
 * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
 * for more information.
 *
 * To avoid problems when a connection is dropped before the requests can be
 * transferred to the Database server, these functions should be called before
 * writing any data.
 *
 * Note that `onDisconnect` operations are only triggered once. If you want an
 * operation to occur each time a disconnect occurs, you'll need to re-establish
 * the `onDisconnect` operations each time you reconnect.
 */
class OnDisconnect {
    /** @hideconstructor */
    constructor(_repo, _path) {
        this._repo = _repo;
        this._path = _path;
    }
    /**
     * Cancels all previously queued `onDisconnect()` set or update events for this
     * location and all children.
     *
     * If a write has been queued for this location via a `set()` or `update()` at a
     * parent location, the write at this location will be canceled, though writes
     * to sibling locations will still occur.
     *
     * @returns Resolves when synchronization to the server is complete.
     */
    cancel() {
        const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
        repoOnDisconnectCancel(this._repo, this._path, deferred.wrapCallback(() => { }));
        return deferred.promise;
    }
    /**
     * Ensures the data at this location is deleted when the client is disconnected
     * (due to closing the browser, navigating to a new page, or network issues).
     *
     * @returns Resolves when synchronization to the server is complete.
     */
    remove() {
        validateWritablePath('OnDisconnect.remove', this._path);
        const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
        repoOnDisconnectSet(this._repo, this._path, null, deferred.wrapCallback(() => { }));
        return deferred.promise;
    }
    /**
     * Ensures the data at this location is set to the specified value when the
     * client is disconnected (due to closing the browser, navigating to a new page,
     * or network issues).
     *
     * `set()` is especially useful for implementing "presence" systems, where a
     * value should be changed or cleared when a user disconnects so that they
     * appear "offline" to other users. See
     * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
     * for more information.
     *
     * Note that `onDisconnect` operations are only triggered once. If you want an
     * operation to occur each time a disconnect occurs, you'll need to re-establish
     * the `onDisconnect` operations each time.
     *
     * @param value - The value to be written to this location on disconnect (can
     * be an object, array, string, number, boolean, or null).
     * @returns Resolves when synchronization to the Database is complete.
     */
    set(value) {
        validateWritablePath('OnDisconnect.set', this._path);
        validateFirebaseDataArg('OnDisconnect.set', value, this._path, false);
        const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
        repoOnDisconnectSet(this._repo, this._path, value, deferred.wrapCallback(() => { }));
        return deferred.promise;
    }
    /**
     * Ensures the data at this location is set to the specified value and priority
     * when the client is disconnected (due to closing the browser, navigating to a
     * new page, or network issues).
     *
     * @param value - The value to be written to this location on disconnect (can
     * be an object, array, string, number, boolean, or null).
     * @param priority - The priority to be written (string, number, or null).
     * @returns Resolves when synchronization to the Database is complete.
     */
    setWithPriority(value, priority) {
        validateWritablePath('OnDisconnect.setWithPriority', this._path);
        validateFirebaseDataArg('OnDisconnect.setWithPriority', value, this._path, false);
        validatePriority('OnDisconnect.setWithPriority', priority, false);
        const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
        repoOnDisconnectSetWithPriority(this._repo, this._path, value, priority, deferred.wrapCallback(() => { }));
        return deferred.promise;
    }
    /**
     * Writes multiple values at this location when the client is disconnected (due
     * to closing the browser, navigating to a new page, or network issues).
     *
     * The `values` argument contains multiple property-value pairs that will be
     * written to the Database together. Each child property can either be a simple
     * property (for example, "name") or a relative path (for example, "name/first")
     * from the current location to the data to update.
     *
     * As opposed to the `set()` method, `update()` can be use to selectively update
     * only the referenced properties at the current location (instead of replacing
     * all the child properties at the current location).
     *
     * @param values - Object containing multiple values.
     * @returns Resolves when synchronization to the Database is complete.
     */
    update(values) {
        validateWritablePath('OnDisconnect.update', this._path);
        validateFirebaseMergeDataArg('OnDisconnect.update', values, this._path, false);
        const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
        repoOnDisconnectUpdate(this._repo, this._path, values, deferred.wrapCallback(() => { }));
        return deferred.promise;
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @internal
 */
class QueryImpl {
    /**
     * @hideconstructor
     */
    constructor(_repo, _path, _queryParams, _orderByCalled) {
        this._repo = _repo;
        this._path = _path;
        this._queryParams = _queryParams;
        this._orderByCalled = _orderByCalled;
    }
    get key() {
        if (pathIsEmpty(this._path)) {
            return null;
        }
        else {
            return pathGetBack(this._path);
        }
    }
    get ref() {
        return new ReferenceImpl(this._repo, this._path);
    }
    get _queryIdentifier() {
        const obj = queryParamsGetQueryObject(this._queryParams);
        const id = ObjectToUniqueKey(obj);
        return id === '{}' ? 'default' : id;
    }
    /**
     * An object representation of the query parameters used by this Query.
     */
    get _queryObject() {
        return queryParamsGetQueryObject(this._queryParams);
    }
    isEqual(other) {
        other = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(other);
        if (!(other instanceof QueryImpl)) {
            return false;
        }
        const sameRepo = this._repo === other._repo;
        const samePath = pathEquals(this._path, other._path);
        const sameQueryIdentifier = this._queryIdentifier === other._queryIdentifier;
        return sameRepo && samePath && sameQueryIdentifier;
    }
    toJSON() {
        return this.toString();
    }
    toString() {
        return this._repo.toString() + pathToUrlEncodedString(this._path);
    }
}
/**
 * Validates that no other order by call has been made
 */
function validateNoPreviousOrderByCall(query, fnName) {
    if (query._orderByCalled === true) {
        throw new Error(fnName + ": You can't combine multiple orderBy calls.");
    }
}
/**
 * Validates start/end values for queries.
 */
function validateQueryEndpoints(params) {
    let startNode = null;
    let endNode = null;
    if (params.hasStart()) {
        startNode = params.getIndexStartValue();
    }
    if (params.hasEnd()) {
        endNode = params.getIndexEndValue();
    }
    if (params.getIndex() === KEY_INDEX) {
        const tooManyArgsError = 'Query: When ordering by key, you may only pass one argument to ' +
            'startAt(), endAt(), or equalTo().';
        const wrongArgTypeError = 'Query: When ordering by key, the argument passed to startAt(), startAfter(), ' +
            'endAt(), endBefore(), or equalTo() must be a string.';
        if (params.hasStart()) {
            const startName = params.getIndexStartName();
            if (startName !== MIN_NAME) {
                throw new Error(tooManyArgsError);
            }
            else if (typeof startNode !== 'string') {
                throw new Error(wrongArgTypeError);
            }
        }
        if (params.hasEnd()) {
            const endName = params.getIndexEndName();
            if (endName !== MAX_NAME) {
                throw new Error(tooManyArgsError);
            }
            else if (typeof endNode !== 'string') {
                throw new Error(wrongArgTypeError);
            }
        }
    }
    else if (params.getIndex() === PRIORITY_INDEX) {
        if ((startNode != null && !isValidPriority(startNode)) ||
            (endNode != null && !isValidPriority(endNode))) {
            throw new Error('Query: When ordering by priority, the first argument passed to startAt(), ' +
                'startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value ' +
                '(null, a number, or a string).');
        }
    }
    else {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(params.getIndex() instanceof PathIndex ||
            params.getIndex() === VALUE_INDEX, 'unknown index type.');
        if ((startNode != null && typeof startNode === 'object') ||
            (endNode != null && typeof endNode === 'object')) {
            throw new Error('Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or ' +
                'equalTo() cannot be an object.');
        }
    }
}
/**
 * Validates that limit* has been called with the correct combination of parameters
 */
function validateLimit(params) {
    if (params.hasStart() &&
        params.hasEnd() &&
        params.hasLimit() &&
        !params.hasAnchoredLimit()) {
        throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use " +
            'limitToFirst() or limitToLast() instead.');
    }
}
/**
 * @internal
 */
class ReferenceImpl extends QueryImpl {
    /** @hideconstructor */
    constructor(repo, path) {
        super(repo, path, new QueryParams(), false);
    }
    get parent() {
        const parentPath = pathParent(this._path);
        return parentPath === null
            ? null
            : new ReferenceImpl(this._repo, parentPath);
    }
    get root() {
        let ref = this;
        while (ref.parent !== null) {
            ref = ref.parent;
        }
        return ref;
    }
}
/**
 * A `DataSnapshot` contains data from a Database location.
 *
 * Any time you read data from the Database, you receive the data as a
 * `DataSnapshot`. A `DataSnapshot` is passed to the event callbacks you attach
 * with `on()` or `once()`. You can extract the contents of the snapshot as a
 * JavaScript object by calling the `val()` method. Alternatively, you can
 * traverse into the snapshot by calling `child()` to return child snapshots
 * (which you could then call `val()` on).
 *
 * A `DataSnapshot` is an efficiently generated, immutable copy of the data at
 * a Database location. It cannot be modified and will never change (to modify
 * data, you always call the `set()` method on a `Reference` directly).
 */
class DataSnapshot {
    /**
     * @param _node - A SnapshotNode to wrap.
     * @param ref - The location this snapshot came from.
     * @param _index - The iteration order for this snapshot
     * @hideconstructor
     */
    constructor(_node, 
    /**
     * The location of this DataSnapshot.
     */
    ref, _index) {
        this._node = _node;
        this.ref = ref;
        this._index = _index;
    }
    /**
     * Gets the priority value of the data in this `DataSnapshot`.
     *
     * Applications need not use priority but can order collections by
     * ordinary properties (see
     * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data |Sorting and filtering data}
     * ).
     */
    get priority() {
        // typecast here because we never return deferred values or internal priorities (MAX_PRIORITY)
        return this._node.getPriority().val();
    }
    /**
     * The key (last part of the path) of the location of this `DataSnapshot`.
     *
     * The last token in a Database location is considered its key. For example,
     * "ada" is the key for the /users/ada/ node. Accessing the key on any
     * `DataSnapshot` will return the key for the location that generated it.
     * However, accessing the key on the root URL of a Database will return
     * `null`.
     */
    get key() {
        return this.ref.key;
    }
    /** Returns the number of child properties of this `DataSnapshot`. */
    get size() {
        return this._node.numChildren();
    }
    /**
     * Gets another `DataSnapshot` for the location at the specified relative path.
     *
     * Passing a relative path to the `child()` method of a DataSnapshot returns
     * another `DataSnapshot` for the location at the specified relative path. The
     * relative path can either be a simple child name (for example, "ada") or a
     * deeper, slash-separated path (for example, "ada/name/first"). If the child
     * location has no data, an empty `DataSnapshot` (that is, a `DataSnapshot`
     * whose value is `null`) is returned.
     *
     * @param path - A relative path to the location of child data.
     */
    child(path) {
        const childPath = new Path(path);
        const childRef = child(this.ref, path);
        return new DataSnapshot(this._node.getChild(childPath), childRef, PRIORITY_INDEX);
    }
    /**
     * Returns true if this `DataSnapshot` contains any data. It is slightly more
     * efficient than using `snapshot.val() !== null`.
     */
    exists() {
        return !this._node.isEmpty();
    }
    /**
     * Exports the entire contents of the DataSnapshot as a JavaScript object.
     *
     * The `exportVal()` method is similar to `val()`, except priority information
     * is included (if available), making it suitable for backing up your data.
     *
     * @returns The DataSnapshot's contents as a JavaScript value (Object,
     *   Array, string, number, boolean, or `null`).
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exportVal() {
        return this._node.val(true);
    }
    /**
     * Enumerates the top-level children in the `IteratedDataSnapshot`.
     *
     * Because of the way JavaScript objects work, the ordering of data in the
     * JavaScript object returned by `val()` is not guaranteed to match the
     * ordering on the server nor the ordering of `onChildAdded()` events. That is
     * where `forEach()` comes in handy. It guarantees the children of a
     * `DataSnapshot` will be iterated in their query order.
     *
     * If no explicit `orderBy*()` method is used, results are returned
     * ordered by key (unless priorities are used, in which case, results are
     * returned by priority).
     *
     * @param action - A function that will be called for each child DataSnapshot.
     * The callback can return true to cancel further enumeration.
     * @returns true if enumeration was canceled due to your callback returning
     * true.
     */
    forEach(action) {
        if (this._node.isLeafNode()) {
            return false;
        }
        const childrenNode = this._node;
        // Sanitize the return value to a boolean. ChildrenNode.forEachChild has a weird return type...
        return !!childrenNode.forEachChild(this._index, (key, node) => {
            return action(new DataSnapshot(node, child(this.ref, key), PRIORITY_INDEX));
        });
    }
    /**
     * Returns true if the specified child path has (non-null) data.
     *
     * @param path - A relative path to the location of a potential child.
     * @returns `true` if data exists at the specified child path; else
     *  `false`.
     */
    hasChild(path) {
        const childPath = new Path(path);
        return !this._node.getChild(childPath).isEmpty();
    }
    /**
     * Returns whether or not the `DataSnapshot` has any non-`null` child
     * properties.
     *
     * You can use `hasChildren()` to determine if a `DataSnapshot` has any
     * children. If it does, you can enumerate them using `forEach()`. If it
     * doesn't, then either this snapshot contains a primitive value (which can be
     * retrieved with `val()`) or it is empty (in which case, `val()` will return
     * `null`).
     *
     * @returns true if this snapshot has any children; else false.
     */
    hasChildren() {
        if (this._node.isLeafNode()) {
            return false;
        }
        else {
            return !this._node.isEmpty();
        }
    }
    /**
     * Returns a JSON-serializable representation of this object.
     */
    toJSON() {
        return this.exportVal();
    }
    /**
     * Extracts a JavaScript value from a `DataSnapshot`.
     *
     * Depending on the data in a `DataSnapshot`, the `val()` method may return a
     * scalar type (string, number, or boolean), an array, or an object. It may
     * also return null, indicating that the `DataSnapshot` is empty (contains no
     * data).
     *
     * @returns The DataSnapshot's contents as a JavaScript value (Object,
     *   Array, string, number, boolean, or `null`).
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    val() {
        return this._node.val();
    }
}
/**
 *
 * Returns a `Reference` representing the location in the Database
 * corresponding to the provided path. If no path is provided, the `Reference`
 * will point to the root of the Database.
 *
 * @param db - The database instance to obtain a reference for.
 * @param path - Optional path representing the location the returned
 *   `Reference` will point. If not provided, the returned `Reference` will
 *   point to the root of the Database.
 * @returns If a path is provided, a `Reference`
 *   pointing to the provided path. Otherwise, a `Reference` pointing to the
 *   root of the Database.
 */
function ref(db, path) {
    db = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(db);
    db._checkNotDeleted('ref');
    return path !== undefined ? child(db._root, path) : db._root;
}
/**
 * Returns a `Reference` representing the location in the Database
 * corresponding to the provided Firebase URL.
 *
 * An exception is thrown if the URL is not a valid Firebase Database URL or it
 * has a different domain than the current `Database` instance.
 *
 * Note that all query parameters (`orderBy`, `limitToLast`, etc.) are ignored
 * and are not applied to the returned `Reference`.
 *
 * @param db - The database instance to obtain a reference for.
 * @param url - The Firebase URL at which the returned `Reference` will
 *   point.
 * @returns A `Reference` pointing to the provided
 *   Firebase URL.
 */
function refFromURL(db, url) {
    db = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(db);
    db._checkNotDeleted('refFromURL');
    const parsedURL = parseRepoInfo(url, db._repo.repoInfo_.nodeAdmin);
    validateUrl('refFromURL', parsedURL);
    const repoInfo = parsedURL.repoInfo;
    if (!db._repo.repoInfo_.isCustomHost() &&
        repoInfo.host !== db._repo.repoInfo_.host) {
        fatal('refFromURL' +
            ': Host name does not match the current database: ' +
            '(found ' +
            repoInfo.host +
            ' but expected ' +
            db._repo.repoInfo_.host +
            ')');
    }
    return ref(db, parsedURL.path.toString());
}
/**
 * Gets a `Reference` for the location at the specified relative path.
 *
 * The relative path can either be a simple child name (for example, "ada") or
 * a deeper slash-separated path (for example, "ada/name/first").
 *
 * @param parent - The parent location.
 * @param path - A relative path from this location to the desired child
 *   location.
 * @returns The specified child location.
 */
function child(parent, path) {
    parent = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(parent);
    if (pathGetFront(parent._path) === null) {
        validateRootPathString('child', 'path', path, false);
    }
    else {
        validatePathString('child', 'path', path, false);
    }
    return new ReferenceImpl(parent._repo, pathChild(parent._path, path));
}
/**
 * Returns an `OnDisconnect` object - see
 * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
 * for more information on how to use it.
 *
 * @param ref - The reference to add OnDisconnect triggers for.
 */
function onDisconnect(ref) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
    return new OnDisconnect(ref._repo, ref._path);
}
/**
 * Generates a new child location using a unique key and returns its
 * `Reference`.
 *
 * This is the most common pattern for adding data to a collection of items.
 *
 * If you provide a value to `push()`, the value is written to the
 * generated location. If you don't pass a value, nothing is written to the
 * database and the child remains empty (but you can use the `Reference`
 * elsewhere).
 *
 * The unique keys generated by `push()` are ordered by the current time, so the
 * resulting list of items is chronologically sorted. The keys are also
 * designed to be unguessable (they contain 72 random bits of entropy).
 *
 * See {@link https://firebase.google.com/docs/database/web/lists-of-data#append_to_a_list_of_data | Append to a list of data}.
 * See {@link https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html | The 2^120 Ways to Ensure Unique Identifiers}.
 *
 * @param parent - The parent location.
 * @param value - Optional value to be written at the generated location.
 * @returns Combined `Promise` and `Reference`; resolves when write is complete,
 * but can be used immediately as the `Reference` to the child location.
 */
function push(parent, value) {
    parent = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(parent);
    validateWritablePath('push', parent._path);
    validateFirebaseDataArg('push', value, parent._path, true);
    const now = repoServerTime(parent._repo);
    const name = nextPushId(now);
    // push() returns a ThennableReference whose promise is fulfilled with a
    // regular Reference. We use child() to create handles to two different
    // references. The first is turned into a ThennableReference below by adding
    // then() and catch() methods and is used as the return value of push(). The
    // second remains a regular Reference and is used as the fulfilled value of
    // the first ThennableReference.
    const thenablePushRef = child(parent, name);
    const pushRef = child(parent, name);
    let promise;
    if (value != null) {
        promise = set(pushRef, value).then(() => pushRef);
    }
    else {
        promise = Promise.resolve(pushRef);
    }
    thenablePushRef.then = promise.then.bind(promise);
    thenablePushRef.catch = promise.then.bind(promise, undefined);
    return thenablePushRef;
}
/**
 * Removes the data at this Database location.
 *
 * Any data at child locations will also be deleted.
 *
 * The effect of the remove will be visible immediately and the corresponding
 * event 'value' will be triggered. Synchronization of the remove to the
 * Firebase servers will also be started, and the returned Promise will resolve
 * when complete. If provided, the onComplete callback will be called
 * asynchronously after synchronization has finished.
 *
 * @param ref - The location to remove.
 * @returns Resolves when remove on server is complete.
 */
function remove(ref) {
    validateWritablePath('remove', ref._path);
    return set(ref, null);
}
/**
 * Writes data to this Database location.
 *
 * This will overwrite any data at this location and all child locations.
 *
 * The effect of the write will be visible immediately, and the corresponding
 * events ("value", "child_added", etc.) will be triggered. Synchronization of
 * the data to the Firebase servers will also be started, and the returned
 * Promise will resolve when complete. If provided, the `onComplete` callback
 * will be called asynchronously after synchronization has finished.
 *
 * Passing `null` for the new value is equivalent to calling `remove()`; namely,
 * all data at this location and all child locations will be deleted.
 *
 * `set()` will remove any priority stored at this location, so if priority is
 * meant to be preserved, you need to use `setWithPriority()` instead.
 *
 * Note that modifying data with `set()` will cancel any pending transactions
 * at that location, so extreme care should be taken if mixing `set()` and
 * `transaction()` to modify the same data.
 *
 * A single `set()` will generate a single "value" event at the location where
 * the `set()` was performed.
 *
 * @param ref - The location to write to.
 * @param value - The value to be written (string, number, boolean, object,
 *   array, or null).
 * @returns Resolves when write to server is complete.
 */
function set(ref, value) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
    validateWritablePath('set', ref._path);
    validateFirebaseDataArg('set', value, ref._path, false);
    const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
    repoSetWithPriority(ref._repo, ref._path, value, 
    /*priority=*/ null, deferred.wrapCallback(() => { }));
    return deferred.promise;
}
/**
 * Sets a priority for the data at this Database location.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data | Sorting and filtering data}
 * ).
 *
 * @param ref - The location to write to.
 * @param priority - The priority to be written (string, number, or null).
 * @returns Resolves when write to server is complete.
 */
function setPriority(ref, priority) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
    validateWritablePath('setPriority', ref._path);
    validatePriority('setPriority', priority, false);
    const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
    repoSetWithPriority(ref._repo, pathChild(ref._path, '.priority'), priority, null, deferred.wrapCallback(() => { }));
    return deferred.promise;
}
/**
 * Writes data the Database location. Like `set()` but also specifies the
 * priority for that data.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data | Sorting and filtering data}
 * ).
 *
 * @param ref - The location to write to.
 * @param value - The value to be written (string, number, boolean, object,
 *   array, or null).
 * @param priority - The priority to be written (string, number, or null).
 * @returns Resolves when write to server is complete.
 */
function setWithPriority(ref, value, priority) {
    validateWritablePath('setWithPriority', ref._path);
    validateFirebaseDataArg('setWithPriority', value, ref._path, false);
    validatePriority('setWithPriority', priority, false);
    if (ref.key === '.length' || ref.key === '.keys') {
        throw 'setWithPriority failed: ' + ref.key + ' is a read-only object.';
    }
    const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
    repoSetWithPriority(ref._repo, ref._path, value, priority, deferred.wrapCallback(() => { }));
    return deferred.promise;
}
/**
 * Writes multiple values to the Database at once.
 *
 * The `values` argument contains multiple property-value pairs that will be
 * written to the Database together. Each child property can either be a simple
 * property (for example, "name") or a relative path (for example,
 * "name/first") from the current location to the data to update.
 *
 * As opposed to the `set()` method, `update()` can be use to selectively update
 * only the referenced properties at the current location (instead of replacing
 * all the child properties at the current location).
 *
 * The effect of the write will be visible immediately, and the corresponding
 * events ('value', 'child_added', etc.) will be triggered. Synchronization of
 * the data to the Firebase servers will also be started, and the returned
 * Promise will resolve when complete. If provided, the `onComplete` callback
 * will be called asynchronously after synchronization has finished.
 *
 * A single `update()` will generate a single "value" event at the location
 * where the `update()` was performed, regardless of how many children were
 * modified.
 *
 * Note that modifying data with `update()` will cancel any pending
 * transactions at that location, so extreme care should be taken if mixing
 * `update()` and `transaction()` to modify the same data.
 *
 * Passing `null` to `update()` will remove the data at this location.
 *
 * See
 * {@link https://firebase.googleblog.com/2015/09/introducing-multi-location-updates-and_86.html | Introducing multi-location updates and more}.
 *
 * @param ref - The location to write to.
 * @param values - Object containing multiple values.
 * @returns Resolves when update on server is complete.
 */
function update(ref, values) {
    validateFirebaseMergeDataArg('update', values, ref._path, false);
    const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
    repoUpdate(ref._repo, ref._path, values, deferred.wrapCallback(() => { }));
    return deferred.promise;
}
/**
 * Gets the most up-to-date result for this query.
 *
 * @param query - The query to run.
 * @returns A `Promise` which resolves to the resulting DataSnapshot if a value is
 * available, or rejects if the client is unable to return a value (e.g., if the
 * server is unreachable and there is nothing cached).
 */
function get(query) {
    query = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(query);
    const callbackContext = new CallbackContext(() => { });
    const container = new ValueEventRegistration(callbackContext);
    return repoGetValue(query._repo, query, container).then(node => {
        return new DataSnapshot(node, new ReferenceImpl(query._repo, query._path), query._queryParams.getIndex());
    });
}
/**
 * Represents registration for 'value' events.
 */
class ValueEventRegistration {
    constructor(callbackContext) {
        this.callbackContext = callbackContext;
    }
    respondsTo(eventType) {
        return eventType === 'value';
    }
    createEvent(change, query) {
        const index = query._queryParams.getIndex();
        return new DataEvent('value', this, new DataSnapshot(change.snapshotNode, new ReferenceImpl(query._repo, query._path), index));
    }
    getEventRunner(eventData) {
        if (eventData.getEventType() === 'cancel') {
            return () => this.callbackContext.onCancel(eventData.error);
        }
        else {
            return () => this.callbackContext.onValue(eventData.snapshot, null);
        }
    }
    createCancelEvent(error, path) {
        if (this.callbackContext.hasCancelCallback) {
            return new CancelEvent(this, error, path);
        }
        else {
            return null;
        }
    }
    matches(other) {
        if (!(other instanceof ValueEventRegistration)) {
            return false;
        }
        else if (!other.callbackContext || !this.callbackContext) {
            // If no callback specified, we consider it to match any callback.
            return true;
        }
        else {
            return other.callbackContext.matches(this.callbackContext);
        }
    }
    hasAnyCallback() {
        return this.callbackContext !== null;
    }
}
/**
 * Represents the registration of a child_x event.
 */
class ChildEventRegistration {
    constructor(eventType, callbackContext) {
        this.eventType = eventType;
        this.callbackContext = callbackContext;
    }
    respondsTo(eventType) {
        let eventToCheck = eventType === 'children_added' ? 'child_added' : eventType;
        eventToCheck =
            eventToCheck === 'children_removed' ? 'child_removed' : eventToCheck;
        return this.eventType === eventToCheck;
    }
    createCancelEvent(error, path) {
        if (this.callbackContext.hasCancelCallback) {
            return new CancelEvent(this, error, path);
        }
        else {
            return null;
        }
    }
    createEvent(change, query) {
        (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.assert)(change.childName != null, 'Child events should have a childName.');
        const childRef = child(new ReferenceImpl(query._repo, query._path), change.childName);
        const index = query._queryParams.getIndex();
        return new DataEvent(change.type, this, new DataSnapshot(change.snapshotNode, childRef, index), change.prevName);
    }
    getEventRunner(eventData) {
        if (eventData.getEventType() === 'cancel') {
            return () => this.callbackContext.onCancel(eventData.error);
        }
        else {
            return () => this.callbackContext.onValue(eventData.snapshot, eventData.prevName);
        }
    }
    matches(other) {
        if (other instanceof ChildEventRegistration) {
            return (this.eventType === other.eventType &&
                (!this.callbackContext ||
                    !other.callbackContext ||
                    this.callbackContext.matches(other.callbackContext)));
        }
        return false;
    }
    hasAnyCallback() {
        return !!this.callbackContext;
    }
}
function addEventListener(query, eventType, callback, cancelCallbackOrListenOptions, options) {
    let cancelCallback;
    if (typeof cancelCallbackOrListenOptions === 'object') {
        cancelCallback = undefined;
        options = cancelCallbackOrListenOptions;
    }
    if (typeof cancelCallbackOrListenOptions === 'function') {
        cancelCallback = cancelCallbackOrListenOptions;
    }
    if (options && options.onlyOnce) {
        const userCallback = callback;
        const onceCallback = (dataSnapshot, previousChildName) => {
            repoRemoveEventCallbackForQuery(query._repo, query, container);
            userCallback(dataSnapshot, previousChildName);
        };
        onceCallback.userCallback = callback.userCallback;
        onceCallback.context = callback.context;
        callback = onceCallback;
    }
    const callbackContext = new CallbackContext(callback, cancelCallback || undefined);
    const container = eventType === 'value'
        ? new ValueEventRegistration(callbackContext)
        : new ChildEventRegistration(eventType, callbackContext);
    repoAddEventCallbackForQuery(query._repo, query, container);
    return () => repoRemoveEventCallbackForQuery(query._repo, query, container);
}
function onValue(query, callback, cancelCallbackOrListenOptions, options) {
    return addEventListener(query, 'value', callback, cancelCallbackOrListenOptions, options);
}
function onChildAdded(query, callback, cancelCallbackOrListenOptions, options) {
    return addEventListener(query, 'child_added', callback, cancelCallbackOrListenOptions, options);
}
function onChildChanged(query, callback, cancelCallbackOrListenOptions, options) {
    return addEventListener(query, 'child_changed', callback, cancelCallbackOrListenOptions, options);
}
function onChildMoved(query, callback, cancelCallbackOrListenOptions, options) {
    return addEventListener(query, 'child_moved', callback, cancelCallbackOrListenOptions, options);
}
function onChildRemoved(query, callback, cancelCallbackOrListenOptions, options) {
    return addEventListener(query, 'child_removed', callback, cancelCallbackOrListenOptions, options);
}
/**
 * Detaches a callback previously attached with the corresponding `on*()` (`onValue`, `onChildAdded`) listener.
 * Note: This is not the recommended way to remove a listener. Instead, please use the returned callback function from
 * the respective `on*` callbacks.
 *
 * Detach a callback previously attached with `on*()`. Calling `off()` on a parent listener
 * will not automatically remove listeners registered on child nodes, `off()`
 * must also be called on any child listeners to remove the callback.
 *
 * If a callback is not specified, all callbacks for the specified eventType
 * will be removed. Similarly, if no eventType is specified, all callbacks
 * for the `Reference` will be removed.
 *
 * Individual listeners can also be removed by invoking their unsubscribe
 * callbacks.
 *
 * @param query - The query that the listener was registered with.
 * @param eventType - One of the following strings: "value", "child_added",
 * "child_changed", "child_removed", or "child_moved." If omitted, all callbacks
 * for the `Reference` will be removed.
 * @param callback - The callback function that was passed to `on()` or
 * `undefined` to remove all callbacks.
 */
function off(query, eventType, callback) {
    let container = null;
    const expCallback = callback ? new CallbackContext(callback) : null;
    if (eventType === 'value') {
        container = new ValueEventRegistration(expCallback);
    }
    else if (eventType) {
        container = new ChildEventRegistration(eventType, expCallback);
    }
    repoRemoveEventCallbackForQuery(query._repo, query, container);
}
/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Database query. `QueryConstraint`s are created by invoking {@link endAt},
 * {@link endBefore}, {@link startAt}, {@link startAfter}, {@link
 * limitToFirst}, {@link limitToLast}, {@link orderByChild},
 * {@link orderByChild}, {@link orderByKey} , {@link orderByPriority} ,
 * {@link orderByValue}  or {@link equalTo} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */
class QueryConstraint {
}
class QueryEndAtConstraint extends QueryConstraint {
    constructor(_value, _key) {
        super();
        this._value = _value;
        this._key = _key;
        this.type = 'endAt';
    }
    _apply(query) {
        validateFirebaseDataArg('endAt', this._value, query._path, true);
        const newParams = queryParamsEndAt(query._queryParams, this._value, this._key);
        validateLimit(newParams);
        validateQueryEndpoints(newParams);
        if (query._queryParams.hasEnd()) {
            throw new Error('endAt: Starting point was already set (by another call to endAt, ' +
                'endBefore or equalTo).');
        }
        return new QueryImpl(query._repo, query._path, newParams, query._orderByCalled);
    }
}
/**
 * Creates a `QueryConstraint` with the specified ending point.
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The ending point is inclusive, so children with exactly the specified value
 * will be included in the query. The optional key argument can be used to
 * further limit the range of the query. If it is specified, then children that
 * have exactly the specified value must also have a key name less than or equal
 * to the specified key.
 *
 * You can read more about `endAt()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param value - The value to end at. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to end at, among the children with the previously
 * specified priority. This argument is only allowed if ordering by child,
 * value, or priority.
 */
function endAt(value, key) {
    validateKey('endAt', 'key', key, true);
    return new QueryEndAtConstraint(value, key);
}
class QueryEndBeforeConstraint extends QueryConstraint {
    constructor(_value, _key) {
        super();
        this._value = _value;
        this._key = _key;
        this.type = 'endBefore';
    }
    _apply(query) {
        validateFirebaseDataArg('endBefore', this._value, query._path, false);
        const newParams = queryParamsEndBefore(query._queryParams, this._value, this._key);
        validateLimit(newParams);
        validateQueryEndpoints(newParams);
        if (query._queryParams.hasEnd()) {
            throw new Error('endBefore: Starting point was already set (by another call to endAt, ' +
                'endBefore or equalTo).');
        }
        return new QueryImpl(query._repo, query._path, newParams, query._orderByCalled);
    }
}
/**
 * Creates a `QueryConstraint` with the specified ending point (exclusive).
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The ending point is exclusive. If only a value is provided, children
 * with a value less than the specified value will be included in the query.
 * If a key is specified, then children must have a value less than or equal
 * to the specified value and a key name less than the specified key.
 *
 * @param value - The value to end before. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to end before, among the children with the
 * previously specified priority. This argument is only allowed if ordering by
 * child, value, or priority.
 */
function endBefore(value, key) {
    validateKey('endBefore', 'key', key, true);
    return new QueryEndBeforeConstraint(value, key);
}
class QueryStartAtConstraint extends QueryConstraint {
    constructor(_value, _key) {
        super();
        this._value = _value;
        this._key = _key;
        this.type = 'startAt';
    }
    _apply(query) {
        validateFirebaseDataArg('startAt', this._value, query._path, true);
        const newParams = queryParamsStartAt(query._queryParams, this._value, this._key);
        validateLimit(newParams);
        validateQueryEndpoints(newParams);
        if (query._queryParams.hasStart()) {
            throw new Error('startAt: Starting point was already set (by another call to startAt, ' +
                'startBefore or equalTo).');
        }
        return new QueryImpl(query._repo, query._path, newParams, query._orderByCalled);
    }
}
/**
 * Creates a `QueryConstraint` with the specified starting point.
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The starting point is inclusive, so children with exactly the specified value
 * will be included in the query. The optional key argument can be used to
 * further limit the range of the query. If it is specified, then children that
 * have exactly the specified value must also have a key name greater than or
 * equal to the specified key.
 *
 * You can read more about `startAt()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param value - The value to start at. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to start at. This argument is only allowed if
 * ordering by child, value, or priority.
 */
function startAt(value = null, key) {
    validateKey('startAt', 'key', key, true);
    return new QueryStartAtConstraint(value, key);
}
class QueryStartAfterConstraint extends QueryConstraint {
    constructor(_value, _key) {
        super();
        this._value = _value;
        this._key = _key;
        this.type = 'startAfter';
    }
    _apply(query) {
        validateFirebaseDataArg('startAfter', this._value, query._path, false);
        const newParams = queryParamsStartAfter(query._queryParams, this._value, this._key);
        validateLimit(newParams);
        validateQueryEndpoints(newParams);
        if (query._queryParams.hasStart()) {
            throw new Error('startAfter: Starting point was already set (by another call to startAt, ' +
                'startAfter, or equalTo).');
        }
        return new QueryImpl(query._repo, query._path, newParams, query._orderByCalled);
    }
}
/**
 * Creates a `QueryConstraint` with the specified starting point (exclusive).
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The starting point is exclusive. If only a value is provided, children
 * with a value greater than the specified value will be included in the query.
 * If a key is specified, then children must have a value greater than or equal
 * to the specified value and a a key name greater than the specified key.
 *
 * @param value - The value to start after. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to start after. This argument is only allowed if
 * ordering by child, value, or priority.
 */
function startAfter(value, key) {
    validateKey('startAfter', 'key', key, true);
    return new QueryStartAfterConstraint(value, key);
}
class QueryLimitToFirstConstraint extends QueryConstraint {
    constructor(_limit) {
        super();
        this._limit = _limit;
        this.type = 'limitToFirst';
    }
    _apply(query) {
        if (query._queryParams.hasLimit()) {
            throw new Error('limitToFirst: Limit was already set (by another call to limitToFirst ' +
                'or limitToLast).');
        }
        return new QueryImpl(query._repo, query._path, queryParamsLimitToFirst(query._queryParams, this._limit), query._orderByCalled);
    }
}
/**
 * Creates a new `QueryConstraint` that if limited to the first specific number
 * of children.
 *
 * The `limitToFirst()` method is used to set a maximum number of children to be
 * synced for a given callback. If we set a limit of 100, we will initially only
 * receive up to 100 `child_added` events. If we have fewer than 100 messages
 * stored in our Database, a `child_added` event will fire for each message.
 * However, if we have over 100 messages, we will only receive a `child_added`
 * event for the first 100 ordered messages. As items change, we will receive
 * `child_removed` events for each item that drops out of the active list so
 * that the total number stays at 100.
 *
 * You can read more about `limitToFirst()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param limit - The maximum number of nodes to include in this query.
 */
function limitToFirst(limit) {
    if (typeof limit !== 'number' || Math.floor(limit) !== limit || limit <= 0) {
        throw new Error('limitToFirst: First argument must be a positive integer.');
    }
    return new QueryLimitToFirstConstraint(limit);
}
class QueryLimitToLastConstraint extends QueryConstraint {
    constructor(_limit) {
        super();
        this._limit = _limit;
        this.type = 'limitToLast';
    }
    _apply(query) {
        if (query._queryParams.hasLimit()) {
            throw new Error('limitToLast: Limit was already set (by another call to limitToFirst ' +
                'or limitToLast).');
        }
        return new QueryImpl(query._repo, query._path, queryParamsLimitToLast(query._queryParams, this._limit), query._orderByCalled);
    }
}
/**
 * Creates a new `QueryConstraint` that is limited to return only the last
 * specified number of children.
 *
 * The `limitToLast()` method is used to set a maximum number of children to be
 * synced for a given callback. If we set a limit of 100, we will initially only
 * receive up to 100 `child_added` events. If we have fewer than 100 messages
 * stored in our Database, a `child_added` event will fire for each message.
 * However, if we have over 100 messages, we will only receive a `child_added`
 * event for the last 100 ordered messages. As items change, we will receive
 * `child_removed` events for each item that drops out of the active list so
 * that the total number stays at 100.
 *
 * You can read more about `limitToLast()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param limit - The maximum number of nodes to include in this query.
 */
function limitToLast(limit) {
    if (typeof limit !== 'number' || Math.floor(limit) !== limit || limit <= 0) {
        throw new Error('limitToLast: First argument must be a positive integer.');
    }
    return new QueryLimitToLastConstraint(limit);
}
class QueryOrderByChildConstraint extends QueryConstraint {
    constructor(_path) {
        super();
        this._path = _path;
        this.type = 'orderByChild';
    }
    _apply(query) {
        validateNoPreviousOrderByCall(query, 'orderByChild');
        const parsedPath = new Path(this._path);
        if (pathIsEmpty(parsedPath)) {
            throw new Error('orderByChild: cannot pass in empty path. Use orderByValue() instead.');
        }
        const index = new PathIndex(parsedPath);
        const newParams = queryParamsOrderBy(query._queryParams, index);
        validateQueryEndpoints(newParams);
        return new QueryImpl(query._repo, query._path, newParams, 
        /*orderByCalled=*/ true);
    }
}
/**
 * Creates a new `QueryConstraint` that orders by the specified child key.
 *
 * Queries can only order by one key at a time. Calling `orderByChild()`
 * multiple times on the same query is an error.
 *
 * Firebase queries allow you to order your data by any child key on the fly.
 * However, if you know in advance what your indexes will be, you can define
 * them via the .indexOn rule in your Security Rules for better performance. See
 * the{@link https://firebase.google.com/docs/database/security/indexing-data}
 * rule for more information.
 *
 * You can read more about `orderByChild()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}.
 *
 * @param path - The path to order by.
 */
function orderByChild(path) {
    if (path === '$key') {
        throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');
    }
    else if (path === '$priority') {
        throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');
    }
    else if (path === '$value') {
        throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');
    }
    validatePathString('orderByChild', 'path', path, false);
    return new QueryOrderByChildConstraint(path);
}
class QueryOrderByKeyConstraint extends QueryConstraint {
    constructor() {
        super(...arguments);
        this.type = 'orderByKey';
    }
    _apply(query) {
        validateNoPreviousOrderByCall(query, 'orderByKey');
        const newParams = queryParamsOrderBy(query._queryParams, KEY_INDEX);
        validateQueryEndpoints(newParams);
        return new QueryImpl(query._repo, query._path, newParams, 
        /*orderByCalled=*/ true);
    }
}
/**
 * Creates a new `QueryConstraint` that orders by the key.
 *
 * Sorts the results of a query by their (ascending) key values.
 *
 * You can read more about `orderByKey()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}.
 */
function orderByKey() {
    return new QueryOrderByKeyConstraint();
}
class QueryOrderByPriorityConstraint extends QueryConstraint {
    constructor() {
        super(...arguments);
        this.type = 'orderByPriority';
    }
    _apply(query) {
        validateNoPreviousOrderByCall(query, 'orderByPriority');
        const newParams = queryParamsOrderBy(query._queryParams, PRIORITY_INDEX);
        validateQueryEndpoints(newParams);
        return new QueryImpl(query._repo, query._path, newParams, 
        /*orderByCalled=*/ true);
    }
}
/**
 * Creates a new `QueryConstraint` that orders by priority.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}
 * for alternatives to priority.
 */
function orderByPriority() {
    return new QueryOrderByPriorityConstraint();
}
class QueryOrderByValueConstraint extends QueryConstraint {
    constructor() {
        super(...arguments);
        this.type = 'orderByValue';
    }
    _apply(query) {
        validateNoPreviousOrderByCall(query, 'orderByValue');
        const newParams = queryParamsOrderBy(query._queryParams, VALUE_INDEX);
        validateQueryEndpoints(newParams);
        return new QueryImpl(query._repo, query._path, newParams, 
        /*orderByCalled=*/ true);
    }
}
/**
 * Creates a new `QueryConstraint` that orders by value.
 *
 * If the children of a query are all scalar values (string, number, or
 * boolean), you can order the results by their (ascending) values.
 *
 * You can read more about `orderByValue()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}.
 */
function orderByValue() {
    return new QueryOrderByValueConstraint();
}
class QueryEqualToValueConstraint extends QueryConstraint {
    constructor(_value, _key) {
        super();
        this._value = _value;
        this._key = _key;
        this.type = 'equalTo';
    }
    _apply(query) {
        validateFirebaseDataArg('equalTo', this._value, query._path, false);
        if (query._queryParams.hasStart()) {
            throw new Error('equalTo: Starting point was already set (by another call to startAt/startAfter or ' +
                'equalTo).');
        }
        if (query._queryParams.hasEnd()) {
            throw new Error('equalTo: Ending point was already set (by another call to endAt/endBefore or ' +
                'equalTo).');
        }
        return new QueryEndAtConstraint(this._value, this._key)._apply(new QueryStartAtConstraint(this._value, this._key)._apply(query));
    }
}
/**
 * Creates a `QueryConstraint` that includes children that match the specified
 * value.
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The optional key argument can be used to further limit the range of the
 * query. If it is specified, then children that have exactly the specified
 * value must also have exactly the specified key as their key name. This can be
 * used to filter result sets with many matches for the same value.
 *
 * You can read more about `equalTo()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param value - The value to match for. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to start at, among the children with the
 * previously specified priority. This argument is only allowed if ordering by
 * child, value, or priority.
 */
function equalTo(value, key) {
    validateKey('equalTo', 'key', key, true);
    return new QueryEqualToValueConstraint(value, key);
}
/**
 * Creates a new immutable instance of `Query` that is extended to also include
 * additional query constraints.
 *
 * @param query - The Query instance to use as a base for the new constraints.
 * @param queryConstraints - The list of `QueryConstraint`s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */
function query(query, ...queryConstraints) {
    let queryImpl = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(query);
    for (const constraint of queryConstraints) {
        queryImpl = constraint._apply(queryImpl);
    }
    return queryImpl;
}
/**
 * Define reference constructor in various modules
 *
 * We are doing this here to avoid several circular
 * dependency issues
 */
syncPointSetReferenceConstructor(ReferenceImpl);
syncTreeSetReferenceConstructor(ReferenceImpl);

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * This variable is also defined in the firebase Node.js Admin SDK. Before
 * modifying this definition, consult the definition in:
 *
 * https://github.com/firebase/firebase-admin-node
 *
 * and make sure the two are consistent.
 */
const FIREBASE_DATABASE_EMULATOR_HOST_VAR = 'FIREBASE_DATABASE_EMULATOR_HOST';
/**
 * Creates and caches `Repo` instances.
 */
const repos = {};
/**
 * If true, any new `Repo` will be created to use `ReadonlyRestClient` (for testing purposes).
 */
let useRestClient = false;
/**
 * Update an existing `Repo` in place to point to a new host/port.
 */
function repoManagerApplyEmulatorSettings(repo, hostAndPort, emulatorOptions, tokenProvider) {
    repo.repoInfo_ = new RepoInfo(hostAndPort, 
    /* secure= */ false, repo.repoInfo_.namespace, repo.repoInfo_.webSocketOnly, repo.repoInfo_.nodeAdmin, repo.repoInfo_.persistenceKey, repo.repoInfo_.includeNamespaceInQueryParams, 
    /*isUsingEmulator=*/ true, emulatorOptions);
    if (tokenProvider) {
        repo.authTokenProvider_ = tokenProvider;
    }
}
/**
 * This function should only ever be called to CREATE a new database instance.
 * @internal
 */
function repoManagerDatabaseFromApp(app, authProvider, appCheckProvider, url, nodeAdmin) {
    let dbUrl = url || app.options.databaseURL;
    if (dbUrl === undefined) {
        if (!app.options.projectId) {
            fatal("Can't determine Firebase Database URL. Be sure to include " +
                ' a Project ID when calling firebase.initializeApp().');
        }
        log('Using default host for project ', app.options.projectId);
        dbUrl = `${app.options.projectId}-default-rtdb.firebaseio.com`;
    }
    let parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
    let repoInfo = parsedUrl.repoInfo;
    let isEmulator;
    let dbEmulatorHost = undefined;
    if (typeof process !== 'undefined' && process.env) {
        dbEmulatorHost = process.env[FIREBASE_DATABASE_EMULATOR_HOST_VAR];
    }
    if (dbEmulatorHost) {
        isEmulator = true;
        dbUrl = `http://${dbEmulatorHost}?ns=${repoInfo.namespace}`;
        parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
        repoInfo = parsedUrl.repoInfo;
    }
    else {
        isEmulator = !parsedUrl.repoInfo.secure;
    }
    const authTokenProvider = nodeAdmin && isEmulator
        ? new EmulatorTokenProvider(EmulatorTokenProvider.OWNER)
        : new FirebaseAuthTokenProvider(app.name, app.options, authProvider);
    validateUrl('Invalid Firebase Database URL', parsedUrl);
    if (!pathIsEmpty(parsedUrl.path)) {
        fatal('Database URL must point to the root of a Firebase Database ' +
            '(not including a child path).');
    }
    const repo = repoManagerCreateRepo(repoInfo, app, authTokenProvider, new AppCheckTokenProvider(app, appCheckProvider));
    return new Database(repo, app);
}
/**
 * Remove the repo and make sure it is disconnected.
 *
 */
function repoManagerDeleteRepo(repo, appName) {
    const appRepos = repos[appName];
    // This should never happen...
    if (!appRepos || appRepos[repo.key] !== repo) {
        fatal(`Database ${appName}(${repo.repoInfo_}) has already been deleted.`);
    }
    repoInterrupt(repo);
    delete appRepos[repo.key];
}
/**
 * Ensures a repo doesn't already exist and then creates one using the
 * provided app.
 *
 * @param repoInfo - The metadata about the Repo
 * @returns The Repo object for the specified server / repoName.
 */
function repoManagerCreateRepo(repoInfo, app, authTokenProvider, appCheckProvider) {
    let appRepos = repos[app.name];
    if (!appRepos) {
        appRepos = {};
        repos[app.name] = appRepos;
    }
    let repo = appRepos[repoInfo.toURLString()];
    if (repo) {
        fatal('Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.');
    }
    repo = new Repo(repoInfo, useRestClient, authTokenProvider, appCheckProvider);
    appRepos[repoInfo.toURLString()] = repo;
    return repo;
}
/**
 * Forces us to use ReadonlyRestClient instead of PersistentConnection for new Repos.
 */
function repoManagerForceRestClient(forceRestClient) {
    useRestClient = forceRestClient;
}
/**
 * Class representing a Firebase Realtime Database.
 */
class Database {
    /** @hideconstructor */
    constructor(_repoInternal, 
    /** The {@link @firebase/app#FirebaseApp} associated with this Realtime Database instance. */
    app) {
        this._repoInternal = _repoInternal;
        this.app = app;
        /** Represents a `Database` instance. */
        this['type'] = 'database';
        /** Track if the instance has been used (root or repo accessed) */
        this._instanceStarted = false;
    }
    get _repo() {
        if (!this._instanceStarted) {
            repoStart(this._repoInternal, this.app.options.appId, this.app.options['databaseAuthVariableOverride']);
            this._instanceStarted = true;
        }
        return this._repoInternal;
    }
    get _root() {
        if (!this._rootInternal) {
            this._rootInternal = new ReferenceImpl(this._repo, newEmptyPath());
        }
        return this._rootInternal;
    }
    _delete() {
        if (this._rootInternal !== null) {
            repoManagerDeleteRepo(this._repo, this.app.name);
            this._repoInternal = null;
            this._rootInternal = null;
        }
        return Promise.resolve();
    }
    _checkNotDeleted(apiName) {
        if (this._rootInternal === null) {
            fatal('Cannot call ' + apiName + ' on a deleted database.');
        }
    }
}
function checkTransportInit() {
    if (TransportManager.IS_TRANSPORT_INITIALIZED) {
        warn('Transport has already been initialized. Please call this function before calling ref or setting up a listener');
    }
}
/**
 * Force the use of websockets instead of longPolling.
 */
function forceWebSockets() {
    checkTransportInit();
    BrowserPollConnection.forceDisallow();
}
/**
 * Force the use of longPolling instead of websockets. This will be ignored if websocket protocol is used in databaseURL.
 */
function forceLongPolling() {
    checkTransportInit();
    WebSocketConnection.forceDisallow();
    BrowserPollConnection.forceAllow();
}
/**
 * Returns the instance of the Realtime Database SDK that is associated with the provided
 * {@link @firebase/app#FirebaseApp}. Initializes a new instance with default settings if
 * no instance exists or if the existing instance uses a custom database URL.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned Realtime
 * Database instance is associated with.
 * @param url - The URL of the Realtime Database instance to connect to. If not
 * provided, the SDK connects to the default instance of the Firebase App.
 * @returns The `Database` instance of the provided app.
 */
function getDatabase(app = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp)(), url) {
    const db = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._getProvider)(app, 'database').getImmediate({
        identifier: url
    });
    if (!db._instanceStarted) {
        const emulator = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getDefaultEmulatorHostnameAndPort)('database');
        if (emulator) {
            connectDatabaseEmulator(db, ...emulator);
        }
    }
    return db;
}
/**
 * Modify the provided instance to communicate with the Realtime Database
 * emulator.
 *
 * <p>Note: This method must be called before performing any other operation.
 *
 * @param db - The instance to modify.
 * @param host - The emulator host (ex: localhost)
 * @param port - The emulator port (ex: 8080)
 * @param options.mockUserToken - the mock auth token to use for unit testing Security Rules
 */
function connectDatabaseEmulator(db, host, port, options = {}) {
    db = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(db);
    db._checkNotDeleted('useEmulator');
    const hostAndPort = `${host}:${port}`;
    const repo = db._repoInternal;
    if (db._instanceStarted) {
        // If the instance has already been started, then silenty fail if this function is called again
        // with the same parameters. If the parameters differ then assert.
        if (hostAndPort === db._repoInternal.repoInfo_.host &&
            (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.deepEqual)(options, repo.repoInfo_.emulatorOptions)) {
            return;
        }
        fatal('connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.');
    }
    let tokenProvider = undefined;
    if (repo.repoInfo_.nodeAdmin) {
        if (options.mockUserToken) {
            fatal('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".');
        }
        tokenProvider = new EmulatorTokenProvider(EmulatorTokenProvider.OWNER);
    }
    else if (options.mockUserToken) {
        const token = typeof options.mockUserToken === 'string'
            ? options.mockUserToken
            : (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.createMockUserToken)(options.mockUserToken, db.app.options.projectId);
        tokenProvider = new EmulatorTokenProvider(token);
    }
    // Modify the repo to apply emulator settings
    repoManagerApplyEmulatorSettings(repo, hostAndPort, options, tokenProvider);
}
/**
 * Disconnects from the server (all Database operations will be completed
 * offline).
 *
 * The client automatically maintains a persistent connection to the Database
 * server, which will remain active indefinitely and reconnect when
 * disconnected. However, the `goOffline()` and `goOnline()` methods may be used
 * to control the client connection in cases where a persistent connection is
 * undesirable.
 *
 * While offline, the client will no longer receive data updates from the
 * Database. However, all Database operations performed locally will continue to
 * immediately fire events, allowing your application to continue behaving
 * normally. Additionally, each operation performed locally will automatically
 * be queued and retried upon reconnection to the Database server.
 *
 * To reconnect to the Database and begin receiving remote events, see
 * `goOnline()`.
 *
 * @param db - The instance to disconnect.
 */
function goOffline(db) {
    db = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(db);
    db._checkNotDeleted('goOffline');
    repoInterrupt(db._repo);
}
/**
 * Reconnects to the server and synchronizes the offline Database state
 * with the server state.
 *
 * This method should be used after disabling the active connection with
 * `goOffline()`. Once reconnected, the client will transmit the proper data
 * and fire the appropriate events so that your client "catches up"
 * automatically.
 *
 * @param db - The instance to reconnect.
 */
function goOnline(db) {
    db = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(db);
    db._checkNotDeleted('goOnline');
    repoResume(db._repo);
}
function enableLogging(logger, persistent) {
    enableLogging$1(logger, persistent);
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerDatabase(variant) {
    setSDKVersion(_firebase_app__WEBPACK_IMPORTED_MODULE_0__.SDK_VERSION);
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._registerComponent)(new _firebase_component__WEBPACK_IMPORTED_MODULE_1__.Component('database', (container, { instanceIdentifier: url }) => {
        const app = container.getProvider('app').getImmediate();
        const authProvider = container.getProvider('auth-internal');
        const appCheckProvider = container.getProvider('app-check-internal');
        return repoManagerDatabaseFromApp(app, authProvider, appCheckProvider, url);
    }, "PUBLIC" /* ComponentType.PUBLIC */).setMultipleInstances(true));
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion)(name, version, variant);
    // BUILD_TARGET will be replaced by values like esm2017, cjs2017, etc during the compilation
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion)(name, version, 'esm2017');
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const SERVER_TIMESTAMP = {
    '.sv': 'timestamp'
};
/**
 * Returns a placeholder value for auto-populating the current timestamp (time
 * since the Unix epoch, in milliseconds) as determined by the Firebase
 * servers.
 */
function serverTimestamp() {
    return SERVER_TIMESTAMP;
}
/**
 * Returns a placeholder value that can be used to atomically increment the
 * current database value by the provided delta.
 *
 * @param delta - the amount to modify the current value atomically.
 * @returns A placeholder value for modifying data atomically server-side.
 */
function increment(delta) {
    return {
        '.sv': {
            'increment': delta
        }
    };
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A type for the resolve value of {@link runTransaction}.
 */
class TransactionResult {
    /** @hideconstructor */
    constructor(
    /** Whether the transaction was successfully committed. */
    committed, 
    /** The resulting data snapshot. */
    snapshot) {
        this.committed = committed;
        this.snapshot = snapshot;
    }
    /** Returns a JSON-serializable representation of this object. */
    toJSON() {
        return { committed: this.committed, snapshot: this.snapshot.toJSON() };
    }
}
/**
 * Atomically modifies the data at this location.
 *
 * Atomically modify the data at this location. Unlike a normal `set()`, which
 * just overwrites the data regardless of its previous value, `runTransaction()` is
 * used to modify the existing value to a new value, ensuring there are no
 * conflicts with other clients writing to the same location at the same time.
 *
 * To accomplish this, you pass `runTransaction()` an update function which is
 * used to transform the current value into a new value. If another client
 * writes to the location before your new value is successfully written, your
 * update function will be called again with the new current value, and the
 * write will be retried. This will happen repeatedly until your write succeeds
 * without conflict or you abort the transaction by not returning a value from
 * your update function.
 *
 * Note: Modifying data with `set()` will cancel any pending transactions at
 * that location, so extreme care should be taken if mixing `set()` and
 * `runTransaction()` to update the same data.
 *
 * Note: When using transactions with Security and Firebase Rules in place, be
 * aware that a client needs `.read` access in addition to `.write` access in
 * order to perform a transaction. This is because the client-side nature of
 * transactions requires the client to read the data in order to transactionally
 * update it.
 *
 * @param ref - The location to atomically modify.
 * @param transactionUpdate - A developer-supplied function which will be passed
 * the current data stored at this location (as a JavaScript object). The
 * function should return the new value it would like written (as a JavaScript
 * object). If `undefined` is returned (i.e. you return with no arguments) the
 * transaction will be aborted and the data at this location will not be
 * modified.
 * @param options - An options object to configure transactions.
 * @returns A `Promise` that can optionally be used instead of the `onComplete`
 * callback to handle success and failure.
 */
function runTransaction(ref, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
transactionUpdate, options) {
    var _a;
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(ref);
    validateWritablePath('Reference.transaction', ref._path);
    if (ref.key === '.length' || ref.key === '.keys') {
        throw ('Reference.transaction failed: ' + ref.key + ' is a read-only object.');
    }
    const applyLocally = (_a = options === null || options === void 0 ? void 0 : options.applyLocally) !== null && _a !== void 0 ? _a : true;
    const deferred = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.Deferred();
    const promiseComplete = (error, committed, node) => {
        let dataSnapshot = null;
        if (error) {
            deferred.reject(error);
        }
        else {
            dataSnapshot = new DataSnapshot(node, new ReferenceImpl(ref._repo, ref._path), PRIORITY_INDEX);
            deferred.resolve(new TransactionResult(committed, dataSnapshot));
        }
    };
    // Add a watch to make sure we get server updates.
    const unwatcher = onValue(ref, () => { });
    repoStartTransaction(ref._repo, ref._path, transactionUpdate, promiseComplete, unwatcher, applyLocally);
    return deferred.promise;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
PersistentConnection;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
PersistentConnection.prototype.simpleListen = function (pathString, onComplete) {
    this.sendRequest('q', { p: pathString }, onComplete);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
PersistentConnection.prototype.echo = function (data, onEcho) {
    this.sendRequest('echo', { d: data }, onEcho);
};
// RealTimeConnection properties that we use in tests.
Connection;
/**
 * @internal
 */
const hijackHash = function (newHash) {
    const oldPut = PersistentConnection.prototype.put;
    PersistentConnection.prototype.put = function (pathString, data, onComplete, hash) {
        if (hash !== undefined) {
            hash = newHash();
        }
        oldPut.call(this, pathString, data, onComplete, hash);
    };
    return function () {
        PersistentConnection.prototype.put = oldPut;
    };
};
RepoInfo;
/**
 * Forces the RepoManager to create Repos that use ReadonlyRestClient instead of PersistentConnection.
 * @internal
 */
const forceRestClient = function (forceRestClient) {
    repoManagerForceRestClient(forceRestClient);
};

/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Used by console to create a database based on the app,
 * passed database URL and a custom auth implementation.
 * @internal
 * @param app - A valid FirebaseApp-like object
 * @param url - A valid Firebase databaseURL
 * @param version - custom version e.g. firebase-admin version
 * @param customAppCheckImpl - custom app check implementation
 * @param customAuthImpl - custom auth implementation
 */
function _initStandalone({ app, url, version, customAuthImpl, customAppCheckImpl, nodeAdmin = false }) {
    setSDKVersion(version);
    /**
     * ComponentContainer('database-standalone') is just a placeholder that doesn't perform
     * any actual function.
     */
    const componentContainer = new _firebase_component__WEBPACK_IMPORTED_MODULE_1__.ComponentContainer('database-standalone');
    const authProvider = new _firebase_component__WEBPACK_IMPORTED_MODULE_1__.Provider('auth-internal', componentContainer);
    let appCheckProvider;
    if (customAppCheckImpl) {
        appCheckProvider = new _firebase_component__WEBPACK_IMPORTED_MODULE_1__.Provider('app-check-internal', componentContainer);
        appCheckProvider.setComponent(new _firebase_component__WEBPACK_IMPORTED_MODULE_1__.Component('app-check-internal', () => customAppCheckImpl, "PRIVATE" /* ComponentType.PRIVATE */));
    }
    authProvider.setComponent(new _firebase_component__WEBPACK_IMPORTED_MODULE_1__.Component('auth-internal', () => customAuthImpl, "PRIVATE" /* ComponentType.PRIVATE */));
    return repoManagerDatabaseFromApp(app, authProvider, appCheckProvider, url, nodeAdmin);
}

/**
 * Firebase Realtime Database
 *
 * @packageDocumentation
 */
registerDatabase();


//# sourceMappingURL=index.esm2017.js.map


/***/ }),

/***/ "./node_modules/@firebase/logger/dist/esm/index.esm2017.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@firebase/logger/dist/esm/index.esm2017.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogLevel: () => (/* binding */ LogLevel),
/* harmony export */   Logger: () => (/* binding */ Logger),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel),
/* harmony export */   setUserLogHandler: () => (/* binding */ setUserLogHandler)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A container for all of the Logger instances
 */
const instances = [];
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (LogLevel = {}));
const levelStringToEnum = {
    'debug': LogLevel.DEBUG,
    'verbose': LogLevel.VERBOSE,
    'info': LogLevel.INFO,
    'warn': LogLevel.WARN,
    'error': LogLevel.ERROR,
    'silent': LogLevel.SILENT
};
/**
 * The default log level
 */
const defaultLogLevel = LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */
const ConsoleMethod = {
    [LogLevel.DEBUG]: 'log',
    [LogLevel.VERBOSE]: 'log',
    [LogLevel.INFO]: 'info',
    [LogLevel.WARN]: 'warn',
    [LogLevel.ERROR]: 'error'
};
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */
const defaultLogHandler = (instance, logType, ...args) => {
    if (logType < instance.logLevel) {
        return;
    }
    const now = new Date().toISOString();
    const method = ConsoleMethod[logType];
    if (method) {
        console[method](`[${now}]  ${instance.name}:`, ...args);
    }
    else {
        throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
    }
};
class Logger {
    /**
     * Gives you an instance of a Logger to capture messages according to
     * Firebase's logging scheme.
     *
     * @param name The name that the logs will be associated with
     */
    constructor(name) {
        this.name = name;
        /**
         * The log level of the given Logger instance.
         */
        this._logLevel = defaultLogLevel;
        /**
         * The main (internal) log handler for the Logger instance.
         * Can be set to a new function in internal package code but not by user.
         */
        this._logHandler = defaultLogHandler;
        /**
         * The optional, additional, user-defined log handler for the Logger instance.
         */
        this._userLogHandler = null;
        /**
         * Capture the current instance for later use
         */
        instances.push(this);
    }
    get logLevel() {
        return this._logLevel;
    }
    set logLevel(val) {
        if (!(val in LogLevel)) {
            throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
        }
        this._logLevel = val;
    }
    // Workaround for setter/getter having to be the same type.
    setLogLevel(val) {
        this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
    }
    get logHandler() {
        return this._logHandler;
    }
    set logHandler(val) {
        if (typeof val !== 'function') {
            throw new TypeError('Value assigned to `logHandler` must be a function');
        }
        this._logHandler = val;
    }
    get userLogHandler() {
        return this._userLogHandler;
    }
    set userLogHandler(val) {
        this._userLogHandler = val;
    }
    /**
     * The functions below are all based on the `console` interface
     */
    debug(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
        this._logHandler(this, LogLevel.DEBUG, ...args);
    }
    log(...args) {
        this._userLogHandler &&
            this._userLogHandler(this, LogLevel.VERBOSE, ...args);
        this._logHandler(this, LogLevel.VERBOSE, ...args);
    }
    info(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
        this._logHandler(this, LogLevel.INFO, ...args);
    }
    warn(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
        this._logHandler(this, LogLevel.WARN, ...args);
    }
    error(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
        this._logHandler(this, LogLevel.ERROR, ...args);
    }
}
function setLogLevel(level) {
    instances.forEach(inst => {
        inst.setLogLevel(level);
    });
}
function setUserLogHandler(logCallback, options) {
    for (const instance of instances) {
        let customLogLevel = null;
        if (options && options.level) {
            customLogLevel = levelStringToEnum[options.level];
        }
        if (logCallback === null) {
            instance.userLogHandler = null;
        }
        else {
            instance.userLogHandler = (instance, level, ...args) => {
                const message = args
                    .map(arg => {
                    if (arg == null) {
                        return null;
                    }
                    else if (typeof arg === 'string') {
                        return arg;
                    }
                    else if (typeof arg === 'number' || typeof arg === 'boolean') {
                        return arg.toString();
                    }
                    else if (arg instanceof Error) {
                        return arg.message;
                    }
                    else {
                        try {
                            return JSON.stringify(arg);
                        }
                        catch (ignored) {
                            return null;
                        }
                    }
                })
                    .filter(arg => arg)
                    .join(' ');
                if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance.logLevel)) {
                    logCallback({
                        level: LogLevel[level].toLowerCase(),
                        message,
                        args,
                        type: instance.name
                    });
                }
            };
        }
    }
}


//# sourceMappingURL=index.esm2017.js.map


/***/ }),

/***/ "./node_modules/@firebase/util/dist/index.esm2017.js":
/*!***********************************************************!*\
  !*** ./node_modules/@firebase/util/dist/index.esm2017.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONSTANTS: () => (/* binding */ CONSTANTS),
/* harmony export */   DecodeBase64StringError: () => (/* binding */ DecodeBase64StringError),
/* harmony export */   Deferred: () => (/* binding */ Deferred),
/* harmony export */   ErrorFactory: () => (/* binding */ ErrorFactory),
/* harmony export */   FirebaseError: () => (/* binding */ FirebaseError),
/* harmony export */   MAX_VALUE_MILLIS: () => (/* binding */ MAX_VALUE_MILLIS),
/* harmony export */   RANDOM_FACTOR: () => (/* binding */ RANDOM_FACTOR),
/* harmony export */   Sha1: () => (/* binding */ Sha1),
/* harmony export */   areCookiesEnabled: () => (/* binding */ areCookiesEnabled),
/* harmony export */   assert: () => (/* binding */ assert),
/* harmony export */   assertionError: () => (/* binding */ assertionError),
/* harmony export */   async: () => (/* binding */ async),
/* harmony export */   base64: () => (/* binding */ base64),
/* harmony export */   base64Decode: () => (/* binding */ base64Decode),
/* harmony export */   base64Encode: () => (/* binding */ base64Encode),
/* harmony export */   base64urlEncodeWithoutPadding: () => (/* binding */ base64urlEncodeWithoutPadding),
/* harmony export */   calculateBackoffMillis: () => (/* binding */ calculateBackoffMillis),
/* harmony export */   contains: () => (/* binding */ contains),
/* harmony export */   createMockUserToken: () => (/* binding */ createMockUserToken),
/* harmony export */   createSubscribe: () => (/* binding */ createSubscribe),
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   deepCopy: () => (/* binding */ deepCopy),
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   deepExtend: () => (/* binding */ deepExtend),
/* harmony export */   errorPrefix: () => (/* binding */ errorPrefix),
/* harmony export */   extractQuerystring: () => (/* binding */ extractQuerystring),
/* harmony export */   getDefaultAppConfig: () => (/* binding */ getDefaultAppConfig),
/* harmony export */   getDefaultEmulatorHost: () => (/* binding */ getDefaultEmulatorHost),
/* harmony export */   getDefaultEmulatorHostnameAndPort: () => (/* binding */ getDefaultEmulatorHostnameAndPort),
/* harmony export */   getDefaults: () => (/* binding */ getDefaults),
/* harmony export */   getExperimentalSetting: () => (/* binding */ getExperimentalSetting),
/* harmony export */   getGlobal: () => (/* binding */ getGlobal),
/* harmony export */   getModularInstance: () => (/* binding */ getModularInstance),
/* harmony export */   getUA: () => (/* binding */ getUA),
/* harmony export */   isAdmin: () => (/* binding */ isAdmin),
/* harmony export */   isBrowser: () => (/* binding */ isBrowser),
/* harmony export */   isBrowserExtension: () => (/* binding */ isBrowserExtension),
/* harmony export */   isCloudflareWorker: () => (/* binding */ isCloudflareWorker),
/* harmony export */   isElectron: () => (/* binding */ isElectron),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   isIE: () => (/* binding */ isIE),
/* harmony export */   isIndexedDBAvailable: () => (/* binding */ isIndexedDBAvailable),
/* harmony export */   isMobileCordova: () => (/* binding */ isMobileCordova),
/* harmony export */   isNode: () => (/* binding */ isNode),
/* harmony export */   isNodeSdk: () => (/* binding */ isNodeSdk),
/* harmony export */   isReactNative: () => (/* binding */ isReactNative),
/* harmony export */   isSafari: () => (/* binding */ isSafari),
/* harmony export */   isUWP: () => (/* binding */ isUWP),
/* harmony export */   isValidFormat: () => (/* binding */ isValidFormat),
/* harmony export */   isValidTimestamp: () => (/* binding */ isValidTimestamp),
/* harmony export */   isWebWorker: () => (/* binding */ isWebWorker),
/* harmony export */   issuedAtTime: () => (/* binding */ issuedAtTime),
/* harmony export */   jsonEval: () => (/* binding */ jsonEval),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   ordinal: () => (/* binding */ ordinal),
/* harmony export */   promiseWithTimeout: () => (/* binding */ promiseWithTimeout),
/* harmony export */   querystring: () => (/* binding */ querystring),
/* harmony export */   querystringDecode: () => (/* binding */ querystringDecode),
/* harmony export */   safeGet: () => (/* binding */ safeGet),
/* harmony export */   stringLength: () => (/* binding */ stringLength),
/* harmony export */   stringToByteArray: () => (/* binding */ stringToByteArray),
/* harmony export */   stringify: () => (/* binding */ stringify),
/* harmony export */   validateArgCount: () => (/* binding */ validateArgCount),
/* harmony export */   validateCallback: () => (/* binding */ validateCallback),
/* harmony export */   validateContextObject: () => (/* binding */ validateContextObject),
/* harmony export */   validateIndexedDBOpenable: () => (/* binding */ validateIndexedDBOpenable),
/* harmony export */   validateNamespace: () => (/* binding */ validateNamespace)
/* harmony export */ });
/* harmony import */ var _postinstall_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./postinstall.mjs */ "./node_modules/@firebase/util/dist/postinstall.mjs");


/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
const CONSTANTS = {
    /**
     * @define {boolean} Whether this is the client Node.js SDK.
     */
    NODE_CLIENT: false,
    /**
     * @define {boolean} Whether this is the Admin Node.js SDK.
     */
    NODE_ADMIN: false,
    /**
     * Firebase SDK Version
     */
    SDK_VERSION: '${JSCORE_VERSION}'
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Throws an error if the provided assertion is falsy
 */
const assert = function (assertion, message) {
    if (!assertion) {
        throw assertionError(message);
    }
};
/**
 * Returns an Error object suitable for throwing.
 */
const assertionError = function (message) {
    return new Error('Firebase Database (' +
        CONSTANTS.SDK_VERSION +
        ') INTERNAL ASSERT FAILED: ' +
        message);
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const stringToByteArray$1 = function (str) {
    // TODO(user): Use native implementations if/when available
    const out = [];
    let p = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if ((c & 0xfc00) === 0xd800 &&
            i + 1 < str.length &&
            (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param bytes Array of numbers representing characters.
 * @return Stringification of the array.
 */
const byteArrayToString = function (bytes) {
    // TODO(user): Use native implementations if/when available
    const out = [];
    let pos = 0, c = 0;
    while (pos < bytes.length) {
        const c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        }
        else if (c1 > 191 && c1 < 224) {
            const c2 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        }
        else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            const c2 = bytes[pos++];
            const c3 = bytes[pos++];
            const c4 = bytes[pos++];
            const u = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
                0x10000;
            out[c++] = String.fromCharCode(0xd800 + (u >> 10));
            out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
        }
        else {
            const c2 = bytes[pos++];
            const c3 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        }
    }
    return out.join('');
};
// We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()
// TODO(dlarocque): Define this as a class, since we no longer target ES5.
const base64 = {
    /**
     * Maps bytes to characters.
     */
    byteToCharMap_: null,
    /**
     * Maps characters to bytes.
     */
    charToByteMap_: null,
    /**
     * Maps bytes to websafe characters.
     * @private
     */
    byteToCharMapWebSafe_: null,
    /**
     * Maps websafe characters to bytes.
     * @private
     */
    charToByteMapWebSafe_: null,
    /**
     * Our default alphabet, shared between
     * ENCODED_VALS and ENCODED_VALS_WEBSAFE
     */
    ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
    /**
     * Our default alphabet. Value 64 (=) is special; it means "nothing."
     */
    get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + '+/=';
    },
    /**
     * Our websafe alphabet.
     */
    get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + '-_.';
    },
    /**
     * Whether this browser supports the atob and btoa functions. This extension
     * started at Mozilla but is now implemented by many browsers. We use the
     * ASSUME_* variables to avoid pulling in the full useragent detection library
     * but still allowing the standard per-browser compilations.
     *
     */
    HAS_NATIVE_SUPPORT: typeof atob === 'function',
    /**
     * Base64-encode an array of bytes.
     *
     * @param input An array of bytes (numbers with
     *     value in [0, 255]) to encode.
     * @param webSafe Boolean indicating we should use the
     *     alternative alphabet.
     * @return The base64 encoded string.
     */
    encodeByteArray(input, webSafe) {
        if (!Array.isArray(input)) {
            throw Error('encodeByteArray takes an array as a parameter');
        }
        this.init_();
        const byteToCharMap = webSafe
            ? this.byteToCharMapWebSafe_
            : this.byteToCharMap_;
        const output = [];
        for (let i = 0; i < input.length; i += 3) {
            const byte1 = input[i];
            const haveByte2 = i + 1 < input.length;
            const byte2 = haveByte2 ? input[i + 1] : 0;
            const haveByte3 = i + 2 < input.length;
            const byte3 = haveByte3 ? input[i + 2] : 0;
            const outByte1 = byte1 >> 2;
            const outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
            let outByte3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
            let outByte4 = byte3 & 0x3f;
            if (!haveByte3) {
                outByte4 = 64;
                if (!haveByte2) {
                    outByte3 = 64;
                }
            }
            output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
        }
        return output.join('');
    },
    /**
     * Base64-encode a string.
     *
     * @param input A string to encode.
     * @param webSafe If true, we should use the
     *     alternative alphabet.
     * @return The base64 encoded string.
     */
    encodeString(input, webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
            return btoa(input);
        }
        return this.encodeByteArray(stringToByteArray$1(input), webSafe);
    },
    /**
     * Base64-decode a string.
     *
     * @param input to decode.
     * @param webSafe True if we should use the
     *     alternative alphabet.
     * @return string representing the decoded value.
     */
    decodeString(input, webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
            return atob(input);
        }
        return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
    },
    /**
     * Base64-decode a string.
     *
     * In base-64 decoding, groups of four characters are converted into three
     * bytes.  If the encoder did not apply padding, the input length may not
     * be a multiple of 4.
     *
     * In this case, the last group will have fewer than 4 characters, and
     * padding will be inferred.  If the group has one or two characters, it decodes
     * to one byte.  If the group has three characters, it decodes to two bytes.
     *
     * @param input Input to decode.
     * @param webSafe True if we should use the web-safe alphabet.
     * @return bytes representing the decoded value.
     */
    decodeStringToByteArray(input, webSafe) {
        this.init_();
        const charToByteMap = webSafe
            ? this.charToByteMapWebSafe_
            : this.charToByteMap_;
        const output = [];
        for (let i = 0; i < input.length;) {
            const byte1 = charToByteMap[input.charAt(i++)];
            const haveByte2 = i < input.length;
            const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
            ++i;
            const haveByte3 = i < input.length;
            const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            const haveByte4 = i < input.length;
            const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
                throw new DecodeBase64StringError();
            }
            const outByte1 = (byte1 << 2) | (byte2 >> 4);
            output.push(outByte1);
            if (byte3 !== 64) {
                const outByte2 = ((byte2 << 4) & 0xf0) | (byte3 >> 2);
                output.push(outByte2);
                if (byte4 !== 64) {
                    const outByte3 = ((byte3 << 6) & 0xc0) | byte4;
                    output.push(outByte3);
                }
            }
        }
        return output;
    },
    /**
     * Lazy static initialization function. Called before
     * accessing any of the static map variables.
     * @private
     */
    init_() {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {};
            this.charToByteMap_ = {};
            this.byteToCharMapWebSafe_ = {};
            this.charToByteMapWebSafe_ = {};
            // We want quick mappings back and forth, so we precompute two maps.
            for (let i = 0; i < this.ENCODED_VALS.length; i++) {
                this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
                this.charToByteMap_[this.byteToCharMap_[i]] = i;
                this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
                this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
                // Be forgiving when decoding and correctly decode both encodings.
                if (i >= this.ENCODED_VALS_BASE.length) {
                    this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
                    this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
                }
            }
        }
    }
};
/**
 * An error encountered while decoding base64 string.
 */
class DecodeBase64StringError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'DecodeBase64StringError';
    }
}
/**
 * URL-safe base64 encoding
 */
const base64Encode = function (str) {
    const utf8Bytes = stringToByteArray$1(str);
    return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 encoding (without "." padding in the end).
 * e.g. Used in JSON Web Token (JWT) parts.
 */
const base64urlEncodeWithoutPadding = function (str) {
    // Use base64url encoding and remove padding in the end (dot characters).
    return base64Encode(str).replace(/\./g, '');
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param str To be decoded
 * @return Decoded result, if possible
 */
const base64Decode = function (str) {
    try {
        return base64.decodeString(str, true);
    }
    catch (e) {
        console.error('base64Decode failed: ', e);
    }
    return null;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
function deepCopy(value) {
    return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 *
 * Note: we don't merge __proto__ to prevent prototype pollution
 */
function deepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            // Treat Dates like scalars; if the target date object had any child
            // properties - they will be lost!
            const dateValue = source;
            return new Date(dateValue.getTime());
        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            // Always copy the array source and overwrite the target.
            target = [];
            break;
        default:
            // Not a plain Object - treat it as a scalar.
            return source;
    }
    for (const prop in source) {
        // use isValidKey to guard against prototype pollution. See https://snyk.io/vuln/SNYK-JS-LODASH-450202
        if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
            continue;
        }
        target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
}
function isValidKey(key) {
    return key !== '__proto__';
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Polyfill for `globalThis` object.
 * @returns the `globalThis` object for the given environment.
 * @public
 */
function getGlobal() {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof __webpack_require__.g !== 'undefined') {
        return __webpack_require__.g;
    }
    throw new Error('Unable to locate global object.');
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const getDefaultsFromGlobal = () => getGlobal().__FIREBASE_DEFAULTS__;
/**
 * Attempt to read defaults from a JSON string provided to
 * process(.)env(.)__FIREBASE_DEFAULTS__ or a JSON file whose path is in
 * process(.)env(.)__FIREBASE_DEFAULTS_PATH__
 * The dots are in parens because certain compilers (Vite?) cannot
 * handle seeing that variable in comments.
 * See https://github.com/firebase/firebase-js-sdk/issues/6838
 */
const getDefaultsFromEnvVariable = () => {
    if (typeof process === 'undefined' || typeof process.env === 'undefined') {
        return;
    }
    const defaultsJsonString = process.env.__FIREBASE_DEFAULTS__;
    if (defaultsJsonString) {
        return JSON.parse(defaultsJsonString);
    }
};
const getDefaultsFromCookie = () => {
    if (typeof document === 'undefined') {
        return;
    }
    let match;
    try {
        match = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    }
    catch (e) {
        // Some environments such as Angular Universal SSR have a
        // `document` object but error on accessing `document.cookie`.
        return;
    }
    const decoded = match && base64Decode(match[1]);
    return decoded && JSON.parse(decoded);
};
/**
 * Get the __FIREBASE_DEFAULTS__ object. It checks in order:
 * (1) if such an object exists as a property of `globalThis`
 * (2) if such an object was provided on a shell environment variable
 * (3) if such an object exists in a cookie
 * @public
 */
const getDefaults = () => {
    try {
        return ((0,_postinstall_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultsFromPostinstall)() ||
            getDefaultsFromGlobal() ||
            getDefaultsFromEnvVariable() ||
            getDefaultsFromCookie());
    }
    catch (e) {
        /**
         * Catch-all for being unable to get __FIREBASE_DEFAULTS__ due
         * to any environment case we have not accounted for. Log to
         * info instead of swallowing so we can find these unknown cases
         * and add paths for them if needed.
         */
        console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
        return;
    }
};
/**
 * Returns emulator host stored in the __FIREBASE_DEFAULTS__ object
 * for the given product.
 * @returns a URL host formatted like `127.0.0.1:9999` or `[::1]:4000` if available
 * @public
 */
const getDefaultEmulatorHost = (productName) => { var _a, _b; return (_b = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.emulatorHosts) === null || _b === void 0 ? void 0 : _b[productName]; };
/**
 * Returns emulator hostname and port stored in the __FIREBASE_DEFAULTS__ object
 * for the given product.
 * @returns a pair of hostname and port like `["::1", 4000]` if available
 * @public
 */
const getDefaultEmulatorHostnameAndPort = (productName) => {
    const host = getDefaultEmulatorHost(productName);
    if (!host) {
        return undefined;
    }
    const separatorIndex = host.lastIndexOf(':'); // Finding the last since IPv6 addr also has colons.
    if (separatorIndex <= 0 || separatorIndex + 1 === host.length) {
        throw new Error(`Invalid host ${host} with no separate hostname and port!`);
    }
    // eslint-disable-next-line no-restricted-globals
    const port = parseInt(host.substring(separatorIndex + 1), 10);
    if (host[0] === '[') {
        // Bracket-quoted `[ipv6addr]:port` => return "ipv6addr" (without brackets).
        return [host.substring(1, separatorIndex - 1), port];
    }
    else {
        return [host.substring(0, separatorIndex), port];
    }
};
/**
 * Returns Firebase app config stored in the __FIREBASE_DEFAULTS__ object.
 * @public
 */
const getDefaultAppConfig = () => { var _a; return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.config; };
/**
 * Returns an experimental setting on the __FIREBASE_DEFAULTS__ object (properties
 * prefixed by "_")
 * @public
 */
const getExperimentalSetting = (name) => { var _a; return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a[`_${name}`]; };

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Deferred {
    constructor() {
        this.reject = () => { };
        this.resolve = () => { };
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
    /**
     * Our API internals are not promisified and cannot because our callback APIs have subtle expectations around
     * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
     * and returns a node-style callback which will resolve or reject the Deferred's promise.
     */
    wrapCallback(callback) {
        return (error, value) => {
            if (error) {
                this.reject(error);
            }
            else {
                this.resolve(value);
            }
            if (typeof callback === 'function') {
                // Attaching noop handler just in case developer wasn't expecting
                // promises
                this.promise.catch(() => { });
                // Some of our callbacks don't expect a value and our own tests
                // assert that the parameter length is 1
                if (callback.length === 1) {
                    callback(error);
                }
                else {
                    callback(error, value);
                }
            }
        };
    }
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function createMockUserToken(token, projectId) {
    if (token.uid) {
        throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
    }
    // Unsecured JWTs use "none" as the algorithm.
    const header = {
        alg: 'none',
        type: 'JWT'
    };
    const project = projectId || 'demo-project';
    const iat = token.iat || 0;
    const sub = token.sub || token.user_id;
    if (!sub) {
        throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
    }
    const payload = Object.assign({ 
        // Set all required fields to decent defaults
        iss: `https://securetoken.google.com/${project}`, aud: project, iat, exp: iat + 3600, auth_time: iat, sub, user_id: sub, firebase: {
            sign_in_provider: 'custom',
            identities: {}
        } }, token);
    // Unsecured JWTs use the empty string as a signature.
    const signature = '';
    return [
        base64urlEncodeWithoutPadding(JSON.stringify(header)),
        base64urlEncodeWithoutPadding(JSON.stringify(payload)),
        signature
    ].join('.');
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */
function getUA() {
    if (typeof navigator !== 'undefined' &&
        typeof navigator['userAgent'] === 'string') {
        return navigator['userAgent'];
    }
    else {
        return '';
    }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */
function isMobileCordova() {
    return (typeof window !== 'undefined' &&
        // @ts-ignore Setting up an broadly applicable index signature for Window
        // just to deal with this case would probably be a bad idea.
        !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
        /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
}
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected or specified.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/
function isNode() {
    var _a;
    const forceEnvironment = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.forceEnvironment;
    if (forceEnvironment === 'node') {
        return true;
    }
    else if (forceEnvironment === 'browser') {
        return false;
    }
    try {
        return (Object.prototype.toString.call(__webpack_require__.g.process) === '[object process]');
    }
    catch (e) {
        return false;
    }
}
/**
 * Detect Browser Environment.
 * Note: This will return true for certain test frameworks that are incompletely
 * mimicking a browser, and should not lead to assuming all browser APIs are
 * available.
 */
function isBrowser() {
    return typeof window !== 'undefined' || isWebWorker();
}
/**
 * Detect Web Worker context.
 */
function isWebWorker() {
    return (typeof WorkerGlobalScope !== 'undefined' &&
        typeof self !== 'undefined' &&
        self instanceof WorkerGlobalScope);
}
/**
 * Detect Cloudflare Worker context.
 */
function isCloudflareWorker() {
    return (typeof navigator !== 'undefined' &&
        navigator.userAgent === 'Cloudflare-Workers');
}
function isBrowserExtension() {
    const runtime = typeof chrome === 'object'
        ? chrome.runtime
        : typeof browser === 'object'
            ? browser.runtime
            : undefined;
    return typeof runtime === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */
function isReactNative() {
    return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
}
/** Detects Electron apps. */
function isElectron() {
    return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */
function isIE() {
    const ua = getUA();
    return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */
function isUWP() {
    return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */
function isNodeSdk() {
    return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
/** Returns true if we are running in Safari. */
function isSafari() {
    return (!isNode() &&
        !!navigator.userAgent &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome'));
}
/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */
function isIndexedDBAvailable() {
    try {
        return typeof indexedDB === 'object';
    }
    catch (e) {
        return false;
    }
}
/**
 * This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
 * if errors occur during the database open operation.
 *
 * @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
 * private browsing)
 */
function validateIndexedDBOpenable() {
    return new Promise((resolve, reject) => {
        try {
            let preExist = true;
            const DB_CHECK_NAME = 'validate-browser-context-for-indexeddb-analytics-module';
            const request = self.indexedDB.open(DB_CHECK_NAME);
            request.onsuccess = () => {
                request.result.close();
                // delete database only when it doesn't pre-exist
                if (!preExist) {
                    self.indexedDB.deleteDatabase(DB_CHECK_NAME);
                }
                resolve(true);
            };
            request.onupgradeneeded = () => {
                preExist = false;
            };
            request.onerror = () => {
                var _a;
                reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || '');
            };
        }
        catch (error) {
            reject(error);
        }
    });
}
/**
 *
 * This method checks whether cookie is enabled within current browser
 * @return true if cookie is enabled within current browser
 */
function areCookiesEnabled() {
    if (typeof navigator === 'undefined' || !navigator.cookieEnabled) {
        return false;
    }
    return true;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Standardized Firebase Error.
 *
 * Usage:
 *
 *   // TypeScript string literals for type-safe codes
 *   type Err =
 *     'unknown' |
 *     'object-not-found'
 *     ;
 *
 *   // Closure enum for type-safe error codes
 *   // at-enum {string}
 *   var Err = {
 *     UNKNOWN: 'unknown',
 *     OBJECT_NOT_FOUND: 'object-not-found',
 *   }
 *
 *   let errors: Map<Err, string> = {
 *     'generic-error': "Unknown error",
 *     'file-not-found': "Could not find file: {$file}",
 *   };
 *
 *   // Type-safe function - must pass a valid error code as param.
 *   let error = new ErrorFactory<Err>('service', 'Service', errors);
 *
 *   ...
 *   throw error.create(Err.GENERIC);
 *   ...
 *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
 *   ...
 *   // Service: Could not file file: foo.txt (service/file-not-found).
 *
 *   catch (e) {
 *     assert(e.message === "Could not find file: foo.txt.");
 *     if ((e as FirebaseError)?.code === 'service/file-not-found') {
 *       console.log("Could not read file: " + e['file']);
 *     }
 *   }
 */
const ERROR_NAME = 'FirebaseError';
// Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
class FirebaseError extends Error {
    constructor(
    /** The error code for this error. */
    code, message, 
    /** Custom data for this error. */
    customData) {
        super(message);
        this.code = code;
        this.customData = customData;
        /** The custom name for all FirebaseErrors. */
        this.name = ERROR_NAME;
        // Fix For ES5
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        // TODO(dlarocque): Replace this with `new.target`: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
        //                   which we can now use since we no longer target ES5.
        Object.setPrototypeOf(this, FirebaseError.prototype);
        // Maintains proper stack trace for where our error was thrown.
        // Only available on V8.
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorFactory.prototype.create);
        }
    }
}
class ErrorFactory {
    constructor(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
    }
    create(code, ...data) {
        const customData = data[0] || {};
        const fullCode = `${this.service}/${code}`;
        const template = this.errors[code];
        const message = template ? replaceTemplate(template, customData) : 'Error';
        // Service Name: Error message (service/code).
        const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
        const error = new FirebaseError(fullCode, fullMessage, customData);
        return error;
    }
}
function replaceTemplate(template, data) {
    return template.replace(PATTERN, (_, key) => {
        const value = data[key];
        return value != null ? String(value) : `<${key}?>`;
    });
}
const PATTERN = /\{\$([^}]+)}/g;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */
function jsonEval(str) {
    return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data JavaScript object to be stringified.
 * @return {string} The JSON contents of the object.
 */
function stringify(data) {
    return JSON.stringify(data);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const decode = function (token) {
    let header = {}, claims = {}, data = {}, signature = '';
    try {
        const parts = token.split('.');
        header = jsonEval(base64Decode(parts[0]) || '');
        claims = jsonEval(base64Decode(parts[1]) || '');
        signature = parts[2];
        data = claims['d'] || {};
        delete claims['d'];
    }
    catch (e) { }
    return {
        header,
        claims,
        data,
        signature
    };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const isValidTimestamp = function (token) {
    const claims = decode(token).claims;
    const now = Math.floor(new Date().getTime() / 1000);
    let validSince = 0, validUntil = 0;
    if (typeof claims === 'object') {
        if (claims.hasOwnProperty('nbf')) {
            validSince = claims['nbf'];
        }
        else if (claims.hasOwnProperty('iat')) {
            validSince = claims['iat'];
        }
        if (claims.hasOwnProperty('exp')) {
            validUntil = claims['exp'];
        }
        else {
            // token will expire after 24h by default
            validUntil = validSince + 86400;
        }
    }
    return (!!now &&
        !!validSince &&
        !!validUntil &&
        now >= validSince &&
        now <= validUntil);
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const issuedAtTime = function (token) {
    const claims = decode(token).claims;
    if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
        return claims['iat'];
    }
    return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const isValidFormat = function (token) {
    const decoded = decode(token), claims = decoded.claims;
    return !!claims && typeof claims === 'object' && claims.hasOwnProperty('iat');
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const isAdmin = function (token) {
    const claims = decode(token).claims;
    return typeof claims === 'object' && claims['admin'] === true;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function contains(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
function safeGet(obj, key) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return obj[key];
    }
    else {
        return undefined;
    }
}
function isEmpty(obj) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
function map(obj, fn, contextObj) {
    const res = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            res[key] = fn.call(contextObj, obj[key], key, obj);
        }
    }
    return res;
}
/**
 * Deep equal two objects. Support Arrays and Objects.
 */
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    for (const k of aKeys) {
        if (!bKeys.includes(k)) {
            return false;
        }
        const aProp = a[k];
        const bProp = b[k];
        if (isObject(aProp) && isObject(bProp)) {
            if (!deepEqual(aProp, bProp)) {
                return false;
            }
        }
        else if (aProp !== bProp) {
            return false;
        }
    }
    for (const k of bKeys) {
        if (!aKeys.includes(k)) {
            return false;
        }
    }
    return true;
}
function isObject(thing) {
    return thing !== null && typeof thing === 'object';
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Rejects if the given promise doesn't resolve in timeInMS milliseconds.
 * @internal
 */
function promiseWithTimeout(promise, timeInMS = 2000) {
    const deferredPromise = new Deferred();
    setTimeout(() => deferredPromise.reject('timeout!'), timeInMS);
    promise.then(deferredPromise.resolve, deferredPromise.reject);
    return deferredPromise.promise;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
 * params object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 */
function querystring(querystringParams) {
    const params = [];
    for (const [key, value] of Object.entries(querystringParams)) {
        if (Array.isArray(value)) {
            value.forEach(arrayVal => {
                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
            });
        }
        else {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    }
    return params.length ? '&' + params.join('&') : '';
}
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
 * (e.g. {arg: 'val', arg2: 'val2'})
 */
function querystringDecode(querystring) {
    const obj = {};
    const tokens = querystring.replace(/^\?/, '').split('&');
    tokens.forEach(token => {
        if (token) {
            const [key, value] = token.split('=');
            obj[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    });
    return obj;
}
/**
 * Extract the query string part of a URL, including the leading question mark (if present).
 */
function extractQuerystring(url) {
    const queryStart = url.indexOf('?');
    if (!queryStart) {
        return '';
    }
    const fragmentStart = url.indexOf('#', queryStart);
    return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : undefined);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */
/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @final
 * @struct
 */
class Sha1 {
    constructor() {
        /**
         * Holds the previous values of accumulated variables a-e in the compress_
         * function.
         * @private
         */
        this.chain_ = [];
        /**
         * A buffer holding the partially computed hash result.
         * @private
         */
        this.buf_ = [];
        /**
         * An array of 80 bytes, each a part of the message to be hashed.  Referred to
         * as the message schedule in the docs.
         * @private
         */
        this.W_ = [];
        /**
         * Contains data needed to pad messages less than 64 bytes.
         * @private
         */
        this.pad_ = [];
        /**
         * @private {number}
         */
        this.inbuf_ = 0;
        /**
         * @private {number}
         */
        this.total_ = 0;
        this.blockSize = 512 / 8;
        this.pad_[0] = 128;
        for (let i = 1; i < this.blockSize; ++i) {
            this.pad_[i] = 0;
        }
        this.reset();
    }
    reset() {
        this.chain_[0] = 0x67452301;
        this.chain_[1] = 0xefcdab89;
        this.chain_[2] = 0x98badcfe;
        this.chain_[3] = 0x10325476;
        this.chain_[4] = 0xc3d2e1f0;
        this.inbuf_ = 0;
        this.total_ = 0;
    }
    /**
     * Internal compress helper function.
     * @param buf Block to compress.
     * @param offset Offset of the block in the buffer.
     * @private
     */
    compress_(buf, offset) {
        if (!offset) {
            offset = 0;
        }
        const W = this.W_;
        // get 16 big endian words
        if (typeof buf === 'string') {
            for (let i = 0; i < 16; i++) {
                // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
                // have a bug that turns the post-increment ++ operator into pre-increment
                // during JIT compilation.  We have code that depends heavily on SHA-1 for
                // correctness and which is affected by this bug, so I've removed all uses
                // of post-increment ++ in which the result value is used.  We can revert
                // this change once the Safari bug
                // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
                // most clients have been updated.
                W[i] =
                    (buf.charCodeAt(offset) << 24) |
                        (buf.charCodeAt(offset + 1) << 16) |
                        (buf.charCodeAt(offset + 2) << 8) |
                        buf.charCodeAt(offset + 3);
                offset += 4;
            }
        }
        else {
            for (let i = 0; i < 16; i++) {
                W[i] =
                    (buf[offset] << 24) |
                        (buf[offset + 1] << 16) |
                        (buf[offset + 2] << 8) |
                        buf[offset + 3];
                offset += 4;
            }
        }
        // expand to 80 words
        for (let i = 16; i < 80; i++) {
            const t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
            W[i] = ((t << 1) | (t >>> 31)) & 0xffffffff;
        }
        let a = this.chain_[0];
        let b = this.chain_[1];
        let c = this.chain_[2];
        let d = this.chain_[3];
        let e = this.chain_[4];
        let f, k;
        // TODO(user): Try to unroll this loop to speed up the computation.
        for (let i = 0; i < 80; i++) {
            if (i < 40) {
                if (i < 20) {
                    f = d ^ (b & (c ^ d));
                    k = 0x5a827999;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0x6ed9eba1;
                }
            }
            else {
                if (i < 60) {
                    f = (b & c) | (d & (b | c));
                    k = 0x8f1bbcdc;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0xca62c1d6;
                }
            }
            const t = (((a << 5) | (a >>> 27)) + f + e + k + W[i]) & 0xffffffff;
            e = d;
            d = c;
            c = ((b << 30) | (b >>> 2)) & 0xffffffff;
            b = a;
            a = t;
        }
        this.chain_[0] = (this.chain_[0] + a) & 0xffffffff;
        this.chain_[1] = (this.chain_[1] + b) & 0xffffffff;
        this.chain_[2] = (this.chain_[2] + c) & 0xffffffff;
        this.chain_[3] = (this.chain_[3] + d) & 0xffffffff;
        this.chain_[4] = (this.chain_[4] + e) & 0xffffffff;
    }
    update(bytes, length) {
        // TODO(johnlenz): tighten the function signature and remove this check
        if (bytes == null) {
            return;
        }
        if (length === undefined) {
            length = bytes.length;
        }
        const lengthMinusBlock = length - this.blockSize;
        let n = 0;
        // Using local instead of member variables gives ~5% speedup on Firefox 16.
        const buf = this.buf_;
        let inbuf = this.inbuf_;
        // The outer while loop should execute at most twice.
        while (n < length) {
            // When we have no data in the block to top up, we can directly process the
            // input buffer (assuming it contains sufficient data). This gives ~25%
            // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
            // the data is provided in large chunks (or in multiples of 64 bytes).
            if (inbuf === 0) {
                while (n <= lengthMinusBlock) {
                    this.compress_(bytes, n);
                    n += this.blockSize;
                }
            }
            if (typeof bytes === 'string') {
                while (n < length) {
                    buf[inbuf] = bytes.charCodeAt(n);
                    ++inbuf;
                    ++n;
                    if (inbuf === this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
            else {
                while (n < length) {
                    buf[inbuf] = bytes[n];
                    ++inbuf;
                    ++n;
                    if (inbuf === this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
        }
        this.inbuf_ = inbuf;
        this.total_ += length;
    }
    /** @override */
    digest() {
        const digest = [];
        let totalBits = this.total_ * 8;
        // Add pad 0x80 0x00*.
        if (this.inbuf_ < 56) {
            this.update(this.pad_, 56 - this.inbuf_);
        }
        else {
            this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
        }
        // Add # bits.
        for (let i = this.blockSize - 1; i >= 56; i--) {
            this.buf_[i] = totalBits & 255;
            totalBits /= 256; // Don't use bit-shifting here!
        }
        this.compress_(this.buf_);
        let n = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 24; j >= 0; j -= 8) {
                digest[n] = (this.chain_[i] >> j) & 255;
                ++n;
            }
        }
        return digest;
    }
}

/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
    const proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */
class ObserverProxy {
    /**
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    constructor(executor, onNoObservers) {
        this.observers = [];
        this.unsubscribes = [];
        this.observerCount = 0;
        // Micro-task scheduling by calling task.then().
        this.task = Promise.resolve();
        this.finalized = false;
        this.onNoObservers = onNoObservers;
        // Call the executor asynchronously so subscribers that are called
        // synchronously after the creation of the subscribe function
        // can still receive the very first value generated in the executor.
        this.task
            .then(() => {
            executor(this);
        })
            .catch(e => {
            this.error(e);
        });
    }
    next(value) {
        this.forEachObserver((observer) => {
            observer.next(value);
        });
    }
    error(error) {
        this.forEachObserver((observer) => {
            observer.error(error);
        });
        this.close(error);
    }
    complete() {
        this.forEachObserver((observer) => {
            observer.complete();
        });
        this.close();
    }
    /**
     * Subscribe function that can be used to add an Observer to the fan-out list.
     *
     * - We require that no event is sent to a subscriber synchronously to their
     *   call to subscribe().
     */
    subscribe(nextOrObserver, error, complete) {
        let observer;
        if (nextOrObserver === undefined &&
            error === undefined &&
            complete === undefined) {
            throw new Error('Missing Observer.');
        }
        // Assemble an Observer object when passed as callback functions.
        if (implementsAnyMethods(nextOrObserver, [
            'next',
            'error',
            'complete'
        ])) {
            observer = nextOrObserver;
        }
        else {
            observer = {
                next: nextOrObserver,
                error,
                complete
            };
        }
        if (observer.next === undefined) {
            observer.next = noop;
        }
        if (observer.error === undefined) {
            observer.error = noop;
        }
        if (observer.complete === undefined) {
            observer.complete = noop;
        }
        const unsub = this.unsubscribeOne.bind(this, this.observers.length);
        // Attempt to subscribe to a terminated Observable - we
        // just respond to the Observer with the final error or complete
        // event.
        if (this.finalized) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.task.then(() => {
                try {
                    if (this.finalError) {
                        observer.error(this.finalError);
                    }
                    else {
                        observer.complete();
                    }
                }
                catch (e) {
                    // nothing
                }
                return;
            });
        }
        this.observers.push(observer);
        return unsub;
    }
    // Unsubscribe is synchronous - we guarantee that no events are sent to
    // any unsubscribed Observer.
    unsubscribeOne(i) {
        if (this.observers === undefined || this.observers[i] === undefined) {
            return;
        }
        delete this.observers[i];
        this.observerCount -= 1;
        if (this.observerCount === 0 && this.onNoObservers !== undefined) {
            this.onNoObservers(this);
        }
    }
    forEachObserver(fn) {
        if (this.finalized) {
            // Already closed by previous event....just eat the additional values.
            return;
        }
        // Since sendOne calls asynchronously - there is no chance that
        // this.observers will become undefined.
        for (let i = 0; i < this.observers.length; i++) {
            this.sendOne(i, fn);
        }
    }
    // Call the Observer via one of it's callback function. We are careful to
    // confirm that the observe has not been unsubscribed since this asynchronous
    // function had been queued.
    sendOne(i, fn) {
        // Execute the callback asynchronously
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(() => {
            if (this.observers !== undefined && this.observers[i] !== undefined) {
                try {
                    fn(this.observers[i]);
                }
                catch (e) {
                    // Ignore exceptions raised in Observers or missing methods of an
                    // Observer.
                    // Log error to console. b/31404806
                    if (typeof console !== 'undefined' && console.error) {
                        console.error(e);
                    }
                }
            }
        });
    }
    close(err) {
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        if (err !== undefined) {
            this.finalError = err;
        }
        // Proxy is no longer needed - garbage collect references
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(() => {
            this.observers = undefined;
            this.onNoObservers = undefined;
        });
    }
}
/** Turn synchronous function into one called asynchronously. */
// eslint-disable-next-line @typescript-eslint/ban-types
function async(fn, onError) {
    return (...args) => {
        Promise.resolve(true)
            .then(() => {
            fn(...args);
        })
            .catch((error) => {
            if (onError) {
                onError(error);
            }
        });
    };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    for (const method of methods) {
        if (method in obj && typeof obj[method] === 'function') {
            return true;
        }
    }
    return false;
}
function noop() {
    // do nothing
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param fnName The function name
 * @param minCount The minimum number of arguments to allow for the function call
 * @param maxCount The maximum number of argument to allow for the function call
 * @param argCount The actual number of arguments provided.
 */
const validateArgCount = function (fnName, minCount, maxCount, argCount) {
    let argError;
    if (argCount < minCount) {
        argError = 'at least ' + minCount;
    }
    else if (argCount > maxCount) {
        argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
    }
    if (argError) {
        const error = fnName +
            ' failed: Was called with ' +
            argCount +
            (argCount === 1 ? ' argument.' : ' arguments.') +
            ' Expects ' +
            argError +
            '.';
        throw new Error(error);
    }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param fnName The function name
 * @param argName The name of the argument
 * @return The prefix to add to the error thrown for validation.
 */
function errorPrefix(fnName, argName) {
    return `${fnName} failed: ${argName} argument `;
}
/**
 * @param fnName
 * @param argumentNumber
 * @param namespace
 * @param optional
 */
function validateNamespace(fnName, namespace, optional) {
    if (optional && !namespace) {
        return;
    }
    if (typeof namespace !== 'string') {
        //TODO: I should do more validation here. We only allow certain chars in namespaces.
        throw new Error(errorPrefix(fnName, 'namespace') + 'must be a valid firebase namespace.');
    }
}
function validateCallback(fnName, argumentName, 
// eslint-disable-next-line @typescript-eslint/ban-types
callback, optional) {
    if (optional && !callback) {
        return;
    }
    if (typeof callback !== 'function') {
        throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid function.');
    }
}
function validateContextObject(fnName, argumentName, context, optional) {
    if (optional && !context) {
        return;
    }
    if (typeof context !== 'object' || context === null) {
        throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid context object.');
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in JavaScript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3
/**
 * @param {string} str
 * @return {Array}
 */
const stringToByteArray = function (str) {
    const out = [];
    let p = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        // Is this the lead surrogate in a surrogate pair?
        if (c >= 0xd800 && c <= 0xdbff) {
            const high = c - 0xd800; // the high 10 bits.
            i++;
            assert(i < str.length, 'Surrogate pair missing trail surrogate.');
            const low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.
            c = 0x10000 + (high << 10) + low;
        }
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if (c < 65536) {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */
const stringLength = function (str) {
    let p = 0;
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);
        if (c < 128) {
            p++;
        }
        else if (c < 2048) {
            p += 2;
        }
        else if (c >= 0xd800 && c <= 0xdbff) {
            // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
            p += 4;
            i++; // skip trail surrogate.
        }
        else {
            p += 3;
        }
    }
    return p;
};

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The amount of milliseconds to exponentially increase.
 */
const DEFAULT_INTERVAL_MILLIS = 1000;
/**
 * The factor to backoff by.
 * Should be a number greater than 1.
 */
const DEFAULT_BACKOFF_FACTOR = 2;
/**
 * The maximum milliseconds to increase to.
 *
 * <p>Visible for testing
 */
const MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000; // Four hours, like iOS and Android.
/**
 * The percentage of backoff time to randomize by.
 * See
 * http://go/safe-client-behavior#step-1-determine-the-appropriate-retry-interval-to-handle-spike-traffic
 * for context.
 *
 * <p>Visible for testing
 */
const RANDOM_FACTOR = 0.5;
/**
 * Based on the backoff method from
 * https://github.com/google/closure-library/blob/master/closure/goog/math/exponentialbackoff.js.
 * Extracted here so we don't need to pass metadata and a stateful ExponentialBackoff object around.
 */
function calculateBackoffMillis(backoffCount, intervalMillis = DEFAULT_INTERVAL_MILLIS, backoffFactor = DEFAULT_BACKOFF_FACTOR) {
    // Calculates an exponentially increasing value.
    // Deviation: calculates value from count and a constant interval, so we only need to save value
    // and count to restore state.
    const currBaseValue = intervalMillis * Math.pow(backoffFactor, backoffCount);
    // A random "fuzz" to avoid waves of retries.
    // Deviation: randomFactor is required.
    const randomWait = Math.round(
    // A fraction of the backoff value to add/subtract.
    // Deviation: changes multiplication order to improve readability.
    RANDOM_FACTOR *
        currBaseValue *
        // A random float (rounded to int by Math.round above) in the range [-1, 1]. Determines
        // if we add or subtract.
        (Math.random() - 0.5) *
        2);
    // Limits backoff to max to avoid effectively permanent backoff.
    return Math.min(MAX_VALUE_MILLIS, currBaseValue + randomWait);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provide English ordinal letters after a number
 */
function ordinal(i) {
    if (!Number.isFinite(i)) {
        return `${i}`;
    }
    return i + indicator(i);
}
function indicator(i) {
    i = Math.abs(i);
    const cent = i % 100;
    if (cent >= 10 && cent <= 20) {
        return 'th';
    }
    const dec = i % 10;
    if (dec === 1) {
        return 'st';
    }
    if (dec === 2) {
        return 'nd';
    }
    if (dec === 3) {
        return 'rd';
    }
    return 'th';
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getModularInstance(service) {
    if (service && service._delegate) {
        return service._delegate;
    }
    else {
        return service;
    }
}


//# sourceMappingURL=index.esm2017.js.map


/***/ }),

/***/ "./node_modules/@firebase/util/dist/postinstall.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/@firebase/util/dist/postinstall.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultsFromPostinstall: () => (/* binding */ getDefaultsFromPostinstall)
/* harmony export */ });
const getDefaultsFromPostinstall = () => (undefined);


/***/ }),

/***/ "./node_modules/firebase/app/dist/esm/index.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/firebase/app/dist/esm/index.esm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirebaseError: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.FirebaseError),
/* harmony export */   SDK_VERSION: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.SDK_VERSION),
/* harmony export */   _DEFAULT_ENTRY_NAME: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._DEFAULT_ENTRY_NAME),
/* harmony export */   _addComponent: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._addComponent),
/* harmony export */   _addOrOverwriteComponent: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._addOrOverwriteComponent),
/* harmony export */   _apps: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._apps),
/* harmony export */   _clearComponents: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._clearComponents),
/* harmony export */   _components: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._components),
/* harmony export */   _getProvider: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._getProvider),
/* harmony export */   _isFirebaseApp: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._isFirebaseApp),
/* harmony export */   _isFirebaseServerApp: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._isFirebaseServerApp),
/* harmony export */   _registerComponent: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._registerComponent),
/* harmony export */   _removeServiceInstance: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._removeServiceInstance),
/* harmony export */   _serverApps: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._serverApps),
/* harmony export */   deleteApp: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.deleteApp),
/* harmony export */   getApp: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp),
/* harmony export */   getApps: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps),
/* harmony export */   initializeApp: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp),
/* harmony export */   initializeServerApp: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeServerApp),
/* harmony export */   onLog: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.onLog),
/* harmony export */   registerVersion: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion),
/* harmony export */   setLogLevel: () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.setLogLevel)
/* harmony export */ });
/* harmony import */ var _firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/app */ "./node_modules/@firebase/app/dist/esm/index.esm2017.js");



var name = "firebase";
var version = "11.6.1";

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion)(name, version, 'app');
//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./node_modules/firebase/database/dist/esm/index.esm.js":
/*!**************************************************************!*\
  !*** ./node_modules/firebase/database/dist/esm/index.esm.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataSnapshot: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.DataSnapshot),
/* harmony export */   Database: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.Database),
/* harmony export */   OnDisconnect: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.OnDisconnect),
/* harmony export */   QueryConstraint: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.QueryConstraint),
/* harmony export */   TransactionResult: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.TransactionResult),
/* harmony export */   _QueryImpl: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__._QueryImpl),
/* harmony export */   _QueryParams: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__._QueryParams),
/* harmony export */   _ReferenceImpl: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__._ReferenceImpl),
/* harmony export */   _TEST_ACCESS_forceRestClient: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__._TEST_ACCESS_forceRestClient),
/* harmony export */   _TEST_ACCESS_hijackHash: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__._TEST_ACCESS_hijackHash),
/* harmony export */   _initStandalone: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__._initStandalone),
/* harmony export */   _repoManagerDatabaseFromApp: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__._repoManagerDatabaseFromApp),
/* harmony export */   _setSDKVersion: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__._setSDKVersion),
/* harmony export */   _validatePathString: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__._validatePathString),
/* harmony export */   _validateWritablePath: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__._validateWritablePath),
/* harmony export */   child: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.child),
/* harmony export */   connectDatabaseEmulator: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.connectDatabaseEmulator),
/* harmony export */   enableLogging: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.enableLogging),
/* harmony export */   endAt: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.endAt),
/* harmony export */   endBefore: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.endBefore),
/* harmony export */   equalTo: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.equalTo),
/* harmony export */   forceLongPolling: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.forceLongPolling),
/* harmony export */   forceWebSockets: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.forceWebSockets),
/* harmony export */   get: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.get),
/* harmony export */   getDatabase: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.getDatabase),
/* harmony export */   goOffline: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.goOffline),
/* harmony export */   goOnline: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.goOnline),
/* harmony export */   increment: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.increment),
/* harmony export */   limitToFirst: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.limitToFirst),
/* harmony export */   limitToLast: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.limitToLast),
/* harmony export */   off: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.off),
/* harmony export */   onChildAdded: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.onChildAdded),
/* harmony export */   onChildChanged: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.onChildChanged),
/* harmony export */   onChildMoved: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.onChildMoved),
/* harmony export */   onChildRemoved: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.onChildRemoved),
/* harmony export */   onDisconnect: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.onDisconnect),
/* harmony export */   onValue: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.onValue),
/* harmony export */   orderByChild: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.orderByChild),
/* harmony export */   orderByKey: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.orderByKey),
/* harmony export */   orderByPriority: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.orderByPriority),
/* harmony export */   orderByValue: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.orderByValue),
/* harmony export */   push: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.push),
/* harmony export */   query: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.query),
/* harmony export */   ref: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref),
/* harmony export */   refFromURL: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.refFromURL),
/* harmony export */   remove: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.remove),
/* harmony export */   runTransaction: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.runTransaction),
/* harmony export */   serverTimestamp: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp),
/* harmony export */   set: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.set),
/* harmony export */   setPriority: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.setPriority),
/* harmony export */   setWithPriority: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.setWithPriority),
/* harmony export */   startAfter: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.startAfter),
/* harmony export */   startAt: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.startAt),
/* harmony export */   update: () => (/* reexport safe */ _firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)
/* harmony export */ });
/* harmony import */ var _firebase_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/database */ "./node_modules/@firebase/database/dist/index.esm2017.js");

//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./node_modules/idb/build/index.js":
/*!*****************************************!*\
  !*** ./node_modules/idb/build/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteDB: () => (/* binding */ deleteDB),
/* harmony export */   openDB: () => (/* binding */ openDB),
/* harmony export */   unwrap: () => (/* reexport safe */ _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.u),
/* harmony export */   wrap: () => (/* reexport safe */ _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.w)
/* harmony export */ });
/* harmony import */ var _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wrap-idb-value.js */ "./node_modules/idb/build/wrap-idb-value.js");



/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = (0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.w)(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event) => {
            upgrade((0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.w)(request.result), event.oldVersion, event.newVersion, (0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.w)(request.transaction), event);
        });
    }
    if (blocked) {
        request.addEventListener('blocked', (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion, event.newVersion, event));
    }
    openPromise
        .then((db) => {
        if (terminated)
            db.addEventListener('close', () => terminated());
        if (blocking) {
            db.addEventListener('versionchange', (event) => blocking(event.oldVersion, event.newVersion, event));
        }
    })
        .catch(() => { });
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked) {
        request.addEventListener('blocked', (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion, event));
    }
    return (0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.w)(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        // Must reject if op rejects.
        // If it's a write operation, must reject if tx.done rejects.
        // Must reject with op rejection first.
        // Must resolve with op value.
        // Must handle both promises (no unhandled rejections)
        return (await Promise.all([
            target[targetFuncName](...args),
            isWrite && tx.done,
        ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
}
(0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.r)((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));




/***/ }),

/***/ "./node_modules/idb/build/wrap-idb-value.js":
/*!**************************************************!*\
  !*** ./node_modules/idb/build/wrap-idb-value.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ reverseTransformCache),
/* harmony export */   i: () => (/* binding */ instanceOfAny),
/* harmony export */   r: () => (/* binding */ replaceTraps),
/* harmony export */   u: () => (/* binding */ unwrap),
/* harmony export */   w: () => (/* binding */ wrap)
/* harmony export */ });
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise
        .then((value) => {
        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
        // (see wrapFunction).
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
        // Catching to avoid "Uncaught Promise exceptions"
    })
        .catch(() => { });
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Polyfill for objectStoreNames because of Edge.
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction &&
        !('objectStoreNames' in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
            return wrap(tx);
        };
    }
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);




/***/ }),

/***/ "./src/components/Map/Map.js":
/*!***********************************!*\
  !*** ./src/components/Map/Map.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Map Component - Handles map display and interactions
 */
class MapComponent {
  /**
   * Initialize the Map component
   * @param {string} containerId - The ID of the container element
   * @param {Array} initialCenter - Initial [lat, lon] coordinates for map center
   * @param {number} initialZoom - Initial zoom level
   */
  constructor(containerId = 'map', initialCenter = [3.139, 101.6869], initialZoom = 12) {
    this.map = null;
    this.markerLayer = null;
    this.hikerMarkers = {};
    this.towerMarkers = {};
    this.trackingHikerId = null;
    this.containerId = containerId;
    this.initialCenter = initialCenter;
    this.initialZoom = initialZoom;
    this.preserveCurrentView = true; // Add flag to preserve current view
  }

  /**
   * Initialize the map
   */
  init() {
    // Create the map
    this.map = L.map(this.containerId).setView(this.initialCenter, this.initialZoom);
    
    // Add the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Create a layer group for markers
    this.markerLayer = L.layerGroup().addTo(this.map);

    // Initialize map controls
    this.initControls();

    return this;
  }

  /**
   * Initialize map controls
   */
  initControls() {
    // Center map button
    document.getElementById('center-map')?.addEventListener('click', () => {
      this.centerMap();
      this.trackingHikerId = null;
      // View preservation is handled in centerMap method
    });
    
    // Toggle all hikers button can be implemented here
    document.getElementById('toggle-all-hikers')?.addEventListener('click', () => {
      this.fitToAllHikers();
      // View preservation is handled in fitToAllHikers method
    });
    
    // Add event listener to detect user-initiated map movements
    this.map.on('moveend', (e) => {
      // If this move was triggered by user interaction and not programmatically
      if (e.hard !== true) {
        // User has manually moved the map, so we should preserve their view
        this.preserveCurrentView = true;
        // Cancel any active tracking when user manually moves the map
        if (this.trackingHikerId !== null && e.target._zoom !== 15) {
          console.log('User moved map, canceling tracking');
          this.trackingHikerId = null;
        }
      }
    });
  }

  /**
   * Create a custom marker for a hiker
   * @param {Object} hiker - The hiker object
   * @returns {Object} Leaflet divIcon
   */
  createCustomMarkerIcon(hiker) {
    const sosClass = hiker.sos ? ' sos' : '';
    const handledClass = (hiker.sos && hiker.sosHandled) ? ' handled' : '';
    const emergencyClass = (hiker.sos && hiker.sosEmergencyDispatched) ? ' emergency' : '';
    
    let statusIcon = '';
    if (hiker.sos) {
      if (hiker.sosEmergencyDispatched) {
        statusIcon = '<i class="fas fa-ambulance sos-marker-icon"></i>';
      } else if (hiker.sosHandled) {
        statusIcon = '<i class="fas fa-check-circle sos-marker-icon"></i>';
      }
    }
    
    const markerHtml = `
      <div class="marker-label${sosClass}${handledClass}${emergencyClass}">
        ${hiker.name}
        ${statusIcon}
      </div>
      <div class="custom-marker${sosClass}${handledClass}${emergencyClass}"></div>
    `;
    
    return L.divIcon({
      html: markerHtml,
      className: 'hiker-marker-container',
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  }

  /**
   * Create a custom marker for a tower/basecamp
   * @param {Object} tower - The tower object
   * @returns {Object} Leaflet divIcon
   */
  createTowerMarkerIcon(tower) {
    const typeClass = tower.type.toLowerCase();
    const statusClass = tower.status.toLowerCase();
    
    // Choose Lucide icon based on type
    const lucideIcon = tower.type === 'Tower' ? 'radio-tower' : 'house-wifi';
    
    // Status indicator using Lucide icons
    let statusIndicator = '';
    if (tower.status === 'Offline') {
      statusIndicator = '<i data-lucide="x-circle" class="tower-status-icon offline"></i>';
    } else if (tower.status === 'Maintenance') {
      statusIndicator = '<i data-lucide="wrench" class="tower-status-icon maintenance"></i>';
    } else {
      statusIndicator = '<i data-lucide="check-circle" class="tower-status-icon active"></i>';
    }
    
    const markerHtml = `
      <div class="tower-marker-label ${typeClass} ${statusClass}">
        ${tower.name}
        ${statusIndicator}
      </div>
      <div class="tower-marker-icon ${typeClass} ${statusClass}">
        <i data-lucide="${lucideIcon}" class="tower-main-icon"></i>
      </div>
    `;
    
    const divIcon = L.divIcon({
      html: markerHtml,
      className: 'tower-marker-container',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    
    // Schedule Lucide icon refresh after a short delay
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 100);
    
    return divIcon;
  }

  /**
   * Center the map on a specific hiker
   * @param {string|number} hikerId - The ID of the hiker to center on
   */
  centerOnHiker(hikerId) {
    if (!this.hikers) {
      console.warn('No hikers data available for centering');
      return;
    }
    
    const hiker = this.hikers.find(h => h.id === hikerId);
    if (!hiker) {
      console.warn(`Hiker with ID ${hikerId} not found`);
      return;
    }
    
    if (this.map) {
      try {
        const lat = parseFloat(hiker.lat);
        const lon = parseFloat(hiker.lon);
        
        if (isNaN(lat) || isNaN(lon)) {
          console.warn(`Invalid coordinates for hiker ${hikerId}:`, hiker.lat, hiker.lon);
          return;
        }
        
        console.log(`Centering map on hiker ${hikerId} at ${lat},${lon}`);
        this.preserveCurrentView = false; // Disable view preservation when explicitly centering
        this.map.setView([lat, lon], 15);
        this.trackingHikerId = hikerId;
        this.preserveCurrentView = true; // Re-enable view preservation after centering
      } catch (error) {
        console.error(`Error centering on hiker ${hikerId}:`, error);
      }
    }
  }

  /**
   * Center the map to its initial position or specified coordinates and zoom
   * @param {Array} [center] - Optional center coordinates [lat, lon]
   * @param {number} [zoom] - Optional zoom level
   */
  centerMap(center, zoom) {
    const targetCenter = center || this.initialCenter;
    const targetZoom = zoom || this.initialZoom;
    this.preserveCurrentView = false; // Disable view preservation for explicit center
    this.map.setView(targetCenter, targetZoom);
    this.trackingHikerId = null; // Stop tracking any hiker
    this.preserveCurrentView = true; // Re-enable view preservation
  }

  /**
   * Fit the map to show all hikers
   */
  fitToAllHikers() {
    if (!this.hikers || this.hikers.length === 0) {
      console.warn('No hikers data available for fitting bounds');
      return;
    }

    // Filter out hikers with invalid coordinates
    const validHikers = this.hikers.filter(h => {
      const lat = parseFloat(h.lat);
      const lon = parseFloat(h.lon);
      return !isNaN(lat) && !isNaN(lon);
    });
    
    if (validHikers.length === 0) {
      console.warn('No hikers with valid coordinates for fitting bounds');
      return;
    }

    try {
      const bounds = L.latLngBounds(validHikers.map(h => [parseFloat(h.lat), parseFloat(h.lon)]));
      console.log('Fitting map to bounds:', bounds);
      this.preserveCurrentView = false; // Disable view preservation for fitting bounds
      this.map.fitBounds(bounds, { padding: [50, 50] });
      this.preserveCurrentView = true; // Re-enable view preservation
    } catch (error) {
      console.error('Error fitting bounds to hikers:', error);
    }
  }

  /**
   * Update the map with current hiker and tower data
   * @param {Array} hikers - Array of hiker objects
   * @param {Function} onHikerClick - Callback for hiker marker click events
   * @param {Array} towers - Array of tower objects
   * @param {Function} onTowerClick - Callback for tower marker click events
   */
  updateMap(hikers, onHikerClick, towers = [], onTowerClick = null) {
    if (!this.map || !this.markerLayer) {
      console.error('Map not initialized');
      return;
    }
    
    // Store current view before updating
    const currentCenter = this.map.getCenter();
    const currentZoom = this.map.getZoom();
    
    this.hikers = hikers;
    
    // Keep track of current hiker IDs
    const currentHikerIds = new Set();
    
    console.log('Updating map with hikers:', hikers);
    
    hikers.forEach(hiker => {
      // Ensure lat and lon are valid numbers
      const lat = parseFloat(hiker.lat);
      const lon = parseFloat(hiker.lon);
      
      // Skip invalid coordinates
      if (isNaN(lat) || isNaN(lon)) {
        console.warn(`Invalid coordinates for hiker ${hiker.id}:`, hiker.lat, hiker.lon);
        return;
      }
      
      currentHikerIds.add(hiker.id);
      
      // Check if marker already exists
      const existingMarker = this.hikerMarkers[hiker.id];
      
      if (existingMarker) {
        // Update existing marker position and icon
        existingMarker.setLatLng([lat, lon]);
        existingMarker.setIcon(this.createCustomMarkerIcon(hiker));
        existingMarker.setZIndexOffset(hiker.sos ? 1000 : 0);
      } else {
        // Create new marker
        console.log(`Creating marker for ${hiker.id} at ${lat},${lon}`);
        
        try {
          const marker = L.marker([lat, lon], {
            icon: this.createCustomMarkerIcon(hiker),
            zIndexOffset: hiker.sos ? 1000 : 0 // SOS markers on top
          }).addTo(this.markerLayer);
          
          if (onHikerClick) {
            marker.on('click', () => onHikerClick(hiker));
          }
          
          this.hikerMarkers[hiker.id] = marker;
        } catch (error) {
          console.error(`Error creating marker for hiker ${hiker.id}:`, error);
        }
      }
    });
    
    // Remove markers for hikers that no longer exist
    Object.keys(this.hikerMarkers).forEach(hikerId => {
      if (!currentHikerIds.has(Number(hikerId)) && !currentHikerIds.has(hikerId)) {
        this.markerLayer.removeLayer(this.hikerMarkers[hikerId]);
        delete this.hikerMarkers[hikerId];
      }
    });

    // Handle tower markers
    const currentTowerIds = new Set();
    
    towers.forEach(tower => {
      // Ensure lat and lon are valid numbers
      const lat = parseFloat(tower.lat);
      const lon = parseFloat(tower.lon);
      
      // Skip invalid coordinates
      if (isNaN(lat) || isNaN(lon)) {
        console.warn(`Invalid coordinates for tower ${tower.id}:`, tower.lat, tower.lon);
        return;
      }
      
      currentTowerIds.add(tower.id);
      
      // Check if marker already exists
      const existingMarker = this.towerMarkers[tower.id];
      
      if (existingMarker) {
        // Update existing marker position and icon
        existingMarker.setLatLng([lat, lon]);
        existingMarker.setIcon(this.createTowerMarkerIcon(tower));
      } else {
        // Create new marker
        console.log(`Creating tower marker for ${tower.id} at ${lat},${lon}`);
        
        try {
          const marker = L.marker([lat, lon], {
            icon: this.createTowerMarkerIcon(tower),
            zIndexOffset: 500 // Towers above hikers but below SOS
          }).addTo(this.markerLayer);
          
          if (onTowerClick) {
            marker.on('click', () => onTowerClick(tower));
          }
          
          this.towerMarkers[tower.id] = marker;
        } catch (error) {
          console.error(`Error creating marker for tower ${tower.id}:`, error);
        }
      }
    });
    
    // Remove markers for towers that no longer exist
    Object.keys(this.towerMarkers).forEach(towerId => {
      if (!currentTowerIds.has(towerId)) {
        this.markerLayer.removeLayer(this.towerMarkers[towerId]);
        delete this.towerMarkers[towerId];
      }
    });
    
    // Only adjust view if we're not preserving the current view
    if (!this.preserveCurrentView) {
      // If we have at least one hiker, fit bounds if no tracking
      if (hikers.length > 0 && this.trackingHikerId === null) {
        try {
          this.fitToAllHikers();
        } catch (error) {
          console.error('Error fitting bounds to hikers:', error);
        }
      }
      
      // Follow tracked hiker if needed
      if (this.trackingHikerId !== null) {
        this.centerOnHiker(this.trackingHikerId);
      }
    } else if (currentCenter && currentZoom) {
      // Restore previous view if preserving
      this.map.setView(currentCenter, currentZoom, { animate: false });
    }
  }

  /**
   * Get the map instance
   * @returns {Object} The Leaflet map instance
   */
  getMap() {
    return this.map;
  }

  /**
   * Get a hiker marker by ID
   * @param {string|number} hikerId - The ID of the hiker
   * @returns {Object|null} The Leaflet marker or null if not found
   */
  getHikerMarker(hikerId) {
    return this.hikerMarkers?.[hikerId] || null;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapComponent); 

/***/ }),

/***/ "./src/components/Modal/Hiker/HikerModal.js":
/*!**************************************************!*\
  !*** ./src/components/Modal/Hiker/HikerModal.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index.js */ "./src/utils/index.js");
/**
 * Modal Component - Handles the hiker detail modal
 */


class ModalComponent {
  /**
   * Initialize the Modal component
   * @param {string} modalId - The ID of the modal element
   */
  constructor(modalId = 'hiker-modal') {
    this.modalId = modalId;
    this.nameId = 'modal-name';
    this.statusId = 'modal-status';
    this.batteryId = 'modal-battery';
    this.batteryFillId = 'modal-battery-fill';
    this.lastUpdateId = 'modal-lastupdate';
    this.coordsId = 'modal-coords';
    this.trackBtnId = 'track-hiker';
    this.sendMessageBtnId = 'send-message';
    this.closeBtnClass = 'close-btn';
    
    // SOS related elements
    this.sosStatusContainerId = 'sos-status-container';
    this.sosHandledStatusId = 'sos-handled-status';
    this.sosActionsId = 'sos-actions';
    this.markSosHandledBtnId = 'mark-sos-handled';
    this.markSosEmergencyBtnId = 'mark-sos-emergency';
    this.resetSosBtnId = 'reset-sos';
    
    this.activeHikerId = null;
    this.activeHiker = null;
    this.originalNodeName = ''; // Store original name to detect changes
  }

  /**
   * Initialize the modal
   * @param {Function} onTrackHiker - Callback for track hiker button
   * @param {Function} onSendMessage - Callback for send message button
   * @param {Function} onMarkSosHandled - Callback for mark SOS handled button
   * @param {Function} onMarkSosEmergency - Callback for emergency services button
   * @param {Function} onResetSos - Callback for reset SOS button
   */
  init(onTrackHiker, onSendMessage, onMarkSosHandled, onMarkSosEmergency, onResetSos) {
    // Set up close button
    document.querySelector(`#${this.modalId} .${this.closeBtnClass}`)?.addEventListener('click', () => {
      this.closeModal();
    });
    
    // Set up track button
    document.getElementById(this.trackBtnId)?.addEventListener('click', () => {
      if (onTrackHiker && this.activeHikerId !== null) {
        onTrackHiker(this.activeHikerId);
        this.closeModal();
      }
    });
    
    // Set up send message button
    document.getElementById(this.sendMessageBtnId)?.addEventListener('click', () => {
      if (onSendMessage && this.activeHikerId !== null) {
        onSendMessage(this.activeHikerId);
      }
    });
    
    // Set up SOS handling buttons
    document.getElementById(this.markSosHandledBtnId)?.addEventListener('click', () => {
      if (onMarkSosHandled && this.activeHiker && this.activeHiker.sos && !this.activeHiker.sosHandled) {
        onMarkSosHandled(this.activeHikerId);
        this.updateSosStatus(this.activeHiker);
      }
    });
    
    document.getElementById(this.markSosEmergencyBtnId)?.addEventListener('click', () => {
      if (onMarkSosEmergency && this.activeHiker && this.activeHiker.sos && !this.activeHiker.sosEmergencyDispatched) {
        onMarkSosEmergency(this.activeHikerId);
        this.updateSosStatus(this.activeHiker);
      }
    });
    
    // Set up Reset SOS button
    document.getElementById(this.resetSosBtnId)?.addEventListener('click', () => {
      if (onResetSos && this.activeHiker && this.activeHiker.sos) {
        console.log('Reset SOS button clicked for hiker:', this.activeHikerId);
        onResetSos(this.activeHikerId);
        // Don't call updateSosStatus here as it may not be updated yet
        // The UI will be updated through the real-time listener
      }
    });
    
    // Set up editable name handling
    this.setupEditableName();
    
    // Add "Live" indicator
    this.addUpdateIndicator();
    
    return this;
  }
  
  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {boolean} isError - Whether this is an error notification
   */
  showToast(message, isError = false) {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast${isError ? ' error' : ''}`;
    toast.innerHTML = `
      <i class="fas fa-${isError ? 'exclamation-circle' : 'check-circle'}"></i>
      <span>${message}</span>
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Remove after animation completes
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
  
  /**
   * Update node name in Firebase
   * @param {string} newName - The new name for the node
   */
  async updateNodeName(newName) {
    if (!this.activeHikerId) return;
    
    try {
      console.log(`Updating node ${this.activeHikerId} name to: ${newName}`);
      const success = await (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.updateNodeName)(this.activeHikerId, newName);
      
      if (success) {
        console.log(`Node name updated to: ${newName}`);
        this.showToast(`Node name updated to: ${newName}`);
        // UI will update through real-time listener
      } else {
        console.error('Failed to update node name');
        this.showToast('Failed to update the node name', true);
        
        // Revert to original name in UI
        const nameElement = document.getElementById(this.nameId);
        if (nameElement) {
          nameElement.textContent = this.originalNodeName;
        }
      }
    } catch (error) {
      console.error('Error updating node name:', error);
      this.showToast('Error updating node name', true);
      
      // Revert to original name in UI
      const nameElement = document.getElementById(this.nameId);
      if (nameElement) {
        nameElement.textContent = this.originalNodeName;
      }
    }
  }

  /**
   * Add a live update indicator to the modal header
   */
  addUpdateIndicator() {
    const header = document.querySelector(`#${this.modalId} .modal-header h3`);
    if (header && !header.querySelector('.update-indicator')) {
      const indicator = document.createElement('div');
      indicator.classList.add('update-indicator');
      indicator.innerHTML = '<div class="update-pulse"></div>Live';
      header.appendChild(indicator);
    }
  }

  /**
   * Open the modal for a specific hiker
   * @param {Object} hiker - The hiker object
   */
  openModal(hiker) {
    this.activeHikerId = hiker.id;
    this.activeHiker = hiker;
    this.updateModalContent(hiker);
    const modal = document.getElementById(this.modalId);
    modal.classList.add('active');
  }

  /**
   * Close the modal
   */
  closeModal() {
    const modal = document.getElementById(this.modalId);
    modal.classList.remove('active');
    this.activeHikerId = null;
    this.activeHiker = null;
  }

  /**
   * Update SOS status display in the modal
   * @param {Object} hiker - The hiker object
   */
  updateSosStatus(hiker) {
    const sosStatusContainer = document.getElementById(this.sosStatusContainerId);
    const sosActions = document.getElementById(this.sosActionsId);
    const sosHandledStatus = document.getElementById(this.sosHandledStatusId);
    const markSosHandledBtn = document.getElementById(this.markSosHandledBtnId);
    const markSosEmergencyBtn = document.getElementById(this.markSosEmergencyBtnId);
    const resetSosBtn = document.getElementById(this.resetSosBtnId);
    
    // Ensure all elements exist before proceeding
    if (!sosStatusContainer || !sosActions) {
      console.warn('SOS container elements not found in the modal');
      return;
    }
    
    if (!hiker.sos) {
      // Hide SOS elements if no SOS
      sosStatusContainer.style.display = 'none';
      sosActions.style.display = 'none';
      return;
    }
    
    // Show SOS elements
    sosStatusContainer.style.display = 'flex';
    sosActions.style.display = 'flex';
    
    // Update status text if element exists
    if (sosHandledStatus) {
      const statusText = hiker.getSosStatusText ? hiker.getSosStatusText() : 'SOS Active';
      sosHandledStatus.textContent = statusText;
      
      // Update status classes
      if (hiker.sosHandled || hiker.sosEmergencyDispatched) {
        sosHandledStatus.classList.add('handled');
        sosHandledStatus.classList.remove('pending');
      } else {
        sosHandledStatus.classList.remove('handled');
        sosHandledStatus.classList.add('pending');
      }
    }
    
    // Update icon if it exists
    const statusIcon = sosStatusContainer.querySelector('.detail-icon');
    if (statusIcon) {
      if (hiker.sosHandled || hiker.sosEmergencyDispatched) {
        statusIcon.classList.add('handled');
      } else {
        statusIcon.classList.remove('handled');
      }
    }
    
    // Update button states if buttons exist
    if (markSosHandledBtn) {
      if (hiker.sosHandled) {
        markSosHandledBtn.classList.add('disabled');
        markSosHandledBtn.disabled = true;
      } else {
        markSosHandledBtn.classList.remove('disabled');
        markSosHandledBtn.disabled = false;
      }
    }
    
    if (markSosEmergencyBtn) {
      if (hiker.sosEmergencyDispatched) {
        markSosEmergencyBtn.classList.add('disabled');
        markSosEmergencyBtn.disabled = true;
      } else {
        markSosEmergencyBtn.classList.remove('disabled');
        markSosEmergencyBtn.disabled = false;
      }
    }
    
    // Enable reset button as long as SOS is active
    if (resetSosBtn) {
      resetSosBtn.classList.remove('disabled');
      resetSosBtn.disabled = false;
    }
  }

  /**
   * Update the modal content with hiker data
   * @param {Object} hiker - The hiker object
   */
  updateModalContent(hiker) {
    // Store reference to active hiker
    this.activeHiker = hiker;
    
    console.log(`Updating modal for hiker ${hiker.id} with coordinates:`, {
      lat: hiker.lat,
      lon: hiker.lon,
      timestamp: new Date(hiker.lastUpdate).toLocaleTimeString()
    });
    
    // Store current values to check for changes
    const element = document.getElementById(this.statusId);
    const prevStatus = element ? element.textContent : '';
    
    const batteryElement = document.getElementById(this.batteryId);
    const prevBattery = batteryElement ? batteryElement.textContent : '';
    
    const coordsElement = document.getElementById(this.coordsId);
    const prevCoords = coordsElement ? coordsElement.textContent : '';
    
    const nameElement = document.getElementById(this.nameId);
    const prevName = nameElement ? nameElement.textContent : '';
    
    // Update all content
    document.getElementById(this.nameId).textContent = hiker.name;
    document.getElementById(this.statusId).textContent = hiker.status;
    document.getElementById(this.batteryId).textContent = `${Math.round(hiker.battery)}%`;
    
    const batteryFill = document.getElementById(this.batteryFillId);
    if (batteryFill) {
      batteryFill.style.width = `${hiker.battery}%`;
      batteryFill.style.backgroundColor = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.getBatteryColor)(hiker.battery);
    }
    
    document.getElementById(this.lastUpdateId).textContent = new Date(hiker.lastUpdate).toLocaleTimeString();
    
    // Format and update coordinates
    const formattedCoords = `${hiker.lat.toFixed(5)}, ${hiker.lon.toFixed(5)}`;
    document.getElementById(this.coordsId).textContent = formattedCoords;
    
    // Update SOS status and actions
    this.updateSosStatus(hiker);
    
    // Flash updates for all values regardless of changes
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate)(this.nameId);
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate)(this.statusId);
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate)(this.batteryId);
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate)(this.coordsId);
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate)(this.lastUpdateId);
    
    // Also update battery fill visual indication
    if (batteryFill) {
      batteryFill.classList.add('updating');
      setTimeout(() => {
        batteryFill.classList.remove('updating');
      }, 500);
    }
  }

  /**
   * Check if the modal is currently open for a specific hiker
   * @param {string|number} hikerId - The ID of the hiker
   * @returns {boolean} True if modal is open for the specified hiker
   */
  isOpenForHiker(hikerId) {
    return this.activeHikerId === hikerId && 
           document.getElementById(this.modalId).classList.contains('active');
  }

  /**
   * Set up editable name handling
   */
  setupEditableName() {
    const nameElement = document.getElementById(this.nameId);
    if (!nameElement) return;
    
    // Store original value when starting edit
    nameElement.addEventListener('focus', () => {
      this.originalNodeName = nameElement.textContent.trim();
      console.log('Started editing node name, original:', this.originalNodeName);
    });
    
    // Handle edit completion
    nameElement.addEventListener('blur', () => {
      const newName = nameElement.textContent.trim();
      
      // Prevent empty names
      if (!newName) {
        nameElement.textContent = this.originalNodeName;
        return;
      }
      
      // Only update if name changed
      if (newName !== this.originalNodeName) {
        this.updateNodeName(newName);
      }
    });
    
    // Handle enter key to confirm edit
    nameElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        nameElement.blur(); // Trigger blur event to save
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalComponent); 

/***/ }),

/***/ "./src/components/Modal/Tower/TowerModal.js":
/*!**************************************************!*\
  !*** ./src/components/Modal/Tower/TowerModal.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index.js */ "./src/utils/index.js");
/**
 * Tower Modal Component - Handles the tower/basecamp detail modal
 */


class TowerModalComponent {
  /**
   * Initialize the Tower Modal component
   * @param {string} modalId - The ID of the modal element
   */
  constructor(modalId = 'tower-modal') {
    this.modalId = modalId;
    this.nameId = 'tower-modal-name';
    this.typeId = 'tower-modal-type';
    this.statusId = 'tower-modal-status';
    this.signalStrengthId = 'tower-modal-signal';
    this.signalBarId = 'tower-modal-signal-bar';
    this.lastUpdateId = 'tower-modal-lastupdate';
    this.coordsId = 'tower-modal-coords';
    this.connectHikersBtnId = 'connect-hikers';
    this.viewCoverageBtnId = 'view-coverage';
    this.closeBtnClass = 'close-btn';
    
    this.activeTowerId = null;
    this.activeTower = null;
    this.originalNodeName = ''; // Store original name to detect changes
    this.originalCoverageRadius = 0; // Store original coverage radius to detect changes
  }

  /**
   * Initialize the modal
   * @param {Function} onConnectHikers - Callback for connect hikers button
   * @param {Function} onViewCoverage - Callback for view coverage button
   */
  init(onConnectHikers, onViewCoverage) {
    // Set up close button
    document.querySelector(`#${this.modalId} .${this.closeBtnClass}`)?.addEventListener('click', () => {
      this.closeModal();
    });
    
    // Set up connect hikers button
    document.getElementById(this.connectHikersBtnId)?.addEventListener('click', () => {
      if (onConnectHikers && this.activeTowerId !== null) {
        onConnectHikers(this.activeTowerId);
        this.closeModal();
      }
    });
    
    // Set up view coverage button
    document.getElementById(this.viewCoverageBtnId)?.addEventListener('click', () => {
      if (onViewCoverage && this.activeTowerId !== null) {
        onViewCoverage(this.activeTowerId);
      }
    });
    
    // Set up editable name handling
    this.setupEditableName();
    
    // Set up editable coverage radius handling
    this.setupEditableCoverage();
    
    // Add "Live" indicator
    this.addUpdateIndicator();
    
    return this;
  }
  
  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {boolean} isError - Whether this is an error notification
   */
  showToast(message, isError = false) {
    // Remove any existing toasts
    const existingToast = document.querySelector('.tower-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `tower-toast${isError ? ' error' : ''}`;
    toast.innerHTML = `
      <i class="fas fa-${isError ? 'exclamation-circle' : 'check-circle'}"></i>
      <span>${message}</span>
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Remove after animation completes
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
  
  /**
   * Update node name in Firebase
   * @param {string} newName - The new name for the node
   */
  async updateNodeName(newName) {
    if (!this.activeTowerId) return;
    
    try {
      console.log(`Updating tower node ${this.activeTowerId} name to: ${newName}`);
      const success = await (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.updateNodeName)(this.activeTowerId, newName);
      
      if (success) {
        console.log(`Tower node name updated to: ${newName}`);
        this.showToast(`Tower name updated to: ${newName}`);
        // UI will update through real-time listener
      } else {
        console.error('Failed to update tower node name');
        this.showToast('Failed to update the tower name', true);
        
        // Revert to original name in UI
        const nameElement = document.getElementById(this.nameId);
        if (nameElement) {
          nameElement.textContent = this.originalNodeName;
        }
      }
    } catch (error) {
      console.error('Error updating tower node name:', error);
      this.showToast('Error updating tower name', true);
      
      // Revert to original name in UI
      const nameElement = document.getElementById(this.nameId);
      if (nameElement) {
        nameElement.textContent = this.originalNodeName;
      }
    }
  }

  // Removed getCoverageColor method since we're not using visual indicators

  /**
   * Add a live update indicator to the modal header
   */
  addUpdateIndicator() {
    const header = document.querySelector(`#${this.modalId} .modal-header h3`);
    if (header && !header.querySelector('.update-indicator')) {
      const indicator = document.createElement('div');
      indicator.classList.add('update-indicator');
      indicator.innerHTML = '<div class="update-pulse"></div>Live';
      header.appendChild(indicator);
    }
  }

  /**
   * Open the modal for a specific tower/basecamp
   * @param {Object} tower - The tower/basecamp object
   */
  openModal(tower) {
    this.activeTowerId = tower.id;
    this.activeTower = tower;
    this.updateModalContent(tower);
    const modal = document.getElementById(this.modalId);
    modal.classList.add('active');
  }

  /**
   * Close the modal
   */
  closeModal() {
    const modal = document.getElementById(this.modalId);
    modal.classList.remove('active');
    this.activeTowerId = null;
    this.activeTower = null;
  }

  /**
   * Update the modal content with tower/basecamp data
   * @param {Object} tower - The tower/basecamp object
   */
  updateModalContent(tower) {
    // Store reference to active tower
    this.activeTower = tower;
    
    console.log(`Updating tower modal for ${tower.type} ${tower.id} with coordinates:`, {
      lat: tower.lat,
      lon: tower.lon,
      timestamp: new Date(tower.lastUpdate).toLocaleTimeString()
    });
    
    // Update header icon based on tower type
    const headerIcon = document.querySelector(`#${this.modalId} .modal-header h3 i[data-lucide]`);
    if (headerIcon) {
      const iconName = tower.type === 'Tower' ? 'radio-tower' : 'house-wifi';
      headerIcon.setAttribute('data-lucide', iconName);
      // Refresh this specific icon
      if (typeof lucide !== 'undefined') {
        lucide.createIcons([headerIcon]);
      }
    }
    
    // Update all content
    document.getElementById(this.nameId).textContent = tower.name || `${tower.type} ${tower.id}`;
    document.getElementById(this.typeId).textContent = tower.type || 'Tower';
    document.getElementById(this.statusId).textContent = tower.status || 'Active';
    
    // Update coverage radius - display only the value in meters
    const coverageRadius = tower.coverageRadius || tower.signalStrength || 500; // Backward compatibility
    this.originalCoverageRadius = coverageRadius; // Store for editing
    document.getElementById(this.signalStrengthId).textContent = `${coverageRadius}m`;
    
    // Hide the visual bar since we're not showing percentages
    const signalBar = document.getElementById(this.signalBarId);
    if (signalBar) {
      signalBar.style.display = 'none';
    }
    
    document.getElementById(this.lastUpdateId).textContent = new Date(tower.lastUpdate || Date.now()).toLocaleTimeString();
    
    // Format and update coordinates
    const formattedCoords = `${tower.lat.toFixed(5)}, ${tower.lon.toFixed(5)}`;
    document.getElementById(this.coordsId).textContent = formattedCoords;
    
    
    // Flash updates for all values
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate)(this.nameId);
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate)(this.typeId);
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate)(this.statusId);
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate)(this.signalStrengthId);
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate)(this.coordsId);
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate)(this.lastUpdateId);
  }

  /**
   * Check if the modal is currently open for a specific tower
   * @param {string|number} towerId - The ID of the tower
   * @returns {boolean} True if modal is open for the specified tower
   */
  isOpenForTower(towerId) {
    return this.activeTowerId === towerId && 
           document.getElementById(this.modalId).classList.contains('active');
  }

  /**
   * Set up editable name handling
   */
  setupEditableName() {
    const nameElement = document.getElementById(this.nameId);
    if (!nameElement) return;
    
    // Store original value when starting edit
    nameElement.addEventListener('focus', () => {
      this.originalNodeName = nameElement.textContent.trim();
      console.log('Started editing tower node name, original:', this.originalNodeName);
    });
    
    // Handle edit completion
    nameElement.addEventListener('blur', () => {
      const newName = nameElement.textContent.trim();
      
      // Prevent empty names
      if (!newName) {
        nameElement.textContent = this.originalNodeName;
        return;
      }
      
      // Only update if name changed
      if (newName !== this.originalNodeName) {
        this.updateNodeName(newName);
      }
    });
    
    // Handle enter key to confirm edit
    nameElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        nameElement.blur(); // Trigger blur event to save
      }
    });
  }

  /**
   * Set up editable coverage radius handling
   */
  setupEditableCoverage() {
    const coverageElement = document.getElementById(this.signalStrengthId);
    if (!coverageElement) return;
    
    // Store original value when starting edit
    coverageElement.addEventListener('focus', () => {
      this.originalCoverageRadius = parseInt(coverageElement.textContent.replace('m', '')) || 500;
      console.log('Started editing coverage radius, original:', this.originalCoverageRadius);
    });
    
    // Handle edit completion
    coverageElement.addEventListener('blur', () => {
      const newCoverageText = coverageElement.textContent.trim().replace('m', '');
      const newCoverage = parseInt(newCoverageText);
      
      // Validate coverage radius (must be a positive number)
      if (!newCoverage || newCoverage <= 0 || isNaN(newCoverage)) {
        coverageElement.textContent = `${this.originalCoverageRadius}m`;
        this.showToast('Coverage radius must be a positive number', true);
        return;
      }
      
      // Ensure it shows 'm' suffix
      coverageElement.textContent = `${newCoverage}m`;
      
      // Only update if coverage changed
      if (newCoverage !== this.originalCoverageRadius) {
        this.updateCoverageRadius(newCoverage);
      }
    });
    
    // Handle enter key to confirm edit
    coverageElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        coverageElement.blur(); // Trigger blur event to save
      }
      
      // Only allow numbers and backspace/delete
      if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        e.preventDefault();
      }
    });
  }

  /**
   * Update coverage radius in the tower data
   * @param {number} newRadius - The new coverage radius in meters
   */
  async updateCoverageRadius(newRadius) {
    if (!this.activeTowerId || !this.activeTower) return;
    
    try {
      console.log(`Updating tower ${this.activeTowerId} coverage radius to: ${newRadius}m`);
      
      // Update the local tower object
      this.activeTower.coverageRadius = newRadius;
      this.activeTower.coverageRange = newRadius; // Backward compatibility
      this.activeTower.lastUpdate = Date.now();
      
      this.showToast(`Coverage radius updated to: ${newRadius}m`);
      console.log(`Tower coverage radius updated to: ${newRadius}m`);
      
      // Note: In a real application, you might want to save this to a database
      // For now, it's just stored in the local object
      
    } catch (error) {
      console.error('Error updating coverage radius:', error);
      this.showToast('Error updating coverage radius', true);
      
      // Revert to original value in UI
      const coverageElement = document.getElementById(this.signalStrengthId);
      if (coverageElement) {
        coverageElement.textContent = `${this.originalCoverageRadius}m`;
      }
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TowerModalComponent); 

/***/ }),

/***/ "./src/components/Settings/Settings.js":
/*!*********************************************!*\
  !*** ./src/components/Settings/Settings.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Settings Component - Handles application settings and preferences
 */
class SettingsComponent {
  /**
   * Initialize the Settings component
   * @param {string} modalId - The ID of the settings modal element
   * @param {string} settingsBtnId - The ID of the settings button element
   */
  constructor(modalId = 'settings-modal', settingsBtnId = 'settings-btn') {
    this.modalId = modalId;
    this.settingsBtnId = settingsBtnId;
    this.closeBtnId = 'close-settings';
    this.saveBtnId = 'save-settings';
    this.resetBtnId = 'reset-settings';
    
    // Default settings
    this.defaultSettings = {
      map: {
        style: 'default',
        defaultZoom: 12
      },
      simulation: {
        enabled: false,
        speed: 3000,
        hikersCount: 10,
        autoSos: true
      },
      notifications: {
        sosAlerts: true,
        batteryAlerts: true,
        batteryThreshold: 20,
        trackDeviationAlerts: true,
        trackDeviationThreshold: 50
      },
      dataSource: {
        useFirebase: true
      },
      safety: {
        enableTrackSafety: true,
        defaultTrackWidth: 50,
        highlightUnsafeHikers: true
      }
    };
    
    // Current settings (initialize with defaults)
    this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
    
    // Load saved settings if available
    this.loadSavedSettings();
  }

  /**
   * Initialize the settings component
   * @param {Object} callbacks - Callback functions for settings changes
   * @param {Function} callbacks.onMapStyleChange - Called when map style changes
   * @param {Function} callbacks.onZoomChange - Called when default zoom changes
   * @param {Function} callbacks.onSimulationSpeedChange - Called when simulation speed changes
   * @param {Function} callbacks.onHikersCountChange - Called when hikers count changes
   * @param {Function} callbacks.onSimulationToggle - Called when simulation is toggled on/off
   */
  init(callbacks = {}) {
    try {
      this.callbacks = callbacks || {};
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Initialize UI with current settings
      setTimeout(() => {
        try {
          this.updateUI();
        } catch (error) {
          console.warn('Error updating UI after initialization:', error);
        }
      }, 0);
      
      return this;
    } catch (error) {
      console.error('Error initializing settings component:', error);
      return this;
    }
  }

  /**
   * Setup event listeners for settings controls
   */
  setupEventListeners() {
    try {
      // Settings button click (open modal)
      document.getElementById(this.settingsBtnId)?.addEventListener('click', () => {
        this.openSettingsModal();
      });
      
      // Close button click
      document.getElementById(this.closeBtnId)?.addEventListener('click', () => {
        this.closeSettingsModal();
      });
      
      // Save button click
      document.getElementById(this.saveBtnId)?.addEventListener('click', () => {
        this.saveSettings();
        this.closeSettingsModal();
      });
      
      // Reset button click
      document.getElementById(this.resetBtnId)?.addEventListener('click', () => {
        this.resetSettings();
      });
      
      // Map style change
      document.getElementById('map-style')?.addEventListener('change', (e) => {
        const newStyle = e.target.value;
        this.settings.map.style = newStyle;
        if (this.callbacks?.onMapStyleChange) {
          this.callbacks.onMapStyleChange(newStyle);
        }
      });
      
      // Default zoom change
      document.getElementById('default-zoom')?.addEventListener('input', (e) => {
        const zoomValue = parseInt(e.target.value);
        const zoomElement = document.getElementById('zoom-value');
        if (zoomElement) {
          zoomElement.textContent = zoomValue;
        }
        this.settings.map.defaultZoom = zoomValue;
        if (this.callbacks?.onZoomChange) {
          this.callbacks.onZoomChange(zoomValue);
        }
      });
      
      // Simulation toggle
      document.getElementById('enable-simulation')?.addEventListener('change', (e) => {
        const isEnabled = e.target.checked;
        this.settings.simulation.enabled = isEnabled;
        
        // Show/hide simulation settings based on toggle state
        const simulationSettings = document.getElementById('simulation-settings');
        if (simulationSettings) {
          simulationSettings.style.display = isEnabled ? 'block' : 'none';
        }
        
        if (this.callbacks?.onSimulationToggle) {
          this.callbacks.onSimulationToggle(isEnabled);
        }
      });
      
      // Simulation speed change
      document.getElementById('simulation-speed')?.addEventListener('input', (e) => {
        const speedValue = parseInt(e.target.value);
        const speedElement = document.getElementById('speed-value');
        if (speedElement) {
          speedElement.textContent = `${speedValue}ms`;
        }
        this.settings.simulation.speed = speedValue;
        if (this.callbacks?.onSimulationSpeedChange) {
          this.callbacks.onSimulationSpeedChange(speedValue);
        }
      });
      
      // Hikers count change
      document.getElementById('hikers-count')?.addEventListener('input', (e) => {
        const countValue = parseInt(e.target.value);
        const countElement = document.getElementById('hikers-count-value');
        if (countElement) {
          countElement.textContent = countValue;
        }
        this.settings.simulation.hikersCount = countValue;
        if (this.callbacks?.onHikersCountChange) {
          this.callbacks.onHikersCountChange(countValue);
        }
      });
      
      // Auto SOS toggle
      document.getElementById('auto-sos')?.addEventListener('change', (e) => {
        this.settings.simulation.autoSos = e.target.checked;
        if (this.callbacks?.onAutoSosChange) {
          this.callbacks.onAutoSosChange(e.target.checked);
        }
      });
      
      // SOS alerts toggle
      document.getElementById('sos-alerts')?.addEventListener('change', (e) => {
        this.settings.notifications.sosAlerts = e.target.checked;
        if (this.callbacks?.onSosAlertsChange) {
          this.callbacks.onSosAlertsChange(e.target.checked);
        }
      });
      
      // Battery alerts toggle
      document.getElementById('battery-alerts')?.addEventListener('change', (e) => {
        this.settings.notifications.batteryAlerts = e.target.checked;
        if (this.callbacks?.onBatteryAlertsChange) {
          this.callbacks.onBatteryAlertsChange(e.target.checked);
        }
      });
      
      // Battery threshold change
      document.getElementById('battery-threshold')?.addEventListener('input', (e) => {
        const thresholdValue = parseInt(e.target.value);
        const thresholdElement = document.getElementById('battery-threshold-value');
        if (thresholdElement) {
          thresholdElement.textContent = `${thresholdValue}%`;
        }
        this.settings.notifications.batteryThreshold = thresholdValue;
        if (this.callbacks?.onBatteryThresholdChange) {
          this.callbacks.onBatteryThresholdChange(thresholdValue);
        }
      });
      
      // Track deviation notifications
      document.getElementById('track-deviation-alerts')?.addEventListener('change', (e) => {
        this.settings.notifications.trackDeviationAlerts = e.target.checked;
        if (this.callbacks?.onTrackDeviationAlertsChange) {
          this.callbacks.onTrackDeviationAlertsChange(e.target.checked);
        }
      });
      
      // Track deviation threshold change
      document.getElementById('track-deviation-threshold')?.addEventListener('input', (e) => {
        const thresholdValue = parseInt(e.target.value);
        const thresholdElement = document.getElementById('track-deviation-threshold-value');
        if (thresholdElement) {
          thresholdElement.textContent = `${thresholdValue}m`;
        }
        this.settings.notifications.trackDeviationThreshold = thresholdValue;
        if (this.callbacks?.onTrackDeviationThresholdChange) {
          this.callbacks.onTrackDeviationThresholdChange(thresholdValue);
        }
      });
      
      // Safety settings
      document.getElementById('enable-track-safety')?.addEventListener('change', (e) => {
        this.settings.safety.enableTrackSafety = e.target.checked;
        if (this.callbacks?.onTrackSafetyChange) {
          this.callbacks.onTrackSafetyChange(e.target.checked);
        }
      });
      
      document.getElementById('highlight-unsafe-hikers')?.addEventListener('change', (e) => {
        this.settings.safety.highlightUnsafeHikers = e.target.checked;
        if (this.callbacks?.onHighlightUnsafeHikersChange) {
          this.callbacks.onHighlightUnsafeHikersChange(e.target.checked);
        }
      });
      
      // Firebase data source toggle
      document.getElementById('use-firebase')?.addEventListener('change', (e) => {
        if (!this.settings.dataSource) {
          this.settings.dataSource = {};
        }
        this.settings.dataSource.useFirebase = e.target.checked;
        if (this.callbacks?.onDataSourceChange) {
          this.callbacks.onDataSourceChange(e.target.checked);
        }
      });
    } catch (error) {
      console.warn('Error setting up event listeners:', error);
    }
  }

  /**
   * Open the settings modal
   */
  openSettingsModal() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.classList.add('active');
      this.updateUI();
    }
  }

  /**
   * Close the settings modal
   */
  closeSettingsModal() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  }

  /**
   * Update the UI with current settings values
   */
  updateUI() {
    try {
      // Map settings
      const mapStyleElement = document.getElementById('map-style');
      if (mapStyleElement) {
        mapStyleElement.value = this.settings.map.style;
      }
      
      const zoomSlider = document.getElementById('default-zoom');
      if (zoomSlider) {
        zoomSlider.value = this.settings.map.defaultZoom;
        const zoomValue = document.getElementById('zoom-value');
        if (zoomValue) {
          zoomValue.textContent = this.settings.map.defaultZoom;
        }
      }
      
      // Simulation toggle
      const simulationToggle = document.getElementById('enable-simulation');
      if (simulationToggle) {
        simulationToggle.checked = this.settings.simulation.enabled;
        
        // Show/hide simulation settings based on toggle state
        const simulationSettings = document.getElementById('simulation-settings');
        if (simulationSettings) {
          simulationSettings.style.display = this.settings.simulation.enabled ? 'block' : 'none';
        }
      }
      
      // Simulation settings
      const speedSlider = document.getElementById('simulation-speed');
      if (speedSlider) {
        speedSlider.value = this.settings.simulation.speed;
        const speedValue = document.getElementById('speed-value');
        if (speedValue) {
          speedValue.textContent = `${this.settings.simulation.speed}ms`;
        }
      }
      
      const hikersCountSlider = document.getElementById('hikers-count');
      if (hikersCountSlider) {
        hikersCountSlider.value = this.settings.simulation.hikersCount;
        const hikersCountValue = document.getElementById('hikers-count-value');
        if (hikersCountValue) {
          hikersCountValue.textContent = this.settings.simulation.hikersCount;
        }
      }
      
      const autoSosToggle = document.getElementById('auto-sos');
      if (autoSosToggle) {
        autoSosToggle.checked = this.settings.simulation.autoSos;
      }
      
      // Notification settings
      const sosAlertsToggle = document.getElementById('sos-alerts');
      if (sosAlertsToggle) {
        sosAlertsToggle.checked = this.settings.notifications.sosAlerts;
      }
      
      const batteryAlertsToggle = document.getElementById('battery-alerts');
      if (batteryAlertsToggle) {
        batteryAlertsToggle.checked = this.settings.notifications.batteryAlerts;
      }
      
      const batteryThresholdSlider = document.getElementById('battery-threshold');
      if (batteryThresholdSlider) {
        batteryThresholdSlider.value = this.settings.notifications.batteryThreshold;
        const batteryThresholdValue = document.getElementById('battery-threshold-value');
        if (batteryThresholdValue) {
          batteryThresholdValue.textContent = `${this.settings.notifications.batteryThreshold}%`;
        }
      }
      
      // Track deviation notifications
      const trackDeviationAlertsToggle = document.getElementById('track-deviation-alerts');
      if (trackDeviationAlertsToggle) {
        trackDeviationAlertsToggle.checked = this.settings.notifications.trackDeviationAlerts;
      }
      
      const trackDeviationThresholdSlider = document.getElementById('track-deviation-threshold');
      if (trackDeviationThresholdSlider) {
        trackDeviationThresholdSlider.value = this.settings.notifications.trackDeviationThreshold;
        const trackDeviationThresholdValue = document.getElementById('track-deviation-threshold-value');
        if (trackDeviationThresholdValue) {
          trackDeviationThresholdValue.textContent = `${this.settings.notifications.trackDeviationThreshold}m`;
        }
      }
      
      // Safety settings
      const trackSafetyToggle = document.getElementById('enable-track-safety');
      if (trackSafetyToggle) {
        trackSafetyToggle.checked = this.settings.safety.enableTrackSafety;
      }
      
      const highlightUnsafeHikersToggle = document.getElementById('highlight-unsafe-hikers');
      if (highlightUnsafeHikersToggle) {
        highlightUnsafeHikersToggle.checked = this.settings.safety.highlightUnsafeHikers;
      }
      
      // Data source settings
      const useFirebaseToggle = document.getElementById('use-firebase');
      if (useFirebaseToggle) {
        useFirebaseToggle.checked = this.settings.dataSource?.useFirebase ?? true;
      }
    } catch (error) {
      console.warn('Error updating UI with settings:', error);
    }
  }

  /**
   * Save the current settings to localStorage
   */
  saveSettings() {
    localStorage.setItem('hikerTrackerSettings', JSON.stringify(this.settings));
    
    // Notify of successful save
    this.showNotification('Settings saved successfully!');
    
    // Call the onSettingsChanged callback if provided
    if (this.callbacks.onSettingsChanged) {
      this.callbacks.onSettingsChanged(this.settings);
    }
  }

  /**
   * Load saved settings from localStorage
   */
  loadSavedSettings() {
    const savedSettings = localStorage.getItem('hikerTrackerSettings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    }
  }

  /**
   * Reset settings to default values
   */
  resetSettings() {
    this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
    this.updateUI();
    
    // Show notification
    this.showNotification('Settings reset to default values.');
    
    // Call the onSettingsChanged callback if provided
    if (this.callbacks.onSettingsChanged) {
      this.callbacks.onSettingsChanged(this.settings);
    }
  }

  /**
   * Show a notification message
   * @param {string} message - The message to display
   * @param {number} duration - Duration in milliseconds
   */
  showNotification(message, duration = 3000) {
    // Check if notification container exists, if not create it
    let notificationContainer = document.getElementById('settings-notification');
    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.id = 'settings-notification';
      notificationContainer.className = 'settings-notification';
      document.body.appendChild(notificationContainer);
      
      // Add notification styles if not already in the document
      if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
          .settings-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4299e1;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            z-index: 2000;
            font-size: 14px;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
          }
          .settings-notification.show {
            transform: translateY(0);
            opacity: 1;
          }
        `;
        document.head.appendChild(style);
      }
    }
    
    // Set the notification message
    notificationContainer.textContent = message;
    
    // Show the notification
    notificationContainer.classList.add('show');
    
    // Hide the notification after the specified duration
    setTimeout(() => {
      notificationContainer.classList.remove('show');
    }, duration);
  }

  /**
   * Get the current settings
   * @returns {Object} Current settings object
   */
  getSettings() {
    return this.settings;
  }

  /**
   * Open the settings modal (public method)
   */
  openModal() {
    try {
      this.openSettingsModal();
    } catch (error) {
      console.warn('Error opening settings modal from public method:', error);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsComponent); 

/***/ }),

/***/ "./src/components/Settings/SettingsComponent.js":
/*!******************************************************!*\
  !*** ./src/components/Settings/SettingsComponent.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class SettingsComponent {
  constructor() {
    this.modalId = 'settings-modal';
    this.settingsFormId = 'settings-form';
    this.closeButtonId = 'settings-close-btn';
    this.notificationsContainerId = 'notifications-container';

    // Default settings
    this.settings = {
      notifications: {
        sos: true,
        battery: true,
        batteryThreshold: 20,
        sosHandled: true,
        emergencyDispatched: true
      },
      map: {
        refreshRate: 5, // seconds
        defaultZoom: 15
      },
      simulation: {
        enabled: true,
        updateInterval: 3000 // ms
      }
    };
    
    // Load settings from localStorage if available
    this.loadSettings();
    
    // Create notifications container if it doesn't exist
    this.ensureNotificationsContainer();
  }

  init() {
    // Add event listeners for the settings modal
    const closeButton = document.getElementById(this.closeButtonId);
    if (closeButton) {
      closeButton.addEventListener('click', this.closeModal.bind(this));
    }

    const settingsForm = document.getElementById(this.settingsFormId);
    if (settingsForm) {
      settingsForm.addEventListener('submit', this.saveSettings.bind(this));
      
      // Set initial form values from current settings
      this.populateForm();
    }

    // Handle click outside modal to close
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }
  }

  openModal() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.classList.add('active');
      this.populateForm();
    }
  }

  closeModal() {
    const modal = document.getElementById(this.modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  }

  populateForm() {
    // Notifications settings
    const sosNotifications = document.getElementById('setting-sos-notifications');
    if (sosNotifications) sosNotifications.checked = this.settings.notifications.sos;
    
    const batteryNotifications = document.getElementById('setting-battery-notifications');
    if (batteryNotifications) batteryNotifications.checked = this.settings.notifications.battery;
    
    const batteryThreshold = document.getElementById('setting-battery-threshold');
    if (batteryThreshold) batteryThreshold.value = this.settings.notifications.batteryThreshold;
    
    const sosHandledNotifications = document.getElementById('setting-sos-handled-notifications');
    if (sosHandledNotifications) sosHandledNotifications.checked = this.settings.notifications.sosHandled;
    
    const emergencyNotifications = document.getElementById('setting-emergency-notifications');
    if (emergencyNotifications) emergencyNotifications.checked = this.settings.notifications.emergencyDispatched;
    
    // Map settings
    const mapRefresh = document.getElementById('setting-map-refresh');
    if (mapRefresh) mapRefresh.value = this.settings.map.refreshRate;
    
    const mapZoom = document.getElementById('setting-map-zoom');
    if (mapZoom) mapZoom.value = this.settings.map.defaultZoom;
    
    // Simulation settings
    const simulationEnabled = document.getElementById('setting-simulation-enabled');
    if (simulationEnabled) simulationEnabled.checked = this.settings.simulation.enabled;
    
    const simulationInterval = document.getElementById('setting-simulation-interval');
    if (simulationInterval) simulationInterval.value = this.settings.simulation.updateInterval / 1000; // Convert back to seconds for display
  }

  saveSettings(e) {
    e.preventDefault();
    
    // Notifications settings
    const sosNotifications = document.getElementById('setting-sos-notifications');
    this.settings.notifications.sos = sosNotifications ? sosNotifications.checked : false;
    
    const batteryNotifications = document.getElementById('setting-battery-notifications');
    this.settings.notifications.battery = batteryNotifications ? batteryNotifications.checked : false;
    
    const batteryThreshold = document.getElementById('setting-battery-threshold');
    this.settings.notifications.batteryThreshold = batteryThreshold ? parseInt(batteryThreshold.value) : 20;
    
    const sosHandledNotifications = document.getElementById('setting-sos-handled-notifications');
    this.settings.notifications.sosHandled = sosHandledNotifications ? sosHandledNotifications.checked : false;
    
    const emergencyNotifications = document.getElementById('setting-emergency-notifications');
    this.settings.notifications.emergencyDispatched = emergencyNotifications ? emergencyNotifications.checked : false;
    
    // Map settings
    const mapRefresh = document.getElementById('setting-map-refresh');
    this.settings.map.refreshRate = mapRefresh ? parseInt(mapRefresh.value) : 5;
    
    const mapZoom = document.getElementById('setting-map-zoom');
    this.settings.map.defaultZoom = mapZoom ? parseInt(mapZoom.value) : 15;
    
    // Simulation settings
    const simulationEnabled = document.getElementById('setting-simulation-enabled');
    this.settings.simulation.enabled = simulationEnabled ? simulationEnabled.checked : false;
    
    const simulationInterval = document.getElementById('setting-simulation-interval');
    this.settings.simulation.updateInterval = simulationInterval ? parseInt(simulationInterval.value) * 1000 : 3000; // Convert to milliseconds
    
    // Save settings to localStorage
    this.saveSettingsToStorage();
    
    // Show success notification
    this.showNotification('Settings saved successfully', 'success');
    
    // Close modal
    this.closeModal();
    
    // Return the updated settings
    return this.settings;
  }

  getSettings() {
    return this.settings;
  }

  loadSettings() {
    const savedSettings = localStorage.getItem('hikerTrackingSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        this.settings = this.mergeSettings(this.settings, parsedSettings);
      } catch (e) {
        console.error('Error loading settings from localStorage:', e);
      }
    }
  }

  saveSettingsToStorage() {
    try {
      localStorage.setItem('hikerTrackingSettings', JSON.stringify(this.settings));
    } catch (e) {
      console.error('Error saving settings to localStorage:', e);
    }
  }

  // Helper to merge saved settings with defaults (to handle new settings added)
  mergeSettings(defaults, saved) {
    const result = { ...defaults };
    
    for (const key in saved) {
      if (typeof saved[key] === 'object' && saved[key] !== null && key in defaults) {
        result[key] = this.mergeSettings(defaults[key], saved[key]);
      } else if (key in defaults) {
        result[key] = saved[key];
      }
    }
    
    return result;
  }

  ensureNotificationsContainer() {
    let container = document.getElementById(this.notificationsContainerId);
    
    if (!container) {
      container = document.createElement('div');
      container.id = this.notificationsContainerId;
      container.className = 'notifications-container';
      document.body.appendChild(container);
    }
    
    return container;
  }

  showNotification(message, type = 'info', duration = 5000, icon = null) {
    const container = this.ensureNotificationsContainer();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Determine appropriate icon if not specified
    if (!icon) {
      switch (type) {
        case 'success':
          icon = 'check-circle';
          break;
        case 'error':
          icon = 'exclamation-circle';
          break;
        case 'warning':
          icon = 'exclamation-triangle';
          break;
        case 'sos':
          icon = 'exclamation-triangle';
          break;
        case 'sosHandled':
          icon = 'check-circle';
          break;
        case 'emergency':
          icon = 'ambulance';
          break;
        default:
          icon = 'info-circle';
      }
    }
    
    // Create notification content
    notification.innerHTML = `
      <div class="notification-icon">
        <i class="fas fa-${icon}"></i>
      </div>
      <div class="notification-content">
        <div class="notification-message">${message}</div>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Add event listener for close button
    const closeButton = notification.querySelector('.notification-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.removeNotification(notification);
      });
    }
    
    // Show notification with animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Auto remove after duration
    if (duration) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, duration);
    }
    
    return notification;
  }

  removeNotification(notification) {
    // Add hide animation
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      notification.remove();
    }, 300);
  }

  // Check if notifications are enabled
  areNotificationsEnabled(type) {
    switch (type) {
      case 'sos':
        return this.settings.notifications.sos;
      case 'battery':
        return this.settings.notifications.battery;
      case 'sosHandled':
        return this.settings.notifications.sosHandled;
      case 'emergency':
        return this.settings.notifications.emergencyDispatched;
      default:
        return true;
    }
  }

  getBatteryThreshold() {
    return this.settings.notifications.batteryThreshold;
  }

  // Method to show SOS status notification
  showSosStatusNotification(hiker, statusType) {
    if (!this.areNotificationsEnabled(statusType)) {
      return null;
    }
    
    let message, type, icon, duration;
    
    switch (statusType) {
      case 'sos':
        message = `SOS Alert! ${hiker.name} has triggered an emergency signal`;
        type = 'sos';
        icon = 'exclamation-triangle';
        duration = 10000; // Longer duration for emergency
        break;
      case 'sosHandled':
        message = `SOS for ${hiker.name} has been marked as handled`;
        type = 'sosHandled';
        icon = 'check-circle';
        duration = 5000;
        break;
      case 'emergency':
        message = `Emergency services dispatched for ${hiker.name}`;
        type = 'emergency';
        icon = 'ambulance';
        duration = 7000;
        break;
      default:
        return null;
    }
    
    return this.showNotification(message, type, duration, icon);
  }

  // Method to show battery notification
  showBatteryNotification(hiker) {
    if (!this.areNotificationsEnabled('battery')) {
      return null;
    }
    
    if (hiker.battery <= this.getBatteryThreshold()) {
      const message = `Low Battery Alert! ${hiker.name}'s device is at ${hiker.battery}%`;
      return this.showNotification(message, 'warning', 5000, 'battery-quarter');
    }
    
    return null;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsComponent); 

/***/ }),

/***/ "./src/components/Settings/TrackSafetySettings.js":
/*!********************************************************!*\
  !*** ./src/components/Settings/TrackSafetySettings.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Track Safety Settings Component
 * Allows administrators to create, edit, and manage safety tracks
 */
class TrackSafetySettings {
  /**
   * Initialize the Track Safety Settings component
   * @param {Object} trackManager - Instance of TrackSafetyManager
   * @param {Object} map - Map instance for visualization
   */
  constructor(trackManager, map = null) {
    this.trackManager = trackManager;
    this.map = map;
    this.containerId = 'track-safety-settings';
    this.modalId = 'track-create-modal';
    this.isCreatingTrack = false;
    this.editingTrackId = null;
    
    // Initialize DOM references
    this.container = null;
    this.createBtn = null;
    this.tracksList = null;
    this.modal = null;
    
    // Bind methods to this instance
    this.startTrackCreation = this.startTrackCreation.bind(this);
    this.cancelTrackCreation = this.cancelTrackCreation.bind(this);
    this.saveTrack = this.saveTrack.bind(this);
    this.renderTracksList = this.renderTracksList.bind(this);
  }
  
  /**
   * Initialize the component
   */
  init() {
    // Create the track safety settings container if it doesn't exist
    this.createContainer();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Render the initial tracks list
    this.renderTracksList();
    
    return this;
  }
  
  /**
   * Create the container and modal elements
   */
  createContainer() {
    // Check if container already exists
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      // Create the container element
      this.container = document.createElement('div');
      this.container.id = this.containerId;
      this.container.className = 'settings-section';
      
      // Create the section header
      const header = document.createElement('h3');
      header.textContent = 'Safety Tracks Management';
      this.container.appendChild(header);
      
      // Create description
      const description = document.createElement('p');
      description.textContent = 'Create and manage hiking tracks with safety corridors to ensure hikers stay on safe paths.';
      this.container.appendChild(description);
      
      // Create the create button
      this.createBtn = document.createElement('button');
      this.createBtn.id = 'create-track-btn';
      this.createBtn.className = 'btn btn-primary';
      this.createBtn.textContent = 'Create New Track';
      this.container.appendChild(this.createBtn);
      
      // Create tracks list container
      this.tracksList = document.createElement('div');
      this.tracksList.id = 'tracks-list';
      this.tracksList.className = 'tracks-list';
      this.container.appendChild(this.tracksList);
      
      // Add to the settings modal - FIX: Use the correct container selector
      const settingsModalContent = document.getElementById('track-safety-settings-container');
      if (settingsModalContent) {
        settingsModalContent.appendChild(this.container);
      } else {
        // Fallback to main settings content if container not found
        const fallbackContainer = document.querySelector('#settings-modal .settings-modal-content .modal-body');
        if (fallbackContainer) {
          fallbackContainer.appendChild(this.container);
        } else {
          console.warn('Settings modal content not found');
        }
      }
    }
    
    // Create the track creation modal if it doesn't exist
    this.modal = document.getElementById(this.modalId);
    if (!this.modal) {
      this.modal = document.createElement('div');
      this.modal.id = this.modalId;
      this.modal.className = 'modal';
      
      this.modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3 id="track-modal-title">Create New Safety Track</h3>
            <span class="close" id="close-track-modal">&times;</span>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="track-name">Track Name:</label>
              <input type="text" id="track-name" placeholder="Enter track name">
            </div>
            <div class="form-group">
              <label for="track-description">Description:</label>
              <textarea id="track-description" placeholder="Describe this track (optional)"></textarea>
            </div>
            <div class="form-group">
              <label for="safety-width">Safety Corridor Width (meters):</label>
              <input type="range" id="safety-width" min="10" max="200" value="50">
              <span id="safety-width-value">50m</span>
            </div>
            <div id="creation-instructions" class="creation-instructions">
              <h4>Track Creation Instructions:</h4>
              <ol>
                <li>Click "Start Drawing" to begin creating the track</li>
                <li>Click on the map to add waypoints (minimum 2 points)</li>
                <li>The track will be visualized as you add points</li>
                <li>When finished, click "Save Track"</li>
              </ol>
            </div>
            <div id="track-status" class="track-status"></div>
          </div>
          <div class="modal-footer">
            <button id="start-drawing-btn" class="btn btn-primary">Start Drawing</button>
            <button id="cancel-drawing-btn" class="btn btn-secondary" style="display: none;">Cancel Drawing</button>
            <button id="save-track-btn" class="btn btn-success" disabled>Save Track</button>
            <button id="cancel-track-btn" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(this.modal);
    }
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Create track button
    this.createBtn?.addEventListener('click', () => {
      this.openTrackModal();
    });
    
    // Close modal button
    const closeModalBtn = document.getElementById('close-track-modal');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        this.closeTrackModal();
      });
    }
    
    // Cancel track creation button
    document.getElementById('cancel-track-btn')?.addEventListener('click', () => {
      this.closeTrackModal();
    });
    
    // Start drawing button
    document.getElementById('start-drawing-btn')?.addEventListener('click', () => {
      this.startTrackCreation();
    });
    
    // Cancel drawing button
    document.getElementById('cancel-drawing-btn')?.addEventListener('click', () => {
      this.cancelTrackCreation();
    });
    
    // Save track button
    document.getElementById('save-track-btn')?.addEventListener('click', () => {
      this.saveTrack();
    });
    
    // Safety width slider
    document.getElementById('safety-width')?.addEventListener('input', (e) => {
      const widthValue = parseInt(e.target.value);
      const widthDisplay = document.getElementById('safety-width-value');
      if (widthDisplay) {
        widthDisplay.textContent = `${widthValue}m`;
      }
    });
  }
  
  /**
   * Open the track creation modal
   */
  openTrackModal(trackId = null) {
    if (!this.modal) return;
    
    // Reset the form
    document.getElementById('track-name').value = '';
    document.getElementById('track-description').value = '';
    document.getElementById('safety-width').value = '50';
    document.getElementById('safety-width-value').textContent = '50m';
    
    // Reset track status
    const trackStatus = document.getElementById('track-status');
    trackStatus.textContent = '';
    trackStatus.className = 'track-status';
    
    // Show/hide appropriate buttons
    document.getElementById('start-drawing-btn').style.display = 'inline-block';
    document.getElementById('cancel-drawing-btn').style.display = 'none';
    document.getElementById('save-track-btn').disabled = true;
    
    // Set modal title based on whether we're editing or creating
    const modalTitle = document.getElementById('track-modal-title');
    if (trackId) {
      this.editingTrackId = trackId;
      const track = this.trackManager.getTrackById(trackId);
      
      if (track) {
        modalTitle.textContent = 'Edit Safety Track';
        
        // Fill in form with track data
        document.getElementById('track-name').value = track.name;
        document.getElementById('track-description').value = track.description || '';
        document.getElementById('safety-width').value = track.safetyWidth;
        document.getElementById('safety-width-value').textContent = `${track.safetyWidth}m`;
      }
    } else {
      this.editingTrackId = null;
      modalTitle.textContent = 'Create New Safety Track';
    }
    
    // Show the modal
    this.modal.classList.add('active');
  }
  
  /**
   * Close the track creation modal
   */
  closeTrackModal() {
    if (!this.modal) return;
    
    // If we were in the middle of creating a track, cancel it
    if (this.isCreatingTrack) {
      this.cancelTrackCreation();
    }
    
    // Hide the modal
    this.modal.classList.remove('active');
    this.editingTrackId = null;
  }
  
  /**
   * Start creating a track
   */
  startTrackCreation() {
    if (!this.map || !this.trackManager) {
      this.showTrackStatus('Map or track manager not initialized', 'error');
      return;
    }
    
    // Show/hide appropriate buttons
    document.getElementById('start-drawing-btn').style.display = 'none';
    document.getElementById('cancel-drawing-btn').style.display = 'inline-block';
    document.getElementById('save-track-btn').disabled = false;
    
    // Convert modal to floating panel instead of closing it
    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal) {
      settingsModal.classList.remove('active');
    }
    
    // Convert track modal to floating mode
    this.modal.classList.add('floating');
    this.modal.classList.add('drawing');
    
    // Show instructions
    this.showTrackStatus('Click on the map to add waypoints to your track', 'success');
    
    // Start track creation mode
    this.isCreatingTrack = true;
    
    // If editing an existing track
    if (this.editingTrackId) {
      this.trackManager.editTrack(this.editingTrackId, this.onTrackCreated.bind(this));
    } else {
      this.trackManager.startTrackCreation(this.onTrackCreated.bind(this));
    }
  }
  
  /**
   * Cancel track creation
   */
  cancelTrackCreation() {
    if (!this.isCreatingTrack) return;
    
    // Cancel track creation in the manager
    this.trackManager.cancelTrackCreation();
    
    // Reset UI state
    this.isCreatingTrack = false;
    document.getElementById('start-drawing-btn').style.display = 'inline-block';
    document.getElementById('cancel-drawing-btn').style.display = 'none';
    document.getElementById('save-track-btn').disabled = true;
    
    // Remove floating panel mode
    this.modal.classList.remove('floating');
    this.modal.classList.remove('drawing');
    
    // Show the settings modal again
    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal) {
      settingsModal.classList.add('active');
    }
    
    this.showTrackStatus('Track creation cancelled', 'error');
  }
  
  /**
   * Save the current track
   */
  saveTrack() {
    const nameInput = document.getElementById('track-name');
    const descriptionInput = document.getElementById('track-description');
    const safetyWidthInput = document.getElementById('safety-width');
    
    if (!nameInput || !descriptionInput || !safetyWidthInput) {
      return;
    }
    
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const safetyWidth = parseInt(safetyWidthInput.value);
    
    if (!name) {
      this.showTrackStatus('Please enter a track name', 'error');
      return;
    }
    
    // Save the track
    const trackId = this.trackManager.saveTrack(name, safetyWidth, description);
    if (!trackId) {
      this.showTrackStatus('Failed to save track. Make sure you have at least 2 points.', 'error');
      return;
    }
    
    // Reset UI state
    this.isCreatingTrack = false;
    
    // Remove floating panel mode
    this.modal.classList.remove('floating');
    this.modal.classList.remove('drawing');
    
    // Show the settings modal again
    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal) {
      settingsModal.classList.add('active');
    }
    
    // Update the tracks list
    this.renderTracksList();
    
    // Show success message
    this.showTrackStatus('Track saved successfully!', 'success');
    
    // Reset the form for next time
    nameInput.value = '';
    descriptionInput.value = '';
    safetyWidthInput.value = '50';
    document.getElementById('safety-width-value').textContent = '50m';
    
    // Reset buttons
    document.getElementById('start-drawing-btn').style.display = 'inline-block';
    document.getElementById('cancel-drawing-btn').style.display = 'none';
    document.getElementById('save-track-btn').disabled = true;
    
    // Close the modal
    this.closeTrackModal();
  }
  
  /**
   * Callback when track creation is complete
   * @param {Object} track - The created track
   */
  onTrackCreated(track) {
    this.closeTrackModal();
    this.renderTracksList();
  }
  
  /**
   * Show a status message in the track modal
   * @param {string} message - The message to display
   * @param {string} type - 'success' or 'error'
   */
  showTrackStatus(message, type = 'success') {
    const statusElement = document.getElementById('track-status');
    if (!statusElement) return;
    
    statusElement.textContent = message;
    statusElement.className = `track-status ${type}`;
  }
  
  /**
   * Render the list of tracks
   */
  renderTracksList() {
    if (!this.tracksList) return;
    
    // Clear the current list
    this.tracksList.innerHTML = '';
    
    // Get all tracks
    const tracks = this.trackManager.getAllTracks();
    
    if (tracks.length === 0) {
      const noTracksMessage = document.createElement('div');
      noTracksMessage.className = 'no-tracks-message';
      noTracksMessage.textContent = 'No safety tracks created yet. Click "Create New Track" to add one.';
      this.tracksList.appendChild(noTracksMessage);
      return;
    }
    
    // Create track items
    tracks.forEach(track => {
      const trackItem = document.createElement('div');
      trackItem.className = 'track-item';
      trackItem.dataset.trackId = track.id;
      
      // Track info
      const trackInfo = document.createElement('div');
      trackInfo.className = 'track-info';
      
      const trackName = document.createElement('div');
      trackName.className = 'track-name';
      trackName.textContent = track.name;
      trackInfo.appendChild(trackName);
      
      const trackDetails = document.createElement('div');
      trackDetails.className = 'track-details';
      trackDetails.textContent = `${track.points.length} waypoints • ${track.safetyWidth}m safety corridor`;
      trackInfo.appendChild(trackDetails);
      
      trackItem.appendChild(trackInfo);
      
      // Track actions
      const trackActions = document.createElement('div');
      trackActions.className = 'track-actions';
      
      const editButton = document.createElement('button');
      editButton.className = 'track-action-btn edit-track';
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        this.openTrackModal(track.id);
      });
      trackActions.appendChild(editButton);
      
      const deleteButton = document.createElement('button');
      deleteButton.className = 'track-action-btn delete-track';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete the track "${track.name}"?`)) {
          this.trackManager.deleteTrack(track.id);
          this.renderTracksList();
        }
      });
      trackActions.appendChild(deleteButton);
      
      trackItem.appendChild(trackActions);
      
      this.tracksList.appendChild(trackItem);
    });
  }
  
  /**
   * Set the map reference
   * @param {Object} map - The map object
   */
  setMap(map) {
    this.map = map;
    if (this.trackManager) {
      this.trackManager.setMap(map);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrackSafetySettings); 

/***/ }),

/***/ "./src/components/Sidebar/Sidebar.js":
/*!*******************************************!*\
  !*** ./src/components/Sidebar/Sidebar.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/helpers.js */ "./src/utils/helpers.js");
/**
 * Sidebar Component - Handles the sidebar with hiker list and stats
 */


class SidebarComponent {
  /**
   * Initialize the Sidebar component
   * @param {string} containerId - The ID of the container element
   */
  constructor(containerId = 'sidebar') {
    this.containerId = containerId;
    this.hikerListId = 'hiker-list';
    this.towerListId = 'tower-list';
    this.totalHikersId = 'total-hikers';
    this.sosCountId = 'sos-count';
    this.totalTowersId = 'total-towers';
    this.activeTowersId = 'active-towers';
    this.searchId = 'hiker-search';
    this.settingsButtonId = 'settings-button';
    this.hikerCards = new Map();
    this.towerCards = new Map();
    this.onHikerClick = null;
    this.onTowerClick = null;
    this.onSettingsClick = null;
    this.currentFilter = 'hikers';
  }

  /**
   * Initialize the sidebar
   * @param {Function} onHikerClick - Callback for hiker card click events
   * @param {Function} onTowerClick - Callback for tower card click events
   */
  init(onHikerClick, onTowerClick, onSettingsClick) {
    this.onHikerClick = onHikerClick;
    this.onTowerClick = onTowerClick;
    this.onSettingsClick = onSettingsClick;
    
    // Set up search functionality
    document.getElementById(this.searchId)?.addEventListener('input', (e) => {
      this.filterItems(e.target.value);
    });
    
    // Set up filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const filter = e.currentTarget.dataset.filter;
        this.switchFilter(filter);
      });
    });
    
    const settingsButton = document.getElementById(this.settingsButtonId);
    if (settingsButton) {
      settingsButton.addEventListener('click', () => {
        if (this.onSettingsClick) {
          this.onSettingsClick();
        }
      });
    }
    
    return this;
  }

  /**
   * Switch between hikers and towers filter
   * @param {string} filter - 'hikers' or 'towers'
   */
  switchFilter(filter) {
    this.currentFilter = filter;
    
    // Update tab appearance
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.filter === filter);
    });
    
    // Show/hide appropriate lists and stats
    const hikerList = document.getElementById(this.hikerListId);
    const towerList = document.getElementById(this.towerListId);
    const hikerStats = document.querySelectorAll('.hikers-stat');
    const towerStats = document.querySelectorAll('.towers-stat');
    
    if (filter === 'hikers') {
      hikerList.style.display = 'block';
      towerList.style.display = 'none';
      hikerStats.forEach(stat => stat.style.display = 'flex');
      towerStats.forEach(stat => stat.style.display = 'none');
    } else {
      hikerList.style.display = 'none';
      towerList.style.display = 'block';
      hikerStats.forEach(stat => stat.style.display = 'none');
      towerStats.forEach(stat => stat.style.display = 'flex');
    }
    
    // Clear search
    const searchInput = document.getElementById(this.searchId);
    if (searchInput) {
      searchInput.value = '';
      searchInput.placeholder = filter === 'hikers' ? 'Search hikers...' : 'Search towers...';
    }
  }

  /**
   * Filter items in the sidebar based on search term
   * @param {string} searchTerm - The search term to filter by
   */
  filterItems(searchTerm) {
    const term = searchTerm.toLowerCase();
    
    if (this.currentFilter === 'hikers') {
      document.querySelectorAll('.hiker-card').forEach(card => {
        const hikerName = card.querySelector('.hiker-name').textContent.toLowerCase();
        card.style.display = hikerName.includes(term) ? 'block' : 'none';
      });
    } else {
      document.querySelectorAll('.tower-card').forEach(card => {
        const towerName = card.querySelector('.tower-name').textContent.toLowerCase();
        card.style.display = towerName.includes(term) ? 'block' : 'none';
      });
    }
  }

  /**
   * Create a hiker card element
   * @param {Object} hiker - The hiker object
   * @returns {HTMLElement} The hiker card element
   */
  createHikerCard(hiker) {
    const card = document.createElement('div');
    card.className = `hiker-card${hiker.sos ? ' sos' : ''}`;
    card.setAttribute('data-hiker-id', hiker.id);
    
    const initials = hiker.name.split(' ').map(n => n[0]).join('');
    
    card.innerHTML = `
      ${hiker.sos ? '<div class="sos-badge">SOS</div>' : ''}
      <div class="hiker-info">
        <div class="hiker-avatar">${initials}</div>
        <div class="hiker-name-status">
          <div class="hiker-name">${hiker.name}</div>
          <div class="hiker-status">
            <i class="status-icon fa-solid ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getStatusIcon)(hiker.status)}"></i>
            ${hiker.status}
          </div>
        </div>
      </div>
      <div class="hiker-details">
        <div class="hiker-detail-item">
          <i class="fas fa-battery-half"></i>
          ${Math.round(hiker.battery)}%
        </div>
        <div class="hiker-detail-item">
          <i class="fas fa-clock"></i>
          ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_0__.formatTimeAgo)(hiker.lastUpdate)}
        </div>
      </div>
      <div class="battery-bar">
        <div class="battery-fill" style="width: ${hiker.battery}%; background-color: ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getBatteryColor)(hiker.battery)};"></div>
      </div>
    `;
    
    if (this.onHikerClick) {
      card.addEventListener('click', () => {
        console.log('Hiker card clicked:', hiker);
        this.onHikerClick(hiker);
      });
    }
    
    return card;
  }

  /**
   * Create a tower card element
   * @param {Object} tower - The tower object
   * @returns {HTMLElement} The tower card element
   */
  createTowerCard(tower) {
    const card = document.createElement('div');
    card.className = 'tower-card';
    card.setAttribute('data-tower-id', tower.id);
    
    const typeIcon = tower.type === 'Tower' ? 'radio-tower' : 'house-wifi';
    const typeClass = tower.type.toLowerCase();
    
    card.innerHTML = `
      <div class="tower-info">
        <div class="tower-icon ${typeClass}">
          <i data-lucide="${typeIcon}"></i>
        </div>
        <div class="tower-name-type">
          <div class="tower-name">${tower.name}</div>
          <div class="tower-type">
            <i data-lucide="${typeIcon}"></i>
            ${tower.type}
          </div>
        </div>
      </div>
      <div class="tower-details">
        <div class="tower-detail-item">
          <i data-lucide="wifi"></i>
          ${tower.coverageRadius || tower.signalStrength || 500}m
        </div>
        <div class="tower-status ${tower.status.toLowerCase()}">
          ${tower.status}
        </div>
      </div>
    `;
    
    // Refresh Lucide icons for this card
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 10);
    
    if (this.onTowerClick) {
      card.addEventListener('click', () => {
        console.log('Tower card clicked:', tower);
        this.onTowerClick(tower);
      });
    }
    
    return card;
  }

  /**
   * Update the sidebar with current hiker data
   * @param {Array} hikers - Array of hiker objects
   */
  updateSidebar(hikers) {
    const hikerList = document.getElementById(this.hikerListId);
    if (!hikerList) return;
    
    // Clear the current list
    hikerList.innerHTML = '';
    
    // Count SOS instances
    let sosCount = 0;
    hikers.forEach(hiker => {
      if (hiker.sos) sosCount++;
      
      // Create and append the hiker card
      const card = this.createHikerCard(hiker);
      hikerList.appendChild(card);
    });
    
    // Update stats
    document.getElementById(this.totalHikersId).textContent = hikers.length;
    document.getElementById(this.sosCountId).textContent = sosCount;
  }

  /**
   * Update the sidebar with current tower data
   * @param {Array} towers - Array of tower objects
   */
  updateTowerList(towers) {
    const towerList = document.getElementById(this.towerListId);
    if (!towerList) return;
    
    // Clear the current list
    towerList.innerHTML = '';
    
    // Count active towers
    let activeCount = 0;
    towers.forEach(tower => {
      if (tower.status === 'Active') activeCount++;
      
      // Create and append the tower card
      const card = this.createTowerCard(tower);
      towerList.appendChild(card);
    });
    
    // Update stats
    document.getElementById(this.totalTowersId).textContent = towers.length;
    document.getElementById(this.activeTowersId).textContent = activeCount;
  }

  renderHikerCard(hiker) {
    const existingCard = this.hikerCards.get(hiker.id);
    
    if (existingCard) {
      // Update existing card
      const batteryElement = existingCard.querySelector('.hiker-battery');
      if (batteryElement) {
        batteryElement.textContent = `${hiker.battery}%`;
        batteryElement.className = 'hiker-battery';
        if (hiker.battery <= 20) {
          batteryElement.classList.add('low');
        } else if (hiker.battery <= 50) {
          batteryElement.classList.add('medium');
        }
      }

      const sosElement = existingCard.querySelector('.hiker-sos');
      if (sosElement) {
        sosElement.classList.remove('active', 'handled', 'emergency');
        if (hiker.sos) {
          sosElement.classList.add('active');
          
          if (hiker.sosHandled) {
            sosElement.classList.add('handled');
            sosElement.innerHTML = '<i class="fas fa-check-circle"></i> Handled';
          } else if (hiker.sosEmergencyDispatched) {
            sosElement.classList.add('emergency');
            sosElement.innerHTML = '<i class="fas fa-ambulance"></i> Emergency Dispatched';
          } else {
            sosElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i> SOS';
          }
        } else {
          sosElement.innerHTML = '';
        }
      }

      const lastSeenElement = existingCard.querySelector('.hiker-last-seen');
      if (lastSeenElement) {
        lastSeenElement.textContent = `Last update: ${this.getTimeAgo(hiker.lastUpdate)}`;
      }

      return existingCard;
    }

    // Create new card
    const card = document.createElement('div');
    card.className = 'hiker-card';
    card.setAttribute('data-hiker-id', hiker.id);
    
    const sosClass = hiker.sos ? 'active' : '';
    const sosHandledClass = hiker.sosHandled ? 'handled' : '';
    const sosEmergencyClass = hiker.sosEmergencyDispatched ? 'emergency' : '';
    const sosCombinedClass = [sosClass, sosHandledClass, sosEmergencyClass].filter(Boolean).join(' ');
    
    let sosText = '';
    if (hiker.sos) {
      if (hiker.sosHandled) {
        sosText = '<i class="fas fa-check-circle"></i> Handled';
      } else if (hiker.sosEmergencyDispatched) {
        sosText = '<i class="fas fa-ambulance"></i> Emergency Dispatched';
      } else {
        sosText = '<i class="fas fa-exclamation-triangle"></i> SOS';
      }
    }

    const batteryClass = hiker.battery <= 20 ? 'low' : (hiker.battery <= 50 ? 'medium' : '');
    
    card.innerHTML = `
      <div class="hiker-info">
        <h3 class="hiker-name">${hiker.name}</h3>
        <div class="hiker-status">
          <span class="hiker-battery ${batteryClass}">${hiker.battery}%</span>
          <span class="hiker-sos ${sosCombinedClass}">${sosText}</span>
        </div>
        <div class="hiker-last-seen">Last update: ${this.getTimeAgo(hiker.lastUpdate)}</div>
      </div>
    `;

    card.addEventListener('click', () => {
      if (this.onHikerClick) {
        console.log('Hiker card clicked from renderHikerCard:', hiker);
        this.onHikerClick(hiker);
      }
    });

    this.hikerCards.set(hiker.id, card);
    return card;
  }

  updateHikerList(hikers) {
    const hikerList = document.getElementById(this.hikerListId);
    if (!hikerList) return;

    // Sort hikers - SOS first, then by name
    const sortedHikers = [...hikers].sort((a, b) => {
      // SOS cases that are not handled come first
      if (a.sos && !a.sosHandled && !a.sosEmergencyDispatched) {
        if (!(b.sos && !b.sosHandled && !b.sosEmergencyDispatched)) return -1;
      } 
      else if (b.sos && !b.sosHandled && !b.sosEmergencyDispatched) return 1;
      
      // Then show emergency dispatched cases
      if (a.sos && a.sosEmergencyDispatched) {
        if (!b.sos || !b.sosEmergencyDispatched) return -1;
      } 
      else if (b.sos && b.sosEmergencyDispatched) return 1;
      
      // Then show handled SOS cases
      if (a.sos && a.sosHandled) {
        if (!b.sos || (!b.sosHandled && !b.sosEmergencyDispatched)) return -1;
      } 
      else if (b.sos && b.sosHandled) return 1;
      
      // Then sort by name
      return a.name.localeCompare(b.name);
    });

    // Current cards in the list
    const currentCards = new Set();

    // Update or add cards
    sortedHikers.forEach(hiker => {
      const card = this.renderHikerCard(hiker);
      currentCards.add(hiker.id);
      
      // Flash card if SOS status has changed
      if (hiker.sos && (hiker.sosHandled || hiker.sosEmergencyDispatched)) {
        card.classList.add('status-updated');
        setTimeout(() => {
          card.classList.remove('status-updated');
        }, 2000);
      }
      
      // Add to DOM if not already there
      if (!hikerList.contains(card)) {
        hikerList.appendChild(card);
      }
    });

    // Remove cards for hikers no longer in the list
    this.hikerCards.forEach((card, hikerId) => {
      if (!currentCards.has(hikerId) && hikerList.contains(card)) {
        hikerList.removeChild(card);
        this.hikerCards.delete(hikerId);
      }
    });
  }

  getTimeAgo(timestamp) {
    if (!timestamp) return 'N/A';
    
    const now = new Date();
    const updatedAt = new Date(timestamp);
    const diffInSeconds = Math.floor((now - updatedAt) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarComponent); 

/***/ }),

/***/ "./src/components/Tower/TowerControls.js":
/*!***********************************************!*\
  !*** ./src/components/Tower/TowerControls.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Tower Controls - Handles manual tower addition and controls
 */
class TowerControls {
  constructor(towerManager, mapComponent) {
    this.towerManager = towerManager;
    this.mapComponent = mapComponent;
    this.addTowerBtn = null;
    this.dialogMapClickHandler = null;
  }

  /**
   * Initialize tower controls
   */
  init() {
    this.createFloatingButton();
    this.setupEventListeners();
    return this;
  }

  /**
   * Create floating add tower button
   */
  createFloatingButton() {
    // Check if button already exists
    if (document.getElementById('add-tower-btn')) {
      return;
    }

    this.addTowerBtn = document.createElement('button');
    this.addTowerBtn.id = 'add-tower-btn';
    this.addTowerBtn.className = 'floating-btn add-tower-btn';
    this.addTowerBtn.innerHTML = `
      <i class="fas fa-plus"></i>
      <span class="btn-tooltip">Add Tower</span>
    `;
    this.addTowerBtn.title = 'Add a new tower or basecamp';
    this.addTowerBtn.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      z-index: 1000;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      background: #4299E1;
      color: white;
      font-size: 20px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    document.body.appendChild(this.addTowerBtn);

    // Add hover effect
    this.addTowerBtn.addEventListener('mouseenter', () => {
      this.addTowerBtn.style.transform = 'scale(1.1)';
      this.addTowerBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });
    
    this.addTowerBtn.addEventListener('mouseleave', () => {
      this.addTowerBtn.style.transform = 'scale(1)';
      this.addTowerBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Add tower button - opens dialog directly
    if (this.addTowerBtn) {
      this.addTowerBtn.addEventListener('click', () => {
        this.showTowerCreationDialog(); // Open dialog directly with both options
      });
    }

    // ESC key to close any open dialogs
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close tower creation dialog if open
        const backdrop = document.querySelector('.tower-creation-backdrop');
        if (backdrop) {
          // Restore pointer events before removing
          backdrop.style.pointerEvents = 'auto';
          backdrop.remove();
          this.disableMapSelectionMode();
        }
      }
    });
  }

  // Removed old map-clicking mode methods - now using dialog-only approach

  /**
   * Show tower creation dialog
   * @param {number} lat - Latitude (optional)
   * @param {number} lon - Longitude (optional)
   */
  showTowerCreationDialog(lat = null, lon = null) {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'tower-creation-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    `;

    // Create dialog
    const dialog = document.createElement('div');
    dialog.className = 'tower-creation-dialog';
    dialog.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 24px;
      width: 450px;
      max-width: 90vw;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    `;

    const hasInitialCoords = lat !== null && lon !== null;

    dialog.innerHTML = `
      <h3 style="margin: 0 0 20px 0; color: #2d3748; display: flex; align-items: center; gap: 10px;">
        <i data-lucide="radio-tower"></i>
        Add New Infrastructure
      </h3>
      
      <form id="tower-creation-form">
        <div class="form-group" style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #4a5568;">Name:</label>
          <input type="text" id="tower-name" required 
                 style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;"
                 placeholder="Enter tower/basecamp name">
        </div>
        
        <div class="form-group" style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #4a5568;">Type:</label>
          <select id="tower-type" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
            <option value="Tower">📡 Communication Tower</option>
            <option value="Basecamp">🏠 Basecamp Station</option>
          </select>
        </div>
        
        <div class="form-group" style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; color: #4a5568;">Coverage Radius (meters):</label>
          <input type="number" id="tower-coverage" min="50" max="2000" value="500"
                 style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;"
                 placeholder="Enter coverage radius in meters">
        </div>
        
        <!-- Coordinate Input Method Toggle -->
        <div class="form-group" style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #4a5568;">Location:</label>
          <div class="coordinate-method-toggle" style="display: flex; background: #f7fafc; border-radius: 8px; padding: 4px; margin-bottom: 12px;">
            <button type="button" id="map-select-mode" class="coord-method-btn ${hasInitialCoords ? 'active' : ''}" 
                    style="flex: 1; padding: 8px 12px; border: none; background: ${hasInitialCoords ? '#4299E1' : 'transparent'}; 
                           color: ${hasInitialCoords ? 'white' : '#4a5568'}; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;"
                    onmouseover="if(!this.classList.contains('coord-active')) { this.style.background='#e2e8f0'; }"
                    onmouseout="if(!this.classList.contains('coord-active')) { this.style.background='transparent'; }">
              <i class="fas fa-map-marker-alt"></i> Select on Map
            </button>
            <button type="button" id="manual-input-mode" class="coord-method-btn ${!hasInitialCoords ? 'active' : ''}"
                    style="flex: 1; padding: 8px 12px; border: none; background: ${!hasInitialCoords ? '#4299E1' : 'transparent'}; 
                           color: ${!hasInitialCoords ? 'white' : '#4a5568'}; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;"
                    onmouseover="if(!this.classList.contains('coord-active')) { this.style.background='#e2e8f0'; }"
                    onmouseout="if(!this.classList.contains('coord-active')) { this.style.background='transparent'; }">
              <i class="fas fa-keyboard"></i> Manual Input
            </button>
          </div>
          
          <!-- Map Selection Display -->
                     <div id="map-coordinates-display" style="display: ${hasInitialCoords ? 'block' : 'none'};">
             <div id="coordinates-box" style="padding: 10px; background: #f0fff4; border: 2px solid #68d391; border-radius: 8px; color: #2f855a; font-family: monospace; display: flex; align-items: center; gap: 8px;">
               <i class="fas fa-map-pin"></i>
               <span id="selected-coordinates">${hasInitialCoords ? `${lat.toFixed(6)}, ${lon.toFixed(6)}` : 'Click on map to select'}</span>
             </div>
             <div id="map-instruction" style="margin-top: 8px; font-size: 12px; color: #718096; display: flex; align-items: center; gap: 6px;">
               <i class="fas fa-info-circle"></i>
               <span id="map-instruction-text">Click on the map to select location</span>
             </div>
           </div>
          
          <!-- Manual Input Fields -->
          <div id="manual-coordinates-input" style="display: ${!hasInitialCoords ? 'block' : 'none'};">
            <div style="display: flex; gap: 12px;">
              <div style="flex: 1;">
                <label style="display: block; margin-bottom: 4px; font-size: 12px; font-weight: 500; color: #4a5568;">Latitude:</label>
                <input type="number" id="manual-lat" step="0.000001" 
                       style="width: 100%; padding: 8px; border: 2px solid #e2e8f0; border-radius: 6px; font-size: 13px; font-family: monospace;"
                       placeholder="e.g., 3.139000" value="${hasInitialCoords ? lat.toFixed(6) : ''}">
              </div>
              <div style="flex: 1;">
                <label style="display: block; margin-bottom: 4px; font-size: 12px; font-weight: 500; color: #4a5568;">Longitude:</label>
                <input type="number" id="manual-lon" step="0.000001"
                       style="width: 100%; padding: 8px; border: 2px solid #e2e8f0; border-radius: 6px; font-size: 13px; font-family: monospace;"
                       placeholder="e.g., 101.686900" value="${hasInitialCoords ? lon.toFixed(6) : ''}">
              </div>
            </div>
            <div style="margin-top: 8px; font-size: 12px; color: #718096; display: flex; align-items: center; gap: 6px;">
              <i class="fas fa-info-circle"></i>
              Use decimal degrees format (e.g., 3.139000, 101.686900)
            </div>
          </div>
        </div>
        
        <div class="form-actions" style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
          <button type="button" id="cancel-tower" 
                  style="padding: 10px 20px; border: 2px solid #e2e8f0; background: white; color: #4a5568; border-radius: 8px; font-weight: 500; cursor: pointer;">
            Cancel
          </button>
          <button type="submit" 
                  style="padding: 10px 20px; border: none; background: #4299E1; color: white; border-radius: 8px; font-weight: 500; cursor: pointer;">
            <i class="fas fa-plus"></i> Create Tower
          </button>
        </div>
      </form>
    `;

    backdrop.appendChild(dialog);
    document.body.appendChild(backdrop);

    // Refresh Lucide icons in the dialog
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 50);

    // Store current coordinates
    let currentLat = lat;
    let currentLon = lon;
    let isMapSelectionActive = false;

    // Set up map click handler for coordinate selection within dialog FIRST
    this.dialogMapClickHandler = (e) => {
      console.log('Map clicked at:', e.latlng.lat, e.latlng.lng);
      
      currentLat = e.latlng.lat;
      currentLon = e.latlng.lng;
      
      // Update display
      const coordsElement = document.getElementById('selected-coordinates');
      if (coordsElement) {
        coordsElement.textContent = `${currentLat.toFixed(6)}, ${currentLon.toFixed(6)}`;
      }
      
      // Update manual inputs if they exist
      const manualLatInput = document.getElementById('manual-lat');
      const manualLonInput = document.getElementById('manual-lon');
      if (manualLatInput && manualLonInput) {
        manualLatInput.value = currentLat.toFixed(6);
        manualLonInput.value = currentLon.toFixed(6);
      }
      
      // Show success feedback
      const coordsBox = document.getElementById('coordinates-box');
      const instructionText = document.getElementById('map-instruction-text');
      if (coordsBox && instructionText) {
        coordsBox.style.background = '#e6fffa';
        coordsBox.style.borderColor = '#4fd1c7';
        instructionText.textContent = 'Location selected! Click again to change or switch to manual input';
        
        // Reset after 2 seconds
        setTimeout(() => {
          coordsBox.style.background = '#f0fff4';
          coordsBox.style.borderColor = '#68d391';
          instructionText.textContent = 'Click on the map to select location';
        }, 2000);
      }
    };

    // Focus on name input
    setTimeout(() => {
      document.getElementById('tower-name').focus();
    }, 100);

    // Handle coordinate method toggle
    const mapSelectBtn = document.getElementById('map-select-mode');
    const manualInputBtn = document.getElementById('manual-input-mode');
    const mapDisplay = document.getElementById('map-coordinates-display');
    const manualInput = document.getElementById('manual-coordinates-input');

        mapSelectBtn.addEventListener('click', () => {
      // Switch to map selection mode
      mapSelectBtn.style.background = '#667eea';
      mapSelectBtn.style.color = 'white';
      mapSelectBtn.classList.add('coord-active');
      manualInputBtn.style.background = 'transparent';
      manualInputBtn.style.color = '#4a5568';
      manualInputBtn.classList.remove('coord-active');
      
      mapDisplay.style.display = 'block';
      manualInput.style.display = 'none';

             // Enable map clicking for coordinate selection
       isMapSelectionActive = true;
       this.startMapSelectionMode(backdrop);
       
       // Make backdrop allow clicks to pass through to map
       backdrop.style.pointerEvents = 'none';
       // But keep the dialog interactive
       dialog.style.pointerEvents = 'auto';
       
       // Update instruction
       const instructionText = document.getElementById('map-instruction-text');
       if (instructionText) {
         instructionText.textContent = 'Click on the map to select location (dialog will stay open)';
       }
    });

    manualInputBtn.addEventListener('click', () => {
      // Switch to manual input mode
      manualInputBtn.style.background = '#667eea';
      manualInputBtn.style.color = 'white';
      manualInputBtn.classList.add('coord-active');
      mapSelectBtn.style.background = 'transparent';
      mapSelectBtn.style.color = '#4a5568';
      mapSelectBtn.classList.remove('coord-active');
      
      mapDisplay.style.display = 'none';
      manualInput.style.display = 'block';

      // Populate manual inputs with current coordinates
      if (currentLat !== null && currentLon !== null) {
        document.getElementById('manual-lat').value = currentLat.toFixed(6);
        document.getElementById('manual-lon').value = currentLon.toFixed(6);
      }

             // Disable map clicking
       isMapSelectionActive = false;
       this.disableMapSelectionMode();
       
       // Restore backdrop click handling
       backdrop.style.pointerEvents = 'auto';
       dialog.style.pointerEvents = 'auto';
       
       // Reset instruction
       const instructionText = document.getElementById('map-instruction-text');
       if (instructionText) {
         instructionText.textContent = 'Enter coordinates manually in the fields below';
       }
    });

    // Handle manual coordinate input changes
    const manualLatInput = document.getElementById('manual-lat');
    const manualLonInput = document.getElementById('manual-lon');
    
    [manualLatInput, manualLonInput].forEach(input => {
      input.addEventListener('input', () => {
        const manualLat = parseFloat(manualLatInput.value);
        const manualLon = parseFloat(manualLonInput.value);
        
        if (!isNaN(manualLat) && !isNaN(manualLon)) {
          currentLat = manualLat;
          currentLon = manualLon;
        }
      });
    });

    // Handle form submission
    document.getElementById('tower-creation-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('tower-name').value.trim();
      const type = document.getElementById('tower-type').value;
      const coverage = parseInt(document.getElementById('tower-coverage').value) || 500;
      
      // Get final coordinates
      let finalLat = currentLat;
      let finalLon = currentLon;
      
      // If in manual input mode, get values from inputs
      if (manualInput.style.display !== 'none') {
        finalLat = parseFloat(document.getElementById('manual-lat').value);
        finalLon = parseFloat(document.getElementById('manual-lon').value);
      }
      
      // Validation
      if (!name) {
        this.showDialogError('Please enter a tower name');
        return;
      }
      
      if (isNaN(finalLat) || isNaN(finalLon)) {
        this.showDialogError('Please provide valid coordinates');
        return;
      }
      
      if (finalLat < -90 || finalLat > 90) {
        this.showDialogError('Latitude must be between -90 and 90 degrees');
        return;
      }
      
      if (finalLon < -180 || finalLon > 180) {
        this.showDialogError('Longitude must be between -180 and 180 degrees');
        return;
      }
      
      if (coverage < 50 || coverage > 2000) {
        this.showDialogError('Coverage radius must be between 50 and 2000 meters');
        return;
      }
      
      this.createTower(name, finalLat, finalLon, type, coverage);
      isMapSelectionActive = false;
      // Restore pointer events before removing
      backdrop.style.pointerEvents = 'auto';
      backdrop.remove();
      this.disableMapSelectionMode();
    });

    // Handle cancel
    document.getElementById('cancel-tower').addEventListener('click', () => {
      isMapSelectionActive = false;
      // Restore pointer events before removing
      backdrop.style.pointerEvents = 'auto';
      backdrop.remove();
      this.disableMapSelectionMode();
    });

    // Handle backdrop click - but not when map selection is active
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop && !isMapSelectionActive) {
        backdrop.remove();
        this.disableMapSelectionMode();
      }
    });

    // Set initial active class based on hasInitialCoords
    if (hasInitialCoords) {
      mapSelectBtn.classList.add('coord-active');
      manualInputBtn.classList.remove('coord-active');
    } else {
      manualInputBtn.classList.add('coord-active');
      mapSelectBtn.classList.remove('coord-active');
    }

    // If starting in map selection mode and coordinates are provided
    if (hasInitialCoords && mapDisplay.style.display !== 'none') {
      isMapSelectionActive = true;
      this.startMapSelectionMode(backdrop);
      // Make backdrop allow clicks to pass through to map
      backdrop.style.pointerEvents = 'none';
      // But keep the dialog interactive
      dialog.style.pointerEvents = 'auto';
    }
    
    // Cleanup function to remove map click handler when dialog closes
    const cleanup = () => {
      // Restore pointer events if needed
      if (backdrop.style.pointerEvents === 'none') {
        backdrop.style.pointerEvents = 'auto';
      }
      this.disableMapSelectionMode();
      // Remove the dialogMapClickHandler reference
      this.dialogMapClickHandler = null;
    };
    
    // Store cleanup function for later use
    backdrop.addEventListener('remove', cleanup);
  }

  /**
   * Create a new tower
   * @param {string} name - Tower name
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @param {string} type - Tower type
   * @param {number} coverage - Coverage radius in meters
   */
  createTower(name, lat, lon, type, coverage = 500) {
    try {
      const tower = this.towerManager.addTower(name, lat, lon, type, coverage);
      
      this.showSuccessMessage(`${type} "${name}" added successfully!`);
      
      console.log(`Created new ${type}:`, tower);
      
      // Optionally center map on new tower
      setTimeout(() => {
        this.mapComponent.centerMap([lat, lon], 15);
      }, 500);
      
    } catch (error) {
      console.error('Error creating tower:', error);
      this.showErrorMessage('Failed to create tower. Please try again.');
    }
  }

  /**
   * Start map selection mode for coordinate picking
   * @param {HTMLElement} backdrop - Dialog backdrop element
   */
  startMapSelectionMode(backdrop) {
    const map = this.mapComponent.getMap();
    if (map && this.dialogMapClickHandler) {
      map.on('click', this.dialogMapClickHandler);
      map.getContainer().style.cursor = 'crosshair';
      
      // Show instruction
      this.showInstruction('Click on the map to select coordinates for the tower');
      console.log('Map selection mode activated - click handler attached');
    } else {
      console.error('Failed to activate map selection mode:', {
        map: !!map,
        handler: !!this.dialogMapClickHandler
      });
    }
  }

  /**
   * Disable map selection mode
   */
  disableMapSelectionMode() {
    const map = this.mapComponent.getMap();
    if (map && this.dialogMapClickHandler) {
      map.off('click', this.dialogMapClickHandler);
      map.getContainer().style.cursor = '';
      this.hideInstruction();
    }
  }

  /**
   * Show error message within dialog
   * @param {string} message - Error message
   */
  showDialogError(message) {
    // Remove existing error if any
    const existingError = document.querySelector('.dialog-error');
    if (existingError) {
      existingError.remove();
    }

    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'dialog-error';
    errorDiv.style.cssText = `
      margin: 12px 0;
      padding: 10px;
      background: #fed7d7;
      border: 1px solid #feb2b2;
      border-radius: 6px;
      color: #c53030;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    errorDiv.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      ${message}
    `;

    // Insert before form actions
    const formActions = document.querySelector('.form-actions');
    if (formActions) {
      formActions.parentNode.insertBefore(errorDiv, formActions);
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  /**
   * Show instruction message
   * @param {string} message - Instruction text
   */
  showInstruction(message) {
    this.hideInstruction(); // Remove any existing instruction
    
    const instruction = document.createElement('div');
    instruction.id = 'tower-instruction';
    instruction.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1500;
      font-size: 14px;
      font-weight: 500;
      max-width: 90vw;
      text-align: center;
    `;
    instruction.textContent = message;
    
    document.body.appendChild(instruction);
  }

  /**
   * Hide instruction message
   */
  hideInstruction() {
    const existing = document.getElementById('tower-instruction');
    if (existing) {
      existing.remove();
    }
  }

  /**
   * Show success message
   * @param {string} message - Success message
   */
  showSuccessMessage(message) {
    this.showTemporaryMessage(message, 'success');
  }

  /**
   * Show error message
   * @param {string} message - Error message
   */
  showErrorMessage(message) {
    this.showTemporaryMessage(message, 'error');
  }

  /**
   * Show temporary message
   * @param {string} message - Message text
   * @param {string} type - Message type ('success' or 'error')
   */
  showTemporaryMessage(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1500;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideInRight 0.3s ease-out;
    `;
    
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      ${message}
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Destroy tower controls
   */
  destroy() {
    if (this.addTowerBtn) {
      this.addTowerBtn.remove();
    }
    
    this.hideInstruction();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TowerControls); 

/***/ }),

/***/ "./src/components/Tower/TowerManager.js":
/*!**********************************************!*\
  !*** ./src/components/Tower/TowerManager.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models_Tower_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/Tower.js */ "./src/models/Tower.js");
/**
 * Tower Manager - Handles all tower-related operations
 */


class TowerManager {
  constructor() {
    this.towers = [];
    this.updateCallbacks = [];
    this.nextId = 1;
  }

  /**
   * Add a new tower
   * @param {string} name - Tower name
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude  
   * @param {string} type - Tower type ('Tower' or 'Basecamp')
   * @param {number} coverageRadius - Coverage radius in meters
   * @param {Object} options - Additional options
   * @returns {Tower} The created tower
   */
  addTower(name, lat, lon, type = 'Tower', coverageRadius = 500, options = {}) {
    const id = `tower_${this.nextId++}`;
    const tower = new _models_Tower_js__WEBPACK_IMPORTED_MODULE_0__["default"](id, name, lat, lon, type, 'Active', coverageRadius, options);
    
    this.towers.push(tower);
    this.notifyUpdate();
    
    console.log(`Added new ${type.toLowerCase()}: ${name} at ${lat}, ${lon} with ${coverageRadius}m coverage`);
    return tower;
  }

  /**
   * Remove a tower by ID
   * @param {string} towerId - Tower ID to remove
   * @returns {boolean} Success status
   */
  removeTower(towerId) {
    const index = this.towers.findIndex(t => t.id === towerId);
    if (index !== -1) {
      const tower = this.towers[index];
      this.towers.splice(index, 1);
      this.notifyUpdate();
      console.log(`Removed tower: ${tower.name}`);
      return true;
    }
    return false;
  }

  /**
   * Update tower information
   * @param {string} towerId - Tower ID
   * @param {Object} updates - Updates to apply
   * @returns {boolean} Success status
   */
  updateTower(towerId, updates) {
    const tower = this.getTowerById(towerId);
    if (!tower) return false;

    // Apply updates
    Object.keys(updates).forEach(key => {
      if (key in tower) {
        tower[key] = updates[key];
      }
    });

    tower.lastUpdate = Date.now();
    this.notifyUpdate();
    return true;
  }

  /**
   * Get tower by ID
   * @param {string} towerId - Tower ID
   * @returns {Tower|null} Tower object or null
   */
  getTowerById(towerId) {
    return this.towers.find(t => t.id === towerId) || null;
  }

  /**
   * Get all towers
   * @returns {Array<Tower>} Array of all towers
   */
  getAllTowers() {
    return [...this.towers];
  }

  /**
   * Get towers by type
   * @param {string} type - Tower type ('Tower' or 'Basecamp')
   * @returns {Array<Tower>} Filtered towers
   */
  getTowersByType(type) {
    return this.towers.filter(t => t.type === type);
  }

  /**
   * Get towers by status
   * @param {string} status - Tower status
   * @returns {Array<Tower>} Filtered towers
   */
  getTowersByStatus(status) {
    return this.towers.filter(t => t.status === status);
  }

  /**
   * Get operational towers
   * @returns {Array<Tower>} Operational towers
   */
  getOperationalTowers() {
    return this.towers.filter(t => t.isOperational());
  }

  /**
   * Find nearest tower to coordinates
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @param {string} type - Optional type filter
   * @returns {Tower|null} Nearest tower or null
   */
  findNearestTower(lat, lon, type = null) {
    let towers = this.towers;
    if (type) {
      towers = towers.filter(t => t.type === type);
    }

    if (towers.length === 0) return null;

    let nearest = towers[0];
    let minDistance = this.calculateDistance(lat, lon, nearest.lat, nearest.lon);

    towers.forEach(tower => {
      const distance = this.calculateDistance(lat, lon, tower.lat, tower.lon);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = tower;
      }
    });

    return nearest;
  }

  /**
   * Calculate distance between two points
   * @param {number} lat1 - First point latitude
   * @param {number} lon1 - First point longitude
   * @param {number} lat2 - Second point latitude
   * @param {number} lon2 - Second point longitude
   * @returns {number} Distance in kilometers
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  /**
   * Connect hiker to nearest available tower
   * @param {Object} hiker - Hiker object
   * @returns {Tower|null} Connected tower or null
   */
  connectHikerToTower(hiker) {
    const nearestTower = this.findNearestTower(hiker.lat, hiker.lon);
    if (nearestTower && nearestTower.isOperational()) {
      nearestTower.addConnection();
      this.notifyUpdate();
      return nearestTower;
    }
    return null;
  }

  /**
   * Disconnect hiker from tower
   * @param {string} towerId - Tower ID
   * @returns {boolean} Success status
   */
  disconnectHikerFromTower(towerId) {
    const tower = this.getTowerById(towerId);
    if (tower) {
      const success = tower.removeConnection();
      if (success) {
        this.notifyUpdate();
      }
      return success;
    }
    return false;
  }

  /**
   * Load towers from data
   * @param {Array} towersData - Array of tower data
   */
  loadTowers(towersData) {
    this.towers = towersData.map(data => 
      data instanceof _models_Tower_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? data : _models_Tower_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromJSON(data)
    );
    this.updateNextId();
    this.notifyUpdate();
  }

  /**
   * Update next ID based on existing towers
   */
  updateNextId() {
    const maxId = this.towers.reduce((max, tower) => {
      const num = parseInt(tower.id.replace('tower_', ''));
      return isNaN(num) ? max : Math.max(max, num);
    }, 0);
    this.nextId = maxId + 1;
  }

  /**
   * Register update callback
   * @param {Function} callback - Callback function
   */
  onUpdate(callback) {
    this.updateCallbacks.push(callback);
  }

  /**
   * Notify all callbacks of update
   */
  notifyUpdate() {
    this.updateCallbacks.forEach(callback => {
      try {
        callback(this.towers);
      } catch (error) {
        console.error('Error in tower update callback:', error);
      }
    });
  }

  /**
   * Get tower statistics
   * @returns {Object} Statistics object
   */
  getStatistics() {
    const total = this.towers.length;
    const active = this.towers.filter(t => t.status === 'Active').length;
    const maintenance = this.towers.filter(t => t.status === 'Maintenance').length;
    const offline = this.towers.filter(t => t.status === 'Offline').length;
    const towers = this.towers.filter(t => t.type === 'Tower').length;
    const basecamps = this.towers.filter(t => t.type === 'Basecamp').length;
    const totalConnections = this.towers.reduce((sum, t) => sum + t.connectionCount, 0);

    return {
      total,
      active,
      maintenance,
      offline,
      towers,
      basecamps,
      totalConnections,
      operational: this.getOperationalTowers().length
    };
  }

  /**
   * Export towers data
   * @returns {Array} Serializable tower data
   */
  exportData() {
    return this.towers.map(tower => tower.toJSON());
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TowerManager); 

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HikerModal: () => (/* reexport safe */ _Modal_Hiker_HikerModal_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   MapComponent: () => (/* reexport safe */ _Map_Map_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   ModalComponent: () => (/* reexport safe */ _Modal_Hiker_HikerModal_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   SettingsComponent: () => (/* reexport safe */ _Settings_Settings_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   SettingsMainComponent: () => (/* reexport safe */ _Settings_SettingsComponent_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   SidebarComponent: () => (/* reexport safe */ _Sidebar_Sidebar_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   TowerControls: () => (/* reexport safe */ _Tower_TowerControls_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   TowerManager: () => (/* reexport safe */ _Tower_TowerManager_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   TowerModal: () => (/* reexport safe */ _Modal_Tower_TowerModal_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   TowerModalComponent: () => (/* reexport safe */ _Modal_Tower_TowerModal_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   TrackSafetySettings: () => (/* reexport safe */ _Settings_TrackSafetySettings_js__WEBPACK_IMPORTED_MODULE_6__["default"])
/* harmony export */ });
/* harmony import */ var _Map_Map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map/Map.js */ "./src/components/Map/Map.js");
/* harmony import */ var _Sidebar_Sidebar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar/Sidebar.js */ "./src/components/Sidebar/Sidebar.js");
/* harmony import */ var _Modal_Hiker_HikerModal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modal/Hiker/HikerModal.js */ "./src/components/Modal/Hiker/HikerModal.js");
/* harmony import */ var _Modal_Tower_TowerModal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Modal/Tower/TowerModal.js */ "./src/components/Modal/Tower/TowerModal.js");
/* harmony import */ var _Settings_Settings_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Settings/Settings.js */ "./src/components/Settings/Settings.js");
/* harmony import */ var _Settings_SettingsComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Settings/SettingsComponent.js */ "./src/components/Settings/SettingsComponent.js");
/* harmony import */ var _Settings_TrackSafetySettings_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Settings/TrackSafetySettings.js */ "./src/components/Settings/TrackSafetySettings.js");
/* harmony import */ var _Tower_TowerControls_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Tower/TowerControls.js */ "./src/components/Tower/TowerControls.js");
/* harmony import */ var _Tower_TowerManager_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Tower/TowerManager.js */ "./src/components/Tower/TowerManager.js");
// Main components barrel export - centralizes all component imports
// Similar to Next.js routing system

// Map components


// Sidebar components  


// Modal components



// Settings components




// Tower components

 

/***/ }),

/***/ "./src/models/Tower.js":
/*!*****************************!*\
  !*** ./src/models/Tower.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Tower Model - Represents a communication tower or basecamp
 */
class Tower {
  /**
   * Create a new Tower
   * @param {string|number} id - Unique identifier for the tower
   * @param {string} name - Tower name
   * @param {number} lat - Latitude coordinate
   * @param {number} lon - Longitude coordinate
   * @param {string} type - Tower type ('Tower' or 'Basecamp')
   * @param {string} status - Tower status ('Active', 'Maintenance', 'Offline')
   * @param {number} coverageRadius - Coverage radius in meters
   * @param {Object} options - Additional options
   */
  constructor(id, name, lat, lon, type = 'Tower', status = 'Active', coverageRadius = 500, options = {}) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.type = type; // 'Tower' or 'Basecamp'
    this.status = status; // 'Active', 'Maintenance', 'Offline'
    this.coverageRadius = coverageRadius; // Coverage radius in meters
    this.lastUpdate = Date.now();
    
    // Deprecated: keeping for backward compatibility but will be removed
    this.coverageRange = options.coverageRange || this.coverageRadius;
    
    // Type-specific properties
    if (type === 'Tower') {
      this.antennaHeight = options.antennaHeight || 20 + Math.random() * 30; // 20-50m
      this.powerSource = options.powerSource || 'Grid';
      this.frequency = options.frequency || '2.4GHz';
    } else if (type === 'Basecamp') {
      this.capacity = options.capacity || 10 + Math.random() * 20; // 10-30 people
      this.facilities = options.facilities || ['Shelter', 'First Aid', 'Communication'];
      this.commander = options.commander || null;
    }
    
    // Additional properties
    this.isOnline = status === 'Active';
    this.connectionCount = options.connectionCount || 0;
    this.lastMaintenance = options.lastMaintenance || null;
  }

  /**
   * Update tower location
   * @param {number} lat - New latitude
   * @param {number} lon - New longitude
   */
  updateLocation(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    this.lastUpdate = Date.now();
  }

  /**
   * Update tower status
   * @param {string} status - New status
   */
  updateStatus(status) {
    this.status = status;
    this.isOnline = status === 'Active';
    this.lastUpdate = Date.now();
  }

  /**
   * Update coverage radius
   * @param {number} radius - New coverage radius in meters
   */
  updateCoverageRadius(radius) {
    this.coverageRadius = Math.max(0, radius);
    this.coverageRange = this.coverageRadius; // Keep backward compatibility
    this.lastUpdate = Date.now();
  }

  /**
   * Get status icon based on current status
   * @returns {string} Font Awesome icon class
   */
  getStatusIcon() {
    switch(this.status) {
      case 'Active': return 'fa-check-circle';
      case 'Maintenance': return 'fa-wrench';
      case 'Offline': return 'fa-times-circle';
      default: return 'fa-question-circle';
    }
  }

  /**
   * Get type icon based on tower type
   * @returns {string} Lucide icon name
   */
  getTypeIcon() {
    return this.type === 'Tower' ? 'radio-tower' : 'house-wifi';
  }

  /**
   * Get status color
   * @returns {string} CSS color value
   */
  getStatusColor() {
    switch(this.status) {
      case 'Active': return '#48bb78';
      case 'Maintenance': return '#ed8936';
      case 'Offline': return '#f56565';
      default: return '#a0aec0';
    }
  }

  // Removed getCoverageColor method since we're only displaying numeric values

  /**
   * Check if tower is operational
   * @returns {boolean} True if tower is active and has coverage
   */
  isOperational() {
    return this.status === 'Active' && this.coverageRadius > 0;
  }

  /**
   * Get connection capacity (for basecamps)
   * @returns {number|null} Maximum capacity or null for towers
   */
  getCapacity() {
    return this.type === 'Basecamp' ? this.capacity : null;
  }

  /**
   * Get remaining capacity (for basecamps)
   * @returns {number|null} Remaining capacity or null for towers
   */
  getRemainingCapacity() {
    if (this.type === 'Basecamp') {
      return Math.max(0, this.capacity - this.connectionCount);
    }
    return null;
  }

  /**
   * Add connection to tower
   * @returns {boolean} Success status
   */
  addConnection() {
    if (this.type === 'Basecamp' && this.connectionCount < this.capacity) {
      this.connectionCount++;
      this.lastUpdate = Date.now();
      return true;
    } else if (this.type === 'Tower') {
      this.connectionCount++;
      this.lastUpdate = Date.now();
      return true;
    }
    return false;
  }

  /**
   * Remove connection from tower
   * @returns {boolean} Success status
   */
  removeConnection() {
    if (this.connectionCount > 0) {
      this.connectionCount--;
      this.lastUpdate = Date.now();
      return true;
    }
    return false;
  }

  /**
   * Convert tower to plain object for serialization
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      lat: this.lat,
      lon: this.lon,
      type: this.type,
      status: this.status,
      coverageRadius: this.coverageRadius,
      lastUpdate: this.lastUpdate,
      coverageRange: this.coverageRange, // Backward compatibility
      antennaHeight: this.antennaHeight,
      powerSource: this.powerSource,
      frequency: this.frequency,
      capacity: this.capacity,
      facilities: this.facilities,
      commander: this.commander,
      isOnline: this.isOnline,
      connectionCount: this.connectionCount,
      lastMaintenance: this.lastMaintenance
    };
  }

  /**
   * Create Tower instance from plain object
   * @param {Object} data - Plain object data
   * @returns {Tower} Tower instance
   */
  static fromJSON(data) {
    const tower = new Tower(
      data.id,
      data.name,
      data.lat,
      data.lon,
      data.type,
      data.status,
      data.coverageRadius || data.signalStrength || 500, // Backward compatibility
      {
        coverageRange: data.coverageRange,
        antennaHeight: data.antennaHeight,
        powerSource: data.powerSource,
        frequency: data.frequency,
        capacity: data.capacity,
        facilities: data.facilities,
        commander: data.commander,
        connectionCount: data.connectionCount,
        lastMaintenance: data.lastMaintenance
      }
    );
    
    tower.lastUpdate = data.lastUpdate || Date.now();
    return tower;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tower); 

/***/ }),

/***/ "./src/modules/TrackSafetyModule.js":
/*!******************************************!*\
  !*** ./src/modules/TrackSafetyModule.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_TrackSafetyManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/TrackSafetyManager */ "./src/utils/TrackSafetyManager.js");
/* harmony import */ var _components_Settings_TrackSafetySettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Settings/TrackSafetySettings */ "./src/components/Settings/TrackSafetySettings.js");
/**
 * Track Safety Module - Integrates track safety features into the application
 */



class TrackSafetyModule {
  /**
   * Initialize the Track Safety Module
   * @param {Object} app - Reference to the main application
   * @param {Object} map - Reference to the map component
   * @param {Object} hikerManager - Reference to the hiker manager
   * @param {Object} notificationManager - Reference to the notification manager
   */
  constructor(app, map, hikerManager, notificationManager) {
    this.app = app;
    this.map = map;
    this.hikerManager = hikerManager;
    this.notificationManager = notificationManager;
    
    // Initialize the track safety manager
    this.trackManager = new _utils_TrackSafetyManager__WEBPACK_IMPORTED_MODULE_0__["default"](map?.getMap());
    
    // Initialize track safety settings component
    this.safetySettings = new _components_Settings_TrackSafetySettings__WEBPACK_IMPORTED_MODULE_1__["default"](this.trackManager, map?.getMap());
    
    // Initialize track safety state
    this.enabled = true;
    this.highlightUnsafeHikers = true;
    this.trackDeviationThreshold = 50;
    this.trackDeviationNotificationsEnabled = true;
    
    // Store references to hikers that are off track
    this.offTrackHikers = new Set();
    
    // Bind methods
    this.updateHikerSafety = this.updateHikerSafety.bind(this);
    this.setEnabled = this.setEnabled.bind(this);
  }
  
  /**
   * Initialize the module
   */
  init() {
    // Initialize track safety settings UI
    this.safetySettings.init();
    
    // Start monitoring hikers if enabled
    if (this.enabled) {
      this.startMonitoring();
    }
    
    // Set up hook for when hikers are updated
    if (this.hikerManager) {
      this.hikerManager.onHikersUpdated(this.checkAllHikersSafety.bind(this));
    }
    
    return this;
  }
  
  /**
   * Set map reference for visualization
   * @param {Object} map - Map component
   */
  setMap(map) {
    this.map = map;
    const mapObject = map?.getMap();
    
    // Update map references in child components
    this.trackManager.setMap(mapObject);
    this.safetySettings.setMap(mapObject);
  }
  
  /**
   * Enable or disable track safety
   * @param {boolean} enabled - Whether track safety is enabled
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    
    if (enabled) {
      this.startMonitoring();
    } else {
      this.stopMonitoring();
    }
  }
  
  /**
   * Set whether to highlight unsafe hikers on the map
   * @param {boolean} highlight - Whether to highlight unsafe hikers
   */
  setHighlightUnsafeHikers(highlight) {
    this.highlightUnsafeHikers = highlight;
    
    // Update hikers' visual state if needed
    if (this.hikerManager) {
      if (highlight) {
        // Apply highlighting to all currently off-track hikers
        this.offTrackHikers.forEach(hikerId => {
          const marker = this.hikerManager.getHikerMarker(hikerId);
          if (marker) {
            this.highlightHikerMarker(marker);
          }
        });
      } else {
        // Remove highlighting from all hikers
        this.offTrackHikers.forEach(hikerId => {
          const marker = this.hikerManager.getHikerMarker(hikerId);
          if (marker) {
            this.resetHikerMarker(marker);
          }
        });
      }
    }
  }
  
  /**
   * Set the track deviation threshold for notifications
   * @param {number} threshold - Threshold in meters
   */
  setTrackDeviationThreshold(threshold) {
    this.trackDeviationThreshold = threshold;
  }
  
  /**
   * Enable or disable track deviation notifications
   * @param {boolean} enabled - Whether track deviation notifications are enabled
   */
  setTrackDeviationNotifications(enabled) {
    this.trackDeviationNotificationsEnabled = enabled;
  }
  
  /**
   * Apply settings from the settings component
   * @param {Object} settings - Settings object
   */
  applySettings(settings) {
    if (settings) {
      // Apply safety settings
      this.setEnabled(settings.safety?.enableTrackSafety ?? true);
      this.setHighlightUnsafeHikers(settings.safety?.highlightUnsafeHikers ?? true);
      
      // Apply notification settings
      this.setTrackDeviationNotifications(settings.notifications?.trackDeviationAlerts ?? true);
      this.setTrackDeviationThreshold(settings.notifications?.trackDeviationThreshold ?? 50);
    }
  }
  
  /**
   * Start monitoring hikers for track safety
   */
  startMonitoring() {
    // Check all current hikers initially
    this.checkAllHikersSafety();
  }
  
  /**
   * Stop monitoring hikers for track safety
   */
  stopMonitoring() {
    // Remove all highlights if we're disabling monitoring
    if (this.highlightUnsafeHikers && this.hikerManager) {
      this.offTrackHikers.forEach(hikerId => {
        const marker = this.hikerManager.getHikerMarker(hikerId);
        if (marker) {
          this.resetHikerMarker(marker);
        }
      });
    }
    
    this.offTrackHikers.clear();
  }
  
  /**
   * Check all hikers' safety
   */
  checkAllHikersSafety() {
    if (!this.enabled || !this.hikerManager) return;
    
    const hikers = this.hikerManager.getAllHikers();
    
    hikers.forEach(hiker => {
      this.updateHikerSafety(hiker);
    });
  }
  
  /**
   * Update a hiker's safety status
   * @param {Object} hiker - Hiker object
   */
  updateHikerSafety(hiker) {
    if (!this.enabled || !hiker || !hiker.id || !hiker.position) return;
    
    // Check if the hiker is within a safe track
    const safetyInfo = this.trackManager.checkHikerSafety({
      lng: hiker.position.longitude,
      lat: hiker.position.latitude
    });
    
    // Update hiker's safety status
    hiker.safety = {
      isOnTrack: safetyInfo.isOnTrack,
      trackId: safetyInfo.trackId,
      trackName: safetyInfo.trackName,
      distanceFromTrack: safetyInfo.distanceFromTrack,
      isSafe: safetyInfo.isSafe
    };
    
    // Handle unsafe hikers
    if (!safetyInfo.isOnTrack) {
      this.handleUnsafeHiker(hiker, safetyInfo);
    } else if (this.offTrackHikers.has(hiker.id)) {
      // Hiker returned to track - reset their state
      this.handleHikerReturnedToTrack(hiker);
    }
  }
  
  /**
   * Handle a hiker that is off track
   * @param {Object} hiker - Hiker object
   * @param {Object} safetyInfo - Safety information
   */
  handleUnsafeHiker(hiker, safetyInfo) {
    // Check if the hiker is already known to be off track
    const isNewlyOffTrack = !this.offTrackHikers.has(hiker.id);
    
    // Add to set of off-track hikers
    this.offTrackHikers.add(hiker.id);
    
    // Apply visual highlighting if enabled
    if (this.highlightUnsafeHikers) {
      const marker = this.hikerManager.getHikerMarker(hiker.id);
      if (marker) {
        this.highlightHikerMarker(marker);
      }
    }
    
    // Send notification if enabled and deviation exceeds threshold
    if (isNewlyOffTrack && 
        this.trackDeviationNotificationsEnabled && 
        safetyInfo.distanceFromTrack > this.trackDeviationThreshold && 
        this.notificationManager) {
      
      this.notificationManager.notify({
        title: `${hiker.name} Off Track`,
        message: `${hiker.name} has deviated ${Math.round(safetyInfo.distanceFromTrack)}m from the designated track`,
        type: 'warning',
        icon: 'exclamation-triangle',
        autoClose: 7000,
        data: {
          hikerId: hiker.id,
          distanceFromTrack: safetyInfo.distanceFromTrack,
          trackId: safetyInfo.trackId
        }
      });
    }
  }
  
  /**
   * Handle a hiker that has returned to track
   * @param {Object} hiker - Hiker object
   */
  handleHikerReturnedToTrack(hiker) {
    // Remove from set of off-track hikers
    this.offTrackHikers.delete(hiker.id);
    
    // Reset visual styling
    if (this.highlightUnsafeHikers) {
      const marker = this.hikerManager.getHikerMarker(hiker.id);
      if (marker) {
        this.resetHikerMarker(marker);
      }
    }
    
    // Send a notification if notifications are enabled
    if (this.trackDeviationNotificationsEnabled && this.notificationManager) {
      this.notificationManager.notify({
        title: `${hiker.name} Returned to Track`,
        message: `${hiker.name} is now back on a designated safe track`,
        type: 'success',
        icon: 'check-circle',
        autoClose: 5000,
        data: {
          hikerId: hiker.id
        }
      });
    }
  }
  
  /**
   * Highlight a hiker marker to indicate it's off track
   * @param {Object} marker - Leaflet marker object
   */
  highlightHikerMarker(marker) {
    if (!marker) return;
    
    // Add a pulsing effect to the marker
    const icon = marker.getIcon();
    const element = marker.getElement();
    
    if (element) {
      // Add off-track class for styling
      element.classList.add('off-track-hiker');
      
      // If it's using a div icon, we can modify its inner HTML
      if (element.querySelector('.hiker-marker')) {
        const markerContent = element.querySelector('.hiker-marker');
        if (markerContent) {
          // Add a warning border
          markerContent.style.border = '2px solid #ff8c00';
          markerContent.style.boxShadow = '0 0 10px rgba(255, 140, 0, 0.7)';
        }
      }
    }
  }
  
  /**
   * Reset a hiker marker to normal appearance
   * @param {Object} marker - Leaflet marker object
   */
  resetHikerMarker(marker) {
    if (!marker) return;
    
    const element = marker.getElement();
    
    if (element) {
      // Remove off-track class
      element.classList.remove('off-track-hiker');
      
      // Reset custom styling
      if (element.querySelector('.hiker-marker')) {
        const markerContent = element.querySelector('.hiker-marker');
        if (markerContent) {
          markerContent.style.border = '';
          markerContent.style.boxShadow = '';
        }
      }
    }
  }
  
  /**
   * Add necessary CSS styles for track safety
   */
  addStyles() {
    if (document.getElementById('track-safety-module-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'track-safety-module-styles';
    style.textContent = `
      .off-track-hiker {
        animation: pulse 1.5s infinite;
        z-index: 1000 !important;
      }
      
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Get the track safety manager
   * @returns {TrackSafetyManager}
   */
  getTrackManager() {
    return this.trackManager;
  }
  
  /**
   * Get the track safety settings component
   * @returns {TrackSafetySettings}
   */
  getSettingsComponent() {
    return this.safetySettings;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrackSafetyModule); 

/***/ }),

/***/ "./src/modules/index.js":
/*!******************************!*\
  !*** ./src/modules/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackSafetyModule: () => (/* reexport safe */ _TrackSafetyModule_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _TrackSafetyModule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrackSafetyModule.js */ "./src/modules/TrackSafetyModule.js");
// Modules barrel export
 

/***/ }),

/***/ "./src/utils/TrackSafetyManager.js":
/*!*****************************************!*\
  !*** ./src/utils/TrackSafetyManager.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * TrackSafetyManager - Utility for creating and managing hiking tracks with safety corridors
 * Allows admins to define safe paths and monitor if hikers stay within acceptable distance
 */
class TrackSafetyManager {
  /**
   * Initialize the Track Safety Manager
   * @param {Object} map - Reference to the map object for visualization
   */
  constructor(map = null) {
    this.map = map;
    this.tracks = [];
    this.activeTrackId = null;
    this.isCreatingTrack = false;
    this.tempTrackPoints = [];
    this.saveCallback = null;
    
    // Load saved tracks from localStorage if available
    this.loadTracks();
  }

  /**
   * Set the map reference for visualization
   * @param {Object} map - The map object
   */
  setMap(map) {
    this.map = map;
    this.displayAllTracks();
  }

  /**
   * Start creating a new track
   * @param {Function} saveCallback - Called when track is saved
   */
  startTrackCreation(saveCallback = null) {
    this.isCreatingTrack = true;
    this.tempTrackPoints = [];
    this.saveCallback = saveCallback;
    
    if (this.map) {
      // Change cursor to indicate track creation mode
      // Leaflet doesn't have getCanvas() like Mapbox GL
      // Instead, we'll modify the container's style or add a class
      const mapContainer = this.map.getContainer();
      if (mapContainer) {
        mapContainer.style.cursor = 'crosshair';
      }
      
      // Add click listener for adding track points
      this.map.on('click', this.handleMapClick.bind(this));
    }
    
    return this;
  }

  /**
   * Handle map click during track creation
   * @param {Object} e - Click event
   */
  handleMapClick(e) {
    if (!this.isCreatingTrack) return;
    
    // Get clicked coordinates - use Leaflet's e.latlng instead of Mapbox's e.lngLat
    const point = [e.latlng.lng, e.latlng.lat];
    this.tempTrackPoints.push(point);
    
    // Visualize current track being created
    this.displayTempTrack();
    
    // Show a temporary marker at the clicked point for feedback
    this.showTemporaryMarker(point);
  }

  /**
   * Show a temporary marker at a clicked point
   * @param {Array} point - [lng, lat] coordinates
   */
  showTemporaryMarker(point) {
    if (!this.map) return;
    
    // Create a pulsing marker at the clicked point
    const marker = L.circleMarker(
      [point[1], point[0]], // Convert [lng, lat] to [lat, lng] for Leaflet
      {
        radius: 8,
        fillColor: '#ffcc00',
        color: 'white',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.8
      }
    ).addTo(this.map);
    
    // Create pulsing effect by changing radius
    let size = 8;
    let growing = false;
    
    const pulseInterval = setInterval(() => {
      if (growing) {
        size += 1;
        if (size >= 15) growing = false;
      } else {
        size -= 1;
        if (size <= 8) growing = true;
      }
      
      marker.setRadius(size);
    }, 50);
    
    // Remove the marker after 1 second
    setTimeout(() => {
      clearInterval(pulseInterval);
      this.map.removeLayer(marker);
    }, 1000);
  }

  /**
   * Display the temporary track being created
   */
  displayTempTrack() {
    if (!this.map || this.tempTrackPoints.length < 1) return;
    
    // Remove existing temp track layer if exists
    if (this.tempTrackLayer) {
      this.map.removeLayer(this.tempTrackLayer);
    }
    
    // Create polyline for the temp track
    this.tempTrackLayer = L.polyline(
      this.tempTrackPoints.map(point => [point[1], point[0]]), // Convert [lng, lat] to [lat, lng] for Leaflet
      {
        color: '#00bfff',
        weight: 4,
        opacity: 0.8,
        dashArray: '5, 10'
      }
    ).addTo(this.map);
    
    // Remove existing waypoint markers
    if (this.tempMarkers) {
      this.tempMarkers.forEach(marker => {
        this.map.removeLayer(marker);
      });
    }
    
    // Create array for temporary markers
    this.tempMarkers = [];
    
    // Add points for each waypoint
    this.tempTrackPoints.forEach((point, index) => {
      const marker = L.circleMarker(
        [point[1], point[0]], // Convert [lng, lat] to [lat, lng] for Leaflet
        {
          radius: 6,
          fillColor: '#ffffff',
          color: '#00bfff',
          weight: 2,
          opacity: 1,
          fillOpacity: 1
        }
      ).addTo(this.map);
      
      this.tempMarkers.push(marker);
    });
  }

  /**
   * Save the current track being created
   * @param {string} name - Name of the track
   * @param {number} safetyWidth - Width of the safety corridor in meters
   * @param {string} description - Description of the track
   */
  saveTrack(name, safetyWidth, description = '') {
    if (this.tempTrackPoints.length < 2) {
      console.warn('Cannot save track with less than 2 points');
      return false;
    }
    
    const trackId = `track_${Date.now()}`;
    const newTrack = {
      id: trackId,
      name,
      description,
      safetyWidth,
      points: this.tempTrackPoints,
      createdAt: new Date().toISOString()
    };
    
    this.tracks.push(newTrack);
    this.saveTracks();
    this.displayTrack(newTrack);
    
    // Reset track creation
    this.isCreatingTrack = false;
    this.tempTrackPoints = [];
    
    // Remove temp track visualization
    if (this.map) {
      // Reset cursor style
      const mapContainer = this.map.getContainer();
      if (mapContainer) {
        mapContainer.style.cursor = '';
      }
      
      this.map.off('click', this.handleMapClick.bind(this));
      
      // Remove temporary track layer
      if (this.tempTrackLayer) {
        this.map.removeLayer(this.tempTrackLayer);
        this.tempTrackLayer = null;
      }
      
      // Remove temporary markers
      if (this.tempMarkers && this.tempMarkers.length > 0) {
        this.tempMarkers.forEach(marker => {
          this.map.removeLayer(marker);
        });
        this.tempMarkers = [];
      }
    }
    
    // Call save callback if provided
    if (this.saveCallback) {
      this.saveCallback(newTrack);
      this.saveCallback = null;
    }
    
    return trackId;
  }

  /**
   * Cancel track creation
   */
  cancelTrackCreation() {
    this.isCreatingTrack = false;
    this.tempTrackPoints = [];
    
    // Remove temp track visualization
    if (this.map) {
      // Reset cursor style
      const mapContainer = this.map.getContainer();
      if (mapContainer) {
        mapContainer.style.cursor = '';
      }
      
      this.map.off('click', this.handleMapClick.bind(this));
      
      // Remove temporary track layer
      if (this.tempTrackLayer) {
        this.map.removeLayer(this.tempTrackLayer);
        this.tempTrackLayer = null;
      }
      
      // Remove temporary markers
      if (this.tempMarkers && this.tempMarkers.length > 0) {
        this.tempMarkers.forEach(marker => {
          this.map.removeLayer(marker);
        });
        this.tempMarkers = [];
      }
    }
    
    this.saveCallback = null;
  }

  /**
   * Display a single track on the map
   * @param {Object} track - Track object to display
   */
  displayTrack(track) {
    if (!this.map || !track || track.points.length < 2) return;
    
    // Clean up existing track elements if present
    if (track.elements) {
      if (track.elements.trackLine) this.map.removeLayer(track.elements.trackLine);
      if (track.elements.corridor) this.map.removeLayer(track.elements.corridor);
      if (track.elements.waypoints) {
        track.elements.waypoints.forEach(marker => this.map.removeLayer(marker));
      }
    }
    
    // Initialize track elements object
    track.elements = {
      waypoints: []
    };
    
    // Create the track polyline
    track.elements.trackLine = L.polyline(
      track.points.map(point => [point[1], point[0]]), // Convert [lng, lat] to [lat, lng] for Leaflet
      {
        color: '#3388ff',
        weight: 4,
        opacity: 0.8
      }
    ).addTo(this.map);
    
    // Create a safety corridor around the track
    const corridorPoints = this.createCorridorPolygon(track.points, track.safetyWidth);
    
    track.elements.corridor = L.polygon(
      corridorPoints.map(point => [point[1], point[0]]), // Convert [lng, lat] to [lat, lng] for Leaflet
      {
        color: '#3388ff',
        weight: 1,
        opacity: 0.4,
        fillColor: '#3388ff',
        fillOpacity: 0.2
      }
    ).addTo(this.map);
    
    // Add waypoint markers
    track.points.forEach((point, index) => {
      // Only add markers for first, last, and every 3rd point to avoid clutter
      if (index === 0 || index === track.points.length - 1 || index % 3 === 0) {
        const color = index === 0 ? '#00ff00' : 
                     index === track.points.length - 1 ? '#ff0000' : '#3388ff';
        
        const marker = L.circleMarker(
          [point[1], point[0]], // Convert [lng, lat] to [lat, lng] for Leaflet
          {
            radius: 5,
            fillColor: color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 1
          }
        ).addTo(this.map);
        
        track.elements.waypoints.push(marker);
      }
    });
  }

  /**
   * Create a corridor polygon around a track line with the specified width
   * @param {Array} points - Array of [lng, lat] coordinates defining the track
   * @param {number} width - Width of the corridor in meters
   * @returns {Array} Array of corridor points forming a polygon
   */
  createCorridorPolygon(points, widthMeters) {
    if (points.length < 2) return [];
    
    // Convert width from meters to approximate degrees
    // This is a simplification and not accurate for all latitudes
    // For a production app, you would use a proper geospatial library
    const lat = points[0][1]; // Use the latitude of the first point
    // Approximate conversion at this latitude (rough estimate)
    const metersPerDegreeLat = 111320; // approximate meters per degree latitude
    const metersPerDegreeLng = 111320 * Math.cos(lat * Math.PI / 180);
    
    const widthLat = widthMeters / metersPerDegreeLat;
    const widthLng = widthMeters / metersPerDegreeLng;
    
    // For each segment, calculate perpendicular offset points
    const corridorPoints = [];
    
    // Generate left side of corridor (going forward)
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      
      // Calculate perpendicular direction (90 degrees to track direction)
      const dx = p2[0] - p1[0];
      const dy = p2[1] - p1[1];
      const length = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize and rotate 90 degrees
      const perpX = -dy / length;
      const perpY = dx / length;
      
      // Add offset point to left side
      corridorPoints.push([
        p1[0] + perpX * widthLng,
        p1[1] + perpY * widthLat
      ]);
    }
    
    // Add last point offset
    const lastIdx = points.length - 1;
    const secondLastIdx = points.length - 2;
    const dx = points[lastIdx][0] - points[secondLastIdx][0];
    const dy = points[lastIdx][1] - points[secondLastIdx][1];
    const length = Math.sqrt(dx * dx + dy * dy);
    const perpX = -dy / length;
    const perpY = dx / length;
    
    corridorPoints.push([
      points[lastIdx][0] + perpX * widthLng,
      points[lastIdx][1] + perpY * widthLat
    ]);
    
    // Generate right side of corridor (going backward)
    for (let i = points.length - 1; i > 0; i--) {
      const p1 = points[i];
      const p2 = points[i - 1];
      
      const dx = p1[0] - p2[0];
      const dy = p1[1] - p2[1];
      const length = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize and rotate -90 degrees
      const perpX = dy / length;
      const perpY = -dx / length;
      
      // Add offset point to right side
      corridorPoints.push([
        p1[0] + perpX * widthLng,
        p1[1] + perpY * widthLat
      ]);
    }
    
    // Close the polygon
    corridorPoints.push(corridorPoints[0]);
    
    return corridorPoints;
  }

  /**
   * Display all tracks on the map
   */
  displayAllTracks() {
    if (!this.map) return;
    
    // Clear existing track layers
    this.clearTrackLayers();
    
    // Display each track
    this.tracks.forEach(track => {
      this.displayTrack(track);
    });
  }

  /**
   * Clear all track layers from the map
   */
  clearTrackLayers() {
    if (!this.map) return;
    
    this.tracks.forEach(track => {
      if (track.elements) {
        if (track.elements.trackLine) this.map.removeLayer(track.elements.trackLine);
        if (track.elements.corridor) this.map.removeLayer(track.elements.corridor);
        if (track.elements.waypoints) {
          track.elements.waypoints.forEach(marker => this.map.removeLayer(marker));
        }
      }
    });
  }

  /**
   * Edit an existing track
   * @param {string} trackId - ID of the track to edit
   * @param {Function} saveCallback - Called when track is saved
   */
  editTrack(trackId, saveCallback = null) {
    const trackIndex = this.tracks.findIndex(t => t.id === trackId);
    if (trackIndex === -1) return false;
    
    this.activeTrackId = trackId;
    this.isCreatingTrack = true;
    this.tempTrackPoints = [...this.tracks[trackIndex].points];
    this.saveCallback = saveCallback;
    
    // Display current track points for editing
    this.displayTempTrack();
    
    if (this.map) {
      // Change cursor to indicate track creation mode
      const mapContainer = this.map.getContainer();
      if (mapContainer) {
        mapContainer.style.cursor = 'crosshair';
      }
      
      this.map.on('click', this.handleMapClick.bind(this));
    }
    
    return true;
  }

  /**
   * Delete a track
   * @param {string} trackId - ID of the track to delete
   */
  deleteTrack(trackId) {
    const trackIndex = this.tracks.findIndex(t => t.id === trackId);
    if (trackIndex === -1) return false;
    
    const track = this.tracks[trackIndex];
    
    // Remove track visualization from map
    if (this.map && track.elements) {
      if (track.elements.trackLine) this.map.removeLayer(track.elements.trackLine);
      if (track.elements.corridor) this.map.removeLayer(track.elements.corridor);
      if (track.elements.waypoints) {
        track.elements.waypoints.forEach(marker => this.map.removeLayer(marker));
      }
    }
    
    // Remove track from array
    this.tracks.splice(trackIndex, 1);
    
    // Save updated tracks
    this.saveTracks();
    
    return true;
  }

  /**
   * Save tracks to localStorage
   */
  saveTracks() {
    try {
      localStorage.setItem('hikerTrackerTracks', JSON.stringify(this.tracks));
    } catch (error) {
      console.error('Error saving tracks to localStorage:', error);
    }
  }

  /**
   * Load tracks from localStorage
   */
  loadTracks() {
    try {
      const savedTracks = localStorage.getItem('hikerTrackerTracks');
      if (savedTracks) {
        this.tracks = JSON.parse(savedTracks);
      }
    } catch (error) {
      console.error('Error loading tracks from localStorage:', error);
      this.tracks = [];
    }
  }

  /**
   * Check if a hiker is within a safe corridor of any track
   * @param {Object} hikerPosition - {lng, lat} object of hiker position
   * @returns {Object} Result with safety information
   */
  checkHikerSafety(hikerPosition) {
    if (!hikerPosition || this.tracks.length === 0) {
      return {
        isOnTrack: false,
        trackId: null,
        trackName: null,
        distanceFromTrack: Infinity,
        isSafe: false
      };
    }
    
    let closestTrackInfo = null;
    let minDistance = Infinity;
    
    // Check distance to each track
    this.tracks.forEach(track => {
      const trackInfo = this.getDistanceToTrack(hikerPosition, track);
      
      if (trackInfo.distance < minDistance) {
        minDistance = trackInfo.distance;
        closestTrackInfo = {
          trackId: track.id,
          trackName: track.name,
          distanceFromTrack: trackInfo.distance,
          closestPointIndex: trackInfo.segmentIndex,
          isOnTrack: trackInfo.distance <= track.safetyWidth,
          isSafe: trackInfo.distance <= track.safetyWidth
        };
      }
    });
    
    if (!closestTrackInfo) {
      return {
        isOnTrack: false,
        trackId: null,
        trackName: null,
        distanceFromTrack: Infinity,
        isSafe: false
      };
    }
    
    return closestTrackInfo;
  }

  /**
   * Calculate minimum distance from a point to a track
   * @param {Object} point - {lng, lat} object
   * @param {Object} track - Track object
   * @returns {Object} Distance information
   */
  getDistanceToTrack(point, track) {
    if (!point || !track || !track.points || track.points.length < 2) {
      return { distance: Infinity, segmentIndex: -1 };
    }
    
    let minDistance = Infinity;
    let closestSegmentIndex = -1;
    
    // Check each segment of the track
    for (let i = 0; i < track.points.length - 1; i++) {
      const segmentStart = track.points[i];
      const segmentEnd = track.points[i + 1];
      
      const distance = this.distanceToSegment(
        point.lng, point.lat,
        segmentStart[0], segmentStart[1],
        segmentEnd[0], segmentEnd[1]
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestSegmentIndex = i;
      }
    }
    
    // Convert approximate degrees to meters (rough estimate)
    // For a production app, use a proper geospatial library
    const lat = point.lat;
    const metersPerDegreeLat = 111320; // approximate meters per degree latitude
    const metersPerDegreeLng = 111320 * Math.cos(lat * Math.PI / 180);
    
    // Average conversion factor for simplicity
    const avgFactor = (metersPerDegreeLat + metersPerDegreeLng) / 2;
    const distanceMeters = minDistance * avgFactor;
    
    return {
      distance: distanceMeters,
      segmentIndex: closestSegmentIndex
    };
  }

  /**
   * Calculate minimum distance from a point to a line segment
   * @param {number} px - Point x coordinate
   * @param {number} py - Point y coordinate
   * @param {number} x1 - Line segment start x
   * @param {number} y1 - Line segment start y
   * @param {number} x2 - Line segment end x
   * @param {number} y2 - Line segment end y
   * @returns {number} Distance
   */
  distanceToSegment(px, py, x1, y1, x2, y2) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    
    if (len_sq !== 0) {
      param = dot / len_sq;
    }
    
    let xx, yy;
    
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
    
    const dx = px - xx;
    const dy = py - yy;
    
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Get all tracks
   * @returns {Array} All tracks
   */
  getAllTracks() {
    return this.tracks;
  }

  /**
   * Get a track by ID
   * @param {string} trackId - ID of the track
   * @returns {Object} Track object or null if not found
   */
  getTrackById(trackId) {
    return this.tracks.find(t => t.id === trackId) || null;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrackSafetyManager); 

/***/ }),

/***/ "./src/utils/firebase.js":
/*!*******************************!*\
  !*** ./src/utils/firebase.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchHikersFromFirebase: () => (/* binding */ fetchHikersFromFirebase),
/* harmony export */   listenForHikersUpdates: () => (/* binding */ listenForHikersUpdates),
/* harmony export */   updateHikerActiveStatus: () => (/* binding */ updateHikerActiveStatus),
/* harmony export */   updateHikerData: () => (/* binding */ updateHikerData),
/* harmony export */   updateHikerSosStatus: () => (/* binding */ updateHikerSosStatus),
/* harmony export */   updateNodeName: () => (/* binding */ updateNodeName)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/esm/index.esm.js");
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/database */ "./node_modules/firebase/database/dist/esm/index.esm.js");
/**
 * Firebase configuration and data fetching utilities
 */



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASPVcTGt_-Her5-40LHWcw7nlq-kI_o1g",
  authDomain: "trackers-5dd51.firebaseapp.com",
  databaseURL: "https://trackers-5dd51-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trackers-5dd51",
  storageBucket: "trackers-5dd51.firebasestorage.app",
  messagingSenderId: "434709020554",
  appId: "1:434709020554:web:c9b5fe4791350c52741273",
  measurementId: "G-LC52SPP7TF"
};

// Initialize Firebase app
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const database = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.getDatabase)(app);

/**
 * Safely parse timestamp from server data
 * @param {*} timestamp - Timestamp from server (could be in time field too)
 * @returns {number} Valid timestamp in milliseconds
 */
function parseTimestamp(timestamp) {
  if (!timestamp) return Date.now();
  
  // If it's already a number, ensure it's a valid timestamp
  if (typeof timestamp === 'number') {
    // Check if it's a recent timestamp (within the last year)
    const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
    if (timestamp > oneYearAgo) return timestamp;
    
    // If it's in seconds format (UNIX timestamp), convert to milliseconds
    if (timestamp < 10000000000) return timestamp * 1000;
    
    return timestamp;
  }
  
  // If it's a string, try to parse it
  if (typeof timestamp === 'string') {
    // Handle time format like "03:39:05" (local time)
    if (timestamp.includes(':')) {
      try {
        // Get current date
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        
        // Parse hours, minutes, seconds
        const [hours, minutes, seconds] = timestamp.split(':').map(Number);
        
        // Create date in local time
        const date = new Date(year, month, day, hours, minutes, seconds);
        
        console.log(`Parsed time string "${timestamp}" to:`, {
          localTime: date.toString(),
          milliseconds: date.getTime()
        });
        
        return date.getTime();
      } catch (error) {
        console.error('Error parsing time string:', error);
      }
    }
    
    // Try parsing as number
    const numericTimestamp = Number(timestamp);
    if (!isNaN(numericTimestamp)) {
      // If it's a small number, assume it's seconds and convert to milliseconds
      if (numericTimestamp < 10000000000) return numericTimestamp * 1000;
      return numericTimestamp;
    }
    
    // Try parsing as date string
    const dateTimestamp = new Date(timestamp).getTime();
    if (!isNaN(dateTimestamp)) return dateTimestamp;
  }
  
  // Default to current time if parsing fails
  console.warn(`Failed to parse timestamp: ${timestamp}, using current time instead`);
  return Date.now();
}

/**
 * Calculate the distance between two coordinates in meters using the Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in meters
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d; // Distance in meters
}

/**
 * Determine hiker's movement status based on recent location logs
 * @param {Array} logs - Array of log entries sorted by timestamp (newest first)
 * @returns {string} Movement status: "Moving", "Active", "Resting", or "Unknown"
 */
function determineMovementStatus(logs) {
  // Need at least 2 logs to determine movement
  if (!logs || logs.length < 2) {
    return "Unknown";
  }

  // Configuration values
  const MOVING_THRESHOLD = 5; // meters per minute to be considered "Moving"
  const ACTIVE_THRESHOLD = 2; // meters per minute to be considered "Active"
  const TIME_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds
  
  // Get the most recent log
  const latestLog = logs[0];
  const latestTime = parseTimestamp(latestLog.timestamp || latestLog.time);
  const latestLat = parseFloat(latestLog.latitude) || 0;
  const latestLon = parseFloat(latestLog.longitude) || 0;
  
  // Filter logs that are within the time window
  const recentLogs = logs.filter(log => {
    const logTime = parseTimestamp(log.timestamp || log.time);
    return (latestTime - logTime) <= TIME_WINDOW;
  });
  
  // Calculate distances and times between consecutive points
  let totalDistance = 0;
  let totalTimeMinutes = 0;
  
  for (let i = 0; i < recentLogs.length - 1; i++) {
    const currentLog = recentLogs[i];
    const previousLog = recentLogs[i + 1];
    
    const currentLat = parseFloat(currentLog.latitude) || 0;
    const currentLon = parseFloat(currentLog.longitude) || 0;
    const previousLat = parseFloat(previousLog.latitude) || 0;
    const previousLon = parseFloat(previousLog.longitude) || 0;
    
    const currentTime = parseTimestamp(currentLog.timestamp || currentLog.time);
    const previousTime = parseTimestamp(previousLog.timestamp || previousLog.time);
    
    // Calculate distance between points
    const distance = calculateDistance(currentLat, currentLon, previousLat, previousLon);
    
    // Calculate time difference in minutes
    const timeDiffMinutes = (currentTime - previousTime) / (1000 * 60);
    
    // Only count valid measurements
    if (timeDiffMinutes > 0) {
      totalDistance += distance;
      totalTimeMinutes += timeDiffMinutes;
    }
  }
  
  // Calculate average speed in meters per minute
  const averageSpeed = totalTimeMinutes > 0 ? (totalDistance / totalTimeMinutes) : 0;
  
  // Determine status based on average speed
  if (averageSpeed >= MOVING_THRESHOLD) {
    return "Moving";
  } else if (averageSpeed >= ACTIVE_THRESHOLD) {
    return "Active";
  } else {
    return "Resting";
  }
}

/**
 * Fetch hikers data from Firebase, getting the latest entry from logs for each hiker
 * @returns {Promise<Array>} Promise resolving to an array of hiker objects
 */
async function fetchHikersFromFirebase() {
  try {
    // Reference to the 'runners' node in the database
    const runnersRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(database, 'runners');
    
    // Get a snapshot of all runners
    const snapshot = await (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.get)(runnersRef);
    const runnersData = snapshot.val();
    
    console.log('Firebase data received:', runnersData);
    
    if (!runnersData) {
      console.warn('No hikers data found in Firebase.');
      return [];
    }
    
    // Import Hiker model
    const { default: Hiker } = await __webpack_require__.e(/*! import() */ "src_models_Hiker_js").then(__webpack_require__.bind(__webpack_require__, /*! ../models/Hiker.js */ "./src/models/Hiker.js"));
    
    // Transform data into Hiker objects
    const hikers = [];
    for (const nodeKey of Object.keys(runnersData)) {
      const nodeData = runnersData[nodeKey];
      console.log(`Processing runner ${nodeKey}:`, nodeData);
      
      // Get the name and active status from the node level
      const name = nodeData.name || `Hiker ${nodeKey}`;
      const isActive = nodeData.active !== false; // Default to active if not specified
      
      // Get tracking data from logs for this hiker
      let trackingData = {
        latitude: 0,
        longitude: 0,
        battery: 100,
        sos_status: false,
        timestamp: Date.now()
      };
      
      let logs = [];
      let movementStatus = "Unknown";
      
      if (nodeData.logs) {
        // Convert logs object to array and sort by timestamp
        logs = Object.values(nodeData.logs)
          .sort((a, b) => {
            // Use time field if timestamp is not available
            const aTime = a.timestamp || a.time;
            const bTime = b.timestamp || b.time;
            return parseTimestamp(bTime) - parseTimestamp(aTime);
          });
        
        // Use the most recent log entry
        if (logs.length > 0) {
          trackingData = logs[0];
          console.log(`Using latest log for ${nodeKey}:`, {
            time: trackingData.time,
            latitude: trackingData.latitude,
            longitude: trackingData.longitude,
            battery: trackingData.battery,
            sos: trackingData.sos_status
          });
          
          // Determine movement status if there's enough data
          movementStatus = determineMovementStatus(logs);
        }
      }
      
      // Parse latitude and longitude as numbers
      const latitude = parseFloat(trackingData.latitude) || 0;
      const longitude = parseFloat(trackingData.longitude) || 0;
      
      // Parse timestamp properly - look for time field if timestamp is not present
      const timestamp = parseTimestamp(trackingData.timestamp || trackingData.time);
      
      // Determine overall status
      let status;
      if (trackingData.sos_status) {
        status = 'SOS';
      } else if (!isActive) {
        status = 'Inactive';
      } else {
        status = movementStatus;
      }
      
      // Create a hiker object using the latest data
      let hikerId = nodeKey;
      if (trackingData.node_id) {
        if (typeof trackingData.node_id === 'string') {
          hikerId = trackingData.node_id.replace(/"/g, ''); // Remove quotes if present
        } else {
          hikerId = String(trackingData.node_id);
        }
      }
      
      console.log(`Creating hiker with ID: ${hikerId} (from ${nodeKey})`, {
        coordinates: [latitude, longitude],
        parsedTimestamp: new Date(timestamp).toLocaleString(),
        originalTime: trackingData.time
      });
      
      const hiker = new Hiker(
        hikerId,
        name,
        latitude,
        longitude,
        status,
        parseFloat(trackingData.battery) || 100,
        timestamp,
        trackingData.sos_status === 'true' || trackingData.sos_status === true
      );
      
      hikers.push(hiker);
    }
    
    console.log('Processed hikers:', hikers);
    return hikers;
  } catch (error) {
    console.error('Error fetching hikers from Firebase:', error);
    return [];
  }
}

/**
 * Set up a real-time listener for hikers data
 * @param {Function} callback - Function to call when data updates
 * @returns {Function} Function to call to unsubscribe from updates
 */
function listenForHikersUpdates(callback) {
  try {
    // Reference to the 'runners' node
    const runnersRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(database, 'runners');
    
    // Set up a listener for changes
    const unsubscribe = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.onValue)(runnersRef, async (snapshot) => {
      const runnersData = snapshot.val();
      
      console.log('Real-time update received:', runnersData);
      
      if (!runnersData) {
        console.warn('No runners data in update');
        callback([]);
        return;
      }
      
      // Import Hiker model
      const { default: Hiker } = await __webpack_require__.e(/*! import() */ "src_models_Hiker_js").then(__webpack_require__.bind(__webpack_require__, /*! ../models/Hiker.js */ "./src/models/Hiker.js"));
      
      // Transform data into Hiker objects
      const hikers = [];
      for (const nodeKey of Object.keys(runnersData)) {
        const nodeData = runnersData[nodeKey];
        console.log(`Real-time update for ${nodeKey}:`, nodeData);
        
        // Get the name and active status from the node level
        const name = nodeData.name || `Hiker ${nodeKey}`;
        const isActive = nodeData.active !== false; // Default to active if not specified
        
        // Get tracking data from logs for this hiker
        let trackingData = {
          latitude: 0,
          longitude: 0,
          battery: 100,
          sos_status: false,
          timestamp: Date.now()
        };
        
        let logs = [];
        let movementStatus = "Unknown";
        
        if (nodeData.logs) {
          // Convert logs object to array and sort by timestamp
          logs = Object.values(nodeData.logs)
            .sort((a, b) => {
              // Use time field if timestamp is not available
              const aTime = a.timestamp || a.time;
              const bTime = b.timestamp || b.time;
              return parseTimestamp(bTime) - parseTimestamp(aTime);
            });
          
          // Use the most recent log entry
          if (logs.length > 0) {
            trackingData = logs[0];
            console.log(`Using latest log for ${nodeKey}:`, {
              time: trackingData.time,
              latitude: trackingData.latitude,
              longitude: trackingData.longitude,
              battery: trackingData.battery,
              sos: trackingData.sos_status
            });
            
            // Determine movement status if there's enough data
            movementStatus = determineMovementStatus(logs);
          }
        }
        
        // Parse latitude and longitude as numbers
        const latitude = parseFloat(trackingData.latitude) || 0;
        const longitude = parseFloat(trackingData.longitude) || 0;
        
        // Parse timestamp properly - look for time field if timestamp is not present
        const timestamp = parseTimestamp(trackingData.timestamp || trackingData.time);
        
        // Determine overall status
        let status;
        if (trackingData.sos_status) {
          status = 'SOS';
        } else if (!isActive) {
          status = 'Inactive';
        } else {
          status = movementStatus;
        }
        
        // Create a hiker object using the latest data
        let hikerId = nodeKey;
        if (trackingData.node_id) {
          if (typeof trackingData.node_id === 'string') {
            hikerId = trackingData.node_id.replace(/"/g, ''); // Remove quotes if present
          } else {
            hikerId = String(trackingData.node_id);
          }
        }
        
        console.log(`Creating hiker with ID: ${hikerId} (from ${nodeKey})`, {
          coordinates: [latitude, longitude],
          parsedTimestamp: new Date(timestamp).toLocaleString(),
          originalTime: trackingData.time
        });
        
        const hiker = new Hiker(
          hikerId,
          name,
          latitude,
          longitude,
          status,
          parseFloat(trackingData.battery) || 100,
          timestamp,
          trackingData.sos_status === 'true' || trackingData.sos_status === true
        );
        
        hikers.push(hiker);
      }
      
      console.log('Processed hikers from real-time update:', hikers);
      callback(hikers);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up hikers listener:', error);
    return () => {};
  }
}

/**
 * Update hiker's active status at the node level
 * @param {string} hikerId - The ID of the hiker to update
 * @param {boolean} isActive - Whether the hiker is active
 * @returns {Promise<boolean>} Promise resolving to success status
 */
async function updateHikerActiveStatus(hikerId, isActive) {
  try {
    if (!hikerId) {
      console.error('No hiker ID provided for active status update');
      return false;
    }
    
    console.log(`Updating active status for hiker ${hikerId} to ${isActive}`);
    
    // Update active status at the node level
    const nodeRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(database, `runners/${hikerId}`);
    await (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.update)(nodeRef, { active: isActive });
    
    console.log(`Active status updated for hiker ${hikerId}`);
    return true;
  } catch (error) {
    console.error('Error updating hiker active status:', error);
    return false;
  }
}

/**
 * Update hiker tracking data and store in logs
 * @param {string} hikerId - The ID of the hiker to update
 * @param {Object} trackingData - The tracking data to update (latitude, longitude, battery, etc.)
 * @returns {Promise<void>}
 */
async function updateHikerData(hikerId, trackingData) {
  try {
    if (!hikerId) {
      console.error('No hiker ID provided for update');
      return;
    }
    
    // Get current server timestamp
    const currentTime = Date.now();
    
    // Add timestamp to tracking data
    const dataWithTimestamp = {
      ...trackingData,
      timestamp: currentTime
    };
    
    // Only create a log entry for tracking data
    const logRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(database, `runners/${hikerId}/logs/${currentTime}`);
    await (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.update)(logRef, dataWithTimestamp);
    
    console.log(`Updated tracking data for hiker ${hikerId}:`, dataWithTimestamp);
  } catch (error) {
    console.error('Error updating hiker tracking data:', error);
    throw error;
  }
}

/**
 * Update hiker SOS status and store in logs
 * @param {string} hikerId - The ID of the hiker to update
 * @param {boolean} sosStatus - The new SOS status
 * @param {boolean} sosHandled - Whether SOS is handled (optional)
 * @param {boolean} sosEmergency - Whether emergency services are dispatched (optional)
 * @param {boolean} resetSos - Whether to reset all SOS statuses (optional)
 * @returns {Promise<void>}
 */
async function updateHikerSosStatus(hikerId, sosStatus, sosHandled = false, sosEmergency = false, resetSos = false) {
  try {
    if (!hikerId) {
      console.error('No hiker ID provided for SOS status update');
      return;
    }
    
    // Get current server timestamp
    const currentTime = Date.now();
    
    // Prepare update data
    let updates = {};
    
    if (resetSos) {
      updates = {
        sos_status: false,
        sos_handled: null,
        sos_handled_time: null,
        sos_emergency: null,
        sos_emergency_time: null,
        status: 'Active',
        timestamp: currentTime
      };
    } else {
      updates = {
        sos_status: sosStatus,
        timestamp: currentTime
      };
      
      if (sosHandled) {
        updates.sos_handled = true;
        updates.sos_handled_time = currentTime;
      }
      
      if (sosEmergency) {
        updates.sos_emergency = true;
        updates.sos_emergency_time = currentTime;
      }
    }
    
    // Create a log entry for SOS status
    const logRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(database, `runners/${hikerId}/logs/${currentTime}`);
    await (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.update)(logRef, updates);
    
    console.log(`Updated SOS status for hiker ${hikerId}:`, updates);
  } catch (error) {
    console.error('Error updating SOS status:', error);
    throw error;
  }
}

/**
 * Update node name in Firebase - storing it at the node level, not in logs
 * @param {string} nodeId - The ID of the node to update
 * @param {string} name - The new name for the node
 * @returns {Promise<boolean>} Promise resolving to success status
 */
async function updateNodeName(nodeId, name) {
  try {
    if (!nodeId) {
      console.error('No node ID provided for name update');
      return false;
    }
    
    if (!name || typeof name !== 'string') {
      console.error('Invalid name provided for update:', name);
      return false;
    }
    
    console.log(`Starting Firebase name update for node ${nodeId}:`, name);
    
    // Update just the name at the node level
    const nodeRef = (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.ref)(database, `runners/${nodeId}`);
    await (0,firebase_database__WEBPACK_IMPORTED_MODULE_1__.update)(nodeRef, { name: name });
    
    console.log(`Name update successful for node ${nodeId}`);
    return true;
  } catch (error) {
    console.error(`Error updating node ${nodeId} name:`, error);
    return false;
  }
} 

/***/ }),

/***/ "./src/utils/helpers.js":
/*!******************************!*\
  !*** ./src/utils/helpers.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createLucideIcon: () => (/* binding */ createLucideIcon),
/* harmony export */   createSampleHikers: () => (/* binding */ createSampleHikers),
/* harmony export */   createSampleTowers: () => (/* binding */ createSampleTowers),
/* harmony export */   flashUpdate: () => (/* binding */ flashUpdate),
/* harmony export */   formatTimeAgo: () => (/* binding */ formatTimeAgo),
/* harmony export */   getBatteryColor: () => (/* binding */ getBatteryColor),
/* harmony export */   getStatusIcon: () => (/* binding */ getStatusIcon),
/* harmony export */   getStatusLucideIcon: () => (/* binding */ getStatusLucideIcon),
/* harmony export */   getTowerIcon: () => (/* binding */ getTowerIcon),
/* harmony export */   refreshLucideIcons: () => (/* binding */ refreshLucideIcons)
/* harmony export */ });
/**
 * Utility functions for the dashboard
 */

/**
 * Format a timestamp as a "time ago" string
 * @param {number} timestamp - The timestamp to format
 * @returns {string} Formatted time string (e.g., "Just now", "5m ago", "2h ago")
 */
function formatTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) {
    return 'Just now';
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}m ago`;
  } else {
    return `${Math.floor(diff / 3600000)}h ago`;
  }
}

/**
 * Get the appropriate CSS color for a battery percentage
 * @param {number} battery - Battery percentage (0-100)
 * @returns {string} Hex color code
 */
function getBatteryColor(battery) {
  if (battery > 70) return '#48bb78'; // Green
  if (battery > 30) return '#f6ad55'; // Orange
  return '#f56565'; // Red
}

/**
 * Get the appropriate Font Awesome icon for a hiker status
 * @param {string} status - Hiker status (Active, Resting, SOS)
 * @returns {string} Font Awesome class name
 */
function getStatusIcon(status) {
  switch(status) {
    case 'Active': return 'fa-person-walking';
    case 'Resting': return 'fa-person';
    case 'SOS': return 'fa-exclamation-triangle';
    default: return 'fa-person';
  }
}

/**
 * Create a visual update effect for an element
 * @param {string} elementId - The DOM element ID to flash
 */
function flashUpdate(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.classList.add('updating');
  
  setTimeout(() => {
    element.classList.remove('updating');
  }, 500);
}

/**
 * Create sample hiker data for testing
 * @param {number} count - Number of hikers to create (default 10)
 * @param {Array} centerCoords - [lat, lon] center coordinates
 * @returns {Array} Array of Hiker objects
 */
function createSampleHikers(count = 10, centerCoords = [3.139, 101.6869]) {
  const names = [
    'John Smith', 'Emma Wilson', 'Michael Brown', 'Sarah Davis', 
    'Robert Miller', 'Jennifer Garcia', 'David Martinez', 'Lisa Rodriguez', 
    'James Johnson', 'Mary Williams', 'Thomas Anderson', 'Patricia Thompson',
    'Christopher Martin', 'Elizabeth White', 'Daniel Harris', 'Jessica Lewis'
  ];
  
  // Import dynamically to avoid circular dependency
  return __webpack_require__.e(/*! import() */ "src_models_Hiker_js").then(__webpack_require__.bind(__webpack_require__, /*! ../models/Hiker.js */ "./src/models/Hiker.js")).then(({ default: Hiker }) => {
    return names.slice(0, count).map((name, index) => {
      // Create hikers with slight variations from center position
      const lat = centerCoords[0] + (Math.random() - 0.5) * 0.05;
      const lon = centerCoords[1] + (Math.random() - 0.5) * 0.05;
      const battery = 50 + Math.random() * 50; // 50-100%
      return new Hiker(index, name, lat, lon, 'Active', battery);
    });
  });
}

/**
 * Create sample tower/basecamp data for testing
 * @param {number} count - Number of towers to create (default 3)
 * @param {Array} centerCoords - [lat, lon] center coordinates
 * @returns {Promise<Array>} Promise resolving to array of Tower objects
 */
function createSampleTowers(count = 3, centerCoords = [3.139, 101.6869]) {
  const towerNames = [
    'Central Tower', 'North Base', 'South Station', 'East Point', 'West Camp',
    'Peak Tower', 'Valley Base', 'Ridge Station', 'Summit Point', 'Forest Camp'
  ];
  
  const types = ['Tower', 'Basecamp'];
  const statuses = ['Active', 'Maintenance', 'Offline'];
  
  // Import Tower model dynamically to avoid circular dependency
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../models/Tower.js */ "./src/models/Tower.js")).then(({ default: Tower }) => {
    return towerNames.slice(0, count).map((name, index) => {
      // Create towers with more spread out positions than hikers
      const lat = centerCoords[0] + (Math.random() - 0.5) * 0.1;
      const lon = centerCoords[1] + (Math.random() - 0.5) * 0.1;
      const type = types[Math.floor(Math.random() * types.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const coverageRadius = Math.round(300 + Math.random() * 700); // 300-1000m
      
      const options = {
        coverageRange: coverageRadius, // Backward compatibility
      };
      
      return new Tower(`tower_${index}`, name, lat, lon, type, status, coverageRadius, options);
    });
  });
}

/**
 * Create a Lucide icon element
 * @param {string} iconName - The name of the Lucide icon
 * @param {Object} options - Options for the icon (size, color, strokeWidth, etc.)
 * @returns {string} HTML string for the icon
 */
function createLucideIcon(iconName, options = {}) {
  const {
    size = 20,
    color = 'currentColor',
    strokeWidth = 2,
    className = '',
    style = ''
  } = options;
  
  const styleString = `color: ${color}; width: ${size}px; height: ${size}px; stroke-width: ${strokeWidth}; ${style}`;
  
  return `<i data-lucide="${iconName}" class="${className}" style="${styleString}"></i>`;
}

/**
 * Refresh Lucide icons after DOM changes
 * @param {HTMLElement} container - Optional container to refresh icons within
 */
function refreshLucideIcons(container = document) {
  if (typeof lucide !== 'undefined') {
    if (container === document) {
      lucide.createIcons();
    } else {
      // Create icons only within the specified container
      const icons = container.querySelectorAll('[data-lucide]');
      icons.forEach(icon => {
        if (!icon.querySelector('svg')) {
          lucide.createIcons([icon]);
        }
      });
    }
  }
}

/**
 * Get Lucide icon name for tower/infrastructure type
 * @param {string} type - Tower type ('Tower' or 'Basecamp')
 * @returns {string} Lucide icon name
 */
function getTowerIcon(type) {
  return type === 'Tower' ? 'radio-tower' : 'house-wifi';
}

/**
 * Get Lucide icon name for status
 * @param {string} status - Status ('Active', 'Offline', 'Maintenance')
 * @returns {string} Lucide icon name
 */
function getStatusLucideIcon(status) {
  switch(status) {
    case 'Active': return 'check-circle';
    case 'Offline': return 'x-circle';
    case 'Maintenance': return 'wrench';
    default: return 'circle';
  }
} 

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackSafetyManager: () => (/* reexport safe */ _TrackSafetyManager_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   createLucideIcon: () => (/* reexport safe */ _helpers_js__WEBPACK_IMPORTED_MODULE_0__.createLucideIcon),
/* harmony export */   createSampleHikers: () => (/* reexport safe */ _helpers_js__WEBPACK_IMPORTED_MODULE_0__.createSampleHikers),
/* harmony export */   createSampleTowers: () => (/* reexport safe */ _helpers_js__WEBPACK_IMPORTED_MODULE_0__.createSampleTowers),
/* harmony export */   fetchHikersFromFirebase: () => (/* reexport safe */ _firebase_js__WEBPACK_IMPORTED_MODULE_1__.fetchHikersFromFirebase),
/* harmony export */   flashUpdate: () => (/* reexport safe */ _helpers_js__WEBPACK_IMPORTED_MODULE_0__.flashUpdate),
/* harmony export */   formatTimeAgo: () => (/* reexport safe */ _helpers_js__WEBPACK_IMPORTED_MODULE_0__.formatTimeAgo),
/* harmony export */   getBatteryColor: () => (/* reexport safe */ _helpers_js__WEBPACK_IMPORTED_MODULE_0__.getBatteryColor),
/* harmony export */   getStatusIcon: () => (/* reexport safe */ _helpers_js__WEBPACK_IMPORTED_MODULE_0__.getStatusIcon),
/* harmony export */   getStatusLucideIcon: () => (/* reexport safe */ _helpers_js__WEBPACK_IMPORTED_MODULE_0__.getStatusLucideIcon),
/* harmony export */   getTowerIcon: () => (/* reexport safe */ _helpers_js__WEBPACK_IMPORTED_MODULE_0__.getTowerIcon),
/* harmony export */   listenForHikersUpdates: () => (/* reexport safe */ _firebase_js__WEBPACK_IMPORTED_MODULE_1__.listenForHikersUpdates),
/* harmony export */   refreshLucideIcons: () => (/* reexport safe */ _helpers_js__WEBPACK_IMPORTED_MODULE_0__.refreshLucideIcons),
/* harmony export */   updateHikerActiveStatus: () => (/* reexport safe */ _firebase_js__WEBPACK_IMPORTED_MODULE_1__.updateHikerActiveStatus),
/* harmony export */   updateHikerData: () => (/* reexport safe */ _firebase_js__WEBPACK_IMPORTED_MODULE_1__.updateHikerData),
/* harmony export */   updateHikerSosStatus: () => (/* reexport safe */ _firebase_js__WEBPACK_IMPORTED_MODULE_1__.updateHikerSosStatus),
/* harmony export */   updateNodeName: () => (/* reexport safe */ _firebase_js__WEBPACK_IMPORTED_MODULE_1__.updateNodeName)
/* harmony export */ });
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.js */ "./src/utils/helpers.js");
/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firebase.js */ "./src/utils/firebase.js");
/* harmony import */ var _TrackSafetyManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TrackSafetyManager.js */ "./src/utils/TrackSafetyManager.js");
// Utils barrel export


 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "fyp2:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfyp2"] = self["webpackChunkfyp2"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/index.js");
/* harmony import */ var _components_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/index.js */ "./src/components/index.js");
/* harmony import */ var _modules_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/index.js */ "./src/modules/index.js");
/**
 * Main Application - Coordinates all components
 */
// Using centralized imports - Next.js style






class HikerTrackingApp {
  constructor() {
    this.hikers = [];
    this.towers = [];
    this.map = new _components_index_js__WEBPACK_IMPORTED_MODULE_1__.MapComponent();
    this.sidebar = new _components_index_js__WEBPACK_IMPORTED_MODULE_1__.SidebarComponent();
    this.modal = new _components_index_js__WEBPACK_IMPORTED_MODULE_1__.ModalComponent();
    this.towerModal = new _components_index_js__WEBPACK_IMPORTED_MODULE_1__.TowerModalComponent();
    this.settings = new _components_index_js__WEBPACK_IMPORTED_MODULE_1__.SettingsComponent();
    this.trackSafetyModule = null; // Will be initialized in init()
    this.towerManager = new _components_index_js__WEBPACK_IMPORTED_MODULE_1__.TowerManager();
    this.towerControls = null; // Will be initialized in init()
    this.simulationInterval = null;
    this.simulationSpeed = 3000; // 3 seconds instead of 1 second
    this.defaultCenter = [3.139, 101.6869];
    this.defaultZoom = 12;
    this.mapStyles = {
      default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    };
    this.settingsBtnId = 'settings-btn';
    this.isUsingLiveData = true; // Flag to indicate if using live data
    this.firebaseUnsubscribe = null; // Function to unsubscribe from Firebase updates
  }

  /**
   * Initialize the application
   */
  async init() {
    // Initialize settings component first to load saved preferences
    this.settings.init({
      // Add callback for simulation toggle
      onSimulationToggle: (isEnabled) => {
        this.handleSimulationToggle(isEnabled);
      },
      // Callback for simulation speed change
      onSimulationSpeedChange: (speed) => {
        this.setSimulationSpeed(speed);
      },
      // Callback for hikers count change
      onHikersCountChange: (count) => {
        if (!this.isUsingLiveData) {
          this.restartSimulation(count);
        }
      },
      // Map style change
      onMapStyleChange: (style) => {
        this.changeMapStyle(style);
      },
      // Zoom change
      onZoomChange: (zoom) => {
        this.defaultZoom = zoom;
        this.map.centerMap(this.defaultCenter, zoom);
      },
      // Track safety settings change
      onTrackSafetyChange: (enabled) => {
        if (this.trackSafetyModule) {
          this.trackSafetyModule.setEnabled(enabled);
        }
      },
      // Settings changed callback
      onSettingsChanged: (settings) => {
        if (this.trackSafetyModule) {
          this.trackSafetyModule.applySettings(settings);
        }
      }
    });
    
    // Setup settings button click event
    const settingsBtn = document.getElementById(this.settingsBtnId);
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        this.settings.openSettingsModal();
      });
    }
    
    // Apply initial settings
    const initialSettings = this.settings.getSettings();
    
    // Initialize map component with settings
    this.defaultZoom = initialSettings.map.defaultZoom;
    this.map.init();
    this.changeMapStyle(initialSettings.map.style);
    
    // Initialize sidebar component
    this.sidebar.init(
      // Hiker click callback
      (hiker) => {
        this.handleHikerClick(hiker);
      },
      // Tower click callback
      (tower) => {
        this.handleTowerClick(tower);
      },
      // Settings click callback
      () => {
        this.settings.openModal();
      }
    );
    
    // Initialize modal component
    this.modal.init(
      // Track hiker callback
      (hikerId) => {
        this.map.centerOnHiker(hikerId);
        this.map.trackingHikerId = hikerId;
      },
      // Send message callback
      (hikerId) => {
        alert('Messaging functionality is coming soon!');
      },
      // Mark SOS as handled callback
      (hikerId) => {
        this.handleSosAction(hikerId, 'handled');
      },
      // Mark emergency services dispatched callback
      (hikerId) => {
        this.handleSosAction(hikerId, 'emergency');
      },
      // Reset SOS callback
      (hikerId) => {
        this.handleSosAction(hikerId, 'reset');
      }
    );

    // Initialize tower modal component
    this.towerModal.init(
      // Connect hikers callback
      (towerId) => {
        this.handleTowerConnectHikers(towerId);
      },
      // View coverage callback
      (towerId) => {
        this.handleTowerViewCoverage(towerId);
      }
    );

    // Initialize tower controls for adding towers
    this.towerControls = new _components_index_js__WEBPACK_IMPORTED_MODULE_1__.TowerControls(this.towerManager, this.map);
    this.towerControls.init();

    // Set up tower manager update callback
    this.towerManager.onUpdate((towers) => {
      this.towers = towers;
      this.renderAll();
    });
    
    // Initialize track safety module
    this.trackSafetyModule = new _modules_index_js__WEBPACK_IMPORTED_MODULE_2__.TrackSafetyModule(
      this,
      this.map,
      {
        getAllHikers: () => this.hikers,
        getHikerMarker: (hikerId) => this.map.getHikerMarker(hikerId),
        onHikersUpdated: (callback) => {
          this.hikerUpdateCallbacks = this.hikerUpdateCallbacks || [];
          this.hikerUpdateCallbacks.push(callback);
        }
      },
      {
        notify: (notification) => {
          this.settings.showNotification(
            notification.message,
            notification.type,
            notification.autoClose,
            notification.icon
          );
        }
      }
    );
    
    // Initialize track safety module and apply settings
    this.trackSafetyModule.init();
    this.trackSafetyModule.addStyles();
    this.trackSafetyModule.applySettings(initialSettings);
    
    // Set simulation speed from settings
    this.simulationSpeed = initialSettings.simulation.speed;
    
    // Check if simulation is enabled
    const isSimulationEnabled = initialSettings.simulation.enabled;
    this.isUsingLiveData = !isSimulationEnabled;
    
    // Load the appropriate data based on settings
    await this.loadData(isSimulationEnabled);
    
    // Render initial state
    this.renderAll();
    
    return this;
  }

  /**
   * Load data based on current mode (live or simulation)
   * @param {boolean} useSimulation - Whether to use simulated data
   */
  async loadData(useSimulation) {
    if (useSimulation) {
      // Use simulated data
      const settings = this.settings.getSettings();
      this.hikers = await (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.createSampleHikers)(settings.simulation.hikersCount || 10);
      const sampleTowers = await (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.createSampleTowers)(3); // Create 3 sample towers/basecamps
      this.towerManager.loadTowers(sampleTowers);
      
      // Start simulation
      this.startSimulation();
      
      this.settings.showNotification('Using simulated data', 2000);
    } else {
      // Use live data from Firebase
      try {
        // Show loading state
        this.settings.showNotification('Loading hiker data...', 2000);
        
        // Set up real-time updates first
        this.setupFirebaseRealTimeUpdates();
        
        // Initial data will come through the real-time listener
        this.settings.showNotification('Connected to live data', 3000);
      } catch (error) {
        console.error('Error loading hikers from Firebase:', error);
        this.hikers = [];
        this.settings.showNotification('Error connecting to database', 3000);
      }
    }
  }

  /**
   * Handle simulation toggle
   * @param {boolean} isEnabled - Whether simulation is enabled
   */
  async handleSimulationToggle(isEnabled) {
    // Don't do anything if the state is the same
    if (isEnabled === !this.isUsingLiveData) return;

    // Stop current data source
    this.stopCurrentDataSource();
    
    // Update state
    this.isUsingLiveData = !isEnabled;
    
    // Load data for the new state
    await this.loadData(isEnabled);
    
    // Render the UI
    this.renderAll();
  }

  /**
   * Stop the current data source (simulation or Firebase listener)
   */
  stopCurrentDataSource() {
    // Stop simulation if running
    this.stopSimulation();
    
    // Stop Firebase listener if active
    if (this.firebaseUnsubscribe) {
      this.firebaseUnsubscribe();
      this.firebaseUnsubscribe = null;
    }
  }

  /**
   * Set up Firebase real-time updates
   */
  setupFirebaseRealTimeUpdates() {
    // Clear any existing subscription
    if (this.firebaseUnsubscribe) {
      this.firebaseUnsubscribe();
      this.firebaseUnsubscribe = null;
    }
    
    try {
      // Subscribe to real-time updates
      this.firebaseUnsubscribe = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.listenForHikersUpdates)((updatedHikers) => {
        // Log the data we received
        console.log('Received Firebase update with hikers:', updatedHikers);
        
        if (!updatedHikers || updatedHikers.length === 0) {
          console.warn('Received empty update from Firebase');
          // Don't clear existing hikers on empty update unless it's confirmed empty
          return;
        }
        
        // Update hikers data
        this.hikers = updatedHikers;
        
        // Re-render the UI
        this.renderAll();
        
        // Check notifications
        this.checkNotifications();
      });
      
      console.log('Firebase real-time updates set up successfully');
    } catch (error) {
      console.error('Error setting up Firebase real-time updates:', error);
      this.settings.showNotification('Error connecting to Firebase', 3000);
    }
  }

  /**
   * Apply all settings at once
   * @param {Object} settings - The settings object
   */
  applySettings(settings) {
    // Apply map settings
    this.changeMapStyle(settings.map.style);
    this.defaultZoom = settings.map.defaultZoom;
    this.map.centerMap(this.defaultCenter, settings.map.defaultZoom);
    
    // Apply simulation settings
    this.setSimulationSpeed(settings.simulation.speed);
    
    // Handle simulation toggle if needed
    if (settings.simulation.enabled !== !this.isUsingLiveData) {
      this.handleSimulationToggle(settings.simulation.enabled);
    }
  }

  /**
   * Change the map style/theme
   * @param {string} styleName - The name of the style to apply
   */
  changeMapStyle(styleName) {
    // Remove current tile layer
    this.map.map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        this.map.map.removeLayer(layer);
      }
    });
    
    // Add new tile layer based on style
    const tileUrl = this.mapStyles[styleName] || this.mapStyles.default;
    L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map.map);
  }

  /**
   * Handle hiker click events
   * @param {Object|string|number} hikerOrId - The hiker that was clicked or its ID
   */
  handleHikerClick(hikerOrId) {
    console.log('handleHikerClick called with:', hikerOrId);
    
    let hiker;
    let hikerId;
    
    // Check if we received a hiker object or just an ID
    if (typeof hikerOrId === 'object' && hikerOrId !== null) {
      hiker = hikerOrId;
      hikerId = hiker.id;
    } else {
      // We received an ID
      hikerId = hikerOrId;
      // Always find the hiker from the main hikers array to get the latest data
      hiker = this.hikers.find(h => h.id == hikerId);
      
      if (!hiker) {
        console.error(`Hiker with ID ${hikerId} not found`);
        return;
      }
    }
    
    // Double check to make sure we have the latest data
    const latestHiker = this.hikers.find(h => h.id == hikerId);
    if (latestHiker) {
      // Use the latest hiker data from the main array
      hiker = latestHiker;
    }
    
    console.log('Opening modal for hiker:', hiker);
    
    // Update the marker position to the latest coordinates
    this.updateMarkerPosition(hiker);
    
    // Open the modal with the hiker's data
    this.modal.openModal(hiker);
    
    // Center the map on the hiker
    this.map.centerOnHiker(hiker.id);
  }

  /**
   * Handle SOS actions (marking as handled or emergency services)
   * @param {string|number} hikerId - Hiker ID
   * @param {string} action - Action type ('handled', 'emergency', or 'reset')
   */
  handleSosAction(hikerId, action) {
    console.log(`SOS action requested: ${action} for hiker ${hikerId}`);
    
    const hiker = this.hikers.find(h => h.id === hikerId);
    if (!hiker) {
      console.error(`Hiker with ID ${hikerId} not found for SOS action ${action}`);
      return;
    }
    
    let actionTaken = false;
    let message = '';
    
    if (action === 'handled') {
      actionTaken = hiker.markSosHandled();
      message = `SOS for ${hiker.name} marked as handled`;
    } else if (action === 'emergency') {
      actionTaken = hiker.dispatchEmergencyServices();
      message = `Emergency services dispatched for ${hiker.name}`;
    } else if (action === 'reset') {
      console.log('Attempting to reset SOS status for hiker:', hiker);
      actionTaken = hiker.resetSosStatus();
      message = `SOS for ${hiker.name} has been cleared`;
      console.log('Reset SOS result:', actionTaken, 'New hiker state:', hiker);
    }
    
    if (actionTaken) {
      // Show notification
      this.settings.showNotification(message, 3000);
      
      // Update data in Firebase if using live data
      if (this.isUsingLiveData) {
        console.log(`Updating Firebase for ${action} action:`, {
          hikerId,
          sosActive: action !== 'reset',
          sosHandled: action === 'handled' || action === 'emergency', 
          emergency: action === 'emergency',
          reset: action === 'reset'
        });
        
        (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.updateHikerSosStatus)(
          hikerId, 
          action !== 'reset', // SOS is active unless resetting
          action === 'handled' || action === 'emergency', // Whether handled
          action === 'emergency', // Whether emergency services dispatched
          action === 'reset' // Whether to reset all SOS statuses
        ).then(() => {
          console.log(`Firebase SOS update successful for action: ${action}`);
        }).catch(error => {
          console.error('Error updating SOS status in Firebase:', error);
          this.settings.showNotification('Failed to update status in database', 3000);
        });
      }
      
      // Update the modal content to reflect changes
      this.modal.updateModalContent(hiker);
      
      // Refresh the sidebar to show updated SOS status
      this.sidebar.updateSidebar(this.hikers);
      
      // Apply special marker style for handled SOS
      this.updateMarkerStyle(hiker);
    } else {
      console.warn(`No action taken for ${action} on hiker ${hikerId}`);
    }
  }

  /**
   * Handle tower connect hikers action
   * @param {string} towerId - The ID of the tower
   */
  handleTowerConnectHikers(towerId) {
    console.log(`Connecting hikers to tower ${towerId}`);
    
    // Find hikers within the tower's range and connect them
    // This is a placeholder for actual connection logic
    this.settings.showNotification(
      `Connected nearby hikers to tower ${towerId}`,
      3000
    );
    
    // Could implement actual logic to:
    // 1. Calculate hikers within tower range
    // 2. Update their connection status
    // 3. Show visual indicators on the map
  }

  /**
   * Handle tower view coverage action
   * @param {string} towerId - The ID of the tower
   */
  handleTowerViewCoverage(towerId) {
    console.log(`Viewing coverage for tower ${towerId}`);
    
    // This would show the coverage area on the map
    // Placeholder for actual coverage visualization
    this.settings.showNotification(
      `Showing coverage area for tower ${towerId}`,
      3000
    );
    
    // Could implement:
    // 1. Draw coverage circle on map
    // 2. Highlight hikers within/outside coverage
    // 3. Show coverage statistics
  }

  /**
   * Handle tower node click (similar to hiker click)
   * @param {Object} tower - The tower object
   */
  handleTowerClick(tower) {
    console.log('Tower clicked:', tower);
    
    // Ensure tower has required properties
    if (!tower || !tower.id) {
      console.error('Invalid tower object:', tower);
      return;
    }
    
    // Open the tower modal with tower data
    this.towerModal.openModal(tower);
  }

  /**
   * Update marker style for a hiker (e.g., for handled SOS)
   * @param {Object} hiker - The hiker to update
   */
  updateMarkerStyle(hiker) {
    const marker = this.map.hikerMarkers[hiker.id];
    if (marker) {
      // Remove the old marker
      this.map.markerLayer.removeLayer(marker);
      
      // Create a new marker with updated style and the latest coordinates
      const newMarker = L.marker([hiker.lat, hiker.lon], {
        icon: this.map.createCustomMarkerIcon(hiker),
        zIndexOffset: hiker.sos ? 1000 : 0
      }).addTo(this.map.markerLayer);
      
      newMarker.on('click', () => {
        this.handleHikerClick(hiker);
      });
      
      this.map.hikerMarkers[hiker.id] = newMarker;
    }
  }

  /**
   * Update marker position for a hiker
   * @param {Object} hiker - The hiker to update
   */
  updateMarkerPosition(hiker) {
    const marker = this.map.hikerMarkers[hiker.id];
    if (marker) {
      // Update marker position to latest coordinates
      marker.setLatLng([hiker.lat, hiker.lon]);
    }
  }

  /**
   * Render all UI components
   */
  renderAll() {
    console.log('Rendering all UI components with hikers:', this.hikers);
    
    // First update the positions of existing markers without recreating them
    this.hikers.forEach(hiker => {
      this.updateMarkerPosition(hiker);
    });
    
    // Update the map - this recreates all markers if needed
    this.map.updateMap(
      this.hikers, 
      (hiker) => this.handleHikerClick(hiker),
      this.towers,
      (tower) => this.handleTowerClick(tower)
    );
    
    // Update the sidebar
    this.sidebar.updateSidebar(this.hikers);
    this.sidebar.updateTowerList(this.towers);
    
    // Update safety status if module is initialized
    if (this.trackSafetyModule) {
      this.trackSafetyModule.checkAllHikersSafety();
    }
    
    // Call any registered hikers update callbacks
    if (this.hikerUpdateCallbacks && this.hikerUpdateCallbacks.length > 0) {
      this.hikerUpdateCallbacks.forEach(callback => {
        if (typeof callback === 'function') {
          callback(this.hikers);
        }
      });
    }
    
    // Update modal if it's open - make sure to get the most recent hiker data
    const activeHikerId = this.modal.activeHikerId;
    if (activeHikerId !== null) {
      // Find the hiker using the latest data
      const activeHiker = this.hikers.find(h => h.id === activeHikerId);
      if (activeHiker) {
        console.log('Updating modal with latest hiker data:', activeHiker);
        // First update the marker position for this hiker again to ensure it's in sync
        this.updateMarkerPosition(activeHiker);
        // Then update the modal content with the latest data
        this.modal.updateModalContent(activeHiker);
      }
    }
  }

  /**
   * Check for notification conditions and display if needed
   */
  checkNotifications() {
    const settings = this.settings.getSettings();
    
    this.hikers.forEach(hiker => {
      // Check for SOS notification
      if (hiker.sos && settings.notifications.sosAlerts) {
        // If this is a new SOS (not previously notified)
        if (!hiker.sosNotified) {
          this.settings.showNotification(`SOS Alert: ${hiker.name} needs assistance!`, 5000);
          hiker.sosNotified = true;
        }
      }
      
      // Check for battery notification
      if (settings.notifications.batteryAlerts && 
          hiker.battery <= settings.notifications.batteryThreshold &&
          !hiker.batteryNotified) {
        this.settings.showNotification(`Low Battery Alert: ${hiker.name}'s device at ${Math.round(hiker.battery)}%`, 5000);
        hiker.batteryNotified = true;
      }
      
      // Reset notification flags if conditions are no longer met
      if (hiker.batteryNotified && hiker.battery > settings.notifications.batteryThreshold) {
        hiker.batteryNotified = false;
      }
    });
  }

  /**
   * Start the simulation of hiker movement
   */
  startSimulation() {
    if (this.simulationInterval) return;
    
    this.simulationInterval = setInterval(() => {
      // Update hiker positions
      this.hikers.forEach(hiker => hiker.updatePosition());
      
      // Check for notifications
      this.checkNotifications();
      
      // Render the updated state
      this.renderAll();
    }, this.simulationSpeed);
  }

  /**
   * Stop the simulation
   */
  stopSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  /**
   * Change the simulation speed
   * @param {number} speed - New simulation interval in milliseconds
   */
  setSimulationSpeed(speed) {
    this.simulationSpeed = speed;
    if (this.simulationInterval) {
      this.stopSimulation();
      this.startSimulation();
    }
  }

  /**
   * Restart the simulation with new hikers count
   * @param {number} count - Number of hikers to simulate
   */
  async restartSimulation(count) {
    // Stop current simulation
    this.stopSimulation();
    
    // Generate new hikers
    this.hikers = await (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.createSampleHikers)(count);
    
    // Render and restart
    this.renderAll();
    this.startSimulation();
  }
}

// Export the application class
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HikerTrackingApp);

// Initialize on window load
window.addEventListener('DOMContentLoaded', () => {
  window.hikerApp = new HikerTrackingApp();
  window.hikerApp.init();
}); 
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map