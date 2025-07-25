const STORAGE_KEY = 'swiftDashboardState';

class StorageService {
  saveDashboardState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  loadDashboardState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  }
}

const storageService = new StorageService();
export default storageService;