

export default class Item{
    constructor(id, content){
        this.elements = {}
        this.elements.root = Item.createRoot()
        this.elements.input = this.elements.root.querySelector("kanban_item-input")
        this.elements.root.dataset.id = id
        this.elements.input.textContent = content
        this.content = content

        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim()

            if(newContent == this.content){
                return
            }
            this.content = newContent
        }
    }
    
    static createRoot(){
        const range = document.createRange()

        range.selectNode(document.body)

        return range.createContextualFragment(`
            <div class="kanban_item" draggable="true">
                <div class="kanban_item-input" contenteditable>
            </div>
        `).children[0]
    }
}