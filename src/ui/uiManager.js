
export class UIManager {
    constructor(sceneController) {
      this.sceneController = sceneController;
      this.canvas = document.getElementById('canvas');
      this.colorInput = document.getElementById('colorInput');
      this.canvas.addEventListener('click', this.handleCanvasClick.bind(this));
      this.colorInput.addEventListener('change', this.handleColorInputChange.bind(this));
    }
  
    init() {
      // Ініціалізація інтерфейсу
      const toggleButton = document.getElementById("toggleMenu");
      const sidebar = document.getElementById("sidebar");

      toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
    }
  
    handleCanvasClick(event) {
      const cubeColor = this.colorInput.value;
      this.sceneController.setCubeColor(cubeColor);
    }
  
    handleColorInputChange(event) {
      const cubeColor = event.target.value;
      this.sceneController.setColor(cubeColor);
    }
  }
   
