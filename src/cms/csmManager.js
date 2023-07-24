class CMSManager {
    static instance;
  
    static getInstance() {
      if (!CMSManager.instance) {
        CMSManager.instance = new CMSManager();
      }
      return CMSManager.instance;
    }
  
    init() {
      // Ініціалізація CMS
    }
  
    // Додаткові методи і логіка
  }