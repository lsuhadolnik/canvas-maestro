import React from 'react';
import Moveable from 'react-moveable';
import { useWindows } from './WindowsContext';

import styles from './Window.module.css';
import { TableViewer } from './Content/TableViewer';
import { TableData, WindowProps } from '../types';
import CodeEditor from './Content/CodeEditor';

const WindowComponent: React.FC<{ id: string }> = ({ id }) => {
    const { windows, updateWindow, updateContent } = useWindows();
    const window = windows.find(w => w.id === id);

    if (!window) return null;

    // Event handler for Moveable
    const onDrag = ({ target, left, top }) => {
        updateWindow(id, { x: left, y: top });
    };

    const onResize = ({ target, width, height }) => {
        updateWindow(id, { width, height });
    };

    const handleContentChange = (newContent: string | TableData) => {
        updateContent(id, newContent);
    };

    const renderContent = (window: WindowProps) => {
        switch (window.contentType) {
            case 'code':
                return (
                    <CodeEditor
                        content={window.content as string}
                        onChange={(newContent) => handleContentChange(newContent)}
                    />
                );
            case 'table':
                return (
                    <TableViewer data={window.content as TableData} />
                );
            default:
                return <div>Unsupported content type</div>;
        }
    };

    return (
        <div>
        <div className={styles.windowStyles}
            id={id}
             style={{ left: window.x, top: window.y, width: window.width, height: window.height }}>
            <div className="h-7 flex items-center px-2.5 rounded-t-lg">
                <div className="flex space-x-2">
                    <span className="h-3 w-3 bg-red-500 rounded-full"></span>
                    <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
                    <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                </div>
            </div>
            <div className="window-content">
                    {renderContent(window)}
                </div>
        </div>
        <Moveable
                target={`#${id}`}
                draggable={true}
                resizable={true}
                onDrag={onDrag}
                onResize={onResize}
                origin={false}
                renderDirections={['se']}
            />   
        </div>
    );
};

export default WindowComponent;
