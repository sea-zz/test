import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TestList',
  setup() {
    return () => (
      <div class="testlist"></div>
        <h1>TestList 组件</h1>
    );
  }
});
