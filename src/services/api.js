const API_BASE = 'https://jsonplaceholder.typicode.com';

class ApiService {
  async fetchUsers() {
    const response = await fetch(`${API_BASE}/users`);
    return response.json();
  }

  async fetchFirstUser() {
    const users = await this.fetchUsers();
    return users[0];
  }

  async fetchComments() {
    const response = await fetch(`${API_BASE}/comments`);
    return response.json();
  }
}

const apiService = new ApiService();
export default apiService;