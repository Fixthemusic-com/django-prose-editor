import { Plugin, PluginKey } from 'prosemirror-state'

export const customComponentSpec = {
  attrs: { content: { default: '' } },
  inline: true,
  group: "inline",
  draggable: true,
  toDOM: node => ['span', { class: 'custom-component' }, node.attrs.content],
  parseDOM: [{
    tag: 'span.custom-component',
    getAttrs: dom => ({ content: dom.textContent })
  }]
}

class CustomComponentView {
  constructor(node) {
    this.dom = document.createElement('span')
    this.dom.className = 'custom-component'
    this.dom.textContent = node.attrs.content
    this.dom.style.border = '1px solid #ccc'
    this.dom.style.padding = '0 3px'
  }

  update(node) {
    this.dom.textContent = node.attrs.content
    return true
  }
}

export function createCustomComponentPlugin(items) {
  return new Plugin({
    key: new PluginKey('customComponentPlugin'),
    view(editorView) {
      const container = document.createElement('div')
      container.className = 'custom-component-menu'

      const select = document.createElement('select')
      select.addEventListener('change', (e) => {
        const selectedItem = items.find(item => item.label === e.target.value)
        if (selectedItem) {
          const { state } = editorView
          const tr = state.tr.replaceSelectionWith(
            state.schema.nodes.customComponent.create({ content: selectedItem.rendered })
          )
          editorView.dispatch(tr)
        }
        select.value = '' // Reset dropdown after insertion
      })

      // Add a default empty option
      const defaultOption = document.createElement('option')
      defaultOption.value = ''
      defaultOption.textContent = 'Insert custom component...'
      select.appendChild(defaultOption)

      // Add options for each item
      items.forEach(item => {
        const option = document.createElement('option')
        option.value = item.label
        option.textContent = item.label
        select.appendChild(option)
      })

      container.appendChild(select)
      editorView.dom.parentNode.insertBefore(container, editorView.dom)

      return {
        destroy() {
          container.remove()
        }
      }
    },
    props: {
      nodeViews: {
        customComponent: (node, view, getPos) => new CustomComponentView(node, view, getPos)
      }
    }
  })
}


