export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Handle axios errors
    return error.response?.data?.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
}; 