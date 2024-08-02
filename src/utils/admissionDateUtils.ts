export const isValidDate = (date: string) => {
    const today = new Date();
    const inputDate = new Date(date);
  
    const sixtyYearsAgo = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());
  
    if (inputDate > today) {
      return false;
    }
  
    if (inputDate < sixtyYearsAgo) {
      return false;
    }
  
    return true;
  };

  export const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }