export default {
  bind(el, binding) {
    el.event = event => {
      const attribute = el.getAttribute('container');
      const containers = attribute ? attribute.split(',') : [];
      let inContainer = false;
      for (let i = 0; i < containers.length; i += 1) {
        const container = containers[i];
        let currentNode = event.target;
        while (currentNode) {
          if ((currentNode.classList && currentNode.classList.contains(container))
            || currentNode.id === container) {
            inContainer = true;
            break;
          }
          currentNode = currentNode.parentNode;
        }
        if (inContainer) {
          break;
        }
      }
      // here I check that click was outside the el and his childrens
      if (!inContainer && !(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value(event);
      }
    };
    document.body.addEventListener('ontouchstart' in document.documentElement ? 'touchstart' : 'click', el.event);
  },
  unbind(el) {
    document.body.removeEventListener('ontouchstart' in document.documentElement ? 'touchstart' : 'click', el.event);
  },
};
