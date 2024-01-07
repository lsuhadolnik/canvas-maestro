'use client';

import React, { useState } from 'react';
import { WindowsProvider, useWindows } from './WindowsContext';
import WindowComponent from './WindowComponent';
import MonacoEditor from '@monaco-editor/react';

const WindowsContainer = () => {
    const { windows } = useWindows();

    return (
        <div>
            {windows.map(window => (
                <WindowComponent key={window.id} id={window.id} />
            ))}
        </div>
    );
}

const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => {
            console.error(`Error attempting to enable full-screen mode: ${e.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
};


const AppWithSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [stepCount, setStepCount] = useState(0);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {isSidebarOpen && (
                <div className="w-64 text-white">
                    <MonacoEditor height="calc(100vh - 100px)" defaultLanguage="javascript" theme="vs-dark" />
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Start
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Stop
                    </button>
                    <div>Step Counter: {stepCount}</div>
                    <button onClick={toggleFullScreen} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Full-Screen
</button>
                </div>
            )}
            <div className="flex-grow">
                <button onClick={toggleSidebar} className="p-4">
                    {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                </button>
                <WindowsContainer />
            </div>
        </div>
    );
};



export const Editor = () => {
    return (
        <WindowsProvider>
            <AppWithSidebar />
        </WindowsProvider>
    );
};
