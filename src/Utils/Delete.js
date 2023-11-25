export const handleDelete = async (url, id, path) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this?");

  if (isConfirmed) {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(`${url}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      window.location.href = path;
    } catch (error) {
      console.error("Error deleting", error);
    }
  }
};
