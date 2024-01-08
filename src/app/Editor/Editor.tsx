"use client";

import React, { useRef, useState } from "react";
import { WindowsProvider, useWindows } from "./WindowsContext";
import WindowComponent from "./WindowComponent";
import {useCodeExecutor} from './Execution/useCodeExecutor';
import MonacoEditor from "@monaco-editor/react";
import {
  FaPlay,
  FaStop,
  FaExpand,
  FaCompress,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"; // Import icons
import logo from "../../../public/logo.svg"; // Update with the correct path to your logo
import Image from "next/image";
import { Resizable } from "re-resizable";

const WindowsContainer = () => {
  const { windows } = useWindows();

  return (
    <div>
      {windows.map((window) => (
        <WindowComponent key={window.id} id={window.id} />
      ))}
    </div>
  );
};

const AppWithSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stepCount, setStepCount] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const { executeScript } = useCodeExecutor();
  const [code, setCode] = useState<string>("");

  const editorRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const runCode = async () => {
    try {
      const result = await executeScript(code);
      console.log(result); // If the executed code returns something
    } catch (error) {
      // Handle the error, show a notification to the user, etc.
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(
          `Error attempting to enable full-screen mode: ${e.message}`
        );
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const codeChanged = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem("code", newCode);
  }

  const getDefaultCode = () => {
    return localStorage.getItem("code") || "";
  }

  const Sidebar = (
    <div className={"w-100 flex flex-col"}>
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-gray-700"
        style={{
          backgroundImage: "linear-gradient(180deg, #303030 0%, #1E1E1E 100%)",
        }}
      >
        <Image src={logo} alt="Canvas Maestro Logo" width={100} />
        <div className="flex items-center">
          <FaPlay className="text-gray-300 hover:text-white cursor-pointer pr-2" onClick={runCode} />
          {isFullScreen ? (
            <FaCompress
              className="text-gray-300 hover:text-white cursor-pointer"
              onClick={toggleFullScreen}
            />
          ) : (
            <FaExpand
              className="text-gray-300 hover:text-white cursor-pointer"
              onClick={toggleFullScreen}
            />
          )}
        </div>
        <div className="flex items-center bg-gray-700 text-white text-sm font-medium px-2 py-1 rounded">
          <span
            className="font-semibold"
            style={{ fontFamily: "PT Sans, sans-serif" }}
          >
            {stepCount.toString().padStart(4, "0")}
          </span>
        </div>
      </div>
      <MonacoEditor
        height="calc(100vh - 30px)"
        defaultLanguage="javascript"
        defaultValue={getDefaultCode()}
        theme="vs-dark"
        onChange={codeChanged}
      />
    </div>
  );

  return (
    <div className="flex h-screen">
      <Resizable
        style={{ visibility: isSidebarOpen ? "visible" : "hidden" }}
        size={{ width: isSidebarOpen ? sidebarWidth : 0, height: "100vh" }}
        onResizeStop={(e, direction, ref, d) => {
          setSidebarWidth(sidebarWidth + d.width);
        }}
        minWidth={isSidebarOpen ? 200 : 0} // Minimum width of the sidebar
        maxWidth="80%" // Maximum width of the sidebar
        enable={{ right: true }} // Enable resizing from the right edge of the sidebar
        className="bg-black flex-none"
      >
        {Sidebar}
      </Resizable>

      <div className="flex-grow">
        <button onClick={toggleSidebar} className="p-4">
          <div className="hover:bg-gray-600 p-4 rounded">
            {isSidebarOpen ? <FaChevronRight /> : <FaChevronLeft />}
          </div>
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
