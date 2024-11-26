export const isFileExists = async (fn) => {
  try {
    const stat = await Deno.stat(fn);
    /*
    if (stat.isDirectory) {
      console.log("The directory exists!");
    } else {
      console.log("The path exists, but it is not a directory.");
    }
    */
    return true;
  } catch (error) {
  }
  return false;
};

