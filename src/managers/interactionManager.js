export class InteractionManager {
  constructor(sceneController) {
    this.sceneController = sceneController;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.intersectedObject = null;
    this.isDragging = false; // Флаг перетягування
    this.targetPosition = new THREE.Vector3(); // Цільова позиція моделі
    this.easing = 0.1; // Параметр плавності руху

    // Прив'язка обробників подій
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    // Налаштування початкового стану
    this.enableInteraction();
    this.animate();
  }

  enableInteraction() {
    // Додавання обробників подій
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('click', this.handleMouseClick);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  disableInteraction() {
    // Видалення обробників подій
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('click', this.handleMouseClick);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(event) {
    // Оновлення координат курсора миші
    const canvas = this.sceneController.getRenderer();
    const canvasBounds = canvas.getBoundingClientRect();
    this.mouse.x = ((event.clientX - canvasBounds.left) / canvas.clientWidth) * 2 - 1;
    this.mouse.y = -((event.clientY - canvasBounds.top) / canvas.clientHeight) * 2 + 1;

    // Перевірка перетинів з моделями
    this.checkIntersections();

    // Рух моделі за курсором миші
    this.handleDrag() 
  }
  handleDrag() {
    if (this.isDragging && this.intersectedObject) {
      // Отримати позицію курсора миші в світових координатах
      const intersection = this.checkIntersections();
      if (intersection) {
        const { point } = intersection;
        // Перемістити об'єкт на позицію курсора миші
        const pointSet = new THREE.Vector3(point.x, point.y, 0);
        this.intersectedObject.position.copy(pointSet);
      }
    }
  }
  getMouseIntersection() {
    // Отримати список пересічених об'єктів
    this.raycaster.setFromCamera(this.mouse, this.sceneController.getCamera());
    const intersectedObjects = this.raycaster.intersectObjects(this.sceneController.getScene().children, true);
  
    // Перевірка наявності пересічення з об'єктами
    if (intersectedObjects.length > 0) {
      return intersectedObjects[0]; // Повернути першу точку пересічення
    }
  
    return null; // Повернути null, якщо немає пересічень
  }

  handleMouseClick() {
    // Виконання дії при кліку на модель
    if (this.intersectedObject) {
      // Виклик користувацької функції для обробки кліку на моделі
      const userData = this.intersectedObject.userData;
      if (userData && userData.onClick) {
        userData.onClick();
      }
    }
  }

  handleMouseDown() {
    // Встановлення прапорця перетягування при натисканні кнопки миші
    this.isDragging = true;

    // Виклик користувацької функції для обробки початку перетягування моделі
    if (this.intersectedObject) {
      const userData = this.intersectedObject.userData;
      if (userData && userData.onDragStart) {
        userData.onDragStart();
      }
    }
  }

  handleMouseUp() {
    // Зупинка перетягування при відпусканні кнопки миші
    this.isDragging = false;

    // Виклик користувацької функції для обробки завершення перетягування моделі
    if (this.intersectedObject) {
      const userData = this.intersectedObject.userData;
      if (userData && userData.onDragEnd) {
        userData.onDragEnd();
      }
    }
  }

  checkIntersections() {
    // Оновлення списку перетинутих об'єктів
    this.raycaster.setFromCamera(this.mouse, this.sceneController.getCamera());
    const intersectedObjects = this.raycaster.intersectObjects(this.sceneController.getScene().children, true);

    // Перевірка наявності перетинів з моделями
    if (intersectedObjects.length > 0) {
      const firstObject = intersectedObjects[0].object;

      // Перевірка, чи є об'єкт моделлю
      if (firstObject.userData && firstObject.userData.isModel) {
        // Якщо об'єкт - модель, оновлюємо перетинутий об'єкт
        this.intersectedObject = firstObject;

        // Виклик користувацької функції для обробки наведення на модель
        const userData = this.intersectedObject.userData;
        if (userData && userData.onHover) {
          userData.onHover();
        }
        return intersectedObjects[0];// Повернути першу точку пересічення
      } else {
        // Якщо об'єкт не є моделлю, скидаємо перетинутий об'єкт
        this.intersectedObject = null;
        return null;
      }
    } else {
      // Якщо немає перетинів з об'єктами, скидаємо перетинутий об'єкт
      this.intersectedObject = null;
    }
  }

  animate() {
    // Анімація для плавного руху моделі
    if (this.isDragging && this.intersectedObject) {
      const currentPosition = this.intersectedObject.position;
      const dx = this.targetPosition.x - currentPosition.x;
      const dy = this.targetPosition.y - currentPosition.y;
      const dz = this.targetPosition.z - currentPosition.z;
      currentPosition.x += dx * this.easing;
      currentPosition.y += dy * this.easing;
      currentPosition.z += dz * this.easing;
    }

    // Оновлення сцени на кожному кадрі
    this.sceneController.update();

    // Виклик метод
        // Виклик методу animate() на наступному кадрі
        requestAnimationFrame(() => this.animate());
      }
      
    }
    