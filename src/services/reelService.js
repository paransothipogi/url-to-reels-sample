const API_BASE_URL = 'http://localhost:5000/api';

export const reelService = {
  // Create new reel job
  async createReel(url, captions = '', maxDuration = 15) {
    const response = await fetch(`${API_BASE_URL}/reels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        captions,
        maxDuration,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create reel');
    }

    return response.json();
  },

  // Get job status
  async getJobStatus(jobId) {
    const response = await fetch(`${API_BASE_URL}/reels/${jobId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch job status');
    }

    return response.json();
  },

  // Get queue stats
  async getStats() {
    const response = await fetch(`${API_BASE_URL}/stats`);
    return response.json();
  },

  // Delete job
  async deleteJob(jobId) {
    const response = await fetch(`${API_BASE_URL}/reels/${jobId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
