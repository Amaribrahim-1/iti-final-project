function formatAssistantReply(text) {
  return text
    .replace(/\s+([A-Za-z][^.]*\(\d{4}\))/g, '\n\n$1')
    .replace(/(\(\d{4}\)[^.؟!]+[.؟!])\s+/g, '$1\n\n')
    .trim()
}

export default formatAssistantReply
