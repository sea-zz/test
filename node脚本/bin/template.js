const pageTemplate = (name) => `
import { defineComponent } from 'vue';
export default defineComponent({
  name: '${name}',
  setup() {
    return () => (
      <div class="${name.toLowerCase()}"></div>
        <h1>${name} 页面</h1>
    );
  }
});
`;

const componentsTemplate = (name) => `import { defineComponent } from 'vue';
export default defineComponent({
  name: '${name}',
  setup() {
    return () => (
      <div class="${name.toLowerCase()}"></div>
        <h1>${name} 组件</h1>
    );
  }
});
`;

module.exports = {
  pageTemplate,
  componentsTemplate
};
