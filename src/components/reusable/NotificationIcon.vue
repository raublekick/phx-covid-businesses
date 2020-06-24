<template>
  <b-tooltip :label="message">
    <b-icon :type="`is-${level}`" :icon="icon"></b-icon>
  </b-tooltip>
</template>

<script>
export default {
  name: "NotificationIcon",
  props: {
    icon: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    level: {
      type: String,
      required: true,
      validator: value => {
        return ["info", "warning", "error", "success"].includes(value);
      }
    }
  }
};
</script>

<style></style>
