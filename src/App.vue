<template>
    <div>
      {{msg}}
      <monaco v-model="msg"/>
    </div>
</template>
<script>
import monaco from './components/monaco'
export default {
  name: 'app',
  components: {
    monaco
  },
  data() {
    return {
      msg: '<p>hello my monaco!</p>'
    };
  },
};
</script>