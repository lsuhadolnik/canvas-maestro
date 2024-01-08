import { useCallback, useContext } from 'react';
import { useWindows } from '../WindowsContext';

export const useCodeExecutor = () => {

    const { windows } = useWindows();

  const executeScript = useCallback(async (code: string) => {
    try {
      // eslint-disable-next-line no-eval
      const bbb = "1234";
      const result = await eval(`(async () => { ${code} })()`);
      return result;
    } catch (error) {
      console.error('Error executing script:', error);
      throw error; // Re-throw the error if you want to handle it in the component
    }
  }, []);

  return { executeScript };
};
