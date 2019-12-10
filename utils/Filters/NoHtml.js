export default function NoHtml (html) {
  html = html.split('</p>').join('\n')
  let toReplace = [/&nbsp;/g, /<[^<>]+?>/g]
  return toReplace.reduce((html, rg) => {
    return html.replace(rg, '')
  }, html).trim()
}