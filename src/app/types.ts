export interface WindowProps {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    contentType: WindowContentTypes; // Add this line to determine the type
    content: WindowContentDataTypes; // Add this line to store the content
}

export type WindowContentTypes = 'code' | 'table';
export type WindowContentDataTypes = string | TableData;

export interface TableData {
    headers: string[];
    rows: any[][];
}

export interface WindowsContextType {
    windows: WindowProps[];
    updateWindow: (id: string, newProps: Partial<WindowProps>) => void;
    updateContent: (id: string, newContent: string | TableData) => void;
}
