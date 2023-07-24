/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./styles.css":
/*!********************!*\
  !*** ./styles.css ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://threejs-cms/./styles.css?");

/***/ }),

/***/ "./src/controllers/sceneController.js":
/*!********************************************!*\
  !*** ./src/controllers/sceneController.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SceneController: () => (/* binding */ SceneController)\n/* harmony export */ });\nclass SceneController {\n  constructor() {\n    if (SceneController.instance) {\n      return SceneController.instance;\n    }\n    SceneController.instance = this;\n    this.scene = null;\n    this.camera = null;\n    this.renderer = null;\n    this.cube = null;\n    this.lights = {\n      ambientLight: new THREE.AmbientLight(0xffffff, 0.5),\n      directionalLight: new THREE.DirectionalLight(0xffffff, 0.8),\n    };\n    this.#init();\n  }\n  getScene() {\n    return this.scene;\n  }\n  getCamera() {\n    return this.camera;\n  }\n  getRenderer() {\n    this.domElement = this.renderer.domElement;\n    return this.domElement;\n  }\n\n  update() {\n    // Оновлення сцени\n    this.renderer.render(this.scene, this.camera);\n  }\n\n  #init() {\n    // Ініціалізуємо сцену\n    this.scene = new THREE.Scene();\n\n    // Ініціалізуємо камеру\n    const width = window.innerWidth;\n    const height = window.innerHeight;\n    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);\n    this.camera.position.z = 5;\n\n    // Ініціалізуємо рендерер\n    this.renderer = new THREE.WebGLRenderer();\n    this.renderer.setSize(width, height);\n    document.body.appendChild(this.renderer.domElement);\n\n    // Додавання куба до сцени\n    const geometry = new THREE.BoxGeometry();\n    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\n    this.cube = new THREE.Mesh(geometry, material);\n    this.cube.userData.isModel = true;\n    this.cube.userData.onHover = () => {\n      // Зберегти поточний колір моделі\n      const currentColor = this.cube.material.color.getHex();\n      // Згенерувати випадковий колір\n      const randomColor = Math.random() * 0xffffff;\n      // Змінити колір моделі на випадковий\n      this.cube.material.color.set(randomColor);\n      // Зберегти випадковий колір в userData моделі\n      this.cube.userData.currentColor = \"green\";\n    };\n\n    this.cube.userData.onClick = () => {\n      // Повернути колір моделі до попереднього значення\n      const previousColor = this.cube.userData.currentColor;\n      this.cube.material.color.set(previousColor);\n    };\n\n    this.scene.add(this.cube);\n\n    // Анімація\n    // this.animate();\n  }\n\n  animate() {\n    requestAnimationFrame(() => this.animate());\n\n    // Анімація куба\n    this.cube.rotation.x += 0.01;\n    this.cube.rotation.y += 0.01;\n\n    // Рендеринг сцени\n    this.renderer.render(this.scene, this.camera);\n  }\n}\n\n\n//# sourceURL=webpack://threejs-cms/./src/controllers/sceneController.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles.css */ \"./styles.css\");\n/* harmony import */ var _controllers_sceneController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/sceneController.js */ \"./src/controllers/sceneController.js\");\n/* harmony import */ var _ui_uiManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/uiManager.js */ \"./src/ui/uiManager.js\");\n/* harmony import */ var _managers_interactionManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./managers/interactionManager.js */ \"./src/managers/interactionManager.js\");\n\n\n\n\n\nconst sceneController = new _controllers_sceneController_js__WEBPACK_IMPORTED_MODULE_1__.SceneController(800, 600, \"canvas\");\n// Ініціалізація сцени та управління моделями\n// const uiManager = new UIManager(sceneController);\n// uiManager.init();\nconst interactionManager  = new _managers_interactionManager_js__WEBPACK_IMPORTED_MODULE_3__.InteractionManager (sceneController);\n\n\n//# sourceURL=webpack://threejs-cms/./src/index.js?");

/***/ }),

/***/ "./src/managers/interactionManager.js":
/*!********************************************!*\
  !*** ./src/managers/interactionManager.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   InteractionManager: () => (/* binding */ InteractionManager)\n/* harmony export */ });\nclass InteractionManager {\n  constructor(sceneController) {\n    this.sceneController = sceneController;\n    this.raycaster = new THREE.Raycaster();\n    this.mouse = new THREE.Vector2();\n    this.intersectedObject = null;\n    this.isDragging = false; // Флаг перетягування\n    this.targetPosition = new THREE.Vector3(); // Цільова позиція моделі\n    this.easing = 0.1; // Параметр плавності руху\n\n    // Прив'язка обробників подій\n    this.handleMouseMove = this.handleMouseMove.bind(this);\n    this.handleMouseClick = this.handleMouseClick.bind(this);\n    this.handleMouseDown = this.handleMouseDown.bind(this);\n    this.handleMouseUp = this.handleMouseUp.bind(this);\n\n    // Налаштування початкового стану\n    this.enableInteraction();\n    this.animate();\n  }\n\n  enableInteraction() {\n    // Додавання обробників подій\n    window.addEventListener('mousemove', this.handleMouseMove);\n    window.addEventListener('click', this.handleMouseClick);\n    window.addEventListener('mousedown', this.handleMouseDown);\n    window.addEventListener('mouseup', this.handleMouseUp);\n  }\n\n  disableInteraction() {\n    // Видалення обробників подій\n    window.removeEventListener('mousemove', this.handleMouseMove);\n    window.removeEventListener('click', this.handleMouseClick);\n    window.removeEventListener('mousedown', this.handleMouseDown);\n    window.removeEventListener('mouseup', this.handleMouseUp);\n  }\n\n  handleMouseMove(event) {\n    // Оновлення координат курсора миші\n    const canvas = this.sceneController.getRenderer();\n    const canvasBounds = canvas.getBoundingClientRect();\n    this.mouse.x = ((event.clientX - canvasBounds.left) / canvas.clientWidth) * 2 - 1;\n    this.mouse.y = -((event.clientY - canvasBounds.top) / canvas.clientHeight) * 2 + 1;\n\n    // Перевірка перетинів з моделями\n    this.checkIntersections();\n\n    // Рух моделі за курсором миші\n    this.handleDrag() \n  }\n  handleDrag() {\n    if (this.isDragging && this.intersectedObject) {\n      // Отримати позицію курсора миші в світових координатах\n      const intersection = this.checkIntersections();\n      if (intersection) {\n        const { point } = intersection;\n        // Перемістити об'єкт на позицію курсора миші\n        const pointSet = new THREE.Vector3(point.x, point.y, 0);\n        this.intersectedObject.position.copy(pointSet);\n      }\n    }\n  }\n  getMouseIntersection() {\n    // Отримати список пересічених об'єктів\n    this.raycaster.setFromCamera(this.mouse, this.sceneController.getCamera());\n    const intersectedObjects = this.raycaster.intersectObjects(this.sceneController.getScene().children, true);\n  \n    // Перевірка наявності пересічення з об'єктами\n    if (intersectedObjects.length > 0) {\n      return intersectedObjects[0]; // Повернути першу точку пересічення\n    }\n  \n    return null; // Повернути null, якщо немає пересічень\n  }\n\n  handleMouseClick() {\n    // Виконання дії при кліку на модель\n    if (this.intersectedObject) {\n      // Виклик користувацької функції для обробки кліку на моделі\n      const userData = this.intersectedObject.userData;\n      if (userData && userData.onClick) {\n        userData.onClick();\n      }\n    }\n  }\n\n  handleMouseDown() {\n    // Встановлення прапорця перетягування при натисканні кнопки миші\n    this.isDragging = true;\n\n    // Виклик користувацької функції для обробки початку перетягування моделі\n    if (this.intersectedObject) {\n      const userData = this.intersectedObject.userData;\n      if (userData && userData.onDragStart) {\n        userData.onDragStart();\n      }\n    }\n  }\n\n  handleMouseUp() {\n    // Зупинка перетягування при відпусканні кнопки миші\n    this.isDragging = false;\n\n    // Виклик користувацької функції для обробки завершення перетягування моделі\n    if (this.intersectedObject) {\n      const userData = this.intersectedObject.userData;\n      if (userData && userData.onDragEnd) {\n        userData.onDragEnd();\n      }\n    }\n  }\n\n  checkIntersections() {\n    // Оновлення списку перетинутих об'єктів\n    this.raycaster.setFromCamera(this.mouse, this.sceneController.getCamera());\n    const intersectedObjects = this.raycaster.intersectObjects(this.sceneController.getScene().children, true);\n\n    // Перевірка наявності перетинів з моделями\n    if (intersectedObjects.length > 0) {\n      const firstObject = intersectedObjects[0].object;\n\n      // Перевірка, чи є об'єкт моделлю\n      if (firstObject.userData && firstObject.userData.isModel) {\n        // Якщо об'єкт - модель, оновлюємо перетинутий об'єкт\n        this.intersectedObject = firstObject;\n\n        // Виклик користувацької функції для обробки наведення на модель\n        const userData = this.intersectedObject.userData;\n        if (userData && userData.onHover) {\n          userData.onHover();\n        }\n        return intersectedObjects[0];// Повернути першу точку пересічення\n      } else {\n        // Якщо об'єкт не є моделлю, скидаємо перетинутий об'єкт\n        this.intersectedObject = null;\n        return null;\n      }\n    } else {\n      // Якщо немає перетинів з об'єктами, скидаємо перетинутий об'єкт\n      this.intersectedObject = null;\n    }\n  }\n\n  animate() {\n    // Анімація для плавного руху моделі\n    if (this.isDragging && this.intersectedObject) {\n      const currentPosition = this.intersectedObject.position;\n      const dx = this.targetPosition.x - currentPosition.x;\n      const dy = this.targetPosition.y - currentPosition.y;\n      const dz = this.targetPosition.z - currentPosition.z;\n      currentPosition.x += dx * this.easing;\n      currentPosition.y += dy * this.easing;\n      currentPosition.z += dz * this.easing;\n    }\n\n    // Оновлення сцени на кожному кадрі\n    this.sceneController.update();\n\n    // Виклик метод\n        // Виклик методу animate() на наступному кадрі\n        requestAnimationFrame(() => this.animate());\n      }\n      \n    }\n    \n\n//# sourceURL=webpack://threejs-cms/./src/managers/interactionManager.js?");

/***/ }),

/***/ "./src/ui/uiManager.js":
/*!*****************************!*\
  !*** ./src/ui/uiManager.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UIManager: () => (/* binding */ UIManager)\n/* harmony export */ });\n\nclass UIManager {\n    constructor(sceneController) {\n      this.sceneController = sceneController;\n      this.canvas = document.getElementById('canvas');\n      this.colorInput = document.getElementById('colorInput');\n      this.canvas.addEventListener('click', this.handleCanvasClick.bind(this));\n      this.colorInput.addEventListener('change', this.handleColorInputChange.bind(this));\n    }\n  \n    init() {\n      // Ініціалізація інтерфейсу\n      const toggleButton = document.getElementById(\"toggleMenu\");\n      const sidebar = document.getElementById(\"sidebar\");\n\n      toggleButton.addEventListener(\"click\", () => {\n        sidebar.classList.toggle(\"open\");\n      });\n    }\n  \n    handleCanvasClick(event) {\n      const cubeColor = this.colorInput.value;\n      this.sceneController.setCubeColor(cubeColor);\n    }\n  \n    handleColorInputChange(event) {\n      const cubeColor = event.target.value;\n      this.sceneController.setColor(cubeColor);\n    }\n  }\n   \n\n\n//# sourceURL=webpack://threejs-cms/./src/ui/uiManager.js?");

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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;