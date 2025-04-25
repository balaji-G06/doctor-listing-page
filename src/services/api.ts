 
export const fetchDoctors = async () => {
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    return response.json();
  };
  