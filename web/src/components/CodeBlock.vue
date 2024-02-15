<template>
  <pre>
    <code :class="`language-${language}`">
{{ code }}
    </code>
  </pre>
</template>

<script>
import * as Prism from "prismjs";
import languageDefinition from './../plugins/openfga.js';
import 'prismjs/components/prism-json';
import "prismjs/themes/prism-twilight.min.css";
import "./../assets/css/ofga.css"

export default {
  name: 'CodeBlock',
  data () {
    return {}
  },
  props: {
    code: { type: String },
    language: { type: String },
    parent: { type: String }
  },
  mounted() {
    this.initialize();
    this.highlightAll();
  },
  methods: {
    initialize () {
      window.Prism = window.Prism || {};
      window.Prism.manual = true;
      Prism.languages['openfga'] = languageDefinition
    },
    highlightAll () {
      Prism.highlightAll()
      console.log(`highlight all code blocks on ${this.parent} component for ${this.language}.`)
    }
  }
}
</script>