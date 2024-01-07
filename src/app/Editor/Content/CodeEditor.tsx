import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    content: string;
    onChange: (newContent: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ content, onChange }) => {
    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            onChange(value);
        }
    };

    return (
        <Editor
            height="200px"
            defaultLanguage="javascript"
            value={content}
            options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
                wordWrap: 'on',
                wrappingIndent: 'indent',
                wordWrapColumn: 80,
                theme: 'vs-dark',
                fontSize: 20,
                lineNumbers: 'off',
                // hide the errors in the editor
                diagnostics: false,
            }}
            onChange={handleEditorChange}
        />
    );
};

export default CodeEditor;
