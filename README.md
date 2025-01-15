# Yellow Duck

[Iterator.one](https://iterator.one)

Ai enumeration to the end of the iterator, guaranteed!

Are you tired of artificial intelligence being lazy, are you tired of truncated results, are you tired of enumeration?
We created this project to solve one of the major issues that still exist with current AI chat bots and allow you to have hands free enumeration of the complete iterator regardless if it is a collection of 10, 100, or 10K.

## ToDo

- Stripe Subscription
  - Packages
    - Free
    - Bronze
    - Silver
    - Gold
- Extract
  - Inputs
    - CSV: on row
    - TSV: on row
    - Excel (XLS/XLSX): on row
    - TXT: on newline
    - LOG: on newline
    - RTF: on paragraph
    - Word Documents (DOC / DOCX): on page / paragraph
    - PDF: : on page / paragraph
    - Calendar (ICS) on events
    - JSON: on largest array
    - Markdown (MD HTML, XML, CSS): on elements [rendered? as text]
    - Images (PNG / JPG / SVG): upload to blob => paths[]
    - Audio (MP3 / WAV / AAC): upload to blob => paths[]
    - Video (MP4 / AVI / MKV): upload to blob => paths[]
    - Archives (ZIP / RAR / TAR / GZ): on files (then recursive)
    - Database (SQL / SQLITE / DB): [Create environment, load file, execute query*]
    - Code Files (PY): [Create environment, execute file] => STD Output = string[]
  - Output
    - JSON: String[]

## Media-Types
https://github.com/microsoft/markitdown

### application
- application/json - [MarkItDown]
- application/msword - [MarkItDown]
- application/vnd.openxmlformats-officedocument.wordprocessingml.document - [MarkItDown]
- application/pdf - [MarkItDown]
- application/vnd.ms-excel - [MarkItDown]
- application/vnd.openxmlformats-officedocument.spreadsheetml.sheet - [MarkItDown]
- application/zip - [MarkItDown]
- application/vnd.sqlite3 - [Create environment, load file, execute query*]
- application/vnd.ms-access - [Create environment, load file, execute query*]
### text
- text/calendar - on events
- text/css - on elements (as string)
- text/csv - [MarkItDown]
- text/html - [MarkItDown]
- text/markdown - on blocks (rendered as natural)
- text/plain - on newline
- text/rtf - on paragraph
- text/xml - [MarkItDown]
- text/x-python - [Create environment, load file, execute query*]
