class customElement extends HTMLElement{
    constructor(){
        super();
        const template = document.createElement('template');
        template.innerHTML= 
        `
         <div> 
         <h1>Custom Element</h1>
         </div>
        `

    }
}

window.customElements.define('custom-Element',customElement)