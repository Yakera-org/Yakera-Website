import React, { useEffect, useState, useRef, Fragment } from 'react';
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    getDefaultKeyBinding,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

const StyleButton = ({ onToggle, style, active, label }) => {
    const _onToggle = (event) => {
        event.preventDefault();
        onToggle(style);
    };

    const [className, setClassName] = useState('MyEditor-styleButton');

    useEffect(() => {
        if (active) {
            setClassName('MyEditor-styleButton MyEditor-activeButton');
        } else {
            setClassName('MyEditor-styleButton');
        }
    }, [active]);

    return (
        <span className={className} onMouseDown={_onToggle}>
            {label}
        </span>
    );
};

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
];

const BlockStyleControls = (state) => {
    const { editorState } = state;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className='MyEditor-controls'>
            {BLOCK_TYPES.map(type => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={state.onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
];

const InlineStyleControls = (state) => {
    const currentStyle = state.editorState.getCurrentInlineStyle();

    return (
        <div className='MyEditor-controls'>
            {INLINE_STYLES.map(type => (
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={state.onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

const MyEditor = ({ readOnly = false }) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    const editorRef = useRef(null);

    const focus = () => editorRef.current.focus();

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    };

    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const toggleInlineStyle = (inlineStyle) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    useEffect(() => {
        console.log(convertToRaw(editorState.getCurrentContent()));
    }, [editorState]);

    return (
        <Fragment>
            <style>{`
                .MyEditor-root {
                    background: #fff;
                    border: 1px solid #ddd;
                    padding: 15px;
                }
                .MyEditor-editor {
                    border-top: 1px solid #ddd;
                    cursor: text;
                    font-size: 16px;
                    margin-top: 10px;
                    min-height: 30vh;
                    padding-top: 10px;
                }
                .MyEditor-styleButton {
                    color: #999;
                    cursor: pointer;
                    margin-right: 1vw;
                    padding: 0.3rem;
                    display: inline-block;
                }
                .MyEditor-activeButton {
                    background-color: orange;
                    color: white;
                    border-radius: 7px;
                }
                .MyEditor-controls {
                    margin-right: 1vh;
                }
            `}</style>
            <div className='MyEditor-root'>
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={toggleInlineStyle}
                />
                <div className='MyEditor-editor' onClick={focus}>
                    <Editor
                        editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        onChange={setEditorState}
                        // keyBindingFn={mapKeyToEditorCommand}
                        readOnly={readOnly}
                        spellCheck={true}
                        ref={editorRef}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default MyEditor;