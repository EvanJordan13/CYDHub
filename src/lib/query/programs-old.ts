export async function fetchAllPrograms() {
  try {
    const response = await fetch('/api/programs');

    if (!response.ok) {
      throw new Error('Failed to fetch programs');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching programs:', error);
  }
}

export async function fetchProgramsByUser(userId: number) {
  try {
    const response = await fetch(`/api/programs/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch programs for user');
    }

    const data = await response.json();
    return data;
  } catch(error) {
    console.error('Error fetching programs:', error);
  }
}
