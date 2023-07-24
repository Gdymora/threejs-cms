import '../styles.css';
import { SceneController } from './controllers/sceneController.js';
import { UIManager } from './ui/uiManager.js';
import { InteractionManager  } from './managers/interactionManager.js';

const sceneController = new SceneController(800, 800, "canvas");
// Ініціалізація сцени та управління моделями
// const uiManager = new UIManager(sceneController);
// uiManager.init();
const interactionManager  = new InteractionManager (sceneController);
