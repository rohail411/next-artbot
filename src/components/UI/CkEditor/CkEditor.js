import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const CkEditor = ({ data, onChange }) => (
    <CKEditor
        editor={ClassicEditor}
        data={data}
        onInit={(editor) => {}}
        onChange={onChange}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
    />
);

export default CkEditor;
