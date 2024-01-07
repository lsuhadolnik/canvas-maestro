'use client';

import React, { useState } from 'react';
import { WindowsProvider, useWindows } from './WindowsContext';
import WindowComponent from './WindowComponent';
import MonacoEditor from '@monaco-editor/react';
import { FaPlay, FaStop, FaExpand, FaCompress, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons

const WindowsContainer = () => {
    const { windows } = useWindows();

    return (
        <div>
            {windows.map(window => (
                <WindowComponent key={window.id} id={window.id} />
            ))}
        </div>
    );
};

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
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const scriptChanged = (newScript: any) => {
        debugger;
    }

    return (
        <div className="flex h-screen">
            {isSidebarOpen && (
                <div className="w-64">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={() => {}} className="flex items-center p-2 text-gray-600">
                            <FaPlay className="" />
                        </button>
                        <button onClick={() => {}} className="flex items-center p-2 text-gray-600">
                            <FaStop className="" />
                        </button>
                        <div>Step: {stepCount}</div>
                        <button onClick={toggleFullScreen} className="flex items-center p-2 text-gray-600">
                            {isFullScreen ? <FaCompress className="" /> : <FaExpand className="" />}
                        </button>
                    </div>
                    <MonacoEditor height="calc(100vh - 100px)" defaultLanguage="text" options={{
                        minimap: { enabled: false },
                    }} theme="vs-dark" onChange={scriptChanged} />
                </div>
            )}
            <div className="flex-grow">
                <button onClick={toggleSidebar} className="p-4">
                    {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
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
