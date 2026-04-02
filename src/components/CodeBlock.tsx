interface CodeBlockProps {
  code: string
}

function highlight(code: string): string {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return escaped.replace(
    /(\/\/[^\n]*)|(`[^`]*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\b(?:const|let|var|function|return|if|else)\b)|(\w+)(?=\()/g,
    (_match, comment, str, keyword, func) => {
      if (comment !== undefined) return `<span style="color:#475569">${comment}</span>`
      if (str !== undefined) return `<span style="color:#86EFAC">${str}</span>`
      if (keyword !== undefined) return `<span style="color:#93C5FD">${keyword}</span>`
      if (func !== undefined) return `<span style="color:#FCD34D">${func}</span>`
      return _match
    }
  )
}

export default function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre
      style={{
        backgroundColor: '#0F172A',
        borderRadius: '12px',
        padding: '14px 16px',
        margin: 0,
        overflowX: 'auto',
      }}
    >
      <code
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          lineHeight: '1.85',
          color: '#E2E8F0',
        }}
        dangerouslySetInnerHTML={{ __html: highlight(code) }}
      />
    </pre>
  )
}
