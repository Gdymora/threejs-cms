export class SceneController {
  constructor(width, height, canvasId) {
    if (SceneController.instance) {
      return SceneController.instance;
    }
    SceneController.instance = this;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cube = null;
    this.lights = {
      ambientLight: new THREE.AmbientLight(0xffffff, 0.5),
      directionalLight: new THREE.DirectionalLight(0xffffff, 0.8),
    };
    this.canvasId = canvasId;
    this.#init(width, height);
  }
  getScene() {
    return this.scene;
  }
  getCamera() {
    return this.camera;
  }
  getRenderer() {
    this.domElement = this.renderer.domElement;
    return this.domElement;
  }

  update() {
    // Оновлення сцени
    this.renderer.render(this.scene, this.camera);
  }

  #init(width, height) {
    // Ініціалізуємо сцену
    this.scene = new THREE.Scene();

    // Ініціалізуємо камеру 
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Ініціалізуємо рендерер
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(width, height);
    // Додавання куба до сцени
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.userData.isModel = true;
    this.cube.userData.onHover = () => {
      // Зберегти поточний колір моделі
      const currentColor = this.cube.material.color.getHex();
      // Згенерувати випадковий колір
      const randomColor = Math.random() * 0xffffff;
      // Змінити колір моделі на випадковий
      this.cube.material.color.set(randomColor);
      // Зберегти випадковий колір в userData моделі
      this.cube.userData.currentColor = "green";
    };

    this.cube.userData.onClick = () => {
      // Повернути колір моделі до попереднього значення
      const previousColor = this.cube.userData.currentColor;
      this.cube.material.color.set(previousColor);
    };

    this.scene.add(this.cube);

    // Анімація
    // this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Анімація куба
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // Рендеринг сцени
    this.renderer.render(this.scene, this.camera);
  }
}
