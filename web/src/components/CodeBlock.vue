<template>
  <pre>
    <code :class="`${language}`">
{{ code }}
    </code>
  </pre>
</template>

<script>
import * as Prism from "prismjs";
// import OpenFGA from './../../plugins/dsl.openfga.js'
// Prism.languages['dsl.openfga'] = OpenFGA
import languageDefinition from './../plugins/openfga.js'
import 'prismjs/components/prism-json';
import "prismjs/themes/prism-twilight.css"; // you can change

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
    window.Prism = window.Prism || {};
    window.Prism.manual = true;
    Prism.languages['openfga'] = languageDefinition
    Prism.highlightAll();
    console.log(`highlight all code blocks on ${this.parent} component for ${this.language}.`)
  }
}
</script>