'use client'

import { MDXEditor, 
  // MDXEditorMethods,
  BlockTypeSelect,
  headingsPlugin,
  quotePlugin,
  CreateLink,
  linkDialogPlugin,
  linkPlugin,
  InsertThematicBreak,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  markdownShortcutPlugin,
  listsPlugin,
  ListsToggle,
  Separator,
} from "@mdxeditor/editor"
import './editor/style.css'


/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs. 
*/
const Editor = ({ markdown, editorRef, es, pt }) => {
  const getLangHeader = () => {
    if(!es && !pt) return null
    return <div className="editor-lang-header">
      <div className="is-size-7">{pt ? '🇧🇷 Portugues' : '🇪🇸 Español'}</div>
    </div>
  }
  const hasLangHeader = () => {
    if(!es && !pt) return ''
    return 'has-lang-header'
  }

  return <>
    {
      getLangHeader() 
    }
    <MDXEditor 
      className={hasLangHeader()}
      ref={editorRef}
      markdown={markdown}
      contentEditableClassName='content'
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => ( <><BlockTypeSelect /><Separator/><UndoRedo />< Separator/><BoldItalicUnderlineToggles /><CreateLink /><ListsToggle /><InsertThematicBreak /></>),
        })
      ]} 
    />
  </>
}

export default Editor