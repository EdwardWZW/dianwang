<template>
  <div>
      <ul>
          <li v-for="(item,i) in arr" :key="i">
              {{ item.message }}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data () {
        return {
            arr: [
                { message: 'Foo' },
                { message: 'Bar' }
            ]
        }
    }
}
</script>

<style>

</style>
