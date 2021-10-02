import { 
  stripParenthesis, 
  getFunctionArgs 
} from './utils.js';

import {
  createEventListener,
} from './events.js';

import {
  createReactive,
  updateReactiveVarHTMLOnLoad,
  updateReactiveVarAttrOnLoad
} from './reactive.js';

export class noJS {

  constructor(shadowDom, template) {
    this.self = shadowDom;
    this.self.attachShadow({mode: 'open'});
    this.self.shadowRoot.appendChild(template.content.cloneNode(true));

    // interpolate variable
    toHTML(this.self);

    createEventListener(this.self);

  }


  makeReactive = (varObj) => {
    const allElements = this.self.shadowRoot.querySelectorAll('*');
    allElements.forEach(element => {
      //addDataBindAttr(element, variable);
      updateReactiveVarHTMLOnLoad(element, varObj);
      updateReactiveVarAttrOnLoad(element, varObj);
    })

    // add data-bind listener and variable to react when there is an event
    addDataBindListener(this.self);
    //createEventListener(this.self);

    // make variable reactive
    return createReactive(
      this.self, 
      varObj, 
      createEventListener
    );

  }

}


export const toHTML = (self) => {
  const allElements = self.shadowRoot.querySelectorAll('*');
  allElements.forEach(element => {
    updateVarHTMLOnLoad(self, element);
    updateVarAttrOnLoad(self, element);
  })
};


const updateEventFunctionArgs = (self, attrName, attrVal) => {
  if (attrName.startsWith('@')) {
    console.log(attrVal)
    console.log(getFunctionArgs(attrVal));
    const functionArgs = stripParenthesis(
      getFunctionArgs(attrVal)
    );
    const finalArgs = [];
    const commentArgs = [];
    functionArgs.split(',').forEach(e => {
      let arg = e.trim();
      if (self[arg] != undefined) {
        finalArgs.push(self[arg]);
        commentArgs.push(arg);
      } else {
        console.warn(`This function "${attrVal}" unable to update args`);
        return
      }
    })
    let tmp = finalArgs.map(r => `'${r}'`).join(','); //@Todo how about numeric??
    tmp = `(${tmp})/*${commentArgs.join(',')}*/`;
    const result = attrVal.replaceAll(/\((.+)\)/g, `${tmp}`);
    console.log(result, attrVal)
    return result
  }
};

const updateVarAttrOnLoad = (self, element) => {
  for (let [suffixID, attr] of Object.entries(element.attributes)) { 
    let updatedFnArgs = updateEventFunctionArgs(self, 
      attr.name, 
      attr.value
    );

    if (updatedFnArgs) {
      // data-onclick-id1 suffix counter to make use its unique event
      element.setAttribute(
        `data-${attr.name.replace('@', 'on')}-id${suffixID}`,  
        updatedFnArgs
      );

      // remove @click attributes
      element.removeAttribute(`${attr.name}`);

    }
  }
};

const updateVarHTMLOnLoad = (self, element) => {
  // replace with real value {username} > johnny, applies on non-reactive variable
  element.textContent.split(' ').forEach(text => {
    if (text.startsWith('{') && text.endsWith('}')) {
      let variable = text.split('{')[1].split('}')[0];
      if (self[variable] != undefined) {
        element.innerHTML = element.innerHTML.replaceAll(
          text, 
          self[variable]
        )
      }
    }
  })
}




const addDataBindListener = (self) => {
  // add any event data-bind listener
  const elementWithDataBind = self.shadowRoot.querySelectorAll("[data-bind]");
  elementWithDataBind.forEach((element) => {
    if (element.type === "text") {
      element.addEventListener("input", (e) => {
        self.reactive[e.target.getAttribute('data-bind')] = e.target.value;
      });
    }
  });
  // add any event data-bind listener
}


export default {
  noJS
}