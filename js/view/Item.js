import kanbanAPI from "../api/kanbanAPI.js"
import DropZone from "../api/DropZone.js"

export default class Item{
    constructor(id, content){

        const bottomDropZone = DropZone.createDropZone()

        this.elements = {}
        this.elements.root = Item.createRoot()
        this.elements.input = this.elements.root.querySelector(".kanban_item-input")
        this.elements.root.dataset.id = id
        this.elements.input.textContent = content
        this.content = content

        this.elements.root.appendChild(bottomDropZone)

        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim()

            if(newContent === this.content){
                return
            }

            this.content = newContent

            kanbanAPI.updateItem(id, {
                content: this.content
            })
        }

        this.elements.input.addEventListener("blur", onBlur)
        this.elements.root.addEventListener("dbclick", () =>
        {
            const check = confirm("Are you sure you want to delete?")

            if(check){
                kanbanAPI.deleteItem(id)
                this.elements.input.removeEventListener("blur", onBlur)
                this.elements.root.parentElement.removeChild(this.elements.root)
            }
        })

        this.elements.root.addEventListener("dragstar", e => {
            e.dataTransfer.setData("text/plain", id)
        })

        this.elements.input.addEventListener("drop", e => {
            e.preventDefault()
        })
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