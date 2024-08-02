export const isValidEmployeeName = (name: string) => {
    const re = /^[\p{L}][\p{L}\p{M}\p{Z}\p{P}]*[\p{L}]$/u;
    return re.test(String(name)) && name.trim().split(' ').length > 1;
  };