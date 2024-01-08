import { createContext, useContext, useState } from "react";
import { WindowContentDataTypes, WindowProps, WindowsContextType } from "../types";

const WindowsContext = createContext<WindowsContextType | undefined>(undefined);

export const WindowsProvider = (props: any) => {
  const children = props.children;

  const [windows, setWindows] = useState<WindowProps[]>([
    /*{
      id: "window1",
      x: 100,
      y: 100,
      width: 300,
      height: 200,
      content: "Demo text for testing the window component.",
      contentType: "code",
    },
    {
      id: "window2",
      x: 200,
      y: 150,
      width: 300,
      height: 200,
      contentType: "table",
      content: {
        headers: [
          'name', 'age', 'color'
        ],
        rows: [ 
          // An example array of arrays of "name", "age", and "color" values
            ['John', '25', 'blue'],
            ['Jane', '24', 'green'],
            ['Jack', '30', 'red'],
            ['Jill', '28', 'yellow'],
            ['James', '27', 'purple'],
            ['Jenny', '26', 'orange'],
            ['Joe', '29', 'black'],
            ['Jade', '31', 'white'],
        ],
      },
    },
    {
      id: "window3",
      x: 300,
      y: 200,
      width: 300,
      height: 200,
      content: "Demo text for testing the window component.",
      contentType: "code",
    },*/
  ]);

  const updateWindow = (id: string, newProps: Partial<WindowProps>) => {
    setWindows((prevWindows) =>
      prevWindows.map((window) =>
        window.id === id ? { ...window, ...newProps } : window
      )
    );
  };

  const updateContent = (id: string, newContent: WindowContentDataTypes) => {
    setWindows(prevWindows =>
      prevWindows.map(window => 
        window.id === id ? { ...window, content: newContent } : window
      )
    );
  };

  return (
    <WindowsContext.Provider value={{ windows, updateWindow, updateContent }}>
      {children}
    </WindowsContext.Provider>
  );
};

export const useWindows = () => {
  const context = useContext(WindowsContext);
  if (!context) {
    throw new Error("useWindows must be used within a WindowsProvider");
  }
  return context;
};
