<template>
  <div>
    <Card bodyClass="p-3 max-w-[272px] h-fit overflow-y-auto" colorClass="bg-success-450 w-full text-black shadow-md">
      <div v-if="header_type">
        <img v-if="header_type === 'IMAGE'" :src="header_media" />
        <div v-if="header_type === 'TEXT'" class="font-bold" :class="headerTextClass">{{ renderHeader(header_type, header_text) }}</div>
      </div>
      <div class="font-medium break-all" :class="messageClass" v-html="renderMessage(body)"></div>
      <div class="font-light break-all" :class="footerClass">{{ footer }}</div>
    </Card>
    <Button
      btnClass="btn-sm border shadow-md mt-1 btn-light w-full"
      v-for="(button, i) in buttons"
      :key="i"
      :text="button.text"
    />
  </div>
</template>

<script>
import Card from "@/components/Card";
import Button from "@/components/Button";

export default {
  components: {
    Card,
    Button,
  },
  props: {
    header_type: String,
    header_text: String,
    header_text_sample: String,
    header_media: String,
    body: String,
    body_sample: Array,
    footer: String,
    buttons: Object,
    headerTextClass: {
      type: String,
      default: "text-sm"
    },
    messageClass: {
      type: String,
      default: "text-sm"
    },
    footerClass: {
      type: String,
      default: "text-sm"
    },
  },
  methods: {
    renderMessage(message) {
      if (message) {
        // Replace {{1}}, {{2}}, {{3}}, ... with values from body_sample
        for (let i = 0; i < this.body_sample.length; i++) {
          const placeholder = new RegExp(`{{${i + 1}}}`, 'g');
          message = message.replace(placeholder, this.body_sample[i] || '');
        }
        // Replace line breaks
        return message.replace(/(?:\r\n|\r|\n)/g, "<br>");
      }
      return '';
    },
    renderHeader(header_type, header_text) {
      console.log(`Preview renderHeader header_type : ${header_type} , header_text : ${header_text} , this.header_text_sample : ${this.header_text_sample}`);
      if (header_type === 'TEXT' && header_text && header_text.includes('{{1}}')) {
        return header_text.replace('{{1}}', this.header_text_sample || '');
      } else {
        return header_text;
      }
    },
  },
};
</script>
